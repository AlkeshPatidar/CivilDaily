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
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useIsFocused } from '@react-navigation/native';


export default function Favourite({ navigation }) {

    const [fav, setFav] = useState([])
    const { showLoader, hideLoader } = useLoader()
    const isFocused = useIsFocused()

    useEffect(() => {
        getAllFav()
    }, [isFocused])

    const deleteFromWishList = async (id) => {
        try {
            showLoader()
            const res = await apiDelete(`/api/wishlist/remove/${id}`)
            getAllFav()
            hideLoader()
        } catch (error) {
            console.log('+++++++++++++=');
            hideLoader()
        }
    }

    const getAllFav = async () => {
        try {
            showLoader()
            const res = await apiGet(urls?.getAllFav)
            // console.log('++++++++++++++',JSON.stringify(res?.data));
            setFav(res?.data)
            hideLoader()


        } catch (error) {
            hideLoader()
        }
    }
    // Header Component
    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />
            <TouchableOpacity>
                <Row style={{ gap: 20 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackWhite />

                    </TouchableOpacity>
                    <CustomText style={{
                        color: 'white',
                        fontFamily: FONTS_FAMILY.Poppins_Medium,
                        fontSize: 18
                    }}>Favourite ({fav?.length} Items)</CustomText>
                </Row>

            </TouchableOpacity>

        </View>
    );



    // Top Picks Component
    const renderTopPicks = () => {


        return (
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>

                </View>

                <View style={{}}>
                    {fav.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.productCard1}
                            onPress={() => navigation.navigate('ProductDetail', { productId: item?._id })}
                        >
                            <Image source={item?.productId?.images ? { uri: item?.productId?.images[0] } : IMG.Potato} style={{
                                height: 68, width: 80,
                                borderRadius: 10
                            }} />
                            <View style={{ marginLeft: 20 }}>
                                <Text style={styles.productName}>{item?.productId?.name}</Text>
                                <View style={styles.priceContainer}>
                                    <Row style={{ gap: 10 }}>
                                        <Text style={{ fontSize: 12, fontFamily: FONTS_FAMILY.Poppins_Regular, color: '#777777' }}>{item.productId?.stock}</Text>
                                        <Text style={styles.currentPrice}>${item.productId?.price}</Text>
                                        <Text style={styles.originalPrice}>E{item.productId?.discountPrice}</Text>
                                    </Row>

                                </View>

                            </View>

                            <Row style={{
                                // marginTop:40
                                alignSelf:'flex-end',
                                gap:10,
                                top:10
                            }}>
                                <TouchableOpacity
                                    onPress={() => deleteFromWishList(item?.productId?._id)}
                                    style={{
                                        // position: 'absolute', right: 15, top: 10, elevation: 1,
                                        backgroundColor: 'white',
                                        padding: 5,
                                        borderRadius: 100
                                    }}
                                >
                                    <AntDesign name='delete'
                                        color={App_Primary_color}
                                        size={22}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    // style={{ position: 'absolute', right: 10, bottom: 10, elevation: 1 }}
                                    onPress={() => navigation.navigate('ProductDetail', { productId: item?.productId?._id })}
                                >
                                    <AddButton />
                                </TouchableOpacity>
                            </Row>




                        </TouchableOpacity>
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
            // height: 200,
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
            color: '#1F2937',
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
        },
        categoryIcon: {
            width: 100,
            height: 100,
            borderRadius: 16,
            // justifyContent: 'center',
            // alignItems: 'center',
            // marginBottom: 8,
            paddingTop: 8,
            paddingLeft: 8,
        },
        categoryEmoji: {
            fontSize: 28,
        },
        categoryText: {
            fontSize: 13,
            color: 'black',
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
            width: '48%',
            backgroundColor: '#FFFFFF',
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
            justifyContent: 'space-between'
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
            color: 'white',
            fontSize: 10,
            fontWeight: '600',
        },
        productName: {
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? 'white' : '#1F2937',
            marginBottom: 4,
        },
        ratingContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
        },
        ratingText: {
            fontSize: 12,
            color: isDarkMode ? 'white' : '#6B7280',
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
            color: isDarkMode ? 'white' : '#1F2937',
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
                {renderTopPicks()}
            </ScrollView>
        </SafeAreaView>
    );
}


