import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeReducer = (state, action) => {
    switch (action.type) {
        case 'basic':
            AsyncStorage.setItem('theme', 'basic')
            return 'basic'; 
        default:
            AsyncStorage.setItem('theme', 'basic')
            return 'basic';
    }
}
export default ThemeReducer 


