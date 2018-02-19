import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers, createStore} from 'redux'

function First(state = {text: 'First', index: 0}, action) {
    state.index++;
    return state;
}

function Second(state = {text: 'Second', index: 0}, action) {
    // 这里在初始化（combineReducers）时，会被执行 2 次，校验 reducer，所以要额外注意一下。
    // 第一次是 {type: "@@redux/INIT"}，这个值将被存储下来；
    // 第一次是为了检测初始化时，返回值是不是 undefined，如果是则抛错
    // 第二次是 {type: "@@redux/PROBE_UNKNOWN_ACTION_随机字符若干"}
    // 第二次是为了测试当 type 为任意的时候，是不是会返回undefined（即测试你有没有每次都返回 state 的值）
    // 如果返回 undefined，则会报错（即进行一次 reducer 检测）
    // 另外，这两次的值都不会存储下来，因为是纯测试，但假如你在 reducer 里写了某些有副作用的代码
    // 比如修改某个 reducer 函数作用域之外的变量，那么就出事了（因为你预期只应该修改一次，但实际修改了两次）
    // 所以应该尽量避免有副作用的代码写在 reducer 里面
    console.log('second action: ', action)
    // 这里只是测试代码，实际中
    state.index++;
    return state;
}

// 合并两个reducer，返回一个新的 reducer
// 合并后，返回新的 state ，新的是一个对象，结构是 { First: {}, Second: {} }
// First 的 state 被存在返回对象的 First 属性里；
// Second 同理
// 在执行这个函数的时候，会检验一次传入的 reducer
let fn = combineReducers({
    First,
    Second
})
console.log('after combineReducers')
let store = createStore(fn)
// 初始获取默认的 state，注意，此时两个 reducer 已经被执行过一次了（初始化），所以 index 为 1
console.log(store.getState())   // {"First":{"text":"First","index":1},"Second":{"text":"Second","index":1}}
let p = store.getState()
// 发起一次 action，此时，每个 reducer 都会被执行
store.dispatch({type: ''});
// 获取此时的值，发现两个的index都被改变了
console.log(store.getState())   // {"First":{"text":"First","index":2},"Second":{"text":"Second","index":2}}
// console.log(JSON.stringify(store.getState()))

class RefsDemo extends React.Component {
    constructor() {
        super()
        this.state = {
            a: 1,
            b: 2
        }
        this.change = this.change.bind(this)
    }

    render() {
        return <div>
            <input type="text" value={this.state.a} onChange={e => {
                this.change('a', e)
            }}/>
        </div>
    }

    change(type, e) {
        console.log(type, e)
    }
}

ReactDOM.render(
    <div>
        <RefsDemo/>
    </div>,
    document.getElementById('root')
)