/**
 * Created by 王冬 on 2018/2/18.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 * redux 存储空间
 */
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

store.subscribe(() => {
// 我们的返回值，需要通过 store.getState 来获取
    console.log(store.getState())
    console.log(store.getState())
})

// 触发他，但这个的返回值并不是我们需要的返回值
store.dispatch({type: 'a'})
console.log('a', store.getState())


export default store