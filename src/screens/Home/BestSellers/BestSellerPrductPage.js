// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     ScrollView,
//     TouchableOpacity,
//     Image,
//     SafeAreaView,
//     StatusBar
// } from 'react-native';
// import { useSelector } from 'react-redux';
// import { FONTS_FAMILY } from '../../../assets/Fonts';
// import { App_Primary_color, dark33, dark55, darkMode25, white } from '../../../common/Colors/colors';

// const CategoryProductsScreen = ({ route, navigation }) => {
//     const { isDarkMode } = useSelector(state => state.theme);
//     const [selectedCategory, setSelectedCategory] = useState('all');

//     // YAHA SIRF DATA CHANGE KARNA HAI - UI SAME RAHEGI
//     const categoryData = {
//         title: 'Vegetables & Fruits',
//         address: 'Alkesh, 13 C bakta...',
//         categories: [
//             { id: 'all', name: 'All', icon: '🥗' },
//             { id: 'fresh-veg', name: 'Fresh Vegetables', icon: '🥬' },
//             { id: 'fresh-fruits', name: 'Fresh Fruits', icon: '🍎' },
//             { id: 'exotics', name: 'Exotics', icon: '🫐' },
//             { id: 'coriander', name: 'Coriander & Others', icon: '🌿' },
//             { id: 'flowers', name: 'Flowers & Leaves', icon: '🌺' },
//             { id: 'organics', name: 'Trusted Organics', icon: '🍊' }
//         ],
//         products: [
//             {
//                 id: 1,
//                 name: 'Onion (Pyaz)',
//                 weight: '0.95 - 1.05 kg',
//                 image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400',
//                 price: '₹23',
//                 mrp: '₹31',
//                 discount: '25% OFF',
//                 deliveryTime: '13 MINS',
//                 recipes: '30 recipes',
//                 category: 'fresh-veg'
//             },
//             {
//                 id: 2,
//                 name: 'Green Chilli 100 g (Hari Mirch)',
//                 weight: '100 g',
//                 image: 'https://images.unsplash.com/photo-1583846788453-0379d4c5d8f5?w=400',
//                 price: '₹18',
//                 mrp: '₹25',
//                 discount: '28% OFF',
//                 deliveryTime: '13 MINS',
//                 recipes: '9 recipes',
//                 category: 'fresh-veg'
//             },
//             {
//                 id: 3,
//                 name: 'Potato (Aloo)',
//                 weight: '(0.95-1.05) kg',
//                 image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
//                 price: '₹27',
//                 mrp: '₹37',
//                 discount: '27% OFF',
//                 deliveryTime: '13 MINS',
//                 options: '2 options',
//                 category: 'fresh-veg'
//             },
//             {
//                 id: 4,
//                 name: 'Ginger (Adrak)',
//                 weight: '200 g',
//                 image: 'https://images.unsplash.com/photo-1599785209796-786432b228bc?w=400',
//                 price: '₹27',
//                 mrp: '₹36',
//                 discount: '25% OFF',
//                 deliveryTime: '13 MINS',
//                 recipes: '17 recipes',
//                 category: 'fresh-veg'
//             },
//             {
//                 id: 5,
//                 name: 'Tomato - Hybrid',
//                 weight: '500 g',
//                 image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400',
//                 price: '₹35',
//                 mrp: '₹45',
//                 discount: '22% OFF',
//                 deliveryTime: '13 MINS',
//                 recipes: '25 recipes',
//                 category: 'fresh-veg'
//             },
//             {
//                 id: 6,
//                 name: 'Carrot (Gajar)',
//                 weight: '500 g',
//                 image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
//                 price: '₹32',
//                 mrp: '₹40',
//                 discount: '20% OFF',
//                 deliveryTime: '13 MINS',
//                 recipes: '15 recipes',
//                 category: 'fresh-veg'
//             },
//             {
//                 id: 7,
//                 name: 'Apple - Shimla',
//                 weight: '1 kg',
//                 image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400',
//                 price: '₹180',
//                 mrp: '₹220',
//                 discount: '18% OFF',
//                 deliveryTime: '13 MINS',
//                 recipes: '12 recipes',
//                 category: 'fresh-fruits'
//             },
//             {
//                 id: 8,
//                 name: 'Banana - Robusta',
//                 weight: '6 pcs',
//                 image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400',
//                 price: '₹42',
//                 mrp: '₹55',
//                 discount: '24% OFF',
//                 deliveryTime: '13 MINS',
//                 category: 'fresh-fruits'
//             },
//             {
//                 id: 9,
//                 name: 'Blueberries',
//                 weight: '125 g',
//                 image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400',
//                 price: '₹225',
//                 mrp: '₹280',
//                 discount: '20% OFF',
//                 deliveryTime: '13 MINS',
//                 category: 'exotics'
//             },
//             {
//                 id: 10,
//                 name: 'Avocado',
//                 weight: '2 pcs',
//                 image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400',
//                 price: '₹195',
//                 mrp: '₹240',
//                 discount: '19% OFF',
//                 deliveryTime: '13 MINS',
//                 category: 'exotics'
//             }
//         ]
//     };

//     // Filter products based on selected category
//     const filteredProducts = selectedCategory === 'all' 
//         ? categoryData.products 
//         : categoryData.products.filter(product => product.category === selectedCategory);

//     const styles = StyleSheet.create({
//         container: {
//             flex: 1,
//             backgroundColor: isDarkMode ? dark33 : '#F5F5F5',
//         },
//         header: {
//             backgroundColor: isDarkMode ? dark55 : white,
//             paddingHorizontal: 16,
//             paddingTop: 12,
//             paddingBottom: 12,
//             borderBottomWidth: 1,
//             borderBottomColor: isDarkMode ? dark55 : '#E5E5E5',
//         },
//         headerTop: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//         },
//         backButton: {
//             padding: 4,
//         },
//         backIcon: {
//             fontSize: 24,
//             color: isDarkMode ? white : '#000',
//         },
//         headerTitle: {
//             flex: 1,
//             marginLeft: 12,
//         },
//         categoryTitle: {
//             fontSize: 18,
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//             color: isDarkMode ? white : '#000',
//         },
//         deliveryText: {
//             fontSize: 12,
//             fontFamily: FONTS_FAMILY.Poppins_Regular,
//             color: isDarkMode ? '#AAA' : '#666',
//             marginTop: 2,
//         },
//         searchButton: {
//             padding: 4,
//         },
//         searchIcon: {
//             fontSize: 22,
//             color: isDarkMode ? white : '#000',
//         },
//         filterSection: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             paddingHorizontal: 16,
//             paddingVertical: 12,
//             backgroundColor: isDarkMode ? dark55 : white,
//             borderBottomWidth: 1,
//             borderBottomColor: isDarkMode ? dark55 : '#E5E5E5',
//         },
//         filterButton: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             paddingHorizontal: 12,
//             paddingVertical: 6,
//             borderWidth: 1,
//             borderColor: isDarkMode ? '#555' : '#DDD',
//             borderRadius: 6,
//             marginRight: 8,
//         },
//         filterText: {
//             fontSize: 13,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             color: isDarkMode ? white : '#333',
//             marginLeft: 4,
//         },
//         brandAvatar: {
//             width: 32,
//             height: 32,
//             borderRadius: 16,
//             backgroundColor: '#DDD',
//             marginLeft: 'auto',
//         },
//         brandName: {
//             fontSize: 12,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             color: isDarkMode ? white : '#333',
//             marginLeft: 8,
//         },
//         categoriesSection: {
//             backgroundColor: isDarkMode ? dark55 : white,
//             paddingVertical: 12,
//             borderBottomWidth: 1,
//             borderBottomColor: isDarkMode ? dark55 : '#E5E5E5',
//         },
//         categoriesScroll: {
//             paddingHorizontal: 12,
//         },
//         categoryChip: {
//             alignItems: 'center',
//             marginHorizontal: 6,
//             paddingHorizontal: 10,
//             paddingVertical: 0,
//             borderRadius: 20,
//             backgroundColor: isDarkMode ? dark33 : '#F5F5F5',
//             borderWidth: 1,
//             borderColor: isDarkMode ? dark33 : '#E5E5E5',
//             minWidth: 80,
//         },
//         categoryChipActive: {
//             backgroundColor: App_Primary_color,
//             borderColor: App_Primary_color,
//         },
//         categoryChipIcon: {
//             fontSize: 24,
//             marginBottom: 4,
//         },
//         categoryChipText: {
//             fontSize: 10,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             color: isDarkMode ? '#AAA' : '#666',
//             textAlign: 'center',
//         },
//         categoryChipTextActive: {
//             color: white,
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//         },
//         productsContainer: {
//             flex: 1,
//         },
//         productsGrid: {
//             padding: 8,
//             flexDirection: 'row',
//             flexWrap: 'wrap',
//             justifyContent: 'space-between',
//         },
//         productCard: {
//             width: '32%',
//             backgroundColor: isDarkMode ? dark55 : white,
//             borderRadius: 12,
//             marginBottom: 12,
//             overflow: 'hidden',
//             borderWidth: 1,
//             borderColor: isDarkMode ? dark55 : '#E5E5E5',
//         },
//         productImageContainer: {
//             width: '100%',
//             height: 110,
//             backgroundColor: isDarkMode ? darkMode25 : '#F8F8F8',
//             position: 'relative',
//         },
//         productImage: {
//             width: '100%',
//             height: '100%',
//         },
//         favoriteButton: {
//             position: 'absolute',
//             top: 8,
//             right: 8,
//             width: 28,
//             height: 28,
//             borderRadius: 14,
//             backgroundColor: 'white',
//             justifyContent: 'center',
//             alignItems: 'center',
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.1,
//             shadowRadius: 4,
//             elevation: 3,
//         },
//         favoriteIcon: {
//             fontSize: 16,
//         },
//         productInfo: {
//             padding: 8,
//         },
//         productWeight: {
//             fontSize: 11,
//             fontFamily: FONTS_FAMILY.Poppins_Regular,
//             color: isDarkMode ? '#AAA' : '#666',
//             // marginBottom: 4,
//         },
//         productName: {
//             fontSize: 11,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             color: isDarkMode ? white : '#333',
//             marginBottom: 6,
//             lineHeight: 16,
//             // height: 32,
//         },
//         deliveryTimeContainer: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginBottom: 6,
//         },
//         deliveryDot: {
//             width: 6,
//             height: 6,
//             borderRadius: 3,
//             backgroundColor: App_Primary_color,
//             marginRight: 6,
//         },
//         deliveryTime: {
//             fontSize: 10,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             color: isDarkMode ? '#AAA' : '#666',
//         },
//         discountBadge: {
//             alignSelf: 'flex-start',
//             backgroundColor: '#E8F5E9',
//             paddingHorizontal: 6,
//             paddingVertical: 2,
//             borderRadius: 4,
//             // marginBottom: 6,
//         },
//         discountText: {
//             fontSize: 10,
//             fontFamily: FONTS_FAMILY.Poppins_Bold,
//             color: '#2E7D32',
//         },
//         priceRow: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginBottom: 8,
//         },
//         price: {
//             fontSize: 15,
//             fontFamily: FONTS_FAMILY.Poppins_Bold,
//             color: isDarkMode ? white : '#000',
//             marginRight: 6,
//         },
//         mrp: {
//             fontSize: 12,
//             fontFamily: FONTS_FAMILY.Poppins_Regular,
//             color: isDarkMode ? '#777' : '#999',
//             textDecorationLine: 'line-through',
//         },
//         addButton: {
//             backgroundColor: App_Primary_color,
//             paddingVertical: 5,
//             borderRadius: 8,
//             alignItems: 'center',
//         },
//         addButtonText: {
//             fontSize: 12,
//             fontFamily: FONTS_FAMILY.Poppins_Bold,
//             color: white,
//         },
//         optionsButton: {
//             flexDirection: 'row',
//             backgroundColor: App_Primary_color,
//             paddingVertical: 8,
//             borderRadius: 8,
//             alignItems: 'center',
//             justifyContent: 'center',
//         },
//         optionsText: {
//             fontSize: 11,
//             fontFamily: FONTS_FAMILY.Poppins_Regular,
//             color: white,
//             marginTop: 2,
//         },
//         recipesButton: {
//             backgroundColor: isDarkMode ? dark33 : '#F0F9F0',
//             paddingVertical: 6,
//             paddingHorizontal: 10,
//             borderRadius: 6,
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             marginTop: 6,
//         },
//         recipesText: {
//             fontSize: 11,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             color: App_Primary_color,
//         },
//         recipesArrow: {
//             fontSize: 14,
//             color: App_Primary_color,
//         },
//     });

//     const renderProductCard = (product) => (
//         <View key={product.id} style={styles.productCard}>
//             <View style={styles.productImageContainer}>
//                 <Image
//                     source={{ uri: product.image }}
//                     style={styles.productImage}
//                     resizeMode="cover"
//                 />
//                 <TouchableOpacity style={styles.favoriteButton}>
//                     <Text style={styles.favoriteIcon}>🤍</Text>
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.productInfo}>
//                 <Text style={styles.productWeight}>{product.weight}</Text>
//                 <Text style={styles.productName} numberOfLines={2}>
//                     {product.name}
//                 </Text>
//                 {/* <View style={styles.deliveryTimeContainer}>
//                     <View style={styles.deliveryDot} />
//                     <Text style={styles.deliveryTime}>{product.deliveryTime}</Text>
//                 </View> */}
//                 {product.discount && (
//                     <View style={styles.discountBadge}>
//                         <Text style={styles.discountText}>{product.discount}</Text>
//                     </View>
//                 )}
//                 <View style={styles.priceRow}>
//                     <Text style={styles.price}>{product.price}</Text>
//                     <Text style={styles.mrp}>MRP {product.mrp}</Text>
//                 </View>
//                 {product.options ? (
//                     <TouchableOpacity style={styles.optionsButton}>
//                         <Text style={styles.addButtonText}>ADD</Text>
//                         <Text style={styles.optionsText}>{product.options}</Text>
//                     </TouchableOpacity>
//                 ) : (
//                     <TouchableOpacity style={styles.addButton}>
//                         <Text style={styles.addButtonText}>ADD</Text>
//                     </TouchableOpacity>
//                 )}
//                 {/* {product.recipes && (
//                     <TouchableOpacity style={styles.recipesButton}>
//                         <Text style={styles.recipesText}>See {product.recipes}</Text>
//                         <Text style={styles.recipesArrow}>›</Text>
//                     </TouchableOpacity>
//                 )} */}
//             </View>
//         </View>
//     );

//     return (
//         <SafeAreaView style={styles.container}>
//             <StatusBar
//                 barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//                 backgroundColor={isDarkMode ? dark55 : white}
//             />
            
//             {/* Header */}
//             <View style={styles.header}>
//                 <View style={styles.headerTop}>
//                     <TouchableOpacity
//                         style={styles.backButton}
//                         onPress={() => navigation.goBack()}
//                     >
//                         <Text style={styles.backIcon}>←</Text>
//                     </TouchableOpacity>
//                     <View style={styles.headerTitle}>
//                         <Text style={styles.categoryTitle}>{categoryData.title}</Text>
//                         <Text style={styles.deliveryText}>
//                             Delivering to Home: {categoryData.address}
//                         </Text>
//                     </View>
//                     <TouchableOpacity style={styles.searchButton}>
//                         <Text style={styles.searchIcon}>🔍</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>

//             {/* Filter Section */}
//             {/* <View style={styles.filterSection}>
//                 <TouchableOpacity style={styles.filterButton}>
//                     <Text>⚙</Text>
//                     <Text style={styles.filterText}>Filters</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.filterButton}>
//                     <Text>↕</Text>
//                     <Text style={styles.filterText}>Sort</Text>
//                 </TouchableOpacity>
//                 <View style={styles.brandAvatar} />
//                 <Text style={styles.brandName}>Brinjal</Text>
//             </View> */}

//             {/* Horizontal Categories */}
//             <View style={styles.categoriesSection}>
//                 <ScrollView
//                     horizontal
//                     showsHorizontalScrollIndicator={false}
//                     contentContainerStyle={styles.categoriesScroll}
//                 >
//                     {categoryData.categories.map((cat) => (
//                         <TouchableOpacity
//                             key={cat.id}
//                             style={[
//                                 styles.categoryChip,
//                                 selectedCategory === cat.id && styles.categoryChipActive
//                             ]}
//                             onPress={() => setSelectedCategory(cat.id)}
//                         >
//                             <Text style={styles.categoryChipIcon}>{cat.icon}</Text>
//                             <Text
//                                 style={[
//                                     styles.categoryChipText,
//                                     selectedCategory === cat.id && styles.categoryChipTextActive
//                                 ]}
//                                 numberOfLines={2}
//                             >
//                                 {cat.name}
//                             </Text>
//                         </TouchableOpacity>
//                     ))}
//                 </ScrollView>
//             </View>

//             {/* Products Grid */}
//             <ScrollView
//                 style={styles.productsContainer}
//                 showsVerticalScrollIndicator={false}
//             >
//                 <View style={styles.productsGrid}>
//                     {filteredProducts.map((product) => renderProductCard(product))}
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// export default CategoryProductsScreen;

import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    SafeAreaView,
    StatusBar,
    Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { FONTS_FAMILY } from '../../../assets/Fonts';
import { App_Primary_color, dark33, dark55, darkMode25, white } from '../../../common/Colors/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIDEBAR_WIDTH = 85;
const PRODUCTS_WIDTH = SCREEN_WIDTH - SIDEBAR_WIDTH;

const CategoryProductsScreen = ({ route, navigation }) => {
    const { isDarkMode } = useSelector(state => state.theme);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const productScrollRef = useRef(null);

    const categoryData = {
        title: 'Vegetables & Fruits',
        address: 'Alkesh, 13 C bakta...',
        categories: [
            { id: 'all', name: 'All', icon: '🥗' },
            { id: 'fresh-veg', name: 'Fresh Vegetables', icon: '🥬' },
            { id: 'fresh-fruits', name: 'Fresh Fruits', icon: '🍎' },
            { id: 'exotics', name: 'Exotics', icon: '🫐' },
            { id: 'coriander', name: 'Coriander & Others', icon: '🌿' },
            { id: 'flowers', name: 'Flowers & Leaves', icon: '🌺' },
            { id: 'organics', name: 'Trusted Organics', icon: '🍊' }
        ],
        products: [
            {
                id: 1,
                name: 'Onion (Pyaz)',
                weight: '0.95 - 1.05 kg',
                image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400',
                price: '₹23',
                mrp: '₹31',
                discount: '25% OFF',
                deliveryTime: '13 MINS',
                recipes: '30 recipes',
                category: 'fresh-veg'
            },
            {
                id: 2,
                name: 'Green Chilli 100 g (Hari Mirch)',
                weight: '100 g',
                image: 'https://images.unsplash.com/photo-1583846788453-0379d4c5d8f5?w=400',
                price: '₹18',
                mrp: '₹25',
                discount: '28% OFF',
                deliveryTime: '13 MINS',
                recipes: '9 recipes',
                category: 'fresh-veg'
            },
            {
                id: 3,
                name: 'Potato (Aloo)',
                weight: '(0.95-1.05) kg',
                image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
                price: '₹27',
                mrp: '₹37',
                discount: '27% OFF',
                deliveryTime: '13 MINS',
                options: '2 options',
                category: 'fresh-veg'
            },
            {
                id: 4,
                name: 'Ginger (Adrak)',
                weight: '200 g',
                image: 'https://images.unsplash.com/photo-1599785209796-786432b228bc?w=400',
                price: '₹27',
                mrp: '₹36',
                discount: '25% OFF',
                deliveryTime: '13 MINS',
                recipes: '17 recipes',
                category: 'fresh-veg'
            },
            {
                id: 5,
                name: 'Tomato - Hybrid',
                weight: '500 g',
                image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400',
                price: '₹35',
                mrp: '₹45',
                discount: '22% OFF',
                deliveryTime: '13 MINS',
                recipes: '25 recipes',
                category: 'fresh-veg'
            },
            {
                id: 6,
                name: 'Carrot (Gajar)',
                weight: '500 g',
                image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
                price: '₹32',
                mrp: '₹40',
                discount: '20% OFF',
                deliveryTime: '13 MINS',
                recipes: '15 recipes',
                category: 'fresh-veg'
            },
            {
                id: 7,
                name: 'Apple - Shimla',
                weight: '1 kg',
                image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400',
                price: '₹180',
                mrp: '₹220',
                discount: '18% OFF',
                deliveryTime: '13 MINS',
                recipes: '12 recipes',
                category: 'fresh-fruits'
            },
            {
                id: 8,
                name: 'Banana - Robusta',
                weight: '6 pcs',
                image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400',
                price: '₹42',
                mrp: '₹55',
                discount: '24% OFF',
                deliveryTime: '13 MINS',
                category: 'fresh-fruits'
            },
            {
                id: 9,
                name: 'Blueberries',
                weight: '125 g',
                image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400',
                price: '₹225',
                mrp: '₹280',
                discount: '20% OFF',
                deliveryTime: '13 MINS',
                category: 'exotics'
            },
            {
                id: 10,
                name: 'Avocado',
                weight: '2 pcs',
                image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400',
                price: '₹195',
                mrp: '₹240',
                discount: '19% OFF',
                deliveryTime: '13 MINS',
                category: 'exotics'
            }
        ]
    };

    // Filter products based on selected category
    const filteredProducts = selectedCategory === 'all' 
        ? categoryData.products 
        : categoryData.products.filter(product => product.category === selectedCategory);

    const handleCategorySelect = (catId) => {
        setSelectedCategory(catId);
        productScrollRef.current?.scrollTo({ y: 0, animated: true });
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? dark33 : '#F5F5F5',
        },
        header: {
            backgroundColor: isDarkMode ? dark55 : white,
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 12,
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? dark55 : '#E5E5E5',
        },
        headerTop: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        backButton: {
            padding: 4,
        },
        backIcon: {
            fontSize: 24,
            color: isDarkMode ? white : '#000',
        },
        headerTitle: {
            flex: 1,
            marginLeft: 12,
        },
        categoryTitle: {
            fontSize: 18,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: isDarkMode ? white : '#000',
        },
        deliveryText: {
            fontSize: 12,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: isDarkMode ? '#AAA' : '#666',
            marginTop: 2,
        },
        searchButton: {
            padding: 4,
        },
        searchIcon: {
            fontSize: 22,
            color: isDarkMode ? white : '#000',
        },
        mainContent: {
            flex: 1,
            flexDirection: 'row',
        },
        // Left Sidebar - Categories (FIXED WIDTH)
        categoriesSidebar: {
            width: SIDEBAR_WIDTH,
            backgroundColor: isDarkMode ? dark55 : white,
            borderRightWidth: 1,
            borderRightColor: isDarkMode ? dark33 : '#E5E5E5',
        },
        categoryItem: {
            paddingVertical: 16,
            paddingHorizontal: 6,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? dark33 : '#F0F0F0',
            minHeight: 90,
        },
        categoryItemActive: {
            backgroundColor: isDarkMode ? dark33 : '#F8F8F8',
            borderLeftWidth: 4,
            borderLeftColor: App_Primary_color,
        },
        categoryIcon: {
            fontSize: 30,
            marginBottom: 6,
        },
        categoryName: {
            fontSize: 9.5,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? '#AAA' : '#666',
            textAlign: 'center',
            lineHeight: 12,
        },
        categoryNameActive: {
            color: App_Primary_color,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
        },
        // Right Side - Products (CALCULATED WIDTH)
        productsContainer: {
            width: PRODUCTS_WIDTH,
            backgroundColor: isDarkMode ? darkMode25 : '#F5F5F5',
        },
        productsScroll: {
            paddingHorizontal: 8,
            paddingTop: 8,
            paddingBottom: 20,
        },
        productsGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        productCard: {
            width: (PRODUCTS_WIDTH - 24) / 2, // Subtract padding and divide by 2
            backgroundColor: isDarkMode ? dark55 : white,
            borderRadius: 12,
            marginBottom: 10,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: isDarkMode ? dark55 : '#E5E5E5',
        },
        productImageContainer: {
            width: '100%',
            height: 100,
            backgroundColor: isDarkMode ? darkMode25 : '#F8F8F8',
            position: 'relative',
        },
        productImage: {
            width: '100%',
            height: '100%',
        },
        favoriteButton: {
            position: 'absolute',
            top: 8,
            right: 8,
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        favoriteIcon: {
            fontSize: 16,
        },
        productInfo: {
            padding: 10,
        },
        productWeight: {
            fontSize: 11,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: isDarkMode ? '#AAA' : '#666',
        },
        productName: {
            fontSize: 12,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? white : '#333',
            marginBottom: 6,
            lineHeight: 16,
            minHeight: 32,
        },
        discountBadge: {
            alignSelf: 'flex-start',
            backgroundColor: '#E8F5E9',
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 4,
            marginBottom: 6,
        },
        discountText: {
            fontSize: 10,
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            color: '#2E7D32',
        },
        priceRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
        },
        price: {
            fontSize: 15,
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            color: isDarkMode ? white : '#000',
            marginRight: 6,
        },
        mrp: {
            fontSize: 12,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: isDarkMode ? '#777' : '#999',
            textDecorationLine: 'line-through',
        },
        addButton: {
            backgroundColor: App_Primary_color,
            paddingVertical: 5,
            borderRadius: 8,
            alignItems: 'center',
        },
        addButtonText: {
            fontSize: 12,
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            color: white,
        },
        optionsButton: {
            flexDirection: 'row',
            backgroundColor: App_Primary_color,
            paddingVertical: 5,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
        },
        optionsText: {
            fontSize: 11,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: white,
            marginLeft: 4,
        },
    });

    const renderProductCard = (product) => (
        <View key={product.id} style={styles.productCard}>
            <View style={styles.productImageContainer}>
                <Image
                    source={{ uri: product.image }}
                    style={styles.productImage}
                    resizeMode="cover"
                />
                <TouchableOpacity style={styles.favoriteButton}>
                    <Text style={styles.favoriteIcon}>🤍</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.productInfo}>
                <Text style={styles.productWeight}>{product.weight}</Text>
                <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                </Text>
                {product.discount && (
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>{product.discount}</Text>
                    </View>
                )}
                <View style={styles.priceRow}>
                    <Text style={styles.price}>{product.price}</Text>
                    <Text style={styles.mrp}>MRP {product.mrp}</Text>
                </View>
                {product.options ? (
                    <TouchableOpacity style={styles.optionsButton}>
                        <Text style={styles.addButtonText}>ADD</Text>
                        <Text style={styles.optionsText}>({product.options})</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>ADD</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={isDarkMode ? dark55 : white}
            />
            
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                    <View style={styles.headerTitle}>
                        <Text style={styles.categoryTitle}>{categoryData.title}</Text>
                        <Text style={styles.deliveryText}>
                            Delivering to Home: {categoryData.address}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.searchButton}>
                        <Text style={styles.searchIcon}>🔍</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main Content - Sidebar + Products */}
            <View style={styles.mainContent}>
                {/* Left Sidebar - Vertical Categories */}
                <ScrollView 
                    style={styles.categoriesSidebar}
                    showsVerticalScrollIndicator={false}
                >
                    {categoryData.categories.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            style={[
                                styles.categoryItem,
                                selectedCategory === cat.id && styles.categoryItemActive
                            ]}
                            onPress={() => handleCategorySelect(cat.id)}
                        >
                            <Text style={styles.categoryIcon}>{cat.icon}</Text>
                            <Text
                                style={[
                                    styles.categoryName,
                                    selectedCategory === cat.id && styles.categoryNameActive
                                ]}
                                numberOfLines={3}
                            >
                                {cat.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Right Side - Products Grid */}
                <ScrollView
                    ref={productScrollRef}
                    style={styles.productsContainer}
                    contentContainerStyle={styles.productsScroll}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.productsGrid}>
                        {filteredProducts.map((product) => renderProductCard(product))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default CategoryProductsScreen;