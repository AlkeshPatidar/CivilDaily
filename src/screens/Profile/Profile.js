import React from "react";
import { FlatList, Image, ScrollView, StatusBar, TextInput, TouchableOpacity, View } from "react-native";
import CustomText from "../../components/TextComponent";
import color, { App_Primary_color } from "../../common/Colors/colors";
import Row from "../../components/wrapper/row";
import { BackArrow, BcIcon, BlueForword, BlueLocation, Chart, EyeIcon, ForwardIcon, LoginLogo, LogOut, NotiIcon, ProfIcon, RedPolygon, SearchIcon, SearchIcons, Setting, SignUPLogo } from "../../assets/SVGs";
import { FONTS_FAMILY } from "../../assets/Fonts";
import CustomInputField from "../../components/wrapper/CustomInput";
import CustomButton from "../../components/Button";
import SpaceBetweenRow from "../../components/wrapper/spacebetween";
import IMG from "../../assets/Images";

const Profile = ({ navigation }) => {

    const renderHeader = () => {
        return (
            <View style={{ marginTop: 35, gap: 30, backgroundColor: App_Primary_color, paddingHorizontal: 20, height: 200, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                <Row style={{ gap: 20, marginTop: 40 }}>
                    <BackArrow />
                    <CustomText style={{
                        color: 'white',
                        fontFamily: FONTS_FAMILY.Poppins_Regular,
                        fontSize: 20
                    }}>Profile</CustomText>

                </Row>

            </View>
        )
    }




    const renderWhiteBgItmes = () => {
        return (
            <ScrollView style={{
                flex: 1,
                paddingHorizontal: 20,
                paddingVertical: 20,
                marginTop: 50,
                // alignSelf:'center',
                marginLeft: 15
            }}>



                {renderItems()}
            </ScrollView>
        )
    }

    const renderItems = () => {
        const data = [
            {
                id: 1,
                title: "My Profile",
                icon: <ProfIcon />
            },
            {
                id: 2,
                title: "Statistic",
                icon: <Chart />
            },
            {
                id: 3,
                title: "Location",
                icon: <BlueLocation height={23} width={23} />
            },
            {
                id: 4,
                title: "Settings",
                icon: <Setting />

            },
            {
                id: 5,
                title: "Logout",
                icon: <LogOut />

            },

        ];

        return (
            <View style={{ flex: 1, marginBottom: 100 }}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()} // Ensure unique keys
                    renderItem={({ item }) => (
                        <View
                            style={{
                                padding: 12,
                                marginTop: 8,
                                width: "97%",
                                shadowOpacity: 0.3,
                                shadowRadius: 4,
                                borderRadius: 10,
                                margin: 9,
                                alignSelf: "center",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                                {item?.icon}
                                <View>
                                    <CustomText
                                        style={{
                                            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
                                            fontSize: 14,
                                        }}
                                    >
                                        {item.title}
                                    </CustomText>

                                </View>
                            </View>

                        </View>
                    )}
                />
            </View>
        );
    };

    const renderUserCard = () => {
        return (
            <View style={{
                backgroundColor: 'white',
                height: 138,
                width: 320,
                alignSelf: 'center',
                position: 'absolute',
                top: 150,
                elevation: 3,
                borderRadius: 10
            }}>
                <Image source={IMG.userProfileImage}
                    style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        top: -40,
                        height: 70,
                        width: 70
                    }}
                />
                <View style={{ alignSelf: 'center', marginTop: 40, alignItems: 'center' }}>
                    <CustomText style={{ color: App_Primary_color, fontSize: 16, fontFamily: FONTS_FAMILY.Poppins_Medium }}>Phillip Williamson</CustomText>
                    <CustomText style={{ color: 'rgba(74, 70, 70, 1)', fontSize: 14, fontFamily: FONTS_FAMILY.Poppins_Regular, }}>Staff</CustomText>
                    <Row style={{ gap: 5, alignItems: 'center' }}>
                        <BlueLocation />
                        <CustomText style={{ color: 'rgba(74, 70, 70, 1)', fontSize: 12, fontFamily: FONTS_FAMILY.Poppins_Regular, }}>Malang, Indonesia</CustomText>

                    </Row>

                </View>

            </View>
        )
    }


    return (
        <View style={{
            // backgroundColor: 'white',
            flex: 1,
        }}>
            <StatusBar
                translucent={true}
                backgroundColor={App_Primary_color}
                barStyle="light-content"
            />
            {renderHeader()}
            {renderWhiteBgItmes()}
            {renderUserCard()}

            <View style={{
                height: 5,
                width: 134,
                backgroundColor: 'rgba(202, 202, 202, 1)',
                alignSelf: 'center',
                position: 'absolute',
                bottom: 8,
                borderRadius: 8
            }} />
        </View>
    )
}

export default Profile;