/**
 * Created by 王冬 on 2018/2/13.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 * 基本DEMO
 */
import React from "react";
import {HashRouter as Router, Link, Route} from 'react-router-dom'

const First = () => <div>第一个示例的第【1】个路由，第一个路由在第一个和第二个url里都会显示，但不在第三个显示</div>
const Second = () => <div>第一个示例的第【2】个路由，只在第二个url里显示</div>
const Third = () => <div>第三个示例</div>

class BaseDemo extends React.Component {
    render() {
        return <div>
            <h3>1、React-router基础示例</h3>
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

export default BaseDemo