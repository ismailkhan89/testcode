import React ,{ useState , useEffect } from 'react'
import { Text , View , Modal, Dimensions , TouchableOpacity } from 'react-native'
import styles from '../../screen/styles';
import ThemeButton from '../ThemeButton/ThemeButton';

const { width } = Dimensions.get('screen')
export default function ReminderModal(props){

    const { modalVisible ,
        setModalVisible , currentTheme} = props
    return  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}>
        
        <View style={[styles().flex , styles().justifyCenter,
            styles().alignCenter,{backgroundColor : "rgba(0,0,0,0.6)"}]}>
            <View style={[styles().alignCenter,{backgroundColor :'white',width : width * 0.95,padding : 25,borderRadius :10}]}>
                  <Text style={[styles().fontSemiBold,styles().fontSize30]}>{'Reminder'}</Text>
                  <Text style={[styles().mt25,styles().fontMedium,styles().fontSize16,{lineHeight : 24,textAlign :'center',
                color : "#666666"}]}>Consequat velit qui adipisicing sunt do reprehenderit ad laborum tempor ullamco exercitation. Ullamco tempor adipisicing et voluptate duis sit esse aliqua esse ex dolore esse. Consequat velit qui adipisicing sunt.</Text>
           
                    <ThemeButton
                    title={'Remind me again'}
                    onPress={() => setModalVisible(!modalVisible)}
                    buttonContainer={[styles().mt15,styles().w100]}
                    />

                        <TouchableOpacity 
                         onPress={() => setModalVisible(!modalVisible)}
                        style={[styles().mt10, styles().alignEnd]}>
                            <Text
                            style={[
                                styles().fontSize16,
                                styles().fontSemiBold,
                                {
                                color: currentTheme.black,
                                },
                            ]}>
                            {'Skip'}
                            </Text>
                    </TouchableOpacity>
           </View>
        </View>
  </Modal>
}