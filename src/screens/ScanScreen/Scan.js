import React from "react";
import { FlatList, Image, ScrollView, StatusBar, TextInput, TouchableOpacity, View } from "react-native";
import CustomText from "../../components/TextComponent";
import color, { App_Primary_color } from "../../common/Colors/colors";
import Row from "../../components/wrapper/row";
import { BackArrow, BcIcon, BlackBack, BlueForword, BlueLocation, Code, EyeIcon, ForwardIcon, ImageCover, LoginLogo, NotiIcon, RedPolygon, SearchIcon, SearchIcons, SignUPLogo } from "../../assets/SVGs";
import { FONTS_FAMILY } from "../../assets/Fonts";
import CustomInputField from "../../components/wrapper/CustomInput";
import CustomButton from "../../components/Button";
import SpaceBetweenRow from "../../components/wrapper/spacebetween";
import IMG from "../../assets/Images";

const Scan = ({ navigation }) => {

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
                }}>Scan Barcode</CustomText>

            </Row>
        )
    }




    const renderWhiteBgItmes = () => {
        return (
            <ScrollView contentContainerStyle={{
                flex: 1,
                // backgroundColor: 'rgba(255, 255, 255, 1)',
                marginTop: 0,
                // borderTopLeftRadius: 30,
                // borderTopRightRadius: 30,
                paddingHorizontal: 20,
                paddingVertical: 20,
                alignItems: 'center'
            }}>

                <CustomText style={{
                    fontSize: 20,
                    fontFamily: FONTS_FAMILY.Poppins_Medium,
                    textAlign: 'center'
                }}>Place Your Barcode In {'\n'}Scan Area </CustomText>
                <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <ImageCover />
                    <Code style={{ position: 'absolute', top: 55 }} />
                </View>
            </ScrollView>
        )
    }






    return (
        <View style={{
            // backgroundColor: App_Primary_color,
            flex: 1,
            marginHorizontal: 20
        }}>
            <StatusBar
                translucent={true}
                backgroundColor="transparent"
                barStyle="dark-content"
            />
            {renderHeader()}
            {renderWhiteBgItmes()}
            <CustomButton
                title={'Scaning.....'}
                style={{
                    position:'absolute',
                    bottom:50
                }}
                onPress={()=>navigation.navigate('AddIssues')}
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

export default Scan;