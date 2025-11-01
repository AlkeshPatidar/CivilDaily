import React, { useEffect, useState, useRef } from 'react';
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
    Alert,
} from 'react-native';
import { App_Primary_color, dark33, darkMode25, white } from '../../common/Colors/colors';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { apiGet, apiPost } from '../../utils/Apis';
import { BackIcon } from '../../assets/SVGs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
// import PaymentModal from './PaymentModal';

export default function AllMyAcceptedRequirements({ navigation }) {
    const { isDarkMode } = useSelector(state => state.theme);
    const [allMyAcceptedRequirement, setAllMyAcceptedRequirement] = useState([]);
    const [isUploading, setIsUploading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [paymentModal, setPaymentModal] = useState(false);
    const [selectedRequirementId, setSelectedRequirementId] = useState(null);
    const [selectedRequirementTotal, setSelectedRequirementTotal] = useState(null);

    const headerAnim = useRef(new Animated.Value(-100)).current;

    const getAllMyAcceptedRequirements = async () => {
        try {
            setIsUploading(true);
            const response = await apiGet('/api/user/GetMyAcceptedRequirements');
            setAllMyAcceptedRequirement(response.data);
            setIsUploading(false);
        } catch (error) {
            setIsUploading(false);
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getAllMyAcceptedRequirements();
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
        await getAllMyAcceptedRequirements();
        setRefreshing(false);
    };

    const openModel = (requirement) => {
        setPaymentModal(true);
        setSelectedRequirementId(requirement?._id);
        setSelectedRequirementTotal(requirement?.totalPrice);
    };

    const closeModel = () => {
        setPaymentModal(false);
        setSelectedRequirementId(null);
        setSelectedRequirementTotal(null);
    };

    const makePayment = async () => {
        try {
            setIsUploading(true);
            const paymentAmount = (selectedRequirementTotal * 0.25).toFixed(2);
            const data = {
                requirementId: selectedRequirementId,
                amount: paymentAmount,
                method: "upi",
                status: "success",
                transactionId: "TXN12345678",
                note: "Advance payment"
            };
            const response = await apiPost(`/api/user/CreateTransaction`, data);
            Alert.alert('Success', response?.message || 'Payment successful');
            setIsUploading(false);
            closeModel();
            getAllMyAcceptedRequirements();
        } catch (error) {
            setIsUploading(false);
            Alert.alert('Error', error?.response?.data?.message || 'Something went wrong');
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
            fontSize: 18,
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
        statusBadge: {
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            alignSelf: 'flex-start',
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
        sectionTitle: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 16,
            color: '#111',
            marginBottom: 12,
        },
        finalOrderCard: {
            backgroundColor: white,
            borderRadius: 12,
            padding: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: '#CCC',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
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
        brandLabel: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 11,
            color: '#0066CC',
            marginTop: 4,
        },
        itemPrice: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 11,
            color: '#28A745',
            marginTop: 4,
        },
        totalRow: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 12,
        },
        totalText: {
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 14,
            color: '#111',
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
        qualityText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 11,
            color: '#666',
            marginTop: 4,
        },
        starsContainer: {
            flexDirection: 'row',
            gap: 2,
            marginTop: 4,
        },
        starText: {
            fontSize: 14,
            color: '#FFC107',
        },
        brandContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 8,
        },
        brandBadge: {
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 16,
        },
        brandBadgeNormal: {
            backgroundColor: App_Primary_color,
        },
        brandBadgeSelected: {
            backgroundColor: '#1565C0',
        },
        brandText: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 11,
            color: white,
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
        priceSection: {
            marginTop: 12,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: '#e5e5e5',
        },
        priceText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 12,
            color: '#333',
            marginBottom: 4,
        },
        buttonsContainer: {
            gap: 12,
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
        paymentButton: {
            backgroundColor: '#28A745',
            borderRadius: 25,
            paddingVertical: 12,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
        },
        buttonText: {
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
                <Text style={styles.headerTitle}>📦 All Accepted Requirements</Text>
            </View>
        </Animated.View>
    );

    const renderStars = (rating) => {
        return (
            <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Text key={star} style={styles.starText}>
                        {rating >= star ? "★" : "☆"}
                    </Text>
                ))}
            </View>
        );
    };

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

                    <View style={[styles.statusBadge, req?.status === 'pending' ? styles.statusPending : styles.statusCompleted]}>
                        <Text style={[styles.statusText, req?.status === 'pending' ? styles.statusTextPending : styles.statusTextCompleted]}>
                            {req?.status}
                        </Text>
                    </View>
                </View>

                {req?.FinalOrder?.items && req?.FinalOrder?.items?.length > 0 ? (
                    <View>
                        <Text style={styles.sectionTitle}>Final Order</Text>
                        {req?.FinalOrder?.items?.map((item, i) => (
                            <View key={i} style={styles.finalOrderCard}>
                                <Text style={styles.itemName}>{item?.productName}</Text>
                                <Text style={styles.itemDetail}>Qty: {item?.quantity} | Size: {item?.size}</Text>
                                {item?.brandName && (
                                    <Text style={styles.brandLabel}>
                                        ✅ Brand: <Text style={{ fontFamily: FONTS_FAMILY.Poppins_SemiBold }}>{item?.brandName}</Text>
                                    </Text>
                                )}
                                {item?.price > 0 && (
                                    <Text style={styles.itemPrice}>Price: ₹{item?.price}</Text>
                                )}
                            </View>
                        ))}
                        <View style={styles.totalRow}>
                            <Text style={styles.totalText}>Total: ₹{req?.FinalOrder?.totalPrice}</Text>
                        </View>
                    </View>
                ) : req?.Items && req?.Items?.length > 0 ? (
                    <View>
                        <Text style={styles.sectionTitle}>Requested Items</Text>
                        {req?.Items?.map((item, i) => (
                            <View key={i} style={styles.itemCard}>
                                <View style={styles.itemRow}>
                                    <View style={styles.itemLeft}>
                                        <Text style={styles.itemName}>{item?.productName}</Text>
                                        <Text style={styles.itemDetail}>Qty: {item?.quantity} | Size: {item?.size}</Text>
                                        {item?.qualityLevel && (
                                            <Text style={styles.qualityText}>Quality: {item.qualityLevel}</Text>
                                        )}
                                        {item?.subQualityRating > 0 && renderStars(item.subQualityRating)}
                                        {item?.price > 0 && (
                                            <Text style={styles.itemPrice}>Total Price: ₹{item?.price}</Text>
                                        )}
                                    </View>

                                    {item?.brandNames?.length > 0 && (
                                        <View style={styles.brandContainer}>
                                            {item?.brandNames?.map((brand, bIndex) => (
                                                <View
                                                    key={bIndex}
                                                    style={[
                                                        styles.brandBadge,
                                                        brand?.brandName === item?.selectedBrand?.brandName
                                                            ? styles.brandBadgeSelected
                                                            : styles.brandBadgeNormal
                                                    ]}
                                                >
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

                            <View style={styles.priceSection}>
                                <Text style={styles.priceText}>
                                    💰 <Text style={{ fontFamily: FONTS_FAMILY.Poppins_SemiBold }}>Total Price:</Text> ₹{req?.totalPrice || 0}
                                </Text>
                                <Text style={styles.priceText}>
                                    💸 <Text style={{ fontFamily: FONTS_FAMILY.Poppins_SemiBold }}>Paid:</Text> ₹{req?.paidAmount || 0}
                                </Text>
                                <Text style={styles.priceText}>
                                    💼 <Text style={{ fontFamily: FONTS_FAMILY.Poppins_SemiBold }}>Remaining:</Text> ₹{req?.remainingAmount || 0}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={styles.detailButton}
                                onPress={() => navigation.navigate('ProjectDetail', { id: req?.id })}
                            >
                                <Ionicons name="information-circle" size={18} color={white} />
                                <Text style={styles.buttonText}>Check Detail</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.paymentButton}
                                onPress={() => openModel(req)}
                            >
                                <MaterialCommunityIcons name="credit-card" size={18} color={white} />
                                <Text style={styles.buttonText}>Make Payment</Text>
                            </TouchableOpacity>
                        </View>
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
                    {allMyAcceptedRequirement?.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={{ fontSize: 48 }}>🚫</Text>
                            <Text style={styles.emptyText}>No Accepted project found</Text>
                        </View>
                    ) : (
                        allMyAcceptedRequirement?.map((req, index) => renderRequirementItem(req, index))
                    )}
                </View>
                <View style={{ height: 20 }} />
            </ScrollView>

            {/* <PaymentModal
                visible={paymentModal}
                onClose={closeModel}
                totalAmount={selectedRequirementTotal}
                onConfirm={makePayment}
                isDarkMode={isDarkMode}
            /> */}
        </SafeAreaView>
    );
}