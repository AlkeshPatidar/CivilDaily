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
  const [campaignTitle, setCampaignTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [color, setColor] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [campaignDetail, setCampaignDetail] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const {showLoader, hideLoader}=useLoader()

  console.log(route?.params?.campaignId);
  
  const categories = [
    'Customer Goods',
    'Electronics',
    'Fashion',
    'Food & Beverage',
    'Health & Beauty',
    'Sports & Recreation',
    'Travel & Tourism',
    'Education',
    'Technology',
    'Other'
  ]

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
    if (route?.params?.campaignId) {
      setIsEditMode(true)
      getBrandCampaignDetail()
    }
  }, [route?.params?.campaignId])

  // Populate form when campaign details are loaded
  useEffect(() => {
    if (campaignDetail && isEditMode) {
      setCampaignTitle(campaignDetail.Title || '')
      setDescription(campaignDetail.Description || '')
      setCategory(campaignDetail.Category || '')
      setColor(campaignDetail.Color || '')
      
      // Set existing image as selected file (for display purposes)
      if (campaignDetail.Assets) {
        setSelectedFile({
          uri: campaignDetail.Assets,
          fileName: 'existing_image.jpg',
          type: 'image/jpeg'
        })
      }
    }
  }, [campaignDetail, isEditMode])

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

  const validateForm = () => {
    if (!campaignTitle.trim()) {
     ToastMsg('Please enter campaign title')
      return false
    }
    if (!description.trim()) {
     ToastMsg('Please enter description')
      return false
    }
    if (!category) {
      ToastMsg('Please select a category')
      return false
    }
    if (!color) {
      ToastMsg('Please select a color')
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

      formdata.append('Title', campaignTitle.trim())
      formdata.append('Category', category)
      formdata.append('Color', color)
      formdata.append('HottestOffer', true)
      formdata.append('FastFavorite', true)
      formdata.append('Description', description)

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

          {/* Category Selection */}
          <View style={styles.formSection}>
            <View style={styles.section}>
              <Row style={{gap: 15, marginBottom: 10}}>
                <Label />
                <Text style={styles.radioText}>Select Category</Text>
              </Row>
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
                      category === cat && styles.selectedCategoryButton,
                    ]}
                    onPress={() => setCategory(cat)}>
                    <Text
                      style={[
                        styles.categoryButtonText,
                        category === cat && styles.selectedCategoryButtonText,
                      ]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          {/* Color Selection */}
          <View style={styles.formSection}>
            <View style={styles.section}>
              <Row style={{gap: 15, marginBottom: 10}}>
                <Label />
                <Text style={styles.radioText}>Select Color</Text>
              </Row>
              <View style={styles.colorContainer}>
                {colors.map((colorItem, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.colorButton,
                      {backgroundColor: colorItem.value},
                      color === colorItem.value && styles.selectedColorButton,
                    ]}
                    onPress={() => setColor(colorItem.value)}>
                    {color === colorItem.value && (
                      <Icon name="check" size={16} color="white" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Image Upload */}
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
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
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