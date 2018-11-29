/*Team: Language Scavengers
 * File: SettingScreen
 * Purpose: The purpose of this file is to create a interactive Setting screen that allows users to
 * change the volume of the music and to switch between languages. */
import React from 'react';
import { StackNavigator } from 'react-navigation';
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import CardScroll from '../components/CardScroll';
import axios from 'axios';


export default class SettingScreen extends React.Component{
    static navigationOptions = {
      headerTransparent: true
    };


    render(){
        return (
            <ScrollView style={styles.container}>
                <CardScroll>
                    <View style={styles.Header}>
                        <FontAwesome name="cogs" size={30} style={styles.Icon} />
                        <Text style={styles.TileHeaderText}> Settings </Text>
                    </View>
                </CardScroll>
            </ScrollView>
        )
    }
}
const styles =  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6',
        paddingTop: 35,
    },
    Header: {
        flex: 1,
        flexDirection: 'row',
    },
    TileHeaderText: {
        fontSize: 30,
        paddingTop: 20,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    Icon: {
        padding: 10,
        color: 'rgba(96,100,109, 1)',
    },
    headerSubText: {
        fontSize: 14,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
        padding: 5,
    }
});
