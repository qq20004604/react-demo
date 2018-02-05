import React from "react";
/**
 * Created by 王冬 on 2018/1/31.
 * QQ: 20004604
 * weChat: qq20004604
 */
// 高阶组件写法
export default function (args) {
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

