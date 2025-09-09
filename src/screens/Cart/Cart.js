import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, StyleSheet } from 'react-native';
import IMG from '../../assets/Images';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { App_Primary_color } from '../../common/Colors/colors';
import { BackWhite } from '../../assets/SVGs';

const CartScreen = ({navigation}) => {
    const [cart1Quantity, setCart1Quantity] = useState(1);
    const [cart2Quantity, setCart2Quantity] = useState(1);
    const [activeTab, setActiveTab] = useState('My Cart');

    const potatoImage = IMG.Potato

    const incrementQuantity = (cartNumber) => {
        if (cartNumber === 1) {
            setCart1Quantity(cart1Quantity + 1);
        } else {
            setCart2Quantity(cart2Quantity + 1);
        }
    };

    const decrementQuantity = (cartNumber) => {
        if (cartNumber === 1 && cart1Quantity > 1) {
            setCart1Quantity(cart1Quantity - 1);
        } else if (cartNumber === 2 && cart2Quantity > 1) {
            setCart2Quantity(cart2Quantity - 1);
        }
    };

    const renderMyCartContent = () => (
        <View style={styles.cartContainer}>
            {/* Cart Header */}
            <View style={styles.cartHeader}>
                <Text style={styles.cartTitle}>• Cart 1</Text>
                <View style={styles.checkIcon}>
                    <Text style={styles.checkMark}>✓</Text>
                </View>
            </View>

            {/* Store Info */}
            <View style={styles.storeSection}>
                <Text style={styles.sectionTitle}>Store</Text>
                <Text style={styles.storeName}>Nippon Mart</Text>
            </View>

            {/* Product Summary */}
            <View style={styles.productSection}>
                <Text style={styles.sectionTitle}>Product Summary</Text>

                {/* First Product */}
                <View style={styles.productItem}>
                    <Image source={IMG.Potato} style={styles.productImage} />
                    <View style={styles.productDetails}>
                        <Text style={styles.productName}>Fresh Pateto</Text>
                        <Text style={styles.productVariant}>Variant, 500 gr</Text>
                        <Text style={styles.productPrice}>$20.99</Text>
                    </View>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => decrementQuantity(1)}
                        >
                            <Text style={styles.quantityButtonText}>−</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{cart1Quantity}</Text>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => incrementQuantity(1)}
                        >
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    const renderCurrentOrderContent = () => (
        <View style={styles.currentOrderCard}>
            <View style={styles.orderHeader}>
                <Image source={IMG.Potato} style={styles.orderImage} />
                <View style={styles.orderInfo}>
                    <Text style={styles.orderTitle}>Fresh Pateto</Text>
                    <Text style={styles.orderId}>#2019362</Text>
                </View>
                <View style={styles.statusBadge}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>On Progress</Text>
                </View>
            </View>
            
            <View style={styles.orderFooter}>
                <View style={styles.orderPricing}>
                    <Text style={styles.orderPrice}>$18.99</Text>
                    <Text style={styles.orderItems}> • 2 Items</Text>
                </View>
                <TouchableOpacity style={styles.trackOrderButton}
                onPress={()=>navigation.navigate('OrderTrackingScreen')}
                >
                    <Text style={styles.trackOrderText}>Track Order</Text>
                    <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderPreviousOrderContent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No previous orders found</Text>
        </View>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'My Cart':
                return renderMyCartContent();
            case 'Current Order':
                return renderCurrentOrderContent();
            case 'Previous Order':
                return renderPreviousOrderContent();
            default:
                return renderMyCartContent();
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}
                onPress={()=>navigation.goBack()}
                >
                 <BackWhite/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Cart</Text>
                <View style={styles.headerRight} />
            </View>

            {/* Tab Navigation */}
            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'My Cart' && styles.activeTab]}
                    onPress={() => setActiveTab('My Cart')}
                >
                    <Text style={[styles.tabText, activeTab === 'My Cart' && styles.activeTabText]}>My Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'Current Order' && styles.activeTab]}
                    onPress={() => setActiveTab('Current Order')}
                >
                    <Text style={[styles.tabText, activeTab === 'Current Order' && styles.activeTabText]}>Current Order</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'Previous Order' && styles.activeTab]}
                    onPress={() => setActiveTab('Previous Order')}
                >
                    <Text style={[styles.tabText, activeTab === 'Previous Order' && styles.activeTabText]}>Previous Order</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {renderContent()}
            </ScrollView>

            {/* Checkout Button - Only show for My Cart tab */}
            {activeTab === 'My Cart' && (
                <View style={styles.checkoutContainer}>
                    <TouchableOpacity style={styles.checkoutButton}
                    onPress={()=>navigation.navigate('CheckoutSummary')}
                    >
                        <Text style={styles.checkoutText}>Checkout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    header: {
        backgroundColor: App_Primary_color,
        height: 90,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 15,
        paddingHorizontal: 20,
    },
    backButton: {
        width: 30,
        bottom:9
    },
    backIcon: {
        color: 'white',
    },
    headerTitle: {
        color: 'white',
        fontSize: 22,
       fontFamily:FONTS_FAMILY.Poppins_Medium,
        marginLeft: 10,
    },
    headerRight: {
        width: 30,
    },
    tabContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    tab: {
        marginRight: 25,
        paddingBottom: 8,
    },
    activeTab: {
        borderBottomWidth: 3,
        borderBottomColor: '#5A6ACF',
    },
    tabText: {
        fontSize: 16,
        color: '#999',
       fontFamily:FONTS_FAMILY.Poppins_Medium
    },
    activeTabText: {
        color: '#333',
       fontFamily:FONTS_FAMILY.Poppins_Medium
    },
    content: {
        flex: 1,
        padding: 20,
    },
    cartContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: '#CCCCCC'
    },
    cartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        marginBottom: 20,
    },
    cartTitle: {
        fontSize: 16,
        fontFamily: FONTS_FAMILY.Poppins_Medium,
        color: '#333',
    },
    checkIcon: {
        backgroundColor: '#4CAF50',
        width: 24,
        height: 24,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkMark: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    storeSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: FONTS_FAMILY.Poppins_Medium,
        color: '#333',
    },
    storeName: {
        fontSize: 15,
        color: '#888',
    },
    productSection: {
        marginBottom: 10,
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 95,
        height: 80,
        borderRadius: 8,
        marginRight: 15,
    },
    productDetails: {
        flex: 1,
        marginTop: 8
    },
    productName: {
        fontSize: 14,
        fontFamily: FONTS_FAMILY.Poppins_Medium,
        color: '#333',
        marginBottom: 4,
    },
    productVariant: {
        fontSize: 14,
        color: '#888',
        marginBottom: 6,
    },
    productPrice: {
        fontSize: 14,
        fontFamily: FONTS_FAMILY.Poppins_Medium,
        color: '#333',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position:'absolute',
        right:0,
        bottom:0
    },
    quantityButton: {
        backgroundColor: App_Primary_color,
        width: 25,
        height: 25,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        fontSize: 18,
        color:'white',
        fontWeight: '600',
    },
    quantityText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginHorizontal: 5,
        minWidth: 20,
        textAlign: 'center',
    },
    // Current Order Styles
    currentOrderCard: {
        // backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        // elevation: 2,
        // borderWidth: 1,
        borderColor: '#CCCCCC',
    },
    orderHeader: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    orderImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    orderInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    orderTitle: {
        fontSize: 16,
        fontFamily: FONTS_FAMILY.Poppins_Medium,
        color: '#333',
        marginBottom: 2,
    },
    orderId: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        marginBottom: 4,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FF9500',
        height: 24,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#FF9500',
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#FF9500',
    },
    orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    orderPricing: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderPrice: {
        fontSize: 16,
        fontFamily: FONTS_FAMILY.Poppins_Medium,
        color: '#333',
    },
    orderItems: {
        fontSize: 14,
        color: 'black',
        fontFamily:FONTS_FAMILY.Poppins_Regular
    },
    trackOrderButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trackOrderText: {
        fontSize: 14,
        color: '#888',
        marginRight: 4,
        fontFamily:FONTS_FAMILY.Poppins_Medium
    },
    chevron: {
        fontSize: 16,
        color: '#888',
        fontWeight: '300',
        bottom:3
    },
    // Empty state
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    },
    checkoutContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingBottom: 35,
    },
    checkoutButton: {
        backgroundColor: App_Primary_color,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkoutText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default CartScreen;