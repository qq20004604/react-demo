<h3>1、简化写法</h3>

我们在写 React 组件时，参考官方文档写法，一要声明 state，二要绑定函数的 this，常规写法如下：

```
class DEMO extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0
        };
        this.kick = this.kick.bind(this);
    }

    render() {
        return <div>
            <button onClick={this.kick}>点击他！</button>
            你已经点击了{this.state.count}次。
        </div>;
    }

    kick() {
        this.setState({
            count: this.state.count + 1
        });
    }
}
```

然而，这种写法很麻烦，灰常麻烦，但是我有解决方案，写法如下：

```
class DEMO extends React.Component {
    state = {
        count: 0
    };

    render() {
        return <div>
            <button onClick={this.kick}>点击他！</button>
            你已经点击了{this.state.count}次。
        </div>;
    }

    kick = () => {
        this.setState({
            count: this.state.count + 1
        });
    };
}
```

<b>效果：</b>

1. 免去写构造函数的麻烦，并且直接声明在 class 下更加直观；
2. 免去写 bind 的额外操作，减少了因为忘记写 bind 而产生 bug 的可能；

核心改动有两点：

1. state 不在 constructor 里声明，而是直接在 class 里写，这种写法是一个新特性，但不需要担心，babel 可以将其识别并转换为 es5 代码；
2. 函数通过箭头函数来声明，因为箭头函数的 this，绑定于他声明时的作用域，因此无需再额外通过 ``bind()`` 来绑定 this。

<b>实现方式：</b>

1. 核心实现方式是通过 babel 来实现的；
2. 具体实现方式可以参考我这篇关于 ``babel-loader`` 的说明，[点击访问 5.2、支持新特性](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/babel_loader#52%E6%94%AF%E6%8C%81%E6%96%B0%E7%89%B9%E6%80%A7)；
3. 以上方法无需熟悉webpack，在已有 webpack 工程的情况下，只要按说明去做就可以，非常简单（安装一个 npm 包，在配置文件添加一行配置即可）；
4. 如果可以的话，请顺手给我的 github 一个 star，谢谢。
5. [示例DEMO项目](https://github.com/qq20004604/react-demo/tree/master/%E8%81%8A%E8%81%8AReact%E7%9A%84%E4%B8%80%E4%BA%9B%E7%8E%A9%E6%B3%95)；

<h3>2、将 React 资源通过CDN引入</h3>

虽然 React 打包后，并不大，但是对于我们，是没必要直接打包到我们的 js 代码中的，使用 CDN 是更好的选择。

举例来说，例如以上的代码，假如我们使用一般的打包方式，将 ``react`` 和 ``react-dom`` 打包到我们的 js 文件中，打包后的文件大小大约是：

```
app.js        // 33 KB
vendor.js        // 106 KB
```

而将 React 通过 CDN 引入后，我们打包后的 js 大小将为：

```
app.js        // 33 KB
vendor.js        // 8 KB
```

这之间大约 100 KB 的大小差距，就是 ``react`` 和 ``react-dom`` 这 2 个包节约下来的大小。

<b>具体做法：</b>

首先在 ``webpack.config.js`` （即 webpack 的配置文件）里，给导出的 webpack 配置属性，添加一个额外属性：

```
externals: {
    "react": "React",
    "react-dom": "ReactDOM"
}
```

其次，在 html 模板文件里，引入 CDN ，以下两行插入 head 标签中。

在示例中，是 index.html 文件，这个是在 webpack 通过 ``html-webpack-plugin`` 插件配置的。

```
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```

然后就搞定了。

关于原理，请参考我这一篇博客 [9、外部扩展（Externals）](https://github.com/qq20004604/webpack-study/tree/master/9%E3%80%81%E5%A4%96%E9%83%A8%E6%89%A9%E5%B1%95%EF%BC%88Externals%EF%BC%89)。


<h3>3、实战容器组件和展示组件的玩法</h3>

如果学过 redux 的话，会知道， redux 的思想是容器组件和展示组件分离，容器组件存数据，展示组件秀样式。

但是光看不练，恐怕很难理解这种玩法。

我在这里一步一步带着做一个带【两级产品信息（订单级与商品级）】，带选中、全选、统计选中信息的功能。

为了方便理解，我的逻辑尽量写的清楚明确，因此不会采用一些看起来比较绕而且行数更少的写法。但是 es6 的箭头函数等语法，我还是会使用的。

---

【需求列表】

1. 产品双级，列表里首先含多个订单，单个订单里含多个产品；
2. 要求产品要可以直接点击选中/取消选中；
3. 要求可以直接选中订单，即选中订单的时候，可以直接全部选中/取消选中产品；
4. 要求可以全选/取消全选 所有产品；
5. 可以输出所有选中的产品；

---

【解决方案】

<b>第一步：确定数据结构</b>

先确定产品数据的 json 结构，这是一切的基础。

一般来说，这种结构的数据，后端组织形式是这样的：

```
[
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
]
```

作为示例，做一个简单说明：

1. 简化数据结构，orderId 和 productId ，既是订单 id 和产品 id，也是文字描述，注意，每个产品 id 是唯一的；

<b>第二步：确定容器组件的数据结构</b>

确定容器组件的结构：

1. 首先要把 list 数据存到 state 中；
2. 因为涉及到选中，所以要设法存储选中的产品 id。
3. 针对这种情况，使用一个数组来存储选中的 id，如果一个产品的 id 在这个数组中，就说明他被选中了，否则就是没有；
4. 如果一个订单的所有产品id 都在选中 list 中，就说明这个订单被选中了；
5. 如果所有产品都被选中了，说明整个 list 被全选了（这个时候对比 list 的 length 和所有产品的数量）；

此时 state 如下：

```
state = {
    list: [],       // 商品列表
    checkedList: [],     // 选择列表
    productCount: null      // 全部产品数量
};
```

<b>第三步：数据加载</b>

一般来说，可以在组件挂载前发起异步请求加载数据，根据以上 state 结构，设计数据如下：

```
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
```

setTimeout 简单模拟异步请求，list 是订单列表数据。

<b>第四步：DOM 树结构</b>

此时设置 DOM 树的结构。因为只是示例，简化模型，所以只有一个全选栏和列表区域（容器组件应当尽量减少对样式的操作）。

```
render() {
    return <div>
        {/* 全选 */}
        <Checkbox isChecked={this.state.checkedList.length === this.state.productCount}
                  onChange={this.allCheckedChange}/>全选

        {/* 列表 */}
        <List/>
        
        <div>
            <button onClick={this.outputCheckedList}>输出所有选中的内容（控制台查看）</button>
        </div>
    </div>;
}
```

1. Checkbox 是选中组件。该组件是封装好的 ``input[type=checkbox]`` 。当 isChecked 为 true 的时候，表示选中，否则就是未选中。当其被点击触发 ``onChange`` 事件时，则会调用父组件传入的 ``onChange`` 函数；
2. List 是列表组件，目前仅占位使用，在后面会进行说明；
3. 注意，此时 List 并不完整，我们要在后面根据实际需求，添加一些新的属性。

<br/>
<b>第五步：设计全选的交互逻辑</b>

在上面，我们已经很清楚的说明了选中的实现逻辑，因此即使我们还没有设计 List 的结构，但我们已经可以设计 全选/取消全选 的交互逻辑了。

即：

1. 全选时，将所有的产品 id 添加到 checkedList；
2. 取消全选时，则置空 checkedList；

逻辑代码：

```
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
```

<b>第六步：设计 List </b>

此时，我们已经将容器组件大部分设计完成了，下来要设计 List 组件，以及设计跟他相关的交互逻辑。

根据需求，我们可以预期要设计这些功能：

1. 产品的选中功能；
2. 订单（包含多个产品）的选中功能；
3. 将产品订单数据传到 List 中，以生成列表；

<br/>
解决方案：

1. 产品的选中功能比较简单：选中时，将产品 id 添加到 checkedList 中，删除则从中移除。复杂之处在于，需要考虑如何联动更新订单级的选中情况；
2. 订单的选中功能复杂一些：需要考虑当前订单下所有产品的选中情况，首先，若已全选，则全部移除；其次，若全都未选，则全部添加；最后，若选中部分，则只添加未选中的那些；
3. 将订单数据传入 List 组件中，很简单，略；

<br/>
问题：

1. 唯一问题是，两个选中功能的逻辑，是在根组件（即容器组件），还是 List 组件（展示组件），或者是最底层的订单、产品组件中处理；
2. 个人意见是，在根组件进行处理，理由如下：
3. ①展示组件理应不负责单独管理逻辑，或者存储选中功能；
4. ②假如产品选中时，交互逻辑写在产品组件中，那么首先你要将 checkedList 传入产品组件，其次要修改这个数据，这不符合 React 的原则；
5. ③如果由根组件处理，那么只需要将函数传入到产品组件，产品组件只负责将产品 id 作为参数传入这个函数中即可；

因此给出产品选中的逻辑，以及订单选中的逻辑：

```
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
```

产品选中逻辑比较好理解，但是订单选中逻辑有一些复杂，可以看看我写的注释，琢磨一下。

将【订单产品列表】、【选中列表】、【产品选中逻辑】、【订单选中逻辑】传入 List 中，修改根组件的 render 函数如下：

```
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
    </div>;
}
```

此时，我们顺便可以得知，如何输出选中的产品编号，非常简单：

```
// 输出所有当前选中的产品id
outputCheckedList = () => {
    console.log(this.state.checkedList);
};
```

<b>第七步：List 的 DOM 结构</b>

设计 List 组件的 DOM 结构之前，需要关心一下我们需要在 List 里面展示什么东西：

1. 展示多个订单；
2. 可能要添加列表头、翻页组件，或者是一个点击后异步加载的按钮，但为了简化教程，暂且不考虑（因为并不难）；

因此，这个 List 组件可能会显得比较单薄，但这是有必要的，因为可以方便后续添加其他功能。

```
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
```

<b>第八步：设计 Order 组件</b>

那么订单组件需要做什么事情呢？

1. 展示订单头，毫无疑问，订单头需要显示订单编号；
2. 展示这个订单里的所有产品；
3. 订单头要可以选中/取消选中的按钮；

比较麻烦之处在于，如何判断当前订单是否处于选中状态。

比较笨的思路是，将选中状态存储在 Order 组件中，当点击的时候，首先计算订单下产品的选中状态，然后在计算自己的选中状态，最后更新到根组件的 checkedList 中。

缺点在于，管理起来十分复杂，因为选中状态的更改，可能来源于上级组件（根组件），下级组件（产品组件），以及当前组件，同时要考虑这么多种情况，是很容易出问题的。

因此我们在 Order 组件中，不考虑独立保存选中状态，而是实时计算当前组件是否选中。

计算方法很简单，初始认为是选中，然后遍历订单下产品状态，有一个产品是未选中，那么设置为未选中.

代码如下：

```
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
```

<b>第九步：设计 Product 组件</b>

Product 组件十分简单。

同样，不考虑保存选中状态，而是实时计算是否选中。

而在触发选中逻辑时，执行来自根组件的交互逻辑即可。

```
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
```

<b>总结：</b>

这个时候，所有工作已经完成，你可以看到一个符合我们所有需求的 DEMO。

当然，样式很简陋，但这并不是我们这次的重点。

再来回顾一下我们的设计理念：

1. 所有数据，全部存储于根组件（容器组件）；
2. 子组件（展示组件）不考虑保存任何数据，只负责展示，包括选中状态，也是实时计算出来的；
3. 由于展示组件只负责展示，容器组件负责管理数据和逻辑，因此调试代码变得很简单；
4. 假如数据符合预期，但是显示错误，那么一定是展示组件的问题；
5. 假如交互后，数据不符合预期，一定是交互逻辑的错误，即问题发生在容器组件；
6. 因此假如页面出现问题，我们则首先去检查数据，查看数据是否正确；
7. 数据正确的情况下，我们可以一层一层的查看组件树，查看每次传递数据时，数据是否正确；
8. 如果数据正确，交互出现问题，由于交互逻辑函数简单（通常只有一个函数，即展示组件使用容器组件传来的函数），因此我们可以在容器组件对应的函数里打下断点，查看问题出现在哪里。而不是在多个组件、多个函数、甚至多个 state 状态中去找出线索（毫无疑问，这个非常麻烦）。