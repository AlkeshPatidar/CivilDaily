import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Image,
    Animated,
    Easing,
} from 'react-native';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { App_Primary_color, dark33, darkMode25, white } from '../../common/Colors/colors';
import { useSelector } from 'react-redux';
import IMG from '../../assets/Images';
import { useLoginCheck } from '../../utils/Context';
import { setItem } from '../../utils/Apis';

const RoleSelection = ({ navigation }) => {
    const { isDarkMode } = useSelector(state => state.theme);

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const titleSlide = useRef(new Animated.Value(-30)).current;
    const button1Scale = useRef(new Animated.Value(0.8)).current;
    const button2Scale = useRef(new Animated.Value(0.8)).current;
    const floatingAnim = useRef(new Animated.Value(0)).current;
    const { loggedInby, setloggedInby } = useLoginCheck()

    useEffect(() => {
        // Initial entrance animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
                easing: Easing.out(Easing.cubic),
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
                easing: Easing.out(Easing.back(1.2)),
            }),
            Animated.timing(titleSlide, {
                toValue: 0,
                duration: 600,
                delay: 200,
                useNativeDriver: true,
                easing: Easing.out(Easing.cubic),
            }),
            Animated.spring(button1Scale, {
                toValue: 1,
                delay: 400,
                friction: 4,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.spring(button2Scale, {
                toValue: 1,
                delay: 500,
                friction: 4,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();

        // Continuous floating animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatingAnim, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(floatingAnim, {
                    toValue: 0,
                    duration: 2000,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const handleRoleSelection = async (role) => {
        // Navigate to login with selected role
        // navigation.navigate('Login', { userRole: role });
        await setItem('loggedInby', role)
        setloggedInby(role)
        navigation.navigate('Login');
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? darkMode25 : '#ffffff',
        },
        content: {
            flex: 1,
            paddingHorizontal: 20,
            //   justifyContent: 'center',
            alignItems: 'center',
        },
        bannerContainer: {
            alignItems: 'center',
            //   marginBottom: 40,
        },
        banner: {
            height: 200,
            width: 400,
        },
        textContainer: {
            alignItems: 'center',
            marginBottom: 50,
        },
        title: {
            fontSize: 24,
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            color: isDarkMode ? white : '#000',
            marginBottom: 8,
            textAlign: 'center',
        },
        subtitle: {
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: isDarkMode ? 'white' : '#666',
            lineHeight: 22,
            textAlign: 'center',
            paddingHorizontal: 20,
        },
        buttonContainer: {
            width: '100%',
            gap: 16,
        },
        roleButton: {
            backgroundColor: App_Primary_color,
            borderRadius: 25,
            height: 56,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: App_Primary_color,
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
        },
        secondaryButton: {
            backgroundColor: isDarkMode ? dark33 : '#F2F2F3',
            borderWidth: 2,
            borderColor: App_Primary_color,
        },
        buttonText: {
            color: white,
            fontSize: 16,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
        },
        secondaryButtonText: {
            color: App_Primary_color,
        },
        footer: {
            position: 'absolute',
            bottom: 40,
            alignSelf: 'center',
        },
        footerText: {
            fontSize: 12,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: isDarkMode ? 'white' : '#999',
            textAlign: 'center',
        },
    });

    const floatingTranslate = floatingAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10],
    });

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={isDarkMode ? darkMode25 : '#ffffff'}
            // translucent={true}
            />

            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    }
                ]}
            >
                {/* Banner/Image */}
                <Animated.View
                    style={[
                        styles.bannerContainer,
                        {
                            transform: [{ translateY: floatingTranslate }],
                        }
                    ]}
                >
                    <Image
                        source={IMG.construction}
                        style={styles.banner}
                        resizeMode="contain"
                    />
                </Animated.View>

                {/* Title and Subtitle */}
                <Animated.View
                    style={[
                        styles.textContainer,
                        {
                            transform: [{ translateY: titleSlide }],
                        }
                    ]}
                >
                    <Text style={styles.title}>Welcome!</Text>
                    <Text style={styles.subtitle}>
                        Choose your role to continue{'\n'}and get started with us
                    </Text>
                </Animated.View>

                {/* Role Selection Buttons */}
                <View style={styles.buttonContainer}>
                    <Animated.View
                        style={{
                            transform: [{ scale: button1Scale }],
                        }}
                    >
                        <TouchableOpacity
                            style={styles.roleButton}
                            onPress={() => handleRoleSelection('user')}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>Login as User</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View
                        style={{
                            transform: [{ scale: button2Scale }],
                        }}
                    >
                        <TouchableOpacity
                            style={[styles.roleButton, styles.secondaryButton]}
                            onPress={() => handleRoleSelection('field_executive')}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                                Login as Field Executive
                            </Text>
                        </TouchableOpacity>


                    </Animated.View>

                    <Animated.View
                        style={{
                            transform: [{ scale: button2Scale }],
                        }}
                    >
                        <TouchableOpacity
                            style={[styles.roleButton, styles.secondaryButton]}
                            onPress={() => handleRoleSelection('supplier')}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                                Login as Supplier
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Animated.View>

            {/* Footer */}
            <Animated.View
                style={[
                    styles.footer,
                    {
                        opacity: fadeAnim,
                    }
                ]}
            >
                <Text style={styles.footerText}>
                    By continuing, you agree to our Terms & Privacy Policy
                </Text>
            </Animated.View>
        </View>
    );
};

export default RoleSelection;