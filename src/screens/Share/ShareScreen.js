import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { App_Primary_color, white } from "../../common/Colors/colors"; // Import your custom colors
import { AddShare, Back, NavBack, NewShare, QueShare } from "../../assets/SVGs"; // Add your back icon here
import { FONTS_FAMILY } from "../../assets/Fonts"; // Import your fonts
import IMG from "../../assets/Images"; // Import your images (icons for News, Advertisement, and Question)

const ShareScreen = ({ navigation }) => {
    // State for selected option
    const [selectedOption, setSelectedOption] = useState(null);

    // Function to handle card selection
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        navigation.navigate('PostScreen')
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <NavBack />
                </TouchableOpacity>
                <Text style={styles.headerText}>Share</Text>
            </View>

            <Text style={styles.questionText}>What Would You Like To Share?</Text>

            {/* Share Option Buttons */}
            <TouchableOpacity
                style={[
                    styles.optionButton,
                    // styles.newsButton,
                    selectedOption === 'News' && styles.selectedOptionButton
                ]}
                onPress={() => handleOptionSelect('News')}
            >
                <View style={styles.iconContainer}>
                    <NewShare />
                </View>
                <Text style={styles.optionText}>News</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.optionButton,
                    selectedOption === 'Advertisement' && styles.selectedOptionButton
                ]}
                onPress={() => handleOptionSelect('Advertisement')}
            >
                <View style={styles.iconContainer}>
                    <AddShare />
                </View>
                <Text style={styles.optionText}>Advertisement</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.optionButton,
                    selectedOption === 'Question' && styles.selectedOptionButton
                ]}
                onPress={() => handleOptionSelect('Question')}
            >
                <View style={styles.iconContainer}>
                    <QueShare />
                </View>
                <Text style={styles.optionText}>Question</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(20),
    },
    headerText: {
        fontSize: moderateScale(18),
        color: 'black',
        marginLeft: moderateScale(90),
        fontFamily: FONTS_FAMILY.Comfortaa_Bold,
    },
    questionText: {
        fontSize: moderateScale(16),
        color: App_Primary_color,
        // textAlign: 'center',
        marginVertical: verticalScale(15),
        fontFamily: FONTS_FAMILY.Comfortaa_Bold,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: verticalScale(15),
        marginVertical: verticalScale(10),
        backgroundColor: '#F5F5F5',
        borderRadius: moderateScale(10),
        borderWidth: 1,
        borderColor: '#F5F5F5',
    },
    selectedOptionButton: {
        borderColor: App_Primary_color,
        // backgroundColor: '#FFF0E0', // You can change this to any color for the selected state
    },
    newsButton: {
        // borderColor: App_Primary_color,
        backgroundColor: 'white',
    },
    optionText: {
        fontSize: moderateScale(16),
        marginLeft: moderateScale(15),
        fontFamily: FONTS_FAMILY.Comfortaa_Bold,
        color:'black'
    },
    iconContainer: {
        height: 40,
        width: 40,
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: App_Primary_color,
    },
});

export default ShareScreen;
