### 基本包装类型
为了便于操作基本类型值，ES提供了3个特殊的引用类型：Boolean、Number和String。实际上，每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从而让我们能够调用一些方法来操作这些数据。
``` 
var s1 = "some text";
var s2 = s1.substring(2);
```
我们知道，基本类型值不是对象，因而从逻辑上讲它们不应该有方法。其实，为了让我们实现这种直观的操作，后台已经自动完成了一系列的处理。当第二行代码访问S1时，访问过程处于一种读取模式，也就是要从内存中读取这个字符串的值。而在读取模式中访问字符串时，后台都会自动完成下列处理
```
创建String类型的一个实例－在实例上调用指定的方法－销毁这个实例
var s1 = new String("some text");
var s2 = s1.substring(2);
s1 = null;
```
##### 引用类型与基本包装类型的主要区别就是对象的生存期
使用new操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中

而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即销毁［意味着我们不能在运行时为基本类型值添加属性和方法］
``` 
var s1 = "some text";
s1.color = "red"; 
console.log(s1.color);//undefined  第二行创建的String对象在执行第三行代码时已经被销毁了。第三行代码又创建自己的String对象，而该对象没有color属性
```
对基本包装类型的实例调用typeOf会返回"object"，而且所有基本包装类型的对象都会被转换为布尔值true
``` 
var val = 25;

var obj1 = new Number(val);//构造函数
console.log(obj1 instanceof Number);//true
console.log(typeof obj1);//object

var obj2 = Number(val);//转型函数
console.log(obj2 instanceof Number);//false
console.log(typeof obj2);//number
```

#### Boolean类型
Boolean类型是布尔值对应的引用类型。要创建Boolean对象，可以像下面这样调用Boolean构造函数并传入true或false值［注意：布尔表达式中的所有对象都会被转换为true］
``` 
var referenceBoolean = new Boolean(false);//布尔表达式中的所有对象都会被转换为true
var result = referenceBoolean && true;
console.log(result);//true
```
Boolean类型的实例重写了valueOf(),返回基本类型值true和false;重写了toString()方法，返回字符串"true"和"false"
##### 基本类型与引用类型的布尔值的区别
``` 
var baseBoolean = false;
var referenceBoolean = new Boolean(false);

//typeof操作符对基本类型返回"boolean",而对引用类型返回"object"

console.log(typeof baseBoolean);       //boolean
console.log(typeof referenceBoolean);  //object

//由于Boolean对象是Boolean类型的实例，所以使用instanceof操作符测试Boolean对象会返回true，而测试基本类型的布尔值则返回false
console.log(baseBoolean instanceof Boolean);      //false
console.log(referenceBoolean instanceof Boolean); //true
```

#### Number类型
Number类型是与数字值对应的引用类型。要创建Number对象，可以在调用Number构造函数时向其中传递相应的数值
``` 
var referenceNumber = new Number(10);
```
Number类型的实例重写了valueOf(),返回基本类型值的数值;重写了toString(进制)、toLocalString()方法，返回字符串形式的数值

##### 除了继承的方法之外，Number类型还提供了一些用于将数值格式化为字符串的方法
###### toFixed()方法会按照指定的小数位返回数值的字符串表示,该方法接收一个参数，指定输出结果中的小数位数［适用处理货币值］
``` 
//toFixed()方法可以表示带有0-20个小数位的数值。有些浏览器也可能支持更多位数,但这是典型实现的范围
var num1 = 10;
var num2 = 10.005;

console.log(num1.toFixed(2));   //10.00   以0填补了必要的小数位
console.log(num2.toFixed(2));   //10.01   超出指定的小数位，四舍五入
```
###### toExponential()方法返回以指数表示法(也称e表示法)表示的数值的字符串形式,该方法接收一个参数，指定输出结果中的小数位数
``` 
var num1 = -100000.66;
var num2 = 10.005;

console.log(num1.toExponential(3)); //-1.000e+5
console.log(num2.toExponential(3)); //1.001e+1
```
###### toPrecision()方法会返回最合适的格式，可能返回固定大小格式，也可能返回指数格式，这个方法接收一个参数，即表示数值的所有数字的位数
``` 
//toPrecision()方法可以表示带有1-21个小数位的数值。有些浏览器也可能支持更多位数,但这是典型实现的范围
var num = 99;
console.log(num.toPrecision(1));//1e+2
console.log(num.toPrecision(2));//99
console.log(num.toPrecision(3));//99.0
```

#### String类型
String类型是字符串的对象包装类型，可以像下面这样使用String构造函数来创建
``` 
var referenceString = new String("this is reference String");
```
继承的valueOf()、toString()和toLocalString()方法，都返回对象所表示的基本字符串值

String类型提供了很多方法，用于辅助完成对ES中字符串的解析和操作

##### 1、字符方法
两个用于访问字符串中特定字符的方法是：charAt()和charCodeAt()。这两个方法都接收一个参数，即基于0的字符位置

###### charAt()方法以单字符串的形式返回给指定位置的那个字符
``` 
var str = "hello world";
console.log(str.charAt(2));//l
```
###### charCodeAt()方法以单字符编码的形式返回给指定位置的那个字符
``` 
var str = "hello world";
console.log(str.charCodeAt(2));//108
```

###### fromCharCode()方法接收一或多个字符编码，然后将它们转换成一个字符串。从本质上来看，这个方法与实例方法charCodeAt()执行的是相反的操作
``` 
console.log(String.fromCharCode(104,101,108,108,111));//"hello"
```
###### ES5还定义了另一个访问个别字符的方法。在支持此方法的浏览器中，可以使用方括号加数字索引来访问字符串中的特定字符
``` 
var str = "hello world";
console.log(str[2]);//l
```

##### 2、字符串操作方法
###### concat():用于将一或多个字符串拼接起来，返回拼接得到的新字符串
``` 
var str = "hello ";
var result = str.concat("world");
var result2 = str.concat("world","!");

console.log(result); //hello world
console.log(result2); //hello world!
console.log(str);    //hello 
```
###### slice(),substr()和substring()
ES还提供了三个基于字符串创建新字符串的方法:slice(),substr()和substring()。这三个方法都会返回被操作字符串的一个子字符串，而且也都接受一或两个参数，第一个参数指定字符串的开始位置，第二个参数(在指定的情况下)表示子字符串到哪里结束。具体来说，slice()和substring()的第二个参数指定的是子字符串最后一个字符后面的位置。而substr()的第二个参数指定的则是返回的字符个数。若没有传递第二个参数，则将字符串的长度作为结束位置
```  
var str = "hello world";

console.log(str.slice(3));      //lo world
console.log(str.substring(3));  //lo world
console.log(str.substr(3));     //lo world
console.log(str.slice(3,7));    //lo w
console.log(str.substring(3,7));//lo w
console.log(str.substr(3,7));   //lo worl
```
在传递给这些方法的参数是负值的情况下，它们的行为就不尽相同了。其中，slice()方法会将传入的负值与字符串长度相加，substr()方法将负的第一个参数加上字符串的长度，而将负的第二个参数转换为0；substring()方法会把所有负值参数都转换为0
```  
var str = "hello world";

console.log(str.slice(-3));      //"rld" (-3会被转换为8:11-3=8）则相当于slice(8)
console.log(str.substring(-3));  //"hello world" (-3被转换为0) 则相当于tostring(0)
console.log(str.substr(-3));     //"rld" (-3会被转换为8:11-3=8）则相当于tostr(8)
console.log(str.slice(3,-4));    //"lo w" (-4会被转换为7:11-4=7）则相当于slice(3,7)
console.log(str.substring(3,-4));//"hel"(-4会被转换为0）则相当于tostring(3,0)由于这个方法会将较小的数作为开始位置，较大的数作为结束位置，最终相当于tostring(0,3)
console.log(str.substr(3,-4));   //"" (-4会被转换为0）意味着返回包含0个字符的字符串，也就是一个空字符串
```
###### localeCompare()方法比较两个字符串，并返回下列值中的一个：
* 如果字符串在字母表中应该排在字符串参数之前，则返回一个负数[大多数情况是-1，具体的值要视实现而定]
* 如果字符串等于字符串参数，则返回0
* 如果字符串在字母表中应该排在字符串参数之后，则返回一个整数[大多数情况是1，具体的值要视实现而定]
``` 
function determineOrder(val){
    var str = "yellow";
    var result = str.localeCompare(val);
    if(result < 0){
        console.log("The string 'yellow'comes before the string '" + val + "'."); 
    }else if(result > 0){
        console.log("The string 'yellow'comes after the string '" + val + "'.");     
    }else{
        console.log("The string 'yellow'comes is equal to the string '" + val + "'.");     
    }
}
determineOrder("brick");
determineOrder("yellow");
determineOrder("zoo");
```
##### 3、字符串位置方法
有两个可以从字符串中查找子字符串的方法：indexOf()和lastIndexOf()。这两个方法都是从一个字符串中搜索给定的子字符串，然后返回子字符串的位置（若没找到，则返回-1）
``` 
var str = "hello world";
console.log(str.indexOf("o"));       //4
console.log(str.lastIndexOf("o"));   //7

console.log(str.indexOf("o",6));     //7  从位置6(字母"w")开始向后搜索
console.log(str.lastIndexOf("o",6)); //4 从位置6(字母"w")开始向前搜索
```

在使用第二个参数的情况下，可以通过循环调用indexOf()或lastIndexOf()来找到所有匹配的子字符串
``` 
var str = "lorem ishjecy fsffsf fsdffdf pkkjjj sffssf  mvcmvx";
var arr = new Array();
var pos = str.indexOf("f");

while(pos > -1){
    arr.push(pos);
    pos = str.indexOf("f",pos+1);
}
console.log(str);"lorem ishjecy fsffsf fsdffdf pkkjjj sffssf  mvcmvx"  不变
console.log(arr);//(11) [14, 16, 17, 19, 21, 24, 25, 27, 37, 38, 41]
```
##### 4、trim()方法
ES5 为所有字符定义了trim()方法，这个方法会创建一个字符串的副本，删除前置及后缀的所有空格，然后返回结果
``` 
var str = "    hello world     !    ";
var trimStr = str.trim();
//非标准，Firefox3.5+ Safari5+ Chrome8+支持
var trimLStr = str.trimLeft();
var trimRStr = str.trimRight();

console.log(str);         //"    hello world     !    "
console.log(trimStr);     //"hello world     !"
console.log(trimLStr);    //"hello world     !    "
console.log(trimRStr);    //"    hello world     !"
```

##### 5、字符串大小写转换方法
``` 
var str = "Hello World";

//toLowerCase()和toUpperCase()是两个经典的方法，借鉴子java.lang.String中的同名方法
console.log(str.toLowerCase());//hello world
console.log(str.toUpperCase());//HELLO WORLD
//toLocaleLowerCase()和toLocaleUpperCase()方法则是针对特定地区的实现，在不知道自己代码将在哪种语言环境中运行的情况下，使用针对地区的方法更稳妥［如少数语言：土耳其语等会为Unicode大小写转换应用特殊的规则，这时必须使用针对地区的方法］
console.log(str.toLocaleLowerCase());//hello world
console.log(str.toLocaleUpperCase());//HELLO WORLD
```
##### 6、字符串的模式匹配方法
String类型定义了几个用于在字符串中匹配模式的方法
###### match()，在字符串上调用这个方法，本质上与调用[RegExp的exec()方法](https://github.com/JILL1231/Learning-notes/blob/master/ReferenceTypes/regexp.md)相同,细节上不一样哦。match()方法只接受一个参数，要么是一个正则表达式，要么是一个RegExp()对象
``` 
var text = "i do not like cat,bat,sat...cat,bat,sat";
var pattern1 = /.at(,bat)?/g;
var pattern2 = /.at(,bat)?/;

//对于match()方法而言，即使在模式中设置了全局标志(g)，则属性index和input均为undefined，且始终依次返回匹配项的信息
//在不设置全局标志的情况下，在同一个字符串多次调用match()将始终返回第一个匹配项的信息

/**第一次调用pattern1**/
var matches1 = text.match(pattern1);
console.log(matches1.index); //undefined
console.log(matches1.input); //undefined
console.log(matches1[0]); //cat,bat
console.log(matches1[1]); //sat
console.log(matches1[2]); //cat,bat
console.log(pattern1.lastIndex); //0 

/**第二次调用pattern1**/
var matches2 = text.match(pattern1);
console.log(matches2.index); //undefined
console.log(matches2[0]); //cat,bat
console.log(matches2[1]); //sat
console.log(pattern1.lastIndex); //0

/**第一次调用pattern2**/
var matches3 = text.match(pattern2);
console.log(matches3.index); //14
console.log(matches3.input); //i do not like cat,bat,sat...cat,bat,sat
console.log(matches3[0]); //cat,bat
console.log(matches3[1]); // ,bat (前面空格也匹配哦）
console.log(matches3[2]); // undefined
console.log(pattern2.lastIndex); //0

/**第二次调用pattern2**/
var matches4 = text.match(pattern2);
console.log(matches4.index); //14
console.log(matches4[0]); //cat,bat
console.log(matches4[1]); // ,bat (前面空格也匹配哦）
console.log(pattern2.lastIndex); //0 
```

###### search()方法返回字符串中第一个匹配项的索引，如果没有匹配项，则返回-1，而且，search()方法始终从字符串开头向后查找模式。该方法只接受一个参数，要么是一个正则表达式，要么是一个RegExp()对象
``` 
var text = "i do not like cat,bat,sat...cat,bat,sat";
var pattern1 = /.at(,bat)?/g;
var pattern2 = /.at(,bat)?/;

var pos1 = text.search(pattern1);
var pos2 = text.search(pattern2);

console.log(pos1);//14
console.log(pos2);//14
```

###### replace()方法接收两个参数：第一个参数可以是一个RegExp对象或一个字符串[这个字符串不会被转换成正则表达式]，第二个参数可以是一个字符串或者一个函数。若第一个参数是字符串，那么只会替换第一个子字符串。要想替换所有的子字符串，唯一的办法就是提供一个正则表达式[指定全局g标志]
``` 
var text = "i do not like cat,bat,sat...cat,bat,sat";

var pos1 = text.replace("at","ond");   //只会替换第一个子字符串
var pos2 = text.replace(/at/g,"ond");  //替换所有的子字符串
var pos3 = text.replace(/(.at)/g,"word($1)");  //特殊的字符序列 $n、$nn：匹配第n、nn个捕获组的子字符串
//第二个参数是函数。
//在只有一个匹配项(与模式匹配的字符串)的情况下，会向这个函数传递3个参数：模式的匹配项、模式匹配项在字符串中的位置和原始字符串
//在正则表达式中定义了多个捕获组的情况下，传递给函数的参数依次是模式的匹配项、第一个捕获组的匹配项、第二个捕获组的匹配项...但最后两个参数仍然分别是模式匹配项在字符串中的位置和原始字符串
function htmlEscape(test){
    return test.replace(/[<>"&]/g,function(match,pos,originalText){
               switch(match){
                   case "<":
                       return "&lt;";
                   case ">":
                       return "&gt;";
                   case "&":
                       return "&amp;";
                   case "\"":
                       return "&quot;";
               }
           });
}

console.log(pos1);// "i do not like cond,bat,sat...cat,bat,sat" 
console.log(pos2);// "i do not like cond,bond,sond...cond,bond,sond" 
console.log(pos3);// "i do not like word(cat),word(bat),word(sat)...word(cat),word(bat),word(sat)"

console.log(htmlEscape("<p class=\"aa\">Hello World!</p>")); //&lt;p class=&quot;aa&quot;&gt;Hello World!&lt;/p&gt;
```
###### split()方法可以基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放在一个数组中，分隔符可以是字符串也可以是RegExp对象，该方法接受可选的第二个参数，用于指定数组的大小，以便确保返回的数组不会超过既定大小
``` 
var cloArr = "red,blue,green,yellow";
console.log(cloArr.split(","));     //(4) ["red", "blue", "green", "yellow"]
console.log(cloArr.split(",",2));   //(2) ["red", "blue"]
console.log(cloArr.split(/[^\,]+/));//(5) ["", ",", ",", ",", ""] 注意第一项和最后一项是两个空字符串，因为通过正则表达式指定的分隔符出现在了字符串的开头和末尾
```
