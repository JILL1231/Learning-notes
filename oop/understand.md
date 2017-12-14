### 理解对象
ECMA-262把对象定义为：“无序属性的集合，其属性可以包含基本值、对象或者函数。”严格来讲，这就相当于说对象是一组没有特定顺序的值。对象的每个属性或方法都有一个名字，而每个名字都映射到一个值。

我们可以把ECMAScript的对象想象成散列表：无非就是一组名值对，其中的值可以是数据或函数。

每个对象都是基于一个引用类型创建的，即创建自定义对象的最简单方式就是创建一个Object的实例，然后再为它添加属性和方法

早期的JavaScript开发人员使用这个模式创建新属性
```
//创建了一个名为person的对象，并为它添加了三个属性(name、age和job)和一个方法(sayName())
var person = new Object();      
person.name = "jill";
person.age = 18;
person.job = "software Engineer";

person.sayName = function () {
    alert(this.name);
}
```

几年后，对象字面量成为创建这种对象的首选模式。
```
var person = {
    name:"jill",
    age:18,
    job:"software Engineer",

    sayName:function () {
        alert(this.name);
    }
}
```
这些属性在创建时都带有一些特征值，JavaScript通过这些特征值来定义它们的行为
#### 属性类型
ECMA-262第5版在定义了只有内部才用的特性时，描述了属性的各种特征，这些特征是为了实现JavaScript引擎用的，因此在JavaScript中不能直接访问它们。

ECMAScript中有两种属性：数据属性和访问器属性

####1、数据属性
数据属性包含一个数据值的位置，这个位置可以读取和写入值，可通过对象直接定义的属性。数据属性有四个描述其行为的特性

| 特性 | 值  | 解析 |
| :---- |:----:| :----|
| configurable | true/false | 是否可以通过delete删除属性，能否修改属性的特性，能否把属性修改为访问器属性，默认true |
| enumerable |  true/false  |  是否可以通过for in循环返回，默认true |
| writable | true/false | 是否可以修改属性的值，默认true |
| value | undefined | 设置属性的值，默认undefined |

####2、访问器属性
访问器属性只能通过Object.defineProperty()方法来定义，不能通过对象直接定义，不能直接存储数据值。访问器属性有四个描述其行为的特性

| 特性 | 值  | 解析 |
| :---- |:----:| :----|
| configurable | true/false | 是否可以通过delete删除属性，能否修改属性的特性，能否把属性修改为访问器属性，默认true |
| enumerable |  true/false  |  是否可以通过for in循环返回，默认true|
| get | function | 读取属性值时调用的函数 |
| set | function | 修改属性值时调用的函数 |

####3、修改属性默认的特性
要修改属性默认的特性，必须使用ECMAScript5的Object.defineProperty()方法，这个方法接收三个参数：属性所在的对象、属性的名字和一个描述符对象（IE9+）

注意：当使用Obeject.defineProperty()定义对象属性时，同时指定了get/set和value/writable时，会报错
```
//数据属性
Object.defineProperty(person,'name',{
    configurable:false,//表示不能从对象中删除（修改）属性
    enumerable:false,//表示不能通过for in循环返回属性
    writable:false,//表示不能修改属性的值
    value:"jill"
});
//注意；可以多次调用object.defineProperty()方法修改同一个属性，但在把configurable特性设置为false之后就会受限制
```
当使用Object.defineProperty()来定义对象属性时，默认为访问器属性，但是如果指定了value或writable特性时，该属性被定义为数据属性
```
//访问器属性
var book = {
    _year:2016,
    edition:1
}
Object.defineProperty(book,'year',{
    get:function () {
        return this._year;
    },
    set:function (newValue) {
        if(newValue>2016){
            this._year = newValue;
            this.edition = newValue - 2016;
        }
    }
})
book.year=2017;
alert(book.edition);//1
```
修改多个属性默认的特性：object.definePropertues(),以上代码在book对外商定义了两个数据属性(_year和edition)和一个访问器属性(year),与下面定义的对象相同
```
Object.defineProperties(book,{
    _year:{
        value:2016
    },
    edition:{
        value:1
    },
    year:{
        get:function () {
            return this._year;
        },
        set:function (newValue) {
            if(newValue > 2016){
                this._year = newValue;
                this.edition = newValue -2016
            }
        }
    }
})
```

####4、读取属性的特性
要读取属性的特性，必须使用ECMAScript5的：Object.getOwnPropertyDescriptor()方法，这个方法接收两个参数：属性所在的对象和要读取其描述符的属性名称

```
//数据属性
var descriptor = Object.getOwnPropertyDescriptor(book,"_year");
alert(descriptor.value);//2016
alert(descriptor.configurable);//true
alert(typeof descriptor.get);//undefined
```

```
//访问器属性
var descriptor1 = Object.getOwnPropertyDescriptor(book,"year");
alert(descriptor1.value);//undefined
alert(descriptor1.configurable);//false
alert(typeof descriptor1.get);//function
```
