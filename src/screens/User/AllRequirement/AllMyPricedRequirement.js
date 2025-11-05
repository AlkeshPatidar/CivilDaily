import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    Image,
    RefreshControl,
    Animated,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    Alert,
} from 'react-native';
import { App_Primary_color, dark33, darkMode25, white } from '../../../common/Colors/colors';
import { FONTS_FAMILY } from '../../../assets/Fonts';
import { apiGet, apiPut } from '../../../utils/Apis';
import { BackIcon } from '../../../assets/SVGs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
// import AcceptModal from './AcceptModal';
// import RejectModal from './RejectModal';

export default function AllMyPricedRequirements({ navigation }) {
    const { isDarkMode } = useSelector(state => state.theme);
    const [allMyPricedRequirement, setAllMyPricedRequirement] = useState([]);
    const [isUploading, setIsUploading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedRequirement, setSelectedRequirement] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [userRemark, setUserRemark] = useState('');
    const [selectedBrands, setSelectedBrands] = useState([]);

    const headerAnim = useRef(new Animated.Value(-100)).current;

    const getAllMyPricedRequirements = async () => {
        try {
            setIsUploading(true);
            const response = await apiGet('/api/user/GetMyPricedRequirements');
            setAllMyPricedRequirement(response.data);
            setIsUploading(false);
        } catch (error) {
            setIsUploading(false);
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getAllMyPricedRequirements();
        animateHeader();
    }, []);

    const animateHeader = () => {
        Animated.spring(headerAnim, {
            toValue: 0,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await getAllMyPricedRequirements();
        setRefreshing(false);
    };

    const handleAccept = (req) => {
        setSelectedRequirement(req);
        setSelectedId(req?._id);
        setShowAcceptModal(true);
        setOpenMenuId(null);
    };

    const closeAccept = () => {
        setSelectedRequirement(null);
        setSelectedId(null);
        setShowAcceptModal(false);
        setOpenMenuId(null);
    };

    const handleReject = (req) => {
        setSelectedRequirement(req);
        setSelectedId(req?._id);
        setShowRejectModal(true);
        setOpenMenuId(null);
    };

    const closeReject = () => {
        setSelectedRequirement(null);
        setSelectedId(null);
        setShowRejectModal(false);
        setUserRemark('');
        setOpenMenuId(null);
    };

    const acceptRequirement = async (brands) => {
        const hasInvalid = brands.some((b) => !b.brandName);
        if (hasInvalid) {
            Alert.alert('Error', 'Please select a brand for all items.');
            return;
        }

        const data = {
            selectedBrands: brands,
        };

        try {
            setIsUploading(true);
            const response = await apiPut(`api/user/SelectAndAcceptRequirement/${selectedId}`, data);
            console.log('Requirement Accepted:', response?.data);
            Alert.alert('Success', response?.message || 'Requirement accepted successfully!');
            setIsUploading(false);
            closeAccept();
            getAllMyPricedRequirements();
        } catch (error) {
            setIsUploading(false);
            Alert.alert('Error', error?.response?.data?.message || 'Error accepting requirement.');
            console.log(error);
        }
    };

    const rejectRequirement = async () => {
        if (!userRemark || userRemark.trim().length === 0) {
            Alert.alert('Error', 'Rejection reason is required!');
            return;
        }

        const data = {
            UserRemark: userRemark,
        };

        try {
            setIsUploading(true);
            const response = await apiPut(`api/user/UserRejectRequirement/${selectedId}`, data);
            console.log('Requirement Rejected:', response?.data);
            Alert.alert('Success', response?.message || 'Requirement rejected successfully!');
            setIsUploading(false);
            closeReject();
            getAllMyPricedRequirements();
        } catch (error) {
            setIsUploading(false);
            Alert.alert('Error', error?.response?.data?.message || 'Error rejecting requirement.');
            console.log(error);
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
            gap: 10,
        },
        headerTitle: {
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 20,
            color: App_Primary_color,
            flex: 1,
        },
        contentContainer: {
            padding: 16,
        },
        loaderContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 60,
        },
        emptyText: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 14,
            color: '#999',
            marginTop: 12,
        },
        requirementCard: {
            backgroundColor: white,
            borderRadius: 16,
            padding: 16,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
            borderWidth: 1,
            borderColor: '#e5e5e5',
        },
        projectName: {
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 16,
            color: App_Primary_color,
            marginBottom: 12,
        },
        headerRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 12,
        },
        infoSection: {
            flex: 1,
        },
        infoText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 13,
            color: '#666',
            lineHeight: 20,
            marginBottom: 4,
        },
        statusAndMenuRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        },
        statusBadge: {
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
        },
        statusPending: {
            backgroundColor: '#FFF3CD',
        },
        statusCompleted: {
            backgroundColor: '#D1F2EB',
        },
        statusText: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 11,
            textTransform: 'capitalize',
        },
        statusTextPending: {
            color: '#856404',
        },
        statusTextCompleted: {
            color: '#0F5132',
        },
        menuButton: {
            padding: 8,
            borderRadius: 20,
            backgroundColor: '#f5f5f5',
        },
        menuModal: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        menuContent: {
            backgroundColor: white,
            borderRadius: 12,
            width: 160,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 5,
        },
        menuItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 14,
            paddingHorizontal: 16,
            gap: 10,
        },
        menuItemAccept: {
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0',
        },
        menuItemText: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 13,
        },
        menuItemTextAccept: {
            color: '#28A745',
        },
        menuItemTextReject: {
            color: '#DC3545',
        },
        itemCard: {
            backgroundColor: '#F8F9FA',
            borderRadius: 12,
            padding: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: '#e5e5e5',
        },
        itemRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        itemLeft: {
            flex: 1,
        },
        itemName: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 13,
            color: '#333',
            marginBottom: 6,
        },
        itemDetail: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 11,
            color: '#666',
            marginBottom: 3,
        },
        itemPrice: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 11,
            color: '#28A745',
            marginTop: 4,
        },
        brandContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 8,
        },
        brandBadge: {
            backgroundColor: App_Primary_color,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 16,
        },
        brandText: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 11,
            color: white,
        },
        requirementImage: {
            width: '100%',
            height: 220,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#e5e5e5',
            marginTop: 12,
        },
        bottomSection: {
            marginTop: 16,
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: '#e5e5e5',
        },
        bottomRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        detailsSection: {
            flex: 1,
        },
        detailText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 12,
            color: '#333',
            marginBottom: 6,
        },
        detailButton: {
            backgroundColor: App_Primary_color,
            borderRadius: 25,
            paddingVertical: 12,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
        },
        detailButtonText: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 13,
            color: white,
        },
    });

    const renderHeader = () => (
        <Animated.View style={[styles.headerContainer, { transform: [{ translateY: headerAnim }] }]}>
            <StatusBar barStyle="dark-content" backgroundColor={white} />
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>📦 All Priced Requirements</Text>
            </View>
        </Animated.View>
    );

    const renderMenuModal = (reqId) => (
        <Modal
            visible={openMenuId === reqId}
            transparent
            animationType="fade"
            onRequestClose={() => setOpenMenuId(null)}
        >
            <TouchableOpacity
                style={styles.menuModal}
                activeOpacity={1}
                onPress={() => setOpenMenuId(null)}
            >
                <View style={styles.menuContent}>
                    <TouchableOpacity
                        style={[styles.menuItem, styles.menuItemAccept]}
                        onPress={() => handleAccept(allMyPricedRequirement.find(r => r._id === reqId))}
                    >
                        <Text style={{ fontSize: 16 }}>✅</Text>
                        <Text style={[styles.menuItemText, styles.menuItemTextAccept]}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleReject(allMyPricedRequirement.find(r => r._id === reqId))}
                    >
                        <Text style={{ fontSize: 16 }}>❌</Text>
                        <Text style={[styles.menuItemText, styles.menuItemTextReject]}>Reject</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );

    const renderRequirementItem = (req, index) => {
        let houseNo = "";
        let street = "";
        if (req?.Location?.Address?.includes("||")) {
            [houseNo, street] = req?.Location?.Address?.split("||");
        } else {
            street = req?.Location?.Address || "";
        }

        return (
            <View key={req?._id || index} style={styles.requirementCard}>
                {req?.Project?.Name && (
                    <Text style={styles.projectName}>📁 Project: {req.Project.Name}</Text>
                )}

                <View style={styles.headerRow}>
                    <View style={styles.infoSection}>
                        <Text style={styles.infoText}>
                            📅 <Text style={{ fontFamily: FONTS_FAMILY.Poppins_SemiBold }}>Timeline:</Text> {req?.TimeLine}
                        </Text>
                        <Text style={styles.infoText}>
                            📍 <Text style={{ fontFamily: FONTS_FAMILY.Poppins_SemiBold }}>Location:</Text>{" "}
                            {houseNo && <>{houseNo}, </>}
                            {street}, {req?.Location?.City} - {req?.Location?.Pincode}
                        </Text>
                    </View>

                    <View style={styles.statusAndMenuRow}>
                        <View style={[styles.statusBadge, req?.status === 'pending' ? styles.statusPending : styles.statusCompleted]}>
                            <Text style={[styles.statusText, req?.status === 'pending' ? styles.statusTextPending : styles.statusTextCompleted]}>
                                {req?.status}
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.menuButton}
                            onPress={() => setOpenMenuId(openMenuId === req._id ? null : req._id)}
                        >
                            <Ionicons name="ellipsis-vertical" size={18} color="#666" />
                        </TouchableOpacity>
                    </View>
                </View>

                {renderMenuModal(req._id)}

                {req?.Items && req?.Items?.length > 0 ? (
                    <View>
                        {req?.Items?.map((item, i) => (
                            <View key={i} style={styles.itemCard}>
                                <View style={styles.itemRow}>
                                    <View style={styles.itemLeft}>
                                        <Text style={styles.itemName}>{item?.productName}</Text>
                                        <Text style={styles.itemDetail}>Qty: {item?.quantity} | Size: {item?.size}</Text>
                                        {item?.price > 0 && (
                                            <Text style={styles.itemPrice}>Total Price: ₹{item?.price}</Text>
                                        )}
                                    </View>

                                    {item?.brandNames?.length > 0 && (
                                        <View style={styles.brandContainer}>
                                            {item?.brandNames?.map((brand, bIndex) => (
                                                <View key={bIndex} style={styles.brandBadge}>
                                                    <Text style={styles.brandText}>
                                                        {brand?.brandName}
                                                        {brand?.price ? ` (₹${brand?.price})` : ''}
                                                    </Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                ) : req?.Image ? (
                    <Image
                        source={{ uri: req?.Image }}
                        style={styles.requirementImage}
                        resizeMode="cover"
                    />
                ) : null}

                <View style={styles.bottomSection}>
                    <View style={styles.bottomRow}>
                        <View style={styles.detailsSection}>
                            {req?.qualityLevel && (
                                <Text style={styles.detailText}>
                                    <Text style={{ fontFamily: FONTS_FAMILY.Poppins_SemiBold }}>Quality:</Text> {req?.qualityLevel}
                                </Text>
                            )}
                            {req?.subQualityRating > 0 && (
                                <Text style={styles.detailText}>
                                    <Text style={{ fontFamily: FONTS_FAMILY.Poppins_SemiBold }}>Sub Quality Rating:</Text> {req?.subQualityRating} / 5
                                </Text>
                            )}
                            <Text style={styles.detailText}>
                                📞 <Text style={{ fontFamily: FONTS_FAMILY.Poppins_SemiBold }}>Helper Contact:</Text> {req?.HelperContact}
                            </Text>
                            <Text style={styles.detailText}>
                                📝 <Text style={{ fontFamily: FONTS_FAMILY.Poppins_SemiBold }}>Note:</Text> {req?.Note}
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.detailButton}
                            onPress={() => navigation.navigate('ProjectDetail', { id: req?.id })}
                        >
                            <Ionicons name="information-circle" size={18} color={white} />
                            <Text style={styles.detailButtonText}>Check Detail</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    if (isUploading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={App_Primary_color} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
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
                    {allMyPricedRequirement?.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={{ fontSize: 48 }}>🚫</Text>
                            <Text style={styles.emptyText}>No Priced project found</Text>
                        </View>
                    ) : (
                        allMyPricedRequirement?.map((req, index) => renderRequirementItem(req, index))
                    )}
                </View>
                <View style={{ height: 20 }} />
            </ScrollView>

            {/* <AcceptModal
                visible={showAcceptModal}
                selectedRequirement={selectedRequirement}
                onClose={closeAccept}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                onConfirm={acceptRequirement}
                isDarkMode={isDarkMode}
            />

            <RejectModal
                visible={showRejectModal}
                selectedRequirement={selectedRequirement}
                onClose={closeReject}
                userRemark={userRemark}
                setUserRemark={setUserRemark}
                onConfirm={rejectRequirement}
                isDarkMode={isDarkMode}
            /> */}
        </SafeAreaView>
    );
}