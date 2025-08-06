import React, {useEffect, useState} from 'react'
import {
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native'
import CustomText from '../../components/TextComponent'
import color, {App_Primary_color} from '../../common/Colors/colors'
import Row from '../../components/wrapper/row'
import {
  BackArrow,
  BackMsg,
  Divider,
  EyeIcon,
  LoginLogo,
} from '../../assets/SVGs'
import {FONTS_FAMILY} from '../../assets/Fonts'
import CustomInputField from '../../components/wrapper/CustomInput'
import CustomButton from '../../components/Button'
import {
  inValidEmail,
  inValidPassword,
} from '../../utils/CheckValidation'
import {ToastMsg} from '../../utils/helperFunctions'
import useLoader from '../../utils/LoaderHook'
import urls from '../../config/urls'
import {apiPost, apiPut, getItem} from '../../utils/Apis'
import { useLoginCheck } from '../../utils/Context'

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [activeTab, setActiveTab] = useState('Influencers')
  const {showLoader, hideLoader} = useLoader()
  const {loggedInby, setloggedInby} = useLoginCheck()

  const onSubmit = async () => {
    const emailError = inValidEmail(email)
    if (emailError) {
      ToastMsg(emailError)
      return
    }
    
    const oldPasswordError = inValidPassword(oldPassword)
    if (oldPasswordError) {
      ToastMsg(`Old Password: ${oldPasswordError}`)
      return
    }
    
    const newPasswordError = inValidPassword(newPassword)
    if (newPasswordError) {
      ToastMsg(`New Password: ${newPasswordError}`)
      return
    }

    if (oldPassword === newPassword) {
      ToastMsg('New password must be different from old password')
      return
    }

    try {
      // Determine the URL based on active tab
      const url = activeTab === 'Influencers' 
        ? urls.InfluencerForgotPassword 
        : urls.brandForgotPassword
      
      showLoader()
      
      const data = {
        Email: email,
        OldPassword: oldPassword,
        NewPassword: newPassword
      }

      console.log(data,'daatatata');
      
      
      const response = await apiPut(url, data)
      
      if (response?.statusCode === 200) {
        ToastMsg(response?.message || 'Password updated successfully')
        hideLoader()
        // Navigate back to login screen
        navigation.navigate('Login')
      } else {
        hideLoader()
        ToastMsg(response?.message || 'Failed to update password')
      }
    } catch (error) {
      hideLoader()
      if (error?.message) {
        ToastMsg(error?.message)
      } else {
        ToastMsg('Network Error')
      }
    }
  }

  useEffect(() => {
    role()
  }, [activeTab])

  const role = async () => {
    if (activeTab === 'Influencers') {
      setloggedInby('Influencers')
    } else {
      setloggedInby('Brands')
    }
  }

  const renderHeader = () => {
    return (
      <Row style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackMsg />
        </TouchableOpacity>
        <CustomText style={styles.headerText}>Reset Password</CustomText>
      </Row>
    )
  }

  const renderTabs = () => {
    return (
      <Row style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('Influencers')}
          style={[
            styles.tabButton,
            {
              backgroundColor:
                activeTab === 'Influencers' ? App_Primary_color : 'transparent',
            },
          ]}>
          <CustomText
            style={[
              styles.tabText,
              {
                color:
                  activeTab === 'Influencers' ? 'white' : App_Primary_color,
              },
            ]}>
            Influencers
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('Brands')}
          style={[
            styles.tabButton,
            {
              backgroundColor:
                activeTab === 'Brands' ? App_Primary_color : 'transparent',
            },
          ]}>
          <CustomText
            style={[
              styles.tabText,
              {
                color: activeTab === 'Brands' ? 'white' : App_Primary_color,
              },
            ]}>
            Brands
          </CustomText>
        </TouchableOpacity>
      </Row>
    )
  }

  const renderInputItems = () => {
    return (
      <View style={styles.logoInputContainer}>
        <View style={styles.inputContainer}>
          <CustomInputField
            placeholder={'Email'}
            onChangeText={setEmail}
            label={'Email'}
            value={email}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
          />

          <CustomInputField
            placeholder={'Current Password'}
            icon={<EyeIcon />}
            onChangeText={setOldPassword}
            secureTextEntry={true}
            label={'Current Password'}
            value={oldPassword}
            isPassword
          />

          <CustomInputField
            placeholder={'New Password'}
            icon={<EyeIcon />}
            onChangeText={setNewPassword}
            secureTextEntry={true}
            label={'New Password'}
            value={newPassword}
            isPassword
          />
          
          <CustomText style={styles.infoText}>
            Please enter your email and current password to set a new password.
          </CustomText>
        </View>
      </View>
    )
  }

  const renderWhiteBgItems = () => {
    return (
      <ScrollView style={styles.scrollViewContainer}>
        {renderInputItems()}
        {renderButton()}
      </ScrollView>
    )
  }

  const renderButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.resetButton}
          title={'Reset Password'}
          onPress={onSubmit}
        />
        
        <Row style={styles.backToLoginRow}>
          <CustomText style={styles.backToLoginText}>
            Remember your password?{' '}
          </CustomText>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <CustomText style={styles.backToLoginLink}>Back to Login</CustomText>
          </TouchableOpacity>
        </Row>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor='transparent'
        barStyle='dark-content'
      />
      {renderHeader()}
      {renderTabs()}
      {renderWhiteBgItems()}
      <View style={styles.bottomIndicator} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  headerRow: {
    marginTop: 50,
    marginHorizontal: 20,
    gap: 75,
  },
  headerText: {
    color: 'black',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
    fontSize: 20,
  },
  tabsContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#D43C3114',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 12,
    alignSelf: 'center',
  },
  tabButton: {
    paddingHorizontal: 40,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: App_Primary_color,
  },
  tabText: {
    fontFamily: FONTS_FAMILY.Poppins_Medium,
    fontSize: 14,
  },
  logoInputContainer: {
    alignItems: 'center',
    marginTop: 0,
    gap: 20,
  },
  inputContainer: {
    gap: 25,
  },
  infoText: {
    textAlign: 'center',
    color: 'rgba(202, 202, 202, 1)',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
    fontSize: 12,
    marginTop: 10,
    lineHeight: 18,
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  resetButton: {
    marginTop: 40,
  },
  backToLoginRow: {
    gap: 10,
    marginTop: 30,
  },
  backToLoginText: {
    fontSize: 12,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  backToLoginLink: {
    fontSize: 12,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
    color: App_Primary_color,
  },
  bottomIndicator: {
    height: 5,
    width: 134,
    backgroundColor: 'rgba(202, 202, 202, 1)',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 8,
    borderRadius: 8,
  },
})

export default ForgotPassword