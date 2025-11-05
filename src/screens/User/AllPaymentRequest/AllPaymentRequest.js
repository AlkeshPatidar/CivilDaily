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
    Image,
} from 'react-native';
import { App_Primary_color, dark33, darkMode25, white } from '../../../common/Colors/colors';
import { FONTS_FAMILY } from '../../../assets/Fonts';
import { apiGet } from '../../../utils/Apis';
import { BackIcon } from '../../../assets/SVGs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

export default function AllPaymentRequest({ navigation }) {
    const { isDarkMode } = useSelector(state => state.theme);
    const [isUploading, setIsUploading] = useState(true);
    const [allPaymentRequest, setAllPaymentRequest] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('Pending');
    const [refreshing, setRefreshing] = useState(false);

    const headerAnim = useRef(new Animated.Value(-100)).current;

    const getAllPaymentRequest = async (status = 'Pending') => {
        try {
            setIsUploading(true);
            const response = await apiGet(`/api/user/GetUserAllPaymentReq?status=${status}`);
            setAllPaymentRequest(response?.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        getAllPaymentRequest(selectedStatus);
        animateHeader();
    }, [selectedStatus]);

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
        await getAllPaymentRequest(selectedStatus);
        setRefreshing(false);
    };

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'approved':
                return <Ionicons name="checkmark-circle" size={20} color="#28A745" />;
            case 'pending':
                return <Ionicons name="alert-circle" size={20} color="#FFC107" />;
            case 'rejected':
                return <Ionicons name="close-circle" size={20} color="#DC3545" />;
            default:
                return <Ionicons name="alert-circle" size={20} color="#999" />;
        }
    };

    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'approved':
                return { bg: '#D1F2EB', text: '#0F5132', border: '#A8DADC' };
            case 'pending':
                return { bg: '#FFF3CD', text: '#856404', border: '#FFE69C' };
            case 'rejected':
                return { bg: '#F8D7DA', text: '#721C24', border: '#F5C6CB' };
            default:
                return { bg: '#E9ECEF', text: '#495057', border: '#DEE2E6' };
        }
    };

    const formatCurrency = (amount) => {
        return `₹${amount?.toLocaleString('en-IN') || 0}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatTimeline = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const statusOptions = ['', 'Pending', 'Approved', 'Rejected'];

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
        headerSubtext: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 13,
            color: '#666',
            marginTop: 4,
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
        statusContainer: {
            flexDirection: 'row',
            gap: 10,
            marginBottom: 16,
            paddingHorizontal: 16,
            paddingTop: 16,
        },
        statusButton: {
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            borderWidth: 1,
            height:40
        },
        statusButtonActive: {
            backgroundColor: App_Primary_color,
            borderColor: App_Primary_color,
        },
        statusButtonInactive: {
            backgroundColor: white,
            borderColor: '#CCC',
        },
        statusButtonText: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 13,
        },
        statusButtonTextActive: {
            color: white,
        },
        statusButtonTextInactive: {
            color: '#666',
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 60,
        },
        emptyIcon: {
            marginBottom: 16,
        },
        emptyTitle: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 16,
            color: '#333',
            marginBottom: 8,
        },
        emptyText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 13,
            color: '#666',
            textAlign: 'center',
        },
        requestCard: {
            backgroundColor: white,
            borderRadius: 16,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
            borderWidth: 1,
            borderColor: '#e5e5e5',
            overflow: 'hidden',
        },
        cardHeader: {
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0',
        },
        cardHeaderTop: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 12,
        },
        cardHeaderLeft: {
            flex: 1,
        },
        cardHeaderRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginBottom: 8,
        },
        indexBadge: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 12,
            color: '#999',
        },
        cardTitle: {
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 16,
            color: '#111',
            flex: 1,
        },
        statusBadge: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 16,
            borderWidth: 1,
            gap: 4,
        },
        statusBadgeText: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 11,
            textTransform: 'capitalize',
        },
        infoGrid: {
            gap: 8,
        },
        infoRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        },
        infoText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 12,
            color: '#666',
            flex: 1,
        },
        transactionId: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 11,
            color: '#999',
            marginTop: 4,
        },
        paymentImage: {
            width: 80,
            height: 80,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#e5e5e5',
            marginLeft: 12,
        },
        imageLabel: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 10,
            color: '#999',
            textAlign: 'center',
            marginTop: 4,
        },
        cardBody: {
            padding: 16,
        },
        detailsGrid: {
            gap: 16,
        },
        detailSection: {
            flexDirection: 'row',
            gap: 12,
        },
        detailIcon: {
            marginTop: 2,
        },
        detailContent: {
            flex: 1,
        },
        detailTitle: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 13,
            color: '#333',
            marginBottom: 4,
        },
        detailText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 12,
            color: '#666',
            lineHeight: 18,
        },
        itemsHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12,
        },
        itemsTitle: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 13,
            color: '#333',
        },
        itemsCount: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 12,
            color: '#999',
        },
        noteContainer: {
            backgroundColor: '#E3F2FD',
            padding: 12,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#90CAF9',
        },
        noteText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 12,
            color: '#1565C0',
            lineHeight: 18,
        },
    });

    const renderHeader = () => (
        <Animated.View style={[styles.headerContainer, { transform: [{ translateY: headerAnim }] }]}>
            <StatusBar barStyle="dark-content" backgroundColor={white} />
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={styles.headerTitle}>Payment Requests</Text>
                    <Text style={styles.headerSubtext}>Track and manage your payment requests</Text>
                </View>
            </View>
        </Animated.View>
    );

    const renderStatusButtons = () => (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.statusContainer}
            contentContainerStyle={{ gap: 10 }}
        >
            {statusOptions.map((status) => (
                <TouchableOpacity
                    key={status || 'All'}
                    onPress={() => handleStatusChange(status)}
                    style={[
                        styles.statusButton,
                        selectedStatus === status ? styles.statusButtonActive : styles.statusButtonInactive
                    ]}
                >
                    <Text style={[
                        styles.statusButtonText,
                        selectedStatus === status ? styles.statusButtonTextActive : styles.statusButtonTextInactive
                    ]}>
                        {status || 'All'}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

    const renderPaymentRequest = (request, index) => {
        const req = request?.requirement;
        const location = req?.Location;
        const statusStyle = getStatusStyle(request.status);

        return (
            <View key={request._id} style={styles.requestCard}>
                <View style={styles.cardHeader}>
                    <View style={styles.cardHeaderTop}>
                        <View style={styles.cardHeaderLeft}>
                            <View style={styles.cardHeaderRow}>
                                <Text style={styles.indexBadge}>#{index + 1}</Text>
                                <Text style={styles.cardTitle} numberOfLines={1}>{req?.Note}</Text>
                            </View>

                            <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg, borderColor: statusStyle.border }]}>
                                {getStatusIcon(request.status)}
                                <Text style={[styles.statusBadgeText, { color: statusStyle.text }]}>
                                    {request.status}
                                </Text>
                            </View>
                        </View>

                        {request.Image && (
                            <View>
                                <Image
                                    source={{ uri: request.Image }}
                                    style={styles.paymentImage}
                                    resizeMode="cover"
                                />
                                <Text style={styles.imageLabel}>Payment Proof</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.infoGrid}>
                        <View style={styles.infoRow}>
                            <MaterialCommunityIcons name="credit-card" size={16} color="#999" />
                            <Text style={styles.infoText}>
                                {formatCurrency(request.amount)} via {request.method}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="time-outline" size={16} color="#999" />
                            <Text style={styles.infoText}>{formatDate(request.createdAt)}</Text>
                        </View>
                    </View>

                    <Text style={styles.transactionId}>Transaction ID: {request.transactionId}</Text>
                </View>

                <View style={styles.cardBody}>
                    <View style={styles.detailsGrid}>
                        <View style={styles.detailSection}>
                            <View style={styles.detailIcon}>
                                <Ionicons name="location-outline" size={20} color="#999" />
                            </View>
                            <View style={styles.detailContent}>
                                <Text style={styles.detailTitle}>Delivery Location</Text>
                                <Text style={styles.detailText}>
                                    {location?.Address}{'\n'}
                                    {location?.City} - {location?.Pincode}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.detailSection}>
                            <View style={styles.detailIcon}>
                                <Ionicons name="time-outline" size={20} color="#999" />
                            </View>
                            <View style={styles.detailContent}>
                                <Text style={styles.detailTitle}>Expected Timeline</Text>
                                <Text style={styles.detailText}>{formatTimeline(req?.TimeLine)}</Text>
                            </View>
                        </View>

                        <View style={styles.detailSection}>
                            <View style={styles.detailIcon}>
                                <MaterialCommunityIcons name="package-variant" size={20} color="#999" />
                            </View>
                            <View style={styles.detailContent}>
                                <View style={styles.itemsHeader}>
                                    <Text style={styles.itemsTitle}>Items Ordered</Text>
                                    <Text style={styles.itemsCount}>({req?.Items?.length || 0} items)</Text>
                                </View>
                            </View>
                        </View>

                        {request.note && (
                            <View style={styles.detailSection}>
                                <View style={styles.detailIcon}>
                                    <Ionicons name="document-text-outline" size={20} color="#999" />
                                </View>
                                <View style={styles.detailContent}>
                                    <Text style={styles.detailTitle}>Additional Note</Text>
                                    <View style={styles.noteContainer}>
                                        <Text style={styles.noteText}>{request.note}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
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
            {renderStatusButtons()}
            
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
                    {allPaymentRequest?.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <MaterialCommunityIcons 
                                name="package-variant" 
                                size={64} 
                                color="#CCC" 
                                style={styles.emptyIcon}
                            />
                            <Text style={styles.emptyTitle}>
                                No {selectedStatus} Payment Requests
                            </Text>
                            <Text style={styles.emptyText}>
                                You haven't made any {selectedStatus.toLowerCase()} payment requests yet.
                            </Text>
                        </View>
                    ) : (
                        allPaymentRequest.map((request, index) => renderPaymentRequest(request, index))
                    )}
                </View>
                <View style={{ height: 20 }} />
            </ScrollView>
        </SafeAreaView>
    );
}