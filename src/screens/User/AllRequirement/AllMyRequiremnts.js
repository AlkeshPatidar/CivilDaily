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
} from 'react-native';
import { App_Primary_color, dark33, darkMode25, white } from '../../../common/Colors/colors';
import { FONTS_FAMILY } from '../../../assets/Fonts';
import { apiGet } from '../../../utils/Apis';
import { BackIcon } from '../../../assets/SVGs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

export default function AllMyRequirements({ navigation }) {
    const { isDarkMode } = useSelector(state => state.theme);
    const [allMyRequirements, setAllMyRequirements] = useState([]);
    const [isUploading, setIsUploading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    
    const headerAnim = useRef(new Animated.Value(-100)).current;

    const getAllMyRequirements = async () => {
        try {
            setIsUploading(true);
            const response = await apiGet('/api/user/GetAllMyRequireMent');
            setAllMyRequirements(response.data);
            setIsUploading(false);
        } catch (error) {
            setIsUploading(false);
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getAllMyRequirements();
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
        await getAllMyRequirements();
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
        infoRow: {
            marginBottom: 12,
        },
        infoText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 13,
            color: '#666',
            lineHeight: 20,
        },
        statusBadge: {
            alignSelf: 'flex-start',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            marginTop: 8,
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
            fontSize: 14,
            color: '#333',
            marginTop: 16,
            marginBottom: 12,
            paddingBottom: 8,
            borderBottomWidth: 1,
            borderBottomColor: '#e5e5e5',
        },
        itemCard: {
            backgroundColor: '#F8F9FA',
            borderRadius: 12,
            padding: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: '#e5e5e5',
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
        itemNote: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 11,
            color: '#666',
            fontStyle: 'italic',
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
        imageGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 12,
            marginTop: 12,
        },
        requirementImage: {
            width: '48%',
            height: 180,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#e5e5e5',
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
        finalOrderItem: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 13,
            color: '#111',
            marginBottom: 6,
        },
        brandLabel: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 11,
            color: '#0066CC',
            marginTop: 4,
        },
        totalPriceContainer: {
            backgroundColor: '#E3F2FD',
            borderRadius: 12,
            padding: 12,
            marginTop: 12,
            borderWidth: 1,
            borderColor: '#90CAF9',
        },
        totalPriceText: {
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 13,
            color: '#1565C0',
            textAlign: 'right',
        },
        bottomSection: {
            marginTop: 16,
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: '#e5e5e5',
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
            paddingHorizontal: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginTop: 12,
            alignSelf: 'flex-end',
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
                <Text style={styles.headerTitle}>📦 My All Requirements</Text>
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

                <View style={styles.infoRow}>
                    <Text style={styles.infoText}>📅 <Text style={{ fontFamily: FONTS_FAMILY.Poppins_SemiBold }}>Timeline:</Text> {req?.TimeLine}</Text>
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

                {req?.Items && req?.Items.length > 0 ? (
                    <View>
                        <Text style={styles.sectionTitle}>Requirement Items</Text>
                        {req.Items.map((item, i) => (
                            <View key={i} style={styles.itemCard}>
                                <Text style={styles.itemName}>{item?.productName}</Text>
                                <Text style={styles.itemDetail}>Qty: {item?.quantity} | Size: {item?.size}</Text>
                                {item?.price > 0 && (
                                    <Text style={styles.itemPrice}>Total Price: ₹{item?.price}</Text>
                                )}
                                {item?.note && (
                                    <Text style={styles.itemNote}>Note: {item.note}</Text>
                                )}
                                {item?.brandNames?.length > 0 && (
                                    <View style={styles.brandContainer}>
                                        {item.brandNames.map((brand, bIndex) => (
                                            <View key={bIndex} style={styles.brandBadge}>
                                                <Text style={styles.brandText}>
                                                    {brand?.brandName}
                                                    {brand?.price ? ` (₹${brand.price})` : ""}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                ) : Array.isArray(req?.Image) && req.Image.length > 0 ? (
                    <View style={styles.imageGrid}>
                        {req.Image.map((imgUrl, idx) => (
                            <Image
                                key={idx}
                                source={{ uri: imgUrl }}
                                style={styles.requirementImage}
                                resizeMode="cover"
                            />
                        ))}
                    </View>
                ) : null}

                {req?.FinalOrder?.items && req.FinalOrder.items.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Final Order</Text>
                        {req.FinalOrder.items.map((fItem, i) => (
                            <View key={i} style={styles.finalOrderCard}>
                                <Text style={styles.finalOrderItem}>{fItem?.productName}</Text>
                                <Text style={styles.itemDetail}>Qty: {fItem?.quantity} | Size: {fItem?.size}</Text>
                                <Text style={styles.brandLabel}>✅ Brand: <Text style={{ fontFamily: FONTS_FAMILY.Poppins_SemiBold }}>{fItem?.brandName}</Text></Text>
                                {fItem?.price > 0 && (
                                    <Text style={styles.itemPrice}>Price: ₹{fItem?.price}</Text>
                                )}
                                {fItem?.Note && (
                                    <Text style={styles.itemNote}>Note: {fItem?.Note}</Text>
                                )}
                            </View>
                        ))}
                        <View style={styles.totalPriceContainer}>
                            <Text style={styles.totalPriceText}>Total Final Order Price: ₹{req?.FinalOrder?.totalPrice || 0}</Text>
                        </View>
                    </View>
                )}

                <View style={styles.bottomSection}>
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

                    <TouchableOpacity
                        style={styles.detailButton}
                        onPress={() => navigation.navigate('ProjectDetail', { id: req?.id })}
                    >
                        <Ionicons name="information-circle" size={18} color={white} />
                        <Text style={styles.detailButtonText}>Check Detail</Text>
                    </TouchableOpacity>
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
                    {allMyRequirements?.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={{ fontSize: 48 }}>🚫</Text>
                            <Text style={styles.emptyText}>No project found</Text>
                        </View>
                    ) : (
                        allMyRequirements?.map((req, index) => renderRequirementItem(req, index))
                    )}
                </View>
                <View style={{ height: 20 }} />
            </ScrollView>
        </SafeAreaView>
    );
}