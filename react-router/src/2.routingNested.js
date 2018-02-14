/**
 * Created by 王冬 on 2018/2/13.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 * 路由嵌套DEMO
 */
import React from "react";
import {HashRouter as Router, Link, Route} from 'react-router-dom'

const First = () => <div>第一个示例的第【1】个路由，第一个路由在第一个和第二个url里都会显示，但不在第三个显示</div>
const Second = () => <div>第一个示例的第【2】个路由，只在第二个url里显示</div>
const ChildRouter = (route) => <div>第一个示例的第【3】个路由，只在第三个url里显示
    <Router>
        <div>
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
            <h3>2、React-router 路由嵌套</h3>
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

export default RoutingNested