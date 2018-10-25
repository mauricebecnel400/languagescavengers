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

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.earthcontainer}>
                    <Image 
                        source={require('../assets/LanguageScavengersWorld.png')}
                        style={{flex:1, height: undefined, width: undefined}}
                        resizeMode="contain"
                    />
                </View>
            </View>
        )
    }

}
const styles =  StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'powderblue',
        justifyContent: 'center',
        width: '100%',
    },
    earth: {
        
    },
    earthcontainer: {
        width: '100%',
    },
});