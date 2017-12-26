许多oo语言都支持两种继承方式：接口继承和实现继承。接口继承只继承方法签名，而实现继承则继承实际的方法。由于函数没有签名，在ECMAScript中无法实现接口继承，只支持实现继承，其 实现继承主要是依靠原型链来实现的。

### 原型链
**基本思想：利用原型让一个引用类型继承另一个引用类型的属性和方法**

简单回顾一下 [构造函数 、 原型 和 实例的关系](https://my.oschina.net/jill1231/blog/1186729)：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针

```
function SuperType() {
    this.prototype = true;
}
SuperType.prototype.getSuperValue = function () {
    return this.prototype;
}

function SubType() {
    this.subprototype = false;
}

//继承
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function () {
    return this.subprototype;
}

var instance = new SubType();
alert(instance.getSuperValue());//true
```


这个例子中的实例以及构造函数和原型之间的关系如下图
![实例以及构造函数和原型之间的关系](https://static.oschina.net/uploads/img/201707/19101017_Y2NN.jpg)


所有函数的默认原型都是Object的实例，因此默认原型都会包含一个内部指针，指向Object.prototype。注意，我们没有使用SubType默认提供的原型，而是给它换了一个新原型，这个新原型就是SuperType的实例，因此，这个新原型不仅具有作为一个SuperType的实例所拥有的全部属性和方法，而且其内部还有一个指针，指向了SuperType的原型。

instance指向SubType的原型，SubType的原型又指向SuperType的原型。getSuperValue()方法仍然还在SuperType.prototype 中，但property则位于SubType.prototype 中。这是因为property是一个实例属性，而getSuperValue()则是一个原型方法。
#### 确定原型和实例的关系
1、使用 instanceof 操作符来测试 实例 与 原型链中出现过的构造函数，结果就会返回true
```
alert(instance instanceof Object);//true
alert(instance instanceof SuperType);//true
alert(insance instanceof subType);//true
```
2、使用isPrototypeOf()方法，只要是原型链中出现过的原型，都可以说是该原型链所派生的实例的原型，因此该方法也会返回true
```
alert(Object.prototype.isPrototypeOf(instance));//true
alert(SuperType.prototype.isPrototypeOf(instance));//true
alert(subType.prototype.isPrototypeOf(instance));//true
```

#### 谨慎的定义方法
1、给原型添加方法的代码一定要放在替换原型的语句之后,如下

```
//错误写法 错误写法 错误写法
function SuperType2() {
    this.prototype = true;
}
SuperType2.prototype.getSuperValue = function () {
    return this.prototype;
}

function SubType2() {
    this.subprototype = false;
}
// ＝＝＝＝＝重写超类型中的方法＝＝＝＝＝
SubType2.prototype.getSuperValue = function () {
    return false;
}
//添加新方法
SubType2.prototype.getSubValue = function () {
    return this.subprototype;
}
//继承 
SubType2.prototype = new SuperType2();
//现在prototype被覆盖了，之前定义的getSubValue等方法都没了

var instance2 = new SubType2();
var instance21 = new SuperType2();
alert(instance2.getSuperValue());//true
alert(instance21.getSuperValue());//true
```
**必须在用SuperType2的实例替换原型之后，再定义这两个方法**
```
function SuperType1() {
    this.prototype = true;
}
SuperType1.prototype.getSuperValue = function () {
    return this.prototype;
}

function SubType1() {
    this.subprototype = false;
}

//继承  
SubType1.prototype = new SuperType1();
//添加新方法
SubType1.prototype.getSubValue = function () {
    return this.subprototype;
}
// 重写超类型中的方法
SubType1.prototype.getSuperValue = function () {
    return false;
}

var instance1 = new SubType1();
var instance12 = new SuperType1();
alert(instance1.getSuperValue());//false
alert(instance12.getSuperValue());//true
```
2、通过原型实现继承时，不能使用对象字面量创建原型的方法，因为这样做就会重写原型链
```
function SuperType3() {
    this.prototype = true;
}
SuperType3.prototype.getSuperValue = function () {
    return this.prototype;
}

function SubType3() {
    this.subprototype = false;
}

//继承
SubType3.prototype = new SuperType3();
//使用字面量添加新方法，会导致上一行代码无效
SubType3.prototype = {
    getSubValue:function () {
        return this.subprototype;
    },
    getSuperValue:function () {
        return false;
    }
}
var instance1 = new SubType3();
alert(instance3.getSuperValue());//error
```
分析：刚把SuperType3的实例赋值给原型，紧接着又将原型替换成一个对象字面量而导致的问题——现在的原型包含的是一个object的实例，而非SuperType3的实例

**原型链的问题**

1、包含引用类型值的原型

2、在创建子类型的实例时，不能向超类型的构造函数中传递参数，即没有办法在 不影响所有对象实例的情况下，给超类型的构造函数传递参数

 

### 借用构造函数  
**基本思想：在子类型的构造函数内部调用超类型构造函数。别忘了，函数只不过是在特定环境中执行代码的对象，因此通过apply()和call()方法也可以在（将来）新创建的对象上执行构造函数**
```
function SuperType4() {
    this.colors = ["red","green","blue"];
}
function SubType4() {
    //继承
    SuperType4.call(this);
}
var instance4 = new SubType4();
instance4.colors.push("black");
alert(instance4.colors);//"red,green,blue,black"
var instance5 = new SubType4();
alert(instance5.colors);//"red,green,blue"
```
传递参数
```
function SuperType5(name) {
    this.name = name;
}
function SubType5(age) {
    SuperType5.call(this,"jill");
    this.age = age;
}
var instance5 = new SubType5(18);
alert(instance5.name);//jill
alert(instance5.age);//18
```
**借用构造函数的问题**

方法都在构造函数中定义因此函数复用就无从谈起了，而且，在超类型的原型中定义的方法，对子类型而言也是不可见的，结果所有类型都只能使用构造函数模式

 

### 组合继承  ——也叫伪经典继承
**思路：使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承，这样，即通过在原型上定义方法实现了函数复用，又能保证每个实例都有它自己的属性**
```
function SuperType6(name) {
    this.name = name;
    this.colors = ["blue","red"];
}
SuperType6.prototype.sayName = function () {
    alert(this.name);
}

function SubType6(name,age) {
    SuperType6.call(this,name);                       //第二次调用SuperType6()
    this.age = age;
}

SubType6.prototype = new SuperType6();                //第一次调用SuperType6()
SubType6.prototype.constructor = SubType6;
SubType6.prototype.sayAge = function () {
    alert(this.age);
}

var instance6 = new SubType6("jill",18);
instance6.colors.push("yellow");
alert(instance6.colors);//blue,red,yellow
instance6.sayName();//jill
instance6.sayAge();//18

var instance7 = new SubType6("vane",22);
alert(instance7.colors);//blue,red
instance7.sayName();//vane
instance7.sayAge();//22

//instanceof()和isPrototypeOf()也能够用于识别基于组合继承创建的对象
```
**组合继承的问题**

无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部

 

 ### 原型式继承
**借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型**

利用空对象作为中介。F是空对象，所以几乎不占内存。
```
function object(o) { //从本质讲，object()对传入其中的对象执行了一次浅复制
    function F() {}  //创建一个临时性的构造函数
    F.prototype = o; //将传入的对象作为这个构造函数的原型
    return new F();  //返回这个临时类型的新实例
}

var person = {
    name:"jill",
    friends:["vane","vicent"]
};

var person1 = object(person);
person1.name = "greg";
person1.friends.push("rob");

var person2 = object(person);
person2.name = "linda";
person2.friends.push("job");

alert(person.friends);//"vane,vicent,rob,job"
alert(person1.friends);//"vane,vicent,rob,job"
alert(person2.friends);//"vane,vicent,rob,job"
```
解析：这个新对象将person作为原型，所以它的原型中就包含一个基本类型值属性和一个引用类型值属性，这意味着person.friends不仅属于person所有，而且也会被person1.friends和person2.friends共享
实际上这相当于又创建了person对象的两个副本

es5通过新增Object.create()方法规范了原型式继承。这个方法接收两个参数：新对象原型的对象，（可选的）新对象定义额外属性的对象

在传入一个参数的情况下，Object.create()与object()方法的行为相同
```
var person0 = {
    name:"jill",
    friends:["vane","vicent"]
};

//Object.create()方法的第二个参数与Object.defineProperties()方法的第二个参数格式相同：每个属性都是通过自己的描述符定义的
var person3 = Object.create(person0,{
    name:{
        value:"greg"
    },
    friends:{
        value:["a","b","c"]
    }
});
var person4 = Object.create(person0,{
    name:{
        value:"vanke"
    }
});
alert(person3.name);//"greg
alert(person3.friends);//"a","b","c"
alert(person4.friends);//"vane","vicent"
```
**适合场景**

在没有必要创建构造函数，而只想让一个对象与另一个对象保持类似的情况下，原型继承是完全可以胜任的，但是注意：包含引用类型值的属性始终都会共享相应的值，就像使用原型模式一样

 

### 寄生式继承
**寄生式继承的思路与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真的是它做了所有工作一样返回对象**
```
function createAnother(original) {
    //通过调用函数创建一个新对象  object()不是必须的，任何能够返回新对象的函数都适用于此模式
    var clone = object(original);
    clone.sayHi = function () {  //以某种方式来增强这个对象
        alert("Hi");
    }
    return clone;                //返回这个对象
}

var person = {
    name:"jill",
    friends:["vane","court"]
}

var antherPerson = createAnother(person);
antherPerson.sayHi();//Hi
```
**适合场景**

在主要考虑对象而不是自定义类型和构造函数的情况下

**寄生式继承的问题**

使用寄生式来为对象添加函数，会由于不能做到函数复用而降低效率，这一点于构造函数模式类似

 

### 寄生组合式继承
**通过借用构造函数来继承属性，通过原型链的混成形式来继承方法**

**基本思路：不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型的原型的一个副本而已。本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型**

寄生组合式继承的基本模型如下
```
//接收两个参数：子类型构造函数和超类型构造函数
function inheritPrototype(subType,superType) {    
    //创建对象（创建超类型原型的一个副本）    
    var prototype = object(superType.prototype);   
    //增强对象（为创建的副本添加constructor属性，从而弥补因重写原型而失去的默认constructor属性）   
    prototype.constructor = subType;      
    //指定对象（新创建的对象即副本赋值给子类型的原型）            
    subType.prototype = prototype;                   
}

function SuperType7(name) {
    this.name = name;
    this.colors = ["blue","red"];
}
SuperType7.prototype.sayName = function () {
    alert(this.name);
}

function SubType7(name,age) {
    SuperType6.call(this,name);                       //第一次调用SuperType6()
    this.age = age;
}

inheritPrototype(SubType7,SuperType7);

SubType7.prototype.sayAge = function () {
    alert(this.age);
}
```
这个例子解决了组合继承的问题，它只调用一次SuperType构造函数，并且因此避免了在subType.prototype上创建不必要的，多余的属性。同时，原型链还能保持不变，so还能正常使用instanceof和isPrototypeOf()

