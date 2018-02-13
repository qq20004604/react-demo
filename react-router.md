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

首先引入对应的模块

```
import {
    BrowserRouter as Router,
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
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

const first = () => <div>第一个示例的第【1】个路由，第一个路由在第一个和第二个url里都会显示，但不在第三个显示</div>
const second = () => <div>第一个示例的第【2】个路由，只在第二个url里显示</div>
const third = () => <div>第三个示例</div>

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

                    <Route path={`${this.props.match.url}/1`} component={first}/>
                    <Route path={`${this.props.match.url}/2`} component={first}/>
                    <Route path={`${this.props.match.url}/2`} component={second}/>
                    <Route path={`${this.props.match.url}/3`} component={third}/>
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
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

const first = () => <div>第一个示例的第【1】个路由，第一个路由在第一个和第二个url里都会显示，但不在第三个显示</div>
const second = () => <div>第一个示例的第【2】个路由，只在第二个url里显示</div>
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

                    <Route path={`${this.props.match.url}/1`} component={first}/>
                    <Route path={`${this.props.match.url}/2`} component={second}/>
                    <Route path={`${this.props.match.url}/3`} component={ChildRouter}/>
                </div>
            </Router>
        </div>
    }
}
```

<h3>4、</h3>



<h3>5、</h3>
<h3>6、</h3>