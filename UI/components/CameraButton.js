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

export default class CameraButton extends React.Component {

    render() {
        return (
            <TouchableHighlight 
            style={styles.container}
            onPress={() => this.props.navigation.navigate('ScavengerMode')} 
            underlayColor="white"
            >
                <View style={styles.Button}>
                    <FontAwesome name="camera" size={60} style={styles.Camera} />
                </View>
            </TouchableHighlight>
        )
    }

}
const styles =  StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    Button: {
        height: 80,
        width: 90,
        backgroundColor: '#78C928',
        borderRadius: 20,
        margin: 15,
        shadowOpacity: 0.75,
        shadowRadius: 2,
        shadowColor: 'grey',
        shadowOffset: { height: 8, width: 0 },
        alignContent: 'center',
    },
    Camera: {
        padding: 10,
        color: '#FFFFFF',
    }

});