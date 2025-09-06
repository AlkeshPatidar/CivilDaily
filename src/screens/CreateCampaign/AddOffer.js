// import React, {useState, useEffect} from 'react'
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   Image,
//   Alert,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native'
// import Icon from 'react-native-vector-icons/MaterialIcons'
// import {launchImageLibrary} from 'react-native-image-picker'
// import DatePicker from 'react-native-date-picker'
// import {FONTS_FAMILY} from '../../assets/Fonts'
// import IMG from '../../assets/Images'
// import {App_Primary_color} from '../../common/Colors/colors'
// import {BackArrow, Label} from '../../assets/SVGs'
// import Row from '../../components/wrapper/row'
// import useLoader from '../../utils/LoaderHook'
// import { ToastMsg } from '../../utils/helperFunctions'
// import { getItem, apiGet } from '../../utils/Apis'
// import { urls } from '../../utils/Apis'

// const AddOffer = ({navigation, route}) => {
//   const [title, setTitle] = useState('')
//   const [description, setDescription] = useState('')
//   const [selectedCampaign, setSelectedCampaign] = useState('')
//   const [location, setLocation] = useState('')
//   const [averageDailyImpressions, setAverageDailyImpressions] = useState('')
//   const [timeSlot, setTimeSlot] = useState('')
//   const [adDurationMinutes, setAdDurationMinutes] = useState('')
//   const [Expectations, setExpectations] = useState('')

//   const [selectedFile, setSelectedFile] = useState(null)

//   // Date states
//   const [startDate, setStartDate] = useState(new Date())
//   const [endDate, setEndDate] = useState(new Date())
//   const [showStartDatePicker, setShowStartDatePicker] = useState(false)
//   const [showEndDatePicker, setShowEndDatePicker] = useState(false)

//   const [campaigns, setCampaigns] = useState([])
//   const [offerDetail, setOfferDetail] = useState(null)
//   const [isEditMode, setIsEditMode] = useState(false)
//   const {showLoader, hideLoader} = useLoader()

//   const locations = [
//     {name: 'Red', value: 'red'},
//     {name: 'Blue', value: 'blue'},
//     {name: 'Green', value: 'green'},
//     {name: 'Yellow', value: 'yellow'},
//     {name: 'Purple', value: 'purple'},
//     {name: 'Orange', value: 'orange'},
//   ]

//   const timeSlots = [
//     '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
//     '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
//     '21', '22', '23', '24'
//   ]

//   // Check if we're in edit mode and fetch offer details
//   useEffect(() => {
//     // getCampaigns()

//     if (route?.params?.offerId) {
//       setIsEditMode(true)
//       getOfferDetail()
//     }
//   }, [route?.params?.offerId])

//   // Populate form when offer details are loaded
//   useEffect(() => {
//     if (offerDetail && isEditMode) {
//       setTitle(offerDetail.Title || '')
//       setDescription(offerDetail.Description || '')
//       setSelectedCampaign(offerDetail.Campaign || '')
//       setLocation(offerDetail.Location || '')
//       setAverageDailyImpressions(offerDetail.AverageDailyImpressions?.toString() || '')
//       setTimeSlot(offerDetail.TimeSlot?.toString() || '')
//       setAdDurationMinutes(offerDetail.AdDurationMinutes?.toString() || '')
//       setExpectations(offerDetail.Expectations || '')

//       // Parse dates
//       if (offerDetail.StartDate) {
//         setStartDate(new Date(offerDetail.StartDate))
//       }
//       if (offerDetail.EndDate) {
//         setEndDate(new Date(offerDetail.EndDate))
//       }

//       // Set existing image as selected file
//       if (offerDetail.Image) {
//         setSelectedFile({
//           uri: offerDetail.Image,
//           fileName: 'existing_image.jpg',
//           type: 'image/jpeg'
//         })
//       }
//     }
//   }, [offerDetail, isEditMode])

//   // const getCampaigns = async () => {
//   //   try {
//   //     showLoader()
//   //     const res = await apiGet('/api/brand/GetCampaigns')
//   //     setCampaigns(res?.data || [])
//   //     // console.log('Campaigns:', res?.data)
//   //     hideLoader()
//   //   } catch (error) {
//   //     console.log('Error fetching campaigns:', error)
//   //     ToastMsg('Failed to load campaigns')
//   //     hideLoader()
//   //   }
//   // }

//   const getOfferDetail = async () => {
//     try {
//       showLoader()
//       const res = await apiGet(`/api/brand/GetOfferDetail/${route?.params?.offerId}`)
//       setOfferDetail(res?.data)
//       console.log('Offer Detail:', res?.data)
//       hideLoader()
//     } catch (error) {
//       console.log('Error fetching offer details:', error)
//       ToastMsg('Failed to load offer details')
//       hideLoader()
//     }
//   }

//   const handleImageUpload = () => {
//     const options = {
//       mediaType: 'photo',
//       includeBase64: false,
//       maxHeight: 2000,
//       maxWidth: 2000,
//       quality: 0.8,
//     }

//     launchImageLibrary(options, (response) => {
//       if (response.didCancel || response.error) {
//         return
//       }

//       if (response.assets && response.assets[0]) {
//         setSelectedFile(response.assets[0])
//       }
//     })
//   }

//   const formatDate = (date) => {
//     const day = date.getDate().toString().padStart(2, '0')
//     const month = (date.getMonth() + 1).toString().padStart(2, '0')
//     const year = date.getFullYear()
//     return `${day}-${month}-${year}`
//   }

//   const validateForm = () => {
//     if (!title.trim()) {
//       ToastMsg('Please enter offer title')
//       return false
//     }
//     if (!description.trim()) {
//       ToastMsg('Please enter description')
//       return false
//     }

//     if (!averageDailyImpressions.trim()) {
//       ToastMsg('Please enter average daily impressions')
//       return false
//     }
//     if (!timeSlot) {
//       ToastMsg('Please select a time slot')
//       return false
//     }
//     if (!adDurationMinutes.trim()) {
//       ToastMsg('Please enter ad duration in minutes')
//       return false
//     }
//     if (!selectedFile) {
//       ToastMsg('Please select an image')
//       return false
//     }
//      if (!Expectations) {
//       ToastMsg('Please Enter Expectations')
//       return false
//     }
//     if (endDate <= startDate) {
//       ToastMsg('End date must be after start date')
//       return false
//     }
//     return true
//   }

//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       return
//     }

//     try {
//       showLoader()

//       const token = await getItem('token')

//       const myHeaders = new Headers()
//       myHeaders.append('Authorization', `Bearer ${token}`)

//       const formdata = new FormData()

//       // Only append image if it's a new file (not the existing URL)
//       if (selectedFile && !selectedFile.uri.startsWith('http')) {
//         formdata.append('Image', {
//           uri: selectedFile.uri,
//           type: selectedFile.type,
//           name: selectedFile.fileName || 'offer_image.jpg',
//         })
//       }

//       formdata.append('Title', title.trim())
//       formdata.append('Campaign', route?.params?.campaignId || selectedCampaign)
//       formdata.append('Location', location)
//       formdata.append('AverageDailyImpressions', averageDailyImpressions)
//       formdata.append('StartDate', formatDate(startDate))
//       formdata.append('EndDate', formatDate(endDate))
//       formdata.append('TimeSlot', timeSlot)
//       formdata.append('AdDurationMinutes', adDurationMinutes)
//       formdata.append('Description', description.trim())

//       formdata.append('Expectations', Expectations.trim())


//       const apiUrl = isEditMode 
//         ? `https://influencer-brands-backend.vercel.app/api/brand/UpdateOffer/${route?.params?.offerId}`
//         : 'https://influencer-brands-backend.vercel.app/api/brand/CreateOffer'

//       const requestOptions = {
//         method: isEditMode ? 'PUT' : 'POST',
//         headers: myHeaders,
//         body: formdata,
//         redirect: 'follow',
//       }

//       const response = await fetch(apiUrl, requestOptions)
//       const result = await response.text()
//       console.log('API Response:', result)

//       hideLoader()

//       if (response.ok) {
//         ToastMsg(isEditMode ? 'Offer updated successfully!' : 'Offer created successfully!')
//         navigation.goBack()
//       } else {
//         ToastMsg(isEditMode ? 'Failed to update offer. Please try again.' : 'Failed to create offer. Please try again.')
//       }
//     } catch (error) {
//       hideLoader()
//       console.error('API Error:', error)
//       ToastMsg('Network error. Please check your connection and try again.')
//     }
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}>
//           <BackArrow />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>
//           {isEditMode ? 'Edit Offer' : 'Add Offer'}
//         </Text>
//         <View style={styles.placeholder} />
//       </View>

//       <KeyboardAvoidingView 
//         style={{flex: 1}} 
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         <ScrollView 
//           style={styles.content}
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//         >
//           {/* Title */}
//           <View style={styles.formSection}>
//             <View style={styles.section}>
//               <Row style={{gap: 15, marginBottom: 10}}>
//                 <Label />
//                 <Text style={styles.radioText}>Offer Title</Text>
//               </Row>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={styles.textInput}
//                   value={title}
//                   onChangeText={setTitle}
//                   placeholder="Enter offer title"
//                   placeholderTextColor={'gray'}
//                 />
//               </View>
//             </View>
//           </View>

//           {/* Description */}
//           <View style={styles.formSection}>
//             <View style={styles.section}>
//               <Row style={{gap: 15, marginBottom: 10}}>
//                 <Label />
//                 <Text style={styles.radioText}>Description</Text>
//               </Row>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={styles.textInput}
//                   value={description}
//                   multiline
//                   numberOfLines={3}
//                   onChangeText={setDescription}
//                   placeholder="Enter description"
//                   placeholderTextColor={'gray'}
//                 />
//               </View>
//             </View>
//           </View>

//           {/* Campaign Selection */}
//           {/* <View style={styles.formSection}>
//             <View style={styles.section}>
//               <Row style={{gap: 15, marginBottom: 10}}>
//                 <Label />
//                 <Text style={styles.radioText}>Select Campaign</Text>
//               </Row>
//               <ScrollView 
//                 horizontal 
//                 showsHorizontalScrollIndicator={false}
//                 style={styles.categoryScroll}
//               >
//                 {campaigns.map((campaign, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     style={[
//                       styles.categoryButton,
//                       selectedCampaign === campaign._id && styles.selectedCategoryButton,
//                     ]}
//                     onPress={() => setSelectedCampaign(campaign._id)}>
//                     <Text
//                       style={[
//                         styles.categoryButtonText,
//                         selectedCampaign === campaign._id && styles.selectedCategoryButtonText,
//                       ]}>
//                       {campaign.Title}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </ScrollView>
//             </View>
//           </View> */}

//           {/* Location Selection
//           <View style={styles.formSection}>
//             <View style={styles.section}>
//               <Row style={{gap: 15, marginBottom: 10}}>
//                 <Label />
//                 <Text style={styles.radioText}>Select Location</Text>
//               </Row>
//               <View style={styles.colorContainer}>
//                 {locations.map((locationItem, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     style={[
//                       styles.colorButton,
//                       {backgroundColor: locationItem.value},
//                       location === locationItem.value && styles.selectedColorButton,
//                     ]}
//                     onPress={() => setLocation(locationItem.value)}>
//                     {location === locationItem.value && (
//                       <Icon name="check" size={16} color="white" />
//                     )}
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </View>
//            </View> */}

//           {/* Average Daily Impressions */}
//           <View style={styles.formSection}>
//             <View style={styles.section}>
//               <Row style={{gap: 15, marginBottom: 10}}>
//                 <Label />
//                 <Text style={styles.radioText}>Average Daily Impressions</Text>
//               </Row>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={styles.textInput}
//                   value={averageDailyImpressions}
//                   onChangeText={setAverageDailyImpressions}
//                   placeholder="Enter average daily impressions"
//                   placeholderTextColor={'gray'}
//                   keyboardType="numeric"
//                 />
//               </View>
//             </View>
//           </View>

//           {/* Start Date */}
//           <View style={styles.formSection}>
//             <View style={styles.section}>
//               <Row style={{gap: 15, marginBottom: 10}}>
//                 <Label />
//                 <Text style={styles.radioText}>Start Date</Text>
//               </Row>
//               <TouchableOpacity 
//                 style={styles.dateButton}
//                 onPress={() => setShowStartDatePicker(true)}
//               >
//                 <Text style={styles.dateText}>
//                   {formatDate(startDate)}
//                 </Text>
//                 <Icon name="date-range" size={20} color="#666" />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* End Date */}
//           <View style={styles.formSection}>
//             <View style={styles.section}>
//               <Row style={{gap: 15, marginBottom: 10}}>
//                 <Label />
//                 <Text style={styles.radioText}>End Date</Text>
//               </Row>
//               <TouchableOpacity 
//                 style={styles.dateButton}
//                 onPress={() => setShowEndDatePicker(true)}
//               >
//                 <Text style={styles.dateText}>
//                   {formatDate(endDate)}
//                 </Text>
//                 <Icon name="date-range" size={20} color="#666" />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Time Slot */}
//           <View style={styles.formSection}>
//             <View style={styles.section}>
//               <Row style={{gap: 15, marginBottom: 10}}>
//                 <Label />
//                 <Text style={styles.radioText}>Time Slot (Hours)</Text>
//               </Row>
//               <ScrollView 
//                 horizontal 
//                 showsHorizontalScrollIndicator={false}
//                 style={styles.categoryScroll}
//               >
//                 {timeSlots.map((slot, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     style={[
//                       styles.timeSlotButton,
//                       timeSlot === slot && styles.selectedTimeSlotButton,
//                     ]}
//                     onPress={() => setTimeSlot(slot)}>
//                     <Text
//                       style={[
//                         styles.timeSlotButtonText,
//                         timeSlot === slot && styles.selectedTimeSlotButtonText,
//                       ]}>
//                       {slot}:00
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </ScrollView>
//             </View>
//           </View>

//           {/* Ad Duration */}
//           <View style={styles.formSection}>
//             <View style={styles.section}>
//               <Row style={{gap: 15, marginBottom: 10}}>
//                 <Label />
//                 <Text style={styles.radioText}>Ad Duration (Minutes)</Text>
//               </Row>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={styles.textInput}
//                   value={adDurationMinutes}
//                   onChangeText={setAdDurationMinutes}
//                   placeholder="Enter ad duration in minutes"
//                   placeholderTextColor={'gray'}
//                   keyboardType="numeric"
//                 />
//               </View>
//             </View>
//           </View>

//             <View style={styles.formSection}>
//             <View style={styles.section}>
//               <Row style={{gap: 15, marginBottom: 10}}>
//                 <Label />
//                 <Text style={styles.radioText}>Expectations</Text>
//               </Row>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={styles.textInput}
//                   value={Expectations}
//                   onChangeText={setExpectations}
//                   placeholder="Enter expectations"
//                   placeholderTextColor={'gray'}
//                 />
//               </View>
//             </View>
//           </View>

//           {/* Image Upload */}
//           <View style={styles.formSection}>
//             <View style={styles.section}>
//               <Row style={{gap: 15, marginBottom: 10}}>
//                 <Label />
//                 <Text style={styles.radioText}>Upload Offer Image</Text>
//               </Row>
//               <TouchableOpacity
//                 style={styles.uploadContainer}
//                 onPress={handleImageUpload}>
//                 {selectedFile ? (
//                   <View style={styles.selectedImageContainer}>
//                     <Image
//                       source={{uri: selectedFile.uri}}
//                       style={styles.selectedImage}
//                       resizeMode="cover"
//                     />
//                     <Text style={styles.selectedImageText}>
//                       {selectedFile.fileName || 'Image selected'}
//                     </Text>
//                   </View>
//                 ) : (
//                   <>
//                     <View style={styles.uploadIcon}>
//                       <Icon name="cloud-upload" size={24} color="#666" />
//                     </View>
//                     <Text style={styles.uploadTitle}>Upload Offer Image</Text>
//                     <Text style={styles.uploadSubtitle}>
//                       Tap to select an image from your gallery
//                     </Text>
//                   </>
//                 )}
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Submit Button */}
//           <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//             <Text style={styles.submitButtonText}>
//               {isEditMode ? 'Update Offer' : 'Create Offer'}
//             </Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </KeyboardAvoidingView>

//       {/* Date Pickers */}
//       <DatePicker
//         modal
//         open={showStartDatePicker}
//         date={startDate}
//         mode="date"
//         onConfirm={(date) => {
//           setShowStartDatePicker(false)
//           setStartDate(date)
//         }}
//         onCancel={() => {
//           setShowStartDatePicker(false)
//         }}
//       />

//       <DatePicker
//         modal
//         open={showEndDatePicker}
//         date={endDate}
//         mode="date"
//         onConfirm={(date) => {
//           setShowEndDatePicker(false)
//           setEndDate(date)
//         }}
//         onCancel={() => {
//           setShowEndDatePicker(false)
//         }}
//       />
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomColor: '#f0f0f0',
//     backgroundColor: App_Primary_color,
//   },
//   backButton: {
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     flex: 1,
//     fontSize: 18,
//     fontWeight: '600',
//     color: 'white',
//     textAlign: 'center',
//   },
//   placeholder: {
//     width: 40,
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   formSection: {
//     padding: 15,
//     borderRadius: 12,
//     backgroundColor: 'white',
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   section: {},
//   inputContainer: {
//     borderColor: '#e0e0e0',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//     minHeight: 48,
//     backgroundColor: '#f9f9f9',
//   },
//   textInput: {
//     fontSize: 16,
//     color: '#333',
//     flex: 1,
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   radioText: {
//     fontSize: 16,
//     color: '#333',
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//     fontWeight: '600',
//   },
//   categoryScroll: {
//     marginTop: 5,
//   },
//   categoryButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: '#f0f0f0',
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   selectedCategoryButton: {
//     backgroundColor: App_Primary_color,
//     borderColor: App_Primary_color,
//   },
//   categoryButtonText: {
//     fontSize: 14,
//     color: '#666',
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   selectedCategoryButtonText: {
//     color: 'white',
//   },
//   colorContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 10,
//     marginTop: 5,
//   },
//   colorButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: 'transparent',
//   },
//   selectedColorButton: {
//     borderColor: '#333',
//     borderWidth: 3,
//   },
//   dateButton: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderColor: '#e0e0e0',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//     backgroundColor: '#f9f9f9',
//     minHeight: 48,
//   },
//   dateText: {
//     fontSize: 16,
//     color: '#333',
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   timeSlotButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 16,
//     backgroundColor: '#f0f0f0',
//     marginRight: 8,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     minWidth: 60,
//     alignItems: 'center',
//   },
//   selectedTimeSlotButton: {
//     backgroundColor: App_Primary_color,
//     borderColor: App_Primary_color,
//   },
//   timeSlotButtonText: {
//     fontSize: 12,
//     color: '#666',
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   selectedTimeSlotButtonText: {
//     color: 'white',
//   },
//   uploadContainer: {
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     borderRadius: 8,
//     paddingVertical: 30,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//     backgroundColor: '#fafafa',
//     borderStyle: 'dashed',
//   },
//   uploadIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   uploadTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 8,
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   uploadSubtitle: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//     lineHeight: 20,
//   },
//   selectedImageContainer: {
//     alignItems: 'center',
//   },
//   selectedImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   selectedImageText: {
//     fontSize: 14,
//     color: '#333',
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   submitButton: {
//     backgroundColor: App_Primary_color,
//     borderRadius: 8,
//     paddingVertical: 16,
//     alignItems: 'center',
//     marginBottom: 30,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   submitButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#fff',
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
// })

// export default AddOffer


import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { launchImageLibrary } from 'react-native-image-picker'
import DatePicker from 'react-native-date-picker'
import { FONTS_FAMILY } from '../../assets/Fonts'
import IMG from '../../assets/Images'
import { App_Primary_color, darkMode25 } from '../../common/Colors/colors'
import { BackArrow, Label } from '../../assets/SVGs'
import Row from '../../components/wrapper/row'
import useLoader from '../../utils/LoaderHook'
import { ToastMsg } from '../../utils/helperFunctions'
import { getItem, apiGet } from '../../utils/Apis'
import { urls } from '../../utils/Apis'
import { useSelector } from 'react-redux'

const AddOffer = ({ navigation, route }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedCampaign, setSelectedCampaign] = useState('')
  const [location, setLocation] = useState('')
  const [averageDailyImpressions, setAverageDailyImpressions] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [adDurationMinutes, setAdDurationMinutes] = useState('')
  const [expectations, setExpectations] = useState('')

  const [selectedFile, setSelectedFile] = useState(null)

  // Date states
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)

  const [campaigns, setCampaigns] = useState([])
  const [offerDetail, setOfferDetail] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const { showLoader, hideLoader } = useLoader()

  const locations = [
    { name: 'Red', value: 'red' },
    { name: 'Blue', value: 'blue' },
    { name: 'Green', value: 'green' },
    { name: 'Yellow', value: 'yellow' },
    { name: 'Purple', value: 'purple' },
    { name: 'Orange', value: 'orange' },
  ]

  const timeSlots = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24'
  ]

  // Check if we're in edit mode and fetch offer details
  useEffect(() => {
    // getCampaigns()

    if (route?.params?.offerId) {
      setIsEditMode(true)
      getOfferDetail()
    }
  }, [route?.params?.offerId])

  // Populate form when offer details are loaded
  useEffect(() => {
    if (offerDetail && isEditMode) {
      setTitle(offerDetail.Title || '')
      setDescription(offerDetail.Description || '')
      setSelectedCampaign(offerDetail.Campaign || '')
      setLocation(offerDetail.Location || '')
      setAverageDailyImpressions(offerDetail.AverageDailyImpressions?.toString() || '')
      setTimeSlot(offerDetail.TimeSlot?.toString() || '')
      setAdDurationMinutes(offerDetail.AdDurationMinutes?.toString() || '')
      setExpectations(offerDetail.Expectations || '')

      // Parse dates
      if (offerDetail.StartDate) {
        setStartDate(new Date(offerDetail.StartDate))
      }
      if (offerDetail.EndDate) {
        setEndDate(new Date(offerDetail.EndDate))
      }

      // Set existing image as selected file
      if (offerDetail.Image) {
        setSelectedFile({
          uri: offerDetail.Image,
          fileName: 'existing_image.jpg',
          type: 'image/jpeg'
        })
      }
    }
  }, [offerDetail, isEditMode])

  // const getCampaigns = async () => {
  //   try {
  //     showLoader()
  //     const res = await apiGet('/api/brand/GetCampaigns')
  //     setCampaigns(res?.data || [])
  //     // console.log('Campaigns:', res?.data)
  //     hideLoader()
  //   } catch (error) {
  //     console.log('Error fetching campaigns:', error)
  //     ToastMsg('Failed to load campaigns')
  //     hideLoader()
  //   }
  // }

  const getOfferDetail = async () => {
    try {
      showLoader()
      const res = await apiGet(`/api/brand/GetOfferDetail/${route?.params?.offerId}`)
      setOfferDetail(res?.data)
      console.log('Offer Detail:', res?.data)
      hideLoader()
    } catch (error) {
      console.log('Error fetching offer details:', error)
      ToastMsg('Failed to load offer details')
      hideLoader()
    }
  }

  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8,
    }

    launchImageLibrary(options, (response) => {
      if (response.didCancel || response.error) {
        return
      }

      if (response.assets && response.assets[0]) {
        setSelectedFile(response.assets[0])
      }
    })
  }

  const formatDate = (date) => {
    // Format as YYYY-MM-DD for better API compatibility
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const formatDisplayDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  const validateForm = () => {
    if (!title.trim()) {
      ToastMsg('Please enter offer title')
      return false
    }
    if (!description.trim()) {
      ToastMsg('Please enter description')
      return false
    }
    if (!averageDailyImpressions.trim()) {
      ToastMsg('Please enter average daily impressions')
      return false
    }
    if (isNaN(averageDailyImpressions) || Number(averageDailyImpressions) <= 0) {
      ToastMsg('Please enter a valid number for average daily impressions')
      return false
    }
    if (!timeSlot) {
      ToastMsg('Please select a time slot')
      return false
    }
    if (!adDurationMinutes.trim()) {
      ToastMsg('Please enter ad duration in minutes')
      return false
    }
    if (isNaN(adDurationMinutes) || Number(adDurationMinutes) <= 0) {
      ToastMsg('Please enter a valid number for ad duration')
      return false
    }
    if (!selectedFile) {
      ToastMsg('Please select an image')
      return false
    }
    if (!expectations.trim()) {
      ToastMsg('Please enter expectations')
      return false
    }
    if (endDate <= startDate) {
      ToastMsg('End date must be after start date')
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    try {
      showLoader()

      const token = await getItem('token')

      if (!token) {
        ToastMsg('Authentication token not found. Please login again.')
        hideLoader()
        return
      }

      const myHeaders = new Headers()
      myHeaders.append('Authorization', `Bearer ${token}`)

      const formdata = new FormData()

      // Always append image for new offers, only skip for existing images in edit mode
      if (selectedFile) {
        if (!selectedFile.uri.startsWith('http')) {
          // New image file
          formdata.append('Image', {
            uri: selectedFile.uri,
            type: selectedFile.type || 'image/jpeg',
            name: selectedFile.fileName || `offer_image_${Date.now()}.jpg`,
          })
        } else if (!isEditMode) {
          // If it's a create mode but somehow we have an http URL, show error
          ToastMsg('Please select a new image file')
          hideLoader()
          return
        }
      }

      // Add all required fields
      formdata.append('Title', title.trim())
      formdata.append('Description', description.trim())
      formdata.append('Expectations', expectations.trim())
      formdata.append('AverageDailyImpressions', averageDailyImpressions.trim())
      formdata.append('TimeSlot', timeSlot)
      formdata.append('AdDurationMinutes', adDurationMinutes.trim())
      formdata.append('StartDate', formatDate(startDate))
      formdata.append('EndDate', formatDate(endDate))

      // Add campaign ID if available
      if (route?.params?.campaignId) {
        formdata.append('Campaign', route.params.campaignId)
      } else if (selectedCampaign) {
        formdata.append('Campaign', selectedCampaign)
      }

      // Add location if selected

      formdata.append('Location', 'test')

      const apiUrl = isEditMode
        ? `https://influencer-brands-backend.vercel.app/api/brand/UpdateOffer/${route?.params?.offerId}`
        : 'https://influencer-brands-backend.vercel.app/api/brand/CreateOffer'

      // console.log('API URL:', apiUrl)
      // console.log('Form Data Keys:', Array.from(formdata.keys()))

      const requestOptions = {
        method: isEditMode ? 'PUT' : 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      }

      const response = await fetch(apiUrl, requestOptions)

      let result
      try {
        result = await response.json()
      } catch (parseError) {
        result = await response.text()
      }

      console.log('API Response Status:', response.status)
      console.log('API Response:', result)

      hideLoader()

      if (response.ok) {
        ToastMsg(isEditMode ? 'Offer updated successfully!' : 'Offer created successfully!')
        navigation.goBack()
      } else {
        // More detailed error handling
        const errorMessage = result?.message || result?.error || 'Unknown error occurred'
        console.error('API Error Details:', {
          status: response.status,
          statusText: response.statusText,
          result: result
        })
        ToastMsg(isEditMode
          ? `Failed to update offer: ${errorMessage}`
          : `Failed to create offer: ${errorMessage}`)
      }
    } catch (error) {
      hideLoader()
      console.error('Network Error:', error)
      ToastMsg(`Network error: ${error.message}. Please check your connection and try again.`)
    }
  }


  const { isDarkMode } = useSelector(state => state.theme)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? darkMode25 : '#f5f5f5',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomColor: isDarkMode ? '#555' : '#f0f0f0',
      backgroundColor: App_Primary_color,
    },
    backButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '600',
      color: 'white',
      textAlign: 'center',
    },
    placeholder: {
      width: 40,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
      backgroundColor: isDarkMode ? darkMode25 : '#f5f5f5',
    },
    formSection: {
      padding: 15,
      borderRadius: 12,
      backgroundColor: isDarkMode ? '#333' : 'white',
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    section: {},
    inputContainer: {
      borderColor: isDarkMode ? '#555' : '#e0e0e0',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 12,
      minHeight: 48,
      backgroundColor: isDarkMode ? '#444' : '#f9f9f9',
    },
    textInput: {
      fontSize: 16,
      color: isDarkMode ? 'white' : '#333',
      flex: 1,
      fontFamily: FONTS_FAMILY.Poppins_Medium,
    },
    radioText: {
      fontSize: 16,
      color: isDarkMode ? 'white' : '#333',
      fontFamily: FONTS_FAMILY.Poppins_Medium,
      fontWeight: '600',
    },
    categoryScroll: {
      marginTop: 5,
    },
    categoryButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: isDarkMode ? '#555' : '#f0f0f0',
      marginRight: 10,
      borderWidth: 1,
      borderColor: isDarkMode ? '#666' : '#e0e0e0',
    },
    selectedCategoryButton: {
      backgroundColor: App_Primary_color,
      borderColor: App_Primary_color,
    },
    categoryButtonText: {
      fontSize: 14,
      color: isDarkMode ? 'white' : '#666',
      fontFamily: FONTS_FAMILY.Poppins_Medium,
    },
    selectedCategoryButtonText: {
      color: 'white',
    },
    colorContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginTop: 5,
    },
    colorButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    selectedColorButton: {
      borderColor: isDarkMode ? 'white' : '#333',
      borderWidth: 3,
    },
    dateButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderColor: isDarkMode ? '#555' : '#e0e0e0',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 12,
      backgroundColor: isDarkMode ? '#444' : '#f9f9f9',
      minHeight: 48,
    },
    dateText: {
      fontSize: 16,
      color: isDarkMode ? 'white' : '#333',
      fontFamily: FONTS_FAMILY.Poppins_Medium,
    },
    timeSlotButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 16,
      backgroundColor: isDarkMode ? '#555' : '#f0f0f0',
      marginRight: 8,
      borderWidth: 1,
      borderColor: isDarkMode ? '#666' : '#e0e0e0',
      minWidth: 60,
      alignItems: 'center',
    },
    selectedTimeSlotButton: {
      backgroundColor: App_Primary_color,
      borderColor: App_Primary_color,
    },
    timeSlotButtonText: {
      fontSize: 12,
      color: isDarkMode ? 'white' : '#666',
      fontFamily: FONTS_FAMILY.Poppins_Medium,
    },
    selectedTimeSlotButtonText: {
      color: 'white',
    },
    uploadContainer: {
      borderWidth: 1,
      borderColor: isDarkMode ? '#555' : '#e0e0e0',
      borderRadius: 8,
      paddingVertical: 30,
      paddingHorizontal: 20,
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#444' : '#fafafa',
      borderStyle: 'dashed',
    },
    uploadIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: isDarkMode ? '#333' : '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    uploadTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? 'white' : '#333',
      marginBottom: 8,
      fontFamily: FONTS_FAMILY.Poppins_Medium,
    },
    uploadSubtitle: {
      fontSize: 14,
      color: isDarkMode ? '#bbb' : '#666',
      textAlign: 'center',
      lineHeight: 20,
    },
    selectedImageContainer: {
      alignItems: 'center',
    },
    selectedImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginBottom: 10,
    },
    selectedImageText: {
      fontSize: 14,
      color: isDarkMode ? 'white' : '#333',
      fontFamily: FONTS_FAMILY.Poppins_Medium,
    },
    submitButton: {
      backgroundColor: App_Primary_color,
      borderRadius: 8,
      paddingVertical: 16,
      alignItems: 'center',
      marginBottom: 30,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    submitButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#fff',
      fontFamily: FONTS_FAMILY.Poppins_Medium,
    },
  });


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditMode ? 'Edit Offer' : 'Add Offer'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Title */}
          <View style={styles.formSection}>
            <View style={styles.section}>
              <Row style={{ gap: 15, marginBottom: 10 }}>
                {/* <Label /> */}
                <Text style={styles.radioText}>Offer Title</Text>
              </Row>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Enter offer title"
                  placeholderTextColor={'gray'}
                />
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.formSection}>
            <View style={styles.section}>
              <Row style={{ gap: 15, marginBottom: 10 }}>
                {/* <Label /> */}
                <Text style={styles.radioText}>Description</Text>
              </Row>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.textInput, { minHeight: 80 }]}
                  value={description}
                  multiline
                  numberOfLines={3}
                  onChangeText={setDescription}
                  placeholder="Enter description"
                  placeholderTextColor={'gray'}
                  textAlignVertical="top"
                />
              </View>
            </View>
          </View>

          {/* Average Daily Impressions */}
          <View style={styles.formSection}>
            <View style={styles.section}>
              <Row style={{ gap: 15, marginBottom: 10 }}>
                {/* <Label /> */}
                <Text style={styles.radioText}>Average Daily Impressions</Text>
              </Row>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={averageDailyImpressions}
                  onChangeText={setAverageDailyImpressions}
                  placeholder="Enter average daily impressions"
                  placeholderTextColor={'gray'}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          {/* Start Date */}
          <View style={styles.formSection}>
            <View style={styles.section}>
              <Row style={{ gap: 15, marginBottom: 10 }}>
                {/* <Label /> */}
                <Text style={styles.radioText}>Start Date</Text>
              </Row>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowStartDatePicker(true)}
              >
                <Text style={styles.dateText}>
                  {formatDisplayDate(startDate)}
                </Text>
                <Icon name="date-range" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* End Date */}
          <View style={styles.formSection}>
            <View style={styles.section}>
              <Row style={{ gap: 15, marginBottom: 10 }}>
                {/* <Label /> */}
                <Text style={styles.radioText}>End Date</Text>
              </Row>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowEndDatePicker(true)}
              >
                <Text style={styles.dateText}>
                  {formatDisplayDate(endDate)}
                </Text>
                <Icon name="date-range" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Time Slot */}
          <View style={styles.formSection}>
            <View style={styles.section}>
              <Row style={{ gap: 15, marginBottom: 10 }}>
                {/* <Label /> */}
                <Text style={styles.radioText}>Time Slot (Hours)</Text>
              </Row>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}
              >
                {timeSlots.map((slot, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.timeSlotButton,
                      timeSlot === slot && styles.selectedTimeSlotButton,
                    ]}
                    onPress={() => setTimeSlot(slot)}>
                    <Text
                      style={[
                        styles.timeSlotButtonText,
                        timeSlot === slot && styles.selectedTimeSlotButtonText,
                      ]}>
                      {slot}:00
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          {/* Ad Duration */}
          <View style={styles.formSection}>
            <View style={styles.section}>
              <Row style={{ gap: 15, marginBottom: 10 }}>
                {/* <Label /> */}
                <Text style={styles.radioText}>Ad Duration (Minutes)</Text>
              </Row>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={adDurationMinutes}
                  onChangeText={setAdDurationMinutes}
                  placeholder="Enter ad duration in minutes"
                  placeholderTextColor={'gray'}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          {/* Expectations */}
          <View style={styles.formSection}>
            <View style={styles.section}>
              <Row style={{ gap: 15, marginBottom: 10 }}>
                {/* <Label /> */}
                <Text style={styles.radioText}>Expectations</Text>
              </Row>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.textInput, { minHeight: 60 }]}
                  value={expectations}
                  onChangeText={setExpectations}
                  placeholder="Enter expectations"
                  placeholderTextColor={'gray'}
                  multiline
                  textAlignVertical="top"
                />
              </View>
            </View>
          </View>

          {/* Image Upload */}
          <View style={styles.formSection}>
            <View style={styles.section}>
              <Row style={{ gap: 15, marginBottom: 10 }}>
                {/* <Label /> */}
                <Text style={styles.radioText}>Upload Offer Image</Text>
              </Row>
              <TouchableOpacity
                style={styles.uploadContainer}
                onPress={handleImageUpload}>
                {selectedFile ? (
                  <View style={styles.selectedImageContainer}>
                    <Image
                      source={{ uri: selectedFile.uri }}
                      style={styles.selectedImage}
                      resizeMode="cover"
                    />
                    <Text style={styles.selectedImageText}>
                      {selectedFile.fileName || 'Image selected'}
                    </Text>
                  </View>
                ) : (
                  <>
                    <View style={styles.uploadIcon}>
                      <Icon name="cloud-upload" size={24} color="#666" />
                    </View>
                    <Text style={styles.uploadTitle}>Upload Offer Image</Text>
                    <Text style={styles.uploadSubtitle}>
                      Tap to select an image from your gallery
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>
              {isEditMode ? 'Update Offer' : 'Create Offer'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Date Pickers */}
      <DatePicker
        modal
        open={showStartDatePicker}
        date={startDate}
        mode="date"
        minimumDate={new Date()}
        onConfirm={(date) => {
          setShowStartDatePicker(false)
          setStartDate(date)
          // If end date is before new start date, update it
          if (endDate <= date) {
            const newEndDate = new Date(date)
            newEndDate.setDate(newEndDate.getDate() + 1)
            setEndDate(newEndDate)
          }
        }}
        onCancel={() => {
          setShowStartDatePicker(false)
        }}
      />

      <DatePicker
        modal
        open={showEndDatePicker}
        date={endDate}
        mode="date"
        minimumDate={startDate}
        onConfirm={(date) => {
          setShowEndDatePicker(false)
          setEndDate(date)
        }}
        onCancel={() => {
          setShowEndDatePicker(false)
        }}
      />
    </SafeAreaView>
  )
}



export default AddOffer