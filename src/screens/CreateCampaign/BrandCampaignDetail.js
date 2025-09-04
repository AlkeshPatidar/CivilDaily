// import React, {useState} from 'react'
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   ImageBackground,
//   Modal,
//   Dimensions,
// } from 'react-native'
// import {BackArrow, EditIcon, ThreeDots} from '../../assets/SVGs'
// import {FONTS_FAMILY} from '../../assets/Fonts'

// const {width, height} = Dimensions.get('window')

// const BrandOfferDetail = ({navigation}) => {
//   const [isCampModalVisible, setIsCampModalVisible] = useState(false)
//   const [selectedCampaignType, setSelectedCampaignType] = useState('')
//   const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false)
//   const [selectedDateTime, setSelectedDateTime] = useState(null)
//   const [showThreeDotsMenu, setShowThreeDotsMenu] = useState(false)

//   const offers = [
//     {
//       id: 1,
//       title: 'Christmas Special Discount',
//       category: 'Food & Beverage',
//       location: 'Graha Mandiri, Jakarta Pusat',
//       date: '20 Dec - 25 Dec',
//       time: '17:00 - 18:00',
//       image:
//         'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop',
//     },
//     {
//       id: 2,
//       title: 'Christmas Special Discount',
//       category: 'Food & Beverage',
//       location: 'Graha Mandiri, Jakarta Pusat',
//       date: '20 Dec - 25 Dec',
//       time: '17:00 - 18:00',
//       image:
//         'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop',
//     },
//     {
//       id: 3,
//       title: 'Christmas Special Discount',
//       category: 'Food & Beverage',
//       location: 'Graha Mandiri, Jakarta Pusat',
//       date: '20 Dec - 25 Dec',
//       time: '17:00 - 18:00',
//       image:
//         'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop',
//     },
//     {
//       id: 4,
//       title: 'Christmas Special Discount',
//       category: 'Food & Beverage',
//       location: 'Graha Mandiri, Jakarta Pusat',
//       date: '20 Dec - 25 Dec',
//       time: '17:00 - 18:00',
//       image:
//         'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop',
//     },
//   ]

//   const handleNext = () => {
//     setIsCampModalVisible(false)
//     setIsCalendarModalVisible(true)
//   }

//   const handleMenuItemPress = (action) => {
//     setShowThreeDotsMenu(false)

//     switch(action) {
//       case 'edit':
//         // Handle edit action
//         // console.log('Edit pressed')
//         navigation.navigate('CreateCampaign')
//         break
//       case 'delete':
//         // Handle delete action
//         // console.log('Delete pressed')
//         navigation.navigate('TrashScreen')
//         break
//       case 'share':
//         // Handle share action
//         console.log('Share pressed')
//         break
//       case 'report':
//         // Handle report action
//         console.log('Report pressed')
//         break
//       default:
//         break
//     }
//   }

//   const OfferCard = ({offer}) => (
//     <TouchableOpacity style={styles.offerCard}
//     onPress={()=>navigation.navigate('OfferDetail')}
//     >
//       <View style={styles.offerImageContainer}>
//         <Image source={{uri: offer.image}} style={styles.offerImage} />
//       </View>
//       <View style={styles.offerContent}>
//         <View style={styles.dateTimeContainer}>
//           <View style={styles.dateDot} />
//           <Text style={styles.dateText}>{offer.date}</Text>
//           <Text style={styles.timeText}>{offer.time}</Text>
//         </View>
//         <Text style={styles.offerTitle}>{offer.title}</Text>
//         <Text style={styles.offerCategory}>{offer.category}</Text>
//         <Text style={styles.offerLocation}>{offer.location}</Text>
//       </View>
//     </TouchableOpacity>
//   )

//   const ThreeDotsMenu = () => (
//     <Modal
//       visible={showThreeDotsMenu}
//       transparent={true}
//       animationType="none"
//       onRequestClose={() => setShowThreeDotsMenu(false)}
//     >
//       <TouchableOpacity
//         style={styles.modalOverlay}
//         activeOpacity={1}
//         onPress={() => setShowThreeDotsMenu(false)}
//       >
//         <View style={styles.menuContainer}>
//           <TouchableOpacity
//             style={styles.menuItem}
//             onPress={() => handleMenuItemPress('edit')}
//           >
//             <Text style={styles.menuItemText}>Edit</Text>
//           </TouchableOpacity>

//           <View style={styles.menuDivider} />

//           <TouchableOpacity
//             style={styles.menuItem}
//             onPress={() => handleMenuItemPress('delete')}
//           >
//             <Text style={[styles.menuItemText]}>Delete</Text>
//           </TouchableOpacity>

//           <View style={styles.menuDivider} />

//         </View>
//       </TouchableOpacity>
//     </Modal>
//   )

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor={App_Primary_color} barStyle='light-content' />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton}
//          onPress={()=>navigation.goBack()}
//         >
//           <BackArrow />
//         </TouchableOpacity>
//         <View style={styles.headerActions}>
//           <TouchableOpacity style={styles.editButton}
//           onPress={()=>navigation.navigate('MessageScreen')}
//           >
//             <EditIcon />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.moreButton}
//             onPress={() => setShowThreeDotsMenu(true)}
//           >
//             <ThreeDots />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         <View
//           style={{
//             backgroundColor: 'white',
//             padding: 8,
//             borderRadius: 8,
//             margin: 0,
//           }}>
//           <ImageBackground
//             source={{
//               uri: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop',
//             }}
//             style={styles.heroSection}
//             imageStyle={styles.heroImageStyle}>
//             <View style={styles.heroOverlay}>
//               <View style={styles.playButton}>
//                 <Text style={styles.playButtonText}>▶</Text>
//               </View>
//               <Text style={styles.heroText}>
//                 JINGLE{'\n'}MUNCH{'\n'}SAVE
//               </Text>
//             </View>
//           </ImageBackground>
//           <View style={styles.restaurantInfo}>
//             <Text style={styles.restaurantName}>New Delight Hub</Text>
//             <Text style={styles.restaurantCategory}>Food & Beverage</Text>
//           </View>
//         </View>

//         {/* Offers Section */}
//         <View style={styles.offersSection}>
//           <View style={styles.offersSectionHeader}>
//             <Text style={styles.offersTitle}>Offers</Text>
//             <TouchableOpacity>
//               <Text style={styles.seeAllText}>See All ›</Text>
//             </TouchableOpacity>
//           </View>

//           {offers.map(offer => (
//             <OfferCard key={offer.id} offer={offer} />
//           ))}
//         </View>
//       </ScrollView>

//       <View style={styles.homeIndicator} />

//       {/* Three Dots Menu */}
//       <ThreeDotsMenu />

//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#D64A3A',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     // marginTop: 30,
//     height: 64,
//   },
//   backButton: {
//     width: 32,
//     height: 32,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   backButtonText: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: '300',
//   },
//   headerActions: {
//     flexDirection: 'row',
//     gap: 16,
//   },
//   editButton: {
//     width: 32,
//     height: 32,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   editButtonText: {
//     color: 'white',
//     fontSize: 18,
//   },
//   moreButton: {
//     width: 32,
//     height: 32,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   moreButtonText: {
//     color: 'white',
//     fontSize: 20,
//   },
//   content: {
//     flex: 1,
//   },
//   heroSection: {
//     height: 200,
//     marginHorizontal: 16,
//     marginTop: 16,
//     borderRadius: 12,
//     overflow: 'hidden',
//   },
//   heroImageStyle: {
//     borderRadius: 12,
//   },
//   heroOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.3)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   playButton: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     position: 'absolute',
//   },
//   playButtonText: {
//     color: '#333',
//     fontSize: 16,
//     marginLeft: 2,
//   },
//   heroText: {
//     color: 'white',
//     fontSize: 40,
//     fontFamily: FONTS_FAMILY.Comfortaa_Bold,
//     textAlign: 'center',
//     lineHeight: 50,
//     letterSpacing: 2,
//   },
//   restaurantInfo: {
//     paddingHorizontal: 16,
//     paddingTop: 20,
//     paddingBottom: 16,
//   },
//   restaurantName: {
//     fontSize: 16,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     color: '#333',
//   },
//   restaurantCategory: {
//     fontSize: 14,
//     color: '#3D0066',
//   },
//   offersSection: {
//     paddingHorizontal: 16,
//   },
//   offersSectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 18,
//   },
//   offersTitle: {
//     fontSize: 16,
//     fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//     color: '#333',
//   },
//   seeAllText: {
//     fontSize: 12,
//     color: '#8B5CF6',
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   offerCard: {
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     borderRadius: 12,
//     marginBottom: 12,
//     overflow: 'hidden',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   offerImageContainer: {
//     position: 'relative',
//   },
//   offerImage: {
//     width: 95,
//     height: 108,
//     borderRadius: 12,
//     padding: 6,
//   },
//   discountBadge: {
//     position: 'absolute',
//     top: 6,
//     left: 6,
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: '#FF4444',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   discountText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   offerContent: {
//     flex: 1,
//     padding: 12,
//   },
//   dateTimeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 6,
//   },
//   dateDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#C527D9',
//     marginRight: 8,
//   },
//   dateText: {
//     fontSize: 12,
//     color: '#666',
//     marginRight: 8,
//   },
//   timeText: {
//     fontSize: 12,
//     color: '#666',
//   },
//   offerTitle: {
//     fontSize: 14,
//     fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//     color: '#333',
//     marginBottom: 4,
//   },
//   offerCategory: {
//     fontSize: 12,
//     color: '#8B5CF6',
//     fontWeight: '500',
//     marginBottom: 2,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   offerLocation: {
//     fontSize: 12,
//     color: '#666',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   requestSpotButton: {
//     backgroundColor: '#D64A3A',
//     marginHorizontal: 16,
//     marginVertical: 16,
//     paddingVertical: 10,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   requestSpotButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   homeIndicator: {
//     width: 134,
//     height: 5,
//     backgroundColor: '#000',
//     borderRadius: 3,
//     alignSelf: 'center',
//     marginBottom: 8,
//   },
//   // Three Dots Menu Styles
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.3)',
//     justifyContent: 'flex-start',
//     alignItems: 'flex-end',
//   },
//   menuContainer: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     marginTop: 94, // Adjust based on your header height
//     marginRight: 16,
//     minWidth: 120,
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//   },
//   menuItem: {
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//   },
//   menuItemText: {
//     fontSize: 14,
//     color: '#333',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   deleteText: {
//     color: '#D64A3A',
//   },
//   menuDivider: {
//     height: 1,
//     backgroundColor: '#E5E5E5',
//     marginHorizontal: 8,
//   },
// })

// export default BrandOfferDetail

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
  Modal,
  Dimensions,
} from 'react-native'
import {
  BackArrow,
  Badge,
  EditIcon,
  ForwordChev,
  ThreeDots,
} from '../../assets/SVGs'
import {FONTS_FAMILY} from '../../assets/Fonts'
import CustomText from '../../components/TextComponent'
import color, {App_Primary_color, font_gray} from '../../common/Colors/colors'
import Row from '../../components/wrapper/row'
import IMG from '../../assets/Images'
import SpaceBetweenRow from '../../components/wrapper/spacebetween'
import {apiDelete, apiGet, apiPut} from '../../utils/Apis'
import urls from '../../config/urls'
import useLoader from '../../utils/LoaderHook'
import {useIsFocused} from '@react-navigation/native'
import { ToastMsg } from '../../utils/helperFunctions'
import ForgotPassword from '../Auth/ForgetPassword'

const {width, height} = Dimensions.get('window')

const BrandCampaignDetail = ({navigation, route}) => {
  const [isCampModalVisible, setIsCampModalVisible] = useState(false)
  const [selectedCampaignType, setSelectedCampaignType] = useState('')
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false)
  const [selectedDateTime, setSelectedDateTime] = useState(null)
  const [showThreeDotsMenu, setShowThreeDotsMenu] = useState(false)
  const [activeTab, setActiveTab] = useState('Offers') // New state for tabs
  const [activeSubTab, setActiveSubTab] = useState('Paid Collaboration') // New state for tabs

  const [campaignDetail, setCampaignDetial] = useState(null)
  const {showLoader, hideLoader} = useLoader()
  const [atendess, setAttendees] = useState([])
  const [req, setReq] = useState([])

  const [offers, setOffers] = useState([])
  const [rescheduleReq, setRescheduleReq] = useState([])

  const isFocused = useIsFocused()

  useEffect(() => {
    getBrandCampaignDetial()
    getAtendess()
    getCollabrationReq()
    getOffers()
    getAllReschduleReq()
  }, [isFocused])

  const getBrandCampaignDetial = async () => {
    try {
      showLoader()
      const res = await apiGet(
        `${urls?.getBrandCampaignDetail}/${route?.params?.campaignId}`,
      )
      setCampaignDetial(res?.data)
      console.log('Brand CamPaignDetial', res?.data)

      hideLoader()
    } catch (error) {
      console.log('Error')
      hideLoader()
    }
  }

  const DeleteCampaign = async () => {
    try {
      showLoader()
      const res = await apiDelete(
        `/api/brand/DeleteCampaign/${route?.params?.campaignId}`,
      )
      navigation.goBack()

      hideLoader()
    } catch (error) {
      console.log('Error')
      hideLoader()
    }
  }

  const getAtendess = async () => {
    try {
      showLoader()
      const res = await apiGet(
        `/api/brand/GetCollaborationAttendanceListaCampaign/${route?.params?.campaignId}`,
      )
      setAttendees(res.data)
      console.log('Atesndess', res?.data)

      hideLoader()
    } catch (error) {
      console.log('Error')
      hideLoader()
    }
  }

  const getOffers = async () => {
    try {
      showLoader()
      const res = await apiGet(
        `/api/brand/GetAllOffersofMyCampaign/${route?.params?.campaignId}`,
      )
      setOffers(res.data)
      console.log('Offers::::::::::::::::::::::::::::', res?.data)

      hideLoader()
    } catch (error) {
      console.log('Error')
      hideLoader()
    }
  }

  const getCollabrationReq = async () => {
    try {
      showLoader()
      const res = await apiGet(
        `/api/brand/GetAllCollaborationRequestOfaCampaign/${route?.params?.campaignId}`,
      )
      setReq(res.data)
      console.log('COLLLALA', res?.data)

      hideLoader()
    } catch (error) {
      console.log('Error')
      hideLoader()
    }
  }

  const handleCollaborationAction = async (collaborationId, action, type) => {
    console.log('Collaboration ID:', collaborationId, 'Action:', action, 'Type:', type);
    
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
        if (type=='reschedule') {
          getAllReschduleReq()
          
        } else {
          getCollabrationReq()
          
        }
        ToastMsg(
          `Collaboration ${
            action === 'accept' ? 'accepted' : 'rejected'
          } successfully`,
        )
      } else {
        ToastMsg('Failed to update collaboration status')
      }

      hideLoader()
    } catch (error) {
      console.log('Error updating collaboration:', error)
    ToastMsg( 'Something went wrong')
      hideLoader()
    }
  }

  const getAllReschduleReq = async () => {
    try {
      showLoader()
      const res = await apiGet(
        // `/api/brand/GetAllCollaborationRequestOfaCampaign/${route?.params?.campaignId}`,
        `/api/brand/GetAllRescheduleCollaborationRequest`,
      )
      setRescheduleReq(res.data)
      console.log('Bhaiji', res?.data)

      hideLoader()
    } catch (error) {
      console.log('Error')
      hideLoader()
    }
  }

  const tabs = ['Offers', 'Attendees', 'Request', 'Reschedule Request']

  const handleNext = () => {
    setIsCampModalVisible(false)
    setIsCalendarModalVisible(true)
  }

  const handleMenuItemPress = action => {
    setShowThreeDotsMenu(false)

    switch (action) {
      case 'edit':
        navigation.navigate('CreateCampaign')
        break
      case 'delete':
        // navigation.navigate('TrashScreen')
        DeleteCampaign()
        break
      case 'share':
        console.log('Share pressed')
        break
      case 'report':
        console.log('Report pressed')
        break
      default:
        break
    }
  }

  const AttendeeCard = ({attendee}) => (
    <TouchableOpacity style={styles.attendeeCard}>
      {/* {console.log('Attendee::::::::::::::', attendee)
      } */}
      <Image source={{uri: attendee.Image}} style={styles.attendeeAvatar} />
      <View style={styles.attendeeInfo}>
        <Text style={styles.attendeeName}>
          {attendee.FirstName}
          {atendess?.LastName}
        </Text>
        <Text style={styles.attendeeRole}>{attendee.NicheInput}</Text>
      </View>
    </TouchableOpacity>
  )

  const OfferCard = ({attendee}) => (
    <TouchableOpacity
      style={styles.attendeeCard}
      onPress={() =>
        navigation.navigate('BrandOfferDetail', {id: attendee._id})
      }>
      {console.log('Attetddoffff', attendee)}
      <Image source={{uri: attendee.Image}} style={styles.attendeeAvatar} />
      <View style={styles.attendeeInfo}>
        <Text style={styles.attendeeName}>{attendee.Title}</Text>
        <Text style={styles.attendeeRole}>{attendee.Expectations}</Text>
      </View>
    </TouchableOpacity>
  )

  const RequestCard = ({request}) => {
    const showActionButtons =
      request.Status === 'Pending' || request.Status === 'ReschedulePending'
    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          // alignItems: 'center',
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        }}>
        {console.log('Request::::::::::::::', request)}
        {/* <CustomText
          style={{
            fontSize: 12,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: '#4B5563',
          }}>
          27 Dec 2023, 14:00
        </CustomText> */}
        <Row
          style={{
            gap: 15,
          }}>
          <Image
            source={{
              uri: request?.Influencer?.Image
                ? request?.Influencer?.Image
                : 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop',
            }}
            style={{
              height: 40,
              width: 40,
              borderRadius: 4,
            }}
          />
          <View>
            <CustomText
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: FONTS_FAMILY.Poppins_Regular,
              }}>
              {request?.Influencer?.FirstName}
            </CustomText>
            <CustomText
              style={{
                color: '#4B5563',
                fontSize: 12,
                fontFamily: FONTS_FAMILY.Poppins_Regular,
              }}>
              {request?.Influencer?.Address}
            </CustomText>
          </View>
        </Row>

        {showActionButtons ?(
          <Row style={{justifyContent: 'flex-end', gap: 20, marginTop: 10}}>
            <TouchableOpacity
              style={{
                backgroundColor: App_Primary_color,
                padding: 8,
                borderRadius: 8,
              }}
              onPress={() => handleCollaborationAction(request._id, 'reject', type='request')}>
              <CustomText
                style={{
                  color: 'white',
                  fontSize: 14,
                  fontFamily: FONTS_FAMILY.Poppins_Regular,
                }}>
                Reject
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{backgroundColor: '#10B981', padding: 8, borderRadius: 8}}
              onPress={() => handleCollaborationAction(request._id, 'accept', type='request')}>
              <CustomText
                style={{
                  color: 'white',
                  fontSize: 14,
                  fontFamily: FONTS_FAMILY.Poppins_Regular,
                }}>
                Accept
              </CustomText>
            </TouchableOpacity>
          </Row>
        ):
        <View style={{
          backgroundColor:request.Status=='Accepted'?'green': App_Primary_color,
          alignItems:'center',
          justifyContent:'center',
          borderRadius:5,
          width:80,
          position:'absolute',
          right:10,
          top:10
        }}>
          <CustomText style={{color:'white', fontFamily:FONTS_FAMILY.Poppins_Regular, fontSize:12}}> {request.Status}</CustomText>
        </View>
        }
      </TouchableOpacity>
    )
  }

  const RescheduleCard = ({reschedule}) => {
    const showActionButtons =
      reschedule.Status === 'Pending' ||
      reschedule.Status === 'ReschedulePending'

      console.log('Reschdle::::::::::', reschedule);
      

    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          // alignItems: 'center',
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        }}>
        {console.log(reschedule, '----RESE----')}
        <CustomText
          style={{
            fontSize: 12,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: '#4B5563',
          }}>
          27 Dec 2023, 14:00
        </CustomText>
        <Row
          style={{
            gap: 15,
          }}>
          <Image
            source={{
              uri: reschedule?.Influencer?.Image
                ? reschedule?.Influencer?.Image
                : 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop',
            }}
            style={{
              height: 40,
              width: 40,
              borderRadius: 4,
            }}
          />
          <View>
            <CustomText
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: FONTS_FAMILY.Poppins_Regular,
              }}>
              {/* Christmas Special Discount */}
              {reschedule?.Influencer?.FirstName}{' '}
              {reschedule?.Influencer?.LastName}
            </CustomText>
            <CustomText
              style={{
                color: '#4B5563',
                fontSize: 12,
                fontFamily: FONTS_FAMILY.Poppins_Regular,
              }}>
              {/* Taman Sari Billboard, Bandung */}
              {reschedule?.Influencer?.NicheInput}
            </CustomText>
          </View>
        </Row>
        {showActionButtons && (
          <Row style={{justifyContent: 'flex-end', gap: 20, marginTop: 10}}>
            <TouchableOpacity
              style={{
                backgroundColor: App_Primary_color,
                padding: 8,
                borderRadius: 8,
              }}
              onPress={() => handleCollaborationAction(reschedule._id, 'reject', type='reschedule')}>
              <CustomText
                style={{
                  color: 'white',
                  fontSize: 14,
                  fontFamily: FONTS_FAMILY.Poppins_Regular,
                }}>
                Reject
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{backgroundColor: '#10B981', padding: 8, borderRadius: 8}}
              onPress={() => handleCollaborationAction(reschedule._id, 'accept', type='reschedule')}>
              <CustomText
                style={{
                  color: 'white',
                  fontSize: 14,
                  fontFamily: FONTS_FAMILY.Poppins_Regular,
                }}>
                Accept
              </CustomText>
            </TouchableOpacity>
          </Row>
        )}
      <TouchableOpacity
          onPress={() => navigation.navigate('ChatScreen', {Id: reschedule?.Influencer?._id})}
          style=
          {{
            position: 'absolute',
            right: 10,
            top: 10,
          }}
          >
          <Image
            source={IMG.msg}
            style={{
              height: 35,
              width: 35,
              tintColor: App_Primary_color,
              // position: 'absolute',
              // right: 10,
              // bottom: 10,
            }}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Offers':
        return (
          <View style={styles.tabContent}>
            {offers?.map(attendee => (
              <OfferCard key={attendee?._id} attendee={attendee} />
            ))}
          </View>
        )
      case 'Attendees':
        return (
          <View style={styles.tabContent}>
            {atendess?.map(attendee => (
              <AttendeeCard key={attendee?._id} attendee={attendee} />
            ))}
          </View>
        )
      case 'Request':
        return (
          <View style={styles.tabContent}>
            {activeSubTab === 'Paid Collaboration'
              ? req?.paidCollaborations?.map(request => (
                  <RequestCard key={request._id} request={request} />
                ))
              : req?.barterCollaborations?.map(request => (
                  <RequestCard key={request._id} request={request} />
                ))}
          </View>
        )

      case 'Reschedule Request':
        return (
          <View style={styles.tabContent}>
            {rescheduleReq?.map(attendee => (
              <RescheduleCard reschedule={attendee} />
            ))}
          </View>
        )
      default:
        return null
    }
  }

  const ThreeDotsMenu = () => (
    <Modal
      visible={showThreeDotsMenu}
      transparent={true}
      animationType='none'
      onRequestClose={() => setShowThreeDotsMenu(false)}>
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowThreeDotsMenu(false)}>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuItemPress('edit')}>
            <Text style={styles.menuItemText}>Edit</Text>
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuItemPress('delete')}>
            <Text style={[styles.menuItemText]}>Delete</Text>
          </TouchableOpacity>

          <View style={styles.menuDivider} />
        </View>
      </TouchableOpacity>
    </Modal>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={App_Primary_color} barStyle='light-content' />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate('CreateCampaign', {
                campaignId: route?.params?.campaignId,
              })
            }>
            <EditIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => setShowThreeDotsMenu(true)}>
            <ThreeDots />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={{
              uri: campaignDetail?.Assets,
            }}
            style={styles.heroSection}
            imageStyle={styles.heroImageStyle}>
            <View style={styles.heroOverlay}>
              {/* <Text style={styles.heroText}>
                JINGLE{'\n'}MUNCH{'\n'}SAVE
              </Text> */}
            </View>
          </ImageBackground>
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{campaignDetail?.Title}</Text>
            <Text style={styles.restaurantCategory}>
              {campaignDetail?.Category}
            </Text>
          </View>

          <SpaceBetweenRow>
            <View
              style={{
                backgroundColor: '#4B5563',
                padding: 5,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
              }}>
              <CustomText
                style={{
                  color: 'white',
                  fontSize: 12,
                  fontFamily: FONTS_FAMILY.Poppins_Medium,
                }}>
                DRAFT
              </CustomText>
            </View>
            <TouchableOpacity
              style={{
                padding: 5,
                backgroundColor: App_Primary_color,
                borderRadius: 4,
              }}
              onPress={() =>
                navigation.navigate('AddOffer', {
                  campaignId: route?.params?.campaignId,
                })
              }>
              <CustomText
                style={{
                  color: 'white',
                  fontSize: 12,
                  fontFamily: FONTS_FAMILY.Poppins_Medium,
                }}>
                Add Offer
              </CustomText>
            </TouchableOpacity>
          </SpaceBetweenRow>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabScrollView}>
            {tabs.map(tab => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.activeTabButton,
                ]}
                onPress={() => setActiveTab(tab)}>
                <Text
                  style={[
                    styles.tabButtonText,
                    activeTab === tab && styles.activeTabButtonText,
                  ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {activeTab !== 'Request' && (
            <SpaceBetweenRow
              style={{
                marginHorizontal: 20,
                marginTop: 15,
              }}>
              <CustomText
                style={{
                  fontFamily: FONTS_FAMILY.Poppins_SemiBold,
                }}>
                {activeTab}
              </CustomText>
              {/* <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  gap: 4,
                  alignItems: 'center',
                  borderWidth: 1,
                  padding: 4,
                  borderColor: '#D43C312E',
                  borderRadius: 8,
                  backgroundColor: 'white',
                }}>
                <CustomText
                  style={{
                    fontSize: 13,
                    fontFamily: FONTS_FAMILY.Poppins_Regular,
                  }}>
                  20 July
                </CustomText>
                <ForwordChev
                  style={{
                    transform: [{rotate: '90deg'}],
                  }}
                />
              </TouchableOpacity> */}
            </SpaceBetweenRow>
          )}

          {activeTab == 'Request' && (
            <SpaceBetweenRow
              style={{
                marginHorizontal: 20,
                marginTop: 15,
                // width:'100%'
                gap: 36,
              }}>
              <CustomText
                style={{
                  fontFamily: FONTS_FAMILY.Poppins_SemiBold,
                }}>
                {activeTab}
              </CustomText>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.tabScrollView}>
                {['Paid Collaboration', 'Barter'].map(tabs => (
                  <TouchableOpacity
                    key={tabs}
                    style={[
                      styles.tabButton,
                      activeSubTab === tabs && styles.activeTabButton,
                    ]}
                    onPress={() => setActiveSubTab(tabs)}>
                    <Text
                      style={[
                        styles.tabButtonText,
                        activeSubTab === tabs && styles.activeTabButtonText,
                      ]}>
                      {tabs}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </SpaceBetweenRow>
          )}
        </View>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Extra padding at bottom */}
        <View style={{height: 20}} />
      </ScrollView>

      <View style={styles.homeIndicator} />

      {/* Three Dots Menu */}
      <ThreeDotsMenu />
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

  // Hero Section
  heroContainer: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    margin: 16,
  },
  heroSection: {
    height: 200,
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

  // Tab Navigation
  tabContainer: {
    // backgroundColor: 'white',
    paddingVertical: 6,
    marginHorizontal: 2,
    marginBottom: 16,
    borderRadius: 12,
  },
  tabScrollView: {
    paddingHorizontal: 16,
  },
  tabButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: App_Primary_color,
  },
  activeTabButton: {
    backgroundColor: '#D64A3A',
    borderColor: '#D64A3A',
  },
  tabButtonText: {
    fontSize: 12,
    color: App_Primary_color,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  activeTabButtonText: {
    color: 'white',
  },

  // Tab Content
  tabContent: {
    paddingHorizontal: 16,
  },

  // Attendee Card
  attendeeCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  attendeeAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  attendeeInfo: {
    flex: 1,
  },
  attendeeName: {
    fontSize: 14,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
    color: '#333',
    marginBottom: 2,
  },
  attendeeRole: {
    fontSize: 12,
    color: '#666',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  attendeeTime: {
    fontSize: 12,
    color: '#999',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },

  // New Request Card Design
  newRequestCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
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
  newRequestImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  newRequestContent: {
    padding: 12,
  },
  newRequestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  newRequestTitle: {
    fontSize: 14,
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  collaborationTypeContainer: {
    alignItems: 'flex-end',
  },
  collaborationType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  collaborationTypeText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
  },
  newRequestCategory: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
    marginBottom: 4,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  newRequestLocation: {
    fontSize: 12,
    color: '#666',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    marginBottom: 8,
  },
  newRequestFooter: {
    marginTop: 8,
  },
  calendarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  calendarText: {
    fontSize: 12,
    color: '#666',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  rescheduleNote: {
    fontSize: 11,
    color: '#666',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    marginBottom: 2,
  },

  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#000',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 8,
  },

  // Three Dots Menu Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 64,
    marginRight: 16,
    minWidth: 120,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemText: {
    fontSize: 14,
    color: '#333',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 8,
  },
})

export default BrandCampaignDetail
