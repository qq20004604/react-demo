/**
 * Created by 王冬 on 2018/1/31.
 * QQ: 20004604
 * weChat: qq20004604
 */
import React from "react";

export default class LogInfo extends React.Component {
    render() {
        let props = this.props.result
        let noValue = <p>尚未开始计算</p>
        // console.log(props)
        let downPayment = props.totalType === 'totalPrice' ? (<p>
            首付：{props.downPayment}元（以下还款不会计算首付，只计算还贷金额）
        </p>) : null
        let hasValue = <div>
            {downPayment}
            <p>
                需还本金：{props.totalWithoutDownPayment.toFixed(2)}元，总计还款：{props.totalPay.toFixed(2)}元，计算CPI后总计还款：{props.totalPayWithCPI.toFixed(2)}元
            </p>
            <p>
                利息总计：{props.totalInterest.toFixed(2)}元，年利率：{props.totalInterestRate * 100}％，总计年限：{props.years}年
            </p>
            <p>
                CPI年均通货膨胀：{props.CPI * 100}％
            </p>
        </div>
        return props.totalWithoutDownPayment ? hasValue : noValue
    }
}