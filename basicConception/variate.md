### 变量
ES变量可能包含两种不同数据类型的值：基本类型值和引用类型值

#### 动态的属性
基本类型值：如：5种基本数据类型是按值访问的，因为可以操作保存在变量中的实际的值

引用类型值：是保存在内存中的对象，可以为其添加属性和办法

```
//基本类型值
var people = "jill";
people.age = 18;
console.log(people.age);//undefined

//引用类型值
var people = new Object();
people.age = 18;
console.log(people.age);//18
```

#### 复制变量值
基本类型值：会在变量对象上创建一个新值，然后把该值复制到为新变量分配的位置上,此后，这两个变量可以参与任何操作而不会相互影响

引用类型：同样会将存储在变量对象中的值复制一份放到为新变量分配的空间中。不同的是，这个值的副本实际上是一个指针，而这个指针指向存储在堆栈中的一个对象。因此，改变其中一个变量，就会影响另一个变量

[图解](https://static.oschina.net/uploads/img/201712/08164632_RGZY.jpg)
![复制变量值](https://static.oschina.net/uploads/img/201712/08164632_RGZY.jpg "复制变量值")

#### 传递参数
ES中所有函数的参数都是按值传递的（访问变量有按值和按引用两种方式，而参数只能按值传递）

```
function setName(obj){
    obj.name = "jill";
    obj = new Object();
    obj.name = "vane";
}
var people = new Object();
setName(people);
console.log(people.name);//jill
//如果people是按引用传递的，那么people就会自动被修改指向其name属性设置为"vane"，但是，当接下来访问people.name时，显示的值仍然是"jill"
//这说明即使在函数内部修改了参数的值，但原始的引用仍然保持未变。实际上，当在函数内部重写obj时，这个变量引用就是一个局部对象了。而这个局部对象会在函数执行完毕后立即被撤销
```
#### 检测类型

基本类型：typeof

引用类型：instanceof

注意：

使用typeof操作符检测正则表达式时，[IE和Firefox]返回"object"，[Safair5及之前版本和Chrome7及之前版本]返回"function"(由于ECMA-262规定任何在内部实现[[Call]]方法的对象都应该在应用typeof操作符时返回"function")

##### 小结
基本类型值和引用类型值具有以下特点：

1、基本类型值在内存中占据固定大小的空间，因此被保存在栈内存中

2、引用类型的值是对象，保存在堆内存中
##### 扩展 栈内存、堆内存
为了更好的搞懂栈内存与堆内存，我们可以结合以下例子与图解进行理解。
```
var a1 = 0;   // 栈 
var a2 = 'this is string'; // 栈
var a3 = null; // 栈

var b = { m: 20 }; // 变量b存在于栈中，{m: 20} 作为对象存在于堆内存中
var c = [1, 2, 3]; // 变量c存在于栈中，[1, 2, 3] 作为对象存在于堆内存中
```
![栈内存、堆内存](https://user-gold-cdn.xitu.io/2017/2/9/7c13147ecfecd8a6ce7f0b5a9782dd30?imageView2/0/w/1280/h/960/format/webp/ignore-error/1 "栈内存、堆内存")

3、从一个变量向另一个变量复制基本类型的值，会创建这个值的一个副本

4、从一个变量向另一个变量复制引用类型的值，复制的其实是指针，因此两个变量最终都指向同一个对象

5、包含引用类型值的变量实际上包含的并不是对象本身，而是一个指向该对象的指针

6、确定一个值是哪种基本类型可以使用typeof操作符，而确定一个值是哪种引用类型可以使用instanceof操作符