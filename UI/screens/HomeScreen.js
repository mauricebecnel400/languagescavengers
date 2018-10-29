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
import ScavengerModeTile from '../components/ScavengerModeTile';
import WordBookTile from '../components/WordBookTile';
import SettingTile from '../components/SettingTile';

export default class HomeScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.earthcontainer}>
                    <Image 
                        style={styles.earth}
                        source={require('../assets/LanguageScavengersWorld.png')}
                    />
                    <Text style={styles.headerSubText}> Let's Find New Words</Text>
                </View>
                <ScavengerModeTile navigation={this.props.navigation}/>
                <WordBookTile/>
                <SettingTile/>
            </View>
        )
    }

}
const styles =  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6',
    },
    earthcontainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 10,
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