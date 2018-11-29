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
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import vocabDictionary from '../data/vocabDictionary';
import Card from '../components/Card';
import LanguageButton from '../components/ButtonLanguage';
import axios from 'axios';


export default class SettingScreen extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            currentLanguage: '',
            loading: false,
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
            this.setState({loading: true});
            await AsyncStorage.setItem('CurrentLanguage', code);
            await this.setLocalCurrentLanguage();
            let value = await this.translateDictionary();
            value = JSON.stringify(value.data.translation).replace(/\\'/g, '\"');
            value = value.replace('Une b', 'B');
            await AsyncStorage.setItem('Translations', value);
            this.setState({loading: false});
        } catch(error){
            alert(error);
        }  
    }

    translateDictionary = async () => {
        try {
            let language = this.state.currentLanguage;
            // console.log(language);
            let payload = vocabDictionary.DictionaryEnglish.slice();
            payload.unshift(language);
            return await axios({
                method: 'post',
                url: vocabDictionary.urlApi +'/translate',
                data: payload,
            });
        } catch (error){
            // alert(error);
            alert('Huh... Can\'t grab your 💩');
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
        if (this.state.loading) {
            current = (<ActivityIndicator style={styles.Loading} size="small" color="#0000ff" />);
        }
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
        fontSize: 25,
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
    },
    containerLoading: {
        
    },
    Loading: {
        paddingTop: 30,
        paddingLeft: 20,
    },
});
