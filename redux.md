参考文献：


* [Redux 中文文档](http://cn.redux.js.org/)
* [React 之容器组件和展示组件相分离解密](https://segmentfault.com/a/1190000006845396)
* [React 实践心得：react-redux 之 connect 方法](http://taobaofed.org/blog/2016/08/18/react-redux-connect/)

<h3>1、安装</h3>

```
npm install --save redux react-redux redux-devtools
```

<h3>2、基本示例</h3>

先上 DEMO：

```
// 引入
import {createStore} from 'redux';

// 传说中的 Reducer
function myReducer(state = [5, 4], action) {
    if (action.type === 'push') {
        return [...state, action.value]
    } else {
        return state
    }
}

// store对象
let store = createStore(myReducer);

// 触发他，但这个的返回值并不是我们需要的返回值
store.dispatch({type: 'push', value: '123'})

console.log('after dispatch：', store.getState())
console.log('end')
```

输出：

```
after dispatch： (2) [5, 4]
end
```

描述：

【Reducer】

1. 所谓的 Reducer ，是一个函数（上面这个 myReducer）；
2. 参数一：是 state ，类型任意（字符串、对象等），我们需要保存的数据，就是存在这里的；
3. 第一次 state 的值，取自默认值；之后 state 的值，取自 <b>之前 reducer 的返回值（重要！）</b>；
4. 参数二：一个对象，当我们 dispatch 时，其参数会作为这个参数，传入本函数；
5. 简单来说，所谓的 reducer，就是指创建一个函数，每次需要修改/获取变量的时候，就会执行这个函数，然后函数里的逻辑，会修改/获取你需要的那个 state，最后返回这个 state ；
6. 第一次执行 reducer ，是在 createStore 这一步时执行的。

<br>

【state】

1. 简单来说，就是值都是存这个里面的（上面 myReducer 函数里的参数 state）；
2. 我们不能直接获得这个变量，一般是通过 action 来让 state 变化；
3. 注意，不能修改 state ！
4. 假如 state 是一个数组，然后你需要给数组添加一个新的元素，请务必不要直接使用 push 来完成添加，应当像上面那样，返回一个新的 state；
5. 如果不需要修改，则返回默认的 state ；
6. 最后通过 getState 来获取新 state（只有这样才能循环获取）；
7. state 的循环：
8. 第一次 reducer 执行时的默认值（在 createStore 时执行）；
9. 第二次及以后， reducer 执行时传给参数一的值；
10 每次 reducer 执行完的返回值；
11. getState 执行时的返回值；

<br>
<b>【state 的修改原则】</b>

1. 不需要改变 state 时，返回原 state ；
2. 需要修改 state 时，复制一个新的 state，在新的 state 上进行修改并返回新的 state。

<br>
【action】

1. 上面 ``store.dispatch`` 里面的参数就是 action ；
2. 他的作用，就是告诉 store ，我要做一件事（这件事已经在 reducer 里定义好了）；
3. 然后 reducer 会被执行，根据传入的值，按照预期的逻辑做事；
4. 在执行 createStore 时，reducer 会被执行一次，此时 action 的值是 ``{type: "@@redux/INIT"}``；
5. action 必须有 type 属性；

<br>

【getState】

1. dispatch 触发 action 后，并不会直接获得 state 的值（其返回值是 dispatch 的参数，即 action ）；
2. 因此我们需要在 action 完毕后，通过 getState 来获取我们取到的值；
3. getState 取值是每次 reducer 执行完后的返回值；
4. 执行 getState 时，不会执行 reducer ，而是取之前执行 reducer 时的返回值（可以理解 state 被存储起来了）；

<br>

【store】

1. 以上几个，都是以一个 store 为单位而使用的（如上面的变量 store ）；
2. 假如有多个 store（比如 storeA 和 storeB ，显然他们之间是不会互相干扰的，即 storeA 触发 dispatch ，只会执行 storeA 的 reducer ，而不会执行 storeB 的；

<br>

【同步】

1. dispatch 是同步行为；
2. getState 也是同步行为；
3. 所以当你 dispatch 后，可以立刻通过 getState 获取最新的 state 的值；


<br>
总结：

1. Redux 的实质，就是创建一个 store ;
2. 然后以这个 store 作为核心，通过 action （比如dispatch）触发 reducer （回调函数），然后修改 state ，最后通过 getState 来获取当前的 state；
3. 其他都是基于这个上面的延伸；

<h3>3、订阅更新 subscribe</h3>

简单来说，我们可以通过订阅，在 store 被修改后，自动执行与设定的回调函数，并且这是一个同步行为；

如代码：

```
import {createStore} from 'redux';

// 传说中的 Reducer
function myReducer(state = [5, 4], action) {
    if (action.type === 'push') {
        return [...state, action.value]
    } else {
        return state
    }
}

// store对象
let store = createStore(myReducer);
store.subscribe(function () {
    // 注意，this指向 undefined
    console.log('subscribe 1：', store.getState())
})
store.subscribe(function () {
    // 注意，this指向 undefined
    console.log('subscribe 2：', store.getState())
})
store.dispatch({type: 'push', value: 3})

console.log('after dispatch')
```

输出：

```
subscribe 1： (3) [5, 4, 3]
subscribe 2： (3) [5, 4, 3]
after dispatch
```

也就是说，dispatch 执行完之后，立刻就执行之前 subscribe 的回调函数，然后再执行 dispatch 后面的代码。

1. 所有订阅（subscribe）的回调函数，都会被执行；
2. 先订阅的先执行；
3. 回调函数里的 this，默认是 undefined；
4. 回调函数里可以通过 store.getState() 来获取值；

【停止监听】

1. 停止监听很简单；
2. ``let fn = store.subscribe(()=>{}) `` 会返回一个函数，执行一次这个函数即可停止监听；

<h3>4、combineReducers 合并多个 reducer</h3>

为什么要合并多个 reducer ？

原因是：

1. 一般情况下，建议只有一个 store ；
2. 我们开发时的东西是粒度的，比如一个模块里带一个 reducer ；
3. 所以必然整个应用里会有多个 reducer ，毫无疑问，这些 reducer 之间应该是解耦的；
4. 但我们 store 只有一个， createStore 时，也只有一个参数，所以我们必须把多个 reducer 合并后，再传给 createStore ；
5. 这就是为什么我们要合并多个 reducer ；
6. 至于怎么合并，使用 ``combineReducers(object)`` 即可；

给出示例：

```
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

// 发起一次 action，此时，每个 reducer 都会被执行
store.dispatch({type: ''});

// 获取此时的值，发现两个的index都被改变了
console.log(store.getState())   // {"First":{"text":"First","index":2},"Second":{"text":"Second","index":2}}
```

核心：

1. combineReducers 时，会检验传入的 reducer （两次，初始化和任意 type）；
2. 执行完后，会返回一个新的 reducer （注意，这个新的 reducer 可以继续和其他 reducer 再次 combineReducers ）；
3. 多个 reducer 在组合之后，被 createStore ，此时 getState 返回的 state 是一个对象（树结构）；
4. 这个 state ，是各个 reducer 以 kv 形式组合而成的。具体来说， key 是 combineReducers 时，每个 reducer 的 key ，而 value 是每个 reducer 的 state；
5. 如单个 First 的 state 是 ``{"text": "First", "index": 1}``，那么组合后，新的 state 就为：``{"First": {"text": "First", "index": 1}}``；
6. 每次执行 action 时，会依次执行每一个 reducer。例如你传入了符合 First 的 type ，但 js 实际执行中，并不可能知道你传入的 type 是符合哪一个 reducer ，所以他每个 reducer 都会执行；
7. 正常来说，默认情况下（不符合任何一个 type ），应该返回默认的 state ，会比较合理（除非有特殊需求）；

<br>
如果不太明白，请将以上代码运行后，查看控制台，结合输出结果来理解；

<h3>5、切分 action </h3>

在【4】的基础上，我们将多个 reducer 混合到了一起。

这带来一个问题，那就是当我们想要修改一个 state 时，会比较麻烦。例如：``store.dispatch({type: 'add', value: '123'})``

这样不是不可以，但是问题在于，耦合度太高（即我需要知道 reducer 内部，符合我需求的 type 字段的值是什么，并且这个字段不能被更改）。

在简单的小型应用中，这倒不是问题，但是面对大型应用的时候，这并不是一个好的方案。

解决办法：

1. 将 actions 单独封装到一个 js 文件中；
2. 将 actions 的 type 变为常量；
3. 在 reducer 里，type 的值取这个常量；
4. 当我们要使用某个 action 时，调用这个常量作为 type 即可；
5. 于是我们不需要关心 type 到底是什么值，只需要确保同一个 reducer 下，各个 type 不重复即可；
6. 为了解决每次都要写 type 的问题，我们将生成 action 这个行为，封装成一个函数；
7. 这个函数目的是生成一个 action ，入参是我们需要的变量；
8. 这样输入一个变量，然后函数返回一个符合我们需要的 action ，再将这个 action 作为 dispatch 的参数传进去，就 ok 了；

来一个最简单的示例：

```
// actions.js
/*
 * action 的 type 的常量
 */
export const ADD_ITEM = 'ADD_LIST';
export const REMOVE_LAST_ITEM = 'REMOVE_LAST_ITEM'

/*
 * action 创建函数
 */
// 添加进 state
export function addToList(item) {
    return {type: ADD_ITEM, item}
}

// 移除最后一个添加的内容
export function removeFromList() {
    return {type: REMOVE_LAST_ITEM}
}
```


```
// app.js
import {createStore} from 'redux'
import {ADD_ITEM, addToList, REMOVE_LAST_ITEM, removeFromList} from './actions'

function List(state = [], action) {
    // 注意，没有修改原 state
    if (action.type === ADD_ITEM) {
        return [...state, action.item]
    } else if (action.type === REMOVE_LAST_ITEM) {
        let arr = [...state]
        arr.pop()
        return arr
    } else {
        return state;
    }
}

let store = createStore(List)
store.subscribe(() => {
    console.log(store.getState())
})
store.dispatch(addToList('first'))
store.dispatch(addToList('second'))
store.dispatch(removeFromList())
```

输出结果：

```
["first"]
["first", "second"]
["first"]
```

分析：

1. action.js 负责生成常量，并导出；
2. action.js 里，封装了创造 action 的函数；
3. app.js 里，写了 reducer ，reducer 在判断 action.type 时，直接判断的是引入的常量，而不是自己写的字符串；
4. app.js 里，reducer 在 state 未修改时，返回默认 state；若修改，则返回全新的 state ；
4. app.js 里，通过 addToList 和 removeFromList 生成 action ，但他只关心我要做什么，传入的是什么，并不关心实际 action 结构是什么；
5. app.js 里，reducer 完全可以封装到另外一个 js 文件里，即用一个专门的 reducer.js 来管理 reducer，这样在复杂应用中，更加简单明了一些。

<h3>6、Redux 和 React 结合使用</h3>

>安装

除了安装 redux 外，还要安装 react-redux

```
npm install --save react-redux
```

在开始之前，先讲一个基本概念。

推荐将 React 组件，分为 **容器组件** 和 **展示组件** 。

在使用 redux 时，容器组件 和 展示组件 的区别：

1. 有何用：展示组件很简单，拿数据，然后显示出来。容器组件，从 redux 拿数据，然后将各个展示组件需要的数据，传给展示组件，不负责数据展示；
2. 数据：容器负责监控 redux 的 state，并将各个展示组件需要的 state 通过 props 传给展示组件。展示组件只负责使用数据，不关心数据是从 redux 来，或者是其他组件来；
3. 谁跟 redux 打交道：容器组件直接和 redux 打交道，关心 state、action 等。而展示组件不关心 redux；
4. 谁来修改 redux 的值：向 store 派发 action 是容器组件做的事情。而展示组件，只需要负责告诉容器组件，我要修改数据啦，至于容器组件具体怎么做，展示组件是不管的；
5. 生成和调用：展示组件正常生成，然后被容器组件正常调用。容器组件一般情况下，需要正常声明一次，然后通过 react-redux 的 api 包裹处理一遍，才算是一个完整的容器组件。

下面先给一个不使用 redux ，单纯体现容器组件和展示组件，简单的示例：

```
import React, {Component} from 'react'
import {render} from 'react-dom'

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
        console.log(list)
        return <ul>
            {list.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
    }
}


// 容器组件，负责管理 state
class Container extends Component {
    state = {
        list: []
    }

    render() {
        return <div>
            <AddItemComponent addToList={this.addToList}/>
            <ShowComponent list={this.state.list}/>
        </div>
    }

    // 这种声明方式自动绑定this
    addToList = (value) => {
        this.setState({
            list: [...this.state.list, value]
        })
    }
}

render(
    <div>
        <Container></Container>
    </div>,
    document.getElementById('root')
)
```

然后我们现在开始改造，利用 redux 来存储数据（你会发现代码量变多了，但这是值得的）

1、老规矩，我们需要 reducer、action，以及我们的 store 对象

```
import {createStore} from 'redux'

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
```

2、两个展示组件不变，他们不需要关心父组件怎么实现的；

3、改造容器组件，使其和 redux 结合。这方面我们需要接触一个新知识，那就是 ``connect()`` 和 ``Provider`` 标签。

关于这两个的深入研究，可以参照这篇博文 [React 实践心得：react-redux 之 connect 方法](http://taobaofed.org/blog/2016/08/18/react-redux-connect/)，比官方讲的要清楚一些。这里不细讲其有什么特点，只讲怎么用。

改造后的容器组件： 

```
// 引入 connect 和 Provider 方法
import {connect, Provider} from 'react-redux'

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
```

此时我们需要改变渲染的组件：

```
render(
    <div>
        {/* 现在将 store 传给 包裹后的 App 组件
          * 注意，第一个 store 是固定不能变的；
          * 第二个引用的 store 也应该是 createStore 后返回的那个
          * */}
        <App store={store}></App>
    </div>,
    document.getElementById('root')
)
```

如果不考虑使用 Provider 标签，这样就足够了。

但是更佳的做法是使用 Provider 标签，我们重写最后的render

```
render(
    <Provider store={store}>
        <App></App>
    </Provider>,
    document.getElementById('root')
)
```

这样就ok了。




<h3>7、</h3>
<h3>8、</h3>
<h3>9、</h3>
<h3>10、</h3>