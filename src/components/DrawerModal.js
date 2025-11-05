// import React, { useRef, useEffect } from 'react';
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     StyleSheet,
//     Modal,
//     Animated,
//     Dimensions,
//     TouchableWithoutFeedback,
//     ScrollView,
//     Image,
// } from 'react-native';
// import { FONTS_FAMILY } from '../assets/Fonts';
// import { App_Primary_color, dark33, dark55, darkMode25, white } from '../common/Colors/colors';
// import { useSelector } from 'react-redux';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import IMG from '../assets/Images';
// import { clearAsyncStorage } from '../utils/Apis';
// import { useLoginCheck } from '../utils/Context';

// const { width } = Dimensions.get('window');
// const DRAWER_WIDTH = width * 0.75;

// const DrawerMenu = ({ visible, onClose, navigation }) => {
//     const { isDarkMode } = useSelector(state => state.theme);
//     const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
//     const fadeAnim = useRef(new Animated.Value(0)).current;

//      const { loggedInby, setloggedInby } = useLoginCheck()
 

//     useEffect(() => {
//         if (visible) {
//             // Open drawer - slide from left to right
//             Animated.parallel([
//                 Animated.timing(slideAnim, {
//                     toValue: 0,
//                     duration: 300,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(fadeAnim, {
//                     toValue: 1,
//                     duration: 300,
//                     useNativeDriver: true,
//                 }),
//             ]).start();
//         } else {
//             // Close drawer - slide from right to left
//             Animated.parallel([
//                 Animated.timing(slideAnim, {
//                     toValue: -DRAWER_WIDTH,
//                     duration: 300,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(fadeAnim, {
//                     toValue: 0,
//                     duration: 300,
//                     useNativeDriver: true,
//                 }),
//             ]).start();
//         }
//     }, [visible]);

//     const handleClose = () => {
//         // Animate out first, then close
//         Animated.parallel([
//             Animated.timing(slideAnim, {
//                 toValue: -DRAWER_WIDTH,
//                 duration: 300,
//                 useNativeDriver: true,
//             }),
//             Animated.timing(fadeAnim, {
//                 toValue: 0,
//                 duration: 300,
//                 useNativeDriver: true,
//             }),
//         ]).start(() => {
//             onClose();
//         });
//     };

    
//       const onLogout = async () => {
//         await clearAsyncStorage()
//         // navigation.replace('Login')
//         navigation.replace('RoleSelection')
    
//       }

//     const menuItems = [
//         {
//             section: 'EXECUTIVE PROFILE',
//             items: [
//                 {
//                     label: 'Profile',
//                     icon: 'person-outline',
//                     iconType: 'Ionicons',
//                     route: 'ExecutiveProfile',
//                 },
//             ],
//         },
//         {
//             section: 'EXECUTIVE USER',
//             items: [
//                 {
//                     label: 'Add User',
//                     icon: 'person-add-outline',
//                     iconType: 'Ionicons',
//                     route: 'AddUserScreen',
//                 },
//                 {
//                     label: 'All Users',
//                     icon: 'people-outline',
//                     iconType: 'Ionicons',
//                     route: 'AllUsersScreen',
//                 },
//             ],
//         },
//         {
//             section: 'ALL REQUIREMENT',
//             items: [
//                 {
//                     label: 'All Requirement',
//                     icon: 'clipboard-list-outline',
//                     iconType: 'MaterialCommunityIcons',
//                     route: 'ExecutiveAllRequirement',
//                 },
//             ],
//         },
//     ];

//     const handleMenuPress = (route) => {
//         handleClose();
//         setTimeout(() => {
//             navigation.navigate(route);
//         }, 350);
//     };

//     const styles = StyleSheet.create({
//         overlay: {
//             flex: 1,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         },
//         drawerContainer: {
//             position: 'absolute',
//             left: 0,
//             top: 0,
//             bottom: 0,
//             width: DRAWER_WIDTH,
//             backgroundColor: isDarkMode ? dark33 : '#E5E7EB',
//             shadowColor: '#000',
//             shadowOffset: {
//                 width: 2,
//                 height: 0,
//             },
//             shadowOpacity: 0.25,
//             shadowRadius: 10,
//             elevation: 10,
//         },
//         header: {
//             paddingTop: 60,
//             paddingBottom: 30,
//             paddingHorizontal: 24,
//             backgroundColor: isDarkMode ? darkMode25 : '#F9FAFB',
//             borderBottomWidth: 1,
//             borderBottomColor: isDarkMode ? dark55 : '#E5E7EB',
//         },
//         appName: {
//             fontSize: 28,
//             fontFamily: FONTS_FAMILY.Poppins_Bold,
//             color: isDarkMode ? white : '#1F2937',
//             letterSpacing: 0.5,
//             textAlign: 'center',
//             lineHeight: 36,
//         },
//         menuContent: {
//             flex: 1,
//             paddingTop: 10,
//         },
//         section: {
//             marginTop: 20,
//         },
//         sectionTitle: {
//             fontSize: 11,
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//             color: isDarkMode ? '#9CA3AF' : '#6B7280',
//             paddingHorizontal: 24,
//             letterSpacing: 0.5,
//         },
//         menuItem: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             paddingVertical: 5,
//             paddingHorizontal: 24,
//             marginHorizontal: 12,
//             borderRadius: 10,
//         },
//         menuItemActive: {
//             backgroundColor: isDarkMode ? dark55 : '#F3F4F6',
//         },
//         iconContainer: {
//             width: 36,
//             height: 36,
//             borderRadius: 10,
//             backgroundColor: isDarkMode ? darkMode25 : '#F9FAFB',
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginRight: 16,
//         },
//         menuLabel: {
//             fontSize: 15,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             color: isDarkMode ? white : '#374151',
//             flex: 1,
//         },
//         footer: {
//             padding: 24,
//             borderTopWidth: 1,
//             borderTopColor: isDarkMode ? dark55 : '#E5E7EB',
//         },
//         logoutButton: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'center',
//             paddingVertical: 14,
//             paddingHorizontal: 24,
//             borderRadius: 12,
//             backgroundColor: isDarkMode ? '#DC2626' : '#FEE2E2',
//         },
//         logoutText: {
//             fontSize: 15,
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//             color: isDarkMode ? white : '#DC2626',
//             marginLeft: 10,
//         },
//     });

//     if (!visible) return null;

//     return (
//         <Modal
//             visible={visible}
//             transparent
//             animationType="none"
//             onRequestClose={handleClose}
//         >
//             <TouchableWithoutFeedback onPress={handleClose}>
//                 <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
//                     <TouchableWithoutFeedback>
//                         <Animated.View
//                             style={[
//                                 styles.drawerContainer,
//                                 {
//                                     transform: [{ translateX: slideAnim }],
//                                 },
//                             ]}
//                         >
//                             <View style={{
//                                 width:'100%',
//                                 backgroundColor:'white'
//                             }}>
//                             <Image
//                                 source={IMG.SplashLogo}
//                                 style={{ width: 200, height: 100, alignSelf: 'center', }}
//                             />

//                             </View>

//                             {/* Menu Items */}
//                             <ScrollView
//                                 style={styles.menuContent}
//                                 showsVerticalScrollIndicator={false}
//                             >
//                                 {menuItems.map((section, sectionIndex) => (
//                                     <View key={sectionIndex} style={styles.section}>
//                                         <Text style={styles.sectionTitle}>{section.section}</Text>
//                                         {section.items.map((item, itemIndex) => (
//                                             <TouchableOpacity
//                                                 key={itemIndex}
//                                                 style={styles.menuItem}
//                                                 onPress={() => handleMenuPress(item.route)}
//                                                 activeOpacity={0.7}
//                                             >
//                                                 <View style={styles.iconContainer}>
//                                                     {item.iconType === 'Ionicons' ? (
//                                                         <Ionicons
//                                                             name={item.icon}
//                                                             size={20}
//                                                             color={isDarkMode ? white : '#6B7280'}
//                                                         />
//                                                     ) : (
//                                                         <MaterialCommunityIcons
//                                                             name={item.icon}
//                                                             size={20}
//                                                             color={isDarkMode ? white : '#6B7280'}
//                                                         />
//                                                     )}
//                                                 </View>
//                                                 <Text style={styles.menuLabel}>{item.label}</Text>
//                                             </TouchableOpacity>
//                                         ))}
//                                     </View>
//                                 ))}
//                             </ScrollView>

//                             {/* Footer - Logout Button */}
//                             <View style={styles.footer}>
//                                 <TouchableOpacity
//                                     style={styles.logoutButton}
//                                     onPress={() => {
//                                         // handleClose();
//                                         // Handle logout logic
//                                         onLogout()
//                                     }}
//                                     activeOpacity={0.7}
//                                 >
//                                     <Ionicons
//                                         name="log-out-outline"
//                                         size={22}
//                                         color={isDarkMode ? white : '#DC2626'}
//                                     />
//                                     <Text style={styles.logoutText}>Logout</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </Animated.View>
//                     </TouchableWithoutFeedback>
//                 </Animated.View>
//             </TouchableWithoutFeedback>
//         </Modal>
//     );
// };

// export default DrawerMenu;


import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Animated,
    Dimensions,
    TouchableWithoutFeedback,
    ScrollView,
    Image,
} from 'react-native';
import { FONTS_FAMILY } from '../assets/Fonts';
import { App_Primary_color, dark33, dark55, darkMode25, white } from '../common/Colors/colors';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IMG from '../assets/Images';
import { clearAsyncStorage } from '../utils/Apis';
import { useLoginCheck } from '../utils/Context';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.75;

const DrawerMenu = ({ visible, onClose, navigation }) => {
    const { isDarkMode } = useSelector(state => state.theme);
    const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const { loggedInby, setloggedInby } = useLoginCheck();

    useEffect(() => {
        if (visible) {
            // Open drawer - slide from left to right
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            // Close drawer - slide from right to left
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -DRAWER_WIDTH,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible]);

    const handleClose = () => {
        // Animate out first, then close
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: -DRAWER_WIDTH,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onClose();
        });
    };

    const onLogout = async () => {
        await clearAsyncStorage();
        navigation.replace('RoleSelection');
    };

    // Menu items for Field Executive
    const fieldExecutiveMenuItems = [
        {
            section: 'EXECUTIVE PROFILE',
            items: [
                {
                    label: 'Profile',
                    icon: 'person-outline',
                    iconType: 'Ionicons',
                    route: 'ExecutiveProfile',
                },
            ],
        },
        {
            section: 'EXECUTIVE USER',
            items: [
                {
                    label: 'Add User',
                    icon: 'person-add-outline',
                    iconType: 'Ionicons',
                    route: 'AddUserScreen',
                },
                {
                    label: 'All Users',
                    icon: 'people-outline',
                    iconType: 'Ionicons',
                    route: 'AllUsersScreen',
                },
            ],
        },
        {
            section: 'ALL REQUIREMENT',
            items: [
                {
                    label: 'All Requirement',
                    icon: 'clipboard-list-outline',
                    iconType: 'MaterialCommunityIcons',
                    route: 'ExecutiveAllRequirement',
                },
            ],
        },
    ];

    // Menu items for other users (User/Customer)
    const userMenuItems = [
        {
            section: 'MY ACCOUNT',
            items: [
                {
                    label: 'Profile',
                    icon: 'person-outline',
                    iconType: 'Ionicons',
                    route: 'UserProfile',
                },
            ],
        },
        {
            section: 'REQUIREMETS',
            items: [
                {
                    label: 'All Requirements',
                    icon: 'briefcase-outline',
                    iconType: 'Ionicons',
                    route: 'SuplierAllRequirement',
                },
                {
                    label: 'Pending Requirement',
                    icon: 'add-circle-outline',
                    iconType: 'Ionicons',
                    route: 'SupplierpendingRequirement',
                },
            ],
        },
        {
            section: 'BIDS',
            items: [
                {
                    label: 'All Bids',
                    icon: 'clipboard-list-outline',
                    iconType: 'MaterialCommunityIcons',
                    route: 'AllMyBids',
                },
            ],

            
        },
         {
            section: 'TRANSACTIONS',
            items: [
                {
                    label: 'All Transactions',
                    icon: 'clipboard-list-outline',
                    iconType: 'MaterialCommunityIcons',
                    route: 'AllTransaction',
                },
            ],

            
        },
    ];

    // Choose menu items based on loggedInby
    const menuItems = loggedInby === 'field_executive' 
        ? fieldExecutiveMenuItems 
        : userMenuItems;

    const handleMenuPress = (route) => {
        handleClose();
        setTimeout(() => {
            navigation.navigate(route);
        }, 350);
    };

    const styles = StyleSheet.create({
        overlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        drawerContainer: {
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: DRAWER_WIDTH,
            backgroundColor: isDarkMode ? dark33 : '#E5E7EB',
            shadowColor: '#000',
            shadowOffset: {
                width: 2,
                height: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 10,
        },
        header: {
            width: '100%',
            backgroundColor: 'white',
        },
        logoContainer: {
            width: 200,
            height: 100,
            alignSelf: 'center',
        },
        menuContent: {
            flex: 1,
            paddingTop: 10,
        },
        section: {
            marginTop: 20,
        },
        sectionTitle: {
            fontSize: 11,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: isDarkMode ? '#9CA3AF' : '#6B7280',
            paddingHorizontal: 24,
            letterSpacing: 0.5,
        },
        menuItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5,
            paddingHorizontal: 24,
            marginHorizontal: 12,
            borderRadius: 10,
        },
        menuItemActive: {
            backgroundColor: isDarkMode ? dark55 : '#F3F4F6',
        },
        iconContainer: {
            width: 36,
            height: 36,
            borderRadius: 10,
            backgroundColor: isDarkMode ? darkMode25 : '#F9FAFB',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 16,
        },
        menuLabel: {
            fontSize: 15,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? white : '#374151',
            flex: 1,
        },
        footer: {
            padding: 24,
            borderTopWidth: 1,
            borderTopColor: isDarkMode ? dark55 : '#E5E7EB',
        },
        logoutButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 14,
            paddingHorizontal: 24,
            borderRadius: 12,
            backgroundColor: isDarkMode ? '#DC2626' : '#FEE2E2',
        },
        logoutText: {
            fontSize: 15,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: isDarkMode ? white : '#DC2626',
            marginLeft: 10,
        },
    });

    if (!visible) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={handleClose}
        >
            <TouchableWithoutFeedback onPress={handleClose}>
                <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                    <TouchableWithoutFeedback>
                        <Animated.View
                            style={[
                                styles.drawerContainer,
                                {
                                    transform: [{ translateX: slideAnim }],
                                },
                            ]}
                        >
                            {/* Logo Header */}
                            <View style={styles.header}>
                                <Image
                                    source={IMG.SplashLogo}
                                    style={styles.logoContainer}
                                />
                            </View>

                            {/* Menu Items */}
                            <ScrollView
                                style={styles.menuContent}
                                showsVerticalScrollIndicator={false}
                            >
                                {menuItems.map((section, sectionIndex) => (
                                    <View key={sectionIndex} style={styles.section}>
                                        <Text style={styles.sectionTitle}>{section.section}</Text>
                                        {section.items.map((item, itemIndex) => (
                                            <TouchableOpacity
                                                key={itemIndex}
                                                style={styles.menuItem}
                                                onPress={() => handleMenuPress(item.route)}
                                                activeOpacity={0.7}
                                            >
                                                <View style={styles.iconContainer}>
                                                    {item.iconType === 'Ionicons' ? (
                                                        <Ionicons
                                                            name={item.icon}
                                                            size={20}
                                                            color={isDarkMode ? white : '#6B7280'}
                                                        />
                                                    ) : (
                                                        <MaterialCommunityIcons
                                                            name={item.icon}
                                                            size={20}
                                                            color={isDarkMode ? white : '#6B7280'}
                                                        />
                                                    )}
                                                </View>
                                                <Text style={styles.menuLabel}>{item.label}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                ))}
                            </ScrollView>

                            {/* Footer - Logout Button */}
                            <View style={styles.footer}>
                                <TouchableOpacity
                                    style={styles.logoutButton}
                                    onPress={onLogout}
                                    activeOpacity={0.7}
                                >
                                    <Ionicons
                                        name="log-out-outline"
                                        size={22}
                                        color={isDarkMode ? white : '#DC2626'}
                                    />
                                    <Text style={styles.logoutText}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default DrawerMenu;