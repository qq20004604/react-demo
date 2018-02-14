/**
 * Created by 王冬 on 2018/2/14.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 * 父组件给子组件传参
 */
import React from "react";
import {HashRouter as Router, Link, Route} from 'react-router-dom'

class First extends React.Component {
    render() {
        return <div>【1】当前 time 值为：{this.props.time}</div>
    }
}

const Second = (props) => <div>
    【2】time（负数）: {props.time * -1}
</div>

class RoutingNested extends React.Component {
    constructor() {
        super()
        this.state = {
            time: 0
        }
    }

    // 这个是生命周期，目的是为了测试 state 的传递
    componentWillMount() {
        this.timer = setInterval(() => {
            this.setState({
                time: this.state.time + 1
            })
        }, 1000)
    }

    // 卸载时，删除定时器
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        // 这个写法和写在组件里，基本没什么区别，不过这样写感觉好看一些
        const MySecond = props => {
            let obj = Object.assign({}, {time: this.state.time}, props)
            return <Second {...obj}/>
        }

        return <div>
            <h3>5、父组件传参给子组件</h3>
            <p>父组件当前值为：{this.state.time}</p>
            <Router>
                <div>
                    <li>
                        <Link to={`${this.props.match.url}`}>
                            跳转查看传参【1】
                        </Link>
                    </li>
                    <li>
                        <Link to={`${this.props.match.url}/2`}>
                            跳转示例【2】
                        </Link>
                    </li>
                    <hr/>

                    {/* 这种是写在组件里，没啥区别 */}
                    <Route exact path={`${this.props.match.url}/`}
                           component={props => {
                               let obj = Object.assign({}, {time: this.state.time}, props)
                               return <First {...obj}/>
                           }}/>
                    <Route path={`${this.props.match.url}/2`} render={MySecond}/>
                </div>
            </Router>
        </div>
    }
}

export default RoutingNested