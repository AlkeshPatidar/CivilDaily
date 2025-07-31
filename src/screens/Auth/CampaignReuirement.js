import React, {useState} from 'react'
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
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {FONTS_FAMILY} from '../../assets/Fonts'
import IMG from '../../assets/Images'
import {App_Primary_color} from '../../common/Colors/colors'

const CampaignReqScreen = ({navigation}) => {
  const [campaignTitle, setCampaignTitle] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedFile, setSelectedFile] = useState('')

  const handleImageUpload = () => {
    Alert.alert(
      'Upload Image',
      'Image upload functionality would be implemented here',
    )
  }

  const handleSubmit = () => {
    navigation.navigate('BrandHome')
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='#fff' />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name='arrow-back-ios' size={20} color='#333' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Campaign Requirements</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* Campaign Title */}
        <View
          style={{
            borderWidth: 2,
            padding: 10,
            borderRadius: 12,
            borderColor: '#D1D5DB',
          }}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Campaign Title</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={campaignTitle}
                onChangeText={setCampaignTitle}
                placeholder='Campaign Title'
                placeholderTextColor={'gray'}
              />
            </View>
          </View>
          {/* Category Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Add Category</Text>

            <TouchableOpacity style={styles.radioContainer}>
              <View
                style={[
                  styles.radio,
                  selectedCategory === 'Ads' && styles.radioSelected,
                ]}>
                {selectedCategory === 'Ads' && (
                  <View style={styles.radioInner} />
                )}
              </View>
              <Text style={styles.radioText}>Ads</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.radioContainer}>
              <View
                style={[
                  styles.radio,
                  selectedCategory === 'Post' && styles.radioSelected,
                ]}>
                {selectedCategory === 'Post' && (
                  <View style={styles.radioInner} />
                )}
              </View>
              <Text style={styles.radioText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Image
          source={IMG.Asset}
          style={{
            alignSelf: 'center',
            height: 310,
            width: '100%',
            marginTop: 16,
          }}
          resizeMode='contain'
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: '#f0f0f0',
    marginTop: 30,
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
    color: '#333',
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
  section: {
    // marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
    color: '#333',
    marginBottom: 12,
  },
  inputContainer: {
    // borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 0,
    minHeight: 48,
  },
  textInput: {
    fontSize: 18,
    color: '#333',
    flex: 1,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#E53E3E',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E53E3E',
  },
  radioText: {
    fontSize: 14,
    color: '#333',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  uploadContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#fafafa',
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
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: App_Primary_color,
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
})

export default CampaignReqScreen
