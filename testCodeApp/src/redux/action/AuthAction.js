

import AsyncStorage from "@react-native-async-storage/async-storage";
import { server } from "../server";
import { USER , SIGN_IN_LOADING } from "./type";
import FlashMessage from "../../component/FlashMessage/FlashMessage";
import navigationService from "../../route/navigationService";

export const initCI = () => {
    server.setOptions();
    return async (dispatch) => {
      let User = await AsyncStorage.getItem("test_code");
      let token = await AsyncStorage.getItem("token");
      if (User && token) {
        server.setAccessToken(token);
        let userParse = JSON.parse(User);
      } 
    };
  };


  export const UserSignIn = (user) => {
    return async (dispatch) => {
      dispatch({
        type: SIGN_IN_LOADING,
        payload: true,
      });
      await server.api
        .auth(user)
        .then(async (payload) => {
          console.log('payload UserSignIn',payload)
          if (payload?.result) {
            server.setAccessToken(payload.token);
            await AsyncStorage.setItem("test_code", JSON.stringify(payload?.result));
            await AsyncStorage.setItem("token", payload.token);
            navigationService.HomeNavigation()
            dispatch({
              type: USER,
              payload: payload.result,
            });
          } else {
            FlashMessage({
              type :'danger',
              msg : payload.message
            })
          }
          dispatch({
            type: SIGN_IN_LOADING,
            payload: false,
          });
        })
        .catch((err) => {
          dispatch({
            type: SIGN_IN_LOADING,
            payload: false,
          });
        });
    };
  };