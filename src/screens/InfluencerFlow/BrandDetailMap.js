import React, {useState} from 'react'
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {FONTS_FAMILY} from '../../assets/Fonts'
import {App_Primary_color, font_gray} from '../../common/Colors/colors'
import IMG from '../../assets/Images'
import CustomText from '../../components/TextComponent'

const BrandDetailMap = ({navigation}) => {
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Category')

  const categories = ['Category', 'Draft', 'Running']

  const foodItems = [
    {
      id: 1,
      title: 'JUNGLE MUNCH SAVE',
      subtitle: 'New Delight Hub',
      category: 'Food & Beverage',
      price: '$',
      image:
        'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop',
    },
    {
      id: 2,
      title: 'SIT DOWN TO FLAVOR',
      subtitle: 'Burger House',
      category: 'Food',
      price: '$',
      image:
        'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300&h=200&fit=crop',
    },
    {
      id: 3,
      title: 'HIGH FLAVOR SOLO MOMENTS',
      subtitle: 'Warm Oven Cake Desserts',
      category: 'Food & Beverage',
      price: '$',
      image:
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop',
    },
    {
      id: 4,
      title: 'GRAND WISH TEA AFTER NOON',
      subtitle: 'Indian The Dhaba',
      category: 'Food & Beverage',
      price: '$',
      image:
        'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=200&fit=crop',
    },
  ]

  const CategoryButton = ({title, isSelected, onPress}) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        isSelected && styles.selectedCategoryButton,
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.categoryText,
          isSelected && styles.selectedCategoryText,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  )

  const FoodCard = ({item, index}) => (
    <TouchableOpacity
      style={styles.foodCard}
        onPress={() => navigation.navigate('RestDetailScreen')}
    >
      <Image
        source={{uri: item.image}}
        style={styles.foodImage}
        // resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.foodTitle}>{item.subtitle}</Text>
        <Text style={styles.foodCategory}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={App_Primary_color} barStyle='light-content' />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon name='search' size={20} color='#fff' style={{bottom: 3}} />
          <TextInput
            style={{
              flex: 1,
              color: '#fff',
              marginLeft: 8,
              fontFamily: FONTS_FAMILY.Poppins_Regular,
            }}
            placeholder='Search your Resturants'
            placeholderTextColor={'#fff'}
          />
          <TouchableOpacity>
            <Icon name='ellipsis-vertical' size={20} color='#fff' />
          </TouchableOpacity>
        </View>
      </View>

      <ImageBackground source={IMG.Map} style={{flex: 1}} resizeMode='cover'>
        <View
          style={{
            height: 230,
            backgroundColor: 'white',

            width: '100%',
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: 15,
            gap: 14,
          }}>
          <CustomText
            style={{
              fontFamily: FONTS_FAMILY.Poppins_SemiBold,
              fontSize: 20,
            }}>
            426 Brands
          </CustomText>
          <ScrollView style={styles.contentContainer} horizontal>
            <View style={styles.gridContainer}>
              {foodItems.map((item, index) => (
                <View key={item.id} style={styles.gridItem}>
                  <FoodCard item={item} index={index} />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: App_Primary_color,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 30,
    paddingVertical: 12,
    gap: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF26',
    padding: 0,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  categoryContainer: {
    // backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 12,
  },
  sortButtonText: {
    fontSize: 14,
    color: '#000',
    marginRight: 4,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: '#E53E3E',
  },
  categoryText: {
    fontSize: 13,
    color: '#666',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  selectedCategoryText: {
    color: '#fff',
  },
  contentContainer: {
    // flex: 1,
    // paddingHorizontal: 20,
    // paddingTop: 16,
    // alignSelf: 'flex-end',
  },
  gridContainer: {
    flexDirection: 'row',
    gap: 16,
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
    // paddingBottom: 80,
  },
  gridItem: {
    // width: '48%',
    marginBottom: 16,
  },
  foodCard: {
    backgroundColor: 'white',
  },
  foodImage: {
    // width: '100%',
    height: 105,
    width: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // opacity: 0.7,
  },
  overlay: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    // padding: 12,
    backgroundColor: 'white',
  },
  foodTitle: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    textShadowOffset: {width: 1, height: 1},
  },
  foodSubtitle: {
    color: '#fff',
    fontSize: 11,
    marginBottom: 2,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  foodCategory: {
    color: 'black',
    fontSize: 9,
    opacity: 0.9,
    textShadowRadius: 2,
  },
  priceContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#E53E3E',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#E53E3E',
    width: 56,
    height: 56,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
})

export default BrandDetailMap
