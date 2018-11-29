import React from 'react';
import {
    View,
    Image,
    ScrollView,
    Text,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default class ButtonLanguage extends React.Component {

    render() {
        return (
            <TouchableHighlight 
            style={styles.container}
            onPress={() => this.props.clickHandler(code)} 
            underlayColor="white"
            >
                <View style={styles.Button}>
                    <Text style={styles.Next}>{this.props.language}</Text>
                </View>
            </TouchableHighlight>
        )
    }

}
const styles =  StyleSheet.create({
    container: {
    },
    Button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 300,
        backgroundColor: '#78C928',
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 10,
        shadowOpacity: 0.75,
        shadowRadius: 2,
        shadowColor: 'grey',
        shadowOffset: { height: 8, width: 0 },
    },
    Next: {
        fontSize: 25,
        paddingTop: 20,
        color: '#FFFFFF',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },

});