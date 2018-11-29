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

export default class ButtonNextWord extends React.Component {

    render() {
        return (
            <TouchableOpacity 
            style={styles.container}
            onPress={() => this.props.clickHandler()} 
            underlayColor="white"
            >
                <View style={styles.Button}>
                    <FontAwesome name="camera" size={60} style={styles.Camera} />
                </View>
            </TouchableOpacity>
        )
    }

}
const styles =  StyleSheet.create({
    container: {
    },
    Button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: 200,
        backgroundColor: '#78C928',
        borderRadius: 20,
        margin: 15,
        shadowOpacity: 0.75,
        shadowRadius: 2,
        shadowColor: 'grey',
        shadowOffset: { height: 8, width: 0 },
    },
    Camera: {
        color: '#FFFFFF',
    }

});