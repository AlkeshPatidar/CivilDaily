import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { FONTS_FAMILY } from "../../../assets/Fonts";
import { App_Primary_color, dark33, dark55, darkMode25, white } from "../../../common/Colors/colors";
import SpaceBetweenRow from "../../../components/wrapper/spacebetween";

const RenderBestSellers = ({ navigation }) => {
    const { isDarkMode } = useSelector(state => state.theme);

    const bestSellers = [
        {
            id: 1,
            name: 'Vegetables & Fruits',
            images: [
                'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=150',
            ]
        },
        {
            id: 2,
            name: 'Chips & Namkeen',
            images: [
                'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=150',
            ]
        },
        {
            id: 3,
            name: 'Oil, Ghee & Masala',
            images: [
                'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=150',
            ]
        },
        {
            id: 4,
            name: 'Peanut Butter & Juices',
            images: [
                'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=150',
            ]
        },
        {
            id: 5,
            name: 'Biscuits',
            images: [
                'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=150',
            ]
        },
        {
            id: 6,
            name: 'Bread & Eggs',
            images: [
                'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150',
            ]
        }
    ];

    const styles = StyleSheet.create({
        bestSellersSection: {
            backgroundColor: isDarkMode ? dark33 : 'white',
            paddingVertical: 16,
            paddingHorizontal: 16,
            marginBottom: 8,
        },
        bestSellersTitle: {
            fontSize: 16,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: isDarkMode ? white : '#000',
            marginBottom: 12,
        },
        seeAllText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 14,
            color: App_Primary_color
        },
        flatListContainer: {
            paddingBottom: 8,
        },
        categoryCard: {
            flex: 1,
            backgroundColor: isDarkMode ? dark55 : '#F8F8F8',
            borderRadius: 12,
            margin: 4,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: isDarkMode ? dark55 : '#F0F0F0',
            maxWidth: '23%',
        },
        imagesGrid: {
            width: '100%',
            aspectRatio: 1,
            backgroundColor: isDarkMode ? darkMode25 : 'white',
            justifyContent: 'center',
            alignItems: 'center',
        },
        productImage: {
            width: '90%',
            height: '90%',
            borderRadius: 4,
        },
        categoryName: {
            fontSize: 11,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? white : '#333',
            textAlign: 'center',
            paddingVertical: 8,
            paddingHorizontal: 4,
            minHeight: 45,
        },
    });

    const renderCategoryCard = ({ item }) => (
        <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => {
                navigation.navigate('CategoryProductsScreen', { categoryName: item.name });
            }}
        >
            <View style={styles.imagesGrid}>
                <Image
                    source={{ uri: item.images[0] }}
                    style={styles.productImage}
                    resizeMode="cover"
                />
            </View>
            <Text style={styles.categoryName} numberOfLines={2}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.bestSellersSection}>
            <SpaceBetweenRow>
                <Text style={styles.bestSellersTitle}>Shop By Category</Text>
                <TouchableOpacity
                        onPress={() => navigation.navigate('Tab', { screen: 'Fav' })}
                
                >
                    <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
            </SpaceBetweenRow>

            <FlatList
                data={bestSellers}
                renderItem={renderCategoryCard}
                keyExtractor={(item) => item.id.toString()}
                numColumns={4}
                contentContainerStyle={styles.flatListContainer}
                scrollEnabled={false}
                columnWrapperStyle={{
                    justifyContent: 'flex-start',
                }}
            />
        </View>
    );
};

export default RenderBestSellers;