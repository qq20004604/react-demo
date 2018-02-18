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
function myReducer(state = [5, 4, 3], action) {
    let number = [5, 4, 3];
    let test = {
        a: 0,
        b: 1,
        c: 2
    }
    if (number[test[action.type]]) {
        return number[test[action.type]]
    } else {
        return 'not Found'
    }
}

// store对象
let store = createStore(myReducer);

// 触发他，但这个的返回值并不是我们需要的返回值
store.dispatch({type: 'a'})

// 我们的返回值，需要通过 store.getState 来获取
console.log(store.getState())
```

描述：

【Reducer】

1. 所谓的 Reducer ，是一个函数（上面这个 myReducer）；
2. 参数一：是 state ，类型任意（字符串、对象等），即是我们要影响的那个变量；
3. 参数二：一个对象，当我们 dispatch 时，其参数会作为这个参数，传入本函数；
4. 简单来说，所谓的reducer，就是指创建一个函数，每次需要修改变量的时候，就会执行这个函数，然后函数里的逻辑，会修改/获取你需要的那个 state；

<br>

【state】

1. 简单来说，就是值都是存这个里面的（上面 myReducer 函数里的参数 state）；
2. 我们不能直接获得这个变量，一般是通过 action 来获取/修改 state；
3. 但获取不是靠 dispatch 获取，而是通过 getState 来获取；

<br>

【action】

1. 上面 ``store.dispatch`` 里面的参数就是 action ；
2. 他的作用，就是告诉 store ，我要做一件事（这件事已经在 reducer 里定义好了）；
3. 然后 reducer 会被执行，根据传入的值，按照预期的逻辑做事；
4. 如果需要获取值，那么会 return 返回这个值；

<br>

【getState】

1. dispatch 触发 action 后，并不会直接获得 state 的值（其返回值是 dispatch 的参数，即 action ）；
2. 因此我们需要在 action 完毕后，通过 getState 来获取我们取到的值；

<br>

【store】

1. 以上几个，都是以一个 store 为单位而使用的（如上面的变量 store ）；
2. 假如有多个 store（比如 storeA 和 storeB ，显然他们之间是不会互相干扰的，即 storeA 触发 dispatch ，只会执行 storeA 的 reducer ，而不会执行 storeB 的；

<br>
总结：

1. Redux 的实质，就是创建一个 store ;
2. 然后以这个 store 作为核心，通过 action （比如dispatch）触发 reducer （回调函数），然后修改/获取 state ，最后通过 getState 来获取当前的 state；
3. 其他都是基于这个上面的延伸；

<h3>3、</h3>


<h3>4、</h3>
<h3>5、</h3>
<h3>6、</h3>
<h3>7、</h3>
<h3>8、</h3>
<h3>9、</h3>
<h3>10、</h3>