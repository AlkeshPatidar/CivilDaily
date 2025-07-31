import React, {useEffect, useState} from 'react'
import {ScrollView, StatusBar, TouchableOpacity, View} from 'react-native'
import CustomText from '../../components/TextComponent'
import color, {App_Primary_color} from '../../common/Colors/colors'
import Row from '../../components/wrapper/row'
import {
  BackArrow,
  BackMsg,
  Divider,
  EyeIcon,
  LoginLogo,
  Socials,
} from '../../assets/SVGs'
import {FONTS_FAMILY} from '../../assets/Fonts'
import CustomInputField from '../../components/wrapper/CustomInput'
import CustomButton from '../../components/Button'
import {inValidNum} from '../../utils/CheckValidation'
import {ToastMsg} from '../../utils/helperFunctions'
import useLoader from '../../utils/LoaderHook'
import urls from '../../config/urls'
import {apiPost, getItem, setItem} from '../../utils/Apis'
import {useDispatch} from 'react-redux'
import {setUser} from '../../redux/reducer/user'
import OTPInput from '../../components/OtpInput'

const OtpScreen = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('Influencers')
  const {showLoader, hideLoader} = useLoader()
  const [role, setRole] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const getRole = async () => {
      const role = await getItem('UserType')
      setRole(role)
    }
    getRole()
  }, [])

  console.log("role", role);
  

  const onSubmit = async () => {
    try {
      showLoader()
      const data = {Email: email, Password: password}
      const response = await apiPost(urls.login, data)
      console.log('response', response)

      if (response?.statusCode === 200) {
        dispatch(setUser(JSON.stringify(response?.data?.User)))
        if (response?.data?.token) {
          await setItem('token', response?.data?.token)
          const token = await getItem('token')
          if (token) {
            navigation.replace('Tab')
          }
        }
        ToastMsg(response?.message)
        hideLoader()
      }
    } catch (error) {
      hideLoader()
      if (error?.message) {
        ToastMsg(error?.message)
        // response?.message
      } else {
        ToastMsg('Network Error')
      }
    }
  }

  const renderHeader = () => {
    return (
      <Row style={{marginTop: 50, marginHorizontal: 20, gap: 70}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackMsg />
        </TouchableOpacity>
        <CustomText
          style={{
            color: 'black',
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 20,
          }}>
          Email Verification
        </CustomText>
      </Row>
    )
  }

  const renderLogoAndInputItems = () => {
    return (
      <View style={{alignItems: 'center', marginTop: 0, gap: 20}}>
        <CustomText
          style={{
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
          }}>
          To verify your account, enter the verification code sent to
          leslie.alexander@gmail.com
        </CustomText>
        <OTPInput numInputs={6} onChangeText={text => console.log(text)} />
      </View>
    )
  }

  const renderWhiteBgItmes = () => {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginTop: 30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        {renderLogoAndInputItems()}
        {renderButton()}
      </ScrollView>
    )
  }

  const renderButton = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <CustomButton
          style={{marginTop: 40}}
          title={'Verify'}
          //  navigation.navigate('Tab')
          // onSubmit()
          // onPress={() => navigation.navigate('MessageScreen')}
          // onPress={() => navigation.navigate('RestaurantScreen')}
          // onPress={() => navigation.navigate('InfluencerHome')}
          onPress={() => {
            if (role == 'Influencers') {
              navigation.navigate('InfluenceTab')
            } else {
              navigation.navigate('TabBrand')
            }
          }}
        />

        <Row style={{gap: 3, marginTop: 20}}>
          <CustomText
            style={{
              fontSize: 12,
              fontFamily: FONTS_FAMILY.Poppins_Medium,
            }}>
            Didn’t receive the code?{' '}
          </CustomText>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <CustomText
              style={{
                fontSize: 12,
                fontFamily: FONTS_FAMILY.Poppins_Medium,
                color: '#3D0066',
              }}>
              Resend{' '}
            </CustomText>
          </TouchableOpacity>
        </Row>
      </View>
    )
  }

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <StatusBar
        translucent={true}
        backgroundColor='transparent'
        barStyle='dark-content'
      />
      {renderHeader()}

      {renderWhiteBgItmes()}

      <View
        style={{
          height: 5,
          width: 134,
          backgroundColor: 'rgba(202, 202, 202, 1)',
          alignSelf: 'center',
          position: 'absolute',
          bottom: 8,
          borderRadius: 8,
        }}
      />
    </View>
  )
}

export default OtpScreen
