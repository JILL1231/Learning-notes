### 闭包

当函数可以记住并访问所在的词法作用域时,就产生了闭包,即使函数是在当前词法作用 域之外执行。

#### 最原始的闭包demo
最简单最原始的闭包demo，好让你在大脑里产生闭包的画面
``` 
function A(){

    function B(){

       console.log("Hello Closure!");

    }

    return B;

}

var c = A();

c();//Hello Closure!
```

简单分析一下它和普通函数有什么不同，上面代码翻译成自然语言如下：

* 定义了一个普通函数A

* 在A中定义了普通函数B

* 在A中返回B（确切的讲，在A中返回B的引用）

* 执行A(),把A的返回结果赋值给变量 c

* 执行 c()

把这5步操作总结成一句扯淡的话就是：函数A的内部函数B被函数A外的一个变量 c 引用

把这句扯淡的话再加工一下就变成了闭包的定义：当一个内部函数被其外部函数之外的变量引用时，就形成了一个闭包。

#### 现在我懂了
前面的代码是最原始的，有点死板，现在让我们来搞懂这个事实

``` 
function wait(message) {
    setTimeout( function timer() {
        console.log( message );
}, 1000 ); }
wait( "Hello, closure!" );
```
将一个内部函数(名为 timer)传递给 setTimeout(..)。timer 具有涵盖 wait(..) 作用域的闭包,因此还保有对变量message的引用。wait(..) 执行 1000毫秒后,它的内部作用域并不会消失,timer 函数依然保有 wait(..)作用域的闭包。

深入到引擎的内部原理中,内置的工具函数 setTimeout(..) 持有对一个参数的引用,这个 参数也许叫作 fn 或者 func,或者其他类似的名字。引擎会调用这个函数,在例子中就是 内部的 timer 函数,而词法作用域在这个过程中保持完整。

本质上无论何时何地,如果将函数(访问它们各自的词法作用域)当作第一 级的值类型并到处传递,你就会看到闭包在这些函数中的应用。在定时器、事件监听器、 Ajax请求、跨窗口通信、Web Workers或者任何其他的异步(或者同步)任务中,只要使 用了回调函数,实际上就是在使用闭包!

#### 循环和闭包
要说明闭包,for 循环是最常见的例子。
``` 
for (var i=1; i<=5; i++) { 
    setTimeout( function timer() {
        console.log( i );
    }, i*1000 );
}
```
正常情况下,我们对这段代码行为的预期是分别输出数字 1~5,每秒一次,每次一个。

但实际上,这段代码在运行时会以每秒一次的频率输出五次 6。

这是为什么?

缺陷是我们试图假设循环中的每个迭代在运行时都会给自己“捕获”一个i的副本。但是根据作用域的工作原理,实际情况是尽管循环中的五个函数是在各个迭代中分别定义的,但是它们都被封闭在一个共享的全局作用域中,因此实际上只有一个 i。

这样说的话,当然所有函数共享一个i的引用。循环结构让我们误以为背后还有更复杂的机制在起作用,但实际上没有。如果将延迟函数的回调重复定义五次,完全不使用循环,那它同这段代码是完全等价的。

下面回到正题。缺陷是什么?我们需要更多的闭包作用域,特别是在循环的过程中每个迭代都需要一个闭包作用域。
``` 
for (var i=1; i<=5; i++) { 
(function(j) {
    setTimeout( function timer() { console.log( j );}, j*1000 );
    })( i );
}
```
在迭代内使用 IIFE 会为每个迭代都生成一个新的作用域,使得延迟函数的回调可以将新的作用域封闭在每个迭代内部,每个迭代中都会含有一个具有正确值的变量供我们访问。