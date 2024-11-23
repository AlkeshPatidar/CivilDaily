import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Image,
    ScrollView,
} from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { App_Primary_color, white } from "../../common/Colors/colors";
import { ImageEdit, NavBack, PodCastIcon, PostIcon, UploadIcon } from "../../assets/SVGs"; // Use your SVG icons here
import { FONTS_FAMILY } from "../../assets/Fonts"; // Import custom fonts
import CustomInputField from "../../components/wrapper/CustomInput";
import Row from "../../components/wrapper/row";
import CustomText from "../../components/TextComponent";
import { useTranslation } from "react-i18next";

const EditProfile = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <NavBack />
                </TouchableOpacity>
                <Text style={styles.headerText}>{t('edit_profile')}</Text>
            </View>

            {/* User Information */}
            <View style={styles.userRow}>
                <Image
                    source={{ uri: "https://via.placeholder.com/100" }} // Placeholder image or user's profile pic
                    style={styles.profileImage}
                />
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, left: 175 }}>
                    <ImageEdit />
                </TouchableOpacity>
            </View>

            <Row style={{ alignSelf: 'center', gap: 20, marginVertical: 20 }}>
                <TouchableOpacity style={{ alignItems: 'center' }}
                onPress={()=>navigation.navigate('Followers')}
                >
                    <CustomText style={{ fontFamily: FONTS_FAMILY.Comfortaa_Bold, fontSize: 14 }}>{t('followers')}</CustomText>
                    <CustomText>2</CustomText>

                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center' }}
                onPress={()=>navigation.navigate('Following')}
                >
                    <CustomText style={{ fontFamily: FONTS_FAMILY.Comfortaa_Bold, fontSize: 14 }}>{t('following')}</CustomText>
                    <CustomText>2</CustomText>

                </TouchableOpacity>
            </Row>

            <View style={{ marginTop: 30, gap: 50 }}>
                <CustomInputField
                    // iconName="lock"
                    label={'username'}
                    placeholder="Rahul"
                />
                <CustomInputField
                    // iconName="lock"
                    label={'full_name'}
                    placeholder="Rahul Sharma"
                />
                <CustomInputField
                    // iconName="lock"
                    label={'email_address'}
                    placeholder="rahul@gmail.com"
                />
                <CustomInputField
                    // iconName="lock"
                    label={'phone_number'}
                    placeholder="9999999999"
                />
                <CustomInputField
                    // iconName="lock"
                    label={'bio'}
                    placeholder="Lorem Ipsum is simply dummy text of "
                />
            </View>

            {/* Post Button */}
            <TouchableOpacity style={styles.postButton}>
                <Text style={styles.postButtonText}>{t('post')}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: white,
        paddingHorizontal: moderateScale(20),
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: verticalScale(20),
    },
    headerText: {
        fontSize: moderateScale(18),
        color: "black",
        marginLeft: moderateScale(90),
        fontFamily: FONTS_FAMILY.Comfortaa_Bold,
    },
    userRow: {
        alignItems: "center",
        marginTop: verticalScale(30),
    },
    profileImage: {
        width: moderateScale(90),
        height: moderateScale(90),
        borderRadius: moderateScale(100),
    },
    userInfo: {
        marginLeft: moderateScale(15),
    },
    userName: {
        fontSize: moderateScale(16),
        color: "black",
        fontFamily: FONTS_FAMILY.Comfortaa_Bold,
    },
    publicText: {
        fontSize: moderateScale(12),
        color: "#8A8A8A",
        fontFamily: FONTS_FAMILY.Comfortaa_Regular,
    },
    inputContainer: {
        // flexDirection: "row",
        // alignItems: "center",
        marginTop: verticalScale(20),
        borderWidth: 1,
        borderColor: "#E6E6E6",
        borderRadius: moderateScale(10),
        paddingHorizontal: moderateScale(10),
        // paddingVertical: verticalScale(10),
        height: 150,
        backgroundColor: 'rgba(248, 248, 248, 1)'
    },
    textInput: {
        // flex: 1,
        fontSize: moderateScale(14),
        color: "black",
        fontFamily: FONTS_FAMILY.Comfortaa_Regular,
    },
    titleInput: {
        flex: 1,
        fontSize: moderateScale(14),
        color: "black",
        fontFamily: FONTS_FAMILY.Comfortaa_Regular,
    },
    iconButton: {
        marginLeft: moderateScale(10),
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    uploadContainer: {
        marginTop: verticalScale(20),
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: moderateScale(10),
        padding: verticalScale(20),
        justifyContent: "center",
        alignItems: "center",
        height: 150,
        borderStyle: 'dashed'
    },
    uploadButton: {
        // flexDirection: "row",
        alignItems: "center",
    },
    uploadText: {
        fontSize: moderateScale(14),
        color: "#8A8A8A",
        fontFamily: FONTS_FAMILY.Comfortaa_Regular,
        marginLeft: moderateScale(10),
    },
    postButton: {
        backgroundColor: App_Primary_color,
        borderRadius: moderateScale(4),
        paddingVertical: verticalScale(8),
        alignItems: "center",
        marginVertical: verticalScale(30),

    },
    postButtonText: {
        fontSize: moderateScale(16),
        color: white,
        fontFamily: FONTS_FAMILY.Comfortaa_Bold,
    },
});

export default EditProfile;
