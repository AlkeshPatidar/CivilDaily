import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import CustomText from '../../components/TextComponent';
import color, { App_Primary_color } from '../../common/Colors/colors';
import IMG from '../../assets/Images';
import CustomButton from '../../components/Button';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { SplashIcon } from '../../assets/SVGs';
import { FONTS_FAMILY } from '../../assets/Fonts';
import App from '../../../App';
import { getI18n, useTranslation } from 'react-i18next';
import { getItem } from '../../utils/Apis';


const Splash = ({ navigation }) => {


  return (
    <View style={{ flex: 1, alignItems: 'center', marginHorizontal: 30 }}>
      <SplashIcon />
      <CustomText style={{
        fontFamily: FONTS_FAMILY.Comfortaa_Medium,
        fontSize: 24
      }}>Hey! Welcomes</CustomText>
      <CustomText style={{
        fontFamily: FONTS_FAMILY.Comfortaa_Medium,
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        marginTop: 20
      }}>Lorem ipsum dolor sit amet,{"\n"} consectetur adipiscing elit. Nam{"\n"} egestas rhoncus lectus rhoncus, tempor. </CustomText>
      <View style={{
        gap: 20,
        marginTop: verticalScale(70)
      }}>

        <CustomButton title={'SIGN IN'}
          style={{
            width: moderateScale(295),
            borderRadius: 4
          }}
          onPress={() => navigation.navigate('SignUp')}
        />
        <CustomButton title={'CREATE AN ACCOUNT'}
          style={{
            borderRadius: 4,
            width: moderateScale(295),
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: App_Primary_color
          }}
          txtColor={{ color: App_Primary_color }}
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </View  >
  )

}

export default Splash