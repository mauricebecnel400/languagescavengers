import React from 'react';
import {
    View,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import CardScroll from '../components/CardScroll';
import ButtonCamera from '../components/ButtonCamera';
import ButtonSkip from '../components/ButtonSkip';
import ExpoCamera from '../components/ExpoCamera';
import Card from '../components/Card';

export default class ScavengerMode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            overallScore: 300,
            roundScore: 10,
            currentWord: 'Lapiz',
            cameraEnabled: false,
            result: false,
        };
        this.handleCameraClick = this.handleCameraClick.bind(this);
        this.handleSkipClick = this.handleSkipClick.bind(this);
    };
    
    static navigationOptions = {
        headerTransparent: true,
    };
    
    handleSkipClick() {
        this.setState({
            currentWord: 'Silla',
        })
    }

    handleCameraClick() {
        if (this.state.cameraEnabled){
            this.setState({
                cameraEnabled: false,
                result: true,
            });
        }
        else {
            this.setState({cameraEnabled: true});
        }
    };

    render() {
        let result;
        let screen = (
            <ScrollView style={styles.container}>
            <CardScroll>
                <View style={styles.Header}>
                    <FontAwesome name="search" size={30} style={styles.MagnifyingGlass} />
                    <Text style={styles.TileHeaderText}> Scavenger Mode </Text>
                </View>
                <View style={styles.SubHeader}>
                    <Text style={styles.SubText}> Overall Score </Text>
                    <Text style={styles.CurrentWord}> {this.state.overallScore} points</Text>
                </View>
                <View style={styles.SubHeader}>
                    <Text style={styles.SubText}> Round Score </Text>
                    <Text style={styles.CurrentWord}> {this.state.roundScore} points</Text>
                </View>
                <View style={styles.SubHeader}>
                    <Text style={styles.SubText}> Current Word </Text>
                    <Text style={styles.CurrentWord}> {this.state.currentWord} </Text>
                </View>
            </CardScroll>
            <View style={styles.Options}>
                <ButtonCamera clickHandler = {this.handleCameraClick}/>
                <ButtonSkip clickHandler = {this.handleSkipClick}/>
            </View>
        </ScrollView>
        );
        if (this.state.cameraEnabled === true) {
            screen = (
                <ExpoCamera clickHandler = {this.handleCameraClick}/>
            );
        };
        if (this.state.result === true) {
            screen = (
                <ScrollView style={styles.container}>
                    <Card>
                        <FontAwesome name="check" size={60} style={styles.Camera} />
                     Correct
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
        fontSize: 25,
        padding: 10,
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
    }
});