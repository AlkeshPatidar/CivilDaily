

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Platform,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { BackIcon } from '../../assets/SVGs';
// import { FONTS_FAMILY } from '../../assets/Fonts';
// import { App_Primary_color, dark33, darkMode25, white } from '../../common/Colors/colors';
// import { apiGet, apiPost } from '../../utils/Apis';
// import { ToastMsg } from '../../utils/helperFunctions';

// const AddWorkRequirementForm = ({ navigation, route }) => {
//   const projectId = route?.params?.projectId; // Pass project ID from navigation
  
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [allCategories, setAllCategories] = useState([]);
//   const [projectData, setProjectData] = useState(null);
  
//   const [categories, setCategories] = useState([
//     {
//       id: '1',
//       categoryId: '',
//       subRoles: [],
//       numberOfPeopleRequired: '',
//     },
//   ]);

//   const [workRequirement, setWorkRequirement] = useState({
//     qualityLevel: '',
//     subQualityRating: '',
//     workStartDate: new Date(),
//     location: {
//       Address: '',
//       City: '',
//       State: '',
//       Pincode: '',
//     },
//   });

//   const [showDatePicker, setShowDatePicker] = useState(false);

//   // Fetch categories and project data
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       setLoading(true);
//       try {
//         // Fetch categories
//         const categoriesRes = await apiGet('/api/admin/GetAllWorkCategory');
//         setAllCategories(categoriesRes?.data || []);

//         // Fetch project data if projectId exists
//         if (projectId) {
//           const projectRes = await apiGet(`/api/user/GetAProject/${projectId}`);
//           const project = projectRes?.data;
//           setProjectData(project);

//           if (project?.Location) {
//             setWorkRequirement(prev => ({
//               ...prev,
//               location: {
//                 State: project.Location.State || '',
//                 City: project.Location.City || '',
//                 Pincode: project.Location.Pincode || '',
//                 Address: project.Location.Address || '',
//               },
//             }));
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         ToastMsg('Failed to load data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [projectId]);

//   const addNewCategory = () => {
//     const newCategory = {
//       id: Date.now().toString(),
//       categoryId: '',
//       subRoles: [],
//       numberOfPeopleRequired: '',
//     };
//     setCategories([...categories, newCategory]);
//   };

//   const removeCategory = (id) => {
//     if (categories.length > 1) {
//       setCategories(categories.filter(cat => cat.id !== id));
//     }
//   };

//   const updateCategory = (id, field, value) => {
//     setCategories(
//       categories.map((cat) =>
//         cat.id === id ? { ...cat, [field]: value } : cat
//       )
//     );
//   };

//   const handleCategoryChange = (id, categoryId) => {
//     setCategories(
//       categories.map((cat) =>
//         cat.id === id
//           ? { ...cat, categoryId, subRoles: [] }
//           : cat
//       )
//     );
//   };

//   const addSubRole = (id, roleId) => {
//     setCategories(
//       categories.map((cat) =>
//         cat.id === id && !cat.subRoles.includes(roleId)
//           ? { ...cat, subRoles: [...cat.subRoles, roleId] }
//           : cat
//       )
//     );
//   };

//   const removeSubRole = (catId, roleId) => {
//     setCategories(
//       categories.map((cat) =>
//         cat.id === catId
//           ? { ...cat, subRoles: cat.subRoles.filter(r => r !== roleId) }
//           : cat
//       )
//     );
//   };

//   const onDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || workRequirement.workStartDate;
//     setShowDatePicker(Platform.OS === 'ios');
//     setWorkRequirement({ ...workRequirement, workStartDate: currentDate });
//   };

//   const formatDate = (date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const validateForm = () => {
//     // Validate categories first
//     for (let i = 0; i < categories.length; i++) {
//       const cat = categories[i];
//       if (!cat.categoryId) {
//         ToastMsg(`Please select a category for item ${i + 1}`);
//         return false;
//       }
//       if (cat.subRoles.length === 0) {
//         ToastMsg(`Please select at least one role for item ${i + 1}`);
//         return false;
//       }
//       if (!cat.numberOfPeopleRequired || parseInt(cat.numberOfPeopleRequired) <= 0) {
//         ToastMsg(`Please specify number of people required for item ${i + 1}`);
//         return false;
//       }
//     }

//     // Validate address fields
//     const addressParts = workRequirement.location.Address.split('||');
//     if (!addressParts[0]?.trim() || !addressParts[1]?.trim()) {
//       ToastMsg('Please fill both House/Flat No and Address/Locality');
//       return false;
//     }

//     // Validate date
//     if (!workRequirement.workStartDate) {
//       ToastMsg('Please select a work start date');
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     setSubmitting(true);

//     // Get address parts
//     const addressParts = workRequirement.location.Address.split('||');
//     const houseFlatNo = addressParts[0]?.trim() || '';
//     const locality = addressParts[1]?.trim() || '';

//     const payload = {
//       Categories: categories.map((cat) => {
//         const selectedCategory = allCategories?.find(c => c._id === cat.categoryId);
//         return {
//           Category: selectedCategory?.CategoryName || '',
//           SubRoles: cat.subRoles.map((roleId) => {
//             const role = selectedCategory?.SubRoles?.find(sr => sr._id === roleId);
//             return role?.Name || '';
//           }),
//           NumberOfPeoplerequire: parseInt(cat.numberOfPeopleRequired) || 0,
//         };
//       }),
//       Project: projectId,
//       WorkStartDate: formatDate(workRequirement.workStartDate),
//       qualityLevel: workRequirement.qualityLevel || 'Standard',
//       subQualityRating: parseInt(workRequirement.subQualityRating) || 1,
//       Location: {
//         Pincode: workRequirement.location.Pincode.trim(),
//         Address: `${houseFlatNo}||${locality}`,
//         City: workRequirement.location.City.trim(),
//         State: workRequirement.location.State.trim(),
//       },
//     };

//     console.log('Submitting Payload:', JSON.stringify(payload, null, 2));

//     try {
//       const res = await apiPost('/api/user/CreateWorkRequirement', payload);
//       ToastMsg(res?.message || 'Requirement submitted successfully!');

//       // Reset form
//       setCategories([
//         {
//           id: '1',
//           categoryId: '',
//           subRoles: [],
//           numberOfPeopleRequired: '',
//         },
//       ]);
//       setWorkRequirement({
//         qualityLevel: '',
//         subQualityRating: '',
//         workStartDate: new Date(),
//         location: {
//           Address: '',
//           City: '',
//           State: '',
//           Pincode: '',
//         },
//       });

//       // Navigate back or to another screen
//       setTimeout(() => {
//         navigation.goBack();
//       }, 1000);
//     } catch (error) {
//       console.error('Submit Error:', error);
//       console.error('Error Response:', error?.response?.data);
//       ToastMsg(error?.response?.data?.message || 'Something went wrong');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={App_Primary_color} />
//         <Text style={styles.loadingText}>Loading categories...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <BackIcon />
//         </TouchableOpacity>
//         <View style={styles.iconContainer}>
//           <Text style={styles.iconText}>📋</Text>
//         </View>
//         <Text style={styles.title}>Add Work Requirement</Text>
//         <Text style={styles.subtitle}>
//           Fill out the details below to post your work requirement
//         </Text>
//       </View>

//       {/* Categories Section */}
//       {categories.map((category, index) => {
//         const selectedCategory = allCategories?.find(c => c._id === category.categoryId);
//         const availableRoles = selectedCategory?.SubRoles?.filter(
//           (role) => !category.subRoles.includes(role._id)
//         ) || [];

//         return (
//           <View key={category.id} style={styles.section}>
//             <View style={styles.sectionHeader}>
//               <Text style={styles.sectionTitle}>
//                 📋 Work Categories {index > 0 && `(${index + 1})`}
//               </Text>
//               {categories.length > 1 && (
//                 <TouchableOpacity
//                   onPress={() => removeCategory(category.id)}
//                   style={styles.removeButton}
//                 >
//                   <Text style={styles.removeButtonText}>✕</Text>
//                 </TouchableOpacity>
//               )}
//             </View>

//             <View style={styles.formGroup}>
//               <Text style={styles.label}>
//                 Category <Text style={styles.required}>*</Text>
//               </Text>
//               <View style={styles.pickerContainer}>
//                 <Picker
//                   selectedValue={category.categoryId}
//                   onValueChange={(value) => handleCategoryChange(category.id, value)}
//                   style={styles.picker}
//                   dropdownIconColor={'gray'}
//                 >
//                   <Picker.Item label="Select a category" value="" style={styles.dropDownItem} />
//                   {allCategories.map((cat) => (
//                     <Picker.Item
//                       key={cat._id}
//                       label={cat.CategoryName}
//                       value={cat._id}
//                       style={styles.dropDownItem}
//                     />
//                   ))}
//                 </Picker>
//               </View>
//             </View>

//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Required Roles *</Text>
//               <View style={styles.pickerContainer}>
//                 <Picker
//                   selectedValue=""
//                   onValueChange={(value) => {
//                     if (value) {
//                       addSubRole(category.id, value);
//                     }
//                   }}
//                   enabled={!!selectedCategory && availableRoles.length > 0}
//                   style={styles.picker}
//                   dropdownIconColor={'gray'}
//                 >
//                   <Picker.Item label="Select a role to add" value="" />
//                   {availableRoles.map((role) => (
//                     <Picker.Item
//                       key={role._id}
//                       label={role.Name}
//                       value={role._id}
//                       style={styles.dropDownItem}
//                     />
//                   ))}
//                 </Picker>
//               </View>
//             </View>

//             {category.subRoles.length > 0 && (
//               <View style={styles.selectedRolesContainer}>
//                 {category.subRoles.map((roleId) => {
//                   const role = selectedCategory?.SubRoles?.find(r => r._id === roleId);
//                   return role ? (
//                     <View key={roleId} style={styles.roleChip}>
//                       <Text style={styles.roleChipText}>{role.Name}</Text>
//                       <TouchableOpacity
//                         onPress={() => removeSubRole(category.id, roleId)}
//                         style={styles.roleChipRemove}
//                       >
//                         <Text style={styles.roleChipRemoveText}>✕</Text>
//                       </TouchableOpacity>
//                     </View>
//                   ) : null;
//                 })}
//               </View>
//             )}

//             <View style={styles.formGroup}>
//               <Text style={styles.label}>
//                 Number of People Required <Text style={styles.required}>*</Text>
//               </Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter number of people"
//                 value={category.numberOfPeopleRequired}
//                 onChangeText={(value) =>
//                   updateCategory(category.id, 'numberOfPeopleRequired', value)
//                 }
//                 keyboardType="numeric"
//                 placeholderTextColor="#999"
//               />
//             </View>

//             {index === categories.length - 1 && (
//               <TouchableOpacity
//                 style={styles.addCategoryButton}
//                 onPress={addNewCategory}
//               >
//                 <Text style={styles.addCategoryText}>+ Add another category</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         );
//       })}

//       {/* Quality Level Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>📊 Quality level</Text>

//         <View style={styles.row}>
//           <View style={[styles.formGroup, styles.halfWidth]}>
//             <Text style={styles.label}>Quality Level</Text>
//             <View style={styles.pickerContainer}>
//               <Picker
//                 selectedValue={workRequirement.qualityLevel}
//                 onValueChange={(value) =>
//                   setWorkRequirement({ ...workRequirement, qualityLevel: value })
//                 }
//                 style={styles.picker}
//               >
//                 <Picker.Item label="Select quality level" value="" style={styles.dropDownItem} />
//                 <Picker.Item label="Standard" value="Standard" style={styles.dropDownItem} />
//                 <Picker.Item label="Heavy" value="Heavy" style={styles.dropDownItem} />
//               </Picker>
//             </View>
//           </View>

//           <View style={[styles.formGroup, styles.halfWidth]}>
//             <Text style={styles.label}>Sub Quality Rating</Text>
//             {/* <Text style={styles.sublabel}>(1 → 5)</Text> */}
//             <View style={styles.pickerContainer}>
//               <Picker
//                 selectedValue={workRequirement.subQualityRating}
//                 onValueChange={(value) =>
//                   setWorkRequirement({ ...workRequirement, subQualityRating: value })
//                 }
//                 style={styles.picker}
//               >
//                 <Picker.Item label="Select Rating" value="" />
//                 {[1, 2, 3, 4, 5].map((num) => (
//                   <Picker.Item
//                     key={num}
//                     label={num.toString()}
//                     value={num.toString()}
//                     style={styles.dropDownItem}
//                   />
//                 ))}
//               </Picker>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* Work Location Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>📍 Work Location</Text>

//         <View style={styles.formGroup}>
//           <Text style={styles.label}>
//             House/Flat No. <Text style={styles.required}>*</Text>
//           </Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter house/flat number"
//             value={workRequirement.location.Address.split('||')[0] || ''}
//             onChangeText={(value) =>
//               setWorkRequirement({
//                 ...workRequirement,
//                 location: {
//                   ...workRequirement.location,
//                   Address: `${value}||${workRequirement.location.Address.split('||')[1] || ''}`,
//                 },
//               })
//             }
//             placeholderTextColor="#999"
//           />
//         </View>

//         <View style={styles.formGroup}>
//           <Text style={styles.label}>
//             Address / Locality <Text style={styles.required}>*</Text>
//           </Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Address / Locality"
//             value={workRequirement.location.Address.split('||')[1] || ''}
//             onChangeText={(value) =>
//               setWorkRequirement({
//                 ...workRequirement,
//                 location: {
//                   ...workRequirement.location,
//                   Address: `${workRequirement.location.Address.split('||')[0] || ''}||${value}`,
//                 },
//               })
//             }
//             placeholderTextColor="#999"
//           />
//         </View>
//       </View>

//       {/* Work Schedule Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>📅 Work Schedule</Text>

//         <View style={styles.formGroup}>
//           <Text style={styles.label}>
//             Work Start Date <Text style={styles.required}>*</Text>
//           </Text>
//           <TouchableOpacity
//             style={styles.dateInput}
//             onPress={() => setShowDatePicker(true)}
//           >
//             <Text style={styles.dateText}>{formatDate(workRequirement.workStartDate)}</Text>
//             <Text style={styles.calendarIcon}>📅</Text>
//           </TouchableOpacity>
//         </View>

//         {showDatePicker && (
//           <DateTimePicker
//             value={workRequirement.workStartDate}
//             mode="date"
//             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//             onChange={onDateChange}
//             minimumDate={new Date()}
//           />
//         )}
//       </View>

//       <TouchableOpacity
//         style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
//         onPress={handleSubmit}
//         disabled={submitting}
//       >
//         {submitting ? (
//           <View style={styles.submitButtonContent}>
//             <ActivityIndicator size="small" color="#fff" />
//             <Text style={styles.submitButtonText}>Submitting...</Text>
//           </View>
//         ) : (
//           <Text style={styles.submitButtonText}>📄 Submit Requirement</Text>
//         )}
//       </TouchableOpacity>

//       <View style={styles.bottomSpace} />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   loadingText: {
//     marginTop: 12,
//     fontSize: 14,
//     color: '#666',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   header: {
//     backgroundColor: '#fff',
//     padding: 20,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   backButton: {
//     position: 'absolute',
//     left: 20,
//     top: 22,
//   },
//   iconContainer: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#4285f4',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   iconText: {
//     fontSize: 24,
//     color: '#fff',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//     fontFamily: FONTS_FAMILY.Poppins_Bold,
//   },
//   subtitle: {
//     fontSize: 12,
//     color: '#666',
//     textAlign: 'center',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   section: {
//     backgroundColor: '#fff',
//     padding: 16,
//     marginBottom: 10,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//   },
//   removeButton: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: '#fee',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   removeButtonText: {
//     color: '#f00',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   formGroup: {
//     marginBottom: 15,
//   },
//   dropDownItem: {
//     fontSize: 14,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   label: {
//     fontSize: 13,
//     color: '#555',
//     marginBottom: 8,
//     fontWeight: '500',
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   sublabel: {
//     fontSize: 11,
//     color: '#888',
//     marginTop: -4,
//     marginBottom: 8,
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   required: {
//     color: '#ff0000',
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     backgroundColor: '#fff',
//   },
//   picker: {
//     height: 50,
//     color: 'black',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//     fontSize: 14,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 14,
//     backgroundColor: '#fff',
//     color: '#333',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   dateInput: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 14,
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   dateText: {
//     fontSize: 14,
//     color: '#333',
//     fontFamily: FONTS_FAMILY.Poppins_Regular,
//   },
//   calendarIcon: {
//     fontSize: 18,
//   },
//   selectedRolesContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//     marginBottom: 15,
//   },
//   roleChip: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#e8f4fd',
//     paddingVertical: 6,
//     paddingLeft: 12,
//     paddingRight: 8,
//     borderRadius: 16,
//     gap: 6,
//   },
//   roleChipText: {
//     fontSize: 13,
//     color: '#4285f4',
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   roleChipRemove: {
//     width: 18,
//     height: 18,
//     borderRadius: 9,
//     backgroundColor: '#4285f4',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   roleChipRemoveText: {
//     color: '#fff',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   addCategoryButton: {
//     marginTop: 10,
//     paddingVertical: 10,
//   },
//   addCategoryText: {
//     color: '#4285f4',
//     fontSize: 14,
//     fontWeight: '500',
//     fontFamily: FONTS_FAMILY.Poppins_Medium,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 10,
//   },
//   halfWidth: {
//     flex: 1,
//   },
//   submitButton: {
//     backgroundColor: '#4285f4',
//     margin: 16,
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   submitButtonDisabled: {
//     opacity: 0.6,
//   },
//   submitButtonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//     fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//   },
//   bottomSpace: {
//     height: 20,
//   },
// });

// export default AddWorkRequirementForm;


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BackIcon } from '../../assets/SVGs';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { App_Primary_color, dark33, darkMode25, white } from '../../common/Colors/colors';
import { apiGet, apiPost, apiPut } from '../../utils/Apis';
import { ToastMsg } from '../../utils/helperFunctions';

const AddWorkRequirementForm = ({ navigation, route }) => {
  const projectId = route?.params?.projectId;
  const workData = route?.params?.workData; // For edit mode
  const onUpdate = route?.params?.onUpdate; // Callback after update
  
  const isEditMode = !!workData; // Check if we're in edit mode
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [projectData, setProjectData] = useState(null);
  
  const [categories, setCategories] = useState([
    {
      id: '1',
      categoryId: '',
      subRoles: [],
      numberOfPeopleRequired: '',
    },
  ]);

  const [workRequirement, setWorkRequirement] = useState({
    qualityLevel: '',
    subQualityRating: '',
    workStartDate: new Date(),
    location: {
      Address: '',
      City: '',
      State: '',
      Pincode: '',
    },
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  // Fetch categories and project data
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        // Fetch categories
        const categoriesRes = await apiGet('/api/admin/GetAllWorkCategory');
        setAllCategories(categoriesRes?.data || []);

        // Edit mode - populate existing data
        if (isEditMode && workData) {
          populateEditData(workData, categoriesRes?.data || []);
        } 
        // Add mode - fetch project data if projectId exists
        else if (projectId) {
          const projectRes = await apiGet(`/api/user/GetAProject/${projectId}`);
          const project = projectRes?.data;
          setProjectData(project);

          if (project?.Location) {
            setWorkRequirement(prev => ({
              ...prev,
              location: {
                State: project.Location.State || '',
                City: project.Location.City || '',
                Pincode: project.Location.Pincode || '',
                Address: project.Location.Address || '',
              },
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        ToastMsg('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [projectId, workData, isEditMode]);

  // Populate form with existing work requirement data for editing
  const populateEditData = (data, categoriesList) => {
    // Set work start date
    if (data.WorkStartDate) {
      const dateObj = new Date(data.WorkStartDate);
      setWorkRequirement(prev => ({
        ...prev,
        workStartDate: dateObj,
        qualityLevel: data.qualityLevel || '',
        subQualityRating: data.subQualityRating?.toString() || '',
        location: {
          Pincode: data.Location?.Pincode || '',
          Address: data.Location?.Address || '',
          City: data.Location?.City || '',
          State: data.Location?.State || '',
        },
      }));
    }

    // Map categories from names to IDs
    if (data.Categories && categoriesList.length > 0) {
      const mappedCategories = data.Categories.map((cat, index) => {
        const category = categoriesList.find((c) => c.CategoryName === cat.Category);
        
        // Map sub-role names to IDs
        const subRoleIds = cat.SubRoles?.map((roleName) => {
          const role = category?.SubRoles?.find((sr) => sr.Name === roleName);
          return role?._id || '';
        }).filter(id => id !== '') || [];

        return {
          id: (index + 1).toString(),
          categoryId: category?._id || '',
          subRoles: subRoleIds,
          numberOfPeopleRequired: cat.NumberOfPeoplerequire?.toString() || '',
        };
      });

      setCategories(mappedCategories);
    }
  };

  const addNewCategory = () => {
    const newCategory = {
      id: Date.now().toString(),
      categoryId: '',
      subRoles: [],
      numberOfPeopleRequired: '',
    };
    setCategories([...categories, newCategory]);
  };

  const removeCategory = (id) => {
    if (categories.length > 1) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const updateCategory = (id, field, value) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, [field]: value } : cat
      )
    );
  };

  const handleCategoryChange = (id, categoryId) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id
          ? { ...cat, categoryId, subRoles: [] }
          : cat
      )
    );
  };

  const addSubRole = (id, roleId) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id && !cat.subRoles.includes(roleId)
          ? { ...cat, subRoles: [...cat.subRoles, roleId] }
          : cat
      )
    );
  };

  const removeSubRole = (catId, roleId) => {
    setCategories(
      categories.map((cat) =>
        cat.id === catId
          ? { ...cat, subRoles: cat.subRoles.filter(r => r !== roleId) }
          : cat
      )
    );
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || workRequirement.workStartDate;
    setShowDatePicker(Platform.OS === 'ios');
    setWorkRequirement({ ...workRequirement, workStartDate: currentDate });
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const validateForm = () => {
    // Validate categories first
    for (let i = 0; i < categories.length; i++) {
      const cat = categories[i];
      if (!cat.categoryId) {
        ToastMsg(`Please select a category for item ${i + 1}`);
        return false;
      }
      if (cat.subRoles.length === 0) {
        ToastMsg(`Please select at least one role for item ${i + 1}`);
        return false;
      }
      if (!cat.numberOfPeopleRequired || parseInt(cat.numberOfPeopleRequired) <= 0) {
        ToastMsg(`Please specify number of people required for item ${i + 1}`);
        return false;
      }
    }

    // Validate address fields
    const addressParts = workRequirement.location.Address.split('||');
    if (!addressParts[0]?.trim() || !addressParts[1]?.trim()) {
      ToastMsg('Please fill both House/Flat No and Address/Locality');
      return false;
    }

    // Validate date
    if (!workRequirement.workStartDate) {
      ToastMsg('Please select a work start date');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitting(true);

    // Get address parts
    const addressParts = workRequirement.location.Address.split('||');
    const houseFlatNo = addressParts[0]?.trim() || '';
    const locality = addressParts[1]?.trim() || '';

    const payload = {
      Categories: categories.map((cat) => {
        const selectedCategory = allCategories?.find(c => c._id === cat.categoryId);
        return {
          Category: selectedCategory?.CategoryName || '',
          SubRoles: cat.subRoles.map((roleId) => {
            const role = selectedCategory?.SubRoles?.find(sr => sr._id === roleId);
            return role?.Name || '';
          }),
          NumberOfPeoplerequire: parseInt(cat.numberOfPeopleRequired) || 0,
        };
      }),
      WorkStartDate: formatDate(workRequirement.workStartDate),
      qualityLevel: workRequirement.qualityLevel || 'Standard',
      subQualityRating: parseInt(workRequirement.subQualityRating) || 1,
      Location: {
        Pincode: workRequirement.location.Pincode.trim(),
        Address: `${houseFlatNo}||${locality}`,
        City: workRequirement.location.City.trim(),
        State: workRequirement.location.State.trim(),
      },
    };

    // Add Project ID only for create mode
    if (!isEditMode) {
      payload.Project = projectId;
    }

    console.log('Submitting Payload:', JSON.stringify(payload, null, 2));

    try {
      let res;
      if (isEditMode) {
        // Update existing work requirement
        res = await apiPut(`/api/user/UpdateWorkRequirement/${workData._id}`, payload);
        ToastMsg(res?.message || 'Work requirement updated successfully!');
      } else {
        // Create new work requirement
        res = await apiPost('/api/user/CreateWorkRequirement', payload);
        ToastMsg(res?.message || 'Requirement submitted successfully!');
      }

      // Call onUpdate callback if provided
      if (onUpdate) {
        onUpdate();
      }

      // Navigate back
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } catch (error) {
      console.error('Submit Error:', error);
      console.error('Error Response:', error?.response?.data);
      ToastMsg(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={App_Primary_color} />
        <Text style={styles.loadingText}>
          {isEditMode ? 'Loading work requirement...' : 'Loading categories...'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>📋</Text>
        </View>
        <Text style={styles.title}>
          {isEditMode ? 'Update Work Requirement' : 'Add Work Requirement'}
        </Text>
        <Text style={styles.subtitle}>
          {isEditMode 
            ? 'Update the details below to modify your work requirement'
            : 'Fill out the details below to post your work requirement'
          }
        </Text>
      </View>

      {/* Categories Section */}
      {categories.map((category, index) => {
        const selectedCategory = allCategories?.find(c => c._id === category.categoryId);
        const availableRoles = selectedCategory?.SubRoles?.filter(
          (role) => !category.subRoles.includes(role._id)
        ) || [];

        return (
          <View key={category.id} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                📋 Work Categories {index > 0 && `(${index + 1})`}
              </Text>
              {categories.length > 1 && (
                <TouchableOpacity
                  onPress={() => removeCategory(category.id)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Category <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={category.categoryId}
                  onValueChange={(value) => handleCategoryChange(category.id, value)}
                  style={styles.picker}
                  dropdownIconColor={'gray'}
                >
                  <Picker.Item label="Select a category" value="" style={styles.dropDownItem} />
                  {allCategories.map((cat) => (
                    <Picker.Item
                      key={cat._id}
                      label={cat.CategoryName}
                      value={cat._id}
                      style={styles.dropDownItem}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Required Roles *</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue=""
                  onValueChange={(value) => {
                    if (value) {
                      addSubRole(category.id, value);
                    }
                  }}
                  enabled={!!selectedCategory && availableRoles.length > 0}
                  style={styles.picker}
                  dropdownIconColor={'gray'}
                >
                  <Picker.Item label="Select a role to add" value="" />
                  {availableRoles.map((role) => (
                    <Picker.Item
                      key={role._id}
                      label={role.Name}
                      value={role._id}
                      style={styles.dropDownItem}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {category.subRoles.length > 0 && (
              <View style={styles.selectedRolesContainer}>
                {category.subRoles.map((roleId) => {
                  const role = selectedCategory?.SubRoles?.find(r => r._id === roleId);
                  return role ? (
                    <View key={roleId} style={styles.roleChip}>
                      <Text style={styles.roleChipText}>{role.Name}</Text>
                      <TouchableOpacity
                        onPress={() => removeSubRole(category.id, roleId)}
                        style={styles.roleChipRemove}
                      >
                        <Text style={styles.roleChipRemoveText}>✕</Text>
                      </TouchableOpacity>
                    </View>
                  ) : null;
                })}
              </View>
            )}

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Number of People Required <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter number of people"
                value={category.numberOfPeopleRequired}
                onChangeText={(value) =>
                  updateCategory(category.id, 'numberOfPeopleRequired', value)
                }
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>

            {index === categories.length - 1 && (
              <TouchableOpacity
                style={styles.addCategoryButton}
                onPress={addNewCategory}
              >
                <Text style={styles.addCategoryText}>+ Add another category</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}

      {/* Quality Level Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Quality level</Text>

        <View style={styles.row}>
          <View style={[styles.formGroup, styles.halfWidth]}>
            <Text style={styles.label}>Quality Level</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={workRequirement.qualityLevel}
                onValueChange={(value) =>
                  setWorkRequirement({ ...workRequirement, qualityLevel: value })
                }
                style={styles.picker}
              >
                <Picker.Item label="Select quality level" value="" style={styles.dropDownItem} />
                <Picker.Item label="Standard" value="Standard" style={styles.dropDownItem} />
                <Picker.Item label="Heavy" value="Heavy" style={styles.dropDownItem} />
              </Picker>
            </View>
          </View>

          <View style={[styles.formGroup, styles.halfWidth]}>
            <Text style={styles.label}>Sub Quality Rating</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={workRequirement.subQualityRating}
                onValueChange={(value) =>
                  setWorkRequirement({ ...workRequirement, subQualityRating: value })
                }
                style={styles.picker}
              >
                <Picker.Item label="Select Rating" value="" />
                {[1, 2, 3, 4, 5].map((num) => (
                  <Picker.Item
                    key={num}
                    label={num.toString()}
                    value={num.toString()}
                    style={styles.dropDownItem}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>
      </View>

      {/* Work Location Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 Work Location</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            House/Flat No. <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter house/flat number"
            value={workRequirement.location.Address.split('||')[0] || ''}
            onChangeText={(value) =>
              setWorkRequirement({
                ...workRequirement,
                location: {
                  ...workRequirement.location,
                  Address: `${value}||${workRequirement.location.Address.split('||')[1] || ''}`,
                },
              })
            }
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Address / Locality <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Address / Locality"
            value={workRequirement.location.Address.split('||')[1] || ''}
            onChangeText={(value) =>
              setWorkRequirement({
                ...workRequirement,
                location: {
                  ...workRequirement.location,
                  Address: `${workRequirement.location.Address.split('||')[0] || ''}||${value}`,
                },
              })
            }
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Work Schedule Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📅 Work Schedule</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Work Start Date <Text style={styles.required}>*</Text>
          </Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>{formatDate(workRequirement.workStartDate)}</Text>
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={workRequirement.workStartDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}
      </View>

      <TouchableOpacity
        style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        {submitting ? (
          <View style={styles.submitButtonContent}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={styles.submitButtonText}>
              {isEditMode ? 'Updating...' : 'Submitting...'}
            </Text>
          </View>
        ) : (
          <Text style={styles.submitButtonText}>
            {isEditMode ? '📝 Update Requirement' : '📄 Submit Requirement'}
          </Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#f00',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: 15,
  },
  dropDownItem: {
    fontSize: 14,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    color: 'black',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    fontSize: 14,
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
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#333',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  calendarIcon: {
    fontSize: 18,
  },
  selectedRolesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  roleChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f4fd',
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 8,
    borderRadius: 16,
    gap: 6,
  },
  roleChipText: {
    fontSize: 13,
    color: '#4285f4',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  roleChipRemove: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#4285f4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleChipRemoveText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  addCategoryButton: {
    marginTop: 10,
    paddingVertical: 10,
  },
  addCategoryText: {
    color: '#4285f4',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
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
    backgroundColor: '#4285f4',
    margin: 16,
    padding: 16,
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

export default AddWorkRequirementForm;