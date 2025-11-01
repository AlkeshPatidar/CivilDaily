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
import { App_Primary_color, dark33, darkMode25, white } from '../../common/Colors/colors';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { apiGet } from '../../utils/Apis';
import { BackIcon } from '../../assets/SVGs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

export default function AllMyRejectedRequirement({ navigation }) {
    const { isDarkMode } = useSelector(state => state.theme);
    const [allMyRejectedRequirement, setAllMyRejectedRequirement] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const headerAnim = useRef(new Animated.Value(-100)).current;

    const getAllMyRejectedRequirements = async () => {
        try {
            setIsUploading(true);
            const response = await apiGet('/api/user/GetMyRejectedRequirements');
            setAllMyRejectedRequirement(response.data || []);
            setIsUploading(false);
        } catch (error) {
            setIsUploading(false);
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getAllMyRejectedRequirements();
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
        await getAllMyRejectedRequirements();
        setRefreshing(false);
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
            paddingRight: 8,
        },
        infoText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 13,
            color: '#666',
            lineHeight: 20,
            marginBottom: 4,
        },
        statusContainer: {
            alignItems: 'flex-end',
            gap: 6,
        },
        statusBadge: {
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            backgroundColor: '#DC2626',
        },
        statusText: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 11,
            color: white,
            textTransform: 'capitalize',
        },
        userRemarkBadge: {
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            backgroundColor: '#FEE2E2',
        },
        userRemarkText: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 10,
            color: '#B91C1C',
        },
        itemsSection: {
            marginTop: 8,
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
            color: '#16A34A',
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
        imageContainer: {
            width: '100%',
            height: 256,
            borderRadius: 12,
            overflow: 'hidden',
            marginBottom: 12,
            borderWidth: 1,
            borderColor: '#e5e5e5',
        },
        requirementImage: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
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
            paddingRight: 8,
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
                <Text style={styles.headerTitle}>📦 All Rejected Requirements</Text>
            </View>
        </Animated.View>
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

                    <View style={styles.statusContainer}>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>{req?.status}</Text>
                        </View>
                        {req?.UserRemark && (
                            <View style={styles.userRemarkBadge}>
                                <Text style={styles.userRemarkText}>User Remark: {req?.UserRemark}</Text>
                            </View>
                        )}
                    </View>
                </View>

                {req?.Items && req?.Items?.length > 0 ? (
                    <View style={styles.itemsSection}>
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
                        ))}
                    </View>
                ) : req?.Image ? (
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: req?.Image }}
                            style={styles.requirementImage}
                        />
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
                        </View>

                        <TouchableOpacity
                            style={styles.detailButton}
                            onPress={() => navigation.navigate('ProjectDetail', { id: req?.id })}
                        >
                            <Ionicons name="information-circle" size={18} color={white} />
                            <Text style={styles.buttonText}>Check Detail</Text>
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
                    {allMyRejectedRequirement?.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={{ fontSize: 48 }}>🚫</Text>
                            <Text style={styles.emptyText}>No Rejected project found</Text>
                        </View>
                    ) : (
                        allMyRejectedRequirement?.map((req, index) => renderRequirementItem(req, index))
                    )}
                </View>
                <View style={{ height: 20 }} />
            </ScrollView>
        </SafeAreaView>
    );
}