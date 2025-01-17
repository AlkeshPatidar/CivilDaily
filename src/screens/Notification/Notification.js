import React from "react";
import { FlatList, Image, ScrollView, StatusBar, TextInput, TouchableOpacity, View } from "react-native";
import CustomText from "../../components/TextComponent";
import color, { App_Primary_color } from "../../common/Colors/colors";
import Row from "../../components/wrapper/row";
import { BackArrow, BcIcon, BlackBack, BlueForword, BlueLocation, EyeIcon, ForwardIcon, LoginLogo, NotiIcon, RedPolygon, SearchIcon, SearchIcons, SignUPLogo } from "../../assets/SVGs";
import { FONTS_FAMILY } from "../../assets/Fonts";
import CustomInputField from "../../components/wrapper/CustomInput";
import CustomButton from "../../components/Button";
import SpaceBetweenRow from "../../components/wrapper/spacebetween";
import IMG from "../../assets/Images";

const Notification = ({ navigation }) => {

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
                }}>Notification</CustomText>

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
                title: "Ronald C. Kinch  Replaced You \n products",
                quantity: 'Banglore',
                image: "url_to_electrical_wire_image",
                status: "1 hr ago",
            },
            {
                id: 2,
                title: "Ronald C. Kinch  Replaced You \n products",
                
                quantity: 'Delhi',
                image: "url_to_camera_image",
                status: "1 hr ago",
            },
            {
                id: 3,
                title: "Ronald C. Kinch  Replaced You \n products",
                
                quantity: 'Indore',
                image: "url_to_led_light_image",
                status: "1 hr ago",
            },
            {
                id: 4,
                title: "Ronald C. Kinch  Replaced You \n products",
                
                quantity: 'Banglore',
                image: "url_to_led_light_image",
                status: "1 hr ago",
            },
            {
                id: 5,
                title: "Ronald C. Kinch  Replaced You \n products",
                
                quantity: 'Delhi',
                image: "url_to_led_light_image",
                status: "1 hr ago",
            },
            {
                id: 6,
                title: "Ronald C. Kinch  Replaced You \n products",
                
                quantity: 'Indore',
                image: "url_to_led_light_image",
                status: "1 hr ago",
            },
            {
                id: 7,
                title: "Ronald C. Kinch  Replaced You \n products",
                
                quantity: 'Indore',
                image: "url_to_led_light_image",
                status: "1 hr ago",
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
                                // elevation: 1, // Android shadow
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
                          
                                <CustomText
                                    style={{
                                        fontFamily: FONTS_FAMILY.Poppins_Medium,
                                        fontSize: 10,
                                        color: "rgba(60, 62, 86, 1)",
                                    }}
                                >
                                    {item.status}
                                </CustomText>
                               

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

export default Notification;