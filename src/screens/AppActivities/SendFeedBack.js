import React from 'react';
import { View, Text, Linking, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { NavBack } from '../../assets/SVGs';
import CustomInputField from '../../components/wrapper/CustomInput';
import CustomButton from '../../components/Button';
import { useTranslation } from 'react-i18next';

const SendFeedBack = ({ navigation }) => {
    const { t, i18n } = useTranslation();


    const renderHeader = () => {
        return (
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <NavBack />
                </TouchableOpacity>
                <Text style={styles.headerText}>{t('send_feedback')}</Text>
            </View>
        )
    }

    return (
        <>
            {renderHeader()}
            <View style={{ gap: 20, marginTop: 30, marginHorizontal: 20 }}>
                <CustomInputField />
                <CustomButton title={t('send')} 
                onPress={() => navigation.goBack()}
                />

            </View>


        </>
    );
};

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        // marginTop: verticalScale(20),
        padding: 10
    },
    headerText: {
        fontSize: moderateScale(18),
        color: "black",
        marginLeft: moderateScale(90),
        fontFamily: FONTS_FAMILY.Comfortaa_Bold,
    },

});

export default SendFeedBack;
