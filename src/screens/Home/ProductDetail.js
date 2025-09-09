import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { BackIcon } from '../../assets/SVGs';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { App_Primary_color } from '../../common/Colors/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const SLIDER_WIDTH = screenWidth;
const ITEM_WIDTH = screenWidth;

const ProductDetail = ({navigation}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const carouselRef = useRef(null);

  // Sample images for the carousel
  const carouselItems = [
    { id: 1, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop' },
    { id: 2, image: 'https://images.unsplash.com/photo-1552127673-8bb5e9eff1b7?w=400&h=300&fit=crop' },
    { id: 3, image: 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=400&h=300&fit=crop' },
  ];

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item.image }} style={styles.carouselImage} />
    </View>
  );

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}
        onPress={()=>navigation.goBack()}
        >
       <BackIcon/>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Carousel Section */}
        <View style={styles.carouselContainer}>
          <Carousel
            ref={carouselRef}
            data={carouselItems}
            renderItem={renderCarouselItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            onSnapToItem={setActiveSlide}
            enableSnap={true}
            snapOnAndroid={true}
            removeClippedSubviews={false}
            
          />
          
          {/* Pagination dots */}
          <Pagination
            dotsLength={carouselItems.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.paginationDot}
            inactiveDotStyle={styles.paginationInactiveDot}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.8}
          />
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>Fresh Potato</Text>
          <Text style={styles.productPrice}>₹20.98</Text>
          
          <Text style={styles.productDescription}>
            Potatoes are a versatile root vegetable and a staple food in many households around the world. They are an underground tuber that grows on the roots of the potato plant, Solanum tuberosum. This plant is from the nightshade family and is related to tomatoes and tobacco. Potatoes were first domesticated in the Andes Mountains of South America, primarily in present-day Peru and Bolivia, around 8000 BCE.
          </Text>

          {/* Quantity Selector */}
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Choose Variant</Text>
            <View style={styles.quantitySelector}>

              
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.buyNowButton}
        onPress={()=>navigation.navigate('CartScreen')}
        >
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
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
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backArrow: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  carouselContainer: {
    // height: 300,
    marginTop: 40,
  },
  carouselItem: {
    width: ITEM_WIDTH,
    height: 250,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 19,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#F9B023',
  },
  paginationInactiveDot: {
    backgroundColor: '#C4C4C4',
  },
  productInfo: {
    padding: 20,
    // paddingTop: 30,
    borderTopRightRadius:30,
    borderTopLeftRadius:30
  },
  productTitle: {
    fontSize: 18,
   fontFamily:FONTS_FAMILY.Poppins_SemiBold,
    color: '#333',
    // marginBottom: 8,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    marginBottom: 24,
    fontFamily:FONTS_FAMILY.Poppins_Regular
  },
  quantityContainer: {
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityDisplay: {
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    minWidth: 50,
    alignItems: 'center',
  },
  quantityNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  bottomContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 30,
    gap: 12,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: App_Primary_color,
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: App_Primary_color,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: App_Primary_color,
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
  },
  buyNowText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default ProductDetail;