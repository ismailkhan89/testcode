import { View, Text } from 'react-native'
import React , { useContext } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import {fontStyles} from "../../utils/fonts/fontStyles";
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';

import styles from '../../screen/styles';

export default function DropdownSelector({
    value,
    itemList,
    searchPlaceholderText,
    selectText,
    setValue,
    title,
    Error,
    setError,
    uniqueKey,
    displayKey,
    singleValue,
    search
    
}) {

    const themeContext = useContext(ThemeContext)
   
    const currentTheme = theme[themeContext.ThemeValue]
console.log("single",singleValue)
  return (
    <View>
        <Text 
        style={[
            styles().bgTextWhite,
            styles().fontRegular,
            styles().pl10,
            styles().pb5
        ]}>{title}</Text>
            <SectionedMultiSelect
            styles={{
            // borderWidth : 2,
            button: {
                 backgroundColor: currentTheme.black,
            },
            modalWrapper : {
            justifyContent :'center',
            },
            container : {
                flex : 0.3,

            },
            listContainer : {
                // height :'40%',
            },
            confirmText: {
                fontWeight: "400",
                fontFamily: fontStyles.InterSemiBold
            },
            searchTextFontFamily: {
                fontFamily: fontStyles.InterRegular,
            },
            selectToggle: [
                {
                    alignContent :'center',
                },
                   styles().bgTextWhite,
                    styles().borderW1,
                    styles().pl20,
                    styles(currentTheme).borderCWhite,
                    styles().fontMedium,
                    styles().h50px,
                    {
                        borderColor : '#ACB8C4',
                        borderRadius : 5
                    },
                Error && { borderColor: currentTheme.danger },
            ],
            selectToggleText: {
                fontSize: 14,
                fontFamily: fontStyles.NunitoSansSemiBold,
                color : value.length > 0 ? 'black' : '#ACB8C4'
            },
            itemText: {
                paddingTop : 10,
                fontSize: 14,
                fontWeight: "400",
                fontFamily: fontStyles.NunitoSansSemiBold,
            },
            }}
            items={itemList}
            readOnlyHeadings = {false}
            IconRenderer={MaterialIcons}
            uniqueKey={uniqueKey}
            displayKey={displayKey}
            showChips = {true}
            single={singleValue && singleValue !== undefined ? singleValue : false}
            // subKey="children"
            selectText={selectText}
            confirmText={'Select'}
            showCancelButton={true}
            showDropDowns={true}
            hideSearch={search ? search : true}
            searchPlaceholderText={searchPlaceholderText}
            onSelectedItemsChange={(selectedItems) =>{
                const value = selectedItems[0]
                setValue(selectedItems)
                setError(null)
            }} 
        selectedItems={value}
        />
      {!!Error && <Text style={styles(currentTheme).error}>{Error}</Text>}
    </View>
  )
}