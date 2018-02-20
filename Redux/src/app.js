import React from 'react';
import ReactDOM from 'react-dom';
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