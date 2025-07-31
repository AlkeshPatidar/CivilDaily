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
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {FONTS_FAMILY} from '../../../assets/Fonts'
import {App_Primary_color} from '../../../common/Colors/colors'
import SpaceBetweenRow from '../../../components/wrapper/spacebetween'
import Row from '../../../components/wrapper/row'
import IMG from '../../../assets/Images'
import {Badge, Doller, Notification, SearchIcons} from '../../../assets/SVGs'
import CustomText from '../../../components/TextComponent'
import CustomButton from '../../../components/Button'

const InfluencerHome = ({navigation}) => {
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
      // onPress={() => navigation.navigate('BrandBokingList')}
      // onPress={() => navigation.navigate('RestaurantScreen')}
      onPress={() => navigation.navigate('BrandDetailMap')}


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

  const HorizontalSection = ({title, data}) => (
    <View style={styles.sectionContainer}>
      <SpaceBetweenRow style={styles.sectionHeader}>
        <CustomText style={styles.sectionTitle}>
          {title}
        </CustomText>
        <CustomText style={styles.seeAllText}>
          See All {">"}
        </CustomText>
      </SpaceBetweenRow>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContainer}>
        {data.map((item, index) => (
          <View key={item.id} style={styles.horizontalCardItem}>
            <FoodCard item={item} index={index} />
          </View>
        ))}
      </ScrollView>
    </View>
  )

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={App_Primary_color} barStyle='light-content' />

      <View style={styles.header}>
        <SpaceBetweenRow>
          <Row
            style={{
              gap: 20,
            }}>
              <TouchableOpacity onPress={()=>navigation.navigate('ProfileScreen')}>
            <Image
              source={IMG.userProfileImage}
              style={{height: 30, width: 30}}
            />

              </TouchableOpacity>
            <Row
              style={{
                gap: 8,
                backgroundColor: '#FFFFFF26',
                padding: 6,
                borderRadius: 20,
              }}>
              <Doller />
              <CustomText
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontFamily: FONTS_FAMILY.Poppins_Medium,
                }}>
                500k coins
              </CustomText>
            </Row>
          </Row>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Notification />
          </TouchableOpacity>
        </SpaceBetweenRow>

        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 20,
            position: 'absolute',
            alignSelf: 'center',
            width: '100%',
            bottom: -100,
            zIndex: 100,
          }}>
          <Row
            style={{
              borderWidth: 1,
              borderColor: '#D1D5DB',
              paddingHorizontal: 5,
              borderRadius: 8,
            }}>
            <SearchIcons />
            <TextInput
              placeholderTextColor={'gray'}
              placeholder='Place, location or billboard name'
              style={{
                fontSize: 14,
                fontFamily: FONTS_FAMILY.Poppins_Regular,
                flex: 1,
              }}
            />
          </Row>
          <CustomButton
            title={'Search Campaign'}
            style={{
              marginTop: 16,
            }}
          />
        </View>
      </View>

      {/* Content with Horizontal Scrolling Sections */}
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        
        <HorizontalSection title="Latest Brand" data={foodItems} />
        <HorizontalSection title="Hottest Offer" data={foodItems} />
        <HorizontalSection title="Fast Favorite" data={foodItems} />

      </ScrollView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: App_Primary_color,
    paddingHorizontal: 16,
    marginTop: 30,
    paddingVertical: 18,
    gap: 10,
    height: 150,
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
    flex: 1,
    paddingTop: 130,
  },
  // New styles for horizontal scrolling
  sectionContainer: {
    marginBottom: 30,
  },
  sectionHeader: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    color: '#3D0066',
  },
  horizontalScrollContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  horizontalCardItem: {
    width: 180,
    marginRight: 16,
  },
  // Updated card styles for horizontal layout
  foodCard: {
    height: 240,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'white',
    width: '100%',
  },
  foodImage: {
    height: 180,
    width: '100%',
  },
  overlay: {
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
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
    color: '#3D0066',
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

export default InfluencerHome