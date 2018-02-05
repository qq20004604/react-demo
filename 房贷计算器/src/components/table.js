import React from "react";
import style from '../css/main.css';

/**
 * Created by 王冬 on 2018/1/31.
 * QQ: 20004604
 * weChat: qq20004604
 */
// 高阶组件写法
function createTable (args) {
    return class Table extends React.Component {
        render () {
            if (!this.props.data.length > 0) {
                return <div></div>
            }
            return (
                <table id={args.tableId} className={args.tableClass}>
                    <thead style={args.theadClass}>
                    <tr>
                        {args.tds.map((td, i) => {
                            if (typeof td.headContent === 'function') {
                                return td.headContent(i)
                            } else if (typeof td.headContent === 'string') {
                                return <td key={i}>{td.headContent}</td>
                            } else {
                                return td.headContent
                            }
                        })}
                    </tr>
                    </thead>
                    <tbody id={args.tbodyId} className={args.tbodyClass}>
                    {this.props.data.map((data, index) => {
                        return <tr key={index}>
                            {args.tds.map((td, i) => {
                                if (typeof td.bodyContent === 'function') {
                                    return td.bodyContent(data, i)
                                } else if (typeof td.bodyContent === 'string') {
                                    return <td key={i}>{td.bodyContent}</td>
                                } else {
                                    return td.bodyContent
                                }
                            })}
                        </tr>
                    })}
                    </tbody>
                </table>)
        }
    }
}

let tableInfo = {
    tds: [
        {
            headContent: function () {
                return <td key='year'>年月</td>
            },
            bodyContent: function (data, index) {
                return <td key={index}>{data.year}年{data.month}月</td>
            }
        },
        {
            headContent: '本月还',
            bodyContent: function (data, index) {
                return <td key={index}>{data.payThisMonth}</td>
            }
        },
        {
            headContent: <td key={'还款'}>还款组成<br/>[本金 + 利息]</td>,
            bodyContent: function (data, index) {
                return <td key={index} style={{textAlign: 'left'}}>本金：{data.repaymentPerMonth}<br/>
                    利息：{data.interest}</td>
            }
        },
        {
            headContent: '剩余待还本金',
            bodyContent: function (data, index) {
                return <td key={index}>{data.totalWithoutDownPaymentLeft}</td>
            }
        },
        {
            headContent: '累计还了',
            bodyContent: function (data, index) {
                return <td key={index}>{data.totalRepayment}</td>
            }
        },
        {
            headContent: <td key='cpi'>当前CPI通胀系数<br/>（相较第一年）</td>,
            bodyContent: function (data, index) {
                return <td key={index}>{data.CPI}</td>
            }
        },
        {
            headContent: '计算CPI后当月还款价值',
            bodyContent: function (data, index) {
                return <td key={index}>{data.payThisMonthByCPI}</td>
            }
        },
        {
            headContent: '计算CPI后已累计还款数',
            bodyContent: function (data, index) {
                return <td key={index}>{data.totalByCPI}</td>
            }
        }
    ],
    tableId: style.table,
    tbodyId: 'tbody'
}
export default createTable(tableInfo)