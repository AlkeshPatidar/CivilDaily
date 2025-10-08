import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    Image,
    Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { App_Primary_color, dark33, darkMode25 } from '../../common/Colors/colors';
import { FONTS_FAMILY } from '../../assets/Fonts';
import Row from '../../components/wrapper/row';
import { AddButton, DownChev } from '../../assets/SVGs';
import IMG from '../../assets/Images';
import SpaceBetweenRow from '../../components/wrapper/spacebetween';
import { useSelector } from 'react-redux';
import useLoader from '../../utils/LoaderHook';
import { apiGet } from '../../utils/Apis';
import urls from '../../config/urls';
import CategoryScreenSkeletonLoader from '../../components/Skeleton/CategorySkeletonLoader';
import { useIsFocused } from '@react-navigation/native';



export default function Category({ navigation }) {
    const { showLoader, hideLoader } = useLoader()
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [selectedCategoryId, setSelectedCategoryId] = useState(null)
    const [filteredSubCategories, setFilteredSubCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { isDarkMode } = useSelector(state => state.theme)
    const isFocused = useIsFocused()

    // Animation values
    const headerAnim = useRef(new Animated.Value(0)).current;
    const categoriesAnim = useRef(new Animated.Value(0)).current;
    const subCategoriesAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        initializeData()
    }, [isFocused])

    useEffect(() => {
        if (selectedCategoryId) {
            const filtered = subCategories.filter(sub => 
                sub.categoryId._id === selectedCategoryId
            );
            setFilteredSubCategories(filtered);
            
            // Animate subcategories when they change
            if (filtered.length > 0) {
                animateSubCategories();
            }
        } else {
            setFilteredSubCategories([]);
        }
    }, [selectedCategoryId, subCategories]);

    const initializeData = async () => {
        setIsLoading(true)
        await Promise.all([
            getCategories(),
            getSubCategories()
        ])
        setIsLoading(false)
        
        // Start animations after loading
        startMountAnimations();
    }

    const startMountAnimations = () => {
        // Reset animation values
        headerAnim.setValue(0);
        categoriesAnim.setValue(0);
        subCategoriesAnim.setValue(0);
        fadeAnim.setValue(0);

        // Staggered animation sequence
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.parallel([
                Animated.spring(headerAnim, {
                    toValue: 1,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true,
                }),
                Animated.timing(categoriesAnim, {
                    toValue: 1,
                    duration: 400,
                    delay: 100,
                    useNativeDriver: true,
                }),
            ]),
            Animated.spring(subCategoriesAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                delay: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const animateSubCategories = () => {
        subCategoriesAnim.setValue(0);
        Animated.spring(subCategoriesAnim, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
        }).start();
    };

    const getCategories = async () => {
        try {
            const res = await apiGet(urls?.getCategory)
            setCategories(res?.data || [])
            
            // Auto-select first category if available
            if (res?.data && res?.data.length > 0) {
                setSelectedCategoryId(res.data[0]._id);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const getSubCategories = async () => {
        try {
            const res = await apiGet(urls?.getSubCategories)
            setSubCategories(res?.data || [])
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedCategoryId(categoryId);
    };


// Separate component for animated category item
const AnimatedCategoryItem = ({ category, isSelected, onPress, index, isLoading }) => {
    const itemAnim = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
        if (!isLoading) {
            Animated.spring(itemAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                delay: index * 50,
                useNativeDriver: true,
            }).start();
        }
    }, [isLoading]);

    const scale = itemAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.8, 1],
    });

    return (
        <Animated.View
            style={{
                opacity: itemAnim,
                transform: [{ scale }],
            }}
        >
            <TouchableOpacity 
                style={[
                    styles.categoryItem,
                    isSelected && styles.selectedCategoryItem
                ]}
                onPress={onPress}
            >
                <View style={[
                    styles.categoryIcon,
                    isSelected && styles.selectedCategoryIcon
                ]}>
                    <Text style={[
                        styles.categoryText,
                        isSelected && styles.selectedCategoryText
                    ]}>
                        {category.name}
                    </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

// Separate component for animated subcategory item
const AnimatedSubCategoryItem = ({ item, onPress, index }) => {
    const itemAnim = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
        Animated.spring(itemAnim, {
            toValue: 1,
            tension: 50,
            friction: 7,
            delay: index * 80,
            useNativeDriver: true,
        }).start();
    }, []);

    const scale = itemAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.9, 1],
    });

    return (
        <Animated.View
            style={{
                opacity: itemAnim,
                transform: [{ scale }],
            }}
        >
            <TouchableOpacity 
                style={styles.productCard}
                onPress={onPress}
            >
                <Image 
                    source={{ uri: item.image }} 
                    style={{
                        height: 87, 
                        width: 100,
                        borderRadius: 10
                    }} 
                    defaultSource={IMG.sprite}
                />
                <Text style={styles.productName}>{item.name}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};


    // Header Component
    const renderHeader = () => {
        const headerTranslateY = headerAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, 0],
        });

        return (
            <Animated.View 
                style={[
                    styles.headerContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: headerTranslateY }],
                    }
                ]}
            >
                <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />

                <View style={styles.topBar}>
                    <View style={styles.leftHeader}>
                        <Text style={{ ...styles.avatarText, fontFamily: FONTS_FAMILY.Poppins_SemiBold }}>Shop</Text>
                        <Row>
                            <Text style={{ ...styles.avatarText }}>By Category</Text>
                        </Row>
                    </View>

                    <View style={styles.rightHeader}>
                        <TouchableOpacity 
                            style={styles.iconButton}
                            onPress={() => navigation.navigate('CartScreen')}
                        >
                            <Ionicons name="cart-outline" size={20} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="notifications-outline" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        );
    };

    // Categories Component
    const renderCategories = () => {
        const categoriesTranslateX = categoriesAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-100, 0],
        });

        return (
            <Animated.View 
                style={[
                    styles.sectionContainer,
                    {
                        opacity: categoriesAnim,
                        transform: [{ translateX: categoriesTranslateX }],
                    }
                ]}
            >
                <Text style={styles.sectionTitle}>Categories</Text>
                
                <ScrollView 
                    contentContainerStyle={styles.categoriesGrid}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {categories.map((category, index) => (
                        <AnimatedCategoryItem
                            key={category._id}
                            category={category}
                            isSelected={selectedCategoryId === category._id}
                            onPress={() => handleCategorySelect(category._id)}
                            index={index}
                            isLoading={isLoading}
                        />
                    ))}
                </ScrollView>
            </Animated.View>
        );
    };

    // Subcategories Component
    const renderSubCategories = () => {
        if (!selectedCategoryId) {
            return null;
        }

        if (filteredSubCategories.length === 0) {
            return (
                <Animated.View 
                    style={[
                        styles.sectionContainer,
                        {
                            opacity: subCategoriesAnim,
                        }
                    ]}
                >
                    <Text style={styles.emptyText}>No subcategories found</Text>
                </Animated.View>
            );
        }

        const subCategoriesTranslateY = subCategoriesAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0],
        });

        return (
            <Animated.View 
                style={[
                    styles.sectionContainer,
                    {
                        opacity: subCategoriesAnim,
                        transform: [{ translateY: subCategoriesTranslateY }],
                    }
                ]}
            >
                <View style={styles.productsGrid}>
                    {filteredSubCategories.map((item, index) => (
                        <AnimatedSubCategoryItem
                            key={item._id}
                            item={item}
                            index={index}
                            onPress={() => navigation.navigate('CategoryProducts', { 
                                categoryId: selectedCategoryId,
                                subcategoryId: item._id,
                                subcategoryName: item.name 
                            })}
                        />
                    ))}
                </View>
            </Animated.View>
        );
    };

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
            zIndex: 10000000
        },
        topBar: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
        },
        leftHeader: {},
        avatarText: {
            color: 'white',
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 30,
        },
        rightHeader: {
            flexDirection: 'row',
        },
        iconButton: {
            marginLeft: 16,
            backgroundColor: '#6C87CF',
            padding: 8,
            borderRadius: 100
        },
        sectionContainer: {
            paddingHorizontal: 16,
            paddingVertical: 15,
            zIndex: -100000,
        },
        sectionTitle: {
            fontSize: 18,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: isDarkMode ? '#fff' : '#1F2937',
            marginBottom: 16,
        },
        sectionHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
        },
        seeAllText: {
            color: App_Primary_color,
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
        },
        categoriesGrid: {
            flexDirection: 'row',
            gap: 12,
            paddingRight: 16,
        },
        categoryItem: {
            marginRight: 8,
        },
        selectedCategoryItem: {

        },
        categoryIcon: {
            paddingVertical: 5,
            borderRadius: 25,
            borderWidth: 1.5,
            borderColor: '#B2BBCE',
            backgroundColor: 'transparent',
            minWidth: 90,
            alignItems: 'center',
        },
        selectedCategoryIcon: {
            backgroundColor: App_Primary_color,
            borderColor: App_Primary_color,
        },
        categoryText: {
            fontSize: 14,
            color: '#B2BBCE',
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            textAlign: 'center',
        },
        selectedCategoryText: {
            color: 'white',
        },
        productsGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
        },
        productCard: {
            backgroundColor: isDarkMode ? dark33 : '#F2F2F3',
            // maxWidth: '50%',
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
        productName: {
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? 'white' : '#1F2937',
            alignSelf: 'center',
            marginTop: 5
        },
        emptyText: {
            fontSize: 16,
            color: isDarkMode ? '#ccc' : '#6B7280',
            textAlign: 'center',
            fontFamily: FONTS_FAMILY.Poppins_Regular,
        },
    });

    // Main return with conditional rendering
    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <CategoryScreenSkeletonLoader isDarkMode={isDarkMode} />
            ) : (
                <>
                    {renderHeader()}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {categories.length > 0 && renderCategories()}
                        {renderSubCategories()}
                    </ScrollView>
                </>
            )}
        </SafeAreaView>
    );
}