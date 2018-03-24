<h3>1、简化写法</h3>

我们在写 React 组件时，参考官方文档写法，一要声明 state，二要绑定函数的 this，常规写法如下：

```
class DEMO extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0
        };
        this.kick = this.kick.bind(this);
    }

    render() {
        return <div>
            <button onClick={this.kick}>点击他！</button>
            你已经点击了{this.state.count}次。
        </div>;
    }

    kick() {
        this.setState({
            count: this.state.count + 1
        });
    }
}
```

然而，这种写法很麻烦，灰常麻烦，但是我有解决方案，写法如下：

```
class DEMO extends React.Component {
    state = {
        count: 0
    };

    render() {
        return <div>
            <button onClick={this.kick}>点击他！</button>
            你已经点击了{this.state.count}次。
        </div>;
    }

    kick = () => {
        this.setState({
            count: this.state.count + 1
        });
    };
}
```

<b>效果：</b>

1. 免去写构造函数的麻烦，并且直接声明在 class 下更加直观；
2. 免去写 bind 的额外操作，减少了因为忘记写 bind 而产生 bug 的可能；

核心改动有两点：

1. state 不在 constructor 里声明，而是直接在 class 里写，这种写法是一个新特性，但不需要担心，babel 可以将其识别并转换为 es5 代码；
2. 函数通过箭头函数来声明，因为箭头函数的 this，绑定于他声明时的作用域，因此无需再额外通过 ``bind()`` 来绑定 this。

<b>实现方式：</b>

1. 核心实现方式是通过 babel 来实现的；
2. 具体实现方式可以参考我这篇关于 ``babel-loader`` 的说明，[点击访问 5.2、支持新特性](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/babel_loader#52%E6%94%AF%E6%8C%81%E6%96%B0%E7%89%B9%E6%80%A7)；
3. 以上方法无需熟悉webpack，在已有 webpack 工程的情况下，只要按说明去做就可以，非常简单（安装一个 npm 包，在配置文件添加一行配置即可）；
4. 如果可以的话，请顺手给我的 github 一个 star，谢谢。
5. [示例DEMO项目](https://github.com/qq20004604/react-demo/tree/master/%E8%81%8A%E8%81%8AReact%E7%9A%84%E4%B8%80%E4%BA%9B%E7%8E%A9%E6%B3%95)；

<h3>2、将 React 资源通过CDN引入</h3>

虽然 React 打包后，并不大，但是对于我们，是没必要直接打包到我们的 js 代码中的，使用 CDN 是更好的选择。

举例来说，例如以上的代码，假如我们使用一般的打包方式，将 ``react`` 和 ``react-dom`` 打包到我们的 js 文件中，打包后的文件大小大约是：

```
app.js        // 33 KB
vendor.js        // 106 KB
```

而将 React 通过 CDN 引入后，我们打包后的 js 大小将为：

```
app.js        // 33 KB
vendor.js        // 8 KB
```

这之间大约 100 KB 的大小差距，就是 ``react`` 和 ``react-dom`` 这 2 个包节约下来的大小。

<b>具体做法：</b>

首先在 ``webpack.config.js`` （即 webpack 的配置文件）里，给导出的 webpack 配置属性，添加一个额外属性：

```
externals: {
    "react": "React",
    "react-dom": "ReactDOM"
}
```

其次，在 html 模板文件里，引入 CDN ，以下两行插入 head 标签中。

在示例中，是 index.html 文件，这个是在 webpack 通过 ``html-webpack-plugin`` 插件配置的。

```
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```

然后就搞定了。

关于原理，请参考我这一篇博客 [9、外部扩展（Externals）](https://github.com/qq20004604/webpack-study/tree/master/9%E3%80%81%E5%A4%96%E9%83%A8%E6%89%A9%E5%B1%95%EF%BC%88Externals%EF%BC%89)。

