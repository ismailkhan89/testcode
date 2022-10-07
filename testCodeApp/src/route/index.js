import React, { useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import navigationService from './navigationService'
import ThemeContext from "../context/ThemeContext/ThemeContext";
import { theme } from "../context/ThemeContext/ThemeColor";
import { tabIcon } from "./customTab";
import Location from "../screen/Location/Location";
import Task from "../screen/Task/Task";
import NewTask from "../screen/AddTask/AddTask";
import Landing from "../screen/Landing/Landing";
import SignIn from '../screen/SignIn/SignIn'

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator()
const NavigationStack = createStackNavigator();
const TaskStack = createStackNavigator();
const AuthenticationStack = createStackNavigator();

function MyTabs(props) {
  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

  return (
    <Tab.Navigator
      screenOptions={({ route }) =>
        tabIcon(route, currentTheme)
      }>
      <Tab.Screen
        name="TaskStack"
        component={TaskNavigation}
        options={({ route }) => ({
          headerShown: false,
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? ""
            console.log(routeName)
            if (routeName === 'NewTask') {
              return { display: "none" }
            }
            return
          })(route),
        })}
      />
        <Tab.Screen
        name="NewTask"
        component={NewTask}
        options={({ route }) => ({
          headerShown: false,
          tabBarStyle: ((route) => {
              return { display: "none" }
            return
          })(route),
        })}
      />

      <Tab.Screen
        name="Location"
        component={Location}
        options={{
          title: 'location', headerShown: false,
        }}
      />

    </Tab.Navigator>
  )
}


function TaskNavigation({ navigation, route }) {



  return <TaskStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <TaskStack.Screen
      name="Task"
      component={Task}
      options={{ title: 'task', headerShown: false }} />
    <TaskStack.Screen
      name="NewTask"
      component={NewTask}
      options={{ title: 'NewTask', headerShown: false }} />
  </TaskStack.Navigator>

}

function NoDrawer() {
  return (
    <NavigationStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <NavigationStack.Screen name="Drawer" component={MyTabs} />
    </NavigationStack.Navigator>
  );
}

function AuthenticationNavigator() {
  return (
    <AuthenticationStack.Navigator screenOptions={{headerMode : 'none'}}>
      <AuthenticationStack.Screen name="SignIn" component={SignIn} />
    </AuthenticationStack.Navigator>
  );
}


export default function AppContainer(props) {

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={ref => {
          navigationService.setGlobalRef(ref)
        }}>

        <MainStack.Navigator
          screenOptions={{
            headerMode: "none"
          }}
          initialRouteName={'Landing'}
        >

          <MainStack.Screen name="Auth" component={AuthenticationNavigator} />
          <MainStack.Screen name="noDrawer" component={NoDrawer} />
          <MainStack.Screen name="Landing" component={Landing} />
        </MainStack.Navigator>

      </NavigationContainer>
    </SafeAreaProvider>
  );
}