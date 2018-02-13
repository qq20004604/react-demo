/**
 * Created by 王冬 on 2018/2/8.
 * QQ: 20004604
 * weChat: qq20004604
 * 异步加载工厂组件
 */
import React from "react";

const loadingStatus = {
    notLoaded: 0,
    loading: 1,
    loaded: 2
}

export default class AsyncLoader extends React.Component {
    constructor() {
        super()
        this.state = {
            amount: loadingStatus.notLoaded,  // 0 表示未加载，1表示加载中，2表示加载完毕。没有考虑加载失败的问题（并不难）
            displayComponent: false,    // 是否显示组件
            component: null // 异步组件被赋值给这个变量
        }
    }

    // 生命周期函数，父组件更改 state 后会触发这个函数
    componentWillReceiveProps(nextProps) {
        // 如果没有modules，则直接报错
        if (!nextProps.modules) {
            return console.error('你没有传值 modules 给【异步组件加载器】')
        }
        // 如果 control 值为 true，且之前未加载过组件（用 amount === 0 来表示）
        if (nextProps.displayComponent && this.state.amount === 0) {
            console.log('开始加载组件')
            // 那么加载组件
            this.setState({
                amount: loadingStatus.loading   // 表示加载中
            })
            nextProps.modules(module => {
                if (!module.default) {
                    return console.error('你可能加载多个异步组件，或者加载的组件并非 React 的组件')
                }
                // 将异步赋值给 state 相应的变量
                console.log('组件加载完毕')
                this.setState({
                    amount: loadingStatus.loaded,   // 加载完毕
                    component: module.default
                })
            })
        }

        this.setState({
            displayComponent: nextProps.displayComponent
        })
    }

    render() {
        /* <React.Fragment> 是 React 的包裹容器（类似 Vue 的 <template> 标签） */
        return <React.Fragment>
            {/* 只有当前显示组件，并且组件加载完毕了，才显示该组件 */}
            {
                this.state.displayComponent && this.state.component ?
                    <this.state.component></this.state.component> : null
            }
        </React.Fragment>
    }
}
