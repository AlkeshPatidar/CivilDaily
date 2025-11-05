import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    RefreshControl,
    Animated,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    Alert,
    Dimensions,
    Linking,
    PermissionsAndroid,
    Platform,
} from 'react-native';
import { App_Primary_color, dark33, darkMode25, white } from '../../../../common/Colors/colors';
import { FONTS_FAMILY } from '../../../../assets/Fonts';
import { apiGet, apiDelete } from '../../../../utils/Apis';
import { BackIcon } from '../../../../assets/SVGs';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFS from 'react-native-fs'
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import RNPrint from 'react-native-print'
import { ToastMsg } from '../../../../utils/helperFunctions';
// import * as Print from 'expo-print';
// import * as Sharing from 'expo-sharing';

const { width } = Dimensions.get('window');

export default function ExecutiveRequirementDetails({ navigation, route }) {
    const { requirementId } = route.params;
    const { isDarkMode } = useSelector(state => state.theme);
    
    const [requirementDetails, setRequirementDetails] = useState(null);
    const [isUploading, setIsUploading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [invoiceModalVisible, setInvoiceModalVisible] = useState(false);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

    const headerAnim = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        getRequirementDetails();
        animateHeader();
    }, [requirementId]);

    const animateHeader = () => {
        Animated.spring(headerAnim, {
            toValue: 0,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const getRequirementDetails = async () => {
        try {
            setIsUploading(true);
            const response = await apiGet(`/api/executive/GetRequirementDetail/${requirementId}`);
            setRequirementDetails(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            Alert.alert('Error', 'Failed to load requirement details');
        } finally {
            setIsUploading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await getRequirementDetails();
        setRefreshing(false);
    };

    const deleteRequirement = async () => {
        try {
            await apiDelete(`/api/executive/DeleteUserRequirement/${requirementId}`);
            ToastMsg('Requirement deleted successfully');
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting:', error);
            ToastMsg('Failed to delete requirement');
        }
    };

    const handleDeleteClick = () => {
        setMenuVisible(false);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        setIsDeleteModalOpen(false);
        deleteRequirement();
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDateOnly = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

      const requestStoragePermission = async () => {
    if (Platform.OS !== 'android') return true
    
    try {
        // Android 13+ (API 33+) - No permission needed for Downloads folder
        if (Platform.Version >= 33) {
            console.log('Android 13+: No permission needed for Downloads')
            return true
        }

        // Android 10-12 (API 29-32) - Scoped Storage
        if (Platform.Version >= 29) {
            console.log('Android 10-12: Using scoped storage')
            return true // No permission needed for app-specific directories
        }

        // Android 9 and below - Need WRITE_EXTERNAL_STORAGE
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Storage Permission Required',
                message: 'This app needs storage access to save PDF files.',
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
                'Please enable storage permission in app settings to save PDFs.',
                [
                    {
                        text: 'Open Settings',
                        onPress: () => Linking.openSettings(),
                    },
                    { text: 'Cancel', style: 'cancel' },
                ],
            )
            return false
        } else {
            Alert.alert('Permission Denied', 'Cannot save PDF without storage permission.')
            return false
        }
    } catch (err) {
        console.warn('Permission error:', err)
        return false
    }
}


const generateInvoiceHTML = (requirementDetails) => {
  if (!requirementDetails) return '';

  const itemsHTML = requirementDetails?.Items?.map((item, idx) => `
    <div class="item-box">
      <p><strong>${idx + 1}. ${item.productName}</strong></p>
      <p>Quantity: ${item.quantity} | Size: ${item.size}</p>
      ${item.selectedBrand ? `<p>✅ Selected Brand: ${item.selectedBrand.brandName} - ₹${item.selectedBrand.price}</p>` : ''}
      ${item.brandNames?.length > 0 ? `<p>Other Brands: ${item.brandNames.map(b => `${b.brandName} (₹${b.price})`).join(', ')}</p>` : ''}
    </div>
  `).join('') || '';

  const transactionsHTML = requirementDetails?.transactions?.length > 0 ? `
    <section class="invoice-section">
      <h2>💳 Transactions</h2>
      <table class="invoice-table">
        <thead>
          <tr>
            <th>Txn ID</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Note</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          ${requirementDetails.transactions.map(txn => `
            <tr>
              <td>${txn.transactionId}</td>
              <td>₹${txn.amount}</td>
              <td>${txn.method}</td>
              <td>${txn.status}</td>
              <td>${txn.note || '-'}</td>
              <td>${formatDate(txn.createdAt)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </section>
  ` : '';

  const statusHistoryHTML = requirementDetails?.statusHistory?.length > 0 ? `
    <section class="invoice-section">
      <h2>📈 Status History</h2>
      <table class="invoice-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Note</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          ${requirementDetails.statusHistory.map(statusItem => `
            <tr>
              <td><strong>${statusItem.status.replace(/_/g, ' ')}</strong></td>
              <td>${statusItem.note || '-'}</td>
              <td>${formatDate(statusItem.createdAt)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </section>
  ` : '';

  const quotationsHTML = requirementDetails?.Quotations?.length > 0 ? `
    <section class="invoice-section">
      <h2>📦 Quotations</h2>
      ${requirementDetails.Quotations.map((quote, qIdx) => `
        <div style="margin-bottom: 20px; border: 1px solid #ddd; padding: 10px; border-radius: 8px;">
          <h3 style="color: #1976d2;">📑 Quote ${quote.quoteNumber}</h3>
          <table class="invoice-table">
            <thead>
              <tr>
                <th>Product (Brand)</th>
                <th>Size</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${quote.items.map((item, idx) => {
                const total = Number(item?.quantity) * Number(item?.price || 0);
                return `
                  <tr>
                    <td>${idx + 1}. ${item?.productName} (${item?.brandName})</td>
                    <td>${item?.size}</td>
                    <td>${item?.quantity}</td>
                    <td>₹${item?.price}</td>
                    <td><strong>₹${total}</strong></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
          <p style="text-align: right; font-weight: bold; margin-top: 10px;">Grand Total: ₹${quote?.totalPrice}</p>
        </div>
      `).join('')}
    </section>
  ` : '';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Requirement Invoice</title>
        <style>
          body { font-family: 'Segoe UI', sans-serif; padding: 30px; background: #f9f9f9; }
          .invoice-container { background: white; padding: 30px; border-radius: 8px; max-width: 1000px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          .invoice-header { text-align: center; margin-bottom: 20px; }
          .invoice-title { font-size: 28px; margin: 0; color: #2d6a4f; }
          .invoice-subtitle { font-size: 14px; color: #777; }
          .invoice-section { margin-top: 30px; }
          .invoice-section h2 { font-size: 18px; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 12px; }
          .invoice-section p { margin: 4px 0; }
          .item-box { margin-bottom: 12px; padding: 8px; background: #f1f1f1; border-left: 4px solid #ccc; }
          .invoice-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          .invoice-table th, .invoice-table td { border: 1px solid #ccc; padding: 8px; font-size: 12px; text-align: left; }
          .invoice-footer { text-align: center; font-size: 12px; margin-top: 40px; color: #666; }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="invoice-header">
            <h1 class="invoice-title">🧾 Requirement Invoice</h1>
            <p class="invoice-subtitle">Generated on: ${new Date().toLocaleDateString()}</p>
          </div>

          <section class="invoice-section">
            <h2>👤 User Information</h2>
            <p><strong>Name:</strong> ${requirementDetails?.User?.FullName || 'N/A'}</p>
            <p><strong>Email:</strong> ${requirementDetails?.User?.Email || 'N/A'}</p>
            <p><strong>Phone:</strong> ${requirementDetails?.User?.Number || 'N/A'}</p>
          </section>

          <section class="invoice-section">
            <h2>📍 Location</h2>
            <p><strong>Address:</strong> ${requirementDetails?.Location?.Address || 'N/A'}</p>
            <p><strong>City:</strong> ${requirementDetails?.Location?.City || 'N/A'}</p>
            <p><strong>Pincode:</strong> ${requirementDetails?.Location?.Pincode || 'N/A'}</p>
            <p><strong>State:</strong> ${requirementDetails?.Location?.State || 'N/A'}</p>
          </section>

          <section class="invoice-section">
            <h2>📦 Items Required</h2>
            ${itemsHTML}
          </section>

          ${quotationsHTML}

          <section class="invoice-section">
            <h2>💰 Payment Summary</h2>
            <p><strong>Total:</strong> ₹${requirementDetails?.totalPrice ?? 0}</p>
            <p><strong>Paid:</strong> ₹${requirementDetails?.paidAmount ?? 0}</p>
            <p><strong>Remaining:</strong> ₹${requirementDetails?.remainingAmount ?? 0}</p>
          </section>

          ${transactionsHTML}

          ${statusHistoryHTML}

          <section class="invoice-section">
            <h2>📝 Additional Info</h2>
            <p><strong>Quality Level:</strong> ${requirementDetails?.qualityLevel || 'N/A'}</p>
            <p><strong>Sub Quality Rating:</strong> ${requirementDetails?.subQualityRating || 'N/A'}</p>
            <p><strong>Note:</strong> ${requirementDetails?.Note || 'N/A'}</p>
            <p><strong>Status:</strong> ${requirementDetails?.status || 'N/A'}</p>
            <p><strong>Helper Name:</strong> ${requirementDetails?.HelperName || 'NOT AVAILABLE'}</p>
            <p><strong>Helper Contact:</strong> ${requirementDetails?.HelperContact || 'NOT AVAILABLE'}</p>
            <p><strong>Admin Remark:</strong> ${requirementDetails?.AdminRemark || 'NOT AVAILABLE'}</p>
            <p><strong>Timeline:</strong> ${formatDateOnly(requirementDetails?.TimeLine)}</p>
          </section>

          <footer class="invoice-footer">
            <p>This document is auto-generated and does not require a signature.</p>
          </footer>
        </div>
      </body>
    </html>
  `;
};

 const handleDownloadInvoice = async (requirementDetails, showLoader, hideLoader) => {
  const permission = await requestStoragePermission();
  if (!permission) {
    return Alert.alert('Permission Denied', 'Cannot save PDF without storage permission.');
  }

  if (!requirementDetails) {
    return Alert.alert('No Data', 'No requirement details available to export.');
  }

  try {
    // showLoader && showLoader();
    setInvoiceModalVisible(false)

    const html = generateInvoiceHTML(requirementDetails);
    const userName = requirementDetails?.User?.FullName || 'Invoice';
    const fileName = `Invoice_${userName.replace(/\s+/g, '_')}_${Date.now()}`;

    // Convert HTML to PDF
    const file = await RNHTMLtoPDF.convert({
      html,
      fileName: fileName,
      directory: 'Documents',
      base64: false,
    });

    // Move to Downloads folder
    const destPath = `${RNFS.DownloadDirectoryPath}/${fileName}.pdf`;
    await RNFS.moveFile(file.filePath, destPath);

    // hideLoader && hideLoader();

    Alert.alert(
      'Success', 
      `Invoice saved to:\n${destPath}`,
      [
        {
          text: 'Print',
          onPress: () => {RNPrint.print({ filePath: destPath })
        },
        },
        { text: 'OK' },
      ]
    );
  } catch (error) {
    hideLoader && hideLoader();
    console.error('Invoice PDF export error:', error);
    Alert.alert('Error', 'Could not generate invoice PDF. Please try again.');
  }
};

    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? darkMode25 : '#f5f5f5',
        },
        headerContainer: {
            backgroundColor: white,
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        topBar: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        topBarLeft: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
        },
        headerTitle: {
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 18,
            color: App_Primary_color,
        },
        contentContainer: {
            padding: 16,
        },
        loaderContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 100,
        },
        sectionCard: {
            backgroundColor: white,
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        sectionHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
            paddingBottom: 8,
            borderBottomWidth: 2,
        },
        sectionTitle: {
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 16,
            marginLeft: 8,
        },
        infoRow: {
            flexDirection: 'row',
            marginBottom: 8,
        },
        infoLabel: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 13,
            color: '#333',
            width: 140,
        },
        infoValue: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 13,
            color: '#666',
            flex: 1,
        },
        itemBox: {
            backgroundColor: '#f8f9fa',
            borderRadius: 12,
            padding: 12,
            marginBottom: 12,
            borderLeftWidth: 4,
            borderLeftColor: '#f57c00',
        },
        itemName: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 14,
            color: '#333',
            marginBottom: 6,
        },
        itemDetail: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 12,
            color: '#666',
            marginBottom: 4,
        },
        brandChipsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 6,
            marginTop: 6,
        },
        brandChip: {
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 12,
            borderWidth: 1,
        },
        brandChipSelected: {
            backgroundColor: '#10B981',
            borderColor: '#059669',
        },
        brandChipNormal: {
            backgroundColor: '#DBEAFE',
            borderColor: '#93C5FD',
        },
        brandChipText: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 11,
            color: white,
        },
        brandChipTextNormal: {
            color: '#1D4ED8',
        },
        quotationBox: {
            backgroundColor: '#f8f9fa',
            borderRadius: 12,
            padding: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: '#ddd',
        },
        quotationTitle: {
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 14,
            color: '#1976d2',
            marginBottom: 12,
        },
        tableHeader: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            paddingBottom: 8,
            marginBottom: 8,
        },
        tableRow: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
            paddingVertical: 8,
        },
        tableCell: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 11,
            color: '#666',
        },
        tableCellBold: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 11,
            color: '#333',
        },
        totalRow: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 8,
            paddingTop: 8,
            borderTopWidth: 1,
            borderTopColor: '#ddd',
        },
        totalText: {
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 13,
            color: '#333',
        },
        statusBadge: {
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 12,
            alignSelf: 'flex-start',
        },
        statusText: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 12,
            color: white,
        },
        downloadButton: {
            backgroundColor: App_Primary_color,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 14,
            paddingHorizontal: 20,
            borderRadius: 12,
            marginBottom: 16,
            gap: 8,
        },
        downloadButtonText: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 14,
            color: white,
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContent: {
            backgroundColor: white,
            borderRadius: 16,
            padding: 24,
            width: width - 60,
            maxWidth: 400,
        },
        modalTitle: {
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 18,
            color: '#333',
            marginBottom: 12,
        },
        modalText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 14,
            color: '#666',
            marginBottom: 20,
        },
        modalButtons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 12,
        },
        modalButton: {
            flex: 1,
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: 'center',
        },
        modalButtonOutline: {
            borderWidth: 1,
            borderColor: App_Primary_color,
        },
        modalButtonFilled: {
            backgroundColor: App_Primary_color,
        },
        modalButtonText: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 14,
        },
        modalButtonTextOutline: {
            color: App_Primary_color,
        },
        modalButtonTextFilled: {
            color: white,
        },
        menuOverlay: {
            flex: 1,
            backgroundColor: 'transparent',
        },
        menuContent: {
            position: 'absolute',
            top: 60,
            right: 16,
            backgroundColor: white,
            borderRadius: 8,
            padding: 8,
            minWidth: 150,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        menuItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 12,
            gap: 12,
        },
        menuItemText: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 14,
            color: '#333',
        },
        transactionRow: {
            backgroundColor: '#f8f9fa',
            borderRadius: 8,
            padding: 12,
            marginBottom: 8,
        },
        txnDetail: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 4,
        },
        txnLabel: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 12,
            color: '#666',
        },
        txnValue: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 12,
            color: '#333',
        },
    });

    const renderHeader = () => (
        <Animated.View style={[styles.headerContainer, { transform: [{ translateY: headerAnim }] }]}>
            <StatusBar barStyle="dark-content" backgroundColor={white} />
            <View style={styles.topBar}>
                <View style={styles.topBarLeft}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Requirement Details</Text>
                </View>
                <TouchableOpacity onPress={() => setMenuVisible(true)}>
                    <Icon name="dots-vertical" size={24} color="#333" />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );

    const renderMenu = () => (
        <Modal
            visible={menuVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setMenuVisible(false)}
        >
            <TouchableOpacity
                style={styles.menuOverlay}
                activeOpacity={1}
                onPress={() => setMenuVisible(false)}
            >
                <View style={styles.menuContent}>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={handleDeleteClick}
                    >
                        <Icon name="delete" size={20} color="#EF4444" />
                        <Text style={[styles.menuItemText, { color: '#EF4444' }]}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );

    const renderDeleteModal = () => (
        <Modal
            visible={isDeleteModalOpen}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setIsDeleteModalOpen(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Confirm Delete</Text>
                    <Text style={styles.modalText}>
                        Are you sure you want to delete this requirement?
                    </Text>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.modalButtonOutline]}
                            onPress={() => setIsDeleteModalOpen(false)}
                        >
                            <Text style={[styles.modalButtonText, styles.modalButtonTextOutline]}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.modalButtonFilled]}
                            onPress={handleConfirmDelete}
                        >
                            <Text style={[styles.modalButtonText, styles.modalButtonTextFilled]}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );

    if (isUploading && !refreshing) {
        return (
            <SafeAreaView style={styles.container}>
                {renderHeader()}
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={App_Primary_color} />
                </View>
            </SafeAreaView>
        );
    }

    if (!requirementDetails) {
        return (
            <SafeAreaView style={styles.container}>
                {renderHeader()}
                <View style={styles.loaderContainer}>
                    <Text style={styles.infoValue}>No data found</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderMenu()}
            {renderDeleteModal()}

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[App_Primary_color]}
                        tintColor={App_Primary_color}
                    />
                }
            >
                <View style={styles.contentContainer}>
                    {/* User Information */}
                    <View style={styles.sectionCard}>
                        <View style={[styles.sectionHeader, { borderBottomColor: '#1976d2' }]}>
                            <Icon name="account" size={20} color="#1976d2" />
                            <Text style={[styles.sectionTitle, { color: '#1976d2' }]}>
                                User Information
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Name:</Text>
                            <Text style={styles.infoValue}>{requirementDetails?.User?.FullName || 'N/A'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Email:</Text>
                            <Text style={styles.infoValue}>{requirementDetails?.User?.Email || 'N/A'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Phone:</Text>
                            <Text style={styles.infoValue}>{requirementDetails?.User?.Number || 'N/A'}</Text>
                        </View>
                    </View>

                    {/* Location */}
                    <View style={styles.sectionCard}>
                        <View style={[styles.sectionHeader, { borderBottomColor: '#388e3c' }]}>
                            <Icon name="map-marker" size={20} color="#388e3c" />
                            <Text style={[styles.sectionTitle, { color: '#388e3c' }]}>
                                Location
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Address:</Text>
                            <Text style={styles.infoValue}>{requirementDetails?.Location?.Address || 'N/A'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>City:</Text>
                            <Text style={styles.infoValue}>{requirementDetails?.Location?.City || 'N/A'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>State:</Text>
                            <Text style={styles.infoValue}>{requirementDetails?.Location?.State || 'N/A'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Pincode:</Text>
                            <Text style={styles.infoValue}>{requirementDetails?.Location?.Pincode || 'N/A'}</Text>
                        </View>
                    </View>

                    {/* Items Required */}
                    {requirementDetails?.Items?.length > 0 && (
                        <View style={styles.sectionCard}>
                            <View style={[styles.sectionHeader, { borderBottomColor: '#f57c00' }]}>
                                <Icon name="package-variant" size={20} color="#f57c00" />
                                <Text style={[styles.sectionTitle, { color: '#f57c00' }]}>
                                    Items Required
                                </Text>
                            </View>
                            {requirementDetails.Items.map((item, index) => (
                                <View key={index} style={styles.itemBox}>
                                    <Text style={styles.itemName}>
                                        {index + 1}. {item?.productName}
                                    </Text>
                                    <Text style={styles.itemDetail}>
                                        Quantity: <Text style={{ fontWeight: 'bold' }}>{item?.quantity}</Text>
                                    </Text>
                                    <Text style={styles.itemDetail}>
                                        Size: <Text style={{ fontWeight: 'bold' }}>{item?.size}</Text>
                                    </Text>
                                    {item?.brandNames?.length > 0 && (
                                        <View style={styles.brandChipsContainer}>
                                            {item.brandNames.map((brand, idx) => (
                                                <View
                                                    key={idx}
                                                    style={[
                                                        styles.brandChip,
                                                        brand?.brandName === item?.selectedBrand?.brandName
                                                            ? styles.brandChipSelected
                                                            : styles.brandChipNormal,
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.brandChipText,
                                                            brand?.brandName !== item?.selectedBrand?.brandName &&
                                                                styles.brandChipTextNormal,
                                                        ]}
                                                    >
                                                        {brand?.brandName}
                                                    </Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                    {item?.Note && (
                                        <Text style={[styles.itemDetail, { marginTop: 6 }]}>
                                            Note: <Text style={{ fontWeight: 'bold' }}>{item.Note}</Text>
                                        </Text>
                                    )}
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Quotations */}
                    {requirementDetails?.Quotations?.length > 0 && (
                        <View style={styles.sectionCard}>
                            <View style={[styles.sectionHeader, { borderBottomColor: '#f57c00' }]}>
                                <Icon name="file-document-outline" size={20} color="#f57c00" />
                                <Text style={[styles.sectionTitle, { color: '#f57c00' }]}>
                                    Quotations / Items
                                </Text>
                            </View>
                            {requirementDetails.Quotations.map((quote, qIdx) => (
                                <View key={qIdx} style={styles.quotationBox}>
                                    <Text style={styles.quotationTitle}>
                                        📑 Quote {quote.quoteNumber}
                                    </Text>
                                    
                                    <View style={styles.tableHeader}>
                                        <Text style={[styles.tableCellBold, { flex: 2 }]}>Product (Brand)</Text>
                                        <Text style={[styles.tableCellBold, { flex: 1 }]}>Size</Text>
                                        <Text style={[styles.tableCellBold, { flex: 1 }]}>Qty</Text>
                                        <Text style={[styles.tableCellBold, { flex: 1 }]}>Price</Text>
                                        <Text style={[styles.tableCellBold, { flex: 1 }]}>Total</Text>
                                    </View>

                                    {quote.items.map((item, idx) => {
                                        const total = Number(item?.quantity) * Number(item?.price || 0);
                                        return (
                                            <View key={idx} style={styles.tableRow}>
                                                <Text style={[styles.tableCell, { flex: 2 }]}>
                                                    {idx + 1}. {item?.productName} ({item?.brandName})
                                                </Text>
                                                <Text style={[styles.tableCell, { flex: 1 }]}>{item?.size}</Text>
                                                <Text style={[styles.tableCell, { flex: 1 }]}>{item?.quantity}</Text>
                                                <Text style={[styles.tableCell, { flex: 1 }]}>₹{item?.price}</Text>
                                                <Text style={[styles.tableCellBold, { flex: 1 }]}>₹{total}</Text>
                                            </View>
                                        );
                                    })}

                                    <View style={styles.totalRow}>
                                        <Text style={styles.totalText}>
                                            Grand Total: ₹{quote?.totalPrice}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Additional Info */}
                    <View style={styles.sectionCard}>
                        <View style={[styles.sectionHeader, { borderBottomColor: '#6a1b9a' }]}>
                            <Icon name="information" size={20} color="#6a1b9a" />
                            <Text style={[styles.sectionTitle, { color: '#6a1b9a' }]}>
                                Additional Info
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Quality Level:</Text>
                            <Text style={styles.infoValue}>{requirementDetails?.qualityLevel || 'N/A'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Sub Quality Rating:</Text>
                            <Text style={styles.infoValue}>{requirementDetails?.subQualityRating || 'N/A'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Note:</Text>
                            <Text style={styles.infoValue}>{requirementDetails?.Note || 'N/A'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Status:</Text>
                            <View style={[
                                styles.statusBadge,
                                { backgroundColor: requirementDetails?.status === 'pending' ? '#EF4444' : '#10B981' }
                            ]}>
                                <Text style={styles.statusText}>{requirementDetails?.status || 'N/A'}</Text>
                            </View>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Helper Name:</Text>
                            <Text style={styles.infoValue}>{requirementDetails?.HelperName || 'NOT AVAILABLE'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Helper Contact:</Text>
                            <Text style={styles.infoValue}>{requirementDetails?.HelperContact || 'NOT AVAILABLE'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Admin Remark:</Text>
                            <Text style={styles.infoValue}>{requirementDetails?.AdminRemark || 'NOT AVAILABLE'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Timeline:</Text>
                            <Text style={styles.infoValue}>{formatDateOnly(requirementDetails?.TimeLine)}</Text>
                        </View>
                    </View>

                    {/* Payment Information */}
                    <View style={styles.sectionCard}>
                        <View style={[styles.sectionHeader, { borderBottomColor: '#0288d1' }]}>
                            <Icon name="currency-inr" size={20} color="#0288d1" />
                            <Text style={[styles.sectionTitle, { color: '#0288d1' }]}>
                                Payment Information
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Total Price:</Text>
                            <Text style={styles.infoValue}>₹{requirementDetails?.totalPrice || 0}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Paid:</Text>
                            <Text style={styles.infoValue}>₹{requirementDetails?.paidAmount || 0}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Remaining:</Text>
                            <Text style={styles.infoValue}>₹{requirementDetails?.remainingAmount || 0}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Created At:</Text>
                            <Text style={styles.infoValue}>{formatDate(requirementDetails?.createdAt)}</Text>
                        </View>
                    </View>

                    {/* Transactions */}
                    {requirementDetails?.transactions?.length > 0 && (
                        <View style={styles.sectionCard}>
                            <View style={[styles.sectionHeader, { borderBottomColor: '#00bcd4' }]}>
                                <Icon name="credit-card" size={20} color="#00bcd4" />
                                <Text style={[styles.sectionTitle, { color: '#00bcd4' }]}>
                                    Transactions
                                </Text>
                            </View>
                            {requirementDetails.transactions.map((txn, idx) => (
                                <View key={idx} style={styles.transactionRow}>
                                    <View style={styles.txnDetail}>
                                        <Text style={styles.txnLabel}>Txn ID:</Text>
                                        <Text style={styles.txnValue}>{txn.transactionId}</Text>
                                    </View>
                                    <View style={styles.txnDetail}>
                                        <Text style={styles.txnLabel}>Amount:</Text>
                                        <Text style={styles.txnValue}>₹{txn.amount}</Text>
                                    </View>
                                    <View style={styles.txnDetail}>
                                        <Text style={styles.txnLabel}>Method:</Text>
                                        <Text style={styles.txnValue}>{txn.method}</Text>
                                    </View>
                                    <View style={styles.txnDetail}>
                                        <Text style={styles.txnLabel}>Status:</Text>
                                        <Text style={styles.txnValue}>{txn.status}</Text>
                                    </View>
                                    {txn.note && (
                                        <View style={styles.txnDetail}>
                                            <Text style={styles.txnLabel}>Note:</Text>
                                            <Text style={styles.txnValue}>{txn.note}</Text>
                                        </View>
                                    )}
                                    <View style={styles.txnDetail}>
                                        <Text style={styles.txnLabel}>Date:</Text>
                                        <Text style={styles.txnValue}>{formatDate(txn.createdAt)}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Status History */}
                    {requirementDetails?.statusHistory?.length > 0 && (
                        <View style={styles.sectionCard}>
                            <View style={[styles.sectionHeader, { borderBottomColor: '#ff4081' }]}>
                                <Icon name="chart-timeline-variant" size={20} color="#ff4081" />
                                <Text style={[styles.sectionTitle, { color: '#ff4081' }]}>
                                    Status History
                                </Text>
                            </View>
                            {requirementDetails.statusHistory.map((statusItem, idx) => (
                                <View key={idx} style={styles.transactionRow}>
                                    <View style={styles.txnDetail}>
                                        <Text style={styles.txnLabel}>Status:</Text>
                                        <Text style={[styles.txnValue, { textTransform: 'capitalize' }]}>
                                            {statusItem.status.replace(/_/g, ' ')}
                                        </Text>
                                    </View>
                                    {statusItem.note && (
                                        <View style={styles.txnDetail}>
                                            <Text style={styles.txnLabel}>Note:</Text>
                                            <Text style={styles.txnValue}>{statusItem.note}</Text>
                                        </View>
                                    )}
                                    <View style={styles.txnDetail}>
                                        <Text style={styles.txnLabel}>Date:</Text>
                                        <Text style={styles.txnValue}>{formatDate(statusItem.createdAt)}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Download Invoice Button */}
                    <TouchableOpacity
                        style={styles.downloadButton}
                        onPress={() => setInvoiceModalVisible(true)}
                        disabled={isGeneratingPdf}
                    >
                        {isGeneratingPdf ? (
                            <ActivityIndicator size="small" color={white} />
                        ) : (
                            <>
                                <Icon name="download" size={20} color={white} />
                                <Text style={styles.downloadButtonText}>Download Invoice</Text>
                            </>
                        )}
                    </TouchableOpacity>

                    <View style={{ height: 20 }} />
                </View>
            </ScrollView>

            {/* Invoice Confirmation Modal */}
            <Modal
                visible={invoiceModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setInvoiceModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Download Invoice</Text>
                        <Text style={styles.modalText}>
                            This will generate a PDF invoice with all the requirement details. Do you want to continue?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalButtonOutline]}
                                onPress={() => setInvoiceModalVisible(false)}
                            >
                                <Text style={[styles.modalButtonText, styles.modalButtonTextOutline]}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalButtonFilled]}
                                onPress={handleDownloadInvoice}
                                disabled={isGeneratingPdf}
                            >
                                {isGeneratingPdf ? (
                                    <ActivityIndicator size="small" color={white} />
                                ) : (
                                    <Text style={[styles.modalButtonText, styles.modalButtonTextFilled]}>
                                        Download
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}