import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { App_Primary_color } from '../../common/Colors/colors';
import { FONTS_FAMILY } from '../../assets/Fonts';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [favorites, setFavorites] = useState({});

  const recentSearches = [
    'Great Knight',
    'Tide Gell',
    'Sunflower Oil',
    'Deleted Liquid',
    'ModiFied Bugar',
    'Armd Ghuss'
  ];

  const trendingProducts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=200&h=200&fit=crop',
      name: 'Surf Excel Long Wash Detergent Flower',
      price: 12,
      originalPrice: 14
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop',
      name: 'Fortune Active Dol (1ooz Dal)',
      price: 10,
      originalPrice: 12
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=200&h=200&fit=crop',
      name: 'Surf Excel Detergent',
      price: 15,
      originalPrice: 18
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop',
      name: 'Premium Dal Pack',
      price: 8,
      originalPrice: 10
    }
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header with Search Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        
        <View style={styles.searchBar}>
          <Icon name="search-outline" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Recent Search */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Search</Text>
          <View style={styles.chipsContainer}>
            {recentSearches.map((search, index) => (
              <TouchableOpacity
                key={index}
                style={styles.chip}
              >
                <Text style={styles.chipText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Trending Now */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <View style={styles.productsGrid}>
            {trendingProducts.map((product) => (
              <View key={product.id} style={styles.productCard}>
                {/* Product Image */}
                <View style={styles.imageContainer}>
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => toggleFavorite(product.id)}
                  >
                    <Icon
                      name={favorites[product.id] ? 'heart' : 'heart-outline'}
                      size={20}
                      color={favorites[product.id] ? '#ef4444' : '#999'}
                    />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: product.image }}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                </View>

                {/* Product Info */}
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  
                  <View style={styles.priceContainer}>
                    <View style={styles.priceRow}>
                      <Text style={styles.price}>${product.price}</Text>
                      <Text style={styles.originalPrice}>${product.originalPrice}</Text>
                    </View>
                    <TouchableOpacity style={styles.addButton}>
                      <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 12,
    // paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: '#000',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
   fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    color: '#000',
    marginBottom: 12,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 12,
    color: '#333',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    overflow: 'hidden',
  },
  imageContainer: {
    backgroundColor: '#fafafa',

    padding: 12,
    position: 'relative',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 13,
   fontFamily: FONTS_FAMILY.Poppins_Medium,
    color: '#333',
    // marginBottom: 8,
    minHeight: 36,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  originalPrice: {
    fontSize: 13,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  addButton: {
    backgroundColor:App_Primary_color,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default SearchScreen;