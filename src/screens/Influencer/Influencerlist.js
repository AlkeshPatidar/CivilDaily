import React, {useState} from 'react'
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
import {App_Primary_color} from '../../common/Colors/colors'
import CustomText from '../../components/TextComponent'

const InfluencersScreen = ({navigation}) => {
  const influencers = [
    {
      id: 1,
      name: 'Alex Patrick',
      category: 'Angel Investor & Founder of  Crowwwn',
      image:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face',
      rating: 5.0,
      reviews: 125,
      isVerified: true,
    },
    {
      id: 2,
      name: 'Alex Patrick',

      category: 'Angel Investor & Founder of  Crowwwn',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',

      isVerified: true,
    },
    {
      id: 3,
      name: 'Alex Patrick',

      category: 'Angel Investor & Founder of  Crowwwn',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      rating: 4.9,
      reviews: 156,
      isVerified: true,
    },
    {
      id: 4,
      name: 'Alex Patrick',

      category: 'Angel Investor & Founder of  Crowwwn',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      rating: 4.7,
      reviews: 89,
      isVerified: true,
    },
    {
      id: 5,
      name: 'Alex Patrick',

      category: 'Angel Investor & Founder of  Crowwwn',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      rating: 5.0,
      reviews: 200,
      isVerified: true,
    },
    {
      id: 6,
      name: 'Alex Patrick',

      category: 'Angel Investor & Founder of  Crowwwn',
      image:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face',
      rating: 4.6,
      reviews: 76,
      isVerified: true,
    },
  ]

  const renderStars = rating => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={14}
          color='#FFD700'
        />,
      )
    }
    return stars
  }

  const InfluencerCard = ({item}) => (
    <TouchableOpacity style={styles.influencerCard}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.image}} style={styles.profileImage} />
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.influencerName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.influencerCategory} numberOfLines={2}>
          {item.category}
        </Text>

        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {renderStars(Math.floor(item.rating))}
          </View>
        </View>
        <CustomText
          style={{
            color: App_Primary_color,
            fontSize: 10,
            marginTop: 10,
          }}>
          View Profile
        </CustomText>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={App_Primary_color} barStyle='light-content' />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name='chevron-back' size={24} color='#fff' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Influencers</Text>
      </View>

      {/* Influencers Grid */}
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.gridContainer}>
          {influencers.map(item => (
            <View key={item.id} style={styles.gridItem}>
              <InfluencerCard item={item} />
            </View>
          ))}
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
    paddingTop: 40,
    gap:90,
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
