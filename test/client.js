/**
 * Created by Jill on 18/1/8.
 * 用户代理检测脚本，检测范围包括浏览器引擎、平台、Windows、移动设备和游戏系统
 */

var client = function () {
    var engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        ver: null//保存具体的浏览器版本
    };
    return {
        engine: engine
    };
}();
var engine = client.engine;
var ua = navigator.userAgent;
//第一步，我们识别Opera，因为其用户代理字符串都不会将自己标记为Opera
if (window.opera) {
    engine.ver = window.opera.version();
    //获取表示浏览器版本的字符串，而这也是确定opera版本号的最佳方法
    //要确定更早版本的Opera可以用用户代理字符串，因为那时候的版本还
    //不支持隐藏身份，不过在Opera在2007年已经是9.5，所以不太可能在7.6之前版本
    engine.opera = parseFloat(engine.ver);
}
//第二步检测webkit，因为webkit用户代理字符串包含gecko进而khtml，但是AppleWebkit
//字符串是webkit浏览器独一无二的
//格式："Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36"
else if (/AppleWebKit\/(\S+)/.test(ua)) {
    engine.ver = RegExp['$1'];
    //正则表达式的静态属性!
    engine.webkit = parseFloat(engine.ver);
} else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
    //第三步检测KTHML，KHTML的版本号和webkit版本好在用户代理格式上差不多
    //因此可以用类似的正则表达式，此外，由于Konqueror3.1以及更早版本不包含
    //KTHML版本号，因此用Konqueror版本来代替([^;]表示不是分好的所有字符)
    engine.ver = RegExp['$1'];
    engine.khtml = parseFloat(engine.ver);
} else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
//第四步检测Gecko,但是版本号出现在rv:后面!([^\)]+)表示非")"所有字符!
//格式为："Mozilla/5.0 (Windows NT 6.1; rv:42.0) Gecko/20100101 Firefox/42.0"
//与SF和webkit一样，FF和Gecko版本号也不一定严格对应
    engine.ver = RegExp['$1'];
    engine.gecko = parseFloat(engine.ver);
} else(/MSIE ([^;]+)/.test(ua))
{
//格式为:"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729;
    engine.ver = RegExp['$1'];
    engine.ie = parseFloat(engine.ver);
}
