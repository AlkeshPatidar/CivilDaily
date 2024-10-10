import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { App_Primary_color } from "../../common/Colors/colors";
import Row from "../../components/wrapper/row";
import { Back } from "../../assets/SVGs";
import { FONTS_FAMILY } from "../../assets/Fonts";

const languages = [
    { id: '1', name: 'English' },
    { id: '2', name: 'Hindi' },
    { id: '3', name: 'Canadian' },
    { id: '4', name: 'Japanish' },
    { id: '5', name: 'Malayalam' },
    { id: '6', name: 'Turkish' },
    { id: '7', name: 'Japanish' },
    { id: '8', name: 'Malayalam' },
    { id: '9', name: 'Turkish' },
    { id: '10', name: 'Malayalam' },
];

const LanguageSelection = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const renderLanguageItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.languageItem, ]}
            onPress={() => setSelectedLanguage(item.id)}
        >
            <Text style={styles.languageText}>
                {item.name}
            </Text>
            <View style={styles.radioCircle}>
                {selectedLanguage === item.id && <View style={styles.selectedRb} />}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Row style={{backgroundColor:App_Primary_color, alignItems:'center',height:verticalScale(56), gap:50, wdth:'100%', paddingHorizontal:20}}>
            <TouchableOpacity onPress={() => navigation.goBack()} >
                <Back/>
            </TouchableOpacity>
            <Text style={styles.title}>Choose Language</Text>
            </Row>
           
            <FlatList
                data={languages}
                renderItem={renderLanguageItem}
                keyExtractor={(item) => item.id}
                style={styles.languageList}
            />
            <TouchableOpacity
                style={styles.nextButton}
                onPress={() =>navigation.navigate('LocationSelection')}
            >
                <Text style={styles.nextButtonText}>NEXT</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    backButton: {
        marginBottom: verticalScale(10),
    },
    backButtonText: {
        fontSize: moderateScale(20),
        color: 'blue',
    },
    title: {
        fontSize: moderateScale(18),
        color: 'white',
        textAlign: 'center',
        fontFamily:FONTS_FAMILY.Comfortaa_Bold
    },
    languageList: {
        flex: 1,
        marginTop:verticalScale(20)
    },
    languageItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: verticalScale(10),
        paddingHorizontal: moderateScale(20),
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: moderateScale(8),
        marginVertical: verticalScale(4),
        backgroundColor: 'rgba(244, 248, 255, 1)',
        marginHorizontal:20,


    },
    selectedLanguageItem: {
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
    },
    languageText: {
        fontSize: moderateScale(16),
        color: 'black',
        fontFamily:FONTS_FAMILY.Comfortaa_Regular
    },
    selectedLanguageText: {
        color: 'blue',
    },
    radioCircle: {
        height: moderateScale(24),
        width: moderateScale(24),
        borderRadius: moderateScale(12),
        borderWidth: 1,
        borderColor: App_Primary_color,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: moderateScale(20),
        height: moderateScale(20),
        borderRadius: moderateScale(100),
        backgroundColor: App_Primary_color,
    },
    nextButton: {
        marginVertical: verticalScale(20),
        backgroundColor: App_Primary_color,
        borderRadius: moderateScale(8),
        paddingVertical: verticalScale(10),
        alignItems: 'center',
        marginHorizontal:20
    },
    nextButtonText: {
        color: 'white',
        fontSize: moderateScale(16),
    },
});

export default LanguageSelection;
