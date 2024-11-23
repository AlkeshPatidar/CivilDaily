import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    Share
} from 'react-native';
import Modal from 'react-native-modal'; // Modal package for drawer effect
import { moderateScale, verticalScale, } from 'react-native-size-matters';
import CustomText from './TextComponent';
import { FONTS_FAMILY } from '../assets/Fonts';
import { BookmarkSimple, Down, DownArrowCircle, Flag, Headset, Notepad, PencilLine, SignOut, Star } from '../assets/SVGs';
import Row from './wrapper/row';
import { getItem } from '../utils/Apis';
import { useTranslation } from 'react-i18next';
// import { EditIcon, BookmarkIcon, RateIcon, HelpIcon, ContactIcon, TermsIcon, LogoutIcon, LanguageIcon } from './assets/icons'; // Use your icons here

const DrawerModal = ({
    isModalVisible,
    toggleModal,
    navigation,
    isLanguage
}) => {


    const onInvite = async () => {
        try {
            const result = await Share.share({
                message: 'Check out this cool app! https://example.com', // Your message or URL here
            }, {
                // Ensure this targets WhatsApp by specifying the package
                dialogTitle: 'Share via',
                excludedActivityTypes: [], // You can exclude other apps if needed
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // Shared with activity type of result.activityType
                    console.log('Shared with activity type:', result.activityType);
                } else {
                    // Shared without specifying activity type
                    console.log('Shared successfully');
                }
            } else if (result.action === Share.dismissedAction) {
                // Dismissed
                console.log('Share dismissed');
            }
        } catch (error) {
            console.error('Error while sharing:', error.message);
        }
    };

    const { t, i18n } = useTranslation();



    const handleNavigation = (key) => {
        if (key == 'edit_profile') {
            navigation.navigate('EditProfile')
        }
        if (key == 'send_feedback') {
            navigation.navigate('ContactUsScreen')

        }
        if (key == 'rate_us') {
            navigation.navigate('SendFeedBack')
        }
        if (key == 'privacy_policy') {
            navigation.navigate('Privacy')
        }
        if (key == 'terms_and_conditions') {
            navigation.navigate('TermsAndConditons')
        }
        if (key == 'Rate Us') {
            navigation.navigate('RatingScreen')
        }
        if (key == 'Invite Freinds') {
            onInvite()
        }
        if (key == 'public_post') {
            navigation.navigate('News', { type: 'Public Post' })
        }
        if (key == 'user_search') {
            navigation.navigate('UserSearch')
        }

        if (key == 'questions') {
            navigation.navigate('QuestionsScreen')
        }

        if (key == 'top_news') {
            navigation.navigate('TopNews')
        }
        
        if (key == 'contact_us') {
            navigation.navigate('ContactUsScreen')
        }
        if (key == 'survey') {
            navigation.navigate('Survey')
        }
        if (key == 'influencers') {
            navigation.navigate('Influencers')
        }
        // TermsAndConditons
    }

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
                    <TouchableOpacity style={styles.menuItem}
                        onPress={() => navigation.navigate('LanguageSelection')}
                    >
                        <Flag />
                        <Text style={styles.menuText}>{t('language')}</Text>
                        <Row>
                            <Text style={styles.languageText}>{isLanguage == 'en' ? 'English' :
                                isLanguage == 'hi' ? "हिंदी" : isLanguage == 'kn' ? 'ಕನ್ನಡ' : null
                            }</Text>
                            <Down />
                        </Row>
                    </TouchableOpacity>

                    {/* Menu Items */}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {menuData.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.menuItem}
                                onPress={() => {
                                    handleNavigation(item?.title)
                                }}
                            >
                                {item.icon}
                                <Text style={styles.menuText}>{t(item.title)}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

const menuData = [
    { id: 1, title: 'edit_profile', icon: <PencilLine /> },
    { id: 2, title: 'send_feedback', icon: <Star /> },
    { id: 3, title: 'rate_us', icon: <Star /> },
    { id: 4, title: 'privacy_policy', icon: <Star /> },
    { id: 5, title: 'contact_us', icon: <Headset /> },
    { id: 6, title: 'public_post', icon: <Headset /> },
    { id: 7, title: 'user_search', icon: <Notepad /> },
    { id: 8, title: 'top_news', icon: <Notepad /> },
    { id: 9, title: 'survey', icon: <Notepad /> },
    { id: 10, title: 'influencers', icon: <Notepad /> },
    { id: 11, title: 'questions', icon: <Notepad /> },
    { id: 12, title: 'terms_and_conditions', icon: <Notepad /> },
    { id: 13, title: 'invite_friends', icon: <Notepad /> },
    { id: 14, title: 'log_out', icon: <SignOut /> },

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
            paddingVertical: verticalScale(10),
            borderBottomWidth: 1,
            borderBottomColor: '#E6E6E6',
        },
        menuText: {
            fontSize: moderateScale(14),
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
