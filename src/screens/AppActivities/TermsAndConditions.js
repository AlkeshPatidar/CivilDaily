import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { NavBack } from '../../assets/SVGs';

const TermsCondition = ({ navigation }) => {

    const renderHeader = () => {
        return (
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <NavBack />
                </TouchableOpacity>
                <Text style={styles.headerText}>Terms & Conditions</Text>
            </View>
        )
    }

    return (
        <>
            {renderHeader()}
            <ScrollView style={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            >
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Introduction</Text>
                    <Text style={styles.sectionText}>
                        By accessing or using our service, you agree to comply with and be bound by the following terms and conditions.
                        Please review them carefully. If you do not agree to these terms, you should not use our services.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Use of Services</Text>
                    <Text style={styles.sectionText}>
                        You agree to use our services only for lawful purposes and in a way that does not infringe the rights of others or restrict 
                        or inhibit their use and enjoyment of the services.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account Responsibility</Text>
                    <Text style={styles.sectionText}>
                        You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Limitation of Liability</Text>
                    <Text style={styles.sectionText}>
                        In no event shall we be liable for any damages, including but not limited to direct, indirect, incidental, punitive, and consequential 
                        damages, arising out of your use or inability to use the service.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Changes to Terms</Text>
                    <Text style={styles.sectionText}>
                        We reserve the right to modify these terms at any time. Any changes to the terms will be posted on this page and will take effect immediately 
                        upon posting. Your continued use of the service after any changes have been made constitutes your acceptance of the new terms.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact Us</Text>
                    <Text style={styles.sectionText}>
                        If you have any questions or concerns about these terms, you may contact us at support@company.com.
                    </Text>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    },
    headerText: {
        fontSize: moderateScale(18),
        color: "black",
        marginLeft: moderateScale(50),
        fontFamily: FONTS_FAMILY.Comfortaa_Bold,
    },
    contentContainer: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: verticalScale(20),
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: moderateScale(16),
        fontFamily: FONTS_FAMILY.Comfortaa_Bold,
        color: 'black',
        marginBottom: 10,
    },
    sectionText: {
        fontSize: moderateScale(14),
        fontFamily: FONTS_FAMILY.Comfortaa_Regular,
        color: '#555555',
        lineHeight: moderateScale(20),
    }
});

export default TermsCondition;
