// // import React, {useEffect, useState} from 'react'
// // import {
// //   View,
// //   Text,
// //   ScrollView,
// //   TextInput,
// //   TouchableOpacity,
// //   Image,
// //   StyleSheet,
// //   SafeAreaView,
// //   StatusBar,
// // } from 'react-native'
// // import Icon from 'react-native-vector-icons/Ionicons'
// // import {FONTS_FAMILY} from '../../../assets/Fonts'
// // import {App_Primary_color} from '../../../common/Colors/colors'
// // import SpaceBetweenRow from '../../../components/wrapper/spacebetween'
// // import Row from '../../../components/wrapper/row'
// // import IMG from '../../../assets/Images'
// // import {Badge, Doller, Notification, SearchIcons} from '../../../assets/SVGs'
// // import CustomText from '../../../components/TextComponent'
// // import CustomButton from '../../../components/Button'
// // import { apiGet } from '../../../utils/Apis'
// // import urls from '../../../config/urls'
// // import useLoader from '../../../utils/LoaderHook'
// // import { useSelector } from 'react-redux'

// // const BrandHome = ({navigation}) => {
// //   const [searchText, setSearchText] = useState('')
// //   const [selectedCategory, setSelectedCategory] = useState('Current Campaign')
// //   const [myCampaigns, setMyCampaigns] = useState([])
// //   const [filteredCampaigns, setFilteredCampaigns] = useState([])
// //   const [statistics, setStatistics] = useState({
// //     totalCampaigns: 0,
// //     activeCampaigns: 0,
// //     totalBudget: 0,
// //     totalReach: 0
// //   })

// //   const categories = ['Current Campaign', 'Future Campaign', 'Past Campaign']
// //   const [statusCount, setStatusCount]=useState(null)

// //   const{showLoader, hideLoader}=useLoader()

// //   let selector = useSelector(state => state?.user?.userData);
// //   if (Object.keys(selector).length != 0) {
// //       selector = JSON.parse(selector);
// //   }

// //   console.log('Selector at brand home', selector);

// //   useEffect(() => {
// //     getAllMyCampaigns()
// //     getCampaignStatus()
// //   }, [])

// //   const getCampaignStatus= async () => {
// //     try {
// //       showLoader()
// //       const res = await apiGet('/api/brand/GetCampaignStatusCount')
// //       console.log('+++++++++++++++++', res);
// //       setStatusCount(res?.data)
// //       hideLoader()
// //     } catch (error) {
// //       hideLoader()
// //     }
// //    }

// //   // Filter campaigns based on search text and category
// //   useEffect(() => {
// //     filterCampaigns()
// //   }, [myCampaigns, searchText, selectedCategory])

// //   const getAllMyCampaigns = async (searchQuery = '') => {
// //     try {
// //       showLoader()
// //       // Construct URL with search parameter if provided
// //       const url = searchQuery
// //         ? `${urls?.brandsGetAllMyCampaigns}?search=${encodeURIComponent(searchQuery)}`
// //         : urls?.brandsGetAllMyCampaigns

// //       const res = await apiGet(url)
// //       setMyCampaigns(res?.data || [])

// //       // Calculate statistics from campaigns data
// //       if (res?.data) {
// //         const stats = calculateStatistics(res.data)
// //         setStatistics(stats)
// //       }

// //       hideLoader()
// //     } catch (error) {
// //       console.log('Error fetching campaigns:', error)
// //       hideLoader()
// //     }
// //   }

// //   const filterCampaigns = () => {
// //     let filtered = [...myCampaigns]

// //     // Filter by search text (searches in Title, Category, and Status)
// //     if (searchText.trim()) {
// //       const searchLower = searchText.toLowerCase().trim()
// //       filtered = filtered.filter(campaign =>
// //         campaign?.Title?.toLowerCase().includes(searchLower) ||
// //         campaign?.Category?.toLowerCase().includes(searchLower) ||
// //         campaign?.Status?.toLowerCase().includes(searchLower)
// //       )
// //     }

// //     // Filter by category (you can implement category-based filtering logic here)
// //     // For now, showing all campaigns regardless of selected category
// //     // You might want to add a category field mapping in your API data

// //     setFilteredCampaigns(filtered)
// //   }

// //   const handleSearch = () => {
// //     if (searchText.trim()) {
// //       // Call API with search parameter
// //       getAllMyCampaigns(searchText.trim())
// //     } else {
// //       // Reset to all campaigns if search is empty
// //       getAllMyCampaigns()
// //     }
// //   }

// //   const handleSearchTextChange = (text) => {
// //     setSearchText(text)

// //     // Optional: Implement real-time search (uncomment if needed)
// //     // if (text.length === 0) {
// //     //   getAllMyCampaigns() // Reset to all campaigns when search is cleared
// //     // }
// //   }

// //   const calculateStatistics = (campaigns) => {
// //     const totalCampaigns = campaigns.length
// //     const activeCampaigns = campaigns.filter(campaign =>
// //       campaign.Status?.toLowerCase() === 'active' ||
// //       campaign.Status?.toLowerCase() === 'running'
// //     ).length

// //     // Mock calculations - replace with actual data fields from your API
// //     const totalBudget = campaigns.reduce((sum, campaign) =>
// //       sum + (campaign.Budget || Math.floor(Math.random() * 50000) + 10000), 0)
// //     const totalReach = campaigns.reduce((sum, campaign) =>
// //       sum + (campaign.Reach || Math.floor(Math.random() * 100000) + 50000), 0)

// //     return {
// //       totalCampaigns,
// //       activeCampaigns,
// //       totalBudget,
// //       totalReach
// //     }
// //   }

// //   const formatNumber = (num) => {
// //     if (num >= 1000000) {
// //       return (num / 1000000).toFixed(1) + 'M'
// //     } else if (num >= 1000) {
// //       return (num / 1000).toFixed(1) + 'K'
// //     }
// //     return num.toString()
// //   }

// //   const StatisticsCard = () => (
// //     <View style={styles.statisticsCard}>
// //       {/* Header Section */}
// //       <View style={styles.cardHeader}>
// //         <Text style={styles.cardHeaderText}>Campaign</Text>
// //         <Icon name="calendar-outline" size={18} color="#fff" />
// //       </View>

// //       {/* Main Stats */}
// //       <View style={styles.mainStats}>
// //         <Text style={styles.mainNumber}>{statusCount?.Active}</Text>
// //         <Text style={styles.mainLabel}>Active</Text>
// //       </View>

// //       {/* Bottom Stats Row */}
// //       <View style={styles.bottomStats}>
// //         <View style={styles.bottomStatItem}>
// //           <View style={{
// //             height:6,
// //             width:6,
// //             borderRadius:100,
// //             backgroundColor:'#3170FA'
// //           }}/>
// //           <Text style={styles.bottomStatNumber}>4</Text>
// //         </View>
// //         <View style={styles.bottomStatItem}>
// //             <View style={{
// //             height:6,
// //             width:6,
// //             borderRadius:100,
// //             backgroundColor:'#FFA100'
// //           }}/>
// //           <Text style={styles.bottomStatNumber}>2</Text>
// //         </View>
// //         <View style={styles.bottomStatItem}>
// //               <View style={{
// //             height:6,
// //             width:6,
// //             borderRadius:100,
// //             backgroundColor:App_Primary_color
// //           }}/>
// //           <Text style={styles.bottomStatNumber}>2</Text>
// //         </View>
// //         <View style={styles.bottomStatItem}>

// //            <View style={{
// //             height:6,
// //             width:6,
// //             borderRadius:100,
// //             backgroundColor:'#9CA3AF'
// //           }}/>
// //           <Text style={styles.bottomStatNumber}>10</Text>
// //         </View>
// //       </View>
// //     </View>
// //   )

// //   const CategoryButton = ({title, isSelected, onPress}) => (
// //     <TouchableOpacity
// //       style={[
// //         styles.categoryButton,
// //         isSelected && styles.selectedCategoryButton,
// //       ]}
// //       onPress={onPress}>
// //       <Text
// //         style={[
// //           styles.categoryText,
// //           isSelected && styles.selectedCategoryText,
// //         ]}>
// //         {title}
// //       </Text>
// //     </TouchableOpacity>
// //   )

// //   const CampaignCard = ({item, index}) => (
// //     <TouchableOpacity
// //       style={styles.campaignCard}
// //       // onPress={() => navigation.navigate('BrandBokingList')}
// //       onPress={() => navigation.navigate('BrandCapmaignDetail',{campaignId:item?._id})}
// //       >

// //       {/* Card Image */}
// //       <View style={styles.cardImageContainer}>
// //         <Image
// //           source={{uri: item.Assets}}
// //           style={styles.cardImage}
// //           // resizeMode="contain"
// //         />
// //       </View>

// //       {/* Card Content */}
// //       <View style={styles.cardContent}>
// //         <Text style={styles.hubName}>{item?.Title}</Text>
// //         <Text style={styles.categoryName}>{item?.Description}</Text>

// //         {/* <Text style={styles.description}>
// //           Nulla integer rutrum quam feugiat aliquet hac. Ut purus elit et massa eget ornare
// //         </Text> */}

// //         <SpaceBetweenRow style={styles.cardFooter}>
// //           <View>
// //             <Text style={styles.attendeesText}>Attendees</Text>
// //           </View>
// //           <View style={styles.attendeesContainer}>
// //             <View style={styles.avatarContainer}>
// //               <Image
// //               source={IMG.AvatorImage}
// //               style={{
// //                 height:22,
// //                 width:22
// //               }}
// //               />
// //             </View>
// //             <Text style={styles.attendeesCount}>12</Text>
// //           </View>
// //         </SpaceBetweenRow>

// //         {/* Status Badge */}
// //         <View style={styles.statusContainer}>
// //           <View style={[styles.statusBadge, {backgroundColor: '#00CD52'}]}>
// //             <Text style={styles.statusText}>{item?.Status}</Text>
// //           </View>
// //         </View>
// //       </View>
// //     </TouchableOpacity>
// //   )

// //   return (
// //     <>
// //     <ScrollView style={styles.container}>
// //       <StatusBar backgroundColor={App_Primary_color} barStyle='light-content'
// //       translucent={false}
// //       />

// //       <View style={styles.header}>
// //         <SpaceBetweenRow>
// //           <Row
// //             style={{
// //               // gap: 20,
// //             }}>
// //             <Image
// //               source={IMG.userProfileImage}
// //               style={{height: 30, width: 30}}
// //             />

// //           </Row>
// //           <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
// //             <Notification />
// //           </TouchableOpacity>
// //         </SpaceBetweenRow>
// //         <CustomText style={{
// //           color:'white',
// //           fontSize:24,
// //           fontFamily:FONTS_FAMILY.Poppins_Medium
// //         }}>Welcome {selector?.FirstName}</CustomText>
// //         <SpaceBetweenRow>
// //           <StatisticsCard />
// //         </SpaceBetweenRow>
// //         <View
// //           style={{
// //             backgroundColor: 'white',
// //             borderRadius: 12,
// //             padding: 20,
// //             position: 'absolute',
// //             alignSelf: 'center',
// //             width: '100%',
// //             bottom: -110,
// //             zIndex: 100,
// //           }}>
// //           <Row
// //             style={{
// //               borderWidth: 1,
// //               borderColor: '#D1D5DB',
// //               paddingHorizontal: 5,
// //               borderRadius: 8,
// //             }}>
// //             <SearchIcons />
// //             <TextInput
// //               placeholderTextColor={'gray'}
// //               placeholder='Search by campaign name, category or status'
// //               style={{
// //                 fontSize: 14,
// //                 fontFamily: FONTS_FAMILY.Poppins_Regular,
// //                 flex: 1,
// //                 color:'black'
// //               }}
// //               value={searchText}
// //               onChangeText={handleSearchTextChange}
// //               // returnKeyType="search"
// //               onSubmitEditing={handleSearch}
// //             />
// //             {searchText.length > 0 && (
// //               <TouchableOpacity
// //                 onPress={() => {
// //                   setSearchText('')
// //                   getAllMyCampaigns() // Reset to all campaigns
// //                 }}
// //                 style={{paddingHorizontal: 5}}
// //               >
// //                 <Icon name="close-circle" size={20} color="#gray" />
// //               </TouchableOpacity>
// //             )}
// //           </Row>
// //           <CustomButton
// //             title={'Search Campaign'}
// //             style={{
// //               marginTop: 16,
// //             }}
// //             onPress={handleSearch}
// //           />
// //         </View>
// //       </View>

// //       {/* Content Container */}
// //       <ScrollView
// //         style={styles.contentContainer}
// //         showsVerticalScrollIndicator={false}>

// //         {/* Filter Buttons */}
// //         <ScrollView
// //           horizontal
// //           showsHorizontalScrollIndicator={false}
// //           style={styles.filterContainer}>
// //           {categories.map((category) => (
// //             <CategoryButton
// //               key={category}
// //               title={category}
// //               isSelected={selectedCategory === category}
// //               onPress={() => setSelectedCategory(category)}
// //             />
// //           ))}
// //         </ScrollView>

// //         {/* Section Header */}
// //         <SpaceBetweenRow style={styles.sectionHeader}>
// //           <CustomText style={styles.sectionTitle}>
// //             {selectedCategory}
// //             {searchText.trim() && (
// //               <Text style={styles.searchResultsText}>
// //                 {` (${filteredCampaigns.length} results for "${searchText}")`}
// //               </Text>
// //             )}
// //           </CustomText>
// //           <TouchableOpacity     onPress={() => navigation.navigate('BrandBokingList')}>
// //             <CustomText style={styles.seeAllText}>
// //               See All <Text>{">"}</Text>
// //             </CustomText>
// //           </TouchableOpacity>
// //         </SpaceBetweenRow>

// //         {/* Campaign Cards */}
// //         <View style={styles.cardsContainer}>
// //           {filteredCampaigns.length > 0 ? (
// //             filteredCampaigns.map((item, index) => (
// //               <CampaignCard key={item._id || index} item={item} index={index} />
// //             ))
// //           ) : (
// //             <View style={styles.noResultsContainer}>
// //               <Icon name="search" size={50} color="#9CA3AF" />
// //               <Text style={styles.noResultsText}>
// //                 {searchText.trim()
// //                   ? `No campaigns found for "${searchText}"`
// //                   : 'No campaigns available'}
// //               </Text>
// //               {searchText.trim() && (
// //                 <TouchableOpacity
// //                   onPress={() => {
// //                     setSearchText('')
// //                     getAllMyCampaigns()
// //                   }}
// //                   style={styles.clearSearchButton}
// //                 >
// //                   <Text style={styles.clearSearchText}>Clear Search</Text>
// //                 </TouchableOpacity>
// //               )}
// //             </View>
// //           )}
// //         </View>

// //         {/* Extra padding at bottom */}
// //         <View style={{height: 100}} />

// //       </ScrollView>

// //     </ScrollView>

// //     {/* Floating Action Button */}
// //     <TouchableOpacity
// //       style={styles.floatingButton}
// //       onPress={()=>navigation.navigate('CreateCampaign')}>
// //       <Icon name="add" size={24} color="#fff" />
// //     </TouchableOpacity>
// //     </>
// //   )
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#f5f5f5',
// //   },
// //   header: {
// //     backgroundColor: App_Primary_color,
// //     paddingHorizontal: 16,
// //     paddingVertical: 18,
// //     gap: 10,
// //     height: 280,
// //   },
// //   contentContainer: {
// //     flex: 1,
// //     paddingHorizontal: 16,
// //     paddingTop: 130,
// //   },

// //   // Statistics Card Styles
// //   statisticsCard: {
// //     backgroundColor: '#FFFFFF26',
// //     borderRadius: 12,
// //     padding: 10,
// //     width: '100%',
// //     height: 112,
// //     justifyContent: 'space-between',
// //   },
// //   cardHeader: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //   },
// //   cardHeaderText: {
// //     fontSize: 10,
// //     fontFamily: FONTS_FAMILY.Poppins_Regular,
// //     color: '#fff',
// //   },
// //   mainStats: {
// //     alignItems: 'flex-start',
// //     flexDirection:'row'
// //   },
// //   mainNumber: {
// //     fontSize: 24,
// //     fontFamily: FONTS_FAMILY.Poppins_Bold,
// //     color: '#fff',
// //     // lineHeight: 40,
// //   },
// //   mainLabel: {
// //     fontSize: 16,
// //     fontFamily: FONTS_FAMILY.Poppins_Regular,
// //     color: '#fff',
// //     marginTop: 8,
// //   },
// //   bottomStats: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //   },
// //   bottomStatItem: {
// //     alignItems: 'center',
// //     flexDirection:'row',
// //     gap:3
// //   },
// //   bottomStatNumber: {
// //     fontSize: 12,
// //     fontFamily: FONTS_FAMILY.Comfortaa_Medium,
// //     color: '#fff',
// //   },

// //   // Filter Buttons
// //   filterContainer: {
// //     marginBottom: 20,
// //   },
// //   categoryButton: {
// //     backgroundColor: '#fff',
// //     paddingHorizontal: 5,
// //     paddingVertical: 5,
// //     borderRadius: 6,
// //     marginRight: 12,
// //     borderWidth: 1,
// //     borderColor: App_Primary_color,
// //   },
// //   selectedCategoryButton: {
// //     backgroundColor: '#E53E3E',
// //     borderColor: '#E53E3E',
// //   },
// //   categoryText: {
// //     fontSize: 12,
// //     color: App_Primary_color,
// //     fontFamily: FONTS_FAMILY.Poppins_Medium,
// //   },
// //   selectedCategoryText: {
// //     color: '#fff',
// //   },

// //   // Section Header
// //   sectionHeader: {
// //     marginBottom: 16,
// //   },
// //   sectionTitle: {
// //     fontSize: 16,
// //     fontFamily: FONTS_FAMILY.Poppins_SemiBold,
// //     color: '#1F2937',
// //   },
// //   searchResultsText: {
// //     fontSize: 12,
// //     fontFamily: FONTS_FAMILY.Poppins_Regular,
// //     color: '#6B7280',
// //   },
// //   seeAllText: {
// //     fontSize: 14,
// //     fontFamily: FONTS_FAMILY.Poppins_Regular,
// //     color: '#3D0066',
// //   },

// //   // No Results Styles
// //   noResultsContainer: {
// //     alignItems: 'center',
// //     paddingVertical: 40,
// //   },
// //   noResultsText: {
// //     fontSize: 16,
// //     fontFamily: FONTS_FAMILY.Poppins_Regular,
// //     color: '#6B7280',
// //     textAlign: 'center',
// //     marginTop: 16,
// //     marginBottom: 20,
// //   },
// //   clearSearchButton: {
// //     backgroundColor: App_Primary_color,
// //     paddingHorizontal: 20,
// //     paddingVertical: 10,
// //     borderRadius: 8,
// //   },
// //   clearSearchText: {
// //     color: '#fff',
// //     fontSize: 14,
// //     fontFamily: FONTS_FAMILY.Poppins_Medium,
// //   },

// //   // Cards Container
// //   cardsContainer: {
// //     gap: 16,
// //   },

// //   // Campaign Card Styles
// //   campaignCard: {
// //     backgroundColor: '#fff',
// //     borderRadius: 12,
// //     overflow: 'hidden',
// //     shadowColor: '#000',
// //     shadowOffset: {
// //       width: 0,
// //       height: 2,
// //     },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 8,
// //     elevation: 4,
// //     marginBottom: 16,
// //     padding:10,
// //      shadowOpacity: 0.12,
// //     shadowRadius: 8,
// //     elevation: 6,
// //     borderWidth: 0.5,
// //     borderColor: 'rgba(0,0,0,0.05)',
// //     marginBottom:5,
// //     marginHorizontal:5
// //   },

// //   // Card Image
// //   cardImageContainer: {
// //     height: 160,
// //     // position: 'relative',
// //   },
// //   cardImage: {
// //     width: '100%',
// //     height: '95%',
// //     borderTopLeftRadius:10,
// //     borderTopRightRadius:10

// //   },
// //   cardOverlay: {
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   cardTitle: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     color: '#fff',
// //     textAlign: 'center',
// //     fontFamily: FONTS_FAMILY.Poppins_Bold,
// //     marginBottom: 4,
// //   },
// //   cardSubtitle: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     color: '#fff',
// //     textAlign: 'center',
// //     fontFamily: FONTS_FAMILY.Poppins_Bold,
// //   },

// //   // Card Content
// //   cardContent: {
// //     // padding: 16,
// //     // position: 'relative',
// //   },
// //   hubName: {
// //     fontSize: 16,
// //     fontWeight: '600',
// //     color: '#1F2937',
// //     fontFamily: FONTS_FAMILY.Poppins_SemiBold,
// //     marginBottom: 4,
// //   },
// //   categoryName: {
// //     fontSize: 12,
// //     color: '#6B7280',
// //     fontFamily: FONTS_FAMILY.Poppins_Regular,
// //     marginBottom: 12,
// //   },
// //   description: {
// //     fontSize: 13,
// //     color: '#6B7280',
// //     lineHeight: 18,
// //     fontFamily: FONTS_FAMILY.Poppins_Regular,
// //     marginBottom: 16,
// //   },

// //   // Card Footer
// //   cardFooter: {
// //     alignItems: 'center',
// //     backgroundColor:'#D43C3114',
// //     paddingHorizontal:8,
// //     borderRadius:20,
// //     paddingVertical:5
// //   },
// //   attendeesText: {
// //     fontSize: 13,
// //     color: 'black',
// //     fontFamily: FONTS_FAMILY.Poppins_Regular,
// //   },
// //   attendeesContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     gap: 8,
// //   },
// //   avatarContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   avatar: {
// //     width: 24,
// //     height: 24,
// //     borderRadius: 12,
// //     borderWidth: 2,
// //     borderColor: '#fff',
// //   },
// //   attendeesCount: {
// //     fontSize: 14,
// //     fontWeight: '600',
// //     color: '#1F2937',
// //     fontFamily: FONTS_FAMILY.Poppins_SemiBold,
// //   },

// //   // Status Badge
// //   statusContainer: {
// //     position: 'absolute',
// //     top: 16,
// //     right: 16,
// //   },
// //   statusBadge: {
// //     paddingHorizontal: 10,
// //     paddingVertical: 4,
// //     borderRadius: 18,
// //   },
// //   statusText: {
// //     fontSize: 10,
// //     fontWeight: '600',
// //     color: '#fff',
// //     fontFamily: FONTS_FAMILY.Poppins_SemiBold,
// //   },

// //   // Floating Button
// //   floatingButton: {
// //     position: 'absolute',
// //     bottom: 100,
// //     right: 20,
// //     backgroundColor: '#E53E3E',
// //     width: 56,
// //     height: 56,
// //     borderRadius: 28,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     elevation: 8,
// //     shadowColor: '#000',
// //     shadowOffset: {width: 0, height: 4},
// //     shadowOpacity: 0.3,
// //     shadowRadius: 8,
// //   },
// // })

// // export default BrandHome

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
// import {FONTS_FAMILY} from '../../../assets/Fonts'
// import {App_Primary_color} from '../../../common/Colors/colors'
// import SpaceBetweenRow from '../../../components/wrapper/spacebetween'
// import Row from '../../../components/wrapper/row'
// import IMG from '../../../assets/Images'
// import {Badge, Doller, Notification, SearchIcons} from '../../../assets/SVGs'
// import CustomText from '../../../components/TextComponent'
// import CustomButton from '../../../components/Button'
// import { apiGet } from '../../../utils/Apis'
// import urls from '../../../config/urls'
// import useLoader from '../../../utils/LoaderHook'
// import { useSelector } from 'react-redux'

// const BrandHome = ({navigation}) => {
//   const [searchText, setSearchText] = useState('')
//   const [selectedCategory, setSelectedCategory] = useState('Current Campaign')
//   const [selectedFilter, setSelectedFilter] = useState('current')

//   const [myCampaigns, setMyCampaigns] = useState([])
//   const [statusCount, setStatusCount] = useState(null)

//   const categories = ['Current Campaign', 'Future Campaign', 'Past Campaign']
//   const {showLoader, hideLoader} = useLoader()

//   let selector = useSelector(state => state?.user?.userData);
//   if (Object.keys(selector).length != 0) {
//       selector = JSON.parse(selector);
//   }

//   useEffect(() => {
//     getAllMyCampaigns()
//     getCampaignStatus()
//   }, [])

//   useEffect(() => {
//     // When category changes, fetch campaigns with that filter
//     getAllMyCampaigns(searchText, getCategoryFilter(selectedCategory))
//   }, [selectedCategory, selectedFilter])

//   const getCampaignStatus = async () => {
//     try {
//       showLoader()
//       const res = await apiGet('/api/brand/GetCampaignStatusCount')
//       console.log('Campaign Status Count:', res);
//       setStatusCount(res?.data)
//       hideLoader()
//     } catch (error) {
//       hideLoader()
//     }
//   }

//   const getCategoryFilter = (category) => {
//     switch(category) {
//       case 'Current Campaign':
//         return 'current'
//       case 'Future Campaign':
//         return 'future'
//       case 'Past Campaign':
//         return 'past'
//       default:
//         return 'current'
//     }
//   }

//   const getAllMyCampaigns = async (searchQuery = '', filter = 'current') => {
//     try {
//       showLoader()

//       // Construct URL with search and filter parameters
//       let url = `${urls?.brandsGetAllMyCampaigns}?filter=${selectedFilter}`

//       if (searchQuery && searchQuery.trim()) {
//         url += `&search=${encodeURIComponent(searchQuery.trim())}`
//       }

//       // console.log('API URL:', url);
//       const res = await apiGet(url)
//       // console.log(res,'++++++++++++++++++++++++++++++');

//       setMyCampaigns(res?.data || [])

//       hideLoader()
//     } catch (error) {
//       console.log('Error fetching campaigns:', error)
//       hideLoader()
//     }
//   }

//   const handleSearch = () => {
//     const filter = getCategoryFilter(selectedCategory)
//     getAllMyCampaigns(searchText, filter)
//   }

//   const handleSearchTextChange = (text) => {
//     setSearchText(text)
//   }

//   const handleCategoryPress = (category) => {
//     console.log(category,'Catetete');

//     setSelectedCategory(category)
//     if (category=='Current Campaign') {
//       setSelectedFilter('current')
//     }
//     if (category=='Past Campaign') {
//       setSelectedFilter('past')

//     }
//      if (category=='Future Campaign') {
//       setSelectedFilter('future')

//     }

//   }

//   const formatNumber = (num) => {
//     if (num >= 1000000) {
//       return (num / 1000000).toFixed(1) + 'M'
//     } else if (num >= 1000) {
//       return (num / 1000).toFixed(1) + 'K'
//     }
//     return num.toString()
//   }

//   const StatisticsCard = () => (
//     <View style={styles.statisticsCard}>
//       {/* Header Section */}
//       <View style={styles.cardHeader}>
//         <Text style={styles.cardHeaderText}>Campaign</Text>
//         <Icon name="calendar-outline" size={18} color="#fff" />
//       </View>

//       {/* Main Stats */}
//       <View style={styles.mainStats}>
//         <Text style={styles.mainNumber}>{statusCount?.Active || 0}</Text>
//         <Text style={styles.mainLabel}>Active</Text>
//       </View>

//       {/* Bottom Stats Row */}
//       <View style={styles.bottomStats}>
//         <View style={styles.bottomStatItem}>
//           <View style={styles.statDot} />
//           <Text style={styles.bottomStatNumber}>{statusCount?.Current || 0}</Text>
//         </View>
//         <View style={styles.bottomStatItem}>
//           <View style={[styles.statDot, {backgroundColor: '#FFA100'}]} />
//           <Text style={styles.bottomStatNumber}>{statusCount?.Future || 0}</Text>
//         </View>
//         <View style={styles.bottomStatItem}>
//           <View style={[styles.statDot, {backgroundColor: App_Primary_color}]} />
//           <Text style={styles.bottomStatNumber}>{statusCount?.Past || 0}</Text>
//         </View>
//         <View style={styles.bottomStatItem}>
//           <View style={[styles.statDot, {backgroundColor: '#9CA3AF'}]} />
//           <Text style={styles.bottomStatNumber}>{statusCount?.Total || 0}</Text>
//         </View>
//       </View>
//     </View>
//   )

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
//       style={styles.campaignCard}
//       onPress={() => navigation.navigate('BrandCapmaignDetail', {campaignId: item?._id})}>

//       {/* Card Image */}
//       <View style={styles.cardImageContainer}>
//         <Image
//           source={{uri: item.Assets}}
//           style={styles.cardImage}
//         />
//       </View>

//       {/* Card Content */}
//       <View style={styles.cardContent}>
//         <Text style={styles.hubName}>{item?.Title}</Text>
//         <Text style={styles.categoryName}>{item?.Description}</Text>

//         <SpaceBetweenRow style={styles.cardFooter}>
//           <View>
//             <Text style={styles.attendeesText}>Attendees</Text>
//           </View>
//           <View style={styles.attendeesContainer}>
//             <View style={styles.avatarContainer}>
//               <Image
//                 source={IMG.AvatorImage}
//                 style={styles.avatarImage}
//               />
//             </View>
//             <Text style={styles.attendeesCount}>{item?.attendees || 12}</Text>
//           </View>
//         </SpaceBetweenRow>

//         {/* Status Badge */}
//         <View style={styles.statusContainer}>
//           <View style={[styles.statusBadge, {backgroundColor: '#00CD52'}]}>
//             <Text style={styles.statusText}>{item?.Status}</Text>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   )

//   return (
//     <>
//     <ScrollView style={styles.container}>
//       <StatusBar
//         backgroundColor={App_Primary_color}
//         barStyle='light-content'
//         translucent={false}
//       />

//       <View style={styles.header}>
//         <SpaceBetweenRow>
//           <Row>
//             <Image
//               source={IMG.userProfileImage}
//               style={styles.profileImage}
//             />
//           </Row>
//           <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
//             <Notification />
//           </TouchableOpacity>
//         </SpaceBetweenRow>

//         <CustomText style={styles.welcomeText}>
//           Welcome {selector?.FirstName}
//         </CustomText>

//         <SpaceBetweenRow>
//           <StatisticsCard />
//         </SpaceBetweenRow>

//         <View style={styles.searchContainer}>
//           <Row style={styles.searchInputContainer}>
//             <SearchIcons />
//             <TextInput
//               placeholderTextColor={'gray'}
//               placeholder='Search by campaign name, category or status'
//               style={styles.searchInput}
//               value={searchText}
//               onChangeText={handleSearchTextChange}
//               onSubmitEditing={handleSearch}
//             />
//             {searchText.length > 0 && (
//               <TouchableOpacity
//                 onPress={() => {
//                   setSearchText('')
//                   const filter = getCategoryFilter(selectedCategory)
//                   getAllMyCampaigns('', filter)
//                 }}
//                 style={styles.clearButton}>
//                 <Icon name="close-circle" size={20} color="#gray" />
//               </TouchableOpacity>
//             )}
//           </Row>
//           <CustomButton
//             title={'Search Campaign'}
//             style={styles.searchButton}
//             onPress={handleSearch}
//           />
//         </View>
//       </View>

//       {/* Content Container */}
//       <ScrollView
//         style={styles.contentContainer}
//         showsVerticalScrollIndicator={false}>

//         {/* Filter Buttons */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.filterContainer}>
//           {categories.map((category) => (
//             <CategoryButton
//               key={category}
//               title={category}
//               isSelected={selectedCategory === category}
//               onPress={() => handleCategoryPress(category)}
//             />
//           ))}
//         </ScrollView>

//         {/* Section Header */}
//         <SpaceBetweenRow style={styles.sectionHeader}>
//           <CustomText style={styles.sectionTitle}>
//             {selectedCategory}
//             {searchText.trim() && (
//               <Text style={styles.searchResultsText}>
//                 {` (${myCampaigns.length} results for "${searchText}")`}
//               </Text>
//             )}
//           </CustomText>
//           <TouchableOpacity onPress={() => navigation.navigate('BrandBokingList')}>
//             <CustomText style={styles.seeAllText}>
//               See All <Text>{">"}</Text>
//             </CustomText>
//           </TouchableOpacity>
//         </SpaceBetweenRow>

//         {/* Campaign Cards */}
//         <View style={styles.cardsContainer}>
//           {myCampaigns.length > 0 ? (
//             myCampaigns.map((item, index) => (
//               <CampaignCard key={item._id || index} item={item} index={index} />
//             ))
//           ) : (
//             <View style={styles.noResultsContainer}>
//               <Icon name="search" size={50} color="#9CA3AF" />
//               <Text style={styles.noResultsText}>
//                 {searchText.trim()
//                   ? `No campaigns found for "${searchText}"`
//                   : `No ${selectedCategory.toLowerCase()} campaigns available`}
//               </Text>
//               {searchText.trim() && (
//                 <TouchableOpacity
//                   onPress={() => {
//                     setSearchText('')
//                     const filter = getCategoryFilter(selectedCategory)
//                     getAllMyCampaigns('', filter)
//                   }}
//                   style={styles.clearSearchButton}>
//                   <Text style={styles.clearSearchText}>Clear Search</Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//           )}
//         </View>

//         <View style={styles.bottomPadding} />
//       </ScrollView>
//     </ScrollView>

//     {/* Floating Action Button */}
//     <TouchableOpacity
//       style={styles.floatingButton}
//       onPress={() => navigation.navigate('CreateCampaign')}>
//       <Icon name="add" size={24} color="#fff" />
//     </TouchableOpacity>
//     </>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     backgroundColor: App_Primary_color,
//     paddingHorizontal: 16,
//     paddingVertical: 18,
//     gap: 10,
//     height: 280,
//   },
//   profileImage: {
//     height: 30,
//     width: 30
//   },
//   welcomeText: {
//     color: 'white',
//     fontSize: 24,
//     fontFamily: FONTS_FAMILY.Poppins_Medium
//   },
//   searchContainer: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 20,
//     position: 'absolute',
//     alignSelf: 'center',
//     width: '100%',
//     bottom: -110,
//     zIndex: 100,
//   },
//   searchInputContainer: {
//     borderWidth: 1,
//     borderColor: '#D1D5DB',
//     paddingHorizontal: 5,
//     borderRadius: 8,
//   },
//   searchInput: {
//     fontSize: 14,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     flex: 1,
//     color: 'black'
//   },
//   clearButton: {
//     paddingHorizontal: 5
//   },
//   searchButton: {
//     marginTop: 16,
//   },
//   contentContainer: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 130,
//   },

//   // Statistics Card Styles
//   statisticsCard: {
//     backgroundColor: '#FFFFFF26',
//     borderRadius: 12,
//     padding: 10,
//     width: '100%',
//     height: 112,
//     justifyContent: 'space-between',
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   cardHeaderText: {
//     fontSize: 10,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     color: '#fff',
//   },
//   mainStats: {
//     alignItems: 'flex-start',
//     flexDirection: 'row'
//   },
//   mainNumber: {
//     fontSize: 24,
//     fontFamily: FONTS_FAMILY.Poppins_Bold,
//     color: '#fff',
//   },
//   mainLabel: {
//     fontSize: 16,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     color: '#fff',
//     marginTop: 8,
//   },
//   bottomStats: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   bottomStatItem: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     gap: 3
//   },
//   statDot: {
//     height: 6,
//     width: 6,
//     borderRadius: 100,
//     backgroundColor: '#3170FA'
//   },
//   bottomStatNumber: {
//     fontSize: 12,
//     fontFamily: FONTS_FAMILY.Comfortaa_Medium,
//     color: '#fff',
//   },

//   // Filter Buttons
//   filterContainer: {
//     marginBottom: 20,
//   },
//   categoryButton: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 5,
//     paddingVertical: 5,
//     borderRadius: 6,
//     marginRight: 12,
//     borderWidth: 1,
//     borderColor: App_Primary_color,
//   },
//   selectedCategoryButton: {
//     backgroundColor: '#E53E3E',
//     borderColor: '#E53E3E',
//   },
//   categoryText: {
//     fontSize: 12,
//     color: App_Primary_color,
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   selectedCategoryText: {
//     color: '#fff',
//   },

//   // Section Header
//   sectionHeader: {
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//     color: '#1F2937',
//   },
//   searchResultsText: {
//     fontSize: 12,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     color: '#6B7280',
//   },
//   seeAllText: {
//     fontSize: 14,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     color: '#3D0066',
//   },

//   // No Results Styles
//   noResultsContainer: {
//     alignItems: 'center',
//     paddingVertical: 40,
//   },
//   noResultsText: {
//     fontSize: 16,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     color: '#6B7280',
//     textAlign: 'center',
//     marginTop: 16,
//     marginBottom: 20,
//   },
//   clearSearchButton: {
//     backgroundColor: App_Primary_color,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   clearSearchText: {
//     color: '#fff',
//     fontSize: 14,
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },

//   // Cards Container
//   cardsContainer: {
//     gap: 16,
//   },

//   // Campaign Card Styles
//   campaignCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.12,
//     shadowRadius: 8,
//     elevation: 6,
//     borderWidth: 0.5,
//     borderColor: 'rgba(0,0,0,0.05)',
//     marginBottom: 5,
//     marginHorizontal: 5,
//     padding: 10,
//   },

//   // Card Image
//   cardImageContainer: {
//     height: 160,
//   },
//   cardImage: {
//     width: '100%',
//     height: '95%',
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10
//   },

//   // Card Content
//   cardContent: {
//     // Removed padding since it's already on parent
//   },
//   hubName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1F2937',
//     fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//     marginBottom: 4,
//   },
//   categoryName: {
//     fontSize: 12,
//     color: '#6B7280',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     marginBottom: 12,
//   },

//   // Card Footer
//   cardFooter: {
//     alignItems: 'center',
//     backgroundColor: '#D43C3114',
//     paddingHorizontal: 8,
//     borderRadius: 20,
//     paddingVertical: 5
//   },
//   attendeesText: {
//     fontSize: 13,
//     color: 'black',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   attendeesContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   avatarContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatarImage: {
//     height: 22,
//     width: 22
//   },
//   attendeesCount: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1F2937',
//     fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//   },

//   // Status Badge
//   statusContainer: {
//     position: 'absolute',
//     top: 16,
//     right: 16,
//   },
//   statusBadge: {
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 18,
//   },
//   statusText: {
//     fontSize: 10,
//     fontWeight: '600',
//     color: '#fff',
//     fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//   },

//   // Floating Button
//   floatingButton: {
//     position: 'absolute',
//     bottom: 100,
//     right: 20,
//     backgroundColor: '#E53E3E',
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 4},
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//   },

//   // Extra padding at bottom
//   bottomPadding: {
//     height: 100
//   },
// })

// export default BrandHome

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
// import {FONTS_FAMILY} from '../../../assets/Fonts'
// import {App_Primary_color} from '../../../common/Colors/colors'
// import SpaceBetweenRow from '../../../components/wrapper/spacebetween'
// import Row from '../../../components/wrapper/row'
// import IMG from '../../../assets/Images'
// import {Badge, Doller, Notification, SearchIcons} from '../../../assets/SVGs'
// import CustomText from '../../../components/TextComponent'
// import CustomButton from '../../../components/Button'
// import { apiGet } from '../../../utils/Apis'
// import urls from '../../../config/urls'
// import useLoader from '../../../utils/LoaderHook'
// import { useSelector } from 'react-redux'

// const BrandHome = ({navigation}) => {
//   const [searchText, setSearchText] = useState('')
//   const [selectedCategory, setSelectedCategory] = useState('Current Campaign')
//   const [selectedFilter, setSelectedFilter] = useState('current')

//   const [myCampaigns, setMyCampaigns] = useState([])
//   const [statusCount, setStatusCount] = useState(null)

//   const categories = ['Current Campaign', 'Future Campaign', 'Past Campaign']
//   const {showLoader, hideLoader} = useLoader()

//   let selector = useSelector(state => state?.user?.userData);
//   if (Object.keys(selector).length != 0) {
//       selector = JSON.parse(selector);
//   }

//   useEffect(() => {
//     getAllMyCampaigns()
//     getCampaignStatus()

//     // Uncomment this line to test your API endpoint
//     // testAPICall()
//   }, [])

//   useEffect(() => {
//     // When category changes, fetch campaigns with that filter
//     const filter = getCategoryFilter(selectedCategory)
//     setSelectedFilter(filter)
//     getAllMyCampaigns(searchText, filter)
//   }, [selectedCategory])

//   // New useEffect for search text changes with debounce
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       if (searchText.trim() !== '') {
//         getAllMyCampaigns(searchText, selectedFilter)
//       }
//     }, 500) // 500ms debounce

//     return () => clearTimeout(timeoutId)
//   }, [searchText])

//   const getCampaignStatus = async () => {
//     try {
//       showLoader()
//       const res = await apiGet('/api/brand/GetCampaignStatusCount')
//       console.log('Campaign Status Count:', res);
//       setStatusCount(res?.data)
//       hideLoader()
//     } catch (error) {
//       console.log('Error fetching status count:', error)
//       hideLoader()
//     }
//   }

//   const getCategoryFilter = (category) => {
//     switch(category) {
//       case 'Current Campaign':
//         return 'current'
//       case 'Future Campaign':
//         return 'future'
//       case 'Past Campaign':
//         return 'past'
//       default:
//         return 'current'
//     }
//   }

//   // Debug function to test API directly
//   const testAPICall = async () => {
//     try {
//       console.log('Testing API call...');

//       // Test with your exact curl parameters
//       const testUrl = '/api/brand/GetAllMyCampaign?search=Christmas&filter=current'
//       console.log('Test URL:', testUrl);

//       const response = await apiGet(testUrl)
//       console.log('Test Response:', response);

//       return response;
//     } catch (error) {
//       console.log('Test API Error:', error);
//       return null;
//     }
//   }

//   const getAllMyCampaigns = async (searchQuery = '', filter = 'current') => {
//     try {
//       showLoader()

//       // Use the correct API endpoint - NOTE: it's singular "GetAllMyCampaign"
//       let baseUrl = '/api/brand/GetAllMyCampaign'

//       // Build query parameters
//       const params = []
//       params.push(`filter=${encodeURIComponent(filter)}`)

//       if (searchQuery && searchQuery.trim()) {
//         params.push(`search=${encodeURIComponent(searchQuery.trim())}`)
//       }

//       // Construct final URL
//       const finalUrl = params.length > 0 ? `${baseUrl}?${params.join('&')}` : baseUrl

//       console.log('API URL:', finalUrl);

//       // Make API call with proper endpoint
//       const res = await apiGet(finalUrl)
//       console.log('API Response:', res);

//       // Handle different response structures
//       if (res?.success && res?.data) {
//         setMyCampaigns(res.data)
//       } else if (res?.data) {
//         setMyCampaigns(res.data)
//       } else if (Array.isArray(res)) {
//         setMyCampaigns(res)
//       } else {
//         setMyCampaigns([])
//       }

//       hideLoader()
//     } catch (error) {
//       console.log('Error fetching campaigns:', error)
//       setMyCampaigns([]) // Clear campaigns on error
//       hideLoader()
//     }
//   }

//   const handleSearch = () => {
//     getAllMyCampaigns(searchText, selectedFilter)
//   }

//   const handleSearchTextChange = (text) => {
//     setSearchText(text)
//     // If search text is cleared, fetch all campaigns for current filter
//     if (text.trim() === '') {
//       getAllMyCampaigns('', selectedFilter)
//     }
//   }

//   const handleCategoryPress = (category) => {
//     console.log('Selected category:', category);
//     setSelectedCategory(category)

//     // Clear search when changing category
//     setSearchText('')

//     const newFilter = getCategoryFilter(category)
//     setSelectedFilter(newFilter)

//     // Fetch campaigns for new category without search
//     getAllMyCampaigns('', newFilter)
//   }

//   const handleClearSearch = () => {
//     setSearchText('')
//     getAllMyCampaigns('', selectedFilter)
//   }

//   const formatNumber = (num) => {
//     if (num >= 1000000) {
//       return (num / 1000000).toFixed(1) + 'M'
//     } else if (num >= 1000) {
//       return (num / 1000).toFixed(1) + 'K'
//     }
//     return num.toString()
//   }

//   const StatisticsCard = () => (
//     <View style={styles.statisticsCard}>
//       {/* Header Section */}
//       <View style={styles.cardHeader}>
//         <Text style={styles.cardHeaderText}>Campaign</Text>
//         <Icon name="calendar-outline" size={18} color="#fff" />
//       </View>

//       {/* Main Stats */}
//       <View style={styles.mainStats}>
//         <Text style={styles.mainNumber}>{statusCount?.Active || 0}</Text>
//         <Text style={styles.mainLabel}>Active</Text>
//       </View>

//       {/* Bottom Stats Row */}
//       <View style={styles.bottomStats}>
//         <View style={styles.bottomStatItem}>
//           <View style={styles.statDot} />
//           <Text style={styles.bottomStatNumber}>{statusCount?.Current || 0}</Text>
//         </View>
//         <View style={styles.bottomStatItem}>
//           <View style={[styles.statDot, {backgroundColor: '#FFA100'}]} />
//           <Text style={styles.bottomStatNumber}>{statusCount?.Future || 0}</Text>
//         </View>
//         <View style={styles.bottomStatItem}>
//           <View style={[styles.statDot, {backgroundColor: App_Primary_color}]} />
//           <Text style={styles.bottomStatNumber}>{statusCount?.Past || 0}</Text>
//         </View>
//         <View style={styles.bottomStatItem}>
//           <View style={[styles.statDot, {backgroundColor: '#9CA3AF'}]} />
//           <Text style={styles.bottomStatNumber}>{statusCount?.Total || 0}</Text>
//         </View>
//       </View>
//     </View>
//   )

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
//       style={styles.campaignCard}
//       onPress={() => navigation.navigate('BrandCapmaignDetail', {campaignId: item?._id})}>

//       {/* Card Image */}
//       <View style={styles.cardImageContainer}>
//         <Image
//           source={{uri: item.Assets}}
//           style={styles.cardImage}
//         />
//       </View>

//       {/* Card Content */}
//       <View style={styles.cardContent}>
//         <Text style={styles.hubName}>{item?.Title}</Text>
//         <Text style={styles.categoryName}>{item?.Description}</Text>

//         <SpaceBetweenRow style={styles.cardFooter}>
//           <View>
//             <Text style={styles.attendeesText}>Attendees</Text>
//           </View>
//           <View style={styles.attendeesContainer}>
//             <View style={styles.avatarContainer}>
//               <Image
//                 source={IMG.AvatorImage}
//                 style={styles.avatarImage}
//               />
//             </View>
//             <Text style={styles.attendeesCount}>{item?.attendees || 12}</Text>
//           </View>
//         </SpaceBetweenRow>

//         {/* Status Badge */}
//         <View style={styles.statusContainer}>
//           <View style={[styles.statusBadge, {backgroundColor: '#00CD52'}]}>
//             <Text style={styles.statusText}>{item?.Status}</Text>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   )

//   return (
//     <>
//     <ScrollView style={styles.container}>
//       <StatusBar
//         backgroundColor={App_Primary_color}
//         barStyle='light-content'
//         translucent={false}
//       />

//       <View style={styles.header}>
//         <SpaceBetweenRow>
//           <Row>
//             <Image
//               source={IMG.userProfileImage}
//               style={styles.profileImage}
//             />
//           </Row>
//           <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
//             <Notification />
//           </TouchableOpacity>
//         </SpaceBetweenRow>

//         <CustomText style={styles.welcomeText}>
//           Welcome {selector?.FirstName}
//         </CustomText>

//         <SpaceBetweenRow>
//           <StatisticsCard />
//         </SpaceBetweenRow>

//         <View style={styles.searchContainer}>
//           <Row style={styles.searchInputContainer}>
//             <SearchIcons />
//             <TextInput
//               placeholderTextColor={'gray'}
//               placeholder='Search by campaign name, category or status'
//               style={styles.searchInput}
//               value={searchText}
//               onChangeText={handleSearchTextChange}
//               onSubmitEditing={handleSearch}
//             />
//             {searchText.length > 0 && (
//               <TouchableOpacity
//                 onPress={handleClearSearch}
//                 style={styles.clearButton}>
//                 <Icon name="close-circle" size={20} color="gray" />
//               </TouchableOpacity>
//             )}
//           </Row>
//           <CustomButton
//             title={'Search Campaign'}
//             style={styles.searchButton}
//             onPress={handleSearch}
//           />
//         </View>
//       </View>

//       {/* Content Container */}
//       <ScrollView
//         style={styles.contentContainer}
//         showsVerticalScrollIndicator={false}>

//         {/* Filter Buttons */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.filterContainer}>
//           {categories.map((category) => (
//             <CategoryButton
//               key={category}
//               title={category}
//               isSelected={selectedCategory === category}
//               onPress={() => handleCategoryPress(category)}
//             />
//           ))}
//         </ScrollView>

//         {/* Section Header */}
//         <SpaceBetweenRow style={styles.sectionHeader}>
//           <CustomText style={styles.sectionTitle}>
//             {selectedCategory}
//             {searchText.trim() && (
//               <Text style={styles.searchResultsText}>
//                 {` (${myCampaigns.length} results for "${searchText}")`}
//               </Text>
//             )}
//           </CustomText>
//           <TouchableOpacity onPress={() => navigation.navigate('BrandBokingList')}>
//             <CustomText style={styles.seeAllText}>
//               See All <Text>{">"}</Text>
//             </CustomText>
//           </TouchableOpacity>
//         </SpaceBetweenRow>

//         {/* Campaign Cards */}
//         <View style={styles.cardsContainer}>
//           {myCampaigns.length > 0 ? (
//             myCampaigns.map((item, index) => (
//               <CampaignCard key={item._id || index} item={item} index={index} />
//             ))
//           ) : (
//             <View style={styles.noResultsContainer}>
//               <Icon name="search" size={50} color="#9CA3AF" />
//               <Text style={styles.noResultsText}>
//                 {searchText.trim()
//                   ? `No campaigns found for "${searchText}"`
//                   : `No ${selectedCategory.toLowerCase()} campaigns available`}
//               </Text>
//               {searchText.trim() && (
//                 <TouchableOpacity
//                   onPress={handleClearSearch}
//                   style={styles.clearSearchButton}>
//                   <Text style={styles.clearSearchText}>Clear Search</Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//           )}
//         </View>

//         <View style={styles.bottomPadding} />
//       </ScrollView>
//     </ScrollView>

//     {/* Floating Action Button */}
//     <TouchableOpacity
//       style={styles.floatingButton}
//       onPress={() => navigation.navigate('CreateCampaign')}>
//       <Icon name="add" size={24} color="#fff" />
//     </TouchableOpacity>
//     </>
//   )
// }

// // Styles remain the same as original
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     backgroundColor: App_Primary_color,
//     paddingHorizontal: 16,
//     paddingVertical: 18,
//     gap: 10,
//     height: 280,
//   },
//   profileImage: {
//     height: 30,
//     width: 30
//   },
//   welcomeText: {
//     color: 'white',
//     fontSize: 24,
//     fontFamily: FONTS_FAMILY.Poppins_Medium
//   },
//   searchContainer: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 20,
//     position: 'absolute',
//     alignSelf: 'center',
//     width: '100%',
//     bottom: -110,
//     zIndex: 100,
//   },
//   searchInputContainer: {
//     borderWidth: 1,
//     borderColor: '#D1D5DB',
//     paddingHorizontal: 5,
//     borderRadius: 8,
//   },
//   searchInput: {
//     fontSize: 14,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     flex: 1,
//     color: 'black'
//   },
//   clearButton: {
//     paddingHorizontal: 5
//   },
//   searchButton: {
//     marginTop: 16,
//   },
//   contentContainer: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 130,
//   },

//   // Statistics Card Styles
//   statisticsCard: {
//     backgroundColor: '#FFFFFF26',
//     borderRadius: 12,
//     padding: 10,
//     width: '100%',
//     height: 112,
//     justifyContent: 'space-between',
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   cardHeaderText: {
//     fontSize: 10,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     color: '#fff',
//   },
//   mainStats: {
//     alignItems: 'flex-start',
//     flexDirection: 'row'
//   },
//   mainNumber: {
//     fontSize: 24,
//     fontFamily: FONTS_FAMILY.Poppins_Bold,
//     color: '#fff',
//   },
//   mainLabel: {
//     fontSize: 16,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     color: '#fff',
//     marginTop: 8,
//   },
//   bottomStats: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   bottomStatItem: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     gap: 3
//   },
//   statDot: {
//     height: 6,
//     width: 6,
//     borderRadius: 100,
//     backgroundColor: '#3170FA'
//   },
//   bottomStatNumber: {
//     fontSize: 12,
//     fontFamily: FONTS_FAMILY.Comfortaa_Medium,
//     color: '#fff',
//   },

//   // Filter Buttons
//   filterContainer: {
//     marginBottom: 20,
//   },
//   categoryButton: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 5,
//     paddingVertical: 5,
//     borderRadius: 6,
//     marginRight: 12,
//     borderWidth: 1,
//     borderColor: App_Primary_color,
//   },
//   selectedCategoryButton: {
//     backgroundColor: '#E53E3E',
//     borderColor: '#E53E3E',
//   },
//   categoryText: {
//     fontSize: 12,
//     color: App_Primary_color,
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   selectedCategoryText: {
//     color: '#fff',
//   },

//   // Section Header
//   sectionHeader: {
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//     color: '#1F2937',
//   },
//   searchResultsText: {
//     fontSize: 12,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     color: '#6B7280',
//   },
//   seeAllText: {
//     fontSize: 14,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     color: '#3D0066',
//   },

//   // No Results Styles
//   noResultsContainer: {
//     alignItems: 'center',
//     paddingVertical: 40,
//   },
//   noResultsText: {
//     fontSize: 16,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     color: '#6B7280',
//     textAlign: 'center',
//     marginTop: 16,
//     marginBottom: 20,
//   },
//   clearSearchButton: {
//     backgroundColor: App_Primary_color,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   clearSearchText: {
//     color: '#fff',
//     fontSize: 14,
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },

//   // Cards Container
//   cardsContainer: {
//     gap: 16,
//   },

//   // Campaign Card Styles
//   campaignCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.12,
//     shadowRadius: 8,
//     elevation: 6,
//     borderWidth: 0.5,
//     borderColor: 'rgba(0,0,0,0.05)',
//     marginBottom: 5,
//     marginHorizontal: 5,
//     padding: 10,
//   },

//   // Card Image
//   cardImageContainer: {
//     height: 160,
//   },
//   cardImage: {
//     width: '100%',
//     height: '95%',
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10
//   },

//   // Card Content
//   cardContent: {
//     // Removed padding since it's already on parent
//   },
//   hubName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1F2937',
//     fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//     marginBottom: 4,
//   },
//   categoryName: {
//     fontSize: 12,
//     color: '#6B7280',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     marginBottom: 12,
//   },

//   // Card Footer
//   cardFooter: {
//     alignItems: 'center',
//     backgroundColor: '#D43C3114',
//     paddingHorizontal: 8,
//     borderRadius: 20,
//     paddingVertical: 5
//   },
//   attendeesText: {
//     fontSize: 13,
//     color: 'black',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   attendeesContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   avatarContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatarImage: {
//     height: 22,
//     width: 22
//   },
//   attendeesCount: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1F2937',
//     fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//   },

//   // Status Badge
//   statusContainer: {
//     position: 'absolute',
//     top: 16,
//     right: 16,
//   },
//   statusBadge: {
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 18,
//   },
//   statusText: {
//     fontSize: 10,
//     fontWeight: '600',
//     color: '#fff',
//     fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//   },

//   // Floating Button
//   floatingButton: {
//     position: 'absolute',
//     bottom: 100,
//     right: 20,
//     backgroundColor: '#E53E3E',
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 4},
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//   },

//   // Extra padding at bottom
//   bottomPadding: {
//     height: 100
//   },
// })

// export default BrandHome

import React, {useEffect, useState, useCallback} from 'react'
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
  RefreshControl,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {FONTS_FAMILY} from '../../../assets/Fonts'
import {App_Primary_color} from '../../../common/Colors/colors'
import SpaceBetweenRow from '../../../components/wrapper/spacebetween'
import Row from '../../../components/wrapper/row'
import IMG from '../../../assets/Images'
import {Badge, Doller, Notification, SearchIcons} from '../../../assets/SVGs'
import CustomText from '../../../components/TextComponent'
import CustomButton from '../../../components/Button'
import {apiGet} from '../../../utils/Apis'
import urls from '../../../config/urls'
import useLoader from '../../../utils/LoaderHook'
import {useSelector} from 'react-redux'

const BrandHome = ({navigation}) => {
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Current Campaign')
  const [myCampaigns, setMyCampaigns] = useState([])
  const [statusCount, setStatusCount] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [searchTimeout, setSearchTimeout] = useState(null)

  const categories = ['Current Campaign', 'Future Campaign', 'Past Campaign']
  const {showLoader, hideLoader} = useLoader()

  let selector = useSelector(state => state?.user?.userData)
  if (Object.keys(selector).length != 0) {
    selector = JSON.parse(selector)
  }

  // Initial data load
  useEffect(() => {
    initializeData()
  }, [])

  // Handle search text changes with debounce
  useEffect(() => {
    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    // Set new timeout for search
    const timeoutId = setTimeout(() => {
      fetchCampaigns()
    }, 500) // 500ms debounce

    setSearchTimeout(timeoutId)

    // Cleanup timeout on unmount
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [searchText, selectedCategory])

  const initializeData = async () => {
    await Promise.all([getCampaignStatus(), fetchCampaigns()])
  }

  const getCategoryFilter = category => {
    switch (category) {
      case 'Current Campaign':
        return 'current'
      case 'Future Campaign':
        return 'future'
      case 'Past Campaign':
        return 'past'
      default:
        return 'current'
    }
  }

  const getCampaignStatus = async () => {
    try {
      const res = await apiGet('/api/brand/GetCampaignStatusCount')
      console.log('Campaign Status Count:', res)
      setStatusCount(res?.data || res)
    } catch (error) {
      console.log('Error fetching status count:', error)
      setStatusCount({})
    }
  }

  const fetchCampaigns = async (showLoading = true) => {
    try {
      if (showLoading) {
        showLoader()
      }

      const filter = getCategoryFilter(selectedCategory)
      let baseUrl = '/api/brand/GetAllMyCampaign'

      // Build query parameters
      const params = []
      params.push(`dateFilter=${encodeURIComponent(filter)}`)

      if (searchText && searchText.trim()) {
        params.push(`search=${encodeURIComponent(searchText.trim())}`)
      }

      // Construct final URL
      const finalUrl =
        params.length > 0 ? `${baseUrl}?${params.join('&')}` : baseUrl

      console.log('Fetching campaigns with URL:', finalUrl)
      console.log('Filter:', filter, 'Search:', searchText)

      const res = await apiGet(finalUrl)
      console.log('API Response:', res)

      // Handle different response structures
      let campaignsData = []
      if (res?.success && Array.isArray(res?.data)) {
        campaignsData = res.data
      } else if (Array.isArray(res?.data)) {
        campaignsData = res.data
      } else if (Array.isArray(res)) {
        campaignsData = res
      } else if (res?.data && Array.isArray(res.data.campaigns)) {
        campaignsData = res.data.campaigns
      }

      setMyCampaigns(campaignsData)

      if (showLoading) {
        hideLoader()
      }
    } catch (error) {
      console.log('Error fetching campaigns:', error)
      setMyCampaigns([])
      if (showLoading) {
        hideLoader()
      }
    }
  }

  const handleCategoryPress = category => {
    console.log('Selected category:', category)
    setSelectedCategory(category)

    // Don't clear search when changing category - let user search within category
    // If you want to clear search, uncomment the line below:
    // setSearchText('')
  }

  const handleSearchTextChange = text => {
    setSearchText(text)
  }

  const handleClearSearch = () => {
    setSearchText('')
  }

  const handleManualSearch = () => {
    fetchCampaigns()
  }

  // Pull to refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await initializeData()
    setRefreshing(false)
  }, [])

  const formatNumber = num => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num?.toString() || '0'
  }

  const StatisticsCard = () => (
    <View style={styles.statisticsCard}>
      {/* Header Section */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeaderText}>Campaign</Text>
        <Icon name='calendar-outline' size={18} color='#fff' />
      </View>

      {/* Main Stats */}
      <View style={styles.mainStats}>
        <Text style={styles.mainNumber}>
          {statusCount?.Active || statusCount?.active || 0}
        </Text>
        <Text style={styles.mainLabel}>Active</Text>
      </View>

      {/* Bottom Stats Row */}
      <View style={styles.bottomStats}>
        <View style={styles.bottomStatItem}>
          <View style={styles.statDot} />
          <Text style={styles.bottomStatNumber}>
            {statusCount?.Current || statusCount?.current || 0}
          </Text>
        </View>
        <View style={styles.bottomStatItem}>
          <View style={[styles.statDot, {backgroundColor: '#FFA100'}]} />
          <Text style={styles.bottomStatNumber}>
            {statusCount?.Future || statusCount?.future || 0}
          </Text>
        </View>
        <View style={styles.bottomStatItem}>
          <View
            style={[styles.statDot, {backgroundColor: App_Primary_color}]}
          />
          <Text style={styles.bottomStatNumber}>
            {statusCount?.Past || statusCount?.past || 0}
          </Text>
        </View>
        <View style={styles.bottomStatItem}>
          <View style={[styles.statDot, {backgroundColor: '#9CA3AF'}]} />
          <Text style={styles.bottomStatNumber}>
            {statusCount?.Total || statusCount?.total || 0}
          </Text>
        </View>
      </View>
    </View>
  )

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
      style={styles.campaignCard}
      onPress={() =>
        navigation.navigate('BrandCapmaignDetail', {campaignId: item?._id})
      }>
      {/* Card Image */}
      <View style={styles.cardImageContainer}>
        <Image
          source={item?.Assets ? {uri: item.Assets} : IMG.AvatorImage}
          style={styles.cardImage}
        />
      </View>

      {/* Card Content */}
      <View style={styles.cardContent}>
        <Text style={styles.hubName}>{item?.Title || 'Campaign Title'}</Text>
        <Text style={styles.categoryName}>
          {item?.Description || 'Campaign Description'}
        </Text>

        <SpaceBetweenRow style={styles.cardFooter}>
          <View>
            <Text style={styles.attendeesText}>Attendees</Text>
          </View>
          <View style={styles.attendeesContainer}>
            <View style={styles.avatarContainer}>
              <Image source={IMG.AvatorImage} style={styles.avatarImage} />
            </View>
            <Text style={styles.attendeesCount}>{item?.attendees || 12}</Text>
          </View>
        </SpaceBetweenRow>

        {/* Status Badge */}
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, {backgroundColor: '#00CD52'}]}>
            <Text style={styles.statusText}>{item?.Status || 'Active'}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[App_Primary_color]}
            tintColor={App_Primary_color}
          />
        }>
        <StatusBar
          backgroundColor={App_Primary_color}
          barStyle='light-content'
          translucent={false}
        />

        <View style={styles.header}>
          <SpaceBetweenRow>
            <Row>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TabBrand', {
                    screen: 'Profile',
                  })
                }>
                <Image
                  source={
                    selector?.Image
                      ? {uri: selector?.Image}
                      : IMG.userProfileImage
                  }
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            </Row>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}>
              <Notification />
            </TouchableOpacity>
          </SpaceBetweenRow>

          <CustomText style={styles.welcomeText}>
            Welcome {selector?.FirstName || 'User'}
          </CustomText>

          <SpaceBetweenRow>
            <StatisticsCard />
          </SpaceBetweenRow>

          <View style={styles.searchContainer}>
            <Row style={styles.searchInputContainer}>
              <SearchIcons />
              <TextInput
                placeholderTextColor={'gray'}
                placeholder='Search by campaign name, category or status'
                style={styles.searchInput}
                value={searchText}
                onChangeText={handleSearchTextChange}
                onSubmitEditing={handleManualSearch}
              />
              {searchText.length > 0 && (
                <TouchableOpacity
                  onPress={handleClearSearch}
                  style={styles.clearButton}>
                  <Icon name='close-circle' size={20} color='gray' />
                </TouchableOpacity>
              )}
            </Row>
            <CustomButton
              title={'Search Campaign'}
              style={styles.searchButton}
              onPress={handleManualSearch}
            />
          </View>
        </View>

        {/* Content Container */}
        <ScrollView
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          {/* Filter Buttons */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterContainer}>
            {categories.map(category => (
              <CategoryButton
                key={category}
                title={category}
                isSelected={selectedCategory === category}
                onPress={() => handleCategoryPress(category)}
              />
            ))}
          </ScrollView>

          {/* Section Header */}
          <SpaceBetweenRow style={styles.sectionHeader}>
            <CustomText style={styles.sectionTitle}>
              {selectedCategory}
              {searchText.trim() && (
                <Text style={styles.searchResultsText}>
                  {` (${myCampaigns.length} results for "${searchText}")`}
                </Text>
              )}
            </CustomText>
            <TouchableOpacity
              onPress={() => navigation.navigate('BrandBokingList')}>
              <CustomText style={styles.seeAllText}>
                See All <Text>{'>'}</Text>
              </CustomText>
            </TouchableOpacity>
          </SpaceBetweenRow>

          {/* Campaign Cards */}
          <View style={styles.cardsContainer}>
            {myCampaigns.length > 0 ? (
              myCampaigns.map((item, index) => (
                <CampaignCard
                  key={item._id || item.id || index}
                  item={item}
                  index={index}
                />
              ))
            ) : (
              <View style={styles.noResultsContainer}>
                <Icon name='search' size={50} color='#9CA3AF' />
                <Text style={styles.noResultsText}>
                  {searchText.trim()
                    ? `No campaigns found for "${searchText}" in ${selectedCategory}`
                    : `No ${selectedCategory.toLowerCase()} available`}
                </Text>
                {searchText.trim() && (
                  <TouchableOpacity
                    onPress={handleClearSearch}
                    style={styles.clearSearchButton}>
                    <Text style={styles.clearSearchText}>Clear Search</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('CreateCampaign')}>
        <Icon name='add' size={24} color='#fff' />
      </TouchableOpacity>
    </>
  )
}

// Styles remain the same as original
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: App_Primary_color,
    paddingHorizontal: 16,
    paddingVertical: 18,
    gap: 10,
    height: 280,
  },
  profileImage: {
    height: 30,
    width: 30,
    borderRadius: 100,
  },
  welcomeText: {
    color: 'white',
    fontSize: 24,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  searchContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    position: 'absolute',
    alignSelf: 'center',
    width: '100%',
    bottom: -110,
    zIndex: 100,
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
  clearButton: {
    paddingHorizontal: 5,
  },
  searchButton: {
    marginTop: 16,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 130,
  },

  // Statistics Card Styles
  statisticsCard: {
    backgroundColor: '#FFFFFF26',
    borderRadius: 12,
    padding: 10,
    width: '100%',
    height: 112,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeaderText: {
    fontSize: 10,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    color: '#fff',
  },
  mainStats: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  mainNumber: {
    fontSize: 24,
    fontFamily: FONTS_FAMILY.Poppins_Bold,
    color: '#fff',
  },
  mainLabel: {
    fontSize: 16,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    color: '#fff',
    marginTop: 8,
  },
  bottomStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomStatItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 3,
  },
  statDot: {
    height: 6,
    width: 6,
    borderRadius: 100,
    backgroundColor: '#3170FA',
  },
  bottomStatNumber: {
    fontSize: 12,
    fontFamily: FONTS_FAMILY.Comfortaa_Medium,
    color: '#fff',
  },

  // Filter Buttons
  filterContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 12,
    borderWidth: 1,
    borderColor: App_Primary_color,
  },
  selectedCategoryButton: {
    backgroundColor: '#E53E3E',
    borderColor: '#E53E3E',
  },
  categoryText: {
    fontSize: 12,
    color: App_Primary_color,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  selectedCategoryText: {
    color: '#fff',
  },

  // Section Header
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    color: '#1F2937',
  },
  searchResultsText: {
    fontSize: 12,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    color: '#6B7280',
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    color: '#3D0066',
  },

  // No Results Styles
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  clearSearchButton: {
    backgroundColor: App_Primary_color,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  clearSearchText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },

  // Cards Container
  cardsContainer: {
    gap: 16,
  },

  // Campaign Card Styles
  campaignCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.05)',
    marginBottom: 5,
    marginHorizontal: 5,
    padding: 10,
  },

  // Card Image
  cardImageContainer: {
    height: 160,
  },
  cardImage: {
    width: '100%',
    height: '95%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  // Card Content
  cardContent: {
    // Removed padding since it's already on parent
  },
  hubName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    marginBottom: 12,
  },

  // Card Footer
  cardFooter: {
    alignItems: 'center',
    backgroundColor: '#D43C3114',
    paddingHorizontal: 8,
    borderRadius: 20,
    paddingVertical: 5,
  },
  attendeesText: {
    fontSize: 13,
    color: 'black',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    height: 22,
    width: 22,
  },
  attendeesCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
  },

  // Status Badge
  statusContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 18,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
  },

  // Floating Button
  floatingButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#E53E3E',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  // Extra padding at bottom
  bottomPadding: {
    height: 100,
  },
})

export default BrandHome
