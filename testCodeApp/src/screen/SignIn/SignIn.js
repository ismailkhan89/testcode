import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image,
   ActivityIndicator , Alert , SafeAreaView ,
   Platform,KeyboardAvoidingView,
   StatusBar,ScrollView} from "react-native";
import styles from "../styles";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import TextField from "../../component/TextField/TextField";
import ThemeButton from "../../component/ThemeButton/ThemeButton";
import * as Device from 'expo-device';
import { validateFunc } from "../../constraints/constraints";
import { useSelector, useDispatch } from "react-redux";
import Constants from 'expo-constants';
import { SIGN_IN_LOADING } from "../../redux/action/type";
import { UserSignIn } from "../../redux/action";

export default function SignIn(props) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [usernameErr, setUsernameErr] = useState(null);
  const { signInLoading } = useSelector((d) => d.user);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(null);

  function validation(){
    let status = true;

    const usernameErr = validateFunc(username ? { username : username } : null,'username')
    const passwordErr = validateFunc(password ? { password : password } : null,'password')
    if(usernameErr){
      setUsernameErr(usernameErr.username)
      status = false
    }
    if(passwordErr){
      setPasswordErr(passwordErr.password)
      status = false
    }

   return status
  }
 
  async function _Login() {
    dispatch({
      type: SIGN_IN_LOADING,
      payload: true,
    });
      let auth = {
        email: username,
        password: password,
        device_name : Device.isDevice ? Device.deviceName : '',
      };
      console.log("auth>>>",auth)

      dispatch(UserSignIn(auth))
  }

  return (

    <SafeAreaView style={[styles().flex,{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: '#fff'
    }]}>
    
        <ScrollView
        keyboardShouldPersistTaps='handled'
       contentContainerStyle={{flexGrow: 1}}>
      <KeyboardAvoidingView 
      contentContainerStyle={{flexGrow: 1}}
        behavior={'padding'}
        style={[styles().flex]}
        >
      <View style={[styles().flex,styles().mt50,styles().ph15]}>
        <View style={[styles().alignCenter,styles().mb20]}>
          <Text style={[styles().fontSemiBold,styles().fontSize30]}>Login</Text>
        </View>

          <TextField
           autoCapitalize='none'
          name={username}
          placeHolder={'Email'}
          Error={usernameErr}
          setName={setUsername}
          setNameErr={setUsernameErr}
        />

        <TextField
          name={password}
          placeHolder={'Password'}
          Error={passwordErr}
          setName={setPassword}
          setNameErr={setPasswordErr}
          secureTextEntry={true}
        />

        </View>

      <View style={[
          styles().flex,styles().ph15,styles().justifyEnd]}>
        {!signInLoading ? 
            <ThemeButton
            title={'Log In'}
            onPress={() => validation() &&  _Login()}
            buttonContainer={styles().mt15}
          />
          :
            <ActivityIndicator color={currentTheme.black} />
          }  

        <View style={[styles().mb25,styles().alignCenter,styles().flexRow,styles().justifyCenter]}>
            <TouchableOpacity 
              style={[styles().mt10, styles().alignEnd]}>
                <Text
                  style={[
                    styles().fontSize16,
                    styles().fontSemiBold,
                    {
                      color: currentTheme.black,
                    },
                  ]}>
                  {'Forgot your Password?'}
                </Text>
              </TouchableOpacity>
        </View>
      </View>
      </KeyboardAvoidingView>
      </ScrollView>
    
    </SafeAreaView>
  );
}
