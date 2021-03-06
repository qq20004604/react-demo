/**
 * Created by 王冬 on 2018/2/18.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 * redux 存储空间
 */
import {combineReducers, createStore} from 'redux';

function visibilityFilter(state = 'SHOW_ALL', action) {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter
        default:
            return state
    }
}

function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ]
        case 'COMPLETE_TODO':
            return state.map((todo, index) => {
                if (index === action.index) {
                    return Object.assign({}, todo, {
                        completed: true
                    })
                }
                return todo
            })
        default:
            return state
    }
}

let reducer = combineReducers({visibilityFilter, todos})
let store = createStore(reducer)

export default store