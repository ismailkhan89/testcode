import React , { useContext } from 'react'
import {View , Text , TextInput } from 'react-native'
import ThemeContext from '../../context/ThemeContext/ThemeContext'
import { theme } from '../../context/ThemeContext/ThemeColor'
import styles from '../../screen/styles'
import PhoneInput from "react-native-phone-input";
import { fontStyles } from '../../utils/fonts/fontStyles'
import { FontAwesome } from '@expo/vector-icons';

export default function TextField({
    name,
    title,
    placeHolder,
    Error,
    setName,
    setNameErr,
    Inputstyles,
    number,
    numberRef,
    icon,
    ...props
}){
    const themeContext = useContext(ThemeContext)
    const currentTheme = theme[themeContext.ThemeValue]
    
    return (
        <View>
              <Text 
                 style={[
                    // styles().bgTextWhite,
                    styles().fontRegular,
                    // styles().pl10,
                    styles().pb5,
                 ]}>{title}</Text>
       {number ? <PhoneInput
                textProps={{
                  placeholder: placeHolder,
                  color: currentTheme.black,
                  placeholderTextColor : '#ADB3BC',
                  returnKeyType :'done',
                }}
                // initialCountry={"us"}
                flagStyle={{
                    borderRadius :100,
                    height :25,
                    width :25,
                }}
                style={[
                    styles().bgTextWhite,
                    styles().pl20,
                    styles(currentTheme).borderCWhite,
                    styles().fontMedium,
                    styles().h50px,
                    {
                        borderColor : '#ACB8C4',
                        borderRadius : 50,
                        color : currentTheme.black,
                        backgroundColor : "#F0F3F6"
                      
                    },
                    Inputstyles,
                    Error && { borderColor: currentTheme.danger },
                ]}
                // initialCountry={"pk"}
                ref={numberRef ? numberRef : null}
                value={name}
                onChangePhoneNumber={(val) => {
                    setName(val);
                    setNameErr(null);
                }}
              /> :
                <TextInput
                 value={name}
                 {...props}
                 placeholder={placeHolder}
                 placeholderTextColor={currentTheme.placeHolder}
                 onChangeText={(text) => {
                    setName(text)
                    setNameErr(null)
                  }}
                
                 style={[
                    styles().bgTextWhite,
                    styles().pl20,
                    styles(currentTheme).borderCWhite,
                    styles().fontMedium,
                    {
                        height :54,
                        borderWidth :1,
                        borderRadius :8,
                        borderColor : currentTheme.textInputStroke,
                        backgroundColor : currentTheme.textInputBg,
                        color : currentTheme.black,
                    },
                    Inputstyles,
                    Error && { borderColor: currentTheme.danger },
                   ]}
                /> 
                
                }
             {!!Error && <Text style={styles(currentTheme).error}>{Error}</Text>}
        </View>
    )
}