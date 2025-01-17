import React from "react";
import { FlatList, Image, ScrollView, StatusBar, TextInput, TouchableOpacity, View } from "react-native";
import CustomText from "../../components/TextComponent";
import color, { App_Primary_color } from "../../common/Colors/colors";
import Row from "../../components/wrapper/row";
import { BackArrow, BcIcon, BlackBack, BlueForword, BlueLocation, EyeIcon, ForwardIcon, LoginLogo, NotiIcon, PhotoPick, RedPolygon, SearchIcon, SearchIcons, SignUPLogo } from "../../assets/SVGs";
import { FONTS_FAMILY } from "../../assets/Fonts";
import CustomInputField from "../../components/wrapper/CustomInput";
import CustomButton from "../../components/Button";
import SpaceBetweenRow from "../../components/wrapper/spacebetween";
import IMG from "../../assets/Images";
import { positionStyle } from "react-native-flash-message";

const AddIssues = ({ navigation }) => {

    const renderHeader = () => {
        return (
            <Row style={{ gap: 20, marginTop: 50,  }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BlackBack />
                </TouchableOpacity>
                <CustomText style={{
                    color: 'black',
                    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
                    fontSize: 18
                }}>Add issues</CustomText>

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
                paddingVertical: 20
            }}>
                <View style={{ gap: 20 }}>
                    <CustomInputField
                        label={'Product Name'}
                        placeholder={'Camera'}
                        value={'Camera'}
                    />

                    <CustomInputField
                        label={'Description'}
                        placeholder={'Is Not Working '}
                        value={'Is Not Working'}

                    />

                    <TouchableOpacity style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: 'rgba(203, 203, 203, 1)',
                        height: 146,
                        width: 114,
                        borderRadius: 10
                    }}>
                        <PhotoPick />
                    </TouchableOpacity>

                </View>

            </ScrollView>
        )
    }






    return (
        <View style={{
            // backgroundColor: App_Primary_color,
            flex: 1,
            marginHorizontal:20
        }}>
            <StatusBar
                translucent={true}
                backgroundColor="transparent"
                barStyle="dark-content"
            />
            {renderHeader()}
            {renderWhiteBgItmes()}

            <CustomButton
                title={'Submit'}
                style={{
                    position: 'absolute',
                    bottom: 50,
                    marginHorizontal:20
                }}
                onPress={()=>navigation.navigate('DamageHistory')}
            />
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

export default AddIssues;