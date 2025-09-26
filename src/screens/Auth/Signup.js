import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { App_Primary_color, dark33, dark55, darkMode25, white } from '../../common/Colors/colors';
import { useDispatch, useSelector } from 'react-redux';
import CustomInputField from '../../components/wrapper/CustomInput';
import useLoader from '../../utils/LoaderHook';
import { inValidEmail, inValidPassword, inValidNum } from '../../utils/CheckValidation';
import { ToastMsg } from '../../utils/helperFunctions';
import urls from '../../config/urls';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { apiPost, getItem, setItem } from '../../utils/Apis';
import { setUser } from '../../redux/reducer/user';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const { showLoader, hideLoader } = useLoader();
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector(state => state.theme);

 
  const onSubmit = async () => {
    // Validation
    if (name === '') {
      ToastMsg('Name is Required');
      return;
    }

    const emailError = inValidEmail(email);
    if (emailError) {
      ToastMsg(emailError);
      return;
    }

    const passwordError = inValidPassword(password);
    if (passwordError) {
      ToastMsg(passwordError);
      return;
    }

    const mobileError = inValidNum(mobile);
    if (mobileError) {
      ToastMsg(mobileError);
      return;
    }

    try {
      showLoader();
      const data = { 
        name: name, 
        email: email, 
        password: password, 
        mobile: mobile 
      };
      const response = await apiPost(urls?.signUp, data);
      console.log('response Of Signup', response);
      // Always hide loader first
      hideLoader();
      if (response?.data?.statusCode === 200) {
        ToastMsg('Account created successfully');
        navigation?.goBack();
      }
    } catch (error) {
      hideLoader();
      if (error?.message) {
        ToastMsg(error?.message);
        console.log('Signup Error:', error);
      } else {
        ToastMsg('Network Error');
      }
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? darkMode25 : '#ffffff',
    },
    scrollViewContainer: {
      flexGrow: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
      marginTop: 150,
      paddingBottom: 100,
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
    inputContainer: {
      gap: 10,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: isDarkMode ? darkMode25 : '#ffffff',
      paddingHorizontal: 20,
      paddingVertical: 20,
      paddingBottom: 40,
    },
    signupButton: {
      backgroundColor: App_Primary_color,
      borderRadius: 25,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    signupButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    },
    loginRedirect: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
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
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : "dark-content"} 
        backgroundColor={isDarkMode ? darkMode25 : "#ffffff"} 
      />

      <ScrollView 
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Fill in your details to create a new account
          </Text>

          <View style={styles.inputContainer}>
            <CustomInputField
              label={'Full Name'}
              placeholder={'Enter your full name'}
              onChangeText={setName}
              value={name}
            />

            <CustomInputField
              label={'Email'}
              placeholder={'Enter your email'}
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
            />

            <CustomInputField
              label={'Password'}
              placeholder={'Enter password'}
              icon={<AntDesign name={'eye'} color={isDarkMode ? white : 'black'} size={20} />}
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
              isPassword
            />

            <CustomInputField
              label={'Mobile Number'}
              placeholder={'Enter mobile number'}
              onChangeText={setMobile}
              value={mobile}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
        </View>
        <View style={{height:100}}/> 
      </ScrollView>

      {/* Signup Button - Fixed at bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.signupButton}
          onPress={() => onSubmit()}
        >
          <Text style={styles.signupButtonText}>Create Account</Text>
        </TouchableOpacity>
        
        <View style={styles.loginRedirect}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;