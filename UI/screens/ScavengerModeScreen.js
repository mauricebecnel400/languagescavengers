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
        this.grabDictionary();
        this.updateUserData();
    }

    grabDictionary = async () => {
        try {
            let translations = await AsyncStorage.getItem('Translations');
            translations = JSON.parse(translations);
            if (translations === null){
                translations = vocabDictionary.DictionarySpanish;
            }
            this.setState({
                translations,
            });

        } catch (error) {
            alert(error);
        }
    }

    updateUserData = async () => {
        try {
            this.setState({loading: true});
            let currentWord = await this.getCurrentWord();
            let score = await this.getScore();
            this.setState({
                currentWord,
                score,
                loading: false,
            });
        } catch (error) {
            alert(error);
        }
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
                return this.state.translations[index];
            } else {
                let word = this.state.translations[0];
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
            index = (index + 1) % this.state.translations.length;
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
        let translations = this.state.translations;
        this.setState({
            currentWord: translations[index],
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
                currentWord = currentWord.replace(/\\'/g, '\\"');
                compare = compare.replace(/\\\\'/g, '"');
                // console.log(compare.toUpperCase());
                // console.log(currentWord.toUpperCase());
                if (compare.toUpperCase().includes(currentWord.toUpperCase())){
                    await this.incrementScore();
                    let index = await this.incrementCurrentWord();
                    let translations = this.state.translations;
                    this.setState({
                        loading: false,
                        correct: true,
                        currentWord: translations[index],
                    })
                } else {
                    let temp = response.data.replace(/'/g, '"');
                    temp = temp.replace(/\\"/g, '\"');
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
            //alert('Huh... We couldn\'t classify your image 💩');
            alert(error);
        };

    };

    render() {
        let screen = (
            <ScrollView style={styles.container}>
            <CardScroll>
                <View>
                    <Text style={styles.ResultHeaderText}> Scavenger Mode </Text>
                </View>
                <View style={{paddingTop: 20}}>
                    <Text style={styles.SubText}> Overall Score: </Text>
                    <Text style={styles.CurrentWord}> {this.state.score} points</Text>
                </View>
                <View style={{paddingTop: 20}}>
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
                        <View style={{paddingTop: 20}}>
                            <Text style={styles.SubText}> Score: </Text>
                            <Text style={styles.CurrentWord}> {this.state.score} points </Text>
                        </View>
                        <View style={{paddingTop: 20}}>
                            <Text style={styles.SubText}> {this.state.translations[this.state.previousWordIndex]}</Text>
                            <Text style={styles.CurrentWord}> {vocabDictionary.DictionaryEnglish[this.state.previousWordIndex]} </Text>
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
                indents.push(<Text style={styles.GuessResults} className='indent' key={i}> {this.state.incorrectGuesses[0][i]} </Text>);
            }
            screen = (
                <ScrollView style={styles.container}>
                    <CardScroll>
                        <View>
                            <Text style={styles.ResultHeaderText}> Are you sure? </Text>
                        </View> 
                        <View style={{paddingTop: 20}}>
                            <Text style={styles.Label}> Current Word your looking for: </Text>
                            <Text style={styles.GuessResults}>{this.state.currentWord}</Text>
                        </View>
                        <View style={{paddingTop: 20}}>
                            <Text style={styles.Label}> We think you took a picture of: </Text>
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
        fontSize: 25,
        padding: 10,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    CurrentWord: {
        fontSize: 20,
        paddingTop: 5,
        paddingLeft: 25,
        paddingBottom: 10,
        color: '#75a3e7',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    Label : {
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
