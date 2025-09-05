// import React, {useState, useEffect} from 'react'
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
// import {FONTS_FAMILY} from '../../../assets/Fonts'
// import color, {App_Primary_color} from '../../../common/Colors/colors'
// import {apiGet, apiPut} from '../../../utils/Apis'
// import urls from '../../../config/urls'
// import useLoader from '../../../utils/LoaderHook'
// import CustomText from '../../../components/TextComponent'
// import RescheduleModal from './RescheduleModel'
// import { ToastMsg } from '../../../utils/helperFunctions'

// const InfluencerBookingList = ({navigation}) => {
//   const [searchText, setSearchText] = useState('')
//   const [selectedCategory, setSelectedCategory] = useState('All')
//   const [allCampaigns, setAllCampaigns] = useState([])
//   const [filteredCampaigns, setFilteredCampaigns] = useState([])

//   const categories = ['All', 'Completed', 'Pending']
//   const [showModal, setShowModal] = useState(false)
//   const {showLoader, hideLoader} = useLoader()
//   const [collaborationId, setCollaborationId] = useState(null)

//   useEffect(() => {
//     getAllCampaigns()
//   }, [])

//   useEffect(() => {
//     filterCampaigns()
//   }, [selectedCategory, searchText, allCampaigns])

//   const getAllCampaigns = async () => {
//     try {
//       showLoader()
//       let allData = []

//       const allRes = await apiGet(urls?.AllCollabrationReqInfluencer)
//       if (allRes?.data && Array.isArray(allRes.data)) {
//         const activeCampaigns = allRes.data.map(campaign => ({
//           ...campaign,
//           Status: campaign.Status || 'Active',
//         }))
//         allData = [...activeCampaigns]
//       }

//       // Get completed campaigns
//       const completedRes = await apiGet(
//         urls?.completedCollabrationReqInfluencer,
//       )
//       if (completedRes?.data && Array.isArray(completedRes.data)) {
//         const completedCampaigns = completedRes.data.map(campaign => ({
//           ...campaign,
//           Status: 'Completed',
//         }))
//         allData = [...allData, ...completedCampaigns]
//       }

//       // Get cancelled campaigns
//       const cancelledRes = await apiGet(
//         urls?.cancelledCollabrationReqInfluencer,
//       )
//       if (cancelledRes?.data && Array.isArray(cancelledRes.data)) {
//         const cancelledCampaigns = cancelledRes.data.map(campaign => ({
//           ...campaign,
//           Status: 'Cancelled',
//         }))
//         allData = [...allData, ...cancelledCampaigns]
//       }

//       // Remove duplicates based on _id if any exist
//       const uniqueCampaigns = allData.filter(
//         (campaign, index, self) =>
//           index === self.findIndex(c => c._id === campaign._id),
//       )

//       setAllCampaigns(uniqueCampaigns)
//       hideLoader()
//     } catch (error) {
//       console.log('Error fetching campaigns:', error)
//       hideLoader()
//     }
//   }

//   const handleSubmit =async (collaborationId, data) => {
//     console.log('Collaboration ID:', collaborationId, 'Data:', data)
//     try {
//       showLoader()
//       const res = await apiPut(
//         `/api/influencer/InfluencerrescheduleCollbractionRequest/${collaborationId}`,
//         data,
//       )
//       console.log(res,'RES:::::::::');
      
//         getAllCampaigns()
//         ToastMsg(res?.message || 'Collaboration rescheduled successfully')
//       hideLoader()
//       setShowModal(false)
//     } catch (error) {
//       hideLoader()
//     }
//   }

//   const filterCampaigns = () => {
//     let filtered = []

//     // First filter by category
//     switch (selectedCategory) {
//       case 'All':
//         filtered = [...allCampaigns]
//         break
//       case 'Completed':
//         filtered = allCampaigns.filter(
//           campaign => campaign.Status?.toLowerCase() === 'completed',
//         )
//         break
//       case 'Pending':
//         filtered = allCampaigns.filter(
//           campaign => campaign.Status?.toLowerCase() === 'pending',
//         )
//         break
//       default:
//         filtered = [...allCampaigns]
//     }

//     // Then apply search filter if searchText exists
//     if (searchText.trim()) {
//       filtered = filtered.filter(campaign => {
//         const title = campaign?.Campaign?.Title || campaign?.Title || ''
//         const category =
//           campaign?.Campaign?.Category || campaign?.Category || ''
//         const description =
//           campaign?.Campaign?.Description || campaign?.Description || ''

//         const searchLower = searchText.toLowerCase()
//         return (
//           title.toLowerCase().includes(searchLower) ||
//           category.toLowerCase().includes(searchLower) ||
//           description.toLowerCase().includes(searchLower)
//         )
//       })
//     }

//     setFilteredCampaigns(filtered)
//   }

//   const getStatusColor = status => {
//     switch (status?.toLowerCase()) {
//       case 'completed':
//         return '#4CAF50' // Green for completed
//       case 'pending':
//         return '#F44336' // Red for cancelled
//       case 'active':
//         return '#3170FA' // Blue for active
//       case 'pending':
//         return '#FF9800' // Orange for pending
//       default:
//         return '#666'
//     }
//   }

//   const formatDate = dateString => {
//     if (!dateString) return 'N/A'
//     try {
//       const date = new Date(dateString)
//       return date.toLocaleDateString('en-GB', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//       })
//     } catch (error) {
//       return 'Invalid Date'
//     }
//   }

//   const CategoryButton = ({title, isSelected, onPress}) => (
//     <TouchableOpacity
//       style={[
//         styles.categoryButton,
//         isSelected && styles.selectedCategoryButton,
//       ]}
//       onPress={onPress}>
//       <Text
//         style={[
//           styles.categoryText,
//           isSelected && styles.selectedCategoryText,
//         ]}>
//         {title}
//       </Text>
//     </TouchableOpacity>
//   )

//   const CampaignCard = ({item, index}) => (
//     <TouchableOpacity
//       style={styles.foodCard}
//       // onPress={() =>
//       //   navigation.navigate('BrandOfferDetail', {campaignId: item?._id})
//       // }
//       >
//       <View style={styles.cardHeader}>
//         <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>
//         <View
//           style={[
//             styles.statusBadge,
//             {backgroundColor: getStatusColor(item.Status)},
//           ]}>
//           <Text style={styles.statusText}>
//             {(item.Status || 'ACTIVE').toUpperCase()}
//           </Text>
//         </View>
//       </View>

//       <View style={styles.cardContent}>
//         <Image
//           source={{
//             uri:
//               item?.Campaign?.Assets ||
//               item?.Assets ||
//               'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop',
//           }}
//           style={styles.foodImage}
//         />
//         <View style={styles.cardDetails}>
//           <Text style={styles.foodTitle} numberOfLines={2}>
//             {item?.Campaign?.Title || item?.Title || 'Campaign Title'}
//           </Text>
//           <Text style={styles.foodSubtitle} numberOfLines={1}>
//             {item?.Campaign?.Category || item?.Category || 'General'}
//           </Text>
//         </View>
//       </View>
//       {item.Status == 'Pending' && (
//         <TouchableOpacity
//           style={{
//             alignSelf: 'flex-end',
//             backgroundColor: App_Primary_color,
//             padding: 4,
//             borderRadius: 4,
//           }}
//           onPress={() => {
//             setCollaborationId(item._id)
//             setShowModal(true)
//           }}>
//           <CustomText
//             style={{
//               color: 'white',
//               fontSize: 12,
//               fontFamily: FONTS_FAMILY.Poppins_Medium,
//             }}>
//             Reschedule
//           </CustomText>
//         </TouchableOpacity>
//       )}
//     </TouchableOpacity>
//   )

//   const handleSearch = text => {
//     setSearchText(text)
//     // filterCampaigns will be called automatically through useEffect
//   }

//   const handleCategorySelect = category => {
//     setSelectedCategory(category)
//     // filterCampaigns will be called automatically through useEffect
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor={App_Primary_color} barStyle='light-content' />

//       <View style={styles.header}>
//         <View style={styles.headerLeft}>
//           <Icon name='search' size={20} color='#fff' style={{bottom: 3}} />
//           <TextInput
//             style={styles.searchInput}
//             placeholder='Search campaigns...'
//             placeholderTextColor={'#fff'}
//             value={searchText}
//             onChangeText={handleSearch}
//           />
//         </View>
//         <View style={styles.categoryContainer}>
//           <View style={styles.categoryRow}>
//             {categories.map((category, index) => (
//               <CategoryButton
//                 key={index}
//                 title={category}
//                 isSelected={selectedCategory === category}
//                 onPress={() => handleCategorySelect(category)}
//               />
//             ))}
//           </View>
//         </View>
//       </View>

//       {/* Campaigns List */}
//       <ScrollView
//         style={styles.contentContainer}
//         showsVerticalScrollIndicator={false}>
//         <View style={styles.listContainer}>
//           {filteredCampaigns.length > 0 ? (
//             filteredCampaigns.map((item, index) => (
//               <View key={item._id || index} style={styles.listItem}>
//                 <CampaignCard item={item} index={index} />
//               </View>
//             ))
//           ) : (
//             <View style={styles.emptyContainer}>
//               <Text style={styles.emptyText}>
//                 {searchText.trim()
//                   ? `No campaigns found matching "${searchText}"`
//                   : `No ${selectedCategory.toLowerCase()} campaigns found`}
//               </Text>
//             </View>
//           )}
//         </View>
//         <RescheduleModal
//           visible={showModal}
//           onClose={() => setShowModal(false)}
//           collaborationId={collaborationId}
//           // onSubmit={(collaborationId, )=>handleSubmit()}
//           onSubmit={(collaborationId, data) =>
//             handleSubmit(collaborationId, data)
//           }
//         />
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// export default InfluencerBookingList

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     backgroundColor: App_Primary_color,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
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
//     width: '100%',
//   },
//   searchInput: {
//     flex: 1,
//     color: '#fff',
//     marginLeft: 8,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     paddingVertical: 8,
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
//     fontSize: 12,
//     color: '#666',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   statusBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 10,
//   },
//   statusText: {
//     color: 'white',
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
//   emptyContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 50,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: '#666',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     textAlign: 'center',
//   },
// })


import React, {useState, useEffect} from 'react'
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
import color, {App_Primary_color, darkMode25, darkOfPrimary} from '../../../common/Colors/colors'
import {apiGet, apiPut} from '../../../utils/Apis'
import urls from '../../../config/urls'
import useLoader from '../../../utils/LoaderHook'
import CustomText from '../../../components/TextComponent'
import RescheduleModal from './RescheduleModel'
import { ToastMsg } from '../../../utils/helperFunctions'
import moment from 'moment'
import Row from '../../../components/wrapper/row'
import {CalendarIcon} from '../../../assets/SVGs'
import { useSelector } from 'react-redux'

const InfluencerBookingList = ({navigation}) => {
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [allCampaigns, setAllCampaigns] = useState([])
  const [filteredCampaigns, setFilteredCampaigns] = useState([])
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(moment())

  const categories = ['All', 'Past', 'Upcoming']
  const [showModal, setShowModal] = useState(false)
  const {showLoader, hideLoader} = useLoader()
  const [collaborationId, setCollaborationId] = useState(null)

  useEffect(() => {
    getAllCampaigns()
  }, [])

  useEffect(() => {
    filterCampaigns()
  }, [selectedCategory, searchText, allCampaigns, selectedDate])

  const getAllCampaigns = async () => {
    try {
      showLoader()
      let allData = []

      const allRes = await apiGet(urls?.AllCollabrationReqInfluencer)
      if (allRes?.data && Array.isArray(allRes.data)) {
        const activeCampaigns = allRes.data.map(campaign => ({
          ...campaign,
          Status: campaign.Status || 'Active',
        }))
        allData = [...activeCampaigns]
      }

      // Get completed campaigns
      const completedRes = await apiGet(
        urls?.completedCollabrationReqInfluencer,
      )
      if (completedRes?.data && Array.isArray(completedRes.data)) {
        const completedCampaigns = completedRes.data.map(campaign => ({
          ...campaign,
          Status: 'Completed',
        }))
        allData = [...allData, ...completedCampaigns]
      }

      // Get cancelled campaigns
      const cancelledRes = await apiGet(
        urls?.cancelledCollabrationReqInfluencer,
      )
      if (cancelledRes?.data && Array.isArray(cancelledRes.data)) {
        const cancelledCampaigns = cancelledRes.data.map(campaign => ({
          ...campaign,
          Status: 'Cancelled',
        }))
        allData = [...allData, ...cancelledCampaigns]
      }

      // Remove duplicates based on _id if any exist and filter out rejected campaigns
      const uniqueCampaigns = allData.filter(
        (campaign, index, self) =>
          index === self.findIndex(c => c._id === campaign._id) &&
          campaign.Status?.toLowerCase() !== 'rejected'
      )

      setAllCampaigns(uniqueCampaigns)
      hideLoader()
    } catch (error) {
      console.log('Error fetching campaigns:', error)
      hideLoader()
    }
  }

  const handleSubmit =async (collaborationId, data) => {
    console.log('Collaboration ID:', collaborationId, 'Data:', data)
    try {
      showLoader()
      const res = await apiPut(
        `/api/influencer/InfluencerrescheduleCollbractionRequest/${collaborationId}`,
        data,
      )
      console.log(res,'RES:::::::::');
      
        getAllCampaigns()
        ToastMsg(res?.message || 'Collaboration rescheduled successfully')
      hideLoader()
      setShowModal(false)
    } catch (error) {
      hideLoader()
    }
  }

  const filterCampaigns = () => {
    let filtered = []
    const today = moment().startOf('day')

    // First filter by category based on date
    switch (selectedCategory) {
      case 'All':
        filtered = [...allCampaigns]
        break
      case 'Past':
        filtered = allCampaigns.filter(campaign => {
          const campaignDate = moment(campaign.createdAt || campaign.scheduledDate).startOf('day')
          return campaignDate.isBefore(today)
        })
        break
      case 'Upcoming':
        filtered = allCampaigns.filter(campaign => {
          const campaignDate = moment(campaign.createdAt || campaign.scheduledDate).startOf('day')
          return campaignDate.isSameOrAfter(today)
        })
        break
      default:
        filtered = [...allCampaigns]
    }

    // Filter by selected calendar date
    if (selectedDate) {
      filtered = filtered.filter(campaign => {
        const campaignDate = moment(campaign.createdAt || campaign.scheduledDate).format('YYYY-MM-DD')
        return campaignDate === selectedDate
      })
    }

    // Then apply search filter if searchText exists
    if (searchText.trim()) {
      filtered = filtered.filter(campaign => {
        const title = campaign?.Campaign?.Title || campaign?.Title || ''
        const category =
          campaign?.Campaign?.Category || campaign?.Category || ''
        const description =
          campaign?.Campaign?.Description || campaign?.Description || ''

        const searchLower = searchText.toLowerCase()
        return (
          title.toLowerCase().includes(searchLower) ||
          category.toLowerCase().includes(searchLower) ||
          description.toLowerCase().includes(searchLower)
        )
      })
    }

    setFilteredCampaigns(filtered)
  }

  const getStatusColor = status => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return '#4CAF50' // Green for completed
      case 'cancelled':
        return '#F44336' // Red for cancelled
      case 'active':
        return '#3170FA' // Blue for active
      case 'pending':
        return '#FF9800' // Orange for pending
      default:
        return '#666'
    }
  }

  const formatDate = dateString => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch (error) {
      return 'Invalid Date'
    }
  }

  const toggleCalendar = () => {
    setIsCalendarExpanded(!isCalendarExpanded)
  }

  const closeCalendar = () => {
    setIsCalendarExpanded(false)
  }

  const generateCalendarDays = () => {
    const startOfMonth = moment(currentMonth).startOf('month')
    const endOfMonth = moment(currentMonth).endOf('month')
    const startDate = moment(startOfMonth).startOf('week')
    const endDate = moment(endOfMonth).endOf('week')

    const days = []
    const current = moment(startDate)

    while (current.isSameOrBefore(endDate)) {
      days.push(moment(current))
      current.add(1, 'day')
    }

    return days
  }

  const selectDate = date => {
    const dateString = date.format('YYYY-MM-DD')
    setSelectedDate(selectedDate === dateString ? null : dateString)
  }

  const goToNextMonth = () => {
    setCurrentMonth(moment(currentMonth).add(1, 'month'))
  }

  const goToPrevMonth = () => {
    setCurrentMonth(moment(currentMonth).subtract(1, 'month'))
  }

  const renderCalendar = () => {
    const days = generateCalendarDays()
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    return (
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity
            onPress={goToPrevMonth}
            style={styles.monthNavButton}>
            <Text style={styles.monthNavText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.monthYearText}>
            {currentMonth.format('MMMM YYYY')}
          </Text>

          <TouchableOpacity
            onPress={goToNextMonth}
            style={styles.monthNavButton}>
            <Text style={styles.monthNavText}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.weekDaysRow}>
          {weekDays.map(day => (
            <Text key={day} style={styles.weekDayText}>
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.daysGrid}>
          {days.map((day, index) => {
            const isCurrentMonth = day.isSame(currentMonth, 'month')
            const isSelected = selectedDate === day.format('YYYY-MM-DD')
            const isToday = day.isSame(moment(), 'day')

            return (
              <TouchableOpacity
                key={index}
                onPress={() => selectDate(day)}
                style={[
                  styles.dayButton,
                  isSelected && styles.selectedDay,
                  isToday && !isSelected && styles.todayDay,
                ]}>
                <Text
                  style={[
                    styles.dayText,
                    !isCurrentMonth && styles.otherMonthDay,
                    isSelected && styles.selectedDayText,
                    isToday && !isSelected && styles.todayDayText,
                  ]}>
                  {day.format('D')}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    )
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
      style={styles.foodCard}
      // onPress={() =>
      //   navigation.navigate('BrandOfferDetail', {campaignId: item?._id})
      // }
      >
      <View style={styles.cardHeader}>
        <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>
        <View
          style={[
            styles.statusBadge,
            {backgroundColor: getStatusColor(item.Status)},
          ]}>
          <Text style={styles.statusText}>
            {(item.Status || 'ACTIVE').toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <Image
          source={{
            uri:
              item?.Campaign?.Assets ||
              item?.Assets ||
              'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop',
          }}
          style={styles.foodImage}
        />
        <View style={styles.cardDetails}>
          <Text style={styles.foodTitle} numberOfLines={2}>
            {item?.Campaign?.Title || item?.Title || 'Campaign Title'}
          </Text>
          <Text style={styles.foodSubtitle} numberOfLines={1}>
            {item?.Campaign?.Category || item?.Category || 'General'}
          </Text>
        </View>
      </View>
      {item.Status == 'Pending' && (
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            backgroundColor: App_Primary_color,
            padding: 4,
            borderRadius: 4,
          }}
          onPress={() => {
            setCollaborationId(item._id)
            setShowModal(true)
          }}>
          <CustomText
            style={{
              color: 'white',
              fontSize: 12,
              fontFamily: FONTS_FAMILY.Poppins_Medium,
            }}>
            Reschedule
          </CustomText>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )

  const handleSearch = text => {
    setSearchText(text)
  }

  const handleCategorySelect = category => {
    setSelectedCategory(category)
  }

    const {isDarkMode} = useSelector(state => state.theme)

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? darkMode25 : '#f5f5f5',
  },
  header: {
    backgroundColor: App_Primary_color,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF26',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    marginLeft: 8,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    paddingVertical: 8,
  },
  calendarButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoryContainer: {
    alignSelf: 'flex-start',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  categoryButton: {
    backgroundColor: isDarkMode ? '#555' : '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  selectedCategoryButton: {
    backgroundColor: '#8f565f',
  },
  categoryText: {
    fontSize: 13,
    color: isDarkMode ? '#ccc' : '#666',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  selectedCategoryText: {
    color: '#fff',
  },
  clearDateButton: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  clearDateText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  // Calendar Styles
  calendarContainer: {
    backgroundColor: isDarkMode ? '#333' : 'white',
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthNavButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: isDarkMode ? '#555' : '#f0f0f0',
  },
  monthNavText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? 'white' : '#333',
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? 'white' : '#333',
  },
  weekDaysRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: isDarkMode ? '#aaa' : '#666',
    paddingVertical: 4,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayButton: {
    width: '14.28%', // 100% / 7 days
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  dayText: {
    fontSize: 14,
    color: isDarkMode ? 'white' : '#333',
  },
  otherMonthDay: {
    color: isDarkMode ? '#666' : '#ccc',
  },
  selectedDay: {
    backgroundColor: darkOfPrimary,
    borderRadius: 20,
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  todayDay: {
    backgroundColor: isDarkMode ? '#555' : '#e0e0e0',
    borderRadius: 20,
  },
  todayDayText: {
    fontWeight: 'bold',
    color: darkOfPrimary,
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
    backgroundColor: isDarkMode ? '#333' : 'white',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: isDarkMode ? 0.3 : 0.1,
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
    fontSize: 12,
    color: isDarkMode ? '#aaa' : '#666',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    color: 'white',
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
    color: isDarkMode ? '#ccc' : '#666',
    fontSize: 12,
    marginBottom: 4,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: isDarkMode ? '#aaa' : '#666',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    textAlign: 'center',
  },
})

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={App_Primary_color} barStyle='light-content' />

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Icon name='search' size={20} color='#fff' style={{bottom: 3}} />
            <TextInput
              style={styles.searchInput}
              placeholder='Search campaigns...'
              placeholderTextColor={'#fff'}
              value={searchText}
              onChangeText={handleSearch}
            />
          </View>
          <TouchableOpacity onPress={toggleCalendar} style={styles.calendarButton}>
            {isCalendarExpanded ? (
              <Text style={styles.closeButtonText}>✕</Text>
            ) : (
              <CalendarIcon />
            )}
          </TouchableOpacity>
        </View>
        
        <View style={styles.categoryContainer}>
          <View style={styles.categoryRow}>
            {categories.map((category, index) => (
              <CategoryButton
                key={index}
                title={category}
                isSelected={selectedCategory === category}
                onPress={() => handleCategorySelect(category)}
              />
            ))}
            {selectedDate && (
              <TouchableOpacity
                style={styles.clearDateButton}
                onPress={() => setSelectedDate(null)}>
                <Text style={styles.clearDateText}>Clear Date</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Expandable Calendar */}
        {isCalendarExpanded && renderCalendar()}
      </View>

      {/* Campaigns List */}
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((item, index) => (
              <View key={item._id || index} style={styles.listItem}>
                <CampaignCard item={item} index={index} />
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {searchText.trim() || selectedDate
                  ? `No campaigns found matching your filters`
                  : `No ${selectedCategory.toLowerCase()} campaigns found`}
              </Text>
            </View>
          )}
        </View>
        <RescheduleModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          collaborationId={collaborationId}
          onSubmit={(collaborationId, data) =>
            handleSubmit(collaborationId, data)
          }
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default InfluencerBookingList

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     backgroundColor: App_Primary_color,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   headerTop: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   headerLeft: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF26',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     color: '#fff',
//     marginLeft: 8,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     paddingVertical: 8,
//   },
//   calendarButton: {
//     width: 32,
//     height: 32,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   categoryContainer: {
//     alignSelf: 'flex-start',
//   },
//   categoryRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//   },
//   categoryButton: {
//     backgroundColor: '#f0f0f0',
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 4,
//     marginRight: 8,
//     marginBottom: 4,
//   },
//   selectedCategoryButton: {
//     backgroundColor: '#8f565f',
//   },
//   categoryText: {
//     fontSize: 13,
//     color: '#666',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   selectedCategoryText: {
//     color: '#fff',
//   },
//   clearDateButton: {
//     backgroundColor: '#FF9800',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 4,
//     marginRight: 8,
//     marginBottom: 4,
//   },
//   clearDateText: {
//     fontSize: 12,
//     color: '#fff',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   // Calendar Styles
//   calendarContainer: {
//     backgroundColor: 'white',
//     marginTop: 16,
//     borderRadius: 12,
//     padding: 16,
//   },
//   calendarHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   monthNavButton: {
//     width: 32,
//     height: 32,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 16,
//     backgroundColor: '#f0f0f0',
//   },
//   monthNavText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   monthYearText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   weekDaysRow: {
//     flexDirection: 'row',
//     marginBottom: 8,
//   },
//   weekDayText: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#666',
//     paddingVertical: 4,
//   },
//   daysGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   dayButton: {
//     width: '14.28%', // 100% / 7 days
//     aspectRatio: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 2,
//   },
//   dayText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   otherMonthDay: {
//     color: '#ccc',
//   },
//   selectedDay: {
//     backgroundColor: darkOfPrimary,
//     borderRadius: 20,
//   },
//   selectedDayText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   todayDay: {
//     backgroundColor: '#e0e0e0',
//     borderRadius: 20,
//   },
//   todayDayText: {
//     fontWeight: 'bold',
//     color: darkOfPrimary,
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
//     fontSize: 12,
//     color: '#666',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   statusBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 10,
//   },
//   statusText: {
//     color: 'white',
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
//   emptyContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 50,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: '#666',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     textAlign: 'center',
//   },
// })