
// import React from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   StatusBar,
//   SafeAreaView,
// } from 'react-native';
// import { LinearGradient } from 'react-native-linear-gradient';
// import { App_Primary_color, dark33, dark55, darkMode25, white } from '../../common/Colors/colors';
// import { BackWhite, ForwordChev } from '../../assets/SVGs';
// import { FONTS_FAMILY } from '../../assets/Fonts';
// import { useSelector } from 'react-redux';
// import { clearAsyncStorage } from '../../utils/Apis';

// const ProfilePage = ({ navigation }) => {

//     let selector = useSelector(state => state?.user?.userData);
//       if (Object.keys(selector).length != 0) {
//           selector = JSON.parse(selector);
//       }

//   const onLogout = async () => {
//     await clearAsyncStorage()
//     navigation.replace('Login')
//   }

//   const menuItems = [
//     {
//       section: 'General',
//       items: [
//         { icon: '📍', title: 'Address Detail', onPress: () => { navigation.navigate('AddressDetailsPage') } },
//         // { icon: '📦', title: 'Pickup Option', onPress: () => { } },
//         { icon: '🧾', title: 'My Orders', onPress: () => { navigation.navigate('MyOrdersPage') } },
//         { icon: 'ℹ️', title: 'Appearance', onPress: () => { navigation.navigate('AppearancePage') } },
//         // { icon: '🔒', title: 'Change Password', onPress: () => { } },
//       ],
//     },
//     {
//       section: 'Support',
//       items: [
//         { icon: '💬', title: 'Need Help? Lets Chat', onPress: () => { } },
//         { icon: '🔒', title: 'Privacy Policy', onPress: () => { navigation.navigate('PrivacyPolicy') } },
//         { icon: '📄', title: 'Terms of Service', onPress: () => { navigation.navigate('TermsAndcondition') } },
//       ],
//     },
//   ];

//   const { isDarkMode } = useSelector(state => state.theme);


//   const renderMenuItem = (item) => (
//     <TouchableOpacity
//       key={item.title}
//       style={styles.menuItem}
//       onPress={item.onPress}
//     >
//       <View style={styles.menuItemLeft}>
//         <View style={styles.iconContainer}>
//           <Text style={styles.iconText}>{item.icon}</Text>
//         </View>
//         <Text style={styles.menuItemText}>{item.title}</Text>
//       </View>
//       {/* <Text style={styles.chevron}>›</Text> */}
//       <ForwordChev />
//     </TouchableOpacity>
//   );

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#F8F9FA',
//     },
//     header: {
//       paddingTop: 10,
//       paddingBottom: 30,
//       paddingHorizontal: 20,
//     },
//     headerContent: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       marginBottom: 30,
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
//       backgroundColor: 'rgba(255, 255, 255, 0.15)',
//       borderRadius: 16,
//       padding: 20,
//       flexDirection: 'row',
//       alignItems: 'center',
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
//       marginTop: -15,
//       borderTopLeftRadius: 20,
//       borderTopRightRadius: 20,
//       paddingTop: 30,
//     },
//     section: {
//       marginBottom: 30,
//     },
//     sectionTitle: {
//       fontSize: 16,
//       fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//       color: isDarkMode ? white : '#1A1A1A',
//       marginBottom: 15,
//       paddingHorizontal: 20,
//     },
//     menuContainer: {
//       backgroundColor: isDarkMode ? dark33 : '#F8F9FA',
//       marginHorizontal: 20,
//       borderRadius: 12,
//       overflow: 'hidden',
//     },
//     menuItem: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       paddingVertical: 6,
//       paddingHorizontal: 20,
//       backgroundColor: 'white',
//       borderBottomWidth: 1,
//       borderBottomColor: '#CCCCCC',
//       backgroundColor: isDarkMode ? dark33 : '#F8F8F8'
//     },
//     menuItemLeft: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       flex: 1,
//     },
//     iconContainer: {
//       width: 40,
//       height: 40,
//       borderRadius: 20,
//       backgroundColor: isDarkMode ? dark55 : '#F8F9FA',
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginRight: 15,
//     },
//     iconText: {
//       fontSize: 16,

//     },
//     menuItemText: {
//       fontSize: 14,
//       color: isDarkMode ? 'white' : '#1A1A1A',
//       fontFamily: FONTS_FAMILY.Poppins_Medium
//     },
//     chevron: {
//       fontSize: 20,
//       color: '#C7C7CC',
//       fontWeight: '300',
//     },
//     logoutButton: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       paddingVertical: 8,
//       paddingHorizontal: 40,
//       marginTop: -20,
//       marginBottom: 120,
//       backgroundColor: isDarkMode ? dark33 : '#F8F8F8'
//     },
//     logoutIcon: {
//       color: '#FF3B30',
//       fontSize: 18,
//     },
//     logoutText: {
//       fontSize: 16,
//       color: '#FF3B30',
//       fontWeight: '500',
//     },
//   });

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />

//       {/* Header */}
//       <LinearGradient
//         colors={[App_Primary_color, App_Primary_color]}
//         style={styles.header}
//       >
//         <View style={styles.headerContent}>
//           <TouchableOpacity style={styles.backButton}>
//             {/* <Text style={styles.backArrow}>‹</Text> */}
//             <BackWhite />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>My Profile</Text>
//           <View style={styles.headerRight} />
//         </View>

//         {/* Profile Card */}
//         <View style={styles.profileCard}>
//           <Image
//             source={{
//               uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
//             }}
//             style={styles.profileImage}
//           />
//           <View style={styles.profileInfo}>
//             <Text style={styles.profileName}>{selector?.name}</Text>
//             <Text style={styles.profileEmail}>{selector?.email}</Text>
//           </View>
//           <TouchableOpacity style={styles.editButton}
//             onPress={() => navigation.navigate('EditProfile')}
//           >
//             <Text style={styles.editIcon}>✏️</Text>
//           </TouchableOpacity>
//         </View>
//       </LinearGradient>

//       {/* Menu Content */}

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {menuItems.map((section) => (
//           <View key={section.section} style={styles.section}>
//             <Text style={styles.sectionTitle}>{section.section}</Text>
//             <View style={styles.menuContainer}>
//               {section.items.map(renderMenuItem)}
//             </View>
//           </View>
//         ))}
//         {/* Logout Button */}
//         <TouchableOpacity style={styles.logoutButton}
//           onPress={() => onLogout()}
//         >
//           <View style={styles.menuItemLeft}>
//             <View style={styles.iconContainer}>
//               <Text style={styles.logoutIcon}>⚪</Text>
//             </View>
//             <Text style={styles.logoutText}>Log Out</Text>
//           </View>
//         </TouchableOpacity>

//       </ScrollView>
//     </SafeAreaView>
//   );
// };



// export default ProfilePage;


import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { App_Primary_color, dark33, dark55, darkMode25, white } from '../../common/Colors/colors';
import { BackWhite, ForwordChev } from '../../assets/SVGs';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { useSelector } from 'react-redux';
import { clearAsyncStorage } from '../../utils/Apis';
import { useIsFocused } from '@react-navigation/native';

const ProfilePage = ({ navigation }) => {

    let selector = useSelector(state => state?.user?.userData);
      if (Object.keys(selector).length != 0) {
          selector = JSON.parse(selector);
      }

  const { isDarkMode } = useSelector(state => state.theme);

  // Animation values
  const headerSlideAnim = useRef(new Animated.Value(-100)).current;
  const headerFadeAnim = useRef(new Animated.Value(0)).current;
  const profileCardScaleAnim = useRef(new Animated.Value(0.8)).current;
  const contentSlideAnim = useRef(new Animated.Value(50)).current;
  const contentFadeAnim = useRef(new Animated.Value(0)).current;
  const menuItemsAnim = useRef(new Animated.Value(0)).current;
  const logoutAnim = useRef(new Animated.Value(0)).current;

  const isFocused= useIsFocused()

  useEffect(() => {
    // Sequential animations for smooth entry
    Animated.sequence([
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
      ]),
      // 2. Profile card scales up (delayed)
      Animated.spring(profileCardScaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // 3. Content slides up and fades in (parallel with header)
    Animated.parallel([
      Animated.timing(contentSlideAnim, {
        toValue: 0,
        duration: 700,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(contentFadeAnim, {
        toValue: 1,
        duration: 700,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // 4. Menu items stagger animation
    Animated.timing(menuItemsAnim, {
      toValue: 1,
      duration: 800,
      delay: 400,
      useNativeDriver: true,
    }).start();

    // 5. Logout button fade in
    Animated.timing(logoutAnim, {
      toValue: 1,
      duration: 600,
      delay: 800,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  const onLogout = async () => {
    await clearAsyncStorage()
    navigation.replace('Login')
  }

  const menuItems = [
    {
      section: 'General',
      items: [
        { icon: '📍', title: 'Address Detail', onPress: () => { navigation.navigate('AddressDetailsPage') } },
        // { icon: '📦', title: 'Pickup Option', onPress: () => { } },
        { icon: '🧾', title: 'My Orders', onPress: () => { navigation.navigate('MyOrdersPage') } },
        { icon: 'ℹ️', title: 'Appearance', onPress: () => { navigation.navigate('AppearancePage') } },
        // { icon: '🔒', title: 'Change Password', onPress: () => { } },
      ],
    },
    {
      section: 'Support',
      items: [
        { icon: '💬', title: 'Need Help? Lets Chat', onPress: () => { } },
        { icon: '🔒', title: 'Privacy Policy', onPress: () => { navigation.navigate('PrivacyPolicy') } },
        { icon: '📄', title: 'Terms of Service', onPress: () => { navigation.navigate('TermsAndcondition') } },
      ],
    },
  ];

  const renderMenuItem = (item, index) => {
    const itemDelay = index * 100;
    const itemOpacity = menuItemsAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const itemTranslate = menuItemsAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [30, 0],
    });

    return (
      <Animated.View
        key={item.title}
        style={{
          opacity: itemOpacity,
          transform: [{ translateX: itemTranslate }],
        }}
      >
        <TouchableOpacity
          style={styles.menuItem}
          onPress={item.onPress}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemLeft}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>{item.icon}</Text>
            </View>
            <Text style={styles.menuItemText}>{item.title}</Text>
          </View>
          <ForwordChev />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F9FA',
    },
    header: {
      paddingTop: 10,
      paddingBottom: 30,
      paddingHorizontal: 20,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 30,
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
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderRadius: 16,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
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
      marginTop: -15,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 30,
    },
    section: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 16,
      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
      color: isDarkMode ? white : '#1A1A1A',
      marginBottom: 15,
      paddingHorizontal: 20,
    },
    menuContainer: {
      backgroundColor: isDarkMode ? dark33 : '#F8F9FA',
      marginHorizontal: 20,
      borderRadius: 12,
      overflow: 'hidden',
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 6,
      paddingHorizontal: 20,
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderBottomColor: '#CCCCCC',
      backgroundColor: isDarkMode ? dark33 : '#F8F8F8'
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDarkMode ? dark55 : '#F8F9FA',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    iconText: {
      fontSize: 16,

    },
    menuItemText: {
      fontSize: 14,
      color: isDarkMode ? 'white' : '#1A1A1A',
      fontFamily: FONTS_FAMILY.Poppins_Medium
    },
    chevron: {
      fontSize: 20,
      color: '#C7C7CC',
      fontWeight: '300',
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 40,
      marginTop: -20,
      marginBottom: 120,
      backgroundColor: isDarkMode ? dark33 : '#F8F8F8'
    },
    logoutIcon: {
      color: '#FF3B30',
      fontSize: 18,
    },
    logoutText: {
      fontSize: 16,
      color: '#FF3B30',
      fontWeight: '500',
    },
  });

  return (
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
              activeOpacity={0.7}
            >
              <BackWhite />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>My Profile</Text>
            <View style={styles.headerRight} />
          </View>

          {/* Profile Card with Scale Animation */}
          <Animated.View
            style={{
              transform: [
                { scale: profileCardScaleAnim },
              ],
            }}
          >
            <View style={styles.profileCard}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
                }}
                style={styles.profileImage}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{selector?.name}</Text>
                <Text style={styles.profileEmail}>{selector?.email}</Text>
              </View>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => navigation.navigate('EditProfile')}
                activeOpacity={0.7}
              >
                <Text style={styles.editIcon}>✏️</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </LinearGradient>
      </Animated.View>

      {/* Menu Content with Slide & Fade Animation */}
      <Animated.View
        style={{
          flex: 1,
          opacity: contentFadeAnim,
          transform: [{ translateY: contentSlideAnim }],
        }}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {menuItems.map((section, sectionIndex) => (
            <View key={section.section} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.section}</Text>
              <View style={styles.menuContainer}>
                {section.items.map((item, itemIndex) => 
                  renderMenuItem(item, sectionIndex * 10 + itemIndex)
                )}
              </View>
            </View>
          ))}
          
          {/* Logout Button with Fade Animation */}
          <Animated.View
            style={{
              opacity: logoutAnim,
            }}
          >
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={() => onLogout()}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.iconContainer}>
                  <Text style={styles.logoutIcon}>⚪</Text>
                </View>
                <Text style={styles.logoutText}>Log Out</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default ProfilePage;