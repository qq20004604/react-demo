import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addTodo, setVisibilityFilter, toggleTodo, VisibilityFilters} from '../actions'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'

// 这个属于展示组件
class App extends Component {
    render() {
        // Injected by connect() call:
        const {dispatch, visibleTodos, visibilityFilter} = this.props
        return (
            <div>
                {/*  这里的传一个函数给子组件；
                  *  函数调用效果是 store.dispatch
                  *  action 是添加一个文字 */}
                <AddTodo
                    onAddClick={text =>
                        dispatch(addTodo(text))
                    }/>
                {/*
                 * 将 props.todos 传给子组件，用于展示
                 * 函数的调用效果，store.dispatch
                 * action 是将对应索引的数据的 index 的 completed 改为 true
                 *  */}
                <TodoList
                    todos={visibleTodos}
                    onTodoClick={item =>
                        dispatch(toggleTodo(item))
                    }/>
                <Footer
                    filter={visibilityFilter}
                    onFilterChange={nextFilter =>
                        dispatch(setVisibilityFilter(nextFilter))
                    }/>
            </div>
        )
    }
}

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed)
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed)
    }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
// 这个函数很简单
// 入参是 state
// 返回值是你需要传给子组件的 props 的数据结构
function select(state) {
    return {
        // 取出 state.todos 和 state.visibilytyFilter 实时计算当前需要展示的 todos
        visibleTodos: selectTodos(state.todos, state.visibilityFilter),
        // visibilityFilter 就是 state 里的 visibilityFilter
        visibilityFilter: state.visibilityFilter
    }
}

// 这个属于容器组件，导出容器组件
// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(App)