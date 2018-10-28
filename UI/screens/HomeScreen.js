import React from 'react';
import {
    View,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { WebBrowser } from 'expo';
import ScavengerModeTile from '../components/ScavengerModeTile';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };
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
                <ScavengerModeTile/>
                <ScavengerModeTile/>
                <ScavengerModeTile/>

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