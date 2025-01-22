import React, { useEffect, useState } from "react";
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
import urls from "../../config/urls";
import { apiGet } from "../../utils/Apis";
import useLoader from "../../utils/LoaderHook";
import moment from "moment"
import { useIsFocused } from "@react-navigation/native";

const Reminder = ({ navigation }) => {
    const { showLoader, hideLoader } = useLoader()
    const [allProduct, setAllProduct] = useState([])
    const isFocused = useIsFocused()


    useEffect(() => {
        fetchData()
    }, [isFocused])

    const fetchData = async () => {
        try {
            showLoader()
            const response = await apiGet(urls.getAllnotes);
            console.log('-------------', response);
            if (response?.statusCode === 200) {
                console.log('=======RETUEN===', response?.message);
                setAllProduct(response?.data)
                hideLoader()

            }

        } catch (error) {
            console.log('Error fetching user data:', error);
            // ToastMsg(error?.message || 'Network Error');
            hideLoader()
        }
    };

    const renderHeader = () => {
        return (
            <SpaceBetweenRow>
            <Row style={{ gap: 20, marginTop: 50, marginHorizontal: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BlackBack />
                </TouchableOpacity>
                <CustomText style={{
                    color: 'black',
                    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
                    fontSize: 18
                }}>All Notes</CustomText>

            </Row>
            <TouchableOpacity
            onPress={()=>navigation.navigate('AddNoteScreen')}
            >
            <CustomText style={{
                    color: App_Primary_color,
                    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
                    fontSize: 16,
                    marginTop: 50,
                    paddingHorizontal:20
                }}>Add Events</CustomText>

            </TouchableOpacity>

            </SpaceBetweenRow>
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


        return (
            <View style={{ flex: 1, marginBottom: 100 }}>
                <FlatList
                    data={allProduct}
                    keyExtractor={(item) => item._id} // Ensure unique keys
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Profile')}
                            style={{
                                // padding: 12,
                                backgroundColor: "white",
                                marginTop: 8,
                                width: "97%",
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
                                height: 80,
                                padding: 10
                            }}
                        >
                            {console.log(item, '------------')}

                            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>

                                <View>
                                    <CustomText
                                        style={{
                                            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
                                            fontSize: 14,
                                        }}
                                    >
                                        {item?.eventName}
                                    </CustomText>
                                    <Row style={{ gap: 5 }}>
                                        <CustomText
                                            style={{
                                                fontFamily: FONTS_FAMILY.Poppins_Medium,
                                                fontSize: 12,
                                                color: "rgba(151, 151, 151, 1)",
                                            }}
                                        >
                                            {item.location}
                                        </CustomText>
                                    </Row>
                                    <CustomText
                                        style={{
                                            fontFamily: FONTS_FAMILY.Poppins_Regular,
                                            fontSize: 12,
                                            color: "rgba(151, 151, 151, 1)",
                                        }}
                                    >
                                        {item.description}
                                    </CustomText>
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
                                        color: "rgba(60, 62, 86, 1)",
                                        paddingRight: 10
                                    }}
                                >
                                    {moment(item.eventDate)?.format('DD/MMM/YY')}
                                </CustomText>


                            </View>
                        </TouchableOpacity>
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

export default Reminder;