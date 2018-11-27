/*****************************************************************************************
 * Team: Language Scavengers
 * Date: 11/13/2018
 * Description: This screen will be for Scavenger Mode.
 * Display:
 *      - Word to find
 *      - points at stake
 *      - Current score
 *
 * Buttons:
 *      - Camera Button
 *          -goes to camera
 *      - Skip Button
 *          -finds another word to be found
 *
 *****************************************************************************************/
import React from 'react';
import {
    View,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    Animated,
    Easing,
} from 'react-native';
import { Permissions, ImagePicker } from 'expo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import CardScroll from '../components/CardScroll';
import ButtonCamera from '../components/ButtonCamera';
import ButtonSkip from '../components/ButtonSkip';
import Card from '../components/Card';
import vocabDictionary from '../data/vocabDictionary';
import axios from 'axios';

export default class ScavengerMode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            currentWord: '',
            correct: false,
            incorrect: false,
        };
        this.handleCameraClick = this.handleCameraClick.bind(this);
        this.handleSkipClick = this.handleSkipClick.bind(this);
        this.spinValue = new Animated.Value(0)
    };

    static navigationOptions = {
        headerTransparent: true,
    };

    componentDidMount(){
        this.updateUserData();
    }

    updateUserData = async () => {
        let currentWord = await this.getCurrentWord();
        let score = await this.getScore();
        this.setState({
            currentWord,
            score,
        });
    }

    getScore = async () => {
        try {
            const value = await AsyncStorage.getItem('ScavengerModeScore');
            if (value !== null) {
              // We have data!!
              return value;
            } else {
                await AsyncStorage.setItem('ScavengerModeScore', '0');
                return 0;
            }
        } catch (error) {
            alert("here");
            return;
        }
    }

    getCurrentWord = async () => {
        try {
            const value = await AsyncStorage.getItem('ScavengerModeCurrentWord');
            if (value !== null){
                let index = parseInt(value);
                return vocabDictionary.Dictionary[index];
            } else {
                let word = vocabDictionary.Dictionary[0];
                await AsyncStorage.setItem('ScavengerModeCurrentWord', '0');
                return word;
            }
        } catch (error) {
            alert(error);
            return;
        }
    }

    handleSkipClick = async () => {
        let index = await this.incrementCurrentWord();
        this.setState({
            currentWord: vocabDictionary.Dictionary[index],
        })
        await AsyncStorage.setItem('ScavengerModeCurerntWord', index.toString())
    }

    incrementCurrentWord = async () => {
        const value = await AsyncStorage.getItem('ScavengerModeCurrentWord');
        let index = 0;
        if (value !== null) {
            index = parseInt(value);
            // index = (index + 1) % vocabDictionary.Dictionary.length
            index = Math.floor(Math.random()*vocabDictionary.Dictionary.length)
        } else {
            await this.getCurrentWord();
        }
        return index;
    }

    handleCameraClick = async () => {
        result = getPermsAsync();
        setTimeout(()=>this.setState({loading: true}, () => this.spin()), 1000);
        let response = await takePhotoAsync();
        console.log(response.data);
        let currentWord = await this.getCurrentWord();
        console.log(currentWord);
        if (response.data.toUpperCase().includes(currentWord.toUpperCase())){
            this.setState({
                loading: false,
                correct: true,
            });
        } else {
            this.setState({
                loading: false,
                incorrect: true,
            })
        }

    };

    spin = () => {
        this.spinValue.setValue(0);
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start(() => this.spin());
    };


    render() {
        const rotate = this.spinValue.interpolate({inputRange: [0, 1], outputRange: ['0deg', '360deg']})
        let screen = (
            <ScrollView style={styles.container}>
            <CardScroll>
                <View style={styles.Header}>
                    <FontAwesome name="search" size={30} style={styles.MagnifyingGlass} />
                    <Text style={styles.TileHeaderText}> Scavenger Mode </Text>
                </View>
                <View style={styles.SubHeader}>
                    <Text style={styles.SubText}> Overall Score: </Text>
                    <Text style={styles.CurrentWord}> {this.state.score} points</Text>
                </View>
                <View style={styles.SubHeader}>
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
                        <Animated.View style={{transform: [{rotate}]}}>
                            <FontAwesome name="spinner" size={100} style={styles.Loading} spin/>
                        </Animated.View>
                    </View>
                </ScrollView>
            )
        };
        if (this.state.correct) {
            screen = (
                <ScrollView style={styles.container}>
                    <Card>
                        <FontAwesome name="check" size={60} style={styles.Check} />
                        <Text style={styles.TileHeaderText}> Correct </Text>
                    </Card>
                    <View style={styles.Options}>
                        <ButtonCamera clickHandler = {this.handleCameraClick}/>
                        <ButtonSkip clickHandler = {this.handleSkipClick}/>
                    </View>
                </ScrollView>
            )
        };
        if (this.state.incorrect) {
            screen = (
                <ScrollView style={styles.container}>
                    <Card>
                        <FontAwesome name="times-circle" size={60} style={styles.Check} />
                        <Text style={styles.TileHeaderText}> Try Again </Text>
                    </Card>
                    <View style={styles.Options}>
                        <ButtonCamera clickHandler = {this.handleCameraClick}/>
                        <ButtonSkip clickHandler = {this.handleSkipClick}/>
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
        return;
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
    return axios({
        method: 'post',
        url: 'https://62f1923c.ngrok.io/post',
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
        height: 100,
    },
    TileHeaderText: {
        fontSize: 30,
        paddingTop: 20,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
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
        flexDirection: 'row',
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
        paddingTop: 10,
        color: 'rgba(96,100,109, 1)',
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
