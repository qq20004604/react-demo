/**
 * Created by 王冬 on 2018/2/13.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 *
 */
import React from "react";
// 引入异步加载组件
import AsyncLoad from './asyncLoader.js'

// 异步组件加载函数封装
const Leaner = resolve => require(['./learner.js'], resolve)

class AsyncLoaderDemo extends React.Component {
    constructor(props) {
        super(props);
        this.load = this.load.bind(this)
    }

    render() {
        return <div>
            <button onClick={this.load}>点击加载异步组件</button>
            <AsyncLoad modules={Leaner} displayComponent={this.state.displayComponent}></AsyncLoad>
        </div>
    }

    load() {
        this.setState({
            displayComponent: true
        })
    }
}

export default AsyncLoaderDemo