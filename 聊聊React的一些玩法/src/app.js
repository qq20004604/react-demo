import React from 'react';
import ReactDOM from 'react-dom';

class DEMO extends React.Component {
    state = {
        count: 0
    };

    render() {
        return <div>
            <button onClick={this.kick}>点击他！</button>
            你已经点击了{this.state.count}次。
        </div>;
    }

    kick = () => {
        this.setState({
            count: this.state.count + 1
        });
    };
}

ReactDOM.render(
    <DEMO/>, document.getElementById('root')
);
