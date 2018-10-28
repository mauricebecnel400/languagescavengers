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

export default class ScavengerModeTile extends React.Component {

    render() {
        return (
            <View style={styles.container}>
            </View>
        )
    }

}
const styles =  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        margin: 15,
        shadowOpacity: 0.75,
        shadowRadius: 2,
        shadowColor: 'grey',
        shadowOffset: { height: 8, width: 0 },
    },
});