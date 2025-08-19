import React, {useState, useEffect, useContext} from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native'
import {launchImageLibrary} from 'react-native-image-picker'
import {useDispatch, useSelector} from 'react-redux'
import {apiGet, BASE_URL, getItem} from '../../utils/Apis'
import {ToastMsg} from '../../utils/helperFunctions'
import urls from '../../config/urls'
import {setUser} from '../../redux/reducer/user'
import {BackArrow} from '../../assets/SVGs'
import {App_Primary_color} from '../../common/Colors/colors'
import {FONTS_FAMILY} from '../../assets/Fonts'
import { useLoginCheck } from '../../utils/Context'

const EditInfluencerProfileScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [profileData, setProfileData] = useState({
    FirstName: '',
    Gender: 'Male',
    Image: null,
    newImageSelected: false,
    selectedImageData: null,
  })

  const {loggedInby, setloggedInby} = useLoginCheck()

  const dispatch = useDispatch()

  // Get selector data
  const rawSelector = useSelector(state => state?.user?.userData)

  // Parse selector data
  const parseUserData = () => {
    if (!rawSelector) return {}

    try {
      // If rawSelector is already an object
      if (typeof rawSelector === 'object' && rawSelector !== null) {
        return rawSelector
      }

      // If rawSelector is a string, parse it
      if (typeof rawSelector === 'string') {
        return JSON.parse(rawSelector)
      }

      return {}
    } catch (error) {
      console.error('Error parsing user data:', error)
      return {}
    }
  }

  // Load existing profile data when component mounts or rawSelector changes
  useEffect(() => {
    const userData = parseUserData()
    console.log('Raw Selector:', rawSelector)
    console.log('Parsed User Data:', userData)

    if (userData && Object.keys(userData).length > 0) {
      console.log('Setting profile data with:', {
        FirstName: userData.FirstName,
        Gender: userData.Gender,
        Image: userData.Image,
      })

      setProfileData({
        FirstName: userData.FirstName || '',
        Gender: userData.Gender || 'Male',
        Image: userData.Image || null,
        newImageSelected: false,
        selectedImageData: null,
      })
    }
  }, [rawSelector])

  // Debug current profileData
  useEffect(() => {
    console.log('Current profileData:', profileData)
  }, [profileData])

  const handleInputChange = (field, value) => {
    console.log(`Changing ${field} to:`, value)
    setProfileData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8,
      selectionLimit: 1,
    }

    launchImageLibrary(options, response => {
      if (response.didCancel || response.error) {
        if (response.error) {
          ToastMsg('Failed to select image. Please try again.')
        }
        return
      }

      if (response.assets && response.assets[0]) {
        const selectedImage = response.assets[0]
        console.log('Selected image:', selectedImage)

        setProfileData(prev => ({
          ...prev,
          Image: selectedImage.uri,
          selectedImageData: selectedImage,
          newImageSelected: true,
        }))
      }
    })
  }

  const updateBasicInfo = async () => {
    try {
      const token = await getItem('token')
      const url =
        loggedInby === 'Influencers'
          ? `${BASE_URL}/api/influencer/UpdateInfluencer`
          : `${BASE_URL}/api/brand/UpdateBrand`
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          FirstName: profileData.FirstName,
          ...(loggedInby === 'Influencers' && {Gender: profileData.Gender}),
        }),
      })

      const result = await response.json()

      if (response.ok) {
        await getUserProfile()
        return result
      } else {
        throw new Error(result.message || 'Failed to update basic info')
      }
    } catch (error) {
      console.error('Error updating basic info:', error)
      throw error
    }
  }

  const uploadProfileImage = async () => {
    if (!profileData.newImageSelected || !profileData.selectedImageData) {
      return true // No new image to upload
    }

    try {
      const token = await getItem('token')
      setImageUploading(true)

      const formData = new FormData()

      formData.append('Image', {
        uri: profileData.selectedImageData.uri,
        type: profileData.selectedImageData.type || 'image/jpeg',
        name:
          profileData.selectedImageData.fileName ||
          `profile_image_${Date.now()}.jpg`,
      })

        const url =
        loggedInby === 'Influencers'
          ? `${BASE_URL}/api/influencer/InfluencerUploadProfileImage`
          : `${BASE_URL}/api/brand/BrandUploadProfileImage`

      const response = await fetch(
        // `${BASE_URL}/api/influencer/InfluencerUploadProfileImage`,
        url,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      )

      const result = await response.json()

      if (response.ok) {
        return result
      } else {
        throw new Error(result.message || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    } finally {
      setImageUploading(false)
    }
  }

  // console.log(loggedInby,'LoggedINby');
  

  const handleSaveProfile = async () => {
    if (!profileData.FirstName?.trim()) {
      ToastMsg('Please enter your first name')
      return
    }

    setLoading(true)
    try {
      // Update basic info first
      await updateBasicInfo()

      // Then upload image if a new one was selected
      await uploadProfileImage()

      ToastMsg('Profile updated successfully')

      // Refresh user profile data from server
      await getUserProfile()
    } catch (error) {
      console.error('Save profile error:', error)
      ToastMsg(error.message || 'Failed to update profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getUserProfile = async () => {
    try {
       const url =
        loggedInby === 'Influencers'
          ? urls.getInfluencerProfile
          : urls.getBrandProfile

      const response = await apiGet(url)
      if (response?.data) {
        dispatch(setUser(JSON.stringify(response.data)))
        navigation.goBack()
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
      // Still navigate back even if profile fetch fails
      navigation.goBack()
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* Profile Image Section */}
        <View style={styles.imageSection}>
          <TouchableOpacity onPress={selectImage} style={styles.imageContainer}>
            {profileData.Image ? (
              <Image
                source={{uri: profileData.Image}}
                style={styles.profileImage}
                onError={error => console.log('Image load error:', error)}
                onLoad={() => console.log('Image loaded successfully')}
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>Tap to select image</Text>
              </View>
            )}
            {imageUploading && (
              <View style={styles.imageLoader}>
                <ActivityIndicator color='#007AFF' />
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={selectImage}
            style={styles.changeImageButton}>
            <Text style={styles.changeImageText}>Change Profile Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First Name *</Text>
            <TextInput
              style={styles.input}
              value={profileData.FirstName}
              onChangeText={text => handleInputChange('FirstName', text)}
              placeholder='Enter your first name'
              placeholderTextColor='#999'
            />
          </View>

     { loggedInby =='Influencers' &&    <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  profileData.Gender === 'Male' && styles.genderButtonActive,
                ]}
                onPress={() => handleInputChange('Gender', 'Male')}>
                <Text
                  style={[
                    styles.genderButtonText,
                    profileData.Gender === 'Male' &&
                      styles.genderButtonTextActive,
                  ]}>
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  profileData.Gender === 'Female' && styles.genderButtonActive,
                ]}
                onPress={() => handleInputChange('Gender', 'Female')}>
                <Text
                  style={[
                    styles.genderButtonText,
                    profileData.Gender === 'Female' &&
                      styles.genderButtonTextActive,
                  ]}>
                  Female
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  profileData.Gender === 'Other' && styles.genderButtonActive,
                ]}
                onPress={() => handleInputChange('Gender', 'Other')}>
                <Text
                  style={[
                    styles.genderButtonText,
                    profileData.Gender === 'Other' &&
                      styles.genderButtonTextActive,
                  ]}>
                  Other
                </Text>
              </TouchableOpacity>
            </View>
          </View>}
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          onPress={handleSaveProfile}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color='#FFF' />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default EditInfluencerProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 20,
    backgroundColor: App_Primary_color,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  placeholder: {
    width: 50,
  },
  content: {
    padding: 20,
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: App_Primary_color,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#CCC',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  imageLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeImageButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  changeImageText: {
    color: App_Primary_color,
    fontSize: 16,
    fontWeight: '500',
  },
  formSection: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    paddingVertical: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  genderButtonActive: {
    backgroundColor: App_Primary_color,
    borderColor: App_Primary_color,
  },
  genderButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  genderButtonTextActive: {
    color: '#FFF',
  },
  saveButton: {
    backgroundColor: App_Primary_color,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
})
