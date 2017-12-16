### array类型
ES数组的每一项可以保存任何类型的数据。也就是说，可以用数组的第一个为止来保存字符串，用第二个为止来保存数值，以此类推。而且，ES数组的大小是可以动态调整的，即可以随着数据的添加自动增长以容纳新增数据

#### 创建数组
```
//第一种是使用array构造函数
var cols = new Array();
var cols = new Array(20);//创建length值为20的数组
var clos = new Array("blue");//创建包含1项，即字符串"blue"的数组
var clos = Array();//省略new操作符的结果相同

//第二种是使用数组字面量表示法
var cols = ["red","blue"];
var clos = [];
var clos = ["red","blue",];//不要这样！这样会创建一个包含2或3项的数组
var clos = [,,];//在像这种省略的情况下，每一项都将获得undefined值，这个结果与调用array构造函数时传递项数在逻辑上是相同的。但是由于IE的实现跟其他浏览器不一致，因此强烈建议不要使用这种语法

```

#### 读取和设置数组的值
```
var clos = ["red","blue","green"];

console.log(clos[0]);//"red" 显示第一项
clos[1] = "yellow";//["red","yellow","green"]修改第二项
clos[3] = "blue";//["red","yellow","green","blue"]新增第四项
console.log(clos.length);//4 数组的项数保存在length属性中
clos.length = 3;//["red","yellow","green"]将length设置为3会移除最后一项
console.log(clos[3]);//undefined
clos.length = 4;//将length属性设置为大于数组项数的值，则新增的每一项都会取得undefined值
console.log(clos[4]);//undefined
clos[clos.length] = "black";//利用length属性方便的在数组末添加新项
console.log(clos);
console.log(clos[clos.length - 1]);//"black" 数组最后一项的索引始终是length-1
```
#### 检测数组
```
if(Array.isArray(value){
    //对数组执行某些操作
}

instanceof操作符的问题在于，它假定只有一个全局执行环境
```
#### 转换方法
数组继承的```toLocaleString()、toString()、valueOf()```方法，
其中，调用数组的```toLocaleString()、toString()```方法，在默认情况下都会以逗号分隔的字符串形式返回数组项。而调用```valueOf()```方法返回的还是数组。使用```join()```方法，则可以使用不同的分隔符来构建这个字符串

```
var clos = ["red","blue","green"];
console.log(clos.toString()); // red,blue,green 
console.log(clos.toLocaleString()); // red,blue,green 
console.log(clos.valueOf()); //(3) ["red", "blue", "green"]
console.log(clos); //(3) ["red", "blue", "green"]
console.log(clos.join("||")); //red||blue||green
```
如果数组中的某一项的值是null或者undefined，那么该值在```join()、toLocaleString()、toString()和valueOf()```方法返回的结果中以空字符串表示

#### 栈方法
数组可以表现得就像栈一样，后者是一种可以限制插入和删除项的数据结构。栈是一种LIFO(last-in-first-out，后进先出)的数据结构，也就是最新添加的项最早被移除。而栈中项的插入（叫做推入）和移除（叫弹出），只发生在一个位置——栈的顶部。ES为数组专门提供了push()和pop()方法

```
//push()方法可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度
//pop()方法则从数组末尾移除最后一项，减少数组的length值，然后返回移除的项
var clos = ["red","blue","green"];

var clospush = clos.push("black");
console.log(clospush+","+clos);  //4,red,blue,green,black

var clospop = clos.pop();
console.log(clospop+"|"+clos);  //black|red,blue,green
```

#### 队列方法
队列数据结构的访问规则是FIFO(first-in-first-out,先进先出)。队列在列表的末端添加项，从列表的前端移除项。结合使用shift()和push()方法，可以像使用队列一样使用数组
```
//shift()方法能够移除数组中的第一个项并返回该项，同时将数组长度减1
var clos = ["red","blue","green"];

var clospush = clos.push("black");
console.log(clospush+","+clos);  //4,red,blue,green,black

var closshift = clos.shift();
console.log(closshift+"|"+clos); //red|blue,green,black
```
##### 从相反方向模拟队列
即在数组的前端添加项，从数组末端移除项。结合使用unshift()和pop()方法,可以从相反方向模拟队列
```
//unshift()方法与shift()的用途相反：它能够在数组前端添加任意个项并返回新数组的长度
var clos = ["red","blue","green"];

var closunshift = clos.unshift("black");
console.log(closunshift+","+clos);  //4,black,red,blue,green

var clospopt = clos.pop();
console.log(clospopt+"|"+clos); //green|black,red,blue
```

#### 重排序方法
数组中已经存在两个可以直接用来重排序的方法：reverse()和sort()，它们的返回值是经过排序之后的数组
```
//reverse()方法会反转数组项的顺序
var clos = ["red","blue","green"];
var vals = [0,1,5,10,15];

console.log(clos.reverse()); //(3) ["green", "blue", "red"]
console.log(vals.reverse()); //(5) [15,10,5,1,0]

//sort()方法按升序排列数组项，它会调用每个数组项的toString()转型方法，然后比较得到的字符串，以确定如何排序
console.log(clos.sort()); //(3) ["blue", "green", "red"]
//即使数组中的每一项都是数值，sort()方法比较的也是字符串，因为数值5虽小于10，但在进行字符串比较时，"10"则位于"5"的前面
console.log(vals.sort()); //(5) [1,1,10,15,5] 
```
由于数组的顺序被修改，这种排序不是最佳方案，因此sort()方法可以接收一个比较函数作为参数，以便我们指定哪个值位于哪个值的前面

```
//比较函数接收两个参数
//升序 － 如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等则返回0，如果第一个参数应该位于第二个之后则返回一个正数

function compare(val1,val2){
    if(val1 < val2){
        return -1;
    }else if(val1 > val2){
        return 1;
    }else{
        return 0;
    }
}

//对于数值类型或其valueOf()方法返回数据类型的对象类型，可以使用更简单的比较函数
function compare(val1,val2){
    return val2 - val1;
}

//降序 － 如果第一个参数应该位于第二个之前则返回一个正数，如果两个参数相等则返回0，如果第一个参数应该位于第二个之后则返回一个负数
function descompare(val1,val2){
    if(val1 < val2){
        return 1;
    }else if(val1 > val2){
        return -1;
    }else{
        return 0;
    }
}

//只要将其作为参数传递给sort()方法即可
var vals = [0,1,5,10,15];
console.log(vals.sort(compare)); //(5) [0, 1, 5, 10, 15]
console.log(vals.sort(descompare)); //(5) [15, 10, 5, 1, 0]
```
#### 操作方法
concat()方法可以基于当前数组中的所有项创建一个新数组。具体来说，这个方法会先创建当前数组一个副本，然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组
```
var clos = ["red","blue","green"];
var oo = new Object();

var clos2 = clos.concat();  //在没有给concat()方法传递参数的情况下，它只是复制当前数组并返回副本
var clos3 = clos.concat(["black","pink"],["brown"]);//如果传递给concat()方法的是一或多个数组，则该方法会将这些数组中的每一项都添加到结果数组中
var clos4 = clos.concat("black",12,oo);//如果传递的值不是数组，这些值就会被简单的添加到结果数组的末尾

console.log(clos2);//(3) ["red", "blue", "green"]
console.log(clos3);//(6) ["red", "blue", "green", "black", "pink", "brown"]
console.log(clos4);//(6) ["red", "blue", "green", "black", 12, {…}]
console.log(clos);//(3) ["red", "blue", "green"]
```

slice()[片、截取]方法能够基于当前数组中的一或多个项创建一个新数组，它接受一或两个参数，即要返回项的起始和结束位置。slice()方法不会影响原始数组

```
var clos = ["red", "blue", "green", "black", "brown"]

var clos1 = clos.slice(1); //在只有一个参数的情况下，slice()方法返回从该参数指定位置开始到当前数组末尾的所有项
var clos2 = clos.slice(1,3);//两个参数，该方法返回起始和结束位置之间的项——但不包括结束位置的项
var clos3 = clos.slice(-3,-1);//若参数中有负数，则用数组长度加上该数来确定形影的位置
var clos4 = clos.slice(-1,-3);//若结束位置小于起始位置，则返回空数组
console.log(clos1);//(4) ["blue", "green", "black", "brown"]
console.log(clos2);//(2) ["blue", "green"]
console.log(clos3);//(2) ["green", "black"]  数组长度5，则相当于slice(2,4);
console.log(clos4);//[]
console.log(clos); //(5) ["red", "blue", "green", "black", "brown"]
```

splice()[拼接]方法始终都会返回一个数组，该数组中包含从原始数组中删除的项(若没有删除任何项，则返回一个空数组)，它的主要用途是向数组的中部插入项，使用这种方法的方式有3种：

1、删除：可以删除任意数量的项，只需指定2个参数：要删除的第一项的位置和要删除的项数
```
splice(0,2)会删除数组的前两项

var clos = ["red", "blue", "green", "black", "brown"];
var removed = clos.splice(0,2);
console.log(clos);//(3) ["green", "black", "brown"]
console.log(removed);//(2) ["red","blue"]
```
2、插入：可以向指定位置插入任意数量的项，只需提供三个参数：起始位置、0（要删除的项数）、要插入的项。如果要插入多个项，可以再传入第四、第五，以致任意多个项
```
splice(2,0,"red","green")会从当前数组的位置2开始插入字符串"red","green"

var clos = ["red", "blue", "green", "black", "brown"];
var removed = clos.splice(2,0,"red","green");
console.log(clos);//(7) ["red", "blue", "red", "green", "green", "black", "brown"]
console.log(removed);//[]
```
3、替换：可以向指定位置插入任意数量的项，且同时删除任意数量的项，只需指定3个参数：起始位置、要删除的项数、要插入的任意数量的项。插入的项数不必与删除的项数相等
```
splice(2,1,"red","green")会删除当前位置2的项，然后再从位置2开始插入字符串"red","green"

var clos = ["red", "blue", "green", "black", "brown"];
var removed = clos.splice(2,1,"red","green");
console.log(clos);//(3) ["red", "blue", "red","green", "black", "brown"];
console.log(removed);//["green"]
```

#### 位置方法
ES为数组实例添加了两个位置方法：indexOf()和lastIndexOf()。这两个方法都接收两个参数：要查找的项和表示查找起点位置的索引（可选）。这两个方法都返回要查找的项在数组中的位置，或者在没找到的情况下返回-1


```
//indexOf()方法从数组的开头（位置0）开始向后查找
//lastIndexOf()方法则从数组的末尾开始向前查找

var clos = ["red", "blue", "green", "black", "brown", "blue"];

console.log(clos.indexOf("blue")); //1
console.log(clos.lastIndexOf("blue"));//5，注意：不是0哦，索引是从前开始数的
console.log(clos.lastIndexOf("blue",3));//1
console.log(clos.indexOf("aa"));//-1
```

#### 迭代方法
ES为数组定义了5个迭代方法。每个方法都接收两个参数：要在每一项上运行的函数和运行该函数的作用域对象——影响this的值。传入这些方法中的函数会接收三个参数：数组项的值、该项在数组中的位置和数组对象本身，以下是这5个迭代方法的作用及用例

```
var num = [1,2,3,4,5,6,5,4,3,2];

function fun(item,index,arr){
    return item > 2;
}

function funMap(item,index,arr){
    return item * 2;
}
```

every()和some()方法都用于查询数组中的项是否满足某个条件

``` 
//every():对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true  ［巧记：与］

//some():对数组中的每一项运行给定函数，如果该函数对任一项返回true，则返回true ［巧记：或］

var everyResult = num.every(fun);
var someResult = num.some(fun);

console.log(everyResult);//false
console.log(someResult);//true
```

filter()方法用于查询符合某些条件的所有数组项
```
//filter():对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组

var filterResult = num.filter(fun);
console.log(filterResult);//(7) [3, 4, 5, 6, 5, 4, 3]
```

map()方法适合创建包含的项与另一个数组一一对应的数组
```
//map():对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组

var mapResult = num.map(funMap);
console.log(mapResult);//(10) [2, 4, 6, 8, 10, 12, 10, 8, 6, 4]
```

forEach()方法只是对数组中的每一项运行传入，本质上与使用for循环迭代数组一样
```
//forEach():对数组中的每一项运行给定函数，这个方法没有返回值

num.forEach(function(item,index,arr){
    //执行某些操作
});

```


#### 归并方法
reduce()和reduceRight()这两个方法都会迭代数组的所有项，然后构建一个最终返回的值。这两个方法都接收两个参数：一个在每一项上调用的函数和作为归并基础的初始值（可选）。传给reduce()和reduceRight()的函数接收四个参数：前一个值、当前值、项的索引和数组对象。这个函数返回的任何值都会作为第一个参数自动传给下一项。第一次迭代发生在数组的第二项上，因此第一个参数是数组的第一项，第二个参数是数组的第二项

例如：求数组中所有值之和

```
// reduce()方法从数组第一项开始，逐个遍历到最后
// reduceRight()方法则从数组的最后一项开始，向前遍历到第一项

var num = [1,2,3,4,5,6,5,4,3,2];
function func(prev,cur,index,arr){
    return prev+cur;
}

var sumReduce = num.reduce(func);//第一次执行回调函数，prev是1，cur是2。第二次，prev是3(1+2的结果)，cur是3(第三项)，这个过程会持续到吧数组中的每一项都访问一遍，最后返回结果
console.log(sumReduce);//35

var sumReduceRight = num.reduceRight(func);//reduceRight()的作用与reduce()类似，只不过方向相反而已,第一次执行回调函数，prev是2，cur是3
console.log(sumReduceRight);//35
```