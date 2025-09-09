import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { BackWhite } from '../../assets/SVGs';
import { App_Primary_color } from '../../common/Colors/colors';

const MyOrdersPage = ({navigation}) => {
    const [activeTab, setActiveTab] = useState('Previous Order');

    const ordersData = {
        'Current Order': [],
        'Previous Order': [
            {
                id: '#1902095',
                title: 'Fresh Pateto',
                date: '28/06/2024, 8:00 PM',
                price: '$46.99',
                items: '2 Items',
                status: 'Delivered',
                image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&h=100&fit=crop',
            },
            {
                id: '#3759103',
                title: 'Fresh Pateto',
                date: '24/06/2024, 3:45 PM',
                price: '$67.55',
                items: '4 Items',
                status: 'Canceled',
                image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&h=100&fit=crop',
            },
            {
                id: '#1902095',
                title: 'Fresh Pateto',
                date: '28/06/2024, 8:00 PM',
                price: '$46.99',
                items: '2 Items',
                status: 'Delivered',
                image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&h=100&fit=crop',
            },
            {
                id: '#3759103',
                title: 'Fresh Pateto',
                date: '24/06/2024, 3:45 PM',
                price: '$67.55',
                items: '4 Items',
                status: 'Canceled',
                image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&h=100&fit=crop',
            },
        ],
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered':
                return '#34C759';
            case 'Canceled':
                return '#FF3B30';
            default:
                return '#8E8E93';
        }
    };

    const renderStatusBadge = (status) => (
        <View style={[
            styles.statusBadge,
            { borderColor: getStatusColor(status) }
        ]}>
            <View style={[
                styles.statusDot,
                { backgroundColor: getStatusColor(status) }
            ]} />
            <Text style={[
                styles.statusText,
                { color: getStatusColor(status) }
            ]}>
                {status}
            </Text>
        </View>
    );

    const renderOrderCard = (order) => (
        <TouchableOpacity key={`${order.id}-${order.date}`} style={styles.orderCard}
        onPress={()=>navigation.navigate('OrderDetailsPage')}
        >
            <View style={styles.orderHeader}>
                <Image source={{ uri: order.image }} style={styles.orderImage} />
                <View style={styles.orderInfo}>
                    <Text style={styles.orderTitle}>{order.title}</Text>
                    <Text style={styles.orderId}>{order.id}</Text>
                    <Text style={styles.orderDate}>{order.date}</Text>
                </View>
                {renderStatusBadge(order.status)}
            </View>

            <View style={styles.orderFooter}>
                <View style={styles.orderPricing}>
                    <Text style={styles.orderPrice}>{order.price}</Text>
                    <Text style={styles.orderItems}> • {order.items}</Text>
                </View>
                <TouchableOpacity style={styles.viewDetailButton}>
                    <Text style={styles.viewDetailText}>View Detail</Text>
                    <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    const renderTabButton = (tabName) => (
        <TouchableOpacity
            key={tabName}
            style={styles.tabButton}
            onPress={() => setActiveTab(tabName)}
        >
            <Text style={[
                styles.tabText,
                activeTab === tabName && styles.tabTextActive
            ]}>
                {tabName}
            </Text>
            {activeTab === tabName && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
    );

    const currentOrders = ordersData[activeTab] || [];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#5B6BC7" />

            {/* Header */}
            <LinearGradient
                colors={[App_Primary_color, App_Primary_color]}
                style={styles.header}
            >
                <View style={styles.headerContent}>
                    <TouchableOpacity style={styles.backButton}
                    onPress={()=>navigation.goBack()}
                    >
                        {/* <Text style={styles.backArrow}>‹</Text> */}
                        <BackWhite/>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My Orders</Text>
                    <View style={styles.headerRight} />
                </View>
            </LinearGradient>

            {/* Content */}
            <View style={styles.content}>
                {/* Tabs */}
                <View style={styles.tabContainer}>
                    {Object.keys(ordersData).map(renderTabButton)}
                </View>

                {/* Orders List */}
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {currentOrders.length > 0 ? (
                        currentOrders.map(renderOrderCard)
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No orders found</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backArrow: {
        color: 'white',
        fontSize: 24,
        fontWeight: '300',
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    headerRight: {
        width: 40,
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: -10,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    tabButton: {
        marginRight: 30,
        paddingBottom: 10,
    },
    tabText: {
        fontSize: 16,
        color: '#8E8E93',
        fontWeight: '500',
    },
    tabTextActive: {
        color: '#1A1A1A',
        fontWeight: '600',
    },
    tabIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: '#1A1A1A',
        borderRadius: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 30,
    },
    orderCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        // elevation: 2,
        borderBottomWidth: 1,
        borderColor: '#F0F0F0',
    },
    orderHeader: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    orderImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    orderInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    orderTitle: {
        fontSize: 16,
        fontFamily: FONTS_FAMILY.Poppins_Medium,
        color: '#1A1A1A',
        marginBottom: 2,
    },
    orderId: {
        fontSize: 13,
        color: '#1A1A1A',
        fontFamily: FONTS_FAMILY.Poppins_Regular,
        marginBottom: 4,
    },
    orderDate: {
        fontSize: 12,
        color: '#8E8E93',
        fontFamily: FONTS_FAMILY.Poppins_Regular
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        height: 24,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
    },
    orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    orderPricing: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderPrice: {
        fontSize: 16,
        fontFamily: FONTS_FAMILY.Poppins_Medium,
        color: '#1A1A1A',
    },
    orderItems: {
        fontSize: 14,
        color: 'black',
    },
    viewDetailButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewDetailText: {
        fontSize: 14,
        color: '#8E8E93',
        marginRight: 4,
    },
    chevron: {
        fontSize: 16,
        color: '#8E8E93',
        fontWeight: '300',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 16,
        color: '#8E8E93',
    },
});

export default MyOrdersPage;