/**
 * Created by 王冬 on 2018/2/17.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 * 路由信息表
 */
/**
 * Created by 王冬 on 2018/2/13.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 * 基本DEMO
 */
import React from "react";
import {HashRouter as Router, Link, Route} from 'react-router-dom'

const createLink = (routes, props) => (
    <ol>
        {
            routes.map(route => (
                <li key={route.path}>
                    <Link to={`${props.match.url}/${route.path}`}>{route.name}</Link>
                </li>
            ))
        }
    </ol>
)

const createRoute = (routes, props) => (
    <React.Fragment>
        {routes.map((route, i) => {
            let obj = {
                key: i,
                ...route,
                path: `${props.match.url}/${route.path}`,
                component: props => {
                    let obj = {routes: route.routes, ...props}
                    return <route.component {...obj}/>
                }
            }
            return <Route {...obj}/>
        })}
    </React.Fragment>
)

const First = props => {
    return <div>
        路由 A
        {createRouter(props.routes, props)}
    </div>
}
const Second = () => <div>路由 B</div>
const ChildOne = () => <div style={{color: 'red'}}>路由 A1</div>

const RouteConfig = [
    {
        path: 'first',
        component: First,
        name: '第一个路由',
        routes: [
            {
                path: '1',
                component: ChildOne,
                name: '1-1'
            }
        ]
    },
    {
        path: 'second',
        component: Second,
        name: '第二个路由'
    }
]

const createRouter = (routes, props) => (
    <Router>
        <div>
            {/* 自动生成 Link 标签 */}
            {createLink(routes, props)}
            <hr/>
            {/* 自动生成 Route 标签 */}
            {createRoute(routes, props)}
        </div>
    </Router>
)

const Root = props => (
    createRouter(RouteConfig, props)
)


export default Root