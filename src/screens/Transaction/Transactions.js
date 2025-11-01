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
} from 'react-native';
import { App_Primary_color, dark33, darkMode25, white } from '../../common/Colors/colors';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { apiGet } from '../../utils/Apis';
import { BackIcon } from '../../assets/SVGs';
import { useSelector } from 'react-redux';

export default function AllTransactions({ navigation }) {
    const { isDarkMode } = useSelector(state => state.theme);
    const [isLoading, setIsLoading] = useState(true);
    const [allTransactions, setAllTransactions] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const headerAnim = useRef(new Animated.Value(-100)).current;

    const getAllTransactions = async () => {
        try {
            setIsLoading(true);
            const response = await apiGet('/api/user/GetUserAllTransaction');
            setAllTransactions(response?.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllTransactions();
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
        await getAllTransactions();
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
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 60,
        },
        emptyText: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 16,
            color: '#999',
        },
        transactionCard: {
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
        cardTop: {
            marginBottom: 16,
        },
        transactionHeader: {
            marginBottom: 8,
        },
        transactionIdRow: {
            marginBottom: 8,
        },
        transactionIdLabel: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 14,
            color: '#333',
        },
        transactionIdValue: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 14,
            color: '#666',
        },
        badgesRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 8,
        },
        badge: {
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 16,
        },
        badgeUPI: {
            backgroundColor: '#9C27B0',
        },
        badgeCard: {
            backgroundColor: '#2196F3',
        },
        badgeSuccess: {
            backgroundColor: '#28A745',
        },
        badgeFailed: {
            backgroundColor: '#DC3545',
        },
        badgeText: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 11,
            color: white,
            textTransform: 'uppercase',
        },
        amountText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 13,
            color: '#333',
            marginBottom: 4,
        },
        noteText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 12,
            color: '#999',
            fontStyle: 'italic',
        },
        locationSection: {
            marginBottom: 16,
        },
        locationRow: {
            marginBottom: 4,
        },
        locationLabel: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 12,
            color: '#666',
        },
        locationValue: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 12,
            color: '#666',
        },
        itemsSection: {
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
        },
        itemsTitle: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 13,
            color: '#333',
            marginBottom: 8,
        },
        itemRow: {
            flexDirection: 'row',
            paddingLeft: 16,
            marginBottom: 6,
        },
        bulletPoint: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 12,
            color: '#666',
            marginRight: 8,
        },
        itemText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 12,
            color: '#666',
            flex: 1,
        },
    });

    const renderHeader = () => (
        <Animated.View style={[styles.headerContainer, { transform: [{ translateY: headerAnim }] }]}>
            <StatusBar barStyle="dark-content" backgroundColor={white} />
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>All Transactions</Text>
            </View>
        </Animated.View>
    );

    const renderTransaction = (txn) => {
        return (
            <View key={txn?._id} style={styles.transactionCard}>
                <View style={styles.cardTop}>
                    <View style={styles.transactionHeader}>
                        <View style={styles.transactionIdRow}>
                            <Text style={styles.transactionIdLabel}>
                                Transaction ID:{' '}
                                <Text style={styles.transactionIdValue}>{txn?.transactionId}</Text>
                            </Text>
                        </View>

                        <View style={styles.badgesRow}>
                            <View style={[styles.badge, txn?.method === 'upi' ? styles.badgeUPI : styles.badgeCard]}>
                                <Text style={styles.badgeText}>{txn?.method?.toUpperCase()}</Text>
                            </View>
                            <View style={[styles.badge, txn?.status === 'success' ? styles.badgeSuccess : styles.badgeFailed]}>
                                <Text style={styles.badgeText}>{txn?.status}</Text>
                            </View>
                        </View>

                        <Text style={styles.amountText}>Amount: ₹{txn?.amount}</Text>
                        {txn?.note && (
                            <Text style={styles.noteText}>"{txn?.note}"</Text>
                        )}
                    </View>

                    <View style={styles.locationSection}>
                        <View style={styles.locationRow}>
                            <Text style={styles.locationLabel}>
                                Timeline:{' '}
                                <Text style={styles.locationValue}>
                                    {txn?.requirement?.TimeLine || 'N/A'}
                                </Text>
                            </Text>
                        </View>
                        <View style={styles.locationRow}>
                            <Text style={styles.locationLabel}>
                                Location:{' '}
                                <Text style={styles.locationValue}>
                                    {txn?.requirement?.Location?.Address || 'N/A'}
                                </Text>
                            </Text>
                        </View>
                    </View>
                </View>

                {txn?.requirement?.Items?.length > 0 && (
                    <View style={styles.itemsSection}>
                        <Text style={styles.itemsTitle}>Selected Items</Text>
                        {txn?.requirement?.Items?.map((item, index) => (
                            <View key={index} style={styles.itemRow}>
                                <Text style={styles.bulletPoint}>•</Text>
                                <Text style={styles.itemText}>
                                    {item?.productName} — Qty: {item?.quantity} @ ₹{item?.price}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        );
    };

    if (isLoading) {
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
                    {allTransactions?.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No transactions found.</Text>
                        </View>
                    ) : (
                        allTransactions?.map((txn) => renderTransaction(txn))
                    )}
                </View>
                <View style={{ height: 20 }} />
            </ScrollView>
        </SafeAreaView>
    );
}