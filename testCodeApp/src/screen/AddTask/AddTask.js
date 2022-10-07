import React, { useContext, useState } from "react";
import {
    View, Text, TouchableOpacity, Image,
    SafeAreaView,
    Platform, KeyboardAvoidingView,
    StatusBar, ScrollView,TextInput , ActivityIndicator
} from "react-native";
import styles from "../styles";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import ThemeButton from "../../component/ThemeButton/ThemeButton";
import { validateFunc } from "../../constraints/constraints";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../../redux/action";
import { ADD_TASK_LOADING } from "../../redux/action/type";
import DateComponent from "../../component/DateComponent/DateComponent";

export default function NewTask(props) {

    const themeContext = useContext(ThemeContext);
    const currentTheme = theme[themeContext.ThemeValue];
    const { addtaskLoading  } = useSelector(d => d.task)
    const dispatch = useDispatch();

    const [Summary, setSummary] = useState("");
    const [SummaryErr, setSummaryErr] = useState(null);

    const [Description, setDescription] = useState("");
    const [DescriptionErr, setDescriptionErr] = useState(null);

    const [DueDate, setDueDate] = useState("");
    const [DueDateErr, setDueDateErr] = useState(null);

    function validation(){
        let status = true;
        const SummaryErr = validateFunc(Summary ? { summary: Summary } : null,'summary')
        const DescriptionErr = validateFunc(Description ? { description: Description } : null,'description')
        const DueDateErr = validateFunc(DueDate ? { dueDate: DueDate } : null,'dueDate')

        if(SummaryErr){
            setSummaryErr(SummaryErr.summary)
          status = false
        }
        if(DescriptionErr){
            setDescriptionErr(DescriptionErr.description)
          status = false
        }
        if(DueDateErr){
            setDueDateErr(DueDateErr.dueDate)
          status = false
        }
       return status
      }

    function AddTask(){
        dispatch({
            type: ADD_TASK_LOADING,
            payload: true,
          });
        let add = {
            summary : Summary,
            details : Description,
            due_date : DueDate
        }

        dispatch(addTask(add))
    }

    return (

        <SafeAreaView style={[styles().flex, {
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            backgroundColor: '#fff'
        }]}>

            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}>
                <KeyboardAvoidingView
                    contentContainerStyle={{ flexGrow: 1 }}
                    behavior={'padding'}
                    style={[styles().flex]}
                    >
                    <View style={[styles().flex, styles().mt50, styles().ph15]}>
                        <View style={[styles().alignCenter, styles().mb20]}>
                            <Text style={[styles().fontSemiBold, styles().fontSize30]}>New Task</Text>
                            <TouchableOpacity
                            onPress={() => props.navigation.goBack()}
                             style={{position :'absolute',zIndex : 1,left : 0}}>
                                  <Text style={[styles().fontMedium, styles().fontSize16]}>Back</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[
                            styles().alignCenter,
                            styles().flexRow,
                            styles().ph20,
                            styles(currentTheme).textInputTask,
                            SummaryErr && { borderColor: currentTheme.danger },
                            ]}>
                            <Image source={require('../../assets/images/summary.png')} />
                            <TextInput
                                value={Summary}
                                placeholder={'Summary'}
                                placeholderTextColor={currentTheme.placeHolder}
                                onChangeText={(text) => {
                                    setSummary(text)
                                    setSummaryErr(null)
                                }}

                                style={[
                                    styles().bgTextWhite,
                                    styles().pl20,
                                    styles().fontMedium,
                                    styles().flex,
                                    styles().h100,
                                    styles().fontSize16,
                                    {
                                        color: currentTheme.black,
                                    },
                                  
                                ]}
                            />
                        </View>
                        {!!SummaryErr && <Text style={styles(currentTheme).error}>{SummaryErr}</Text>}

                        <View style={[
                            styles().mt25,
                            styles().flexRow,
                            styles().ph20,
                            styles(currentTheme).textInputTask,
                            styles().h100px ,
                            DescriptionErr && { borderColor: currentTheme.danger },

                            ]}>
                                <Image source={require('../../assets/images/description.png')} style={[styles().mt5]} />
                            <TextInput
                                value={Description}
                                placeholder={'Description'}
                                multiline={true}
                                placeholderTextColor={currentTheme.placeHolder}
                                onChangeText={(text) => {
                                    setDescription(text)
                                    setDescriptionErr(null)
                                }}

                                style={[
                                    styles().bgTextWhite,
                                    styles().pl20,
                                    styles().fontMedium,
                                    styles().flex,
                                    styles().h100,
                                    styles().fontSize16,
                                    {
                                        color: currentTheme.black,
                                        textAlignVertical : 'top'
                                    },
                                ]}
                            />
                        </View>
                        {!!DescriptionErr && <Text style={styles(currentTheme).error}>{DescriptionErr}</Text>}

                        <View style={[
                            styles().alignCenter,
                            styles().flexRow,
                            styles().ph20,
                            styles().mt25,
                            styles(currentTheme).textInputTask,
                            DueDateErr && { borderColor: currentTheme.danger },

                            ]}>
                            <Image source={require('../../assets/images/duedate.png')} />
                            {/* <TextInput
                                value={DueDate}
                                placeholder={'Due Date'}
                                placeholderTextColor={currentTheme.placeHolder}
                                onChangeText={(text) => {
                                    setDueDate(text)
                                    setDueDateErr(null)
                                }}

                                style={[
                                    styles().bgTextWhite,
                                    styles().pl20,
                                    styles().fontMedium,
                                    styles().flex,
                                    styles().h100,
                                    styles().fontSize16,
                                    {
                                        color: currentTheme.black,
                                    },
                                ]}
                            /> */}

                        <DateComponent
                        isEmpty={'Due Date'} 
                        Viewstyle={[styles().flex,styles().justifyCenter,]}
                        date={DueDate !== "" ? DueDate.toString() : ''}
                        onchange={(text) => {
                            setDueDate(text)
                            setDueDateErr(null)
                        }} />
                        </View>
                        {!!DueDateErr && <Text style={styles(currentTheme).error}>{DueDateErr}</Text>}

                    </View>
                    

              <View style={[
                styles().flex,styles().ph15,styles().justifyEnd,styles().mb25]}>
               {!addtaskLoading ? <ThemeButton
                title={'Save'}
                onPress={() => validation() &&  AddTask()}
               />  : <ActivityIndicator color={currentTheme.black} /> }

              
            </View>
                </KeyboardAvoidingView>
            </ScrollView>

        </SafeAreaView>
    );
}
