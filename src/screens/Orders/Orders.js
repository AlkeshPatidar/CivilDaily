
// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     ScrollView,
//     TouchableOpacity,
//     Image,
//     StyleSheet,
//     StatusBar,
//     SafeAreaView,
//     Alert,
//     PermissionsAndroid,
//     Linking,
//     Platform,
// } from 'react-native';
// import { FONTS_FAMILY } from '../../assets/Fonts';
// import { BackWhite } from '../../assets/SVGs';
// import { App_Primary_color, dark33, darkMode25, white } from '../../common/Colors/colors';
// import { useSelector } from 'react-redux';
// import { apiGet } from '../../utils/Apis';
// import useLoader from '../../utils/LoaderHook';
// import { useIsFocused } from '@react-navigation/native';
// import RNPrint from 'react-native-print';
// import IMG from '../../assets/Images';
// import SpaceBetweenRow from '../../components/wrapper/spacebetween';
// import BlinKitLoader from '../../components/Skeleton/BlinkitLoader';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const MyOrdersPage = ({ navigation }) => {
//     const [activeTab, setActiveTab] = useState('Current Order');
//     const [currentOrders, setCurrentOrders] = useState([]);
//     const [previousOrders, setPreviousOrders] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const { isDarkMode } = useSelector(state => state.theme);
//     const { showLoader, hideLoader } = useLoader();
//     const isFocused = useIsFocused();

//     useEffect(() => {
//         if (isFocused) {
//             loadData();
//         }
//     }, [isFocused, activeTab]);

//     const loadData = async () => {
//         setIsLoading(true);
//         await fetchCurrentAndPrevious();
//         setIsLoading(false);
//     };

//     const fetchCurrentAndPrevious = async () => {
//         try {
//             const orderType = activeTab === 'Current Order' ? 'current' : 'previous';
//             const res = await apiGet(`/api/order/my?orderType=${orderType}`);

//             if (activeTab === 'Current Order') {
//                 setCurrentOrders(res?.data || []);
//             } else if (activeTab === 'Previous Order') {
//                 setPreviousOrders(res?.data || []);
//             }
//         } catch (error) {
//             console.error('Error fetching orders:', error);
//             if (activeTab === 'Current Order') {
//                 setCurrentOrders([]);
//             } else {
//                 setPreviousOrders([]);
//             }
//         }
//     };

//     const requestStoragePermission = async () => {
//         if (Platform.OS !== 'android') return true;

//         try {
//             if (Platform.Version >= 33) {
//                 return true;
//             }

//             if (Platform.Version >= 30) {
//                 const granted = await PermissionsAndroid.request(
//                     PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE,
//                 );
//                 if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//                     return true;
//                 } else {
//                     Alert.alert(
//                         'Permission Required',
//                         'Please enable "All files access" manually in app settings.',
//                         [
//                             {
//                                 text: 'Go to Settings',
//                                 onPress: () => Linking.openSettings(),
//                             },
//                             { text: 'Cancel', style: 'cancel' },
//                         ],
//                     );
//                     return false;
//                 }
//             }

//             const granted = await PermissionsAndroid.request(
//                 PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//                 {
//                     title: 'Storage Permission Required',
//                     message: 'This app needs access to your storage to save files.',
//                     buttonNeutral: 'Ask Me Later',
//                     buttonNegative: 'Cancel',
//                     buttonPositive: 'OK',
//                 },
//             );

//             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//                 return true;
//             } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
//                 Alert.alert(
//                     'Permission Required',
//                     'Please enable storage permission manually in app settings.',
//                     [
//                         {
//                             text: 'Go to Settings',
//                             onPress: () => Linking.openSettings(),
//                         },
//                         { text: 'Cancel', style: 'cancel' },
//                     ],
//                 );
//                 return false;
//             } else {
//                 Alert.alert('Permission Denied', 'Cannot save file without permission.');
//                 return false;
//             }
//         } catch (err) {
//             console.warn('Permission error:', err);
//             return false;
//         }
//     };

//     const exportToPDF = async (item) => {
//         // console.log('++++++++++++++++++++++++==',item);

//         const permission = await requestStoragePermission()
//         if (!permission) return Alert.alert('Permission Denied', 'Cannot save PDF.')

//         if (!item || !item.productId) {
//             return Alert.alert('No Data', 'No product data to export.')
//         }

//         try {
//             showLoader()

//             const formatDate = (date) =>
//                 new Date(date).toLocaleDateString('en-GB', {
//                     day: '2-digit',
//                     month: 'short',
//                     year: 'numeric',
//                 })

//             const formatTime = (date) =>
//                 new Date(date).toLocaleTimeString('en-GB', {
//                     hour: '2-digit',
//                     minute: '2-digit',
//                 })

//             const invoiceDate = formatDate(Date.now())
//             const invoiceTime = formatTime(Date.now())
//             const invoiceNumber = `INV-${Date.now()}`

//             // Extract product data from item
//             const product = item.productId
//             const quantity = item.quantity || 1
//             const pricePerUnit = item.price || product.price || 0
//             const itemTotal = quantity * pricePerUnit

//             // Calculate totals
//             const subtotal = itemTotal
//             const total = subtotal
//             const paid = 0  // Default 0, you can modify based on your data
//             const remain = total - paid

//             const customerName = 'Walk-in Customer'
//             const customerPhone = 'N/A'

//             const invoiceStyle = `
// <style>
//     * {
//         margin: 0;
//         padding: 0;
//         box-sizing: border-box;
//     }
//     body { 
//         font-family: 'Arial', sans-serif; 
//         padding: 30px;
//         background: #fff;
//         color: #333;
//     }
//     .invoice-container {
//         max-width: 800px;
//         margin: 0 auto;
//         border: 2px solid #2c3e50;
//         padding: 0;
//     }
//     .invoice-header {
//         background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
//         color: white;
//         padding: 30px;
//         text-align: center;
//         border-bottom: 4px solid #e74c3c;
//     }
//     .store-name {
//         font-size: 36px;
//         font-weight: bold;
//         letter-spacing: 2px;
//         margin-bottom: 5px;
//         text-transform: uppercase;
//     }
//     .store-tagline {
//         font-size: 14px;
//         opacity: 0.9;
//         font-style: italic;
//     }
//     .store-contact {
//         font-size: 12px;
//         margin-top: 10px;
//         opacity: 0.85;
//     }
//     .invoice-info {
//         display: flex;
//         justify-content: space-between;
//         padding: 25px 30px;
//         background: #ecf0f1;
//         border-bottom: 2px solid #bdc3c7;
//     }
//     .info-block {
//         flex: 1;
//     }
//     .info-label {
//         font-size: 11px;
//         color: #7f8c8d;
//         text-transform: uppercase;
//         font-weight: bold;
//         margin-bottom: 5px;
//     }
//     .info-value {
//         font-size: 14px;
//         color: #2c3e50;
//         font-weight: bold;
//     }
//     .customer-section {
//         padding: 20px 30px;
//         background: #fff;
//         border-bottom: 1px solid #ecf0f1;
//     }
//     .customer-title {
//         font-size: 12px;
//         color: #7f8c8d;
//         text-transform: uppercase;
//         font-weight: bold;
//         margin-bottom: 8px;
//     }
//     .customer-name {
//         font-size: 16px;
//         color: #2c3e50;
//         font-weight: bold;
//         margin-bottom: 3px;
//     }
//     .customer-phone {
//         font-size: 13px;
//         color: #7f8c8d;
//     }
//     .items-table {
//         width: 100%;
//         border-collapse: collapse;
//         margin: 0;
//     }
//     .items-table thead {
//         background: #34495e;
//         color: white;
//     }
//     .items-table th {
//         padding: 12px 15px;
//         text-align: left;
//         font-size: 12px;
//         font-weight: bold;
//         text-transform: uppercase;
//         border-right: 1px solid rgba(255,255,255,0.1);
//     }
//     .items-table th:last-child {
//         border-right: none;
//         text-align: right;
//     }
//     .items-table td {
//         padding: 12px 15px;
//         border-bottom: 1px solid #ecf0f1;
//         font-size: 13px;
//         color: #2c3e50;
//     }
//     .items-table tbody tr:hover {
//         background: #f8f9fa;
//     }
//     .item-name {
//         font-weight: 600;
//         color: #2c3e50;
//     }
//     .text-right {
//         text-align: right;
//     }
//     .text-center {
//         text-align: center;
//     }
//     .summary-section {
//         padding: 25px 30px;
//         background: #ecf0f1;
//     }
//     .summary-row {
//         display: flex;
//         justify-content: space-between;
//         padding: 8px 0;
//         font-size: 14px;
//     }
//     .summary-row.total {
//         border-top: 2px solid #2c3e50;
//         padding-top: 15px;
//         margin-top: 10px;
//         font-size: 18px;
//         font-weight: bold;
//         color: #2c3e50;
//     }
//     .summary-label {
//         color: #7f8c8d;
//         font-weight: 600;
//     }
//     .summary-value {
//         color: #2c3e50;
//         font-weight: bold;
//     }
//     .summary-row.remaining .summary-value {
//         color: #e74c3c;
//     }
//     .summary-row.paid .summary-value {
//         color: #27ae60;
//     }
//     .payment-status {
//         display: inline-block;
//         padding: 4px 12px;
//         border-radius: 20px;
//         font-size: 11px;
//         font-weight: bold;
//         text-transform: uppercase;
//     }
//     .status-paid {
//         background: #d4edda;
//         color: #27ae60;
//     }
//     .status-partial {
//         background: #fff3cd;
//         color: #f39c12;
//     }
//     .status-unpaid {
//         background: #f8d7da;
//         color: #e74c3c;
//     }
//     .invoice-footer {
//         padding: 20px 30px;
//         text-align: center;
//         background: #fff;
//         border-top: 2px solid #ecf0f1;
//     }
//     .footer-text {
//         font-size: 11px;
//         color: #7f8c8d;
//         line-height: 1.6;
//     }
//     .footer-highlight {
//         color: #e74c3c;
//         font-weight: bold;
//         font-size: 13px;
//         margin-top: 10px;
//         display: block;
//     }
//     .divider {
//         height: 2px;
//         background: linear-gradient(to right, transparent, #e74c3c, transparent);
//         margin: 15px 0;
//     }
// </style>
// `

//             let itemRows = ''

//             // Single item row
//             const productName = product.name || 'Item'
//             itemRows = `
//             <tr>
//               <td class="text-center">1</td>
//               <td class="item-name">${productName}</td>
//               <td class="text-center">${quantity}</td>
//               <td class="text-right">₹${pricePerUnit.toFixed(2)}</td>
//               <td class="text-right">₹${itemTotal.toFixed(2)}</td>
//             </tr>
//           `

//             // Determine payment status
//             let paymentStatusClass = 'status-unpaid'
//             let paymentStatusText = 'UNPAID'
//             if (paid >= total) {
//                 paymentStatusClass = 'status-paid'
//                 paymentStatusText = 'PAID'
//             } else if (paid > 0) {
//                 paymentStatusClass = 'status-partial'
//                 paymentStatusText = 'PARTIAL'
//             }

//             const html = `
// <!DOCTYPE html>
// <html>
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>RR Mart Invoice</title>
//     ${invoiceStyle}
// </head>
// <body>
//     <div class="invoice-container">
//         <!-- Header -->
//         <div class="invoice-header">
//             <div class="store-name">🛒 RR MART</div>
//             <div class="store-tagline">Your Trusted Shopping Destination</div>
//             <div class="store-contact">
//                 📍 Shop No. 15, Main Market, City Center | 📞 +91 98765-43210 | ✉️ contact@rrmart.com
//             </div>
//         </div>

//         <!-- Invoice Info -->
//         <div class="invoice-info">
//             <div class="info-block">
//                 <div class="info-label">Invoice Number</div>
//                 <div class="info-value">${invoiceNumber}</div>
//             </div>
//             <div class="info-block">
//                 <div class="info-label">Invoice Date</div>
//                 <div class="info-value">${invoiceDate}</div>
//             </div>
//             <div class="info-block">
//                 <div class="info-label">Invoice Time</div>
//                 <div class="info-value">${invoiceTime}</div>
//             </div>
//             <div class="info-block">
//                 <div class="info-label">Payment Status</div>
//                 <div class="info-value">
//                     <span class="payment-status ${paymentStatusClass}">${paymentStatusText}</span>
//                 </div>
//             </div>
//         </div>

//         <!-- Customer Info -->
//         <div class="customer-section">
//             <div class="customer-title">Bill To</div>
//             <div class="customer-name">${customerName}</div>
//             <div class="customer-phone">📱 ${customerPhone}</div>
//         </div>

//         <!-- Items Table -->
//         <table class="items-table">
//             <thead>
//                 <tr>
//                     <th style="width: 50px;">#</th>
//                     <th>Item Description</th>
//                     <th style="width: 80px;" class="text-center">Qty</th>
//                     <th style="width: 100px;" class="text-right">Rate</th>
//                     <th style="width: 120px;" class="text-right">Amount</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 ${itemRows}
//             </tbody>
//         </table>

//         <!-- Summary Section -->
//         <div class="summary-section">
//             <div class="summary-row">
//                 <span class="summary-label">Subtotal:</span>
//                 <span class="summary-value">₹${subtotal.toFixed(2)}</span>
//             </div>
//             <div class="summary-row">
//                 <span class="summary-label">Tax (0%):</span>
//                 <span class="summary-value">₹0.00</span>
//             </div>
//             <div class="summary-row">
//                 <span class="summary-label">Discount:</span>
//                 <span class="summary-value">₹0.00</span>
//             </div>
//             <div class="divider"></div>
//             <div class="summary-row total">
//                 <span class="summary-label">Total Amount:</span>
//                 <span class="summary-value">₹${total.toFixed(2)}</span>
//             </div>
//             <div class="summary-row paid">
//                 <span class="summary-label">Amount Paid:</span>
//                 <span class="summary-value">₹${paid.toFixed(2)}</span>
//             </div>
//             <div class="summary-row remaining">
//                 <span class="summary-label">Balance Due:</span>
//                 <span class="summary-value">₹${remain.toFixed(2)}</span>
//             </div>
//         </div>

//         <!-- Footer -->
//         <div class="invoice-footer">
//             <div class="footer-text">
//                 Thank you for shopping with RR Mart! We appreciate your business.<br>
//                 For any queries, please contact us at the above details.
//             </div>
//             <span class="footer-highlight">🎉 Visit Again! Happy Shopping! 🎉</span>
//         </div>
//     </div>
// </body>
// </html>
// `

//             // Using react-native-print (No permission needed, direct print)
//             await RNPrint.print({
//                 html: html,
//                 jobName: `RRMart_Invoice_${invoiceNumber}`,
//             })

//             hideLoader()
//             // Alert.alert('Success', 'Invoice ready to print!')
//         } catch (error) {
//             hideLoader()
//             console.error('PDF export error:', error)
//             Alert.alert('Error', 'Could not generate invoice')
//         }
//     }

//     const getStatusColor = (status) => {
//         switch (status?.toLowerCase()) {
//             case 'delivered':
//                 return '#4CAF50';
//             case 'cancelled':
//             case 'canceled':
//                 return '#F44336';
//             case 'pending':
//                 return '#FF9500';
//             case 'on progress':
//                 return '#2196F3';
//             default:
//                 return '#FF9500';
//         }
//     };

//     const renderOrderCard = (order, isCurrentOrder = true) => {
//         const statusColor = getStatusColor(order.orderStatus);
//         const orderDate = new Date(order.createdAt).toLocaleDateString();

//         return (
//             <View key={order._id} style={styles.orderCard}>
//                 <View style={styles.orderHeader}>
//                     <Image
//                         source={{ uri: order.items[0]?.productId?.images?.[0] || 'default' }}
//                         style={styles.orderImage}
//                         defaultSource={IMG.Potato}
//                     />
//                     <View style={styles.orderInfo}>
//                         <Text style={styles.orderTitle}>
//                             {order.items[0]?.productId?.name || 'Order Items'}
//                         </Text>
//                         <Text style={styles.orderId}>#{order._id.slice(-8)}</Text>
//                         <Text style={styles.orderDate}>{orderDate}</Text>
//                     </View>
//                     <View style={[styles.statusBadge, { borderColor: statusColor }]}>
//                         <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
//                         <Text style={[styles.statusText, { color: statusColor }]}>
//                             {order.orderStatus}
//                         </Text>
//                     </View>
//                 </View>

//                 <View style={styles.orderFooter}>
//                     <View style={styles.orderPricing}>
//                         <Text style={styles.orderPrice}>₹{order.finalAmount}</Text>
//                         <Text style={styles.orderItems}> • {order.items.length} Items</Text>
//                     </View>
//                     {isCurrentOrder && order.orderStatus !== 'delivered' && order.orderStatus !== 'cancelled' && (
//                         <TouchableOpacity
//                             style={styles.trackOrderButton}
//                             onPress={() => navigation.navigate('OrderTrackingScreen', { orderId: order._id })}
//                         >
//                             <Text style={styles.trackOrderText}>Track Order</Text>
//                             <Text style={styles.chevron}>›</Text>
//                         </TouchableOpacity>
//                     )}
//                 </View>

//                 <View style={styles.orderItemsContainer}>
//                     <Text style={styles.orderItemsTitle}>Items:</Text>
//                     {order.items.map((item, index) => (
//                         <SpaceBetweenRow key={index}>
//                             <Text style={styles.orderItemText}>
//                                 • {item.productId?.name} (Qty: {item.quantity})
//                             </Text>
//                             {order?.orderStatus?.toLowerCase() === 'delivered' && (
//                                 <TouchableOpacity
//                                     style={styles.downloadButton}
//                                     onPress={() => exportToPDF(item)}
//                                 >
//                                     <Text style={styles.downloadText}>Download Invoice</Text>
//                                     <Text style={styles.chevron}>›</Text>
//                                 </TouchableOpacity>
//                             )}
//                         </SpaceBetweenRow>
//                     ))}
//                 </View>
//             </View>
//         );
//     };

//     const renderTabButton = (tabName) => (
//         <TouchableOpacity
//             key={tabName}
//             style={styles.tabButton}
//             onPress={() => setActiveTab(tabName)}
//         >
//             <Text style={[
//                 styles.tabText,
//                 activeTab === tabName && styles.tabTextActive
//             ]}>
//                 {tabName}
//             </Text>
//             {activeTab === tabName && <View style={styles.tabIndicator} />}
//         </TouchableOpacity>
//     );

//     const currentOrdersList = activeTab === 'Current Order' ? currentOrders : previousOrders;

//     const styles = StyleSheet.create({
//         container: {
//             flex: 1,
//             backgroundColor: isDarkMode ? darkMode25 : '#F5F5F5',
//         },
//         header: {
//             backgroundColor: 'white',
//             paddingTop: 10,
//             paddingBottom: 20,
//             paddingHorizontal: 20,
//         },
//         headerContent: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//         },
//         backButton: {
//             width: 40,
//             height: 40,
//             justifyContent: 'center',
//             alignItems: 'center',
//         },
//         headerTitle: {
//             color: 'black',
//             fontSize: 18,
//             fontWeight: '600',
//         },
//         headerRight: {
//             width: 40,
//         },
//         content: {
//             flex: 1,
//             backgroundColor: isDarkMode ? darkMode25 : 'white',
//         },
//         tabContainer: {
//             flexDirection: 'row',
//             paddingHorizontal: 20,
//             paddingTop: 20,
//             paddingBottom: 10,
//         },
//         tabButton: {
//             marginRight: 30,
//             paddingBottom: 10,
//         },
//         tabText: {
//             fontSize: 16,
//             color: isDarkMode ? white : '#8E8E93',
//             fontWeight: '500',
//         },
//         tabTextActive: {
//             color: isDarkMode ? white : '#1A1A1A',
//             fontWeight: '600',
//         },
//         tabIndicator: {
//             position: 'absolute',
//             bottom: 0,
//             left: 0,
//             right: 0,
//             height: 2,
//             backgroundColor: isDarkMode ? white : '#1A1A1A',
//             borderRadius: 1,
//         },
//         scrollView: {
//             flex: 1,
//         },
//         scrollContent: {
//             paddingHorizontal: 20,
//             paddingTop: 10,
//             paddingBottom: 30,
//         },
//         orderCard: {
//             backgroundColor: isDarkMode ? dark33 : 'white',
//             borderRadius: 12,
//             padding: 16,
//             marginBottom: 16,
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 1 },
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
//         orderDate: {
//             fontSize: 12,
//             color: isDarkMode ? '#ccc' : '#666',
//         },
//         statusBadge: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             paddingHorizontal: 8,
//             paddingVertical: 0,
//             borderRadius: 12,
//             borderWidth: 1,
//             height: 24,
//         },
//         statusDot: {
//             width: 6,
//             height: 6,
//             borderRadius: 3,
//             marginRight: 6,
//         },
//         statusText: {
//             fontSize: 12,
//             fontWeight: '500',
//         },
//         orderFooter: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: 12,
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
//         downloadButton: {
//             flexDirection: 'row',
//             alignItems: 'center',
//         },
//         downloadText: {
//             fontSize: 12,
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
//         orderItemsContainer: {
//             borderTopWidth: 1,
//             borderTopColor: '#E0E0E0',
//             paddingTop: 12,
//         },
//         orderItemsTitle: {
//             fontSize: 14,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             color: isDarkMode ? 'white' : '#333',
//             marginBottom: 6,
//         },
//         orderItemText: {
//             fontSize: 12,
//             color: isDarkMode ? '#ccc' : '#666',
//             marginBottom: 2,
//         },
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
//     });

//     return (
//         <SafeAreaView style={styles.container}>
//             <StatusBar barStyle="dark-content" backgroundColor={white} />

//             {/* Header */}
//             <View style={styles.header}>
//                 <View style={styles.headerContent}>
//                     <TouchableOpacity
//                         style={styles.backButton}
//                         onPress={() => navigation.goBack()}
//                     >
//                         {/* <BackWhite /> */}
//                         <Ionicons name="chevron-back" size={24} color="black" />
//                     </TouchableOpacity>
//                     <Text style={styles.headerTitle}>My Orders</Text>
//                     <View style={styles.headerRight} />
//                 </View>
//             </View>

//             {/* Content */}
//             <View style={styles.content}>
//                 {/* Tabs */}
//                 <View style={styles.tabContainer}>
//                     {['Current Order', 'Previous Order'].map(renderTabButton)}
//                 </View>

//                 {/* Orders List */}
//                 <ScrollView
//                     style={styles.scrollView}
//                     showsVerticalScrollIndicator={false}
//                     contentContainerStyle={styles.scrollContent}
//                 >
//                     {isLoading ? (
//                         <View style={styles.emptyContainer}>
//                             {/* <Text style={styles.emptyText}>Loading...</Text> */}
//                             <BlinKitLoader isDarkMode={isDarkMode}/>
//                         </View>
//                     ) : currentOrdersList.length > 0 ? (
//                         currentOrdersList.map((order) =>
//                             renderOrderCard(order, activeTab === 'Current Order')
//                         )
//                     ) : (
//                         <View style={styles.emptyContainer}>
//                             <Text style={styles.emptyText}>
//                                 No {activeTab === 'Current Order' ? 'current' : 'previous'} orders found
//                             </Text>
//                         </View>
//                     )}
//                     <View style={{ height: 60 }} />
//                 </ScrollView>
//             </View>
//         </SafeAreaView>
//     );
// };

// export default MyOrdersPage;


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
import BlinKitLoader from '../../components/Skeleton/BlinkitLoader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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

    const exportToPDF = async (item) => {
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

            const product = item.productId
            const quantity = item.quantity || 1
            const pricePerUnit = item.price || product.price || 0
            const itemTotal = quantity * pricePerUnit

            const subtotal = itemTotal
            const total = subtotal
            const paid = 0
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

            await RNPrint.print({
                html: html,
                jobName: `RRMart_Invoice_${invoiceNumber}`,
            })

            hideLoader()
        } catch (error) {
            hideLoader()
            console.error('PDF export error:', error)
            Alert.alert('Error', 'Could not generate invoice')
        }
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return '#10B981';
            case 'cancelled':
            case 'canceled':
                return '#EF4444';
            case 'pending':
                return '#F59E0B';
            case 'on progress':
                return '#3B82F6';
            default:
                return '#F59E0B';
        }
    };

    const getStatusBgColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return isDarkMode ? 'rgba(16, 185, 129, 0.15)' : '#D1FAE5';
            case 'cancelled':
            case 'canceled':
                return isDarkMode ? 'rgba(239, 68, 68, 0.15)' : '#FEE2E2';
            case 'pending':
                return isDarkMode ? 'rgba(245, 158, 11, 0.15)' : '#FEF3C7';
            case 'on progress':
                return isDarkMode ? 'rgba(59, 130, 246, 0.15)' : '#DBEAFE';
            default:
                return isDarkMode ? 'rgba(245, 158, 11, 0.15)' : '#FEF3C7';
        }
    };

    const renderOrderCard = (order, isCurrentOrder = true) => {
        const statusColor = getStatusColor(order.orderStatus);
        const statusBgColor = getStatusBgColor(order.orderStatus);
        const orderDate = new Date(order.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });

        return (
            <View key={order._id} style={styles.orderCard}>
                {/* Status Badge - Top Right Corner */}
                <View style={[styles.statusBadge, { backgroundColor: statusBgColor }]}>
                    <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                    <Text style={[styles.statusText, { color: statusColor }]}>
                        {order.orderStatus}
                    </Text>
                </View>

                {/* Order Header */}
                <View style={styles.orderHeader}>
                    <Image
                        source={{ uri: order.items[0]?.productId?.images?.[0] || 'default' }}
                        style={styles.orderImage}
                        defaultSource={IMG.Potato}
                    />
                    <View style={styles.orderInfo}>
                        <Text style={styles.orderTitle} numberOfLines={2}>
                            {order.items[0]?.productId?.name || 'Order Items'}
                        </Text>
                        <View style={styles.orderMetaRow}>
                            <MaterialIcons name="receipt" size={14} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                            <Text style={styles.orderId}>#{order._id.slice(-8)}</Text>
                        </View>
                        <View style={styles.orderMetaRow}>
                            <MaterialIcons name="event" size={14} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                            <Text style={styles.orderDate}>{orderDate}</Text>
                        </View>
                    </View>
                </View>

                {/* Price and Items Count */}
                <View style={styles.priceContainer}>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Total Amount</Text>
                        <Text style={styles.orderPrice}>₹{order.finalAmount}</Text>
                    </View>
                    <View style={styles.itemsCountContainer}>
                        <MaterialIcons name="shopping-bag" size={16} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                        <Text style={styles.itemsCountText}>{order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}</Text>
                    </View>
                </View>

                {/* Order Items List */}
                <View style={styles.orderItemsContainer}>
                    {order.items.map((item, index) => (
                        <View key={index} style={styles.itemRow}>
                            <View style={styles.itemBullet} />
                            <Text style={styles.orderItemText} numberOfLines={1}>
                                {item.productId?.name}
                            </Text>
                            <Text style={styles.itemQuantity}>× {item.quantity}</Text>
                        </View>
                    ))}
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtonsContainer}>
                    {isCurrentOrder && order.orderStatus !== 'delivered' && order.orderStatus !== 'cancelled' && (
                        <TouchableOpacity
                            style={styles.trackOrderButton}
                            onPress={() => navigation.navigate('OrderTrackingScreen', { orderId: order._id })}
                        >
                            <MaterialIcons name="local-shipping" size={18} color="#fff" />
                            <Text style={styles.trackOrderText}>Track Order</Text>
                        </TouchableOpacity>
                    )}
                    
                    {order?.orderStatus?.toLowerCase() === 'delivered' && (
                        <TouchableOpacity
                            style={styles.downloadButton}
                            onPress={() => exportToPDF(order.items[0])}
                        >
                            <MaterialIcons name="download" size={18} color={isDarkMode ? '#fff' : App_Primary_color} />
                            <Text style={styles.downloadText}>Download Invoice</Text>
                        </TouchableOpacity>
                    )}
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
            backgroundColor: isDarkMode ? '#0F0F0F' : '#F9FAFB',
        },
        header: {
            backgroundColor: isDarkMode ? '#1F1F1F' : 'white',
            paddingTop: 10,
            paddingBottom: 15,
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? '#2A2A2A' : '#F3F4F6',
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
            color: isDarkMode ? 'white' : 'black',
            fontSize: 18,
            fontWeight: '700',
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
        },
        headerRight: {
            width: 40,
        },
        content: {
            flex: 1,
            backgroundColor: isDarkMode ? '#0F0F0F' : '#F9FAFB',
        },
        tabContainer: {
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 12,
            backgroundColor: isDarkMode ? '#1F1F1F' : 'white',
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? '#2A2A2A' : '#E5E7EB',
        },
        tabButton: {
            marginRight: 32,
            paddingBottom: 12,
        },
        tabText: {
            fontSize: 15,
            color: isDarkMode ? '#9CA3AF' : '#6B7280',
            fontWeight: '500',
            fontFamily: FONTS_FAMILY.Poppins_Medium,
        },
        tabTextActive: {
            color: isDarkMode ? '#fff' : '#111827',
            fontWeight: '600',
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
        },
        tabIndicator: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            backgroundColor: isDarkMode ? '#fff' : App_Primary_color,
            borderRadius: 2,
        },
        scrollView: {
            flex: 1,
        },
        scrollContent: {
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 30,
        },
        orderCard: {
            backgroundColor: isDarkMode ? '#1F1F1F' : 'white',
            borderRadius: 16,
            padding: 16,
            marginBottom: 14,
            shadowColor: isDarkMode ? '#000' : '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: isDarkMode ? 0.3 : 0.08,
            shadowRadius: 8,
            elevation: 3,
            borderWidth: 1,
            borderColor: isDarkMode ? '#2A2A2A' : '#F3F4F6',
            position: 'relative',
        },
        statusBadge: {
            position: 'absolute',
            top: 12,
            right: 12,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 20,
            zIndex: 1,
        },
        statusDot: {
            width: 6,
            height: 6,
            borderRadius: 3,
            marginRight: 6,
        },
        statusText: {
            fontSize: 11,
            fontWeight: '600',
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            textTransform: 'capitalize',
        },
        orderHeader: {
            flexDirection: 'row',
            marginBottom: 14,
            paddingTop: 8,
        },
        orderImage: {
            width: 70,
            height: 70,
            borderRadius: 12,
            marginRight: 12,
            backgroundColor: isDarkMode ? '#2A2A2A' : '#F3F4F6',
        },
        orderInfo: {
            flex: 1,
            justifyContent: 'center',
            paddingRight: 70,
        },
        orderTitle: {
            fontSize: 15,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: isDarkMode ? 'white' : '#111827',
            marginBottom: 6,
            lineHeight: 20,
        },
        orderMetaRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 3,
        },
        orderId: {
            fontSize: 13,
            color: isDarkMode ? '#9CA3AF' : '#6B7280',
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            marginLeft: 4,
        },
        orderDate: {
            fontSize: 13,
            color: isDarkMode ? '#9CA3AF' : '#6B7280',
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            marginLeft: 4,
        },
        priceContainer: {
            backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.08)' : '#F0F9FF',
            borderRadius: 10,
            padding: 12,
            // marginBottom: 12,
        },
        priceRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // marginBottom: 6,
        },
        priceLabel: {
            fontSize: 12,
            color: isDarkMode ? '#9CA3AF' : '#6B7280',
            fontFamily: FONTS_FAMILY.Poppins_Regular,
        },
        orderPrice: {
            fontSize: 16,
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            color: isDarkMode ? '#fff' : '#111827',
        },
        itemsCountContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        itemsCountText: {
            fontSize: 13,
            color: isDarkMode ? '#9CA3AF' : '#6B7280',
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            marginLeft: 5,
        },
        orderItemsContainer: {
            backgroundColor: isDarkMode ? '#0F0F0F' : '#F9FAFB',
            borderRadius: 10,
            padding: 12,
            marginBottom: 12,
        },
        itemRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 6,
        },
        itemBullet: {
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: isDarkMode ? '#9CA3AF' : '#6B7280',
            marginRight: 8,
        },
        orderItemText: {
            flex: 1,
            fontSize: 13,
            color: isDarkMode ? '#D1D5DB' : '#374151',
            fontFamily: FONTS_FAMILY.Poppins_Regular,
        },
        itemQuantity: {
            fontSize: 12,
            color: isDarkMode ? '#9CA3AF' : '#6B7280',
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            marginLeft: 8,
        },
        actionButtonsContainer: {
            flexDirection: 'row',
            gap: 10,
        },
        trackOrderButton: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: App_Primary_color,
            paddingVertical: 6,
            borderRadius: 10,
            gap: 8,
        },
        trackOrderText: {
            fontSize: 14,
            color: '#fff',
            fontWeight: '600',
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
        },
        downloadButton: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDarkMode ? '#2A2A2A' : '#F3F4F6',
            paddingVertical: 12,
            borderRadius: 10,
            gap: 8,
            borderWidth: 1,
            borderColor: isDarkMode ? '#3A3A3A' : '#E5E7EB',
        },
        downloadText: {
            fontSize: 14,
            color: isDarkMode ? '#fff' : '#111827',
            fontWeight: '600',
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 80,
        },
        emptyText: {
            fontSize: 15,
            color: isDarkMode ? '#9CA3AF' : '#6B7280',
            textAlign: 'center',
            fontFamily: FONTS_FAMILY.Poppins_Regular,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar 
                barStyle={isDarkMode ? "light-content" : "dark-content"} 
                backgroundColor={isDarkMode ? '#1F1F1F' : white} 
            />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="chevron-back" size={24} color={isDarkMode ? 'white' : 'black'} />
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
                            <BlinKitLoader isDarkMode={isDarkMode}/>
                        </View>
                    ) : currentOrdersList.length > 0 ? (
                        currentOrdersList.map((order) =>
                            renderOrderCard(order, activeTab === 'Current Order')
                        )
                    ) : (
                        <View style={styles.emptyContainer}>
                            <MaterialIcons 
                                name="shopping-cart" 
                                size={64} 
                                color={isDarkMode ? '#374151' : '#D1D5DB'} 
                                style={{ marginBottom: 16 }}
                            />
                            <Text style={styles.emptyText}>
                                No {activeTab === 'Current Order' ? 'current' : 'previous'} orders found
                            </Text>
                        </View>
                    )}
                    <View style={{ height: 60 }} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default MyOrdersPage;