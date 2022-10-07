import React , { useContext } from 'react'
import {View , Text , TouchableOpacity } from 'react-native'
import ThemeContext from '../../context/ThemeContext/ThemeContext'
import { theme } from '../../context/ThemeContext/ThemeColor'
import styles from '../../screen/styles'
import { Feather } from '@expo/vector-icons';

export default function ThemeButton({
    title,
    buttonContainer,
    icon,
    onPress,
    ...props
}){
    const themeContext = useContext(ThemeContext)
    const currentTheme = theme[themeContext.ThemeValue]
    
    return (
        <TouchableOpacity
        onPress={onPress}
        style={[styles().h50px,
            styles().justifyCenter,
            styles().alignCenter,
            styles().flexRow,
            {
            backgroundColor : currentTheme.black,
            borderRadius : 50
        },buttonContainer]}>
                <Text 
                 style={[
                    // styles().bgTextWhite,
                    styles().fontSemiBold,
                    styles().bgTextWhite,
                    styles().fontSize16
                    // styles().pl10,
                    // styles().pb5,
                 ]}>{title}</Text>
                {icon}
        </TouchableOpacity>
    )
}