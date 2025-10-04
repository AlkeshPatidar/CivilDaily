import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Easing,
    ScrollView,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { App_Primary_color, dark33, darkMode25 } from '../../common/Colors/colors';
import LinearGradient from 'react-native-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');

const ProductDetailSkeletonLoader = ({ isDarkMode }) => {
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
        <View style={styles.header}>
            <SkeletonBox width={40} height={40} borderRadius={20} />
            <View style={{ marginLeft: 'auto' }}>
                <SkeletonBox width={40} height={40} borderRadius={20} />
            </View>
        </View>
    );

    const CarouselSkeleton = () => (
        <View style={styles.carouselContainer}>
            <SkeletonBox 
                width={screenWidth} 
                height={250} 
                borderRadius={0} 
            />
            {/* Pagination dots */}
            <View style={styles.paginationContainer}>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <SkeletonBox width={19} height={5} borderRadius={4} />
                    <SkeletonBox width={19} height={5} borderRadius={4} />
                    <SkeletonBox width={19} height={5} borderRadius={4} />
                </View>
            </View>
        </View>
    );

    const ProductInfoSkeleton = () => (
        <View style={styles.productInfo}>
            {/* Title */}
            <SkeletonBox 
                width="80%" 
                height={22} 
                borderRadius={6} 
                style={{ marginBottom: 12 }} 
            />
            
            {/* Price */}
            <SkeletonBox 
                width={100} 
                height={18} 
                borderRadius={6} 
                style={{ marginBottom: 12 }} 
            />
            
            {/* Stock Info */}
            <SkeletonBox 
                width={150} 
                height={16} 
                borderRadius={6} 
                style={{ marginBottom: 20 }} 
            />
            
            {/* Description - Multiple lines */}
            <SkeletonBox 
                width="95%" 
                height={14} 
                borderRadius={6} 
                style={{ marginBottom: 8 }} 
            />
            <SkeletonBox 
                width="90%" 
                height={14} 
                borderRadius={6} 
                style={{ marginBottom: 8 }} 
            />
            <SkeletonBox 
                width="85%" 
                height={14} 
                borderRadius={6} 
                style={{ marginBottom: 24 }} 
            />
            
            {/* Quantity Section */}
            <SkeletonBox 
                width={80} 
                height={18} 
                borderRadius={6} 
                style={{ marginBottom: 12 }} 
            />
            
            {/* Quantity Selector */}
            <View style={styles.quantitySelector}>
                <SkeletonBox width={40} height={40} borderRadius={20} />
                <SkeletonBox 
                    width={50} 
                    height={40} 
                    borderRadius={8} 
                    style={{ marginHorizontal: 20 }} 
                />
                <SkeletonBox width={40} height={40} borderRadius={20} />
            </View>
        </View>
    );

    const BottomActionsSkeleton = () => (
        <View style={styles.bottomContainer}>
            <SkeletonBox 
                width="48%" 
                height={50} 
                borderRadius={25} 
            />
            <SkeletonBox 
                width="48%" 
                height={50} 
                borderRadius={25} 
            />
        </View>
    );

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? darkMode25 : '#fff',
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12,
            position: 'absolute',
            top: 50,
            left: 0,
            right: 0,
            zIndex: 10,
        },
        carouselContainer: {
            marginTop: 40,
            position: 'relative',
        },
        paginationContainer: {
            position: 'absolute',
            bottom: 10,
            alignSelf: 'center',
        },
        productInfo: {
            padding: 20,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            backgroundColor: isDarkMode ? darkMode25 : '#fff',
        },
        quantitySelector: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        bottomContainer: {
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingVertical: 16,
            paddingBottom: 30,
            gap: 12,
            backgroundColor: isDarkMode ? darkMode25 : '#fff',
            borderTopWidth: 1,
            borderTopColor: isDarkMode ? '#333' : '#f0f0f0',
            justifyContent: 'space-between',
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <HeaderSkeleton />
            
            <ScrollView showsVerticalScrollIndicator={false}>
                <CarouselSkeleton />
                <ProductInfoSkeleton />
            </ScrollView>
            
            <BottomActionsSkeleton />
        </SafeAreaView>
    );
};

export default ProductDetailSkeletonLoader;