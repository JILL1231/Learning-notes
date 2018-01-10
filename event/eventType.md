### 事件类型

Web浏览器中可能发生的事件有很多类型。如前所述，不同的事件类型具有不同的信息，而"DOM3级事件"规定了以下8类事件

兼容性参差不齐，调用时建议先查看[兼容性](https://caniuse.com/)

#### UI事件，当用户与页面上的元素交互时触发[向后兼容]

* load事件

当页面完全加载后(包括所有图片、JS文件、CSS文件等外部资源)就会触发window上面的load事件

两种定义onload事件处理程序的方式

1、通过JS来指定事件处理程序的方式
``` 
//这个event对象中不包含有关这个事件的任何附加信息，但在兼容DOM的浏览器中，event.target属性的值会被设置为document，而IE并不会为这个事件设置srcElement属性
EventUtil.addHandler(window,"load",function(event){
    alert("loaded");
    var image = document.createElement("img");
    EventUtil.addHandler(image,"load",function(event){
        event = EventUtil.getEvent(event);
        alert(EventUtil.getTarget(event).src);
    });
    document.body.appendChild(image);
    image.src = "smile.gif";    
});
```
2、为```<body>```元素添加一个onload特性
``` 
...
<body onload = "alert('loaded')">

</body>
...
```

* unload

与load事件对应的是unload事件，这个事件在文档被完全卸载后触发。只要用户从一个页面切换到另一个页面，就会发生unload事件。而利用这个事件最多的情况是清楚引用，以避免内存泄漏

两种定义unload事件处理程序的方式

1、通过JS来指定事件处理程序的方式
``` 
//此时生成的event对象在兼容DOM的浏览器中只包含target属性(值为document)
EventUtil.addHandler(window,"unload",function(event){
    alert("unloaded"); 
});
```
2、为```<body>```元素添加一个unload特性
``` 
...
<body onunload = "alert('onunloaded')">

</body>
...
```

* abort

在用户停止下载过程时，如果嵌入的内容没有加载完，则在```<object>```元素上面触发

* error

当发生JS错误时在window上触发，当无法加载图像时在```<img>```元素上触发，当无法加载嵌入内容时在```<object>```元素上触发...

* select

当用户选择文本框中的一或多个字符时触发

* resize

IE 、Safari 、Chrome 和 Opera 会在浏览器窗口变化了1像素时就触发resize事件，然后随着变化不断重复触发。Firefox则只会在用户停止调整窗口大小时才触发resize事件。因此不要在这个事件的处理程序中加入大计算量的代码，因为这些代码有可能被频繁执行，从而导致浏览器反应明显变慢

两种定义resize事件处理程序的方式

1、通过JS来指定事件处理程序的方式
``` 
//此时生成的event对象在兼容DOM的浏览器中只包含target属性(值为document)
EventUtil.addHandler(window,"resize",function(event){
    alert("resize"); 
});
```
2、为```<body>```元素添加一个resize特性
``` 
...
<body onresize = "alert('resize')">

</body>
...
```

* scroll

虽然scroll事件是在window对象上发生的，但它实际表示的则是页面中相应元素的变化。scroll事件会在文档被滚动期间重复被触发，因此有必要尽量保持事件处理程序的代码简单


#### 焦点事件，当元素获得或失去焦点时触发
利用下列事件并与document.hasFocus()方法及document.activeElement属性配合，可以知晓用户在页面上的行踪

| 焦点事件  | 说明|
| ------------- | ------------- |
| blur  | 在元素失去焦点时触发[不会冒泡]  |
| focus  | 在元素获得焦点时触发[不会冒泡]  |
| focusin  | 在元素获得焦点时触发[冒泡]  |
| focusout  | 在元素失去焦点时触发[冒泡]  |


#### 鼠标事件，当用户通过鼠标在页面上执行操作时触发

| 鼠标事件  | 说明|
| ------------- | ------------- |
| click  | 在用户单击主鼠标按钮或按下回车键时触发  |
| dblclick  | 在用户双击主鼠标按钮时触发  |
| mousedown  | 在用户按下任意鼠标按钮时触发  |
| mouseup  | 在用户释放鼠标按钮时触发  |
| mousemove  | 当鼠标指针在元素内部移动时重复的触发  |
| mouseover  | 当鼠标进入元素时触发，relatedTarget(在IE中是fromElement)指的是鼠标来自的元素  |
| mouseout  | 当鼠标离开元素时触发，relatedTarget(在IE中是toElement)指的是鼠标要去往的元素  |
| mouseenter  | 类似mouseover，但不冒泡  |
| mouseleave  | 类似mouseout，但不冒泡  |

##### 触发事件的顺序[测试代码](https://github.com/JILL1231/Learning-notes/blob/master/test/eventType.html)
* 鼠标移入时，触发mouseover、mouseenter和mousemove事件
``` 
//IE浏览器会先触发一次mousemove事件，再触发mouseover和mouseenter事件，再触发多次mousemove事件

//而其他浏览器都是先触发mouseover和mouseenter事件，再触发多次mousemove事件

<div class="box" id="box1">鼠标移入时，触发mouseover、mouseenter和mousemove事件</div>
<button id="reset1">还原鼠标移入前</button>
<script>
    document.getElementById("reset1").onclick = function(){history.go();}
    var oBox = document.getElementById('box1');
    oBox.onmouseover = oBox.onmouseenter=oBox.onmousemove =function(e){
        e = e || event;
        oBox.innerHTML += e.type+ ';';
    }
</script>
```
* 鼠标移出时，触发mousemove、mouseleave和mouseout事件
``` 
//所有浏览器的顺序都是(1)mousemove、(2)mouseout和(3)mouseleave事件
<div class="box" id="box2">鼠标移出时，触发mousemove、mouseleave和mouseout事件</div>
<button id="reset2">鼠标移出前</button>
<script>
    document.getElementById("reset2").onclick = function(){history.go();}
    var oBox = document.getElementById('box2');
    oBox.onmousemove = oBox.onmouseleave=oBox.onmouseout =function(e){
        e = e || event;
        oBox.innerHTML += e.type+ ';';
    }
</script>
```
* 双击鼠标时，触发mousedown、mouseup、click、dblclick事件
``` 
//一般地，浏览器的顺序是(1)mousedown、(2)mouseup、(3)click、(4)mousedown、(5)mouseup、(6)click、(7)dblclick

//但IE8-浏览器有一个小bug，在双击事件中，它会跳过第二个mousedown和click事件，顺序为(1)mousedown、(2)mouseup、(3)click、(4)mouseup、(5)dblclick

<div class="box" id="box3">双击鼠标时，触发mousedown、mouseup、click、dblclick事件</div>
<button id="reset3">双击鼠标前</button>
<script>
    document.getElementById("reset3").onclick = function(){history.go();}
    var oBox = document.getElementById('box3');
    oBox.onclick = oBox.ondblclick=oBox.onmousedown=oBox.onmouseup =function(e){
        e = e || event;
        oBox.innerHTML += e.type+ ';';
    }
</script>
```
* 嵌套元素的移入移出时，触发mouseover、mouseenter、mouseleave、mouseout事件
``` 
//从父级元素进入子级元素时，顺序为:(1)父级元素的mouseout、(2)子级元素的mouseover、(3)父级元素的mouseover、(4)子级元素的mouseenter

//从子级元素进入父级元素时，顺序为:(1)子级元素的mouseout、(2)父级元素的mouseout、(3)子级元素的mouseleave、(4)父级元素的mouseover

<div class="box" id="box4">嵌套元素的移入移出时，触发mouseover、mouseenter、mouseleave、mouseout事件
    <div class="inner" id="inner"></div>
</div>
<button id="reset4">嵌套元素的移入移出前</button>
<script>
    document.getElementById("reset4").onclick = function(){history.go();}
    var oBox = document.getElementById('box4');
    var oInner = document.getElementById("inner");
    oInner.onmouseenter = oInner.onmouseleave = oInner.onmouseover=oInner.onmouseout = oBox.onmouseenter = oBox.onmouseleave = oBox.onmouseover=oBox.onmouseout = function (e) {
        oInner.innerHTML += e.currentTarget.id.slice(0,1)  + ':' +e.type + ';';
    }
</script>
```
从上面的结果可以看出mouseover、mouseout和mouseleave、mouseenter事件的区别

1、mouseover、mouseout是冒泡的，而mouseleave和mouseenter是不冒泡的

2、从父级元素进入子级元素时，不会触发父级元素的mouseleave事件

3、从子级元素进入父级元素时，不会触发父级元素的mouseenter事件

##### 坐标位置[测试代码](https://github.com/JILL1231/Learning-notes/blob/master/test/eventType1.html)

* 客户区坐标位置 clientX 和 clientY :表示事件发生时鼠标指针在浏览器视口中的水平和垂直坐标[这些值不包括页面滚动的距离]

* 页面坐标位置 pageX 和 pageY :表示鼠标光标在页面中的位置，因此坐标是从页面本身而非视口的左边和顶边计算

* 屏幕坐标位置 screenX 和screenY :鼠标事件发生时鼠标指针相对于整个屏幕的坐标信息

![坐标位置](https://static.oschina.net/uploads/img/201801/05113145_2VsZ.jpg "坐标位置")

注意：
1、x/y与clientX/Y相同，但有兼容问题。firefox浏览器不支持x/y，且IE7-浏览器把视口的左上角坐标设置为(2,2)，其他浏览器则将(0,0)作为起点坐标，所以存在(2,2)的差距

2、layerX/Y与pageX/Y相同，在页面没有滚动的情况下，它们的值与clientX/Y相等

3、当页面无定位元素时，body是元素的定位父级。由于body的默认margin是8px，所以offsetX/Y与clientX/Y差(8,8)，若html的padding与margin设置为0，则相等

##### 修改键
虽然鼠标事件主要是使用鼠标来触发的，但在按下鼠标时键盘上的某些键的状态也可以影响到所要采取的操作

DOM为此规定了4个属性，表示这些修改键的状态：shiftKey 、ctrlKey 、altKey 和 metaKey[window机是window键，苹果机是cmd键，IE8-浏览器不支持]。这些属性中包含的都是布尔值，如果相应的键被按下了，则值为true；否则值为false
``` 
var div = document.getElementById("myDiv");
    EventUtil.addHandler(div, "click", function (e) {
        e = EventUtil.getEvent(e);

        var keys = new Array();
        if(e.shiftKey){
            keys.push("shift");
        }
        if(e.ctrlKey){
            keys.push("ctrl");
        }
        if(e.altKey){
            keys.push("alt");
        }
        if(e.metaKey){
            keys.push("meta");
        }

        console.log("keys: "+ keys.join(","));
    });
```
##### 相关元素
在发生mouseover和mouseout事件时，都会涉及把鼠标指针从一个元素的边界之内移动到另一个元素的边界之内。对mouseover事件而言，事件的主目标是获得光标的元素，而相关元素就是失去光标的元素

DOM通过event对象的relatedTarget属性提供了相关元素的，该属性只对于mouseover和mouseout事件才包含值，对其它事件的值为null[IE8-浏览器不支持relatedTarget属性]

``` 
var EventUtil = {
        ...
        getRelatedTarget:function(event){
            if(event.relatedTarget){
                return event.relatedTarget;
            }else if(event.toElement){ //在mouseout事件触发时，IE的toElement属性中保存着相关元素
                return event.toElement;
            }else if(event.fromElement){ //在mouseover事件触发时，IE的fromElement属性中保存着相关元素
                return event.fromElement;
            }else{ //
                return null;
            }
        }
    }
```
``` 
EventUtil.addHandler(mydiv,"mouseout",function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    var relatedTarget = EventUtil.getRelatedTarget(event);
    console.log("mouse out of "+target.tagName + " to "+relatedTarget.tagName);
});
```
##### 鼠标按钮

button属性返回事件鼠标按键信息

DOM的button属性有如下3个值
* 0:表主鼠标按钮(鼠标左键)
* 1:表中间的鼠标
* 2:表次鼠标按钮(鼠标右键)

IE及之前的版本的button属性
* 0:表示没有按下按钮
* 1:表示按下了左键
* 2:表示按下了右键
* 3:表示同时按下了左、右键
* 4:表示按下了滚轮
* 5:表示同时按下了左键和滚轮
* 6:表示同时按下了右键和滚轮
* 7:表示同时按下了左键、右键和滚轮

此时，无法使用能力检测来确定差异，可以通过hasFeature()方法来检测，关于hasFeature()方法的详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/4853121.html)
``` 
var EventUtil = {
    getButton:function(event){
        if(document.implementation.hasFeature("MouseEvents","2.0")){
            return event.button;
        }else{
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
                    
            }
        }
    }
}
```
``` 
EventUtil.addHandler(div,"mousedown",function(event){
    event = EventUtil.getEvent(event);
    console.log(EventUtil.getButton(event));
}
```
##### 鼠标滚轮事件
当用户听过鼠标滚轮与页面交互、在垂直方向上滚动页面时，就会触发mousewheel事件，而Firefox支持一个名为DOMMouseScroll的类似事件

注意：

1、鼠标滚轮事件可以在任何元素上触发，最终会冒泡到document(IE8)或window(IE9 、Opera 、Chrome 、Safari及Firefox)

2、与mousewheel事件对应的event对象除包含鼠标事件的所有标准信息外，还包含一个特殊的wheelDelta属性。当用户向前滚动滚轮时，wheelDelta是120的倍数，向后时，是－120的倍数［］；而DOMMouseScroll有关滚轮的信息则保存在detail属性中，当向前滚动鼠标滚轮时，这个属性的值是－3的倍数，向后时，是3的倍数

跨浏览器环境下的解决方案
``` 
var EventUtil = {
    getWheelDelta:function(event){
        if(event.wheelDelta){
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        }else{
            return -event.detail*40;
        }
    }
}
```
``` 
(function () {
    function handleMouseWheel(event) {
        event = EventUtil.getEvent(event);
        var delta = EventUtil.getWheelDelta(event);
        console.log(delta);
    }
    EventUtil.addHandler(document,"mousewheel",handleMouseWheel);
    EventUtil.addHandler(document,"DOMMouseScroll",handleMouseWheel);
})();
```

#### 键盘事件，当用户通过键盘在页面上执行操作时触发
3个键盘事件
* keydown ：当用户按下键盘上的任意键时触发，而且如果按住不放的话，会重复触发此事件
* keypress：当用户按下键盘上的字符键时触发，而且如果按住不放的话，会重复触发此事件［按下Esc键会触发，Safari3.1之前的版本 会在用户按下非字符键时触发］
* keyup   ：当用户释放键盘上的键时触发

用户按下键盘上的字符键时，触发顺序：keydown->keypress->keyup。其中，keydown和keypress都是在文本框发生变化之前被触发的；而keyup事件则是在文本框已经发生变化之后被触发的

用户按下键盘上的非字符键时，触发顺序：keydown->keyup

##### 键码
charCode 返回keypress事件的键代码。keyCode 返回 keydown 或 keyup 事件的键代码。对数字字母字符键，键代码与ASCII码中对应小写字母或数字,[具体查看键码](https://baike.baidu.com/item/ASCII/309296?fr=aladdin)。
``` 
var EventUtil = {
    getCharCode:function(event){
        //在不支持这个属性的浏览器中，值为undefined
        if(typeof event.charCode == "number"){
            return event.charCode;
        }else{
            return event.keyCode;
        }
    }
}
```
```  
var textBox = document.getElementById("myText");
EventUtil.addHandler(textBox,"keypress",function (event) {
    event = EventUtil.getEvent(event);
    console.log(EventUtil.getCharCode(event));
})
```

#### 文本事件，当在可编辑区域中输入字符时，就会触发textInput事件
与keypress事件的区别：

* 任何可以获得焦点的元素都可以触发keypress事件，但只有可编辑区域才能触发textInput事件
* textInput事件只会在用户按下能够输入实际字符的键时才会被触发，而keypress事件则在按下那些能够影响文本显示的键时也会触发（如退格键）

textInput事件主要考虑的是字符，它的event对象中包含一个data属性，其值就是用户输入的字符(而非字符编码)

```  
var textBox = document.getElementById("myText");
EventUtil.addHandler(textBox,"textInput",function (event) {
    event = EventUtil.getEvent(event);
    console.log(event.data);
})
```
另外，event对象上还有一个属性，叫inputMethod，表示把文本输入到文本框中［只有IE支持］

#### 复合事件，当为IME(Input Method Editor，输入法编辑器)输入字符时触发
IME通常需要同时按住多个键，但最终只输入一个字符。复合事件就是针对检测和处理这种输入而设计的。有一下三种复合事件
* compositionstart：在IME的文本复合系统打开时触发，表示要开始输入了
* compositionupdate：在向输入字段中插入新字符时触发
* compositionend：在IME的文本复合系统关闭时触发，表示返回正常键盘输入状态

支持性不高，IE9+支持
``` 
//确定浏览器是否支持复合事件
var isSupported = document.implementation.hasFeature("CompositionEvent","3.0");
```

#### 变动事件，当底层DOM结构发生变化时触发
变动事件是为XML或HTML DOM设计的，并不特定于某种语言
* DOMSubtreeModified：在DOM结构中发生任何变化时触发
* DOMNodeInserted：在一个节点作为子节点被插入到另一个节点时触发[会冒泡]
* DomNodeInsertedIntoDocument：在一个节点被直接插入文档或通过子树间接插入文档之后触发，这个事件在DOMNodeInserted之后触发[不会冒泡]
* DOMNodeRemoved：在节点从其父节点中被移除时触发[会冒泡]
* DOMNodeRemoveFromDocument：在一个节点被直接从文档中移除或通过子树间接从文档中移除之前触发，这个事件在DOMNodeRemoved之后触发[不会冒泡]
* DOMAttrModified：在特性被修改之后触发
* DOMCharacterDataModified：在文本节点的值发生变化时触发

使用下列代码可以检测浏览器是否支持变动事件
``` 
var isSupported = document.implementation.hasFeature("MutationEvents","2.0");
```
#### HTML5事件

* 1、contextmenu事件[测试代码](https://github.com/JILL1231/Learning-notes/blob/master/test/contextmenu.html)

用于表示何时应该显示上下文菜单，以便开发者取消默认的上下文菜单而提供自定义的菜单

由于contextmenu事件是冒泡的，因此可以为document指定一个事件处理程序，用于处理页面中发生的所有此类事件。这个事件的目标是发生用户操作的元素。在所有浏览器中都可以取消这个事件：EventUtil.preventDefault(event)

通常使用contextmenu事件来显示自定义的上下文菜单，而使用onclick事件处理程序来隐藏该菜单

* beforeunload事件

这个事件会在浏览器卸载页面之前触发，可以通过它来取消卸载并继续使用原有页面，其意图是将控制权交给用户。显示的消息会告知用户页面将被卸载，询问用户是否真的要关闭页面，还是继续留下来
``` 
//chrome 无反应
EventUtil.addHandler(window,"beforeunload",function (event) {
    event = EventUtil.getEvent(event);
    var message = "您将会离开这个页面";
    //为了显示这个弹出对话框，必须将event.returnValue的值设置为要显示给用户的字符串,同时作为函数值返回
    event.returnValue = message;
    return message;
})
```
* DOMContentLoaded 事件

window的load事件会在页面中的一切都加载完毕时触发，但这个过程可能会因为要加载的外部资源过多而破费周折。而DOMContentLoaded事件则在形成完整的DOM树之后就会触发，不理会图像，JS文件，CSS文件等

与load事件不同，DOMContentLoaded支持在页面下载的早期添加事件处理程序
``` 
//尽管这个事件会冒泡到window，但它的目标实际上是document
EventUtil.addHandler(document,"DOMContentLoaded",function (event) {
    console.log("content load");
})
```

* readystatechange 事件

这个事件的目的是提供与文档或元素的加载状态有关的信息。支持readystatechange事件的每个对象都有一个readyState属性，可能包含下列5个值中的一个［如果某个阶段不适用某个对象，则该对象完全可能跳过该阶段］
* uninitialized(未初始化)：对象存在但尚未初始化
* loading(正在加载)：对象正在加载数据
* loaded(加载完毕)：对象加载数据完成
* interactive(交互)：可以操作对象了，但还没有完全加载
* complete(完成)：对象已经加载完毕

在包含较多外部资源的页面中，交互阶段更有可能早于完成阶段出现；而在页面较少外部资源的情况下，完成阶段先于交互阶段出现的可能性更大。因此，为了尽可能抢到先机，有必要同时检测交互和完成阶段
``` 
EventUtil.addHandler(document,"readystatechange",function (event) {
    if(document.readyState == "interactive" || document.readyState == "complete"){
        //由于事件处理程序实用的是匿名函数，因此这里使用了arguments.callee来引用该函数
        EventUtil.removeHandle(document,"readystatechange",arguments.callee);
        console.log("content loaded");
    }
})
```

* pageshow 和 pagehide 事件

FF 和 opera 有一个特性，名叫"往返缓存"(back-forward cache)可以在用户使用浏览器的"后退"和"前进"按钮时加快页面的转换速度。这个缓存不仅保存着页面数据，还保存了DOM 和 JS 的状态；实际上是将整个页面都保存在内存里

如果页面位于bfcache中，那么再次打开该页面时就不会触发load事件。为了我更形象地说明bfcache的行为，FF提供了些新事件
###### pageshow ：在页面显示时触发，无论该页面是否来自bfcache［事件的目标是document，但必须将其事件处理程序添加到window］
除了通常的属性之外，pageshow事件的event对象还包含一个名为persisted的布尔值属性，如果页面被保存在bfcache中，则这个属性的值为true，否则为false
``` 
//chrome亲测有问题
(function(){
    var showCount = 0;

    EventUtil.addHandler(window,"load",function (event) {
        alert("Load fired");
    });

    EventUtil.addHandler(window,"pageshow",function (event) {
        showCount++;
        alert("show has been fired "+showCount + "time . Persisted ? "+event.persisted);
    })
})()
```
###### pagehide : 在浏览器卸载页面的时候触发，而且在unload事件之前触发［事件的目标是document，但必须将其事件处理程序添加到window］
如果页面在卸载之后会保存在bfcache中，persisted的值为true

因此，当第一次触发pageshow时，persisted的值一定是false，而在第一次触发pagehide时，persisted就会变成true

* hashchange 事件

该事件在URL的参数列表(及URL中"#"号后面的所有字符串)发生变化时通知开发人员

必须要把hashchange事件处理程序添加给window对象，然后URL参数列表只要变化就会调用它
``` 
EventUtil.addHandler(window,"hashchange",function (event) {
    //oldURL和newURL 支持不高
    console.log("Old URL : " + event.oldURL + "\nNew URL : " + event.newURL);

    console.log("current hash : " + location.hash);
})
```
检测浏览器是否兼容hashchange事件
``` 
var isSupported = ("onhashchange" in  window ) && (document.documentMode === undefined || document.documentMode > 7);
```

#### 设备事件

##### 1、orientationchange 事件 
确定用户何时将设备由横向查看模式切换为纵向查看模式。移动Safari的window.orientation属性值可能包含3个值：
* 0表示肖像模式
* 90表示向左旋转的横向模式
* -90表示向右旋转的横向模式
``` 
EventUtil.addHandler(window,"load",function (event) {
    var div = document.getElementById("myDiv");
    div.innerHTML = "Current orientation is "+window.orientation;
    EventUtil.addHandler(window,"orientationchange",function (event) {
        div.innerHTML = "Current orientation is "+window.orientation;
    })
})
```

##### 2、MozOrientation 事件
FF3.6为检测设备的方向引入MozOrientation事件[前缀Moz表示这是特定于浏览器开发商的事件，不是标准事件]但这个事件与IOS中的orientationchange事件不同，该事件只能提供一个平面的方向变化

此时的event对象包含三个属性：x,y和z。这几个属性的值都介于1到－1之间，表示不同坐标轴上的方向
* 静止状态 ：x = y = 0 ,z = 1(表示设备处于竖直状态)
* 设备向右倾斜，x值会减小，反之，向左倾斜，x值会增大
* 设备向远离用户的方向倾斜，y值会减小，反之，向接近用户的方向倾斜，y值会增大
* z值检测垂直加速度，1表示静止不动，在设备移动时值会减小
``` 
EventUtil.addHandler(window,"MozOrientation",function (event) {
    var div = document.getElementById("myDiv");
    div.innerHTML = "X = "+event.x +",Y = "+event.y +",Z = "+event.z;
})
```
只有带加速计的设备才支持MozOrientation

##### 3、deviceorientation 事件
deviceorientation事件也是在加速计检测到设备方向变化时在window对象上触发，而且具有与MozOrientation事件相同的支持限制。不过，deviceorientation事件的意图是告诉开发人员设备在空间中朝向哪儿，而不是如何移动

设备在三维空间中是靠 x,y和z 轴来定位的。当设备静止放在水平表面上时，这三个值都是0。x轴方向是从左往右，y轴方向从下往上，z轴方向是从后往前
![deviceorientation事件](https://i-technet.sec.s-msft.com/dynimg/IC677939.png)

触发deviceorientation事件时，事件对象中包含着每个轴相对于设备静止状态下发生变化的信息。事件对象包含以下5个属性

* alpha：在围绕Z轴旋转时(即左右旋转时)Y轴的度数差［0 - 360之间的浮点数］
* beta：在围绕X轴旋转时(即前后旋转时)Z轴的度数差［－180 － 180之间的浮点数］
* gamma：在围绕Y轴旋转时(即扭转设备时)Z轴的度数差［－90 － 90之间的浮点数］
* absolute：表示设备是否返回一个绝对值 ，布尔值
* compassCalibrated：表示用户的指南针是否校准过 ，布尔值

##### 4、devicemotion 事件
这个事件告诉开发者 设备什么时候移动，而不仅仅是设备方向如何改变。事件对象包含以下属性
* acceleration:一个包含 X ,Y 和 Z属性的对象，在不考虑重力的情况下，告诉你在每个方向上的加速度
* accelerationIncludingGravity:一个包含 X ,Y 和 Z属性的对象，在考虑Z轴自然重力加速度的情况下，告诉你在每个方向上的加速度
* rotationRate:一个包含表示方向的alpha beta gamma属性的对象

若读取不到以上三个属性的值，则它们的值为null
* interval:以毫秒表示的时间值，必须在另一个devicemotion事件出发前传入 ［常量］

#### 触摸与手势事件

##### 触摸事件
* touchstart：当手指触摸屏幕时触发；即使已经有一个手指放在了屏幕上也会触发。
* touchmove：当手指在屏幕上滑动时连续地触发。在这个世界发生期间，调用preventDefault()可以阻止滚动。
* touchend：当手指在屏幕上移开时触发。
* touchcancel：当系统停止跟踪触摸时触发。关于此事件的确切触发时间，文档中没有明确说明。

上面这几个事件都会冒泡，也都可以取消。虽然这些触摸事件没有在DOM规范中定义，但它们却是以兼容DOM的方式实现的。因此，每个触摸事件的event对象都提供了鼠标事件中常见的属性：bubbles,cancelable,view,clientX,clientY,screenX,screenY,detail,altKey,shiftKey,ctrlKey和metaKey。

除了常见的DOM属性外，触摸世界还包含下列三个用于跟踪触摸的属性。

* touches:表示当前跟踪的触摸操作的Touch对象的数组。
* targetTouches:特定于事件目标的Touch对象的数组。
* changedTouches:表示字上次触摸以来发生了什么改变的Touch对象的数组。

每个Touch对象包含下列属性：

* clientX:触摸目标在视口中的x坐标。
* clientY：触摸目标在视口中的y坐标。
* identifier:标识触摸的唯一ID。
* pageX：触摸目标在页面中的x坐标。
* pageY：触摸目标在页面中的y坐标。
* screenX：触摸目标在屏幕中的x坐标。
* screenY：触摸目标在屏幕中的y坐标。
* target：触摸的DOM节点目标。

``` 
function handlerTouchEvent(event) {
    //只跟踪一次触摸
    //因为当触发touchend事件的时候，event.touches.length等于0
    if (event.touches.length == 1 || event.touches.length == 0) {
        var output = document.getElementById("output");
        switch (event.type) {
            case "touchstart":
                output.innerHTML = "Touch started ( " + event.touches[0].clientX + ", " + event.touches[0].clientY + ")";
                break;
            case "touchend":
                //在touched事件发生时，touches集合中就没有任何Touch对象了，因为不存在活动的触摸操作；此时，就必须转而使用changedTouches集合。
                output.innerHTML += "<br/>Touch ended (" + event.changedTouches[0].clientX + ", " + event.changedTouches[0].clientY + ")";
                break;
            case "touchmove":
                event.preventDefault(); //取消其默认行为[滚动页面]，阻止滚动
                output.innerHTML += "<br/>Touch moved (" + event.changedTouches[0].clientX + ", " + event.changedTouches[0].clientY + ")";
        }
    }
}

EventUtil.addHandler(document, "touchstart", handlerTouchEvent);
EventUtil.addHandler(document, "touchend", handlerTouchEvent);
EventUtil.addHandler(document, "touchmove", handlerTouchEvent);
```
这些事件会在文档的所有元素上面触发，因而可以分别操作页面的不同部分。在触摸屏幕上的元素时，这些事件（包括鼠标事件） 发生的顺序如下：

* touchstart
* mouseover
* mousemove（一次）
* mousedown
* mouseup
* click
* touched

##### 手势事件

当两个手指触摸屏幕时就会产生手势，手势通常会改变显示项的大小，或者旋转显示项。有三个手势事件，如下：

* gesturestart:当一个手指已经按在屏幕上而另一个手指又触摸屏幕时触发。
* gesturechange:当触摸屏幕的任何一个手指的位置发生变化时触发。
* gestureend:当任何一个手指从屏幕上移开时触发。

只有两个手指都触摸到事件的接收容器时才会触发这些事件。

在一个元素上设置事件处理程序，意味着两个手指必须同时位于该元素的范围之内，才能触发手势事件（这个元素就是目标）。

由于这些事件冒泡，所以将事件处理程序放在文档上也可以处理所有手势事件。

每个手势事件的event对象都包含着标准的鼠标事件属性：bubbles,cancelable,view,clientX,clientY,screenX,screenY,detail,altKey,shiftKey,ctrlKey和metaKey。此外还有两个额外的属性：rotation和scale。

* rotation属性：表示手指变化引起的旋转角度，负值表示逆时针旋转，正值表示顺时针旋转（该值从0开始）。
* scale属性：表示两个手指间距离的变化情况（例如向内收缩会缩短距离）；这个值从1开始，并随距离拉大而增长，随距离缩短而减小。