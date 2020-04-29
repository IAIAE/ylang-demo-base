# this
采用ylang打包的demo前端页面。


# usage
```
npm i
npm start
```
会在根目录`/dist`生成打包结果，启动一个服务器去访问即可，推荐使用browser-sync
```
cd dist
browser-sync start --server --files "**/*.html, **/*.css, **/*.js"
```

然后访问localhost:3000即可

# 原理
页面打开后会看到正常渲染的页面，点击按钮加载异步组件，会加载组件，组件的url配置在`src/app.tsx`的`onclick`事件中，由于url是无效的，所以点击按钮后会显示无效组件。

新建另一个文件夹(在此工程外)，clone工程[ylang-demo-page1](https://github.com/IAIAE/ylang-demo-page1)，安装依赖后`npm run build`，在dist文件夹中找到`page1.xxx.js`和`page1.xxx.css`两个文件，拷贝到该工程的dist文件夹中，更改onclick中的组件url。你就会发现page1组件可以正常加载。

# why
为什么要这样做呢？你会发现，一个页面被拆分成了两个工程，`demo-base`和`demo-page1`，它们之间完全相互独立。`demo-page1`中打包的组件结果，放到线上，base可以通过url的方式加载并渲染这个组件。这在之前，高度模块化的前端打包是无法实现的。ok，让我们先列举一下我们能做到的特性：

- 不同前端工程base和page1相互独立，通过不同的git维护，打包也是相互“独立”的。

- base可以引用线上的组件资源，通过url加载并使用。如果是以前，你要怎么使用page1这个组件？？估计是把page1发成npm包，然后代码里面import进来使用？如果这样做，你复用的是代码，而不是资源(线上的某个js)。而现在，你可以复用资源，而不仅仅是复用代码。

- 线上的组件资源同样可以引用它的使用者的资源。例如，page1中的代码并不包含react，但是运行时它会引用base中的react。所以存在一种双向的引用关系，base会引用page1，而page1又依赖base中的某些资源。

- base和page1中都不存在任何自定义的污染全局变量的东西。完完全全的模块化、沙箱化。

总之，我们能做到的核心是，复用资源，而不仅仅是复用代码。从做法上，我们只是将以往在同一个前端工程中打包的代码，拆成了不同的前端工程，同时保持工程之间的相互引用关系保持不变（就像写在同一个工程中一样）。

借助以上几点，我们落地实现了微前端架构。

