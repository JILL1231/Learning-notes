### 事件对象

#### DOM中的事件对象
兼容DOM的浏览器会将一个event对象传入到事件处理程序中。无论指定事件处理程序时使用什么方法，都会传入event对象
``` 
//在需要通过一个函数处理多个事件时，可以使用type属性
var btn = document.getElementById("myBtn");

var handler = function(event){
    switch(event.type){
        case "click":
            alert("clicked");
            break;
        case "mouseover":
            alert("mouseover");
            break;
        case "mouseout":
            alert("mouseout");
            break;
    }
};
btn.onclick = handler;
btn.onmouseover = handler;
btn.onmouseout = handler;
```
``` 
//阻止特定事件的默认行为，可使用preventDefault()。如阻止链接点击后会导航到其href特性指定的URL
var link = document.getElementById("myLink");
link.addEventListener("click",function(event){
    event.preventDefault();
},false)
```
``` 
//stopPropagation()方法用于立即停止事件在DOM层次中的传播，即取消进一步的事件捕获或冒泡，如直接添加一个按钮的事件处理程序可以调用stopPropagation()，从而避免触发注册在document.body上面的事件处理程序

var btn = document.getElementById("myBtn");
btn.onclick = function(event){
    alert("clicked");
    event.stopPropagation();
};
documeny.body.onclick = function(event){
    alert("body clicked");
}
```
event对象包含与创建它的特定事件有关的属性和方法。触发的事件类型不一样，可用的属性和方法也不一样。不过，所有事件都会有下列成员

| 属性／方法 | 类型 | 读／写 | 说明 |
| ------------- | ------------- | ------------- | ------------- |
| bubbles  | boolean  | 只读  | 表明事件是否冒泡  |
| cancelable  | boolean  | 只读  | 表明是否可以取消事件的默认行为  |
| currentTarget  | element  | 只读  | 其事件处理程序当前正在处理事件的那个元素  |
| defaultPrevented  | boolean  | 只读  | 为true表示已经调用了preventDefault()  |
| detail  | integer  | 只读  | 与事件相关的细节信息  |
| eventPhase  | integer  | 只读  | 调用事件处理程序的阶段：1表示捕获阶段，2表示"处于目标"，3表示冒泡阶段  |
| preventDefault()  | function  | 只读  | 取消事件的默认行为。若cancelable是true，则可以使用这个方法  |
| stopImmediatePropagation()  | function  | 只读  | 取消事件的进一步捕获或冒泡，同时阻止任何事件处理程序被调用  |
| stopPropagation  | function  | 只读  | 取消事件的进一步捕获或冒泡。若bubbles为true，则可以使用这个方法  |
| target  | element  | 只读  | 事件的目标  |
| trusted  | boolean  | 只读  | 为true表示事件是浏览器生成的。为false表示事件是由开发人员通过javascript创建的  |
| type  | string  | 只读  | 被触发的事件的类型  |
| view  | abstractView  | 只读  | 与事件关联的抽象视图。等同于发生事件的window对象  |

在事件处理程序内部，对象this始终等于currentTarget的值，而target则只包含事件的实际目标
#### IE中的事件对象
与访问DOM中的event对象不同，要访问IE中的event对象有几种不同的方式，取决于指定事件处理程序的方法
```  
//在使用DOM0级方法添加事件处理程序时，event对象作为window对象的一个属性存在
var btn = document.getElementById("myBtn");
btn.onclick = function(){
    var event = window.event;
    alert(event.type);//"click"
}

//若事件处理程序是使用attachEvent()添加的，那么就会有一个event对象作为参数被传入事件处理程序函数中
var btn = document.getElementById("myBtn");
btn.attachEvent("onclick",function(event){
    alert(event.type);//"click"
});
```


| 属性／方法 | 类型 | 读／写 | 说明 |
| ------------- | ------------- | ------------- | ------------- |
| cancelBubble  | boolean  | 读/写  | 默认值为false，但将其设置为true就可以取消事件冒泡(与DOM中的stopPropagation()方法的作用相同)  |
| returnValue  | boolean  | 读/写  | 默认值为true，但将其设置为false就可以取消事件的默认行为(与DOM中的preventDefault()方法的作用相同)  |
| srcElement  | element  | 只读  | 事件的目标(与DOM中的target属性相同)  |
| type  | string  | 只读  | 被触发的事件的类型  |

因为事件处理程序的作用域是根据指定他的方式来确定的，所以不能认为this会始终等于事件目标，故而，最好使用event.srcElement比较保险
``` 
var btn = document.getElementById("myBtn");

btn.onclick = function(){
    alert(window.event.srcElement === this);//true
};
btn.attachEvent("click",function(event){
    alert(event.srcElement === this);//false
});
```

#### 跨浏览器的事件对象

``` 
var EventUtil = {
    //跨浏览器的事件处理程序
    addHandle:function(element,type,handler){
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
    },
    getEvent:function(event){
        return event ? event : window.event;
    },
    getTarget:function(event){
        return event.target || event.srcElement;
    },
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    stopPropagation:function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    }
}
```
``` 
var btn = document.getElementById("myBtn");
btn.onclick = function(event){
    alert("clicked");
    event =  EventUtil.getEvent(event);
    EventUtil.stopPropagation(event);
};
document.body.onclick = function(event){
    alert("body clicked");
}
```