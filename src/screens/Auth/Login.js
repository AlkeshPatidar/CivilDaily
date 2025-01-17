import React from "react";
import { ScrollView, StatusBar, TouchableOpacity, View } from "react-native";
import CustomText from "../../components/TextComponent";
import color, { App_Primary_color } from "../../common/Colors/colors";
import Row from "../../components/wrapper/row";
import { BackArrow, EyeIcon, LoginLogo } from "../../assets/SVGs";
import { FONTS_FAMILY } from "../../assets/Fonts";
import CustomInputField from "../../components/wrapper/CustomInput";
import CustomButton from "../../components/Button";

const Login = ({ navigation }) => {

    const renderHeader = () => {
        return (
            <Row style={{ marginTop: 50, marginHorizontal: 20, gap: 30 }}>
                <TouchableOpacity>
                    <BackArrow />
                </TouchableOpacity>
                <CustomText style={{
                    color: 'white',
                    fontFamily: FONTS_FAMILY.Poppins_Medium,
                    fontSize: 20
                }}>Log in</CustomText>
            </Row>
        )
    }


    const renderLogoAndInputItems = () => {
        return (
            <View style={{ alignItems: 'center', marginTop: 30, gap: 20 }}>
                <LoginLogo />
                <View style={{ gap: 25 }}>
                    <CustomInputField
                        placeholder={'Email'}
                    />

                    <CustomInputField
                        placeholder={'Password'}
                        icon={<EyeIcon />}
                    />
                    <CustomText style={{
                        alignSelf: 'flex-end',
                        color: 'rgba(202, 202, 202, 1)',
                        fontFamily: FONTS_FAMILY.Poppins_Medium
                    }}>Forgot your password ?</CustomText>
                </View>
            </View>
        )
    }

    const renderWhiteBgItmes = () => {
        return (
            <ScrollView style={{
                flex: 1,
                backgroundColor: 'white',
                marginTop: 30,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                paddingHorizontal: 20,
                paddingVertical: 20
            }}>

                <CustomText style={{
                    color: App_Primary_color,
                    fontSize: 24,
                    fontFamily: FONTS_FAMILY.Poppins_SemiBold
                }}>Welcome Back</CustomText>
                <CustomText
                    style={{
                        fontSize: 12,
                        fontFamily: FONTS_FAMILY.Poppins_Medium
                    }}
                >Hello there, Log in to continue</CustomText>
                {renderLogoAndInputItems()}
                {renderButton()}

            </ScrollView>
        )
    }


    const renderButton = () => {
        return (
            <View style={{ alignItems: 'center' }}>
                <CustomButton
                    style={{ marginTop: 40 }}
                    title={'Log in'}
                    onPress={() => navigation.navigate('Tab')}

                />
                <Row style={{ gap: 10, marginTop: 20 }}>
                    <CustomText
                        style={{
                            fontSize: 12,
                            fontFamily: FONTS_FAMILY.Poppins_Medium
                        }}
                    >Don't have an account? </CustomText>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                    >

                        <CustomText
                            style={{
                                fontSize: 12,
                                fontFamily: FONTS_FAMILY.Poppins_Medium,
                                color: App_Primary_color
                            }}
                        >Sign Up </CustomText>
                    </TouchableOpacity>
                </Row>
            </View>
        )
    }

    return (
        <View style={{
            backgroundColor: App_Primary_color,
            flex: 1
        }}>
            <StatusBar
                translucent={true}
                backgroundColor="transparent"
                barStyle="light-content"
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

export default Login;