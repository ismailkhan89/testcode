import { Ionicons } from '@expo/vector-icons';
import React , { useState , useContext } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity, View , Text, Dimensions, Platform , Modal} from 'react-native';
import styles from '../../screen/styles';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';

export default function DateComponent(props){
    
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const themeContext = useContext(ThemeContext)
    const currentTheme = theme[themeContext.ThemeValue]


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
      setShow(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
      setShow(false);
    };
  
    const NewformatDate = (date) => {
        if(date !== undefined){
            return `${date.getFullYear().toString().padStart(4, '0')}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        }
        else{
        date = new Date()
        return `${date.getFullYear().toString().padStart(4, '0')}-$${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
        }
    }

    const handleConfirm = (date) => {
        hideDatePicker();
      let newDate = NewformatDate(date)
      props.onchange(newDate)
     
    };

    const onChange = (event, selectedDate) => {
      console.log('selectedDate',selectedDate)
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
       
       let newDate = NewformatDate(currentDate)
       console.log('currentDate',newDate)
        props.onchange(newDate)
      };

    return (
      <View style={[props.Viewstyle]} >
          <TouchableOpacity  onPress={showDatePicker}
          style={[
              styles().bgTextWhite,
              styles().pl20,
              styles().fontMedium,
              styles().flex,
              styles().h100,
              styles().fontSize16,
              styles().justifyCenter,
              { 
                // placeholderTextColor={currentTheme.placeHolder}
                  color: currentTheme.black,
              },
          ]}>
           <Text style={[
                styles().fontMedium,
                styles().fontSize16,!props.date && {
                  color :currentTheme.placeHolder
                }]}>{props.date ? props.date : props.isEmpty}</Text>
          </TouchableOpacity>
          {/* {!!props.Error && <Text style={styles(currentTheme).error}>{props.Error}</Text>} */}
 
       {Platform.OS === 'ios' ? 
       <Modal 
              //  backdropOpacity={0}
              transparent={true}
                animationOutTiming={600}
                animationType="slide"
                onRequestClose={() => {
                    setDatePickerVisibility(!isDatePickerVisible)
                  }}
                visible={isDatePickerVisible}>
                  <TouchableOpacity
                    onPress={() => setDatePickerVisibility(!isDatePickerVisible)}
                  
                  style={{
                    alignItems :'center',
                    justifyContent :'center',
                    alignContent :'center',
                    alignSelf :'center',
                    height :'100%',
                    width :'100%',
                    zIndex :2,
                    backgroundColor :'rgba(0,0,0,0.6)'
                    }}>
                    
                        <DateTimePicker
                          textColor={'black'}
                            style={{
                                width : '100%',
                                zIndex : 999999,
                                borderRadius : 10,
                                overflow :'hidden',
                                backgroundColor :'white',

                            }}
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display='spinner'
                            onChange={onChange}
                            timeZoneOffsetInMinutes={0}
                        /> 
                 

                  </TouchableOpacity>
            </Modal> : show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    // mode={mode}
                    mode={"date"}
                    is24Hour={true}
                   
                    // display="default"
                    // display="spinner"
                    display="default"
                    onChange={onChange}
                    />
                )} 
      </View>
    );
  };

 