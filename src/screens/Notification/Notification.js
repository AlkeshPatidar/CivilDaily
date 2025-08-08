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
import {FONTS_FAMILY} from '../../assets/Fonts'
import {App_Primary_color, font_gray} from '../../common/Colors/colors'
import {Back, BackArrow, Settings, Transactions} from '../../assets/SVGs'
import CustomText from '../../components/TextComponent'
import Row from '../../components/wrapper/row'
import { useLoginCheck } from '../../utils/Context'
import urls from '../../config/urls'
import { apiGet } from '../../utils/Apis'
import moment from 'moment'
import useLoader from '../../utils/LoaderHook'

const Notification = ({navigation}) => {
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

   const {showLoader, hideLoader} = useLoader()

  const [notification, setNotification] = useState([])

  const {loggedInby, setloggedInby} = useLoginCheck()

  useEffect(() => {
    GetNotification()
  }, [])

  const GetNotification = async () => {
    try {
      const url =
        loggedInby == 'Influencers'
          ? urls?.influencerNotification
          : urls?.brandNotification
      showLoader()
      const res = await apiGet(url)
      setNotification(res?.data)
      hideLoader()
    } catch (error) {
      console.log('Error')
      hideLoader()
    }
  }



  const foodItems = [
    {
      id: 1,
      title: 'Your Transaction Is Not Complete',
      subtitle:
        'Complete your transaction DB320256 before it is automatically canceled on 27 Dec 2023, 15:00',
      category: 'Food & Beverage',
      price: '12',
      status: 'COMPLETED',
      statusColor: '#3170FA',
      date: '27 Dec 2023, 14:00',
      image:
        'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop',
    },
    {
      id: 2,
      title: 'Your Transaction Is Not Complete',
      subtitle:
        'Complete your transaction DB320256 before it is automatically canceled on 27 Dec 2023, 15:00',
      category: 'Food',
      price: '12',
      status: 'COMPLETED',
      statusColor: '#3170FA',
      date: '15 Dec 2023, 09:20',
      additionalItems: '+2 more Items',
      image:
        'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300&h=200&fit=crop',
    },
    {
      id: 3,
      title: 'Your Transaction Is Not Complete',
      subtitle:
        'Complete your transaction DB320256 before it is automatically canceled on 27 Dec 2023, 15:00',
      category: 'Food & Beverage',
      price: '12',
      status: 'CANCELLED',
      statusColor: '#F44336',
      date: '14 Dec 2023, 11:20',
      image:
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop',
    },
    {
      id: 4,
      title: 'Your Transaction Is Not Complete',
      subtitle:
        'Complete your transaction DB320256 before it is automatically canceled on 27 Dec 2023, 15:00',
      category: 'Food & Beverage',
      price: '12',
      status: 'COMPLETED',
      statusColor: '#3170FA',
      date: '12 Dec 2023, 16:30',
      image:
        'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=200&fit=crop',
    },
  ]

  const FoodCard = ({item, index}) => (
    <TouchableOpacity
      style={styles.foodCard}
      //   onPress={() => navigation.navigate('CampaignList')}
    >
      <View style={styles.cardHeader}>
        <Row
          style={{
            gap: 10,
          }}>
          <Transactions />
          <Text style={styles.dateText}>{item?.Category}</Text>
        </Row>
        <Text style={styles.statusText}>{moment(item?.createdAt).format('DD-MMM-YYYY') }</Text>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.cardDetails}>
          <Text style={styles.foodTitle} numberOfLines={2}>
            {item.Title}
          </Text>
          <Text style={styles.foodSubtitle} numberOfLines={2}>
            {item.Text}
          </Text>

          {/* {item.additionalItems && (
            <Text style={styles.additionalItems}>{item.additionalItems}</Text>
          )} */}
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={App_Primary_color} barStyle='light-content' />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <CustomText
          style={{
            color: 'white',
            fontSize: 16,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
          }}>
          Notifications
        </CustomText>
        <Settings />
      </View>

      {/* Food Items List */}
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          {notification.map((item, index) => (
            <View key={item.id} style={styles.listItem}>
              <FoodCard item={item} index={index} />
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
    // alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    // marginTop: 30,
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignSelf: 'flex-start',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listContainer: {
    paddingBottom: 80,
  },
  listItem: {
    marginBottom: 16,
  },
  foodCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 14,
    color: 'red',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    color: '#4B5563',
    fontSize: 10,
    fontWeight: '600',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  cardDetails: {
    flex: 1,
  },
  foodTitle: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  foodSubtitle: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  additionalItems: {
    color: '#FF6B35',
    fontSize: 11,
    marginBottom: 8,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginTop: 10,
  },
  orderTotalLabel: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
    right: 50,
  },
  priceContainer: {
    backgroundColor: '#FF6B35',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    color: '#3D0066',
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

export default Notification
