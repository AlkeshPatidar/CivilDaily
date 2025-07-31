import React, {useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import {BackArrow, Clock, EditIcon, EyeIcons, Location, ThreeDots} from '../../assets/SVGs'
import {FONTS_FAMILY} from '../../assets/Fonts'
import CampaignTypeModal from './ChooseOptionmodel'
import CalendarModal from './CalendarModel'

const OfferDetail = ({navigation}) => {
  const [isCampModalVisible, setIsCampModalVisible] = useState(false)
  const [selectedCampaignType, setSelectedCampaignType] = useState('')
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false)
  const [selectedDateTime, setSelectedDateTime] = useState(null)

  const handleNext = () => {
    setIsCampModalVisible(false)
    setIsCalendarModalVisible(true)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#D64A3A' barStyle='light-content' />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}
         onPress={()=>navigation.goBack()}
        >
          <BackArrow />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.editButton}
          onPress={()=>navigation.navigate('MessageScreen')}
          >
            <EditIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreButton}>
            <ThreeDots />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Offer Title */}
        <View style={styles.titleSection}>
          <Text style={styles.offerTitle}>Christmas Special Discount</Text>
          <Text style={styles.offerCategory}>Food & Beverage</Text>
        </View>

        {/* Offer Images - Horizontal Scroll */}
        <View style={styles.imageContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            style={styles.imageScrollView}
          >
            <Image 
              source={{uri: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop'}} 
              style={styles.offerImage} 
            />
            <Image 
              source={{uri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop'}} 
              style={styles.offerImage} 
            />
            <Image 
              source={{uri: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=300&h=200&fit=crop'}} 
              style={styles.offerImage} 
            />
          </ScrollView>
        </View>

        {/* Offer Details */}
        <View style={styles.detailsSection}>
          {/* Location */}
          <View style={styles.detailRow}>
            <View style={styles.iconCircle}>
              {/* <Text style={styles.iconText}>📍</Text> */}
              <Location/>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Jl. Pasir Kaliki, Cicendo, Bandung, Jawa Barat 40172</Text>
              {/* <Text style={styles.detailSubtext}>Jl. Boulevard Gading Serpong</Text> */}
            </View>
          </View>

          {/* Time */}
          <View style={styles.detailRow}>
            <View style={styles.iconCircle}>
              {/* <Text style={styles.iconText}>🕐</Text> */}
              <EyeIcons/>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Valid during special promotion</Text>
            </View>
          </View>

          {/* Date */}
          <View style={styles.detailRow}>
            <View style={styles.iconCircle}>
              {/* <Text style={styles.iconText}>📅</Text> */}
              <Clock/>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>20 Dec - 25 Dec</Text>
            </View>
          </View>

          {/* Time Range */}
          <View style={styles.detailRow}>
            <View style={styles.iconCircle}>
              {/* <Text style={styles.iconText}>⏰</Text> */}
              <Clock/>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>17:00 - 18:00</Text>
            </View>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            Enjoy a festive culinary experience with special discounts! Get 
            up to 25% off on selected menu items at New Delights 
            Hub. From appetizers to desserts, savor the holiday spirit with 
            delicious dishes and beverages. Hurry and grab this offer before 
            it expires on 25 December.
          </Text>
          <TouchableOpacity>
            <Text style={styles.seeMoreText}>See More {'>'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.requestSpotButton}
        onPress={() => setIsCampModalVisible(true)}>
        <Text style={styles.requestSpotButtonText}>Request Spot</Text>
      </TouchableOpacity>

      <View style={styles.homeIndicator} />
      
      <CampaignTypeModal
        isVisible={isCampModalVisible}
        onClose={() => setIsCampModalVisible(false)}
        onNext={handleNext}
      />
      <CalendarModal
        isVisible={isCalendarModalVisible}
        onClose={() => setIsCalendarModalVisible(false)}
        onSubmit={()=>console.log('---------')}
      />
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
    marginTop: 30,
    height: 64,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
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
  moreButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  titleSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  offerTitle: {
    fontSize: 18,
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    color: '#333',
    marginBottom: 4,
  },
  offerCategory: {
    fontSize: 14,
    color: '#3D0066',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  imageContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  imageScrollView: {
    height: 200,
  },
  offerImage: {
    width: 277,
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
    marginRight: 12,
  },
  detailsSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    color: '#4B5563',
    marginBottom: 2,
  },
  detailSubtext: {
    fontSize: 12,
    color: '#666',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  descriptionSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 16,
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    color: '#333',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 13,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 8,
  },
  seeMoreText: {
    fontSize: 14,
    color: '#3D0066',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  requestSpotButton: {
    backgroundColor: '#D64A3A',
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 14,
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

export default OfferDetail