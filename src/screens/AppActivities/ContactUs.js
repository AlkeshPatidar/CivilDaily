import React from 'react';
import { View, Text, Linking, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { NavBack } from '../../assets/SVGs';

const ContactUsScreen = ({navigation}) => {

    const handleEmailPress = (email) => {
        Linking.openURL(`mailto:${email}`);
    };

    const handlePhonePress = (phone) => {
        Linking.openURL(`tel:${phone}`);
    };

    const renderHeader = () => {
        return (
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <NavBack />
                </TouchableOpacity>
                <Text style={styles.headerText}>Contact Us</Text>
            </View>
        )
    }

    return (
        <>
            {renderHeader()}
            <ScrollView style={styles.container}>
                {/* For News */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>For News</Text>
                    <TouchableOpacity onPress={() => handleEmailPress('reporter@electreps.com')}>
                        <Text style={styles.linkText}>test@test.com</Text>
                    </TouchableOpacity>
                </View>

                {/* For Advertisement */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>For Advertisement</Text>
                    <TouchableOpacity onPress={() => handlePhonePress('+919972157058')}>
                        <Text style={styles.linkText}>+91 9898989898</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('+918867722291')}>
                        <Text style={styles.linkText}>+91 989898989898</Text>
                    </TouchableOpacity>
                </View>

                {/* For others */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>For others</Text>
                    <TouchableOpacity onPress={() => handleEmailPress('help@voiceofkranatak.com')}>
                        <Text style={styles.linkText}>help@voiceofkranatak.com</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        // marginTop: verticalScale(20),
        padding:10
    },
    headerText: {
        fontSize: moderateScale(18),
        color: "black",
        marginLeft: moderateScale(90),
        fontFamily: FONTS_FAMILY.Comfortaa_Bold,
    },
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        padding: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#888888',
        marginBottom: 10,
    },
    linkText: {
        fontSize: 16,
        color: '#007AFF',
        marginBottom: 5,
    },
});

export default ContactUsScreen;
