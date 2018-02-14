/**
 * Created by 王冬 on 2018/2/14.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 * 传参
 */
import React from "react";
import {HashRouter as Router, Link, Route} from 'react-router-dom'

const First = props => <div>
    第一个组件读取参数（location.search） {props.location.search}
</div>

// const Second = props => <div>
//     第二个组件读取参数（match.params.myParams） {props.match.params.myParams}
// </div>

// ---- 下面 Second 是带生命周期的，上面的是单纯的读取参数的 ----
class Second extends React.Component {
    constructor() {
        super()
        this.state = {
            a: 1
        }
        this.add = this.add.bind(this)
    }

    componentWillMount() {
        console.log('%c%s', 'color:green', 'componentWillMount 组件挂载前触发')
    }

    componentWillReceiveProps(props) {
        console.log('%c%s',
            'color:red',
            'componentWillReceiveProps 【state 改变后，这个函数会被执行。props的值：',
            props.match)
    }

    render() {
        return <div>
            第二个组件读取参数（match.params.myParams） {this.props.match.params.myParams}
            <button onClick={this.add}>当前是{this.state.a}，点击增加1</button>
        </div>
    }

    add() {
        this.setState({
            a: this.state.a + 1
        })
    }
}

class RoutingNested extends React.Component {
    constructor() {
        super()
        this.state = {
            firstNumber: 0,
            secondNumber: 0
        }
        this.changeFirst = this.changeFirst.bind(this)
        this.changeSecond = this.changeSecond.bind(this)
    }

    render() {
        return <div>
            <h3>4、React-router 传参</h3>
            <h3>请在对应的跳转标签里，输入你想要传的值</h3>
            <Router>
                <div>
                    <li>
                        <Link to={`${this.props.match.url}/1?a=${this.state.firstNumber}`}
                              onClick={() => {
                                  console.log('Link 标签（跳转到/1）的 onClick 事件', this.props.location)
                              }}>
                            示例1
                        </Link>
                        <input type="text" value={this.state.firstNumber} onChange={this.changeFirst}/>
                    </li>
                    <li>
                        <Link to={`${this.props.match.url}/2/${this.state.secondNumber}`}
                              onClick={() => {
                                  console.log('Link 标签（跳转到/2）的 onClick 事件', this.props.location)
                              }}>
                            示例2
                        </Link>
                        <input type="text" value={this.state.secondNumber} onChange={this.changeSecond}/>
                    </li>
                    <hr/>

                    <Route path={`${this.props.match.url}/1`} component={First}/>
                    <Route path={`${this.props.match.url}/2/:myParams`} component={Second}/>
                </div>
            </Router>
        </div>
    }

    changeFirst(e) {
        this.setState({
            firstNumber: e.target.value
        })
    }

    changeSecond(e) {
        this.setState({
            secondNumber: e.target.value
        })
    }
}

export default RoutingNested