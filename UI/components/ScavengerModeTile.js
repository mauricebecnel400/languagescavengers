import React from 'react';
import {
    View,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Card from './Card';
import vocabDictionary from '../data/vocabDictionary';


export default class ScavengerModeTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWord: '',
            score: 0
        }
    }

    componentDidMount() {
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
            alert(error);
            return;
        }
    }

    getCurrentWord = async () => {
        try {
            const value = await AsyncStorage.getItem('ScavengerModeCurrentWord');
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


    render() {
        return (
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('ScavengerMode')} 
                underlayColor="white" 
            >
                <Card> 
                    <View style={styles.Header}>
                        <FontAwesome name="search" size={30} style={styles.MagnifyingGlass} />
                        <Text style={styles.TileHeaderText}> Scavenger Mode </Text>
                    </View>
                    <View style={styles.SubHeader}>
                        <Text style={styles.SubText}> Try to find the word we give you. </Text>
                        <Text style={styles.SubText}> Play for points! </Text>
                    </View>
                </Card>
            </TouchableOpacity>
        )
    }

}
const styles =  StyleSheet.create({
    container: {
        flex: 1,
    },
    Header: {
        flex: 1,
        flexDirection: 'row',
    },
    MagnifyingGlass: {
        padding: 10,
        color: 'rgba(96,100,109, 1)',
    },
    TileHeaderText: {
        fontSize: 30,
        paddingTop: 20,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    SubHeader: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
    },
    SubText: {
        fontSize: 15,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    userData: {
        fontSize: 15,
        paddingLeft: 12,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    }


});