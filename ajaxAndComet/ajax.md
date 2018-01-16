### XMLHttpRequest对象
在IE5中，XHR对象是通过MSXML库中的一个ActiveX对象实现的。因此，在IE中可能会遇到三种不同版本的XHR对象，即MSXML2.XMLHttp、MSXML2.XMLHttp3.0、MSXML2.XMLHttp6.0 。要使用MSXML库中的XHR对象，需编写一个函数

IE7+及其它浏览器都支持原生的XHR对象，在这浏览器中创建XHR对象可使用XMLHttpRequest构造函数
``` 
var xhr = new XMLHttpRequest();
```
若是要支持IE早期版本，则
``` 
function createXHR() {
    //检测原生XHR对象是否存在
    if(typeof XMLHttpRequest !== "undefined"){
        return new XMLHttpRequest();
    }
    //检测ActiveX对象，兼容IE7之前版本
    else if(typeof ActiveXObject !== "undefined"){
        if(typeof arguments.callee.activeXString !== "string"){
            var versions = ["MSXML2.XMLHttp6.0","MSXML2.XMLHttp3.0","MSXML2.XMLHttp"],i,len;
            for(i=0;i<versions.length;i++){
                try{
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                }catch(ex){
                    //跳过
                } 
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    }
    //两种对象都不存在，抛出错误
    else{
        throw new Error("NO XML OBJECT AVAILABLE")
    }
}
```
然后就可使用下面的代码在所有浏览器中创建XHR对象
``` 
var xhr = createXHR();
```
#### XHR的用法
##### ```open(发送的请求的类型,请求的URL,表示是否异步发送请求的布尔值)```，需要说明两点：1、请求的URL相对于执行代码当前的页面，也可以是绝对路径；2、调用open()方法并不会真正发送请求，而只是启动一个请求以备发送
``` 
xhr.open("get","example.php","false");
```
只能向同一个域中使用相同端口和协议的URL发送请求。如果URL与启动请求的页面有任何差别，都会引发安全错误

#####  ```send(要作为请求主题发送的数据)```，需要说明两点：1、若不需通过请求主体发送数据，则必须传入null，因为这个参数对有些浏览器来说是必须的；2、要发送特定的请求，必须调用send()方法

XHR对象相关属性如下：
* readyState：表示请求／响应过程的当前活动阶段[异步时需要判断]

    0：未初始化。尚未调用open()方法
    
    1：启动。已调用open()方法，但尚未调用send()方法
    
    2：发送。已调用send()方法，但尚未收到响应
    
    3：接收。已经接收到部分响应数据
     
    4：完成。已经接收到全部响应数据，而且已经可以在客户端使用了 

* responseText：作为响应主体被返回的文本

* responseXML：如果响应的内容类型是"text/xml" or "application/xml"，这个属性中将保存包含着响应数据的XML DOM文档

* status：响应的HTTP状态

    200：标志成功
    
    304：表示请求的资源并没有被修改

* statusText：HTTP状态的说明

``` 
var xhr = createXHR();

//只要readyState属性的值由一个值变成另一个值，都会触发一次readystatechange事件，利用这个事件检测每次状态变化后的readyState的值[发送异步请求时需加此判断]
xhr.onreadystatechange = function () {
    if(xhr.readyState === 4){
        //一般来说，状态代码为200标志成功，此外，状态代码为304表示请求的资源并没有被修改，可以直接用浏览器中缓存的版本[发送同步请求时只需此判断]
        if((xhr.status >= 200 && xhr.status < 300)||xhr.status == 304){
            console.log(xhr.responseText);
        }else{
            console.log("request was unsuccesssful: "+xhr.status);
        } 
    }
};

xhr.open(get,"example.php",false);
xhr.send(null);

```
另外，在接收到响应之前可以调用```abort()```方法来取消异步请求
``` 
xhr.abort();
```
#### HTTP头部信息
每个HTTP请求和响应都会带有相应的头部信息，XHR对象也提供了操作这两种头部信息的方法

* Accept：浏览器能够处理的内容类型

* Accept-Charset：浏览器能够显示的字符集

* Accept-Encoding：浏览器能够处理的压缩编码

* Accept-Language：浏览器当前设置的语言

* Connection：浏览器与服务器之间连接的类型

* Cookie：当前页面设置的任何Cookie

* Host：发出请求的页面所在域

* Referer：发出请求的页面的URI

* User-Agen：浏览器的用户代理字符串

##### 使用setRequestHeader(头部字段的名称，头部字段的值)方法可设置自定义的请求头部信息[建议自定义的头部字段不要使用浏览器正常发送的字段名称，否则可能影响服务器响应]

``` 
//省略前面相同部分
xhr.open(get,"example.php",false);
xhr.setRequestHeader("myHeader","myValue");
xhr.send(null);
```

##### 调用XHR对象的getResponseHeader(传入头部字段名称)方法，可取得相应的响应头部信息

``` 
var myHeader = xhr.getResponseHeader("myHeader");
```

##### 而调用getAllResponseHeader()方法则可取得一个包含所有头部信息的长字符串
``` 
var allHeader = xhr.getAllResponseHeaders();
```
#### GET请求
使用get请求经常会发生的一个错误，就是查询字符串的格式有问题。查询字符串中每个参数的名称和值都必须使用encodeURIComponent()进行编码，然后才能放到URI的末尾；而且所有键值对都必须由```&```分隔
``` 
function addURIParam(url,name,value){
    url += (url.indexOf("?") === -1 ? "?":"&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}

var url = "example.php";

//添加参数
url = addURIParam(url,"name","jill");
url = addURIParam(url,"school","shenda");

//初始化请求
xhr.open("get",url,false);
```

#### POST请求
通常用于向服务器发送应该保存的数据，应该把数据作为请求的主体提交，可以包含非常多的数据，且格式不限。

服务端读取POST数据

1、默认情况下，服务器对POST请求和提交Web表单不会一视同仁，故服务端需要程序来读取发送的原始数据，并解析出有用部分。

2、XHR模拟表单提交：

* 将Content-Type头部信息设置为application/x-www-form-urlencoded (即表单提交时的内容问题)；

* 以适当格式创建一个字符串。(通过serialize()函数创建该字符串，序列化表单数据)

``` 

function submitData(){
    var xhr = createXHR();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                alert(xhr.resopnseText);
            }else{
                alert("Request was unsuccessful: "+xhr.status);
            }
        }
    };

    xhr.open("post","postExample.php",true);
    //表单提交时的内容类型
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    
    var form = document.getElementById("user-info");
    //POST数据格式与查询字符串格式相同，若需要将页面中的表单数据进行序列化，然后通过XHR放到服务器，则可以使用serialize函数来创建字符串
    xhr.send(serialize(form));
}
```

#### [FormData](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects)
XMLHttpRequest Level 2添加了一个新的接口FormData.利用FormData对象,我们可以通过JavaScript用一些键值对来模拟一系列表单控件,我们还可以使用XMLHttpRequest的send()方法来异步的提交这个"表单".比起普通的ajax,使用FormData的最大优点就是我们可以异步上传一个[二进制文件](https://developer.mozilla.org/zh-CN/docs/Web/API/File/Using_files_from_web_applications)
##### 参数  form (可选)
一个HTML表单元素,可以包含任何形式的表单控件,包括文件输入框.

##### append()方法给当前FormData对象添加一个键/值对
* name : 字段名称.
* value : 字段值.可以是,或者一个字符串,如果全都不是,则该值会被自动转换成字符串.
* filename : (可选) 指定文件的文件名,当value参数被指定为一个Blob对象或者一个File对象时,该文件名会被发送到服务器上,对于Blob对象来说,这个值默认为"blob".
``` 
void append(DOMString name, Blob value, optional DOMString filename);
void append(DOMString name, DOMString value);
```
``` 
//创建一个FormData对象
var formData = new FormData();

//用 append 以键值的形式将数据加入进去
formData.append("username", "Groucho");
formData.append("accountnum", 123456); // 数字 123456 会被立即转换成字符串 "123456"

// HTML 文件类型input，由用户选择
formData.append("userfile", fileInputElement.files[0]);

// JavaScript file-like 对象
var content = '<a id="a"><b id="b">hey!</b></a>'; // 新文件的正文...
var blob = new Blob([content], { type: "text/xml"});

formData.append("webmasterfile", blob);

var xhr = createXHR();
xhr.open("POST", "http://foo.com/submitform.php");
xhr.send(formData);
```

#### 超时设定
``` 
var xhr = createXHR();

xhr.open('GET', '/server', true);// 异步哦

xhr.timeout = 2000; // 超时时间，单位是毫秒

xhr.onload = function () {
  // 请求完成。在此进行处理。
};

xhr.ontimeout = function (e) {
  // XMLHttpRequest 超时。在此做某事。
};

xhr.send(null);
```

#### overrideMimeType方法
用于重写XHR响应的MIME类型

比如：服务器返回的MIME类型是text/plain，但数据中实际包含的事XM。根据MIME类型，即使数据是XM，reponseXML属性中仍然是null。通过调用overrideMimeType()方法，可以保证把响应当作XML而非纯文本来处理
``` 
var xhr = createXHR();
xhr.open("get","text.php",true);
xhr.overrideMimeType("text/xml");
xhr.send(null);
```

#### 进度事件
定义了与客户端服务器通信有关的事件，有以下6个进度事件：
* loadstart：接收到响应数据第一个字节触发
* progress：接收响应期间持续不断地触发
* error：请求错误触发
* abort：调用abort方法触发
* load：接收到完整的响应数据触发
* loadend：通信完成或触发error，abort，load事件后触发

#### [垮源资源共享CORS(Cross-Origin Resource Sharing)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
CORS背后的基本思想就是使用自定义的HTTP头部让浏览器与服务器进行沟通，从而决定请求或响应是该成功还是失败
 ``` 
 Access-Control-Allow-Origin:url
 ```