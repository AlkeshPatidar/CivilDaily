// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, StyleSheet, Alert, ToastAndroid } from 'react-native';
// import IMG from '../../assets/Images';
// import { FONTS_FAMILY } from '../../assets/Fonts';
// import { App_Primary_color, dark33, darkMode25 } from '../../common/Colors/colors';
// import { BackWhite } from '../../assets/SVGs';
// import { useSelector } from 'react-redux';
// import useLoader from '../../utils/LoaderHook';
// import { apiDelete, apiGet } from '../../utils/Apis';
// import urls from '../../config/urls';
// import Row from '../../components/wrapper/row';
// import AntDesign from 'react-native-vector-icons/AntDesign'
// import SpaceBetweenRow from '../../components/wrapper/spacebetween';
// import { useIsFocused } from '@react-navigation/native';

// const CartScreen = ({ navigation }) => {
//     const [activeTab, setActiveTab] = useState('My Cart');
//     const [cartData, setCartData] = useState(null);
//     // const [loading, setLoading] = useState(true);
//     const { showLoader, hideLoader } = useLoader()

//     const isFocused = useIsFocused()

//     // Static data for current and previous orders (as requested)
//     const currentOrders = [
//         {
//             id: "1",
//             orderNumber: "#2019362",
//             status: "On Progress",
//             total: 18.99,
//             items: 2,
//             date: "2025-09-20",
//             image: IMG.Potato,
//             productName: "Fresh Pateto"
//         }
//     ];

//     const previousOrders = [
//         // Empty for now as requested
//     ];

//     useEffect(() => {
//         fetchCartData();

//     }, [isFocused]);

//     useEffect(() => {
//         fetchCurrentAndPrevious()
//     }, [
//         activeTab
//     ])

//     const fetchCartData = async () => {
//         try {

//             showLoader()
//             const res = await apiGet('/api/order/my?orderType=previous')
//             console.log(res?.data);
//             // alert (0)
//             // setCartData(res?.data)
//             hideLoader()
//         } catch (error) {
//             console.error('Error fetching cart data:', error);
//             hideLoader()
//         }
//     };

//     const fetchCurrentAndPrevious = async () => {
//         try {

//             showLoader()
//             const res = await apiGet(urls?.getCartData)
//             // console.log(res?.data);
//             // alert (0)
//             setCartData(res?.data)
//             hideLoader()
//         } catch (error) {
//             console.error('Error fetching cart data:', error);
//             hideLoader()
//         }
//     };

//     const deleteCartCarta = async (id) => {
//         try {

//             showLoader()
//             const res = await apiDelete(`${urls?.deleteCartData}/${id}`)
//             // console.log('++++++++++++++++++++++++++++++????????????',res);
//             // setCartData(res?.data)
//             fetchCartData()
//             hideLoader()
//         } catch (error) {
//             console.error('Error fetching cart data:', error);
//             hideLoader()
//         }
//     };



//     const updateQuantity = async (itemId, newQuantity, stock) => {
//         if (newQuantity < 1) {
//             // Show confirmation for removal
//             Alert.alert(
//                 "Remove Item",
//                 "Are you sure you want to remove this item from cart?",
//                 [
//                     { text: "Cancel", style: "cancel" },
//                     { text: "Remove", onPress: () => removeFromCart(itemId) }
//                 ]
//             );
//             return;
//         }

//         if (newQuantity > stock) {
//             Alert.alert("Stock Limit", `Only ${stock} items available in stock`);
//             return;
//         }

//         // Update local state immediately for better UX
//         setCartData(prevCart => ({
//             ...prevCart,
//             items: prevCart.items.map(item =>
//                 item._id === itemId
//                     ? { ...item, quantity: newQuantity }
//                     : item
//             )
//         }));

//         // Here you would make API call to update quantity
//         try {
//             // await updateCartItemQuantity(itemId, newQuantity);
//             console.log(`Updating item ${itemId} to quantity ${newQuantity}`);
//         } catch (error) {
//             console.error('Error updating quantity:', error);
//             // Revert on error
//             fetchCartData();
//         }
//     };

//     const removeFromCart = async (itemId) => {
//         // Update local state
//         setCartData(prevCart => ({
//             ...prevCart,
//             items: prevCart.items.filter(item => item._id !== itemId)
//         }));

//         // Here you would make API call to remove item
//         try {
//             // await removeCartItem(itemId);
//             console.log(`Removing item ${itemId} from cart`);
//         } catch (error) {
//             console.error('Error removing item:', error);
//             // Revert on error
//             fetchCartData();
//         }
//     };

//     const renderMyCartContent = () => {
//         // if (loading) {
//         //     return (
//         //         <View style={styles.emptyContainer}>
//         //             <Text style={styles.emptyText}>Loading cart...</Text>
//         //         </View>
//         //     );
//         // }

//         if (!cartData || !cartData.items || cartData.items.length === 0) {
//             return (
//                 <View style={styles.emptyContainer}>
//                     <Text style={styles.emptyText}>No items in cart</Text>
//                 </View>
//             );
//         }

//         return (
//             <View style={styles.cartContainer}>
//                 {/* Cart Header */}
//                 <View style={styles.cartHeader}>
//                     <Text style={styles.cartTitle}>• Cart Items ({cartData.items.length})</Text>
//                     <Row style={{
//                         gap: 15
//                     }}>
//                         <View style={styles.checkIcon}>
//                             <Text style={styles.checkMark}>✓</Text>
//                         </View>

//                     </Row>
//                 </View>

//                 {/* Store Info */}
//                 {/* <View style={styles.storeSection}>
//                     <Text style={styles.sectionTitle}>Store</Text>
//                     <Text style={styles.storeName}>Nippon Mart</Text>
//                 </View> */}

//                 {/* Product Summary */}
//                 <View style={styles.productSection}>
//                     <Text style={styles.sectionTitle}>Product Summary</Text>

//                     {cartData.items.map((item, index) => (
//                         <View key={item._id} style={styles.productItem}>
//                             <Image
//                                 source={{ uri: item.productId.images[0] }}
//                                 style={styles.productImage}
//                                 defaultSource={IMG.Potato}
//                             />
//                             <View style={styles.productDetails}>
//                                 <Text style={styles.productName}>{item.productId.name}</Text>
//                                 <Text style={styles.productVariant}>SKU: {item.productId.sku}</Text>
//                                 <View style={styles.priceContainer}>
//                                     <Text style={styles.productPrice}>
//                                         ${(item.productId.price - item.productId.discountPrice).toFixed(2)}
//                                     </Text>
//                                     {item.productId.discountPrice > 0 && (
//                                         <Text style={styles.originalPrice}>
//                                             ${item.productId.price.toFixed(2)}
//                                         </Text>
//                                     )}
//                                 </View>
//                                 <SpaceBetweenRow style={{ gap: 80 }}>
//                                     <Text style={styles.stockText}>
//                                         Stock: {item.productId.stock}
//                                     </Text>
//                                     {/* Cart Total */}
//                                     <TouchableOpacity
//                                         onPress={() => deleteCartCarta(item?.productId?._id)}
//                                         style={{ left: 30 }}
//                                     >
//                                         <AntDesign name='delete'
//                                             color='red'
//                                             size={20}

//                                         />
//                                     </TouchableOpacity>

//                                 </SpaceBetweenRow>
//                             </View>
//                             <View style={styles.quantityContainer}>
//                                 <TouchableOpacity
//                                     style={styles.quantityButton}
//                                     onPress={() => updateQuantity(item._id, item.quantity - 1, item.productId.stock)}
//                                 >
//                                     <Text style={styles.quantityButtonText}>−</Text>
//                                 </TouchableOpacity>
//                                 <Text style={styles.quantityText}>{item.quantity}</Text>
//                                 <TouchableOpacity
//                                     style={styles.quantityButton}
//                                     onPress={() => updateQuantity(item._id, item.quantity + 1, item.productId.stock)}
//                                 >
//                                     <Text style={styles.quantityButtonText}>+</Text>
//                                 </TouchableOpacity>

//                             </View>

//                         </View>
//                     ))}
//                 </View>


//                 <View style={styles.totalSection}>
//                     <Text style={styles.totalText}>
//                         Total: ${cartData.items.reduce((total, item) =>
//                             total + ((item.productId.price - item.productId.discountPrice) * item.quantity), 0
//                         ).toFixed(2)}
//                     </Text>
//                 </View>
//             </View>
//         );
//     };

//     const renderCurrentOrderContent = () => (
//         <View>
//             {currentOrders.map((order) => (
//                 <View key={order.id} style={styles.currentOrderCard}>
//                     <View style={styles.orderHeader}>
//                         <Image source={order.image} style={styles.orderImage} />
//                         <View style={styles.orderInfo}>
//                             <Text style={styles.orderTitle}>{order.productName}</Text>
//                             <Text style={styles.orderId}>{order.orderNumber}</Text>
//                         </View>
//                         <View style={styles.statusBadge}>
//                             <View style={styles.statusDot} />
//                             <Text style={styles.statusText}>{order.status}</Text>
//                         </View>
//                     </View>

//                     <View style={styles.orderFooter}>
//                         <View style={styles.orderPricing}>
//                             <Text style={styles.orderPrice}>${order.total}</Text>
//                             <Text style={styles.orderItems}> • {order.items} Items</Text>
//                         </View>
//                         <TouchableOpacity
//                             style={styles.trackOrderButton}
//                             onPress={() => navigation.navigate('OrderTrackingScreen')}
//                         >
//                             <Text style={styles.trackOrderText}>Track Order</Text>
//                             <Text style={styles.chevron}>›</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             ))}
//         </View>
//     );

//     const renderPreviousOrderContent = () => (
//         <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>No previous orders found</Text>
//         </View>
//     );

//     const renderContent = () => {
//         switch (activeTab) {
//             case 'My Cart':
//                 return renderMyCartContent();
//             case 'Current Order':
//                 return renderCurrentOrderContent();
//             case 'Previous Order':
//                 return renderPreviousOrderContent();
//             default:
//                 return renderMyCartContent();
//         }
//     };

//     const { isDarkMode } = useSelector(state => state.theme);

//     const styles = StyleSheet.create({
//         container: {
//             flex: 1,
//             backgroundColor: isDarkMode ? darkMode25 : 'white',
//         },
//         header: {
//             backgroundColor: App_Primary_color,
//             height: 90,
//             flexDirection: 'row',
//             alignItems: 'flex-end',
//             paddingBottom: 15,
//             paddingHorizontal: 20,
//         },
//         backButton: {
//             width: 30,
//             bottom: 9
//         },
//         backIcon: {
//             color: 'white',
//         },
//         headerTitle: {
//             color: 'white',
//             fontSize: 22,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             marginLeft: 10,
//         },
//         headerRight: {
//             width: 30,
//         },
//         tabContainer: {
//             backgroundColor: isDarkMode ? darkMode25 : 'white',
//             flexDirection: 'row',
//             paddingHorizontal: 20,
//             paddingVertical: 15,
//         },
//         tab: {
//             marginRight: 25,
//             paddingBottom: 8,
//         },
//         activeTab: {
//             borderBottomWidth: 3,
//             borderBottomColor: '#5A6ACF',
//         },
//         tabText: {
//             fontSize: 16,
//             color: '#999',
//             fontFamily: FONTS_FAMILY.Poppins_Medium
//         },
//         activeTabText: {
//             color: isDarkMode ? 'white' : '#333',
//             fontFamily: FONTS_FAMILY.Poppins_Medium
//         },
//         content: {
//             flex: 1,
//             padding: 20,
//         },
//         cartContainer: {
//             backgroundColor: isDarkMode ? dark33 : 'white',
//             borderRadius: 12,
//             padding: 20,
//             marginBottom: 20,
//             shadowColor: '#000',
//             shadowOffset: {
//                 width: 0,
//                 height: 1,
//             },
//             shadowOpacity: 0.05,
//             shadowRadius: 3,
//             borderWidth: 1,
//             borderColor: '#CCCCCC'
//         },
//         cartHeader: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             paddingBottom: 15,
//             borderBottomWidth: 1,
//             borderBottomColor: '#E0E0E0',
//             marginBottom: 20,
//         },
//         cartTitle: {
//             fontSize: 16,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             color: isDarkMode ? 'white' : '#333',
//         },
//         checkIcon: {
//             backgroundColor: '#4CAF50',
//             width: 24,
//             height: 24,
//             borderRadius: 4,
//             justifyContent: 'center',
//             alignItems: 'center',
//         },
//         checkMark: {
//             color: 'white',
//             fontSize: 14,
//             fontWeight: 'bold',
//         },
//         storeSection: {
//             marginBottom: 20,
//         },
//         sectionTitle: {
//             fontSize: 14,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             color: isDarkMode ? 'white' : '#333',
//             marginBottom: 5,
//         },
//         storeName: {
//             fontSize: 15,
//             color: isDarkMode ? 'white' : '#888',
//         },
//         productSection: {
//             marginBottom: 20,
//         },
//         productItem: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginBottom: 15,
//             paddingBottom: 15,
//             borderBottomWidth: 1,
//             borderBottomColor: '#F0F0F0',
//         },
//         productImage: {
//             width: 95,
//             height: 80,
//             borderRadius: 8,
//             marginRight: 15,
//         },
//         productDetails: {
//             flex: 1,
//         },
//         productName: {
//             fontSize: 16,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             color: isDarkMode ? 'white' : '#333',
//             marginBottom: 4,
//             width: 100
//         },
//         productVariant: {
//             fontSize: 12,
//             color: isDarkMode ? '#ccc' : '#888',
//             marginBottom: 6,
//         },
//         priceContainer: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginBottom: 4,
//         },
//         productPrice: {
//             fontSize: 16,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             color: App_Primary_color,
//             marginRight: 8,
//         },
//         originalPrice: {
//             fontSize: 14,
//             color: '#888',
//             textDecorationLine: 'line-through',
//         },
//         stockText: {
//             fontSize: 12,
//             color: isDarkMode ? '#ccc' : '#666',
//         },
//         quantityContainer: {
//             flexDirection: 'row',
//             alignItems: 'center',
//         },
//         quantityButton: {
//             backgroundColor: App_Primary_color,
//             width: 30,
//             height: 30,
//             borderRadius: 15,
//             justifyContent: 'center',
//             alignItems: 'center',
//         },
//         quantityButtonText: {
//             fontSize: 18,
//             color: 'white',
//             fontWeight: '600',
//         },
//         quantityText: {
//             fontSize: 16,
//             fontWeight: '600',
//             color: isDarkMode ? 'white' : '#333',
//             marginHorizontal: 15,
//             minWidth: 25,
//             textAlign: 'center',
//         },
//         totalSection: {
//             borderTopWidth: 1,
//             borderTopColor: '#E0E0E0',
//             paddingTop: 15,
//             alignItems: 'flex-end',
//         },
//         totalText: {
//             fontSize: 18,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             color: isDarkMode ? 'white' : '#333',
//         },
//         // Current Order Styles
//         currentOrderCard: {
//             backgroundColor: isDarkMode ? dark33 : 'white',
//             borderRadius: 12,
//             padding: 16,
//             marginBottom: 16,
//             shadowColor: '#000',
//             shadowOffset: {
//                 width: 0,
//                 height: 1,
//             },
//             shadowOpacity: 0.05,
//             shadowRadius: 3,
//             borderWidth: 1,
//             borderColor: '#CCCCCC',
//         },
//         orderHeader: {
//             flexDirection: 'row',
//             marginBottom: 16,
//         },
//         orderImage: {
//             width: 60,
//             height: 60,
//             borderRadius: 8,
//             marginRight: 12,
//         },
//         orderInfo: {
//             flex: 1,
//             justifyContent: 'center',
//         },
//         orderTitle: {
//             fontSize: 16,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             color: isDarkMode ? 'white' : '#333',
//             marginBottom: 2,
//         },
//         orderId: {
//             fontSize: 14,
//             color: isDarkMode ? 'white' : '#333',
//             fontWeight: '500',
//             marginBottom: 4,
//         },
//         statusBadge: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             paddingHorizontal: 8,
//             paddingVertical: 4,
//             borderRadius: 12,
//             borderWidth: 1,
//             borderColor: '#FF9500',
//             height: 24,
//         },
//         statusDot: {
//             width: 6,
//             height: 6,
//             borderRadius: 3,
//             backgroundColor: '#FF9500',
//             marginRight: 6,
//         },
//         statusText: {
//             fontSize: 12,
//             fontWeight: '500',
//             color: '#FF9500',
//         },
//         orderFooter: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//         },
//         orderPricing: {
//             flexDirection: 'row',
//             alignItems: 'center',
//         },
//         orderPrice: {
//             fontSize: 16,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             color: isDarkMode ? 'white' : '#333',
//         },
//         orderItems: {
//             fontSize: 14,
//             color: isDarkMode ? 'white' : 'black',
//             fontFamily: FONTS_FAMILY.Poppins_Regular
//         },
//         trackOrderButton: {
//             flexDirection: 'row',
//             alignItems: 'center',
//         },
//         trackOrderText: {
//             fontSize: 14,
//             color: isDarkMode ? 'white' : '#888',
//             marginRight: 4,
//             fontFamily: FONTS_FAMILY.Poppins_Medium
//         },
//         chevron: {
//             fontSize: 16,
//             color: '#888',
//             fontWeight: '300',
//             bottom: 3
//         },
//         // Empty state
//         emptyContainer: {
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             paddingVertical: 60,
//         },
//         emptyText: {
//             fontSize: 16,
//             color: isDarkMode ? 'white' : '#888',
//             textAlign: 'center',
//         },
//         checkoutContainer: {
//             backgroundColor: isDarkMode ? darkMode25 : 'white',
//             paddingHorizontal: 20,
//             paddingVertical: 20,
//             paddingBottom: 35,
//         },
//         checkoutButton: {
//             backgroundColor: App_Primary_color,
//             height: 56,
//             borderRadius: 28,
//             justifyContent: 'center',
//             alignItems: 'center',
//         },
//         checkoutText: {
//             color: 'white',
//             fontSize: 16,
//             fontWeight: '600',
//         },
//     });

//     const hasCartItems = cartData && cartData.items && cartData.items.length > 0;

//     return (
//         <View style={styles.container}>
//             <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />

//             {/* Header */}
//             <View style={styles.header}>
//                 <TouchableOpacity style={styles.backButton}
//                     onPress={() => navigation.goBack()}
//                 >
//                     <BackWhite />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Cart</Text>
//                 <View style={styles.headerRight} />
//             </View>

//             {/* Tab Navigation */}
//             <View style={styles.tabContainer}>
//                 <TouchableOpacity
//                     style={[styles.tab, activeTab === 'My Cart' && styles.activeTab]}
//                     onPress={() => setActiveTab('My Cart')}
//                 >
//                     <Text style={[styles.tabText, activeTab === 'My Cart' && styles.activeTabText]}>My Cart</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={[styles.tab, activeTab === 'Current Order' && styles.activeTab]}
//                     onPress={() => setActiveTab('Current Order')}
//                 >
//                     <Text style={[styles.tabText, activeTab === 'Current Order' && styles.activeTabText]}>Current Order</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={[styles.tab, activeTab === 'Previous Order' && styles.activeTab]}
//                     onPress={() => setActiveTab('Previous Order')}
//                 >
//                     <Text style={[styles.tabText, activeTab === 'Previous Order' && styles.activeTabText]}>Previous Order</Text>
//                 </TouchableOpacity>
//             </View>

//             <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//                 {renderContent()}
//             </ScrollView>

//             {/* Checkout Button - Only show for My Cart tab with items */}
//             {activeTab === 'My Cart' && hasCartItems && (
//                 <View style={styles.checkoutContainer}>
//                     <TouchableOpacity style={styles.checkoutButton}
//                         onPress={() => navigation.navigate('CheckoutSummary', { cartData: cartData })}
//                     >
//                         <Text style={styles.checkoutText}>Checkout</Text>
//                     </TouchableOpacity>
//                 </View>
//             )}
//         </View>
//     );
// };

// export default CartScreen;



import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, StyleSheet, Alert } from 'react-native';
import IMG from '../../assets/Images';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { App_Primary_color, dark33, darkMode25 } from '../../common/Colors/colors';
import { BackWhite } from '../../assets/SVGs';
import { useSelector } from 'react-redux';
import useLoader from '../../utils/LoaderHook';
import { apiDelete, apiGet } from '../../utils/Apis';
import urls from '../../config/urls';
import Row from '../../components/wrapper/row';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SpaceBetweenRow from '../../components/wrapper/spacebetween';
import { useIsFocused } from '@react-navigation/native';
import CartScreenSkeletonLoader from '../../components/Skeleton/CartScreenSkeletonLoader';


const CartScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('My Cart');
    const [cartData, setCartData] = useState(null);
    const [currentOrders, setCurrentOrders] = useState([]);
    const [previousOrders, setPreviousOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { showLoader, hideLoader } = useLoader();

    const isFocused = useIsFocused();
    const { isDarkMode } = useSelector(state => state.theme);

    useEffect(() => {
        if (isFocused) {
            loadData();
        }
    }, [isFocused, activeTab]);

    const loadData = async () => {
        setIsLoading(true);
        if (activeTab === 'My Cart') {
            await fetchCartData();
        } else {
            await fetchCurrentAndPrevious();
        }
        setIsLoading(false);
    };

    const fetchCartData = async () => {
        try {
            const res = await apiGet(urls?.getCartData);
            setCartData(res?.data || null);
        } catch (error) {
            console.error('Error fetching cart data:', error);
            setCartData(null);
        }
    };

    const fetchCurrentAndPrevious = async () => {
        try {
            const orderType = activeTab === 'Current Order' ? 'current' : 'previous';
            const res = await apiGet(`/api/order/my?orderType=${orderType}`);
            
            if (activeTab === 'Current Order') {
                setCurrentOrders(res?.data || []);
            } else if (activeTab === 'Previous Order') {
                setPreviousOrders(res?.data || []);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            if (activeTab === 'Current Order') {
                setCurrentOrders([]);
            } else {
                setPreviousOrders([]);
            }
        }
    };

    const deleteCartCarta = async (id) => {
        try {
            showLoader();
            const res = await apiDelete(`${urls?.deleteCartData}/${id}`);
            await fetchCartData();
            hideLoader();
        } catch (error) {
            console.error('Error deleting cart item:', error);
            hideLoader();
        }
    };

    const updateQuantity = async (itemId, newQuantity, stock) => {
        if (newQuantity < 1) {
            Alert.alert(
                "Remove Item",
                "Are you sure you want to remove this item from cart?",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Remove", onPress: () => removeFromCart(itemId) }
                ]
            );
            return;
        }

        if (newQuantity > stock) {
            Alert.alert("Stock Limit", `Only ${stock} items available in stock`);
            return;
        }

        setCartData(prevCart => ({
            ...prevCart,
            items: prevCart.items.map(item =>
                item._id === itemId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        }));

        try {
            console.log(`Updating item ${itemId} to quantity ${newQuantity}`);
        } catch (error) {
            console.error('Error updating quantity:', error);
            fetchCartData();
        }
    };

    const removeFromCart = async (itemId) => {
        setCartData(prevCart => ({
            ...prevCart,
            items: prevCart.items.filter(item => item._id !== itemId)
        }));

        try {
            console.log(`Removing item ${itemId} from cart`);
        } catch (error) {
            console.error('Error removing item:', error);
            fetchCartData();
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered':
                return '#4CAF50';
            case 'cancelled':
                return '#F44336';
            case 'pending':
                return '#FF9500';
            case 'on progress':
                return '#2196F3';
            default:
                return '#FF9500';
        }
    };

    const renderMyCartContent = () => {
        if (!cartData || !cartData.items || cartData.items.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No items in cart</Text>
                </View>
            );
        }

        return (
            <View style={styles.cartContainer}>
                <View style={styles.cartHeader}>
                    <Text style={styles.cartTitle}>• Cart Items ({cartData.items.length})</Text>
                    <Row style={{ gap: 15 }}>
                        <View style={styles.checkIcon}>
                            <Text style={styles.checkMark}>✓</Text>
                        </View>
                    </Row>
                </View>

                <View style={styles.productSection}>
                    <Text style={styles.sectionTitle}>Product Summary</Text>

                    {cartData.items.map((item, index) => (
                        <View key={item._id} style={styles.productItem}>
                            <Image
                                source={{ uri: item.productId.images[0] }}
                                style={styles.productImage}
                                defaultSource={IMG.Potato}
                            />
                            <View style={styles.productDetails}>
                                <Text style={styles.productName}>{item.productId.name}</Text>
                                <Text style={styles.productVariant}>SKU: {item.productId.sku}</Text>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.productPrice}>
                                        ₹{(item.productId.price - item.productId.discountPrice).toFixed(2)}
                                    </Text>
                                    {item.productId.discountPrice > 0 && (
                                        <Text style={styles.originalPrice}>
                                            ₹{item.productId.price.toFixed(2)}
                                        </Text>
                                    )}
                                </View>
                                <SpaceBetweenRow style={{ gap: 0 }}>
                                    <Text style={styles.stockText}>
                                        Stock: {item.productId.stock}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => deleteCartCarta(item?.productId?._id)}
                                        style={{ left: 0 }}
                                    >
                                        <AntDesign name='delete' color='red' size={20} />
                                    </TouchableOpacity>
                                </SpaceBetweenRow>
                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity
                                        style={styles.quantityButton}
                                        onPress={() => updateQuantity(item._id, item.quantity - 1, item.productId.stock)}
                                    >
                                        <Text style={styles.quantityButtonText}>−</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.quantityText}>{item.quantity}</Text>
                                    <TouchableOpacity
                                        style={styles.quantityButton}
                                        onPress={() => updateQuantity(item._id, item.quantity + 1, item.productId.stock)}
                                    >
                                        <Text style={styles.quantityButtonText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.totalSection}>
                    <Text style={styles.totalText}>
                        Total: ₹{cartData.items.reduce((total, item) =>
                            total + ((item.productId.price - item.productId.discountPrice) * item.quantity), 0
                        ).toFixed(2)}
                    </Text>
                </View>
            </View>
        );
    };

    const renderOrderCard = (order, isCurrentOrder = true) => {
        const statusColor = getStatusColor(order.orderStatus);
        const orderDate = new Date(order.createdAt).toLocaleDateString();

        return (
            <View key={order._id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                    <Image
                        source={{ uri: order.items[0]?.productId?.images?.[0] || 'default' }}
                        style={styles.orderImage}
                        defaultSource={IMG.Potato}
                    />
                    <View style={styles.orderInfo}>
                        <Text style={styles.orderTitle}>
                            {order.items[0]?.productId?.name || 'Order Items'}
                        </Text>
                        <Text style={styles.orderId}>#{order._id.slice(-8)}</Text>
                        <Text style={styles.orderDate}>{orderDate}</Text>
                    </View>
                    <View style={[styles.statusBadge, { borderColor: statusColor }]}>
                        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                        <Text style={[styles.statusText, { color: statusColor }]}>
                            {order.orderStatus}
                        </Text>
                    </View>
                </View>

                <View style={styles.orderFooter}>
                    <View style={styles.orderPricing}>
                        <Text style={styles.orderPrice}>₹{order.finalAmount}</Text>
                        <Text style={styles.orderItems}> • {order.items.length} Items</Text>
                    </View>
                    {isCurrentOrder && order.orderStatus !== 'delivered' && order.orderStatus !== 'cancelled' && (
                        <TouchableOpacity
                            style={styles.trackOrderButton}
                            onPress={() => navigation.navigate('OrderTrackingScreen', { orderId: order._id })}
                        >
                            <Text style={styles.trackOrderText}>Track Order</Text>
                            <Text style={styles.chevron}>›</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.orderItemsContainer}>
                    <Text style={styles.orderItemsTitle}>Items:</Text>
                    {order.items.map((item, index) => (
                        <Text key={index} style={styles.orderItemText}>
                            • {item.productId?.name} (Qty: {item.quantity})
                        </Text>
                    ))}
                </View>
            </View>
        );
    };

    const renderCurrentOrderContent = () => {
        if (!currentOrders || currentOrders.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No current orders found</Text>
                </View>
            );
        }

        return (
            <View>
                {currentOrders.map((order) => renderOrderCard(order, true))}
            </View>
        );
    };

    const renderPreviousOrderContent = () => {
        if (!previousOrders || previousOrders.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No previous orders found</Text>
                </View>
            );
        }

        return (
            <View>
                {previousOrders.map((order) => renderOrderCard(order, false))}
            </View>
        );
    };

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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? darkMode25 : 'white',
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
            bottom: 9
        },
        headerTitle: {
            color: 'white',
            fontSize: 22,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            marginLeft: 10,
        },
        headerRight: {
            width: 30,
        },
        tabContainer: {
            backgroundColor: isDarkMode ? darkMode25 : 'white',
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
            fontFamily: FONTS_FAMILY.Poppins_Medium
        },
        activeTabText: {
            color: isDarkMode ? 'white' : '#333',
            fontFamily: FONTS_FAMILY.Poppins_Medium
        },
        content: {
            flex: 1,
            padding: 20,
        },
        cartContainer: {
            backgroundColor: isDarkMode ? dark33 : 'white',
            borderRadius: 12,
            padding: 20,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
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
            color: isDarkMode ? 'white' : '#333',
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
        sectionTitle: {
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? 'white' : '#333',
            marginBottom: 5,
        },
        productSection: {
            marginBottom: 20,
        },
        productItem: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
            paddingBottom: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#F0F0F0',
        },
        productImage: {
            width: 95,
            height: 80,
            borderRadius: 8,
            marginRight: 15,
        },
        productDetails: {
            flex: 1,
        },
        productName: {
            fontSize: 16,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? 'white' : '#333',
            marginBottom: 4,
            width: 100
        },
        productVariant: {
            fontSize: 12,
            color: isDarkMode ? '#ccc' : '#888',
            marginBottom: 6,
        },
        priceContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 4,
        },
        productPrice: {
            fontSize: 16,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: App_Primary_color,
            marginRight: 8,
        },
        originalPrice: {
            fontSize: 14,
            color: '#888',
            textDecorationLine: 'line-through',
        },
        stockText: {
            fontSize: 12,
            color: isDarkMode ? '#ccc' : '#666',
        },
        quantityContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10
        },
        quantityButton: {
            backgroundColor: App_Primary_color,
            width: 30,
            height: 30,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
        },
        quantityButtonText: {
            fontSize: 18,
            color: 'white',
            fontWeight: '600',
        },
        quantityText: {
            fontSize: 16,
            fontWeight: '600',
            color: isDarkMode ? 'white' : '#333',
            marginHorizontal: 15,
            minWidth: 25,
            textAlign: 'center',
        },
        totalSection: {
            borderTopWidth: 1,
            borderTopColor: '#E0E0E0',
            paddingTop: 15,
            alignItems: 'flex-end',
        },
        totalText: {
            fontSize: 18,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? 'white' : '#333',
        },
        orderCard: {
            backgroundColor: isDarkMode ? dark33 : 'white',
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            borderWidth: 1,
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
            color: isDarkMode ? 'white' : '#333',
            marginBottom: 2,
        },
        orderId: {
            fontSize: 14,
            color: isDarkMode ? 'white' : '#333',
            fontWeight: '500',
            marginBottom: 4,
        },
        orderDate: {
            fontSize: 12,
            color: isDarkMode ? '#ccc' : '#666',
        },
        statusBadge: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 8,
            paddingVertical: 0,
            borderRadius: 12,
            borderWidth: 1,
            height: 24,
        },
        statusDot: {
            width: 6,
            height: 6,
            borderRadius: 3,
            marginRight: 6,
        },
        statusText: {
            fontSize: 12,
            fontWeight: '500',
        },
        orderFooter: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
        },
        orderPricing: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        orderPrice: {
            fontSize: 16,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? 'white' : '#333',
        },
        orderItems: {
            fontSize: 14,
            color: isDarkMode ? 'white' : 'black',
            fontFamily: FONTS_FAMILY.Poppins_Regular
        },
        trackOrderButton: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        trackOrderText: {
            fontSize: 14,
            color: isDarkMode ? 'white' : '#888',
            marginRight: 4,
            fontFamily: FONTS_FAMILY.Poppins_Medium
        },
        chevron: {
            fontSize: 16,
            color: '#888',
            fontWeight: '300',
            bottom: 3
        },
        orderItemsContainer: {
            borderTopWidth: 1,
            borderTopColor: '#E0E0E0',
            paddingTop: 12,
        },
        orderItemsTitle: {
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? 'white' : '#333',
            marginBottom: 6,
        },
        orderItemText: {
            fontSize: 12,
            color: isDarkMode ? '#ccc' : '#666',
            marginBottom: 2,
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 60,
        },
        emptyText: {
            fontSize: 16,
            color: isDarkMode ? 'white' : '#888',
            textAlign: 'center',
        },
        checkoutContainer: {
            backgroundColor: isDarkMode ? darkMode25 : 'white',
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

    const hasCartItems = cartData && cartData.items && cartData.items.length > 0;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <BackWhite />
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

            {/* Content with Skeleton Loader */}
            {isLoading ? (
                <CartScreenSkeletonLoader isDarkMode={isDarkMode} activeTab={activeTab} />
            ) : (
                <>
                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        {renderContent()}
                        <View style={{ height: 100 }} />
                    </ScrollView>

                    {/* Checkout Button - Only show for My Cart tab with items */}
                    {activeTab === 'My Cart' && hasCartItems && (
                        <View style={styles.checkoutContainer}>
                            <TouchableOpacity 
                                style={styles.checkoutButton}
                                onPress={() => navigation.navigate('CheckoutSummary', { cartData: cartData })}
                            >
                                <Text style={styles.checkoutText}>Checkout</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </>
            )}
        </View>
    );
};

export default CartScreen;