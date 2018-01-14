/**
 * Created by Jill on 18/1/8.
 * 跨浏览器环境下的解决方案
 */
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) { //DOM2级方法
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) { //IE方法
            element.attachEvent("on" + type, handler);
        } else { //DOM0级方法
            element["on" + type] = handler;
        }
    },
    removeHandle: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.removeEventListener) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    getEvent: function (event) { //兼容DOM0级方法
        return event ? event : window.event;
    },
    getTarget: function (event) { //兼容IE
        return event.target || event.srcElement;
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else { //兼容IE
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else { //兼容IE
            event.cancelBubble = true;
        }
    },
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
    },
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
    },
    getWheelDelta:function(event){
        if(event.wheelDelta){
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        }else{
            return -event.detail*40;
        }
    },
    getCharCode:function(event){
        //在不支持这个属性的浏览器中，值为undefined
        if(typeof event.charCode == "number"){
            return event.charCode;
        }else{
            return event.keyCode;
        }
    },
    //从剪贴板取得数据
    getClipboardText:function (event) {
        var clipboardData = (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },
    //将文本放到剪贴板去
    setClipboardText:function (event,value) {
        if(event.clipboardData){
            //Safari Chrome
            return event.clipboardData.setData("text/plain",value);
        }else if(window.clipboardData){
            //IE
            return window.clipboardData.setData("text",value);
        }
    }
}