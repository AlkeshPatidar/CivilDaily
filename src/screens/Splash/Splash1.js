import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import CustomText from '../../components/TextComponent';
import color, { App_Primary_color, white } from '../../common/Colors/colors';
import IMG from '../../assets/Images';
import CustomButton from '../../components/Button';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { SplashIcon } from '../../assets/SVGs';
import { FONTS_FAMILY } from '../../assets/Fonts';
import App from '../../../App';


const Splash1 = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', marginHorizontal: 30 }}>
      <SplashIcon />
      <CustomText style={{
        fontFamily: FONTS_FAMILY.Comfortaa_Medium,
        fontSize: 24,
        marginTop:verticalScale(70)
      }}>Hey! Welcome</CustomText>
      <CustomText style={{
        fontFamily: FONTS_FAMILY.Comfortaa_SemiBold,
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        marginTop: 20
      }}>Lorem ipsum dolor sit amet,{"\n"} consectetur adipiscing elit. Nam{"\n"} egestas rhoncus lectus rhoncus, tempor. </CustomText>
      <View style={{
        gap:20,
        marginTop:verticalScale(70)
      }}>

       
        <CustomButton title={'Get Started'}
          style={{
            borderRadius:4,
            width: moderateScale(295),
            backgroundColor:App_Primary_color,
            borderWidth:1,
            borderColor:App_Primary_color
          }}
          txtColor={{color:white}}
          onPress={() => navigation.navigate('Splash')}
        />
      </View>
    </ScrollView  >
  )

}

export default Splash1