import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Easing,
    ScrollView,
} from 'react-native';
import { dark33, dark55, darkMode25 } from '../../common/Colors/colors';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreenSkeletonLoader = ({ isDarkMode }) => {
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
                    backgroundColor: isDarkMode ? dark55 : '#E5E7EB',
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

    const HeaderSkeleton = () => (
        <View style={[styles.headerContainer, { backgroundColor: isDarkMode ? dark33 : '#F3F4F6' }]}>
            <View style={styles.topBar}>
                <View style={styles.leftHeader}>
                    <SkeletonBox width={80} height={12} borderRadius={6} style={{ marginBottom: 8 }} />
                    <SkeletonBox width={150} height={16} borderRadius={6} />
                </View>
                <View style={styles.rightHeader}>
                    <SkeletonBox width={40} height={40} borderRadius={12} />
                    <SkeletonBox width={40} height={40} borderRadius={12} />
                </View>
            </View>
            <SkeletonBox width="100%" height={50} borderRadius={16} />
        </View>
    );

    const BannerSkeleton = () => (
        <View style={styles.bannerSection}>
            <SkeletonBox width={320} height={140} borderRadius={20} />
            <View style={styles.paginationContainer}>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <SkeletonBox width={24} height={8} borderRadius={4} />
                    <SkeletonBox width={8} height={8} borderRadius={4} />
                    <SkeletonBox width={8} height={8} borderRadius={4} />
                </View>
            </View>
        </View>
    );

    const CategorySkeleton = () => (
        <View style={styles.sectionContainer}>
            <View style={{ marginBottom: 16 }}>
                <SkeletonBox width={150} height={20} borderRadius={6} style={{ marginBottom: 8 }} />
                <SkeletonBox width={40} height={3} borderRadius={2} />
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesGrid}
            >
                {[1, 2, 3, 4, 5].map((item) => (
                    <View
                        key={item}
                        style={[
                            styles.categoryCard,
                            { backgroundColor: isDarkMode ? dark55 : '#FFFFFF' },
                        ]}
                    >
                        <SkeletonBox
                            width={100}
                            height={80}
                            borderRadius={12}
                            style={{ marginTop: 8, marginBottom: 8 }}
                        />
                        <SkeletonBox width={80} height={12} borderRadius={6} style={{ marginBottom: 8 }} />
                        <SkeletonBox width={60} height={10} borderRadius={6} style={{ marginBottom: 4 }} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );

    const HorizontalProductSkeleton = () => (
        <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
                <View>
                    <SkeletonBox width={140} height={20} borderRadius={6} style={{ marginBottom: 8 }} />
                    <SkeletonBox width={40} height={3} borderRadius={2} />
                </View>
                <SkeletonBox width={60} height={16} borderRadius={6} />
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalProductsGrid}
            >
                {[1, 2, 3, 4].map((item) => (
                    <View
                        key={item}
                        style={[
                            styles.horizontalProductCard,
                            { backgroundColor: isDarkMode ? dark33 : '#FFFFFF' },
                        ]}
                    >
                        <SkeletonBox width={160} height={140} borderRadius={0} />
                        <View style={{ padding: 12 }}>
                            <SkeletonBox width={120} height={14} borderRadius={6} style={{ marginBottom: 8 }} />
                            <SkeletonBox width={80} height={12} borderRadius={6} style={{ marginBottom: 8 }} />
                            <View style={styles.horizontalPriceRow}>
                                <View>
                                    <SkeletonBox width={60} height={16} borderRadius={6} style={{ marginBottom: 4 }} />
                                    <SkeletonBox width={50} height={12} borderRadius={6} />
                                </View>
                                <SkeletonBox width={32} height={32} borderRadius={10} />
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );

    const ListProductSkeleton = () => (
        <View style={styles.sectionContainer}>
            <View style={{ marginBottom: 16 }}>
                <SkeletonBox width={160} height={20} borderRadius={6} style={{ marginBottom: 8 }} />
                <SkeletonBox width={40} height={3} borderRadius={2} />
            </View>
            {[1, 2, 3, 4, 5].map((item) => (
                <View
                    key={item}
                    style={[
                        styles.listProductCard,
                        { backgroundColor: isDarkMode ? dark33 : '#FFFFFF' },
                    ]}
                >
                    <SkeletonBox width={90} height={90} borderRadius={12} />
                    <View style={styles.listProductInfo}>
                        <SkeletonBox width="80%" height={16} borderRadius={6} style={{ marginBottom: 8 }} />
                        <SkeletonBox width="50%" height={12} borderRadius={6} style={{ marginBottom: 8 }} />
                        <SkeletonBox width={80} height={16} borderRadius={6} />
                    </View>
                    <SkeletonBox width={40} height={40} borderRadius={20} />
                </View>
            ))}
        </View>
    );

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? darkMode25 : '#F3F4F6',
        },
        headerContainer: {
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 24,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
        },
        topBar: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
        },
        leftHeader: {
            flex: 1,
        },
        rightHeader: {
            flexDirection: 'row',
            gap: 12,
        },
        bannerSection: {
            marginTop: 20,
            alignItems: 'center',
        },
        paginationContainer: {
            paddingVertical: 12,
        },
        sectionContainer: {
            paddingHorizontal: 20,
            paddingVertical: 10,
        },
        sectionHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
        },
        categoriesGrid: {
            gap: 12,
            paddingRight: 20,
        },
        categoryCard: {
            width: 110,
            borderRadius: 16,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 3,
            marginBottom: 10,
        },
        horizontalProductsGrid: {
            gap: 16,
            paddingRight: 20,
        },
        horizontalProductCard: {
            width: 160,
            borderRadius: 16,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 3,
            marginBottom: 10,
        },
        horizontalPriceRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        listProductCard: {
            flexDirection: 'row',
            borderRadius: 16,
            padding: 12,
            marginBottom: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 4,
            elevation: 2,
        },
        listProductInfo: {
            flex: 1,
            marginLeft: 12,
            justifyContent: 'center',
        },
    });

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <HeaderSkeleton />
            <BannerSkeleton />
            <CategorySkeleton />
            <HorizontalProductSkeleton />
            <ListProductSkeleton />
            <View style={{ height: 100 }} />
        </ScrollView>
    );
};

export default HomeScreenSkeletonLoader;