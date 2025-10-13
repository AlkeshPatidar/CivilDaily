import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    StatusBar,
} from 'react-native';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { App_Primary_color, white } from '../../common/Colors/colors';

const { width, height } = Dimensions.get('window');

// Product icons array - rotating between different products
const PRODUCT_ICONS = [
    '🛒', '🥛', '🍞', '🥚', '🧃', '🍎', '🥕', 
    '🍌', '🥗', '🍕', '🧊', '🥤', '🍫'
];

const BlinKitLoader = ({ isDarkMode = false, StatusBarColor }) => {
    const [currentIconIndex, setCurrentIconIndex] = useState(0);
    
    // Animation refs
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Icon rotation animation
        const iconInterval = setInterval(() => {
            setCurrentIconIndex((prevIndex) => 
                (prevIndex + 1) % PRODUCT_ICONS.length
            );
        }, 800);

        // Scale and rotate animation for icon
        Animated.loop(
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(scaleAnim, {
                        toValue: 1.2,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleAnim, {
                        toValue: 0.8,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Pulse animation for cart
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Fade in animation
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        return () => {
            clearInterval(iconInterval);
        };
    }, []);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? '#252525' : white,
            justifyContent: 'center',
            alignItems: 'center',
        },
        iconContainer: {
            width: 120,
            height: 120,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 30,
        },
        cartIcon: {
            fontSize: 80,
            position: 'absolute',
        },
        productIcon: {
            fontSize: 40,
            position: 'absolute',
            top: -10,
            right: -10,
        },
        textContainer: {
            alignItems: 'center',
            paddingHorizontal: 40,
        },
        mainText: {
            fontSize: 20,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? white : '#1F2937',
            textAlign: 'center',
            marginBottom: 8,
        },
        subText: {
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: '#9CA3AF',
            textAlign: 'center',
        },
        dotsContainer: {
            flexDirection: 'row',
            marginTop: 30,
            gap: 8,
        },
        dot: {
            width: 8,
            height: 8,
            borderRadius: 4,
        },
    });

    // Animated dots
    const DotAnimation = ({ delay }) => {
        const dotScale = useRef(new Animated.Value(1)).current;

        useEffect(() => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(dotScale, {
                        toValue: 1.5,
                        duration: 400,
                        delay: delay,
                        useNativeDriver: true,
                    }),
                    Animated.timing(dotScale, {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        }, []);

        return (
            <Animated.View
                style={[
                    styles.dot,
                    {
                        backgroundColor: App_Primary_color,
                        transform: [{ scale: dotScale }],
                    },
                ]}
            />
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={isDarkMode ? '#1a1a1a' : StatusBarColor || App_Primary_color}
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />

            <Animated.View
                style={[
                    styles.iconContainer,
                    { opacity: fadeAnim },
                ]}
            >
                {/* Cart Icon with pulse animation */}
                <Animated.Text
                    style={[
                        styles.cartIcon,
                        {
                            transform: [{ scale: pulseAnim }],
                        },
                    ]}
                >
                    🛒
                </Animated.Text>

                {/* Rotating Product Icon */}
                <Animated.Text
                    style={[
                        styles.productIcon,
                        {
                            transform: [
                                { scale: scaleAnim },
                                { rotate: spin },
                            ],
                        },
                    ]}
                >
                    {PRODUCT_ICONS[currentIconIndex]}
                </Animated.Text>
            </Animated.View>

            <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
                <Text style={styles.mainText}>
                    Everything you need, delivered in minutes
                </Text>
                <Text style={styles.subText}>
                    Loading your favorite products...
                </Text>
            </Animated.View>

            {/* Animated Dots */}
            <View style={styles.dotsContainer}>
                <DotAnimation delay={0} />
                <DotAnimation delay={150} />
                <DotAnimation delay={300} />
            </View>
        </View>
    );
};

export default BlinKitLoader;