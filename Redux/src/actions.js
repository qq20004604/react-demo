/**
 * Created by 王冬 on 2018/2/19.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 *
 */
/*
 * action 的 type 的常量
 */

export const ADD_ITEM = 'ADD_LIST';
export const REMOVE_LAST_ITEM = 'REMOVE_LAST_ITEM'

/*
 * action 创建函数
 */

// 添加进 state
export function addToList(item) {
    return {type: ADD_ITEM, item}
}

// 移除最后一个添加的内容
export function removeFromList() {
    return {type: REMOVE_LAST_ITEM}
}
