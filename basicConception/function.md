### 函数
ES中的函数使用function关键字来声明，后跟一组参数以及函数体
```
function functionName(arg0,arg1...,argN){
    statements
}    
```
#### return 
ES中的函数在定义时不必指定是否返回值。实际上，任何函数在任何时候都可以通过return语句后跟要返回的值来实现返回值
```
function sum(num1,num2){
    return num1+num2; //这个函数会在执行return语句之后停止并立即退出
    console.log("hello world");//永远不会执行
}
```
另外，return语句也可以不带有任何返回值。在这种情况下，函数在停止执行后将返回undefined值。

```
function sayHi(name){
    return;
}
```
严格模式对函数有一些限制

```
不能把函数、参数命名为eval或arguments
不能出现两个命名参数同名的情况
```
#### 理解参数
在函数体内可以通过arguments对象来访问这个参数数组，从而获取传递给函数的每一个参数。其实，arguments对象只是与数组类似（它并不是Array的实例），因为可以使用方括号语法访问它的每一个元素(arguments[i])，使用length属性来确认传递进来多少个参数
```
function sum(num1,num2){
    if(arguments.length == 1){ //通过访问arguments对象的length属性可以获知有多少个参数传递给了函数
        return arguments[0]+10; //没有传递值的命名参数将自动被赋予undefined值，这就跟定义了变量但没有初始化一样
    }else if{
        return arguments[0]+num2;//arguments对象可以与命名参数一起使用
    }else{
        return arguments[1];//arguments的值永远与对应命名参数的值保持同步
    }
    
}
```

#### 没有重载
如果在ES中定义了两个名字相同的函数，则该名字只属于后定义的函数

```
function sayHi(name){
    return name;
}

function sayHi(name){
    return ("hello"+name);
}

sayHi("jill"); //"hellojill" 

```
#### 小结
```
1、无须指定函数的返回值，因为任何ES函数都可以在任何时候返回任何值
2、实际上，为制定返回值的函数返回的是一个特殊的undefined值
3、ES中也没有函数签名的概念，因为其函数参数是以一个包含零或多个值的数组形式传递的
4、可以向ES函数传递任意数量的参数，并且可以通过arguments对象来访问这些参数
5、由于不存在函数签名的特性，ES函数不能重载
```