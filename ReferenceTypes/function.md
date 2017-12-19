### Function类型

由于函数是对象，因此函数名实际上是一个指向函数对象的指针，不会与某个函数绑定，函数通常是使用函数声明语法定义的
``` 
//函数声明  解析器会率先读取函数声明，并使其在执行任何代码之前可用
function sum(num1,num2){
    return num1+num2;
}

//函数表达式  必须等到解析器执行到它所在的代码行，才会真正被解释执行
var sum = function(num1,num2){
    return num1+num2;
};
```

#### 没有重载
将函数名想象为指针，也有助于理解为什么ES中没有函数重载的概念。
``` 
function sum(num1,num2){
    return num1+num2;
}

function sum(num1,num2){
    return num1+num2+200;
}
var result = sum(20,20);//240
```
显然，声明了两个同名函数，而结果则是后面的覆盖了前面的函数

#### 作为值的函数
``` 
//不仅可以像传递参数一样把一个函数传递给另一个函数，而且可以将一个函数作为另一个函数的结果返回(ES中的函数名本身就是变量)
//要访问函数的指针 而不 执行函数的话，必须去掉函数名后面的那对圆括号
function callFunc(someFunction,someArgument){
    return someFunction(someArgument);
}
//可以从一个函数中返回另一个函数：例如，根据某个对象对数组进行排序［可以往前看看数组的知识点sort］
function callFunc(someArgument){
    return function(obj1,obj2){
        var val1 = obj1[someArgument];
        var val2 = obj2[someArgument];
        if(val1 < val2){
            return -1;
        }else if(val1 > val2){
            return 1;
        }else{
            return 0;
        }
    }
}
var data = [{name:"jill",age:18},{name:"vane",age:16}];
data.sort(callFunc("age"));//0: {name: "vane", age: 16}1: {name: "jill", age: 18}
```
#### 函数内部属性
在函数内部，有两个特殊属性：[arguments](https://github.com/JILL1231/Learning-notes/blob/master/ReferenceTypes/function.md) 和 [this](https://github.com/JILL1231/Learning-notes/blob/master/this/this.md)

#### 函数属性和方法
ES中的函数是对象，因此函数也有属性和方法。每个函数都包含两个属性：length 和 [prototype](https://github.com/JILL1231/Learning-notes/blob/master/oop/create.md)，对于ES中引用类型而言，prototype是保存它们所有实例方法的真正所在。

每个函数都包含两个非继承而来的方法：[apply() 和 call()](https://github.com/JILL1231/Learning-notes/blob/master/this/this.md)。这两个方法的用途都是在特定的作用域中调用函数，实际上等于设置函数体内this对象的值。它们真正强大的地方是能够扩充函数赖以运行的作用域
``` 
window.color = "red";
var o = {color:"blue"}

function sayColor(){
    alert(this.color);
}
sayColor();

sayColor.call(this);//red
sayColor.call(window);//red
sayColor.call(o);//blue
```
ES5还定义了一个方法：bind(),这个方法会创建一个函数，其this值会被绑定到传给bind()函数的值
``` 
window.color = "red";
var o = {color:"blue"}

function sayColor(){
    alert(this.color);
}

var objSayColor = sayColor.bind(o);
objSayColor();//blue

```