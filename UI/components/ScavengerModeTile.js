import React from 'react';
import {
    View,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Card from './Card';


export default class ScavengerModeTile extends React.Component {

    render() {
        return (
            <Card> 
                <View style={styles.container}>
                    <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>
                        <FontAwesome>{Icons.chevronLeft}</FontAwesome>
                    </Text>
                    <Text style={styles.TileHeaderText}> Scavenger Mode </Text>
                </View>
            </Card>
        )
    }

}
const styles =  StyleSheet.create({
    containter: {
        flex: 1,
    },
    Header: {
        flex: 1, 
        flexDirection: 'row',
    },
    TileHeaderText: {
        fontSize: 20,
        padding: 10,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',

    }
});