
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
  Image,
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
import IMG from '../../assets/Images';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const { showLoader, hideLoader } = useLoader();
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector(state => state.theme);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const titleSlide = useRef(new Animated.Value(-30)).current;
  const inputFade = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.8)).current;
  const floatingAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.2)),
      }),
      Animated.timing(titleSlide, {
        toValue: 0,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(inputFade, {
        toValue: 1,
        duration: 800,
        delay: 400,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScale, {
        toValue: 1,
        delay: 500,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

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
        FullName: name, 
        Email: email, 
        Number: password, 
        Password: mobile 
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
      // marginTop: 150,
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

  const floatingTranslate = floatingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
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
        {/* Content with Animations */}
           <Image
                source={IMG.construction}
                style={{height:130, alignSelf:'center',}}
                resizeMode='contain'
                />
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Animated.View
            style={{
              transform: [{ translateY: titleSlide }],
            }}
          >
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Fill in your details to create a new account
            </Text>
          </Animated.View>

          {/* Input Fields with Fade Animation */}
          <Animated.View
            style={[
              styles.inputContainer,
              {
                opacity: inputFade,
              }
            ]}
          >
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
              label={'Mobile Number'}
              placeholder={'Enter mobile number'}
              onChangeText={setMobile}
              value={mobile}
              keyboardType="phone-pad"
              maxLength={10}
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

             {/* <CustomInputField
              label={'Confirm Password'}
              placeholder={'Enter Confirm password'}
              icon={<AntDesign name={'eye'} color={isDarkMode ? white : 'black'} size={20} />}
              // onChangeText={setPassword}
              // value={password}
              secureTextEntry={true}
              isPassword
            /> */}

          
          </Animated.View>
        </Animated.View>
        <View style={{height:100}}/> 
      </ScrollView>

      {/* Signup Button - Fixed at bottom with Animation */}
      <Animated.View 
        style={[
          styles.buttonContainer,
          {
            transform: [
              { scale: buttonScale },
              { translateY: floatingTranslate }
            ],
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.signupButton}
          // onPress={() => onSubmit()}
          onPress={() => onSubmit()}
            // onPress={() => navigation.navigate('Login')}


          activeOpacity={0.8}
        >
          <Text style={styles.signupButtonText}>Create Account</Text>
        </TouchableOpacity>
        
        <Animated.View 
          style={[
            styles.loginRedirect,
            {
              opacity: fadeAnim,
            }
          ]}
        >
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
          >
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default Signup;