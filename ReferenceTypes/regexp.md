### RegExp 类型

ES通过RegExp类型来支持正则表达式

以字面量形式来定义正则表达式
```
var expression = /pattern /flags ;

//模式(pattern)部分可以是任何简单或复杂的正则表达式，可以包含字符类、限定符、分组、向前查找及反向引用

//每个正则表达式可带有一或多个标志(flags)，用于标明正则表达式的行为：
g:表示全局(global)模式
i:表示不区分大小写(case-insensitive)模式
m:表示多行(multiline)模式
```
使用RegExp构造函数创建
``` 
var expression = new RegExp(pattern[, flags]); 
//注意：RegExp()接收的两个参数都是字符串(不能把正则表达式字面量传递给RegExp构造函数)，因此在某些情况下要对字符串进行双重转义
```
因此，一个正则表达式就是一个模式与3个标志的组合体，不同的组合产生不同结果
``` 
var expression = /at/gi;  
var expression = new RegExp("at","gi");//，它接收两个参数：一个是匹配字符串模式，另一个是可选的标志字符串
```
与其他语言中的正则表达式类似，模式中使用的所有元字符都必须转义，正则表达式中的元字符包括
``` 
()[]{}\^$|?*+.
```
| 字面量模式  | 等价的字符串|
| ------------- | ------------- |
| /\[bc\]at/  | "\\[bc\\]at" |
| /\w\\hello\\123/ | "\\w\\\\hello\\\\123" |
``` 
var expression1 = /\[bc\]at/gi; 
var expression2 = new RegExp("\\[bc\\]at","gi");
```
#### RegExp实例属性
RegExp的每个实例都具有下列属性，通过这些属性可以取得有关模式的各种信息
```
global:布尔值，表示是否设置了g标志

ignoreCase:布尔值，表示是否设置了i标志

lastIndex:整数，表示开始搜索下一个匹配项的字符串位置，从0算起

multiline:布尔值，表示是否设置了m标志

source:正则表达式的字符串表示，按照字面量形式而非传入构造函数中的字符串模式返回
```
``` 
console.log(expression1.global); //true
console.log(expression1.ignoreCase); //true
console.log(expression1.lastIndex);  //0
console.log(expression1.multiline);  //false
console.log(expression1.source);   //\[bc\]at
console.log(expression2.source);   //\[bc\]at
//expression1和expression2的source属性是相同的，可见，source属性保存的是规范形式的字符串，即字面量形式所用的字符串。
//RegExp实例继承的toLocalString()和toString()方法都会返回正则表达式的字面量，而valueOf()方法返回正则表达式本身
```
#### RegExp实例方法

##### exec()

RegExp对象的主要方法是exec()，该方法是专门为捕获组而设计的。exec()接受一个参数，即要应用模式的字符串，然后返回包含第一个匹配项信息的数组；或者在没有匹配项的情况下返回null。返回的数组虽然是Array的实例，但包含两个额外的属性：index和input。

其中，index表示匹配项在字符串中的位置，而input表示应用正则表达式的字符串

在数组中，第一项是与整个模式匹配的字符串，其他项是与模式中的捕获组匹配的字符串（如果模式中没有捕获组，则该数组只包含一项）
``` 
var text = "i do not like cat,bat,sat...cat,bat,sat";
var pattern1 = /.at(,bat)?/g;
var pattern2 = /.at(,bat)?/;
//对于exec()方法而言，即使在模式中设置了全局标志(g)，它每次也只返回一个匹配项，若是多次调用exec()，则会在字符串中继续查找新匹配项，lastIndex的值在每次调用后都会增加
//在不设置全局标志的情况下，在同一个字符串多次调用exec()将始终返回第一个匹配项的信息

/**第一次调用pattern1**/
var matches1 = pattern1.exec(text);
console.log(matches1.index); //14
console.log(matches1.input); //i do not like cat,bat,sat...cat,bat,sat
console.log(matches1[0]); //cat,bat
console.log(matches1[1]); // ,bat (前面空格也匹配哦）
console.log(matches1[2]); // undefined
console.log(pattern1.lastIndex); //21 

/**第二次调用pattern1**/
var matches2 = pattern1.exec(text);
console.log(matches2.index); //22
console.log(matches2[0]); //sat
console.log(matches2[1]); //undefined
console.log(pattern1.lastIndex); //25 

/**第一次调用pattern2**/
var matches3 = pattern2.exec(text);
console.log(matches3.index); //14
console.log(matches3.input); //i do not like cat,bat,sat...cat,bat,sat
console.log(matches3[0]); //cat,bat
console.log(matches3[1]); // ,bat (前面空格也匹配哦）
console.log(matches3[2]); // undefined
console.log(pattern2.lastIndex); //0

/**第二次调用pattern2**/
var matches4 = pattern2.exec(text);
console.log(matches4.index); //14
console.log(matches4[0]); //cat,bat
console.log(matches4[1]); // ,bat (前面空格也匹配哦）
console.log(pattern2.lastIndex); //0 
```
##### test()
test()方法接收一个字符串参数。在模式与该模式匹配的情况下返回true，否则返回false，适用于只想知道目标字符串与某个模式是否匹配
``` 
var text = "000-00-0000";
var pattern = /\d{3}-\d{2}-\d{4}/;

if(pattern.test(text)){
    console.log("hahaha");
}
```
#### RegExp构造函数属性
RegExp构造函数包含一些属性，这些属性适用于作用域中的所有正则表达式，并且基于所执行的最近一次正则表达式操作而变化（Opera例外，不支持短属性名）
| 长属性名 | 短属性名  | 说明 |
| :------------ |:---------------:| -----:|
|  input       |  $_  |  最近一次要匹配的字符串|
|  lastMatch   |  $&  |  最近一次的匹配项|
|  lastParen   |  $+  |  最近一次匹配的捕获组  |
|  leftContext |  $`  |  input字符串中lastMatch之前的文本|
|  multiline   |  $*  |  布尔值，表示是否所有表达式都使用多行模式|
|  rightContext|  $'  |  input字符串中lastMatch之后的文本  |

``` 
var text = "this has been a short summer";
var pattern = /(.)hort/g;

if(pattern.test(text)){
    console.log(RegExp.input);        //this has been a short summer
    console.log(RegExp.lastMatch);    //short
    console.log(RegExp.lastParen);    //s
    console.log(RegExp.leftContext);  //this has been a 
    console.log(RegExp.multiline);    //false
    console.log(RegExp.rightContext); //summer
}
```