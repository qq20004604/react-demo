/**
 * Created by 王冬 on 2018/1/30.
 * QQ: 20004604
 * weChat: qq20004604
 */
import React from 'react';
import style from './css/input-area.css';

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

export default class InputArea extends React.Component {
    constructor() {
        super()
        this.state = {
            totalPrice: '100',
            firstPay: 0.3,
            annualInterestRate: '6',
            totalYear: '30',
            CPI: '3',
            totalType: 'totalPrice'
        }
        this.list = {
            firstPay: [
                {value: 0.1, name: '一成'},
                {value: 0.2, name: '两成'},
                {value: 0.3, name: '三成'},
                {value: 0.4, name: '四成'},
                {value: 0.5, name: '五成'},
                {value: 0.6, name: '六成'},
                {value: 0.7, name: '七成'},
                {value: 0.8, name: '八成'},
                {value: 0.9, name: '九成'},
            ]
        }
        this.changeValue = this.changeValue.bind(this)
        this.changeTotalType = this.changeTotalType.bind(this)
    }

    render() {
        let totalPriceType = (<React.Fragment>
            <InputTRComponent name="房价总计"
                              value={this.state.totalPrice}
                              changeValue={this.changeValue}
                              keyword='totalPrice'
                              unit='万'></InputTRComponent>
            <OptionsTRComponent name="首付比例"
                                value={this.state.firstPay}
                                changeValue={this.changeValue}
                                keyword='firstPay'
                                array={this.list.firstPay}></OptionsTRComponent>
        </React.Fragment>)


        return (
            <table id={style['input-area']}>
                <tbody>
                <tr>
                    <td>总数计算法</td>
                    <td>
                        <label>
                            总数 + 首付
                            <input type="radio" name="totalType" value="totalPrice"
                                   checked={this.state.totalType === 'totalPrice'}
                                   onChange={this.changeTotalType}/>
                        </label>
                        <span style={{display: 'inline-block', width: '30px'}}></span>
                        <label>
                            贷款金额
                            <input type="radio" name="totalType" value="loan" checked={this.state.totalType === 'loan'}
                                   onChange={this.changeTotalType}/>
                        </label>
                    </td>
                </tr>
                {
                    this.state.totalType === 'totalPrice' ?
                        totalPriceType : null

                }
                <InputTRComponent name="年利率"
                                  value={this.state.annualInterestRate}
                                  changeValue={this.changeValue}
                                  keyword='annualInterestRate'
                                  unit='%'></InputTRComponent>
                <InputTRComponent name="总计年数"
                                  value={this.state.totalYear}
                                  changeValue={this.changeValue}
                                  keyword='totalYear'
                                  unit='年'></InputTRComponent>
                <InputTRComponent name="CPI年均通货膨胀"
                                  value={this.state.CPI}
                                  changeValue={this.changeValue}
                                  keyword='CPI'
                                  unit='％'></InputTRComponent>
                </tbody>
            </table>
        )
    }

    changeValue(type, e) {
        this.setState({
            [type]: e.target.value
        })
    }

    changeTotalType(e) {
        this.setState({
            totalType: e.target.value
        })
    }

    getState() {
        return this.state
    }
}