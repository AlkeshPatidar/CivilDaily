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
import { useTranslation } from 'react-i18next';

import { apiGet, getItem } from '../../utils/Apis';
import { useDispatch, useSelector } from 'react-redux';
import urls from '../../config/urls';
import { setUser } from '../../redux/reducer/user';

const Splash1 = ({ navigation }) => {
  
  const dispatch = useDispatch()
  // let selector = useSelector(state => state?.user?.userData);
  // if (Object.keys(selector).length != 0) {
  //   selector = JSON.parse(selector);
  // }

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    oncheck()

  }, [navigation]);

  const oncheck = async () => {
    const token = await getItem('token');

    if (token) {
      callApi()

    } else {
      navigation.navigate('Login')
    }

  }

  const callApi = async () => {

    fetchUserData();
  }

  const fetchUserData = async () => {
    try {
      setLoading(true)
      const token = await getItem('token');
      if (token) {
        console.log(token, 'token in splace');
        const user = await apiGet(urls.getUserProfile);
        console.log('-------------', user);
        if (user?.statusCode === 200) {
          dispatch(setUser(JSON.stringify(user?.data)));
          console.log('===-+++USER++-', user?.data)
          navigation.navigate('Tab')
          setLoading(false)
        }


      }

    } catch (error) {
      console.log('Error fetching user data:', error);
      // ToastMsg(error?.message || 'Network Error');
      setLoading(false)

    }
  };

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

{loading && <ActivityIndicator size={'large'} color={App_Primary_color}
     style={{
      // position:'absolute',
      // bottom:10
     }}
     />}
        {/* <CustomButton title={'Get Started'}
          style={{
            width: moderateScale(295),
            backgroundColor: App_Primary_color,
            borderWidth: 1,
            borderColor: App_Primary_color
          }}
          txtColor={{ color: white }}
          onPress={() => navigation.navigate('Login')}
        /> */}
      </View>
    </ScrollView  >
  )

}

export default Splash1