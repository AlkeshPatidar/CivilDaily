import React from 'react';
import { View, Text, Linking, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { NavBack } from '../../assets/SVGs';
import CustomInputField from '../../components/wrapper/CustomInput';
import CustomButton from '../../components/Button';

const SendFeedBack = ({ navigation }) => {


    const renderHeader = () => {
        return (
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <NavBack />
                </TouchableOpacity>
                <Text style={styles.headerText}>Send Feedback</Text>
            </View>
        )
    }

    return (
        <>
            {renderHeader()}
            <View style={{ gap: 20, marginTop: 30, marginHorizontal: 20 }}>
                <CustomInputField />
                <CustomButton title={'Send'} 
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
