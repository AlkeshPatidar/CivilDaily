import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { App_Primary_color, dark33, darkMode25 } from '../../common/Colors/colors';
import { FONTS_FAMILY } from '../../assets/Fonts';
import Row from '../../components/wrapper/row';
import { BackWhite } from '../../assets/SVGs';
import CustomText from '../../components/TextComponent';

export default function Notifications({ navigation }) {
    const { isDarkMode } = useSelector(state => state.theme);
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'order',
            title: 'Order Delivered',
            message: 'Your order #12345 has been delivered successfully',
            time: '2 min ago',
            read: false,
            icon: 'check-circle',
            iconColor: '#10B981',
        },
        {
            id: 2,
            type: 'order',
            title: 'Order Shipped',
            message: 'Your order #12344 is on the way',
            time: '1 hour ago',
            read: false,
            icon: 'local-shipping',
            iconColor: '#3B82F6',
        },
        {
            id: 3,
            type: 'payment',
            title: 'Payment Successful',
            message: 'Payment of ₹1,250 received for order #12343',
            time: '3 hours ago',
            read: true,
            icon: 'payments',
            iconColor: '#10B981',
        },
        {
            id: 4,
            type: 'order',
            title: 'Order Confirmed',
            message: 'Your order #12342 has been confirmed',
            time: 'Yesterday',
            read: true,
            icon: 'assignment-turned-in',
            iconColor: '#8B5CF6',
        },
        {
            id: 5,
            type: 'promo',
            title: 'Special Offer!',
            message: 'Get 20% off on your next order. Use code: SAVE20',
            time: 'Yesterday',
            read: true,
            icon: 'local-offer',
            iconColor: '#F59E0B',
        },
        {
            id: 6,
            type: 'order',
            title: 'Order Cancelled',
            message: 'Your order #12341 has been cancelled',
            time: '2 days ago',
            read: true,
            icon: 'cancel',
            iconColor: '#EF4444',
        },
        {
            id: 7,
            type: 'payment',
            title: 'Payment Pending',
            message: 'Payment of ₹850 is pending for order #12340',
            time: '3 days ago',
            read: true,
            icon: 'schedule',
            iconColor: '#F59E0B',
        },
        {
            id: 8,
            type: 'order',
            title: 'Order Processing',
            message: 'Your order #12339 is being prepared',
            time: '4 days ago',
            read: true,
            icon: 'hourglass-empty',
            iconColor: '#6366F1',
        },
    ]);

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notif => ({ ...notif, read: true }))
        );
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

    const renderNotification = (item) => (
        <TouchableOpacity
            key={item.id}
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
    );

    const unreadNotifications = notifications.filter(n => !n.read);
    const readNotifications = notifications.filter(n => n.read);

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
                {notifications.length === 0 ? (
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
                                {unreadNotifications.map(renderNotification)}
                            </>
                        )}
                        {readNotifications.length > 0 && (
                            <>
                                <Text style={styles.sectionTitle}>EARLIER</Text>
                                {readNotifications.map(renderNotification)}
                            </>
                        )}
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}