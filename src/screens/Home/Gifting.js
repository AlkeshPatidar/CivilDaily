import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { apiGet } from "../../utils/Apis";
import urls from "../../config/urls";
import { App_Primary_color } from "../../common/Colors/colors";
import { FONTS_FAMILY } from "../../assets/Fonts";
const { width } = Dimensions.get('window');
import { dark33, dark55, darkMode25, white } from '../../common/Colors/colors';
import { Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";
import BlinKitLoader from "../../components/Skeleton/BlinkitLoader";

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
const Gifting = (
    { navigation,
        refreshTrigger,
        // setIsLoading 
    }

) => {

    // console.log('++++++++++++++++ISDARK', isDarkMode);
    const { isDarkMode } = useSelector(state => state.theme);

    const [banners, setBanners] = useState([])
    const [activeSlide, setActiveSlide] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [allProducts, setAllProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const filteredProducts = allProducts.filter(product =>
        product?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
    );



    const getAllProduct = async () => {
        try {
            const res = await apiGet(urls?.getAllProducts)
            setAllProducts(res?.data || [])
        } catch (error) {
            console.log('Error fetching products:', error)
        }
    }


    useEffect(() => {
        getAllBanners()
        getAllProduct()

    }, [refreshTrigger]);
    const getAllBanners = async () => {
        try {
            setIsLoading(true)
            const res = await apiGet(urls?.getAllBanners)
            console.log(res?.data, 'Banners::::::::::::::::::');
            setBanners(res?.data || [])
            setIsLoading(false)

        } catch (error) {
            console.log('Error fetching banners:', error)
            setIsLoading(false)

        }
    }


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? darkMode25 : '#F8F8F8',
        },
        headerContainer: {
            backgroundColor: App_Primary_color,
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
            color: 'rgba(255, 255, 255, 0.9)',
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 13,
            marginBottom: 2,
        },
        locationText: {
            color: 'white',
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
            backgroundColor: '#FFD700',
            borderRadius: 10,
            minWidth: 18,
            height: 18,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 4,
        },
        badgeText: {
            color: App_Primary_color,
            fontSize: 10,
            fontFamily: FONTS_FAMILY.Poppins_Bold,
        },
        searchContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
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
        sectionContainer: {
            paddingHorizontal: 16,
            marginBottom: 16,
        },
        sectionHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
        },
        sectionTitle: {
            fontSize: 18,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: isDarkMode ? white : '#000',
        },
        seeAllText: {
            color: App_Primary_color,
            fontSize: 13,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
        },
        productsGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        productCard: {
            width: (width - 40) / 3,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: isDarkMode ? dark55 : '#E8E8E8',
            overflow: 'hidden',
            marginBottom: 12,
            backgroundColor: isDarkMode ? dark33 : 'white',
        },
        productImageWrapper: {
            position: 'relative',
            width: '100%',
            height: 100,
            backgroundColor: '#FFF',
        },
        productImage: {
            width: '100%',
            height: '100%',
        },
        discountBadge: {
            position: 'absolute',
            top: 4,
            left: 4,
            backgroundColor: '#0C831F',
            paddingHorizontal: 5,
            paddingVertical: 2,
            borderRadius: 3,
        },
        discountText: {
            color: 'white',
            fontSize: 8,
            fontFamily: FONTS_FAMILY.Poppins_Bold,
        },
        productInfo: {
            padding: 8,
        },
        timerBadge: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: isDarkMode ? dark55 : '#F8F8F8',
            alignSelf: 'flex-start',
            paddingHorizontal: 5,
            paddingVertical: 2,
            borderRadius: 3,
            marginBottom: 4,
        },
        timerText: {
            fontSize: 8,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: App_Primary_color,
            marginLeft: 2,
        },
        productName: {
            fontSize: 11,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? white : '#000',
            marginBottom: 2,
            lineHeight: 14,
            // height: 28,
        },
        productWeight: {
            fontSize: 9,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: '#888',
            // marginBottom: 6,
        },
        priceRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        priceColumn: {
            flex: 1,
        },
        currentPrice: {
            fontSize: 12,
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            color: isDarkMode ? white : '#000',
        },
        originalPrice: {
            fontSize: 9,
            color: '#999',
            textDecorationLine: 'line-through',
            fontFamily: FONTS_FAMILY.Poppins_Regular,
        },
        addButton: {
            backgroundColor: 'white',
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: App_Primary_color,
        },
        addButtonText: {
            color: App_Primary_color,
            fontSize: 10,
            fontFamily: FONTS_FAMILY.Poppins_Bold,
        },
        noResultsContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 60,
        },
        noResultsText: {
            fontSize: 18,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: isDarkMode ? white : '#000',
            marginTop: 16,
        },
        noResultsSubtext: {
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: '#999',
            marginTop: 8,
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

    if (isLoading) {
        return(
            <View style={{flex:1,marginTop:100}}>
                <BlinKitLoader isDarkMode={isDarkMode} />
            </View>
        )
    } else {
        
    }

    const renderBannerSection = () => (
        <View style={styles.bannerSection}>
            <View style={styles.carouselContainer}>
                <Carousel
                    data={banners}
                    renderItem={({ item }) => (
                        <TouchableOpacity activeOpacity={0.9}>
                            <View style={styles.bannerCard}>
                                <Image
                                    source={{ uri: item?.image }}
                                    style={styles.bannerImage}
                                // resizeMode="cover"
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                    sliderWidth={width}
                    itemWidth={width}
                    autoplay={true}
                    autoplayDelay={500}
                    autoplayInterval={3000}
                    loop={true}
                    onSnapToItem={(index) => setActiveSlide(index)}
                    enableMomentum={false}
                    lockScrollWhileSnapping={true}
                    inactiveSlideScale={0.94}
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
                inactiveDotScale={0.6}
            />
        </View>
    );

    const renderProductsGrid = () => {
        if (searchQuery && filteredProducts.length === 0) {
            return (
                <View style={styles.sectionContainer}>
                    <View style={styles.noResultsContainer}>
                        <Ionicons name="search-outline" size={64} color="#CCC" />
                        <Text style={styles.noResultsText}>No products found</Text>
                        <Text style={styles.noResultsSubtext}>Try searching with different keywords</Text>
                    </View>
                </View>
            );
        }


        return (
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        {'Gifting Products'}
                    </Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.productsGrid}>
                    {[...filteredProducts,
                        ...filteredProducts,
                        ...filteredProducts,
                        ...filteredProducts
                    ].map((item, index) => (
                        <AnimatedCard
                            key={index}
                            delay={index * 30}
                            onPress={() => navigation.navigate('ProductDetail', { productId: item?._id })}
                        >
                            <View style={styles.productCard}>
                                <View style={styles.productImageWrapper}>
                                    <Image
                                        source={item?.images?.length > 0 ? { uri: item?.images[0] } : IMG.eggPasta}
                                        style={styles.productImage}
                                        resizeMode="cover"
                                    />
                                    {item?.discountPrice && (
                                        <View style={styles.discountBadge}>
                                            <Text style={styles.discountText}>
                                                {Math.round(((item.price - item.discountPrice) / item.price) * 100)}% OFF
                                            </Text>
                                        </View>
                                    )}
                                </View>

                                <View style={styles.productInfo}>
                                    <View style={styles.timerBadge}>
                                        <Ionicons name="time-outline" size={10} color={App_Primary_color} />
                                        <Text style={styles.timerText}>10 mins</Text>
                                    </View>

                                    <Text style={styles.productName} numberOfLines={2}>
                                        {item.name}
                                    </Text>

                                    <Text style={styles.productWeight}>1 kg</Text>

                                    <View style={styles.priceRow}>
                                        <View style={styles.priceColumn}>
                                            <Text style={styles.currentPrice}>₹{item.price}</Text>
                                            {item?.discountPrice && (
                                                <Text style={styles.originalPrice}>₹{item.discountPrice}</Text>
                                            )}
                                        </View>
                                        <TouchableOpacity
                                            style={styles.addButton}
                                            onPress={() => navigation.navigate('ProductDetail', { productId: item?._id })}
                                        >
                                            <Text style={styles.addButtonText}>ADD</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </AnimatedCard>
                    ))}
                </View>
            </View>
        );
    };
    return (
        <View>
            {renderBannerSection()}
            {renderProductsGrid()}
        </View>

    )
}

export default Gifting