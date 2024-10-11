import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { NavBack } from '../../assets/SVGs';
import { App_Primary_color } from '../../common/Colors/colors';

const Setting = ({ navigation }) => {

    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
    const [isLocationEnabled, setIsLocationEnabled] = useState(false);

    const toggleSwitch = (setter, value) => {
        setter(!value);
    };

    const renderHeader = () => {
        return (
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <NavBack />
                </TouchableOpacity>
                <Text style={styles.headerText}>Settings</Text>
            </View>
        );
    };

    const renderSettingOption = (label, value, onValueChange) => {
        return (
            <View style={styles.optionContainer}>
                <Text style={styles.optionText}>{label}</Text>
                <Switch
                    value={value}
                    onValueChange={onValueChange}
                    trackColor={{ false: "#767577", true:App_Primary_color }}
                    thumbColor={value ? "#f5dd4b" : App_Primary_color}
                />
            </View>
        );
    };

    return (
        <>
            {renderHeader()}
            <View style={styles.settingsContainer}>
                {renderSettingOption('Enable Notifications', isNotificationsEnabled, () => toggleSwitch(setIsNotificationsEnabled, isNotificationsEnabled))}
                {renderSettingOption('Enable Dark Mode', isDarkModeEnabled, () => toggleSwitch(setIsDarkModeEnabled, isDarkModeEnabled))}
                {renderSettingOption('Enable Location', isLocationEnabled, () => toggleSwitch(setIsLocationEnabled, isLocationEnabled))}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    headerText: {
        fontSize: moderateScale(18),
        color: 'black',
        marginLeft: moderateScale(90),
        fontFamily: FONTS_FAMILY.Comfortaa_Bold,
    },
    settingsContainer: {
        marginTop: verticalScale(30),
        marginHorizontal: 20,
        gap: 20,
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    optionText: {
        fontSize: moderateScale(16),
        fontFamily: FONTS_FAMILY.Comfortaa_Regular,
        color: '#000',
    },
});

export default Setting;
