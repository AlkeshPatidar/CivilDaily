
import React, { useEffect, useState, useRef } from 'react';
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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { App_Primary_color, dark33, dark55, darkMode25, white } from '../../common/Colors/colors';
import { FONTS_FAMILY } from '../../assets/Fonts';
import Row from '../../components/wrapper/row';
import { AddButton, DownChev } from '../../assets/SVGs';
import IMG from '../../assets/Images';
import SpaceBetweenRow from '../../components/wrapper/spacebetween';
import { useSelector } from 'react-redux';
import { apiGet } from '../../utils/Apis';
import urls from '../../config/urls';
import useLoader from '../../utils/LoaderHook';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import HomeScreenSkeletonLoader from '../../components/Skeleton/HomeSkeletonLoader';
import { useIsFocused } from '@react-navigation/native';
import CustomText from '../../components/TextComponent';

// Animated Card Component
const AnimatedCard = ({ children, delay = 0, style, onPress, activeOpacity = 0.9 }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                delay: delay,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                delay: delay,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                delay: delay,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const animatedStyle = {
        opacity: fadeAnim,
        transform: [
            { translateY: slideAnim },
            { scale: scaleAnim }
        ],
    };

    if (onPress) {
        return (
            <TouchableOpacity
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={activeOpacity}
            >
                <Animated.View style={[style, animatedStyle]}>
                    {children}
                </Animated.View>
            </TouchableOpacity>
        );
    }

    return (
        <Animated.View style={[style, animatedStyle]}>
            {children}
        </Animated.View>
    );
};

// Pulse Animation Component for Add Buttons
const PulseButton = ({ children, onPress, style }) => {
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <TouchableOpacity onPress={onPress}>
            <Animated.View style={[style, { transform: [{ scale: pulseAnim }] }]}>
                {children}
            </Animated.View>
        </TouchableOpacity>
    );
};

export default function HomeScreen({ navigation }) {
    let selector = useSelector(state => state?.user?.userData);
    if (Object.keys(selector).length != 0) {
        selector = JSON.parse(selector);
    }

    console.log('Selector:::::', selector);
    
    const { showLoader, hideLoader } = useLoader()
    const [categories, setCategories] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [banners, setBanners] = useState([])
    const [activeSlide, setActiveSlide] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const { isDarkMode } = useSelector(state => state.theme);
    const isFocused = useIsFocused()

    // Animation refs
    const headerAnim = useRef(new Animated.Value(-100)).current;
    const searchAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        initializeData()
        animateHeader();
    }, [])

    const animateHeader = () => {
        Animated.spring(headerAnim, {
            toValue: 0,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const initializeData = async () => {
        setIsLoading(true)
        await Promise.all([
            getCategories(),
            getAllProduct(),
            getAllBanners()
        ])
        setIsLoading(false)
    }

    const onRefresh = async () => {
        setRefreshing(true);
        await Promise.all([
            getCategories(),
            getAllProduct(),
            getAllBanners()
        ])
        setRefreshing(false);
    };

    const getCategories = async () => {
        try {
            const res = await apiGet(urls?.getCategory)
            setCategories(res?.data || [])
        } catch (error) {
            console.log('Error fetching categories:', error)
        }
    }

    const getAllBanners = async () => {
        try {
            const res = await apiGet(urls?.getAllBanners)
            console.log(res?.data);
            setBanners(res?.data || [])
        } catch (error) {
            console.log('Error fetching banners:', error)
        }
    }

    const getAllProduct = async () => {
        try {
            const res = await apiGet(urls?.getAllProducts)
            setAllProducts(res?.data || [])
        } catch (error) {
            console.log('Error fetching products:', error)
        }
    }

    const renderHeader = () => (
        <Animated.View style={[styles.headerContainer, { transform: [{ translateY: headerAnim }] }]}>
            <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />

            <View style={styles.topBar}>
                <View style={styles.leftHeader}>
                    <Text style={styles.deliverText}>Deliver to</Text>
                    <Row style={{ alignItems: 'center' }}>
                        <Ionicons name="location" size={16} color="white" style={{ marginRight: 4, bottom: 2 }} />
                        {selector?.addresses?.length > 0 ? 
                            <Text style={styles.locationText}>{selector?.addresses[0]?.city}, {selector?.addresses[0]?.country}</Text> :
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('AddAddressScreen')}
                            >
                                <CustomText style={styles.locationText}>Add Address</CustomText>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity style={{ marginLeft: 4 }}>
                            <DownChev />
                        </TouchableOpacity>
                    </Row>
                </View>

                <View style={styles.rightHeader}>
                    <TouchableOpacity 
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('CartScreen')}
                    >
                        <Ionicons name="cart-outline" size={22} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('Notifications')}
                    >
                        <Ionicons name="notifications-outline" size={22} color="white" />
                        <View style={[styles.badge, styles.notificationDot]} />
                    </TouchableOpacity>
                </View>
            </View>

            <Animated.View style={[styles.searchContainer, { transform: [{ scale: searchAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.98] }) }] }]}>
                <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
                <TextInput
                    placeholder="Search for products..."
                    placeholderTextColor="#9CA3AF"
                    style={styles.searchInput}
                />
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="options-outline" size={20} color={App_Primary_color} />
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    );

    const renderBannerSection = () => (
        <View style={styles.bannerSection}>
            <View style={styles.carouselContainer}>
                <Carousel
                    data={[IMG.HomeBanner, IMG.HomeBanner, IMG.HomeBanner]}
                    renderItem={({ item }) => (
                        <AnimatedCard delay={100}>
                            <View style={styles.bannerCard}>
                                <Image
                                    source={item}
                                    style={styles.bannerImage}
                                    resizeMode='contain'
                                />
                            </View>
                        </AnimatedCard>
                    )}
                    sliderWidth={320}
                    itemWidth={320}
                    autoplay={true}
                    autoplayDelay={500}
                    autoplayInterval={3000}
                    loop={true}
                    onSnapToItem={(index) => setActiveSlide(index)}
                    enableMomentum={false}
                    lockScrollWhileSnapping={true}
                    inactiveSlideScale={0.92}
                    inactiveSlideOpacity={0.7}
                />
            </View>
            <Pagination
                dotsLength={banners.length > 0 ? banners.length : 3}
                activeDotIndex={activeSlide}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.paginationDot}
                inactiveDotStyle={styles.paginationDotInactive}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.8}
            />
        </View>
    );

    const renderCategories = () => {
        return (
            <View style={styles.sectionContainer}>
                <SpaceBetweenRow style={{ marginBottom: 10 }}>
                    <View>
                        <Text style={styles.sectionTitle}>Shop by Category</Text>
                        <View style={styles.titleUnderline} />
                    </View>
                    {/* <TouchableOpacity>
                        <Text style={styles.viewAllText}>View All →</Text>
                    </TouchableOpacity> */}
                </SpaceBetweenRow>
                
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesGrid}
                >
                    {categories.map((category, index) => (
                        <AnimatedCard
                            key={index}
                            delay={index * 100}
                            style={[
                                styles.categoryCard,
                                { backgroundColor: isDarkMode ? dark55 : '#FFFFFF' }
                            ]}
                            onPress={() => {}}
                        >
                            <View style={styles.categoryImageContainer}>
                                <Image 
                                    source={{ uri: category?.image }}
                                    style={styles.categoryImage}
                                />
                            </View>
                            <Text style={styles.categoryName} numberOfLines={2}>
                                {category.name}
                            </Text>
                        </AnimatedCard>
                    ))}
                </ScrollView>
            </View>
        );
    };

    const renderTodaysChoice = () => {
        return (
            <View style={styles.sectionContainer}>
                <SpaceBetweenRow style={{ marginBottom: 16 }}>
                    <View>
                        <Text style={styles.sectionTitle}>Today's Special</Text>
                        <View style={styles.titleUnderline} />
                    </View>
                    {/* <TouchableOpacity>
                        <Text style={styles.viewAllText}>See All →</Text>
                    </TouchableOpacity> */}
                </SpaceBetweenRow>

                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalProductsGrid}
                >
                    {allProducts?.slice(0, 6).map((item, index) => (
                        <AnimatedCard
                            key={index}
                            delay={index * 80}
                            style={[
                                styles.horizontalProductCard,
                                { backgroundColor: isDarkMode ? dark33 : '#FFFFFF' }
                            ]}
                            onPress={() => navigation.navigate('ProductDetail', { productId: item?._id })}
                        >
                            <View style={styles.productImageWrapper}>
                                <Image 
                                    source={item?.images?.length > 0 ? { uri: item?.images[0] } : IMG.eggPasta} 
                                    style={styles.horizontalProductImage}
                                />
                                {item?.discountPrice && (
                                    <View style={styles.discountBadge}>
                                        <Text style={styles.discountBadgeText}>
                                            {Math.round(((item.price - item.discountPrice) / item.price) * 100)}% OFF
                                        </Text>
                                    </View>
                                )}
                            </View>
                            
                            <View style={styles.horizontalProductInfo}>
                                <SpaceBetweenRow>
                                    <Text style={styles.horizontalProductName} numberOfLines={2}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.stockText}>Stock: {item.stock}</Text>
                                </SpaceBetweenRow>
                                
                                <View style={styles.horizontalPriceRow}>
                                    <View>
                                        <Text style={styles.currentPrice}>Rs {item.price}</Text>
                                        {item?.discountPrice && (
                                            <Text style={styles.originalPrice}>Rs {item.discountPrice}</Text>
                                        )}
                                    </View>
                                    <PulseButton 
                                        style={styles.addToCartButton}
                                        onPress={() => {}}
                                    >
                                        <Ionicons name="add" size={18} color="white" />
                                    </PulseButton>
                                </View>
                            </View>
                        </AnimatedCard>
                    ))}
                </ScrollView>
            </View>
        );
    };

    const renderTopPicks = () => {
        return (
            <View style={styles.sectionContainer}>
                <SpaceBetweenRow style={{ marginBottom: 16 }}>
                    <View>
                        <Text style={styles.sectionTitle}>Top Picks For You</Text>
                        <View style={styles.titleUnderline} />
                    </View>
                </SpaceBetweenRow>

                <View>
                    {allProducts.map((item, index) => (
                        <AnimatedCard
                            key={index}
                            delay={index * 60}
                            style={[
                                styles.listProductCard,
                                { backgroundColor: isDarkMode ? dark33 : '#FFFFFF' }
                            ]}
                            onPress={() => navigation.navigate('ProductDetail', { productId: item?._id })}
                        >
                            <View style={styles.listProductImageContainer}>
                                <Image 
                                    source={item?.images?.length > 0 ? { uri: item?.images[0] } : IMG.eggPasta} 
                                    style={styles.listProductImage}
                                />
                            </View>
                            
                            <View style={styles.listProductInfo}>
                                <Text style={styles.listProductName} numberOfLines={2}>
                                    {item.name}
                                </Text>
                                <Text style={styles.stockText}>Stock: {item.stock}</Text>
                                
                                <View style={styles.listPriceRow}>
                                    <Text style={styles.currentPrice}>Rs {item.price}</Text>
                                    {item?.discountPrice && (
                                        <Text style={styles.originalPrice}>Rs {item.discountPrice}</Text>
                                    )}
                                </View>
                            </View>

                            <PulseButton 
                                style={styles.listAddButton}
                                onPress={() => {}}
                            >
                                <AddButton />
                            </PulseButton>
                        </AnimatedCard>
                    ))}
                </View>
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? darkMode25 : '#F3F4F6',
        },
        headerContainer: {
            backgroundColor: App_Primary_color,
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 24,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 8,
        },
        topBar: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
        },
        leftHeader: {
            flex: 1,
        },
        deliverText: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 12,
            marginBottom: 2,
        },
        locationText: {
            color: 'white',
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 15,
        },
        rightHeader: {
            flexDirection: 'row',
            gap: 12,
        },
        iconButton: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: 8,
            borderRadius: 12,
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
        notificationDot: {
            minWidth: 8,
            height: 8,
            top: 2,
            right: 2,
        },
        searchContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 16,
            paddingHorizontal: 16,
            height: 50,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 3,
        },
        searchIcon: {
            marginRight: 12,
        },
        searchInput: {
            flex: 1,
            fontSize: 14,
            color: '#1F2937',
            fontFamily: FONTS_FAMILY.Poppins_Regular,
        },
        filterButton: {
            padding: 6,
        },
        bannerSection: {
            marginTop: 20,
        },
        carouselContainer: {
            alignItems: 'center',
        },
        bannerCard: {
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
        },
        bannerImage: {
            height: 140,
            width: '100%',
            borderRadius: 20,
        },
        paginationContainer: {
            paddingVertical: 12,
        },
        paginationDot: {
            width: 24,
            height: 8,
            borderRadius: 4,
            backgroundColor: App_Primary_color,
        },
        paginationDotInactive: {
            width: 8,
            height: 8,
            borderRadius: 4,
        },
        sectionContainer: {
            paddingHorizontal: 20,
            paddingVertical: 10,
        },
        sectionTitle: {
            fontSize: 18,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: isDarkMode ? white : '#1F2937',
        },
        titleUnderline: {
            width: 40,
            height: 3,
            backgroundColor: App_Primary_color,
            borderRadius: 2,
            marginTop: 4,
        },
        viewAllText: {
            color: App_Primary_color,
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
        },
        categoriesGrid: {
            gap: 12,
            paddingRight: 20,
        },
        categoryCard: {
            width: 110,
            borderRadius: 16,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 3,
            marginBottom: 10,
        },
        categoryImageContainer: {
            width: 100,
            height: 80,
            borderRadius: 12,
            overflow: 'hidden',
            marginBottom: 8,
            marginTop: 8,
        },
        categoryImage: {
            width: '100%',
            height: '100%',
        },
        categoryName: {
            fontSize: 12,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? white : '#374151',
            textAlign: 'center',
            lineHeight: 16,
            marginBottom: 4,
        },
        horizontalProductsGrid: {
            gap: 16,
            paddingRight: 20,
        },
        horizontalProductCard: {
            width: 160,
            borderRadius: 16,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 3,
            marginBottom: 10,
        },
        productImageWrapper: {
            position: 'relative',
        },
        horizontalProductImage: {
            width: '100%',
            height: 140,
            backgroundColor: '#F3F4F6',
        },
        discountBadge: {
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: '#EF4444',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 8,
        },
        discountBadgeText: {
            color: 'white',
            fontSize: 10,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
        },
        horizontalProductInfo: {
            padding: 12,
        },
        horizontalProductName: {
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? white : '#1F2937',
        },
        stockText: {
            fontSize: 11,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: '#9CA3AF',
        },
        horizontalPriceRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        currentPrice: {
            fontSize: 16,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: isDarkMode ? white : '#1F2937',
        },
        originalPrice: {
            fontSize: 12,
            color: '#9CA3AF',
            textDecorationLine: 'line-through',
            fontFamily: FONTS_FAMILY.Poppins_Regular,
        },
        addToCartButton: {
            backgroundColor: App_Primary_color,
            width: 32,
            height: 32,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        listProductCard: {
            flexDirection: 'row',
            borderRadius: 16,
            padding: 12,
            marginBottom: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 4,
            elevation: 2,
        },
        listProductImageContainer: {
            width: 90,
            height: 90,
            borderRadius: 12,
            overflow: 'hidden',
            backgroundColor: '#F3F4F6',
        },
        listProductImage: {
            width: '100%',
            height: '100%',
        },
        listProductInfo: {
            flex: 1,
            marginLeft: 12,
            justifyContent: 'center',
        },
        listProductName: {
            fontSize: 15,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? white : '#1F2937',
            marginBottom: 2,
        },
        ratingText: {
            fontSize: 12,
            color: '#6B7280',
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            marginLeft: 4,
        },
        listPriceRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginTop: 6,
        },
        listAddButton: {
            alignSelf: 'center',
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <HomeScreenSkeletonLoader isDarkMode={isDarkMode} />
            ) : (
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
                        {renderBannerSection()}
                        {categories.length > 0 && renderCategories()}
                        {allProducts.length > 0 && renderTodaysChoice()}
                        {allProducts.length > 0 && renderTopPicks()}
                        <View style={{ height: 100 }} />
                    </ScrollView>
                </>
            )}
        </SafeAreaView>
    );
}