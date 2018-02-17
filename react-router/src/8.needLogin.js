/**
 * Created by 王冬 on 2018/2/17.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 *
 */
import React from 'react'
import {HashRouter as Router, Link, Redirect, Route} from 'react-router-dom'

const DefaultPage = () => <div>
    这里是默认页面
</div>

// 用户信息存在这里
const UserInfo = {
    userName: ''
}

// 登录页面，登录后，标记 userName
class Login extends React.Component {
    state = {
        // 为了测试用方便，默认给一个值
        userName: 'myName is Lily'
    }

    login = () => {
        // 事实上，这最好应该再增加一个校验逻辑
        UserInfo.userName = this.state.userName
        // 赋值后，记得再跳转一下（登录路径和私有页面的路径是不同的）
        this.props.history.push(`${this.props.match.url.replace(/\/[^/]+$/, '')}/protect`)
    }

    changeName = e => {
        this.setState({
            userName: e.target.value
        })
    }

    render() {
        return <div>
            姓名： <input type="text" value={this.state.userName} onChange={this.changeName}/>
            <br/>
            <button onClick={this.login}>点击登录</button>
        </div>
    }
}

// 这里是隐私页面，登录后才可以查看
class Private extends React.Component {
    // 登出逻辑
    signOut = () => {
        // 清空登录信息后，记得再重定向一次
        UserInfo.userName = ''
        this.props.history.push(`${this.props.match.url.replace(/\/[^/]+$/, '')}`)
    }

    render() {
        return <div>
            <button onClick={this.signOut}>登出</button>
            <div>你好，{UserInfo.userName}！欢迎您！</div>
        </div>
    }
}

// 受保护页面拦截器，在本级页面进行拦截，如果发现未登录，则跳转到登录页面，否则允许进入隐私页面
const ProtectPage = props => {
    // 如果没有登录
    if (!UserInfo.userName) {
        return <Redirect to={`${props.match.url.replace(/\/[^/]+$/, '')}/login`}></Redirect>
    } else {
        return <Private {...props}/>
    }
}

const RedirectExample = props => (
    <Router>
        <div>
            <ul>
                <li><Link to={`${props.match.url}`}>普通页面（无需登录）</Link></li>
                <li><Link to={`${props.match.url}/protect`}>需要登录的页面</Link></li>
            </ul>
            <hr/>
            <Route exact path={`${props.match.url}`} component={DefaultPage}/>
            <Route path={`${props.match.url}/login`} component={Login}/>
            <Route path={`${props.match.url}/protect`} component={ProtectPage}/>
        </div>
    </Router>
)


export default RedirectExample