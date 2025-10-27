// import { useEffect, useRef, useState } from "react";
// import { Animated, Dimensions, StyleSheet, View } from "react-native"
// import Carousel, { Pagination } from 'react-native-snap-carousel';
// import { apiGet, apiPost, getItem } from "../../utils/Apis";
// import urls from "../../config/urls";
// import { App_Primary_color } from "../../common/Colors/colors";
// import { FONTS_FAMILY } from "../../assets/Fonts";
// const { width } = Dimensions.get('window');
// import { dark33, dark55, darkMode25, white } from '../../common/Colors/colors';
// import { Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useSelector } from "react-redux";
// import BlinKitLoader from "../../components/Skeleton/BlinkitLoader";
// import { getToken } from "@react-native-firebase/messaging";
// import { showToast } from "../../components/Tooltips/SuccessToolTip";
// import { ToastMsg } from "../../utils/helperFunctions";

// const AnimatedCard = ({ children, delay = 0, style, onPress, activeOpacity = 0.9 }) => {
//     const fadeAnim = useRef(new Animated.Value(0)).current;
//     const slideAnim = useRef(new Animated.Value(30)).current;
//     const scaleAnim = useRef(new Animated.Value(0.9)).current;


//     useEffect(() => {
//         Animated.parallel([
//             Animated.timing(fadeAnim, {
//                 toValue: 1,
//                 duration: 500,
//                 delay: delay,
//                 useNativeDriver: true,
//             }),
//             Animated.timing(slideAnim, {
//                 toValue: 0,
//                 duration: 500,
//                 delay: delay,
//                 useNativeDriver: true,
//             }),
//             Animated.spring(scaleAnim, {
//                 toValue: 1,
//                 delay: delay,
//                 friction: 8,
//                 tension: 40,
//                 useNativeDriver: true,
//             }),
//         ]).start();
//     }, []);

//     const handlePressIn = () => {
//         Animated.spring(scaleAnim, {
//             toValue: 0.95,
//             useNativeDriver: true,
//         }).start();
//     };

//     const handlePressOut = () => {
//         Animated.spring(scaleAnim, {
//             toValue: 1,
//             friction: 8,
//             tension: 40,
//             useNativeDriver: true,
//         }).start();
//     };

//     const animatedStyle = {
//         opacity: fadeAnim,
//         transform: [
//             { translateY: slideAnim },
//             { scale: scaleAnim }
//         ],
//     };

//     if (onPress) {
//         return (
//             <TouchableOpacity
//                 onPress={onPress}
//                 onPressIn={handlePressIn}
//                 onPressOut={handlePressOut}
//                 activeOpacity={activeOpacity}
//             >
//                 <Animated.View style={[style, animatedStyle]}>
//                     {children}
//                 </Animated.View>
//             </TouchableOpacity>
//         );
//     }

//     return (
//         <Animated.View style={[style, animatedStyle]}>
//             {children}
//         </Animated.View>
//     );
// };
// const AllPrducts = (
//     { navigation,
//         refreshTrigger,
//         // setIsLoading 
//     }

// ) => {

//     // console.log('++++++++++++++++ISDARK', isDarkMode);
//     const { isDarkMode } = useSelector(state => state.theme);

//     const [banners, setBanners] = useState([])
//     const [activeSlide, setActiveSlide] = useState(0);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('All');
//     const [allProducts, setAllProducts] = useState([])
//     const [isLoading, setIsLoading] = useState(false)
//     const filteredProducts = allProducts.filter(product =>
//         product?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
//     );

//     const [cartItems, setCartItems] = useState([]);

//     const handleIncrement = (item) => {
//         setCartItems((prev) => {
//             const currentQty = prev[item._id] || 0;
//             if (item.stock && currentQty < item.stock) {
//                 const updated = { ...prev, [item._id]: currentQty + 1 };
//                 // TODO: Call update-cart API here
//                 return updated;
//             } else {
//                 alert('Reached maximum stock!');
//                 return prev;
//             }
//         });
//     };

//     const handleDecrement = (item) => {
//         setCartItems((prev) => {
//             const currentQty = prev[item._id] || 0;
//             if (currentQty <= 1) {
//                 const updated = { ...prev };
//                 delete updated[item._id];
//                 // TODO: Call remove-from-cart API here
//                 return updated;
//             } else {
//                 const updated = { ...prev, [item._id]: currentQty - 1 };
//                 // TODO: Call update-cart API here
//                 return updated;
//             }
//         });
//     };



//     const getAllProduct = async () => {
//         try {
//             const res = await apiGet(urls?.getAllProducts)
//             setAllProducts(res?.data || [])
//         } catch (error) {
//             console.log('Error fetching products:', error)
//         }
//     }


//     useEffect(() => {
//         getAllBanners()
//         getAllProduct()
// fetchCartData()
//     }, [refreshTrigger]);

//        const fetchCartData = async () => {
//             try {
//                 const res = await apiGet(urls?.getCartData);
//                 setCartItems(res?.data || null);
//             } catch (error) {
//                 console.error('Error fetching cart data:', error);
//                 setCartItems(null);
//             }
//         };

//     const getAllBanners = async () => {
//         try {
//             setIsLoading(true)
//             const res = await apiGet(urls?.getAllBanners)
//             console.log(res?.data, 'Banners::::::::::::::::::');
//             setBanners(res?.data || [])
//             setIsLoading(false)

//         } catch (error) {
//             console.log('Error fetching banners:', error)
//             setIsLoading(false)

//         }
//     }






//     const handleAddToCart = async (item) => {
//         if (item.stock && item.stock > 0) {
//             setCartItems((prev) => ({
//                 ...prev,
//                 [item._id]: 1,
//             }));
//             // TODO: Call add-to-cart API here

//             // console.log('Added to cart:', item.name);
//             try {
//                 //   showLoader();

//                 const data = {
//                     productId: item?._id,
//                     quantity: 1,
//                 };

//                 const token = await getItem('token');
//                 const response = await apiPost(urls?.addToCart || '/api/cart/add', data, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                         Accept: 'application/json',
//                     },
//                 });

//                 //   hideLoader();

//                 if (response?.statusCode === 200 || response?.status === 200 || response?.success) {
//                     showToast(response?.message || response?.data?.message || 'Product added to cart successfully');
//                     // setQuantity(1);
//                     // navigation.navigate('CartScreen');
//                 } else {
//                     ToastMsg(response?.message || response?.data?.message || 'Failed to add product to cart');
//                 }
//             } catch (error) {
//                 //   hideLoader();
//                 console.log('Add to Cart Error:', error);

//                 if (error?.response?.status === 401) {
//                     ToastMsg('Please login to add items to cart');
//                 } else if (error?.response?.data?.message) {
//                     ToastMsg(error.response.data.message);
//                 } else {
//                     ToastMsg('Failed to add product to cart');
//                 }
//             }
//         } else {
//             alert('Out of stock!');
//         }
//     };


//     const styles = StyleSheet.create({
//         quantityControl: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             borderWidth: 1,
//             borderColor: App_Primary_color,
//             borderRadius: 6,
//             backgroundColor: 'white',
//             paddingHorizontal: 4,
//             paddingVertical: 2,
//         },
//         quantityBtn: {
//             paddingHorizontal: 6,
//         },
//         quantityText: {
//             color: App_Primary_color,
//             fontSize: 14,
//             fontFamily: FONTS_FAMILY.Poppins_Bold,
//         },
//         quantityCount: {
//             fontSize: 12,
//             color: App_Primary_color,
//             marginHorizontal: 4,
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//         },



//         container: {
//             flex: 1,
//             backgroundColor: isDarkMode ? darkMode25 : '#F8F8F8',
//         },


//         filterCategoriesContainer: {
//             // backgroundColor: isDarkMode ? dark33 : 'white',
//             top: 12,
//             // paddingHorizontal: 8,
//             // borderBottomWidth: 1,
//             // borderBottomColor: isDarkMode ? dark55 : '#F0F0F0',
//         },
//         filterCategoriesScroll: {
//             paddingHorizontal: 8,
//         },
//         filterCategoryChip: {
//             paddingHorizontal: 16,
//             paddingVertical: 8,
//             borderRadius: 20,
//             marginRight: 8,
//             alignItems: 'center',
//             // borderWidth: 1,
//         },
//         filterCategoryChipActive: {
//             // backgroundColor: App_Primary_color,
//             // borderColor: App_Primary_color,
//             // borderBottomWidth:3,
//             // borderWidth:0,
//             borderColor: white,

//         },
//         filterCategoryChipInactive: {
//             // backgroundColor: isDarkMode ? dark55 : '#F8F8F8',
//             // borderColor: isDarkMode ? dark55 : '#E0E0E0',
//         },
//         filterCategoryText: {
//             fontSize: 13,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             color: white
//         },
//         filterCategoryTextActive: {
//             color: 'white',
//         },
//         filterCategoryTextInactive: {
//             color: white,
//         },
//         categoriesSection: {
//             backgroundColor: isDarkMode ? dark33 : 'white',
//             paddingVertical: 12,
//             paddingHorizontal: 16,
//             marginBottom: 8,
//         },
//         categoriesTitle: {
//             fontSize: 16,
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//             color: isDarkMode ? white : '#000',
//             marginBottom: 12,
//         },
//         categoriesGrid: {
//             flexDirection: 'row',
//             flexWrap: 'wrap',
//             justifyContent: 'space-between',
//         },
//         categoryChip: {
//             width: (width - 48) / 4,
//             alignItems: 'center',
//             marginBottom: 12,
//         },
//         categoryIconContainer: {
//             width: 56,
//             height: 56,
//             borderRadius: 28,
//             backgroundColor: isDarkMode ? dark55 : '#F5F5F5',
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginBottom: 6,
//             overflow: 'hidden',
//         },
//         categoryIcon: {
//             width: '100%',
//             height: '100%',
//         },
//         categoryChipText: {
//             fontSize: 11,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             color: isDarkMode ? white : '#333',
//             textAlign: 'center',
//         },
//         bannerSection: {
//             marginBottom: 8,
//             width: '100%',
//             // backgroundColor:'red'
//         },
//         carouselContainer: {
//             // alignItems: 'center',
//         },
//         bannerCard: {
//             // overflow: 'hidden',
//         },
//         bannerImage: {
//             height: 160,
//             width: '100%',
//         },
//         paginationContainer: {
//             paddingVertical: 8,
//         },
//         paginationDot: {
//             width: 8,
//             height: 8,
//             borderRadius: 4,
//             backgroundColor: App_Primary_color,
//         },
//         paginationDotInactive: {
//             backgroundColor: '#D1D5DB',
//         },
//         sectionContainer: {
//             paddingHorizontal: 16,
//             marginBottom: 16,
//         },
//         sectionHeader: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: 12,
//         },
//         sectionTitle: {
//             fontSize: 18,
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//             color: isDarkMode ? white : '#000',
//         },
//         seeAllText: {
//             color: App_Primary_color,
//             fontSize: 13,
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//         },
//         productsGrid: {
//             flexDirection: 'row',
//             flexWrap: 'wrap',
//             justifyContent: 'space-between',
//         },
//         productCard: {
//             width: (width - 40) / 3,
//             borderRadius: 12,
//             borderWidth: 1,
//             borderColor: isDarkMode ? dark55 : '#E8E8E8',
//             overflow: 'hidden',
//             marginBottom: 12,
//             backgroundColor: isDarkMode ? dark33 : 'white',
//         },
//         productImageWrapper: {
//             position: 'relative',
//             width: '100%',
//             height: 100,
//             backgroundColor: '#FFF',
//         },
//         productImage: {
//             width: '100%',
//             height: '100%',
//         },
//         discountBadge: {
//             position: 'absolute',
//             top: 4,
//             left: 4,
//             backgroundColor: '#0C831F',
//             paddingHorizontal: 5,
//             paddingVertical: 2,
//             borderRadius: 3,
//         },
//         discountText: {
//             color: 'white',
//             fontSize: 8,
//             fontFamily: FONTS_FAMILY.Poppins_Bold,
//         },
//         productInfo: {
//             padding: 8,
//         },
//         timerBadge: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             backgroundColor: isDarkMode ? dark55 : '#F8F8F8',
//             alignSelf: 'flex-start',
//             paddingHorizontal: 5,
//             paddingVertical: 2,
//             borderRadius: 3,
//             marginBottom: 4,
//         },
//         timerText: {
//             fontSize: 8,
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//             color: App_Primary_color,
//             marginLeft: 2,
//         },
//         productName: {
//             fontSize: 11,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             color: isDarkMode ? white : '#000',
//             marginBottom: 2,
//             lineHeight: 14,
//             // height: 28,
//         },
//         productWeight: {
//             fontSize: 9,
//             fontFamily: FONTS_FAMILY.Poppins_Regular,
//             color: '#888',
//             // marginBottom: 6,
//         },
//         priceRow: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//         },
//         priceColumn: {
//             flex: 1,
//         },
//         currentPrice: {
//             fontSize: 12,
//             fontFamily: FONTS_FAMILY.Poppins_Bold,
//             color: isDarkMode ? white : '#000',
//         },
//         originalPrice: {
//             fontSize: 9,
//             color: '#999',
//             textDecorationLine: 'line-through',
//             fontFamily: FONTS_FAMILY.Poppins_Regular,
//         },
//         addButton: {
//             backgroundColor: 'white',
//             paddingHorizontal: 10,
//             paddingVertical: 4,
//             borderRadius: 6,
//             borderWidth: 1,
//             borderColor: App_Primary_color,
//         },
//         addButtonText: {
//             color: App_Primary_color,
//             fontSize: 10,
//             fontFamily: FONTS_FAMILY.Poppins_Bold,
//         },
//         noResultsContainer: {
//             alignItems: 'center',
//             justifyContent: 'center',
//             paddingVertical: 60,
//         },
//         noResultsText: {
//             fontSize: 18,
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//             color: isDarkMode ? white : '#000',
//             marginTop: 16,
//         },
//         noResultsSubtext: {
//             fontSize: 14,
//             fontFamily: FONTS_FAMILY.Poppins_Regular,
//             color: '#999',
//             marginTop: 8,
//         },
//         floatingButtonContainer: {
//             position: 'absolute',
//             bottom: 80,
//             right: 20,
//             zIndex: 100,
//         },
//         floatingButton: {
//             backgroundColor: App_Primary_color,
//             borderRadius: 28,
//             paddingVertical: 12,
//             paddingHorizontal: 16,
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 8 },
//             shadowOpacity: 0.3,
//             shadowRadius: 12,
//             elevation: 15,
//             flexDirection: 'row',
//             alignItems: 'center',
//             gap: 8,
//         },
//         floatingButtonText: {
//             color: 'white',
//             fontSize: 14,
//             fontFamily: FONTS_FAMILY.Poppins_Bold,
//         },
//         floatingBadge: {
//             backgroundColor: '#FFD700',
//             borderRadius: 12,
//             minWidth: 22,
//             height: 22,
//             justifyContent: 'center',
//             alignItems: 'center',
//             paddingHorizontal: 6,
//         },
//         floatingBadgeText: {
//             color: App_Primary_color,
//             fontSize: 11,
//             fontFamily: FONTS_FAMILY.Poppins_Bold,
//         },
//     });

//     if (isLoading) {
//         return (
//             <View style={{ flex: 1, marginTop: 100 }}>
//                 <BlinKitLoader isDarkMode={isDarkMode} />
//             </View>
//         )
//     } else {

//     }

//     const renderBannerSection = () => (
//         <View style={styles.bannerSection}>
//             <View style={styles.carouselContainer}>
//                 <Carousel
//                     data={banners}
//                     renderItem={({ item }) => (
//                         <TouchableOpacity activeOpacity={0.9}>
//                             <View style={styles.bannerCard}>
//                                 <Image
//                                     source={{ uri: item?.image }}
//                                     style={styles.bannerImage}
//                                 // resizeMode="cover"
//                                 />
//                             </View>
//                         </TouchableOpacity>
//                     )}
//                     sliderWidth={width}
//                     itemWidth={width}
//                     autoplay={true}
//                     autoplayDelay={500}
//                     autoplayInterval={3000}
//                     loop={true}
//                     onSnapToItem={(index) => setActiveSlide(index)}
//                     enableMomentum={false}
//                     lockScrollWhileSnapping={true}
//                     inactiveSlideScale={0.94}
//                     inactiveSlideOpacity={0.7}
//                 />
//             </View>
//             <Pagination
//                 dotsLength={banners.length > 0 ? banners.length : 3}
//                 activeDotIndex={activeSlide}
//                 containerStyle={styles.paginationContainer}
//                 dotStyle={styles.paginationDot}
//                 inactiveDotStyle={styles.paginationDotInactive}
//                 inactiveDotOpacity={0.4}
//                 inactiveDotScale={0.6}
//             />
//         </View>
//     );

//     const renderProductsGrid = () => {
//         if (searchQuery && filteredProducts.length === 0) {
//             return (
//                 <View style={styles.sectionContainer}>
//                     <View style={styles.noResultsContainer}>
//                         <Ionicons name="search-outline" size={64} color="#CCC" />
//                         <Text style={styles.noResultsText}>No products found</Text>
//                         <Text style={styles.noResultsSubtext}>Try searching with different keywords</Text>
//                     </View>
//                 </View>
//             );
//         }


//         return (
//             <View style={styles.sectionContainer}>
//                 <View style={styles.sectionHeader}>
//                     <Text style={styles.sectionTitle}>
//                         {'All Products'}
//                     </Text>
//                     <TouchableOpacity>
//                         <Text style={styles.seeAllText}>See All</Text>
//                     </TouchableOpacity>
//                 </View>

//                 <View style={styles.productsGrid}>
//                     {[...filteredProducts,
//                     ...filteredProducts,
//                     ...filteredProducts,
//                     ...filteredProducts
//                     ].map((item, index) => (
//                         <AnimatedCard
//                             key={index}
//                             delay={index * 30}
//                             onPress={() => navigation.navigate('ProductDetail', { productId: item?._id })}
//                         >
//                             <View style={styles.productCard}>
//                                 <View style={styles.productImageWrapper}>
//                                     <Image
//                                         source={item?.images?.length > 0 ? { uri: item?.images[0] } : IMG.eggPasta}
//                                         style={styles.productImage}
//                                         resizeMode="cover"
//                                     />
//                                     {item?.discountPrice && (
//                                         <View style={styles.discountBadge}>
//                                             <Text style={styles.discountText}>
//                                                 {Math.round(((item.price - item.discountPrice) / item.price) * 100)}% OFF
//                                             </Text>
//                                         </View>
//                                     )}
//                                 </View>

//                                 <View style={styles.productInfo}>
//                                     <View style={styles.timerBadge}>
//                                         <Ionicons name="time-outline" size={10} color={App_Primary_color} />
//                                         <Text style={styles.timerText}>10 mins</Text>
//                                     </View>

//                                     <Text style={styles.productName} numberOfLines={2}>
//                                         {item.name}
//                                     </Text>

//                                     <Text style={styles.productWeight}>1 kg</Text>

//                                     <View style={styles.priceRow}>
//                                         <View style={styles.priceColumn}>
//                                             <Text style={styles.currentPrice}>₹{item.price}</Text>
//                                             {item?.discountPrice && (
//                                                 <Text style={styles.originalPrice}>₹{item.discountPrice}</Text>
//                                             )}
//                                         </View>
//                                         {/* <TouchableOpacity
//                                             style={styles.addButton}
//                                             onPress={() => navigation.navigate('ProductDetail', { productId: item?._id })}
//                                         >
//                                             <Text style={styles.addButtonText}>ADD</Text>
//                                         </TouchableOpacity> */}

//                                         {cartItems[item._id] ? (
//                                             <View style={styles.quantityControl}>
//                                                 <TouchableOpacity
//                                                     onPress={() => handleDecrement(item)}
//                                                     style={styles.quantityBtn}
//                                                 >
//                                                     <Text style={styles.quantityText}>-</Text>
//                                                 </TouchableOpacity>

//                                                 <Text style={styles.quantityCount}>{cartItems[item._id]}</Text>

//                                                 <TouchableOpacity
//                                                     onPress={() => handleIncrement(item)}
//                                                     style={styles.quantityBtn}
//                                                 >
//                                                     <Text style={styles.quantityText}>+</Text>
//                                                 </TouchableOpacity>
//                                             </View>
//                                         ) : (
//                                             <TouchableOpacity
//                                                 style={styles.addButton}
//                                                 onPress={() => handleAddToCart(item)}
//                                             >
//                                                 <Text style={styles.addButtonText}>ADD</Text>
//                                             </TouchableOpacity>
//                                         )}
//                                     </View>
//                                 </View>
//                             </View>
//                         </AnimatedCard>
//                     ))}
//                 </View>
//             </View>
//         );
//     };
//     return (
//         <View>
//             {renderBannerSection()}
//             {renderProductsGrid()}
//         </View>

//     )
// }

// export default AllPrducts


import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, View, Alert } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { apiGet, apiPost, apiDelete, getItem } from "../../utils/Apis";
import urls from "../../config/urls";
import { App_Primary_color } from "../../common/Colors/colors";
import { FONTS_FAMILY } from "../../assets/Fonts";
const { width } = Dimensions.get('window');
import { dark33, dark55, darkMode25, white } from '../../common/Colors/colors';
import { Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";
import BlinKitLoader from "../../components/Skeleton/BlinkitLoader";
import { getToken } from "@react-native-firebase/messaging";
import { showToast } from "../../components/Tooltips/SuccessToolTip";
import { ToastMsg } from "../../utils/helperFunctions";
import RenderBestSellers from "./BestSellers/BestSellers";
import Row from "../../components/wrapper/row";

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

    const filteredProducts = allProducts.filter(product =>
        product?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
    );

    // Fetch all products
    const getAllProduct = async () => {
        try {
            const res = await apiGet(urls?.getAllProducts)
            setAllProducts(res?.data || [])
        } catch (error) {
            console.log('Error fetching products:', error)
        }
    }

    // Fetch all banners
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

    // Fetch cart data and convert to productId: quantity format
    // const fetchCartData = async () => {
    //     try {
    //         const res = await apiGet(urls?.getCartData);
    //         if (res?.data?.items && Array.isArray(res.data.items)) {
    //             // Convert cart items array to object with productId as key
    //             const cartObj = {};
    //             res.data.items.forEach(item => {
    //                 cartObj[item.productId || item._id] = item.quantity;
    //             });
    //             setCartItems(cartObj);
    //         } else {
    //             setCartItems({});
    //         }
    //     } catch (error) {
    //         console.error('Error fetching cart data:', error);
    //         setCartItems({});
    //     }
    // };

    // Ye fetchCartData function replace karo
    const fetchCartData = async () => {
        try {
            const res = await apiGet(urls?.getCartData);
            console.log('Cart Response:', JSON.stringify(res, null, 2));

            if (res?.data?.items && Array.isArray(res.data.items)) {
                const cartObj = {};

                res.data.items.forEach(item => {
                    // productId ek object hai, uske andar _id hai
                    const productId = item.productId?._id || item.productId;
                    if (productId) {
                        cartObj[productId] = item.quantity;
                    }
                });

                console.log('✅ Parsed Cart Object:', cartObj);
                setCartItems(cartObj);
            } else {
                setCartItems({});
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
            setCartItems({});
        }
    };

    useEffect(() => {
        getAllBanners()
        getAllProduct()
        fetchCartData()
    }, [refreshTrigger]);

    // Add to cart - Initial add with quantity 1
    // const handleAddToCart = async (item) => {
    //     if (!item.stock || item.stock <= 0) {
    //         ToastMsg('Out of stock!');
    //         return;
    //     }

    //     // Optimistically update UI
    //     setCartItems((prev) => ({
    //         ...prev,
    //         [item._id]: 1,
    //     }));

    //     try {
    //         const data = {
    //             productId: item?._id,
    //             quantity: 1,
    //         };

    //         const token = await getItem('token');
    //         const response = await apiPost(urls?.addToCart, data, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 'Content-Type': 'application/json',
    //                 Accept: 'application/json',
    //             },
    //         });

    //         if (response?.statusCode === 200 || response?.status === 200 || response?.success) {
    //             showToast(response?.message || 'Product added to cart');
    //             // Refresh cart data to ensure sync
    //             fetchCartData();
    //         } else {
    //             // Revert on failure
    //             setCartItems((prev) => {
    //                 const updated = { ...prev };
    //                 delete updated[item._id];
    //                 return updated;
    //             });
    //             ToastMsg(response?.message || 'Failed to add product to cart');
    //         }
    //     } catch (error) {
    //         // Revert on error
    //         setCartItems((prev) => {
    //             const updated = { ...prev };
    //             delete updated[item._id];
    //             return updated;
    //         });

    //         console.log('Add to Cart Error:', error);
    //         if (error?.response?.status === 401) {
    //             ToastMsg('Please login to add items to cart');
    //         } else if (error?.response?.data?.message) {
    //             ToastMsg(error.response.data.message);
    //         } else {
    //             ToastMsg('Failed to add product to cart');
    //         }
    //     }
    // };

    const handleAddToCart = async (item) => {
        if (!item.stock || item.stock <= 0) {
            ToastMsg('Out of stock!');
            return;
        }

        // Optimistically update UI
        setCartItems((prev) => ({
            ...prev,
            [item._id]: 1,
        }));

        try {
            const data = {
                productId: item._id, // Ye directly _id bhejo, object nahi
                quantity: 1,
            };

            const token = await getItem('token');
            const response = await apiPost(urls?.addToCart, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (response?.statusCode === 200 || response?.status === 200 || response?.success) {
                showToast(response?.message || 'Product added to cart');
                // Backend se fresh data fetch karo
                await fetchCartData();
            } else {
                // Revert on failure
                setCartItems((prev) => {
                    const updated = { ...prev };
                    delete updated[item._id];
                    return updated;
                });
                ToastMsg(response?.message || 'Failed to add product to cart');
            }
        } catch (error) {
            // Revert on error
            setCartItems((prev) => {
                const updated = { ...prev };
                delete updated[item._id];
                return updated;
            });

            console.log('Add to Cart Error:', error);
            if (error?.response?.status === 401) {
                ToastMsg('Please login to add items to cart');
            } else if (error?.response?.data?.message) {
                ToastMsg(error.response.data.message);
            } else {
                ToastMsg('Failed to add product to cart');
            }
        }
    };

    // Update cart quantity
    const updateCartQuantity = async (productId, newQuantity, stock) => {
        if (isUpdatingCart) return; // Prevent multiple simultaneous updates

        try {
            setIsUpdatingCart(true);

            const data = {
                productId: productId,
                quantity: newQuantity
            };

            const token = await getItem('token');
            const response = await apiPost(urls?.updateCartData, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (response?.statusCode === 200 || response?.status === 200 || response?.success) {
                // Update successful - refresh cart
                fetchCartData();
            } else {
                ToastMsg(response?.message || 'Failed to update cart');
                fetchCartData(); // Revert to server state
            }
        } catch (error) {
            console.error('Error updating cart:', error);
            ToastMsg('Failed to update cart');
            fetchCartData(); // Revert to server state
        } finally {
            setIsUpdatingCart(false);
        }
    };

    // Remove from cart
    const removeFromCart = async (productId) => {
        // Optimistically update UI
        setCartItems((prev) => {
            const updated = { ...prev };
            delete updated[productId];
            return updated;
        });

        try {
            const token = await getItem('token');
            const response = await apiDelete(`${urls?.deleteCartData}/${productId}`);


            if (response?.statusCode === 200 || response?.status === 200 || response?.success) {
                showToast('Item removed from cart');
                fetchCartData();
            } else {
                ToastMsg(response?.message || 'Failed to remove item');
                fetchCartData(); // Revert to server state
            }
        } catch (error) {
            console.error('Error removing item:', error);
            ToastMsg('Failed to remove item from cart');
            fetchCartData(); // Revert to server state
        }
    };

    // Handle increment with stock check
    const handleIncrement = (item) => {
        const currentQty = cartItems[item._id] || 0;

        if (!item.stock || currentQty >= item.stock) {
            ToastMsg(`Only ${item.stock} items available in stock`);
            return;
        }

        const newQuantity = currentQty + 1;

        // Optimistically update UI
        setCartItems((prev) => ({
            ...prev,
            [item._id]: newQuantity,
        }));

        // Call API to update
        updateCartQuantity(item._id, newQuantity, item.stock);
    };

    // Handle decrement with remove confirmation
    const handleDecrement = (item) => {
        const currentQty = cartItems[item._id] || 0;

        if (currentQty <= 1) {
            removeFromCart(item._id)
            // Show confirmation before removing
            // Alert.alert(
            //     "Remove Item",
            //     "Remove this item from cart?",
            //     [
            //         {
            //             text: "Cancel",
            //             style: "cancel",
            //             onPress: () => {
            //                 // Do nothing - keep item in cart
            //             }
            //         },
            //         {
            //             text: "Remove",
            //             style: "destructive",
            //             onPress: () => removeFromCart(item._id)
            //         }
            //     ]
            // );
            return;
        }

        const newQuantity = currentQty - 1;

        // Optimistically update UI
        setCartItems((prev) => ({
            ...prev,
            [item._id]: newQuantity,
        }));

        // Call API to update
        updateCartQuantity(item._id, newQuantity, item.stock);
    };

    // Calculate total items in cart
    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
    };

    const styles = StyleSheet.create({
        quantityControl: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: App_Primary_color,
            borderRadius: 6,
            backgroundColor: 'white',
            paddingHorizontal: 4,
            paddingVertical: 2,
        },
        quantityBtn: {
            paddingHorizontal: 6,
        },
        quantityText: {
            color: App_Primary_color,
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_Bold,
        },
        quantityCount: {
            fontSize: 12,
            color: App_Primary_color,
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
            flexDirection: 'row',
            gap: 10
            // bottom:10
        },
        currentPrice: {
            fontSize: 12,
            fontFamily: FONTS_FAMILY.Poppins_Bold,
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
        return (
            <View style={{ flex: 1, marginTop: 100 }}>
                <BlinKitLoader isDarkMode={isDarkMode} />
            </View>
        )
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
                        {'Best Deal'}
                    </Text>
                    <TouchableOpacity
                    // onPress={() => navigation.navigate('Tab', { screen: 'Fav' })}
                    >
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.productsGrid}>
                    {filteredProducts.map((item, index) => (
                        <AnimatedCard
                            key={item._id || index}
                            delay={index * 30}
                            onPress={() => navigation.navigate('ProductDetail', { productId: item?._id })}
                        >
                            <View style={styles.productCard}>
                                <View style={styles.productImageWrapper}>
                                    <Image
                                        source={item?.images?.length > 0 ? { uri: item?.images[0] } : { uri: 'https://via.placeholder.com/150' }}
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

                                    <Row style={{gap:10}}>
                                        <Text style={styles.productName} numberOfLines={2}>
                                            {item.name}
                                        </Text>

                                        <Text style={styles.productWeight}>1 kg</Text>

                                    </Row>
                                    <View style={styles.priceColumn}>
                                        <Text style={styles.currentPrice}>₹{item.price}</Text>
                                        {item?.discountPrice && (
                                            <Text style={styles.originalPrice}>₹{item.discountPrice}</Text>
                                        )}
                                    </View>

                                    <View style={styles.priceRow}>

                                        {cartItems[item._id] ? (
                                            <View style={styles.quantityControl}>
                                                <TouchableOpacity
                                                    onPress={() => handleDecrement(item)}
                                                    style={styles.quantityBtn}
                                                    disabled={isUpdatingCart}
                                                >
                                                    <Text style={styles.quantityText}>-</Text>
                                                </TouchableOpacity>

                                                <Text style={styles.quantityCount}>{cartItems[item._id]}</Text>

                                                <TouchableOpacity
                                                    onPress={() => handleIncrement(item)}
                                                    style={styles.quantityBtn}
                                                    disabled={isUpdatingCart}
                                                >
                                                    <Text style={styles.quantityText}>+</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ) : (
                                            <TouchableOpacity
                                                style={styles.addButton}
                                                onPress={() => handleAddToCart(item)}
                                            >
                                                <Text style={styles.addButtonText}>ADD</Text>
                                            </TouchableOpacity>
                                        )}
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
            {<RenderBestSellers navigation={navigation} />}
            {renderBannerSection()}
            {renderProductsGrid()}

            {/* Floating Cart Button */}
            {/* {getTotalCartItems() > 0 && (
                <View style={styles.floatingButtonContainer}>
                    <TouchableOpacity 
                        style={styles.floatingButton}
                        onPress={() => navigation.navigate('CartScreen')}
                    >
                        <Ionicons name="cart" size={20} color="white" />
                        <Text style={styles.floatingButtonText}>View Cart</Text>
                        <View style={styles.floatingBadge}>
                            <Text style={styles.floatingBadgeText}>{getTotalCartItems()}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )} */}
        </View>
    )
}

export default AllPrducts