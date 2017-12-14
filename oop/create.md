## 创建对象

回顾前面我们谈到通过object构造函数创建单个对象
```
// 创建一个object的实例，然后再为它添加属性和方法
var person = new Object();
person.name = "jill";
person.age = 18;
person.job = "software Engineer";

person.sayName = function () {
    alert(this.name);
}
```            
通过对象字面量创建单个对象
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
通过object构造函数或对象字面量创建单个对象的方式有个缺点：**使用同一个接口创建很多对象，会产生大量的重复代码**

### 工厂模式
**解决了创建多个相似对象的问题**
```
function createPerson(name,age,job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;

    o.sayName = function () {
        alert(this.name);
    }

    return o;
}
var person1 = createPerson('jill',18,'software');
var person2 = createPerson('vane',23,'student');
```
工厂模式虽然解决了创建多个相似对象的问题，但却没有解决**对象识别的问题（即怎样知道一个对象的类型）**



### 构造函数模式
**解决了对象识别的问题，可用来创建特定类型的对象**

与工厂模式不同之处：没有显式的创建对象，直接将属性和方法赋给了this对象，没有return语句；创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型
```
function Person(name,age,job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
        alert(this.name);
    }
}
//创建一个新对象－》将构造函数的作用域赋给新对象－》执行构造函数中的代码－》返回新对象
var person3 = new Person('jill',18,'software');
var person4 = new Person('vane',23,'student');

alert(person3 instanceof Object);//true
alert(person3 instanceof Person);//true
```
构造函数的问题：**每个方法都要在每个实例上重新创建一遍，即会导致不同的作用域链和标识符解析，但是创建的function新实例的机制仍然是相同的**。因此，不同实例上的同名函数是不想等的
```
 alert(person3.sayName === person4.sayName);//false
```


###原型模式
**实例中的指针仅指向原型，而不指向构造函数**
```
function Person() {}
Person.prototype.name = "jill";
Person.prototype.age = 18;
Person.prototype.job = "software";
Person.prototype.sayName = function () {
     alert(this.name);
}
var person5 = new Person();
person5.sayName();
var person6 = new Person();
person6.sayName();
 alert(person5.sayName === person6.sayName);//true
```
更简单的原型语法
```
function Person() {
}
Person.prototype = {
    //确保了通过该属性能够访问到适当的值,同时这种方式重设constructor属性会导致它的[[Enumerable]]特性被设置为true
    constructor: Person, 
    name: "jill",
    age: 18,
    job: "software",
    sayName: function () {
        alert(this.name);
    }
}
```
#### 原型的动态性
```
var person7 = new Person();
Person.prototype.sayHi = function () {
    alert('hi');
}
person7.sayHi();//hi
```
尽管可以随时为原型对象添加属性和方法，并且修改能够立即在所有对象实例中反映出来，但如果是修改整个原型对象，情况就不一样了
```
function Person() {};

var person8 = new Person();

Person.prototype = {
    constructor : Person,
    name:"jill",
    age:18,
    job:"software",
    sayName:function () {
        alert(this.name);
    }
}
person8.sayName();//error
```
重写原型对象切断了现有原型与任何之前已经存在的对象实例之间的联系，它们引用的仍然是最初的原型

#### 原型补充
| 方法   | 作用   |
| --- | --- | 
| isPrototypeOf() | 确认对象之间的原型关系 |
| Object.getPrototypeOf()| 取得一个对象的原型|
| hasOwnProperty()| 检测一个属性是存在于实例中(true)，还是存在于原型中(false)|
| Object.keys()| 接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组|
| Object.getOwnPropertyNames()| 取得对象上所有可枚举的实例属性|


原型对象的问题：原型中的所有属性是被很多实例共享的，这种共享对于函数非常合适，然而**对于包含引用类型值的属性来说，问题就比较突出**                               
                                                                                                           


### 组合使用构造函数模式和原型模式

**构造函数模式用于定义实例属性，而原型模式用于定义方法和共享属性**
```
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["vane", "jill"];
}
Person.prototype = {
    constructor: Person,
    sayName: function () {
        alert(this.name);
    }
}

var person9 = new Person("xiaoming", 12, "student");
var person10 = new Person("xiaohong", 32, "doctor");

person9.friends.push('xiaogang');

alert(person9.friends);//xiaoming,xiaohong,xiaogang
alert(person10.friends);//xiaoming,xiaohong
alert(person9.friends === person10.friends);//false
alert(person9.sayName === person10.sayName);//true
```
通过组合使用构造函数模式和原型模式的方式，构造函数模式用于定义实例属性，而原型模式用于定义方法和共享属性，完美的解决了上述问题，但是追求完美的开发者，觉得这样的写法很怪，得优化


### 动态原型模式
通过检查某个应该存在的方法是否有效，来决定是否需要初始化原型
```
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["vane", "jill"];

    //    方法
    if (typeof this.sayName != "function") {
        //使用动态原型模式时，不能使用对象字面量重写原型。如果在已经创建了实例的情况下重写原型，那么就会切断现有实例与新原型之间的联系
        Person.prototype.sayName = function () {
            alert(this.name);
        }
    }
}
```

### 寄生构造函数模式
基本思想：创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后在返回创建对象。从表面看，这个函数又很像典型的构造函数
```
function Person(name,age,job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function () {
        alert(this.name);
    }
    return o;
}
 var person11 = new Person("jill",18,"software");
person11.sayName();//jill
```
这个函数可以在特殊的情况下用来为对象创建构造函数。假设我们想创建一个具有额外方法的特殊数组。由于不能直接修改Array构造函数，因此可以使用这模式
```
function SpecialArray() {
    var values = new Array();
    values.push.apply(values, arguments);
    values.toPipedString = function () {
        return this.join('|');
    }
    return values;
}

var colors = new SpecialArray("red", "blue", "green");
alert(colors.toPipedString());//"red | blue | green"
```
寄生构造函数模式存在问题：**返回的对象与构造函数或者与构造函数的原型之间没有关系；也就是说，构造函数返回的对象与在构造函数外部创建的对象没什么不同**



### 稳妥构造函数模式
所谓稳妥对象，指的是没有公共属性，而且其方法也不引用this的对象。稳妥对象最适合在一些安全的环境中（这些环境会禁止使用this和new），或者在防止数据被其他应用程序改动时使用

与寄生构造函数不同之处：1、新创建对象的实例方法不引用this；2、不使用new操作符调用构造函数
```
function Person(name, age, job) {
    var o = new Object();
    //可以在这里定义私有变量和函数
    o.sayName = function () {
        alert(name);
    }
    return o;
}
var person12 = Person("jill");
person12.sayName();//jill
```
变量person12中保存的是一个稳妥对象，而除了调用sayName()方法外，没有别的方式可以访问其数据成员。即使有其他代码会给这个对象添加方法或数据成员，但也不可能有别的办法访问传入到构造函数中的原始数据

与寄生构造函数类似，使用稳妥构造函数模式创建的对象与构造函数之间也没有什么关系，因此instanceof操作符对这种对象也没有意义

