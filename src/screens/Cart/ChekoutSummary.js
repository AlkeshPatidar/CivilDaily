// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     ScrollView,
//     TouchableOpacity,
//     Image,
//     StatusBar,
//     SafeAreaView,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { App_Primary_color, dark33, dark55, darkMode25, white } from '../../common/Colors/colors';
// import { FONTS_FAMILY } from '../../assets/Fonts';
// import { useSelector } from 'react-redux';
// import useLoader from '../../utils/LoaderHook';
// import { apiPost } from '../../utils/Apis';
// import { ToastMsg } from '../../utils/helperFunctions';

// const CheckoutSummary = ({ navigation, route }) => {
//     // console.log(route, '+++++++++++==');
//     let selector = useSelector(state => state?.user?.userData);
//     if (Object.keys(selector).length != 0) {
//         selector = JSON.parse(selector);
//     }


//     const { showLoader, hideLoader } = useLoader()

//     const [cartItems, setCartItems] = useState([
//         {
//             id: 1,
//             name: 'Fresh Pateto',
//             variant: '500 gr',
//             price: 20.99,
//             quantity: 1,
//             image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&h=100&fit=crop&crop=center',
//         },
//         {
//             id: 2,
//             name: 'Fresh Pateto',
//             variant: '250 gr',
//             price: 20.99,
//             quantity: 1,
//             image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&h=100&fit=crop&crop=center',
//         },
//     ]);

//     orderPlace
//     const orderPlace = async () => {
//         try {
//             showLoader()
//             const data = {
//                 "shippingAddress": {
//                     "fullName": "Rahul Sharma",
//                     "mobile": "9876543210",
//                     "addressLine1": "Flat No. 101, Green Residency",
//                     "addressLine2": "Near City Mall",
//                     "city": "Indore",
//                     "state": "Madhya Pradesh",
//                     "postalCode": "452001",
//                     "country": "India"
//                 },
//                 "paymentMethod": "cod"
//             }
//             const res = await apiPost('/api/order/place', data)
//             console.log('Res::::::', res);
//             hideLoader()
//             ToastMsg(res?.message)
//             navigation?.goBack()

//         } catch (error) {
//             hideLoader()
//         }
//     }

//     const [promoCode, setPromoCode] = useState('');

//     const updateQuantity = (id, increment) => {
//         setCartItems(items =>
//             items.map(item =>
//                 item.id === id
//                     ? { ...item, quantity: Math.max(1, item.quantity + (increment ? 1 : -1)) }
//                     : item
//             )
//         );
//     };

//     const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//     const deliveryFee = 6.00;
//     const taxAndOtherFees = 2.50;
//     const total = subtotal + deliveryFee + taxAndOtherFees;



//     const { isDarkMode } = useSelector(state => state.theme)
//     const styles = StyleSheet.create({
//         container: {
//             flex: 1,
//             backgroundColor: isDarkMode ? darkMode25 : '#f9fafb',
//         },
//         header: {
//             backgroundColor: App_Primary_color,
//             paddingHorizontal: 16,
//             paddingVertical: 16,
//             flexDirection: 'row',
//             alignItems: 'center',
//         },
//         backButton: {
//             marginRight: 16,
//         },
//         headerTitle: {
//             color: 'white',
//             fontSize: 18,
//             fontWeight: '600',
//         },
//         content: {
//             flex: 1,
//             paddingHorizontal: 16,
//         },
//         section: {
//             marginTop: 14,
//         },
//         sectionTitle: {
//             fontSize: 18,
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//             color: isDarkMode ? white : '#111827',
//             // marginBottom: 16,
//             marginTop: 20
//         },
//         addressContainer: {
//             backgroundColor: isDarkMode ? dark33 : 'white',
//             borderRadius: 12,
//             padding: 16,
//             elevation: 2,
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 1 },
//             shadowOpacity: 0.1,
//             shadowRadius: 2,
//         },
//         addressContent: {
//             flexDirection: 'row',
//             alignItems: 'center',
//         },
//         locationIcon: {
//             marginRight: 12,
//         },
//         addressText: {
//             flex: 1,
//         },
//         addressLabel: {
//             fontSize: 16,
//             fontWeight: '600',
//             color: isDarkMode ? 'white' : '#111827',
//             marginBottom: 4,
//         },
//         addressDetail: {
//             fontSize: 14,
//             color: isDarkMode ? 'white' : '#6b7280',
//         },
//         cartItem: {
//             backgroundColor: isDarkMode ? darkMode25 : '#F8F8F8',
//             borderRadius: 12,
//             padding: 16,
//             marginBottom: 12,
//             flexDirection: 'row',
//             alignItems: 'center',
//             elevation: 2,
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 1 },
//             shadowOpacity: 0.1,
//             shadowRadius: 2,
//         },
//         itemImage: {
//             width: 60,
//             height: 60,
//             borderRadius: 8,
//             marginRight: 12,
//         },
//         itemDetails: {
//             flex: 1,
//         },
//         itemName: {
//             fontSize: 14,
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//             color: isDarkMode ? 'white' : '#111827',
//             marginBottom: 4,
//         },
//         itemVariant: {
//             fontSize: 14,
//             color: isDarkMode ? 'white' : '#6b7280',
//             marginBottom: 4,
//         },
//         itemPrice: {
//             fontSize: 16,
//             fontWeight: '700',
//             color: isDarkMode ? 'white' : '#111827',
//         },
//         quantityContainer: {
//             flexDirection: 'row',
//             alignItems: 'center',
//         },
//         quantityButton: {
//             backgroundColor: App_Primary_color,
//             width: 32,
//             height: 32,
//             borderRadius: 16,
//             justifyContent: 'center',
//             alignItems: 'center',
//         },
//         quantityText: {
//             marginHorizontal: 16,
//             fontSize: 16,
//             color: isDarkMode ? 'white' : '#111827',
//         },
//         billContainer: {
//             backgroundColor: isDarkMode ? dark33 : 'white',
//             borderRadius: 12,
//             padding: 16,
//             elevation: 2,
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 1 },
//             shadowOpacity: 0.1,
//             shadowRadius: 2,
//         },
//         billRow: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: 12,
//         },
//         billLabel: {
//             fontSize: 14,
//             color: isDarkMode ? white : '#6b7280',
//         },
//         billAmount: {
//             fontSize: 14,
//             fontWeight: '600',
//             color: isDarkMode ? white : '#111827',
//         },
//         totalRow: {
//             borderTopWidth: 1,
//             borderTopColor: '#e5e7eb',
//             paddingTop: 12,
//             marginTop: 8,
//             marginBottom: 0,
//         },
//         totalLabel: {
//             fontSize: 16,
//             fontWeight: '700',
//             color: isDarkMode ? white : '#111827',
//         },
//         totalAmount: {
//             fontSize: 16,
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//             color: isDarkMode ? white : '#111827',
//         },
//         promoContainer: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             backgroundColor: isDarkMode ? dark33 : 'white',
//             borderRadius: 12,
//             padding: 16,
//             marginTop: 12,
//             elevation: 2,
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 1 },
//             shadowOpacity: 0.1,
//             shadowRadius: 2,
//         },
//         promoText: {
//             fontSize: 14,
//             color: isDarkMode ? white : '#6b7280',
//         },
//         applyButton: {
//             backgroundColor: App_Primary_color,
//             paddingHorizontal: 20,
//             paddingVertical: 8,
//             borderRadius: 20,
//         },
//         applyButtonText: {
//             color: 'white',
//             fontSize: 14,
//             fontWeight: '600',
//         },
//         paymentContainer: {
//             backgroundColor: isDarkMode ? dark33 : 'white',
//             borderRadius: 12,
//             padding: 16,
//             elevation: 2,
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 1 },
//             shadowOpacity: 0.1,
//             shadowRadius: 2,
//         },
//         paymentContent: {
//             flexDirection: 'row',
//             alignItems: 'center',
//         },
//         paymentIcon: {
//             marginRight: 12,
//         },
//         paymentText: {
//             flex: 1,
//             fontSize: 16,
//             color: isDarkMode ? white : '#111827',
//         },
//         footer: {
//             padding: 16,
//             backgroundColor: isDarkMode ? dark55 : 'white',
//             borderTopWidth: 1,
//             borderTopColor: '#e5e7eb',
//         },
//         confirmButton: {
//             backgroundColor: App_Primary_color,
//             borderRadius: 25,
//             paddingVertical: 16,
//             alignItems: 'center',
//         },
//         confirmButtonText: {
//             color: 'white',
//             fontSize: 14,
//             fontWeight: '600',
//         },
//     });

//     return (
//         <SafeAreaView style={styles.container}>
//             <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />

//             {/* Header */}
//             <View style={styles.header}>
//                 <TouchableOpacity style={styles.backButton}
//                     onPress={() => navigation.goBack()}
//                 >
//                     <Ionicons name="chevron-back" size={24} color="white" />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Checkout Summary</Text>
//             </View>

//             <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//                 {/* Delivery Address */}
//                 <Text style={styles.sectionTitle}>Delivery Address</Text>
//                 {selector?.addresses?.map((item, index) => {
//                     return (
//                         <View style={styles.section}>
//                             <TouchableOpacity style={styles.addressContainer}>
//                                 <View style={styles.addressContent}>
//                                     <Ionicons name="location" size={20} color="#6b7280" style={styles.locationIcon} />
//                                     <View style={styles.addressText}>
//                                         <Text style={styles.addressLabel}>{item?.addressLine1},{item?.addressLine2}</Text>
//                                         <Text style={styles.addressDetail}>{item?.city},{item?.state},{item?.country},{item?.postalCode}</Text>
//                                     </View>
//                                     <Ionicons name="chevron-forward" size={20} color="#6b7280" />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                     )
//                 })
//                 }

//                 {/* Products in Cart */}
//                 <View style={styles.section}>
//                     <Text style={styles.sectionTitle}>Products in Cart</Text>
//                     {route?.params?.cartData?.items?.map((item) => (
//                         <View key={item.id} style={styles.cartItem}>
//                             <Image source={{ uri: item.productId?.images[0] }} style={styles.itemImage} />
//                             <View style={styles.itemDetails}>
//                                 <Text style={styles.itemName}>{item.productId?.name}</Text>
//                                 {/* <Text style={styles.itemVariant}>Variant, {item.variant}</Text> */}
//                                 <Text style={styles.itemPrice}>${item.productId?.price}</Text>
//                             </View>
//                             <View style={styles.quantityContainer}>
//                                 {/* <TouchableOpacity
//                                     style={styles.quantityButton}
//                                     onPress={() => updateQuantity(item.id, false)}
//                                 >
//                                     <Ionicons name="remove" size={16} color="white" />
//                                 </TouchableOpacity> */}
//                                 <Text style={styles.quantityText}>Quantity: {item?.quantity}</Text>
//                                 {/* <TouchableOpacity
//                                     style={styles.quantityButton}
//                                     onPress={() => updateQuantity(item.id, true)}
//                                 >
//                                     <Ionicons name="add" size={16} color="white" />
//                                 </TouchableOpacity> */}
//                             </View>
//                         </View>
//                     ))}
//                 </View>

//                 {/* Bill Details */}
//                 <View style={styles.section}>
//                     <Text style={styles.sectionTitle}>Bill Details</Text>
//                     <View style={styles.billContainer}>
//                         <View style={styles.billRow}>
//                             <Text style={styles.billLabel}>Subtotal</Text>
//                             <Text style={styles.billAmount}>${subtotal.toFixed(2)}</Text>
//                         </View>
//                         <View style={styles.billRow}>
//                             <Text style={styles.billLabel}>Delivery Fee</Text>
//                             <Text style={styles.billAmount}>${deliveryFee.toFixed(2)}</Text>
//                         </View>
//                         <View style={styles.billRow}>
//                             <Text style={styles.billLabel}>Tax & Other Fees</Text>
//                             <Text style={styles.billAmount}>${taxAndOtherFees.toFixed(2)}</Text>
//                         </View>
//                         <View style={[styles.billRow, styles.totalRow]}>
//                             <Text style={styles.totalLabel}>Total</Text>
//                             <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
//                         </View>
//                     </View>

//                     {/* Promo Code */}
//                     <View style={styles.promoContainer}>
//                         <Text style={styles.promoText}>Add Promo</Text>
//                         <TouchableOpacity style={styles.applyButton}>
//                             <Text style={styles.applyButtonText}>Apply</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 {/* Payment Method */}
//                 <View style={styles.section}>
//                     <Text style={styles.sectionTitle}>Payment Method</Text>
//                     <TouchableOpacity style={styles.paymentContainer}>
//                         <View style={styles.paymentContent}>
//                             <Ionicons name="card" size={20} color="#6b7280" style={styles.paymentIcon} />
//                             <Text style={styles.paymentText}>View Payment Method</Text>
//                             <Ionicons name="chevron-forward" size={20} color="#6b7280" />
//                         </View>
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>

//             {/* Confirm Order Button */}
//             <View style={styles.footer}>
//                 <TouchableOpacity style={styles.confirmButton}
//                     // onPress={()=>navigation.navigate('PaymentMethodScreen')}
//                     onPress={() => orderPlace()}
//                 >
//                     <Text style={styles.confirmButtonText}>Confirm Your Order</Text>
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     );
// };



// export default CheckoutSummary;


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
import useLoader from '../../utils/LoaderHook';
import { apiPost } from '../../utils/Apis';
import { ToastMsg } from '../../utils/helperFunctions';

const CheckoutSummary = ({ navigation, route }) => {
    let selector = useSelector(state => state?.user?.userData);
    if (Object.keys(selector).length != 0) {
        selector = JSON.parse(selector);
    }

    const { showLoader, hideLoader } = useLoader();

    // State for address management
    const [selectedAddressId, setSelectedAddressId] = useState(
        selector?.addresses?.find(addr => addr.isDefault)?._id || selector?.addresses?.[0]?._id || null
    );
    const [isAddressExpanded, setIsAddressExpanded] = useState(false);

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

    const orderPlace = async () => {
        try {
            showLoader();
            
            // Get selected address
            const selectedAddress = selector?.addresses?.find(addr => addr._id === selectedAddressId);
            
            if (!selectedAddress) {
                ToastMsg('Please select a delivery address');
                hideLoader();
                return;
            }

            const data = {
                "shippingAddress": {
                    "fullName": selector?.name || "User", // You can add fullName field to your user data
                    "mobile": selector?.mobile || selector?.phone || "", // Adjust field name as per your user data
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
            console.log('Res::::::', res);
            hideLoader();
            ToastMsg(res?.message);
            navigation?.goBack();

        } catch (error) {
            hideLoader();
            console.log('Order place error:', error);
        }
    };

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

    // Get selected address for display
    const getSelectedAddress = () => {
        return selector?.addresses?.find(addr => addr._id === selectedAddressId);
    };

    // Handle address selection
    const handleAddressSelect = (addressId) => {
        setSelectedAddressId(addressId);
        setIsAddressExpanded(false);
    };

    const { isDarkMode } = useSelector(state => state.theme);

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
            fontSize: 18,
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
            fontSize: 16,
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
            fontSize: 16,
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
        promoText: {
            fontSize: 14,
            color: isDarkMode ? white : '#6b7280',
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

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout Summary</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Delivery Address */}
                <Text style={styles.sectionTitle}>Delivery Address</Text>
                
                <View style={styles.addressContainer}>
                    {/* Selected Address Display */}
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

                    {/* Expanded Address List */}
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

                    {/* Add New Address Button */}
                    <TouchableOpacity 
                        style={styles.addAddressButton}
                        onPress={() => {
                            // Navigate to add address screen
                            navigation.navigate('AddAddressScreen');
                            console.log('Navigate to add address screen');
                        }}
                    >
                        <Ionicons name="add-circle-outline" size={20} color={App_Primary_color} />
                        <Text style={styles.addAddressText}>Add New Address</Text>
                    </TouchableOpacity>

                    {/* Expand/Collapse Button (only show if more than 1 address) */}
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

                {/* Products in Cart */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Products in Cart</Text>
                    {route?.params?.cartData?.items?.map((item) => (
                        <View key={item.id} style={styles.cartItem}>
                            <Image source={{ uri: item.productId?.images[0] }} style={styles.itemImage} />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.productId?.name}</Text>
                                <Text style={styles.itemPrice}>${item.productId?.price}</Text>
                            </View>
                            <View style={styles.quantityContainer}>
                                <Text style={styles.quantityText}>Quantity: {item?.quantity}</Text>
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
        </SafeAreaView>
    );
};

export default CheckoutSummary;