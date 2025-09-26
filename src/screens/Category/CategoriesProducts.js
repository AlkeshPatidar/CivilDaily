// import React from 'react';
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
// import { App_Primary_color } from '../../common/Colors/colors';
// import { FONTS_FAMILY } from '../../assets/Fonts';
// import Row from '../../components/wrapper/row';
// import { AddButton, BackWhite, DownChev, Filter, SearchWIthBg } from '../../assets/SVGs';
// import IMG from '../../assets/Images';
// import SpaceBetweenRow from '../../components/wrapper/spacebetween';
// import CustomText from '../../components/TextComponent';
// import { SearchBar } from 'react-native-screens';

// export default function CategoryProducts({ navigation }) {
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
//                         {/* <Ionicons name="cart-outline" size={20} color="white" /> */}
//                         <SearchWIthBg />
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.iconButton}>
//                         {/* <Ionicons name="notifications-outline" size={20} color="white" /> */}
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
//                 // marginTop: 70
//             }}>

//                 <ScrollView contentContainerStyle={styles.categoriesGrid}
//                     horizontal
//                 >
//                     {categories.map((category, index) => (

//                         <TouchableOpacity key={index} style={styles.categoryItem}>
//                             <View style={[styles.categoryIcon]}>
//                                 <Text style={styles.categoryText}>{category.name}</Text>
//                                 {/* <Text style={styles.categoryEmoji}>{category.icon}</Text> */}

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
//                     {todaysChoices.map((item, index) => (
//                         <View key={index} style={styles.productCard}>
//                             <View style={{ width: 115 }}>

//                                 <Image source={item?.image} style={{
//                                     height: 87, width: 100
//                                 }} />
//                                 <Text style={styles.productName}>{item.name}</Text>
//                             </View>
//                             <TouchableOpacity style={{
//                                 position: 'absolute',
//                                 bottom: 0,
//                                 right: 0
//                             }}>
//                                 <AddButton />

//                             </TouchableOpacity>
//                         </View>
//                     ))}
//                 </View>
//             </View>
//         );
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             {renderHeader()}
//             <ScrollView showsVerticalScrollIndicator={false}>
//                 {renderCategories()}
//                 {renderTodaysChoice()}
//             </ScrollView>
//         </SafeAreaView>
//     );
// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F9FAFB',
//     },

//     // Header Styles
//     headerContainer: {
//         backgroundColor: App_Primary_color,
//         paddingHorizontal: 16,
//         paddingTop: 16,
//         paddingBottom: 24,
//         borderBottomLeftRadius: 0,
//         borderBottomRightRadius: 0,
//         // height: 200,
//         zIndex: 10000000
//     },
//     topBar: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         // marginBottom: 16,
//     },
//     leftHeader: {
//         // flexDirection: 'row',
//         // alignItems: 'center',
//     },
//     avatarContainer: {
//         width: 32,
//         height: 32,
//         backgroundColor: 'white',
//         borderRadius: 16,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginRight: 8,
//     },
//     avatarText: {
//         color: 'white',
//         fontFamily: FONTS_FAMILY.Poppins_Bold,
//         fontSize: 30,
//     },
//     timeText: {
//         color: 'white',
//         fontSize: 14,
//         opacity: 0.9,
//     },
//     rightHeader: {
//         flexDirection: 'row',
//     },
//     iconButton: {
//         marginLeft: 16,
//         backgroundColor: '#6C87CF',
//         padding: 5,
//         borderRadius: 100
//     },
//     titleContainer: {
//         marginBottom: 16,
//     },
//     mainTitle: {
//         color: 'white',
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 4,
//     },
//     subtitle: {
//         color: 'white',
//         fontSize: 14,
//         opacity: 0.9,
//     },
//     searchContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#3658B0',
//         borderRadius: 100,
//         paddingHorizontal: 16,
//         height: 40,
//     },
//     searchIcon: {
//         marginRight: 12,
//     },
//     searchInput: {
//         flex: 1,
//         fontSize: 13,
//         color: 'white',
//         fontFamily: FONTS_FAMILY.Poppins_Regular
//     },

//     // Section Styles
//     sectionContainer: {
//         paddingHorizontal: 16,
//         paddingVertical: 15,
//         // marginBottom: 8,
//         zIndex: -100000,
//     },
//     sectionTitle: {
//         fontSize: 16,
//         fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//         color: '#1F2937',
//         marginBottom: 16,
//     },
//     sectionHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         // marginBottom: 16,
//     },
//     seeAllText: {
//         color: '#3B82F6',
//         fontSize: 14,
//         fontWeight: '500',
//     },

//     // Categories Styles
//     categoriesGrid: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         gap: 10
//     },
//     categoryItem: {
//         // alignItems: 'center',
//         // flex: 1,

//     },
//     categoryIcon: {
//         // width: 100,
//         // height: 100,
//         paddingHorizontal: 9,
//         borderRadius: 16,
//         paddingVertical: 10,
//         borderRadius: 100,
//         borderWidth: 1,
//         borderColor: '#B2BBCE'

//         // justifyContent: 'center',
//         // alignItems: 'center',
//         // marginBottom: 8,
//         // paddingTop: 8,
//         // paddingLeft: 8,
//     },
//     categoryEmoji: {
//         fontSize: 28,
//     },
//     categoryText: {
//         fontSize: 13,
//         color: '#B2BBCE',
//         // textAlign: 'center',
//         lineHeight: 16,
//         fontFamily: FONTS_FAMILY.Poppins_SemiBold
//     },

//     // Promo Card Styles
//     promoCard: {
//         backgroundColor: '#F97316',
//         borderRadius: 16,
//         padding: 24,
//         overflow: 'hidden',
//     },
//     promoContent: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     promoTextContainer: {
//         flex: 1,
//     },
//     promoTitle: {
//         color: 'white',
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 8,
//     },
//     promoSubtitle: {
//         color: 'white',
//         fontSize: 14,
//         opacity: 0.9,
//         marginBottom: 16,
//     },
//     shopNowButton: {
//         backgroundColor: 'white',
//         paddingHorizontal: 16,
//         paddingVertical: 8,
//         borderRadius: 20,
//         alignSelf: 'flex-start',
//     },
//     shopNowText: {
//         color: '#F97316',
//         fontSize: 14,
//         fontWeight: '600',
//     },
//     promoEmoji: {
//         fontSize: 64,
//         opacity: 0.2,
//     },

//     // Products Grid Styles
//     productsGrid: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         gap: 10, // Modern approach
//         // paddingHorizontal: 16,
//     },
//     productCard: {
//         // flex: 1,
//         // backgroundColor: '#F8F8F8',
//         backgroundColor: '#F2F2F3',
//         maxWidth: '50%',
//         borderRadius: 16,
//         padding: 20,
//         paddingHorizontal: 20,
//         marginBottom: 16,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 1,
//         },
//         shadowOpacity: 0.05,
//         shadowRadius: 2,
//         elevation: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },


//     discountText: {
//         color: 'white',
//         fontSize: 10,
//         fontWeight: '600',
//     },
//     productName: {
//         fontSize: 14,
//         fontFamily: FONTS_FAMILY.Poppins_Medium,
//         color: '#1F2937',
//         alignSelf: 'center'
//         // marginBottom: 4,
//     },
//     ratingContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 8,
//     },
//     ratingText: {
//         fontSize: 12,
//         color: '#6B7280',
//         marginLeft: 4,
//     },
//     priceContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     currentPrice: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#1F2937',
//     },
//     originalPrice: {
//         fontSize: 12,
//         color: '#9CA3AF',
//         textDecorationLine: 'line-through',
//     },
//     addButton: {
//         width: 32,
//         height: 32,
//         backgroundColor: '#3B82F6',
//         borderRadius: 16,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     addButtonText: {
//         color: 'white',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
// });


import React, { useEffect, useState } from 'react';
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

const { width, height } = Dimensions.get('window');

export default function CategoryProducts({ navigation, route }) {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: 200, max: 3748 });
    const [selectedRating, setSelectedRating] = useState(null);
    const [isVeganFriendly, setIsVeganFriendly] = useState(true);

    const { showLoader, hideLoader } = useLoader()

    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        try {
            showLoader()
            const res = await apiGet(`${urls.getAllProducts}?categoryId=${route?.params?.categoryId}&subCategoryId=${route?.params?.subcategoryId}`)
            setAllProducts(res?.data)
            hideLoader()
        } catch (error) {
            console.error('Error fetching categories:', error);
            hideLoader()
        }
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
                <View style={styles.filterModal}>
                    {/* Modal Header */}
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setIsFilterVisible(false)}>
                            <Ionicons name="chevron-back" size={24} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Sort & Filter</Text>
                        <View style={{ width: 24 }} />
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Price Range Section */}
                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>Price Range</Text>
                            <View style={styles.priceRangeContainer}>
                                <Text style={styles.priceLabel}>${priceRange.min}</Text>
                                <View style={styles.sliderContainer}>
                                    <View style={styles.sliderTrack} />
                                    <View style={styles.sliderRange} />
                                    <View style={[styles.sliderThumb, { left: '10%' }]} />
                                    <View style={[styles.sliderThumb, { left: '85%' }]} />
                                </View>
                                <Text style={styles.priceLabel}>${priceRange.max}</Text>
                            </View>
                        </View>

                        {/* Ratings Section */}
                        <View style={styles.filterSection}>
                            <Text style={styles.filterSectionTitle}>Ratings</Text>
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
                            <Text style={styles.filterSectionTitle}>Vegan Friendly</Text>
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
                                    <Text style={styles.veganText}>Yes</Text>
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
                                    <Text style={styles.veganText}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>

                    {/* Apply Filter Button */}
                    <View style={styles.modalFooter}>
                        <TouchableOpacity
                            style={styles.applyButton}
                            onPress={() => {
                                // Handle filter application logic here
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

    // Header Component
    const renderHeader = () => (
        <View style={styles.headerContainer}>
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
                            Biscuits & Drinks
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
        </View>
    );

    // Categories Component
    const renderCategories = () => {
        const categories = [
            { name: 'Groceries', icon: IMG.Meat, },
            { name: 'Home & Lifestyle', icon: IMG.fruit, },
            { name: 'Electronics', icon: IMG.dairy, },
            { name: 'Snacks', icon: IMG.snacks, }
        ];

        return (
            <View style={{
                ...styles.sectionContainer,
            }}>
                <ScrollView contentContainerStyle={styles.categoriesGrid}
                    horizontal
                >
                    {categories.map((category, index) => (
                        <TouchableOpacity key={index} style={styles.categoryItem}>
                            <View style={[styles.categoryIcon]}>
                                <Text style={styles.categoryText}>{category.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    };

    // Today's Choice Component
    const renderTodaysChoice = () => {
        const todaysChoices = [
            {
                name: "Biscuits & Drinks",
                image: IMG.sprite,
                quantity: '100ml',
                price: "$1.50",
                originalPrice: "$3.99",
            },
            {
                name: "Fruits & Vegetable",
                image: IMG.eggPasta,
                quantity: '40 gr',
                price: "$1.50",
                originalPrice: "$3.99",
            },
            {
                name: "Cooking Essential",
                image: IMG.sprite,
                quantity: '100ml',
                price: "$1.50",
                originalPrice: "$3.99",
            },
            {
                name: "Dairy & Bakery",
                image: IMG.eggPasta,
                quantity: '40 gr',
                price: "$1.50",
                originalPrice: "$3.99",
            },
        ];

        return (
            <View style={styles.sectionContainer}>
                <View style={styles.productsGrid}>
                    {allProducts?.map((item, index) => (
                        <View key={index} style={styles.productCard}>
                            <View style={{ width: 115 }}>
                                <Image source={{ uri: item?.images[0] }} style={{
                                    height: 87, width: 100
                                }} />
                                <Text style={styles.productName}>{item.name}</Text>
                            </View>
                            <TouchableOpacity style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0
                            }}
                            onPress={() => navigation.navigate('ProductDetail', { productId: item?._id })}
                            >
                                <AddButton />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    const { isDarkMode } = useSelector(state => state.theme)


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
        leftHeader: {

        },
        avatarContainer: {
            width: 32,
            height: 32,
            backgroundColor: 'white',
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 8,
        },
        avatarText: {
            color: 'white',
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 30,
        },
        timeText: {
            color: 'white',
            fontSize: 14,
            opacity: 0.9,
        },
        rightHeader: {
            flexDirection: 'row',
        },
        iconButton: {
            marginLeft: 16,
            backgroundColor: '#6C87CF',
            padding: 5,
            borderRadius: 100
        },
        titleContainer: {
            marginBottom: 16,
        },
        mainTitle: {
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 4,
        },
        subtitle: {
            color: 'white',
            fontSize: 14,
            opacity: 0.9,
        },
        searchContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#3658B0',
            borderRadius: 100,
            paddingHorizontal: 16,
            height: 40,
        },
        searchIcon: {
            marginRight: 12,
        },
        searchInput: {
            flex: 1,
            fontSize: 13,
            color: 'white',
            fontFamily: FONTS_FAMILY.Poppins_Regular
        },

        // Section Styles
        sectionContainer: {
            paddingHorizontal: 16,
            paddingVertical: 15,
            zIndex: -100000,
        },
        sectionTitle: {
            fontSize: 16,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: '#1F2937',
            marginBottom: 16,
        },
        sectionHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        seeAllText: {
            color: '#3B82F6',
            fontSize: 14,
            fontWeight: '500',
        },

        // Categories Styles
        categoriesGrid: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 10
        },
        categoryItem: {

        },
        categoryIcon: {
            paddingHorizontal: 9,
            borderRadius: 16,
            paddingVertical: 10,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: '#B2BBCE'
        },
        categoryEmoji: {
            fontSize: 28,
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
            gap: 10,
        },
        productCard: {
            backgroundColor: isDarkMode ? dark33 : '#F2F2F3',
            maxWidth: '50%',
            borderRadius: 16,
            padding: 20,
            paddingHorizontal: 20,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        productName: {
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? white : '#1F2937',
            alignSelf: 'center'
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
            backgroundColor: isDarkMode ? dark55 : 'white',
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
            color: isDarkMode ? white : '#333',
        },
        filterSection: {
            paddingHorizontal: 20,
            paddingVertical: 20,
        },
        filterSectionTitle: {
            fontSize: 16,
            fontWeight: '600',
            color: isDarkMode ? white : '#333',
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
            color: isDarkMode ? white : '#666',
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
            // borderWidth: 1,
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
            color: isDarkMode ? 'white' : '#333',
            fontWeight: '500',
        },

        // Modal Footer Styles
        modalFooter: {
            paddingHorizontal: 20,
            paddingVertical: 20,
            // borderTopWidth: 1,
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
            {renderHeader()}
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderCategories()}
                {renderTodaysChoice()}
            </ScrollView>
            {renderFilterModal()}
        </SafeAreaView>
    );
}

