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
    TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { App_Primary_color, dark33, dark55, darkMode25, white } from '../../../common/Colors/colors';
import { FONTS_FAMILY } from '../../../assets/Fonts';
import { useSelector } from 'react-redux';
import useLoader from '../../../utils/LoaderHook';
import { apiPost } from '../../../utils/Apis';
import { ToastMsg } from '../../../utils/helperFunctions';
import OrderSuccessModal from './OrderSuccessModel';

const CheckoutSummary = ({ navigation, route }) => {
    let selector = useSelector(state => state?.user?.userData);
    if (Object.keys(selector).length != 0) {
        selector = JSON.parse(selector);
    }

    const { showLoader, hideLoader } = useLoader();
    const { isDarkMode } = useSelector(state => state.theme);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(
        selector?.addresses?.find(addr => addr.isDefault)?._id || selector?.addresses?.[0]?._id || null
    );
    const [isAddressExpanded, setIsAddressExpanded] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const [discount, setDiscount] = useState(0);

    // Calculate subtotal correctly using item.quantity instead of item.productId.quantity
    const subtotal = route?.params?.cartData?.items?.reduce((sum, item) => {
        const price = parseFloat(item.productId?.price) || 0;
        const quantity = parseInt(item?.quantity) || 0;
        return sum + (price * quantity);
    }, 0) || 0;

    const deliveryFee = 0.00;
    const taxAndOtherFees = 0.50;
    const total = subtotal + deliveryFee + taxAndOtherFees - discount;

    const orderPlace = async () => {
        try {
            showLoader();

            const selectedAddress = selector?.addresses?.find(addr => addr._id === selectedAddressId);

            if (!selectedAddress) {
                ToastMsg('Please select a delivery address');
                hideLoader();
                return;
            }

            const data = {
                "shippingAddress": {
                    "fullName": selector?.name || "User",
                    "mobile": selector?.mobile || selector?.phone || "",
                    "addressLine1": selectedAddress.addressLine1,
                    "addressLine2": selectedAddress.addressLine2,
                    "city": selectedAddress.city,
                    "state": selectedAddress.state,
                    "postalCode": selectedAddress.postalCode,
                    "country": selectedAddress.country
                },
                "paymentMethod": "cod"
            };

            const res = await apiPost('/api/order/place', data);
            hideLoader();

            if (res?.success || res?.message) {
                setShowSuccessModal(true);
            } else {
                ToastMsg(res?.message || 'Order failed');
            }

        } catch (error) {
            hideLoader();
            console.log('Order place error:', error);
            ToastMsg('Order placement failed');
        }
    };

    const applyPromo = async () => {
        try {
            if (!promoCode.trim()) {
                ToastMsg('Please enter a promo code');
                return;
            }

            showLoader();
            const data = {
                code: promoCode,
                cartAmount: subtotal + deliveryFee + taxAndOtherFees
            };

            const res = await apiPost('/api/coupon/validate', data);
            console.log('Promo Response:', res);
            hideLoader();

            if (res?.statusCode === 200 && res?.data?.discount) {
                setAppliedPromo(res.data.coupon);
                setDiscount(res.data.discount);
                ToastMsg(res?.message || 'Coupon applied successfully');
            } else {
                ToastMsg(res?.message || 'Invalid promo code');
            }

        } catch (error) {
            hideLoader();
            console.log('Promo code error:', error);
            ToastMsg('Failed to apply promo code');
        }
    };

    const removePromo = () => {
        setAppliedPromo(null);
        setDiscount(0);
        setPromoCode('');
        ToastMsg('Promo code removed');
    };

    const getSelectedAddress = () => {
        return selector?.addresses?.find(addr => addr._id === selectedAddressId);
    };

    const handleAddressSelect = (addressId) => {
        setSelectedAddressId(addressId);
        setIsAddressExpanded(false);
    };

    const handleTrackOrder = () => {
        setShowSuccessModal(false);
        navigation.navigate('TrackOrderScreen');
    };

    const handleBackToHome = () => {
        setShowSuccessModal(false);
        navigation.navigate('Tab');
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? darkMode25 : '#f9fafb',
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
            marginTop: 14,
        },
        sectionTitle: {
            fontSize: 16,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: isDarkMode ? white : '#111827',
            marginTop: 20
        },
        addressContainer: {
            backgroundColor: isDarkMode ? dark33 : 'white',
            borderRadius: 12,
            padding: 16,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            marginTop: 12,
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
            color: isDarkMode ? 'white' : '#111827',
            marginBottom: 4,
        },
        addressDetail: {
            fontSize: 14,
            color: isDarkMode ? 'white' : '#6b7280',
        },
        addressItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? '#374151' : '#f3f4f6',
        },
        radioButton: {
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: App_Primary_color,
            marginRight: 12,
            alignItems: 'center',
            justifyContent: 'center',
        },
        radioButtonSelected: {
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: App_Primary_color,
        },
        addAddressButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDarkMode ? dark55 : '#f3f4f6',
            borderRadius: 8,
            paddingVertical: 12,
            marginTop: 12,
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: App_Primary_color,
        },
        addAddressText: {
            marginLeft: 8,
            fontSize: 14,
            color: App_Primary_color,
            fontWeight: '600',
        },
        expandButton: {
            alignItems: 'center',
            paddingVertical: 8,
            marginTop: 8,
        },
        expandText: {
            fontSize: 12,
            color: App_Primary_color,
            fontWeight: '600',
        },
        cartItem: {
            backgroundColor: isDarkMode ? darkMode25 : '#F8F8F8',
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
            color: isDarkMode ? 'white' : '#111827',
            marginBottom: 4,
        },
        itemVariant: {
            fontSize: 14,
            color: isDarkMode ? 'white' : '#6b7280',
            marginBottom: 4,
        },
        itemPrice: {
            fontSize: 14,
            fontWeight: '700',
            color: isDarkMode ? 'white' : '#111827',
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
            fontSize: 14,
            color: isDarkMode ? 'white' : '#111827',
        },
        billContainer: {
            backgroundColor: isDarkMode ? dark33 : 'white',
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
            color: isDarkMode ? white : '#6b7280',
        },
        billAmount: {
            fontSize: 14,
            fontWeight: '600',
            color: isDarkMode ? white : '#111827',
        },
        discountRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
        },
        discountAmount: {
            fontSize: 14,
            fontWeight: '600',
            color: '#10b981',
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
            color: isDarkMode ? white : '#111827',
        },
        totalAmount: {
            fontSize: 16,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: isDarkMode ? white : '#111827',
        },
        promoContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: isDarkMode ? dark33 : 'white',
            borderRadius: 12,
            padding: 16,
            marginTop: 12,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
        },
        promoInput: {
            flex: 1,
            fontSize: 14,
            color: isDarkMode ? white : '#111827',
            paddingVertical: 8,
        },
        applyButton: {
            backgroundColor: App_Primary_color,
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 20,
            marginLeft: 12,
        },
        applyButtonText: {
            color: 'white',
            fontSize: 14,
            fontWeight: '600',
        },
        appliedPromoCard: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: isDarkMode ? dark33 : '#f0fdf4',
            borderRadius: 12,
            padding: 16,
            marginTop: 12,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            borderWidth: 1,
            borderColor: '#10b981',
        },
        appliedPromoContent: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        },
        promoIcon: {
            marginRight: 12,
        },
        appliedPromoText: {
            flex: 1,
        },
        appliedPromoCode: {
            fontSize: 16,
            fontWeight: '600',
            color: isDarkMode ? white : '#059669',
            marginBottom: 2,
        },
        appliedPromoDesc: {
            fontSize: 12,
            color: isDarkMode ? '#9ca3af' : '#6b7280',
        },
        removePromoButton: {
            padding: 4,
        },
        paymentContainer: {
            backgroundColor: isDarkMode ? dark33 : 'white',
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
            color: isDarkMode ? white : '#111827',
        },
        footer: {
            padding: 16,
            backgroundColor: isDarkMode ? dark55 : 'white',
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

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout Summary</Text>
            </View>

            

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                     {/* Products in Cart */}
                <View style={styles.section}>
                    <Text style={{...styles.sectionTitle, marginBottom:6}}>Products in Cart</Text>
                    {route?.params?.cartData?.items?.map((item, index) => (
                        <View key={index} style={styles.cartItem}>
                            <Image source={{ uri: item.productId?.images[0] }} style={styles.itemImage} />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.productId?.name}</Text>
                                <Text style={styles.itemPrice}>Rs {item.productId?.price}</Text>
                            </View>
                            <View style={styles.quantityContainer}>
                                <Text style={styles.quantityText}>Quantity: {item?.quantity}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                {/* Delivery Address */}
                <Text style={styles.sectionTitle}>Delivery Address</Text>

                <View style={styles.addressContainer}>
                    {getSelectedAddress() && (
                        <TouchableOpacity
                            style={styles.addressContent}
                            onPress={() => setIsAddressExpanded(!isAddressExpanded)}
                        >
                            <Ionicons name="location" size={20} color="#6b7280" style={styles.locationIcon} />
                            <View style={styles.addressText}>
                                <Text style={styles.addressLabel}>
                                    {getSelectedAddress()?.addressLine1}, {getSelectedAddress()?.addressLine2}
                                </Text>
                                <Text style={styles.addressDetail}>
                                    {getSelectedAddress()?.city}, {getSelectedAddress()?.state}, {getSelectedAddress()?.country}, {getSelectedAddress()?.postalCode}
                                </Text>
                            </View>
                            <Ionicons
                                name={isAddressExpanded ? "chevron-up" : "chevron-down"}
                                size={20}
                                color="#6b7280"
                            />
                        </TouchableOpacity>
                    )}

                    {isAddressExpanded && selector?.addresses?.length > 1 && (
                        <View style={{ marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: isDarkMode ? '#374151' : '#e5e7eb' }}>
                            {selector?.addresses?.map((item, index) => (
                                <TouchableOpacity
                                    key={item._id}
                                    style={[styles.addressItem, index === selector.addresses.length - 1 && { borderBottomWidth: 0 }]}
                                    onPress={() => handleAddressSelect(item._id)}
                                >
                                    <View style={styles.radioButton}>
                                        {selectedAddressId === item._id && <View style={styles.radioButtonSelected} />}
                                    </View>
                                    <View style={styles.addressText}>
                                        <Text style={styles.addressLabel}>
                                            {item?.addressLine1}, {item?.addressLine2}
                                        </Text>
                                        <Text style={styles.addressDetail}>
                                            {item?.city}, {item?.state}, {item?.country}, {item?.postalCode}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <TouchableOpacity
                        style={styles.addAddressButton}
                        onPress={() => {
                            navigation.navigate('AddAddressScreen');
                        }}
                    >
                        <Ionicons name="add-circle-outline" size={20} color={App_Primary_color} />
                        <Text style={styles.addAddressText}>Add New Address</Text>
                    </TouchableOpacity>

                    {selector?.addresses?.length > 1 && (
                        <TouchableOpacity
                            style={styles.expandButton}
                            onPress={() => setIsAddressExpanded(!isAddressExpanded)}
                        >
                            <Text style={styles.expandText}>
                                {isAddressExpanded ? 'Show Less' : `View All ${selector.addresses.length} Addresses`}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

           

                {/* Bill Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Bill Details</Text>
                    <View style={styles.billContainer}>
                        <View style={styles.billRow}>
                            <Text style={styles.billLabel}>Subtotal</Text>
                            <Text style={styles.billAmount}>Rs {subtotal.toFixed(2)}</Text>
                        </View>
                        <View style={styles.billRow}>
                            <Text style={styles.billLabel}>Delivery Fee</Text>
                            <Text style={styles.billAmount}>Rs {deliveryFee.toFixed(2)}</Text>
                        </View>
                        <View style={styles.billRow}>
                            <Text style={styles.billLabel}>Tax & Other Fees</Text>
                            <Text style={styles.billAmount}>Rs {taxAndOtherFees.toFixed(2)}</Text>
                        </View>
                        {discount > 0 && (
                            <View style={styles.discountRow}>
                                <Text style={styles.billLabel}>Discount</Text>
                                <Text style={styles.discountAmount}>- Rs {discount.toFixed(2)}</Text>
                            </View>
                        )}
                        <View style={[styles.billRow, styles.totalRow]}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalAmount}>Rs. {total.toFixed(2)}</Text>
                        </View>
                    </View>

                    {/* Promo Code Section */}
                    {!appliedPromo ? (
                        <View style={styles.promoContainer}>
                            <TextInput
                                style={styles.promoInput}
                                placeholder="Enter Promo Code"
                                placeholderTextColor={isDarkMode ? '#9ca3af' : '#6b7280'}
                                value={promoCode}
                                onChangeText={setPromoCode}
                            />
                            <TouchableOpacity 
                                style={styles.applyButton}
                                onPress={applyPromo}
                            >
                                <Text style={styles.applyButtonText}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.appliedPromoCard}>
                            <View style={styles.appliedPromoContent}>
                                <Ionicons 
                                    name="checkmark-circle" 
                                    size={24} 
                                    color="#10b981" 
                                    style={styles.promoIcon} 
                                />
                                <View style={styles.appliedPromoText}>
                                    <Text style={styles.appliedPromoCode}>
                                        {appliedPromo?.code} Applied
                                    </Text>
                                    <Text style={styles.appliedPromoDesc}>
                                        You saved Rs {discount.toFixed(2)}!
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity 
                                style={styles.removePromoButton}
                                onPress={removePromo}
                            >
                                <Ionicons name="close-circle" size={24} color="#ef4444" />
                            </TouchableOpacity>
                        </View>
                    )}
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

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[
                        styles.confirmButton,
                        !selectedAddressId && { backgroundColor: '#9ca3af' }
                    ]}
                    onPress={() => orderPlace()}
                    disabled={!selectedAddressId}
                >
                    <Text style={styles.confirmButtonText}>Confirm Your Order</Text>
                </TouchableOpacity>
            </View>

            <OrderSuccessModal
                visible={showSuccessModal}
                onTrackOrder={handleTrackOrder}
                onBackToHome={handleBackToHome}
                isDarkMode={isDarkMode}
            />
        </SafeAreaView>
    );
};

export default CheckoutSummary;