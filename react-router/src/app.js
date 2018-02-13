import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Link, Route} from 'react-router-dom'
// 引入的路由模块
import baseDemo from './1.baseDemo'
import RoutingNested from './2.routingNested'
import Props from './3.props'
import FromParentComponent from './5.fromParentComponent'

const Config = () => (
    <Router>
        <div>
            <ol>
                <li><Link to="/BaseDemo">BaseDemo</Link></li>
                <li><Link to="/RoutingNested">路由嵌套</Link></li>
                <li><Link to="/Params">参数</Link></li>
                <li><Link to="/FromParentComponent">父组件传参给子组件</Link></li>
            </ol>

            <hr/>
            <Route path="/BaseDemo" component={baseDemo}/>
            <Route path="/RoutingNested" component={RoutingNested}/>
            <Route path="/Params" component={Props}/>
            <Route path="/FromParentComponent" component={FromParentComponent}/>
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