/**
 * Created by 王冬 on 2018/3/26.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 *
 */
var React = require('react');
var ReactDOM = require('react-dom');

class RefsDemo extends React.Component {
    constructor() {
        super();
        this.state = {
            a: 1,
            b: 2
        };
        this.change = this.change.bind(this);
    }

    render() {
        return React.createElement('div', '1234');
        // return <div>
        //     <input type="text" value={this.state.a} onChange={e => {
        //         this.change('a', e);
        //     }}/>
        // </div>;
    }

    change(type, e) {
        console.log(type, e);
    }
}

module.exports = RefsDemo;