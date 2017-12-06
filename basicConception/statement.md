### 语句
#### if 语句
```
if(condition1){
    statement1
}else if(condistion2){
    statement2
}else{
    statement3
}    
```
#### do-while 语句
do-while 语句是一种后测试循环语句，即在对条件表达式求值之前，循环体内的代码至少会被执行一次
```
do{
    statement
}while(condition);    
```
#### while 语句
while 语句属于前测试循环语句，即在循环体内的代码被执行之前，就会对出口条件求值
```
while(condition){
    statement
}    
```
#### for 语句
for 语句也是一种前测试循环语句，但它具有执行循环之前初始化变量和定义循环后要执行的代码能力
```
for(initialzation,condition,post-loop-condition){
    statement
}    
```
#### for-in 语句
for-in 语句是一种精准的迭代语句，可以用来枚举对象的属性
```
for(property in condition){
    statement
} 
如果要迭代的对象的变量值为null或undefined，for-in 不执行循环体，为了我保证最大限度的兼容性，建议在使用for-in循环之前，先检测确认该对象的值不是null或undefined
```
#### label 语句
使用label语句可以在代码中添加标签，可在将来由break或continue语句引用，加标签的语句一般都要与for语句等循环语句配合使用
```
label:statement

例子
start:for(var i = 0;i < 10; i++){
    alert(i)
}    
```
#### break 和 continue 语句
break 和 continue 语句用在循环中精确地控制代码的执行。其中，break语句会立即退出循环，强制继续执行循环后面的语句。而continue语句虽然也是立即退出循环，但退出循环后会从循环的顶部继续执行
```
//break
var num = 0;
for(var i = 1; i < 10; i++){
    if(i % 5 == 0){
        break;
    }
    num++;
}
console.log(num);//4 在变量i等于5时，循环总共执行了4次，而break语句的执行，导致了循环在num再次递增之前就退出了
     
        
//continue
var num = 0;
for(var i = 1; i < 10; i++){
    if(i % 5 == 0){
        continue;
    }
    num++;
}
console.log(num); //8 当变量i等于5时，循环会在num再次递增之前退出，但接下来执行的是下一次循环，即i的值等于6的循环。于是循环又继续执行，直到i等于10时自然结束。而num的最终值之所以是8，是因为continue语句导致它少递增了一次
 
//break语句与label语句联合使用
var num = 0;
outermost:
for(var i = 0; i < 10; i++){
    for(var j = 0; j < 10; j++){
        if(i == 5 && j == 5){
            break outermost;
        }
        num++;
        
    }
}
console.log(num); //55      
//continue语句与label语句联合使用 
var num = 0;
outermost:
for(var i = 0; i < 10; i++){
     for(var j = 0; j < 10; j++){
         if(i == 5 && j == 5){
             continue outermost;
         }
         num++;
         
     }
}
console.log(num); //95    
       
```

#### switch 语句
```
//可以在switch语句中使用任何数据类型，无论是字符串还是对象都OK
//每个case的值不一定是常量，可以是变量，甚至是表达式
switch(condition){
    case value:statement
      break;
    case value:statement
      break;
    case value:statement
      break;
    default:statement            
}

例子
var num = 25;
switch(true){
    case num < 0:
        console.log("Less than 0");
        break;
    case num >= 0&& num <= 10:
        console.log("Between 0 and 10");
        break;    
    case num > 10 && num <=20:
        console.log("Between 10 and 20");
        break;       
    default:
        console.log("More than 20");
}
//这个例子首先在switch语句外面声明了变量num。而之所以给switch语句传递表达式true是因为每个case值都可以返回一个布尔值。这样每个case按照顺序被求值，直到找到匹配的值或遇到default语句为止
```
