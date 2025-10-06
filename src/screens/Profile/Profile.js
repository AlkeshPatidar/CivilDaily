// import React from 'react'
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   TouchableOpacity,
//   Image,
//   ScrollView,
// } from 'react-native'
// import {Back, BackArrow, EditIcon, ForwordChev} from '../../assets/SVGs'
// import {FONTS_FAMILY} from '../../assets/Fonts'
// import IMG from '../../assets/Images'
// import {App_Primary_color, darkMode25, darkOfPrimary, white} from '../../common/Colors/colors'
// import {clearAsyncStorage} from '../../utils/Apis'
// import {showError} from '../../utils/helperFunctions'
// import {useSelector} from 'react-redux'
// import {setEnabled} from 'react-native/Libraries/Performance/Systrace'
// import Ionicons from 'react-native-vector-icons/Ionicons'

// const ProfileScreen = ({navigation}) => {
//     const {isDarkMode} = useSelector(state => state.theme)

//   const menuItems = [
//     {icon: '💳', title: 'Bank Account', onPress: () => {}},
//     // {icon: '📄', title: 'All Attendees', onPress: () => {navigation.navigate('AtedessReq')}},
//     {icon: '📋', title: 'Delivery Details', onPress: () => {navigation.navigate('TermsAndConditionsScreen')}},
//     {icon: '📊', title: 'Linkes Social Midea', onPress: () => {}},
//     {icon: '🔔', title: 'Notification Settings', onPress: () => {}},
//     // {icon: '🌐', title: 'Language Settings', onPress: () => {}},
//     // {icon: '📄', title: 'Disclaimer', onPress: () => {}},
//     // {icon: '❌', title: 'Cancellation', onPress: () => {}},
//     {icon: '🔒', title: 'Terms & Condition', onPress: () => {navigation.navigate('TermsAndConditionsScreen')}},
//     {icon: '🔒', title: 'Privacy Policy', onPress: () => {navigation.navigate('PrivacyPolicyScreen')}},
//     {icon: '❓', title: 'Support', onPress: () => {navigation.navigate('Support')}},
//     {icon: '⚙️', title: 'Settings', onPress: () => {navigation.navigate('Settings')}},

//     {icon: 'ℹ️', title: 'About', onPress: () => {navigation.navigate('About')}},
//   ]

//   let selector = useSelector(state => state?.user?.userData)
//   if (Object.keys(selector).length != 0) {
//     selector = JSON.parse(selector)
//   }

//   console.log(selector, 'Selector')

//   const onLogout = async () => {
//     try {
//       await clearAsyncStorage()
//       navigation?.replace('Splash1')
//     } catch (error) {
//       showError('Error while logging out')
//     }
//   }

//   const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor:isDarkMode?darkMode25: 'white',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: App_Primary_color,
//     // marginTop: 30,
//   },
//   backButton: {
//     width: 30,
//     height: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   backArrow: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 18,
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   settingsButton: {
//     width: 30,
//     height: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   settingsIcon: {
//     fontSize: 20,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   profileSection: {
//     flexDirection: 'row',
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//     backgroundColor: App_Primary_color,
//     alignItems: 'center',
//   },
//   profileImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 40,
//     backgroundColor: '#ddd',
//   },
//   profileInfo: {
//     marginLeft: 15,
//     flex: 1,
//   },
//   profileName: {
//     color: 'white',
//     fontSize: 18,
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//     // marginBottom: 5,
//   },
//   profileEmail: {
//     color: 'white',
//     fontSize: 14,
//     opacity: 0.9,
//     marginBottom: 10,
//   },
//   editButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   editIcon: {
//     // marginRight: 20,
//     // fontSize: 14,
//   },
//   editText: {
//     color: 'white',
//     fontSize: 14,
//     textDecorationLine: 'underline',
//   },
//   balanceCard: {
//     backgroundColor: 'white',
//     marginHorizontal: 20,
//     marginTop: -10,
//     borderRadius: 15,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//     elevation: 5,
//     marginBottom: 20,
//   },
//   balanceHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   dollarIcon: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     backgroundColor: '#FFD700',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   dollarText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   viewHistoryButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   viewHistoryText: {
//     color: '#E85A4F',
//     fontSize: 12,
//     marginRight: 5,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   viewHistoryArrow: {
//     color: '#E85A4F',
//     fontSize: 16,
//   },
//   balanceAmount: {
//     fontSize: 32,
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//     color: '#333',
//     // marginBottom: 5,
//     alignSelf: 'center',
//   },
//   balanceEquivalent: {
//     fontSize: 14,
//     color: '#666',
//     alignSelf: 'center',
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   menuContainer: {
//       backgroundColor:isDarkMode?darkMode25: 'white',
//     marginHorizontal: 0,
//     // borderTopLeftRadius: 20,
//     // borderTopRightRadius: 20,
//     paddingTop: 10,
//     flex: 1,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 14,
//     borderBottomWidth: 0.5,
//     borderBottomColor:isDarkMode?'gray': '#f0f0f0',
//   },
//   menuLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   menuIcon: {
//     fontSize: 12,
//     marginRight: 12,
//     width: 25,
//   },
//   menuTitle: {
//     fontSize: 14,
//     color:isDarkMode?white: '#333',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   menuArrow: {
//     fontSize: 18,
//     color: '#ccc',
//   },
//   logoutButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor:isDarkMode?'#777': '#EDEFF2',
//     paddingVertical: 12,
//     borderRadius: 8,
//     // paddingHorizontal:60,
//     marginTop: 10,
//     width: '90%',
//     alignSelf: 'center',
//   },
//   logoutIcon: {
//     fontSize: 22,
//     marginRight: 10,
//     color: darkOfPrimary,
//     bottom:2
//   },
//   logoutText: {
//     fontSize: 16,
//     color: App_Primary_color,
//     fontWeight: '500',
//   },
//   bottomIndicator: {
//     width: 150,
//     height: 60,
//     // backgroundColor: '#333',
//     alignSelf: 'center',
//     borderRadius: 2,
//     marginTop: 20,
//     marginBottom: 10,
//   },
// })

//   return (
//     <View style={styles.container}>
//       <StatusBar
//         barStyle='light-content'
//         backgroundColor={App_Primary_color}
//         translucent={false}
//       />
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//         onPress={()=>navigation.goBack()}
//         >
//         <BackArrow />

//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>My Profile</Text>
//         <TouchableOpacity style={styles.settingsButton}>
//           <Text style={styles.settingsIcon}>☀️</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}>
//         {/* Profile Section */}
//         <View style={styles.profileSection}>
//           <Image source={selector?.Image?{uri:selector?.Image}:IMG.AvatorImage} style={styles.profileImage} />
//           <View style={styles.profileInfo}>
//             <Text style={styles.profileName}>
//               {selector?.FirstName}
//               {selector?.LastName}
//             </Text>
//             <Text style={styles.profileEmail}>{selector?.Email}</Text>
//             <TouchableOpacity style={styles.editButton}
//             onPress={() => navigation.navigate('EditInfluencerProfileScreen')}>
//               <EditIcon />
//               <Text style={styles.editText}>Edit Profile</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* <View style={styles.balanceCard}>
//           <View style={styles.balanceHeader}>
//             <View style={styles.dollarIcon}>
//               <Text style={styles.dollarText}>$</Text>
//             </View>
//             <TouchableOpacity style={styles.viewHistoryButton}>
//               <Text style={styles.viewHistoryText}>View History</Text>
//               <ForwordChev />
//             </TouchableOpacity>
//           </View>
//           <Text style={styles.balanceAmount}>500.000</Text>
//           <Text style={styles.balanceEquivalent}>Equivalent to Rp 500.000</Text>
//         </View> */}

//         {/* Menu Items */}
//         <View style={styles.menuContainer}>
//           {menuItems.map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               style={styles.menuItem}
//               onPress={item.onPress}>
//               <View style={styles.menuLeft}>
//                 <Text style={styles.menuIcon}>{item.icon}</Text>
//                 <Text style={styles.menuTitle}>{item.title}</Text>
//               </View>
//               {/* <Text style={styles.menuArrow}>›</Text> */}
//               <Ionicons name='chevron-forward' color={isDarkMode?'white':'black'} size={20} />
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Log Out Button */}
//         <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
//           <Text style={styles.logoutIcon}>⟲</Text>
//           <Text style={styles.logoutText}>Log Out</Text>
//         </TouchableOpacity>

//         {/* Bottom Indicator */}
//         <View style={styles.bottomIndicator} />
//       </ScrollView>
//     </View>
//   )
// }



// export default ProfileScreen



import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { App_Primary_color, dark33, dark55, darkMode25, white } from '../../common/Colors/colors';
import { BackWhite, ForwordChev } from '../../assets/SVGs';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { useSelector } from 'react-redux';
import { clearAsyncStorage } from '../../utils/Apis';

const ProfilePage = ({ navigation }) => {

    let selector = useSelector(state => state?.user?.userData);
      if (Object.keys(selector).length != 0) {
          selector = JSON.parse(selector);
      }

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

  const { isDarkMode } = useSelector(state => state.theme);


  const renderMenuItem = (item) => (
    <TouchableOpacity
      key={item.title}
      style={styles.menuItem}
      onPress={item.onPress}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{item.icon}</Text>
        </View>
        <Text style={styles.menuItemText}>{item.title}</Text>
      </View>
      {/* <Text style={styles.chevron}>›</Text> */}
      <ForwordChev />
    </TouchableOpacity>
  );

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

      {/* Header */}
      <LinearGradient
        colors={[App_Primary_color, App_Primary_color]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton}>
            {/* <Text style={styles.backArrow}>‹</Text> */}
            <BackWhite />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Profile</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Profile Card */}
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
          <TouchableOpacity style={styles.editButton}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Menu Content */}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {menuItems.map((section) => (
          <View key={section.section} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.section}</Text>
            <View style={styles.menuContainer}>
              {section.items.map(renderMenuItem)}
            </View>
          </View>
        ))}
        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}
          onPress={() => onLogout()}
        >
          <View style={styles.menuItemLeft}>
            <View style={styles.iconContainer}>
              <Text style={styles.logoutIcon}>⚪</Text>
            </View>
            <Text style={styles.logoutText}>Log Out</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};



export default ProfilePage;