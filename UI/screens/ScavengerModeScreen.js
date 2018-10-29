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
import CardScroll from '../components/CardScroll';
import CameraButton from '../components/CameraButton';

export default class ScavengerMode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            overallScore: 300,
            roundScore: 10,
            currentWord: "Lapiz",
        };
    
    }    
    render() {
        return (
            <View style={styles.container}>
                <CardScroll>
                    <View style={styles.Header}>
                        <FontAwesome name="search" size={30} style={styles.MagnifyingGlass} />
                        <Text style={styles.TileHeaderText}> Scavenger Mode </Text>
                    </View>
                    <View style={styles.SubHeader}>
                        <Text style={styles.SubText}> Overall Score </Text>
                        <Text style={styles.CurrentWord}> {this.state.overallScore} points</Text>
                    </View>
                    <View style={styles.SubHeader}>
                        <Text style={styles.SubText}> Round Score </Text>
                        <Text style={styles.CurrentWord}> {this.state.roundScore} points</Text>
                    </View>
                    <View style={styles.SubHeader}>
                        <Text style={styles.SubText}> Current Word </Text>
                        <Text style={styles.CurrentWord}> {this.state.currentWord} </Text>
                    </View>
                </CardScroll>
                <View style={styles.Options}>
                    <CameraButton/>
                    <CameraButton/>
                </View>
            </View>
        )
    }

}
const styles =  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6',
    },
    Header: {
        flex: 1,
        flexDirection: 'row',
        height: 100,
    },
    TileHeaderText: {
        fontSize: 30,
        paddingTop: 20,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    MagnifyingGlass: {
        padding: 10,
        color: 'rgba(96,100,109, 1)',
    },
    SubHeader: {
        flex: 1,
        flexDirection: 'row',
    },
    SubText: {
        fontSize: 20,
        padding: 10,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    CurrentWord: {
        fontSize: 25,
        padding: 10,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    Options: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
    }
});