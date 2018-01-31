/**
 * Created by 王冬 on 2018/1/30.
 * QQ: 20004604
 * weChat: qq20004604
 */
import React from 'react';
import style from './css/input-area.css';

export default class InputArea extends React.Component {
    constructor() {
        super()
        this.state = {
            totalPrice: '100',
            firstPay: '0.3',
            annualInterestRate: '6',
            totalYear: '30',
            CPI: '3'
        }
        this.changeValue = this.changeValue.bind(this)
    }

    render() {
        return (
            <table id={style['input-area']}>
                <tbody>
                <tr>
                    <td>房价总计：</td>
                    <td>
                        <input className={style['input-area-i']}
                               value={this.state.totalPrice}
                               onChange={e => this.changeValue('totalPrice', e)}/> <b>万</b>
                    </td>
                </tr>
                <tr>
                    <td>首付比例：</td>
                    <td>
                        <select className="input-area-s"
                                value={this.state.firstPay}
                                onChange={e => this.changeValue('firstPay', e)}>
                            <option value="0.1">一成</option>
                            <option value="0.2">两成</option>
                            <option value="0.3">三成</option>
                            <option value="0.4">四成</option>
                            <option value="0.5">五成</option>
                            <option value="0.6">六成</option>
                            <option value="0.7">七成</option>
                            <option value="0.8">八成</option>
                            <option value="0.9">九成</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>年利率：</td>
                    <td>
                        <input className={style['input-area-i']}
                               value={this.state.annualInterestRate}
                               onChange={e => this.changeValue('annualInterestRate', e)}/> <b>％</b>
                    </td>
                </tr>
                <tr>
                    <td>总计年数：</td>
                    <td>
                        <input className={style['input-area-i']}
                               value={this.state.totalYear}
                               onChange={e => this.changeValue('totalYear', e)}/> <b>年</b>
                    </td>
                </tr>
                <tr>
                    <td>CPI年均通货膨胀：</td>
                    <td>
                        <input className={style['input-area-i']} value={this.state.CPI}
                               onChange={e => this.changeValue('CPI', e)}/> <b>％</b>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }

    changeValue(type, e) {
        this.setState({
            [type]: e.target.value
        })
    }

    getState() {
        return this.state
    }
}