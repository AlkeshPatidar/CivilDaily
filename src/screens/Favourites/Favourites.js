// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     ScrollView,
//     StyleSheet,
//     StatusBar,
//     SafeAreaView,
//     Image,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { App_Primary_color, dark33, darkMode25 } from '../../common/Colors/colors';
// import { FONTS_FAMILY } from '../../assets/Fonts';
// import Row from '../../components/wrapper/row';
// import { AddButton, BackIcon, BackWhite, DownChev } from '../../assets/SVGs';
// import IMG from '../../assets/Images';
// import SpaceBetweenRow from '../../components/wrapper/spacebetween';
// import CustomText from '../../components/TextComponent';
// import { useSelector } from 'react-redux';
// import useLoader from '../../utils/LoaderHook';
// import { apiDelete, apiGet } from '../../utils/Apis';
// import urls from '../../config/urls';
// import AntDesign from 'react-native-vector-icons/AntDesign'
// import { useIsFocused } from '@react-navigation/native';
// import { positionStyle } from 'react-native-flash-message';
// import FavouriteScreenSkeletonLoader from '../../components/Skeleton/FavoriteSkeletonLoader';


// export default function Favourite({ navigation }) {

//     const [fav, setFav] = useState([])
//     const { showLoader, hideLoader } = useLoader()
//     const isFocused = useIsFocused()
//     const [isLoading, setIsLoading] = useState(false)

//     useEffect(() => {
//         getAllFav()
//     }, [isFocused])

//     const deleteFromWishList = async (id) => {
//         try {
//             setIsLoading(true)
//             const res = await apiDelete(`/api/wishlist/remove/${id}`)
//             getAllFav()
//             setIsLoading(false)
//         } catch (error) {
//             console.log('+++++++++++++=');
//             setIsLoading(false)
//         }
//     }

//     const getAllFav = async () => {
//         try {
//             setIsLoading(true)
//             const res = await apiGet(urls?.getAllFav)
//             // console.log('++++++++++++++',JSON.stringify(res?.data));
//             setFav(res?.data)
//             setIsLoading(false)


//         } catch (error) {
//             setIsLoading(false)
//         }
//     }
//     // Header Component
//     const renderHeader = () => (
//         <View style={styles.headerContainer}>
//             <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />
//             <TouchableOpacity>
//                 <Row style={{ gap: 20 }}>
//                     <TouchableOpacity onPress={() => navigation.goBack()}>
//                         <BackWhite />

//                     </TouchableOpacity>
//                     <CustomText style={{
//                         color: 'white',
//                         fontFamily: FONTS_FAMILY.Poppins_Medium,
//                         fontSize: 18
//                     }}>Favourite ({fav?.length} Items)</CustomText>
//                 </Row>

//             </TouchableOpacity>

//         </View>
//     );



//     // Top Picks Component
//     const renderTopPicks = () => {


//         return (
//             <View style={styles.sectionContainer}>
//                 <View style={styles.sectionHeader}>

//                 </View>

//                 <View style={{}}>
//                     {
//                         fav?.length > 0 ?
//                             (
//                                 fav.map((item, index) => (
//                                     <View>

//                                         <TouchableOpacity key={index} style={styles.productCard1}
//                                             onPress={() => navigation.navigate('ProductDetail', { productId: item?._id })}
//                                         >
//                                             <Image source={item?.productId?.images ? { uri: item?.productId?.images[0] } : IMG.Potato} style={{
//                                                 height: 68, width: 80,
//                                                 borderRadius: 10
//                                             }} />
//                                             <View style={{ marginLeft: 20 }}>
//                                                 <Text style={styles.productName}>{item?.productId?.name}</Text>
//                                                 <View style={styles.priceContainer}>
//                                                     {/* <Row style={{ gap: 10 }}> */}
//                                                     <Text style={{ fontSize: 12, fontFamily: FONTS_FAMILY.Poppins_Regular, color: '#777777' }}>Stock {item.productId?.stock}</Text>

//                                                     {/* </Row> */}

//                                                 </View>
//                                                 <Row style={{
//                                                     gap: 10
//                                                 }}>
//                                                     <Text style={styles.currentPrice}>Rs{item.productId?.price}</Text>
//                                                     <Text style={styles.originalPrice}>Rs {item.productId?.discountPrice}</Text>

//                                                 </Row>
//                                             </View>






//                                         </TouchableOpacity>
//                                         <Row style={{
//                                             // marginTop:40
//                                             alignSelf: 'flex-end',
//                                             gap: 10,
//                                             top: 5,
//                                             position: 'absolute',
//                                             right: 5,
//                                             zIndex: 10000
//                                         }}>
//                                             <TouchableOpacity
//                                                 onPress={() => deleteFromWishList(item?.productId?._id)}
//                                                 style={{
//                                                     // position: 'absolute', right: 15, top: 10, elevation: 1,
//                                                     backgroundColor: 'white',
//                                                     padding: 5,
//                                                     borderRadius: 100
//                                                 }}
//                                             >
//                                                 <AntDesign name='delete'
//                                                     color={App_Primary_color}
//                                                     size={22}
//                                                 />
//                                             </TouchableOpacity>

//                                             <TouchableOpacity
//                                                 // style={{ position: 'absolute', right: 10, bottom: 10, elevation: 1 }}
//                                                 onPress={() => navigation.navigate('ProductDetail', { productId: item?.productId?._id })}
//                                             >
//                                                 <AddButton />
//                                             </TouchableOpacity>
//                                         </Row>
//                                     </View>
//                                 ))

//                             ) :
//                             <CustomText
//                                 style={{
//                                     alignSelf: 'center',
//                                     fontFamily: FONTS_FAMILY.Poppins_Medium,
//                                     marginTop: 40
//                                 }}
//                             >No Items Added in Favourite</CustomText>
//                     }
//                 </View>
//             </View>
//         );
//     };


//     const { isDarkMode } = useSelector(state => state.theme)

//     const styles = StyleSheet.create({
//         container: {
//             flex: 1,
//             backgroundColor: isDarkMode ? darkMode25 : '#F9FAFB',
//         },

//         // Header Styles
//         headerContainer: {
//             backgroundColor: App_Primary_color,
//             paddingHorizontal: 16,
//             paddingTop: 16,
//             paddingBottom: 24,
//             borderBottomLeftRadius: 0,
//             borderBottomRightRadius: 0,
//             // height: 200,
//             zIndex: 10000000
//         },
//         topBar: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: 16,
//         },
//         leftHeader: {
//             // flexDirection: 'row',
//             // alignItems: 'center',
//         },
//         avatarContainer: {
//             width: 32,
//             height: 32,
//             backgroundColor: 'white',
//             borderRadius: 16,
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginRight: 8,
//         },
//         avatarText: {
//             color: 'white',
//             fontFamily: FONTS_FAMILY.Poppins_Regular,
//             fontSize: 14,
//         },
//         timeText: {
//             color: 'white',
//             fontSize: 14,
//             opacity: 0.9,
//         },
//         rightHeader: {
//             flexDirection: 'row',
//         },
//         iconButton: {
//             marginLeft: 16,
//             backgroundColor: '#6C87CF',
//             padding: 5,
//             borderRadius: 100
//         },
//         titleContainer: {
//             marginBottom: 16,
//         },
//         mainTitle: {
//             color: 'white',
//             fontSize: 24,
//             fontWeight: 'bold',
//             marginBottom: 4,
//         },
//         subtitle: {
//             color: 'white',
//             fontSize: 14,
//             opacity: 0.9,
//         },
//         searchContainer: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             backgroundColor: '#3658B0',
//             borderRadius: 100,
//             paddingHorizontal: 16,
//             height: 40,
//         },
//         searchIcon: {
//             marginRight: 12,
//         },
//         searchInput: {
//             flex: 1,
//             fontSize: 13,
//             color: 'white',
//             fontFamily: FONTS_FAMILY.Poppins_Regular
//         },

//         // Section Styles
//         sectionContainer: {
//             // backgroundColor: 'white',
//             paddingHorizontal: 16,
//             paddingVertical: 15,
//             // marginBottom: 8,
//             zIndex: -100000,
//             // elevation:3
//         },
//         sectionTitle: {
//             fontSize: 16,
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//             color: '#1F2937',
//             marginBottom: 16,
//         },
//         sectionHeader: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             // marginBottom: 16,
//         },
//         seeAllText: {
//             color: '#3B82F6',
//             fontSize: 14,
//             fontWeight: '500',
//         },

//         // Categories Styles
//         categoriesGrid: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             gap: 10
//         },
//         categoryItem: {
//             // alignItems: 'center',
//             // flex: 1,
//         },
//         categoryIcon: {
//             width: 100,
//             height: 100,
//             borderRadius: 16,
//             // justifyContent: 'center',
//             // alignItems: 'center',
//             // marginBottom: 8,
//             paddingTop: 8,
//             paddingLeft: 8,
//         },
//         categoryEmoji: {
//             fontSize: 28,
//         },
//         categoryText: {
//             fontSize: 13,
//             color: 'black',
//             // textAlign: 'center',
//             lineHeight: 16,
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold
//         },

//         // Promo Card Styles
//         promoCard: {
//             backgroundColor: '#F97316',
//             borderRadius: 16,
//             padding: 24,
//             overflow: 'hidden',
//         },
//         promoContent: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//         },
//         promoTextContainer: {
//             flex: 1,
//         },
//         promoTitle: {
//             color: 'white',
//             fontSize: 20,
//             fontWeight: 'bold',
//             marginBottom: 8,
//         },
//         promoSubtitle: {
//             color: 'white',
//             fontSize: 14,
//             opacity: 0.9,
//             marginBottom: 16,
//         },
//         shopNowButton: {
//             backgroundColor: 'white',
//             paddingHorizontal: 16,
//             paddingVertical: 8,
//             borderRadius: 20,
//             alignSelf: 'flex-start',
//         },
//         shopNowText: {
//             color: '#F97316',
//             fontSize: 14,
//             fontWeight: '600',
//         },
//         promoEmoji: {
//             fontSize: 64,
//             opacity: 0.2,
//         },

//         // Products Grid Styles
//         productsGrid: {
//             flexDirection: 'row',
//             // flexWrap: 'wrap',
//             justifyContent: 'space-between',
//             gap: 20
//         },
//         productCard: {
//             width: '48%',
//             backgroundColor: '#FFFFFF',
//             borderRadius: 16,
//             padding: 16,
//             marginBottom: 16,
//             shadowColor: '#000',
//             shadowOffset: {
//                 width: 0,
//                 height: 1,
//             },
//             shadowOpacity: 0.05,
//             shadowRadius: 2,
//             // elevation: 1,
//             flexDirection: 'row',
//             justifyContent: 'space-between'
//         },
//         productCard1: {
//             width: '100%',
//             backgroundColor: isDarkMode ? dark33 : '#FFFFFF',
//             borderRadius: 16,
//             padding: 16,
//             marginBottom: 16,
//             shadowColor: '#000',
//             shadowOffset: {
//                 width: 0,
//                 height: 1,
//             },
//             shadowOpacity: 0.05,
//             shadowRadius: 2,
//             elevation: 3,
//             flexDirection: 'row',
//             // justifyContent: 'space-between'
//         },
//         productImageContainer: {
//             height: 96,
//             backgroundColor: '#F9FAFB',
//             borderRadius: 12,
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginBottom: 12,
//             position: 'relative',
//         },
//         productImage: {
//             fontSize: 32,
//         },
//         discountBadge: {
//             position: 'absolute',
//             top: 8,
//             right: 8,
//             backgroundColor: '#EF4444',
//             paddingHorizontal: 8,
//             paddingVertical: 4,
//             borderRadius: 12,
//         },
//         discountText: {
//             color: 'white',
//             fontSize: 10,
//             fontWeight: '600',
//         },
//         productName: {
//             fontSize: 14,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             color: isDarkMode ? 'white' : '#1F2937',
//             marginBottom: 4,
//         },
//         ratingContainer: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginBottom: 8,
//         },
//         ratingText: {
//             fontSize: 12,
//             color: isDarkMode ? 'white' : '#6B7280',
//             marginLeft: 4,
//         },
//         priceContainer: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//         },
//         currentPrice: {
//             fontSize: 16,
//             fontWeight: 'bold',
//             color: isDarkMode ? 'white' : '#1F2937',
//         },
//         originalPrice: {
//             fontSize: 12,
//             color: '#9CA3AF',
//             textDecorationLine: 'line-through',
//         },
//         addButton: {
//             width: 32,
//             height: 32,
//             backgroundColor: '#3B82F6',
//             borderRadius: 16,
//             justifyContent: 'center',
//             alignItems: 'center',
//         },
//         addButtonText: {
//             color: 'white',
//             fontSize: 18,
//             fontWeight: 'bold',
//         },
//     });

//     return (
//         <SafeAreaView style={styles.container}>
//             {isLoading ? (
//                 <FavouriteScreenSkeletonLoader isDarkMode={isDarkMode} />
//             ) : (
//                 <>
//                     {renderHeader()}
//                     <ScrollView showsVerticalScrollIndicator={false}>
//                         {renderTopPicks()}
//                     </ScrollView>
//                 </>
//             )}
//         </SafeAreaView>
//     );
// }

// import React, { useEffect, useState, useRef } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     ScrollView,
//     StyleSheet,
//     StatusBar,
//     SafeAreaView,
//     Image,
//     Animated,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { App_Primary_color, dark33, darkMode25 } from '../../common/Colors/colors';
// import { FONTS_FAMILY } from '../../assets/Fonts';
// import Row from '../../components/wrapper/row';
// import { AddButton, BackIcon, BackWhite, DownChev } from '../../assets/SVGs';
// import IMG from '../../assets/Images';
// import SpaceBetweenRow from '../../components/wrapper/spacebetween';
// import CustomText from '../../components/TextComponent';
// import { useSelector } from 'react-redux';
// import useLoader from '../../utils/LoaderHook';
// import { apiDelete, apiGet } from '../../utils/Apis';
// import urls from '../../config/urls';
// import AntDesign from 'react-native-vector-icons/AntDesign'
// import { useIsFocused } from '@react-navigation/native';
// import { positionStyle } from 'react-native-flash-message';
// import FavouriteScreenSkeletonLoader from '../../components/Skeleton/FavoriteSkeletonLoader';
// import BlinKitLoader from '../../components/Skeleton/BlinkitLoader';


// export default function Favourite({ navigation }) {

//     const [fav, setFav] = useState([])
//     const { showLoader, hideLoader } = useLoader()
//     const isFocused = useIsFocused()
//     const [isLoading, setIsLoading] = useState(false)
//     const animatedValues = useRef([]).current;

//     useEffect(() => {
//         getAllFav()
//     }, [isFocused])

//     useEffect(() => {
//         if (fav.length > 0) {
//             // Initialize animated values for each card
//             animatedValues.length = 0;
//             fav.forEach((_, index) => {
//                 animatedValues[index] = new Animated.Value(0);
//             });

//             // Stagger the animations
//             const animations = fav.map((_, index) => {
//                 return Animated.timing(animatedValues[index], {
//                     toValue: 1,
//                     duration: 500,
//                     delay: index * 100, // 100ms delay between each card
//                     useNativeDriver: true,
//                 });
//             });

//             Animated.stagger(100, animations).start();
//         }
//     }, [fav]);

//     const deleteFromWishList = async (id) => {
//         try {
//             setIsLoading(true)
//             const res = await apiDelete(`/api/wishlist/remove/${id}`)
//             getAllFav()
//             setIsLoading(false)
//         } catch (error) {
//             console.log('+++++++++++++=');
//             setIsLoading(false)
//         }
//     }

//     const getAllFav = async () => {
//         try {
//             setIsLoading(true)
//             const res = await apiGet(urls?.getAllFav)
//             setFav(res?.data)
//             setIsLoading(false)
//         } catch (error) {
//             setIsLoading(false)
//         }
//     }

//     // Header Component
//     const renderHeader = () => (
//         <View style={styles.headerContainer}>
//             <StatusBar barStyle="dark-content" backgroundColor={'white'} />
//             <TouchableOpacity>
//                 <Row style={{ gap: 20 }}>
//                     <TouchableOpacity onPress={() => navigation.goBack()}>
//                         {/* <BackWhite /> */}
//                         <Ionicons name="chevron-back" size={24} color="black" />

//                     </TouchableOpacity>
//                     <CustomText style={{
//                         color: '#333',
//                         fontFamily: FONTS_FAMILY.Poppins_Medium,
//                         fontSize: 18
//                     }}>Favourite ({fav?.length} Items)</CustomText>
//                 </Row>
//             </TouchableOpacity>
//         </View>
//     );

//     // Top Picks Component
//     const renderTopPicks = () => {
//         return (
//             <View style={styles.sectionContainer}>
//                 <View style={styles.sectionHeader}></View>

//                 <View style={{}}>
//                     {
//                         fav?.length > 0 ?
//                             (
//                                 fav.map((item, index) => {
//                                     const animatedValue = animatedValues[index] || new Animated.Value(1);

//                                     const opacity = animatedValue;
//                                     const translateY = animatedValue.interpolate({
//                                         inputRange: [0, 1],
//                                         outputRange: [50, 0],
//                                     });

//                                     return (
//                                         <Animated.View
//                                             key={index}
//                                             style={{
//                                                 opacity,
//                                                 transform: [{ translateY }],
//                                             }}
//                                         >
//                                             <TouchableOpacity style={styles.productCard1}
//                                                 onPress={() => navigation.navigate('ProductDetail', { productId: item?._id })}
//                                             >
//                                                 <Image source={item?.productId?.images ? { uri: item?.productId?.images[0] } : IMG.Potato} style={{
//                                                     height: 68, width: 80,
//                                                     borderRadius: 10
//                                                 }} />
//                                                 <View style={{ marginLeft: 20 }}>
//                                                     <Text style={styles.productName}>{item?.productId?.name}</Text>
//                                                     <View style={styles.priceContainer}>
//                                                         <Text style={{ fontSize: 12, fontFamily: FONTS_FAMILY.Poppins_Regular, color: '#777777' }}>Stock {item.productId?.stock}</Text>
//                                                     </View>
//                                                     <Row style={{ gap: 10 }}>
//                                                         <Text style={styles.currentPrice}>Rs{item.productId?.price}</Text>
//                                                         <Text style={styles.originalPrice}>Rs {item.productId?.discountPrice}</Text>
//                                                     </Row>
//                                                 </View>
//                                             </TouchableOpacity>
//                                             <Row style={{
//                                                 alignSelf: 'flex-end',
//                                                 gap: 10,
//                                                 top: 5,
//                                                 position: 'absolute',
//                                                 right: 5,
//                                                 zIndex: 10000
//                                             }}>
//                                                 <TouchableOpacity
//                                                     onPress={() => deleteFromWishList(item?.productId?._id)}
//                                                     style={{
//                                                         backgroundColor: 'white',
//                                                         padding: 5,
//                                                         borderRadius: 100
//                                                     }}
//                                                 >
//                                                     <AntDesign name='delete'
//                                                         color={App_Primary_color}
//                                                         size={22}
//                                                     />
//                                                 </TouchableOpacity>

//                                                 <TouchableOpacity
//                                                     onPress={() => navigation.navigate('ProductDetail', { productId: item?.productId?._id })}
//                                                 >
//                                                     <AddButton />
//                                                 </TouchableOpacity>
//                                             </Row>
//                                         </Animated.View>
//                                     );
//                                 })
//                             ) :
//                             <CustomText
//                                 style={{
//                                     alignSelf: 'center',
//                                     fontFamily: FONTS_FAMILY.Poppins_Medium,
//                                     marginTop: 40
//                                 }}
//                             >No Items Added in Favourite</CustomText>
//                     }
//                 </View>
//             </View>
//         );
//     };

//     const { isDarkMode } = useSelector(state => state.theme)

//     const styles = StyleSheet.create({
//         container: {
//             flex: 1,
//             backgroundColor: isDarkMode ? darkMode25 : '#F9FAFB',
//         },

//         // Header Styles
//         headerContainer: {
//             backgroundColor: 'white',
//             paddingHorizontal: 16,
//             paddingTop: 16,
//             paddingBottom: 24,
//             borderBottomLeftRadius: 0,
//             borderBottomRightRadius: 0,
//             zIndex: 10000000
//         },
//         topBar: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: 16,
//         },
//         leftHeader: {},
//         avatarContainer: {
//             width: 32,
//             height: 32,
//             backgroundColor: 'white',
//             borderRadius: 16,
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginRight: 8,
//         },
//         avatarText: {
//             color: 'white',
//             fontFamily: FONTS_FAMILY.Poppins_Regular,
//             fontSize: 14,
//         },
       
        
//         // Section Styles
//         sectionContainer: {
//             paddingHorizontal: 16,
//             paddingVertical: 15,
//             zIndex: -100000,
//         },
//         sectionTitle: {
//             fontSize: 16,
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//             color: '#1F2937',
//             marginBottom: 16,
//         },
//         sectionHeader: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//         },
//         seeAllText: {
//             color: '#3B82F6',
//             fontSize: 14,
//             fontWeight: '500',
//         },

//         // Categories Styles
//         categoriesGrid: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             gap: 10
//         },
//         categoryItem: {},
//         categoryIcon: {
//             width: 100,
//             height: 100,
//             borderRadius: 16,
//             paddingTop: 8,
//             paddingLeft: 8,
//         },
//         categoryEmoji: {
//             fontSize: 28,
//         },
//         categoryText: {
//             fontSize: 13,
//             color: 'black',
//             lineHeight: 16,
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold
//         },

//         // Promo Card Styles
//         promoCard: {
//             backgroundColor: '#F97316',
//             borderRadius: 16,
//             padding: 24,
//             overflow: 'hidden',
//         },
//         promoContent: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//         },
//         promoTextContainer: {
//             flex: 1,
//         },
//         promoTitle: {
//             color: 'white',
//             fontSize: 20,
//             fontWeight: 'bold',
//             marginBottom: 8,
//         },
//         promoSubtitle: {
//             color: 'white',
//             fontSize: 14,
//             opacity: 0.9,
//             marginBottom: 16,
//         },
//         shopNowButton: {
//             backgroundColor: 'white',
//             paddingHorizontal: 16,
//             paddingVertical: 8,
//             borderRadius: 20,
//             alignSelf: 'flex-start',
//         },
//         shopNowText: {
//             color: '#F97316',
//             fontSize: 14,
//             fontWeight: '600',
//         },
//         promoEmoji: {
//             fontSize: 64,
//             opacity: 0.2,
//         },

//         // Products Grid Styles
//         productsGrid: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             gap: 20
//         },
//         productCard: {
//             width: '48%',
//             backgroundColor: '#FFFFFF',
//             borderRadius: 16,
//             padding: 16,
//             marginBottom: 16,
//             shadowColor: '#000',
//             shadowOffset: {
//                 width: 0,
//                 height: 1,
//             },
//             shadowOpacity: 0.05,
//             shadowRadius: 2,
//             flexDirection: 'row',
//             justifyContent: 'space-between'
//         },
//         productCard1: {
//             width: '100%',
//             backgroundColor: isDarkMode ? dark33 : '#FFFFFF',
//             borderRadius: 16,
//             padding: 16,
//             marginBottom: 16,
//             shadowColor: '#000',
//             shadowOffset: {
//                 width: 0,
//                 height: 1,
//             },
//             shadowOpacity: 0.05,
//             shadowRadius: 2,
//             elevation: 1,
//             flexDirection: 'row',
//         },
//         productImageContainer: {
//             height: 96,
//             backgroundColor: '#F9FAFB',
//             borderRadius: 12,
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginBottom: 12,
//             position: 'relative',
//         },
//         productImage: {
//             fontSize: 32,
//         },
//         discountBadge: {
//             position: 'absolute',
//             top: 8,
//             right: 8,
//             backgroundColor: '#EF4444',
//             paddingHorizontal: 8,
//             paddingVertical: 4,
//             borderRadius: 12,
//         },
//         discountText: {
//             color: 'white',
//             fontSize: 10,
//             fontWeight: '600',
//         },
//         productName: {
//             fontSize: 14,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             color: isDarkMode ? 'white' : '#1F2937',
//             marginBottom: 4,
//         },
//         ratingContainer: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginBottom: 8,
//         },
//         ratingText: {
//             fontSize: 12,
//             color: isDarkMode ? 'white' : '#6B7280',
//             marginLeft: 4,
//         },
//         priceContainer: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//         },
//         currentPrice: {
//             fontSize: 16,
//             fontWeight: 'bold',
//             color: isDarkMode ? 'white' : '#1F2937',
//         },
//         originalPrice: {
//             fontSize: 12,
//             color: '#9CA3AF',
//             textDecorationLine: 'line-through',
//         },
//         addButton: {
//             width: 32,
//             height: 32,
//             backgroundColor: '#3B82F6',
//             borderRadius: 16,
//             justifyContent: 'center',
//             alignItems: 'center',
//         },
//         addButtonText: {
//             color: 'white',
//             fontSize: 18,
//             fontWeight: 'bold',
//         },
//     });

//     return (
//         <SafeAreaView style={styles.container}>
//             {isLoading ? (
//                 // <FavouriteScreenSkeletonLoader isDarkMode={isDarkMode} />
//                 <BlinKitLoader isDarkMode={isDarkMode} />

//             ) : (
//                 <>
//                     {renderHeader()}
//                     <ScrollView showsVerticalScrollIndicator={false}>
//                         {renderTopPicks()}
//                     </ScrollView>
//                 </>
//             )}
//         </SafeAreaView>
//     );
// }

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
    Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { App_Primary_color, dark33, darkMode25 } from '../../common/Colors/colors';
import { FONTS_FAMILY } from '../../assets/Fonts';
import Row from '../../components/wrapper/row';
import { AddButton, BackIcon, BackWhite, DownChev } from '../../assets/SVGs';
import IMG from '../../assets/Images';
import SpaceBetweenRow from '../../components/wrapper/spacebetween';
import CustomText from '../../components/TextComponent';
import { useSelector } from 'react-redux';
import useLoader from '../../utils/LoaderHook';
import { apiDelete, apiGet } from '../../utils/Apis';
import urls from '../../config/urls';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import BlinKitLoader from '../../components/Skeleton/BlinkitLoader';

export default function Favourite({ navigation }) {
    const [fav, setFav] = useState([]);
    const { showLoader, hideLoader } = useLoader();
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(false);
    const animatedValues = useRef([]).current;

    useEffect(() => {
        getAllFav();
    }, [isFocused]);

    useEffect(() => {
        if (fav.length > 0) {
            animatedValues.length = 0;
            fav.forEach((_, index) => {
                animatedValues[index] = new Animated.Value(0);
            });

            const animations = fav.map((_, index) => {
                return Animated.timing(animatedValues[index], {
                    toValue: 1,
                    duration: 500,
                    delay: index * 100,
                    useNativeDriver: true,
                });
            });

            Animated.stagger(100, animations).start();
        }
    }, [fav]);

    const deleteFromWishList = async (id) => {
        try {
            setIsLoading(true);
            const res = await apiDelete(`/api/wishlist/remove/${id}`);
            getAllFav();
            setIsLoading(false);
        } catch (error) {
            console.log('Error deleting from wishlist');
            setIsLoading(false);
        }
    };

    const getAllFav = async () => {
        try {
            setIsLoading(true);
            const res = await apiGet(urls?.getAllFav);
            setFav(res?.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const { isDarkMode } = useSelector(state => state.theme);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? '#0A0A0A' : '#F8F9FA',
        },
        headerContainer: {
            backgroundColor: isDarkMode ? '#1A1A1A' : 'white',
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? '#2A2A2A' : '#F0F0F0',
        },
        headerTitle: {
            color: isDarkMode ? 'white' : '#1A1A1A',
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 20,
        },
        countBadge: {
            backgroundColor: App_Primary_color,
            paddingHorizontal: 10,
            paddingVertical: 2,
            borderRadius: 12,
            marginLeft: 8,
        },
        countText: {
            color: 'white',
            fontSize: 12,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
        },
        sectionContainer: {
            paddingHorizontal: 16,
            paddingTop: 16,
        },
        productCard: {
            backgroundColor: isDarkMode ? '#1A1A1A' : 'white',
            borderRadius: 16,
            marginBottom: 12,
            overflow: 'hidden',
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            borderWidth: 1,
            borderColor: isDarkMode ? '#2A2A2A' : '#F0F0F0',
        },
        productContent: {
            flexDirection: 'row',
            padding: 12,
        },
        imageContainer: {
            width: 100,
            height: 100,
            borderRadius: 12,
            backgroundColor: isDarkMode ? '#2A2A2A' : '#F8F9FA',
            overflow: 'hidden',
            position: 'relative',
        },
        productImage: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        },
        stockBadge: {
            position: 'absolute',
            bottom: 6,
            left: 6,
            backgroundColor: 'rgba(0,0,0,0.7)',
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 6,
            flexDirection: 'row',
            alignItems: 'center',
        },
        stockText: {
            color: 'white',
            fontSize: 10,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            marginLeft: 3,
        },
        productInfo: {
            flex: 1,
            marginLeft: 14,
            justifyContent: 'space-between',
        },
        productName: {
            fontSize: 15,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: isDarkMode ? 'white' : '#1A1A1A',
            marginBottom: 4,
        },
        priceRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 4,
        },
        currentPrice: {
            fontSize: 18,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: App_Primary_color,
        },
        originalPrice: {
            fontSize: 13,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: '#999',
            textDecorationLine: 'line-through',
            marginLeft: 8,
        },
        discountBadge: {
            backgroundColor: '#10B981',
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 4,
            marginLeft: 8,
        },
        discountText: {
            color: 'white',
            fontSize: 10,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
        },
        actionsRow: {
            flexDirection: 'row',
            borderTopWidth: 1,
            borderTopColor: isDarkMode ? '#2A2A2A' : '#F0F0F0',
        },
        actionButton: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            gap: 6,
        },
        actionDivider: {
            width: 1,
            backgroundColor: isDarkMode ? '#2A2A2A' : '#F0F0F0',
        },
        actionText: {
            fontSize: 13,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? '#AAA' : '#666',
        },
        deleteText: {
            color: '#EF4444',
        },
        viewText: {
            color: App_Primary_color,
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 100,
        },
        emptyIcon: {
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: isDarkMode ? '#2A2A2A' : '#F0F0F0',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
        },
        emptyTitle: {
            fontSize: 20,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: isDarkMode ? 'white' : '#1A1A1A',
            marginBottom: 8,
        },
        emptySubtitle: {
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: isDarkMode ? '#888' : '#666',
            textAlign: 'center',
            paddingHorizontal: 40,
        },
    });

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={isDarkMode ? '#1A1A1A' : 'white'}
            />
            <Row style={{ gap: 12, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                        name="chevron-back"
                        size={26}
                        color={isDarkMode ? 'white' : 'black'}
                    />
                </TouchableOpacity>
                <Row style={{ alignItems: 'center' }}>
                    <CustomText style={styles.headerTitle}>My Favourites</CustomText>
                    {fav?.length > 0 && (
                        <View style={styles.countBadge}>
                            <Text style={styles.countText}>{fav?.length}</Text>
                        </View>
                    )}
                </Row>
            </Row>
        </View>
    );

    const renderProductCard = (item, index) => {
        const animatedValue = animatedValues[index] || new Animated.Value(1);
        const opacity = animatedValue;
        const translateY = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
        });

        const discount = item?.productId?.discountPrice
            ? Math.round(
                  ((item?.productId?.discountPrice - item?.productId?.price) /
                      item?.productId?.discountPrice) *
                      100
              )
            : 0;

        return (
            <Animated.View
                key={index}
                style={{
                    opacity,
                    transform: [{ translateY }],
                }}
            >
                <View style={styles.productCard}>
                    <View style={styles.productContent}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={
                                    item?.productId?.images
                                        ? { uri: item?.productId?.images[0] }
                                        : IMG.Potato
                                }
                                style={styles.productImage}
                            />
                            <View style={styles.stockBadge}>
                                <MaterialCommunityIcons
                                    name="package-variant"
                                    size={10}
                                    color="#10B981"
                                />
                                <Text style={styles.stockText}>
                                    {item?.productId?.stock || 0}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.productInfo}>
                            <View>
                                <Text
                                    style={styles.productName}
                                    numberOfLines={2}
                                >
                                    {item?.productId?.name}
                                </Text>

                                <View style={styles.priceRow}>
                                    <Text style={styles.currentPrice}>
                                        ₹{item?.productId?.price}
                                    </Text>
                                    {item?.productId?.discountPrice && (
                                        <>
                                            <Text style={styles.originalPrice}>
                                                ₹{item?.productId?.discountPrice}
                                            </Text>
                                            {discount > 0 && (
                                                <View style={styles.discountBadge}>
                                                    <Text style={styles.discountText}>
                                                        {discount}% OFF
                                                    </Text>
                                                </View>
                                            )}
                                        </>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.actionsRow}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => deleteFromWishList(item?.productId?._id)}
                        >
                            <AntDesign name="delete" size={18} color="#EF4444" />
                            <Text style={[styles.actionText, styles.deleteText]}>
                                Remove
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.actionDivider} />

                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() =>
                                navigation.navigate('ProductDetail', {
                                    productId: item?.productId?._id,
                                })
                            }
                        >
                            <Ionicons
                                name="eye-outline"
                                size={18}
                                color={App_Primary_color}
                            />
                            <Text style={[styles.actionText, styles.viewText]}>
                                View Details
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        );
    };

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
                <Ionicons
                    name="heart-outline"
                    size={50}
                    color={isDarkMode ? '#444' : '#CCC'}
                />
            </View>
            <Text style={styles.emptyTitle}>No Favourites Yet</Text>
            <Text style={styles.emptySubtitle}>
                Start adding products to your favourites and they'll appear here
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <BlinKitLoader isDarkMode={isDarkMode} />
            ) : (
                <>
                    {renderHeader()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={
                            fav?.length === 0
                                ? { flex: 1 }
                                : styles.sectionContainer
                        }
                    >
                        {fav?.length > 0
                            ? fav.map((item, index) => renderProductCard(item, index))
                            : renderEmptyState()}
                    </ScrollView>
                </>
            )}
        </SafeAreaView>
    );
}
