import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { FONTS_FAMILY } from '../assets/Fonts';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import color from '../common/Colors/colors';


const CustomButton = ({ title, onPress, leftIcon, style, txtColor }) => {
    return (
        <TouchableOpacity
            style={{ ...styles.button, ...style }}
            onPress={onPress}
            activeOpacity={0.5}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12
                }}>
                {leftIcon && (
                    leftIcon
                )}

                <Text style={{ ...styles.buttonText, ...txtColor }}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: moderateScale(250),
        height: verticalScale(40),
        borderRadius: moderateScale(29),
        backgroundColor: color.App_Primary_color,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingHorizontal: 20,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 14,
        color: 'white',
        fontFamily: FONTS_FAMILY.Comfortaa_Regular
    },
});

export default CustomButton;
