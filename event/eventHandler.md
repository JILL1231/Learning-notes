### 事件流

事件流描述的是从页面中接收事件的顺序

通过一个最直白的例子来理解事件流，如果你单击了页面中的```<div>```元素，那么这个click事件分别会怎么传播
``` 
<!DOCTYPE html>
<html>
<head>
    <title>Event Bubbling Example</title>
</head>
<body>
    <div id="myDiv">Click Me</div>
</body>
</html>
```

#### 事件冒泡
IE的事件流叫做事件冒泡，即事件开始时由最具体的元素(文档中嵌套层次最深的那个节点)接收，然后逐级向上传播到较为不具体的节点(文档)
``` 
<div> -> <body> -> <html> -> document
```

#### 事件捕获
事件捕获的思想是 不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。时间捕获的用意在于在事件到达预定目标之前捕获它
``` 
document -> <html> -> <body> -> <div>
```

#### DOM事件流
"DOM2级事件"规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。首先发生的是事件捕获，为截获事件提供了机会。然后是实际的目标接收到事件。最后是冒泡阶段，可以在这个阶段对事件做出响应
``` 
document -> <html> -> <body> -> <div> -> <body> -> <html> -> document
//在DOM事件流中，实际的目标(<div>元素)在捕获阶段不会接收到事件。这意味着在捕获阶段，事件从document -> <html> -> <body> 就停止了，下一阶段是"处于目标"阶段，于是事件在<div>上发生，并在事件处理中被看成冒泡阶段的一部分，接着冒泡阶段发生，事件又传播回文档
```

### 事件处理程序
事件就是用户或浏览器自身执行的某种动作，诸如click、load 和 mouseover，都是事件的名字。而响应某个事件的函数叫做事件处理程序(或事件侦听器)

#### HTML事件处理程序
``` 
<input type = "button" value = "click me" onclick = "alert('Clicked')"/>
//可以调用在页面其他地方定义脚本
<input type = "button" value = "click me" onclick = "showMessage()"/>
<script type = "text/javascript">
    function showMessage(){
        alert("Clicked");
    }
</script>
```
##### 缺点
1、存在时差问题：因为用户可能会在HTML匀速一出现在页面上就触发相应的事件，但当时的事件处理程序可能尚不具备执行条件

为此，很多HTML事件处理程序都会被封装在一个try-catch块中，以便错误不会浮出水面
``` 
<input type = "button" value = "click me" onclick = "try{showMessage();}catch(ex){}"/>
<script type = "text/javascript">
    function showMessage(){
        alert("Clicked");
    }
</script>
```

2、扩展事件处理程序的作用域在不同浏览器中会导致不同结果

3、HTML与JavaScript代码紧密耦合

#### DOM0级事件处理程序
``` 
var btn = document.getElementById("myBtn");
btn.onclick = function(){
    alert(this.id);
}
//将相应的属性设置为null，可删除以这种方式指定的事件处理程序
btn.onclick = null;
```

#### DOM2级事件处理程序
"DOM2级事件"定义了两个方法，用于处理指定和删除事件处理程序的操作：
``` 
//三个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值[如果是true，表示在捕获阶段调用事件处理程序；如果是false，表示在冒泡阶段调用事件处理程序]
addEventListener() removeEventListener()
```
可以添加多个事件处理程序，并按添加顺序触发
``` 
var btn = document.getElementById("myBtn");

btn.addEventListener("click",function(){
    alert(this.id);
},false);

btn.addEventListener("click",function(){
    alert("hello world!");
},false);
```
通过 addEventListener() 添加的事件处理程序只能使用 removeEventListener() 来移除；移除时传入的参数与添加处理程序时使用的参数相同。这也意味着匿名函数将无法移除
``` 
var btn = document.getElementById("myBtn");

btn.addEventListener("click",function(){
    alert(this.id);
},false);

btn.removeEventListener("click",function(){ //没有用
   alert(this.id);
},false);
```
``` 
var btn = document.getElementById("myBtn");

var handler = function(){
  alert(this.id);
}
btn.addEventListener("click",handler,false);

btn.removeEventListener("click",handler,false);//有效
```
#### IE事件处理程序
IE实现了与DOM中类似的两个方法：attachEvent() 和 detachEvent()
``` 
//这两个方法接受相同的两个参数：事件处理程序名称与事件处理程序函数 ［冒泡阶段］

var btn = document.getElementById("myBtn");
var handle = function(){
    alert(this.id);
}
btn.attachEvent("onclick",handle);
btn.detachEvent("onclick",handle);
```

#### 跨浏览器的事件处理程序
addHandler() 和 removeHandler() 方法接受3个参数：要操作的元素、事件名称和事件处理程序函数。它的职责是视情况分别使用DOM0级方法、DOM2级方法或IE方法来添加事件。这个方法属于一个名叫EventUtil的对象
``` 
var EventUtil = {
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type] = handler;
        }
    },
    removeHandle:function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handle,false);
        }else if(element.removeEventListener){
            element.detachEvent("on"+type,handle);
        }else{
            element["on"+type] = null;
        }    
    }
}
```
``` 
var btn = document.getElementById("myBtn");
var handler = function(){
    alert(this.id);
}

EventUtil.addHandler(btn,"click",handler);
EventUtil.removeHandle(btn,"click",handler);
```
