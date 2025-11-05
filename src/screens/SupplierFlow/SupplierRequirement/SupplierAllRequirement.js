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
import { App_Primary_color, dark33, darkMode25, white } from '../../../common/Colors/colors';
import { FONTS_FAMILY } from '../../../assets/Fonts';
import { apiGet } from '../../../utils/Apis';
import { BackIcon } from '../../../assets/SVGs';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default function SupplierAllRequirement({ navigation }) {
    const { isDarkMode } = useSelector(state => state.theme);
    const [allRequirements, setAllRequirements] = useState([]);
    const [isUploading, setIsUploading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const headerAnim = useRef(new Animated.Value(-100)).current;

    const getAllRequirements = async () => {
        try {
            setIsUploading(true);
            const response = await apiGet('/api/supplier/GetAllRequirement');
            setAllRequirements(response.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            setAllRequirements([]);
        } finally {
            setIsUploading(false);
        }
    };

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

    const onRefresh = async () => {
        setRefreshing(true);
        await getAllRequirements();
        setRefreshing(false);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const openImageModal = (images, index = 0) => {
        if (images && images.length > 0) {
            setSelectedImages(images);
            setCurrentImageIndex(index);
            setImageModalVisible(true);
        }
    };

    const openMapLocation = (coordinates) => {
        if (coordinates?.Late && coordinates?.Long) {
            // You can use Linking to open Google Maps
            const url = `https://www.google.com/maps?q=${coordinates.Late},${coordinates.Long}`;
            console.log('Open map:', url);
            // Linking.openURL(url);
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
            paddingBottom: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#E5E7EB',
        },
        cardHeaderLeft: {
            flex: 1,
        },
        idText: {
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 16,
            color: '#1D4ED8',
            marginBottom: 4,
        },
        createdDate: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 11,
            color: '#999',
        },
        infoSection: {
            marginBottom: 12,
        },
        infoRow: {
            flexDirection: 'row',
            marginBottom: 8,
            alignItems: 'flex-start',
        },
        infoLabel: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 12,
            color: '#333',
            width: 90,
        },
        infoValue: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 12,
            color: '#666',
            flex: 1,
        },
        mapButton: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#DBEAFE',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#93C5FD',
            gap: 4,
        },
        mapButtonText: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 11,
            color: '#1D4ED8',
        },
        noLocationText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 11,
            color: '#999',
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
            marginBottom: 6,
        },
        itemDetail: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 12,
            color: '#666',
            marginBottom: 3,
        },
        itemDetailBold: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 12,
            color: '#333',
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
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: '#E5E7EB',
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
            fontStyle: 'italic',
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

    const renderRequirementCard = (requirement, index) => {
        const hasItems = requirement?.Items && requirement.Items.length > 0;
        const hasImages = requirement?.Image && requirement.Image.length > 0;
        const hasLocation = requirement?.Location?.Coordinates?.Late && requirement?.Location?.Coordinates?.Long;

        return (
            <View key={requirement._id || index} style={styles.requirementCard}>
                {/* Header */}
                <View style={styles.cardHeader}>
                    <View style={styles.cardHeaderLeft}>
                        <Text style={styles.idText}>Requirement #{index + 1}</Text>
                        <Text style={styles.createdDate}>
                            Created: {formatDate(requirement?.createdAt)}
                        </Text>
                    </View>
                </View>

                {/* Info Section */}
                <View style={styles.infoSection}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Address:</Text>
                        <Text style={styles.infoValue}>
                            {requirement?.Location?.Address || 'N/A'}
                        </Text>
                    </View>
                    
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>City:</Text>
                        <Text style={styles.infoValue}>
                            {requirement?.Location?.City || 'N/A'} - {requirement?.Location?.Pincode || 'N/A'}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Map:</Text>
                        {hasLocation ? (
                            <TouchableOpacity 
                                style={styles.mapButton}
                                onPress={() => openMapLocation(requirement?.Location?.Coordinates)}
                            >
                                <Icon name="map-marker" size={14} color="#1D4ED8" />
                                <Text style={styles.mapButtonText}>View Map</Text>
                            </TouchableOpacity>
                        ) : (
                            <Text style={styles.noLocationText}>No Location</Text>
                        )}
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Timeline:</Text>
                        <Text style={styles.infoValue}>
                            {formatDate(requirement?.TimeLine)}
                        </Text>
                    </View>

                    {requirement?.Note && (
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Note:</Text>
                            <Text style={styles.infoValue}>
                                {requirement.Note}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Items Section */}
                {hasItems && (
                    <View style={styles.itemsSection}>
                        <Text style={styles.itemsSectionTitle}>Items:</Text>
                        {requirement.Items.map((item, idx) => (
                            <View key={idx} style={styles.itemCard}>
                                <Text style={styles.itemName}>{item.productName || 'N/A'}</Text>
                                
                                <Text style={styles.itemDetail}>
                                    Quantity: <Text style={styles.itemDetailBold}>{item.quantity || 'N/A'}</Text>
                                </Text>
                                
                                <Text style={styles.itemDetail}>
                                    Size: <Text style={styles.itemDetailBold}>{item.size || 'N/A'}</Text>
                                </Text>
                                
                                <Text style={styles.itemDetail}>
                                    Price: <Text style={styles.itemDetailBold}>₹{item.price || 0}</Text>
                                </Text>

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
                {hasImages && (
                    <View style={styles.imagesContainer}>
                        <Text style={styles.itemsSectionTitle}>Images:</Text>
                        <View style={styles.imageGrid}>
                            {requirement.Image.map((img, imgIndex) => (
                                <TouchableOpacity
                                    key={imgIndex}
                                    style={styles.imageWrapper}
                                    onPress={() => openImageModal(requirement.Image, imgIndex)}
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
                            <Icon name="clipboard-alert-outline" size={60} color="#ccc" />
                            <Text style={styles.emptyText}>No requirements found.</Text>
                        </View>
                    ) : (
                        allRequirements.map((requirement, index) => renderRequirementCard(requirement, index))
                    )}
                </View>
                <View style={{ height: 20 }} />
            </ScrollView>

            {renderImageModal()}
        </SafeAreaView>
    );
}