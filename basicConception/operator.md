### 操作符
ECMA-262描述了一组用于操作数据值的操作符，包括算术操作符、位操作符、关系操作符和相等操作符

#### 一元操作符

#### 1、递增和递减操作符 
递增和递减操作符直接借鉴自，而且各有两个版本：前置型和后置型

执行前置递增和递减操作时，变量的值都是在语句被求值以前改变的（在计算机科学领域，这种情况通常被称作 副效应）
```
var age = 18;
var vaneAge = --age + 2;
var JillAge = age + 1;

console.log(age); //17
console.log(vaneAge); //19
console.log(JillAge); //18

```

后置递增和递减操作是在包含它们的语句被求值之后才执行
```
var age = 18;
var vaneAge = age-- + 2;
var JillAge = age + 1;

console.log(age); //17
console.log(vaneAge); //20
console.log(JillAge); //18
```
递增和递减操作符遵循下列规则：

字符串：包含有效数字字符－转换为数字值－再执行加减1操作、不包含有效数字字符－将变量值设置为NaN。字符串变量变成数值变量

布尔值：转换为数字值－再执行加减1操作。布尔值变量编程数值变量

对象：调用对象的valueOf()方法，取得一个可供操作的值－对该值应用前述规则－若是NaN，调用toString()方法后再对该值应用前述规则。对象变量变成数值变量


```
var s1 = "2";
var s2 = "z";
var b = false;
var f = 1.1;
var o = {
    valueOf:function(){
        return -1;
    }
};
    
s1++; //2
s2++; //NaN
b++; //0
f--; //1.1
o--; //-1

console.log(s1++); //3
console.log(s2++); //NaN
console.log(b++); //1
console.log(f--); //0.1000000000000009(由于浮点舍入错误所致)
console.log(o--); //-2
```
####2、一元加和减操作符

应用于数值时，该值会变成 负数（一元减操作符）或正数（一元加操作符）

应用于非数值，该操作符会像[Number()转型函数](https://github.com/JILL1231/Learning-notes/blob/master/basicConception/dataType.md)
一样对这个值执行转换
```
var s1 = "2";
var s2 = "z";
var b = false;
var f = 1.1;
var o = {
    valueOf:function(){
        return -1;
    }
};

console.log(s1 = -s1);//-2
console.log(s2 = -s2);//NaN
console.log(b = -b);//-0
console.log(f = -f);//-1.1
console.log(o = -o);//1

```
#### 位操作符
ES中的所有数值都以IEEE-754 64位格式存储，但位操作符并不直接操作64位的值。而是先将64位的值转换成32位的整数，然后执行操作，最后再将结果换回64位［为什么呢］这个转换过程导致一个严重的副效应，即在对特殊的NaN和Infinity值应用位操作时，这两个值都会被当成0来处理

举个例：
![数值18的二进制表示](https://static.oschina.net/uploads/img/201712/04161957_rWUt.jpg "数值18的二进制表示")

负数同样以二进制码存储，但使用的格式是二进制补码（例如，－18的二进制表示）

```
1、求这个数值绝对值的二进制码，即18的二进制码
0000 0000 0000 0000 0000 0000 0001 0010
2、求二进制反码，即将0替换为1，1替换为0
1111 1111 1111 1111 1111 1111 1110 1101
3、得到的二进制反码加1
1111 1111 1111 1111 1111 1111 1110 1101
                                      1
－－－－－－－－－－－－－－－－－－－－－－－－－
1111 1111 1111 1111 1111 1111 1110 1110
```
#### 1、按位非 ~（NOT）
按位非 是ES操作符中少数几个与二进制计算有关的操作符之一
```
 var num1 = 25;    //0000 0000 0000 0000 0000 0000 0001 1001
 var num2 = ~num1; //1111 1111 1111 1111 1111 1111 1110 0110
 console.log(num2);//-26  有公式可寻：~x = -x - 1
 虽然 -x - 1 也能返回同样的结果，但由于按位非是在数值表示的最底层执行操作，因此速度更快
```
#### 2、按位与 & (AND)
按位与操作只在数值的对应位都是1时才返回1，任何一位是0，结果都是0
```
var result = 25 & 3;
console.log(result);//1

为什么是1？看看底层操作
25 = 0000 0000 0000 0000 0000 0000 0001 1001
 3 = 0000 0000 0000 0000 0000 0000 0000 0011
--------------------------------------------
AND＝0000 0000 0000 0000 0000 0000 0000 0001
```
#### 3、按位或 | (OR)
按位或在有一个位是1的情况下就返回1，而只有两个位都是0的情况下才返回0
```
var result = 25 | 3;
console.log(result);//27

为什么是27？看看底层操作
25 = 0000 0000 0000 0000 0000 0000 0001 1001
 3 = 0000 0000 0000 0000 0000 0000 0000 0011
--------------------------------------------
AND＝0000 0000 0000 0000 0000 0000 0001 1011
```
#### 4、按位异或 ^ (XOR) [exclusive or]
按位异或在两个数值对应位上只有一个1时才返回1，如果对应的两位都是1或都是0，则返回0
```
var result = 25 ^ 3;
console.log(result);//26

为什么是26？看看底层操作
25 = 0000 0000 0000 0000 0000 0000 0001 1001
 3 = 0000 0000 0000 0000 0000 0000 0000 0011
--------------------------------------------
AND＝0000 0000 0000 0000 0000 0000 0001 1010
```
#### 5、左移 <<
注意，左移不会影响操作数的符号位
```
var val = 2;
var moveToLeft = val << 5; //64
```

#### 6、有符号的右移  >>
有符号的右移操作与左移操作恰好相反
```
var val = 64;
var moveToRight = val >> 5; //2
```
#### 7、无符号右移 >>>
无符号右移会将数值的所有32位都向右移动，对正数来说，无符号右移的结果和有符号右移相同，但是对负数来说就不一样了，首先，无符号右移是以0来填充空位，而不是像有符号右移那样以符号位的值来填充空位；其次，无符号右移操作符会把负数的二进制码当成正数的二进制码。而且负数以其绝对值的二进制补码形式表示，因此就会导致无符号右移后的结果非常之大
```
var val = -64;
var moveToRight = val >>> 5; //134217726
```
图解
![位操作符](https://static.oschina.net/uploads/img/201712/05114652_EUUj.jpg "位操作符")

如果图片展示不了，可点击链接 https://static.oschina.net/uploads/img/201712/05114652_EUUj.jpg
#### 布尔操作符
#### 1、逻辑非 !
逻辑非操作符可以应用于ES中的任何值。逻辑非操作符首先会将它的操作数转换为一个布尔值，然后再对其求反。
```
console.log(!false);//true
console.log(!"blue");//false
console.log(!0);//true
console.log(!NaN);//true
console.log(!"");//true
console.log(!12345);//false
```
#### 2、逻辑与 &&
逻辑与操作符属于短路操作，即如果第一个操作数能够决定结果，那么就不会再对第二个操作数求值。对于逻辑与操作而言，如果第一个操作数是false，则无论第二个操作数是什么值，结果都不再可能是true了，遵循下列规则
```
如果第一个操作数是对象，则返回第二个操作数
如果第二个操作数是对象，则只有在第一个操作数的求值结果为true的情况下才会返回该对象
如果两个操作数都是对象，则返回第二个操作数
如果有一个操作数是null，则返回null
如果有一个操作数是NaN，则返回NaN
如果有一个操作数是undefined，则返回undefined
```

```
var found = false;
var result = (found && someUndefined);
console.log(result);//false,若var found = true;则继续执行someUndefined会报错
```
#### 3、逻辑或 ||
逻辑或操作符属于短路操作，即如果第一个操作数的求值结果为true，就不会对第二个操作数求值了；与逻辑与操作相似，如果有一个操作数不是布尔值，逻辑或也不一定返回布尔值
```
我们可以利用逻辑或的这一行为来避免为变量赋null或undefined值
var myObject = preferredObject || backupObject;
//如果preferredObject的值不是null，那么它的值将被赋给myObject；如果是null，则将backupObject的值赋给myObject
```
#### 乘性操作符
#### 1、乘法 *
```
console.log(34*56);//1904
console.log(NaN*34);//NaN
console.log(Infinity*0);//NaN
console.log(-2*Infinity);-Infinity
console.log(Infinity*Infinity);//Infinity
console.log(true*32);//32 如果操作数不是数值，则在后台调用Number()将其转换为数值，再应用上面的例子
```
#### 2、除法 /
```
console.log(66/11);//6
console.log(NaN/34);//NaN
console.log(Infinity/Infinity);//NaN
console.log(0/0);//NaN
console.log(12/0);//Infinity
console.log(0/12);//0
console.log(Infinity/2);//Infinity
console.log(-2/Infinity);//-0
```
#### 3、求模 %
```
console.log(26%5);//1
console.log(0%12);//0
console.log(12%Infinity);//12  
console.log(Infinity%12);//NaN
console.log(21%0);//NaN
console.log(Infinity%Infinity);//NaN
```
#### 加性操作符
#### 1、加法 +
```
var num1 = 5;
var num2 = 10;
var message = "The sum of 5 and 10 is"+num1+num2;
console.log(message);//The sum of 5 and 10 is510
```
#### 2、减法 -

```
 var result = 5 - true;//4 因为true被转换为1
 var result = NaN - 1;//NaN
 var result = 5 - 3;//2
 var result = 5 - "";//5 因为""被转换成0
 var result = 5 - "2";//3 因为"2"被转换成2
 var result = 5 - null;//5 因为null被转换成0
```
#### 关系操作符 <、 > 、<=、 >=

```
奇怪现象
//大写字母的字符编码全部小于小写字母的字符编码
var result = "Brick" < "alpant" ;  //true 原因是字母B的字符编码为66，而字母a的字符编码是97
var result = "Brick".toLowerCase() < "alpant".toLowerCase(); //false
//比较两个数字字符串的情况
var result = "23" < "3"; //true (两个操作符都是字符串，而字符串比较的是字符编码，"2"的字符编码是50，而"3"的字符编码是51
var result = "23" < 3;//false (此时"23"会被转换成数值23，再进行比较）
var result= "a" < 3;//NaN (由于"a"不能转换成合理的数值，因此就被转换成了NaN。根据规则，任何操作与NaN进行关系比较，结果都是false)
```

#### 相等操作符

#### 1、相等和不相等 － 先转换再比较（强制转型） ==  、!=
```
null == undefined;//true  因为它们是类似的值
NaN == NaN;//false 按照规则，NaN 不等于 NaN
5 == NaN;//false 如果有一个操作数是NaN，则相等符返回false，不想等符返回true
undefined == 0;//false
null == 0; //false
"5" == 5;//true
true == 1;//true

```
#### 2、全等和不全等 - 仅比较而不转换 === 、 !==
```
null === undefined;//false 因为它们是不同类型的值
"5" === 5;//false 因为不同的数据类型不想等
```

#### 条件操作符
```
var max = (num1 > num2) ? num1 : num2;
```

#### 赋值操作符
```
复合赋值操作符
乘/赋值(*=);
除/赋值(/=);
模/赋值(%=);
加/赋值(+=);
减/赋值(-=);
左移/赋值(<<=);
有符号右移/赋值(>>=);
```
#### 逗号操作符
```
//声明多个变量
var num1 = 1,num2=2;
//用于赋值，逗号操作符总会返回表达式中的最后一项
var num = (3,1,0);//num的值为0
```
