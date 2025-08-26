

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
// import DateTimePicker from '@react-native-community/datetimepicker'
// import {launchImageLibrary} from 'react-native-image-picker'
// import {FONTS_FAMILY} from '../../assets/Fonts'
// import IMG from '../../assets/Images'
// import {App_Primary_color} from '../../common/Colors/colors'
// import {BackArrow, Label} from '../../assets/SVGs'
// import Row from '../../components/wrapper/row'
// import useLoader from '../../utils/LoaderHook'
// import { ToastMsg } from '../../utils/helperFunctions'
// import { getItem, apiGet } from '../../utils/Apis'
// import { urls } from '../../utils/Apis' // Assuming urls is exported from Apis

// const CreateCampaign = ({navigation, route}) => {
//   const [campaignTitle, setCampaignTitle] = useState('')
//   const [description, setDescription] = useState('')
//   const [description1, setDescription1] = useState('')
//   const [description2, setDescription2] = useState('')
//   const [category, setCategory] = useState('')
//   const [color, setColor] = useState('')
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [campaignDetail, setCampaignDetail] = useState(null)
//   const [isEditMode, setIsEditMode] = useState(false)
//   const [startDate, setStartDate] = useState(new Date())
//   const [showDatePicker, setShowDatePicker] = useState(false)
//   const {showLoader, hideLoader}=useLoader()
//   const [categories, setCategories] = useState([])

//   console.log(route?.params?.campaignId);
  
//   const colors = [
//     {name: 'Red', value: 'red'},
//     {name: 'Blue', value: 'blue'},
//     {name: 'Green', value: 'green'},
//     {name: 'Yellow', value: 'yellow'},
//     {name: 'Purple', value: 'purple'},
//     {name: 'Orange', value: 'orange'},
//   ]

//   // Check if we're in edit mode and fetch campaign details
//   useEffect(() => {
//   getCategories()

//     if (route?.params?.campaignId) {
//       setIsEditMode(true)
//       getBrandCampaignDetail()

//     }
//   }, [route?.params?.campaignId])

//   // Populate form when campaign details are loaded
//   useEffect(() => {
//     if (campaignDetail && isEditMode) {
//       setCampaignTitle(campaignDetail.Title || '')
//       setDescription(campaignDetail.Description || '')
//       setDescription1(campaignDetail.Description1 || '')
//       setDescription2(campaignDetail.Description2 || '')
//       setCategory(campaignDetail.Category || '')
//       setColor(campaignDetail.Color || '')
      
//       // Set start date if available
//       if (campaignDetail.StartDate) {
//         setStartDate(new Date(campaignDetail.StartDate))
//       }
      
//       // Set existing image as selected file (for display purposes)
//       if (campaignDetail.Assets) {
//         setSelectedFile({
//           uri: campaignDetail.Assets,
//           fileName: 'existing_image.jpg',
//           type: 'image/jpeg'
//         })
//       }
//     }
//   }, [campaignDetail, isEditMode])

//   const getBrandCampaignDetail = async () => {
//     try {
//       showLoader()
//       const res = await apiGet(
//         `/api/brand/GetCampaigndetail/${route?.params?.campaignId}`,
//       )
//       setCampaignDetail(res?.data)
//       console.log('Brand Campaign Detail', res?.data)
//       hideLoader()
//     } catch (error) {
//       console.log('Error fetching campaign details:', error)
//       ToastMsg('Failed to load campaign details')
//       hideLoader()
//     }
//   }

//    const getCategories = async () => {
//     try {
//       showLoader()
//       const res = await apiGet(
//         `/api/admin/GetAllCategory`,
//       )
//       setCategories(res?.data)
//       console.log('Brand Campaign Detail', res?.data)
//       hideLoader()
//     } catch (error) {
//       console.log('Error fetching campaign details:', error)
//       ToastMsg('Failed to load campaign details')
//       hideLoader()
//     }
//   }

//   const handleDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || startDate
//     setShowDatePicker(Platform.OS === 'ios')
//     setStartDate(currentDate)
//   }

//   const formatDate = (date) => {
//     const day = date.getDate().toString().padStart(2, '0')
//     const month = (date.getMonth() + 1).toString().padStart(2, '0')
//     const year = date.getFullYear()
//     return `${day}/${month}/${year}`
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

//   const validateForm = () => {
//     if (!campaignTitle.trim()) {
//      ToastMsg('Please enter campaign title')
//       return false
//     }
//     if (!description.trim()) {
//      ToastMsg('Please enter description')
//       return false
//     }
//     if (!description1.trim()) {
//      ToastMsg('Please enter description 1')
//       return false
//     }
//     if (!description2.trim()) {
//      ToastMsg('Please enter description 2')
//       return false
//     }
//     if (!category) {
//       ToastMsg('Please select a category')
//       return false
//     }
//     if (!selectedFile) {
//       ToastMsg('Please select an image')
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
//       myHeaders.append(
//         'Authorization',
//         `Bearer ${token}`
//       )

//       const formdata = new FormData()
      
//       // Only append image if it's a new file (not the existing URL)
//       if (selectedFile && !selectedFile.uri.startsWith('http')) {
//         formdata.append('Assets', {
//           uri: selectedFile.uri,
//           type: selectedFile.type,
//           name: selectedFile.fileName || 'campaign_image.jpg',
//         })
//       }

//       formdata.append('Title', campaignTitle.trim())
//       formdata.append('Category', category)
//       formdata.append('Color', color)
//       formdata.append('HottestOffer', true)
//       formdata.append('FastFavorite', true)
//       formdata.append('Description', description)
//       formdata.append('Description1', description1.trim())
//       formdata.append('Description2', description2.trim())
//       formdata.append('StartDate', startDate.toISOString())

//       const apiUrl = isEditMode 
//         ? `https://influencer-brands-backend.vercel.app/api/brand/UpdateCamapign/${route?.params?.campaignId}`
//         : 'https://influencer-brands-backend.vercel.app/api/brand/CreateCampaign'

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
//         ToastMsg(isEditMode ? 'Campaign updated successfully!' : 'Campaign created successfully!')
//         navigation.goBack()
//       } else {
//         ToastMsg(isEditMode ? 'Failed to update campaign. Please try again.' : 'Failed to create campaign. Please try again.')
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
//           {isEditMode ? 'Edit Campaign' : 'Create Campaign'}
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
//           {/* Campaign Title */}
//           <View style={styles.formSection}>
//             <View style={styles.section}>
//               <Row style={{gap: 15, marginBottom: 10}}>
//                 <Label />
//                 <Text style={styles.radioText}>Campaign Title</Text>
//               </Row>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={styles.textInput}
//                   value={campaignTitle}
//                   onChangeText={setCampaignTitle}
//                   placeholder="Enter campaign title"
//                   placeholderTextColor={'gray'}
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
//                 style={styles.datePickerContainer}
//                 onPress={() => setShowDatePicker(true)}>
//                 <Text style={styles.datePickerText}>
//                   {formatDate(startDate)}
//                 </Text>
//                 <Icon name="calendar-today" size={20} color="#666" />
//               </TouchableOpacity>
              
//               {showDatePicker && (
//                 <DateTimePicker
//                   value={startDate}
//                   mode="date"
//                   display="default"
//                   onChange={handleDateChange}
//                   minimumDate={new Date()}
//                 />
//               )}
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
//                   onChangeText={setDescription}
//                   placeholder="Enter description"
//                   placeholderTextColor={'gray'}
//                 />
//               </View>
//             </View>
//           </View>

//           {/* Description 1 */}
//           <View style={styles.formSection}>
//             <View style={styles.section}>
//               <Row style={{gap: 15, marginBottom: 10}}>
//                 <Label />
//                 <Text style={styles.radioText}>Description 1</Text>
//               </Row>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={styles.textInput}
//                   value={description1}
//                   multiline
//                   onChangeText={setDescription1}
//                   placeholder="Enter description 1"
//                   placeholderTextColor={'gray'}
//                 />
//               </View>
//             </View>
//           </View>

//           {/* Description 2 */}
//           <View style={styles.formSection}>
//             <View style={styles.section}>
//               <Row style={{gap: 15, marginBottom: 10}}>
//                 <Label />
//                 <Text style={styles.radioText}>Description 2</Text>
//               </Row>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={styles.textInput}
//                   value={description2}
//                   multiline
//                   onChangeText={setDescription2}
//                   placeholder="Enter description 2"
//                   placeholderTextColor={'gray'}
//                 />
//               </View>
//             </View>
//           </View>

//           {/* Category Selection */}
//           <View style={styles.formSection}>
//             <View style={styles.section}>
//               <Row style={{gap: 15, marginBottom: 10}}>
//                 <Label />
//                 <Text style={styles.radioText}>Select Category</Text>
//               </Row>
//               <ScrollView 
//                 horizontal 
//                 showsHorizontalScrollIndicator={false}
//                 style={styles.categoryScroll}
//               >
//                 {categories.map((cat, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     style={[
//                       styles.categoryButton,
//                       category === cat?.Title && styles.selectedCategoryButton,
//                     ]}
//                     onPress={() => setCategory(cat?.Title)}>
//                     <Text
//                       style={[
//                         styles.categoryButtonText,
//                         category === cat?.Title && styles.selectedCategoryButtonText,
//                       ]}>
//                       {cat?.Title}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </ScrollView>
//             </View>
//           </View>

      
//           <View style={styles.formSection}>
//             <View style={styles.section}>
//               <Row style={{gap: 15, marginBottom: 10}}>
//                 <Label />
//                 <Text style={styles.radioText}>Upload Campaign Image</Text>
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
//                     <Text style={styles.uploadTitle}>Upload Campaign Image</Text>
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
//               {isEditMode ? 'Update Campaign' : 'Create Campaign'}
//             </Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </KeyboardAvoidingView>
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
//   section: {
//     // marginBottom: 10,
//   },
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
//   datePickerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderColor: '#e0e0e0',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 15,
//     backgroundColor: '#f9f9f9',
//   },
//   datePickerText: {
//     fontSize: 16,
//     color: '#333',
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
//   assetImage: {
//     alignSelf: 'center',
//     height: 200,
//     width: '100%',
//     marginTop: 16,
//     marginBottom: 20,
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

// export default CreateCampaign


import React, {useState, useEffect} from 'react'
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
import DateTimePicker from '@react-native-community/datetimepicker'
import {launchImageLibrary} from 'react-native-image-picker'
import {FONTS_FAMILY} from '../../assets/Fonts'
import IMG from '../../assets/Images'
import {App_Primary_color} from '../../common/Colors/colors'
import {BackArrow, Label} from '../../assets/SVGs'
import Row from '../../components/wrapper/row'
import useLoader from '../../utils/LoaderHook'
import { ToastMsg } from '../../utils/helperFunctions'
import { getItem, apiGet } from '../../utils/Apis'
import { urls } from '../../utils/Apis' // Assuming urls is exported from Apis

const CreateCampaign = ({navigation, route}) => {
  const [campaignName, setCampaignName] = useState('')
  const [campaignTitle, setCampaignTitle] = useState('')
  const [description, setDescription] = useState('')
  const [description1, setDescription1] = useState('')
  const [description2, setDescription2] = useState('')
  const [category, setCategory] = useState('')
  const [customCategory, setCustomCategory] = useState('')
  const [isCustomCategory, setIsCustomCategory] = useState(false)
  const [color, setColor] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [campaignDetail, setCampaignDetail] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const {showLoader, hideLoader}=useLoader()
  const [categories, setCategories] = useState([])

  console.log(route?.params?.campaignId);
  
  const colors = [
    {name: 'Red', value: 'red'},
    {name: 'Blue', value: 'blue'},
    {name: 'Green', value: 'green'},
    {name: 'Yellow', value: 'yellow'},
    {name: 'Purple', value: 'purple'},
    {name: 'Orange', value: 'orange'},
  ]

  // Check if we're in edit mode and fetch campaign details
  useEffect(() => {
  getCategories()

    if (route?.params?.campaignId) {
      setIsEditMode(true)
      getBrandCampaignDetail()

    }
  }, [route?.params?.campaignId])

  // Populate form when campaign details are loaded
  useEffect(() => {
    if (campaignDetail && isEditMode) {
      setCampaignName(campaignDetail.Name || '')
      setCampaignTitle(campaignDetail.Title || '')
      setDescription(campaignDetail.Description || '')
      setDescription1(campaignDetail.Expectations || '')
      setDescription2(campaignDetail.Description2 || '')
      
      // Check if category exists in available categories
      const existingCategory = categories.find(cat => cat?.Title === campaignDetail.Category)
      if (existingCategory) {
        setCategory(campaignDetail.Category || '')
        setIsCustomCategory(false)
      } else {
        setCustomCategory(campaignDetail.Category || '')
        setIsCustomCategory(true)
      }
      
      setColor(campaignDetail.Color || '')
      
      // Set start date if available
      if (campaignDetail.StartDate) {
        setStartDate(new Date(campaignDetail.StartDate))
      }
      
      // Set existing image as selected file (for display purposes)
      if (campaignDetail.Assets) {
        setSelectedFile({
          uri: campaignDetail.Assets,
          fileName: 'existing_image.jpg',
          type: 'image/jpeg'
        })
      }
    }
  }, [campaignDetail, isEditMode, categories])

  const getBrandCampaignDetail = async () => {
    try {
      showLoader()
      const res = await apiGet(
        `/api/brand/GetCampaigndetail/${route?.params?.campaignId}`,
      )
      setCampaignDetail(res?.data)
      console.log('Brand Campaign Detail', res?.data)
      hideLoader()
    } catch (error) {
      console.log('Error fetching campaign details:', error)
      ToastMsg('Failed to load campaign details')
      hideLoader()
    }
  }

   const getCategories = async () => {
    try {
      showLoader()
      const res = await apiGet(
        `/api/admin/GetAllCategory`,
      )
      setCategories(res?.data)
      console.log('Categories', res?.data)
      hideLoader()
    } catch (error) {
      console.log('Error fetching categories:', error)
      ToastMsg('Failed to load categories')
      hideLoader()
    }
  }

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate
    setShowDatePicker(Platform.OS === 'ios')
    setStartDate(currentDate)
  }

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
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

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory)
    setIsCustomCategory(false)
    setCustomCategory('')
  }

  const handleCustomCategoryToggle = () => {
    setIsCustomCategory(true)
    setCategory('')
  }

  const validateForm = () => {
    if (!campaignName.trim()) {
      ToastMsg('Please enter campaign name')
      return false
    }
    if (!campaignTitle.trim()) {
     ToastMsg('Please enter campaign title')
      return false
    }
    if (!description.trim()) {
     ToastMsg('Please enter description')
      return false
    }
    if (!description1.trim()) {
     ToastMsg('Please enter Expectations')
      return false
    }
    // if (!description2.trim()) {
    //  ToastMsg('Please enter description 2')
    //   return false
    // }
    if (!isCustomCategory && !category) {
      ToastMsg('Please select a category')
      return false
    }
    if (isCustomCategory && !customCategory.trim()) {
      ToastMsg('Please enter custom category')
      return false
    }
    if (!selectedFile) {
      ToastMsg('Please select an image')
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

      const myHeaders = new Headers()
      myHeaders.append(
        'Authorization',
        `Bearer ${token}`
      )

      const formdata = new FormData()
      
      // Only append image if it's a new file (not the existing URL)
      if (selectedFile && !selectedFile.uri.startsWith('http')) {
        formdata.append('Assets', {
          uri: selectedFile.uri,
          type: selectedFile.type,
          name: selectedFile.fileName || 'campaign_image.jpg',
        })
      }

      formdata.append('Name', campaignName.trim())
      formdata.append('Title', campaignTitle.trim())
      formdata.append('Category', isCustomCategory ? customCategory.trim() : category)
      formdata.append('Color', color)
      formdata.append('HottestOffer', true)
      formdata.append('FastFavorite', true)
      formdata.append('Description', description)
      formdata.append('Expectations', description1.trim())
      // formdata.append('Description2', description2.trim())
      formdata.append('StartDate', startDate.toISOString())

      const apiUrl = isEditMode 
        ? `https://influencer-brands-backend.vercel.app/api/brand/UpdateCamapign/${route?.params?.campaignId}`
        : 'https://influencer-brands-backend.vercel.app/api/brand/CreateCampaign'

      const requestOptions = {
        method: isEditMode ? 'PUT' : 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      }

      const response = await fetch(apiUrl, requestOptions)

      const result = await response.text()
      console.log('API Response:', result)

      hideLoader()

      if (response.ok) {
        ToastMsg(isEditMode ? 'Campaign updated successfully!' : 'Campaign created successfully!')
        navigation.goBack()
      } else {
        ToastMsg(isEditMode ? 'Failed to update campaign. Please try again.' : 'Failed to create campaign. Please try again.')
      }
    } catch (error) {
      hideLoader()
      console.error('API Error:', error)
      ToastMsg('Network error. Please check your connection and try again.')
    }
  }

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
          {isEditMode ? 'Edit Campaign' : 'Create Campaign'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView 
        style={{flex: 1}} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Campaign Name */}
          <View style={styles.formSection}>
            <View style={styles.section}>
              <Row style={{gap: 15, marginBottom: 10}}>
                <Label />
                <Text style={styles.radioText}>Campaign Name</Text>
              </Row>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={campaignName}
                  onChangeText={setCampaignName}
                  placeholder="Enter campaign name"
                  placeholderTextColor={'gray'}
                />
              </View>
            </View>
          </View>

          {/* Campaign Title */}
          <View style={styles.formSection}>
            <View style={styles.section}>
              <Row style={{gap: 15, marginBottom: 10}}>
                <Label />
                <Text style={styles.radioText}>Campaign Title</Text>
              </Row>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={campaignTitle}
                  onChangeText={setCampaignTitle}
                  placeholder="Enter campaign title"
                  placeholderTextColor={'gray'}
                />
              </View>
            </View>
          </View>

          {/* Start Date */}
          <View style={styles.formSection}>
            <View style={styles.section}>
              <Row style={{gap: 15, marginBottom: 10}}>
                <Label />
                <Text style={styles.radioText}>Start Date</Text>
              </Row>
              <TouchableOpacity
                style={styles.datePickerContainer}
                onPress={() => setShowDatePicker(true)}>
                <Text style={styles.datePickerText}>
                  {formatDate(startDate)}
                </Text>
                <Icon name="calendar-today" size={20} color="#666" />
              </TouchableOpacity>
              
              {showDatePicker && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
              )}
            </View>
          </View>

          {/* Description */}
          <View style={styles.formSection}>
            <View style={styles.section}>
              <Row style={{gap: 15, marginBottom: 10}}>
                <Label />
                <Text style={styles.radioText}>Description</Text>
              </Row>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={description}
                  multiline
                  onChangeText={setDescription}
                  placeholder="Enter description"
                  placeholderTextColor={'gray'}
                />
              </View>
            </View>
          </View>

          {/* Description 1 */}
          <View style={styles.formSection}>
            <View style={styles.section}>
              <Row style={{gap: 15, marginBottom: 10}}>
                <Label />
                <Text style={styles.radioText}>Expectations</Text>
              </Row>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={description1}
                  multiline
                  onChangeText={setDescription1}
                  placeholder="Expectations"
                  placeholderTextColor={'gray'}
                />
              </View>
            </View>
          </View>

          {/* Description 2 */}
          {/* <View style={styles.formSection}>
            <View style={styles.section}>
              <Row style={{gap: 15, marginBottom: 10}}>
                <Label />
                <Text style={styles.radioText}>Description 2</Text>
              </Row>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={description2}
                  multiline
                  onChangeText={setDescription2}
                  placeholder="Enter description 2"
                  placeholderTextColor={'gray'}
                />
              </View>
            </View>
          </View> */}

          {/* Category Selection */}
          <View style={styles.formSection}>
            <View style={styles.section}>
              <Row style={{gap: 15, marginBottom: 10}}>
                <Label />
                <Text style={styles.radioText}>Select Category</Text>
              </Row>
              
              {/* Available Categories */}
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}
              >
                {categories.map((cat, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.categoryButton,
                      !isCustomCategory && category === cat?.Title && styles.selectedCategoryButton,
                    ]}
                    onPress={() => handleCategorySelect(cat?.Title)}>
                    <Text
                      style={[
                        styles.categoryButtonText,
                        !isCustomCategory && category === cat?.Title && styles.selectedCategoryButtonText,
                      ]}>
                      {cat?.Title}
                    </Text>
                  </TouchableOpacity>
                ))}
                
                {/* Add Custom Category Button */}
                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    styles.customCategoryButton,
                    isCustomCategory && styles.selectedCustomCategoryButton,
                  ]}
                  onPress={handleCustomCategoryToggle}>
                  <Text
                    style={[
                      styles.categoryButtonText,
                      styles.customCategoryButtonText,
                      isCustomCategory && styles.selectedCustomCategoryButtonText,
                    ]}>
                    + Add Custom
                  </Text>
                </TouchableOpacity>
              </ScrollView>

              {/* Custom Category Input */}
              {isCustomCategory && (
                <View style={[styles.inputContainer, {marginTop: 15}]}>
                  <TextInput
                    style={styles.textInput}
                    value={customCategory}
                    onChangeText={setCustomCategory}
                    placeholder="Enter custom category name"
                    placeholderTextColor={'gray'}
                  />
                </View>
              )}
            </View>
          </View>

          {/* Upload Image Section */}
          <View style={styles.formSection}>
            <View style={styles.section}>
              <Row style={{gap: 15, marginBottom: 10}}>
                <Label />
                <Text style={styles.radioText}>Upload Campaign Image</Text>
              </Row>
              <TouchableOpacity
                style={styles.uploadContainer}
                onPress={handleImageUpload}>
                {selectedFile ? (
                  <View style={styles.selectedImageContainer}>
                    <Image
                      source={{uri: selectedFile.uri}}
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
                    <Text style={styles.uploadTitle}>Upload Campaign Image</Text>
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
              {isEditMode ? 'Update Campaign' : 'Create Campaign'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: '#f0f0f0',
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
  },
  formSection: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: 'white',
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
  section: {
    // marginBottom: 10,
  },
  inputContainer: {
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 48,
    backgroundColor: '#f9f9f9',
  },
  textInput: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 15,
    backgroundColor: '#f9f9f9',
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  radioText: {
    fontSize: 16,
    color: '#333',
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
    backgroundColor: '#f0f0f0',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedCategoryButton: {
    backgroundColor: App_Primary_color,
    borderColor: App_Primary_color,
  },
  customCategoryButton: {
    backgroundColor: '#fff',
    borderColor: App_Primary_color,
    borderStyle: 'dashed',
  },
  selectedCustomCategoryButton: {
    backgroundColor: App_Primary_color,
    borderColor: App_Primary_color,
    borderStyle: 'solid',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  selectedCategoryButtonText: {
    color: 'white',
  },
  customCategoryButtonText: {
    color: App_Primary_color,
    fontWeight: '600',
  },
  selectedCustomCategoryButtonText: {
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
    borderColor: '#333',
    borderWidth: 3,
  },
  uploadContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderStyle: 'dashed',
  },
  uploadIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
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
    color: '#333',
    marginBottom: 8,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#666',
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
    color: '#333',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  assetImage: {
    alignSelf: 'center',
    height: 200,
    width: '100%',
    marginTop: 16,
    marginBottom: 20,
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
})

export default CreateCampaign