import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    ScrollView,
    Animated,
    Easing,
} from 'react-native';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { App_Primary_color, dark33, dark55, darkMode25, white } from '../../common/Colors/colors';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerMenu from '../../components/DrawerModal';

const ExecutiveDashboard = ({ navigation }) => {
    const { isDarkMode } = useSelector(state => state.theme);

    const [isVisible, setIsVisible] = useState(false)

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const card1Scale = useRef(new Animated.Value(0.9)).current;
    const card2Scale = useRef(new Animated.Value(0.9)).current;
    const card3Scale = useRef(new Animated.Value(0.9)).current;
    const card4Scale = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        // Initial entrance animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
                easing: Easing.out(Easing.cubic),
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
                easing: Easing.out(Easing.back(1.2)),
            }),
            Animated.spring(card1Scale, {
                toValue: 1,
                delay: 200,
                friction: 5,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.spring(card2Scale, {
                toValue: 1,
                delay: 300,
                friction: 5,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.spring(card3Scale, {
                toValue: 1,
                delay: 400,
                friction: 5,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.spring(card4Scale, {
                toValue: 1,
                delay: 500,
                friction: 5,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const dashboardCards = [
        {
            id: 1,
            title: 'Profile',
            icon: 'person-circle-outline',
            iconType: 'Ionicons',
            color: '#6366F1',
            bgColor: 'rgba(99, 102, 241, 0.1)',
            scale: card1Scale,
            route: 'ExecutiveProfile',
        },
        {
            id: 2,
            title: 'Add User',
            icon: 'person-add-outline',
            iconType: 'Ionicons',
            color: '#EC4899',
            bgColor: 'rgba(236, 72, 153, 0.1)',
            scale: card2Scale,
            route: 'AddUserScreen',
        },
        {
            id: 3,
            title: 'All Users',
            icon: 'people-outline',
            iconType: 'Ionicons',
            color: '#06B6D4',
            bgColor: 'rgba(6, 182, 212, 0.1)',
            scale: card3Scale,
            route: 'AllUsersScreen',
        },
        {
            id: 4,
            title: 'Executive All Requirement',
            icon: 'clipboard-list-outline',
            iconType: 'MaterialCommunityIcons',
            color: '#10B981',
            bgColor: 'rgba(16, 185, 129, 0.1)',
            scale: card4Scale,
            route: 'ExecutiveAllRequirement',
        },
    ];

    const handleCardPress = (route) => {
        // Navigate to respective screen
        navigation.navigate(route);
    };

    const handleDrawerOpen = () => {
        // Open drawer - will be implemented later
        console.log('Open Drawer');
        // navigation.openDrawer(); // Uncomment when drawer is implemented
        setIsVisible(true)
    };

    const renderCard = (item) => (
        <Animated.View
            key={item.id}
            style={[
                styles.cardWrapper,
                {
                    transform: [{ scale: item.scale }],
                },
            ]}
        >
            <TouchableOpacity
                style={[
                    styles.card,
                    {
                        backgroundColor: isDarkMode ? dark33 : white,
                        borderColor: isDarkMode ? dark55 : '#f0f0f0',
                    }
                ]}
                onPress={() => handleCardPress(item.route)}
                activeOpacity={0.7}
            >
                <View
                    style={[
                        styles.iconContainer,
                        {
                            backgroundColor: isDarkMode ? item.color + '20' : item.bgColor,
                        },
                    ]}
                >
                    {item.iconType === 'Ionicons' ? (
                        <Ionicons name={item.icon} size={32} color={item.color} />
                    ) : (
                        <MaterialCommunityIcons name={item.icon} size={32} color={item.color} />
                    )}
                </View>
                <Text
                    style={[
                        styles.cardTitle,
                        { color: isDarkMode ? white : '#1F2937' }
                    ]}
                    numberOfLines={2}
                >
                    {item.title}
                </Text>
            </TouchableOpacity>
        </Animated.View>
    );

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? darkMode25 : 'rgba(255, 255, 255, 0.3)',
        },
        header: {
            backgroundColor: isDarkMode ? dark33 : white,
            paddingHorizontal: 20,
            paddingTop: 40,
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? dark55 : '#E5E7EB',
            shadowColor: '#000',
            // justifyContent:'space-between',

            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
        },
        headerContent: {
            flexDirection: 'row',

            //   alignItems: 'center',
            // justifyContent:'space-between'
        },
        menuButton: {
            width: 40,
            height: 40,
            borderRadius: 10,
            backgroundColor: isDarkMode ? dark55 : '#F3F4F6',
            justifyContent: 'center',
            alignItems: 'center',
            //   marginRight: 5,
        },
        headerTextContainer: {
            //   flex: 1,
            left: 10

        },
        headerTitle: {
            fontSize: 18,
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            color: App_Primary_color,
            //   left:10
            //   marginBottom: 2,
            // textAlign:'center'
        },
        headerSubtitle: {
            fontSize: 13,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: isDarkMode ? '#9CA3AF' : '#6B7280',
        },
        notificationButton: {
            width: 40,
            height: 40,
            borderRadius: 10,
            backgroundColor: isDarkMode ? dark55 : '#F3F4F6',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
        },
        notificationBadge: {
            position: 'absolute',
            top: 8,
            right: 8,
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#EF4444',
        },
        scrollContent: {
            padding: 20,
        },
        cardsGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: -8,
        },
        cardWrapper: {
            width: '50%',
            paddingHorizontal: 8,
            marginBottom: 16,
        },
        card: {
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: 140,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 3,
        },
        iconContainer: {
            width: 70,
            height: 70,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
        },
        cardTitle: {
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            textAlign: 'center',
            lineHeight: 20,
        },
    });

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={isDarkMode ? dark33 : white}
            />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={handleDrawerOpen}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="menu"
                            size={24}
                            color={isDarkMode ? white : '#374151'}
                        />
                    </TouchableOpacity>

                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>Executive DashBoard{'\n'} Overview</Text>
                        <Text style={styles.headerSubtitle}>
                            Complete business insights at a glance
                        </Text>
                    </View>

                    {/* <TouchableOpacity
            style={styles.notificationButton}
            activeOpacity={0.7}
          >
            <Ionicons
              name="notifications-outline"
              size={22}
              color={isDarkMode ? white : '#374151'}
            />
            <View style={styles.notificationBadge} />
          </TouchableOpacity> */}
                </View>
            </View>

            {/* Dashboard Cards */}
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View
                    style={[
                        styles.cardsGrid,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    {dashboardCards.map((card) => renderCard(card))}
                </Animated.View>
            </ScrollView>
            <DrawerMenu
                visible={isVisible}
                onClose={() => setIsVisible(false)}
                navigation={navigation}
            />
        </View>
    );
};

export default ExecutiveDashboard;