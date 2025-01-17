import React from "react";
import { ScrollView, StatusBar, TouchableOpacity, View } from "react-native";
import CustomText from "../../components/TextComponent";
import color, { App_Primary_color } from "../../common/Colors/colors";
import Row from "../../components/wrapper/row";
import { BackArrow, EyeIcon, LoginLogo, SignUPLogo } from "../../assets/SVGs";
import { FONTS_FAMILY } from "../../assets/Fonts";
import CustomInputField from "../../components/wrapper/CustomInput";
import CustomButton from "../../components/Button";

const SignUp = ({ navigation }) => {

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
                }}>Sign up</CustomText>
            </Row>
        )
    }


    const renderLogoAndInputItems = () => {
        return (
            <View style={{ alignItems: 'center', marginTop: 30, gap: 18 }}>
                <SignUPLogo />
                <View style={{ gap: 20 }}>
                    <CustomInputField
                        placeholder={'Name'}
                    />
                    <CustomInputField
                        placeholder={'Email'}
                    />

                    <CustomInputField
                        placeholder={'Password'}
                        icon={<EyeIcon />}
                    />
                    <Row>

                    <CustomText style={{
                        // alignSelf: 'flex-end',
                        color: 'rgba(202, 202, 202, 1)',
                        fontFamily: FONTS_FAMILY.Poppins_Medium,
                        fontSize:12,
                        color:'black'
                    }}>By creating an account your agree{'\n'}
                        to our <CustomText style={{
                            color: App_Primary_color,
                            fontFamily: FONTS_FAMILY.Poppins_Medium,
                            fontSize:12,
                        }}>Term and Condtions</CustomText> </CustomText>
                    </Row>
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
                }}>Welcome to us,</CustomText>
                <CustomText
                    style={{
                        fontSize: 12,
                        fontFamily: FONTS_FAMILY.Poppins_Medium
                    }}
                >Hello there, create New account</CustomText>
                {renderLogoAndInputItems()}
                {renderButton()}

            </ScrollView>
        )
    }


    const renderButton = () => {
        return (
            <View style={{ alignItems: 'center' }}>
                <CustomButton
                    style={{ marginTop: 27 }}
                    title={'Sign Up'}
                    onPress={() => navigation.navigate('Login')}
                    
                />
                <Row style={{ gap: 10, marginTop: 20 }}>
                    <CustomText
                        style={{
                            fontSize: 12,
                            fontFamily: FONTS_FAMILY.Poppins_Medium
                        }}
                    >Have an account?  </CustomText>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >

                        <CustomText
                            style={{
                                fontSize: 12,
                                fontFamily: FONTS_FAMILY.Poppins_Medium,
                                color: App_Primary_color
                            }}
                        >Log In </CustomText>
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

export default SignUp;