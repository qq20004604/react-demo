/**
 * Created by 王冬 on 2018/2/14.
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

class HaveRedirect extends React.Component {

    constructor() {
        super()
    }

    toRedirect = () => {
        this.props.history.push(`${this.props.match.url.replace(/\/[^/]+$/, '')}/default`)
    }

    render() {
        return <div>
            <button onClick={this.toRedirect}>编程式导航跳转方式</button>
            <Router>
                <div>
                    {/*  点击后，跳转 url 到 /redirect 这个路径；
                      *  而这个路径匹配结果是一个路由，这个路由的内容是一个Redirect标签；
                      *  Redirect在渲染时候触发跳转，因此跳转到default路径中
                      *  */}
                    <Link to={`${this.props.match.url}/redirect`}>点击跳转到重定向页面，然后再跳转到初始页面</Link>
                    <hr/>
                    <Route path={`${this.props.match.url}/redirect`} component={(() =>
                            <Redirect to={`${this.props.match.url.replace(/\/[^/]+$/, '')}/default`}/>
                    )}></Route>
                </div>
            </Router>
        </div>
    }
}

const RedirectExample = props => (
    <Router>
        <div>
            <ul>
                <li><Link to={`${props.match.url}/default`}>默认页面</Link></li>
                <li><Link to={`${props.match.url}/haveRedirect`}>重定向父页面</Link></li>
            </ul>
            <hr/>
            <Route path={`${props.match.url}/default`} component={DefaultPage}/>
            <Route path={`${props.match.url}/haveRedirect`} component={HaveRedirect}/>
        </div>
    </Router>
)


export default RedirectExample