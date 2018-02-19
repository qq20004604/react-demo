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
        state.push(action.value)
    }
    return state
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
2. 我们不能直接获得这个变量，一般是通过 action 来修改 state；
3. 最后通过 getState 来获取整个 state（只有这样才能循环获取）；
4. state 的循环：
5. 第一次 reducer 执行时的默认值（在 createStore 时执行）；
6. 第二次及以后， reducer 执行时传给参数一的值；
7. 每次 reducer 执行完的返回值；
8. getState 执行时的返回值；

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
        state.push(action.value)
    }
    return state
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

<br>
如果不太明白，请将以上代码运行后，查看控制台，结合输出结果来理解；

<h3>5、</h3>
<h3>6、</h3>
<h3>7、</h3>
<h3>8、</h3>
<h3>9、</h3>
<h3>10、</h3>