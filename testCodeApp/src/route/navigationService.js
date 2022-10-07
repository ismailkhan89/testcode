import { CommonActions } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/drawer'; 

let navObj = null

function setGlobalRef(ref) {
    navObj = ref
}

function navigate(routeName, params) {
    navObj.dispatch(
      CommonActions.navigate({
        name: routeName,
        params:params,
      })
    );
}

function toggleDrawer() {
  navObj.dispatch(DrawerActions.toggleDrawer());
}


function HomeNavigation() {
    navObj.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'noDrawer'}],
      })
    );
}

function AuthNavigation() {
    navObj.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      })
    );
}

function BackNavigation() {
  navObj.goBack();
}

export default {
    setGlobalRef,
    navigate,
    HomeNavigation,
    AuthNavigation,
    toggleDrawer,
    BackNavigation
}