### 数据类型
基本类型：undefined null boolean number string

复杂数据类型：object


#### typeof操作符
对一个值使用typeof操作符可能返回下列某个字符串
```
"undefined"——如果这个值未定义
"boolean"——如果这个值是布尔值
"number"——如果这个值是数值
"string"——如果这个值是字符串

"object"——如果这个值是对象或null
"function"——如果这个值是函数
```

#### undefined类型
```undefined```类型只有一个值，即特殊的```undefined```
```
var message; //声明未初始化
alert( typeof message );//undefined
alert( typeof aa ); undefined  - aa 未声明
```
结果表明，对未声明和未初始化的变量执行```typeof```操作符都返回了```undefined```值

#### null类型
```null```类型只有一个值，即特殊的```null```，从逻辑角度来看，```null```值表示一个空对象指针，这也正式```typeof```操作符检测```null```值时会返回```object```

如果定义的变量准备在将来用于保存对象，那么最好将该变量初始化为```null```而不是其他值。这样一来，只要直接检查```null```值就可以知道相应的变量是否已经保存了一个对象的引用

```
let car = null ;
if(car != null){
    //对car对象执行某些操作
}

//实际上，undefined值是派生自null值的
alert(null == undefined);//true
```

#### boolean类型
可以对任何数据类型的值调用```Boolean()```函数，而且总会返回一个boolean值。至于返回的这个值是```true``` 还是 ```false``` ，取决于要转换值的数据类型及气实际值


| 数据类型       | 转换为true的值    | 转换为false的值 |
| :------------ |:---------------:| --------------:|
| Boolean       | true            | false          |
| Number        | 任何非零数字值    | 0和NaN         |
| String        | 任何非空字符串    | " "(空字符串)   |
| Undefined     | 不适用           | undefined      |
| Object        | 任何对象         | null           |


#### number类型
1、整数

    八进制（严格模式下是无效的）
    十进制
    十六进制
    
2、浮点数
    （由于保存浮点数值需要的内存空间是保存整数值的两倍，因此ECMAScript会不失时机地将浮点数值转换为整数值）
  
    关于浮点数值计算会产生舍入误差的问题，是使用基于IEEE754 数值的浮点计算的通病
    
3、数值范围
  
    isFinite()函数 —— 这个函数在参数位于最小与最大数值之间时会返回true
    ES能够表示的最大数值保存在Number.MAX_VALUE 值为(1.7976931348623157e+308)，最小数值保存在Number.MIN_VALUE 值为(5e-324)
    
    疑问思考：
    为什么在js中Number.MAX_VALUE + 1不是Infinity？
    https://www.zhihu.com/question/24423421
    http://bartaz.github.io/ieee754-visualization/
    
4、NaN 非数值（Not a Number）
    
    这个数值用于表示在一个本来要返回数值的操作数未返回数值的情况（这样就不会抛出错误）
    
    console.log(0/0);  //NaN
    console.log(10/0); //Infinity  正数／0
    console.log(-10/0);//-Infinity 负数／0
    
NaN两个特点：

    1、任何涉及NaN的操作（如 NaN／10）都会返回NaN
    2、NaN与任何值都不相等，包括NaN本身
    
    针对这两个特点，ES定义了 isNaN(任何类型) 函数 ——
        isNaN()在接收到一个值之后，会尝试将这个值转换为数值
        任何不能被转换为数值的值都会返回true
        
    console.log(isNaN(NaN)); //true
    console.log(isNaN(10));  //false (数值）
    console.log(isNaN("10"));//false（被转换成数值）
    console.log(isNaN(true));//false（被转换成数值）
    console.log(isNaN("blue")); //true
    
    
5、数值转换
    
    number()函数  －   用于任何数据类型
    规则如下
    var num1 = Number(true);//1  ,boolean值，true 和 false 将分别被转换为1和0
    var num2 = Number(null);//0
    var num3 = Number(undefined);//NaN
    
    var num4 = Number("000011");//11 ,前导零被忽略
    var num5 = Number("0xf");//15 ,将16进制转换为相同大小的十进制
    var num6 = Number("");//0 ,与parseInt()函数区别
    var num7 = Number("1234bule");//NaN  ,如字符串包含除上格式之外的字符，将其转为NaN
    如果是对象，调用对象的valueOf()方法，依照前面的规则转换返回的值，若为NaN，则调用对象的toSring()，然后再次依照..
    －－－－－－－－－－－－－－－
    parseInt()、parseFloat()函数  －  专门用于把字符串转换成数值 
    在转换字符串时，更多的是看其是否符合数值模式
    var num1 = parseInt("");//NaN ,Number()返回0
    var num2 = parseInt("1234blue");//1234
    var num3 = parseInt("0xAF",16);//175  提供第二个参数，转换时使用的基数（即多少进制）
    －－－－－－－－－－－－－－－
    var num4 = parseFloat("1234blue");//1234(整数）
    var num5 = parseFloat("0xAF");//0  , 只解析十进制，没有第二个参数
    var num6 = parseFloat("098.21.21");//98.21  ,第一个小数点有效，第二个开始就无效了
    
    
#### String类型    
    
1、字符字面量（转义序列）
    
    \n  换行
    \t  制表
    \b  空格
    \r  回车
    \f  禁止
    \\  斜杠
    \'  单引号，如：'he said,\'hey\''
    \"  双引号
    \xnn    以十六进制代码nn表示的一个字符（其中n为0-F），如：\x41表示"A"
    \unnn   以十六进制代码nn表示的一个Unicode字符（其中n为0-F）如：\u03a3（6个字符长的转义序列表示1个字符）

2、字符串的特点

    ES中的字符串是不可变的，也就是说，字符串一旦创建，它们的值就不能改变
    要改变某个变量保存的字符串，首先要销毁原来的字符串，然后再用另一个包含新值的字符串填充该变量

3、转换为字符串

    方式一：toString() ,除null和undefined值没有这个方法
    多数情况下，调用toString()方法不必传递参数，但是，在调用数值的toString()方法时，可以传递一个参数：输出数值的基数
    
    var found = true;
    console.log(found.toString()); //"true"
    var num = 10;
    console.log(num.toString(2)); //1010
    
    －－－－－－－－－－－－－
    
    方式二：String() ,将任何类型的值转换为字符串［若值有toString()方法，则调用该方法（没有参数）并返回相应的结果
    var val1 = 10;
    var val2 = null;
    var val3 ;
    console.log(String(val1));//"10" (toString()函数默认10进制)
    console.log(String(val2));//"null"
    console.log(String(val3));//"undefined"
    
#### Object类型
 object的每个实例都具有下列属性和方法
    
   
    constructor:保存着用户创建当前对象的函数
    hasOwnProperty(propertyName):用于检查给定的属性在当前对象实例中（而不是在实例的原型中）是否存在
    isPrototypeOf(object):用于检查传入的对象是否是传入对象的原型
    propertyIsEnumerable(propertyName):用于检查给定的属性是否能够使用for-in来枚举
    toLocaleString():返回对象的字符串表示，该字符串与执行环境的地区对应
    toString():返回对象字符串表示
    valueOf():返回对象的字符串、数值或布尔值表示
#### 小结
```
1、ES中的基本数据类型包括 undefined 、 null 、boolean 、number 和 string
2、与其它语言不同，ES没有为整数和浮点数值分别定义不同的数据类型，number类型可用于表示所有数值
3、ES中也有一种复杂的数据类型，即Object类型，该类型是这门语言中所有对象的基础类型
4、严格模式为这门语言容易出错的地方施加了限制
```    