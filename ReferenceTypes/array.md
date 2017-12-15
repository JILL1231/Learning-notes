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
```

```

#### 位置方法
```

```

#### 迭代方法
```

```

#### 归并方法
```

```