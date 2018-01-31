import React from "react";
import style from './css/main.css';

/**
 * Created by 王冬 on 2018/1/31.
 * QQ: 20004604
 * weChat: qq20004604
 */
export default class Table extends React.Component {
    render() {
        if (!this.props.data.length > 0) {
            return <div></div>
        }
        return (

            <table id={style.table}>
                <thead>
                <tr>
                    <td>年月</td>
                    <td>本月还</td>
                    <td>还款组成（本金 + 利息）</td>
                    <td>剩余待还本金</td>
                    <td>累计还了</td>
                    <td>当前CPI通胀系数（相较第一年）</td>
                    <td>计算CPI后当月还款价值</td>
                    <td>计算CPI后已累计还款数</td>
                </tr>
                </thead>
                <tbody id="tbody">
                {this.props.data.map(data => {
                    return (
                        <tr key={`${data.year}${data.month}`}>
                            <td>{data.year}年{data.month}月</td>
                            {/*年 月*/}

                            <td>{data.payThisMonth}</td>
                            {/*本月还*/}

                            <td style={{textAlign: 'left'}}>本金：{data.repaymentPerMonth} +
                                利息：{data.interest}</td>
                            {/*月还本金 + 利息*/}

                            <td>{data.totalWithoutDownPaymentLeft}</td>
                            {/*待还本金*/}

                            <td>{data.totalRepayment}</td>
                            {/*累计还*/}

                            <td>{data.CPI}</td>
                            {/*CPI*/}

                            <td>{data.payThisMonthByCPI}</td>
                            {/*本月还（算CPI）*/}

                            <td>{data.totalByCPI}</td>
                            {/*累计还（算CPI）*/}
                        </tr>)
                })}
                </tbody>
            </table>)
    }
}