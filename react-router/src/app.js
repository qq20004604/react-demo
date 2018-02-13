import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
// 引入的路由模块
import baseDemo from './1.baseDemo'
import RoutingNested from './2.routingNested'


const Config = () => (
    <Router>
        <div>
            <ol>
                <li><Link to="/BaseDemo">BaseDemo</Link></li>
                <li><Link to="/RoutingNested">路由嵌套</Link></li>
            </ol>

            <hr/>
            <Route exact path="/BaseDemo" component={baseDemo}/>
            <Route exact path="/RoutingNested" component={RoutingNested}/>
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