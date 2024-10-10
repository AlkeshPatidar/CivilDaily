import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button, ImageBackground } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { App_Primary_color, white } from "../../common/Colors/colors";
import Row from "../../components/wrapper/row";
import { Back, DownArrowCircle } from "../../assets/SVGs";
import { FONTS_FAMILY } from "../../assets/Fonts";
import IMG from "../../assets/Images";
import CustomText from "../../components/TextComponent";

const languages = [
    { id: '1', img: IMG.InterestImage1, name: 'Politics' },
    { id: '2', img: IMG.InterestImage1, name: 'Bussiness' },
    { id: '3', img: IMG.InterestImage1, name: 'Culture' },
    { id: '4', img: IMG.InterestImage1, name: 'Healthy' },
    { id: '5', img: IMG.InterestImage1, name: 'Nature' },
    { id: '6', img: IMG.InterestImage1, name: 'Politics' },
    { id: '7', img: IMG.InterestImage1, name: "Sports" },
    { id: '8', img: IMG.InterestImage1, name: 'Technology' },
];

const PickInterest = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const renderLanguageItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.languageItem]}
            activeOpacity={0.9}
            onPress={() => setSelectedLanguage(item.id)}
        >
            <ImageBackground
                style={styles.imageBackground}
                source={IMG.InterestImage1}
                imageStyle={{ borderRadius: 10 }}
            >
                <Row style={styles.rowStyle}>
                    <CustomText style={styles.languageText}>{item?.name}</CustomText>
                    <View style={styles.radioCircle}>
                        {selectedLanguage === item.id && <View style={styles.selectedRb} />}
                    </View>
                </Row>
            </ImageBackground>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Row style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Back />
                </TouchableOpacity>
                <Text style={styles.title}>Pick Your Interest</Text>
            </Row>

            <FlatList
                data={languages}
                renderItem={renderLanguageItem}
                keyExtractor={(item) => item.id}
                style={styles.languageList}
                numColumns={2}
                ListFooterComponent={() => (
                    <TouchableOpacity onPress={() => { /* handle 'View All' action here */ }}
                        style={{ alignItems: 'center' }}
                    >
                        <CustomText style={styles.viewAllText}>View All</CustomText>
                        <DownArrowCircle />
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => navigation.navigate('Tab')}
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
    headerRow: {
        backgroundColor: App_Primary_color,
        alignItems: 'center',
        height: verticalScale(56),
        gap: 50,
        width: '100%',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: moderateScale(18),
        color: 'white',
        textAlign: 'center',
        fontFamily: FONTS_FAMILY.Comfortaa_Bold,
    },
    languageList: {
        flex: 1,
        marginTop: verticalScale(20),
        alignSelf: 'center',
    },
    languageItem: {
        paddingVertical: verticalScale(10),
        paddingHorizontal: moderateScale(5),
        marginVertical: verticalScale(4),
    },
    imageBackground: {
        height: verticalScale(99),
        width: moderateScale(150),
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowStyle: {
        gap: 10,
    },
    languageText: {
        color: white,
        fontFamily: FONTS_FAMILY.Comfortaa_Bold,
        fontSize: 16,
    },
    radioCircle: {
        height: moderateScale(24),
        width: moderateScale(24),
        borderRadius: moderateScale(12),
        borderWidth: 1,
        borderColor: white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: moderateScale(20),
        height: moderateScale(20),
        borderRadius: moderateScale(100),
        backgroundColor: white,
    },
    viewAllText: {
        textAlign: 'center',
        color: 'rgba(130, 130, 130, 0.73)',
        fontSize: moderateScale(14),
        fontFamily: FONTS_FAMILY.Comfortaa_Bold,
        // paddingVertical: verticalScale(20),
    },
    nextButton: {
        marginVertical: verticalScale(20),
        backgroundColor: App_Primary_color,
        borderRadius: moderateScale(8),
        paddingVertical: verticalScale(10),
        alignItems: 'center',
        marginHorizontal: 20,
    },
    nextButtonText: {
        color: 'white',
        fontSize: moderateScale(16),
    },
});

export default PickInterest;
