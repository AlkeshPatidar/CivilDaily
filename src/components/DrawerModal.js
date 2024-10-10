import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';
import Modal from 'react-native-modal'; // Modal package for drawer effect
import { moderateScale, verticalScale } from 'react-native-size-matters';
import CustomText from './TextComponent';
import { FONTS_FAMILY } from '../assets/Fonts';
import { BookmarkSimple, Down, DownArrowCircle, Flag, Headset, Notepad, PencilLine, SignOut, Star } from '../assets/SVGs';
import Row from './wrapper/row';
// import { EditIcon, BookmarkIcon, RateIcon, HelpIcon, ContactIcon, TermsIcon, LogoutIcon, LanguageIcon } from './assets/icons'; // Use your icons here

const DrawerModal = ({
    isModalVisible,
    toggleModal,
    navigation
}) => {
    //   const [isModalVisible, setModalVisible] = useState(false);

    //   const toggleModal = () => {
    //     setModalVisible(!isModalVisible);
    //   };

    return (
        <View style={styles.container}>


            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                style={styles.modal}
                animationIn="slideInLeft"
                animationOut="slideOutLeft"
                hasBackdrop={true}
                backdropOpacity={0.7}
            >
                <View style={styles.drawer}>
                    {/* Profile Section */}
                    <TouchableOpacity style={styles.profileSection}
                        onPress={() => navigation.navigate('EditProfile')}
                    >
                        <Image
                            source={{ uri: 'https://via.placeholder.com/100' }} // Placeholder profile image
                            style={styles.profileImage}
                        />
                        <View>
                            <Text style={styles.userName}>Rahul Sharma</Text>
                            <Text style={styles.userEmail}>rahulsharma@gmail.com</Text>

                        </View>
                    </TouchableOpacity>

                    {/* Language Selector */}
                    <View style={styles.menuItem}>
                        <Flag />
                        <Text style={styles.menuText}>Language</Text>
                        <Row>
                            <Text style={styles.languageText}>English</Text>
                            <Down />
                        </Row>
                    </View>

                    {/* Menu Items */}
                    <ScrollView>
                        {menuData.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.menuItem}>
                                {item.icon}
                                <Text style={styles.menuText}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

const menuData = [
    { title: 'Edit Profile', icon: <PencilLine /> },
    { title: 'Bookmark', icon: <BookmarkSimple /> },
    { title: 'Rate this app', icon: <Star /> },
    { title: 'Help Centers', icon: <Headset /> },
    { title: 'Contact Us', icon: <Headset /> },
    { title: 'Terms & Condition', icon: <Notepad /> },
    { title: 'Log-out', icon: <SignOut /> },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-start',
    },
    drawer: {
        width: '80%',
        height: '100%',
        backgroundColor: '#fff',
        padding: moderateScale(20),
        // borderTopRightRadius: moderateScale(10),
        // borderBottomRightRadius: moderateScale(10),
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(20),
        gap: 10
    },
    profileImage: {
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: moderateScale(35),
        marginBottom: verticalScale(10),
    },
    userName: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        color: '#333',
    },
    userEmail: {
        fontSize: moderateScale(14),
        color: '#8A8A8A',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: verticalScale(15),
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
    },
    menuText: {
        fontSize: moderateScale(16),
        color: '#333',
        flex: 1,
        marginLeft: moderateScale(10),
        fontFamily: FONTS_FAMILY.Comfortaa_Regular
    },
    languageText: {
        fontSize: moderateScale(14),
        color: '#333',
    },
});

export default DrawerModal;
