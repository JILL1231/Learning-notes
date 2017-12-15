### 引用类型
引用类型的值（对象）是引用类型的一个实例。在ES中，引用类型是一种数据结构，用于将数据和功能组织在一起

### object类型
虽然object的实例不具备多少功能，但对于在应用程序中存储和传输数据而言，它是非常理解的选择

创建object实例的方式有两种：

第一种是使用new操作符后跟object构造函数
```
var person = new Object();
person.name = "jill";
person.age = 18;
```
另一种方式使用对象字面量表示法
```
var person = {
    name:"jill",
    age:18
}
```

#### 传递参数
对必需值使用命名参数，而使用对象字面量来封装多个可选参数
```
function displayInfo(name,args){
    var output = "The people "+name;
    if(typeof args.age == "number"){
        output += "，age:"+args.age;
    }
    if(typeof args.school == "string"){
        output += "，school:"+args.school;
    }
    console.log(output);
}
//调用函数，传递参数
displayInfo("jill",{
    age:18,
    school:"abc"
});//The people jill，age:18，school:abc

displayInfo("vane",{
    school:"abc"
});//The people vane，school:abc
```

#### 访问对象属性
一般来说，访问对象属性时使用的都是```.```表示法，不过，在JS也可以使用```[]```

使用```[]```语法时，应该将要访问的属性以字符串的形式放在```[]```中
```
console.log(person["name"]);
console.log(person.name);

//从功能上，两种访问对象属性的方法没有任何区别，但[]语法的主要优点是可以通过变量来访问属性
var propertyName = "name";
console.log(person[propertyName]);

//如果属性名中包含会导致语法错误的字符，或属性名使用的是关键字或保留字，也可以使用[]表示
person["first name"] = "yu";
```
通常，除非必须使用变量来访问属性，否则建议使用```.```表示法