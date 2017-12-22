### 单体内置对象
ECMA-262对内置对象的定义是："由ES实现提供的、不依赖于宿主环境的对象，这些对象在ES程序执行之前就已经存在"。前面我们介绍了大多数内置对象，如Object、Array和String。ECMA-262还定义了两个单体内置对象:Global和Math

#### Global对象
不属于任何其他对象的属性和方法，最终都是Global对象的属性和方法，诸如isNaN()、isFinite()、parseInt()及parseFloat()，实际上全都是Global对象的方法。除此之外，Global对象还包含其他一些方法

##### 1、URI(Uniform Resource Identifiers，通用资源标识符)编码方法
Global对象的encodeURI()和encodeURIComponent()方法可以对URI进行编码，以便发送给浏览器。有效的URI中不能包含某些字符，如空格。而这两个URI编码方法就可以对URI进行编码，用特殊的UTF-8编码替换所有无效的字符，从而让浏览器能够接受和理解
``` 
var uri = "https://github.com/JILL1231 start#project";

//encodeURI()主要用于整个URI
var eUri = encodeURI(uri);[如：https://github.com/JILL1231 start#project]
//encodeURIComponent()主要用于对URI中的某一段进行编码[如：JILL1231 start#project]
var ecUri = encodeURIComponent(uri);

//它们的主要区别：
//encodeURI()不会对本身属于URI的特殊字符进行编码，例如冒号、正斜杆、问好和井字号
//encodeURIComponent()则会对它发现的任何非标准字符进行编码
//这也正是 可以对整个URI使用encodeURI()，而只能对附加在现有URI后面的字符串使用encodeURIComponent()的原因所在

console.log(eUri);  //https://github.com/JILL1231%20start#project
console.log(ecUri); //https%3A%2F%2Fgithub.com%2FJILL1231%20start%23project
```
与encodeURI()和encodeURIComponent()方法对应的两个方法分别是decodeURI()和decodeURIComponent()
``` 
var uri = "https%3A%2F%2Fgithub.com%2FJILL1231%20start%23project";

//decodeURI()只能对encodeURI()替换的字符进行解码
var deuri = decodeURI(uri);
//decodeURIComponent()能够解码使用encodeURIComponent()编码的所有字符，即它可以解码任何特殊字符的编码
var decuri = decodeURIComponent(uri);

console.log(deuri);  //https%3A%2F%2Fgithub.com%2FJILL1231 start%23project
console.log(decuri); //https://github.com/JILL1231 start#project
```

##### 2、Global对象的属性
* 特殊的值：undefined、NaN及Infinity都是Global对象的属性，ES5明确禁止给undefined、NaN及Infinity赋值[非严格模式也报错]
* 所有原生引用类型的构造函数，如：`Object Array Function Boolean String Number Date RegExp Error EvalError RangeError ReferenceError SyntaxError TypeError URIError`

##### 3、window对象
ES虽然没有指出如何直接访问Global对象，但Web浏览器都是将这个全局对象作为window对象的一部分加以实现的。因此，在全局作用域中声明的所有变量和函数，就都成为了window对象的属性
``` 
var col = "red";

function sayColor(){
    console.log(window.col);
}
window.sayColor();//"red"
```
JS中的window对象除了扮演ES规定的Global对象的角色之外，[还承担了很多别的任务](https://github.com/JILL1231/Learning-notes/blob/master/bom/window.md)

#### Math对象
ES为保存数学公式和信息提供了一个公共位置，即Math对象
##### 1、Math对象的属性

| 属性  | 说明 |
| ------------- | ------------- |
|  Math.E        | 自然对数的底数，即常量e的值  |
|  Math.LN10     | 10的自然对数               |
|  Math.LN2      | 2的自然对数                |
|  Math.LOG2E    | 以2为底e的对数             |
|  Math.LOG10E   | 以10为底e的对数            |
|  Math.PI       | Л的值                     |
|  Math.SQRT1_2  | 1/2的平方根                |
|  Math.SQRT2    | 2的平方根                  |

##### 2、min()和max()方法
min()和max()方法用于确定一组数值中的最小值和最大值。这两个方法都可以接收任意多个数值参数
``` 
var max = Math.max(3,45,33,88);
var min = Math.min(3,45,33,88);

console.log(max);//88
console.log(min);//3
```
要找到数组中的最大或最小值，可以使用apply()方法
``` 
var val = [2,43,54,65,76,87,98];
var max = Math.max.apply(Math,val);//把Math对象作为apply()方法的第一个参数，从而正确地设置了this的值，可以将任何数组作为第二个参数

var min = val.sort()[0];//还可以用之前的方法哈

console.log(max);//98
console.log(min);//2
```
##### 3、舍入方法
* Math.ceil()：执行向上舍入，即它总是将数值向上舍入为最接近的整数
* Math.floor()：执行向下舍入，即它总是将数值向下舍入为最接近的整数
* Math.round()：执行标准舍入，即它总是将数值四舍五入为最接近的整数
``` 
console.log(Math.ceil(25.9));//26
console.log(Math.ceil(25.5));//26
console.log(Math.ceil(25.1));//26

console.log(Math.round(25.9));//26
console.log(Math.round(25.5));//26
console.log(Math.round(25.1));//25

console.log(Math.floor(25.9));//25
console.log(Math.floor(25.5));//25
console.log(Math.floor(25.1));//25
```

##### 4、random()方法
random()方法返回大于等于0小于1的一个随机数
``` 
值 = Math.floor(Math.random() * 可能值的总数 + 第一个可能的值)
```
因为Math.random()总返回一个小数值，因此公式用 Math.floor()方法
多数情况下，其实都可以通过一个函数来计算可能值的总数和第一个可能的值
``` 
function selectFrom(lowerValue,upperValue){
    var choices = upperValue - lowerValue + 1;
    return Math.floor(Math.random() * choices + lowerValue);
}
var num = selectFrom(2,10);
console.log(num);//[2-10]的一个数

//从数组随机取出一项
var arr = ["aa","bb","cc","dd","ee","ff"];
var str = arr[selectFrom(0,arr.length-1)];
console.log(str);
```
##### 5、[其他方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)
