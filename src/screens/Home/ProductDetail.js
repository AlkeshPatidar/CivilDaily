
// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   SafeAreaView,
//   StatusBar,
//   ScrollView,
// } from 'react-native';
// import Carousel, { Pagination } from 'react-native-snap-carousel';
// import { BackIcon } from '../../assets/SVGs';
// import { FONTS_FAMILY } from '../../assets/Fonts';
// import { App_Primary_color, dark33, darkMode25 } from '../../common/Colors/colors';
// import { useSelector } from 'react-redux';
// import { apiGet, apiPost } from '../../utils/Apis';
// import urls from '../../config/urls';
// import useLoader from '../../utils/LoaderHook';
// import { ToastMsg } from '../../utils/helperFunctions';
// import SpaceBetweenRow from '../../components/wrapper/spacebetween';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
// const SLIDER_WIDTH = screenWidth;
// const ITEM_WIDTH = screenWidth;

// const ProductDetail = ({ navigation, route }) => {
//   const [activeSlide, setActiveSlide] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [product, setproduct] = useState([]);
//   const { showLoader, hideLoader } = useLoader();

//   // Get user data for authentication
//   let selector = useSelector(state => state?.user?.userData);
//   if (Object.keys(selector).length != 0) {
//     selector = JSON.parse(selector);
//   }

//   const [fav, setFav] = useState([])


//   const carouselRef = useRef(null);

//   useEffect(() => {
//     productDetail()
//     getAllFav()
//   }, [])

//   const getAllFav = async () => {
//     try {
//       showLoader()
//       const res = await apiGet(urls?.getAllFav)
//       console.log(res?.data);
//       setFav(res?.data)
//       hideLoader()
//     } catch (error) {
//       hideLoader()
//     }
//   }

//   const productDetail = async () => {
//     try {
//       showLoader()
//       const res = await apiGet(`${urls?.getProductDetail}/${route?.params?.productId}`)
//       console.log(res?.data);
//       setproduct(res?.data)
//       hideLoader()
//     } catch (error) {
//       hideLoader()
//     }
//   }

//   const addToCart = async () => {
//     try {
//       showLoader();

//       const data = {
//         productId: route?.params?.productId,
//         quantity: quantity
//       };

//       console.log('Add to Cart Request:', data);

//       // Get token for authentication
//       const token = selector?.token || selector?.accessToken;

//       const response = await apiPost(urls?.addToCart || '/api/cart/add', data, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         }
//       });

//       hideLoader();

//       if (response?.statusCode === 200 || response?.status === 200 || response?.success) {
//         ToastMsg(response?.message || response?.data?.message || 'Product added to cart successfully');
//         // Reset quantity after successful addition
//         setQuantity(1);
//       } else {
//         ToastMsg(response?.message || response?.data?.message || 'Failed to add product to cart');
//       }

//     } catch (error) {
//       hideLoader();
//       console.log('Add to Cart Error:', error);

//       if (error?.response?.status === 401) {
//         ToastMsg('Please login to add items to cart');
//       } else if (error?.response?.data?.message) {
//         ToastMsg(error.response.data.message);
//       } else {
//         ToastMsg('Failed to add product to cart');
//       }
//     }
//   };

//   // Sample images for the carousel
//   const carouselItems = [
//     { id: 1, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop' },
//     { id: 2, image: 'https://images.unsplash.com/photo-1552127673-8bb5e9eff1b7?w=400&h=300&fit=crop' },
//     { id: 3, image: 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=400&h=300&fit=crop' },
//   ];

//   const renderCarouselItem = ({ item }) => (
//     <View style={styles.carouselItem}>
//       <Image source={{ uri: item }} style={styles.carouselImage} />
//     </View>
//   );

//   const increaseQuantity = () => {
//     if (quantity < product?.stock) {
//       setQuantity(quantity + 1);
//     } else {
//       ToastMsg(`Only ${product?.stock} items available in stock`);
//     }
//   };

//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const { isDarkMode } = useSelector(state => state.theme)

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: isDarkMode ? darkMode25 : '#fff',
//     },
//     header: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       paddingHorizontal: 16,
//       paddingVertical: 12,
//       position: 'absolute',
//       top: 50,
//       left: 0,
//       right: 0,
//       zIndex: 10,
//     },
//     backButton: {
//       width: 40,
//       height: 40,
//       backgroundColor: 'rgba(255, 255, 255, 0.9)',
//       borderRadius: 20,
//       justifyContent: 'center',
//       alignItems: 'center',
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.1,
//       shadowRadius: 4,
//       elevation: 3,
//     },
//     carouselContainer: {
//       marginTop: 40,
//     },
//     carouselItem: {
//       width: ITEM_WIDTH,
//       height: 250,
//     },
//     carouselImage: {
//       width: '100%',
//       height: '100%',
//       resizeMode: 'cover',
//     },
//     paginationContainer: {
//       position: 'absolute',
//       bottom: 0,
//       alignSelf: 'center',
//     },
//     paginationDot: {
//       width: 19,
//       height: 5,
//       borderRadius: 4,
//       backgroundColor: '#F9B023',
//     },
//     paginationInactiveDot: {
//       backgroundColor: '#C4C4C4',
//     },
//     productInfo: {
//       padding: 20,
//       borderTopRightRadius: 30,
//       borderTopLeftRadius: 30
//     },
//     productTitle: {
//       fontSize: 18,
//       fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//       color: isDarkMode ? 'white' : '#333',
//       marginBottom: 8,
//     },
//     productPrice: {
//       fontSize: 15,
//       fontWeight: '600',
//       color: isDarkMode ? 'white' : 'black',
//       marginBottom: 8,
//     },
//     stockInfo: {
//       fontSize: 14,
//       fontFamily: FONTS_FAMILY.Poppins_Medium,
//       color: product?.stock > 0 ? '#4CAF50' : '#F44336',
//       marginBottom: 16,
//     },
//     productDescription: {
//       fontSize: 14,
//       lineHeight: 20,
//       color: isDarkMode ? 'white' : '#666',
//       marginBottom: 24,
//       fontFamily: FONTS_FAMILY.Poppins_Regular
//     },
//     quantityContainer: {
//       marginBottom: 20,
//     },
//     quantityLabel: {
//       fontSize: 16,
//       fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//       color: isDarkMode ? 'white' : '#333',
//       marginBottom: 12,
//     },
//     quantitySelector: {
//       flexDirection: 'row',
//       alignItems: 'center',
//     },
//     quantityButton: {
//       width: 40,
//       height: 40,
//       backgroundColor: isDarkMode ? '#444' : '#f0f0f0',
//       borderRadius: 20,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderWidth: 1,
//       borderColor: isDarkMode ? '#555' : '#ddd',
//     },
//     quantityButtonDisabled: {
//       backgroundColor: isDarkMode ? '#2a2a2a' : '#e0e0e0',
//       borderColor: isDarkMode ? '#333' : '#ccc',
//     },
//     quantityButtonText: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       color: isDarkMode ? 'white' : '#333',
//     },
//     quantityButtonTextDisabled: {
//       color: isDarkMode ? '#666' : '#999',
//     },
//     quantityDisplay: {
//       marginHorizontal: 20,
//       paddingHorizontal: 16,
//       paddingVertical: 8,
//       backgroundColor: isDarkMode ? '#333' : '#f8f8f8',
//       borderRadius: 8,
//       minWidth: 50,
//       alignItems: 'center',
//       borderWidth: 1,
//       borderColor: isDarkMode ? '#444' : '#e0e0e0',
//     },
//     quantityNumber: {
//       fontSize: 16,
//       fontWeight: '600',
//       color: isDarkMode ? 'white' : '#333',
//       fontFamily: FONTS_FAMILY.Poppins_Medium,
//     },
//     bottomContainer: {
//       flexDirection: 'row',
//       paddingHorizontal: 20,
//       paddingVertical: 16,
//       paddingBottom: 30,
//       gap: 12,
//       backgroundColor: isDarkMode ? darkMode25 : '#fff',
//       borderTopWidth: 1,
//       borderTopColor: isDarkMode ? '#333' : '#f0f0f0',
//     },
//     addToCartButton: {
//       flex: 1,
//       backgroundColor: isDarkMode ? dark33 : '#fff',
//       borderWidth: 1.5,
//       borderColor: App_Primary_color,
//       paddingVertical: 16,
//       borderRadius: 100,
//       alignItems: 'center',
//     },
//     addToCartButtonDisabled: {
//       backgroundColor: isDarkMode ? '#2a2a2a' : '#f5f5f5',
//       borderColor: isDarkMode ? '#444' : '#ccc',
//     },
//     addToCartText: {
//       fontSize: 16,
//       fontWeight: '600',
//       color: App_Primary_color,
//       fontFamily: FONTS_FAMILY.Poppins_Medium,
//     },
//     addToCartTextDisabled: {
//       color: isDarkMode ? '#666' : '#999',
//     },
//     buyNowButton: {
//       flex: 1,
//       backgroundColor: App_Primary_color,
//       paddingVertical: 16,
//       borderRadius: 100,
//       alignItems: 'center',
//     },
//     buyNowButtonDisabled: {
//       backgroundColor: isDarkMode ? '#444' : '#ccc',
//     },
//     buyNowText: {
//       fontSize: 16,
//       fontWeight: '600',
//       color: '#fff',
//       fontFamily: FONTS_FAMILY.Poppins_Medium,
//     },
//   });

//   // Check if product is out of stock
//   const isOutOfStock = product?.stock === 0;
//   const canDecreaseQuantity = quantity > 1;
//   const canIncreaseQuantity = quantity < product?.stock;

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : "dark-content"} backgroundColor={isDarkMode ? darkMode25 : "white"} />

//       {/* Header with back button */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <BackIcon />
//         </TouchableOpacity>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Carousel Section */}
//         <View style={styles.carouselContainer}>
//           <Carousel
//             ref={carouselRef}
//             data={product?.images}
//             renderItem={renderCarouselItem}
//             sliderWidth={SLIDER_WIDTH}
//             itemWidth={ITEM_WIDTH}
//             onSnapToItem={setActiveSlide}
//             enableSnap={true}
//             snapOnAndroid={true}
//             removeClippedSubviews={false}
//             autoplay
//             loop
//           />

//           {/* Pagination dots */}
//           <Pagination
//             dotsLength={product?.images?.length || carouselItems.length}
//             activeDotIndex={activeSlide}
//             containerStyle={styles.paginationContainer}
//             dotStyle={styles.paginationDot}
//             inactiveDotStyle={styles.paginationInactiveDot}
//             inactiveDotOpacity={0.4}
//             inactiveDotScale={0.8}
//           />
//         </View>

//         {/* Product Info */}
//         <View style={styles.productInfo}>
//           <SpaceBetweenRow>
//             <Text style={styles.productTitle}>{product?.name}</Text>
//             <Text style={styles.productTitle}>{'Fav'}</Text>
//           </SpaceBetweenRow>
//           <Text style={styles.productPrice}>₹{product?.price}</Text>
//           <Text style={styles.stockInfo}>
//             {isOutOfStock ? 'Out of Stock' : `Stock: ${product?.stock} available`}
//           </Text>
//           <Text style={styles.productDescription}>
//             {product?.description}
//           </Text>

//           {/* Quantity Selector */}
//           {!isOutOfStock && (
//             <View style={styles.quantityContainer}>
//               <Text style={styles.quantityLabel}>Quantity</Text>
//               <View style={styles.quantitySelector}>
//                 <TouchableOpacity
//                   style={[
//                     styles.quantityButton,
//                     !canDecreaseQuantity && styles.quantityButtonDisabled
//                   ]}
//                   onPress={decreaseQuantity}
//                   disabled={!canDecreaseQuantity}
//                 >
//                   <Text style={[
//                     styles.quantityButtonText,
//                     !canDecreaseQuantity && styles.quantityButtonTextDisabled
//                   ]}>-</Text>
//                 </TouchableOpacity>

//                 <View style={styles.quantityDisplay}>
//                   <Text style={styles.quantityNumber}>{quantity}</Text>
//                 </View>

//                 <TouchableOpacity
//                   style={[
//                     styles.quantityButton,
//                     !canIncreaseQuantity && styles.quantityButtonDisabled
//                   ]}
//                   onPress={increaseQuantity}
//                   disabled={!canIncreaseQuantity}
//                 >
//                   <Text style={[
//                     styles.quantityButtonText,
//                     !canIncreaseQuantity && styles.quantityButtonTextDisabled
//                   ]}>+</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//         </View>
//       </ScrollView>

//       {/* Bottom Action Buttons */}
//       <View style={styles.bottomContainer}>
//         <TouchableOpacity
//           style={[
//             styles.addToCartButton,
//             isOutOfStock && styles.addToCartButtonDisabled
//           ]}
//           onPress={addToCart}
//           disabled={isOutOfStock}
//         >
//           <Text style={[
//             styles.addToCartText,
//             isOutOfStock && styles.addToCartTextDisabled
//           ]}>
//             {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.buyNowButton,
//             isOutOfStock && styles.buyNowButtonDisabled
//           ]}
//           onPress={() => navigation.navigate('CartScreen')}
//           disabled={isOutOfStock}
//         >
//           <Text style={styles.buyNowText}>
//             {isOutOfStock ? 'Unavailable' : 'Buy Now'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ProductDetail;

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { BackIcon } from '../../assets/SVGs';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { App_Primary_color, dark33, darkMode25 } from '../../common/Colors/colors';
import { useSelector } from 'react-redux';
import { apiGet, apiPost, apiDelete } from '../../utils/Apis';
import urls from '../../config/urls';
import useLoader from '../../utils/LoaderHook';
import { ToastMsg } from '../../utils/helperFunctions';
import SpaceBetweenRow from '../../components/wrapper/spacebetween';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductDetailSkeletonLoader from '../../components/Skeleton/ProductDetailSkeletonLoader';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const SLIDER_WIDTH = screenWidth;
const ITEM_WIDTH = screenWidth;

const ProductDetail = ({ navigation, route }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setproduct] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { showLoader, hideLoader } = useLoader();

  // Get user data for authentication
  let selector = useSelector(state => state?.user?.userData);
  if (Object.keys(selector).length != 0) {
    selector = JSON.parse(selector);
  }

  const { isDarkMode } = useSelector(state => state.theme);
  const [fav, setFav] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    initializeData();
  }, []);

  useEffect(() => {
    // Check if current product is in wishlist
    if (fav.length > 0 && route?.params?.productId) {
      const isProductInWishlist = fav.some(favItem =>
        favItem.productId?._id === route.params.productId ||
        favItem.productId === route.params.productId
      );
      setIsInWishlist(isProductInWishlist);
    }
  }, [fav, route?.params?.productId]);

  const initializeData = async () => {
    setIsLoading(true);
    await Promise.all([
      productDetail(),
      getAllFav()
    ]);
    setIsLoading(false);
  };

  const getAllFav = async () => {
    try {
      const res = await apiGet(urls?.getAllFav);
      setFav(res?.data || []);
    } catch (error) {
      console.log('Error fetching favorites:', error);
      setFav([]);
    }
  };

  const productDetail = async () => {
    try {
      const res = await apiGet(`${urls?.getProductDetail}/${route?.params?.productId}`);
      setproduct(res?.data || {});
    } catch (error) {
      console.log('Error fetching product:', error);
      setproduct({});
    }
  };

  const toggleWishlist = async () => {
    try {
      showLoader();

      const token = selector?.token || selector?.accessToken;

      if (isInWishlist) {
        // Remove from wishlist
        const response = await apiDelete(`${urls?.removeFromWishlist || '/api/wishlist/remove'}/${route?.params?.productId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (response?.statusCode === 200 || response?.status === 200 || response?.success) {
          setIsInWishlist(false);
          ToastMsg(response?.message || 'Removed from wishlist');
          // Update local fav state
          setFav(prev => prev.filter(favItem =>
            favItem.productId?._id !== route?.params?.productId &&
            favItem.productId !== route?.params?.productId
          ));
        }
      } else {
        // Add to wishlist
        const data = {
          productId: route?.params?.productId
        };

        const response = await apiPost(urls?.addToWishlist || '/api/wishlist/add', data, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (response?.statusCode === 200 || response?.status === 200 || response?.success) {
          setIsInWishlist(true);
          ToastMsg(response?.message || 'Added to wishlist');
          // Refresh wishlist
          getAllFav();
        }
      }

      hideLoader();
    } catch (error) {
      hideLoader();
      console.log('Wishlist Error:', error);

      if (error?.response?.status === 401) {
        ToastMsg('Please login to manage wishlist');
      } else if (error?.response?.data?.message) {
        ToastMsg(error.response.data.message);
      } else {
        ToastMsg('Failed to update wishlist');
      }
    }
  };

  const addToCart = async () => {
    try {
      showLoader();

      const data = {
        productId: route?.params?.productId,
        quantity: quantity
      };

      const token = selector?.token || selector?.accessToken;

      const response = await apiPost(urls?.addToCart || '/api/cart/add', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      hideLoader();

      if (response?.statusCode === 200 || response?.status === 200 || response?.success) {
        ToastMsg(response?.message || response?.data?.message || 'Product added to cart successfully');
        setQuantity(1);
        navigation.navigate('CartScreen');
      } else {
        ToastMsg(response?.message || response?.data?.message || 'Failed to add product to cart');
      }

    } catch (error) {
      hideLoader();
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

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item }} style={styles.carouselImage} />
    </View>
  );

  const increaseQuantity = () => {
    if (quantity < product?.stock) {
      setQuantity(quantity + 1);
    } else {
      ToastMsg(`Only ${product?.stock} items available in stock`);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? darkMode25 : '#fff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      position: 'absolute',
      top: 50,
      left: 0,
      right: 0,
      zIndex: 10,
    },
    backButton: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    wishlistButton: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      marginLeft: 'auto',
    },
    carouselContainer: {
      marginTop: 40,
    },
    carouselItem: {
      width: ITEM_WIDTH,
      height: 250,
    },
    carouselImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    paginationContainer: {
      position: 'absolute',
      bottom: 0,
      alignSelf: 'center',
    },
    paginationDot: {
      width: 19,
      height: 5,
      borderRadius: 4,
      backgroundColor: '#F9B023',
    },
    paginationInactiveDot: {
      backgroundColor: '#C4C4C4',
    },
    productInfo: {
      padding: 20,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30
    },
    productTitle: {
      fontSize: 18,
      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
      color: isDarkMode ? 'white' : '#333',
      marginBottom: 8,
      flex: 1,
    },
    wishlistIconContainer: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: isDarkMode ? dark33 : '#f8f8f8',
      borderWidth: 1,
      borderColor: isDarkMode ? '#444' : '#e0e0e0',
    },
    productPrice: {
      fontSize: 15,
      fontWeight: '600',
      color: isDarkMode ? 'white' : 'black',
      marginBottom: 8,
    },
    stockInfo: {
      fontSize: 14,
      fontFamily: FONTS_FAMILY.Poppins_Medium,
      color: product?.stock > 0 ? '#4CAF50' : '#F44336',
      marginBottom: 16,
    },
    productDescription: {
      fontSize: 14,
      lineHeight: 20,
      color: isDarkMode ? 'white' : '#666',
      marginBottom: 24,
      fontFamily: FONTS_FAMILY.Poppins_Regular
    },
    quantityContainer: {
      marginBottom: 20,
    },
    quantityLabel: {
      fontSize: 16,
      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
      color: isDarkMode ? 'white' : '#333',
      marginBottom: 12,
    },
    quantitySelector: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantityButton: {
      width: 40,
      height: 40,
      backgroundColor: isDarkMode ? '#444' : '#f0f0f0',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: isDarkMode ? '#555' : '#ddd',
    },
    quantityButtonDisabled: {
      backgroundColor: isDarkMode ? '#2a2a2a' : '#e0e0e0',
      borderColor: isDarkMode ? '#333' : '#ccc',
    },
    quantityButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? 'white' : '#333',
    },
    quantityButtonTextDisabled: {
      color: isDarkMode ? '#666' : '#999',
    },
    quantityDisplay: {
      marginHorizontal: 20,
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: isDarkMode ? '#333' : '#f8f8f8',
      borderRadius: 8,
      minWidth: 50,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: isDarkMode ? '#444' : '#e0e0e0',
    },
    quantityNumber: {
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? 'white' : '#333',
      fontFamily: FONTS_FAMILY.Poppins_Medium,
    },
    bottomContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 16,
      paddingBottom: 30,
      gap: 12,
      backgroundColor: isDarkMode ? darkMode25 : '#fff',
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#333' : '#f0f0f0',
    },
    addToCartButton: {
      flex: 1,
      backgroundColor: isDarkMode ? dark33 : '#fff',
      borderWidth: 1.5,
      borderColor: App_Primary_color,
      paddingVertical: 16,
      borderRadius: 100,
      alignItems: 'center',
    },
    addToCartButtonDisabled: {
      backgroundColor: isDarkMode ? '#2a2a2a' : '#f5f5f5',
      borderColor: isDarkMode ? '#444' : '#ccc',
    },
    addToCartText: {
      fontSize: 16,
      fontWeight: '600',
      color: App_Primary_color,
      fontFamily: FONTS_FAMILY.Poppins_Medium,
    },
    addToCartTextDisabled: {
      color: isDarkMode ? '#666' : '#999',
    },
    buyNowButton: {
      flex: 1,
      backgroundColor: App_Primary_color,
      paddingVertical: 16,
      borderRadius: 100,
      alignItems: 'center',
    },
    buyNowButtonDisabled: {
      backgroundColor: isDarkMode ? '#444' : '#ccc',
    },
    buyNowText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#fff',
      fontFamily: FONTS_FAMILY.Poppins_Medium,
    },
  });

  // Check if product is out of stock
  const isOutOfStock = product?.stock === 0;
  const canDecreaseQuantity = quantity > 1;
  const canIncreaseQuantity = quantity < product?.stock;

  if (isLoading) {
    return <ProductDetailSkeletonLoader isDarkMode={isDarkMode} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : "dark-content"} backgroundColor={isDarkMode ? darkMode25 : "white"} />

      {/* Header with back button and wishlist */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={toggleWishlist}
        >
          <Icon
            name={isInWishlist ? "favorite" : "favorite-border"}
            size={24}
            color={isInWishlist ? App_Primary_color : "#666"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Carousel Section */}
        <View style={styles.carouselContainer}>
          <Carousel
            ref={carouselRef}
            data={product?.images || []}
            renderItem={renderCarouselItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            onSnapToItem={setActiveSlide}
            enableSnap={true}
            snapOnAndroid={true}
            removeClippedSubviews={false}
            autoplay
            loop
          />

          {/* Pagination dots */}
          <Pagination
            dotsLength={product?.images?.length || 3}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.paginationDot}
            inactiveDotStyle={styles.paginationInactiveDot}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.8}
          />
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <SpaceBetweenRow>
            <Text style={styles.productTitle}>{product?.name}</Text>
          </SpaceBetweenRow>

          <Text style={styles.productPrice}>₹{product?.price}</Text>
          <Text style={styles.stockInfo}>
            {isOutOfStock ? 'Out of Stock' : `Stock: ${product?.stock} available`}
          </Text>
          <Text style={styles.productDescription}>
            {product?.description}
          </Text>

          {/* Quantity Selector */}
          {!isOutOfStock && (
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityLabel}>Quantity</Text>
              <View style={styles.quantitySelector}>
                <TouchableOpacity
                  style={[
                    styles.quantityButton,
                    !canDecreaseQuantity && styles.quantityButtonDisabled
                  ]}
                  onPress={decreaseQuantity}
                  disabled={!canDecreaseQuantity}
                >
                  <Text style={[
                    styles.quantityButtonText,
                    !canDecreaseQuantity && styles.quantityButtonTextDisabled
                  ]}>-</Text>
                </TouchableOpacity>

                <View style={styles.quantityDisplay}>
                  <Text style={styles.quantityNumber}>{quantity}</Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.quantityButton,
                    !canIncreaseQuantity && styles.quantityButtonDisabled
                  ]}
                  onPress={increaseQuantity}
                  disabled={!canIncreaseQuantity}
                >
                  <Text style={[
                    styles.quantityButtonText,
                    !canIncreaseQuantity && styles.quantityButtonTextDisabled
                  ]}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            isOutOfStock && styles.addToCartButtonDisabled
          ]}
          onPress={addToCart}
          disabled={isOutOfStock}
        >
          <Text style={[
            styles.addToCartText,
            isOutOfStock && styles.addToCartTextDisabled
          ]}>
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buyNowButton,
            isOutOfStock && styles.buyNowButtonDisabled
          ]}
          onPress={() => addToCart()}
          disabled={isOutOfStock}
        >
          <Text style={styles.buyNowText}>
            {isOutOfStock ? 'Unavailable' : 'Buy Now'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;