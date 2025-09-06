// import React, {useEffect, useState} from 'react'
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
// } from 'react-native'
// import Icon from 'react-native-vector-icons/Ionicons'
// import {FONTS_FAMILY} from '../../assets/Fonts'
// import color, {App_Primary_color} from '../../common/Colors/colors'
// import CustomText from '../../components/TextComponent'
// import useLoader from '../../utils/LoaderHook'
// import {apiGet} from '../../utils/Apis'
// import urls from '../../config/urls'

// const InfluencersScreen = ({navigation}) => {
//   const [allInfluencers, setAllInfluencers] = useState([])
//   const [activeTab, setActiveTab] = useState('All')
//   const {showLoader, hideLoader} = useLoader()

//   useEffect(() => {
//     getAllInfluencers()
//   }, [])

//   const getAllInfluencers = async () => {
//     try {
//       showLoader()
//       const res = await apiGet('/api/brand/GetCollaborationAttendanceList')

//       setAllInfluencers(res?.data)
//       hideLoader()
//     } catch (error) {
//       console.log('Error')
//       hideLoader()
//     }
//   }

//   const tabs = ['All', 'Active', 'Completed']

//   const TabButton = ({title, isActive, onPress}) => (
//     <TouchableOpacity
//       style={[styles.tabButton, isActive && styles.activeTabButton]}
//       onPress={onPress}>
//       <Text style={[styles.tabText, isActive && styles.activeTabText]}>
//         {title}
//       </Text>
//     </TouchableOpacity>
//   )

//   const FilterDropdown = ({title}) => (
//     <TouchableOpacity style={styles.filterDropdown}>
//       <Text style={styles.filterText}>{title}</Text>
//       <Icon name="chevron-down" size={16} color="#333" />
//     </TouchableOpacity>
//   )

//   const InfluencerCard = ({item}) => (
//     <TouchableOpacity style={styles.influencerCard}>
//       <View style={styles.imageContainer}>
//         <Image
//           source={{
//             uri: item.Image
//               ? item.Image
//               : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face',
//           }}
//           style={styles.profileImage}
//         />
//       </View>

//       <View style={styles.cardContent}>
//         <Text style={styles.influencerName} numberOfLines={1}>
//           {item.FirstName}
//           {item?.LastName}
//         </Text>
//         <Text style={styles.influencerCategory} numberOfLines={2}>
//           {item.NicheInput}
//         </Text>
//         <View
//           style={{
//             backgroundColor: '#00CD52',
//             padding: 4,
//             borderRadius: 19,
//             paddingHorizontal: 10,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <CustomText
//             style={{
//               fontFamily: FONTS_FAMILY.Poppins_Regular,
//               color: 'white',
//               fontSize: 10
//             }}>
//             ACTIVE
//           </CustomText>
//         </View>
//       </View>
//     </TouchableOpacity>
//   )

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}>
//           <Icon name='chevron-back' size={24} color='#fff' />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Influencers</Text>
//       </View>

//       {/* Tabs Section */}
//       <View style={styles.tabsContainer}>
//         <ScrollView 
//           horizontal 
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.tabsScrollContainer}>
//           {tabs.map((tab) => (
//             <TabButton
//               key={tab}
//               title={tab}
//               isActive={activeTab === tab}
//               onPress={() => setActiveTab(tab)}
//             />
//           ))}
//         </ScrollView>
//       </View>

//       {/* Filters Section */}
//       <View style={styles.filtersContainer}>
//         <FilterDropdown title="Date" />
//         <FilterDropdown title="Campaign" />
//       </View>

//       {/* Influencers Grid */}
//       <ScrollView
//         style={styles.contentContainer}
//         showsVerticalScrollIndicator={false}>
//         <View style={styles.gridContainer}>
//           {allInfluencers.map(item => (
//             <View key={item.id} style={styles.gridItem}>
//               <InfluencerCard item={item} />
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     backgroundColor: App_Primary_color,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 18,
//     paddingTop: 40,
//     gap: 90,
//   },
//   backButton: {
//     marginRight: 12,
//   },
//   headerTitle: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   // Tabs Styles
//   tabsContainer: {
//     backgroundColor: App_Primary_color,
//     paddingHorizontal: 16,
//     paddingBottom: 16,
//   },
//   tabsScrollContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   tabButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 6,
//     marginRight: 12,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//   },
//   activeTabButton: {
//     backgroundColor: '#fff',
//   },
//   tabText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: '500',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   activeTabText: {
//     color: 'black',
//   },
//   // Filters Styles
//   filtersContainer: {
//     // backgroundColor: '#fff',
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     // borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   filterDropdown: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     marginRight: 16,
//     backgroundColor: '#f8f8f8',
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   filterText: {
//     fontSize: 14,
//     color: '#333',
//     marginRight: 8,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   contentContainer: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   gridContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     paddingBottom: 20,
//   },
//   gridItem: {
//     width: '48%',
//     marginBottom: 16,
//   },
//   influencerCard: {
//     backgroundColor: 'white',
//     borderRadius: 7,
//     padding: 16,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 1,
//         shadowOpacity: 0.12,
//     shadowRadius: 8,
//     elevation: 6,
//     borderWidth: 0.5,
//     borderColor: 'rgba(0,0,0,0.05)',
//     marginBottom:5
//   },
//   imageContainer: {
//     position: 'relative',
//     marginBottom: 12,
//   },
//   profileImage: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//   },
//   verifiedBadge: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     backgroundColor: '#4CAF50',
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 2,
//     borderColor: 'white',
//   },
//   cardContent: {
//     alignItems: 'center',
//     width: '100%',
//   },
//   influencerName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 4,
//     textAlign: 'center',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   influencerCategory: {
//     fontSize: 12,
//     color: '#666',
//     marginBottom: 8,
//     textAlign: 'center',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//   },
//   starsContainer: {
//     flexDirection: 'row',
//     marginRight: 4,
//   },
//   ratingText: {
//     fontSize: 12,
//     color: '#333',
//     fontWeight: '600',
//     marginRight: 2,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   reviewsText: {
//     fontSize: 12,
//     color: '#666',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
// })

// export default InfluencersScreen

import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  FlatList,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { FONTS_FAMILY } from '../../assets/Fonts'
import color, { App_Primary_color, darkMode25 } from '../../common/Colors/colors'
import CustomText from '../../components/TextComponent'
import useLoader from '../../utils/LoaderHook'
import { apiGet, getItem } from '../../utils/Apis'
import urls from '../../config/urls'
import { useSelector } from 'react-redux'

const InfluencersScreen = ({ navigation }) => {
  const [allInfluencers, setAllInfluencers] = useState([])
  const [activeTab, setActiveTab] = useState('All')
  const [campaigns, setCampaigns] = useState([])
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [showCampaignDropdown, setShowCampaignDropdown] = useState(false)
  const { showLoader, hideLoader } = useLoader()

  const { isDarkMode } = useSelector(state => state.theme)


  // Authorization token - you should replace this with your actual token management
  // const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODA3Yzk2NDI0MTFlNzViYjQ2NzFkMCIsImlhdCI6MTc1MzI1MTA5MH0.qMzCWcwdeXR97j-SUPzWdgwl65AXuic0-CIoEu9SleM'

  useEffect(() => {
    getAllInfluencers()
    getAllCampaigns() // Fetch all campaigns by default
  }, [])

  useEffect(() => {
    // Refetch influencers when tab or campaign changes
    getAllInfluencers()
  }, [activeTab, selectedCampaign])

  const getAllInfluencers = async () => {
    const authToken = await getItem('token')
    try {
      showLoader()
      let apiUrl = '/api/brand/GetCollaborationAttendanceList'

      // If a specific campaign is selected, use the filter API
      if (selectedCampaign && selectedCampaign.id !== 'all') {
        apiUrl = `/api/brand/GetCollaborationAttendanceListFilter?campaignId=${selectedCampaign.id}`
      }

      const res = await apiGet(apiUrl, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })

      setAllInfluencers(res?.data || [])
      hideLoader()
    } catch (error) {
      console.log('Error fetching influencers:', error)
      hideLoader()
    }
  }

  const getAllCampaigns = async () => {
    const authToken = await getItem('token')

    try {
      const res = await apiGet('/api/brand/GetAllMyCampaign', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })

      // Add "All" option at the beginning
      const allCampaigns = [
        { id: 'all', Title: 'All Campaigns' },
        ...(res?.data || [])
      ]
      setCampaigns(allCampaigns)
    } catch (error) {
      console.log('Error fetching campaigns:', error)
    }
  }

  const getActiveCampaigns = async () => {
    const authToken = await getItem('token')

    try {
      const res = await apiGet('/api/brand/GetAllMyActiveCampaign', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })

      const activeCampaigns = [
        { id: 'all', Title: 'All Campaigns' },
        ...(res?.data || [])
      ]
      setCampaigns(activeCampaigns)
    } catch (error) {
      console.log('Error fetching active campaigns:', error)
    }
  }

  const getCompletedCampaigns = async () => {
    const authToken = await getItem('token')

    try {
      const res = await apiGet('/api/brand/GetAllMyCompletedCampaign', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })

      const completedCampaigns = [
        { id: 'all', Title: 'All Campaigns' },
        ...(res?.data || [])
      ]
      setCampaigns(completedCampaigns)
    } catch (error) {
      console.log('Error fetching completed campaigns:', error)
    }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSelectedCampaign(null) // Reset campaign selection when tab changes

    // Fetch campaigns based on active tab
    switch (tab) {
      case 'Active':
        getActiveCampaigns()
        break
      case 'Completed':
        getCompletedCampaigns()
        break
      case 'All':
      default:
        getAllCampaigns()
        break
    }
  }

  const handleCampaignSelect = (campaign) => {
    setSelectedCampaign(campaign)
    setShowCampaignDropdown(false)
  }

  const tabs = ['All', 'Active', 'Completed']

  const TabButton = ({ title, isActive, onPress }) => (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTabButton]}
      onPress={onPress}>
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>
        {title}
      </Text>
    </TouchableOpacity>
  )

  const FilterDropdown = ({ title, onPress, showArrow = true }) => (
    <TouchableOpacity style={styles.filterDropdown} onPress={onPress}>
      <Text style={styles.filterText}>{title}</Text>
      {showArrow && <Icon name="chevron-down" size={16} color={isDarkMode?'white': "#333"} />}
    </TouchableOpacity>
  )

  const CampaignDropdownModal = () => (
    <Modal
      visible={showCampaignDropdown}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowCampaignDropdown(false)}>
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowCampaignDropdown(false)}>
        <View style={styles.dropdownContainer}>
          <FlatList
            data={campaigns}
            keyExtractor={(item) => item?._id?.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.dropdownItem,
                  selectedCampaign?.id === item.id && styles.selectedDropdownItem
                ]}
                onPress={() => handleCampaignSelect(item)}>
                  {console.log(item,'++++++++++=')
                  }
                <Text style={[
                  styles.dropdownItemText,
                  selectedCampaign?.id === item.id && styles.selectedDropdownItemText
                ]}>
                  {item.Title}
                </Text>
                {selectedCampaign?.id === item.id && (
                  <Icon name="checkmark" size={16} color={App_Primary_color} />
                )}
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            maxHeight={300}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  )

  const InfluencerCard = ({ item }) => (
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
          {item.FirstName} {item?.LastName}
        </Text>
        <Text style={styles.influencerCategory} numberOfLines={2}>
          {item.NicheInput}
        </Text>
        <View style={styles.statusBadge}>
          <CustomText style={styles.statusText}>
            ACTIVE
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  )


  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? darkMode25 : '#f5f5f5',
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
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: isDarkMode ? '#555' : '#e0e0e0',
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 16,
    backgroundColor: isDarkMode ? '#555' : '#f8f8f8',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: isDarkMode ? '#666' : '#e0e0e0',
    minWidth: 100,
  },
  filterText: {
    fontSize: 13,
    color: isDarkMode ? 'white' : '#333',
    marginRight: 8,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    // flex: 1,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: isDarkMode ? '#333' : 'white',
    borderRadius: 8,
    margin: 20,
    maxHeight: 300,
    minWidth: 250,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? '#333' : '#f0f0f0',
  },
  selectedDropdownItem: {
    backgroundColor: isDarkMode ? '#333' : '#f0f8ff',
  },
  dropdownItemText: {
    fontSize: 14,
    color: isDarkMode ? 'white' : '#333',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    flex: 1,
  },
  selectedDropdownItemText: {
    color: App_Primary_color,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: isDarkMode ? darkMode25 : '#f5f5f5',
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
    backgroundColor: isDarkMode ? '#333' : 'white',
    borderRadius: 7,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 0.5,
    borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
    marginBottom: 5
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
    borderColor: isDarkMode ? '#333' : 'white',
  },
  cardContent: {
    alignItems: 'center',
    width: '100%',
  },
  influencerName: {
    fontSize: 16,
    fontWeight: '600',
    color: isDarkMode ? 'white' : '#333',
    marginBottom: 4,
    textAlign: 'center',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  influencerCategory: {
    fontSize: 12,
    color: isDarkMode ? '#bbb' : '#666',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  statusBadge: {
    backgroundColor: '#00CD52',
    padding: 4,
    borderRadius: 19,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    color: 'white',
    fontSize: 10
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
    color: isDarkMode ? 'white' : '#333',
    fontWeight: '600',
    marginRight: 2,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  reviewsText: {
    fontSize: 12,
    color: isDarkMode ? '#bbb' : '#666',
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
    color: isDarkMode ? '#bbb' : '#666',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
});

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
              onPress={() => handleTabChange(tab)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Filters Section */}
      <View style={styles.filtersContainer}>
        {/* <FilterDropdown title="Date" showArrow={false} /> */}
        <FilterDropdown
          title={selectedCampaign ? selectedCampaign.Title : "Campaign"}
          onPress={() => setShowCampaignDropdown(true)}
        />
      </View>

      {/* Campaign Dropdown Modal */}
      <CampaignDropdownModal />

      {/* Influencers Grid */}
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.gridContainer}>
          {allInfluencers.map((item, index) => (
            <View key={item.id || index} style={styles.gridItem}>
              <InfluencerCard item={item} />
            </View>
          ))}
        </View>

        {allInfluencers.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No influencers found</Text>
          </View>
        )}
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
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    minWidth: 100,
  },
  filterText: {
    fontSize: 13,
    color: '#333',
    marginRight: 8,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    // flex: 1,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 20,
    maxHeight: 300,
    minWidth: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedDropdownItem: {
    backgroundColor: '#f0f8ff',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    flex: 1,
  },
  selectedDropdownItemText: {
    color: App_Primary_color,
    fontWeight: '600',
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
    borderRadius: 7,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.05)',
    marginBottom: 5
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
  statusBadge: {
    backgroundColor: '#00CD52',
    padding: 4,
    borderRadius: 19,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    color: 'white',
    fontSize: 10
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
})

export default InfluencersScreen