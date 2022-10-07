import 'react-native-gesture-handler';
import React, { useState, useEffect, useReducer } from 'react';
import { StatusBar } from 'expo-status-bar';
import {View , ActivityIndicator, SafeAreaView} from 'react-native'
import FlashMessage from "react-native-flash-message";
import AppContainer from './src/route/index';
import * as Font from 'expo-font';
import ThemeReducer from './src/context/ThemeContext/ThemeReducer';
import ThemeContext from './src/context/ThemeContext/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './src/screen/styles';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { initCI } from './src/redux/action/AuthAction';

const themeValue = 'basic'

export default function App() {
  const [theme, themeSetter] = useReducer(ThemeReducer, themeValue)
  const [fontLoaded, setFontLoaded] = useState(false)
  useEffect(() => {
    try {
      AsyncStorage.getItem('theme')
        .then(response => response != 'basic' ? themeSetter({ type: response }) : null)
    }
    catch (error) {
    }
  }, [theme])

  useEffect(() => {
    LoadApp()
  }, [])

  async function LoadApp() {
    store.dispatch(initCI())
    await Font.loadAsync({
      'Inter-Black': require('./src/assets/font/Inter/Inter-Black.ttf'),
      'Inter-Bold': require('./src/assets/font/Inter/Inter-Bold.ttf'),
      'Inter-ExtraBold': require('./src/assets/font/Inter/Inter-ExtraBold.ttf'),
      'Inter-ExtraLight': require('./src/assets/font/Inter/Inter-ExtraLight.ttf'),
      'Inter-Light': require('./src/assets/font/Inter/Inter-Light.ttf'),
      'Inter-Medium': require('./src/assets/font/Inter/Inter-Medium.ttf'),
      'Inter-Regular': require('./src/assets/font/Inter/Inter-Regular.ttf'),
      'Inter-SemiBold': require('./src/assets/font/Inter/Inter-SemiBold.ttf'),
      'Inter-Thin': require('./src/assets/font/Inter/Inter-Thin.ttf'),
    })
    setFontLoaded(true)
  }

  function updateValue(val) {
    themeSetter({ type: val })
  }


  if(fontLoaded){
    return (
      <Provider store={store}>
      <ThemeContext.Provider value={{
        ThemeValue: theme,
        dispatch: themeSetter, updateValue,
      }}>
        <AppContainer />
        <FlashMessage position="top" />
      </ThemeContext.Provider>
    </Provider>
  )
}
  else{
    return <View style={[styles().flex,styles().justifyCenter,styles().alignCenter]}>
      <ActivityIndicator size={24} color={'black'} />
    </View>
  }

  
}


