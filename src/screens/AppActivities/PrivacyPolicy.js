import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { NavBack } from '../../assets/SVGs';

const PrivacyPolicy = ({ navigation }) => {

    const renderHeader = () => {
        return (
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <NavBack />
                </TouchableOpacity>
                <Text style={styles.headerText}>Privacy Policy</Text>
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
                        We are committed to protecting your personal information and your right to privacy. 
                        If you have any questions or concerns about our policy, or our practices with regards 
                        to your personal information, please contact us at help@company.com.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Information We Collect</Text>
                    <Text style={styles.sectionText}>
                        We collect personal information that you voluntarily provide to us when registering at the services, 
                        expressing an interest in obtaining information about us or our products and services, when participating 
                        in activities on the services or otherwise contacting us.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>How We Use Your Information</Text>
                    <Text style={styles.sectionText}>
                        We use personal information collected via our services for a variety of business purposes described 
                        below. We process your personal information for these purposes in reliance on our legitimate business 
                        interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance 
                        with our legal obligations.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Sharing Your Information</Text>
                    <Text style={styles.sectionText}>
                        We may process or share data based on the following legal basis: consent, legitimate interests, performance 
                        of a contract, legal obligations, vital interests, and more. We will only share information where it is 
                        necessary and legal to do so.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact Us</Text>
                    <Text style={styles.sectionText}>
                        If you have questions or comments about this policy, you may email us at help@company.com or contact us 
                        at our office address.
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
        marginLeft: moderateScale(90),
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

export default PrivacyPolicy;
