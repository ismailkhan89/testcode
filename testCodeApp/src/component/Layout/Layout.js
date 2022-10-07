import React ,{ useContext } from 'react'
import { View , Text , SafeAreaView , StatusBar ,Platform ,KeyboardAvoidingView,ScrollView , ActivityIndicator } from 'react-native'
import { theme } from '../../context/ThemeContext/ThemeColor';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import styles from '../../screen/styles'


export default function Layout(props){

    const themeContext = useContext(ThemeContext);
    const currentTheme = theme[themeContext.ThemeValue]; 
    return (
      <SafeAreaView style={[styles().flex,{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: currentTheme.white
    }]}>
    <ScrollView>
      <KeyboardAvoidingView 
      contentContainerStyle={{flexGrow: 1}}
        behavior={'padding'}
        style={[styles().flex]}
        >
      <View style={[styles().flex,styles().mt50,styles().ph15]}>
        <View style={[styles().alignCenter,styles().mb20]}>
           <Text style={[styles().fontSemiBold,styles().fontSize30]}>{props.title}</Text>
        </View>
        {props.children}
        </View>
      </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>

        
    )
}