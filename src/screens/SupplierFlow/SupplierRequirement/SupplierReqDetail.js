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
    TextInput,
} from 'react-native';
import { App_Primary_color, dark33, darkMode25, white } from '../../../common/Colors/colors';
import { FONTS_FAMILY } from '../../../assets/Fonts';
import { apiGet, apiPost, apiPut, apiDelete } from '../../../utils/Apis';
import { BackIcon } from '../../../assets/SVGs';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ToastMsg } from '../../../utils/helperFunctions';

const { width } = Dimensions.get('window');

export default function SupplierRequirementDetails({ navigation, route }) {
    const { requirementId } = route.params;
    const { isDarkMode } = useSelector(state => state.theme);

    const [requirementDetails, setRequirementDetails] = useState(null);
    const [myBid, setMyBid] = useState(null);
    const [isUploading, setIsUploading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Modal states
    const [isCreateBidModalOpen, setIsCreateBidModalOpen] = useState(false);
    const [isUpdateBidModalOpen, setIsUpdateBidModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    // Bid form states
    const [itemsWithBrands, setItemsWithBrands] = useState([]);
    const [deliveryDate, setDeliveryDate] = useState('');
    const [note, setNote] = useState('');

    const headerAnim = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        fetchData();
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

    const fetchData = async () => {
        try {
            setIsUploading(true);
            await Promise.all([
                getRequirementDetails(),
                getMyBid()
            ]);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const getRequirementDetails = async () => {
        try {
            const response = await apiGet(`/api/admin/GetARequirementDetail/${requirementId}`);
            setRequirementDetails(response.data);
        } catch (error) {
            console.error('Error fetching requirement details:', error);
        }
    };

    const getMyBid = async () => {
        try {
            const response = await apiGet(`/api/supplier/GetBidOnRequirement/${requirementId}`);
            setMyBid(response.data);
        } catch (error) {
            console.error('Error fetching bid:', error);
            setMyBid(null);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };

    const handleCreateBidClick = () => {
        if (!requirementDetails) return;

        const items = requirementDetails.Items.map((item) => ({
            productName: item.productName,
            quantity: item.quantity,
            size: item.size || '',
            brands: item.brandNames.map((brand) => ({
                brandName: brand.brandName,
                price: '',
            })),
        }));

        setItemsWithBrands(items);
        setDeliveryDate('');
        setNote('');
        setIsCreateBidModalOpen(true);
    };

    const handleUpdateBidClick = () => {
        if (!myBid) return;

        const items = myBid.Items.map((item) => ({
            productName: item.productName,
            quantity: item.quantity,
            size: item.size || '',
            brands: item.brands.map((brand) => ({
                brandName: brand.brandName,
                price: brand.price?.toString() || '',
            })),
        }));

        setItemsWithBrands(items);
        setDeliveryDate(myBid.DeliveryDate?.slice(0, 10) || '');
        setNote(myBid.Note || '');
        setMenuVisible(false);
        setIsUpdateBidModalOpen(true);
    };

    const handleDeleteBidClick = () => {
        setMenuVisible(false);
        setIsDeleteModalOpen(true);
    };

    const createBid = async () => {
        try {
            // Validation
            const hasEmptyPrice = itemsWithBrands.some(item =>
                item.brands.some(brand => !brand.price || brand.price === '')
            );

            if (hasEmptyPrice) {
                Alert.alert('Validation Error', 'Please fill all brand prices');
                return;
            }

            if (!deliveryDate) {
                Alert.alert('Validation Error', 'Please select delivery date');
                return;
            }

            setIsUploading(true);

            const payload = {
                requirementId: requirementId,
                Items: itemsWithBrands.map(item => ({
                    ...item,
                    brands: item.brands.map(brand => ({
                        ...brand,
                        price: Number(brand.price)
                    }))
                })),
                DeliveryDate: deliveryDate,
                Note: note,
            };

            const response = await apiPost('/api/supplier/CreateBidForRequirement', payload);
            ToastMsg(response?.message || 'Bid created successfully');
            setIsCreateBidModalOpen(false);
            await fetchData();
        } catch (error) {
            Alert.alert('Error', error?.response?.data?.message || 'Failed to create bid');
        } finally {
            setIsUploading(false);
        }
    };

    const updateBid = async () => {
        try {
            // Validation
            const hasEmptyPrice = itemsWithBrands.some(item =>
                item.brands.some(brand => !brand.price || brand.price === '')
            );

            if (hasEmptyPrice) {
                Alert.alert('Validation Error', 'Please fill all brand prices');
                return;
            }

            if (!deliveryDate) {
                Alert.alert('Validation Error', 'Please select delivery date');
                return;
            }

            setIsUploading(true);

            const payload = {
                Items: itemsWithBrands.map(item => ({
                    ...item,
                    brands: item.brands.map(brand => ({
                        ...brand,
                        price: Number(brand.price)
                    }))
                })),
                DeliveryDate: deliveryDate,
                Note: note,
            };

            const response = await apiPut(`/api/supplier/UpdateBidForRequirement/${myBid._id}`, payload);
            ToastMsg(response?.message || 'Bid updated successfully');
            setIsUpdateBidModalOpen(false);
            await fetchData();
        } catch (error) {
            Alert.alert('Error', error?.response?.data?.message || 'Failed to update bid');
        } finally {
            setIsUploading(false);
        }
    };

    const deleteBid = async () => {
        try {
            setIsUploading(true);
            await apiDelete(`/api/supplier/DeleteBidForRequirement/${myBid._id}`);
            ToastMsg('Bid deleted successfully');
            setIsDeleteModalOpen(false);
            await fetchData();
        } catch (error) {
            Alert.alert('Error', 'Failed to delete bid');
        } finally {
            setIsUploading(false);
        }
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

    const updateBrandPrice = (itemIndex, brandIndex, value) => {
        const updated = [...itemsWithBrands];
        updated[itemIndex].brands[brandIndex].price = value;
        setItemsWithBrands(updated);
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
            justifyContent: 'space-between',
            marginBottom: 16,
            paddingBottom: 8,
            borderBottomWidth: 2,
        },
        sectionHeaderLeft: {
            flexDirection: 'row',
            alignItems: 'center',
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
            backgroundColor: '#DBEAFE',
            borderWidth: 1,
            borderColor: '#93C5FD',
        },
        brandChipText: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 11,
            color: '#1D4ED8',
        },
        createBidButton: {
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
        createBidButtonDisabled: {
            backgroundColor: '#ccc',
        },
        createBidButtonText: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 14,
            color: white,
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
            width: width - 40,
            maxHeight: '90%',
        },
        modalHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
            paddingBottom: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#e0e0e0',
        },
        modalTitle: {
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 18,
            color: '#333',
        },
        modalScrollContent: {
            maxHeight: '70%',
        },
        formItemBox: {
            backgroundColor: '#f8f9fa',
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: '#e0e0e0',
        },
        formItemTitle: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 14,
            color: '#333',
            marginBottom: 12,
        },
        formRow: {
            flexDirection: 'row',
            gap: 12,
            marginBottom: 12,
        },
        formField: {
            flex: 1,
        },
        formLabel: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 12,
            color: '#666',
            marginBottom: 6,
        },
        input: {
            backgroundColor: white,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 13,
            color: '#333',
        },
        inputDisabled: {
            backgroundColor: '#f0f0f0',
            color: '#999',
        },
        brandPriceRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginBottom: 10,
        },
        brandNameText: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 12,
            color: '#333',
            minWidth: 100,
        },
        brandPriceInput: {
            flex: 1,
        },
        modalButtons: {
            flexDirection: 'row',
            gap: 12,
            marginTop: 20,
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
        deleteModalContent: {
            backgroundColor: white,
            borderRadius: 16,
            padding: 24,
            width: width - 80,
        },
        deleteModalTitle: {
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 18,
            color: '#333',
            marginBottom: 12,
        },
        deleteModalText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 14,
            color: '#666',
            marginBottom: 20,
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
                {myBid && (
                    <TouchableOpacity onPress={() => setMenuVisible(true)}>
                        <Icon name="dots-vertical" size={24} color="#333" />
                    </TouchableOpacity>
                )}
            </View>
        </Animated.View>
    );

    const renderBidFormModal = (isUpdate = false) => {
        const modalVisible = isUpdate ? isUpdateBidModalOpen : isCreateBidModalOpen;
        const closeModal = () => isUpdate ? setIsUpdateBidModalOpen(false) : setIsCreateBidModalOpen(false);
        const submitAction = isUpdate ? updateBid : createBid;

        return (
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {isUpdate ? '✏️ Update Bid' : '📝 Create Bid'}
                            </Text>
                            <TouchableOpacity onPress={closeModal}>
                                <Icon name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalScrollContent} showsVerticalScrollIndicator={false}>
                            {itemsWithBrands.map((item, itemIndex) => (
                                <View key={itemIndex} style={styles.formItemBox}>
                                    <Text style={styles.formItemTitle}>
                                        {itemIndex + 1}. {item.productName}
                                    </Text>

                                    <View style={styles.formRow}>
                                        <View style={styles.formField}>
                                            <Text style={styles.formLabel}>Quantity</Text>
                                            <TextInput
                                                style={[styles.input, styles.inputDisabled]}
                                                value={item.quantity?.toString()}
                                                editable={false}
                                            />
                                        </View>
                                        <View style={styles.formField}>
                                            <Text style={styles.formLabel}>Size</Text>
                                            <TextInput
                                                style={[styles.input, styles.inputDisabled]}
                                                value={item.size}
                                                editable={false}
                                            />
                                        </View>
                                    </View>

                                    <Text style={[styles.formLabel, { marginTop: 8, marginBottom: 12 }]}>
                                        Brand Prices
                                    </Text>

                                    {item.brands.map((brand, brandIndex) => (
                                        <View key={brandIndex} style={styles.brandPriceRow}>
                                            <Text style={styles.brandNameText}>{brand.brandName}</Text>
                                            <TextInput
                                                style={[styles.input, styles.brandPriceInput]}
                                                placeholder="Enter price"
                                                keyboardType="numeric"
                                                value={brand.price}
                                                placeholderTextColor={'gray'}
                                                onChangeText={(value) => updateBrandPrice(itemIndex, brandIndex, value)}
                                            />
                                        </View>
                                    ))}
                                </View>
                            ))}

                            <View style={styles.formField}>
                                <Text style={styles.formLabel}>Delivery Date *</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="YYYY-MM-DD"
                                    value={deliveryDate}
                                    onChangeText={setDeliveryDate}
                                    placeholderTextColor={'gray'}

                                />
                            </View>

                            <View style={[styles.formField, { marginTop: 16 }]}>
                                <Text style={styles.formLabel}>Note (Optional)</Text>
                                <TextInput
                                    style={[styles.input, { minHeight: 80, textAlignVertical: 'top' }]}
                                    placeholder="Enter note"
                                    multiline
                                    numberOfLines={4}
                                    value={note}
                                    onChangeText={setNote}
                                    placeholderTextColor={'gray'}

                                />
                            </View>
                        </ScrollView>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalButtonOutline]}
                                onPress={closeModal}
                            >
                                <Text style={[styles.modalButtonText, styles.modalButtonTextOutline]}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalButtonFilled]}
                                onPress={submitAction}
                                disabled={isUploading}
                            >
                                {isUploading ? (
                                    <ActivityIndicator size="small" color={white} />
                                ) : (
                                    <Text style={[styles.modalButtonText, styles.modalButtonTextFilled]}>
                                        {isUpdate ? 'Update' : 'Create'}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

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
                        onPress={handleUpdateBidClick}
                    >
                        <Icon name="pencil" size={20} color={App_Primary_color} />
                        <Text style={styles.menuItemText}>Update Bid</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={handleDeleteBidClick}
                    >
                        <Icon name="delete" size={20} color="#EF4444" />
                        <Text style={[styles.menuItemText, { color: '#EF4444' }]}>Delete Bid</Text>
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
                <View style={styles.deleteModalContent}>
                    <Text style={styles.deleteModalTitle}>Confirm Delete</Text>
                    <Text style={styles.deleteModalText}>
                        Are you sure you want to delete your bid?
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
                            onPress={deleteBid}
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
            {renderBidFormModal(false)}
            {renderBidFormModal(true)}

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
                    {!myBid && (
                        <TouchableOpacity
                            style={[styles.createBidButton, myBid && styles.createBidButtonDisabled]}
                            onPress={handleCreateBidClick}
                            disabled={!!myBid}
                        >
                            <Icon name="plus-circle" size={20} color={white} />
                            <Text style={styles.createBidButtonText}>Create Bid</Text>
                        </TouchableOpacity>
                    )}

                    <View style={styles.sectionCard}>
                        <View style={[styles.sectionHeader, { borderBottomColor: '#1976d2' }]}>
                            <View style={styles.sectionHeaderLeft}>
                                <Icon name="account" size={20} color="#1976d2" />
                                <Text style={[styles.sectionTitle, { color: '#1976d2' }]}>
                                    User Information
                                </Text>
                            </View>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Name:</Text>
                            <Text style={styles.infoValue}>{requirementDetails?.User?.FullName || 'N/A'}</Text>
                        </View>
                    </View>

                    <View style={styles.sectionCard}>
                        <View style={[styles.sectionHeader, { borderBottomColor: '#388e3c' }]}>
                            <View style={styles.sectionHeaderLeft}>
                                <Icon name="map-marker" size={20} color="#388e3c" />
                                <Text style={[styles.sectionTitle, { color: '#388e3c' }]}>
                                    Location
                                </Text>
                            </View>
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
                            <Text style={styles.infoLabel}>Pincode:</Text>
                            <Text style={styles.infoValue}>{requirementDetails?.Location?.Pincode || 'N/A'}</Text>
                        </View>
                    </View>

                    {requirementDetails?.Items?.length > 0 && (
                        <View style={styles.sectionCard}>
                            <View style={[styles.sectionHeader, { borderBottomColor: '#f57c00' }]}>
                                <View style={styles.sectionHeaderLeft}>
                                    <Icon name="package-variant" size={20} color="#f57c00" />
                                    <Text style={[styles.sectionTitle, { color: '#f57c00' }]}>
                                        Items Required
                                    </Text>
                                </View>
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
                                                <View key={idx} style={styles.brandChip}>
                                                    <Text style={styles.brandChipText}>
                                                        {brand?.brandName}
                                                    </Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>
                    )}

                    <View style={styles.sectionCard}>
                        <View style={[styles.sectionHeader, { borderBottomColor: '#6a1b9a' }]}>
                            <View style={styles.sectionHeaderLeft}>
                                <Icon name="information" size={20} color="#6a1b9a" />
                                <Text style={[styles.sectionTitle, { color: '#6a1b9a' }]}>
                                    Additional Info
                                </Text>
                            </View>
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
                            <Text style={styles.infoLabel}>Timeline:</Text>
                            <Text style={styles.infoValue}>{formatDateOnly(requirementDetails?.TimeLine)}</Text>
                        </View>
                    </View>

                    {myBid && (
                        <View style={styles.sectionCard}>
                            <View style={[styles.sectionHeader, { borderBottomColor: '#0288d1' }]}>
                                <View style={styles.sectionHeaderLeft}>
                                    <Icon name="clipboard-text" size={20} color="#0288d1" />
                                    <Text style={[styles.sectionTitle, { color: '#0288d1' }]}>
                                        Your Bid Details
                                    </Text>
                                </View>
                            </View>

                            {myBid?.Items?.map((item, index) => (
                                <View key={index} style={styles.itemBox}>
                                    <Text style={styles.itemName}>
                                        {index + 1}. {item.productName}
                                    </Text>
                                    <Text style={styles.itemDetail}>
                                        Quantity: <Text style={{ fontWeight: 'bold' }}>{item.quantity}</Text>
                                    </Text>
                                    {item?.brands?.length > 0 && (
                                        <View style={styles.brandChipsContainer}>
                                            {item.brands.map((brand, idx) => (
                                                <View key={idx} style={[styles.brandChip, { backgroundColor: '#E8F5E9', borderColor: '#81C784' }]}>
                                                    <Text style={[styles.brandChipText, { color: '#2E7D32' }]}>
                                                        {brand.brandName} - ₹{brand.price}
                                                    </Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            ))}

                            <View style={[styles.infoRow, { marginTop: 12 }]}>
                                <Text style={styles.infoLabel}>Delivery Date:</Text>
                                <Text style={styles.infoValue}>{formatDateOnly(myBid?.DeliveryDate)}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Note:</Text>
                                <Text style={styles.infoValue}>{myBid?.Note || 'N/A'}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Status:</Text>
                                <View style={[
                                    styles.statusBadge,
                                    { backgroundColor: myBid?.Status === 'pending' ? '#EF4444' : '#10B981' }
                                ]}>
                                    <Text style={styles.statusText}>{myBid?.Status || 'N/A'}</Text>
                                </View>
                            </View>
                        </View>
                    )}

                    <View style={{ height: 20 }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}