// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   SafeAreaView,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   Switch,
// } from 'react-native';
// import { LinearGradient } from 'react-native-linear-gradient';
// import { App_Primary_color, dark33, darkMode25, white } from '../../common/Colors/colors';
// import { BackWhite } from '../../assets/SVGs';
// import { FONTS_FAMILY } from '../../assets/Fonts';
// import { useDispatch, useSelector } from 'react-redux';
// import { apiGet, BASE_URL, getItem } from '../../utils/Apis';
// import { ToastMsg } from '../../utils/helperFunctions';
// import { setUser } from '../../redux/reducer/user';
// import urls from '../../config/urls';


// const AddAddressScreen = ({ navigation }) => {
//   const { isDarkMode } = useSelector(state => state.theme);
//   const dispatch = useDispatch();
  
//   const [formData, setFormData] = useState({
//     addressLine1: '',
//     addressLine2: '',
//     city: '',
//     state: '',
//     postalCode: '',
//     country: 'India', // Default country
//     isDefault: false,
//   });
  
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.addressLine1.trim()) {
//       newErrors.addressLine1 = 'Address Line 1 is required';
//     }
    
//     if (!formData.city.trim()) {
//       newErrors.city = 'City is required';
//     }
    
//     if (!formData.state.trim()) {
//       newErrors.state = 'State is required';
//     }
    
//     if (!formData.postalCode.trim()) {
//       newErrors.postalCode = 'Postal Code is required';
//     } else if (!/^\d{6}$/.test(formData.postalCode.trim())) {
//       newErrors.postalCode = 'Please enter valid 6-digit postal code';
//     }
    
//     if (!formData.country.trim()) {
//       newErrors.country = 'Country is required';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);
    
//     try {
//       // Replace with your actual token - you might get this from Redux store or AsyncStorage
//     //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGQ0ZDFjNzNmNTRhMzQ1ZmEwNDRiODciLCJpYXQiOjE3NTg3ODc0MDMsImV4cCI6MTc2MTIwNjYwM30.eS2UvgYjbUWpN_ARny2yKyQG97TwUqoO3V_lo_Yr9Bc';
//       const token= await getItem('token')
//       const response = await fetch(`${BASE_URL}/api/user/address`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         // Alert.alert(
//         //   'Success',
//         //   'Address added successfully!',
//         //   [
//         //     {
//         //       text: 'OK',
//         //       onPress: () => navigation.goBack(),
//         //     },
//         //   ]
//         // );
//         getUserProfile()
//         ToastMsg('Address added successfully!')
//       } else {
//         // Alert.alert('Error', result.message || 'Failed to add address');
//       }
//     } catch (error) {
//       console.error('Error adding address:', error);
//     //   Alert.alert('Error', 'Network error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//     const getUserProfile = async (endPoint) => {
//       try {
//         // showLoader()
//         const response = await apiGet(urls?.getSelf)
//         dispatch(setUser(JSON.stringify(response?.data)))
//         navigation?.goBack()
  
//         // hideLoader()
//       } catch (error) {
//         // hideLoader()
//       }
//     }

//   const updateFormData = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value,
//     }));
    
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors(prev => ({
//         ...prev,
//         [field]: '',
//       }));
//     }
//   };

//   const renderInput = (
//     label,
//     field,
//     placeholder,
//     keyboardType = 'default',
//     multiline = false
//   ) => (
//     <View style={styles.inputContainer}>
//       <Text style={[styles.label, { color: isDarkMode ? white : '#1A1A1A' }]}>
//         {label} {field !== 'addressLine2' && <Text style={styles.required}>*</Text>}
//       </Text>
//       <TextInput
//         style={[
//           styles.textInput,
//           {
//             backgroundColor: isDarkMode ? dark33 : white,
//             borderColor: errors[field] 
//               ? '#FF3B30' 
//               : isDarkMode ? '#404040' : '#E5E5E7',
//             color: isDarkMode ? white : '#1A1A1A',
//             textAlignVertical: multiline ? 'top' : 'center',
//           },
//           multiline && { height: 80 }
//         ]}
//         placeholder={placeholder}
//         placeholderTextColor={isDarkMode ? '#8E8E93' : '#8E8E93'}
//         value={formData[field]}
//         onChangeText={(text) => updateFormData(field, text)}
//         keyboardType={keyboardType}
//         multiline={multiline}
//         numberOfLines={multiline ? 3 : 1}
//       />
//       {errors[field] && (
//         <Text style={styles.errorText}>{errors[field]}</Text>
//       )}
//     </View>
//   );

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: isDarkMode ? darkMode25 : '#F5F5F5',
//     },
//     header: {
//       paddingTop: 10,
//       paddingBottom: 20,
//       paddingHorizontal: 20,
//     },
//     headerContent: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//     },
//     backButton: {
//       width: 40,
//       height: 40,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     headerTitle: {
//       color: 'white',
//       fontSize: 18,
//       fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//     },
//     headerRight: {
//       width: 40,
//     },
//     keyboardAvoidingView: {
//       flex: 1,
//     },
//     content: {
//       flex: 1,
//       backgroundColor: isDarkMode ? darkMode25 : '#F5F5F5',
//       marginTop: -10,
//     },
//     scrollView: {
//       flex: 1,
//     },
//     scrollContent: {
//       paddingTop: 20,
//       paddingHorizontal: 20,
//       paddingBottom: Platform.OS === 'ios' ? 100 : 80,
//     },
//     formCard: {
//       backgroundColor: isDarkMode ? dark33 : white,
//       borderRadius: 12,
//       padding: 20,
//       marginBottom: 20,
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 1,
//       },
//       shadowOpacity: 0.05,
//       shadowRadius: 3,
//       elevation: 2,
//     },
//     cardTitle: {
//       fontSize: 18,
//       fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//       color: isDarkMode ? white : '#1A1A1A',
//       marginBottom: 20,
//     },
//     inputContainer: {
//       marginBottom: 16,
//     },
//     label: {
//       fontSize: 14,
//       fontFamily: FONTS_FAMILY.Poppins_Medium,
//       marginBottom: 6,
//     },
//     required: {
//       color: '#FF3B30',
//     },
//     textInput: {
//       borderWidth: 1,
//       borderRadius: 8,
//       paddingHorizontal: 12,
//       paddingVertical: 12,
//       fontSize: 16,
//       fontFamily: FONTS_FAMILY.Poppins_Regular,
//     },
//     errorText: {
//       color: '#FF3B30',
//       fontSize: 12,
//       fontFamily: FONTS_FAMILY.Poppins_Regular,
//       marginTop: 4,
//     },
//     switchContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       paddingVertical: 8,
//       marginTop: 8,
//     },
//     switchLabel: {
//       fontSize: 14,
//       fontFamily: FONTS_FAMILY.Poppins_Medium,
//       color: isDarkMode ? white : '#1A1A1A',
//       flex: 1,
//     },
//     switchDescription: {
//       fontSize: 12,
//       fontFamily: FONTS_FAMILY.Poppins_Regular,
//       color: '#8E8E93',
//       marginTop: 4,
//     },
//     submitButton: {
//       backgroundColor: App_Primary_color,
//       paddingVertical: 16,
//       borderRadius: 12,
//       alignItems: 'center',
//       marginTop: 20,
//       shadowColor: App_Primary_color,
//       shadowOffset: {
//         width: 0,
//         height: 4,
//       },
//       shadowOpacity: 0.3,
//       shadowRadius: 8,
//       elevation: 8,
//     },
//     submitButtonDisabled: {
//       backgroundColor: '#CCCCCC',
//       shadowOpacity: 0,
//       elevation: 0,
//     },
//     submitButtonText: {
//       color: white,
//       fontSize: 16,
//       fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//     },
//     submitButtonTextDisabled: {
//       color: '#8E8E93',
//     },
//   });

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar 
//         barStyle="light-content" 
//         backgroundColor={App_Primary_color} 
//       />
      
//       {/* Header */}
//       <LinearGradient
//         colors={[App_Primary_color, App_Primary_color]}
//         style={styles.header}
//       >
//         <View style={styles.headerContent}>
//           <TouchableOpacity 
//             style={styles.backButton}
//             onPress={() => navigation.goBack()}
//           >
//             <BackWhite />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Add New Address</Text>
//           <View style={styles.headerRight} />
//         </View>
//       </LinearGradient>

//       {/* Content */}
//       <KeyboardAvoidingView 
//         style={styles.keyboardAvoidingView}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
//       >
//         <View style={styles.content}>
//           <ScrollView 
//             style={styles.scrollView}
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={styles.scrollContent}
//             keyboardShouldPersistTaps="handled"
//           >
//             <View style={styles.formCard}>
//               <Text style={styles.cardTitle}>Address Information</Text>
              
//               {renderInput(
//                 'Address Line 1',
//                 'addressLine1',
//                 'Enter street address, building name',
//                 'default',
//                 true
//               )}
              
//               {renderInput(
//                 'Address Line 2',
//                 'addressLine2',
//                 'Enter apartment, suite, floor (optional)',
//                 'default'
//               )}
              
//               {renderInput(
//                 'City',
//                 'city',
//                 'Enter city name'
//               )}
              
//               {renderInput(
//                 'State',
//                 'state',
//                 'Enter state name'
//               )}
              
//               {renderInput(
//                 'Postal Code',
//                 'postalCode',
//                 'Enter 6-digit postal code',
//                 'numeric'
//               )}
              
//               {renderInput(
//                 'Country',
//                 'country',
//                 'Enter country name'
//               )}
              
//               {/* Default Address Switch */}
//               <View style={styles.switchContainer}>
//                 <View style={{ flex: 1 }}>
//                   <Text style={styles.switchLabel}>
//                     Set as default address
//                   </Text>
//                   <Text style={styles.switchDescription}>
//                     This address will be used as your primary delivery address
//                   </Text>
//                 </View>
//                 <Switch
//                   value={formData.isDefault}
//                   onValueChange={(value) => updateFormData('isDefault', value)}
//                   trackColor={{ 
//                     false: isDarkMode ? '#404040' : '#E5E5E7', 
//                     true: App_Primary_color 
//                   }}
//                   thumbColor={formData.isDefault ? white : '#f4f3f4'}
//                 />
//               </View>
//             </View>
            
//             {/* Submit Button */}
//             <TouchableOpacity
//               style={[
//                 styles.submitButton,
//                 loading && styles.submitButtonDisabled
//               ]}
//               onPress={handleSubmit}
//               disabled={loading}
//               activeOpacity={0.8}
//             >
//               <Text style={[
//                 styles.submitButtonText,
//                 loading && styles.submitButtonTextDisabled
//               ]}>
//                 {loading ? 'Adding Address...' : 'Add Address'}
//               </Text>
//             </TouchableOpacity>
//           </ScrollView>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default AddAddressScreen;


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Switch,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { App_Primary_color, dark33, darkMode25, white } from '../../common/Colors/colors';
import { BackWhite } from '../../assets/SVGs';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import { apiGet, BASE_URL, getItem } from '../../utils/Apis';
import { ToastMsg } from '../../utils/helperFunctions';
import { setUser } from '../../redux/reducer/user';
import urls from '../../config/urls';

const AddEditAddressScreen = ({ navigation, route }) => {
  const { isDarkMode } = useSelector(state => state.theme);
  const dispatch = useDispatch();
  
  // Check if we're editing an existing address
  const isEditing = route?.params?.address ? true : false;
  const existingAddress = route?.params?.address;
  const addressId = existingAddress?.id || existingAddress?._id;
  
  const [formData, setFormData] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India', // Default country
    isDefault: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Pre-fill form data when editing
  useEffect(() => {
    if (isEditing && existingAddress) {
      setFormData({
        addressLine1: existingAddress.addressLine1 || '',
        addressLine2: existingAddress.addressLine2 || '',
        city: existingAddress.city || '',
        state: existingAddress.state || '',
        postalCode: existingAddress.postalCode || '',
        country: existingAddress.country || 'India',
        isDefault: existingAddress.isDefault || false,
      });
    }
  }, [isEditing, existingAddress]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address Line 1 is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal Code is required';
    } else if (!/^\d{6}$/.test(formData.postalCode.trim())) {
      newErrors.postalCode = 'Please enter valid 6-digit postal code';
    }
    
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const token = await getItem('token');
      const url = isEditing 
        ? `${BASE_URL}/api/user/address/${addressId}`
        : `${BASE_URL}/api/user/address`;
      
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        getUserProfile();
        ToastMsg(`Address ${isEditing ? 'updated' : 'added'} successfully!`);
      } else {
        ToastMsg(result.message || `Failed to ${isEditing ? 'update' : 'add'} address`);
      }
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'adding'} address:`, error);
      ToastMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const getUserProfile = async () => {
    try {
      const response = await apiGet(urls?.getSelf);
      dispatch(setUser(JSON.stringify(response?.data)));
      navigation?.goBack();
    } catch (error) {
      console.error('Error getting user profile:', error);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const renderInput = (
    label,
    field,
    placeholder,
    keyboardType = 'default',
    multiline = false
  ) => (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: isDarkMode ? white : '#1A1A1A' }]}>
        {label} {field !== 'addressLine2' && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        style={[
          styles.textInput,
          {
            backgroundColor: isDarkMode ? dark33 : white,
            borderColor: errors[field] 
              ? '#FF3B30' 
              : isDarkMode ? '#404040' : '#E5E5E7',
            color: isDarkMode ? white : '#1A1A1A',
            textAlignVertical: multiline ? 'top' : 'center',
          },
          multiline && { height: 80 }
        ]}
        placeholder={placeholder}
        placeholderTextColor={isDarkMode ? '#8E8E93' : '#8E8E93'}
        value={formData[field]}
        onChangeText={(text) => updateFormData(field, text)}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
      />
      {errors[field] && (
        <Text style={styles.errorText}>{errors[field]}</Text>
      )}
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? darkMode25 : '#F5F5F5',
    },
    header: {
      paddingTop: 10,
      paddingBottom: 20,
      paddingHorizontal: 20,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    backButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      color: 'white',
      fontSize: 18,
      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    },
    headerRight: {
      width: 40,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    content: {
      flex: 1,
      backgroundColor: isDarkMode ? darkMode25 : '#F5F5F5',
      marginTop: -10,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingTop: 20,
      paddingHorizontal: 20,
      paddingBottom: Platform.OS === 'ios' ? 100 : 80,
    },
    formCard: {
      backgroundColor: isDarkMode ? dark33 : white,
      borderRadius: 12,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    cardTitle: {
      fontSize: 18,
      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
      color: isDarkMode ? white : '#1A1A1A',
      marginBottom: 20,
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontFamily: FONTS_FAMILY.Poppins_Medium,
      marginBottom: 6,
    },
    required: {
      color: '#FF3B30',
    },
    textInput: {
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 12,
      fontSize: 16,
      fontFamily: FONTS_FAMILY.Poppins_Regular,
    },
    errorText: {
      color: '#FF3B30',
      fontSize: 12,
      fontFamily: FONTS_FAMILY.Poppins_Regular,
      marginTop: 4,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
      marginTop: 8,
    },
    switchLabel: {
      fontSize: 14,
      fontFamily: FONTS_FAMILY.Poppins_Medium,
      color: isDarkMode ? white : '#1A1A1A',
      flex: 1,
    },
    switchDescription: {
      fontSize: 12,
      fontFamily: FONTS_FAMILY.Poppins_Regular,
      color: '#8E8E93',
      marginTop: 4,
    },
    buttonContainer: {
      marginTop: 20,
      gap: 12,
    },
    submitButton: {
      backgroundColor: App_Primary_color,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      shadowColor: App_Primary_color,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    submitButtonDisabled: {
      backgroundColor: '#CCCCCC',
      shadowOpacity: 0,
      elevation: 0,
    },
    submitButtonText: {
      color: white,
      fontSize: 16,
      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    },
    submitButtonTextDisabled: {
      color: '#8E8E93',
    },
    deleteButton: {
      backgroundColor: '#FF3B30',
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      shadowColor: '#FF3B30',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    deleteButtonText: {
      color: white,
      fontSize: 16,
      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={App_Primary_color} 
      />
      
      {/* Header */}
      <LinearGradient
        colors={[App_Primary_color, App_Primary_color]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <BackWhite />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isEditing ? 'Edit Address' : 'Add New Address'}
          </Text>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      {/* Content */}
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.content}>
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.formCard}>
              <Text style={styles.cardTitle}>
                {isEditing ? 'Edit Address Information' : 'Address Information'}
              </Text>
              
              {renderInput(
                'Address Line 1',
                'addressLine1',
                'Enter street address, building name',
                'default',
                true
              )}
              
              {renderInput(
                'Address Line 2',
                'addressLine2',
                'Enter apartment, suite, floor (optional)',
                'default'
              )}
              
              {renderInput(
                'City',
                'city',
                'Enter city name'
              )}
              
              {renderInput(
                'State',
                'state',
                'Enter state name'
              )}
              
              {renderInput(
                'Postal Code',
                'postalCode',
                'Enter 6-digit postal code',
                'numeric'
              )}
              
              {renderInput(
                'Country',
                'country',
                'Enter country name'
              )}
              
              {/* Default Address Switch */}
              <View style={styles.switchContainer}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.switchLabel}>
                    Set as default address
                  </Text>
                  <Text style={styles.switchDescription}>
                    This address will be used as your primary delivery address
                  </Text>
                </View>
                <Switch
                  value={formData.isDefault}
                  onValueChange={(value) => updateFormData('isDefault', value)}
                  trackColor={{ 
                    false: isDarkMode ? '#404040' : '#E5E5E7', 
                    true: App_Primary_color 
                  }}
                  thumbColor={formData.isDefault ? white : '#f4f3f4'}
                />
              </View>
            </View>
            
            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              {/* Submit Button */}
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  loading && styles.submitButtonDisabled
                ]}
                onPress={handleSubmit}
                disabled={loading}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.submitButtonText,
                  loading && styles.submitButtonTextDisabled
                ]}>
                  {loading 
                    ? `${isEditing ? 'Updating' : 'Adding'} Address...` 
                    : `${isEditing ? 'Update' : 'Add'} Address`
                  }
                </Text>
              </TouchableOpacity>

              {/* Delete Button - Only show when editing */}
              {/* {isEditing && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleDelete}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  <Text style={styles.deleteButtonText}>
                    Delete Address
                  </Text>
                </TouchableOpacity>
              )} */}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddEditAddressScreen;