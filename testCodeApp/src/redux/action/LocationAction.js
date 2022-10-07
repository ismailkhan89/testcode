import { server } from "../server";
import {
    PREVIOUS_LOCATION_LIST,
    PREVIOUS_LOCATION_LOADING,
    CURRENT_LOCATION_LOADING,
    CURRENT_LOCATION ,
    CHECK_IN,
    CHECK_IN_LOADING
} from "./type";
import FlashMessage from "../../component/FlashMessage/FlashMessage";

export const saveCurrentLocation = (c) => {
    return async (dispatch) => {
      dispatch({
        type: CHECK_IN_LOADING,
        payload: true,
      });
      await server.api
        .currentCheckIn(c)
        .then(async (payload) => {
          console.log('payload saveCurrentLocation',payload)
          if (payload?.status === 1) {
            FlashMessage({
                type :'success',
                msg : payload.message
              })
            dispatch({
                type: CHECK_IN,
                payload: c
              });
            dispatch({
                type: CHECK_IN_LOADING,
                payload: false,
            });
            dispatch(previousLocation())
          
          } else {
            FlashMessage({
              type :'danger',
              msg : payload.message
            })
          }
          dispatch({
            type: CHECK_IN_LOADING,
            payload: false,
          });
        })
        .catch((err) => {
          dispatch({
            type: CHECK_IN_LOADING,
            payload: false,
          });
        });
    };
  };

  export const previousLocation = () => {
    return async (dispatch) => {
      dispatch({
        type: PREVIOUS_LOCATION_LOADING,
        payload: true,
      });
      await server.api
        .previousLocation()
        .then(async (payload) => {
          console.log('payload previousLocation',payload)
          if (payload?.result) {
            dispatch({
                type: PREVIOUS_LOCATION_LIST,
                payload: payload?.result
              });
            dispatch({
                type: PREVIOUS_LOCATION_LOADING,
                payload: false,
            });
          } else {
            FlashMessage({
              type :'danger',
              msg : payload.message
            })
          }
          dispatch({
            type: PREVIOUS_LOCATION_LOADING,
            payload: false,
          });
        })
        .catch((err) => {
          dispatch({
            type: PREVIOUS_LOCATION_LOADING,
            payload: false,
          });
        });
    };
  };
  
  export const currentPosition = () => {
    return async (dispatch) => {
      dispatch({
        type: CURRENT_LOCATION_LOADING,
        payload: true,
      });
      await server.api
        .currentLocation()
        .then(async (payload) => {
          console.log('payload currentLocation',payload)
          if (payload?.result) {
            dispatch({
                type: CURRENT_LOCATION,
                payload: payload?.result
              });
            dispatch({
                type: CURRENT_LOCATION_LOADING,
                payload: false,
            });
          } else {
            FlashMessage({
              type :'danger',
              msg : payload.message
            })
          }
          dispatch({
            type: CURRENT_LOCATION_LOADING,
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