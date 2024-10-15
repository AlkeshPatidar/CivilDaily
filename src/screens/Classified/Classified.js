// import React, { useState } from "react";
// import { Image, ImageBackground, ScrollView, TouchableOpacity, View } from "react-native";
// import CustomText from "../../components/TextComponent";



// const Classified = ({ navigation }) => {

//     return (
//         <View style={{ flex: 1 }}>
//             <CustomText>Classified</CustomText>
//         </View>

//     )
// }

// export default Classified;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AddNewsIcon, Down, MenuIcon, ProfileIcon } from '../../assets/SVGs';
// import { ProfileIcon } from '../../assets/Images';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { FONTS_FAMILY } from '../../assets/Fonts';
import Row from '../../components/wrapper/row';
import color, { App_Primary_color } from '../../common/Colors/colors';
import DrawerModal from '../../components/DrawerModal';

const Classified = ({ navigation }) => {
    const [selectedTab, setSelectedTab] = useState('All');

    const tabs = ['All', 'Rentals', 'Services', 'Jobs'];


    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const Header = () => {
        return (
            <View style={styles.headerContainer}>
                <Row style={{ gap: 30, alignItems: 'center' }}>
                    <TouchableOpacity onPress={toggleModal}>
                        <MenuIcon />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('LocationSelection')}>
                        <Row style={{ gap: 10, alignItems: 'center' }}>
                            <Text style={{ ...styles.headerTitle }}>Mysore</Text>
                            <Down style={{ top: 3 }} />
                        </Row>

                    </TouchableOpacity>

                </Row>
                <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                    <ProfileIcon />
                </TouchableOpacity>
            </View>
        );
    };

    const renderTabs = () => {
        return (
            <View style={styles.tabContainer}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[
                            styles.tabButton,
                            selectedTab === tab && styles.activeTabButton,
                        ]}
                        onPress={() => setSelectedTab(tab)}
                    >
                        <Text style={[
                            styles.tabText,
                            selectedTab === tab && styles.activeTabText]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }

    const renderNoData = () => {
        return (
            <View style={styles.messageContainer}>
                <Text style={styles.messageText}>
                    No data found for selected category
                </Text>
                <Text style={styles.subText}>
                    Contact for advertisements
                </Text>
            </View>
        )
    }

    const renderDrawer = () => {
        return <DrawerModal
            isModalVisible={isModalVisible}
            toggleModal={toggleModal}
            navigation={navigation}
        />
    }

    const renderAddPostOption = () => {
        return (
            <TouchableOpacity style={{
                height: 50,
                width: 50,
                backgroundColor: App_Primary_color,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
                position: 'absolute',
                bottom: 100,
                right: 10
            }}
                onPress={() => navigation.navigate('ShareScreen')}
            >
                <AddNewsIcon />
            </TouchableOpacity>
        )
    }

    return (
        <>
            {/* {Header()} */}
            <View style={styles.container}>
                {/* Tab Buttons */}
                {renderTabs()}

                {/* No Data Message */}
                {renderNoData()}
                {renderDrawer()}
                {/* {renderAddPostOption()} */}
            </View>
        </>

    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        paddingTop: 20, // Adjust as per header height
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // marginVertical: 10,
    },
    tabButton: {
        // paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: color.App_Primary_color,
    },
    activeTabButton: {
        backgroundColor: color.App_Primary_color,
    },
    tabText: {
        color: color.App_Primary_color,
        fontSize: 16,
    },
    activeTabText: {
        color: '#fff',
    },
    messageContainer: {
        // flex: 1,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageText: {
        color: '#9e9e9e',
        fontSize: 16,
    },
    subText: {
        color: '#9e9e9e',
        fontSize: 14,
        marginTop: 5,
    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingVertical: verticalScale(10),
        padding: 20
    },
    menuIcon: {
        fontSize: moderateScale(24),
    },
    headerTitle: {
        fontSize: moderateScale(16),
        color: 'black',
        fontFamily: FONTS_FAMILY.Comfortaa_Medium
    },
});

export default Classified;
