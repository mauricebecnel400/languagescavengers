import React from 'react';
import {
    View,
    Image,
    ScrollView,
    Text,
    StyleSheet,
    AsyncStorage,
    ActivityIndicator,
} from 'react-native';
import { Permissions, ImagePicker } from 'expo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import CardScroll from '../components/CardScroll';
import ButtonCamera from '../components/ButtonCamera';
import ButtonSkip from '../components/ButtonSkip';
import ButtonNextWord from '../components/ButtonNextWord';
import ButtonTryAgain from '../components/ButtonTryAgain';
import Card from '../components/Card';
import vocabDictionary from '../data/vocabDictionary';
import axios from 'axios';

export default class ScavengerMode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            previousWordIndex: 0,
            currentWord: '',
            correct: false,
            incorrect: false,
            incorrectGuesses: [],
            translations: [],
        };
        this.handleCameraClick = this.handleCameraClick.bind(this);
        this.handleSkipClick = this.handleSkipClick.bind(this);
        this.handleNextButton = this.handleNextButton.bind(this);
        this.handleTryAgain = this.handleTryAgain.bind(this);
    };

    static navigationOptions = {
        headerTransparent: true,
    };

    componentDidMount(){
        this.updateUserData();
    }

    translateDictionary = async () => {
        try {
            let language = await AsyncStorage.getItem('CurrentLanguage');
            // console.log(language);
            let payload = vocabDictionary.DictionaryEnglish.slice();
            payload.unshift(language);
            return await axios({
                method: 'post',
                url: vocabDictionary.urlApi +'/translate',
                data: payload,
            });
        } catch (error){
            alert('Huh... Can\'t grab your 💩');
        }
    }

    updateUserData = async () => {
        let currentWord = await this.getCurrentWord();
        let score = await this.getScore();
        let translations = await this.translateDictionary();
        this.setState({
            currentWord,
            score,
            translations,
        });
    }

    getScore = async () => {
        try {
            const value = await AsyncStorage.getItem('ScavengerModeScore');
            if (value !== null) {
              // We have data!!
              return parseInt(value);
            } else {
                await AsyncStorage.setItem('ScavengerModeScore', '0');
                return 0;
            }
        } catch (error) {
            alert(error);
            return;
        }
    }

    getCurrentWord = async () => {
        try {
            let value = await AsyncStorage.getItem('ScavengerModeCurrentWord');
            if (value !== null){
                let index = parseInt(value);
                return vocabDictionary.DictionarySpanish[index];
            } else {
                let word = vocabDictionary.DictionarySpanish[0];
                await AsyncStorage.setItem('ScavengerModeCurrentWord', '0');
                return word;
            }
        } catch (error) {
            alert(error);
            return;
        }
    }

    incrementCurrentWord = async () => {
        let value = await AsyncStorage.getItem('ScavengerModeCurrentWord');
        let index = 0;
        if (value !== null) {
            index = parseInt(value);
            // index = (index + 1) % vocabDictionary.DictionarySpanishSpanish.length
            index = Math.floor(Math.random()*vocabDictionary.DictionarySpanish.length)
        } else {
            await this.getCurrentWord();
        }
        this.setState({previousWordIndex: value});
        await AsyncStorage.setItem('ScavengerModeCurrentWord', index.toString());
        return index;
    }

    incrementScore = async () => {
        let value = await this.getScore();
        value++;
        this.setState({score: value});
        await AsyncStorage.setItem('ScavengerModeScore', value.toString());
    }
    
    handleSkipClick = async () => {
        let index = await this.incrementCurrentWord();
        this.setState({
            currentWord: vocabDictionary.DictionarySpanish[index],
        })
    }

    handleNextButton () {
        this.setState({correct: false});
    }

    handleTryAgain () {
        this.setState({incorrect: false});
    }

    handleCameraClick = async () => {
        try {
            result = getPermsAsync();
            setTimeout(()=>this.setState({loading: true}), 1000);
            let response = await takePhotoAsync();
            if (response !== 0){
                // console.log(response.data);
                let currentWord = await this.getCurrentWord();
                // console.log(currentWord);
                currentWord = currentWord.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                let compare = response.data.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                if (compare.toUpperCase().includes(currentWord.toUpperCase())){
                    await this.incrementScore();
                    let index = await this.incrementCurrentWord();
                    this.setState({
                        loading: false,
                        correct: true,
                        currentWord: vocabDictionary.DictionarySpanish[index],
                    })
                } else {
                    let temp = response.data.replace(/'/g, '"');
                    let incorrectGuesses = JSON.parse(temp);
                    this.setState({
                        loading: false,
                        incorrect: true,
                        incorrectGuesses, 
                    });
                }
            } else {
                this.setState({loading: false});
                return;
            }
        } catch(error){
            this.setState({loading: false});
            alert('Huh... We couldn\'t classify your image 💩');
            // alert(error);
        };

    };

    render() {
        let screen = (
            <ScrollView style={styles.container}>
            <CardScroll>
                <View style={styles.Header}>
                    <FontAwesome name="search" size={30} style={styles.MagnifyingGlass} />
                    <Text style={styles.TileHeaderText}> Scavenger Mode </Text>
                </View>
                <View style={styles.Header}>
                    <Text style={styles.SubText}> Overall Score: </Text>
                    <Text style={styles.CurrentWord}> {this.state.score} points</Text>
                </View>
                <View style={styles.Header}>
                    <Text style={styles.SubText}> Current Word: </Text>
                    <Text style={styles.CurrentWord}> {this.state.currentWord} </Text>
                </View>
            </CardScroll>
            <View style={styles.Options}>
                <ButtonCamera clickHandler = {this.handleCameraClick}/>
                <ButtonSkip clickHandler = {this.handleSkipClick}/>
            </View>
        </ScrollView>
        );
        if (this.state.loading) {
            screen = (
                <ScrollView style={styles.container}>
                    <View style={styles.containerLoading}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                </ScrollView>
            )
        };
        if (this.state.correct) {
            screen = (
                <ScrollView style={styles.container}>
                    <CardScroll>
                        <View>
                            <Text style={styles.ResultHeaderText}> Correct </Text>
                        </View>
                        <View style={styles.SubHeader}>
                            <Text style={styles.CurrentWord}> Total points: {this.state.score}</Text>
                        </View>
                        <View style={styles.SubHeader}>
                            <Text style={styles.CurrentWord}> {vocabDictionary.DictionarySpanish[this.state.previousWordIndex]}</Text>
                            <Text style={styles.GuessResultsTranslate}> {vocabDictionary.DictionaryEnglish[this.state.previousWordIndex]} </Text>
                        </View>
                    </CardScroll>
                    <View style={styles.Options}>
                        <ButtonNextWord clickHandler = {this.handleNextButton}/>
                    </View>
                </ScrollView>
            )
        };
        if (this.state.incorrect) {
            let indents = [];
            for (var i = 0; i < 3; i++) {
                // console.log(this.state.incorrectGuesses[0][i]);
                indents.push(<Text style={styles.GuessResults} className='indent' key={i}> {this.state.incorrectGuesses[0][i]} </Text>);
            }
            screen = (
                <ScrollView style={styles.container}>
                    <CardScroll>
                        <View>
                            <Text style={styles.ResultHeaderText}> Wrong </Text>
                        </View> 
                        <View style={styles.SubHeader}>
                            <Text style={styles.CurrentWord}> Current Word your looking for: </Text>
                            <Text style={styles.GuessResults}>{this.state.currentWord}</Text>
                        </View>
                        <View style={styles.SubHeader}>
                            <Text style={styles.CurrentWord}> We think you took a picture of: </Text>
                            {indents}
                        </View>
                    </CardScroll>
                    <View style={styles.Options}>
                        <ButtonTryAgain clickHandler = {this.handleTryAgain}/>
                    </View>
                </ScrollView>
            )
        };
        return (
            screen
        )
    }

}

async function getPermsAsync(){
	const { status } = await Permissions.askAsync( Permissions.CAMERA, Permissions.CAMERA_ROLL );
	if( status === 'granted' ) {
		return status;
	}
	else
		return 69;

}

async function takePhotoAsync(){
    let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
     });

    if (result.cancelled) {
        return 0;
    }
    let localUri = result.uri;
    let filename = localUri.split('/').pop();
    
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();

    // Assume "photo" is the name of the form field the server expects
    formData.append('photo', { uri: localUri, name: filename, type });
    let language = await AsyncStorage.getItem('CurrentLanguage');
    formData.append(language);
    return await axios({
        method: 'post',
        url: vocabDictionary.urlApi +'/post',
        data: formData,
        headers: {
            'contentt-type': 'multipart/form-data',
        },
      });

}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6',
        paddingTop: 65,
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
    ResultHeaderText:{
        fontSize: 30,
        paddingTop: 30,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
        padding: 10,
    },
    MagnifyingGlass: {
        padding: 10,
        color: 'rgba(96,100,109, 1)',
    },
    Check: {
        padding: 10,
        color: 'rgba(96,100,109, 1)',
    },
    SubHeader: {
        flex: 1,
    },
    SubText: {
        fontSize: 20,
        padding: 10,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    CurrentWord: {
        fontSize: 20,
        padding: 10,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    Results: {
        fontSize: 17,
        marginLeft: 5,
        padding: 10,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    GuessResults: {
        fontSize: 17,
        paddingLeft: 20,
        color: '#75a3e7',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    GuessResultsTranslate: {
        fontSize: 17,
        paddingTop: 5,
        paddingLeft: 20, 
        color: '#75a3e7',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    Options: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    },
    containerLoading: {
        alignItems: 'center',
        paddingTop: 100,
    },
    Loading: {
        margin: 40,
        padding: 10,
        color: 'rgba(102,180,32, 1)',
    }
});
