/**
 * Created by 王冬 on 2018/2/16.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 * location 和 search 的属性
 */

import React from "react";
import {HashRouter as Router, Link, Route} from 'react-router-dom'

const Child = props => <div>
    <p>子路由的属性</p>
    <pre>{JSON.stringify(props, undefined, 4)}</pre>
</div>
const First = props => <div>
    <p>路由【1】</p>
    <p>相对于父组件，location 增加了一个新属性 myState</p>
    <pre>{JSON.stringify(props, undefined, 4)}</pre>
    <Router>
        <div>
            <li><Link to={`${props.match.url}/`}>子路由</Link></li>
            <hr/>
            <Route path={`${props.match.url}/`} component={Child}/>
        </div>
    </Router>
</div>
const Second = props => <div>
    <p>路由【2】</p>
    <pre>{JSON.stringify(props, undefined, 4)}</pre>
</div>

class BaseDemo extends React.Component {
    render() {
        return <div>
            <h3>2、路由信息是独立的</h3>
            <p>这里展现的是父组件的路由信息</p>
            <pre>{JSON.stringify(this.props, undefined, 4)}</pre>
            <Router>
                <div>
                    {/* this.props.match.url 表示当前url */}
                    <li><Link to={{
                        pathname: `${this.props.match.url}/1`,
                        myState: '这是我自定义的变量'
                    }}>示例1</Link></li>
                    <li><Link to={`${this.props.match.url}/2`}>示例2</Link></li>
                    <hr/>
                    <Route path={`${this.props.match.url}/1`} component={First}/>
                    <Route path={`${this.props.match.url}/2`} component={Second}/>
                </div>
            </Router>
        </div>
    }
}

export default BaseDemo