import React, {useEffect, useState} from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {FONTS_FAMILY} from '../../assets/Fonts'
import color, {App_Primary_color} from '../../common/Colors/colors'
import CustomText from '../../components/TextComponent'
import useLoader from '../../utils/LoaderHook'
import {apiGet} from '../../utils/Apis'
import urls from '../../config/urls'

const InfluencersScreen = ({navigation}) => {
  const [allInfluencers, setAllInfluencers] = useState([])
  const [activeTab, setActiveTab] = useState('All')
  const {showLoader, hideLoader} = useLoader()

  useEffect(() => {
    getAllInfluencers()
  }, [])

  const getAllInfluencers = async () => {
    try {
      showLoader()
      const res = await apiGet(urls?.getAllInfluencers)
      setAllInfluencers(res?.data)
      hideLoader()
    } catch (error) {
      console.log('Error')
      hideLoader()
    }
  }

  const tabs = ['All', 'Active', 'Completed']

  const TabButton = ({title, isActive, onPress}) => (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTabButton]}
      onPress={onPress}>
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>
        {title}
      </Text>
    </TouchableOpacity>
  )

  const FilterDropdown = ({title}) => (
    <TouchableOpacity style={styles.filterDropdown}>
      <Text style={styles.filterText}>{title}</Text>
      <Icon name="chevron-down" size={16} color="#333" />
    </TouchableOpacity>
  )

  const InfluencerCard = ({item}) => (
    <TouchableOpacity style={styles.influencerCard}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: item.Image
              ? item.Image
              : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face',
          }}
          style={styles.profileImage}
        />
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.influencerName} numberOfLines={1}>
          {item.FirstName}
          {item?.LastName}
        </Text>
        <Text style={styles.influencerCategory} numberOfLines={2}>
          {item.NicheInput}
        </Text>
        <View
          style={{
            backgroundColor: '#00CD52',
            padding: 4,
            borderRadius: 19,
            paddingHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomText
            style={{
              fontFamily: FONTS_FAMILY.Poppins_Regular,
              color: 'white',
              fontSize: 10
            }}>
            ACTIVE
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name='chevron-back' size={24} color='#fff' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Influencers</Text>
      </View>

      {/* Tabs Section */}
      <View style={styles.tabsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScrollContainer}>
          {tabs.map((tab) => (
            <TabButton
              key={tab}
              title={tab}
              isActive={activeTab === tab}
              onPress={() => setActiveTab(tab)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Filters Section */}
      <View style={styles.filtersContainer}>
        <FilterDropdown title="Date" />
        <FilterDropdown title="Campaign" />
      </View>

      {/* Influencers Grid */}
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.gridContainer}>
          {allInfluencers.map(item => (
            <View key={item.id} style={styles.gridItem}>
              <InfluencerCard item={item} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: App_Primary_color,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
    paddingTop: 40,
    gap: 90,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  // Tabs Styles
  tabsContainer: {
    backgroundColor: App_Primary_color,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  tabsScrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeTabButton: {
    backgroundColor: '#fff',
  },
  tabText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  activeTabText: {
    color: 'black',
  },
  // Filters Styles
  filtersContainer: {
    // backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    // borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  gridItem: {
    width: '48%',
    marginBottom: 16,
  },
  influencerCard: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  cardContent: {
    alignItems: 'center',
    width: '100%',
  },
  influencerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  influencerCategory: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
    marginRight: 2,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  reviewsText: {
    fontSize: 12,
    color: '#666',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
})

export default InfluencersScreen