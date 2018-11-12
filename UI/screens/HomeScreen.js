import React from 'react';
<<<<<<< HEAD
import { StackNavigator } from 'react-navigation';
=======
>>>>>>> b78d2b4811456f1bc5898c9397779f21d8afd4aa
import {
    View,
    Image,
    ScrollView,
    Text,
<<<<<<< HEAD
    TouchableHighlight,
    StyleSheet,
} from 'react-native';
import ScavengerModeTile from '../components/ScavengerModeTile';
import WordBookTile from '../components/WordBookTile';
import SettingTile from '../components/SettingTile';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        headerTransparent: true
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <View>
                    <View style={styles.earthcontainer}>
                        <Image
                            style={styles.earth}
                            source={require('../assets/LanguageScavengersWorld.png')}
                        />
                        <Text style={styles.headerSubText}> Let's Find New Words</Text>
                    </View>
                    <ScavengerModeTile navigation={this.props.navigation}/>
                    <WordBookTile navigation={this.props.navigation}/>
                    <SettingTile navigation={this.props.navigation}/>
                </View>
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
    earthcontainer: {
        width: '100%',
        alignItems: 'center',
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
=======
    TouchableOpacity
} from 'react-native';
import { WebBrowser } from 'expo';
>>>>>>> b78d2b4811456f1bc5898c9397779f21d8afd4aa
