import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { App_Primary_color, dark33, dark55, darkMode25, white } from '../../common/Colors/colors';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { useSelector } from 'react-redux';

const CheckoutSummary = ({navigation}) => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Fresh Pateto',
            variant: '500 gr',
            price: 20.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&h=100&fit=crop&crop=center',
        },
        {
            id: 2,
            name: 'Fresh Pateto',
            variant: '250 gr',
            price: 20.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&h=100&fit=crop&crop=center',
        },
    ]);

    const [promoCode, setPromoCode] = useState('');

    const updateQuantity = (id, increment) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + (increment ? 1 : -1)) }
                    : item
            )
        );
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 6.00;
    const taxAndOtherFees = 2.50;
    const total = subtotal + deliveryFee + taxAndOtherFees;

     const { isDarkMode } = useSelector(state => state.theme)
     const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:isDarkMode? darkMode25: '#f9fafb',
    },
    header: {
        backgroundColor: App_Primary_color,
        paddingHorizontal: 16,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: FONTS_FAMILY.Poppins_SemiBold,
        color:isDarkMode?white: '#111827',
        marginBottom: 16,
    },
    addressContainer: {
        backgroundColor:isDarkMode?dark33: 'white',
        borderRadius: 12,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    addressContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIcon: {
        marginRight: 12,
    },
    addressText: {
        flex: 1,
    },
    addressLabel: {
        fontSize: 16,
        fontWeight: '600',
        color:isDarkMode?'white': '#111827',
        marginBottom: 4,
    },
    addressDetail: {
        fontSize: 14,
        color:isDarkMode?'white': '#6b7280',
    },
    cartItem: {
        backgroundColor:isDarkMode?darkMode25: '#F8F8F8',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 14,
        fontFamily: FONTS_FAMILY.Poppins_SemiBold,
        color:isDarkMode?'white': '#111827',
        marginBottom: 4,
    },
    itemVariant: {
        fontSize: 14,
        color:isDarkMode?'white': '#6b7280',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '700',
        color:isDarkMode?'white': '#111827',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: App_Primary_color,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        marginHorizontal: 16,
        fontSize: 16,
        color:isDarkMode?'white': '#111827',
    },
    billContainer: {
        backgroundColor:isDarkMode? dark33: 'white',
        borderRadius: 12,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    billRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    billLabel: {
        fontSize: 14,
        color:isDarkMode?white: '#6b7280',
    },
    billAmount: {
        fontSize: 14,
        fontWeight: '600',
        color: isDarkMode? white: '#111827',
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        paddingTop: 12,
        marginTop: 8,
        marginBottom: 0,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '700',
        color:isDarkMode?white: '#111827',
    },
    totalAmount: {
        fontSize: 16,
        fontFamily: FONTS_FAMILY.Poppins_SemiBold,
        color:isDarkMode?white: '#111827',
    },
    promoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:isDarkMode?dark33: 'white',
        borderRadius: 12,
        padding: 16,
        marginTop: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    promoText: {
        fontSize: 14,
        color:isDarkMode?white: '#6b7280',
    },
    applyButton: {
        backgroundColor: App_Primary_color,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
    },
    applyButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    paymentContainer: {
        backgroundColor:isDarkMode? dark33: 'white',
        borderRadius: 12,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    paymentContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentIcon: {
        marginRight: 12,
    },
    paymentText: {
        flex: 1,
        fontSize: 16,
        color:isDarkMode? white: '#111827',
    },
    footer: {
        padding: 16,
        backgroundColor:isDarkMode?dark55: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
    },
    confirmButton: {
        backgroundColor: App_Primary_color,
        borderRadius: 25,
        paddingVertical: 16,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
});

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}
                onPress={()=>navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout Summary</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Delivery Address */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Delivery Address</Text>
                    <TouchableOpacity style={styles.addressContainer}>
                        <View style={styles.addressContent}>
                            <Ionicons name="location" size={20} color="#6b7280" style={styles.locationIcon} />
                            <View style={styles.addressText}>
                                <Text style={styles.addressLabel}>Home</Text>
                                <Text style={styles.addressDetail}>Kemayoran, Cendana Street 1, Adinata ...</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#6b7280" />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Products in Cart */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Products in Cart</Text>
                    {cartItems.map((item) => (
                        <View key={item.id} style={styles.cartItem}>
                            <Image source={{ uri: item.image }} style={styles.itemImage} />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemVariant}>Variant, {item.variant}</Text>
                                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                            </View>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => updateQuantity(item.id, false)}
                                >
                                    <Ionicons name="remove" size={16} color="white" />
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{item.quantity}</Text>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => updateQuantity(item.id, true)}
                                >
                                    <Ionicons name="add" size={16} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Bill Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Bill Details</Text>
                    <View style={styles.billContainer}>
                        <View style={styles.billRow}>
                            <Text style={styles.billLabel}>Subtotal</Text>
                            <Text style={styles.billAmount}>${subtotal.toFixed(2)}</Text>
                        </View>
                        <View style={styles.billRow}>
                            <Text style={styles.billLabel}>Delivery Fee</Text>
                            <Text style={styles.billAmount}>${deliveryFee.toFixed(2)}</Text>
                        </View>
                        <View style={styles.billRow}>
                            <Text style={styles.billLabel}>Tax & Other Fees</Text>
                            <Text style={styles.billAmount}>${taxAndOtherFees.toFixed(2)}</Text>
                        </View>
                        <View style={[styles.billRow, styles.totalRow]}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
                        </View>
                    </View>

                    {/* Promo Code */}
                    <View style={styles.promoContainer}>
                        <Text style={styles.promoText}>Add Promo</Text>
                        <TouchableOpacity style={styles.applyButton}>
                            <Text style={styles.applyButtonText}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Payment Method */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <TouchableOpacity style={styles.paymentContainer}>
                        <View style={styles.paymentContent}>
                            <Ionicons name="card" size={20} color="#6b7280" style={styles.paymentIcon} />
                            <Text style={styles.paymentText}>View Payment Method</Text>
                            <Ionicons name="chevron-forward" size={20} color="#6b7280" />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Confirm Order Button */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.confirmButton}
                onPress={()=>navigation.navigate('PaymentMethodScreen')}>
                    <Text style={styles.confirmButtonText}>Confirm Your Order</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};



export default CheckoutSummary;