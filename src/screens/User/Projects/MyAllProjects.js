


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
import { AddButton, BackIcon, DownChev } from '../../../assets/SVGs';
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

import CustomButton from '../../../components/Button';
import AllPrducts from '../Home/All';
import HowItsWork from '../Home/HowItWorks';
import AllProjects from './AllProjectCards';
import AddProjectModal from './AddProjectModel';



const { width } = Dimensions.get('window');




export default function AllWorkProject({ navigation }) {
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
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [modalMode, setModalMode] = useState('add')
    // Add this function to handle project submission
    const handleAddProject = async (projectData) => {
        console.log('New Project Data:', projectData);

        // Your API call here
        // try {
        //     const res = await apiPost(urls?.addProject, projectData);
        //     if (res.success) {
        //         Alert.alert('Success', 'Project added successfully!');
        //         setRefreshTrigger(prev => prev + 1); // Refresh the list
        //     }
        // } catch (error) {
        //     console.log('Error adding project:', error);
        //     Alert.alert('Error', 'Failed to add project');
        // }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setRefreshTrigger(prev => prev + 1); // 🔥 trigger change
        setTimeout(() => setRefreshing(false), 1000);
    }, []);



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
            backgroundColor: isDarkMode ? darkMode25 : 'white',
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
            // marginBottom: 12,
            gap: 10
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

        rightHeader: {
            flexDirection: 'row',
            gap: 12,
        },

        floatingButtonContainer: {
            position: 'absolute',
            bottom: 80,
            right: 20,
            zIndex: 100,
        },
        floatingButton: {
            backgroundColor: App_Primary_color,
            borderRadius: 28,
            paddingVertical: 12,
            paddingHorizontal: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 15,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        },
        floatingButtonText: {
            color: 'white',
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_Bold,
        },
        floatingBadge: {
            backgroundColor: '#FFD700',
            borderRadius: 12,
            minWidth: 22,
            height: 22,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 6,
        },
        floatingBadgeText: {
            color: App_Primary_color,
            fontSize: 11,
            fontFamily: FONTS_FAMILY.Poppins_Bold,
        },




    });

    const fetchAllProjects = async (fetchAllProjects) => {
        fetchAllProjects()
    }

    const renderHeader = () => (
        <Animated.View style={[styles.headerContainer, { transform: [{ translateY: headerAnim }] }]}>
            <StatusBar barStyle="dark-content" backgroundColor={'white'} />

            <View style={styles.topBar}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <BackIcon />
                </TouchableOpacity>
                <View style={styles.leftHeader}>
                    <Text style={styles.deliverText}>My Projects</Text>
                </View>


            </View>



        </Animated.View>
    );





    return (
        <SafeAreaView style={styles.container}>

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


                    {selectedCategory == 'All' && <AllProjects navigation={navigation} isDarkMode={isDarkMode}
                        searchQuery={searchQuery}
                        refreshTrigger={refreshTrigger}

                    // fetchAllProjects={fetchAllProjects}
                    // setIsLoading={setIsLoading}

                    />}

                    <View style={{ height: 120 }} />
                </ScrollView>
            </>

            <View style={styles.floatingButtonContainer}>
                <TouchableOpacity
                    style={styles.floatingButton}
                    onPress={() => {
                        setModalMode('add');
                        setEditingProject(null);
                        setShowProjectModal(true);
                    }}
                >
                    <Text style={styles.floatingButtonText}>+ Add Project</Text>

                </TouchableOpacity>
            </View>

            <AddProjectModal
                visible={showProjectModal}
                onClose={() => {
                    setShowProjectModal(false);
                    setEditingProject(null);
                }}
                // onSubmit={handleProjectSubmit}
                isDarkMode={isDarkMode}
                fetchAllProjects={setRefreshTrigger}
                mode={modalMode} // 'add' or 'edit'
                initialData={editingProject} // Pass project data for edit mode
            />
        </SafeAreaView>
    );
}