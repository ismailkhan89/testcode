import React from 'react'
import { StyleSheet, View ,Text, Image } from 'react-native'
import { fontStyles } from '../utils/fonts/fontStyles'
import styles from '../screen/styles'
import { AntDesign } from '@expo/vector-icons';
// }
const tabIcon = (route,currentTheme) => ({
  // eslint-disable-next-line react/display-name

  activeTintColor: currentTheme.black,
  inactiveTintColor: currentTheme.inactive,
  tabBarShowLabel : false,
  tabBarIcon: ({ focused, color, size }) => {
    let iconName
    let icon;

    if (route.name === 'TaskStack') {
      icon =  <Image source={require('../assets/images/task-inactive.png')}
       style={{tintColor : focused ? currentTheme.black : currentTheme.inactive  }} />   
      iconName = <Text style={[ styles().pt5,{color : focused ? currentTheme.black : currentTheme.inactive,fontSize :10,
        fontFamily : focused ? fontStyles.InterSemiBold : fontStyles.InterRegular  } ]}>{route.name}</Text>
    } 
    else if (route.name === 'NewTask'){
      icon = <AntDesign name="pluscircle" size={45} color="black" /> 
    }
    else if (route.name === 'Location'){
      icon =  <Image source={require('../assets/images/location-inactive.png')}
      style={{tintColor : focused ? currentTheme.black : currentTheme.inactive  }} /> 
      iconName = <Text style={[styles().pt5,{color : focused ? currentTheme.black : currentTheme.inactive,fontSize :10 ,
        fontFamily : focused ? fontStyles.InterSemiBold : fontStyles.InterRegular } ]}>{route.name}</Text>
    }
    return (
      <View style={{alignItems :'center'}}>
        {icon}
       {iconName}
      </View>
      
    )
  }
})

const tabOptions = () => ({
  keyboardHidesTabBar: true,
  tabStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent : 'center',
  },
  style : {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent : 'center',
  },
 
})
export { tabIcon , tabOptions}