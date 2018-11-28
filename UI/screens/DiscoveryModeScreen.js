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
import ButtonCameraLarge from '../components/ButtonCameraLarge'
import ButtonNextWord from '../components/ButtonNextWord';
import ButtonTryAgain from '../components/ButtonTryAgain';
import Card from '../components/Card';
import vocabDictionary from '../data/vocabDictionary';
import axios from 'axios';

export default class DiscoveryModeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: false,
            Guesses: [],
        };
        this.handleCameraClick = this.handleCameraClick.bind(this);
    };

    static navigationOptions = {
        headerTransparent: true,
    };

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
                let temp = response.data.replace(/'/g, '"');
                let Guesses = JSON.parse(temp);
                this.setState({
                    loading: false,
                    results: true,
                    Guesses, 
                });
            } else {
                this.setState({loading: false});
                return;
            }
        } catch(error){
            this.setState({loading: false});
            // alert('Could Not Classify Image 💩');
            alert(error);
        };

    };

    render() {
        let screen = (
            <ScrollView style={styles.container}>
                <Card>
                    <View style={styles.Header}>
                        <FontAwesome name="globe" size={30} style={styles.MagnifyingGlass} />
                        <Text style={styles.TileHeaderText}> Discovery Mode </Text>
                    </View>
                    <View style={styles.SubHeader}>
                        <Text style={styles.Results}> Take a picture and we can translate </Text>
                        <Text style={styles.Results}> the object for you</Text>
                    </View>
                </Card>
            <View style={styles.Options}>
                <ButtonCameraLarge clickHandler={this.handleCameraClick}/>
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

        if (this.state.results) {
            let indents = [];
            for (var i = 0; i < this.state.Guesses[0].length; i++) {
                // console.log(this.state.incorrectGuesses[0][i]);
                indents.push(
                <View className='parentResults' key={i}> 
                    <Text style={styles.GuessResults} className='guess'> {this.state.Guesses[0][i]} </Text> 
                    <Text style={styles.GuessResultsTranslate} className='translate'> {this.state.Guesses[1][i]}</Text>
                </View>
                );
            }
            screen = (
                <ScrollView style={styles.container}>
                    <CardScroll>
                        <View>
                            <Text style={styles.ResultHeaderText}> Our Guesses </Text>
                        </View> 
                        <View style={styles.SubHeader}>
                            {indents}
                        </View>
                    </CardScroll>
                    <View style={styles.Options}>
                        <ButtonCameraLarge clickHandler={this.handleCameraClick}/>
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
    let language = 'es';
    formData.append(language);
    return axios({
        method: 'post',
        url: 'https://e309d816.ngrok.io/post',
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
        paddingTop: 100,
    },
    Header: {
        flex: 1,
        flexDirection: 'row',
    },
    ResultHeader:{
        flex: 1,
        flexDirection: 'row',
        height: 30,
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
        paddingTop: 20,
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
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    GuessResults: {
        fontSize: 20,
        paddingTop: 25,
        paddingLeft: 20,
        color: 'rgba(96,100,109, 1)',
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
    },
    Loading: {
        margin: 40,
        padding: 10,
        color: 'rgba(102,180,32, 1)',
    }
});
