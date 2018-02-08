import React from 'react';
import ReactDOM from 'react-dom';

// 引入异步加载组件
import AsyncLoad from './asyncLoader.js'

// 异步组件加载函数封装
const Leaner = resolve => require(['./learner.js'], resolve)

class RefsDemo extends React.Component {
    constructor() {
        super()
        this.state = {
            displayComponent: false
        }
        this.load = this.load.bind(this)
    }

    render() {
        return <div>
            {/* 点击执行 load 方法 */}
            <button onClick={this.load}>点击加载异步组件</button>
            <AsyncLoad modules={Leaner} displayComponent={this.state.displayComponent}></AsyncLoad>
            {/* 变量存在时（非空，使用标签作为JSX的标签名（该变量已被赋值异步模块）；否则使用null（即无DOM） */}
            {/*{*/}
            {/*this.state.myComponent ? <this.state.myComponent></this.state.myComponent> : null*/}
            {/*}*/}
        </div>
    }

    load() {
        this.setState({
            displayComponent: true
        })
    }
}

ReactDOM.render(
    <div>
        <RefsDemo/>
    </div>,
    document.getElementById('root')
)