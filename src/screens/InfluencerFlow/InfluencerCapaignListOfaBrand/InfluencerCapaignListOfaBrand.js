// import React, {useEffect, useState} from 'react'
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   TouchableOpacity,
//   FlatList,
//   Image,
//   ImageBackground,
// } from 'react-native'
// import {
//   BackArrow,
//   CalendarIcon,
//   EditIcon,
//   SearchIcons,
//   SearchWhite,
//   ThreeDots,
// } from '../../../assets/SVGs'
// import {FONTS_FAMILY} from '../../../assets/Fonts'
// import useLoader from '../../../utils/LoaderHook'
// import {apiGet} from '../../../utils/Apis'
// import urls from '../../../config/urls'
// import moment from 'moment'
// import Row from '../../../components/wrapper/row'

// const InfluencerCapaignListOfaBrand = ({navigation, route}) => {
//   const [isCampModalVisible, setIsCampModalVisible] = useState(false)
//   const [selectedCampaignType, setSelectedCampaignType] = useState('')
//   const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false)
//   const [selectedDateTime, setSelectedDateTime] = useState(null)
//   const [campaigns, setCampaigns] = useState([])
//   const {showLoader, hideLoader} = useLoader()

//   console.log()

//   useEffect(() => {
//     getAllCampaignsOfAbrand()
//   }, [])

//   const getAllCampaignsOfAbrand = async () => {
//     try {
//       showLoader()
//       const res = await apiGet(
//         `${urls?.getAllCampaignsOfABrandInfluencer}/${route?.params?.id}`,
//       )
//       setCampaigns(res?.data)
//       console.log(res?.data, '++++++++++++++++==')

//       hideLoader()
//     } catch (error) {
//       console.log('Error')
//       hideLoader()
//     }
//   }

//   const handleNext = () => {
//     setIsCampModalVisible(false)
//     setIsCalendarModalVisible(true)
//   }

//   const OfferCard = ({offer}) => (
//     <TouchableOpacity
//       style={styles.offerCard}
//       onPress={() =>
//         navigation.navigate('InfluencerCampaignDetail', {
//           brandId: offer?.Brand,
//           campaignId: offer?._id,
//         })
//       }>
//       <View style={styles.offerImageContainer}>
//         <Image source={{uri: offer.Assets}} style={styles.offerImage} />
//       </View>
//       <View style={styles.offerContent}>
//         <View style={styles.dateTimeContainer}>
//           <View style={styles.dateDot} />
//           <Text style={styles.dateText}>
//             {moment(offer.createdAt).format('DD-MMM-YYYY')}
//           </Text>
//           <Text style={styles.timeText}>{offer.time}</Text>
//         </View>
//         <Text style={styles.offerTitle}>{offer.Title}</Text>
//         <Text style={styles.offerCategory}>{offer.Category}</Text>
//         <Text style={styles.offerLocation}>{offer.location}</Text>
//       </View>
//     </TouchableOpacity>
//   )

//   const EmptyListComponent = () => (
//     <View style={styles.emptyContainer}>
//       <View style={styles.emptyIconContainer}>
//         <Text style={styles.emptyIcon}>📋</Text>
//       </View>
//       <Text style={styles.emptyTitle}>No Campaigns Found</Text>
//       <Text style={styles.emptyDescription}>
//         There are currently no campaigns available for this brand.
//       </Text>
//       <TouchableOpacity
//         style={styles.refreshButton}
//         onPress={getAllCampaignsOfAbrand}>
//         <Text style={styles.refreshButtonText}>Refresh</Text>
//       </TouchableOpacity>
//     </View>
//   )

//   const renderOfferCard = ({item, index}) => <OfferCard offer={item} />

//   const keyExtractor = (item, index) => {
//     return item?._id?.toString() || item?.id?.toString() || index.toString()
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor='#D64A3A' barStyle='light-content' />

//       {/* Header */}
//       <View style={styles.header}>
//         <Row style={{gap: 20, alignItems: 'center'}}>
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => navigation.goBack()}>
//             <BackArrow />
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Text style={styles.backButtonText}>Campaigns</Text>
//           </TouchableOpacity>
//         </Row>
//         <Row style={{gap: 20}}>
//           <TouchableOpacity>
//             <SearchWhite />
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <CalendarIcon />
//           </TouchableOpacity>
//         </Row>

//       </View>

//       <FlatList
//         data={campaigns}
//         renderItem={renderOfferCard}
//         keyExtractor={keyExtractor}
//         contentContainerStyle={[
//           styles.flatListContainer,
//           campaigns.length === 0 && styles.emptyContentContainer,
//         ]}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={EmptyListComponent}
//         ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
//         style={styles.content}
//       />
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
//     // height: 64,
//     gap: 30,
//   },
//   backButton: {
//     width: 32,
//     height: 32,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   backButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
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
//     marginTop: 20,
//   },
//   flatListContainer: {
//     paddingHorizontal: 16,
//     paddingBottom: 20,
//   },
//   emptyContentContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   itemSeparator: {
//     height: 12,
//   },
//   // Empty state styles
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 40,
//     paddingVertical: 60,
//   },
//   emptyIconContainer: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: '#FFFFFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 24,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   emptyIcon: {
//     fontSize: 32,
//   },
//   emptyTitle: {
//     fontSize: 20,
//     fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//     color: '#333',
//     marginBottom: 12,
//     textAlign: 'center',
//   },
//   emptyDescription: {
//     fontSize: 14,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     color: '#666',
//     textAlign: 'center',
//     lineHeight: 20,
//     marginBottom: 32,
//   },
//   refreshButton: {
//     backgroundColor: '#D64A3A',
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   refreshButtonText: {
//     color: 'white',
//     fontSize: 14,
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   // Existing offer card styles
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
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
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
// })

// export default InfluencerCapaignListOfaBrand


import React, {useEffect, useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Animated,
} from 'react-native'
import {
  BackArrow,
  CalendarIcon,
  EditIcon,
  SearchIcons,
  SearchWhite,
  ThreeDots,
} from '../../../assets/SVGs'
import {FONTS_FAMILY} from '../../../assets/Fonts'
import useLoader from '../../../utils/LoaderHook'
import {apiGet} from '../../../utils/Apis'
import urls from '../../../config/urls'
import moment from 'moment'
import Row from '../../../components/wrapper/row'

const InfluencerCapaignListOfaBrand = ({navigation, route}) => {
  const [isCampModalVisible, setIsCampModalVisible] = useState(false)
  const [selectedCampaignType, setSelectedCampaignType] = useState('')
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false)
  const [selectedDateTime, setSelectedDateTime] = useState(null)
  const [campaigns, setCampaigns] = useState([])
  const [filteredCampaigns, setFilteredCampaigns] = useState([])
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(moment())
  const {showLoader, hideLoader} = useLoader()

  console.log()

  useEffect(() => {
    getAllCampaignsOfAbrand()
  }, [])

  useEffect(() => {
    filterCampaigns()
  }, [campaigns, searchText, selectedDate])

  const getAllCampaignsOfAbrand = async () => {
    try {
      showLoader()
      const res = await apiGet(
        `${urls?.getAllCampaignsOfABrandInfluencer}/${route?.params?.id}`,
      )
      setCampaigns(res?.data)
      setFilteredCampaigns(res?.data)
      console.log(res?.data, '++++++++++++++++==')

      hideLoader()
    } catch (error) {
      console.log('Error')
      hideLoader()
    }
  }

  const filterCampaigns = () => {
    let filtered = campaigns

    // Filter by search text (title)
    if (searchText) {
      filtered = filtered.filter(campaign =>
        campaign.Title?.toLowerCase().includes(searchText.toLowerCase())
      )
    }

    // Filter by selected date
    if (selectedDate) {
      filtered = filtered.filter(campaign =>
        moment(campaign.createdAt).format('YYYY-MM-DD') === selectedDate
      )
    }

    setFilteredCampaigns(filtered)
  }

  const handleNext = () => {
    setIsCampModalVisible(false)
    setIsCalendarModalVisible(true)
  }

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded)
    if (isCalendarExpanded) {
      setIsCalendarExpanded(false)
    }
    if (!isSearchExpanded) {
      setSearchText('')
    }
  }

  const toggleCalendar = () => {
    setIsCalendarExpanded(!isCalendarExpanded)
    if (isSearchExpanded) {
      setIsSearchExpanded(false)
    }
  }

  const closeAll = () => {
    setIsSearchExpanded(false)
    setIsCalendarExpanded(false)
    setSearchText('')
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

  const isDateDisabled = (date) => {
    return date.isBefore(moment(), 'day')
  }

  const selectDate = (date) => {
    if (!isDateDisabled(date)) {
      const dateString = date.format('YYYY-MM-DD')
      setSelectedDate(selectedDate === dateString ? null : dateString)
    }
  }

  const goToNextMonth = () => {
    const nextMonth = moment(currentMonth).add(1, 'month')
    if (nextMonth.isSameOrAfter(moment(), 'month')) {
      setCurrentMonth(nextMonth)
    }
  }

  const goToPrevMonth = () => {
    const prevMonth = moment(currentMonth).subtract(1, 'month')
    if (prevMonth.isSameOrAfter(moment(), 'month')) {
      setCurrentMonth(prevMonth)
    }
  }

  const OfferCard = ({offer}) => (
    <TouchableOpacity
      style={styles.offerCard}
      onPress={() =>
        navigation.navigate('InfluencerCampaignDetail', {
          brandId: offer?.Brand,
          campaignId: offer?._id,
        })
      }>
  {/* {console.log(offer, '++++++++++++++++==')} */}

      <View style={styles.offerImageContainer}>
        <Image source={{uri: offer.Assets}} style={styles.offerImage} />
      </View>
      <View style={styles.offerContent}>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateDot} />
          <Text style={styles.dateText}>
            {moment(offer.createdAt).format('DD-MMM-YYYY')}
          </Text>
          <Text style={styles.timeText}>{offer.time}</Text>
        </View>
        <Text style={styles.offerTitle}>{offer.Title}</Text>
        <Text style={styles.offerCategory}>{offer.Category}</Text>
        <Text style={styles.offerLocation}>{offer.location}</Text>
      </View>
    </TouchableOpacity>
  )

  const EmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Text style={styles.emptyIcon}>📋</Text>
      </View>
      <Text style={styles.emptyTitle}>No Campaigns Found</Text>
      <Text style={styles.emptyDescription}>
        {searchText || selectedDate 
          ? "No campaigns match your current filters." 
          : "There are currently no campaigns available for this brand."
        }
      </Text>
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={() => {
          if (searchText || selectedDate) {
            setSearchText('')
            setSelectedDate(null)
          } else {
            getAllCampaignsOfAbrand()
          }
        }}>
        <Text style={styles.refreshButtonText}>
          {searchText || selectedDate ? "Clear Filters" : "Refresh"}
        </Text>
      </TouchableOpacity>
    </View>
  )

  const renderCalendar = () => {
    const days = generateCalendarDays()
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    return (
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity 
            onPress={goToPrevMonth}
            disabled={!moment(currentMonth).subtract(1, 'month').isSameOrAfter(moment(), 'month')}
            style={[
              styles.monthNavButton,
              !moment(currentMonth).subtract(1, 'month').isSameOrAfter(moment(), 'month') && styles.disabledButton
            ]}>
            <Text style={[
              styles.monthNavText,
              !moment(currentMonth).subtract(1, 'month').isSameOrAfter(moment(), 'month') && styles.disabledText
            ]}>‹</Text>
          </TouchableOpacity>
          
          <Text style={styles.monthYearText}>
            {currentMonth.format('MMMM YYYY')}
          </Text>
          
          <TouchableOpacity onPress={goToNextMonth} style={styles.monthNavButton}>
            <Text style={styles.monthNavText}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.weekDaysRow}>
          {weekDays.map((day) => (
            <Text key={day} style={styles.weekDayText}>{day}</Text>
          ))}
        </View>

        <View style={styles.daysGrid}>
          {days.map((day, index) => {
            const isCurrentMonth = day.isSame(currentMonth, 'month')
            const isSelected = selectedDate === day.format('YYYY-MM-DD')
            const isDisabled = isDateDisabled(day)
            const isToday = day.isSame(moment(), 'day')

            return (
              <TouchableOpacity
                key={index}
                onPress={() => selectDate(day)}
                disabled={isDisabled}
                style={[
                  styles.dayButton,
                  isSelected && styles.selectedDay,
                  isToday && !isSelected && styles.todayDay,
                  isDisabled && styles.disabledDay,
                ]}>
                <Text style={[
                  styles.dayText,
                  !isCurrentMonth && styles.otherMonthDay,
                  isSelected && styles.selectedDayText,
                  isDisabled && styles.disabledDayText,
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

  const renderOfferCard = ({item, index}) => <OfferCard offer={item} />

  const keyExtractor = (item, index) => {
    return item?._id?.toString() || item?.id?.toString() || index.toString()
  }

  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#D64A3A' barStyle='light-content' />

      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Row style={{gap: 20, alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <BackArrow />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.backButtonText}>Campaigns</Text>
            </TouchableOpacity>
          </Row>
          <Row style={{gap: 20}}>
            {(isSearchExpanded || isCalendarExpanded) ? (
              <TouchableOpacity onPress={closeAll} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity onPress={toggleSearch}>
                  <SearchWhite />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleCalendar}>
                  <CalendarIcon />
                </TouchableOpacity>
              </>
            )}
          </Row>
        </View>

        {/* Expandable Search Bar */}
        {isSearchExpanded && (
          <View style={styles.searchExpandedContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search campaigns by title..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
              autoFocus
            />
          </View>
        )}

        {/* Expandable Calendar */}
        {isCalendarExpanded && renderCalendar()}
      </View>

      <FlatList
        data={filteredCampaigns}
        renderItem={renderOfferCard}
        keyExtractor={keyExtractor}
        contentContainerStyle={[
          styles.flatListContainer,
          filteredCampaigns.length === 0 && styles.emptyContentContainer,
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyListComponent}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        style={styles.content}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    backgroundColor: '#D64A3A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 30,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  closeButton: {
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
  // Search Expanded Styles
  searchExpandedContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  // Calendar Styles
  calendarContainer: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 16,
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
    backgroundColor: '#f0f0f0',
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
  },
  monthNavText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  disabledText: {
    color: '#ccc',
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
    color: '#666',
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
    color: '#333',
  },
  otherMonthDay: {
    color: '#ccc',
  },
  selectedDay: {
    backgroundColor: '#D64A3A',
    borderRadius: 20,
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  todayDay: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
  },
  todayDayText: {
    fontWeight: 'bold',
    color: '#D64A3A',
  },
  disabledDay: {
    opacity: 0.3,
  },
  disabledDayText: {
    color: '#ccc',
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
    marginTop: 20,
  },
  flatListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  emptyContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemSeparator: {
    height: 12,
  },
  // Empty state styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
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
    fontSize: 20,
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
  refreshButton: {
    backgroundColor: '#D64A3A',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  // Existing offer card styles
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
    fontFamily: FONTS_FAMILY.Poppins_Medium,
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

export default InfluencerCapaignListOfaBrand