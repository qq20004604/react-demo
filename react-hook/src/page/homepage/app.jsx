import {useState} from 'react';
import ReactDOM from 'react-dom';

function Child(props) {
    const [test, setTest] = useState('abc');
    return (
        <div>
            <p>test:{test}，count:{props.count}</p>
            <button onClick={() => setTest(test + 'D')}>
                点击他，增加test的值
            </button>
            <button onClick={() => props.setCount(props.count + 2)}>
                点击他，增加count的值2
            </button>
        </div>
    );
}

function Root() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
            <Child count={count}
                   setCount={setCount}/>
        </div>
    );
}

ReactDOM.render(<Root/>, document.getElementById('root'));
