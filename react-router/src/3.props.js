/**
 * Created by 王冬 on 2018/2/13.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 * 路由嵌套DEMO
 */
import React from "react";
import {HashRouter as Router, Link, Route} from 'react-router-dom'

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

class RoutingNested extends React.Component {
    constructor() {
        super()
    }

    render() {
        return <div>
            <h3>3、React-router 路由数据</h3>
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

export default RoutingNested