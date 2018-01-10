### 内存和性能
在javascript中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能，导致的原因：

* 每个函数都是对象，都会占用内存，内存的对象越多，性能就越差。
* 必须事先指定所有事件处理程序而导致的DOM访问次数，会延迟整个页面的交互就绪时间。
#### 事件委托
对“事件处理程序过多”问题的解决方案是事件委托。事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。下述代码为例

``` 
<ul id="myLinks">
    <li id="goSomewhere">Go somewhere</li>
    <li id="doSomething">Do something</li>
    <li id="sayHi">Say hi</li>
</ul>
```

在上述代码中，包含了3个被单击后执行操作的列表项，传统的做法是为它们添加3个事件处理程序，如下：

``` 
var item1=document.getElementById("goSomewhere");
var item2=document.getElementById("doSomething");
var item3=document.getElementById("sayHi");
EventUtil.addHandler(item1,"click",function(event){
    location.href="http://www.wrox.com";
});
EventUtil.addHandler(item2,"click",function(event){
    document.title="I changed the document's title;
});
EventUtil.addHandler(item3,"click",function(event){
    alert("hi");
});
```

在一个复杂的web应用程序中，对所有可单击的元素都要采用这种方式，那么就会有大量的代码是用于添加事件处理程序，可使用事件委托解决这个问题，只需要在DOM树种尽量高的层次上添加一个事件处理程序，如下：

``` 
var list = document.getElementById("myLinks");
//所有的表项都是这个元素的子节点，而且他们的事件都会冒泡，所以单击事件都会被这个函数处理。
EventUtil.addHandler(list, "click", function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    switch(target.id){
        case "doSomething":
            document.title = "I changed the document's title";
            break;

        case "goSomewhere":
            location.href = "http://www.wrox.com";
            break;

        case "sayHi":
            alert("hi");
            break;
    }
});
```

可以考虑为document对象添加一个事件处理程序，用以处理页面上发生的某种特定类型的事件，与传统方法相比有以下优点：

* document对象很快就可以访问，而且可以在页面生命周期的任何时点上为它添加事件处理程序（不用等待DOMDontentLoaded或load事件），也就是说，只要可单击的元素呈现在页面上，就可以立即具备适当的功能。
* 在页面中设置事件处理程序需要的时间更少。只需添加一个事件处理程序所需的DOM引用更少，当然花费时间也更少
* 整个页面占据的内容空间更少，能够提升整体性能。

支持事件冒泡是使用事件委托的前提。 最适合采用事件委托技术的事件包括：click、mousedown、mouseup、keydown、keyup、keypress。

#### 移除事件处理程序
 
每当事件处理程序指定给元素时，运行中浏览器代码与支持页面交互的JavaScript代码之间就会建立一个连接。这种连接越多页面执行起来就越慢。如前面所述，可以采用事件委托技术，限制建立的连接数量。 另外，当不需要的时候采用移除事件处理程序，也是解决这个问题的一种方案。内存中留用那些过时不用的"空事件处理程序"，也是造成web应用程序内存与性能问题的主因素。

造成“空事件处理程序”的两种情况：

* 从文档中移除带有事件处理程序的元素时。
 
可能是利用纯粹的DOM操作，例如 removeChild、replaceChild，但是更多是用 innerHTML 替换页面中某一部分的时候。如果带有事件处理程序的元素被innerHTML删除了，那么原来添加到元素中的事件处理程序极有可能无法当作垃圾回收。如下：

``` 
<div id="myDiv"> 
   <input type="button" value="Click Me" id="myBtn"> 
</div> 
<script type="text/javascript"> 
   var btn=document.getElementById("myBtn");  
   btn.onclick=function(){  
      document.getElementById("myDiv").innerHTML="Processing…";
//造成的问题：在div上设置innerHTML可以把按钮一走，但是按钮上的事件处理程序仍然与按钮保持着引用关系  
   }  
</script>  
```
  
上述代码中，因为有的浏览器不会做出恰当的处理，很可能将对元素和对事件处理程序的引用保存于内存中。那么，正确的做法是：如果你知道某个元素即将被删除，那么最好手工移除事件处理程序，如下：

``` 
var btn = document.getElementById("btn");
var myDiv = document.getElementById("myDiv");
btn.onclick = function(){
        btn.onclick = null;//移除事件处理程序，确保了内存可以被再次利用，而从DOM中移除按钮也做到了干净利索。
        myDiv.innerHTML = "";
};
```
* 卸载页面时。

如果在页面被卸载之前没有清理干净事件处理程序。那它们就会滞留在内存中。每次加载完页面再卸载页面时（可能是在两个页面间来加切换，也可以是单击了“刷新”按钮），内存中滞留的对象数目就会增加，因为事件处理程序占用的内存并没有被释放。

解决方法：在页面卸载之前 ，先通过onunload事件处理程序移除所有事件处理程序。在此，事件委托技术再次表现出它的优势——需要跟踪的事件程序越少，移除它们就越容易，对这种类似的操作，我们可把它想象成：只要是通过onload事件处理程序添加的东西，最后都要通过onunload事件处理程序将它们移除。