import React from "react";
import { FlatList, Image, ScrollView, StatusBar, TextInput, TouchableOpacity, View } from "react-native";
import CustomText from "../components/TextComponent";
import color, { App_Primary_color } from "../common/Colors/colors";
import Row from "../components/wrapper/row";
import { BackArrow, BcIcon, BlackBack, BlueForword, BlueLocation, EyeIcon, ForwardIcon, LoginLogo, NotiIcon, RedPolygon, SearchIcon, SearchIcons, SignUPLogo } from "../assets/SVGs";
import { FONTS_FAMILY } from "../assets/Fonts";
import CustomInputField from "../components/wrapper/CustomInput";
import CustomButton from "../components/Button";
import SpaceBetweenRow from "../components/wrapper/spacebetween";
import IMG from "../assets/Images";

const Information = ({ navigation }) => {

    const renderHeader = () => {
        return (
            <Row style={{ gap: 20, marginTop: 50, marginHorizontal: 20 }}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                <BlackBack />
                </TouchableOpacity>
                <CustomText style={{
                    color: 'black',
                    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
                    fontSize: 18
                }}>Information</CustomText>

            </Row>
        )
    }




    const renderWhiteBgItmes = () => {
        return (
            <ScrollView style={{
                flex: 1,
                // backgroundColor: 'rgba(255, 255, 255, 1)',
                marginTop: 0,
                // borderTopLeftRadius: 30,
                // borderTopRightRadius: 30,
                paddingHorizontal: 20,
                paddingVertical: 20
            }}>


                {renderItems()}
            </ScrollView>
        )
    }

    const renderItems = () => {
        const data = [
            {
                id: 1,
                title: "Electrical wire",
                quantity: 'Banglore',
                image: "url_to_electrical_wire_image",
                status: "Out of stock",
            },
            {
                id: 2,
                title: "Camera",
                quantity: 'Delhi',
                image: "url_to_camera_image",
                status: "Out of stock",
            },
            {
                id: 3,
                title: "Led Light",
                quantity: 'Indore',
                image: "url_to_led_light_image",
                status: "Out of stock",
            },
            {
                id: 4,
                title: "Led Light",
                quantity: 'Banglore',
                image: "url_to_led_light_image",
                status: "Out of stock",
            },
            {
                id: 5,
                title: "Led Light",
                quantity: 'Delhi',
                image: "url_to_led_light_image",
                status: "Out of stock",
            },
            {
                id: 6,
                title: "Led Light",
                quantity: 'Indore',
                image: "url_to_led_light_image",
                status: "Out of stock",
            },
            {
                id: 7,
                title: "Led Light",
                quantity: 'Indore',
                image: "url_to_led_light_image",
                status: "Out of stock",
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
                                backgroundColor: "white",
                                marginTop: 8,
                                width: "97%",
                                elevation: 3, // Android shadow
                                shadowColor: "#000", // iOS shadow color
                                shadowOffset: { width: 0, height: 4 }, // Offset for shadow
                                shadowOpacity: 0.3, // Opacity for shadow
                                shadowRadius: 4, // Spread radius for shadow
                                borderRadius: 10,
                                margin: 9,
                                alignSelf: "center",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                <Image
                                    source={IMG.AvatorImage} // Replace with your default image or a placeholder
                                    style={{
                                        height: 42,
                                        width: 42,
                                        borderRadius: 21,
                                    }}
                                />
                                <View>
                                    <CustomText
                                        style={{
                                            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
                                            fontSize: 14,
                                        }}
                                    >
                                        {item.title}
                                    </CustomText>
                                    <Row style={{ gap: 5 }}>
                                        <BlueLocation />
                                        <CustomText
                                            style={{
                                                fontFamily: FONTS_FAMILY.Poppins_SemiBold,
                                                fontSize: 12,
                                                color: "rgba(151, 151, 151, 1)",
                                            }}
                                        >
                                            {item.quantity}
                                        </CustomText>
                                    </Row>
                                </View>
                            </View>
                            <View style={{
                                alignItems: 'center',
                                gap: 8
                            }}>
                                <CustomText
                                    style={{
                                        fontFamily: FONTS_FAMILY.Poppins_Medium,
                                        fontSize: 10,
                                        color: "red",
                                    }}
                                >
                                    {item.status}
                                </CustomText>
                                <View style={{ height: 30, width: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 100, backgroundColor: 'rgba(230, 48, 100, 1)' }}>
                                    <CustomText style={{ color: 'white', fontSize: 14 }}>14</CustomText>
                                </View>

                            </View>
                        </View>
                    )}
                />
            </View>
        );
    };




    return (
        <View style={{
            // backgroundColor: App_Primary_color,
            flex: 1
        }}>
            <StatusBar
                translucent={true}
                backgroundColor="transparent"
                barStyle="dark-content"
            />
            {renderHeader()}
            {renderWhiteBgItmes()}


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

export default Information;