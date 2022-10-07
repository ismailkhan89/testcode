import { server } from "../server";
import {
    ADD_TASK,
    ADD_TASK_LOADING,
    TASK_COMPLETE_LOADING,
    TASK_COMPLETE_LIST,
    TASK_INCOMPLETE_LOADING,
    TASK_INCOMPLETE_LIST,
    TASK_MARK_COMPLETE,
    TASK_MARK_COMPLETE_LOADING  } from "./type";
import FlashMessage from "../../component/FlashMessage/FlashMessage";
import navigationService from "../../route/navigationService";

  export const addTask = (task) => {
    return async (dispatch) => {
      dispatch({
        type: ADD_TASK_LOADING,
        payload: true,
      });
      await server.api
        .taskAdd(task)
        .then(async (payload) => {
          console.log('payload addTask',payload)
          if (payload?.status === 1) {
            dispatch(taskIncompleteList())
            FlashMessage({
                type :'success',
                msg : payload.message
              })
              navigationService.BackNavigation()
          } else {
            FlashMessage({
              type :'danger',
              msg : payload.message
            })
          }
          dispatch({
            type: ADD_TASK_LOADING,
            payload: false,
          });
        })
        .catch((err) => {
          dispatch({
            type: ADD_TASK_LOADING,
            payload: false,
          });
        });
    };
  };
  

  export const taskCompleted = (task) => {
    return async (dispatch) => {
      dispatch({
        type: TASK_MARK_COMPLETE_LOADING,
        payload: true,
      });
      await server.api
        .taskCompletePost({task_id : task.id })
        .then(async (payload) => {
          console.log('payload taskCompleted',payload)
          if (payload?.status === 1) {
            FlashMessage({
                type :'success',
                msg : payload.message
              })
            dispatch({
                type: TASK_MARK_COMPLETE,
                payload: task
              });
            dispatch({
                type: TASK_MARK_COMPLETE_LOADING,
                payload: false,
            });
          } else {
            FlashMessage({
              type :'danger',
              msg : payload.message
            })
          }
          dispatch({
            type: TASK_MARK_COMPLETE_LOADING,
            payload: false,
          });
        })
        .catch((err) => {
          dispatch({
            type: TASK_MARK_COMPLETE_LOADING,
            payload: false,
          });
        });
    };
  };

  export const taskCompleteList = () => {
    return async (dispatch) => {
      dispatch({
        type: TASK_COMPLETE_LOADING,
        payload: true,
      });
      await server.api
        .taskComplete()
        .then(async (payload) => {
          console.log('payload taskCompleteList',payload)
          if (payload?.result) {
            dispatch({
                type: TASK_COMPLETE_LIST,
                payload: payload?.result
              });
            dispatch({
                type: TASK_COMPLETE_LOADING,
                payload: false,
            });
          } else {
            FlashMessage({
              type :'danger',
              msg : payload.message
            })
          }
          dispatch({
            type: TASK_COMPLETE_LOADING,
            payload: false,
          });
        })
        .catch((err) => {
          dispatch({
            type: TASK_COMPLETE_LOADING,
            payload: false,
          });
        });
    };
  };
  
  export const taskIncompleteList = () => {
    return async (dispatch) => {
      dispatch({
        type: TASK_INCOMPLETE_LOADING,
        payload: true,
      });
      await server.api
        .taskIncomplete()
        .then(async (payload) => {
          console.log('payload taskIncompleteList',payload)
          if (payload?.result) {
            dispatch({
                type: TASK_INCOMPLETE_LIST,
                payload: payload?.result
              });
            dispatch({
                type: TASK_INCOMPLETE_LOADING,
                payload: false,
            });
          } else {
            FlashMessage({
              type :'danger',
              msg : payload.message
            })
          }
          dispatch({
            type: TASK_INCOMPLETE_LOADING,
            payload: false,
          });
        })
        .catch((err) => {
          dispatch({
            type: TASK_INCOMPLETE_LOADING,
            payload: false,
          });
        });
    };
  };