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

export default function HomeScreen({ navigation }) {
    // Header Component

    let selector = useSelector(state => state?.user?.userData);
    if (Object.keys(selector).length != 0) {
        selector = JSON.parse(selector);
    }
    const { showLoader, hideLoader } = useLoader()
    const [categories, setCategories] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [banners, setBanners] = useState([])



    // console.log('Selector at home',selector);
    useEffect(() => {
        getCategories()
        getAllProduct()
        getAllBanners()
    }, [])

    const getCategories = async () => {
        try {
            showLoader()
            const res = await apiGet(urls?.getCategory)
            // console.log(res?.data);
            setCategories(res?.data)
            hideLoader()


        } catch (error) {
            hideLoader()
        }
    }

    // "https://rr-store-backend.vercel.app/api/banner/all

     const getAllBanners = async () => {
        try {
            showLoader()
            const res = await apiGet(urls?.getAllBanners)
            console.log(res?.data);
            setBanners(res?.data)
            hideLoader()


        } catch (error) {
            hideLoader()
        }
    }

    const getAllProduct = async () => {
        try {
            showLoader()
            const res = await apiGet(urls?.getAllProducts)
            // console.log(res?.data);
            setAllProducts(res?.data)
            hideLoader()


        } catch (error) {
            hideLoader()
        }
    }

    // const renderHeader = () => (
    //     <View style={styles.headerContainer}>
    //         <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />

    //         <View style={styles.topBar}>
    //             <View style={styles.leftHeader}>
    //                 <Text style={styles.avatarText}>Deliver to</Text>
    //                 <Row>
    //                     <Text style={{ ...styles.avatarText, fontFamily: FONTS_FAMILY.Poppins_Medium }}>Jakarta, Indonesia</Text>
    //                     <TouchableOpacity>
    //                         <DownChev />
    //                     </TouchableOpacity>
    //                 </Row>
    //             </View>

    //             <View style={styles.rightHeader}>
    //                 <TouchableOpacity style={styles.iconButton}
    //                     onPress={() => navigation.navigate('CartScreen')}
    //                 >
    //                     <Ionicons name="cart-outline" size={20} color="white" />
    //                 </TouchableOpacity>
    //                 <TouchableOpacity style={styles.iconButton}>
    //                     <Ionicons name="notifications-outline" size={20} color="white" />
    //                 </TouchableOpacity>
    //             </View>
    //         </View>



    //         <View style={styles.searchContainer}>
    //             <Ionicons name="search" size={18} color="white" style={styles.searchIcon} />
    //             <TextInput
    //                 placeholder="Search for products..."
    //                 placeholderTextColor="white"
    //                 style={styles.searchInput}
    //             />
    //         </View>
    //         <Image
    //             source={IMG.HomeBanner}
    //             style={{ height: 160, width: 320, zIndex: 1000, alignSelf: 'center', marginTop: 10 }}
    //             resizeMode='contain'
    //         />
    //     </View>
    // );


const renderHeader = () => (
    <View style={styles.headerContainer}>
        <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />

        <View style={styles.topBar}>
            <View style={styles.leftHeader}>
                <Text style={styles.avatarText}>Deliver to</Text>
                <Row>
                    <Text style={{ ...styles.avatarText, fontFamily: FONTS_FAMILY.Poppins_Medium }}>Jakarta, Indonesia</Text>
                    <TouchableOpacity>
                        <DownChev />
                    </TouchableOpacity>
                </Row>
            </View>

            <View style={styles.rightHeader}>
                <TouchableOpacity style={styles.iconButton}
                    onPress={() => navigation.navigate('CartScreen')}
                >
                    <Ionicons name="cart-outline" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="notifications-outline" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color="white" style={styles.searchIcon} />
            <TextInput
                placeholder="Search for products..."
                placeholderTextColor="white"
                style={styles.searchInput}
            />
        </View>
        
        <View style={{ 
            height: 160, 
            width: 320, 
            zIndex: 1000, 
            alignSelf: 'center', 
            marginTop: 10,
            borderRadius: 8,
            overflow: 'hidden'
        }}>
            <Carousel
                data={[IMG.HomeBanner,IMG.HomeBanner,IMG.HomeBanner]}
                renderItem={({ item }) => (
                    <Image
                        source={item}
                        style={{ 
                            height: 160, 
                            width: 320,
                            borderRadius: 8
                        }}
                        resizeMode='contain'
                    />
                )}
                sliderWidth={320}
                itemWidth={320}
                autoplay={true}
                autoplayDelay={500}
                autoplayInterval={3000}
                loop={true}
                enableMomentum={false}
                lockScrollWhileSnapping={true}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
            />
        </View>
    </View>
);


    // Categories Component
    const renderCategories = () => {
        // const categories = [
        //     { name: 'Meat & \n Fish', icon: IMG.Meat, },
        //     { name: 'Fruits & \n Vegetables', icon: IMG.fruit, },
        //     { name: 'Dairy', icon: IMG.dairy, },
        //     { name: 'Snacks', icon: IMG.snacks, }
        // ];

        return (
            <View style={{
                ...styles.sectionContainer,
                marginTop: 70
            }}>
                <SpaceBetweenRow>
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <Text style={{ ...styles.sectionTitle, fontSize: 16, color: '#777777', fontFamily: FONTS_FAMILY.Poppins_Regular }}>View All</Text>


                </SpaceBetweenRow>
                <ScrollView contentContainerStyle={styles.categoriesGrid}
                    horizontal
                >
                    {categories.map((category, index) => (

                        <TouchableOpacity key={index} style={styles.categoryItem}>
                            <View style={[styles.categoryIcon, { backgroundColor: isDarkMode ? dark55 : '#d7e0f1ff' }]}>
                                <Image source={{ uri: category?.image }}
                                    style={{
                                        height: 60, width: 90,
                                        alignSelf: 'center',
                                        borderRadius: 7
                                    }}
                                    // resizeMode='contain'
                                />
                                <Text style={styles.categoryText}>{category.name}</Text>
                                {/* <Text style={styles.categoryEmoji}>{category.icon}</Text> */}
                            </View>
                        </TouchableOpacity>

                    ))}
                </ScrollView>
            </View>
        );
    };

    // Top Picks Component
    const renderTopPicks = () => {
        const todaysChoices = [
            {
                name: "Fresh Potato",
                image: IMG.Potato,
                quantity: '1 kg',

                price: "$1.50",
                originalPrice: "$3.99",
            },
            {
                name: "Egg Pasta",
                image: IMG.eggPasta,
                quantity: '40 gr',
                price: "$1.50",
                originalPrice: "$3.99",
            },

        ];

        return (
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Top Pics For Vegetables</Text>

                </View>

                <View style={{}}>
                    {allProducts.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.productCard1}
                            // onPress={() => navigation.navigate('ProductDetail',{productId:item?._id})}
                            activeOpacity={0.9}
                        >
                            {/* {console.log('++++++++++++', item)
                            } */}
                            <Image source={item?.images?.length > 0 ? { uri: item?.images[0] } : IMG.eggPasta} style={{
                                height: 68, width: 80,
                                borderRadius:8
                            }} />
                            <View style={{ marginLeft: 20 }}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <View style={styles.priceContainer}>
                                    <Row style={{ gap: 10 }}>
                                        <Text style={{ fontSize: 12, fontFamily: FONTS_FAMILY.Poppins_Regular, color: '#777777' }}>{item.stock}</Text>
                                        <Text style={styles.currentPrice}>${item.price}</Text>
                                        <Text style={styles.originalPrice}>${item.discountPrice}</Text>
                                    </Row>

                                </View>

                            </View>

                            <TouchableOpacity
                                style={{ position: 'absolute', right: 10, bottom: 10, elevation: 1 }}
                                onPress={() => navigation.navigate('ProductDetail', { productId: item?._id })}

                            >
                                <AddButton />
                            </TouchableOpacity>


                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    };

    // Today's Choice Component
    const renderTodaysChoice = () => {
        const todaysChoices = [
            {
                name: "Sprite Can",
                image: IMG.sprite,
                quantity: '100ml',

                price: "$1.50",
                originalPrice: "$3.99",
            },
            {
                name: "Egg Pasta",
                image: IMG.eggPasta,
                quantity: '40 gr',
                price: "$1.50",
                originalPrice: "$3.99",
            },

        ];

        return (
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Today's Choice</Text>

                </View>

                <ScrollView horizontal contentContainerStyle={styles.productsGrid}>
                    {allProducts?.map((item, index) => (
                        <View key={index} style={styles.productCard}>
                              <Image source={item?.images?.length > 0 ? { uri: item?.images[0] } : IMG.eggPasta} style={{
                                height: 68, width: 70,
                                borderRadius: 8
                            }} />
                            <View>
                                <Text style={styles.productName}>{'Egg Pasta'}</Text>
                                <Text style={{ fontSize: 12, fontFamily: FONTS_FAMILY.Poppins_Regular, color: '#777777' }}>${item?.price}</Text>
                                <View style={styles.priceContainer}>
                                    <Row style={{ gap: 5 }}>
                                        <Text style={styles.currentPrice}>${item?.price}</Text>
                                        <Text style={styles.originalPrice}>${item?.discountPrice}</Text>
                                    </Row>
                                    {/* <TouchableOpacity style={styles.addButton}>
                                    <Text style={styles.addButtonText}>+</Text>
                                </TouchableOpacity> */}
                                </View>

                            </View>
                          
                            <TouchableOpacity
                                style={{alignSelf:'flex-end'}}
                                onPress={() => navigation.navigate('ProductDetail', { productId: item?._id })}
                            >
                                <AddButton />
                            </TouchableOpacity>


                        </View>
                    ))}
                </ScrollView>
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
            height: 200,
            zIndex: 10000000
        },
        topBar: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
        },
        leftHeader: {
            // flexDirection: 'row',
            // alignItems: 'center',
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
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 14,
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
            // backgroundColor: 'white',
            paddingHorizontal: 16,
            paddingVertical: 15,
            // marginBottom: 8,
            zIndex: -100000,
        },
        sectionTitle: {
            fontSize: 16,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: isDarkMode ? white : '#1F2937',
            marginBottom: 16,
        },
        sectionHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // marginBottom: 16,
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
            // alignItems: 'center',
            // flex: 1,
            alignItems:'center'
        },
        categoryIcon: {
            width: 100,
            height: 100,
            borderRadius: 16,
            // justifyContent: 'center',
            // alignItems: 'center',
            // marginBottom: 8,
            paddingTop: 7,
            // paddingLeft: 8,
            gap:10,
            alignItems:'center'
        },
        categoryEmoji: {
            fontSize: 28,
        },
        categoryText: {
            fontSize: 13,
            color: isDarkMode ? white : 'black',
            // textAlign: 'center',
            lineHeight: 16,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold
        },

        // Promo Card Styles
        promoCard: {
            backgroundColor: '#F97316',
            borderRadius: 16,
            padding: 24,
            overflow: 'hidden',
        },
        promoContent: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        promoTextContainer: {
            flex: 1,
        },
        promoTitle: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 8,
        },
        promoSubtitle: {
            color: 'white',
            fontSize: 14,
            opacity: 0.9,
            marginBottom: 16,
        },
        shopNowButton: {
            backgroundColor: 'white',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            alignSelf: 'flex-start',
        },
        shopNowText: {
            color: '#F97316',
            fontSize: 14,
            fontWeight: '600',
        },
        promoEmoji: {
            fontSize: 64,
            opacity: 0.2,
        },

        // Products Grid Styles
        productsGrid: {
            flexDirection: 'row',
            // flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 20
        },
        productCard: {
            // width: 180,
            backgroundColor: isDarkMode ? dark33 : '#FFFFFF',
            borderRadius: 16,
            // padding: 16,
            paddingVertical:10,
            paddingHorizontal:10,
            // paddingRight:30,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            // elevation: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap:10
        },

        productCard1: {
            width: '100%',
            backgroundColor: isDarkMode ? dark33 : '#FFFFFF',
            borderRadius: 16,
            padding: 16,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            // elevation: 1,
            flexDirection: 'row',
            // justifyContent: 'space-between'
        },

        productImageContainer: {
            height: 96,
            backgroundColor: '#F9FAFB',
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12,
            position: 'relative',
        },
        productImage: {
            fontSize: 32,
        },
        discountBadge: {
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: '#EF4444',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
        },
        discountText: {
            color: isDarkMode ? white : 'white',
            fontSize: 10,
            fontWeight: '600',
        },
        productName: {
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? white : '#1F2937',
            marginBottom: 4,
        },
        ratingContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
        },
        ratingText: {
            fontSize: 12,
            color: isDarkMode ? white : '#6B7280',
            marginLeft: 4,
        },
        priceContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        currentPrice: {
            fontSize: 16,
            fontWeight: 'bold',
            color: isDarkMode ? white : '#1F2937',
        },
        originalPrice: {
            fontSize: 12,
            color: '#9CA3AF',
            textDecorationLine: 'line-through',
        },
        addButton: {
            width: 32,
            height: 32,
            backgroundColor: '#3B82F6',
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
        },
        addButtonText: {
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderCategories()}
                {renderTodaysChoice()}
                {renderTopPicks()}
                <View style={{ height: 150 }} />
            </ScrollView>
        </SafeAreaView>
    );
}


