<h3>0、参考文献</h3>

[React Router 4 简易入门](https://segmentfault.com/a/1190000010174260)

[一个中文文档，但不确定是否是官方的，例子比较多](http://reacttraining.cn/web/example/basic)

[初探 React Router 4.0](https://www.jianshu.com/p/e3adc9b5f75c) 这个对标签的说明比较详细

[react-router v4 如何静态传值给子组件](https://segmentfault.com/q/1010000012262160)

<h3>1、React-router 安装</h3>

>这里的版本号是 "react-router-dom": "^4.2.2"

安装（不需要安装 react-router，直接安装 react-router-dom 就可以了）

```
npm install --save react-router-dom
```

>下面这几行引自https://www.jianshu.com/p/e3adc9b5f75c

* react-router React Router 核心
* react-router-dom 用于 DOM 绑定的 React Router
* react-router-native 用于 React Native 的 React Router
* react-router-redux React Router 和 Redux 的集成
* react-router-config 静态路由配置的小助手

<h3>2、基本DEMO</h3>

> 参考 1.baseDemo.js

首先引入对应的模块

```
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom'
```

这三个都是标签名。

1. Router 表示路由包裹标签，另外2个应该放在这个标签里；
2. Link 表示导航标签，就是说点击这个后，会将 url 进行切换；
3. Route 表示模块标签，当当前的 url 符合 Route 标签的设置时，会将该标签显示出来；

基本示例：

```
import React from "react";
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom'

const First = () => <div>第一个示例的第【1】个路由，第一个路由在第一个和第二个url里都会显示，但不在第三个显示</div>
const Second = () => <div>第一个示例的第【2】个路由，只在第二个url里显示</div>
const Third = () => <div>第三个示例</div>

class BaseDemo extends React.Component {
    render() {
        return <div>
            <h3>React-router基础示例</h3>
            <h3>路由数据被存储在 this.props.match 里，这是其中的值{JSON.stringify(this.props.match)}</h3>
            <Router>
                <div>
                    {/* this.props.match.url 表示当前url */}
                    <li><Link to={`${this.props.match.url}/1`}>示例1</Link></li>
                    <li><Link to={`${this.props.match.url}/2`}>示例2</Link></li>
                    <li><Link to={`${this.props.match.url}/3`}>示例3</Link></li>

                    <Route path={`${this.props.match.url}/1`} component={First}/>
                    <Route path={`${this.props.match.url}/2`} component={First}/>
                    <Route path={`${this.props.match.url}/2`} component={Second}/>
                    <Route path={`${this.props.match.url}/3`} component={Third}/>
                </div>
            </Router>
        </div>
    }
}

```

解释：

1. Router 标签内，只能放一个元素，一般是放一个 div 标签，然后其他标签放这个 div 标签里；
2. Link 标签是导航标签，类似 ``<a></a>`` 标签，点击后会跳转 url；
3. Route 标签是路由组件标签，当 path 属性和当前 url 相同时，会自动显示 component 属性中匹配的标签（所有匹配成功的都会显示）；

简单来说，就是 点击 Link 标签跳转 url，然后显示对应的 url 的组件。

<h3>3、路由嵌套：</h3>

> 参考 2.routingNested.js

还是以上面那个 DEMO 为示例。

毫无疑问，我们肯定会面临路由嵌套的问题，即在顶级路由匹配到组件后，子组件里面也可能有一个次级路由。

假如顶级路由的url为：``/1``，那么次级路由匹配后的路径一般来说是 ``/1/2``；

但是假如当前路径是 ``/1``，然后次级路由里有这样一个标签 ``<Link to="/2"}>示例2</Link>``。

当我们点击这个标签时，跳转的 url 是 ``/2``，而不是我们期望的 ``/1/2``。因此我们需要拿到之前的 url ``/1``，具体方法就是通过路由的 match 属性来拿，于是就有了这种写法：

```
<li><Link to={`${this.props.match.url}/2`}>示例2</Link></li>
```

意思就是跳转到当前路径，后面再拼接 ``/2``这个路径。

相对应的，我们在 Route 标签里也要添加相同的内容：

```
<Route path={`${this.props.match.url}/2`} component={second}/>
```

示例（子路由是 ChildRouter）：

```
import React from "react";
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom'

const First = () => <div>第一个示例的第【1】个路由，第一个路由在第一个和第二个url里都会显示，但不在第三个显示</div>
const Second = () => <div>第一个示例的第【2】个路由，只在第二个url里显示</div>
const ChildRouter = (route) => <div>第一个示例的第【3】个路由，只在第三个url里显示
    <Router>
        <div>
            <h3>以下是子路由的属性</h3>
            <p>{JSON.stringify(route)}</p>
            <li><Link to={`${route.match.url}/1`}>跳转子1</Link></li>
            <li><Link to={`${route.match.url}/2`}>跳转子2</Link></li>
            <hr/>
            {/* component 是一个React组件。
              * 注意，组件是放在这个属性里，而不是 Route 包裹的里面
              * */}
            <Route path={`${route.match.url}/1`} component={() => <h3>这里是子1</h3>}/>
            <Route path={`${route.match.url}/2`} component={() => <h3>这里是子2</h3>}/>
        </div>
    </Router>
</div>

class RoutingNested extends React.Component {
    render() {
        return <div>
            <h3>React-router 路由嵌套</h3>
            <h3>路由数据被存储在 this.props.match 里，这是其中的值{JSON.stringify(this.props.match)}</h3>
            <Router>
                <div>
                    {/* this.props.match.url 表示当前url */}
                    <li><Link to={`${this.props.match.url}/1`}>示例1</Link></li>
                    <li><Link to={`${this.props.match.url}/2`}>示例2</Link></li>
                    <li><Link to={`${this.props.match.url}/3`}>示例3</Link></li>
                    <hr/>

                    <Route path={`${this.props.match.url}/1`} component={First}/>
                    <Route path={`${this.props.match.url}/2`} component={Second}/>
                    <Route path={`${this.props.match.url}/3`} component={ChildRouter}/>
                </div>
            </Router>
        </div>
    }
}
```

<h3>4、BrowserRouter 和 HashRouter</h3>

以上两个DEMO，都是 HashRouter，而非 BrowserRouter ，二者有所不同。

以下解释的前提是你要懂什么叫 hash 地址，就是 # 号后面的 url。

假如有一个 Link 标签，点击后跳转到 ``/abc/def``。

1. BrowserRouter： ``http://localhost:8080/abc/def``
2. HashRouter： ``http://localhost:8080/#/abc/def``

<br>
如果有服务器端的动态支持，建议使用 ``BrowserRouter``，否则建议使用 ``HashRouter``。

原因在于，如果是单纯的静态文件，假如路径从 ``/`` 切换到 ``/a`` 后，此时刷新页面，页面将无法正常访问。

二者的替换方法很简单，我们在引入 ``react-router-dom`` 时，如以下：

```
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
```

将 ``BrowserRouter`` 修改为 ``HashRouter`` 就可以了，基本不需要修改其他东西。

因为写服务器文件还比较麻烦，因此在之后的 DEMO 中，我们将主要使用 HashRouter 而不是 BrowserRouter。

<h3>5、props</h3>

> 参考 3.props.js

react-router 的路由信息，都存储在组件的 props 里。

之所以是存在 props 里，是因为我们写在父组件里的，是 Route 标签，我们需要显示的组件，是作为 Route 标签的属性而传进去的。

显然，而我们的组件，作为 Route 标签的子组件而存在，因此，路由数据通过 props 传给我们的组件，这也是理所当然的事情了。

因此，可以得出几个结论：

1. 只有 Route 标签里传入的组件，才能通过 props 属性读取路由属性（除非你自己手动传给子组件）；
2. 每个能读取路由属性的组件，其 match 属性，获得的是当前级别的路由的属性（例如本级路由的 ``match.url = '/Params/2'``，那么上级路由的 ``match.url = '/Params'``；

<br>
其他论断：

1. ``match.isExact``：假如当前路径和 route 标签里的 path 完全相同，该值为 true，否则为 false（例如当匹配到次级路由时，那么上级路由的这个属性则为 false，次级当前的为 true）（当 url 为 ``/`` 时显示该组件，``/a`` 不显示组件，需要使用这个）；
2. ``match`` 属性的值，是根据当前路由（组件所在的 route 标签）的层级而决定的；
3. ``location`` 属性的值，在每个能读取到这个属性的路由组件，都是相同的；
4. 类似 ``/1?a=1`` 这样的路径，其中 ``?a=1``，是通过 ``location.search`` 来获取；
5. 路由信息，当路由变化时，是会跟着一起更新的，但并不是实时更新的；

对于第五条，进行详细解释：

假如我通过点击 ``<Link>`` 标签，让路由从 ``/a`` 跳转到 ``/b`` ，也就是说，从显示 A 组件到显示 B 组件。会发生以下事情：

【1】如果 Link 标签里有一个 onClick 事件，那么显然可以拿到 location 属性的值。

在该事件执行的这段时间，``props.location`` 的值，是 url 更新之前的。

并且，``window.location``（也就是原生的），其 url 也是更新之前的；

【2】那什么时候可以获取到更新之后的 url 呢？

答案是路由更新后，所对应的那个组件，在挂载的时候，生命周期处于 ``componentWillMount`` 时，可以获取到最新的 url。

因此如果需要第一时间在父组件内拿到更新后的值，那么需要在父组件，将回调函数传给子组件才可以实现。

实现原理：可以参考 [17、组件通信](https://github.com/qq20004604/react-demo#17%E7%BB%84%E4%BB%B6%E9%80%9A%E4%BF%A1)，父组件将回调函数传给表单组件，然后表单组件负责执行这个回调函数，并将修改后的值作为参数传给函数。

具体写法参考后面章节。

DEMO如下：

【1、先例行引入】

```
import React from "react";
import {HashRouter as Router, Link, Route} from 'react-router-dom'
```

【2、两个子组件，分别点击显示和直接显示在页面上】

```
class First extends React.Component {
    constructor() {
        super()
        this.log = this.log.bind(this)
    }

    render() {
        return <button onClick={this.log}>点击显示路由信息，点击后请查看控制台</button>
    }

    log() {
        console.log(this.props)
    }
}

const Second = props => <div>
    函数组件显示路由信息：（这里是本级 Route 标签的部分信息）
    <pre>{JSON.stringify(props, undefined, 4)}</pre>
</div>
```

【3、父组件，负责对比其 props 与子组件不同】

```
class RoutingNested extends React.Component {
    constructor() {
        super()
    }

    render() {
        return <div>
            <h3>React-router 参数设置</h3>
            <h3>注意，这里存的不是组件里的路由信息，而是上一级 Router 标签的路由信息</h3>
            <h3>路由数据被存储在 this.props 里，这是其中部分属性 <pre>{JSON.stringify(this.props, undefined, 4)}</pre></h3>
            <Router>
                <div>
                    <li>
                        <Link to={`${this.props.match.url}/1?a=1`}
                              onClick={() => {
                                  console.log('Link 标签（跳转到/1）的 onClick 事件', this.props.location)
                              }}>
                            示例1
                        </Link>
                    </li>
                    <li>
                        <Link to={`${this.props.match.url}/2`}
                              onClick={() => {
                                  console.log('Link 标签（跳转到/2）的 onClick 事件', this.props.location)
                              }}>
                            示例2
                        </Link>
                    </li>
                    <hr/>

                    <Route path={`${this.props.match.url}/1`}
                           component={First}/>
                    <Route path={`${this.props.match.url}/2`} component={Second}/>
                </div>
            </Router>
        </div>
    }
}
```

具体示例参照 DEMO 里的 ``3.props.js``

<h3>6、参数</h3>

React路由取参数，有两种：

1. ``?a=1`` ：这种属于 search 字符串，在 ``location.search`` 里取值；
2. ``/a/123`` ：这种需要从 ``match.params``里取值；

但无论哪种，路由获取到的值，是跳转后的那一刻的值，而不是实时更新的最新值。

具体来说：

1. 假如 Link 标签跳转路径实时绑定输入框的一个值（假如值是 ``abc``），这个值作为参数传递；
2. 点击跳转后，子组件读取到当前传的值 ``abc``；
3. 此时修改【1】中输入框的值为 ``def``；
4. 请问子组件读取到的值此时是多少？``abc`` 还是 ``def``；
5. 答案是 ``abc``；
6. 原因是当前路径是 ``abc``，这个值读取到的是当前路径的值，而不是将要跳转的路径的值，因此不是实时更新的（显然，也不应该是实时更新的）；

手动修改地址栏的 url：

7. 假如手动修改 url 为 ``ggg``，那么请问读取到的值是多少？
8. 我还真去试了一下。答案是除非你修改后，按回车跳转路径，会读取到最新的；
9. 否则，依然保持为修改前 ``abc``；
10. 即使你重新触发 render 方法（比如修改 state 来实现），依然获取到的是 ``abc`` ，而不是 ``ggg``；

获取最新值：

11. 如果你想要获取到新值，那么请重新点击跳转（绑定了新的 url 的 Link 标签）即可；
12. 重新跳转后（假如跳转到同一个页面），url 改变了，那么组件会重新加载么？
13. 答案是否定的，如果跳转到同一个组件，仅是参数改变，那么组件是不会重新加载的，即组件内的数据保持之前不变，只有传递的参数改变了（生命周期函数也不会重新执行）；

比较特殊的，有关生命周期：

1. 组件的生命周期函数，只会在第一次挂载的时候执行，如果前后跳转是同一个组件，那么该组件的生命周期函数不会重复执行；
2. 但 state 的生命周期，会多次执行（只要父组件的 state 改变了，子组件的相关函数会被执行）；
3. 由于路由信息是通过 props 传值的，因此也会多次触发；
4. 不过没有影响，传的值依然是旧值（因为路由信息没变）；
5. 但假如你在 state 生命周期函数里做了一些什么事情，可能需要注意一下会不会带来不良影响（虽然一般不会）；

示例：

【例行引入和子组件】

```
import React from "react";
import {HashRouter as Router, Link, Route} from 'react-router-dom'

const First = props => <div>
    第一个组件读取参数（location.search） {props.location.search}
</div>

const Second = props => <div>
    第二个组件读取参数（match.params.myParams） {props.match.params.myParams}
</div>
```

【父组件，负责配置路由和传值】

```
class RoutingNested extends React.Component {
    constructor() {
        super()
        this.state = {
            firstNumber: 0,
            secondNumber: 0
        }
        this.changeFirst = this.changeFirst.bind(this)
        this.changeSecond = this.changeSecond.bind(this)
    }

    render() {
        return <div>
            <h3>4、React-router 传参</h3>
            <h3>请在对应的跳转标签里，输入你想要传的值</h3>
            <Router>
                <div>
                    <li>
                        <Link to={`${this.props.match.url}/1?a=${this.state.firstNumber}`}
                              onClick={() => {
                                  console.log('Link 标签（跳转到/1）的 onClick 事件', this.props.location)
                              }}>
                            示例1
                        </Link>
                        <input type="text" value={this.state.firstNumber} onChange={this.changeFirst}/>
                    </li>
                    <li>
                        <Link to={`${this.props.match.url}/2/${this.state.secondNumber}`}
                              onClick={() => {
                                  console.log('Link 标签（跳转到/2）的 onClick 事件', this.props.location)
                              }}>
                            示例2
                        </Link>
                        <input type="text" value={this.state.secondNumber} onChange={this.changeSecond}/>
                    </li>
                    <hr/>

                    <Route path={`${this.props.match.url}/1`} component={First}/>
                    <Route path={`${this.props.match.url}/2/:myParams`} component={Second}/>
                </div>
            </Router>
        </div>
    }

    changeFirst(e) {
        this.setState({
            firstNumber: e.target.value
        })
    }

    changeSecond(e) {
        this.setState({
            secondNumber: e.target.value
        })
    }
}
```

<h3>7、父组件传 值 or 函数 给子组件</h3>



<h3>8、path 和 url 的区别</h3>

假如路由匹配路径是 ``/Params/2/:myParams``，实际跳转路径是 ``/Params/2/1``。

那么；

1. url：``/Params/2/1``
2. path：``/Params/2/:myParams``