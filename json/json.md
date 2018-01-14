### JSON 

#### 1、语法
JSON的语法可以表示以下三种类型
* 1、简单值：使用与JS相同的语法，可以在JSON中表示字符串、数值、布尔值和null，但JSON不支持undefined

* 2、对象：对象作为一种复杂的数据类型，表示的是一组无序的键值对，其值可以是简单值，也可以是复杂数据类型的值。与JS的对象字面量稍有不同
``` 
//JS的对象字面量
var object = {
    name : "jill",
    age : 18
};

//JSON表示上述对象
{
    "name" : "jill",
    "age" : 18
}

//区别
1、JSON中的对象要求给属性加引号
2、没有声明变量，因为JSON中没有变量的概念
3、没有末尾的分号，因为这不是JS语句
```

* 3、数组：数组也是一种复杂的数据类型，表示的是一组有序的键值对，可以通过数值索引来访问其中的值。数组的值也可以是任意类型

``` 
[
   {
       "name" : [
            "jill",
            "vane"
       ],
       "age" : 18
   }, 
  {
      "name" : [
           "jill",
           "vane"
      ],
      "age" : 18
  },
]
```

#### 解析与序列化
JSON之所以流行，拥有与JS类似的语法并不是全部原因，更重要的是可以把JSON数据结构解析为有用的JS对象

##### JSON对象
对于不能原生支持JSON解析的浏览器，使用这个[shim](https://github.com/douglascrockford/JSON-js)是最佳选择

JSON对象有两个方法：stringify()和parse()。在最简单的情况下，这两个方法分别用于把JS对象序列化为JSON字符串和把JSON字符串解析为JS值

* 序列化选项

使用JSON.stringify()把一个JS对象序列化为一个JSON字符串
```  
var user = {
    name : "jill",
    age : 18,
    friend :[
        "vane",
        "vake"
    ],
    school : "shenda"    
};

var jsonText = JSON.stringify(user);
```

默认情况下，JSON.stringify()输出的JSON字符串不包含任何空格字符或缩进，因此保存在jsonText中的字符串如下所示

``` 
{"name":"jill","age":18,"friend":["vane","vake"],"school": "shenda"} 
```
实际上，JSON.stringify()除了接收序列化的JS对象外，还可以接收两个参数，这两个参数用于指定以不同的方式序列化JS对象。单独或组合使用这两个参数，可以更全面地控制JSON的序列化

第二个参数是个过滤器，可以是一个数组
``` 
var jsonText = JSON.stringify(user,["name","school"]);
```
如果过滤器参数是数组，那么JSON.stringify()的结果中将只包含数组中列出的属性
``` 
{"name":"jill","school": "shenda"} 
```
也可以是一个函数[替换函数]。传入的函数接收两个参数，属性(键)名和属性值
``` 
var jsonText = JSON.stringify(user,function(key,value){
    switch(key){
        case "name":
            return undefined;
        case "age":
            return 22;
        case "friend":
            return value.join(",");
        case "school":
            return "shenda";
        default:
            return value;
    }
});
```
这里需要注意一下，如果函数返回了undefined，那么相应的属性会被忽略。最后一定要提供default项，此时返回传入的值，以便其他值都能正常出现在结果中。实际上，第一次调用这个函数过滤器，传入的键是一个空字符串，而值就是user对象

``` 
{"age":22,"friend":"vane,vake","school":"shenda"}
```

第三个参数用于控制结果中的缩进和空白符。如果这个参数是一个数值，那它表示的是每个级别缩进的空格数
``` 
//在每个级别缩进4个空格
var jsonText = JSON.stringify(user,null,4);
```
只要传入有效的控制缩进的参数值，结果字符串就会包含换行符。最大缩进空格为10，所有大于10的值都会自动转换为10
``` 
{
    "name":"jill",
    "age":18,
    "friend":[
        "vane",
        "vake"
    ],
    "school":"shenda"    
}
```
若缩进的参数是一个字符串而非数值，则这个字符串将在JSON字符串中被用作缩进符(不再使用空格)
``` 
//在每个级别缩进--
var jsonText = JSON.stringify(user,null,"--");
```
``` 
{
--"name":"jill",
--"age":18,
--"friend":[
----"vane",
----"vake"
--],
--"school":"shenda"    
}
```
有时候，JSON.stringify()还是不能满足对某些对象进行自定义序列化的需求，此时，可以给对象定义toJSON()方法，返回其自身的JSON数据格式
``` 
// 
var user = {
    name : "jill",
    age : 18,
    friend :[
        "vane",
        "vake"
    ],
    school : "shenda",
    toJSON:function(){
        return this.name;
    }    
};

var jsonText = JSON.stringify(user);
```
toJSON()作为函数过滤器的补充，理解序列化的内部顺序十分重要，序列化该对象的顺序如下

1、如果存在toJSON()方法而且能通过它取得有效的值，则调用该方法。否则，返回对象本身

2、如果提供了第二个参数，应用这个函数过滤器。传入函数过滤器的值是第1步返回的值

3、对第2步返回的每个值进行相应的序列化

4、如果提供了第三个参数，执行相应的格式化

* 解析选项
将有效的JSON字符串直接传递给JSON.parse()就可以得到相应的JS值
``` 
var usercopy = JSON.parse(jsonText);
```
JSON.parse()方法也可以接收另一个参数：函数[还原函数]，该函数接收两个参数，一个键一个值，而且需要返回一个值，若还原函数返回undefined则表示要从结果中删除相应的键，否则将该值插入到结果中
``` 
var usercopy = JSON.parse(jsonText,function(key,value){
    if(key === "age"){
        return new Date(value);
    }else{
        return value;
    }
});
```