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

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('Influencers')
  const {showLoader, hideLoader} = useLoader()
  const dispatch = useDispatch()

    useEffect(() => {
      role()
    }, [activeTab])
  
    const role = async () => {
      setItem('UserType', activeTab)
    }

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
      <Row style={{marginTop: 50, marginHorizontal: 20, gap: 95}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackMsg />
        </TouchableOpacity>
        <CustomText
          style={{
            color: 'black',
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 20,
          }}>
          Register
        </CustomText>
      </Row>
    )
  }

  const renderTabs = () => {
    return (
      <Row
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          gap: 10,
          alignItems: 'center',
          backgroundColor: '#D43C3114',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 5,
          borderRadius: 12,
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          onPress={() => setActiveTab('Influencers')}
          style={{
            backgroundColor:
              activeTab === 'Influencers' ? App_Primary_color : 'transparent',
            paddingHorizontal: 40,
            paddingVertical: 8,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: App_Primary_color,
          }}>
          <CustomText
            style={{
              color: activeTab === 'Influencers' ? 'white' : App_Primary_color,
              fontFamily: FONTS_FAMILY.Poppins_Medium,
              fontSize: 14,
            }}>
            Influencers
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('Brands')}
          style={{
            backgroundColor:
              activeTab === 'Brands' ? App_Primary_color : 'transparent',
            paddingHorizontal: 40,
            paddingVertical: 8,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: App_Primary_color,
          }}>
          <CustomText
            style={{
              color: activeTab === 'Brands' ? 'white' : App_Primary_color,
              fontFamily: FONTS_FAMILY.Poppins_Medium,
              fontSize: 14,
            }}>
            Brands
          </CustomText>
        </TouchableOpacity>
      </Row>
    )
  }

  const renderLogoAndInputItems = () => {
    return (
      <View style={{alignItems: 'center', marginTop: 0, gap: 20}}>
        {/* <LoginLogo /> */}
        <View style={{gap: 25}}>
          <CustomInputField
            placeholder={'First Name'}
            // onChangeText={setEmail}
            label={'First Name'}
          />
          <CustomInputField
            placeholder={'Last Name'}
            // onChangeText={setEmail}
            label={'Last Name'}
          />
          <CustomInputField
            placeholder={'Email'}
            onChangeText={setEmail}
            label={'Email'}
          />

          <CustomInputField
            placeholder={'Number'}
            // onChangeText={setEmail}
            label={'Number'}
          />
          <CustomInputField
            placeholder={'Password'}
            icon={<EyeIcon />}
            onChangeText={setPassword}
            secureTextEntry={true}
            label={'Password'}
            // keyboardType={'phone-pad'}
            isPassword
          />
          <CustomInputField
            placeholder={'Date Of Birth'}
            // onChangeText={setEmail}
            label={'Date Of Birth'}
          />
          <CustomInputField
            placeholder={'Address 1'}
            // onChangeText={setEmail}
            label={'Address 1'}
          />
          <CustomInputField
            placeholder={'Postal Code'}
            // onChangeText={setEmail}
            label={'Postal Code'}
          />
        </View>
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
        }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          paddingBottom: 40, // Extra padding at bottom
        }}
        showsVerticalScrollIndicator={false}>
        {renderLogoAndInputItems()}
        {renderButton()}

        {/* <Row
          style={{
            gap: 10,
            marginTop: 20, // Increased margin
            justifyContent: 'center', // Center align
            alignItems: 'center',
            marginBottom: 20, // Bottom margin
          }}> */}
        <CustomText
          style={{
            fontSize: 12,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            textAlign: 'center',
            color: 'black',
            marginTop: 15,
          }}>
          By creating an account you agree to Message App{''}
        </CustomText>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <CustomText
            style={{
              fontSize: 12,
              fontFamily: FONTS_FAMILY.Poppins_Medium,
              color: '#3D0066',
              textDecorationLine: 'underline', // Optional: add underline
              textAlign: 'center',
            }}>
            Terms & Conditions and Privacy Policy .
          </CustomText>
        </TouchableOpacity>
        {/* </Row> */}

        {/* Login text with proper styling */}
        <Row
          style={{
            gap: 10,
            marginTop: 20, // Increased margin
            justifyContent: 'center', // Center align
            alignItems: 'center',
            marginBottom: 20, // Bottom margin
          }}>
          <CustomText
            style={{
              fontSize: 12,
              fontFamily: FONTS_FAMILY.Poppins_Medium,
              color: 'black', // Ensure text color is visible
            }}>
            Already have an account?{' '}
          </CustomText>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <CustomText
              style={{
                fontSize: 12,
                fontFamily: FONTS_FAMILY.Poppins_Medium,
                color: '#3D0066',
                textDecorationLine: 'underline', // Optional: add underline
              }}>
              Login
            </CustomText>
          </TouchableOpacity>
        </Row>
      </ScrollView>
    )
  }

  const renderButton = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <CustomButton
          style={{marginTop: 40}}
          title={'Register'}
          //  navigation.navigate('Tab')
          // onSubmit()
          onPress={() =>
          {
            if (activeTab=='Influencers') {
              navigation.navigate('Otpscreen')}
              
            else {
              navigation.navigate('CampaignReqScreen')}
              
            
          }}
        />
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
      {renderTabs()}

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

export default SignUp
