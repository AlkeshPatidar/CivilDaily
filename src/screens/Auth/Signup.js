import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, VirtualizedList } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomText from '../../components/TextComponent';
import color, { App_Primary_color, black, gray } from '../../common/Colors/colors';
import IMG from '../../assets/Images';
import CustomButton from '../../components/Button';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { EmailIcon, EyeIcon, FilledCheckBox, Lock, SignUpIcon } from '../../assets/SVGs';
import { FONTS_FAMILY } from '../../assets/Fonts';
import CustumInputwitUnderline from '../../components/wrapper/CustomInput';
import CustomInputField from '../../components/wrapper/CustomInput';
import Row from '../../components/wrapper/row';


const SignUp = ({ navigation }) => {
    const [isChecked, setIsChecked] = useState(false)
    return (
        <View style={{ flex: 1, alignItems: 'center', marginHorizontal: 20 }}>

            {/* <MediIcon style={{ marginTop: verticalScale(60) }} /> */}
            <SignUpIcon />
            <CustomText
                style={{
                    color: black,
                    fontFamily: FONTS_FAMILY.Comfortaa_Medium,
                    fontSize: 24,
                    marginTop: 10,
                    alignSelf: 'flex-start'
                }}
            >Sign In</CustomText>

            <CustomText
                style={{
                    color: gray,
                    fontFamily: FONTS_FAMILY.Comfortaa_Medium,
                    fontSize: 14,
                    marginTop: 10,
                    alignSelf: 'flex-start'
                }}
            >Don’t have an account? <CustomText style={{ color: App_Primary_color, fontFamily: FONTS_FAMILY.Comfortaa_Medium, fontSize: 14 }}>SIGN UP</CustomText></CustomText>

            <View style={{  gap: 20, marginTop: 20 }}>
                <CustomInputField
                    // iconName="lock"
                    placeholder="User Name"
                />

                <CustomInputField
                    icon={<EyeIcon />}
                    // iconName="lock"
                    placeholder="Password"
                />

                <Row style={{ gap: 10 }}>
                    <TouchableOpacity
                    onPress={()=>setIsChecked(isChecked=>!isChecked)}
                    >{
                        isChecked ?
                            <FilledCheckBox /> :
                            <View style={{ height: 18, width: 18, borderWidth: 1, borderColor: App_Primary_color }}>
                            </View>
                    }
                    </TouchableOpacity>
                    <CustomText
                        style={{ fontSize: 14, fontFamily: FONTS_FAMILY.Comfortaa_Regular }}
                    >Remember Me</CustomText>
                </Row>
                <CustomButton title={'SIGN IN'}
                    style={{
                       marginTop:verticalScale(30),
                        borderRadius: 4,
                        width: moderateScale(295)
                    }}
                    onPress={() => navigation.navigate('LanguageSelection')}
                />
            </View>




        </View  >
    )

}

export default SignUp