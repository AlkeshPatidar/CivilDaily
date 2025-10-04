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
import LinearGradient from 'react-native-linear-gradient';

const FavouriteScreenSkeletonLoader = ({ isDarkMode }) => {
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
            <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                <SkeletonBox width={24} height={24} borderRadius={12} />
                <SkeletonBox width={180} height={20} borderRadius={6} />
            </View>
        </View>
    );

    const FavouriteItemSkeleton = () => (
        <View
            style={[
                styles.productCard1,
                { backgroundColor: isDarkMode ? dark33 : '#FFFFFF' }
            ]}
        >
            {/* Product Image */}
            <SkeletonBox width={80} height={68} borderRadius={10} />

            {/* Product Details */}
            <View style={{ marginLeft: 20, flex: 1 }}>
                <SkeletonBox 
                    width="80%" 
                    height={16} 
                    borderRadius={6} 
                    style={{ marginBottom: 8 }} 
                />
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <SkeletonBox width={60} height={12} borderRadius={6} />
                    <SkeletonBox width={50} height={16} borderRadius={6} />
                    <SkeletonBox width={50} height={12} borderRadius={6} />
                </View>
            </View>

            {/* Action Buttons */}
            <View 
                style={{
                    position: 'absolute',
                    right: 5,
                    top: 5,
                    flexDirection: 'row',
                    gap: 10,
                }}
            >
                <SkeletonBox width={32} height={32} borderRadius={16} />
                <SkeletonBox width={32} height={32} borderRadius={16} />
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
        sectionContainer: {
            paddingHorizontal: 16,
            paddingVertical: 15,
        },
        productCard1: {
            width: '100%',
            borderRadius: 16,
            padding: 16,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 3,
            flexDirection: 'row',
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <HeaderSkeleton />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.sectionContainer}>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <FavouriteItemSkeleton key={item} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default FavouriteScreenSkeletonLoader;