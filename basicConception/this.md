### this 
——学习《你不知道的Javascript》笔记

this是在运行时进行绑定的,并不是在编写时绑定,它的上下文取决于函数调用时的各种条件。

this的绑定和函数声明的位置没有任何关系,只取决于函数的调用方式。 

当一个函数被调用时,会创建一个活动记录(有时候也称为执行上下文)。这个记录会包含函数在哪里被调用(调用栈)、函数的调用方法、传入的参数等信息。this就是记录的其中一个属性,会在函数执行的过程中用到。

#### 判断this
1、找到调用位置

这里有一个微妙但是非常重要的细节,虽然this的绑定规则完全取决于调用位置,但是在严格模式下与调用位置无关

2、应用下面四条规则进行判断，优先级依次：new绑定 > 显式绑定 > 隐式绑定 > 默认绑定

1）函数是否在new中调用(new绑定)?如果是的话this绑定的是新创建的对象。 var bar = new foo()

2）函数是否通过call、apply(显式绑定)或者硬绑定调用?如果是的话,this绑定的是 指定的对象。 var bar = foo.call(obj2)

3）函数是否在某个上下文对象中调用(隐式绑定)?如果是的话,this绑定的是那个上 下文对象。 var bar = obj1.foo()

4）如果都不是的话,使用默认绑定。如果在严格模式下,就绑定到undefined,否则绑定到 全局对象。 var bar = foo()

####实例
1）new绑定

```
function fn(a){
    this.a = a;
}

var bar = new fn(2);
console.log(bar.a);//2
//使用new来调用函数，或者说发生构造函数调用时，会自动执行下面的操作
//创建一个全新的对象
//这个新对象会被执行[[原型]]连接并绑定到函数调用的this
//如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象
```

2）显式绑定
```
function fn(){
    console.log(this.a);
}

var bar = {
    a:2
}

fn.call(bar); //2
//通过fn.call(..)，我们可以调用fn时强制把它的this绑定到bar上。［从this绑定的角度来说，call(..)和apply(..)是一样的，区别体现在其它的参数上］

------
硬绑定 ——解决回调丢失绑定问题

function fn(){
    console.log(this.a);
}

var bar = {
    a:2
}

var foo = function(){
    fn.call(bar);  //强制把fn的this绑定到了bar
}
    
foo(); //2

//硬绑定的foo不可以再修改它的this
foo.call(window);//2

//
    
```
3）隐式绑定
```
function fn(){
    console.log(this.a);
}
var obj = {
    a:2,
    fn:fn
}
obj.fn();//2

//当fn()被调用时，它的落脚点指向obj对象。当函数引用有上下文对象时，隐式绑定规则会把函数调用中的this绑定到这个上下文对象。因为调用fn()时this被绑定到obj，因此this.a和obj.a是一样的
```
4）默认绑定
```
//非严格模式
function fn(){
    console.log( this.a );
}
var a = 2;
fn(); //2
//fn()是直接使用不带任何修饰的函数引用进行调用的，因此只能使用默认绑定，因此this指向全局对象，如果是严格模式，那么全局对象无法使用默认绑定，因此this会绑定到undefined

```


