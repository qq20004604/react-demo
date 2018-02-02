/**
 * Created by 王冬 on 2018/2/2.
 * QQ: 20004604
 * weChat: qq20004604
 */
import React from 'react';
import style from '../css/input-area.css';

class InputTRComponent extends React.Component {
    render() {
        return (<tr>
            <td>{this.props.name}：</td>
            <td>
                <input className={style['input-area-i']}
                       value={this.props.value}
                       onChange={e => this.props.changeValue(this.props.keyword, e)}/> <b>{this.props.unit}</b>
            </td>
        </tr>)
    }
}

class OptionsTRComponent extends React.Component {
    render() {
        return (<tr>
            <td>{this.props.name}：</td>
            <td>
                <select className={style.select}
                        value={this.props.value}
                        onChange={e => this.props.changeValue(this.props.keyword, e)}>
                    {/* 通过 array 生成 option 列表，值是 value，文字是 name */}
                    {this.props.array.map(obj => {
                        return (<option value={obj.value} key={obj.value}>{obj.name}</option>)
                    })}
                </select>
            </td>
        </tr>)
    }
}

export {
    InputTRComponent,
    OptionsTRComponent
}