import React from 'react';
import ReactDOM from 'react-dom';

// 420加成，463攻击 = 90.7%
// 886加成，978攻击 = 90.59%
// 3555加成，3923攻击 = 90.6%

//
// 风车外功攻击加成系数 90.6%

// 提供：
// 1、全伤；
// 2、会心（需要减去御劲）；
// 3、破防；
// 4、化劲减伤；
// 5、御劲

const BaseDamage = 128.5;   // 技能基础伤害

class RefsDemo extends React.Component {
    state = {
        // beforeCrit = (126-131 攻击 + 外功攻击 * 0.906 + 武器伤害) * 16 * 秘籍系数(0.02 + 0.03 + 0.04) * 夜风 130%
        // beforePercent = beforeCrit * (1 - 会心几率） * 100% + beforeCrit * 会心几率 * 会心伤害
        // beforeCrit * (1 + (会心几率 * 会心伤害 - 1 ))

        history: [],

        // 面板数据
        baseAtk: '3812',        // 外功攻击力
        会心几率: '45.42',
        会心效果: '234.67',
        破防: '11',

        // 属性修正
        外功攻击力_修正: '',
        会心几率_修正: '',
        会心效果_修正: '',
        破防_修正: '',
        武器伤害_修正: '',

        // 属性转换
        破防转会心: '',
        会心转破防: '',

        // 选项
        weapon: 557,
        夜风: true,
        怜光: true,
        孤鸾: true,
        莺鸣柳: true,
        金麟丹: true,
        鸳鸯鸡: true,
        御风丹: true,
        五侯鲭: true,


        秘籍百分之二伤: true,
        秘籍百分之三伤: true,
        秘籍百分之四伤: true,
        秘籍百分之二会心: false,
        秘籍百分之三会心: true,
    };

    render() {
        return <div>
            <h1>剑网三风来吴山伤害计算器</h1>
            <h4>请填写面板数据</h4>
            <ul>
                <li>
                    外功攻击力：<input type="text"
                                 value={this.state.baseAtk}
                                 onChange={e => this.change("baseAtk", e)}/>
                </li>
                <li>
                    会心几率：<input type="text"
                                value={this.state.会心几率}
                                onChange={e => this.change("会心几率", e)}/>％
                </li>
                <li>
                    会心效果：<input type="text"
                                value={this.state.会心效果}
                                onChange={e => this.change("会心效果", e)}/>％
                </li>
                <li>
                    破防：<input type="text"
                              value={this.state.破防}
                              onChange={e => this.change("破防", e)}/>％
                </li>
            </ul>

            <h4>奇穴和技能</h4>
            <ul>
                <li>
                    武器：
                    默认 1350 战阶重剑，伤害范围 418 ~ 696，平均伤害 557
                </li>

                <li>
                    <label>
                        夜风（奇穴4）：
                        <input type="checkbox"
                               checked={this.state.夜风}
                               onChange={e => this.changeChecked('夜风')}
                        />
                    </label>
                </li>
                <li>
                    <label>
                        怜光（奇穴6）：
                        <input type="checkbox"
                               checked={this.state.怜光}
                               onChange={e => this.changeChecked('怜光')}
                        />
                    </label>
                </li>
                <li>
                    <label>
                        孤鸾（奇穴8）：
                        <input type="checkbox"
                               checked={this.state.孤鸾}
                               onChange={e => this.changeChecked('孤鸾')}
                        />
                    </label>
                </li>
                <li>
                    <label>
                        莺鸣柳（爆发技能）：
                        <input type="checkbox"
                               checked={this.state.莺鸣柳}
                               onChange={e => this.changeChecked('莺鸣柳')}
                        />
                    </label>
                </li>
            </ul>

            <h4>秘籍</h4>
            <ul>
                <li>
                    <label>
                        ２％伤害秘籍：
                        <input type="checkbox"
                               checked={this.state.秘籍百分之二伤}
                               onChange={e => this.changeChecked('秘籍百分之二伤')}
                        />
                    </label>
                </li>
                <li>
                    <label>
                        ３％伤害秘籍：
                        <input type="checkbox"
                               checked={this.state.秘籍百分之三伤}
                               onChange={e => this.changeChecked('秘籍百分之三伤')}
                        />
                    </label>
                </li>
                <li>
                    <label>
                        ４％伤害秘籍：
                        <input type="checkbox"
                               checked={this.state.秘籍百分之四伤}
                               onChange={e => this.changeChecked('秘籍百分之四伤')}
                        />
                    </label>
                </li>
                <li>
                    <label>
                        ２％会心秘籍：
                        <input type="checkbox"
                               checked={this.state.秘籍百分之二会心}
                               onChange={e => this.changeChecked('秘籍百分之二会心')}
                        />
                    </label>
                </li>
                <li>
                    <label>
                        ３％会心秘籍：
                        <input type="checkbox"
                               checked={this.state.秘籍百分之三会心}
                               onChange={e => this.changeChecked('秘籍百分之三会心')}
                        />
                    </label>
                </li>
            </ul>

            <h4>小药</h4>
            <ul>
                <li>
                    <label>
                        珍·金麟丹（153会心效果等级）：
                        <input type="checkbox"
                               checked={this.state.金麟丹}
                               onChange={e => this.changeChecked('金麟丹')}
                        />
                    </label>
                </li>
                <li>
                    <label>
                        珍·鸳鸯鸡（102会心等级）：
                        <input type="checkbox"
                               checked={this.state.鸳鸯鸡}
                               onChange={e => this.changeChecked('鸳鸯鸡')}
                        />
                    </label>
                </li>
                <li>
                    <label>
                        重制·御风丹（69身法）：
                        <input type="checkbox"
                               checked={this.state.御风丹}
                               onChange={e => this.changeChecked('御风丹')}
                        />
                    </label>
                </li>
                <li>
                    <label>
                        重制·五侯鲭（46身法）：
                        <input type="checkbox"
                               checked={this.state.五侯鲭}
                               onChange={e => this.changeChecked('五侯鲭')}
                        />
                    </label>
                </li>
            </ul>

            <h4>自定义属性修正（都是会心等级，而不是实际的百分比的值）</h4>
            <ul>
                <li>
                    外功攻击力_修正：<input type="text"
                                    value={this.state.外功攻击力_修正}
                                    onChange={e => this.change("外功攻击力_修正", e)}/>
                </li>
                <li>
                    会心几率_修正：<input type="text"
                                   value={this.state.会心几率_修正}
                                   onChange={e => this.change("会心几率_修正", e)}/>
                </li>
                <li>
                    会心效果_修正：<input type="text"
                                   value={this.state.会心效果_修正}
                                   onChange={e => this.change("会心效果_修正", e)}/>
                </li>
                <li>
                    破防_修正：<input type="text"
                                 value={this.state.破防_修正}
                                 onChange={e => this.change("破防_修正", e)}/>
                </li>
                <li>
                    武器伤害_修正：<input type="text"
                                   value={this.state.武器伤害_修正}
                                   onChange={e => this.change("武器伤害_修正", e)}/>
                </li>
            </ul>

            <h4>同装等属性转换</h4>
            <ul>
                <li>输入减少破防的破防等级，会自动转为会心和会心等级（不需要输入负数）
                    <input type="text"
                           value={this.state.破防转会心}
                           onChange={e => this.change("破防转会心", e)}/>
                </li>
                <li>输入减少会心的会心等级（不需要输入会心等级，自动计算），会自动转为破防等级（不需要输入负数）
                    <input type="text"
                           value={this.state.会心转破防}
                           onChange={e => this.change("会心转破防", e)}/>
                </li>
            </ul>

            <h3>风来吴山转满后的理论伤害期望：{this.getDamage()}</h3>
            <button onClick={this.save}>点击保存</button>
            <h4>历史数据：(老）{JSON.stringify(this.state.history)}（新）</h4>
            <h4>最终风车数据：</h4>
            <ul>
                <li>
                    外功攻击力：{this._get外功攻击力()}
                </li>
                <li>
                    会心几率：{this._get会心()}%
                </li>
                <li>
                    会心效果：{this._get会心效果()}%
                </li>
                <li>
                    破防：{this._get破防() - 100}%
                </li>
            </ul>


            <h4>备注</h4>
            <ul>
                <li>推断破防是四舍五入型计算的，而填空默认填的是破防的百分比，如果想准确的话，破防百分比填0，手动填写破防等级到破防修正里</li>
            </ul>
        </div>;
    }

    save = () => {
        this.setState({
            history: [...this.state.history, this.getDamage()]
        });
    };

    getDamage = () => {
        let base = (this._get武器伤害() + this._get外功攻击力() * 0.906 + this.state.weapon) * 16;
        if (this.state.夜风) {
            base *= 1.3;
        }
        base *= this.getMiji();
        base *= this.get会心加成();
        base *= (this._get破防() / 100);
        base *= this.get百分比加成();
        return parseInt(base);
    };

    _get武器伤害 = () => {
        let base = BaseDamage;
        if (this.state.武器伤害_修正) {
            base += this.state.武器伤害_修正;
        }
        return base;
    };

    getMiji = () => {
        let base = 1;
        if (this.state.秘籍百分之二伤) {
            base += 0.02;
        }
        if (this.state.秘籍百分之三伤) {
            base += 0.03;
        }
        if (this.state.秘籍百分之四伤) {
            base += 0.04;
        }
        return base;
    };

    get会心加成 = () => {
        // beforeCrit * (1 - 会心几率） * 100% + beforeCrit * 会心几率 * 会心效果
        // 1 - 会心几率 +  会心几率 * 会心效果
        const 会心几率 = this._get会心() / 100;
        const 会心效果 = this._get会心效果() / 100;
        return 1 - 会心几率 + 会心几率 * 会心效果;
    };

    _get外功攻击力 = () => {
        let base = Number(this.state.baseAtk);
        if (this.state.御风丹) {
            base += this.身法to外功攻击力(69);
        }
        if (this.state.五侯鲭) {
            base += this.身法to外功攻击力(46);
        }
        if (this.state.外功攻击力_修正) {
            base += this.state.外功攻击力_修正;
        }
        return base;
    };

    _get会心 = () => {
        // 这里的值是整数，比如孤鸾 10%，这里就写 10
        let 会心几率 = Number(this.state.会心几率);
        if (this.state.秘籍百分之二会心) {
            会心几率 += 2;
        }
        if (this.state.秘籍百分之三会心) {
            会心几率 += 3;
        }

        if (this.state.孤鸾) {
            会心几率 += 10;
        }
        if (this.state.莺鸣柳) {
            会心几率 += 20;
        }
        if (this.state.鸳鸯鸡) {
            会心几率 += this.会心等级to会心几率(102);
        }
        if (this.state.会心几率_修正) {
            会心几率 += this.会心等级to会心几率(this.state.会心几率_修正);
        }
        if (this.state.破防转会心) {
            会心几率 += this.会心等级to会心几率(this._get会心会效by破防(this.state.破防转会心).会心);
        }
        if (this.state.会心转破防) {
            会心几率 -= this.会心等级to会心几率(this.state.会心转破防);
        }

        return Number(会心几率.toFixed(3));
    };

    _get会心效果 = () => {
        // 这里的值是整数，比如孤鸾 10%，这里就写 10
        let 会心效果 = Number(this.state.会心效果);
        if (this.state.孤鸾) {
            会心效果 += 10;
        }
        if (this.state.金麟丹) {
            会心效果 += this.会心效果等级to会心效果(153);
        }
        if (this.state.会心效果_修正) {
            会心效果 += this.会心效果等级to会心效果(this.state.会心效果_修正);
        }
        if (this.state.破防转会心) {
            会心效果 += this.会心效果等级to会心效果(this._get会心会效by破防(this.state.破防转会心).会效);
        }
        if (this.state.会心转破防) {
            会心效果 -= this.会心效果等级to会心效果(this._get破防会效by会心(this.state.会心转破防).会效);
        }
        return Number(会心效果.toFixed(3));
    };

    _get破防 = () => {
        let 破防 = Number(this.state.破防) + 100;
        if (this.state.破防_修正) {
            破防 += this.破防等级to破防(this.state.破防_修正);
        }
        if (this.state.破防转会心) {
            破防 -= this.破防等级to破防(this.state.破防转会心);
        }
        if (this.state.会心转破防) {
            破防 += this.破防等级to破防(this._get破防会效by会心(this.state.会心转破防).破防);
        }
        return 破防;
    };

    get百分比加成 = () => {
        let base = 1;
        if (this.state.怜光) {
            base += 0.2;
        }

        return base;
    };

    change = (type, e) => {
        this.setState({
            [type]: e.target.value
        });
    };

    changeChecked = (type, e) => {
        this.setState({
            [type]: !this.state[type]
        });
    };

    会心等级to会心几率 = 等级 => {
        // 1882 会心 = 45.42 % 会心
        // 2035*
        return 0.024133 * 等级;
    };
    会心效果等级to会心效果 = 等级 => {
        // 基础会心效果百分比是 175 %
        // 1052 会心 = 69.83 % 会心
        // 2035*
        return 0.06638 * 等级;
    };
    破防等级to破防 = 等级 => {
        return parseInt(0.02765 * 等级);
    };
    身法to外功攻击力 = 身法 => {
        return parseInt(身法 * 1.6);
    };

    // 164 破防 = 116会心 + 46会效
    _get会心会效by破防 = 破防 => {
        return {
            会心: 破防 * 0.7,
            会效: 破防 * 0.3
        };
    };
    // 164 破防 = 116会心 + 46会效
    _get破防会效by会心 = 会心 => {
        return {
            破防: 会心 / 0.7,
            会效: 会心 / 0.7 * 0.3
        };
    };
}

ReactDOM.render(
    <div>
        <RefsDemo/>
    </div>,
    document.getElementById('root')
);