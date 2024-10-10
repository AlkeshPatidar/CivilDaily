import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View, VirtualizedList } from 'react-native';
import React, { useEffect } from 'react';
import CustomText from '../../components/TextComponent';
import color, { App_Primary_color, black, gray } from '../../common/Colors/colors';
import IMG from '../../assets/Images';
import CustomButton from '../../components/Button';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { EmailIcon, Lock, MediIcon } from '../../assets/SVGs';
import { FONTS_FAMILY } from '../../assets/Fonts';
import CustumInputwitUnderline from '../../components/wrapper/CustomInput';
import CustomInputField from '../../components/wrapper/CustomInput';


const Login = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>

            <MediIcon style={{ marginTop: verticalScale(60) }} />
            <CustomText
                style={{
                    color: black,
                    fontFamily: FONTS_FAMILY.Inter_SemiBold,
                    fontSize: 20,
                    marginTop: 10
                }}
            >Medica Morph</CustomText>

            <CustomText
                style={{
                    color: black,
                    fontFamily: FONTS_FAMILY.Inter_SemiBold,
                    fontSize: 20,
                    marginTop: 10
                }}
            >Hi, Welcome Back! </CustomText>

            <CustomText
                style={{
                    color: gray,
                    fontFamily: FONTS_FAMILY.Inter_SemiBold,
                    fontSize: 14,
                    marginTop: 10
                }}
            >Hope you’re doing fine. </CustomText>

            <View style={{ marginHorizontal: 20, gap: 20, marginTop: 20 }}>
                <CustomInputField
                    icon={<EmailIcon />}
                    // iconName="lock"
                    placeholder="your email"
                />
                <CustomInputField
                    icon={<Lock />}
                    // iconName="lock"
                    placeholder="Password"
                />
                <CustomButton title={'Sign In'}
                    style={{
                        // position: 'absolute',
                        // bottom: 53,
                        width: moderateScale(295)
                    }}
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
            <CustomText style={{
                color: color.App_Primary_color,
                fontFamily: FONTS_FAMILY.Inter_SemiBold,
                fontSize: 14,
                marginTop: 30
            }}>Forgot password?</CustomText>

            <CustomText style={{
                color: color.gray,
                fontFamily: FONTS_FAMILY.Inter_SemiBold,
                fontSize: 14,
                marginTop: 30
            }}>Don’t have an account yet? <Text style={{ color: color.App_Primary_color }}
                onPress={() => navigation.navigate('SignUp')}>Sign up</Text></CustomText>

        </View  >
    )

}

export default Login