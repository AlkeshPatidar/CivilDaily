


import React, {
    useEffect, useState, useRef,
    useCallback

} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    Image,
    RefreshControl,
    Animated,
    ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { App_Primary_color, dark33, dark55, darkMode25, white } from '../../../common/Colors/colors';
import { FONTS_FAMILY } from '../../../assets/Fonts';
import Row from '../../../components/wrapper/row';
import { AddButton, DownChev } from '../../../assets/SVGs';
import IMG from '../../../assets/Images';
import SpaceBetweenRow from '../../../components/wrapper/spacebetween';
import { useSelector } from 'react-redux';
import { apiGet } from '../../../utils/Apis';
import urls from '../../../config/urls';
import useLoader from '../../../utils/LoaderHook';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import HomeScreenSkeletonLoader from '../../../components/Skeleton/HomeSkeletonLoader';
import { useIsFocused } from '@react-navigation/native';
import CustomText from '../../../components/TextComponent';
import BlinKitLoader from '../../../components/Skeleton/BlinkitLoader';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform, Alert, Dimensions } from 'react-native';
import AllPrducts from './All';
import CustomButton from '../../../components/Button';
import HowItsWork from './HowItWorks';


const { width } = Dimensions.get('window');




export default function HomeScreen({ navigation }) {
    let selector = useSelector(state => state?.user?.userData);
    if (Object.keys(selector).length != 0) {
        selector = JSON.parse(selector);
    }

    const { showLoader, hideLoader } = useLoader()
    const [categories, setCategories] = useState([])

    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const { isDarkMode } = useSelector(state => state.theme);
    const isFocused = useIsFocused()

    const [cartCount, setCartCount] = useState(0);
    const [notificationCount, setNotificationCount] = useState(0);

    const headerAnim = useRef(new Animated.Value(-100)).current;
    const searchAnim = useRef(new Animated.Value(0)).current;
    const floatingButtonAnim = useRef(new Animated.Value(400)).current;
    const floatWobbleAnim = useRef(new Animated.Value(0)).current;

    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setRefreshTrigger(prev => prev + 1); // 🔥 trigger change
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    // useEffect(() => {
    //     fetchCartData();
    //     fetchNotificationCount();
    //     const interval = setInterval(() => {
    //         fetchCartData();
    //         fetchNotificationCount();
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, []);

    // api/admin/GetAllCompareProduct

   

    const animateHeader = () => {
        Animated.spring(headerAnim, {
            toValue: 0,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        initializeData()
    }, [])

    useEffect(() => {
        animateHeader();
    }, [isFocused])

    useEffect(() => {
        let wobbleLoop;

        if (cartCount > 0) {
            Animated.spring(floatingButtonAnim, {
                toValue: 0,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            }).start();

            wobbleLoop = Animated.loop(
                Animated.sequence([
                    Animated.timing(floatWobbleAnim, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                    Animated.timing(floatWobbleAnim, {
                        toValue: -1,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                ])
            );
            wobbleLoop.start();
        } else {
            floatWobbleAnim.stopAnimation();
            if (wobbleLoop) wobbleLoop.stop();

            Animated.timing(floatingButtonAnim, {
                toValue: 400,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }

        return () => {
            if (wobbleLoop) wobbleLoop.stop();
        };
    }, [cartCount]);

    async function requestUserPermission() {
        if (Platform.OS === 'ios') {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                console.log('Authorization status:', authStatus);
            }
        } else {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            );
            console.log('Notification permission:', granted);
        }
    }

    async function getFCMToken() {
        try {
            const token = await messaging().getToken();
            console.log('FCM Token:', token);
            return token;
        } catch (error) {
            console.log('Error getting token:', error);
        }
    }

    useEffect(() => {
        requestUserPermission();
        getFCMToken();

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert(
                remoteMessage.notification?.title || 'Notification',
                remoteMessage.notification?.body || 'New message'
            );
            console.log('Foreground notification:', remoteMessage);
        });

        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Background notification:', remoteMessage);
        });

        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log('Notification opened app:', remoteMessage);
        });

        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log('App opened from quit state:', remoteMessage);
                }
            });

        return unsubscribe;
    }, []);

    const fetchCartData = async () => {
        try {
            const res = await apiGet(urls?.getCartData);
            const count = res?.data?.items?.length || 0;
            setCartCount(count);
        } catch (error) {
            console.log('Error fetching cart data:', error);
        }
    };

    const fetchNotificationCount = async () => {
        try {
            const res = await apiGet(urls?.getNotifictations);
            const items = res?.data?.items || res?.data || [];
            const unreadCount = items.filter(item => item.isRead === false).length;
            setNotificationCount(unreadCount);
        } catch (error) {
            console.log('Error fetching notification count:', error);
        }
    };



    const initializeData = async () => {
        setIsLoading(true)
        await Promise.all([
            getCategories(),
        ])
        setIsLoading(false)
    }


    const getCategories = async () => {
        try {
            const res = await apiGet(urls?.getCategory)
            setCategories(res?.data || [])
        } catch (error) {
            console.log('Error fetching categories:', error)
        }
    }



    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? darkMode25 : '#F8F8F8',
        },
        headerContainer: {
            // backgroundColor: App_Primary_color,
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 12,
        },
        topBar: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
        },
        leftHeader: {
            flex: 1,
        },
        deliverText: {
            // color: 'rgba(255, 255, 255, 0.9)',
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 18,
            marginBottom: 2,
            color: '#333',

        },
        locationText: {
            // color: 'white',
            color: '#333',
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 14,
            maxWidth: 180,
        },
        rightHeader: {
            flexDirection: 'row',
            gap: 12,
        },
        iconButton: {
            position: 'relative',
            padding: 4,
        },
        badge: {
            position: 'absolute',
            top: -2,
            right: -2,
            backgroundColor: 'red',
            borderRadius: 10,
            minWidth: 18,
            height: 18,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 4,
        },
        badgeText: {
            color: white,
            fontSize: 10,
            fontFamily: FONTS_FAMILY.Poppins_Bold,
        },
        searchContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#E8EFF3',
            borderRadius: 12,
            paddingHorizontal: 14,
            height: 46,
        },
        searchIcon: {
            marginRight: 10,
        },
        searchInput: {
            flex: 1,
            fontSize: 14,
            color: '#000',
            fontFamily: FONTS_FAMILY.Poppins_Regular,
        },
        filterCategoriesContainer: {
            // backgroundColor: isDarkMode ? dark33 : 'white',
            top: 12,
            // paddingHorizontal: 8,
            // borderBottomWidth: 1,
            // borderBottomColor: isDarkMode ? dark55 : '#F0F0F0',
        },
        filterCategoriesScroll: {
            paddingHorizontal: 8,
        },
        filterCategoryChip: {
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            marginRight: 8,
            alignItems: 'center',
            // borderWidth: 1,
        },
        filterCategoryChipActive: {
            // backgroundColor: App_Primary_color,
            // borderColor: App_Primary_color,
            // borderBottomWidth:3,
            // borderWidth:0,
            borderColor: white,

        },
        filterCategoryChipInactive: {
            // backgroundColor: isDarkMode ? dark55 : '#F8F8F8',
            // borderColor: isDarkMode ? dark55 : '#E0E0E0',
        },
        filterCategoryText: {
            fontSize: 13,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: white
        },
        filterCategoryTextActive: {
            color: 'white',
        },
        filterCategoryTextInactive: {
            color: white,
        },
        categoriesSection: {
            backgroundColor: isDarkMode ? dark33 : 'white',
            paddingVertical: 12,
            paddingHorizontal: 16,
            marginBottom: 8,
        },
        categoriesTitle: {
            fontSize: 16,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: isDarkMode ? white : '#000',
            marginBottom: 12,
        },
        categoriesGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        categoryChip: {
            width: (width - 48) / 4,
            alignItems: 'center',
            marginBottom: 12,
        },
        categoryIconContainer: {
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: isDarkMode ? dark55 : '#F5F5F5',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 6,
            overflow: 'hidden',
        },
        categoryIcon: {
            width: '100%',
            height: '100%',
        },
        categoryChipText: {
            fontSize: 11,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? white : '#333',
            textAlign: 'center',
        },
        bannerSection: {
            marginBottom: 8,
            width: '100%',
            // backgroundColor:'red'
        },
        carouselContainer: {
            // alignItems: 'center',
        },
        bannerCard: {
            // overflow: 'hidden',
        },
        bannerImage: {
            height: 160,
            width: '100%',
        },
        paginationContainer: {
            paddingVertical: 8,
        },
        paginationDot: {
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: App_Primary_color,
        },
        paginationDotInactive: {
            backgroundColor: '#D1D5DB',
        },


        floatingButtonContainer: {
            position: 'absolute',
            bottom: 80,
            right: 20,
            zIndex: 100,
        },
        floatingButton: {
            // backgroundColor: App_Primary_color,
            borderRadius: 28,
            paddingVertical: 12,
            paddingHorizontal: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            // elevation: 15,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            borderWidth: 1,
            borderColor: App_Primary_color
        },
        floatingButtonText: {
            color: App_Primary_color,
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_Bold,
        },
        floatingBadge: {
            backgroundColor: 'orange',
            borderRadius: 12,
            minWidth: 22,
            height: 22,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 6,
            bottom: 3
        },
        floatingBadgeText: {
            color: white,
            fontSize: 11,
            fontFamily: FONTS_FAMILY.Poppins_Bold,
        },
    });

    const renderHeader = () => (
        <Animated.View style={[styles.headerContainer, { transform: [{ translateY: headerAnim }] }]}>
            <StatusBar barStyle="dark-content" backgroundColor={'white'} />

            <View style={styles.topBar}>
                <View style={styles.leftHeader}>
                    <Text style={styles.deliverText}>Civil Daily</Text>
                    {/* <Row style={{ alignItems: 'center' }}>
                        <Ionicons name="location-sharp" size={18} color="#333" style={{ marginRight: 4 }} />
                        {selector?.addresses?.length > 0 ?
                            <Text style={styles.locationText} numberOfLines={1}>
                                {selector?.addresses[0]?.city}, {selector?.addresses[0]?.country}
                            </Text> :
                            <TouchableOpacity onPress={() => navigation.navigate('AddAddressScreen')}>
                                <CustomText style={styles.locationText}>Add Address</CustomText>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity style={{ marginLeft: 4 }}>
                            <DownChev />
                        </TouchableOpacity>
                    </Row> */}
                </View>

                <View style={styles.rightHeader}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('CartScreen')}
                    >
                        <Ionicons name="cart-outline" size={24} color={App_Primary_color} />
                        {cartCount > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{cartCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('Notifications')}
                    >
                        <Ionicons name="notifications-outline" size={24} color={App_Primary_color} />
                        {notificationCount > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{notificationCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {/* <Animated.View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                <TextInput
                    placeholder="Search for products..."
                    placeholderTextColor="#999"
                    style={styles.searchInput}
                    value={searchQuery}
                    // onChangeText={setSearchQuery}
                    onFocus={()=>navigation.navigate('SearchScreen')}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                        <Ionicons name="close-circle" size={20} color="#999" />
                    </TouchableOpacity>
                )}
            </Animated.View> */}
            {/* {renderFilterCategories()} */}

        </Animated.View>
    );





    return (
        <SafeAreaView style={styles.container}>
            {/* {isLoading ? (
                // <BlinKitLoader isDarkMode={isDarkMode} />
                <></>
            ) : ( */}
                <>
                    {renderHeader()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={[App_Primary_color]}
                                tintColor={App_Primary_color}
                            />
                        }
                    >
                        <ImageBackground source={IMG.HomeBanner}
                            style={{ width: '100%', height: 220, marginBottom: 20, justifyContent: 'center', }}
                            resizeMode='cover'
                        >
                            <View
                                style={{
                                    width: '80%',
                                    paddingHorizontal: 20
                                }}
                            >
                                <CustomText
                                    style={{
                                        fontSize: 18,
                                        fontFamily: FONTS_FAMILY.Poppins_Medium,

                                    }}
                                >Providing the Construction Solution For You</CustomText>
                                <Row style={{gap:10, marginTop:10}}>
                                    <CustomButton
                                        title={'Add  Requirement'}
                                        style={{
                                            width:150
                                        }}
                                        onPress={()=>navigation.navigate('AllWorkProject')}
                                    />
                                    <CustomButton
                                        title={'Add Work Project'}
                                          style={{
                                            width:150
                                        }}
                                        onPress={()=>navigation.navigate('AllWorkProject')}

                                    />
                                </Row>

                            </View>

                        </ImageBackground>

                        {selectedCategory == 'All' && <AllPrducts navigation={navigation} isDarkMode={isDarkMode}
                            searchQuery={searchQuery}
                            refreshTrigger={refreshTrigger}
                        // setIsLoading={setIsLoading}

                        />}
                        {<HowItsWork/>}

                        <View style={{ height: 120 }} />
                    </ScrollView>
                </>
            {/* )} */}
        </SafeAreaView>
    );
}