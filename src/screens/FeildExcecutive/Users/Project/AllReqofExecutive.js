

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
    Modal,
    FlatList,
    Dimensions,
} from 'react-native';
import { App_Primary_color, dark33, darkMode25, white } from '../../../../common/Colors/colors';
import { FONTS_FAMILY } from '../../../../assets/Fonts';
import { apiGet } from '../../../../utils/Apis';
import { BackIcon } from '../../../../assets/SVGs';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default function ExecutiveAllRequirement({ navigation }) {
    const { isDarkMode } = useSelector(state => state.theme);
    const [allRequirements, setAllRequirements] = useState([]);
    const [isUploading, setIsUploading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const headerAnim = useRef(new Animated.Value(-100)).current;

  const filters = [
    { label: 'All', value: 'All', api: '/api/executive/ExecutiveGetAllMyRequirement' },
    { label: 'Pending', value: 'Pending', api: '/api/executive/GetUserPendingRequirements' },
    { label: 'UnApproved', value: 'UnApprovedPriced', api: '/api/executive/GetUserUnApprovedPricedRequirements' },
    { label: 'Approved', value: 'ApprovedPriced', api: '/api/executive/GetUserApprovedPricedRequirements' },
    { label: 'Accepted', value: 'Accepted', api: '/api/executive/GetUserAcceptedRequirements' },
    { label: 'Rejected', value: 'Rejected', api: '/api/executive/GetUserRejectedRequirements' },
    { label: 'Token Paid', value: 'TokenPaid', api: '/api/executive/GetUsertokenpaidRequirements' },
    { label: 'Paid', value: 'Paid', api: '/api/executive/GetUserPaidRequirements' },
    { label: 'Delivered', value: 'Delivered', api: '/api/executive/GetUserdeliveredRequirements' },
];

    // const getAllRequirements = async () => {
    //     try {
    //         setIsUploading(true);
    //         const response = await apiGet('/api/executive/ExecutiveGetAllMyRequirement');
    //         setAllRequirements(response.data || []);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     } finally {
    //         setIsUploading(false);
    //     }
    // };

    useEffect(() => {
        getAllRequirements();
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

    // const onRefresh = async () => {
    //     setRefreshing(true);
    //     await getAllRequirements();
    //     setRefreshing(false);
    // };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
const getAllRequirements = async (apiEndpoint = '/api/executive/ExecutiveGetAllMyRequirement') => {
    try {
        setIsUploading(true);
        const response = await apiGet(apiEndpoint); // 👈 Dynamic API
        setAllRequirements(response.data || []);
    } catch (error) {
        console.error('Error fetching data:', error);
        setAllRequirements([]);
    } finally {
        setIsUploading(false);
    }
};

// Filter click pe API call
const handleFilterChange = (filter) => {
    setSelectedFilter(filter.value);
    getAllRequirements(filter.api); // 👈 Yahan API call hogi
};

// Refresh pe bhi current filter ka API
const onRefresh = async () => {
    setRefreshing(true);
    const currentFilter = filters.find(f => f.value === selectedFilter);
    await getAllRequirements(currentFilter?.api || '/api/executive/ExecutiveGetAllMyRequirement');
    setRefreshing(false);
};

    const handleViewDetails = (requirement) => {
        navigation.navigate('ExecutiveRequirementDetails', { 
            requirementId: requirement._id 
        });
    };

    const openImageModal = (images, index = 0) => {
        setSelectedImages(images);
        setCurrentImageIndex(index);
        setImageModalVisible(true);
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
        filtersContainer: {
            backgroundColor: white,
            paddingVertical: 12,
            paddingHorizontal: 8,
            marginBottom: 8,
        },
        filtersScrollView: {
            flexDirection: 'row',
            gap: 8,
        },
        filterChip: {
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: App_Primary_color,
            marginRight: 8,
        },
        filterChipActive: {
            backgroundColor: App_Primary_color,
        },
        filterChipText: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 13,
            color: App_Primary_color,
        },
        filterChipTextActive: {
            color: white,
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
        },
        requirementCard: {
            backgroundColor: white,
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        cardHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 12,
        },
        cardHeaderLeft: {
            flex: 1,
        },
        customerName: {
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 16,
            color: '#1D4ED8',
            marginBottom: 4,
        },
        projectName: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 13,
            color: '#666',
            marginBottom: 2,
        },
        statusBadge: {
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 12,
            alignSelf: 'flex-start',
        },
        statusText: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 11,
            color: white,
        },
        infoSection: {
            marginBottom: 12,
        },
        infoRow: {
            flexDirection: 'row',
            marginBottom: 6,
        },
        infoLabel: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 12,
            color: '#333',
            width: 100,
        },
        infoValue: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 12,
            color: '#666',
            flex: 1,
        },
        itemsSection: {
            marginTop: 12,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: '#E5E7EB',
        },
        itemsSectionTitle: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 13,
            color: '#333',
            marginBottom: 8,
        },
        itemCard: {
            backgroundColor: '#F9FAFB',
            borderRadius: 8,
            padding: 12,
            marginBottom: 8,
            borderWidth: 1,
            borderColor: '#E5E7EB',
        },
        itemName: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 13,
            color: '#333',
            marginBottom: 4,
        },
        itemDetail: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 12,
            color: '#666',
            marginBottom: 2,
        },
        brandChipsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 6,
            marginTop: 6,
        },
        brandChip: {
            backgroundColor: '#DBEAFE',
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#93C5FD',
        },
        brandChipText: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 10,
            color: '#1D4ED8',
        },
        imagesContainer: {
            marginTop: 12,
        },
        imageGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
        },
        imageWrapper: {
            width: 80,
            height: 80,
            borderRadius: 8,
            overflow: 'hidden',
        },
        thumbnail: {
            width: '100%',
            height: '100%',
        },
        noImagesText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 12,
            color: '#999',
        },
        detailsButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: App_Primary_color,
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 8,
            marginTop: 12,
            gap: 6,
        },
        detailsButtonText: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 13,
            color: white,
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContent: {
            width: width - 40,
            height: '80%',
        },
        modalCloseButton: {
            position: 'absolute',
            top: 40,
            right: 20,
            zIndex: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: 20,
            padding: 8,
        },
        fullImage: {
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
        },
        imageCounter: {
            position: 'absolute',
            bottom: 40,
            alignSelf: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
        },
        imageCounterText: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 14,
            color: white,
        },
    });

    const getStatusColor = (status) => {
        const colors = {
            Pending: '#F59E0B',
            UnApprovedPriced: '#EF4444',
            ApprovedPriced: '#10B981',
            Accepted: '#3B82F6',
            Rejected: '#DC2626',
            TokenPaid: '#8B5CF6',
            Paid: '#059669',
            Delivered: '#06B6D4',
        };
        return colors[status] || '#6B7280';
    };

    const renderHeader = () => (
        <Animated.View style={[styles.headerContainer, { transform: [{ translateY: headerAnim }] }]}>
            <StatusBar barStyle="dark-content" backgroundColor={white} />
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>All Requirements</Text>
            </View>
        </Animated.View>
    );

    const renderFilters = () => (
        <View style={styles.filtersContainer}>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filtersScrollView}
            >
                {filters.map((filter) => (
                    <TouchableOpacity
                        key={filter.value}
                        style={[
                            styles.filterChip,
                            selectedFilter === filter.value && styles.filterChipActive,
                        ]}
                        onPress={() => handleFilterChange(filter)}
                    >
                        <Text
                            style={[
                                styles.filterChipText,
                                selectedFilter === filter.value && styles.filterChipTextActive,
                            ]}
                        >
                            {filter.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderImageModal = () => (
        <Modal
            visible={imageModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setImageModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <TouchableOpacity
                    style={styles.modalCloseButton}
                    onPress={() => setImageModalVisible(false)}
                >
                    <Icon name="close" size={24} color={white} />
                </TouchableOpacity>

                <FlatList
                    horizontal
                    pagingEnabled
                    data={selectedImages}
                    initialScrollIndex={currentImageIndex}
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(e) => {
                        const index = Math.round(e.nativeEvent.contentOffset.x / width);
                        setCurrentImageIndex(index);
                    }}
                    renderItem={({ item }) => (
                        <View style={styles.modalContent}>
                            <Image source={{ uri: item }} style={styles.fullImage} />
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />

                <View style={styles.imageCounter}>
                    <Text style={styles.imageCounterText}>
                        {currentImageIndex + 1} / {selectedImages.length}
                    </Text>
                </View>
            </View>
        </Modal>
    );

    const renderRequirementCard = (requirement) => {
        const hasItems = requirement?.Items && requirement.Items.length > 0;
        const hasImages = requirement?.Image && requirement.Image.length > 0;

        return (
            <View key={requirement._id} style={styles.requirementCard}>
                {/* Header */}
                <View style={styles.cardHeader}>
                    <View style={styles.cardHeaderLeft}>
                        <Text style={styles.customerName}>
                            {requirement?.User?.FullName || 'N/A'}
                        </Text>
                        <Text style={styles.projectName}>
                            Project: {requirement?.Project?.Name || 'N/A'}
                        </Text>
                    </View>
                    <View 
                        style={[
                            styles.statusBadge, 
                            { backgroundColor: getStatusColor(requirement?.status) }
                        ]}
                    >
                        <Text style={styles.statusText}>
                            {requirement?.status || 'N/A'}
                        </Text>
                    </View>
                </View>

                {/* Info Section */}
                <View style={styles.infoSection}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Address:</Text>
                        <Text style={styles.infoValue}>
                            {requirement?.Location
                                ? `${requirement.Location.Address || ''}, ${requirement.Location.City || ''} ${requirement.Location.Pincode || ''}, ${requirement.Location.State || ''}`
                                : 'N/A'}
                        </Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Number:</Text>
                        <Text style={styles.infoValue}>
                            {requirement?.User?.Number || 'N/A'}
                        </Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Date:</Text>
                        <Text style={styles.infoValue}>
                            {formatDate(requirement?.createdAt)}
                        </Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Timeline:</Text>
                        <Text style={styles.infoValue}>
                            {requirement?.TimeLine || 'N/A'}
                        </Text>
                    </View>
                </View>

                {/* Items Section */}
                {hasItems && (
                    <View style={styles.itemsSection}>
                        <Text style={styles.itemsSectionTitle}>Items:</Text>
                        {requirement.Items.map((item, idx) => (
                            <View key={idx} style={styles.itemCard}>
                                <Text style={styles.itemName}>{item.productName}</Text>
                                <Text style={styles.itemDetail}>
                                    Category: <Text style={{ fontWeight: 'bold' }}>{item.category}</Text>
                                </Text>
                                <Text style={styles.itemDetail}>
                                    Quantity: <Text style={{ fontWeight: 'bold' }}>{item.quantity}</Text> | 
                                    Size: <Text style={{ fontWeight: 'bold' }}>{item.size}</Text>
                                </Text>
                                {item.Note && (
                                    <Text style={styles.itemDetail}>
                                        Note: <Text style={{ fontWeight: 'bold' }}>{item.Note}</Text>
                                    </Text>
                                )}
                                {item.brandNames && item.brandNames.length > 0 && (
                                    <View style={styles.brandChipsContainer}>
                                        {item.brandNames.map((brand, bIdx) => (
                                            <View key={bIdx} style={styles.brandChip}>
                                                <Text style={styles.brandChipText}>
                                                    {brand.brandName}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Images Section */}
                {!hasItems && hasImages && (
                    <View style={styles.imagesContainer}>
                        <Text style={styles.itemsSectionTitle}>Images:</Text>
                        <View style={styles.imageGrid}>
                            {requirement.Image.map((img, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.imageWrapper}
                                    onPress={() => openImageModal(requirement.Image, index)}
                                >
                                    <Image 
                                        source={{ uri: img }} 
                                        style={styles.thumbnail}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {!hasItems && !hasImages && (
                    <Text style={styles.noImagesText}>No items or images available</Text>
                )}

                {/* Details Button */}
                <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() => handleViewDetails(requirement)}
                >
                    <Icon name="file-document-outline" size={18} color={white} />
                    <Text style={styles.detailsButtonText}>View Details</Text>
                </TouchableOpacity>
            </View>
        );
    };

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

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderFilters()}
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
                    {allRequirements?.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No requirements found.</Text>
                        </View>
                    ) : (
                        allRequirements.map((requirement) => renderRequirementCard(requirement))
                    )}
                </View>
                <View style={{ height: 20 }} />
            </ScrollView>

            {renderImageModal()}
        </SafeAreaView>
    );
}