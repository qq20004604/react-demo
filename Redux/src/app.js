/**
 * Created by 王冬 on 2018/2/22.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 *
 */

import React, {Component} from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
// 引入 connect 和 Provider 方法
import {connect, Provider} from 'react-redux'

// type 的常量
const ADD_TO_LIST = 'ADD_TO_LIST'

// 这里是 reducer
function reducer(state = [], action) {
    switch (action.type) {
        case ADD_TO_LIST:
            return [...state, action.value];
        default:
            return state
    }
}

// 这里是 store
const store = createStore(reducer)

// 这里是生成 action
function addToList(text) {
    return {
        type: ADD_TO_LIST,
        value: text
    }
}


// 展示组件1，负责将输入框内容添加到列表
class AddItemComponent extends Component {
    render() {
        return <div>
            <input type="text" ref='myInput'/>
            <button onClick={this.addToList}>将输入内容添加到列表</button>
        </div>
    }

    // 拿到值，调用调用父组件传进来的方法
    addToList = () => {
        let node = this.refs.myInput
        this.props.addToList(node.value)
        node.value = ''
    }
}

// 展示组件2，负责展示数据列表
class ShowComponent extends Component {
    render() {
        const {list} = this.props
        return <ul>
            {list.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
    }
}


// 改造后的容器组件，负责管理 state
class Container extends Component {
    render() {
        const {dispatch, list} = this.props
        return <div>
            <AddItemComponent addToList={value => dispatch(addToList(value))}/>
            <ShowComponent list={list}/>
        </div>
    }
}

// 这个是新知识，
// 入参是 state
// 返回值是你需要传给子组件 Container 的 props 的数据结构
function MapState(state) {
    return {
        list: state
    }
}

// 新知识：这个是包装后的容器组件，我们需要插入到父组件中的是这个
const App = connect(MapState)(Container)

// 这个也是一个新的知识点
render(
    <Provider store={store}>
        <App></App>
    </Provider>,
    document.getElementById('root')
)