### Date类型
ES中的Date类型是在早期JAVA中的java.util.Date类基础上构建的。为此，Date类型使用自UTC（国际协调时间）1970年1月1日零时 开始经过的 毫秒数来保存日期。在使用这种数据存储格式的条件下，Date类型保存的日期能够精确到1970年1月1日之前或之后的285 616年

#### 创建日期对象
不传参数的情况下，新创建的对象自动获得当前日期和时间
```
var now = new Date(); 
```
根据特定日期创建对象，必须传入表示该日的毫秒数（即从UTC时间1970年1月1日午夜起至该日期止经过的毫秒数）
```
为了简化这一计算过程，ES提供来两个方法：

Date.parse():接收一个表示日期的字符串参数，然后尝试根据这个字符串返回相应日期的毫秒数，若字符串不能表示日期，则返回NaN。［对日期格式无要求］
Date.UTC():同样返回表示日期的毫秒数，它的参数分别是年份、基于0的月份(一月是0，以此类推)、天(1-31)、时(0-23)、分钟、秒以及毫秒数。只有前两个参数(年和月)是必须的，

var parseDate = new Date(Date.parse("May 25,2017"));
var nowDate =  new Date("May 25,2017");//直接将表示日期的字符串传递给Date构造函数，也会在后台调用Date.parse()
var UTCDate = new Date(Date.UTC(2017,11,18,17));//若没提供天数，则默认1，其他则默认0
```

#### 日期／时间组件方法
```
getTime():返回表示日期的毫秒数，与valueOf()方法返回的值相同
setTime():以毫秒数设置日期，会改变整个日期

//年(Year)、月(Month)、天(Date)、时(Hours)、分钟(Minutes)、秒(Seconds)、毫秒(Milliseseconds)
getFullYear():取得4位数的年份
getUTCFullYear():返回UTC日期的4位数年份
setFullYear():设置日期的年份，传入的年份值必须是4位数字
setUTCFullYear():设置UTC日期年份，传入的年份值必须是4位数字

以此类推
```
