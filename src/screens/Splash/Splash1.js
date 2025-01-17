import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomText from '../../components/TextComponent';
import color, { App_Primary_color, white } from '../../common/Colors/colors';
import IMG from '../../assets/Images';
import CustomButton from '../../components/Button';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { SplashIcon } from '../../assets/SVGs';
import { FONTS_FAMILY } from '../../assets/Fonts';
import App from '../../../App';
import { getItem } from '../../utils/Apis';
import { useTranslation } from 'react-i18next';


const Splash1 = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [isLanguage, setIsLanguage] = useState(null)

  useEffect(() => {
    getAsyncData()
  }, [])

  const getAsyncData = async () => {
    const language = await getItem('language')
    setIsLanguage(language)
    i18n.changeLanguage(language);
  }
  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
      {/* <SplashIcon /> */}
      <Image
        source={IMG.TrackOn}
        style={{
          width: '100%'
        }}
      />
      <CustomText style={{
        fontFamily: FONTS_FAMILY.Poppins_SemiBold,
        fontSize: 26,
        marginTop: verticalScale(30),
        textAlign: 'center',
        color: color.App_Primary_color
      }}>Welcome To{"\n"} Management Tracking</CustomText>
      <CustomText style={{
        fontFamily: FONTS_FAMILY.Poppins_Regular,
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        marginTop: 20,
        lineHeight:23
      }}>This productive tool is designed to help{'\n'}
        you better manage your task{'\n'}
        project-wise conveniently! </CustomText>
      <View style={{
        gap: 20,
        marginTop: verticalScale(70)
      }}>


        <CustomButton title={'Get Started'}
          style={{
            width: moderateScale(295),
            backgroundColor: App_Primary_color,
            borderWidth: 1,
            borderColor: App_Primary_color
          }}
          txtColor={{ color: white }}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </ScrollView  >
  )

}

export default Splash1