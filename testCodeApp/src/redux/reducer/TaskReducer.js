
import {
    ADD_TASK,
    ADD_TASK_LOADING,
    TASK_COMPLETE_LOADING,
    TASK_COMPLETE_LIST,
    TASK_INCOMPLETE_LOADING,
    TASK_INCOMPLETE_LIST,
    TASK_MARK_COMPLETE,
    TASK_MARK_COMPLETE_LOADING
  } from "../action/type";


const INITIAL_STATE = {
    addtaskLoading: false,
    taskComList : [],
    taskComLoading :false,
    taskInComList : [],
    taskInComLoading : false,
    taskMarkLoading : false
  };


  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TASK_MARK_COMPLETE_LOADING:
            return {
            ...state,
            taskMarkLoading: action.payload,
        };
        case TASK_MARK_COMPLETE:
            let indexs = state.taskInComList.findIndex(
                d => d.id === action.payload.id
              );
              state.taskInComList.splice(indexs,1);
            return {
            ...state,
            taskInComList: [...state.taskInComList],
            taskComList : [action.payload,...state.taskComList]
        };
      case ADD_TASK_LOADING:
        return {
          ...state,
          addtaskLoading: action.payload,
        };
        case TASK_COMPLETE_LOADING:
        return {
          ...state,
          taskComLoading: action.payload,
        };
        case TASK_COMPLETE_LIST:
        return {
          ...state,
          taskComList: action.payload,
        };
        case TASK_INCOMPLETE_LOADING:
        return {
          ...state,
          taskInComLoading: action.payload,
        };
        case TASK_INCOMPLETE_LIST:
        return {
          ...state,
          taskInComList: action.payload,
        };
      
      default:
        return state;
    }
  };