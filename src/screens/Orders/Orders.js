
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    Alert,
    PermissionsAndroid,
    Linking,
    Platform,
} from 'react-native';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { BackWhite } from '../../assets/SVGs';
import { App_Primary_color, dark33, darkMode25, white } from '../../common/Colors/colors';
import { useSelector } from 'react-redux';
import { apiGet } from '../../utils/Apis';
import useLoader from '../../utils/LoaderHook';
import { useIsFocused } from '@react-navigation/native';
import RNPrint from 'react-native-print';
import IMG from '../../assets/Images';
import SpaceBetweenRow from '../../components/wrapper/spacebetween';

const MyOrdersPage = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('Current Order');
    const [currentOrders, setCurrentOrders] = useState([]);
    const [previousOrders, setPreviousOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isDarkMode } = useSelector(state => state.theme);
    const { showLoader, hideLoader } = useLoader();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            loadData();
        }
    }, [isFocused, activeTab]);

    const loadData = async () => {
        setIsLoading(true);
        await fetchCurrentAndPrevious();
        setIsLoading(false);
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

    const requestStoragePermission = async () => {
        if (Platform.OS !== 'android') return true;

        try {
            if (Platform.Version >= 33) {
                return true;
            }

            if (Platform.Version >= 30) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE,
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    return true;
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
                    );
                    return false;
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
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
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
                );
                return false;
            } else {
                Alert.alert('Permission Denied', 'Cannot save file without permission.');
                return false;
            }
        } catch (err) {
            console.warn('Permission error:', err);
            return false;
        }
    };

    const exportToPDF = async (order) => {
        const permission = await requestStoragePermission();
        if (!permission) return Alert.alert('Permission Denied', 'Cannot save PDF.');

        if (!order) {
            return Alert.alert('No Data', 'No order data to export.');
        }

        try {
            showLoader();

            const formatDate = (date) =>
                new Date(date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                });

            const formatTime = (date) =>
                new Date(date).toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                });

            const invoiceDate = formatDate(Date.now());
            const invoiceTime = formatTime(Date.now());
            const invoiceNumber = `INV-${Date.now()}`;

            const total = Number(order.totalAmount || 0);
            const paid = Number(order.paidAmount || 0);
            const remain = total - paid;

            const customerName = order.customerName || 'Walk-in Customer';
            const customerPhone = order.customerPhone || 'N/A';

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
`;

            let itemRows = '';
            let itemNumber = 1;

            if (order.items && order.items.length > 0) {
                order.items.forEach((item) => {
                    const itemTotal = (item.quantity || 0) * (item.productId?.price || 0);
                    itemRows += `
            <tr>
              <td class="text-center">${itemNumber++}</td>
              <td class="item-name">${item.productId?.name || 'Item'}</td>
              <td class="text-center">${item.quantity || 0}</td>
              <td class="text-right">₹${Number(item.productId?.price || 0).toFixed(2)}</td>
              <td class="text-right">₹${itemTotal.toFixed(2)}</td>
            </tr>
          `;
                });
            }

            let paymentStatusClass = 'status-unpaid';
            let paymentStatusText = 'UNPAID';
            if (paid >= total) {
                paymentStatusClass = 'status-paid';
                paymentStatusText = 'PAID';
            } else if (paid > 0) {
                paymentStatusClass = 'status-partial';
                paymentStatusText = 'PARTIAL';
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
        <div class="invoice-header">
            <div class="store-name">🛒 RR MART</div>
            <div class="store-tagline">Your Trusted Shopping Destination</div>
            <div class="store-contact">
                📍 Shop No. 15, Main Market, City Center | 📞 +91 98765-43210 | ✉️ contact@rrmart.com
            </div>
        </div>

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

        <div class="customer-section">
            <div class="customer-title">Bill To</div>
            <div class="customer-name">${customerName}</div>
            <div class="customer-phone">📱 ${customerPhone}</div>
        </div>

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

        <div class="summary-section">
            <div class="summary-row">
                <span class="summary-label">Subtotal:</span>
                <span class="summary-value">₹${total.toFixed(2)}</span>
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
`;

            await RNPrint.print({
                html: html,
                jobName: `RRMart_Invoice_${invoiceNumber}`,
            });

            hideLoader();
            Alert.alert('Success', 'Invoice ready to print!');
        } catch (error) {
            hideLoader();
            console.error('PDF export error:', error);
            Alert.alert('Error', 'Could not generate invoice');
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return '#4CAF50';
            case 'cancelled':
            case 'canceled':
                return '#F44336';
            case 'pending':
                return '#FF9500';
            case 'on progress':
                return '#2196F3';
            default:
                return '#FF9500';
        }
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
                        <SpaceBetweenRow key={index}>
                            <Text style={styles.orderItemText}>
                                • {item.productId?.name} (Qty: {item.quantity})
                            </Text>
                            {order?.orderStatus?.toLowerCase() === 'delivered' && (
                                <TouchableOpacity
                                    style={styles.downloadButton}
                                    onPress={() => exportToPDF(order)}
                                >
                                    <Text style={styles.downloadText}>Download Invoice</Text>
                                    <Text style={styles.chevron}>›</Text>
                                </TouchableOpacity>
                            )}
                        </SpaceBetweenRow>
                    ))}
                </View>
            </View>
        );
    };

    const renderTabButton = (tabName) => (
        <TouchableOpacity
            key={tabName}
            style={styles.tabButton}
            onPress={() => setActiveTab(tabName)}
        >
            <Text style={[
                styles.tabText,
                activeTab === tabName && styles.tabTextActive
            ]}>
                {tabName}
            </Text>
            {activeTab === tabName && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
    );

    const currentOrdersList = activeTab === 'Current Order' ? currentOrders : previousOrders;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? darkMode25 : '#F5F5F5',
        },
        header: {
            backgroundColor: App_Primary_color,
            paddingTop: 10,
            paddingBottom: 20,
            paddingHorizontal: 20,
        },
        headerContent: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        backButton: {
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
        },
        headerTitle: {
            color: 'white',
            fontSize: 18,
            fontWeight: '600',
        },
        headerRight: {
            width: 40,
        },
        content: {
            flex: 1,
            backgroundColor: isDarkMode ? darkMode25 : 'white',
        },
        tabContainer: {
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 10,
        },
        tabButton: {
            marginRight: 30,
            paddingBottom: 10,
        },
        tabText: {
            fontSize: 16,
            color: isDarkMode ? white : '#8E8E93',
            fontWeight: '500',
        },
        tabTextActive: {
            color: isDarkMode ? white : '#1A1A1A',
            fontWeight: '600',
        },
        tabIndicator: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: isDarkMode ? white : '#1A1A1A',
            borderRadius: 1,
        },
        scrollView: {
            flex: 1,
        },
        scrollContent: {
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 30,
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
        downloadButton: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        downloadText: {
            fontSize: 12,
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
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <BackWhite />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My Orders</Text>
                    <View style={styles.headerRight} />
                </View>
            </View>

            {/* Content */}
            <View style={styles.content}>
                {/* Tabs */}
                <View style={styles.tabContainer}>
                    {['Current Order', 'Previous Order'].map(renderTabButton)}
                </View>

                {/* Orders List */}
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {isLoading ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Loading...</Text>
                        </View>
                    ) : currentOrdersList.length > 0 ? (
                        currentOrdersList.map((order) =>
                            renderOrderCard(order, activeTab === 'Current Order')
                        )
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>
                                No {activeTab === 'Current Order' ? 'current' : 'previous'} orders found
                            </Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default MyOrdersPage;