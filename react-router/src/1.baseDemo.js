/**
 * Created by 王冬 on 2018/2/13.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 * 基本DEMO
 */
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

export default BaseDemo