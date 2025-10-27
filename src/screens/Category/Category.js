import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    Image,
    Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { App_Primary_color, dark33, dark55, darkMode25, white } from '../../common/Colors/colors';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { useSelector } from 'react-redux';
import { apiGet } from '../../utils/Apis';
import urls from '../../config/urls';
import CategoryScreenSkeletonLoader from '../../components/Skeleton/CategorySkeletonLoader';
import { useIsFocused } from '@react-navigation/native';

export default function Category({ navigation }) {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [cartCount, setCartCount] = useState(0);
    const [notificationCount, setNotificationCount] = useState(0);

    const { isDarkMode } = useSelector(state => state.theme)
    const isFocused = useIsFocused()

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        initializeData()
    }, [])

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

    useEffect(() => {
        fetchCartData();
        fetchNotificationCount()
        const interval = setInterval(() => {
            fetchCartData();
            fetchNotificationCount()
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const initializeData = async () => {
        setIsLoading(true)
        await getCategories()
        setIsLoading(false)
        startMountAnimations();
    }

    const startMountAnimations = () => {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    const getCategories = async () => {
        try {
            const res = await apiGet(urls?.getCategory)
            setCategories(res?.data || [])
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Static category sections
    const categorySections = [
        {
            id: '1',
            title: 'Grocery & Kitchen',
            categories: [...categories, ...categories, ...categories, ...categories, ...categories]
        },
    ];

    const AnimatedCategoryCard = ({ category, index }) => {
        const itemAnim = useRef(new Animated.Value(0)).current;

        useEffect(() => {
            if (!isLoading) {
                Animated.spring(itemAnim, {
                    toValue: 1,
                    tension: 50,
                    friction: 7,
                    delay: index * 50,
                    useNativeDriver: true,
                }).start();
            }
        }, [isLoading]);

        const scale = itemAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
        });

        return (
            <Animated.View
                style={[
                    styles.categoryCard,
                    {
                        opacity: itemAnim,
                        transform: [{ scale }],
                    }
                ]}
            >
                <TouchableOpacity
                    style={styles.cardContent}
                    onPress={() => navigation.navigate('CategoryProductsScreen', {
                        categoryId: category._id,
                        categoryName: category.name
                    })}
                >
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: category.image }}
                            style={styles.categoryImage}
                            resizeMode="cover"
                        />
                    </View>
                    <Text style={styles.categoryName} numberOfLines={2}>
                        {category.name}
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />
                <View style={styles.topBar}>
                    <View style={styles.leftHeader}>
                        <Text style={styles.headerTitle}>Shop</Text>
                        <Text style={styles.headerSubtitle}>By Category</Text>
                    </View>

                    <View style={styles.rightHeader}>
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => navigation.navigate('CartScreen')}
                        >
                            <Ionicons name="cart-outline" size={20} color="white" />
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
                            <Ionicons name="notifications-outline" size={20} color="white" />
                            {notificationCount > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{notificationCount}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    const renderCategorySection = (section, sectionIndex) => {
        return (
            <View key={section.id} style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <View style={styles.categoryGrid}>
                    {section.categories.map((category, index) => (
                        <AnimatedCategoryCard
                            key={`${category._id}-${index}`}
                            category={category}
                            index={sectionIndex * 8 + index}
                        />
                    ))}
                </View>
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? darkMode25 : '#F9FAFB',
        },
        headerContainer: {
            backgroundColor: App_Primary_color,
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 24,
        },
        topBar: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        leftHeader: {},
        headerTitle: {
            color: 'white',
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 30,
        },
        headerSubtitle: {
            color: 'white',
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 30,
        },
        rightHeader: {
            flexDirection: 'row',
        },
        iconButton: {
            marginLeft: 16,
            backgroundColor: '#6C87CF',
            padding: 8,
            borderRadius: 100,
            position: 'relative',
        },
        badge: {
            position: 'absolute',
            top: -4,
            right: -4,
            backgroundColor: '#EF4444',
            borderRadius: 10,
            minWidth: 18,
            height: 18,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 4,
        },
        badgeText: {
            color: 'white',
            fontSize: 10,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
        },
        sectionContainer: {
            paddingHorizontal: 16,
            paddingTop: 20,
            paddingBottom: 10,
        },
        sectionTitle: {
            fontSize: 18,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: isDarkMode ? '#fff' : '#1F2937',
            marginBottom: 16,
        },
        categoryGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
        },
        categoryCard: {
            width: '20%',
            backgroundColor: isDarkMode ? dark55 : '#F8F8F8',
            borderRadius: 12,
            margin: 4,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: isDarkMode ? dark55 : '#F0F0F0',
        },
        cardContent: {
            alignItems: 'center',
        },
        imageContainer: {
            width: '100%',
            aspectRatio: 1,
            backgroundColor: isDarkMode ? darkMode25 : 'white',
            justifyContent: 'center',
            alignItems: 'center',
        },
        categoryImage: {
            width: '90%',
            height: '90%',
            borderRadius: 4,
        },
        categoryName: {
            fontSize: 11,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? white : '#333',
            textAlign: 'center',
            paddingVertical: 8,
            paddingHorizontal: 4,
            minHeight: 45,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <CategoryScreenSkeletonLoader isDarkMode={isDarkMode} />
            ) : (
                <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                    {renderHeader()}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {categorySections.map((section, index) => 
                            renderCategorySection(section, index)
                        )}
                    </ScrollView>
                </Animated.View>
            )}
        </SafeAreaView>
    );
}