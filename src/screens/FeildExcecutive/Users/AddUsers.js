import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { BackIcon } from '../../../assets/SVGs';
import { FONTS_FAMILY } from '../../../assets/Fonts';
import { App_Primary_color } from '../../../common/Colors/colors';
import { apiPost } from '../../../utils/Apis';
import { ToastMsg } from '../../../utils/helperFunctions';

const AddUserScreen = ({ navigation }) => {
  const [submitting, setSubmitting] = useState(false);
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const validateForm = () => {
    if (!userData.fullName.trim()) {
      ToastMsg('Please enter full name');
      return false;
    }

    if (!userData.email.trim()) {
      ToastMsg('Please enter email address');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      ToastMsg('Please enter a valid email address');
      return false;
    }

    if (!userData.phoneNumber.trim()) {
      ToastMsg('Please enter phone number');
      return false;
    }

    // Basic phone validation (10 digits)
    if (userData.phoneNumber.length < 10) {
      ToastMsg('Please enter a valid phone number');
      return false;
    }

    if (!userData.password.trim()) {
      ToastMsg('Please enter password');
      return false;
    }

    if (userData.password.length < 6) {
      ToastMsg('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitting(true);

    const payload = {
      FullName: userData.fullName.trim(),
      Email: userData.email.trim().toLowerCase(),
      Number: userData.phoneNumber.trim(),
      Password: userData.password,
    };

    console.log('Submitting Payload:', JSON.stringify(payload, null, 2));

    try {
      const res = await apiPost('/api/executive/ExecutiveCreateUser', payload);
      ToastMsg(res?.message || 'Field User added successfully!');

      // Clear form
      setUserData({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
      });

      // Navigate back after success
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } catch (error) {
      console.error('Submit Error:', error);
      console.error('Error Response:', error?.response?.data);
      ToastMsg(error?.response?.data?.message || 'Error creating Field User');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>
       
        <Text style={styles.title}>Add User</Text>
        {/* <Text style={styles.subtitle}>
          Fill out the details below to create a new field user
        </Text> */}
      </View>

      {/* User Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👤 User Information</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Full Name <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter full name"
            value={userData.fullName}
            onChangeText={(value) =>
              setUserData({ ...userData, fullName: value })
            }
            placeholderTextColor="#999"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Email Address <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email address"
            value={userData.email}
            onChangeText={(value) =>
              setUserData({ ...userData, email: value })
            }
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Phone Number <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            value={userData.phoneNumber}
            onChangeText={(value) => {
              // Only allow numbers and limit to 10 digits
              const numericValue = value.replace(/[^0-9]/g, '');
              if (numericValue.length <= 10) {
                setUserData({ ...userData, phoneNumber: numericValue });
              }
            }}
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            maxLength={10}
          />
          <Text style={styles.helperText}>Enter 10-digit phone number</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Password <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password (min 6 characters)"
            value={userData.password}
            onChangeText={(value) =>
              setUserData({ ...userData, password: value })
            }
            placeholderTextColor="#999"
            secureTextEntry={false}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.helperText}>
            Password must be at least 6 characters long
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        {submitting ? (
          <View style={styles.submitButtonContent}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={styles.submitButtonText}>Creating User...</Text>
          </View>
        ) : (
          <Text style={styles.submitButtonText}>✓ Create User</Text>
        )}
      </TouchableOpacity>

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 22,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4285f4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconText: {
    fontSize: 24,
    color: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    fontFamily: FONTS_FAMILY.Poppins_Bold,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
    fontWeight: '500',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  required: {
    color: '#ff0000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#fff',
    color: '#333',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  helperText: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  submitButton: {
    backgroundColor:App_Primary_color,
    margin: 16,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
  },
  bottomSpace: {
    height: 20,
  },
});

export default AddUserScreen;