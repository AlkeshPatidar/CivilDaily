// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   StatusBar,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import { LinearGradient } from 'react-native-linear-gradient';
// import { App_Primary_color, dark55, darkMode25 } from '../../common/Colors/colors';
// import { BackWhite, ForwordChev } from '../../assets/SVGs';
// import { FONTS_FAMILY } from '../../assets/Fonts';
// import CustomInputField from '../../components/wrapper/CustomInput';
// import CustomButton from '../../components/Button';
// import { useSelector, useDispatch } from 'react-redux';
// import useLoader from '../../utils/LoaderHook';
// import { ToastMsg } from '../../utils/helperFunctions';
// import { inValidEmail, inValidNum } from '../../utils/CheckValidation';
// import { apiGet, apiPut, getItem } from '../../utils/Apis';
// import urls from '../../config/urls';
// import { setUser } from '../../redux/reducer/user';

// const EditProfile = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const { showLoader, hideLoader } = useLoader();

//   // Get user data from selector
//   let selector = useSelector(state => state?.user?.userData);
//   if (Object.keys(selector).length != 0) {
//     selector = JSON.parse(selector);
//   }

//   // Form states - initialize with user data
//   const [name, setName] = useState(selector?.name || '');
//   const [email, setEmail] = useState(selector?.email || '');
//   const [phone, setPhone] = useState(selector?.mobile?.toString() || '');

//   const { isDarkMode } = useSelector(state => state.theme);

//   const onUpdateProfile = async () => {
//     const token = await getItem('token')
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${token}`);
//     myHeaders.append("Content-Type", "application/json");

//     const raw = JSON.stringify({
//       "name": name,
//       "email": email,
//       "phone": phone
//     });

//     const requestOptions = {
//       method: "PUT",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow"
//     };

//     showLoader()
//     fetch("https://rr-store-backend.vercel.app/api/user/update-self", requestOptions)
//       .then((response) => response.text())
//       .then((result) => {
//         console.log('result::', result);

//         getUserProfile(urls.getSelf)

//         ToastMsg('User Updated Successfully')
//         hideLoader()
//       }
//       )
//       .catch((error) => {
//         console.error(error)
//         hideLoader()
//       });
//   };

//   const getUserProfile = async (endPoint) => {
//     try {
//       showLoader()
//       const response = await apiGet(endPoint)
//       dispatch(setUser(JSON.stringify(response?.data)))
//       navigation?.goBack()

//       hideLoader()
//     } catch (error) {
//       hideLoader()
//     }
//   }


//   // Call this function before API call to debug
//   // debugApiConfiguration();

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: isDarkMode ? darkMode25 : '#F8F9FA',
//     },
//     header: {
//       paddingTop: 10,
//       paddingBottom: 0,
//       paddingHorizontal: 20,
//     },
//     headerContent: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       marginBottom: 20,
//     },
//     backButton: {
//       width: 40,
//       height: 40,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     backArrow: {
//       color: 'white',
//       fontSize: 24,
//       fontWeight: '300',
//     },
//     headerTitle: {
//       color: 'white',
//       fontSize: 18,
//       fontWeight: '600',
//     },
//     headerRight: {
//       width: 40,
//     },
//     profileCard: {
//       backgroundColor: isDarkMode ? dark55 : '#9AB0EA',
//       borderRadius: 10,
//       padding: 20,
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginVertical: 10,
//       marginHorizontal: 20
//     },
//     profileImage: {
//       width: 60,
//       height: 60,
//       borderRadius: 30,
//       marginRight: 15,
//     },
//     profileInfo: {
//       flex: 1,
//     },
//     profileName: {
//       color: 'white',
//       fontSize: 20,
//       fontWeight: '600',
//       marginBottom: 4,
//     },
//     profileEmail: {
//       color: 'rgba(255, 255, 255, 0.8)',
//       fontSize: 14,
//     },
//     editButton: {
//       width: 40,
//       height: 40,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     editIcon: {
//       color: 'white',
//       fontSize: 18,
//     },
//     content: {
//       flex: 1,
//       backgroundColor: isDarkMode ? darkMode25 : 'white',
//       borderTopLeftRadius: 20,
//       borderTopRightRadius: 20,
//       paddingTop: 30,
//       marginHorizontal: 20,
//       paddingHorizontal: 20,
//       paddingBottom: 100, // Add padding for button space
//     },
//     section: {
//       marginBottom: 30,
//     },
//     sectionTitle: {
//       fontSize: 16,
//       fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//       color: '#1A1A1A',
//       marginBottom: 15,
//       paddingHorizontal: 20,
//     },
//     inputContainer: {
//       gap: 15,
//     },
//     buttonContainer: {
//       position: 'absolute',
//       bottom: 0,
//       left: 0,
//       right: 0,
//       backgroundColor: isDarkMode ? darkMode25 : '#F8F9FA',
//       paddingHorizontal: 20,
//       paddingVertical: 20,
//       paddingBottom: 40,
//     },
//   });

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <SafeAreaView style={styles.container}>
//         <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />

//         {/* Header */}
//         <LinearGradient
//           colors={[App_Primary_color, App_Primary_color]}
//           style={styles.header}
//         >
//           <View style={styles.headerContent}>
//             <TouchableOpacity
//               style={styles.backButton}
//               onPress={() => navigation.goBack()}
//             >
//               <BackWhite />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>Edit Profile</Text>
//             <View style={styles.headerRight} />
//           </View>
//         </LinearGradient>

//         {/* Profile Card */}
//         <View style={styles.profileCard}>
//           <Image
//             source={{
//               uri: selector?.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
//             }}
//             style={styles.profileImage}
//           />
//           <View style={styles.profileInfo}>
//             <Text style={styles.profileName}>{selector?.name || 'User Name'}</Text>
//             <Text style={styles.profileEmail}>{selector?.email || 'user@example.com'}</Text>
//           </View>
//         </View>

//         {/* Form Content */}
//         <ScrollView
//           style={styles.content}
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//         >
//           <View style={styles.inputContainer}>
//             <CustomInputField
//               label={'Name'}
//               placeholder={'Enter Name'}
//               value={name}
//               onChangeText={setName}
//             />

//             <CustomInputField
//               label={'Email'}
//               placeholder={'Enter Email'}
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//             />

//             <CustomInputField
//               label={'Phone Number'}
//               placeholder={'Enter Phone Number'}
//               value={phone}
//               onChangeText={setPhone}
//               keyboardType="phone-pad"
//               maxLength={10}
//             />
//           </View>
//         </ScrollView>

//         {/* Save Button - Fixed at bottom */}
//         <View style={styles.buttonContainer}>
//           <CustomButton
//             title={'Save'}
//             onPress={onUpdateProfile}
//           />
//         </View>
//       </SafeAreaView>
//     </KeyboardAvoidingView>
//   );
// };

// export default EditProfile;


import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { App_Primary_color, dark55, darkMode25 } from '../../common/Colors/colors';
import { BackWhite, ForwordChev } from '../../assets/SVGs';
import { FONTS_FAMILY } from '../../assets/Fonts';
import CustomInputField from '../../components/wrapper/CustomInput';
import CustomButton from '../../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import useLoader from '../../utils/LoaderHook';
import { ToastMsg } from '../../utils/helperFunctions';
import { inValidEmail, inValidNum } from '../../utils/CheckValidation';
import { apiGet, apiPut, getItem } from '../../utils/Apis';
import urls from '../../config/urls';
import { setUser } from '../../redux/reducer/user';

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { showLoader, hideLoader } = useLoader();

  // Get user data from selector
  let selector = useSelector(state => state?.user?.userData);
  if (Object.keys(selector).length != 0) {
    selector = JSON.parse(selector);
  }

  // Form states - initialize with user data
  const [name, setName] = useState(selector?.name || '');
  const [email, setEmail] = useState(selector?.email || '');
  const [phone, setPhone] = useState(selector?.mobile?.toString() || '');

  const { isDarkMode } = useSelector(state => state.theme);

  // Animation values
  const headerSlideAnim = useRef(new Animated.Value(-100)).current;
  const headerFadeAnim = useRef(new Animated.Value(0)).current;
  const profileCardScaleAnim = useRef(new Animated.Value(0.8)).current;
  const profileCardFadeAnim = useRef(new Animated.Value(0)).current;
  const contentSlideAnim = useRef(new Animated.Value(50)).current;
  const contentFadeAnim = useRef(new Animated.Value(0)).current;
  const inputFadeAnim = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Header slides down and fades in
    Animated.parallel([
      Animated.timing(headerSlideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(headerFadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Profile card scales up and fades in
    Animated.parallel([
      Animated.spring(profileCardScaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.timing(profileCardFadeAnim, {
        toValue: 1,
        duration: 600,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // 3. Content slides up and fades in
    Animated.parallel([
      Animated.timing(contentSlideAnim, {
        toValue: 0,
        duration: 700,
        delay: 400,
        useNativeDriver: true,
      }),
      Animated.timing(contentFadeAnim, {
        toValue: 1,
        duration: 700,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // 4. Input fields fade in
    Animated.timing(inputFadeAnim, {
      toValue: 1,
      duration: 600,
      delay: 600,
      useNativeDriver: true,
    }).start();

    // 5. Button spring effect
    Animated.spring(buttonScaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 40,
      delay: 800,
      useNativeDriver: true,
    }).start();

    // 6. Continuous floating animation for button
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const onUpdateProfile = async () => {
    const token = await getItem('token')
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "name": name,
      "email": email,
      "phone": phone
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    showLoader()
    fetch("https://rr-store-backend.vercel.app/api/user/update-self", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log('result::', result);

        getUserProfile(urls.getSelf)

        ToastMsg('User Updated Successfully')
        hideLoader()
      }
      )
      .catch((error) => {
        console.error(error)
        hideLoader()
      });
  };

  const getUserProfile = async (endPoint) => {
    try {
      showLoader()
      const response = await apiGet(endPoint)
      dispatch(setUser(JSON.stringify(response?.data)))
      navigation?.goBack()

      hideLoader()
    } catch (error) {
      hideLoader()
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? darkMode25 : '#F8F9FA',
    },
    header: {
      paddingTop: 10,
      paddingBottom: 0,
      paddingHorizontal: 20,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    backButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backArrow: {
      color: 'white',
      fontSize: 24,
      fontWeight: '300',
    },
    headerTitle: {
      color: 'white',
      fontSize: 18,
      fontWeight: '600',
    },
    headerRight: {
      width: 40,
    },
    profileCard: {
      backgroundColor: isDarkMode ? dark55 : '#f7b34dde',
      borderRadius: 10,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      marginHorizontal: 20,
      // opacity:0.5

    },
    profileImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 15,
    },
    profileInfo: {
      flex: 1,
    },
    profileName: {
      color: 'white',
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 4,
    },
    profileEmail: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: 14,
    },
    editButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    editIcon: {
      color: 'white',
      fontSize: 18,
    },
    content: {
      flex: 1,
      backgroundColor: isDarkMode ? darkMode25 : 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 30,
      marginHorizontal: 20,
      paddingHorizontal: 20,
      paddingBottom: 100,
    },
    section: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 16,
      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
      color: '#1A1A1A',
      marginBottom: 15,
      paddingHorizontal: 20,
    },
    inputContainer: {
      gap: 15,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: isDarkMode ? darkMode25 : '#F8F9FA',
      paddingHorizontal: 20,
      paddingVertical: 20,
      paddingBottom: 40,
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />

        {/* Header with Slide & Fade Animation */}
        <Animated.View
          style={{
            opacity: headerFadeAnim,
            transform: [{ translateY: headerSlideAnim }],
          }}
        >
          <LinearGradient
            colors={[App_Primary_color, App_Primary_color]}
            style={styles.header}
          >
            <View style={styles.headerContent}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
              >
                <BackWhite />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Edit Profile</Text>
              <View style={styles.headerRight} />
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Profile Card with Scale & Fade Animation */}
        <Animated.View
          style={{
            opacity: profileCardFadeAnim,
            transform: [{ scale: profileCardScaleAnim }],
          }}
        >
          <View style={styles.profileCard}>
            <Image
              source={{
                uri: selector?.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
              }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{selector?.name || 'User Name'}</Text>
              <Text style={styles.profileEmail}>{selector?.email || 'user@example.com'}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Form Content with Slide & Fade Animation */}
        <Animated.View
          style={{
            flex: 1,
            opacity: contentFadeAnim,
            transform: [{ translateY: contentSlideAnim }],
          }}
        >
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View
              style={[
                styles.inputContainer,
                {
                  opacity: inputFadeAnim,
                },
              ]}
            >
              <CustomInputField
                label={'Name'}
                placeholder={'Enter Name'}
                value={name}
                onChangeText={setName}
              />

              <CustomInputField
                label={'Email'}
                placeholder={'Enter Email'}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <CustomInputField
                label={'Phone Number'}
                placeholder={'Enter Phone Number'}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </Animated.View>
          </ScrollView>
        </Animated.View>

        {/* Save Button with Spring & Float Animation */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: buttonScaleAnim,
              transform: [
                {
                  scale: buttonScaleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
                { translateY: floatAnim },
              ],
            },
          ]}
        >
          <CustomButton
            title={'Save'}
            onPress={onUpdateProfile}
          />
        </Animated.View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;