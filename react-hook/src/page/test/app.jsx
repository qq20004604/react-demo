import {DatePicker} from 'antd'; // 加载 JS
import React from 'react';
import ReactDOM from 'react-dom';

class Root extends React.Component {
    render () {
        return <div>
            <DatePicker/>
        </div>;
    }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
