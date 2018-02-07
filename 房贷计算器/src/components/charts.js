/**
 * Created by 王冬 on 2018/2/5.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 *
 */
import React from "react";

// 按需引入，这里是只引入折线图
// https://github.com/ecomfe/echarts/blob/master/index.js
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
// 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

// 基于准备好的dom，初始化echarts实例
export default class Charts extends React.Component {
    constructor (props) {
        super(props)
        this.makeCharts = this.makeCharts.bind(this)
        this.state = {
            isShowChart: false
        }
    }

    render () {
        return <div>
            <button onClick={this.makeCharts}>生成图表</button>
            <div style={(this.state.isShowChart ? {height: '400px'} : {})} ref={dom => {
                this.container = dom
            }}></div>
        </div>
    }

    makeCharts () {
        let length = this.props.value.length
        if (length === 0) {
            return alert('你需要先计算数据，才能显示图表')
        }
        this.setState({
            isShowChart: true
        }, () => {
            let interval = parseInt(length / 24) // 最多显示24个数据，这里是间隔
            let xAxisName = []
            let xSeriesData = []
            for (let i = 0; i < length; i += interval) {
                xAxisName.push(`${this.props.value[i].year}年${this.props.value[i].month}月`)
                xSeriesData.push(this.props.value[i].totalByCPI)
            }

            let option = {
                title: {
                    text: this.props.value.billingMethod === 'computingByEqualPrincipal' ?
                        '等额本金房贷累计还款（计算CPI）' : '等额本息房贷累计还款（计算CPI）'
                },
                xAxis: {
                    type: 'category',
                    data: xAxisName
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: xSeriesData,
                    type: 'line'
                }]
            };
            var myChart = echarts.init(this.container);
            // 绘制图表
            myChart.setOption(option);
        })
    }
}