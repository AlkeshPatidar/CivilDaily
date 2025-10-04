import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Easing,
    ScrollView,
} from 'react-native';
import { App_Primary_color, dark33, darkMode25 } from '../../common/Colors/colors';
import LinearGradient from 'react-native-linear-gradient';

const CartScreenSkeletonLoader = ({ isDarkMode, activeTab = 'My Cart' }) => {
    const shimmerAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const shimmer = Animated.loop(
            Animated.sequence([
                Animated.timing(shimmerAnimation, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(shimmerAnimation, {
                    toValue: 0,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        );
        shimmer.start();
        return () => shimmer.stop();
    }, []);

    const translateX = shimmerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-300, 300],
    });

    const SkeletonBox = ({ width, height, borderRadius = 8, style }) => (
        <View
            style={[
                {
                    width,
                    height,
                    borderRadius,
                    backgroundColor: isDarkMode ? '#2D3748' : '#E5E7EB',
                    overflow: 'hidden',
                },
                style,
            ]}
        >
            <Animated.View
                style={{
                    width: '100%',
                    height: '100%',
                    transform: [{ translateX }],
                }}
            >
                <LinearGradient
                    colors={
                        isDarkMode
                            ? ['#2D3748', '#4A5568', '#2D3748']
                            : ['#E5E7EB', '#F9FAFB', '#E5E7EB']
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ flex: 1 }}
                />
            </Animated.View>
        </View>
    );

    const CartItemSkeleton = () => (
        <View
            style={[
                styles.cartContainer,
                { backgroundColor: isDarkMode ? dark33 : 'white' }
            ]}
        >
            {/* Cart Header */}
            <View style={styles.cartHeader}>
                <SkeletonBox width={150} height={18} borderRadius={6} />
                <SkeletonBox width={24} height={24} borderRadius={4} />
            </View>

            {/* Section Title */}
            <SkeletonBox width={130} height={16} borderRadius={6} style={{ marginBottom: 15 }} />

            {/* Product Items */}
            {[1, 2, 3].map((item) => (
                <View key={item} style={styles.productItem}>
                    <SkeletonBox width={95} height={80} borderRadius={8} style={{ marginRight: 15 }} />
                    <View style={styles.productDetails}>
                        <SkeletonBox width="80%" height={16} borderRadius={6} style={{ marginBottom: 8 }} />
                        <SkeletonBox width="50%" height={12} borderRadius={6} style={{ marginBottom: 8 }} />
                        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 8 }}>
                            <SkeletonBox width={60} height={16} borderRadius={6} />
                            <SkeletonBox width={50} height={14} borderRadius={6} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <SkeletonBox width={80} height={12} borderRadius={6} />
                            <SkeletonBox width={20} height={20} borderRadius={10} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <SkeletonBox width={30} height={30} borderRadius={15} />
                            <SkeletonBox width={25} height={16} borderRadius={6} style={{ marginHorizontal: 15 }} />
                            <SkeletonBox width={30} height={30} borderRadius={15} />
                        </View>
                    </View>
                </View>
            ))}

            {/* Total Section */}
            <View style={styles.totalSection}>
                <SkeletonBox width={120} height={20} borderRadius={6} />
            </View>
        </View>
    );

    const OrderCardSkeleton = () => (
        <View
            style={[
                styles.orderCard,
                { backgroundColor: isDarkMode ? dark33 : 'white' }
            ]}
        >
            {/* Order Header */}
            <View style={styles.orderHeader}>
                <SkeletonBox width={60} height={60} borderRadius={8} style={{ marginRight: 12 }} />
                <View style={{ flex: 1 }}>
                    <SkeletonBox width="80%" height={16} borderRadius={6} style={{ marginBottom: 6 }} />
                    <SkeletonBox width="60%" height={14} borderRadius={6} style={{ marginBottom: 6 }} />
                    <SkeletonBox width="40%" height={12} borderRadius={6} />
                </View>
                <SkeletonBox width={80} height={24} borderRadius={12} />
            </View>

            {/* Order Footer */}
            <View style={styles.orderFooter}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <SkeletonBox width={70} height={16} borderRadius={6} />
                    <SkeletonBox width={60} height={14} borderRadius={6} />
                </View>
                {activeTab === 'Current Order' && (
                    <SkeletonBox width={100} height={16} borderRadius={6} />
                )}
            </View>

            {/* Order Items */}
            <View style={styles.orderItemsContainer}>
                <SkeletonBox width={50} height={14} borderRadius={6} style={{ marginBottom: 8 }} />
                <SkeletonBox width="90%" height={12} borderRadius={6} style={{ marginBottom: 4 }} />
                <SkeletonBox width="80%" height={12} borderRadius={6} />
            </View>
        </View>
    );

    const renderContent = () => {
        if (activeTab === 'My Cart') {
            return <CartItemSkeleton />;
        } else {
            return (
                <>
                    {[1, 2, 3].map((item) => (
                        <OrderCardSkeleton key={item} />
                    ))}
                </>
            );
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? darkMode25 : 'white',
        },
        content: {
            padding: 20,
        },
        cartContainer: {
            borderRadius: 12,
            padding: 20,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            borderWidth: 1,
            borderColor: '#CCCCCC',
        },
        cartHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0',
            marginBottom: 20,
        },
        productItem: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
            paddingBottom: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#F0F0F0',
        },
        productDetails: {
            flex: 1,
        },
        totalSection: {
            borderTopWidth: 1,
            borderTopColor: '#E0E0E0',
            paddingTop: 15,
            alignItems: 'flex-end',
        },
        orderCard: {
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            borderWidth: 1,
            borderColor: '#CCCCCC',
        },
        orderHeader: {
            flexDirection: 'row',
            marginBottom: 16,
        },
        orderFooter: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
        },
        orderItemsContainer: {
            borderTopWidth: 1,
            borderTopColor: '#E0E0E0',
            paddingTop: 12,
        },
        checkoutContainer: {
            backgroundColor: isDarkMode ? darkMode25 : 'white',
            paddingHorizontal: 20,
            paddingVertical: 20,
            paddingBottom: 35,
        },
    });

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {renderContent()}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Checkout Button Skeleton - Only for My Cart */}
            {activeTab === 'My Cart' && (
                <View style={styles.checkoutContainer}>
                    <SkeletonBox width="100%" height={56} borderRadius={28} />
                </View>
            )}
        </View>
    );
};

export default CartScreenSkeletonLoader;