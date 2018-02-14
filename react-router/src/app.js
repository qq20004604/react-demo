import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Link, Route} from 'react-router-dom'
// 引入的路由模块
import baseDemo from './1.baseDemo'
import RoutingNested from './2.routingNested'
import Props from './3.props'
import Params from './4.params'
import FromParentComponent from './5.fromParentComponent'
import Redirect from './6.redirect'

const Config = () => (
    <Router>
        <div>
            <ol>
                <li><Link to="/BaseDemo">BaseDemo</Link></li>
                <li><Link to="/RoutingNested">路由嵌套</Link></li>
                <li><Link to="/RouteInfo">路由数据</Link></li>
                <li><Link to="/Params">参数</Link></li>
                <li><Link to="/FromParentComponent">父组件传参给子组件</Link></li>
                <li><Link to="/Redirect">重定向</Link></li>
            </ol>

            <hr/>
            <Route path="/BaseDemo" component={baseDemo}/>
            <Route path="/RoutingNested" component={RoutingNested}/>
            <Route path="/RouteInfo" component={Props}/>
            <Route path="/Params" component={Params}/>
            <Route path="/FromParentComponent" component={FromParentComponent}/>
            <Route path="/Redirect" component={Redirect}/>
        </div>
    </Router>
)

class RefsDemo extends React.Component {
    render() {
        return <div>
            <Config></Config>
        </div>
    }

}

ReactDOM.render(
    <div>
        <RefsDemo/>
    </div>,
    document.getElementById('root')
)