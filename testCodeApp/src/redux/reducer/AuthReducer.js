
import {
    USER,
    SIGN_IN_LOADING,
  } from "../action/type";

const INITIAL_STATE = {
    profile: null,
    signInLoading: false,
  };


  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SIGN_IN_LOADING:
        return {
          ...state,
          signInLoading: action.payload,
        };
      case USER:
        return {
          ...state,
          profile: action.payload,
        };
      default:
        return state;
    }
  };