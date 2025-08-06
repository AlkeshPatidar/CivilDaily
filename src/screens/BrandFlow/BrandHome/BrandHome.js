import React, {useEffect, useState} from 'react'
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
import { apiGet } from '../../../utils/Apis'
import urls from '../../../config/urls'
import useLoader from '../../../utils/LoaderHook'

const BrandHome = ({navigation}) => {
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Current Campaign')

  const categories = ['Current Campaign', 'Future Campaign', 'Past Campaign']

   const [myCampaigns, setMyCampaigns] = useState([])

  const{showLoader, hideLoader}=useLoader()


  useEffect(() => {
    getAllMyCampaigns()
  }, [])

  const getAllMyCampaigns = async () => {
    try {
      showLoader()
      const res = await apiGet(urls?.brandsGetAllMyCampaigns)
      setMyCampaigns(res?.data)
      hideLoader()
    } catch (error) {
      console.log('Error')
      hideLoader()

    }
  }

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

  const CampaignCard = ({item, index}) => (
    <TouchableOpacity
      style={styles.campaignCard}
      onPress={() => navigation.navigate('BrandBokingList')}>
      
      {/* Card Image */}
      <View style={styles.cardImageContainer}>
        <Image
          source={{uri: item.Assets}}
          style={styles.cardImage}
          // resizeMode="contain"
        />
        <View style={styles.cardOverlay}>
          <Text style={styles.cardTitle}>RED AND WHITE</Text>
          <Text style={styles.cardSubtitle}>BITE AFTER BITE</Text>
        </View>
      </View>

      {/* Card Content */}
      <View style={styles.cardContent}>
        <Text style={styles.hubName}>{item?.Title}</Text>
        <Text style={styles.categoryName}>{item?.Category}</Text>
        
        <Text style={styles.description}>
          Nulla integer rutrum quam feugiat aliquet hac. Ut purus elit et massa eget ornare
        </Text>

        <SpaceBetweenRow style={styles.cardFooter}>
          <View>
            <Text style={styles.attendeesText}>Attendees</Text>
          </View>
          <View style={styles.attendeesContainer}>
            <View style={styles.avatarContainer}>
              {/* <View style={[styles.avatar, {backgroundColor: '#FF6B6B'}]} />
              <View style={[styles.avatar, {backgroundColor: '#4ECDC4', marginLeft: -8}]} /> */}
              <Image
              source={IMG.AvatorImage}
              style={{
                height:22,
                width:22
              }}
              />
            </View>
            <Text style={styles.attendeesCount}>12</Text>
          </View>
        </SpaceBetweenRow>

        {/* Status Badge */}
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, {backgroundColor: '#00CD52'}]}>
            <Text style={styles.statusText}>{item?.Status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <>
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={App_Primary_color} barStyle='light-content' />

      <View style={styles.header}>
        <SpaceBetweenRow>
          <Row
            style={{
              gap: 20,
            }}>
            <Image
              source={IMG.userProfileImage}
              style={{height: 30, width: 30}}
            />
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
        <SpaceBetweenRow>
          <Image
            source={IMG.Statistic}
            style={{
              height: 132,
              width: '100%',
            }}
            resizeMode='stretch'
          />
        </SpaceBetweenRow>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 20,
            position: 'absolute',
            alignSelf: 'center',
            width: '100%',
            bottom: -110,
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

      {/* Content Container */}
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        
        {/* Filter Buttons */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}>
          {categories.map((category) => (
            <CategoryButton
              key={category}
              title={category}
              isSelected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
            />
          ))}
        </ScrollView>

        {/* Section Header */}
        <SpaceBetweenRow style={styles.sectionHeader}>
          <CustomText style={styles.sectionTitle}>
            {selectedCategory}
          </CustomText>
          <TouchableOpacity>
            <CustomText style={styles.seeAllText}>
              See All <Text>{">"}</Text>
            </CustomText>
          </TouchableOpacity>
        </SpaceBetweenRow>

        {/* Campaign Cards */}
        <View style={styles.cardsContainer}>
          {myCampaigns.map((item, index) => (
            <CampaignCard key={item.id || index} item={item} index={index} />
          ))}
        </View>
        
        {/* Extra padding at bottom */}
        <View style={{height: 100}} />
        
      </ScrollView>
        
    </ScrollView>
    
    {/* Floating Action Button */}
    <TouchableOpacity 
      style={styles.floatingButton}
      onPress={()=>navigation.navigate('CreateCampaign')}>
      <Icon name="add" size={24} color="#fff" />
    </TouchableOpacity>
    </>
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
    paddingVertical: 18,
    gap: 10,
    height: 250,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 130,
  },
  
  // Filter Buttons
  filterContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 12,
    borderWidth: 1,
    borderColor: App_Primary_color,
  },
  selectedCategoryButton: {
    backgroundColor: '#E53E3E',
    borderColor: '#E53E3E',
  },
  categoryText: {
    fontSize: 12,
    color: App_Primary_color,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  selectedCategoryText: {
    color: '#fff',
  },

  // Section Header
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    color: '#1F2937',
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    color: '#3D0066',
  },

  // Cards Container
  cardsContainer: {
    gap: 16,
  },

  // Campaign Card Styles
  campaignCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },

  // Card Image
  cardImageContainer: {
    height: 180,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '90%',
  },
  cardOverlay: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // backgroundColor: 'rgba(218, 165, 32, 0.8)', // Golden overlay
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontFamily: FONTS_FAMILY.Poppins_Bold,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontFamily: FONTS_FAMILY.Poppins_Bold,
  },

  // Card Content
  cardContent: {
    padding: 16,
    position: 'relative',
  },
  hubName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    marginBottom: 12,
  },
  description: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    marginBottom: 16,
  },

  // Card Footer
  cardFooter: {
    alignItems: 'center',
    backgroundColor:'#D43C3114',
    paddingHorizontal:8,
    borderRadius:20,
    paddingVertical:5


  },
  attendeesText: {
    fontSize: 14,
    color: 'black',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,

  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  attendeesCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
  },

  // Status Badge
  statusContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 18,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
  },

  // Floating Button
  floatingButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#E53E3E',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
})

export default BrandHome