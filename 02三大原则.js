//1.单一数据源：整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。
//受益于单一的 state tree ，以前难以实现的如“撤销/重做”这类功能也变得轻而易举。
console.log(store.getState());
/*
输出
{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
*/

//2.state只读：唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。
store.dispatch({
    type : 'COMPLETED_TODO',
    index : 1
})

store.dispatch({
    type : 'SET_VISIBILITY_FILTER',
    filter : 'SHOW_COMPLETED'
})

//3.使用纯函数，接收state和action，返回一个state。
// 刚开始你可以只有一个 reducer，随着应用变大，你可以把它拆成多个小的 reducers，分别独立地操作 state tree 的不同部分，
// 因为 reducer 只是函数，你可以控制它们被调用的顺序，传入附加数据，甚至编写可复用的 reducer 来处理一些通用任务，如分页器。

function visibilityFilter(state = 'SHOW_ALL', action){
    if(action.type === 'SET_VISIBILITY_FILTER'){
        return action.filter;
    }else{
        return state;
    }
}

function todos(state = [], action){
    switch(action.type){
        case 'ADD_TODO':
            return state.concat([{text : action.text, completed : false}]);
        case 'TOGGLE_TODO':
            return state.map((todo, index) =>
                action.index === index ? 
                    {text : todo.text, completed : !todo.completed}:
                    todo
            )
        default:
            return state;
    }
}

import {combineReducers, createStore} from 'redux'
let reducer = combineReducers({visibilityFilter, todos})
let store = createStore(reducer)

