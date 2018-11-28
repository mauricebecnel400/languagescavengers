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


export default class DiscoveryModeTile extends React.Component {
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
            onPress={() => this.props.navigation.navigate('DiscoveryMode')} 
            underlayColor="white" 
            >
                <Card> 
                    <View style={styles.container}>
                        <View style={styles.Header}>
                            <FontAwesome name="globe" size={30} style={styles.MagnifyingGlass} />
                            <Text style={styles.TileHeaderText}> Discovery Mode </Text>
                        </View>
                        <View style={styles.SubHeader}>
                            <Text style={styles.SubText}> Take pictures and we will tell you the </Text>
                            <Text style={styles.SubText}> objects translation </Text>
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
        flexDirection: 'column',
        padding: 10,
    },
    SubText: {
        fontSize: 15,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    userData: {
        fontSize: 15,
        margin: 15,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    }


});