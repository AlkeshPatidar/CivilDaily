



import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, StyleSheet, Alert, PermissionsAndroid, Linking, Platform } from 'react-native';
import IMG from '../../assets/Images';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { App_Primary_color, dark33, darkMode25 } from '../../common/Colors/colors';
import { BackWhite } from '../../assets/SVGs';
import { useSelector } from 'react-redux';
import useLoader from '../../utils/LoaderHook';
import { apiDelete, apiGet, apiPost } from '../../utils/Apis';
import urls from '../../config/urls';
import Row from '../../components/wrapper/row';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SpaceBetweenRow from '../../components/wrapper/spacebetween';
import { useIsFocused } from '@react-navigation/native';
import CartScreenSkeletonLoader from '../../components/Skeleton/CartScreenSkeletonLoader';
import RNPrint from 'react-native-print'
import { ToastMsg } from '../../utils/helperFunctions';


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

    const requestStoragePermission = async () => {
        if (Platform.OS !== 'android') return true

        try {
            if (Platform.Version >= 33) {
                return true
            }

            if (Platform.Version >= 30) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE,
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    return true
                } else {
                    Alert.alert(
                        'Permission Required',
                        'Please enable "All files access" manually in app settings.',
                        [
                            {
                                text: 'Go to Settings',
                                onPress: () => Linking.openSettings(),
                            },
                            { text: 'Cancel', style: 'cancel' },
                        ],
                    )
                    return false
                }
            }

            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission Required',
                    message: 'This app needs access to your storage to save files.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            )

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true
            } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                Alert.alert(
                    'Permission Required',
                    'Please enable storage permission manually in app settings.',
                    [
                        {
                            text: 'Go to Settings',
                            onPress: () => Linking.openSettings(),
                        },
                        { text: 'Cancel', style: 'cancel' },
                    ],
                )
                return false
            } else {
                Alert.alert('Permission Denied', 'Cannot save file without permission.')
                return false
            }
        } catch (err) {
            console.warn('Permission error:', err)
            return false
        }
    }

    // ============================================
    // OPTION 1: Using react-native-print (Recommended - Most Stable)
    // Install: npm install react-native-print
    // ============================================


const exportToPDF = async (item) => {
        console.log('++++++++++++++++++++++++==',item);

        const permission = await requestStoragePermission()
        if (!permission) return Alert.alert('Permission Denied', 'Cannot save PDF.')

        if (!item || !item.productId) {
            return Alert.alert('No Data', 'No product data to export.')
        }

        try {
            showLoader()

            const formatDate = (date) =>
                new Date(date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                })

            const formatTime = (date) =>
                new Date(date).toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                })

            const invoiceDate = formatDate(Date.now())
            const invoiceTime = formatTime(Date.now())
            const invoiceNumber = `INV-${Date.now()}`

            // Extract product data from item
            const product = item.productId
            const quantity = item.quantity || 1
            const pricePerUnit = item.price || product.price || 0
            const itemTotal = quantity * pricePerUnit
            
            // Calculate totals
            const subtotal = itemTotal
            const total = subtotal
            const paid = 0  // Default 0, you can modify based on your data
            const remain = total - paid

            const customerName = 'Walk-in Customer'
            const customerPhone = 'N/A'

            const invoiceStyle = `
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body { 
        font-family: 'Arial', sans-serif; 
        padding: 30px;
        background: #fff;
        color: #333;
    }
    .invoice-container {
        max-width: 800px;
        margin: 0 auto;
        border: 2px solid #2c3e50;
        padding: 0;
    }
    .invoice-header {
        background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
        color: white;
        padding: 30px;
        text-align: center;
        border-bottom: 4px solid #e74c3c;
    }
    .store-name {
        font-size: 36px;
        font-weight: bold;
        letter-spacing: 2px;
        margin-bottom: 5px;
        text-transform: uppercase;
    }
    .store-tagline {
        font-size: 14px;
        opacity: 0.9;
        font-style: italic;
    }
    .store-contact {
        font-size: 12px;
        margin-top: 10px;
        opacity: 0.85;
    }
    .invoice-info {
        display: flex;
        justify-content: space-between;
        padding: 25px 30px;
        background: #ecf0f1;
        border-bottom: 2px solid #bdc3c7;
    }
    .info-block {
        flex: 1;
    }
    .info-label {
        font-size: 11px;
        color: #7f8c8d;
        text-transform: uppercase;
        font-weight: bold;
        margin-bottom: 5px;
    }
    .info-value {
        font-size: 14px;
        color: #2c3e50;
        font-weight: bold;
    }
    .customer-section {
        padding: 20px 30px;
        background: #fff;
        border-bottom: 1px solid #ecf0f1;
    }
    .customer-title {
        font-size: 12px;
        color: #7f8c8d;
        text-transform: uppercase;
        font-weight: bold;
        margin-bottom: 8px;
    }
    .customer-name {
        font-size: 16px;
        color: #2c3e50;
        font-weight: bold;
        margin-bottom: 3px;
    }
    .customer-phone {
        font-size: 13px;
        color: #7f8c8d;
    }
    .items-table {
        width: 100%;
        border-collapse: collapse;
        margin: 0;
    }
    .items-table thead {
        background: #34495e;
        color: white;
    }
    .items-table th {
        padding: 12px 15px;
        text-align: left;
        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;
        border-right: 1px solid rgba(255,255,255,0.1);
    }
    .items-table th:last-child {
        border-right: none;
        text-align: right;
    }
    .items-table td {
        padding: 12px 15px;
        border-bottom: 1px solid #ecf0f1;
        font-size: 13px;
        color: #2c3e50;
    }
    .items-table tbody tr:hover {
        background: #f8f9fa;
    }
    .item-name {
        font-weight: 600;
        color: #2c3e50;
    }
    .text-right {
        text-align: right;
    }
    .text-center {
        text-align: center;
    }
    .summary-section {
        padding: 25px 30px;
        background: #ecf0f1;
    }
    .summary-row {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        font-size: 14px;
    }
    .summary-row.total {
        border-top: 2px solid #2c3e50;
        padding-top: 15px;
        margin-top: 10px;
        font-size: 18px;
        font-weight: bold;
        color: #2c3e50;
    }
    .summary-label {
        color: #7f8c8d;
        font-weight: 600;
    }
    .summary-value {
        color: #2c3e50;
        font-weight: bold;
    }
    .summary-row.remaining .summary-value {
        color: #e74c3c;
    }
    .summary-row.paid .summary-value {
        color: #27ae60;
    }
    .payment-status {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: bold;
        text-transform: uppercase;
    }
    .status-paid {
        background: #d4edda;
        color: #27ae60;
    }
    .status-partial {
        background: #fff3cd;
        color: #f39c12;
    }
    .status-unpaid {
        background: #f8d7da;
        color: #e74c3c;
    }
    .invoice-footer {
        padding: 20px 30px;
        text-align: center;
        background: #fff;
        border-top: 2px solid #ecf0f1;
    }
    .footer-text {
        font-size: 11px;
        color: #7f8c8d;
        line-height: 1.6;
    }
    .footer-highlight {
        color: #e74c3c;
        font-weight: bold;
        font-size: 13px;
        margin-top: 10px;
        display: block;
    }
    .divider {
        height: 2px;
        background: linear-gradient(to right, transparent, #e74c3c, transparent);
        margin: 15px 0;
    }
</style>
`

            let itemRows = ''
            
            // Single item row
            const productName = product.name || 'Item'
            itemRows = `
            <tr>
              <td class="text-center">1</td>
              <td class="item-name">${productName}</td>
              <td class="text-center">${quantity}</td>
              <td class="text-right">₹${pricePerUnit.toFixed(2)}</td>
              <td class="text-right">₹${itemTotal.toFixed(2)}</td>
            </tr>
          `

            // Determine payment status
            let paymentStatusClass = 'status-unpaid'
            let paymentStatusText = 'UNPAID'
            if (paid >= total) {
                paymentStatusClass = 'status-paid'
                paymentStatusText = 'PAID'
            } else if (paid > 0) {
                paymentStatusClass = 'status-partial'
                paymentStatusText = 'PARTIAL'
            }

            const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RR Mart Invoice</title>
    ${invoiceStyle}
</head>
<body>
    <div class="invoice-container">
        <!-- Header -->
        <div class="invoice-header">
            <div class="store-name">🛒 RR MART</div>
            <div class="store-tagline">Your Trusted Shopping Destination</div>
            <div class="store-contact">
                📍 Shop No. 15, Main Market, City Center | 📞 +91 98765-43210 | ✉️ contact@rrmart.com
            </div>
        </div>

        <!-- Invoice Info -->
        <div class="invoice-info">
            <div class="info-block">
                <div class="info-label">Invoice Number</div>
                <div class="info-value">${invoiceNumber}</div>
            </div>
            <div class="info-block">
                <div class="info-label">Invoice Date</div>
                <div class="info-value">${invoiceDate}</div>
            </div>
            <div class="info-block">
                <div class="info-label">Invoice Time</div>
                <div class="info-value">${invoiceTime}</div>
            </div>
            <div class="info-block">
                <div class="info-label">Payment Status</div>
                <div class="info-value">
                    <span class="payment-status ${paymentStatusClass}">${paymentStatusText}</span>
                </div>
            </div>
        </div>

        <!-- Customer Info -->
        <div class="customer-section">
            <div class="customer-title">Bill To</div>
            <div class="customer-name">${customerName}</div>
            <div class="customer-phone">📱 ${customerPhone}</div>
        </div>

        <!-- Items Table -->
        <table class="items-table">
            <thead>
                <tr>
                    <th style="width: 50px;">#</th>
                    <th>Item Description</th>
                    <th style="width: 80px;" class="text-center">Qty</th>
                    <th style="width: 100px;" class="text-right">Rate</th>
                    <th style="width: 120px;" class="text-right">Amount</th>
                </tr>
            </thead>
            <tbody>
                ${itemRows}
            </tbody>
        </table>

        <!-- Summary Section -->
        <div class="summary-section">
            <div class="summary-row">
                <span class="summary-label">Subtotal:</span>
                <span class="summary-value">₹${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span class="summary-label">Tax (0%):</span>
                <span class="summary-value">₹0.00</span>
            </div>
            <div class="summary-row">
                <span class="summary-label">Discount:</span>
                <span class="summary-value">₹0.00</span>
            </div>
            <div class="divider"></div>
            <div class="summary-row total">
                <span class="summary-label">Total Amount:</span>
                <span class="summary-value">₹${total.toFixed(2)}</span>
            </div>
            <div class="summary-row paid">
                <span class="summary-label">Amount Paid:</span>
                <span class="summary-value">₹${paid.toFixed(2)}</span>
            </div>
            <div class="summary-row remaining">
                <span class="summary-label">Balance Due:</span>
                <span class="summary-value">₹${remain.toFixed(2)}</span>
            </div>
        </div>

        <!-- Footer -->
        <div class="invoice-footer">
            <div class="footer-text">
                Thank you for shopping with RR Mart! We appreciate your business.<br>
                For any queries, please contact us at the above details.
            </div>
            <span class="footer-highlight">🎉 Visit Again! Happy Shopping! 🎉</span>
        </div>
    </div>
</body>
</html>
`

            // Using react-native-print (No permission needed, direct print)
            await RNPrint.print({
                html: html,
                jobName: `RRMart_Invoice_${invoiceNumber}`,
            })

            hideLoader()
            // Alert.alert('Success', 'Invoice ready to print!')
        } catch (error) {
            hideLoader()
            console.error('PDF export error:', error)
            Alert.alert('Error', 'Could not generate invoice')
        }
    }

    // ============================================
    // OPTION 2: If you need to save file (use rn-fetch-blob)
    // Install: npm install rn-fetch-blob
    // ============================================

    /*
    import RNFetchBlob from 'rn-fetch-blob';
    
    // After creating HTML, use this to save:
    const { config, fs } = RNFetchBlob;
    const fileName = `RRMart_Invoice_${invoiceNumber}.html`;
    const path = `${fs.dirs.DownloadDir}/${fileName}`;
    
    await RNFetchBlob.fs.writeFile(path, html, 'utf8');
    Alert.alert('Success', `Saved to: ${path}`);
    */

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
            ToastMsg("Stock Limit", `Only ${stock} items available in stock`);
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
            const data = {
                productId: itemId,
                quantity: newQuantity
            }
            const res = await apiPost(urls?.updateCartData, data);
            // setCartData(res?.data || null);
            fetchCartData()
        } catch (error) {
            console.error('Error fetching cart data:', error);
            // setCartData(null);
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
                                        onPress={() => updateQuantity(item.productId?._id, item.quantity - 1, item.productId.stock)}
                                    >
                                        <Text style={styles.quantityButtonText}>−</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.quantityText}>{item.quantity}</Text>
                                    <TouchableOpacity
                                        style={styles.quantityButton}
                                        onPress={() => updateQuantity(item.productId?._id, item.quantity + 1, item.productId.stock)}
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
                        <SpaceBetweenRow>
                            <Text key={index} style={styles.orderItemText}>
                                • {item.productId?.name} (Qty: {item.quantity})
                            </Text>
                            {order?.orderStatus == 'delivered' && <TouchableOpacity
                                style={styles.trackOrderButton}
                                onPress={() => exportToPDF(item)}
                            >
                                <Text style={styles.trackOrderText}>Download Invoice</Text>
                                <Text style={styles.chevron}>›</Text>
                            </TouchableOpacity>}
                        </SpaceBetweenRow>
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