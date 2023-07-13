# 首页

## 指南
### 安装
### 使用说明

## 		html标签

##### 1.超链接标签

```html
<a href=""></a>   //超链接标签
<a href="" target="_blank"></a>     //再新开一个窗口，窗口的默认打开方式
<a href="" target="_top" ></a>      //顶层窗口，回到顶部
<a href="" target="_self" ></a>     //当前网页打开原网页被覆盖
<a href="" target="_parent"></a>    //这个目标使得文档载入父窗口或者包含来超链接引用的框架的框架集。如果这个引用是在窗口或者在顶级框架中，那么它与目标 _self 等效。
----------------
<a href="#top">
    加上id后可以指定跳转到本页面的某个位置
</a>
<p id="top">
    这是要跳转到的位置
</p>
<a href="某个页面 #id">
    跳转到某个页面的某个位置
</a>
----------------
<a href="#">回到顶部</a>
<font>这个标签已经过时，里面可以放文字和内容，具有改变文字颜色和字号大小的属性</font>
```

##### 2.图像标签

```html
<img src="图片的路径" title="图片的标题" alt="图片加载失败显示的内容" width="图片的宽度" height="图片的高度">
<img src=../>    // ../代表退回上一级目录
<!--注意：如果设置了完整的高和宽，再没有决定测量好尺寸的情况下，图片会变形，解决方案：只设置一边像素，另一边会自动的等比例缩小。-->
<!--网站的图片根据需求设置，不要大图缩小显示。-->
```

##### 3.表格标签

```html
<table>
    <th></th> //一般用作表头（加粗居中显示）
    ---------------
    <tr>  //行
    <td>内容</td> //列
    </tr>
</table>
```

**1.表格标签具有的属性**

可以给table设置的属性：

- border：设置表格的边框。（已过期）
- align="center"：让整个表格在屏幕居中显示。（已过期）
- width：设置表格的宽度。
- height：设置表格的高度。
- cellspacing：控制单元格之间的间距。
- cellpadding：控制文字和单元格边框之间的间距。
- bgcolor:设置表格背景颜色。（已过期）

可以给tr设置的属性：

- bgcolor：设置单元格的背景颜色。
- align="center"：表格居中。
- height：设置行高。

可以给td设置的属性：

- width：宽度（影响整列的宽度）。
- height：高度（影响整行的高度）。
- algin：设置当前单元格的内容对齐方式。
- bgcolor：设置单元格背景的颜色。

-----------------------------------------

thead：用来对表格里面的内容分块，表示表头的意思。

tbody：用来对表格里面的内容分块，表示内容的意思。

tfoot： 用来对表格里面的内容分块，表示尾部的意思。

**rowspan：合行，垂直方向的合并。**

**colspan：合列，水平方向的合并。**

2.计算器案例

```html
<!DOCTYPE html>
<html lang="cn">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .img{
            background-image: url( Tulips.jpg);
        }
    </style>
</head>
<body>
  <table border="1" align="center" width="450px" height="300px"  class="img">
      <tr>
          <td colspan="4" height="50px">
          <font color="yellow" size="6px">*</font>
          <font color="rred" size="6px">*</font>
          <font color="blue" size="6px">*</font>

          </td>
      </tr>
      <tr>
          <td colspan="4" height="50px">
          <input type="text" style="width: 440px; height:50px;">
          </td>
         
      </tr>
      <tr bgcolor="#7fffd4" height="80" align="center">
          <td width="25%"><font size="8px">AC</font></td>
          <td width="25%"><font size="8px">+/-</font></td>
          <td width="25%"><font size="8px">%</font></td>
          <td width="25%"><font size="8px">+</font></td>
      </tr>
      <tr bgcolor="#7fffd4" height="80" align="center">
          <td width="25%"><font size="8px">7</font></td>
          <td width="25%"><font size="8px">8</font></td>
          <td width="25%"><font size="8px">9</font></td>
          <td width="25%"><font size="8px">×</font></td>
      </tr>
      <tr bgcolor="#7fffd4" height="80" align="center"> 
          <td width="25%"><font size="8px">4</font></td>
          <td width="25%"><font size="8px">5</font></td>
          <td width="25%"><font size="8px">6</font></td>
          <td width="25%"><font size="8px">-</font></td>
      </tr>
      <tr bgcolor="#7fffd4" height="80" align="center">
          <td width="25%"><font size="8px">1</font></td>
          <td width="25%"><font size="8px">2</font></td>
          <td width="25%"><font size="8px">3</font></td>
          <td width="25%"><font size="8px">+</font></td>
      </tr>
      <tr bgcolor="#7fffd4" height="80" align="center">
          <td width="25%"><font size="8px">0</font></td>
          <td width="25%"><font size="8px">保留</font></td>
          <td width="25%"><font size="8px">.</font></td>
          <td width="25%"><font size="8px">=</font></td>
      </tr>
  </table>
</body>
</html>
```



##### 4.列表标签

在HTML中提供了有序列表和无序列表标签来组织文本内容，一般用作与导航栏。

```html
//无序列表
<ul>
    <li>1</li>
    <li>2</li>
</ul>
//有序列表
<ol>
    <li>1</li>
    <li>2</li>
</ol>
//定义列表
<dl>
    <dt></dt>
    <dd></dd>
</dl>
//dl:一条信息，一条记录
//dt:内容，可以图片和文字
//dd:对内容的描述
//作用：给到一些特殊浏览器的识别（盲人浏览器/阅读浏览器）,更好的让搜索引擎进行识别
---------------------------
列表特点:
//有序和无序都会有一定的默认间距：上下16px，左40px
//每个li标签都是独占一行的（默认）
//可以在每个li标签内进行嵌套
```

##### 5.表单标签

网页一般需要提供一些标签来获取用户的输入信息，例如登录功能以及注册功能。

1.表单区域的定义

```html
<form action="user" method="get/post">
    //action代表信息发送的目的地，服务器地址
    //method代表发送的形式（post隐式发送；get显示发送）
    //get代表获取资源，提交数据，数据会放在url地址里面，post提交隐藏数据
</form>
```

2.表单组件的定义

专门用于获取用户数据的组件就称为表单组件。

```html
//文本框

<label for="">用户名：</label><input type="text">

//密码框

<label for="">密码：</label><input type="password">

//单选框

<label for="">男：</label><input type="radio" value="nan" name="gender">
<label for="">女：</label><input type="radio" value="nv" name="gender">

//复选框

<input type="checkbox" value="" ><label for="">游戏</label>
<input type="checkbox" value=""><label for="">阅读</label>

//下拉框
<select name="city" multiple>
<option value="shanghai">上海</option>
<option value="beijing">北京</option>
<option value="shenzheng">深圳</option>
</select>

//按钮的定义方式

<input  type="button" value="">//普通按钮1
<button type="button">普通按钮2</button>
<button type="submit">提交2</button>
<button type="resrt">重置2</button>

//登录，重置的按钮

<input type="submit" value="">//提交1
<input type="reset"  value="重置1">
---------------------------------
//点击游戏文字就会选中复选框
<input type="checkbox" value="" id="hobby"><label for="hobby">游戏</label>
//文本框和密码框开发过程中有name value属性
--------------------------
```



3.文本框和密码框可以设置的属性

- maxlength:限制文本最大长度（值）。

- placeholder：设置文本框中的提示信息，一般用于提示用户输入的方式。

- readonly：设置文本是否可读。（不提交服务器数据）。
- vlaue：值。
- disabled：禁用，不仅无法操作数据，数据也无法获取。

4.单选框可以设置的属性值

- name：名字(设name属性为相同的值，可以实现单选框多选一的功能)。
- cheked：默认选中。

5.下拉框

```html
<select>
    <option>111</option>
    <option>222</option>
</select>
```

下拉框可以设置的属性

size：控制显示的个数。

multiple：按ctrl多选。

6.文本域

```html
<textarea name="" cols="" rows=""></textarea> //只能设置行数rows，列数显示的字数cols
```

7.文件上传和日历标签和隐藏标签

```html
<input type="hidden">//特殊表单标签，隐藏标签和文件上传组合
<input type="file" name=""> //文件上传,获取的是文件的绝对路径。
-----------------------------
<input type="date"> //日历标签
```

8.注册页面案例

```html
<!DOCTYPE html>
<html lang="cn">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <table border="1" align="center" width="1000px"height="50px" cellspacing="0">
        <tr bgcolor="pink">
            <th>用户信息</th>
        </tr>
        <tr>
            <td>
                <form action="http://www.woniuxy.com/video/15534" method="get">
                <table border=0 cellpadding="0" cellspacing="0" bgcolor="#F0F8FF"width="100%">
                    <tr>
                        <td align="right" width="400px"><font color="red">*</font><label for="">用户名:</label></td>
                        <td  align="center" width="200px" ><input type="text" placeholder="用户名确认不可更改"></td>
                        <td width="400px"><font size="2" color="red">请输入0-12位字母或数字组合</font></td>
                    </tr> 
                    <tr>
                        <td align="right" width="%40"><font color="red">*</font><label for="">密码:</label></td>
                        <td  align="center" width="%20" ><input type="password"></td>
                        <td width="%40"><font  size="2" color="red">请输入0-12位字母或数字组合</font></td>
                    </tr>
                    <tr>
                        <td align="right" width="%40"><font color="red">*</font><label for="">确认密码:</label></td>
                        <td  align="center" width="%20" ><input type="password"></td>
                        <td width="%40"><font size="2" color="red">请输入0-12位字母或数字组合</font></td>
                    </tr>
                    <tr>
                        <td align="right" width="%40"><font color="red">*</font><label for="">证件类型:</label></td>
                        <td width="%20"align="center" >
                        <select name="" id="" style="width: 170px;">
                         <option value="sfz">身份证</option>
                         <option value="ja">驾驶证</option>
                         <option value="hu">护照</option>
                         <option value="xue">学位证</option>
                        </select></td>
                        <td width="%40"><font font  size="2" color="red">请选择你的证件</font></td>
                    </tr>
                    <tr>
                        <td align="right" width="%40"><font color="red">*</font><label for="">出生日期:</label></td>
                        <td  align="center" width="%20" ><input type="date" style="width: 165px;" ></td>
                        <td width="%40"><font font  size="2" color="red">请选择出生日期</font></td>
                    </tr>
                    <tr>
                        <td align="right" width="%40"><font color="red">*</font><label for="">性别:</label></td>
                        <td  align="center" width="%20" ><label for="">男:</label><input type="radio" name="gg"> &nbsp&nbsp&nbsp&nbsp&nbsp<label for="">女:</label><input type="radio" name="gg"></td>
                        <td width="%40"><font font  size="2" color="red">是男是女</font></td>
                    </tr>
                    <tr>
                        <td align="right" width="%40"><font color="red">*</font><label for="">手机号:</label></td>
                        <td align="center" width="%20" ><input type="text"></td>
                        <td width="%40"><font font  size="2" color="red">输入手机号</font></td>
                    <tr>
                        <td colspan="3" align="center"><button type="submit">注册</button>&nbsp&nbsp&nbsp&nbsp<button type="reset">重置</button></td>
                        
                    </tr>
                </form>
            </table>
            </td>
        </tr>
    </table>
</body>
</html>
```





##### 6.其他标签

```html
<span>一般用于提示信息，行级元素</span>
<label>与span标签一样</label>
<p>段落标签，块级元素</p>
<i>斜体标签</i>
<em>斜体标签</em>
<br/>换行标签
<hr/>分割标签
<strong>粗体标签</strong>
<b>粗体标签</b>
<u>下划线标签</u>
<del>中划线标签</del>
<small>小号字体标签</small>
<div>布局标签，无样式，块级元素</div>
<pre>
格式化标签，空格，换行均可保留
</pre>
空格符&nbsp
小于号&lt
大于号&gt
<audio>音频标签，不添加controls无法显示控件</audio>
<video>视频标签</video>
----------------------------------------------
//iframe是一个内联框架，可以在一个网页中嵌套另一个网页。
<iframe name="name" src="网页地址" frameborder="0" width="100%" height="500px">  //frameborder框架边框 1：有边框（默认）0：无边框
//说明：可以在此标签src属性放置加载的网页路径，但是使用的不多，原因为有的网站限制使用这框架。
 <a href="" target="_parent"></a> 
</iframe>
----------------------------------------------
// 跑马灯
<marquee behavior="" direction="">默认：文字在文本上方从右到左移动，循环显示</marquee>
<fieldset>  //框边
    <legend>
        边框的标题
    </legend>
   边框里的文字
</fieldset>
```



## css层叠样式表

##### 1.网页的样式来源，层叠的含义

1. 浏览器默认样式
2. 浏览器用户自定义样式
3. 内联样式
4. 内部样式
5. 外部样式

注意：标签本身没有任何的样式，标签就是用来组织代码结构的，一般在浏览器看到的样式都是浏览器默认的样式。

层叠：css的样式可以在很多地方起作用，首先是检查代码中是否有样式，会把内联样式，内部样式，外部样式以及作用到浏览器默认的样式叠在一起，浏览器形成最终样式。

不考虑选择器的权重问题，距离元素越近的样式先显示作用。

内联>内部>外部>通配符

-----------------------------------------------------------------------------

**注意：**1.有些样式值不会被我们使用，浏览器可能不会识别。浏览器不能准确的识别如font-size:laege。

​            2.当两个同名样式作用在一个元素上，会采取就近原则进行覆盖。

##### 2.(内联，内部，外部)样式

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        //在头部书写的样式为内部样式
        p{
           font-size:20px; 
        }
---------------------------------
        @import url("css样式表链接地址")//这是外部样式2
    </style>
    <link rel="stylesheet" href="css样式表链接地址">//这是外部样式1
</head>
-----------------------------------
<body>
<p style="color:red";>
    这是内联样式，在元素内部添加
</p>
</body>
</html>
```

两种外部样式表引用的方法对比：

- link是一个标签，@import是一种语法。
- link不止可以引入css文件还可以引用其他类型的文件，@import只能引用css代码。
- 加载时间的区别：link加载css文件随着页面的加载而加载，@import等待页面加载完毕在加载css样式。
- 兼容性：link兼容性更好。
- js操作样式的时候，link引入的样式可以被操作，@import引入的样式无法被js控制

##### 3.css背景图片

```css
background-image:("图片链接"); //默认情况下平铺图片
background-repeat:no-repeat //不平铺图片
background-repeat:repeat-x  //水平铺
background-repeat:repeat-y  //垂直铺
background-position:left right center bottom top //设置背景图的位置，图片位置，两两组合使用。只给一个方向值另一个值默认是center。
x轴，y轴:
像素值：已左上角为00点。百分数：是以%书写，围绕着外层元素的宽度进行百分数的分配，如：50% 50%图片则会居中在元素的正中间（随着父盒子的宽高进行调整）。

background-size:**px,百分数;   //大小
                contain;//英文:包含的意思，图片的一边铺满就停止，另一边不管。
                cover;//英文:覆盖的意思，两边都铺满，超出部分隐藏。
background-attachment:scroll; //默认值，随着页面的滚动轴背景图片将移动
                      fixed; //固定在页面上，随着页面的滚动轴背景图片不会移动
                      inherit; //继承初始值：scroll
--------------------------------------------------------
背景的复合属性：
background:color url() no-repeat position size
```

**雪碧图案例:**

1.创建一个只能放一个图标大小的盒子（标签元素）

2.通过`background-image`引入雪碧图，在通过`background-position`调整图片位置进行呈现。

注意：在放置雪碧图的过程中 `background-image`尽量不要设置`no-repeat`.