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


