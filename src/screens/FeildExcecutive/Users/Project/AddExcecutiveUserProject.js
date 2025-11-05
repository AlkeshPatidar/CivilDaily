import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { BackIcon } from '../../../../assets/SVGs';
import { FONTS_FAMILY } from '../../../../assets/Fonts';
import { App_Primary_color } from '../../../../common/Colors/colors';
import { apiPost } from '../../../../utils/Apis';
import { ToastMsg } from '../../../../utils/helperFunctions';

const AddExecutiveProjectScreen = ({ navigation, route }) => {
  const userId = route?.params?.userId;
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.projectName.trim()) {
      ToastMsg('Please enter project name');
      return false;
    }
    if (!formData.address.trim()) {
      ToastMsg('Please enter address');
      return false;
    }
    if (!formData.state.trim()) {
      ToastMsg('Please enter state');
      return false;
    }
    if (!formData.city.trim()) {
      ToastMsg('Please enter city');
      return false;
    }
    if (!formData.pincode.trim()) {
      ToastMsg('Please enter pincode');
      return false;
    }
    if (formData.pincode.length !== 6) {
      ToastMsg('Please enter valid 6-digit pincode');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        User: userId,
        Name: formData.projectName.trim(),
        Location: {
          Address: formData.address.trim(),
          State: formData.state.trim(),
          City: formData.city.trim(),
          Pincode: formData.pincode.trim(),
        },
      };

      console.log('Project Payload:', JSON.stringify(payload, null, 2));

      const response = await apiPost('/api/executive/CreateUserProject', payload);
      
      ToastMsg(response?.message || 'Project added successfully!');
      
      // Reset form
      setFormData({
        projectName: '',
        address: '',
        state: '',
        city: '',
        pincode: '',
      });

      // Navigate back after success
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
      
    } catch (error) {
      console.error('Error creating project:', error);
      console.error('Error Response:', error?.response?.data);
      ToastMsg(error?.response?.data?.message || 'Error creating project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <BackIcon />
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>🏗️</Text>
          </View>
          <Text style={styles.title}>Add Project</Text>
          <Text style={styles.subtitle}>
            Create a new project by filling out the details below
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Project Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter project name"
              value={formData.projectName}
              onChangeText={(value) => updateFormData('projectName', value)}
              placeholderTextColor="#999"
              editable={!loading}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Address <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter complete address"
              value={formData.address}
              onChangeText={(value) => updateFormData('address', value)}
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
              editable={!loading}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>
                State <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter state"
                value={formData.state}
                onChangeText={(value) => updateFormData('state', value)}
                placeholderTextColor="#999"
                editable={!loading}
              />
            </View>

            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>
                City <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter city"
                value={formData.city}
                onChangeText={(value) => updateFormData('city', value)}
                placeholderTextColor="#999"
                editable={!loading}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Pincode <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter 6-digit pincode"
              value={formData.pincode}
              onChangeText={(value) => updateFormData('pincode', value)}
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={6}
              editable={!loading}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <View style={styles.submitButtonContent}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.submitButtonText}>Creating...</Text>
              </View>
            ) : (
              <Text style={styles.submitButtonText}>🏗️ Create Project</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
    backgroundColor: App_Primary_color,
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
    paddingHorizontal: 20,
  },
  formSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
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
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  halfWidth: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: App_Primary_color,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
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

export default AddExecutiveProjectScreen;