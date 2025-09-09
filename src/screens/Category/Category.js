import React from 'react';
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
import { App_Primary_color } from '../../common/Colors/colors';
import { FONTS_FAMILY } from '../../assets/Fonts';
import Row from '../../components/wrapper/row';
import { AddButton, DownChev } from '../../assets/SVGs';
import IMG from '../../assets/Images';
import SpaceBetweenRow from '../../components/wrapper/spacebetween';

export default function Category({ navigation }) {
    // Header Component
    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />

            <View style={styles.topBar}>
                <View style={styles.leftHeader}>
                    <Text style={{ ...styles.avatarText, fontFamily: FONTS_FAMILY.Poppins_SemiBold }}>Shop</Text>
                    <Row>
                        <Text style={{ ...styles.avatarText }}>By Category</Text>

                    </Row>
                </View>

                <View style={styles.rightHeader}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="cart-outline" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="notifications-outline" size={20} color="white" />
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
                // marginTop: 70
            }}>

                <ScrollView contentContainerStyle={styles.categoriesGrid}
                    horizontal
                >
                    {categories.map((category, index) => (

                        <TouchableOpacity key={index} style={styles.categoryItem}>
                            <View style={[styles.categoryIcon]}>
                                <Text style={styles.categoryText}>{category.name}</Text>
                                {/* <Text style={styles.categoryEmoji}>{category.icon}</Text> */}

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
                    {todaysChoices.map((item, index) => (
                        <View key={index} style={styles.productCard}>
                            <View style={{alignItems:'center'}}>

                                <Image source={item?.image} style={{
                                    height: 87, width: 87
                                }} />
                                <Text style={styles.productName}>{item.name}</Text>
                                </View>
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderCategories()}
                {renderTodaysChoice()}
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
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
        // width: 100,
        // height: 100,
        paddingHorizontal: 9,
        borderRadius: 16,
        paddingVertical: 10,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#B2BBCE'

        // justifyContent: 'center',
        // alignItems: 'center',
        // marginBottom: 8,
        // paddingTop: 8,
        // paddingLeft: 8,
    },
    categoryEmoji: {
        fontSize: 28,
    },
    categoryText: {
        fontSize: 13,
        color: '#B2BBCE',
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
    flexWrap: 'wrap',
    gap: 16, // Modern approach
    paddingHorizontal: 16,
    },
    productCard: {
        // flex: 1,
    backgroundColor: '#F8F8F8',
    maxWidth:'48%',
    borderRadius: 16,
    padding: 20,
    paddingHorizontal:20,
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
   
  
    discountText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '600',
    },
    productName: {
        fontSize: 14,
        fontFamily: FONTS_FAMILY.Poppins_Medium,
        color: '#1F2937',
        alignSelf:'center'
        // marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingText: {
        fontSize: 12,
        color: '#6B7280',
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
        color: '#1F2937',
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