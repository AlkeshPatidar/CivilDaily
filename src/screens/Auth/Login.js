

// import React, {useEffect, useState} from 'react'
// import {
//   ScrollView,
//   StatusBar,
//   TouchableOpacity,
//   View,
//   StyleSheet,
// } from 'react-native'
// import CustomText from '../../components/TextComponent'
// import color, {App_Primary_color, black, darkMode25, white} from '../../common/Colors/colors'
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
// import {
//   inValidEmail,
//   inValidNum,
//   inValidPassword,
// } from '../../utils/CheckValidation'
// import {ToastMsg} from '../../utils/helperFunctions'
// import useLoader from '../../utils/LoaderHook'
// import urls from '../../config/urls'
// import {apiPost, getItem, setItem} from '../../utils/Apis'
// import {useDispatch, useSelector} from 'react-redux'
// import {setUser} from '../../redux/reducer/user'
// import { useLoginCheck } from '../../utils/Context'
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import AntDesign from 'react-native-vector-icons/AntDesign'

// const Login = ({navigation}) => {
//     const {isDarkMode} = useSelector(state => state.theme)

//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [activeTab, setActiveTab] = useState('Influencers')
//   const {showLoader, hideLoader} = useLoader()
//   const dispatch = useDispatch()
//     const {loggedInby, setloggedInby} = useLoginCheck()



//   const onSubmit = async () => {
//     const emailError = inValidEmail(email)
//     if (emailError) {
//       ToastMsg(emailError)
//       return
//     }
//     const passwordError = inValidPassword(password)
//     if (passwordError) {
//       ToastMsg(passwordError)
//       return
//     }
//     try {
//       const url =
//         activeTab == 'Influencers' ? urls.InfluencerLogin : urls.brandLogin
//       showLoader()
//       const data = {Email: email, Password: password}
//       const response = await apiPost(url, data)
//       // console.log('response', response)

//       if (response?.statusCode === 200) {
//         if (response?.data?.token) {
//           await setItem('token', response?.data?.token)
//           const token = await getItem('token')
//           if (token) {
//             if (activeTab == 'Influencers') {
//               dispatch(setUser(JSON.stringify(response?.data?.Influencer)))
//               navigation.replace('InfluenceTab')
//             } else {
//               dispatch(setUser(JSON.stringify(response?.data?.Brand)))
//               navigation.replace('TabBrand')
//             }
//           }
//         }
//         ToastMsg(response?.message)
//         hideLoader()
//       }
//     } catch (error) {
//       hideLoader()
//       if (error?.message) {
//         ToastMsg(error?.message)
//         // response?.message
//       } else {
//         ToastMsg('Network Error')
//       }
//     }
//   }

//   useEffect(() => {
//     role()
//   }, [activeTab])

//   const role = async () => {
//     setItem('UserType', activeTab)
//     if (activeTab=='Influencers') {
//       setloggedInby('Influencers')
//     } else {
//       setloggedInby('Brands')
//     }
//   }

//   const renderHeader = () => {
//     return (
//       <Row style={styles.headerRow}>
//         <TouchableOpacity>
//           <Ionicons name='chevron-back' size={30} color={isDarkMode?white:black}/>
//         </TouchableOpacity>
//         <CustomText style={styles.headerText}>Log in</CustomText>
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
//       <View style={styles.logoInputContainer}>
//         {/* <LoginLogo /> */}
//         <View style={styles.inputContainer}>
//           <CustomInputField
//             placeholder={'Email'}
//             onChangeText={setEmail}
//             label={'Email'}
//           />

//           <CustomInputField
//             placeholder={'Password'}
//             icon={<AntDesign name={'eye'} color={isDarkMode?white:black } size={20}/>}
//             onChangeText={setPassword}
//             secureTextEntry={true}
//             label={'Password'}
//             // keyboardType={'phone-pad'}
//             isPassword
//           />
//           <TouchableOpacity
//           onPress={()=>navigation.navigate('ForgotPassword')}
//           >
//           <CustomText style={styles.forgotPasswordText}>
//             Forgot your password ?
//           </CustomText>
            
//           </TouchableOpacity>
//         </View>
//       </View>
//     )
//   }

//   const renderWhiteBgItmes = () => {
//     return (
//       <ScrollView style={styles.scrollViewContainer}>
//         {renderLogoAndInputItems()}
//         {renderButton()}
//       </ScrollView>
//     )
//   }

//   const renderButton = () => {
//     return (
//       <View style={styles.buttonContainer}>
//         <CustomButton
//           style={styles.loginButton}
//           title={'Log in'}
//           //  navigation.navigate('Tab')
//           onPress={onSubmit}
//           // onPress={() => navigation.navigate('Otpscreen')}
//         />
//         <Divider style={styles.divider} />
//         <Socials style={styles.socials} />
//         <Row style={styles.signUpRow}>
//           <CustomText style={styles.signUpText}>
//             Don't have an account?{' '}
//           </CustomText>
//           <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
//             <CustomText style={styles.signUpLink}>Sign Up </CustomText>
//           </TouchableOpacity>
//         </Row>
//       </View>
//     )
//   }


//   const styles = StyleSheet.create({
//   container: {
//     backgroundColor:isDarkMode?darkMode25: 'white',
//     flex: 1,
//   },
//   headerRow: {
//     marginTop: 50,
//     marginHorizontal: 20,
//     gap: 95,
//   },
//   headerText: {
//     color: isDarkMode?white:'black',
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
//   logoInputContainer: {
//     alignItems: 'center',
//     marginTop: 0,
//     gap: 20,
//   },
//   inputContainer: {
//     gap: 25,
//   },
//   forgotPasswordText: {
//     alignSelf: 'flex-end',
//     color: 'rgba(202, 202, 202, 1)',
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   scrollViewContainer: {
//     flex: 1,
//     backgroundColor:isDarkMode? darkMode25: 'white',
//     marginTop: 30,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//   },
//   buttonContainer: {
//     alignItems: 'center',
//   },
//   loginButton: {
//     marginTop: 40,
//   },
//   divider: {
//     marginVertical: 30,
//   },
//   socials: {
//     marginVertical: 30,
//   },
//   signUpRow: {
//     gap: 10,
//     marginTop: 20,
//   },
//   signUpText: {
//     fontSize: 12,
//     color:isDarkMode?white:'black',
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   signUpLink: {
//     fontSize: 12,
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//     color: App_Primary_color,
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
//   return (
//     <View style={styles.container}>
//       <StatusBar
//         translucent={true}
//         backgroundColor='transparent'
//         barStyle={isDarkMode? white:'dark-content'}
//       />
//       {renderHeader()}
//       {renderTabs()}

//       {renderWhiteBgItmes()}

//     </View>
//   )
// }



// export default Login


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { App_Primary_color } from '../../common/Colors/colors';

// Country data with flags (you'll need to add flag images or use a library like react-native-country-picker-modal)
const countries = [
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
  // Add more countries as needed
];

const Login = ({navigation}) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountryPicker(false);
  };

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.countryItem}
      onPress={() => handleCountrySelect(item)}
    >
      <Text style={styles.countryFlag}>{item.flag}</Text>
      <Text style={styles.countryName}>{item.name}</Text>
      <Text style={styles.countryCode}>{item.dialCode}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
    

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Get started</Text>
        <Text style={styles.subtitle}>
        You can log in or make an account if you’re new
        </Text>

        <Text style={styles.inputLabel}>Enter your phone number</Text>

        {/* Phone Input Container */}
        <View style={styles.phoneInputContainer}>
          {/* Country Selector */}
          <TouchableOpacity 
            style={styles.countrySelector}
            onPress={() => setShowCountryPicker(true)}
          >
            <Text style={styles.countryFlag}>{selectedCountry.flag}</Text>
            <Text style={styles.dialCode}>{selectedCountry.dialCode}</Text>
          </TouchableOpacity>

          {/* Phone Number Input */}
          <TextInput
            style={styles.phoneInput}
            placeholder="Phone Number"
            placeholderTextColor="#999"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={15}
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton}
        onPress={()=>navigation.navigate('Otpscreen')}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Country Picker Modal */}
      <Modal
        visible={showCountryPicker}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowCountryPicker(false)}
            >
              <Text style={styles.modalCloseText}>Done</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={countries}
            renderItem={renderCountryItem}
            keyExtractor={(item) => item.code}
            style={styles.countryList}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  backArrow: {
    fontSize: 24,
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop:150
  },
  title: {
    fontSize: 20,
  fontFamily:FONTS_FAMILY.Poppins_Bold,
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
  fontFamily:FONTS_FAMILY.Poppins_Regular,
    color: '#666',
    lineHeight: 24,
    marginBottom: 40,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    fontWeight: '500',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 40,
    height: 50,
    gap:10,

  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRightColor: '#ddd',
    minWidth: 100,
    backgroundColor:'#F2F2F3',
    borderRadius:8
  },
  countryFlag: {
    fontSize: 20,
    marginRight: 8,
  },
  dialCode: {
    fontSize: 15,
    color: '#333',
    marginRight: 8,
    fontFamily:FONTS_FAMILY.Poppins_Regular
  },
  dropdownArrow: {
    fontSize: 10,
    color: '#666',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 20,
    fontSize: 15,
    color: '#333',
    backgroundColor:'#F2F2F3',
    borderRadius:8,
    fontFamily:FONTS_FAMILY.Poppins_Regular

    
  },
  continueButton: {
    backgroundColor: App_Primary_color,
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    position:'absolute',
    bottom:40,
    width:'90%',
    alignSelf:'center'
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalCloseButton: {
    padding: 5,
  },
  modalCloseText: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '600',
  },
  countryList: {
    flex: 1,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  countryCode: {
    fontSize: 16,
    color: '#666',
  },
});

export default Login;