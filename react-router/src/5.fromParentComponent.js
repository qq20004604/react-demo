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
    constructor() {
        super()
        this.log = this.log.bind(this)
    }

    render() {
        return <div>当前值为：{this.props.time}</div>
    }

    log() {
        console.log(this.props)
    }
}

const Second = () => <div>
    这里占位使用
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

    componentDidMount() {
        clearInterval(this.timer)
    }

    render() {
        return <div>
            <h3>父组件传参给子组件</h3>
            <p>父组件当前值为：{this.state.time}</p>
            <Router>
                <div>
                    {/* this.props.match.url 表示当前url */}
                    <li>
                        <Link to={`${this.props.match.url}`}>
                            跳转查看传参
                        </Link>
                    </li>
                    <li>
                        <Link to={`${this.props.match.url}/2`}>
                            占位跳转1
                        </Link>
                    </li>
                    <hr/>

                    <Route exact path={`${this.props.match.url}/`}
                           render={props => {
                               let obj = Object.assign({}, {time: this.state.time}, props)
                               return <First {...obj}/>
                           }}/>
                    <Route path={`${this.props.match.url}/2`} component={Second}/>
                </div>
            </Router>
        </div>
    }
}

export default RoutingNested