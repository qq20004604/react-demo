import React from 'react';
import ReactDOM from 'react-dom';
import InputArea from './input-area';
import LogInfo from './log-info'
import Table from './table'
import style from '../css/main.css';


class MyDemo extends React.Component {
    constructor() {
        super()
        this.state = {
            downPayment: 0,    // 首付
            totalWithoutDownPayment: 0,   // 需还本金（本金除首付部分）
            totalPay: 0,   // 累计还款（含利息）
            totalPayWithCPI: 0,    // 计算CPI后，累计还款
            totalInterest: 0,  // 利息总计
            totalInterestRate: 0,   // 年利率
            years: 0,  // 总计年数
            CPI: 0, // CPI年均通货膨胀
            resultList: []
        }
        this.getValue = this.getValue.bind(this)
    }

    render() {
        return <div>
            <h1>等额本金房贷还款计算器</h1>
            <InputArea ref={component => this.inputArea = component}></InputArea>

            <button onClick={this.getValue}>开始计算结果</button>

            <div className={style.splitLine}></div>

            <LogInfo result={this.state}/>
            <Table data={this.state.resultList.length > 0 ? this.state.resultList : []}></Table>
        </div>
    }

    getValue() {
        let value = this.inputArea.getState()
        let state = {
            totalPay: 0,   // 累计还款（含利息）
            totalPayWithCPI: 0,    // 计算CPI后，累计还款
            totalInterest: 0,  // 利息总计
            totalInterestRate: value.annualInterestRate * 0.01,   // 年利率
            years: value.totalYear,  // 总计年数
            CPI: value.CPI * 0.01, // CPI年均通货膨胀
            totalType: value.totalType
        }
        if (value.totalType === 'totalPrice') {
            state.downPayment = value.totalPrice * 10000 * value.firstPay    // 首付
            state.totalWithoutDownPayment = value.totalPrice * 10000 * (1 - value.firstPay)   // 需还本金（本金除首付部分）
        } else {
            state.totalWithoutDownPayment = value.loan * 10000
        }
        // 等额本金还款计算结果
        let result = this.computingByEqualPrincipal(state)
        // let result = this.computedPrincipalInterest(state)
        Object.assign(state, result.totalInfo)
        Object.keys(state).forEach(key => {
            if (typeof state[key] === 'string' && key !== 'totalType') {
                state[key] = Number(state[key])
            }
        })
        state.resultList = result.array
        // 这里略去了数据检查的代码
        this.setState(state)
    }

    // 等额本金还款计算方式
    computingByEqualPrincipal(value) {
        let totalWithoutDownPayment = value.totalWithoutDownPayment;   // 需还本金
        let totalWithoutDownPaymentLeft = totalWithoutDownPayment; // 待还本金
        let monthInterestRate = value.totalInterestRate / 12;  // 月利率
        let totalRepayment = 0;    // 累计还
        let repaymentPerMonth = totalWithoutDownPayment / value.years / 12;  // 月还本金
        let CPI = 1 // 基准CPI
        let totalByCPI = 0;    // 计算CPI后累计金额
        let accumulatedInterest = 0;   // 累计利息
        let array = []
        for (let year = 1, month = 1; year < Number(value.years) + 1; (month < 12 ? (month++) : (month = 1, year++, CPI *= (1 + value.CPI)))) {
            var interest = totalWithoutDownPaymentLeft * monthInterestRate;   // 本月利息
            var payThisMonth = interest + repaymentPerMonth; // 本月还
            totalRepayment += payThisMonth  // 累计还
            totalWithoutDownPaymentLeft -= repaymentPerMonth    // 待还本金
            totalByCPI += payThisMonth / CPI;   // 计算CPI后累计金额
            accumulatedInterest += interest;    // 累计利息
            // console.log(`第${year + 1}年第${month}月，此时要还${payThisMonth}元，其中利息是${interest}，还的本金是${repaymentPerMonth}，剩余待还本金${totalWithoutDownPaymentLeft}，目前已经还了${totalRepayment}元。当前CPI累计通胀${CPI}，当月还在计算CPI之后实际价值是${payThisMonth / CPI},计算CPI后累计还${totalByCPI}`)
            let obj = {
                year: year < 10 ? ` ${year}` : year,    // 年
                month: month < 10 ? ` ${month}` : month,    // 月
                payThisMonth: payThisMonth.toFixed(2),  // 本月还款
                repaymentPerMonth: repaymentPerMonth.toFixed(2),    // 本月还本金
                interest: interest.toFixed(2),  // 利息
                totalWithoutDownPaymentLeft: totalWithoutDownPaymentLeft.toFixed(2),    // 剩余待还本金
                totalRepayment: totalRepayment.toFixed(2),  // 已还本金
                CPI: CPI.toFixed(2),    // 当年CPI
                payThisMonthByCPI: (payThisMonth / CPI).toFixed(2), // 计算CPI后本月还款
                totalByCPI: totalByCPI.toFixed(2)   // 累计还款（计算CPI后）
            }
            array.push(obj)
        }
        let totalInfo = {
            totalPay: totalRepayment,
            totalPayWithCPI: totalByCPI,
            totalInterest: accumulatedInterest
        }
        return {
            totalInfo,
            array
        }
    }

    // 等额本息计算法
    computedPrincipalInterest(value) {
        let totalWithoutDownPayment = value.totalWithoutDownPayment;   // 需还本金
        let totalWithoutDownPaymentLeft = totalWithoutDownPayment; // 待还本金
        let monthInterestRate = value.totalInterestRate / 12;  // 月利率
        let i = Math.pow((1 + monthInterestRate), value.years * 12)
        let repaymentPerMonth = totalWithoutDownPayment * monthInterestRate * i / (i - 1);  // 月还金额（每个月一样）
        let totalRepayment = 0
        let CPI = 1 // 基准CPI
        let totalByCPI = 0;    // 计算CPI后累计金额
        let accumulatedInterest = 0;   // 累计利息
        let array = []
        for (let year = 1, month = 1; year < Number(value.years) + 1; (month < 12 ? (month++) : (month = 1, year++, CPI *= (1 + value.CPI)))) {
            let interest = totalWithoutDownPaymentLeft * monthInterestRate;    // 本月利息 = 剩余本金 * 月利率
            let principalThismonth = repaymentPerMonth - interest;   // 本月还的本金
            totalWithoutDownPaymentLeft -= principalThismonth; // 剩余待还本金 扣掉本月还的本金
            accumulatedInterest += interest // 累计利息
            totalByCPI += repaymentPerMonth / CPI   // 累计还款（计算CPI后）
            let obj = {
                year: year < 10 ? ` ${year}` : year,    // 年
                month: month < 10 ? ` ${month}` : month,    // 月
                payThisMonth: repaymentPerMonth.toFixed(2),  // 本月还款
                repaymentPerMonth: principalThismonth.toFixed(2),    // 本月还的本金
                interest: interest.toFixed(2),  // 本月还的利息
                totalWithoutDownPaymentLeft: totalWithoutDownPaymentLeft.toFixed(2),    // 剩余待还本金
                totalRepayment: totalRepayment.toFixed(2),  // 已还本金
                CPI: CPI.toFixed(2),    // 当年CPI
                payThisMonthByCPI: (repaymentPerMonth / CPI).toFixed(2), // 计算CPI后本月还款
                totalByCPI: totalByCPI.toFixed(2)   // 累计还款（计算CPI后）
            }
            array.push(obj)
        }
        let totalInfo = {
            totalPay: repaymentPerMonth * 12 * value.years, // 总计还款
            totalPayWithCPI: totalByCPI,
            totalInterest: accumulatedInterest
        }
        return {
            totalInfo,
            array
        }
    }
}

ReactDOM.render(
    <div>
        <MyDemo/>
    </div>,
    document.getElementById('root')
)