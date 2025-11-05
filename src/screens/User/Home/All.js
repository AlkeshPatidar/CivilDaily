


import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, View, Alert } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { apiGet, apiPost, apiDelete, getItem } from "../../../utils/Apis";
import urls from "../../../config/urls";
import { App_Primary_color } from "../../../common/Colors/colors";
import { FONTS_FAMILY } from "../../../assets/Fonts";
const { width } = Dimensions.get('window');
import { dark33, dark55, darkMode25, white } from '../../../common/Colors/colors';
import { Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";
import BlinKitLoader from "../../../components/Skeleton/BlinkitLoader";
import { getToken } from "@react-native-firebase/messaging";
import { showToast } from "../../../components/Tooltips/SuccessToolTip";
import { ToastMsg } from "../../../utils/helperFunctions";
import Row from "../../../components/wrapper/row";
import IMG from "../../../assets/Images";
import useLoader from "../../../utils/LoaderHook";

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

const AllPrducts = ({ navigation, refreshTrigger }) => {
    const { isDarkMode } = useSelector(state => state.theme);

    const [banners, setBanners] = useState([])
    const [activeSlide, setActiveSlide] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [allProducts, setAllProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [cartItems, setCartItems] = useState({});
    const [isUpdatingCart, setIsUpdatingCart] = useState(false);
    const { showLoader, hideLoader } = useLoader()

    // Fetch all products
    const getAllProduct = async () => {
        try {
            showLoader()
            const res = await apiGet('/api/admin/GetAllCompareProduct')
            setAllProducts(res?.data || [])
            hideLoader()
        } catch (error) {
            console.log('Error fetching products:', error)
            hideLoader()

        }
    }
    useEffect(() => {
        getAllProduct()
    }, [])

    const styles = StyleSheet.create({
        quantityControl: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'orange',
            borderRadius: 6,
            backgroundColor: 'white',
            paddingHorizontal: 15,
            paddingVertical: 1,
        },
        quantityBtn: {
            paddingHorizontal: 6,
        },
        quantityText: {
            color: 'orange',
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_Bold,
        },
        quantityCount: {
            fontSize: 12,
            // color: App_Primary_color,
            color: 'orange',

            marginHorizontal: 4,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
        },
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? darkMode25 : '#F8F8F8',
        },
        filterCategoriesContainer: {
            top: 12,
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
        },
        filterCategoryChipActive: {
            borderColor: white,
        },
        filterCategoryChipInactive: {
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
        },
        carouselContainer: {
        },
        bannerCard: {
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
            fontSize: 16,
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
            width: (width - 40) / 2,
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
            backgroundColor: '#F8F5F5',
            alignSelf: 'center',
            alignItems: 'center'
        },
        productImage: {
            width: '50%',
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
        },
        productWeight: {
            fontSize: 9,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: '#888',
        },
        priceRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        priceColumn: {
            flex: 1,
            // flexDirection: 'row',
            // gap: 10
            // bottom:10

        },
        currentPrice: {
            fontSize: 12,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: isDarkMode ? white : '#000',
            // bottom:10
            // width:70
        },
        originalPrice: {
            fontSize: 9,
            color: '#999',
            textDecorationLine: 'line-through',
            fontFamily: FONTS_FAMILY.Poppins_Regular,
        },
        addButton: {
            backgroundColor: 'white',
            paddingHorizontal: 20,
            paddingVertical: 4,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: App_Primary_color,
            width: '90%',
            alignItems: 'center'
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
                        {'Elevate Your Projects with \n Our Products'}
                    </Text>
                </View>

                <View style={styles.productsGrid}>
                    {
                        // allProducts
                        [
                            {
                                _id: 1,
                                name: 'Ultratech',
                                OurPrice: '300',
                                MarketPrice: '350',
                                Qty: '50Kg',
                                image: IMG.UltraTech
                            },
                            {
                                _id: 2,
                                name: 'Acc',
                                OurPrice: '330',
                                MarketPrice: '345',
                                Qty: '50Kg',
                                image: IMG.Acc
                            },
                            {
                                _id: 3,
                                name: 'Acc',
                                OurPrice: '330',
                                MarketPrice: '345',
                                Qty: '50Kg',
                                image: IMG.Acc
                            },
                            {
                                _id: 1,
                                name: 'Ultratech',
                                OurPrice: '300',
                                MarketPrice: '350',
                                Qty: '50Kg',
                                image: IMG.UltraTech
                            },
                        ]
                            .map((item, index) => (
                                <AnimatedCard
                                    key={item._id || index}
                                    delay={index * 30}
                                // onPress={() => navigation.navigate('ProductDetail', { productId: item?._id })}
                                >
                                    <View style={styles.productCard}>
                                        <View style={styles.productImageWrapper}>
                                            <Image
                                                source={item?.image}
                                                style={styles.productImage}
                                                resizeMode="cover"
                                            />
                                        </View>

                                        <View style={styles.productInfo}>
                                            <Row style={{ gap: 10 }}>
                                                <Text style={styles.productName} numberOfLines={2}>
                                                    {item.name}
                                                </Text>
                                                <Text style={styles.productWeight}>50 kg</Text>

                                            </Row>
                                            <View style={styles.priceColumn}>
                                                <Text style={styles.currentPrice}>Our Price- ₹{item.OurPrice}</Text>

                                                <Text style={styles.currentPrice}>Market Price ₹{item.MarketPrice}</Text>
                                            </View>

                                            <View style={styles.priceRow}>
                                                <TouchableOpacity
                                                    style={styles.addButton}
                                                    onPress={() => handleAddToCart(item)}
                                                >
                                                    <Text style={styles.addButtonText}>Buy Now</Text>
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
            {/* {renderBannerSection()} */}
            {renderProductsGrid()}
        </View>
    )
}

export default AllPrducts