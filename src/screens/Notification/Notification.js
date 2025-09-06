// import React, {useEffect, useState} from 'react'
// import {
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
// } from 'react-native'
// import Icon from 'react-native-vector-icons/Ionicons'
// import {FONTS_FAMILY} from '../../assets/Fonts'
// import {App_Primary_color, font_gray} from '../../common/Colors/colors'
// import {Back, BackArrow, Settings, Transactions} from '../../assets/SVGs'
// import CustomText from '../../components/TextComponent'
// import Row from '../../components/wrapper/row'
// import { useLoginCheck } from '../../utils/Context'
// import urls from '../../config/urls'
// import { apiGet } from '../../utils/Apis'
// import moment from 'moment'
// import useLoader from '../../utils/LoaderHook'

// const Notification = ({navigation}) => {
//   const [searchText, setSearchText] = useState('')
//   const [selectedCategory, setSelectedCategory] = useState('All')

//    const {showLoader, hideLoader} = useLoader()

//   const [notification, setNotification] = useState([])

//   const {loggedInby, setloggedInby} = useLoginCheck()

//   useEffect(() => {
//     GetNotification()
//   }, [])

//   const GetNotification = async () => {
//     try {
//       const url =
//         loggedInby == 'Influencers'
//           ? urls?.influencerNotification
//           : urls?.brandNotification
//       showLoader()
//       const res = await apiGet(url)
//       console.log('Notification data', res);

//       setNotification(res?.data)
//       hideLoader()
//     } catch (error) {
//       console.log('Error')
//       hideLoader()
//     }
//   }

//   const FoodCard = ({item, index}) => (
//     <TouchableOpacity
//       style={styles.foodCard}
//       //   onPress={() => navigation.navigate('CampaignList')}
//     >
//     {console.log('______________________', item)
//     }
//       <View style={styles.cardHeader}>
//         <Row
//           style={{
//             gap: 10,
//           }}>
//           <Transactions />
//           <Text style={styles.dateText}>{item?.Category}</Text>
//         </Row>
//         <Text style={styles.statusText}>{moment(item?.createdAt).format('DD-MMM-YYYY') }</Text>
//       </View>

//       <View style={styles.cardContent}>
//         <View style={styles.cardDetails}>
//           <Text style={styles.foodTitle} numberOfLines={2}>
//             {item.Title}
//           </Text>
//           <Text style={styles.foodSubtitle} numberOfLines={2}>
//             {item.Text}
//           </Text>

//           {/* {item.additionalItems && (
//             <Text style={styles.additionalItems}>{item.additionalItems}</Text>
//           )} */}
//         </View>
//       </View>
//     </TouchableOpacity>
//   )

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor={App_Primary_color} barStyle='light-content' />

//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <BackArrow />
//         </TouchableOpacity>
//         <CustomText
//           style={{
//             color: 'white',
//             fontSize: 16,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//           }}>
//           Notifications
//         </CustomText>
//         <Settings />
//       </View>

//       {/* Food Items List */}
//       <ScrollView
//         style={styles.contentContainer}
//         showsVerticalScrollIndicator={false}>
//         <View style={styles.listContainer}>
//           {notification.map((item, index) => (
//             <View key={item.id} style={styles.listItem}>
//               <FoodCard item={item} index={index} />
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     backgroundColor: App_Primary_color,
//     // alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     // marginTop: 30,
//     paddingVertical: 12,
//     gap: 10,
//   },
//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF26',
//     padding: 0,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//   },
//   headerTitle: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '500',
//     marginLeft: 8,
//   },
//   categoryContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     alignSelf: 'flex-start',
//   },
//   categoryRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   categoryButton: {
//     backgroundColor: '#f0f0f0',
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 4,
//     marginRight: 8,
//   },
//   selectedCategoryButton: {
//     backgroundColor: '#E53E3E',
//   },
//   categoryText: {
//     fontSize: 13,
//     color: '#666',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   selectedCategoryText: {
//     color: '#fff',
//   },
//   contentContainer: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   listContainer: {
//     paddingBottom: 80,
//   },
//   listItem: {
//     marginBottom: 16,
//   },
//   foodCard: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 12,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   dateText: {
//     fontSize: 14,
//     color: 'red',
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   statusBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 10,
//   },
//   statusText: {
//     color: '#4B5563',
//     fontSize: 10,
//     fontWeight: '600',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   cardContent: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   foodImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 8,
//     marginRight: 12,
//   },
//   cardDetails: {
//     flex: 1,
//   },
//   foodTitle: {
//     color: 'black',
//     fontSize: 14,
//     fontWeight: '600',
//     marginBottom: 4,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   foodSubtitle: {
//     color: '#666',
//     fontSize: 12,
//     marginBottom: 4,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   additionalItems: {
//     color: '#FF6B35',
//     fontSize: 11,
//     marginBottom: 8,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   cardFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     // alignItems: 'center',
//     marginTop: 10,
//   },
//   orderTotalLabel: {
//     color: 'black',
//     fontSize: 14,
//     fontWeight: '500',
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//     right: 50,
//   },
//   priceContainer: {
//     backgroundColor: '#FF6B35',
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   priceText: {
//     color: '#3D0066',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   floatingButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     backgroundColor: '#E53E3E',
//     width: 56,
//     height: 56,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 4},
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//   },
// })

// export default Notification

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
  Alert,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {FONTS_FAMILY} from '../../assets/Fonts'
import {App_Primary_color, darkMode25, font_gray} from '../../common/Colors/colors'
import {Back, BackArrow, Settings, Transactions} from '../../assets/SVGs'
import CustomText from '../../components/TextComponent'
import Row from '../../components/wrapper/row'
import {useLoginCheck} from '../../utils/Context'
import urls from '../../config/urls'
import {apiGet, apiPost, apiPut} from '../../utils/Apis'
import moment from 'moment'
import useLoader from '../../utils/LoaderHook'
import {ToastMsg} from '../../utils/helperFunctions'
import { useSelector } from 'react-redux'

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
      console.log('Notification data', res)

      setNotification(res?.data)
      hideLoader()
    } catch (error) {
      console.log('Error')
      hideLoader()
    }
  }

  const handleCollaborationAction = async (
    collaborationId,
    action,
    notificationId,
  ) => {
    try {
      showLoader()

      // Replace with your actual API endpoint for updating collaboration status
      const url = `/api/brand/AccepteRejectCollaborationRequest/${collaborationId}`
      const data = {
        Status: action === 'accept' ? 'Accepted' : 'Rejected',
      }

      const res = await apiPut(url, data)

      console.log(res, 'Response from collaboration action')

      if (res?.statusCode == 200) {
        // Alert.alert(
        //   'Success',
        //   `Collaboration ${action === 'accept' ? 'accepted' : 'rejected'} successfully`,
        //   [
        //     {
        //       text: 'OK',
        //       onPress: () => {
        //         // Refresh notifications to update the UI
        //         GetNotification()
        //       }
        //     }
        //   ]
        // )
        ToastMsg(
          `Collaboration ${
            action === 'accept' ? 'accepted' : 'rejected'
          } successfully`,
        )
        GetNotification()
      } else {
        ToastMsg('Failed to update collaboration status')
      }

      hideLoader()
    } catch (error) {
      console.log('Error updating collaboration:', error)
      Alert.alert('Error', 'Something went wrong')
      hideLoader()
    }
  }

  const renderActionButtons = item => {
    // Only show buttons for brands and when status is Pending or ReschedulePending
    if (
      loggedInby === 'Brands' &&
      item?.Collaboration &&
      (item.Collaboration.Status === 'Pending' ||
        item.Collaboration.Status === 'ReschedulePending')
    ) {
      return (
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.acceptButton]}
            onPress={() =>
              handleCollaborationAction(
                item.Collaboration._id,
                'accept',
                item._id,
              )
            }>
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() =>
              handleCollaborationAction(
                item.Collaboration._id,
                'reject',
                item._id,
              )
            }>
            <Text style={styles.rejectButtonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return null
  }

  const getStatusColor = status => {
    switch (status) {
      case 'Accepted':
        return '#10B981' // Green
      case 'Rejected':
        return '#EF4444' // Red
      case 'Pending':
        return '#F59E0B' // Amber
      case 'ReschedulePending':
        return '#8B5CF6' // Purple
      default:
        return '#6B7280' // Gray
    }
  }

  const FoodCard = ({item, index}) => (
    <TouchableOpacity
      style={styles.foodCard}
      //   onPress={() => navigation.navigate('CampaignList')}
    >
      {/* {console.log('______________________', item)
    } */}
      <View style={styles.cardHeader}>
        <Row
          style={{
            gap: 10,
          }}>
          <Transactions />
          <Text style={styles.dateText}>{item?.Category}</Text>
        </Row>
        <View style={styles.headerRight}>
          <Text style={styles.statusText}>
            {moment(item?.createdAt).format('DD-MMM-YYYY')}
          </Text>
          {item?.Collaboration?.Status && (
            <View
              style={[
                styles.statusBadge,
                {backgroundColor: getStatusColor(item.Collaboration.Status)},
              ]}>
              <Text style={styles.statusBadgeText}>
                {item.Collaboration.Status}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.cardDetails}>
          <Text style={styles.foodTitle} numberOfLines={2}>
            {item.Title}
          </Text>
          <Text style={styles.foodSubtitle} numberOfLines={3}>
            {item.Text}
          </Text>

          {/* Render action buttons if conditions are met */}
          {renderActionButtons(item)}
        </View>
      </View>
    </TouchableOpacity>
  )

        const {isDarkMode} = useSelector(state => state.theme)


  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? darkMode25 : '#f5f5f5',
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
  headerRight: {
    alignItems: 'flex-end',
    gap: 4,
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
    backgroundColor: isDarkMode ? '#555' : '#f0f0f0',
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
    color: isDarkMode ? 'white' : '#666',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  selectedCategoryText: {
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: isDarkMode ? darkMode25 : '#f5f5f5',
  },
  listContainer: {
    paddingBottom: 80,
  },
  listItem: {
    marginBottom: 16,
  },
  foodCard: {
    backgroundColor: isDarkMode ? '#333' : 'white',
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
    color: isDarkMode ? 'white' : '#2B2B2B',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    minWidth: 60,
    alignItems: 'center',
  },
  statusBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  statusText: {
    color: isDarkMode ? '#bbb' : '#4B5563',
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
    color: isDarkMode ? 'white' : 'black',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  foodSubtitle: {
    color: isDarkMode ? '#bbb' : '#2B2B2B',
    fontSize: 12,
    marginBottom: 8,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 0,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButton: {
    backgroundColor: '#10B981',
  },
  rejectButton: {
    backgroundColor: '#EF4444',
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  rejectButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
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
    color: isDarkMode ? 'white' : 'black',
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
});

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
            <View key={item._id || index} style={styles.listItem}>
              <FoodCard item={item} index={index} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     backgroundColor: App_Primary_color,
//     // alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     // marginTop: 30,
//     paddingVertical: 12,
//     gap: 10,
//   },
//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF26',
//     padding: 0,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//   },
//   headerTitle: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '500',
//     marginLeft: 8,
//   },
//   headerRight: {
//     alignItems: 'flex-end',
//     gap: 4,
//   },
//   categoryContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     alignSelf: 'flex-start',
//   },
//   categoryRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   categoryButton: {
//     backgroundColor: '#f0f0f0',
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 4,
//     marginRight: 8,
//   },
//   selectedCategoryButton: {
//     backgroundColor: '#E53E3E',
//   },
//   categoryText: {
//     fontSize: 13,
//     color: '#666',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   selectedCategoryText: {
//     color: '#fff',
//   },
//   contentContainer: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   listContainer: {
//     paddingBottom: 80,
//   },
//   listItem: {
//     marginBottom: 16,
//   },
//   foodCard: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 12,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   dateText: {
//     fontSize: 14,
//  color: '#2B2B2B',
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   statusBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//     borderRadius: 12,
//     minWidth: 60,
//     alignItems: 'center',
//   },
//   statusBadgeText: {
//     color: 'white',
//     fontSize: 10,
//     fontWeight: '600',
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   statusText: {
//     color: '#4B5563',
//     fontSize: 10,
//     fontWeight: '600',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   cardContent: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   foodImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 8,
//     marginRight: 12,
//   },
//   cardDetails: {
//     flex: 1,
//   },
//   foodTitle: {
//     color: 'black',
//     fontSize: 14,
//     fontWeight: '600',
//     marginBottom: 4,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   foodSubtitle: {
//     color: '#2B2B2B',
//     fontSize: 12,
//     marginBottom: 8,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   actionButtonsContainer: {
//     flexDirection: 'row',
//     gap: 10,
//     marginTop: 12,
//   },
//   actionButton: {
//     flex: 1,
//     paddingVertical: 5,
//     paddingHorizontal: 0,
//     borderRadius: 6,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   acceptButton: {
//     backgroundColor: '#10B981',
//   },
//   rejectButton: {
//     backgroundColor: '#EF4444',
//   },
//   acceptButtonText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '600',
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   rejectButtonText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '600',
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   additionalItems: {
//     color: '#FF6B35',
//     fontSize: 11,
//     marginBottom: 8,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   cardFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     // alignItems: 'center',
//     marginTop: 10,
//   },
//   orderTotalLabel: {
//     color: 'black',
//     fontSize: 14,
//     fontWeight: '500',
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//     right: 50,
//   },
//   priceContainer: {
//     backgroundColor: '#FF6B35',
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   priceText: {
//     color: '#3D0066',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   floatingButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     backgroundColor: '#E53E3E',
//     width: 56,
//     height: 56,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 4},
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//   },
// })

export default Notification
