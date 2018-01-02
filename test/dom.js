/**
 * Created by Jill on 17/12/28.
 */

//偏移量
function getElementLeft(element){
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;//在DOM层次中逐级向上回溯，将每个层次中的偏移量合计到一块

    while(current !== null){
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }

    return actualLeft;
}

function getElementTop(element){
    var actualTop = element.offsetTop;
    var current = element.offsetParent;

    while(current !== null){
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }

    return actualTop;
}

//确定元素大小

function getBoundingClientRect(element) {
    var scrollTop = document.documentElement.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft;
}
