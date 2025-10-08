import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { App_Primary_color, dark33, darkMode25 } from '../../common/Colors/colors';
import { FONTS_FAMILY } from '../../assets/Fonts';
import Row from '../../components/wrapper/row';
import { BackWhite } from '../../assets/SVGs';
import CustomText from '../../components/TextComponent';
import { apiGet, apiPost } from '../../utils/Apis';
import urls from '../../config/urls';

export default function Notifications({ navigation }) {
    const { isDarkMode } = useSelector(state => state.theme);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNotifications();
    }, []);

    const getNotifications = async () => {
        try {
            setLoading(true);
            const res = await apiGet(urls?.getNotifictations);
            if (res?.data) {
                const formattedData = res.data.map(item => ({
                    id: item._id,
                    type: item.type || 'order',
                    title: item.title,
                    message: item.message,
                    time: getTimeAgo(item.createdAt),
                    read: item.isRead,
                    icon: getIconByType(item.type),
                    iconColor: getIconColorByType(item.type),
                }));
                setNotifications(formattedData);
            }
        } catch (error) {
            console.log('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const getTimeAgo = (dateString) => {
        const now = new Date();
        const createdDate = new Date(dateString);
        const diffInMs = now - createdDate;
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInMinutes < 60) {
            return `${diffInMinutes} min ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        } else if (diffInDays === 1) {
            return 'Yesterday';
        } else {
            return `${diffInDays} days ago`;
        }
    };

    const getIconByType = (type) => {
        const iconMap = {
            order: 'check-circle',
            payment: 'payments',
            promo: 'local-offer',
            shipping: 'local-shipping',
        };
        return iconMap[type] || 'notifications';
    };

    const getIconColorByType = (type) => {
        const colorMap = {
            order: '#10B981',
            payment: '#3B82F6',
            promo: '#F59E0B',
            shipping: '#8B5CF6',
        };
        return colorMap[type] || '#6366F1';
    };

    const markAsRead = async (id) => {
        try {
            await apiPost(`/api/notification/read/${id}`);
            setNotifications(prev =>
                prev.map(notif =>
                    notif.id === id ? { ...notif, read: true } : notif
                )
            );
        } catch (error) {
            console.log('Error marking notification as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await apiPost('/api/notification/read-all');
            setNotifications(prev =>
                prev.map(notif => ({ ...notif, read: true }))
            );
        } catch (error) {
            console.log('Error marking all notifications as read:', error);
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? darkMode25 : '#F9FAFB',
        },
        headerContainer: {
            backgroundColor: App_Primary_color,
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 24,
        },
        headerRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        leftHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
        },
        headerTitle: {
            color: 'white',
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 18,
        },
        markAllButton: {
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 20,
        },
        markAllText: {
            color: 'white',
            fontSize: 12,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
        },
        contentContainer: {
            paddingHorizontal: 16,
            paddingTop: 16,
        },
        sectionTitle: {
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: isDarkMode ? '#9CA3AF' : '#6B7280',
            marginBottom: 12,
            marginTop: 8,
        },
        notificationCard: {
            backgroundColor: isDarkMode ? dark33 : '#FFFFFF',
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
            flexDirection: 'row',
            gap: 12,
        },
        unreadCard: {
            borderLeftWidth: 4,
            borderLeftColor: App_Primary_color,
        },
        iconContainer: {
            width: 48,
            height: 48,
            borderRadius: 24,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isDarkMode ? '#1F2937' : '#F3F4F6',
        },
        notificationContent: {
            flex: 1,
        },
        notificationHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 4,
        },
        notificationTitle: {
            fontSize: 15,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: isDarkMode ? 'white' : '#1F2937',
            flex: 1,
        },
        unreadBadge: {
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: App_Primary_color,
            marginLeft: 8,
            marginTop: 4,
        },
        notificationMessage: {
            fontSize: 13,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: isDarkMode ? '#D1D5DB' : '#6B7280',
            lineHeight: 18,
            marginBottom: 6,
        },
        timeText: {
            fontSize: 12,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: isDarkMode ? '#9CA3AF' : '#9CA3AF',
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 100,
        },
        emptyIcon: {
            marginBottom: 16,
        },
        emptyTitle: {
            fontSize: 18,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: isDarkMode ? 'white' : '#1F2937',
            marginBottom: 8,
        },
        emptyText: {
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: isDarkMode ? '#9CA3AF' : '#6B7280',
            textAlign: 'center',
        },
        skeletonCard: {
            backgroundColor: isDarkMode ? dark33 : '#FFFFFF',
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            flexDirection: 'row',
            gap: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
        },
        skeletonCircle: {
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
        },
        skeletonContent: {
            flex: 1,
            gap: 8,
        },
        skeletonLine: {
            height: 14,
            borderRadius: 4,
            backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
        },
        skeletonLineShort: {
            height: 12,
            borderRadius: 4,
            backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
            width: '60%',
        },
    });

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />
            <View style={styles.headerRow}>
                <View style={styles.leftHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackWhite />
                    </TouchableOpacity>
                    <CustomText style={styles.headerTitle}>
                        Notifications {unreadCount > 0 && `(${unreadCount})`}
                    </CustomText>
                </View>
                {unreadCount > 0 && (
                    <TouchableOpacity
                        style={styles.markAllButton}
                        onPress={markAllAsRead}
                    >
                        <Text style={styles.markAllText}>Mark all read</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    const SkeletonLoader = () => {
        const shimmerAnim = useRef(new Animated.Value(0)).current;

        useEffect(() => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(shimmerAnim, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(shimmerAnim, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        }, []);

        const opacity = shimmerAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 1],
        });

        return (
            <>
                {[1, 2, 3, 4, 5].map((item) => (
                    <Animated.View key={item} style={[styles.skeletonCard, { opacity }]}>
                        <View style={styles.skeletonCircle} />
                        <View style={styles.skeletonContent}>
                            <View style={[styles.skeletonLine, { width: '70%' }]} />
                            <View style={styles.skeletonLine} />
                            <View style={styles.skeletonLineShort} />
                        </View>
                    </Animated.View>
                ))}
            </>
        );
    };

    const AnimatedNotificationCard = ({ item, index }) => {
        const fadeAnim = useRef(new Animated.Value(0)).current;
        const translateAnim = useRef(new Animated.Value(-30)).current;

        useEffect(() => {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 400,
                    delay: index * 100,
                    useNativeDriver: true,
                }),
                Animated.spring(translateAnim, {
                    toValue: 0,
                    delay: index * 100,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true,
                }),
            ]).start();
        }, []);

        return (
            <Animated.View
                style={{
                    opacity: fadeAnim,
                    transform: [{ translateY: translateAnim }],
                }}
            >
                <TouchableOpacity
                    style={[
                        styles.notificationCard,
                        !item.read && styles.unreadCard,
                    ]}
                    onPress={() => markAsRead(item.id)}
                    activeOpacity={0.7}
                >
                    <View style={styles.iconContainer}>
                        <MaterialIcons
                            name={item.icon}
                            size={24}
                            color={item.iconColor}
                        />
                    </View>
                    <View style={styles.notificationContent}>
                        <View style={styles.notificationHeader}>
                            <Text style={styles.notificationTitle} numberOfLines={1}>
                                {item.title}
                            </Text>
                            {!item.read && <View style={styles.unreadBadge} />}
                        </View>
                        <Text style={styles.notificationMessage} numberOfLines={2}>
                            {item.message}
                        </Text>
                        <Text style={styles.timeText}>{item.time}</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    const unreadNotifications = notifications.filter(n => !n.read);
    const readNotifications = notifications.filter(n => n.read);

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
                {loading ? (
                    <SkeletonLoader />
                ) : notifications.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons
                            name="notifications-off-outline"
                            size={64}
                            color={isDarkMode ? '#4B5563' : '#9CA3AF'}
                            style={styles.emptyIcon}
                        />
                        <Text style={styles.emptyTitle}>No Notifications</Text>
                        <Text style={styles.emptyText}>
                            You're all caught up! {'\n'}
                            Check back later for updates.
                        </Text>
                    </View>
                ) : (
                    <>
                        {unreadNotifications.length > 0 && (
                            <>
                                <Text style={styles.sectionTitle}>NEW</Text>
                                {unreadNotifications.map((item, index) => (
                                    <AnimatedNotificationCard 
                                        key={item.id} 
                                        item={item} 
                                        index={index} 
                                    />
                                ))}
                            </>
                        )}
                        {readNotifications.length > 0 && (
                            <>
                                <Text style={styles.sectionTitle}>EARLIER</Text>
                                {readNotifications.map((item, index) => (
                                    <AnimatedNotificationCard 
                                        key={item.id} 
                                        item={item} 
                                        index={unreadNotifications.length + index} 
                                    />
                                ))}
                            </>
                        )}
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}