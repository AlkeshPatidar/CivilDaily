
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { App_Primary_color, black } from '../../common/Colors/colors';

const surveyData = [
    { id: '5', label: '***** (Five stars ಅತ್ಯುತ್ತಮ)', value: '5' },
    { id: '4', label: '**** (Four Stars)', value: '4' },
    { id: '3', label: '*** (Three srarts)', value: '3' },
    { id: '2', label: '* (Two stars)', value: '2' },
    { id: '1', label: '* (one star ಕಳಪೆ)', value: '1' },
];

const Survey = ({navigation}) => {
    const [checked, setChecked] = useState('');

    const renderSurveyOption = ({ item }) => (
        <View style={styles.optionContainer}>
            <RadioButton
                value={item.value}
                status={checked === item.value ? 'checked' : 'unchecked'}
                onPress={() => setChecked(item.value)}
            />
            <Text style={styles.optionText}>{item.label}</Text>
        </View>
    );

    const renderSurvey = () => {
        return (
            <View>
                {/* Image Section */}
                <Image
                    source={{ uri: 'https://picsum.photos/536/354' }} // Replace with your image source
                    style={styles.image}
                />

                {/* Question Text */}
                <Text style={styles.questionText}>
                    ದ್ರುವ ಸರ್ಜಾ ನಟನೆಯ ಕನ್ನಡ ಚಲನಚಿತ್ರ ಮಾರ್ಟಿನ್ ಗೆ ನೀವು ವಿಶ್ಲೇಸಿದರೆ ಯಾವ
                    ರೇಟಿಂಗ್ ಕೊಡುವ ಯೋಗ್ಯಸಿರಿ?
                </Text>

                {/* Survey Options */}
                <FlatList
                    data={surveyData}
                    renderItem={renderSurveyOption}
                    keyExtractor={(item) => item.id}
                    ListFooterComponent={
                        <Text style={styles.votesText}>4233 Votes</Text>

                    }
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Survey</Text>
            </View>
            <ScrollView contentContainerStyle={{gap:20, paddingBottom:30}}>
                {renderSurvey()}
                {renderSurvey()}

            </ScrollView>




        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: App_Primary_color,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        marginLeft: 20,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    questionText: {
        margin: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: black
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 10,
    },
    optionText: {
        fontSize: 16,
        marginLeft: 10,
        color: black

    },
    votesText: {
        // marginTop: 10,
        // marginBottom: 20,
        // textAlign: 'center',
        left: 10,
        color: 'gray',
        fontSize: 14,
        color: black

    },
    adImage: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        marginTop: 10,
    },
});

export default Survey;
