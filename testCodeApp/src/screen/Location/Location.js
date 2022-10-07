import React, { useContext, useState, useRef, useEffect } from "react";
import {
    View, Text, TouchableOpacity, Image,
    ActivityIndicator, Alert, SafeAreaView, FlatList,
    Platform, KeyboardAvoidingView,
    StatusBar, ScrollView, Animated
} from "react-native";
import styles from "../styles";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import TextField from "../../component/TextField/TextField";
import ThemeButton from "../../component/ThemeButton/ThemeButton";
import { validateFunc } from "../../constraints/constraints";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../component/Layout/Layout";
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import { previousLocation, currentPosition, saveCurrentLocation } from "../../redux/action";
import * as Location from 'expo-location';
import { CHECK_IN_LOADING } from "../../redux/action/type";
import FlashMessage from "../../component/FlashMessage/FlashMessage";

export default function LocationCheck(props) {
    const themeContext = useContext(ThemeContext);
    const currentTheme = theme[themeContext.ThemeValue];
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const {
        prevLocationLoading,
        prevLocation,
        currentLocation,
        currentLoading,
        checkInLoading } = useSelector(d => d.location)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(previousLocation())
        dispatch(currentPosition())
    }, [])

    let locationPin = "📍";
    let CLocation = {
        title: 'Pustegränd, Stockholm, SE',
        degree: '59.3293° N, 18.0686° E'
    }

    const CurrentAddress = async () => {
        dispatch({
            type: CHECK_IN_LOADING,
            payload: true
        })
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log('statusstatus', status)
        if (status !== 'granted') {
            FlashMessage({
                type: 'danger',
                msg: 'Permission to access location was denied'
            })
            dispatch({
                type: CHECK_IN_LOADING,
                payload: false
            })
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        let reverseGeocodeAsync = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        })

        let saveCheckIn = {
            location_name: reverseGeocodeAsync[0].street + ' ' + reverseGeocodeAsync[0].region + ' ' + reverseGeocodeAsync[0].city,
            location_lat: location.coords.latitude,
            location_lng: location.coords.longitude
        }
        dispatch(saveCurrentLocation(saveCheckIn))
    }

    return (<>
        {checkInLoading && <View style={[styles().posAbs,
        styles().justifyCenter,
        styles().alignCenter,
        styles().wh100, {
            zIndex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)'
        }]}>
            <ActivityIndicator color={currentTheme.black} />
        </View>}
        <Layout title={'Location'}>
            <TouchableOpacity onPress={CurrentAddress} style={[styles().flexRow, styles().mt10]}>
                <Entypo name="plus" size={18} color={currentTheme.Title} />
                <Text style={[styles().fontBold, styles().fontSize18, styles().pl5, { color: currentTheme.Title }]}>Check In</Text>
            </TouchableOpacity>

            <View style={[styles().mt25]}>
                <Text style={[styles().fontBold, styles().fontSize18, styles().pl5, { color: currentTheme.Title }]}>Current location</Text>
            </View>

            {!currentLoading ? currentLocation &&
                <View style={[styles().mb15, styles().flexRow]}>
                    <Text style={{ fontSize: 22 }}>{locationPin}</Text>
                    <View style={[styles().pl10]}>
                        <Text style={[styles().fontMedium, styles().fontSize18, { color: currentTheme.Title }]}>{currentLocation?.location_name}</Text>
                        <Text style={[styles().fontSemiBold, styles().fontSize14, styles().pt5, { color: currentTheme.subTitle }]}>{currentLocation?.degree}</Text>
                    </View>
                </View> : <ActivityIndicator color={currentTheme.black} />}



            <View style={[styles().mt5]}>
                <Text style={[styles().fontBold, styles().fontSize18, styles().pl5, { color: currentTheme.Title }]}>Previous location</Text>
            </View>

            {!prevLocationLoading ? <FlatList
                data={prevLocation}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={[
                    styles().mt15,
                ]}
                renderItem={({ item, index }) => {
                    return (<View key={index} style={[styles().mb15, styles().flexRow]}>
                        <Text style={{ fontSize: 22 }}>{locationPin}</Text>
                        <View style={[styles().pl10]}>
                            <Text style={[styles().fontMedium, styles().fontSize18, { color: currentTheme.Title }]}>{item.location_name}</Text>
                            <Text style={[styles().fontSemiBold, styles().fontSize14, styles().pt5, { color: currentTheme.subTitle }]}>{item.degree}</Text>
                        </View>
                    </View>);
                }}
                keyExtractor={(item, index) => index?.toString()}
            /> : <ActivityIndicator color={currentTheme.black} />}
        </Layout>
    </>
    );
}
