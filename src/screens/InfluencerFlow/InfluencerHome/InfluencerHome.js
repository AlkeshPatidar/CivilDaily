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
  FlatList,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {FONTS_FAMILY} from '../../../assets/Fonts'
import {App_Primary_color} from '../../../common/Colors/colors'
import SpaceBetweenRow from '../../../components/wrapper/spacebetween'
import Row from '../../../components/wrapper/row'
import IMG from '../../../assets/Images'
import {
  Anytime,
  Badge,
  Doller,
  Events,
  Gifts,
  Invites,
  Notification,
  SearchIcons,
} from '../../../assets/SVGs'
import CustomText from '../../../components/TextComponent'
import CustomButton from '../../../components/Button'
import {useLoginCheck} from '../../../utils/Context'
import {apiGet} from '../../../utils/Apis'
import urls from '../../../config/urls'
import useLoader from '../../../utils/LoaderHook'
import {useSelector} from 'react-redux'

const InfluencerHome = ({navigation}) => {
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Anytime')
  const [selectedSortBy, setSelectedSortBy] = useState('Sort By')
  const [selectedFilter, setSelectedFilter] = useState('Category')
  const [selectedInvite, setSelectedInvite] = useState('Anytime')
  const [invite, setInvite] = useState('Invite')

  const [latestBrand, setLatestBrand] = useState([])
  const [Hottestoffers, setHottestOffers] = useState([])
  const [fatsFav, setFastFav] = useState([])

  let selector = useSelector(state => state?.user?.userData)
  if (Object.keys(selector).length != 0) {
    selector = JSON.parse(selector)
  }

  const {showLoader, hideLoader} = useLoader()

  const {loggedInby, setloggedInby} = useLoginCheck()
  // console.log("loggedInby:::::::::::");

  useEffect(() => {
    getLatestBrands()
    getHottestOffers()
    getFastFavourite()
  }, [])

  const getLatestBrands = async () => {
    try {
      showLoader()
      const res = await apiGet(urls?.LatestBrand)
      setLatestBrand(res?.data)
      hideLoader()
    } catch (error) {
      console.log('Error')
      hideLoader()
    }
  }

  const getHottestOffers = async () => {
    try {
      showLoader()
      const res = await apiGet(urls?.HottestCamp)
      setHottestOffers(res?.data)
      console.log('Offfers::::::::', res?.data)

      hideLoader()
    } catch (error) {
      console.log('Error')
      hideLoader()
    }
  }

  const getFastFavourite = async () => {
    try {
      showLoader()
      const res = await apiGet(urls?.fastFavourite)
      setFastFav(res?.data)
      console.log('Offfers::::::::', res?.data)

      hideLoader()
    } catch (error) {
      console.log('Error')
      hideLoader()
    }
  }

  const categories = [
    {title: 'Anytime', icon: <Anytime />},
    {title: 'Events', icon: <Events />},
    {title: 'Invites', icon: <Invites />},
    {title: 'Gifts', icon: <Gifts />},
  ]

  const FilterButton = ({title, isSelected, onPress, hasDropdown = true}) => (
    <TouchableOpacity
      style={[styles.filterButton, isSelected && styles.selectedFilterButton]}
      onPress={onPress}>
      <Text
        style={[styles.filterText, isSelected && styles.selectedFilterText]}>
        {title}
      </Text>
      {hasDropdown && (
        <Icon
          name='chevron-down'
          size={16}
          color={isSelected ? '#fff' : '#666'}
          style={styles.dropdownIcon}
        />
      )}
    </TouchableOpacity>
  )

  const CategoryButton = ({title, isSelected, onPress}) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        isSelected && styles.selectedCategoryButton,
      ]}
      onPress={onPress}>
      {title.icon}
      <Text
        style={[
          styles.categoryText,
          isSelected && styles.selectedCategoryText,
        ]}>
        {title?.title}
      </Text>
    </TouchableOpacity>
  )

  const renderLatestBrand = () => (
    <View style={styles.sectionContainer}>
      <SpaceBetweenRow style={styles.sectionHeader}>
        <CustomText style={styles.sectionTitle}>Latest Brand</CustomText>
        <CustomText style={styles.seeAllText}>See All {'>'}</CustomText>
      </SpaceBetweenRow>
      <FlatList
        data={latestBrand}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContainer}
        renderItem={({item, index}) => (
          <View style={styles.horizontalCardItem}>
            <TouchableOpacity
              style={styles.brandCard}
              onPress={() =>
                navigation.navigate('InfluencerCapaignListOfaBrand', {
                  id: item?._id,
                })
              }>
              <Image
                source={{
                  uri: item?.Image
                    ? item?.Image
                    : 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop',
                }}
                style={styles.brandImage}
              />
              <View style={styles.brandOverlay}>
                <Text style={styles.brandTitle}>
                  {item?.BrandName || 'Brand Name'}
                </Text>
                <Text style={styles.brandCategory}>
                  {item?.category || 'Category'}
                </Text>
                <View style={styles.brandBadge}>
                  <Text style={styles.brandBadgeText}>NEW</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => `latest-brand-${item.id || index}`}
      />
    </View>
  )

  const renderHottestOffer = () => (
    <View style={styles.sectionContainer}>
      <SpaceBetweenRow style={styles.sectionHeader}>
        <CustomText style={styles.sectionTitle}>Hottest Campaign</CustomText>
        <CustomText style={styles.seeAllText}>See All {'>'}</CustomText>
      </SpaceBetweenRow>
      <FlatList
        data={Hottestoffers}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContainer}
        renderItem={({item, index}) => (
          <View style={styles.horizontalCardItem}>
            <TouchableOpacity
              style={styles.offerCard}
              onPress={() =>
                navigation.navigate('InfluencerCapaignListOfaBrand', {
                  id: item?._id,
                })
              }>
              <Image
                source={{
                  uri: item?.Assets
                    ? item?.Assets
                    : 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop',
                }}
                style={styles.offerImage}
              />
              <View style={styles.offerOverlay}>
                <Text style={styles.offerTitle}>{item?.Title}</Text>
                <Text style={styles.offerSubtitle}>{item?.Category}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => `hottest-offer-${item.id || index}`}
      />
    </View>
  )

  const renderFastFavourite = () => (
    <View style={styles.sectionContainer}>
      <SpaceBetweenRow style={styles.sectionHeader}>
        <CustomText style={styles.sectionTitle}>Fast Favorite</CustomText>
        <CustomText style={styles.seeAllText}>See All {'>'}</CustomText>
      </SpaceBetweenRow>
      <FlatList
        data={fatsFav}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContainer}
        renderItem={({item, index}) => (
          <View style={styles.horizontalCardItem}>
            <TouchableOpacity
              style={styles.offerCard}
              // onPress={() =>
              //   navigation.navigate('InfluencerCapaignListOfaBrand', {id: item?._id})
              // }
              onPress={() =>
                navigation.navigate('InfluencerCampaignDetail', {
                  brandId: item?.Brand,
                  campaignId: item?._id,
                })
              }>
              {/* {console.log('Offer Item:', item)
                } */}
              <Image
                source={{
                  uri: item?.Assets
                    ? item?.Assets
                    : 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop',
                }}
                style={styles.offerImage}
              />

              <View style={styles.offerOverlay}>
                <Text style={styles.offerTitle}>{item?.Title || 'Null'}</Text>
                <Text style={styles.offerSubtitle}>
                  {item?.Category || 'Null'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => `fast-favourite-${item._id || index}`}
      />
    </View>
  )

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.container}>
        <StatusBar
          backgroundColor={App_Primary_color}
          barStyle='light-content'
          translucent={false}
        />

        <View style={styles.header}>
          <SpaceBetweenRow>
            <Row style={styles.headerLeftRow}>
              <TouchableOpacity
                // onPress={() => navigation.navigate('ProfileScreen')}
                  onPress={() =>
                  navigation.navigate('InfluenceTab', {
                    screen: 'Profile',
                  })
                }
                >
                <Image
                  // source={IMG.userProfileImage}
              source={selector?.Image?{uri:selector?.Image}:IMG.userProfileImage}

                  style={styles.profileImage}
                />
              </TouchableOpacity>
              <Row style={styles.coinsContainer}>
                <Doller />
                <CustomText style={styles.coinsText}>
                  {selector?.Credits} coins
                </CustomText>
              </Row>
            </Row>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}>
              <Notification />
              <View style={{
                height:8,
                width:8,
                backgroundColor:'white',
                borderRadius:100,
                position:'absolute',
                right:3,
                top:3

              }}/>
            </TouchableOpacity>
          </SpaceBetweenRow>

          <View style={styles.searchContainer}>
            <Row style={styles.searchInputContainer}>
              <SearchIcons />
              <TextInput
                placeholderTextColor={'gray'}
                placeholder='Place, location or billboard name'
                style={styles.searchInput}
              />
            </Row>
            <CustomButton
              title={'Search Campaign'}
              style={styles.searchButton}
            />
          </View>
        </View>

        {/* Filter Section */}
        <View style={styles.filterSection}>
          {/* Top Row - Category Buttons */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScrollContainer}
            style={styles.categoryRow}>
            {categories.map(category => (
              <CategoryButton
                key={category}
                title={category}
                isSelected={selectedCategory === category?.title}
                onPress={() => setSelectedCategory(category.title)}
              />
            ))}
          </ScrollView>

          {/* Bottom Row - Filter Buttons */}
          {/* <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContainer}
            style={styles.filterRow}>
            <Row style={styles.filterContainer}>
              <TouchableOpacity style={styles.filterIconButton}>
                <Icon name='options' size={20} color='#666' />
              </TouchableOpacity>

              <FilterButton
                title={selectedSortBy}
                isSelected={selectedSortBy !== 'Sort By'}
                onPress={() => {
                  console.log('Sort By pressed')
                }}
              />

              <FilterButton
                title={selectedFilter}
                isSelected={selectedFilter !== 'Category'}
                onPress={() => {
                  console.log('Category filter pressed')
                }}
              />

              <FilterButton
                title={selectedInvite}
                isSelected={selectedInvite !== 'Anytime'}
                onPress={() => {
                  console.log('Invite filter pressed')
                }}
              />

              <FilterButton
                title={invite}
                isSelected={invite !== 'Invite'}
                onPress={() => {
                  console.log('Invite filter pressed')
                }}
              />
            </Row>
          </ScrollView> */}
        </View>

        {/* Content with Horizontal Scrolling Sections */}
        <ScrollView
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          {renderLatestBrand()}
          {renderHottestOffer()}
          {renderFastFavourite()}
          <View style={{height: 100}} />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: App_Primary_color,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: App_Primary_color,
    paddingHorizontal: 16,
    paddingVertical: 18,
    gap: 10,
    height: 150,
  },
  headerLeftRow: {
    gap: 20,
  },
  profileImage: {
    height: 30,
    width: 30,
    borderRadius:100
  },
  coinsContainer: {
    gap: 8,
    backgroundColor: '#FFFFFF26',
    padding: 6,
    borderRadius: 20,
  },
  coinsText: {
    color: 'white',
    fontSize: 16,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  searchContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    position: 'absolute',
    alignSelf: 'center',
    width: '100%',
    bottom: -100,
    zIndex: 100,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.05)',
    marginBottom: 5,
  },
  searchInputContainer: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 5,
    borderRadius: 8,
  },
  searchInput: {
    fontSize: 14,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    flex: 1,
    color: 'black',
  },
  searchButton: {
    marginTop: 16,
  },
  // New Filter Section Styles
  filterSection: {
    // backgroundColor: '#f5f5f5',
    paddingTop: 110,
    paddingBottom: 10,
  },
  categoryRow: {
    marginBottom: 12,
  },
  categoryScrollContainer: {
    paddingHorizontal: 16,
  },
  filterRow: {
    marginBottom: 0,
  },
  filterScrollContainer: {
    paddingHorizontal: 16,
  },
  filterContainer: {
    alignItems: 'center',
    gap: 8,
  },
  filterIconButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: '#D43C312E',
  },
  selectedFilterButton: {
    backgroundColor: App_Primary_color,
  },
  filterText: {
    fontSize: 14,
    color: 'black',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  selectedFilterText: {
    color: '#fff',
  },
  dropdownIcon: {
    marginLeft: 4,
  },
  inviteButton: {
    backgroundColor: '#E53E3E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  inviteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  categoryButton: {
    backgroundColor: 'white',
    padding: 18,
    // paddingVertical: 8,
    borderRadius: 11,
    marginRight: 15,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.05)',
    marginBottom: 5,
  },
  selectedCategoryButton: {
    // backgroundColor: '#E53E3E',
    borderWidth: 1,
    borderColor: App_Primary_color,
  },
  categoryText: {
    fontSize: 14,
    color: 'black',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
    marginTop: 10,
  },
  selectedCategoryText: {
    color: 'black',
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
  contentContainer: {
    flex: 1,
    paddingTop: 10,
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
    // width: 180,
    marginRight: 16,
  },
  // Brand Card Styles
  brandCard: {
    height: 191,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
    width: 240,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.05)',
    marginBottom: 5,
  },
  brandImage: {
    height: 120,
    width: '99%',
    // padding:20,
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  brandOverlay: {
    bottom: 0,
    left: 5,
    right: 0,
    // padding: 12,
    backgroundColor: 'white',
    position: 'relative',
  },
  brandTitle: {
    color: 'black',
    fontSize: 14,
    marginBottom: 3,
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    marginTop: 4,
  },
  brandCategory: {
    color: '#3D0066',
    fontSize: 12,
    // marginBottom: 8,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  brandBadge: {
    position: 'absolute',
    top: -50,
    right: 8,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  brandBadgeText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
  },

  // Offer Card Styles
  offerCard: {
    height: 191,
    borderRadius: 8,
    overflow: 'hidden',
    // position: 'relative',
    backgroundColor: 'white',
    width: 240,
    elevation: 2,
    shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.05)',
    marginBottom: 5,
  },
  offerImage: {
    height: 120,
    width: '99%',
    // padding:20,
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  offerOverlay: {
    bottom: 0,
    left: 5,
    right: 0,
    // padding: 12,
    backgroundColor: 'white',
    flex: 1,
  },
  offerTitle: {
    color: 'black',
    fontSize: 14,
    marginBottom: 3,
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    marginTop: 4,
  },
  offerSubtitle: {
    color: '#3D0066',
    fontSize: 12,
    // marginBottom: 8,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  offerPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  offerPrice: {
    color: '#E53E3E',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: FONTS_FAMILY.Poppins_Bold,
  },
  offerOriginalPrice: {
    color: '#999',
    fontSize: 11,
    textDecorationLine: 'line-through',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  offerDiscountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  offerDiscountText: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
    fontFamily: FONTS_FAMILY.Poppins_Bold,
  },

  // Favorite Card Styles
  favoriteCard: {
    height: 240,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'white',
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  favoriteImage: {
    height: 150,
    width: '100%',
  },
  favoriteOverlay: {
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'white',
    flex: 1,
  },
  favoriteTitle: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
  },
  favoriteSubtitle: {
    color: '#666',
    fontSize: 10,
    marginBottom: 8,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  favoriteRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  favoriteRating: {
    color: '#666',
    fontSize: 10,
    marginLeft: 4,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  favoritePrice: {
    color: '#E53E3E',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: FONTS_FAMILY.Poppins_Bold,
  },
  favoriteHeartContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
