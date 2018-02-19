/**
 * Created by 王冬 on 2018/2/18.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 * redux 存储空间
 */
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
// store.dispatch({type: 'push', value: '123'})
let p = store.getState()
console.log('after dispatch：', p)
console.log('end')
export default store