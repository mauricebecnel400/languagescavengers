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
  AsyncStorage
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Card from '../components/Card';
import LanguageButton from '../components/ButtonLanguage';
import axios from 'axios';


export default class SettingScreen extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            currentLanguage: '',
        }
        clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount() {
        this.setLocalCurrentLanguage();
    }
    
    static navigationOptions = {
      headerTransparent: true
    };

    clickHandler = async (code) =>{
        try {
            await AsyncStorage.setItem('CurrentLanguage', code);
            await this.setLocalCurrentLanguage();
        } catch(error){
            alert(error);
        }  
    }

    setLocalCurrentLanguage = async () => {
        let currentLanguage = await this.getCurrentLanguage();
        this.setState({currentLanguage});
    }

    getCurrentLanguage = async () => {
        try {
            let language = await AsyncStorage.getItem('CurrentLanguage');
            if (language !== null){
                return language;
            } else {
                await AsyncStorage.setItem('CurrentLanguage', 'es');
            }
        } catch(error) {
            alert(error);
        }
    }

    displayLanguage() {
        code = this.state.currentLanguage;
        switch (code){
            case 'es':
                language = 'Spanish';
                break;
            case 'fr': 
                language = 'French';
                break;
            case 'zh':
                language = 'Chinese';
                break;
            case 'de':
                language = 'German';
                break;
            case 'he':
                language = 'Hebrew';
                break;
            case 'ja':
                language = 'Japanese';
                break;
            case 'it':
                language = 'Italian';
                break;
            case 'hi':
                language = 'Hindi';
                break;
            default:
                language = 'Spanish';
        }
        return language;
    }

    render(){
        let current = this.displayLanguage();
        return (
            <ScrollView style={styles.container}>
                <Card>
                    <View style={styles.Header}> 
                        <FontAwesome name="cogs" size={30} style={styles.Icon} />
                        <Text style={styles.TileHeaderText}> Settings </Text>
                    </View>
                        <Text style={styles.LanguageHeaderText}>Language: {current} </Text>
                </Card>
                <View style={styles.ButtonContainer}>
                    <LanguageButton language={'Spanish'} clickHandler={()=>this.clickHandler('es')}/>
                    <LanguageButton language={'Chinese'} clickHandler={()=>this.clickHandler('zh')}/>
                    <LanguageButton language={'French'} clickHandler={()=>this.clickHandler('fr')}/>
                    <LanguageButton language={'German'} clickHandler={()=>this.clickHandler('de')}/>
                    <LanguageButton language={'Hebrew'} clickHandler={()=>this.clickHandler('he')}/>
                    <LanguageButton language={'Japanese'} clickHandler={()=>this.clickHandler('ja')}/>
                </View>
                <View> </View>
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
        paddingBottom: 0,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    LanguageHeaderText: {
        fontSize: 20,
        padding: 15,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
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
    },
    ButtonContainer: {

        alignContent: 'center',
    }
});
