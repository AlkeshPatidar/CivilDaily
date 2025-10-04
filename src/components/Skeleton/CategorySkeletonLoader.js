import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Easing,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { App_Primary_color, dark33, darkMode25 } from '../../common/Colors/colors';
import { FONTS_FAMILY } from '../../assets/Fonts';
import LinearGradient from 'react-native-linear-gradient';

const CategoryScreenSkeletonLoader = ({ isDarkMode }) => {
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

    const HeaderSkeleton = () => (
        <View style={styles.headerContainer}>
            <View style={styles.topBar}>
                <View style={styles.leftHeader}>
                    <SkeletonBox width={120} height={30} borderRadius={8} style={{ marginBottom: 4 }} />
                    <SkeletonBox width={150} height={30} borderRadius={8} />
                </View>
                <View style={styles.rightHeader}>
                    <SkeletonBox width={40} height={40} borderRadius={20} />
                    <SkeletonBox width={40} height={40} borderRadius={20} style={{ marginLeft: 16 }} />
                </View>
            </View>
        </View>
    );

    const CategoriesSkeleton = () => (
        <View style={styles.sectionContainer}>
            <SkeletonBox width={120} height={22} borderRadius={6} style={{ marginBottom: 16 }} />
            
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesGrid}
            >
                {[1, 2, 3, 4, 5].map((item) => (
                    <View key={item} style={styles.categoryItem}>
                        <SkeletonBox width={90} height={35} borderRadius={25} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );

    const SubCategoriesSkeleton = () => (
        <View style={styles.sectionContainer}>
            <View style={styles.productsGrid}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <View
                        key={item}
                        style={[
                            styles.productCard,
                            { backgroundColor: isDarkMode ? dark33 : '#F2F2F3' }
                        ]}
                    >
                        <SkeletonBox 
                            width={100} 
                            height={87} 
                            borderRadius={10} 
                            style={{ marginBottom: 8 }} 
                        />
                        <SkeletonBox width={80} height={14} borderRadius={6} />
                    </View>
                ))}
            </View>
        </View>
    );

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
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
        },
        topBar: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
        },
        leftHeader: {
            // Empty for layout
        },
        rightHeader: {
            flexDirection: 'row',
        },
        sectionContainer: {
            paddingHorizontal: 16,
            paddingVertical: 15,
        },
        categoriesGrid: {
            flexDirection: 'row',
            gap: 12,
            paddingRight: 16,
        },
        categoryItem: {
            marginRight: 8,
        },
        productsGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
        },
        productCard: {
            maxWidth: '50%',
            borderRadius: 16,
            padding: 10,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <HeaderSkeleton />
            <ScrollView showsVerticalScrollIndicator={false}>
                <CategoriesSkeleton />
                <SubCategoriesSkeleton />
            </ScrollView>
        </SafeAreaView>
    );
};

export default CategoryScreenSkeletonLoader;