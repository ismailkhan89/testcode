import React, {  useEffect } from 'react';
import {View , ActivityIndicator} from 'react-native'
import styles from '../styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import navigationService from '../../route/navigationService';


export default function Landing() {

  useEffect(() => {
    LoadApp()
  }, [])

  async function LoadApp(){
    let User = await AsyncStorage.getItem("test_code");
    let token = await AsyncStorage.getItem("token");
    if (User && token) {
      navigationService.HomeNavigation()
    } 
    else{
      navigationService.AuthNavigation()
    }
  }
  
  return <View style={[styles().flex,styles().justifyCenter,styles().alignCenter]}>
      <ActivityIndicator size={24} color={'black'} />
    </View>
  
}


