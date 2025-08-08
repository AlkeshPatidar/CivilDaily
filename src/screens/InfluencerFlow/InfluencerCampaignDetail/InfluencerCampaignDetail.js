import React, {useEffect, useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native'
import {BackArrow, EditIcon, ThreeDots} from '../../../assets/SVGs'
import {FONTS_FAMILY} from '../../../assets/Fonts'
import useLoader from '../../../utils/LoaderHook'
import urls from '../../../config/urls'
import {apiGet, apiPost} from '../../../utils/Apis'
import {ToastMsg} from '../../../utils/helperFunctions'
import PaidInputModel from '../../Restaurent/PaidInputCostModel'
import CalendarModal from '../InfluencerOfferDetail/CalendarModel'
import CampaignTypeModal from '../InfluencerOfferDetail/ChooseOptionmodel'
import ConfirmationCampaignModel from '../InfluencerOfferDetail/ConfirmationCampaignModel'

const InfluencerCampaignDetail = ({navigation, route}) => {
 
  const [getABrand, setGetABrand] = useState(null)
  const [allOffers, setAllOffers] = useState([])
  const {showLoader, hideLoader} = useLoader()

  useEffect(() => {
    getABrands()
    getAllOffersOfACampaign()
  }, [])

  const getABrands = async () => {
    try {
      showLoader()
      const res = await apiGet(`${urls?.getAbrand}/${route?.params?.brandId}`)
      setGetABrand(res?.data)
      hideLoader()
    } catch (error) {
      console.log('Error')
      hideLoader()
    }
  }

  const getAllOffersOfACampaign = async () => {
    try {
      showLoader()
      const res = await apiGet(
        `${urls?.getAllOffersOfACampaignInfluncer}/${route?.params?.campaignId}`,
      )
      setAllOffers(res?.data)
      console.log('AllCampaings Offer::::::::', res?.data)

      hideLoader()
    } catch (error) {
      console.log('Error')
      hideLoader()
    }
  }

  const OfferCard = ({offer}) => (
    <TouchableOpacity
      style={styles.offerCard}
      onPress={() => navigation.navigate('InfluencerOfferDetail',{id:offer?._id})}
      >
      <View style={styles.offerImageContainer}>
        <Image source={{uri: offer.Image}} style={styles.offerImage} />
      </View>
      <View style={styles.offerContent}>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateDot} />
          <Text style={styles.dateText}>{offer.StartDate}</Text>
          <Text style={styles.timeText}>{offer.EndDate}</Text>
        </View>
        <Text style={styles.offerTitle}>{offer.Title}</Text>
        <Text style={styles.offerCategory}>
          Average Impressions:{offer.AverageDailyImpressions}
        </Text>
        <Text style={styles.offerLocation}>
          Duration Min:{offer.AdDurationMinutes}
        </Text>
      </View>
    </TouchableOpacity>
  )

  const EmptyOffersComponent = () => (
    <View style={styles.emptyOffersContainer}>
      <View style={styles.emptyIconContainer}>
        <Text style={styles.emptyIcon}>🎯</Text>
      </View>
      <Text style={styles.emptyTitle}>No Offers Available</Text>
      <Text style={styles.emptyDescription}>
        This campaign currently has no offers available. Check back later for new opportunities.
      </Text>
      <TouchableOpacity 
        style={styles.refreshButton}
        onPress={getAllOffersOfACampaign}
      >
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  )

  const renderOfferCard = ({item, index}) => (
    <OfferCard offer={item} />
  )

  const keyExtractor = (item, index) => {
    return item?._id?.toString() || item?.id?.toString() || index.toString()
  }

  const ListHeaderComponent = () => (
    <View style={styles.offersSectionHeader}>
      <Text style={styles.offersTitle}>Offers</Text>
      <TouchableOpacity>
        {/* <Text style={styles.seeAllText}>See All ›</Text> */}
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#D64A3A' barStyle='light-content' />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        {/* <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('MessageScreen')}>
            <EditIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreButton}>
            <ThreeDots />
          </TouchableOpacity>
        </View> */}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 8,
            borderRadius: 8,
            margin: 0,
          }}>
          <ImageBackground
            source={{
              uri: getABrand?.Image
                ? getABrand?.Image
                : 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop',
            }} 
            style={styles.heroSection}
            imageStyle={styles.heroImageStyle}>
            <View style={styles.heroOverlay}>
              <Text style={styles.heroText}>
                {getABrand?.BrandName}
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{getABrand?.BrandName}</Text>
            <Text style={styles.restaurantCategory}>Food & Beverage</Text>
          </View>
        </View>

        {/* Offers Section with FlatList */}
        <View style={styles.offersSection}>
          <FlatList
            data={allOffers}
            renderItem={renderOfferCard}
            keyExtractor={keyExtractor}
            ListHeaderComponent={ListHeaderComponent}
            ListEmptyComponent={EmptyOffersComponent}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false} // Disable scroll since we're inside ScrollView
            contentContainerStyle={styles.flatListContainer}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D64A3A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 64,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '300',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  editButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
  },
  moreButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButtonText: {
    color: 'white',
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  heroSection: {
    height: 200,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  heroImageStyle: {
    borderRadius: 12,
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'absolute',
  },
  playButtonText: {
    color: '#333',
    fontSize: 16,
    marginLeft: 2,
  },
  heroText: {
    color: 'white',
    fontSize: 40,
    fontFamily: FONTS_FAMILY.Comfortaa_Bold,
    textAlign: 'center',
    lineHeight: 50,
    letterSpacing: 2,
  },
  restaurantInfo: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  restaurantName: {
    fontSize: 16,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    color: '#333',
  },
  restaurantCategory: {
    fontSize: 14,
    color: '#3D0066',
  },
  offersSection: {
    paddingHorizontal: 16,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  itemSeparator: {
    height: 12,
  },
  offersSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 18,
  },
  offersTitle: {
    fontSize: 16,
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    color: '#333',
  },
  seeAllText: {
    fontSize: 12,
    color: '#8B5CF6',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  // Empty state styles
  emptyOffersContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyIcon: {
    fontSize: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  refreshButton: {
    backgroundColor: '#D64A3A',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  // Existing offer card styles
  offerCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  offerImageContainer: {
    position: 'relative',
  },
  offerImage: {
    width: 95,
    height: 108,
    borderRadius: 12,
    padding: 6,
  },
  discountBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  offerContent: {
    flex: 1,
    padding: 12,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  dateDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C527D9',
    marginRight: 8,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  offerTitle: {
    fontSize: 14,
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    color: '#333',
    marginBottom: 4,
  },
  offerCategory: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
    marginBottom: 2,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  offerLocation: {
    fontSize: 12,
    color: '#666',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  requestSpotButton: {
    backgroundColor: '#D64A3A',
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestSpotButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#000',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 8,
  },
})

export default InfluencerCampaignDetail