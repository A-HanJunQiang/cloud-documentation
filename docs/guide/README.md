# 工作笔记

公司网站：

- https://mail.axatp.com/  邮箱地址
- [安盛保险 | 统一登录系统 (axatp.com)](https://sso.axatp.com/sso/login?ReturnURL=https%3A%2F%2Fiapps.axa.cn%2Faam%2Fproxylogin.do) 项目流程管理
-  http://gitlab.axatp.com/onlineapps/ecsale/project_members git仓库地址
-   https://iapps.axa.cn/aam/index 项目应用

## 1.安装nvm

安装前清除node环境

- nvm install **node版本号**  
- nvm list 查看已经安装的node 
- nvm use **node版本号**

### 2.配置node

1.配置淘宝镜像  npm config set registry "https://registry.npmmirror.com 

2.配置代理： npm config set proxy="http://10.100.120.1:8080"

### 3.	QS库

qs是一个用于解析和字符串化的工具库用于构建h5。

```js
npm install qs
```

具体用法

```js
let a = "https://juejin.cn/post/48"
QS.stringify(a)
QS.parse(a)
```

### 4.小程序的this指向问题

```js
onReady() {
    let that = this
        wx.request({
            url:"http://127.0.0.1:4523/m1/1319957-0-default/userlist",
            header: {
              'Content-Type': 'application/json;charset=utf-8', // 默认值
            },
            success (res){
              that.setData({userList:res.data})
            } 
      })
  }
这里的this在request中不可用，打印是空，解决方式有两种：一种是外部用变量保存this，内部使用，一种是使用箭头函数。
```

### 5.如何在apifox中模拟数据接口

![1658391108251](C:\Users\ex_hanjunqiang\AppData\Roaming\Typora\typora-user-images\1658391108251.png)

### 6.定时器无法清除的BUG

```js
   function switchBtn() {
    if (timer) {
    	// 调用之前，先清理，防止一直生成对象
    	clearInterval(timer);
        timer = null;
    }
    if(flag){
        document.querySelector("#btn").innerHTML="停止"
        flag = false
        timer = setInterval(function(){
        var newDiv = document.createElement("div");
        document.body.appendChild(newDiv);
        newDiv.className="Aim"
        newDiv.style.bottom= `${randomNum()}px`;
        newDiv.style.left= `${randomNum()}px`;
        newDiv.style.backgroundColor = `#${randomNum()}`
        },randomNum())
    }else{
        document.querySelector("#btn").innerHTML="开始"
        flag = true
        clearTimeout(timer)
        var delElement = document.querySelectorAll("body .Aim");
        //删除
        for(item  of delElement){
            document.body.removeChild(item);
        }
    }
   }
解读代码：这是一段在body标签内随机生成div的代码，在里设置了间隔定时器，一开始在else代码块内清除定时器无用。
原因是：定时器发生了改变，清除无效，需要在点击按钮的时候判断有无定时器的存在，存在删除。
```

### 7.VUE验证码生成录入

**方式一滑块验证：**

1.下载插件

```js
npm install --save vue-monoplasty-slide-verify
```

2.在main.js中注册组件

```js
import SlideVerify from 'vue-monoplasty-slide-verify';

Vue.use(SlideVerify);
```

3.封装为公共组件

```js
<template>
   <slide-verify 
        ref="slideblock" 
        @again="onAgain" 
        @fulfilled="onFulfilled" 
        @success="onSuccess" 
        @fail="onFail" 
        @refresh="onRefresh" 
        :slider-text="text" 
        :accuracy="accuracy"
    ></slide-verify>
  <button @click="handleClick">在父组件可以点我刷新哦</button>
  <div>{{msg}}</div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return {
        msg: '',
        text: '向右滑动->',
        // 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5
        accuracy: 1,
      }
    },
    methods: {
      onSuccess(times){
          console.log('验证通过，耗时 +' times + '毫秒');
          this.msg = `login success, 耗时${(times / 1000).toFixed(1)}s`
      },
      onFail(){
          console.log('验证不通过');
          this.msg = ''
      },
      onRefresh(){
          console.log('点击了刷新小图标');
          this.msg = ''
      },
      onFulfilled() {
          console.log('刷新成功啦！');
      },
      onAgain() {
          console.log('检测到非人为操作的哦！');
          this.msg = 'try again';
          // 刷新
          this.$refs.slideblock.reset();
      },
      handleClick() {
          this.$refs.slideblock.reset();
      },
    }
  }
</script>
具体网址：https://blog.csdn.net/weixin_52651045/article/details/120716843
```

**方式二图形数字验证：**

1.封装一个公共组件具体代码如下

```js
<template>
    <div class="s-canvas">
        <canvas id="s-canvas" :width="contentWidth" :height="contentHeight"></canvas>
    </div>
</template>
<script>
export default {
    name: 'SIdentify',
    props: {
        identifyCode: { // 默认注册码
            type: String,
            default: '1234'
        },
        fontSizeMin: { // 字体最小值
            type: Number,
            default: 25
        },
        fontSizeMax: { // 字体最大值
            type: Number,
            default: 35
        },
        backgroundColorMin: { // 验证码图片背景色最小值
            type: Number,
            default: 200
        },
        backgroundColorMax: { // 验证码图片背景色最大值
            type: Number,
            default: 220
        },
        dotColorMin: { // 背景干扰点最小值
            type: Number,
            default: 60
        },
        dotColorMax: { // 背景干扰点最大值
            type: Number,
            default: 120
        },
        contentWidth: { // 容器宽度
            type: Number,
            default: 116
        },
        contentHeight: { // 容器高度
            type: Number,
            default: 38
        }
    },
    methods: {
        // 生成一个随机数
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        },
        // 生成一个随机的颜色
        randomColor(min, max) {
            let r = this.randomNum(min, max)
            let g = this.randomNum(min, max)
            let b = this.randomNum(min, max)
            return 'rgb(' + r + ',' + g + ',' + b + ')'
        },
        drawPic() {
            let canvas = document.getElementById('s-canvas')
            let ctx = canvas.getContext('2d')
            ctx.textBaseline = 'bottom'
            // 绘制背景
            ctx.fillStyle = this.randomColor(this.backgroundColorMin, this.backgroundColorMax)
            ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
            // 绘制文字
            for (let i = 0; i < this.identifyCode.length; i++) {
                this.drawText(ctx, this.identifyCode[i], i)
            }
            this.drawLine(ctx)
            this.drawDot(ctx)
        },
        drawText(ctx, txt, i) {
            ctx.fillStyle = this.randomColor(50, 160) // 随机生成字体颜色
            ctx.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei' // 随机生成字体大小
            let x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1))
            let y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
            var deg = this.randomNum(-30, 30)
            // 修改坐标原点和旋转角度
            ctx.translate(x, y)
            ctx.rotate(deg * Math.PI / 180)
            ctx.fillText(txt, 0, 0)
            // 恢复坐标原点和旋转角度
            ctx.rotate(-deg * Math.PI / 180)
            ctx.translate(-x, -y)
        },
        drawLine(ctx) {
            // 绘制干扰线
            for (let i = 0; i < 4; i++) {
                ctx.strokeStyle = this.randomColor(100, 200)
                ctx.beginPath()
                ctx.moveTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
                ctx.lineTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
                ctx.stroke()
            }
        },
        drawDot(ctx) {
            // 绘制干扰点
            for (let i = 0; i < 30; i++) {
                ctx.fillStyle = this.randomColor(0, 255)
                ctx.beginPath()
                ctx.arc(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight), 1, 0, 2 * Math.PI)
                ctx.fill()
            }
        }
    },
    watch: {
        identifyCode() {
            this.drawPic()
        }
    },
    mounted() {
        this.drawPic()
    }
}
</script>
 
<style scoped>
</style>
```

2.组件使用

```js
 <template>
  <div class="inventoryRecord">
    <h1>{{ msg }}</h1>
    <div @click="changeCode()">
      <identify :identifyCode="identifyCode"></identify>
    </div>
  </div>
</template>
 
<script>
// 引入验证码组件
import identify from '../utli/verificationCode.vue'
export default {
  name: 'inventoryRecord',
  // 注册验证码组件
  components: { identify },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App商品库存编辑记录',
      passWord: '123456',
      // 验证码初始值
      identifyCode: '1234',
      // 验证码的随机取值范围
      identifyCodes: '1234567890'
    }
  },
  mounted () {
    let data = this.$md5(this.passWord)
    console.log(data)// e10adc3949ba59abbe56e057f20f883e
    // 刷新页面就生成随机验证码
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    // 点击验证码刷新验证码
    changeCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成一个随机整数  randomNum(0, 10) 0 到 10 的随机整数， 包含 0 和 10
    randomNum (min, max) {
      max = max + 1
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 随机生成验证码字符串
    makeCode (data, len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode += data[this.randomNum(0, data.length - 1)]
      }
    }
  }
}
</script>
<style scoped>
</style>
```

### 8.对后台返回的字符串进行*替换方法

**`padStart()`** 方法用另一个字符串填充当前字符串 (如果需要的话，会重复多次)，以便产生的字符串达到给定的长度。从当前字符串的左侧开始填充。 

例如：在不知需要保密的字符长度下可以使用，对后端发给的字符串进行用*代替

```js
function padStartFun(params) {
        let str = "456512522431"
        let mi = str.slice(-4)
        mi = mi.padStart(str.length, '*');
        console.log(mi); //********2431
}
    padStartFun()
```

### 9.在数组中，任意索引位置插入值方法 **`fill()`** 

```js
arr.fill(value[, start[, end]])

value
用来填充数组元素的值。

start 可选
起始索引，默认值为 0。

end 可选
终止索引，默认值为 this.length。

例子：

const array1 = [1, 2, 3, 4];

// fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4));
// expected output: [1, 2, 0, 0]

// fill with 5 from position 1
console.log(array1.fill(5, 1));
// expected output: [1, 5, 5, 5]

console.log(array1.fill(6));
// expected output: [6, 6, 6, 6]

```

### 10.tsconfig配置详解

```tsx
{
   // 指定需要编译文件 否则默认当前目录下除了exclude之外的所有.ts, .d.ts,.tsx 文件
   "include": ["./test.ts"],
   // 指定需要编译文件 否则默认当前目录下除了exclude之外的所有.ts, .d.ts,.tsx 文件
   "files": ["./src/**/*"],
   // 不编译某些文件
   "exclude": ["test.ts"],
   "compilerOptions": {
       // 只编译修改过的文件,这个时候会生成tsconfig.tsbuildinfo,下次编译的时候会进行对比只编译修改过的文件 
       "incremental": true,
       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
       "target": "es5",
       // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
       "module": "commonjs",
       /* 注意：如果未指定--lib，则会注入默认的librares列表。注入的默认库为：
       对于 --target ES5: DOM,ES5,ScriptHost
       对于 --target ES6: DOM,ES6,DOM.Iterable,ScriptHost
       TS 绝不会在您的代码中注入polyfill,所以需要你自己制定编译lib */
       "lib": ["es5", "dom", "ScriptHost", "es2015.promise"],
       // 允许编译JS
       "allowJs": true,
       /* 是否检测JS的语法,例如下面的语法编辑器会报错
       let name = 'paul';
       console.log(name.a.b) */
       "checkJs": true,
       // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
       "jsx": preserve,
       /* 如果设为true，编译每个ts文件之后会生成一个js文件和一个声明文件,
       declaration和allowJs不能同时设为true */
       "declaration": true
       // 值为true或false，指定是否为声明文件.d.ts生成map文件
       "declarationMap": true
       // 用来指定编译时是否生成.map文件
       "sourceMap": true,
       // 当module设置为 'amd' and 'system'的时候可以使用此命令,这样可以将ts文件打包到一个目录下
       "outFile":"./",
       //  outDir 编译后的文件存到到哪个目录下,默认是每一个ts文件的当前目录,,下面的配置就是把ts编译到build目录下
       "outDir": './build',
       // 下面单独介绍
       "rootDir": "./src",
       // 是否编译构建引用项目,很复杂后面介绍
       "composite": true,
       // 指定文件用来存储增量编译信息,默认是tsconfig.tsbuildinfo
       "tsBuildInfoFile": "./",
       // 编译的时候删除注释
       "removeComments": true,
       // 不生成编译文件，这个一般比较少用,这个build目录下将没有任何文件,但是会进行编译,有错误会抛出
       "noEmit": true,
       // 是否引入npm包tslib中的辅助函数,__extends等 
       "importHelpers": true,
       // 当target为'ES5' or 'ES3'时，为'for-of', spread, and destructuring'中的迭代器提供完全支持
       "downlevelIteration": true,
       // isolatedModules的值为true或false，指定是否将每个文件作为单独的模块，默认为true，它不可以和declaration同时设定
       // 不是很理解,将每一个文件作为单独模块
       "isolatedModules": true,
       /* Strict Type-Checking Options */
       // 严格模式将会打开下面的几个选项
       "strict": false, 
       /* 不允许变量或函数参数具有隐式any类型,例如
       function(name) {
           return name;
       } */
       "noImplicitAny": true,
       // null类型检测,const teacher: string = null;会报错
       "strictNullChecks": true,
       // 对函数参数进行严格逆变比较
       "strictFunctionTypes": true,
       // 严格检查bind call apply
       "strictBindCallApply": true,
       // 此规则将验证构造函数内部初始化前后已定义的属性。
       "strictPropertyInitialization": true,
       // 检测this是否隐式指定
       "noImplicitThis": true,
       // 使用js的严格模式,在每一个文件上部声明 use strict
       "alwaysStrict": true,
       /* Additional Checks */
       // 默认false,是否检测定义了但是没使用的变量
       "noUnusedLocals": true,
       // 用于检查是否有在函数体中没有使用的参数
       "noUnusedParameters": true,
       // 用于检查函数是否有返回值，设为true后，如果函数没有返回值则会提示
       "noImplicitReturns": true,
       // 用于检查switch中是否有case没有使用break跳出switch
       "noFallthroughCasesInSwitch": true,
       /* Module Resolution Options */
       // 用于选择模块解析策略，有'node'和'classic'两种类型
       "moduleResolution": "node",
       // 复杂的很 下面单独介绍这三个模块
       "baseUrl": './'
       "paths": {},                   
       "rootDirs": [],
       /* typeRoots用来指定声明文件或文件夹的路径列表，如果指定了此项，则只有在这里列出的声明文件才会被加载 */
       typeRoots: [],
       // types用来指定需要包含的模块，只有在这里列出的模块的声明文件才会被加载进来
       types:[],
       // 用来指定允许从没有默认导出的模块中默认导入 
       "allowSyntheticDefaultImports": true, 
       // 通过为导入内容创建命名空间，实现CommonJS和ES模块之间的互操作性
       "esModuleInterop": true ,
       // 不把符号链接解析为真实路径，具体可以了解下webpack和node.js的symlink相关知识
       "preserveSymlinks": true,
       "allowUmdGlobalAccess": true,
       
       // sourceRoot用于指定调试器应该找到TypeScript文件而不是源文件的位置，这个值会被写进.map文件里
       "sourceRoot": '',
       // mapRoot用于指定调试器找到映射文件而非生成文件的位置，指定map文件的根路径，该选项会影响.map文件中的sources属性
       "mapRoot",
       // inlineSourceMap指定是否将map文件内容和js文件编译在一个同一个js文件中，如果设为true,则map的内容会以//#soureMappingURL=开头，然后接base64字符串的形式插入在js文件底部
       "inlineSourceMap": true,
       // inlineSources用于指定是否进一步将ts文件的内容也包含到输出文件中
       "inlineSources": true,
       
       // experimentalDecorators用于指定是否启用实验性的装饰器特性
       "experimentalDecorators": true,
       
       // emitDecoratorMetadata用于指定是否为装上去提供元数据支持，关于元数据，也是ES6的新标准，可以通过Reflect提供的静态方法获取元数据，如果需要使用Reflect的一些方法，需要引用ES2015.Reflect这个库
       "emitDecoratorMetadata": true,
       // compileOnSave的值是true或false，如果设为true，在我们编辑了项目中的文件保存的时候，编辑器会根据tsconfig.json中的配置重新生成文件，不过这个要编辑器支持
       "compileOnSave": true,
       // 很复杂 下面介绍
       "references":[]",
   }
}
```

### 14.git命令操作

1.拉项目某个分支下的代码

```js
git clone http://gitlab.axatp.com/onlineapps/wechatapp-axa-web.git -b AXAInsuranceMiniprogram1_0_0_0
```

2.提交代码四部曲

```js
git pull

git add .

git commit -m '提交信息'

git push origin AXAInsuranceMiniprogram1_0_0_0 //例如目标分支是 AXAInsuranceMiniprogram1_0_0_0 分支

git status -s //查看提交的代码
```

3.删除某个已提交的文件或者目录

```js
git rm .env //这里用env文件举例

git rm -r dist //删目录加个参数-r就ok了
```

4.创建并切换到指定的新分支

```js
git checkout -b demo01
```

### 15.axios数据传输之formdata规则传输

```js
axios.post(this.basePath + '*****.do',objectToFormData,{headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then(res => {
if(res.data.data.checkFlag){
    ...
}else {
    this.dialog(res.data.data.message);
}
```

问题：后端要求使用post传输方式并且是formdata格式

解决思路一：在请求头中设置`Content-Type:'application/x-www-form-urlencoded'`，使用axios附带的qs库解决问题。

```js
import qs from 'qs';
axios.post(url,qs.stringify({phone: '5555', password: '123'},{headers: {'Content-Type':'application/x-www-form-urlencoded'}}),
```

解决思路二：在请求头中设置`Content-Type:'application/x-www-form-urlencoded'`，由于是在原生HTML中嵌套的VUE，寻找qs库位置相对麻烦，所以自己封装了一个方法转化formdata格式。

```js
//post FormData数据形式封装
objectToFormData(obj) {
    const formData = new FormData();
    for (let key in obj) {
     formData.append(key, obj[key]);
    }
    return formData;
}
const params ={phone: '5555', password: '123'}
let objectToFormData = this.objectToFormData(params)
axios.post(this.basePath + '*****.do',objectToFormData,{headers: {'Content-Type':'application/x-www-form-urlencoded'}})
```

### 16.随机数方法

```js
function getRandomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


// 调用示例
const randomNum = getRandomIntInRange(0, 10);
console.log(randomNum); // 输出范围在 [0, 10) 内的随机整数
```

### 17.防抖和节流

- 防抖（Debounce）：在事件被触发 n 秒后再执行回调函数，如果在这 n 秒内又被触发了该事件，则重新计时。适用于一些会被频繁触发的事件（如窗口缩放、搜索框输入），可以减少请求次数或提高性能。

```js
//防抖
function debounce(func, delay) {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}

//使用
防抖：窗口调整大小
当窗口调整大小时，浏览器会频繁地触发 resize 事件。如果每次都执行重排和重绘操作，则可能会导致页面性能下降。可以使用防抖函数来延迟处理 resize 事件，等待用户完成调整后再执行相应的操作。
function debounceResize() {
  // 窗口调整大小后的处理代码
}

window.addEventListener('resize', debounce(debounceResize, 500));
```

- 节流（Throttle）：指定时间间隔内只会执行一次回调函数。适用于一些不需要及时响应的事件（如页面滚动、鼠标移动），可以减少回调函数的执行次数。

```js
//节流
function throttle(func, delay) {
  let lastTime = 0;
  return function () {
    const currentTime = new Date().getTime();
    if (currentTime - lastTime > delay) {
      func.apply(this, arguments);
      lastTime = currentTime;
    }
  };
}
//使用
节流：滚动加载数据
当页面需要滚动加载数据时，如果一次性将所有数据都加载出来，可能会导致页面变得很卡顿。可以使用节流函数来控制滚动加载的速度，以提高页面性能。
function throttleLoadData() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  // 加载数据的代码
}

window.addEventListener('scroll', throttle(throttleLoadData, 200));
```

### 18.获取浏览器窗口的尺寸

```js
function getWindowSize() {
  return {
    width: window.innerWidth || 
      document.documentElement.clientWidth ||  
      document.body.clientWidth,
    height: window.innerHeight || 
      document.documentElement.clientHeight || 
      document.body.clientHeight
  };
}
```

### 19.日期对象格式化为字符串形式

```js
function formatDate(date, format) {
  const map = {
    'M': date.getMonth() + 1,
    'd': date.getDate(),
    'h': date.getHours(),
    'm': date.getMinutes(),
    's': date.getSeconds(),
    'q': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  };
  format = format.replace(/([yMdhmsqS])+/g, function(all, match) {
    const value = map[match];
    if (typeof value !== 'undefined') {
      return ('000' + value).slice(-match.length);
    } else {
      return match;
    }
  });
  return format;
}
```

### 20.数组去重（高阶版）

```js
function uniqueByProp(arr, prop) {
  const map = new Map();
  const result = [];

  for (const item of arr) {
    const value = item[prop];
    if (typeof value !== 'object' || value === null) {
      if (!map.has(value)) {
        map.set(value, true);
        result.push(item);
      }
    } else if (!map.has(JSON.stringify(value))) {
      map.set(JSON.stringify(value), true);
      result.push(item);
    }
  }

  return result;
}
//使用
const arr = [
  { id: 1, name: 'Alice', address: { city: 'Beijing', code: '100001' } },
  { id: 2, name: 'Bob', address: { city: 'Shanghai', code: '200001' } },
  { id: 3, name: 'Alice', address: { city: 'Beijing', code: '100001' } }
];

const newArr = uniqueByProp(arr, 'address');

console.log(newArr);
// 输出 [
//   { id: 1, name: 'Alice', address: { city: 'Beijing', code: '100001' } },
//   { id: 2, name: 'Bob', address: { city: 'Shanghai', code: '200001' } }
// ]

以上代码中，原始数组 arr 包含三个对象，其中有两个对象的 address 属性值相同。我们调用 uniqueByProp 函数来对其进行去重操作，指定属性名为 address。最终得到的新数组 newArr 只包含两个不重复的对象。

需要注意的是，如果对象比较复杂，尤其是存在循环引用等情况，则使用 JSON.stringify() 方法可能会出现一些问题，需要根据具体情况进行修改。
```

