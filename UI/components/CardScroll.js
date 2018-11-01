import React from 'react';
import {
    View,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

export default class CardScroll extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                {this.props.children}
            </View>
        )
    }

}
const styles =  StyleSheet.create({
    container: {
        height: 400,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        margin: 15,
        shadowOpacity: 0.75,
        shadowRadius: 2,
        shadowColor: 'grey',
        shadowOffset: { height: 8, width: 0 },
    },
});