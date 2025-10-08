

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
//     Modal,
//     Dimensions,
//     Animated,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { App_Primary_color, dark33, dark55, darkMode25, white } from '../../common/Colors/colors';
// import { FONTS_FAMILY } from '../../assets/Fonts';
// import Row from '../../components/wrapper/row';
// import { AddButton, BackWhite, DownChev, Filter, SearchWIthBg } from '../../assets/SVGs';
// import IMG from '../../assets/Images';
// import SpaceBetweenRow from '../../components/wrapper/spacebetween';
// import CustomText from '../../components/TextComponent';
// import { SearchBar } from 'react-native-screens';
// import { useSelector } from 'react-redux';
// import useLoader from '../../utils/LoaderHook';
// import { apiGet } from '../../utils/Apis';
// import urls from '../../config/urls';

// const { width, height } = Dimensions.get('window');

// export default function CategoryProducts({ navigation, route }) {
//     const [isFilterVisible, setIsFilterVisible] = useState(false);
//     const [priceRange, setPriceRange] = useState({ min: 200, max: 3748 });
//     const [selectedRating, setSelectedRating] = useState(null);
//     const [isVeganFriendly, setIsVeganFriendly] = useState(true);

//     const { showLoader, hideLoader } = useLoader()

//     const [allProducts, setAllProducts] = useState([])

//     useEffect(() => {
//         getProducts()
//     }, [])

//     const getProducts = async () => {
//         try {
//             showLoader()
//             const res = await apiGet(`${urls.getAllProducts}?categoryId=${route?.params?.categoryId}&subCategoryId=${route?.params?.subcategoryId}`)
//             setAllProducts(res?.data)
//             hideLoader()
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//             hideLoader()
//         }
//     };



//     // Filter Modal Component
//     const renderFilterModal = () => (
//         <Modal
//             visible={isFilterVisible}
//             transparent={true}
//             animationType="slide"
//             onRequestClose={() => setIsFilterVisible(false)}
//         >
//             <View style={styles.modalOverlay}>
//                 <TouchableOpacity
//                     style={styles.modalBackground}
//                     activeOpacity={1}
//                     onPress={() => setIsFilterVisible(false)}
//                 />
//                 <View style={styles.filterModal}>
//                     {/* Modal Header */}
//                     <View style={styles.modalHeader}>
//                         <TouchableOpacity onPress={() => setIsFilterVisible(false)}>
//                             <Ionicons name="chevron-back" size={24} color="#333" />
//                         </TouchableOpacity>
//                         <Text style={styles.modalTitle}>Sort & Filter</Text>
//                         <View style={{ width: 24 }} />
//                     </View>

//                     <ScrollView showsVerticalScrollIndicator={false}>
//                         {/* Price Range Section */}
//                         <View style={styles.filterSection}>
//                             <Text style={styles.filterSectionTitle}>Price Range</Text>
//                             <View style={styles.priceRangeContainer}>
//                                 <Text style={styles.priceLabel}>${priceRange.min}</Text>
//                                 <View style={styles.sliderContainer}>
//                                     <View style={styles.sliderTrack} />
//                                     <View style={styles.sliderRange} />
//                                     <View style={[styles.sliderThumb, { left: '10%' }]} />
//                                     <View style={[styles.sliderThumb, { left: '85%' }]} />
//                                 </View>
//                                 <Text style={styles.priceLabel}>${priceRange.max}</Text>
//                             </View>
//                         </View>

//                         {/* Ratings Section */}
//                         <View style={styles.filterSection}>
//                             <Text style={styles.filterSectionTitle}>Ratings</Text>
//                             <View style={styles.ratingsContainer}>
//                                 {[5, 4, 3].map((rating) => (
//                                     <TouchableOpacity
//                                         key={rating}
//                                         style={[
//                                             styles.ratingOption,
//                                             selectedRating === rating && styles.ratingOptionSelected
//                                         ]}
//                                         onPress={() => setSelectedRating(selectedRating === rating ? null : rating)}
//                                     >
//                                         <Text style={[
//                                             styles.ratingText,
//                                             selectedRating === rating && styles.ratingTextSelected
//                                         ]}>
//                                             {rating} Stars
//                                         </Text>
//                                     </TouchableOpacity>
//                                 ))}
//                             </View>
//                         </View>

//                         {/* Vegan Friendly Section */}
//                         <View style={styles.filterSection}>
//                             <Text style={styles.filterSectionTitle}>Vegan Friendly</Text>
//                             <View style={styles.veganContainer}>
//                                 <TouchableOpacity
//                                     style={[
//                                         styles.veganOption,
//                                         isVeganFriendly && styles.veganOptionSelected
//                                     ]}
//                                     onPress={() => setIsVeganFriendly(true)}
//                                 >
//                                     <View style={[
//                                         styles.checkbox,
//                                         isVeganFriendly && styles.checkboxSelected
//                                     ]}>
//                                         {isVeganFriendly && (
//                                             <Ionicons name="checkmark" size={14} color="white" />
//                                         )}
//                                     </View>
//                                     <Text style={styles.veganText}>Yes</Text>
//                                 </TouchableOpacity>

//                                 <TouchableOpacity
//                                     style={[
//                                         styles.veganOption,
//                                         !isVeganFriendly && styles.veganOptionSelected
//                                     ]}
//                                     onPress={() => setIsVeganFriendly(false)}
//                                 >
//                                     <View style={[
//                                         styles.checkbox,
//                                         !isVeganFriendly && styles.checkboxSelected
//                                     ]}>
//                                         {!isVeganFriendly && (
//                                             <Ionicons name="checkmark" size={14} color="white" />
//                                         )}
//                                     </View>
//                                     <Text style={styles.veganText}>No</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </ScrollView>

//                     {/* Apply Filter Button */}
//                     <View style={styles.modalFooter}>
//                         <TouchableOpacity
//                             style={styles.applyButton}
//                             onPress={() => {
//                                 // Handle filter application logic here
//                                 setIsFilterVisible(false);
//                             }}
//                         >
//                             <Text style={styles.applyButtonText}>Apply Filter</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//         </Modal>
//     );

//     // Header Component
//     const renderHeader = () => (
//         <View style={styles.headerContainer}>
//             <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />

//             <View style={styles.topBar}>
//                 <View style={styles.leftHeader}>
//                     <Row style={{ gap: 15 }}>
//                         <TouchableOpacity onPress={() => navigation.goBack()}>
//                             <BackWhite />
//                         </TouchableOpacity>
//                         <CustomText
//                             style={{
//                                 color: 'white',
//                                 fontSize: 18,
//                                 fontFamily: FONTS_FAMILY.Poppins_SemiBold
//                             }}
//                         >
//                             Biscuits & Drinks
//                         </CustomText>
//                     </Row>
//                 </View>

//                 <View style={styles.rightHeader}>
//                     <TouchableOpacity style={styles.iconButton}>
//                         <SearchWIthBg />
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={styles.iconButton}
//                         onPress={() => setIsFilterVisible(true)}
//                     >
//                         <Filter />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     );

//     // Categories Component
//     const renderCategories = () => {
//         const categories = [
//             { name: 'Groceries', icon: IMG.Meat, },
//             { name: 'Home & Lifestyle', icon: IMG.fruit, },
//             { name: 'Electronics', icon: IMG.dairy, },
//             { name: 'Snacks', icon: IMG.snacks, }
//         ];

//         return (
//             <View style={{
//                 ...styles.sectionContainer,
//             }}>
//                 <ScrollView contentContainerStyle={styles.categoriesGrid}
//                     horizontal
//                 >
//                     {categories.map((category, index) => (
//                         <TouchableOpacity key={index} style={styles.categoryItem}>
//                             <View style={[styles.categoryIcon]}>
//                                 <Text style={styles.categoryText}>{category.name}</Text>
//                             </View>
//                         </TouchableOpacity>
//                     ))}
//                 </ScrollView>
//             </View>
//         );
//     };

//     // Today's Choice Component
//     const renderTodaysChoice = () => {
//         const todaysChoices = [
//             {
//                 name: "Biscuits & Drinks",
//                 image: IMG.sprite,
//                 quantity: '100ml',
//                 price: "$1.50",
//                 originalPrice: "$3.99",
//             },
//             {
//                 name: "Fruits & Vegetable",
//                 image: IMG.eggPasta,
//                 quantity: '40 gr',
//                 price: "$1.50",
//                 originalPrice: "$3.99",
//             },
//             {
//                 name: "Cooking Essential",
//                 image: IMG.sprite,
//                 quantity: '100ml',
//                 price: "$1.50",
//                 originalPrice: "$3.99",
//             },
//             {
//                 name: "Dairy & Bakery",
//                 image: IMG.eggPasta,
//                 quantity: '40 gr',
//                 price: "$1.50",
//                 originalPrice: "$3.99",
//             },
//         ];

//         return (
//             <View style={styles.sectionContainer}>
//                 <View style={styles.productsGrid}>
//                     {allProducts?.map((item, index) => (
//                         <View key={index} style={styles.productCard}>
//                             <View style={{ width: 115 }}>
//                                 <Image source={{ uri: item?.images[0] }} style={{
//                                     height: 87, width: 100
//                                 }} />
//                                 <Text style={styles.productName}>{item.name}</Text>
//                             </View>
//                             <TouchableOpacity style={{
//                                 position: 'absolute',
//                                 bottom: 0,
//                                 right: 0
//                             }}
//                             onPress={() => navigation.navigate('ProductDetail', { productId: item?._id })}
//                             >
//                                 <AddButton />
//                             </TouchableOpacity>
//                         </View>
//                     ))}
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
//             zIndex: 10000000
//         },
//         topBar: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//         },
//         leftHeader: {

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
//             fontFamily: FONTS_FAMILY.Poppins_Bold,
//             fontSize: 30,
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
//         categoryItem: {

//         },
//         categoryIcon: {
//             paddingHorizontal: 9,
//             borderRadius: 16,
//             paddingVertical: 10,
//             borderRadius: 100,
//             borderWidth: 1,
//             borderColor: '#B2BBCE'
//         },
//         categoryEmoji: {
//             fontSize: 28,
//         },
//         categoryText: {
//             fontSize: 13,
//             color: '#B2BBCE',
//             lineHeight: 16,
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold
//         },

//         // Products Grid Styles
//         productsGrid: {
//             flexDirection: 'row',
//             flexWrap: 'wrap',
//             gap: 10,
//         },
//         productCard: {
//             backgroundColor: isDarkMode ? dark33 : '#F2F2F3',
//             maxWidth: '50%',
//             borderRadius: 16,
//             padding: 20,
//             paddingHorizontal: 20,
//             marginBottom: 16,
//             shadowColor: '#000',
//             shadowOffset: {
//                 width: 0,
//                 height: 1,
//             },
//             shadowOpacity: 0.05,
//             shadowRadius: 2,
//             elevation: 1,
//             alignItems: 'center',
//             justifyContent: 'center',
//         },
//         productName: {
//             fontSize: 14,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             color: isDarkMode ? white : '#1F2937',
//             alignSelf: 'center'
//         },

//         // Filter Modal Styles
//         modalOverlay: {
//             flex: 1,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             justifyContent: 'flex-end',
//         },
//         modalBackground: {
//             flex: 1,
//         },
//         filterModal: {
//             backgroundColor: isDarkMode ? dark55 : 'white',
//             borderTopLeftRadius: 20,
//             borderTopRightRadius: 20,
//             paddingTop: 20,
//             height: height * 0.75,
//         },
//         modalHeader: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             paddingHorizontal: 20,
//             paddingBottom: 20,
//             borderBottomWidth: 1,
//             borderBottomColor: '#E5E5E5',
//         },
//         modalTitle: {
//             fontSize: 18,
//             fontWeight: '600',
//             color: isDarkMode ? white : '#333',
//         },
//         filterSection: {
//             paddingHorizontal: 20,
//             paddingVertical: 20,
//         },
//         filterSectionTitle: {
//             fontSize: 16,
//             fontWeight: '600',
//             color: isDarkMode ? white : '#333',
//             marginBottom: 16,
//         },

//         // Price Range Styles
//         priceRangeContainer: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             gap: 15,
//         },
//         priceLabel: {
//             fontSize: 14,
//             color: isDarkMode ? white : '#666',
//             fontWeight: '500',
//         },
//         sliderContainer: {
//             flex: 1,
//             height: 20,
//             justifyContent: 'center',
//             position: 'relative',
//         },
//         sliderTrack: {
//             height: 4,
//             backgroundColor: '#E5E5E5',
//             borderRadius: 2,
//         },
//         sliderRange: {
//             position: 'absolute',
//             height: 4,
//             backgroundColor: App_Primary_color,
//             borderRadius: 2,
//             left: '10%',
//             right: '15%',
//         },
//         sliderThumb: {
//             position: 'absolute',
//             width: 20,
//             height: 20,
//             backgroundColor: App_Primary_color,
//             borderRadius: 10,
//             top: -8,
//         },

//         // Ratings Styles
//         ratingsContainer: {
//             flexDirection: 'row',
//             gap: 12,
//         },
//         ratingOption: {
//             paddingHorizontal: 16,
//             paddingVertical: 8,
//             borderRadius: 20,
//             // borderWidth: 1,
//             borderColor: '#E5E5E5',
//             backgroundColor: '#E5E5E5',
//         },
//         ratingOptionSelected: {
//             backgroundColor: App_Primary_color,
//             borderColor: App_Primary_color,
//         },
//         ratingText: {
//             fontSize: 14,
//             color: 'black',
//             fontWeight: '500',
//         },
//         ratingTextSelected: {
//             color: 'white',
//         },

//         // Vegan Friendly Styles
//         veganContainer: {
//             gap: 12,
//         },
//         veganOption: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             gap: 12,
//             paddingVertical: 4,
//         },
//         checkbox: {
//             width: 20,
//             height: 20,
//             borderRadius: 4,
//             borderWidth: 2,
//             borderColor: '#E5E5E5',
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: 'white',
//         },
//         checkboxSelected: {
//             backgroundColor: '#22C55E',
//             borderColor: '#22C55E',
//         },
//         veganText: {
//             fontSize: 16,
//             color: isDarkMode ? 'white' : '#333',
//             fontWeight: '500',
//         },

//         // Modal Footer Styles
//         modalFooter: {
//             paddingHorizontal: 20,
//             paddingVertical: 20,
//             // borderTopWidth: 1,
//             borderTopColor: '#E5E5E5',
//         },
//         applyButton: {
//             backgroundColor: App_Primary_color,
//             borderRadius: 25,
//             paddingVertical: 16,
//             alignItems: 'center',
//         },
//         applyButtonText: {
//             color: 'white',
//             fontSize: 16,
//             fontWeight: '600',
//         },
//     });
//     return (
//         <SafeAreaView style={styles.container}>
//             {renderHeader()}
//             <ScrollView showsVerticalScrollIndicator={false}>
//                 {renderCategories()}
//                 {renderTodaysChoice()}
//             </ScrollView>
//             {renderFilterModal()}
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
    Modal,
    Dimensions,
    Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { App_Primary_color, dark33, dark55, darkMode25, white } from '../../common/Colors/colors';
import { FONTS_FAMILY } from '../../assets/Fonts';
import Row from '../../components/wrapper/row';
import { AddButton, BackWhite, DownChev, Filter, SearchWIthBg } from '../../assets/SVGs';
import IMG from '../../assets/Images';
import SpaceBetweenRow from '../../components/wrapper/spacebetween';
import CustomText from '../../components/TextComponent';
import { SearchBar } from 'react-native-screens';
import { useSelector } from 'react-redux';
import useLoader from '../../utils/LoaderHook';
import { apiGet } from '../../utils/Apis';
import urls from '../../config/urls';
import CategoryScreenSkeletonLoader from '../../components/Skeleton/CategorySkeletonLoader';

const { width, height } = Dimensions.get('window');



export default function CategoryProducts({ navigation, route }) {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: 200, max: 3748 });
    const [selectedRating, setSelectedRating] = useState(null);
    const [isVeganFriendly, setIsVeganFriendly] = useState(true);

    const { showLoader, hideLoader } = useLoader()
    const [allProducts, setAllProducts] = useState([])
    const { isDarkMode } = useSelector(state => state.theme)
        const [isLoading, setIsLoading] = useState(true)
    

    // Animation values
    const headerAnim = useRef(new Animated.Value(0)).current;
    const categoriesAnim = useRef(new Animated.Value(0)).current;
    const productsAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        try {
           setIsLoading(true)
            const res = await apiGet(`${urls.getAllProducts}?categoryId=${route?.params?.categoryId}&subCategoryId=${route?.params?.subcategoryId}`)
            setAllProducts(res?.data)
            // hideLoader()
           setIsLoading(false)


            // Start animations after data loads
            startMountAnimations();
        } catch (error) {
            console.error('Error fetching categories:', error);
            // hideLoader()
           setIsLoading(false)

        }
    };

    const startMountAnimations = () => {
        // Reset animation values
        headerAnim.setValue(0);
        categoriesAnim.setValue(0);
        productsAnim.setValue(0);
        fadeAnim.setValue(0);

        // Staggered animation sequence
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.parallel([
                Animated.spring(headerAnim, {
                    toValue: 1,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true,
                }),
                Animated.timing(categoriesAnim, {
                    toValue: 1,
                    duration: 400,
                    delay: 100,
                    useNativeDriver: true,
                }),
            ]),
            Animated.spring(productsAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                delay: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    // Filter Modal Component
    const renderFilterModal = () => (
        <Modal
            visible={isFilterVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setIsFilterVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <TouchableOpacity
                    style={styles.modalBackground}
                    activeOpacity={1}
                    onPress={() => setIsFilterVisible(false)}
                />
                <View style={[styles.filterModal, { backgroundColor: isDarkMode ? dark55 : 'white' }]}>
                    {/* Modal Header */}
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setIsFilterVisible(false)}>
                            <Ionicons name="chevron-back" size={24} color={isDarkMode ? white : "#333"} />
                        </TouchableOpacity>
                        <Text style={[styles.modalTitle, { color: isDarkMode ? white : '#333' }]}>Sort & Filter</Text>
                        <View style={{ width: 24 }} />
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Price Range Section */}
                        <View style={styles.filterSection}>
                            <Text style={[styles.filterSectionTitle, { color: isDarkMode ? white : '#333' }]}>Price Range</Text>
                            <View style={styles.priceRangeContainer}>
                                <Text style={[styles.priceLabel, { color: isDarkMode ? white : '#666' }]}>${priceRange.min}</Text>
                                <View style={styles.sliderContainer}>
                                    <View style={styles.sliderTrack} />
                                    <View style={styles.sliderRange} />
                                    <View style={[styles.sliderThumb, { left: '10%' }]} />
                                    <View style={[styles.sliderThumb, { left: '85%' }]} />
                                </View>
                                <Text style={[styles.priceLabel, { color: isDarkMode ? white : '#666' }]}>${priceRange.max}</Text>
                            </View>
                        </View>

                        {/* Ratings Section */}
                        <View style={styles.filterSection}>
                            <Text style={[styles.filterSectionTitle, { color: isDarkMode ? white : '#333' }]}>Ratings</Text>
                            <View style={styles.ratingsContainer}>
                                {[5, 4, 3].map((rating) => (
                                    <TouchableOpacity
                                        key={rating}
                                        style={[
                                            styles.ratingOption,
                                            selectedRating === rating && styles.ratingOptionSelected
                                        ]}
                                        onPress={() => setSelectedRating(selectedRating === rating ? null : rating)}
                                    >
                                        <Text style={[
                                            styles.ratingText,
                                            selectedRating === rating && styles.ratingTextSelected
                                        ]}>
                                            {rating} Stars
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Vegan Friendly Section */}
                        <View style={styles.filterSection}>
                            <Text style={[styles.filterSectionTitle, { color: isDarkMode ? white : '#333' }]}>Vegan Friendly</Text>
                            <View style={styles.veganContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.veganOption,
                                        isVeganFriendly && styles.veganOptionSelected
                                    ]}
                                    onPress={() => setIsVeganFriendly(true)}
                                >
                                    <View style={[
                                        styles.checkbox,
                                        isVeganFriendly && styles.checkboxSelected
                                    ]}>
                                        {isVeganFriendly && (
                                            <Ionicons name="checkmark" size={14} color="white" />
                                        )}
                                    </View>
                                    <Text style={[styles.veganText, { color: isDarkMode ? 'white' : '#333' }]}>Yes</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.veganOption,
                                        !isVeganFriendly && styles.veganOptionSelected
                                    ]}
                                    onPress={() => setIsVeganFriendly(false)}
                                >
                                    <View style={[
                                        styles.checkbox,
                                        !isVeganFriendly && styles.checkboxSelected
                                    ]}>
                                        {!isVeganFriendly && (
                                            <Ionicons name="checkmark" size={14} color="white" />
                                        )}
                                    </View>
                                    <Text style={[styles.veganText, { color: isDarkMode ? 'white' : '#333' }]}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>

                    {/* Apply Filter Button */}
                    <View style={styles.modalFooter}>
                        <TouchableOpacity
                            style={styles.applyButton}
                            onPress={() => {
                                setIsFilterVisible(false);
                            }}
                        >
                            <Text style={styles.applyButtonText}>Apply Filter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );


    // Animated Category Item Component
    const AnimatedCategoryItem = ({ category, index }) => {
        const itemAnim = useRef(new Animated.Value(0)).current;

        useEffect(() => {
            Animated.spring(itemAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                delay: index * 60,
                useNativeDriver: true,
            }).start();
        }, []);

        const scale = itemAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
        });

        return (
            <Animated.View
                style={{
                    opacity: itemAnim,
                    transform: [{ scale }],
                }}
            >
                <TouchableOpacity style={styles.categoryItem}>
                    <View style={[styles.categoryIcon]}>
                        <Text style={styles.categoryText}>{category.name}</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    // Animated Product Card Component
    const AnimatedProductCard = ({ item, index, navigation, isDarkMode }) => {
        const itemAnim = useRef(new Animated.Value(0)).current;

        useEffect(() => {
            Animated.spring(itemAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                delay: index * 100,
                useNativeDriver: true,
            }).start();
        }, []);

        const scale = itemAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1],
        });

        return (
            <Animated.View
                style={{
                    opacity: itemAnim,
                    transform: [{ scale }],
                    width: (width - 42) / 2,
                }}
            >
                <View style={[styles.productCard, { backgroundColor: isDarkMode ? dark33 : '#F2F2F3' }]}>
                    <Image
                        source={{ uri: item?.images[0] }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                    <View style={styles.productInfo}>
                        <Text style={[styles.productName, { color: isDarkMode ? white : '#1F2937' }]} numberOfLines={2}>
                            {item.name}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('ProductDetail', { productId: item?._id })}
                    >
                        <AddButton />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    };

    // Header Component
    const renderHeader = () => {
        const headerTranslateY = headerAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, 0],
        });

        return (
            <Animated.View
                style={[
                    styles.headerContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: headerTranslateY }],
                    }
                ]}
            >
                <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />

                <View style={styles.topBar}>
                    <View style={styles.leftHeader}>
                        <Row style={{ gap: 15 }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <BackWhite />
                            </TouchableOpacity>
                            <CustomText
                                style={{
                                    color: 'white',
                                    fontSize: 18,
                                    fontFamily: FONTS_FAMILY.Poppins_SemiBold
                                }}
                            >
                                {route?.params?.subcategoryName || 'Products'}
                            </CustomText>
                        </Row>
                    </View>

                    <View style={styles.rightHeader}>
                        <TouchableOpacity style={styles.iconButton}>
                            <SearchWIthBg />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => setIsFilterVisible(true)}
                        >
                            <Filter />
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        );
    };

    // Categories Component
    const renderCategories = () => {
        const categories = [
            { name: 'Groceries', icon: IMG.Meat, },
            { name: 'Home & Lifestyle', icon: IMG.fruit, },
            { name: 'Electronics', icon: IMG.dairy, },
            { name: 'Snacks', icon: IMG.snacks, }
        ];

        const categoriesTranslateX = categoriesAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-100, 0],
        });

        return (
            <Animated.View
                style={[
                    styles.sectionContainer,
                    {
                        opacity: categoriesAnim,
                        transform: [{ translateX: categoriesTranslateX }],
                    }
                ]}
            >
                <ScrollView
                    contentContainerStyle={styles.categoriesGrid}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {categories.map((category, index) => (
                        <AnimatedCategoryItem
                            key={index}
                            category={category}
                            index={index}
                        />
                    ))}
                </ScrollView>
            </Animated.View>
        );
    };

    // Products Grid Component
    const renderProductsGrid = () => {
        const productsTranslateY = productsAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0],
        });

        return (
            <Animated.View
                style={[
                    styles.sectionContainer,
                    {
                        opacity: productsAnim,
                        transform: [{ translateY: productsTranslateY }],
                    }
                ]}
            >
                <View style={styles.productsGrid}>
                    {allProducts?.map((item, index) => (
                        <AnimatedProductCard
                            key={item._id}
                            item={item}
                            index={index}
                            navigation={navigation}
                            isDarkMode={isDarkMode}
                        />
                    ))}
                </View>
            </Animated.View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? darkMode25 : '#F9FAFB',
        },

        // Header Styles
        headerContainer: {
            backgroundColor: App_Primary_color,
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 24,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            zIndex: 10000000
        },
        topBar: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        leftHeader: {},
        rightHeader: {
            flexDirection: 'row',
        },
        iconButton: {
            marginLeft: 16,
            backgroundColor: '#6C87CF',
            padding: 5,
            borderRadius: 100
        },

        // Section Styles
        sectionContainer: {
            paddingHorizontal: 16,
            paddingVertical: 15,
            zIndex: -100000,
        },

        // Categories Styles
        categoriesGrid: {
            flexDirection: 'row',
            gap: 10,
            paddingRight: 16,
        },
        categoryItem: {},
        categoryIcon: {
            paddingHorizontal: 9,
            paddingVertical: 10,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: '#B2BBCE'
        },
        categoryText: {
            fontSize: 13,
            color: '#B2BBCE',
            lineHeight: 16,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold
        },

        // Products Grid Styles
        productsGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 10,
        },
        productCard: {
            borderRadius: 16,
            padding: 12,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.08,
            shadowRadius: 3,
            elevation: 2,
            position: 'relative',
            minHeight: 180,
        },
        productImage: {
            width: '100%',
            height: 100,
            borderRadius: 12,
            marginBottom: 8,
        },
        productInfo: {
            flex: 1,
            marginBottom: 8,
        },
        productName: {
            fontSize: 13,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            lineHeight: 18,
        },
        addButton: {
            position: 'absolute',
            bottom: 12,
            right: 12,
        },

        // Filter Modal Styles
        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-end',
        },
        modalBackground: {
            flex: 1,
        },
        filterModal: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 20,
            height: height * 0.75,
        },
        modalHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#E5E5E5',
        },
        modalTitle: {
            fontSize: 18,
            fontWeight: '600',
        },
        filterSection: {
            paddingHorizontal: 20,
            paddingVertical: 20,
        },
        filterSectionTitle: {
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 16,
        },

        // Price Range Styles
        priceRangeContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
        },
        priceLabel: {
            fontSize: 14,
            fontWeight: '500',
        },
        sliderContainer: {
            flex: 1,
            height: 20,
            justifyContent: 'center',
            position: 'relative',
        },
        sliderTrack: {
            height: 4,
            backgroundColor: '#E5E5E5',
            borderRadius: 2,
        },
        sliderRange: {
            position: 'absolute',
            height: 4,
            backgroundColor: App_Primary_color,
            borderRadius: 2,
            left: '10%',
            right: '15%',
        },
        sliderThumb: {
            position: 'absolute',
            width: 20,
            height: 20,
            backgroundColor: App_Primary_color,
            borderRadius: 10,
            top: -8,
        },

        // Ratings Styles
        ratingsContainer: {
            flexDirection: 'row',
            gap: 12,
        },
        ratingOption: {
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            borderColor: '#E5E5E5',
            backgroundColor: '#E5E5E5',
        },
        ratingOptionSelected: {
            backgroundColor: App_Primary_color,
            borderColor: App_Primary_color,
        },
        ratingText: {
            fontSize: 14,
            color: 'black',
            fontWeight: '500',
        },
        ratingTextSelected: {
            color: 'white',
        },

        // Vegan Friendly Styles
        veganContainer: {
            gap: 12,
        },
        veganOption: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            paddingVertical: 4,
        },
        checkbox: {
            width: 20,
            height: 20,
            borderRadius: 4,
            borderWidth: 2,
            borderColor: '#E5E5E5',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
        },
        checkboxSelected: {
            backgroundColor: '#22C55E',
            borderColor: '#22C55E',
        },
        veganText: {
            fontSize: 16,
            fontWeight: '500',
        },

        // Modal Footer Styles
        modalFooter: {
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderTopColor: '#E5E5E5',
        },
        applyButton: {
            backgroundColor: App_Primary_color,
            borderRadius: 25,
            paddingVertical: 16,
            alignItems: 'center',
        },
        applyButtonText: {
            color: 'white',
            fontSize: 16,
            fontWeight: '600',
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            {
                isLoading ? (
                    <CategoryScreenSkeletonLoader isDarkMode={isDarkMode} />
                ) :
                    <>
                        {renderHeader()}
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {renderCategories()}
                            {renderProductsGrid()}
                        </ScrollView>
                        {renderFilterModal()}
                    </>
            }
        </SafeAreaView>
    );
}