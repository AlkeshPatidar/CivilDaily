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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { App_Primary_color, dark33, dark55, darkMode25, white } from '../../common/Colors/colors';
import { useDispatch, useSelector } from 'react-redux';
import CustomInputField from '../../components/wrapper/CustomInput';
import useLoader from '../../utils/LoaderHook';
import { inValidEmail, inValidPassword } from '../../utils/CheckValidation';
import { ToastMsg } from '../../utils/helperFunctions';
import urls from '../../config/urls';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { apiPost, getItem, setItem } from '../../utils/Apis';
import { setUser } from '../../redux/reducer/user';
import CustomText from '../../components/TextComponent';

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

const Login = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { showLoader, hideLoader } = useLoader()
  const dispatch = useDispatch()

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountryPicker(false);
  };

  const onSubmit = async () => {
    const emailError = inValidEmail(email)
    if (emailError) {
      ToastMsg(emailError)
      return
    }
    const passwordError = inValidPassword(password)
    if (passwordError) {
      ToastMsg(passwordError)
      return
    }
    try {
      showLoader()
      const data = { email: email, password: password }
      const response = await apiPost(urls?.login, data)
      console.log('response Of Login', response)

      if (response?.statusCode === 200) {
        if (response?.data?.token) {
          await setItem('token', response?.data?.token)
          const token = await getItem('token')
          if (token) {
            dispatch(setUser(JSON.stringify(response?.data?.user)))
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
        console.log('++++++++++++==', error);

        // response?.message
      } else {
        ToastMsg('Network Error')
      }
    }
  }

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

  const { isDarkMode } = useSelector(state => state.theme)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? darkMode25 : '#ffffff',
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
    scrollViewContainer: {
      flexGrow: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
      marginTop: 150,
      paddingBottom: 100, // Add padding for button space
    },
    title: {
      fontSize: 20,
      fontFamily: FONTS_FAMILY.Poppins_Bold,
      color: isDarkMode ? white : '#000',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 13,
      fontFamily: FONTS_FAMILY.Poppins_Regular,
      color: isDarkMode ? 'white' : '#666',
      lineHeight: 24,
      marginBottom: 40,
    },
    inputLabel: {
      fontSize: 16,
      color: isDarkMode ? 'white' : '#666',
      marginBottom: 12,
      fontWeight: '500',
    },
    phoneInputContainer: {
      flexDirection: 'row',
      borderColor: '#ddd',
      borderRadius: 8,
      backgroundColor: isDarkMode ? dark33 : '#fff',
      marginBottom: 40,
      height: 50,
      gap: 10,
    },
    countrySelector: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 5,
      borderRightColor: '#ddd',
      minWidth: 100,
      backgroundColor: isDarkMode ? dark55 : '#F2F2F3',
      borderRadius: 8
    },
    countryFlag: {
      fontSize: 20,
      marginRight: 8,
    },
    dialCode: {
      fontSize: 15,
      color: isDarkMode ? white : '#333',
      marginRight: 8,
      fontFamily: FONTS_FAMILY.Poppins_Regular
    },
    dropdownArrow: {
      fontSize: 10,
      color: '#666',
    },
    phoneInput: {
      flex: 1,
      paddingHorizontal: 20,
      fontSize: 15,
      color: isDarkMode ? white : '#333',
      backgroundColor: isDarkMode ? dark55 : '#F2F2F3',
      borderRadius: 8,
      fontFamily: FONTS_FAMILY.Poppins_Regular
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: isDarkMode ? darkMode25 : '#ffffff',
      paddingHorizontal: 20,
      paddingVertical: 20,
      paddingBottom: 70,
    },
    continueButton: {
      backgroundColor: App_Primary_color,
      borderRadius: 25,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
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
    loginRedirect: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 20
    },
    loginText: {
      fontSize: 14,
      fontFamily: FONTS_FAMILY.Poppins_Regular,
      color: isDarkMode ? 'white' : '#666',
    },
    loginLink: {
      fontSize: 14,
      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
      color: App_Primary_color,
      marginLeft: 4,
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : "dark-content"} backgroundColor={isDarkMode ? darkMode25 : "#ffffff"} />

      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Get started</Text>
          <Text style={styles.subtitle}>
            You can log in or make an account if you're new
          </Text>

          <View style={{ gap: 10 }}>
            <CustomInputField
              label={'Email'}
              placeholder={'Enter email'}
              onChangeText={setEmail}
            />

            <CustomInputField
              label={'Password'}
              placeholder={'Enter Password'}
              icon={<AntDesign name={'eye'} color={isDarkMode ? white : 'black'} size={20} />}
              onChangeText={setPassword}
              secureTextEntry={true}
              isPassword
            />
            <TouchableOpacity style={{
              alignSelf: 'flex-end'
            }}
            onPress={()=>navigation.navigate('ForgotPassword')}
            >
              <CustomText style={{
                fontFamily: FONTS_FAMILY.Poppins_Regular,
                color: App_Primary_color
              }}>Forgot Password</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Continue Button - Fixed at bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => onSubmit()}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.loginRedirect}>
        <Text style={styles.loginText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.loginLink}>Sign up</Text>
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
    </KeyboardAvoidingView>
  );
};

export default Login;