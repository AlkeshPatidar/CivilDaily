// import React, {useEffect, useState} from 'react'
// import {
//   ScrollView,
//   StatusBar,
//   TouchableOpacity,
//   View,
//   StyleSheet,
// } from 'react-native'
// import CustomText from '../../components/TextComponent'
// import color, {App_Primary_color} from '../../common/Colors/colors'
// import Row from '../../components/wrapper/row'
// import {
//   BackArrow,
//   BackMsg,
//   Divider,
//   EyeIcon,
//   LoginLogo,
//   Socials,
// } from '../../assets/SVGs'
// import {FONTS_FAMILY} from '../../assets/Fonts'
// import CustomInputField from '../../components/wrapper/CustomInput'
// import CustomButton from '../../components/Button'
// import {inValidNum} from '../../utils/CheckValidation'
// import {ToastMsg} from '../../utils/helperFunctions'
// import useLoader from '../../utils/LoaderHook'
// import urls from '../../config/urls'
// import {apiPost, getItem, setItem} from '../../utils/Apis'
// import {useDispatch} from 'react-redux'
// import {setUser} from '../../redux/reducer/user'
// import {useLoginCheck} from '../../utils/Context'

// const SignUp = ({navigation}) => {
//   // Single state for all form values
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     number: '',
//     password: '',
//     dateOfBirth: '',
//     // Influencer specific fields
//     address: '',
//     postalCode: '',
//     audienceSize: '',
//     nicheInput: '',
//     gender: 'Male',
//     // Brand specific fields
//     brandName: '',
//     upcomingCampaigns: '',
//   })

//   const [activeTab, setActiveTab] = useState('Influencers')
//   const {showLoader, hideLoader} = useLoader()
//   const dispatch = useDispatch()
//   const {loggedInby, setloggedInby} = useLoginCheck()

//   useEffect(() => {
//     role()
//   }, [activeTab])

//   const role = async () => {
//     setItem('UserType', activeTab)
//     if (activeTab == 'Influencers') {
//       setloggedInby('Influencers')
//     } else {
//       setloggedInby('Brands')
//     }
//   }

//   // Function to update form data
//   const updateFormData = (key, value) => {
//     setFormData(prevData => ({
//       ...prevData,
//       [key]: value,
//     }))
//   }

//   // Validation function
//   const validateForm = () => {
//     const { firstName, lastName, email, number, password, dateOfBirth } = formData
    
//     if (!firstName.trim()) {
//       ToastMsg('Please enter first name')
//       return false
//     }
//     if (!lastName.trim()) {
//       ToastMsg('Please enter last name')
//       return false
//     }
//     if (!email.trim()) {
//       ToastMsg('Please enter email')
//       return false
//     }
//     if (!number.trim()) {
//       ToastMsg('Please enter phone number')
//       return false
//     }
//     if (!password.trim()) {
//       ToastMsg('Please enter password')
//       return false
//     }
//     if (!dateOfBirth.trim()) {
//       ToastMsg('Please enter date of birth')
//       return false
//     }
    
//     // Influencer specific validation
//     if (activeTab === 'Influencers') {
//       const { address, postalCode, audienceSize, nicheInput } = formData
//       if (!address.trim()) {
//         ToastMsg('Please enter address')
//         return false
//       }
//       if (!postalCode.trim()) {
//         ToastMsg('Please enter postal code')
//         return false
//       }
//       if (!audienceSize.trim()) {
//         ToastMsg('Please enter audience size')
//         return false
//       }
//       if (!nicheInput.trim()) {
//         ToastMsg('Please enter niche')
//         return false
//       }
//     }
    
//     // Brand specific validation
//     if (activeTab === 'Brands') {
//       const { brandName, upcomingCampaigns } = formData
//       if (!brandName.trim()) {
//         ToastMsg('Please enter brand name')
//         return false
//       }
//       if (!upcomingCampaigns.trim()) {
//         ToastMsg('Please enter upcoming campaigns')
//         return false
//       }
//     }
    
//     // Add email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!emailRegex.test(email)) {
//       ToastMsg('Please enter valid email')
//       return false
//     }
    
//     return true
//   }

//   const onSubmit = async () => {
//     if (!validateForm()) {
//       return
//     }

//     try {
//       showLoader()
      
//       // Role-based endpoint selection
//       const url = activeTab == 'Influencers' 
//         ? urls.InfluencerSignUp 
//         : urls.brandSignUp

//       let data = {}

//       // Prepare data based on user type
//       if (activeTab === 'Influencers') {
//         data = {
//           FirstName: formData.firstName,
//           LastName: formData.lastName,
//           Email: formData.email,
//           Number: formData.number,
//           DOB: formData.dateOfBirth,
//           Address: formData.address,
//           PoastCode: formData.postalCode, // Note: API has typo "PoastCode"
//           AudienceSize: formData.audienceSize,
//           NicheInput: formData.nicheInput,
//           Password: formData.password,
//           Gender: formData.gender,
//         }
//       } else {
//         // For Brands
//         const campaignsArray = formData.upcomingCampaigns
//           .split(',')
//           .map(campaign => campaign.trim())
//           .filter(campaign => campaign.length > 0)

//         data = {
//           FirstName: formData.firstName,
//           LastName: formData.lastName,
//           Email: formData.email,
//           Number: formData.number,
//           DOB: formData.dateOfBirth,
//           BrandName: formData.brandName,
//           UpcomingCampaigns: campaignsArray,
//           Password: formData.password,
//         }
//       }

//       const response = await apiPost(url, data)
//       console.log('SignUp response', response)

//       if (response?.statusCode === 200) {
//         ToastMsg(response?.message || 'Registration successful')
        
//         // Navigate based on user type
//         if (activeTab == 'Influencers') {
//           navigation.navigate('Otpscreen')
//         } else {
//           navigation.navigate('CampaignReqScreen')
//         }
//       }
//       hideLoader()
//     } catch (error) {
//       hideLoader()
//       console.log('SignUp error', error)
//       if (error?.message) {
//         ToastMsg(error?.message)
//       } else {
//         ToastMsg('Network Error')
//       }
//     }
//   }

//   const renderHeader = () => {
//     return (
//       <Row style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <BackMsg />
//         </TouchableOpacity>
//         <CustomText style={styles.headerTitle}>Register</CustomText>
//       </Row>
//     )
//   }

//   const renderTabs = () => {
//     return (
//       <Row style={styles.tabsContainer}>
//         <TouchableOpacity
//           onPress={() => setActiveTab('Influencers')}
//           style={[
//             styles.tabButton,
//             {
//               backgroundColor:
//                 activeTab === 'Influencers' ? App_Primary_color : 'transparent',
//             },
//           ]}>
//           <CustomText
//             style={[
//               styles.tabText,
//               {
//                 color:
//                   activeTab === 'Influencers' ? 'white' : App_Primary_color,
//               },
//             ]}>
//             Influencers
//           </CustomText>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => setActiveTab('Brands')}
//           style={[
//             styles.tabButton,
//             {
//               backgroundColor:
//                 activeTab === 'Brands' ? App_Primary_color : 'transparent',
//             },
//           ]}>
//           <CustomText
//             style={[
//               styles.tabText,
//               {
//                 color: activeTab === 'Brands' ? 'white' : App_Primary_color,
//               },
//             ]}>
//             Brands
//           </CustomText>
//         </TouchableOpacity>
//       </Row>
//     )
//   }

//   const renderLogoAndInputItems = () => {
//     return (
//       <View style={styles.inputContainer}>
//         <View style={styles.inputFieldsContainer}>
//           <CustomInputField
//             placeholder={'First Name'}
//             onChangeText={(value) => updateFormData('firstName', value)}
//             value={formData.firstName}
//             label={'First Name'}
//           />
//           <CustomInputField
//             placeholder={'Last Name'}
//             onChangeText={(value) => updateFormData('lastName', value)}
//             value={formData.lastName}
//             label={'Last Name'}
//           />
//           <CustomInputField
//             placeholder={'Email'}
//             onChangeText={(value) => updateFormData('email', value)}
//             value={formData.email}
//             label={'Email'}
//             keyboardType={'email-address'}
//           />
//           <CustomInputField
//             placeholder={'Number'}
//             onChangeText={(value) => updateFormData('number', value)}
//             value={formData.number}
//             label={'Number'}
//             keyboardType={'phone-pad'}
//           />
//           <CustomInputField
//             placeholder={'Password'}
//             icon={<EyeIcon />}
//             onChangeText={(value) => updateFormData('password', value)}
//             value={formData.password}
//             secureTextEntry={true}
//             label={'Password'}
//             isPassword
//           />
//           <CustomInputField
//             placeholder={'Date Of Birth (YYYY-MM-DD)'}
//             onChangeText={(value) => updateFormData('dateOfBirth', value)}
//             value={formData.dateOfBirth}
//             label={'Date Of Birth'}
//           />
          
//           {/* Influencer specific fields */}
//           {activeTab === 'Influencers' && (
//             <>
//               <CustomInputField
//                 placeholder={'Address'}
//                 onChangeText={(value) => updateFormData('address', value)}
//                 value={formData.address}
//                 label={'Address'}
//               />
//               <CustomInputField
//                 placeholder={'Postal Code'}
//                 onChangeText={(value) => updateFormData('postalCode', value)}
//                 value={formData.postalCode}
//                 label={'Postal Code'}
//                 keyboardType={'numeric'}
//               />
//               <CustomInputField
//                 placeholder={'Audience Size'}
//                 onChangeText={(value) => updateFormData('audienceSize', value)}
//                 value={formData.audienceSize}
//                 label={'Audience Size'}
//                 keyboardType={'numeric'}
//               />
//               <CustomInputField
//                 placeholder={'Niche (e.g., Fitness, Fashion, Tech)'}
//                 onChangeText={(value) => updateFormData('nicheInput', value)}
//                 value={formData.nicheInput}
//                 label={'Niche'}
//               />
//               {/* Gender Picker - You can implement a picker component */}
//               <CustomInputField
//                 placeholder={'Gender (Male/Female/Other)'}
//                 onChangeText={(value) => updateFormData('gender', value)}
//                 value={formData.gender}
//                 label={'Gender'}
//               />
//             </>
//           )}
          
//           {/* Brand specific fields */}
//           {activeTab === 'Brands' && (
//             <>
//               <CustomInputField
//                 placeholder={'Brand Name'}
//                 onChangeText={(value) => updateFormData('brandName', value)}
//                 value={formData.brandName}
//                 label={'Brand Name'}
//               />
//               <CustomInputField
//                 placeholder={'Upcoming Campaigns (comma separated)'}
//                 onChangeText={(value) => updateFormData('upcomingCampaigns', value)}
//                 value={formData.upcomingCampaigns}
//                 label={'Upcoming Campaigns'}
//                 multiline={true}
//               />
//             </>
//           )}
//         </View>
//       </View>
//     )
//   }

//   const renderWhiteBgItmes = () => {
//     return (
//       <ScrollView
//         style={styles.scrollViewContainer}
//         contentContainerStyle={styles.scrollViewContent}
//         showsVerticalScrollIndicator={false}>
//         {renderLogoAndInputItems()}
//         {renderButton()}

//         <CustomText style={styles.termsText}>
//           By creating an account you agree to Message App{''}
//         </CustomText>
//         <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//           <CustomText style={styles.termsLinkText}>
//             Terms & Conditions and Privacy Policy .
//           </CustomText>
//         </TouchableOpacity>

//         <Row style={styles.loginLinkContainer}>
//           <CustomText style={styles.loginText}>
//             Already have an account?{' '}
//           </CustomText>
//           <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//             <CustomText style={styles.loginLinkText}>Login</CustomText>
//           </TouchableOpacity>
//         </Row>
//       </ScrollView>
//     )
//   }

//   const renderButton = () => {
//     return (
//       <View style={styles.buttonContainer}>
//         <CustomButton
//           style={styles.registerButton}
//           title={'Register'}
//           onPress={onSubmit}
//         />
//       </View>
//     )
//   }

//   return (
//     <View style={styles.container}>
//       <StatusBar
//         translucent={true}
//         backgroundColor='transparent'
//         barStyle='dark-content'
//       />
//       {renderHeader()}
//       {renderTabs()}
//       {renderWhiteBgItmes()}
//       <View style={styles.bottomIndicator} />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     flex: 1,
//   },
//   headerContainer: {
//     marginTop: 50,
//     marginHorizontal: 20,
//     gap: 95,
//   },
//   headerTitle: {
//     color: 'black',
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//     fontSize: 20,
//   },
//   tabsContainer: {
//     marginHorizontal: 20,
//     marginTop: 20,
//     gap: 10,
//     alignItems: 'center',
//     backgroundColor: '#D43C3114',
//     justifyContent: 'center',
//     padding: 5,
//     borderRadius: 12,
//     alignSelf: 'center',
//   },
//   tabButton: {
//     paddingHorizontal: 40,
//     paddingVertical: 8,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: App_Primary_color,
//   },
//   tabText: {
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//     fontSize: 14,
//   },
//   scrollViewContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//     marginTop: 30,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//   },
//   scrollViewContent: {
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     paddingBottom: 40,
//   },
//   inputContainer: {
//     alignItems: 'center',
//     marginTop: 0,
//     gap: 20,
//   },
//   inputFieldsContainer: {
//     gap: 25,
//   },
//   buttonContainer: {
//     alignItems: 'center',
//   },
//   registerButton: {
//     marginTop: 40,
//   },
//   termsText: {
//     fontSize: 12,
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//     textAlign: 'center',
//     color: 'black',
//     marginTop: 15,
//   },
//   termsLinkText: {
//     fontSize: 12,
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//     color: '#3D0066',
//     textDecorationLine: 'underline',
//     textAlign: 'center',
//   },
//   loginLinkContainer: {
//     gap: 10,
//     marginTop: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   loginText: {
//     fontSize: 12,
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//     color: 'black',
//   },
//   loginLinkText: {
//     fontSize: 12,
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//     color: '#3D0066',
//     textDecorationLine: 'underline',
//   },
//   bottomIndicator: {
//     height: 5,
//     width: 134,
//     backgroundColor: 'rgba(202, 202, 202, 1)',
//     alignSelf: 'center',
//     position: 'absolute',
//     bottom: 8,
//     borderRadius: 8,
//   },
// })

// export default SignUp

import React, {useEffect, useState} from 'react'
import {
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
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
import {useLoginCheck} from '../../utils/Context'

const SignUp = ({navigation}) => {
  // Single state for all form values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    number: '',
    password: '',
    dateOfBirth: '',
    // Influencer specific fields
    address: '',
    postalCode: '',
    audienceSize: '',
    nicheInput: '',
    gender: 'Male',
    // Brand specific fields
    brandName: '',
    upcomingCampaigns: '',
  })

  const [activeTab, setActiveTab] = useState('Influencers')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const {showLoader, hideLoader} = useLoader()
  const dispatch = useDispatch()
  const {loggedInby, setloggedInby} = useLoginCheck()

  useEffect(() => {
    role()
  }, [activeTab])

  const role = async () => {
    setItem('UserType', activeTab)
    if (activeTab == 'Influencers') {
      setloggedInby('Influencers')
    } else {
      setloggedInby('Brands')
    }
  }

  // Function to update form data
  const updateFormData = (key, value) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }))
  }

  // Function to format date
  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Handle date picker change
  const onDateChange = (event, date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false)
    }
    
    if (date) {
      setSelectedDate(date)
      const formattedDate = formatDate(date)
      updateFormData('dateOfBirth', formattedDate)
    }
  }

  // Show date picker
  const showDatePickerModal = () => {
    setShowDatePicker(true)
  }

  // Validation function
  const validateForm = () => {
    const { firstName, lastName, email, number, password, dateOfBirth } = formData
    
    if (!firstName.trim()) {
      ToastMsg('Please enter first name')
      return false
    }
    if (!lastName.trim()) {
      ToastMsg('Please enter last name')
      return false
    }
    if (!email.trim()) {
      ToastMsg('Please enter email')
      return false
    }
    if (!number.trim()) {
      ToastMsg('Please enter phone number')
      return false
    }
    if (!password.trim()) {
      ToastMsg('Please enter password')
      return false
    }
    if (!dateOfBirth.trim()) {
      ToastMsg('Please enter date of birth')
      return false
    }
    
    // Influencer specific validation
    if (activeTab === 'Influencers') {
      const { address, postalCode, audienceSize, nicheInput } = formData
      if (!address.trim()) {
        ToastMsg('Please enter address')
        return false
      }
      if (!postalCode.trim()) {
        ToastMsg('Please enter postal code')
        return false
      }
      if (!audienceSize.trim()) {
        ToastMsg('Please enter audience size')
        return false
      }
      if (!nicheInput.trim()) {
        ToastMsg('Please enter niche')
        return false
      }
    }
    
    // Brand specific validation
    if (activeTab === 'Brands') {
      const { brandName, upcomingCampaigns } = formData
      if (!brandName.trim()) {
        ToastMsg('Please enter brand name')
        return false
      }
      if (!upcomingCampaigns.trim()) {
        ToastMsg('Please enter upcoming campaigns')
        return false
      }
    }
    
    // Add email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      ToastMsg('Please enter valid email')
      return false
    }
    
    return true
  }

  const onSubmit = async () => {
    if (!validateForm()) {
      return
    }

    try {
      showLoader()
      
      // Role-based endpoint selection
      const url = activeTab == 'Influencers' 
        ? urls.InfluencerSignUp 
        : urls.BrandsSignUp

      let data = {}

      // Prepare data based on user type
      if (activeTab === 'Influencers') {
        data = {
          FirstName: formData.firstName,
          LastName: formData.lastName,
          Email: formData.email,
          Number: formData.number,
          DOB: formData.dateOfBirth,
          Address: formData.address,
          PoastCode: formData.postalCode, // Note: API has typo "PoastCode"
          AudienceSize: formData.audienceSize,
          NicheInput: formData.nicheInput,
          Password: formData.password,
          Gender: formData.gender,
        }
      } else {
        // For Brands
        const campaignsArray = formData.upcomingCampaigns
          .split(',')
          .map(campaign => campaign.trim())
          .filter(campaign => campaign.length > 0)

        data = {
          FirstName: formData.firstName,
          LastName: formData.lastName,
          Email: formData.email,
          Number: formData.number,
          DOB: formData.dateOfBirth,
          BrandName: formData.brandName,
          UpcomingCampaigns: campaignsArray,
          Password: formData.password,
        }
      }

      const response = await apiPost(url, data)
      console.log('SignUp response', response)

      if (response?.statusCode === 200) {
        ToastMsg(response?.message || 'Registration successful')
        
        // Navigate based on user type
        if (activeTab == 'Influencers') {
          navigation.navigate('Otpscreen')
        } else {
          navigation.navigate('CampaignReqScreen')
        }
      }
      hideLoader()
    } catch (error) {
      hideLoader()
      console.log('SignUp error', error)
      if (error?.message) {
        ToastMsg(error?.message)
      } else {
        ToastMsg('Network Error')
      }
    }
  }

  const renderHeader = () => {
    return (
      <Row style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackMsg />
        </TouchableOpacity>
        <CustomText style={styles.headerTitle}>Register</CustomText>
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

  const renderLogoAndInputItems = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.inputFieldsContainer}>
          <CustomInputField
            placeholder={'First Name'}
            onChangeText={(value) => updateFormData('firstName', value)}
            value={formData.firstName}
            label={'First Name'}
          />
          <CustomInputField
            placeholder={'Last Name'}
            onChangeText={(value) => updateFormData('lastName', value)}
            value={formData.lastName}
            label={'Last Name'}
          />
          <CustomInputField
            placeholder={'Email'}
            onChangeText={(value) => updateFormData('email', value)}
            value={formData.email}
            label={'Email'}
            keyboardType={'email-address'}
          />
          <CustomInputField
            placeholder={'Number'}
            onChangeText={(value) => updateFormData('number', value)}
            value={formData.number}
            label={'Number'}
            keyboardType={'phone-pad'}
          />
          <CustomInputField
            placeholder={'Password'}
            icon={<EyeIcon />}
            onChangeText={(value) => updateFormData('password', value)}
            value={formData.password}
            secureTextEntry={true}
            label={'Password'}
            isPassword
          />
          <TouchableOpacity onPress={showDatePickerModal}>
            <CustomInputField
              placeholder={'Date Of Birth'}
              value={formData.dateOfBirth}
              label={'Date Of Birth'}
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>
          
          {/* Influencer specific fields */}
          {activeTab === 'Influencers' && (
            <>
              <CustomInputField
                placeholder={'Address'}
                onChangeText={(value) => updateFormData('address', value)}
                value={formData.address}
                label={'Address'}
              />
              <CustomInputField
                placeholder={'Postal Code'}
                onChangeText={(value) => updateFormData('postalCode', value)}
                value={formData.postalCode}
                label={'Postal Code'}
                keyboardType={'numeric'}
              />
              <CustomInputField
                placeholder={'Audience Size'}
                onChangeText={(value) => updateFormData('audienceSize', value)}
                value={formData.audienceSize}
                label={'Audience Size'}
                keyboardType={'numeric'}
              />
              <CustomInputField
                placeholder={'Niche (e.g., Fitness, Fashion, Tech)'}
                onChangeText={(value) => updateFormData('nicheInput', value)}
                value={formData.nicheInput}
                label={'Niche'}
              />
              {/* Gender Picker - You can implement a picker component */}
              <CustomInputField
                placeholder={'Gender (Male/Female/Other)'}
                onChangeText={(value) => updateFormData('gender', value)}
                value={formData.gender}
                label={'Gender'}
              />
            </>
          )}
          
          {/* Brand specific fields */}
          {activeTab === 'Brands' && (
            <>
              <CustomInputField
                placeholder={'Brand Name'}
                onChangeText={(value) => updateFormData('brandName', value)}
                value={formData.brandName}
                label={'Brand Name'}
              />
              <CustomInputField
                placeholder={'Upcoming Campaigns (comma)'}
                onChangeText={(value) => updateFormData('upcomingCampaigns', value)}
                value={formData.upcomingCampaigns}
                label={'Upcoming Campaigns'}
                multiline={true}
              />
            </>
          )}
        </View>
        
        {/* Date Picker Modal */}
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            maximumDate={new Date()}
            minimumDate={new Date(1900, 0, 1)}
          />
        )}
        
        {Platform.OS === 'ios' && showDatePicker && (
          <View style={styles.datePickerContainer}>
            <View style={styles.datePickerHeader}>
              <TouchableOpacity
                onPress={() => setShowDatePicker(false)}
                style={styles.datePickerButton}>
                <CustomText style={styles.datePickerButtonText}>Cancel</CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowDatePicker(false)}
                style={styles.datePickerButton}>
                <CustomText style={styles.datePickerButtonText}>Done</CustomText>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    )
  }

  const renderWhiteBgItmes = () => {
    return (
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        {renderLogoAndInputItems()}
        {renderButton()}

        <CustomText style={styles.termsText}>
          By creating an account you agree to Message App{''}
        </CustomText>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <CustomText style={styles.termsLinkText}>
            Terms & Conditions and Privacy Policy .
          </CustomText>
        </TouchableOpacity>

        <Row style={styles.loginLinkContainer}>
          <CustomText style={styles.loginText}>
            Already have an account?{' '}
          </CustomText>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <CustomText style={styles.loginLinkText}>Login</CustomText>
          </TouchableOpacity>
        </Row>
      </ScrollView>
    )
  }

  const renderButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.registerButton}
          title={'Register'}
          onPress={onSubmit}
        />
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
      {renderWhiteBgItmes()}
      <View style={styles.bottomIndicator} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  headerContainer: {
    marginTop: 50,
    marginHorizontal: 20,
    gap: 95,
  },
  headerTitle: {
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
  scrollViewContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  inputContainer: {
    alignItems: 'center',
    marginTop: 0,
    gap: 20,
  },
  inputFieldsContainer: {
    gap: 25,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  registerButton: {
    marginTop: 40,
  },
  termsText: {
    fontSize: 12,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
    textAlign: 'center',
    color: 'black',
    marginTop: 15,
  },
  termsLinkText: {
    fontSize: 12,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
    color: '#3D0066',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  loginLinkContainer: {
    gap: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    fontSize: 12,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
    color: 'black',
  },
  loginLinkText: {
    fontSize: 12,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
    color: '#3D0066',
    textDecorationLine: 'underline',
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
  datePickerContainer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  datePickerButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  datePickerButtonText: {
    fontSize: 16,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
    color: App_Primary_color,
  },
})

export default SignUp