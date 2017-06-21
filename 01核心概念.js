//todo应用的state可能是这样的
var state = {
    todos : [{
        text : 'eat food',
        completed : true
    },{
        text : 'exercise',
        completed : false
    }],
    visibilityFilter : 'SHOW_COMPLETED'
}

//ACTION是一个简单的javascript对象
var action = [{
    type : 'ADD_TODO', 
    text : 'Go to swimming pool'
},{
    type : 'TOGGLE_TODO',
    index : 1
},{
    type : 'SET_VISIBILITY_FILTER',
    filter : 'SHOW_ALL'
}]

//reducer函数，把state和action串联起来
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

//再开发一个reducer，把上面的两个函数串联起来
function todoApp(state = {}, action){
    return {
        todos : todos(state.todos, action),
        visibilityFilter : visibilityFilter(state.visibilityFilter, action)
    };
}