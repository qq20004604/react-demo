import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class Checkbox extends Component {
    render() {
        const {isChecked, onChange} = this.props;
        return (<input type="checkbox" checked={isChecked} onChange={onChange}/>);
    }
}

let list = [
    {
        orderId: "这里是订单id：A",
        productList: [
            {
                productId: "这里是产品id：A 01"
            },
            {
                productId: "这里是产品id：A 02"
            }
        ]
    },
    {
        orderId: "这里是订单id：B",
        productList: [
            {
                productId: "这里是产品id：B 01"
            },
            {
                productId: "这里是产品id：B 02"
            }
        ]
    }
];

class Product extends Component {
    render() {
        const {productInfo, checkedList, checkedProduct} = this.props;
        let productId = productInfo.productId;

        // 计算是否选中
        let isChecked = checkedList.indexOf(productId) > -1;

        return (<div>
            <div style={{marginLeft: "20px"}}>
                <Checkbox isChecked={isChecked}
                          onChange={() => checkedProduct(productId)}/>
                产品编号：{productId}
            </div>
        </div>);
    }
}

class Order extends Component {
    render() {
        const {checkedList, orderInfo, checkedProduct, checkedOrder} = this.props;
        let productList = orderInfo.productList;

        // 该订单是否是全选呢？
        let isAllChecked = true;
        productList.forEach(productInfo => {
            if (!isAllChecked) {
                return;
            }
            if (checkedList.indexOf(productInfo.productId) === -1) {
                isAllChecked = false;
            }
        });

        return (<div>
            <div>+++++++++++++++++++订单开始+++++++++++++++++++</div>
            <div>
                <Checkbox isChecked={isAllChecked}
                          onChange={() => checkedOrder(orderInfo)}/>
                订单编号：{orderInfo.orderId}
            </div>
            {
                productList.map(productInfo => {
                    // 传入值分别是：产品数据，选中列表，以及当前产品选中交互函数
                    return <Product key={productInfo.productId}
                                    productInfo={productInfo}
                                    checkedList={checkedList}
                                    checkedProduct={checkedProduct}/>;
                })
            }
            <div>+++++++++++++++++++订单结束+++++++++++++++++++</div>
        </div>);
    }
}

class List extends Component {
    render() {
        const {checkedList, list, checkedProduct, checkedOrder} = this.props;
        return (<div>
            <p>———————订单列表————————</p>
            {
                list.map(orderInfo => {
                    return (<Order key={orderInfo.orderId}
                                   orderInfo={orderInfo}
                                   checkedList={checkedList}
                                   checkedProduct={checkedProduct}
                                   checkedOrder={checkedOrder}/>);
                })
            }
            <p>——————订单列表（完）——————</p>
        </div>);
    }
}

class Base extends Component {
    state = {
        list: [],       // 商品列表
        checkedList: [],     // 选择列表
        productCount: null      // 全部产品数量
    };

    // 组件挂载前发起 ajax 请求
    componentDidMount() {
        setTimeout(() => {
            let productCount = 0;

            // list 是订单列表数据
            list.forEach(item => {
                console.log(item);
                item.productList.forEach(() => {
                    productCount++;
                });
            });

            this.setState({
                productCount: productCount, // 更新所有产品的数量
                list: list          // 更新产品
            });
        }, 1000);
    }

    render() {
        return <div>
            {/* 全选栏 */}
            <h3>
                <Checkbox isChecked={this.state.checkedList.length === this.state.productCount}
                          onChange={this.allCheckedChange}/>全选
            </h3>

            {/* 列表 */}
            <List checkedList={this.state.checkedList}
                  list={this.state.list}
                  checkedProduct={this.checkedProduct}
                  checkedOrder={this.checkedOrder}/>

            <div>
                <button onClick={this.outputCheckedList}>输出所有选中的内容（控制台查看）</button>
            </div>
        </div>;
    }

    // 输出所有当前选中的产品id
    outputCheckedList = () => {
        console.log(this.state.checkedList);
    };

    // 全选选中改变
    allCheckedChange = () => {
        let isAllChecked = this.state.checkedList.length === this.state.productCount;

        // 全选的话，移除所有选中的
        if (isAllChecked) {
            this.setState({
                checkedList: []
            });
        } else {
            // 否则将所有的添加进来
            let checkedProduct = [];
            this.state.list.forEach(order => {
                order.productList.forEach(product => {
                    checkedProduct.push(product.productId);
                });
            });
            this.setState({
                checkedList: checkedProduct
            });
        }
    };

    // 产品选中逻辑
    checkedProduct = productId => {
        // 检查当前这个，是否在选中列表里
        let index = this.state.checkedList.indexOf(productId);
        if (index > -1) {
            // 说明已选中，则移除，注意此时应该返回一个新的数组。
            // 这个语法是扩展运算符，展开数组的，是 js 的新特性。
            // 简单解释一下，就是 [1,2,3,4] 里面，如果要移除3（index为2），这个写法会返回[1,2,4]
            let arr = [...this.state.checkedList.slice(0, index), ...this.state.checkedList.slice(index + 1)];
            this.setState({
                checkedList: arr
            });
        } else {
            // 否则则添加
            this.setState({
                checkedList: [...this.state.checkedList, productId]
            });
        }
    };

    // 订单选中逻辑。这里的参数是订单数据（而不仅仅是订单id）
    checkedOrder = orderInfo => {
        // 因为订单下产品都是选中状态时，是移除；其他情况是添加（添加全部或者添加部分的区别）
        let isAllChecked = true;
        let productIdList = [];
        orderInfo.productList.forEach(productInfo => {
            productIdList.push(productInfo.productId);
            // 有未选中时直接返回
            if (!isAllChecked) {
                return;
            }
            // 一个未选中时则设置为非全选状态
            if (this.state.checkedList.indexOf(productInfo.productId) === -1) {
                isAllChecked = false;
            }
        });

        // 先考虑全选时，则依次移除
        if (isAllChecked) {
            // 调用过滤器，返回一个没有本订单里所有产品id的选中 list
            let newCheckList = this.state.checkedList.filter(productId => {
                // 遍历选中列表时，检查当前项是否在订单的产品id列表里
                if (productIdList.indexOf(productId) > -1) {
                    return false;
                } else {
                    return true;
                }
            });

            this.setState({
                checkedList: newCheckList
            });
        } else {
            // 主要复杂之处在于，如果某一个产品id已经在选中列表里了，则不应该添加他
            let arr = [...this.state.checkedList];
            productIdList.forEach(productId => {
                if (arr.indexOf(productId) > -1) {
                    return;
                } else {
                    arr.push(productId);
                }
            });

            this.setState({
                checkedList: arr
            });
        }
    };
}

ReactDOM.render(
    <Base/>, document.getElementById('root')
);
