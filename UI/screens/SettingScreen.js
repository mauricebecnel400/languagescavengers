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

import LanguageSelectTile from '../components/LanguageSelectTile';
import VolumeTile from '../components/VolumeTile';


export default class SettingScreen extends React.Component{
    static navigationOptions = {
      headerTransparent: true
    };

    render(){
        return (
            <ScrollView style={styles.container}>
                <View>
                    <View style={styles.container}>
                        <Image
                            style={styles.earth}
                            source={require('../assets/gear1.png')}
                        />
                    </View>
                    <LanguageSelectTile navigation={this.props.navigation}/>
                    <VolumeTile navigation={this.props.navigation}/>
                </View>
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
    earthcontainer: {
        width: '100%',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 30,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    earth: {
        resizeMode: 'contain',
    },

    headerSubText: {
        fontSize: 14,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
        padding: 5,
    }
});
