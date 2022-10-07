import React, { useContext, useState , useRef , useEffect } from "react";
import { View, Text, TouchableOpacity, Image,
   ActivityIndicator , Alert , SafeAreaView ,FlatList,
   Platform,KeyboardAvoidingView,
   StatusBar,ScrollView,Animated} from "react-native";
import styles from "../styles";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import TextField from "../../component/TextField/TextField";
import ThemeButton from "../../component/ThemeButton/ThemeButton";
import { validateFunc } from "../../constraints/constraints";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../component/Layout/Layout";
import { Entypo , FontAwesome , Ionicons } from '@expo/vector-icons';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import ReminderModal from "../../component/ReminderModal/ReminderModal";
import { taskCompleted, taskCompleteList ,
    taskIncompleteList } from "../../redux/action";

export default function Task(props) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const { 
    taskComList,
    taskComLoading,
    taskInComList,
    taskInComLoading,taskMarkLoading } = useSelector(d => d.task)
    const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(true);


    useEffect(() => {
        dispatch(taskIncompleteList())
        dispatch(taskCompleteList())
    },[])

  const _swipeableRow = useRef(null);

  return (<>
        {taskMarkLoading && <View style={[styles().posAbs,
        styles().justifyCenter,
        styles().alignCenter,
        styles().wh100,{
            zIndex : 1,
            backgroundColor : 'rgba(0,0,0,0.3)'
        }]}>
        <ActivityIndicator color={currentTheme.black} />
        </View>}
    <Layout title={'Task'}>
     
        <TouchableOpacity 
        onPress={() => props.navigation.navigate('NewTask')}
        style={[styles().flexRow,styles().mt10]}>
             <Entypo name="plus" size={18} color={currentTheme.Title} />
            <Text style={[styles().fontBold,styles().fontSize18,styles().pl5,{color : currentTheme.Title}]}>Add new task</Text>
        </TouchableOpacity>

        <View style={[styles().mt25]}>
            <Text style={[styles().fontBold,styles().fontSize18,styles().pl5,{color : currentTheme.Title}]}>Incomplete</Text>
        </View>

       {!taskInComLoading ?  <FlatList
            data={taskInComList}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={[
                styles().mt15,
            ]}
            renderItem={({ item, index }) => {
                console.log('itemitem',item)
            return (
                <Swipeable
                        key={item.id}
                        containerStyle={{overflow :'hidden'}}
                        ref={_swipeableRow}
                        friction={3}
                        leftThreshold={30}
                        rightThreshold={40}
                        rightOpenValue={20}
                        renderRightActions={() => {
                            return <View style={[
                              styles().flexRow,
                              styles().alignCenter,
                              styles().overflowH,
                              {borderTopRightRadius : 4,borderBottomRightRadius :4}
                              ]}>
                              <Animated.View style={{ transform: [{ translateX: 0 }] }}>
                               <RectButton
                                    style={[
                                      styles().flex,
                                      styles().alignCenter,
                                      styles().ph25,
                                      styles().justifyCenter,
                                      { backgroundColor: currentTheme.danger}]}
                                    >
                                
                                    <FontAwesome name="trash-o" size={24} color="white" />
                                  </RectButton>  
                                </Animated.View>
                              </View>
                        }}>
               <View style={[styles().mb15,styles().flexRow]}>
                   <TouchableOpacity 
                   onPress={() => dispatch(taskCompleted(item))}
                   style={{width : 24,height : 24,borderRadius : 6,borderWidth :2,borderColor : currentTheme.checkBoxStroke}}>

                   </TouchableOpacity>
                   <View style={[styles().pl10]}>
                        <Text style={[styles().fontMedium,styles().fontSize18,{color : currentTheme.Title}]}>{item.summary}</Text>
                        <Text style={[styles().fontSemiBold,styles().fontSize14,styles().pt5,{color : currentTheme.subTitle}]}>⏰ {item.due_date}</Text>
                   </View>
               </View>
          </Swipeable>);
            }}
        keyExtractor={(item,index) => index?.toString()}
        /> :   <ActivityIndicator color={currentTheme.black} />}

        <View style={[styles().mt5]}>
            <Text style={[styles().fontBold,styles().fontSize18,styles().pl5,{color : currentTheme.Title}]}>Completed</Text>
        </View>

       {!taskComLoading ? <FlatList
            data={taskComList}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={[
                styles().mt15,
            ]}
            renderItem={({ item, index }) => {
            return (
               <View key={index} style={[styles().mb15,styles().flexRow]}>
                   <View style={[
                       styles().justifyCenter,
                       styles().alignCenter,
                       {width : 24,height : 24,borderRadius : 6,borderWidth :2,borderColor : currentTheme.checkBoxStroke}]}>
                          <Ionicons name="md-checkmark-sharp" size={14} color={currentTheme.Title} />
                   </View>
                   <View style={[styles().pl10]}>
                        <Text style={[styles().fontMedium,styles().fontSize14,styles().pt5,{color : currentTheme.subTitle}]}>{item.summary}</Text>
                   </View>
               </View>
               );
            }}
        keyExtractor={(item,index) => index?.toString()}
        /> : <ActivityIndicator color={currentTheme.black} /> } 
        <ReminderModal 
        modalVisible={modalVisible}
        currentTheme={currentTheme}
        setModalVisible={setModalVisible} />
    </Layout>
    </>
  );
}
