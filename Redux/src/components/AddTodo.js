import React, {Component} from 'react'

export default class AddTodo extends Component {
    render() {
        return (
            <div>
                <input type='text' ref='input'/>
                <button onClick={(e) => this.handleClick(e)}>
                    Add
                </button>
            </div>
        )
    }

    handleClick(e) {
        // 拿到 input 输入框
        const node = this.refs.input
        // 拿到他的值，trim是去除首尾空格
        const text = node.value.trim()
        // 调用父组件传过来的 onAddClick 方法，并传值给他
        this.props.onAddClick(text)
        // 输入框的值清空
        node.value = ''
    }
}