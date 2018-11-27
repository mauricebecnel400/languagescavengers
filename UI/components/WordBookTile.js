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
import Card from './Card';


export default class WordBookTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalBooks: 1,
            score: 0,
        }
    }

    render() {
        return (
            <TouchableHighlight 
            onPress={() => this.props.navigation.navigate('WordBookMode')} 
            underlayColor="white" 
            >
                <Card> 
                    <View style={styles.container}>
                        <View style={styles.Header}>
                            <FontAwesome name="book" size={30} style={styles.MagnifyingGlass} />
                            <Text style={styles.TileHeaderText}> Word Books </Text>
                        </View>
                        <View style={styles.SubHeader}>
                            <View style={styles.Data}>
                                <Text style={styles.SubText}> Total Word Books </Text>
                                <Text style={styles.userData}> {this.state.totalBooks} </Text>
                            </View>
                            <View style={styles.Data}>
                                <Text style={styles.SubText}> Total Score </Text>
                                <Text style={styles.userData}> {this.state.score} </Text>
                            </View>
                        </View>
                    </View>
                </Card>
            </TouchableHighlight>
        )
    }

}
const styles =  StyleSheet.create({
    container: {
        flex: 1,
    },
    Header: {
        flex: 1,
        flexDirection: 'row',
    },
    MagnifyingGlass: {
        padding: 10,
        color: 'rgba(96,100,109, 1)',
    },
    TileHeaderText: {
        fontSize: 30,
        paddingTop: 20,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    SubHeader: {
        flex: 1,
        flexDirection: 'row',
    },
    SubText: {
        fontSize: 17,
        padding: 10,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    userData: {
        fontSize: 15,
        paddingLeft: 12,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    }


});