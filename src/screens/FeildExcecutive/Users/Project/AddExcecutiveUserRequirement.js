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
  Modal,
  FlatList,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BackIcon } from '../../../../assets/SVGs';
import { FONTS_FAMILY } from '../../../../assets/Fonts';
import { App_Primary_color, dark33, darkMode25, white } from '../../../../common/Colors/colors';
import { apiGet, apiPost, apiPut } from '../../../../utils/Apis';
import { ToastMsg } from '../../../../utils/helperFunctions';

const ExcutiveAddRequirementForm = ({ navigation, route }) => {
  const projectId = route?.params?.projectId;
  const workData = route?.params?.workData;
  const itemData = route?.params?.itemData;
  const onUpdate = route?.params?.onUpdate;
  
  const isEditMode = !!(workData || itemData);
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Toggle between Item and Work types
  const [requirementType, setRequirementType] = useState(workData ? 'Work' : 'Item');
  
  // Common fields
  const [projectData, setProjectData] = useState(null);
  const [qualityLevel, setQualityLevel] = useState('');
  const [subQualityRating, setSubQualityRating] = useState('');
  const [timeline, setTimeline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState({
    Address: '',
    City: '',
    State: '',
    Pincode: '',
  });
  const [note, setNote] = useState('');
  const [helperContact, setHelperContact] = useState('');
  const [helperName, setHelperName] = useState('');

  // Work-specific state
  const [allWorkCategories, setAllWorkCategories] = useState([]);
  const [workCategories, setWorkCategories] = useState([
    {
      id: '1',
      categoryId: '',
      subRoles: [],
      numberOfPeopleRequired: '',
    },
  ]);

  // Item-specific state
  const [allProductCategories, setAllProductCategories] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [selectedProductCategory, setSelectedProductCategory] = useState('');
  const [categoryItems, setCategoryItems] = useState({});
  const [productSuggestions, setProductSuggestions] = useState([]);
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState({ category: '', index: 0 });

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        // Fetch project data
        if (projectId) {
          const projectRes = await apiGet(`/api/user/GetAProject/${projectId}`);
          const project = projectRes?.data;
          setProjectData(project);

          if (project?.Location) {
            setLocation({
              State: project.Location.State || '',
              City: project.Location.City || '',
              Pincode: project.Location.Pincode || '',
              Address: project.Location.Address || '',
            });
          }
        }

        // Fetch work categories
        const workCatRes = await apiGet('/api/admin/GetAllWorkCategory');
        setAllWorkCategories(workCatRes?.data || []);

        // Fetch product categories
        const prodCatRes = await apiGet('/api/inventory/getAllProductCategory');
        setAllProductCategories(prodCatRes?.data || []);

        // Populate edit data
        if (isEditMode) {
          if (workData) {
            populateWorkEditData(workData, workCatRes?.data || []);
          } else if (itemData) {
            populateItemEditData(itemData);
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
  }, [projectId, workData, itemData, isEditMode]);

  // Fetch brands when product category changes
  useEffect(() => {
    const fetchBrands = async () => {
        console.log(selectedProductCategory,'SelectedPDDDD');
        
      if (selectedProductCategory) {
        try {
          const response = await apiGet(`/api/inventory/getAllCompany?category=${selectedProductCategory}`);

          console.log('Brand Names', response?.data);
          
          setAllBrands(response?.data || []);
        } catch (error) {
          console.error('Error fetching brands:', error);
        }
      }
    };
    fetchBrands();
  }, [selectedProductCategory]);

  // Search products with debounce
  let searchTimeout;
  const searchProducts = async (name) => {
    if (!name || name.length < 2) {
      setProductSuggestions([]);
      return;
    }
    
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
      try {
        const response = await apiGet(`/api/user/SearchProduct?name=${name}`);
        setProductSuggestions(response?.data || []);
      } catch (error) {
        console.error('Error searching products:', error);
      }
    }, 300);
  };

  const populateWorkEditData = (data, categoriesList) => {
    if (data.WorkStartDate) {
      setTimeline(new Date(data.WorkStartDate));
    }
    setQualityLevel(data.qualityLevel || '');
    setSubQualityRating(data.subQualityRating?.toString() || '');
    setLocation({
      Pincode: data.Location?.Pincode || '',
      Address: data.Location?.Address || '',
      City: data.Location?.City || '',
      State: data.Location?.State || '',
    });

    if (data.Categories && categoriesList.length > 0) {
      const mappedCategories = data.Categories.map((cat, index) => {
        const category = categoriesList.find((c) => c.CategoryName === cat.Category);
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
      setWorkCategories(mappedCategories);
    }
  };

  const populateItemEditData = (data) => {
    if (data.TimeLine) {
      setTimeline(new Date(data.TimeLine));
    }
    setQualityLevel(data.qualityLevel || '');
    setSubQualityRating(data.subQualityRating?.toString() || '');
    setLocation({
      Pincode: data.Location?.Pincode || '',
      Address: data.Location?.Address || '',
      City: data.Location?.City || '',
      State: data.Location?.State || '',
    });
    setNote(data.Note || '');
    setHelperContact(data.HelperContact || '');
    setHelperName(data.HelperName || '');

    // Group items by category
    if (data.Items) {
      const grouped = {};
      data.Items.forEach(item => {
        if (!grouped[item.category]) {
          grouped[item.category] = [];
        }
        grouped[item.category].push({
          productName: item.productName || '',
          brandNames: item.brandNames?.map(b => b.brandName) || [],
          customBrand: '',
          quantity: item.quantity || '',
          size: item.size || '',
          Note: item.Note || '',
          availableSizes: [],
        });
      });
      setCategoryItems(grouped);
    }
  };

  // Work Category Functions
  const addWorkCategory = () => {
    const newCategory = {
      id: Date.now().toString(),
      categoryId: '',
      subRoles: [],
      numberOfPeopleRequired: '',
    };
    setWorkCategories([...workCategories, newCategory]);
  };

  const removeWorkCategory = (id) => {
    if (workCategories.length > 1) {
      setWorkCategories(workCategories.filter(cat => cat.id !== id));
    }
  };

  const updateWorkCategory = (id, field, value) => {
    setWorkCategories(
      workCategories.map((cat) =>
        cat.id === id ? { ...cat, [field]: value } : cat
      )
    );
  };

  const handleWorkCategoryChange = (id, categoryId) => {
    setWorkCategories(
      workCategories.map((cat) =>
        cat.id === id ? { ...cat, categoryId, subRoles: [] } : cat
      )
    );
  };

  const addSubRole = (id, roleId) => {
    setWorkCategories(
      workCategories.map((cat) =>
        cat.id === id && !cat.subRoles.includes(roleId)
          ? { ...cat, subRoles: [...cat.subRoles, roleId] }
          : cat
      )
    );
  };

  const removeSubRole = (catId, roleId) => {
    setWorkCategories(
      workCategories.map((cat) =>
        cat.id === catId
          ? { ...cat, subRoles: cat.subRoles.filter(r => r !== roleId) }
          : cat
      )
    );
  };

  // Item Category Functions
  const addProductCategory = () => {
    if (!selectedProductCategory || categoryItems[selectedProductCategory]) return;
    setCategoryItems((prev) => ({
      ...prev,
      [selectedProductCategory]: [
        {
          productName: '',
          quantity: '',
          size: '',
          brandNames: [],
          customBrand: '',
          Note: '',
          availableSizes: [],
        }
      ]
    }));
    setSelectedProductCategory('');
  };

  const removeProductCategory = (category) => {
    const updated = { ...categoryItems };
    delete updated[category];
    setCategoryItems(updated);
  };

  const addItem = (category) => {
    setCategoryItems((prev) => ({
      ...prev,
      [category]: [
        ...prev[category],
        {
          productName: '',
          quantity: '',
          size: '',
          brandNames: [],
          customBrand: '',
          Note: '',
          availableSizes: [],
        }
      ]
    }));
  };

  const removeItem = (category, index) => {
    const updated = { ...categoryItems };
    updated[category].splice(index, 1);
    if (updated[category].length === 0) delete updated[category];
    setCategoryItems(updated);
  };

  const updateItem = (category, index, field, value) => {
    const updated = { ...categoryItems };
    updated[category][index][field] = value;
    setCategoryItems(updated);
  };

  const addBrandToItem = (category, index, brand) => {
    const updated = { ...categoryItems };
    if (!updated[category][index].brandNames.includes(brand)) {
      updated[category][index].brandNames.push(brand);
    }
    setCategoryItems(updated);
  };

  const removeBrandFromItem = (category, index, brandIndex) => {
    const updated = { ...categoryItems };
    updated[category][index].brandNames.splice(brandIndex, 1);
    setCategoryItems(updated);
  };

  const selectProductSuggestion = (category, index, product) => {
    updateItem(category, index, 'productName', product.Name?.trim() || '');
    if (product.Variants?.length === 1) {
      updateItem(category, index, 'size', product.Variants[0].size);
    } else if (product.Variants) {
      updateItem(category, index, 'availableSizes', product.Variants.map((v) => v.size));
    }
    setShowProductSearch(false);
    setProductSuggestions([]);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || timeline;
    setShowDatePicker(Platform.OS === 'ios');
    setTimeline(currentDate);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const validateWorkForm = () => {
    for (let i = 0; i < workCategories.length; i++) {
      const cat = workCategories[i];
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

    const addressParts = location.Address.split('||');
    if (!addressParts[0]?.trim() || !addressParts[1]?.trim()) {
      ToastMsg('Please fill both House/Flat No and Address/Locality');
      return false;
    }

    if (!timeline) {
      ToastMsg('Please select a work start date');
      return false;
    }

    return true;
  };

  const validateItemForm = () => {
    const allItems = Object.values(categoryItems).flat();
    
    if (allItems.length === 0) {
      ToastMsg('Please add at least one item');
      return false;
    }

    for (let i = 0; i < allItems.length; i++) {
      const item = allItems[i];
      if (!item.productName.trim()) {
        ToastMsg(`Please enter product name for item ${i + 1}`);
        return false;
      }
      if (!item.quantity.trim()) {
        ToastMsg(`Please enter quantity for item ${i + 1}`);
        return false;
      }
      if (!item.size.trim()) {
        ToastMsg(`Please enter size for item ${i + 1}`);
        return false;
      }
      if (item.brandNames.length === 0) {
        ToastMsg(`Please add at least one brand for item ${i + 1}`);
        return false;
      }
    }

    if (!timeline) {
      ToastMsg('Please select a timeline');
      return false;
    }

    const addressParts = location.Address.split('||');
    if (!addressParts[0]?.trim() || !addressParts[1]?.trim()) {
      ToastMsg('Please fill both House/Flat No and Address/Locality');
      return false;
    }

    if (!location.State.trim() || !location.City.trim()) {
      ToastMsg('Please fill State and City');
      return false;
    }

    if (!location.Pincode.trim() || location.Pincode.length !== 6) {
      ToastMsg('Please enter valid 6-digit Pincode');
      return false;
    }

    if (helperContact && !/^\d{10}$/.test(helperContact)) {
      ToastMsg('Please enter valid 10-digit contact number');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (requirementType === 'Work') {
      if (!validateWorkForm()) return;
    } else {
      if (!validateItemForm()) return;
    }

    setSubmitting(true);

    const addressParts = location.Address.split('||');
    const houseFlatNo = addressParts[0]?.trim() || '';
    const locality = addressParts[1]?.trim() || '';

    try {
      let res;
      
      if (requirementType === 'Work') {
        const payload = {
          Categories: workCategories.map((cat) => {
            const selectedCategory = allWorkCategories?.find(c => c._id === cat.categoryId);
            return {
              Category: selectedCategory?.CategoryName || '',
              SubRoles: cat.subRoles.map((roleId) => {
                const role = selectedCategory?.SubRoles?.find(sr => sr._id === roleId);
                return role?.Name || '';
              }),
              NumberOfPeoplerequire: parseInt(cat.numberOfPeopleRequired) || 0,
            };
          }),
          WorkStartDate: formatDate(timeline),
          qualityLevel: qualityLevel || 'Standard',
          subQualityRating: parseInt(subQualityRating) || 1,
          Location: {
            Pincode: location.Pincode.trim(),
            Address: `${houseFlatNo}||${locality}`,
            City: location.City.trim(),
            State: location.State.trim(),
          },
        };

        if (!isEditMode) {
          payload.Project = projectId;
        }

        console.log('Work Payload:', JSON.stringify(payload, null, 2));

        if (isEditMode && workData) {
          res = await apiPut(`/api/user/UpdateWorkRequirement/${workData._id}`, payload);
          ToastMsg(res?.message || 'Work requirement updated successfully!');
        } else {
          res = await apiPost('/api/user/CreateWorkRequirement', payload);
          ToastMsg(res?.message || 'Work requirement submitted successfully!');
        }
      } else {
        // Item requirement
        const payload = {
          Items: Object.entries(categoryItems).flatMap(([category, items]) =>
            items.map((item) => ({
              category,
              productName: item.productName.trim(),
              brandNames: item.brandNames.map((b) => ({ brandName: b.trim() })),
              quantity: item.quantity.trim(),
              size: item.size.trim(),
              Note: item.Note?.trim() || ''
            }))
          ),
          Project: projectId,
          qualityLevel: qualityLevel || 'Standard',
          subQualityRating: parseInt(subQualityRating) || 1,
          TimeLine: formatDate(timeline),
          Location: {
            State: location.State.trim(),
            City: location.City.trim(),
            Pincode: location.Pincode.trim(),
            Address: `${houseFlatNo}||${locality}`,
          },
          Note: note.trim(),
          HelperContact: helperContact.trim(),
          HelperName: helperName.trim(),
        };

        console.log('Item Payload:', JSON.stringify(payload, null, 2));

        if (isEditMode && itemData) {
          res = await apiPut(`/api/executive/UpdateUserRequirement/${itemData._id}`, payload);
          ToastMsg(res?.message || 'Item requirement updated successfully!');
        } else {
          res = await apiPost('/api/executive/AddUserRequirement', payload);
          ToastMsg(res?.message || 'Item requirement submitted successfully!');
        }
      }

      if (onUpdate) {
        onUpdate();
      }

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
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const availableProductCategories = allProductCategories.filter(
    (cat) => !categoryItems[cat.Name]
  );

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
          {isEditMode ? 'Update Requirement' : 'Add Requirement'}
        </Text>
        <Text style={styles.subtitle}>
          {isEditMode 
            ? 'Update the details below'
            : 'Fill out the details below to post your requirement'
          }
        </Text>
      </View>

      {/* Requirement Type Toggle */}
      {!isEditMode && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Requirement Type</Text>
          <View style={styles.typeToggle}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                requirementType === 'Item' && styles.typeButtonActive
              ]}
              onPress={() => setRequirementType('Item')}
            >
              <Text style={[
                styles.typeButtonText,
                requirementType === 'Item' && styles.typeButtonTextActive
              ]}>
                Items
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                requirementType === 'Work' && styles.typeButtonActive
              ]}
              onPress={() => setRequirementType('Work')}
            >
              <Text style={[
                styles.typeButtonText,
                requirementType === 'Work' && styles.typeButtonTextActive
              ]}>
                Work/Labour
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Work Categories Section */}
      {requirementType === 'Work' && workCategories.map((category, index) => {
        const selectedCategory = allWorkCategories?.find(c => c._id === category.categoryId);
        const availableRoles = selectedCategory?.SubRoles?.filter(
          (role) => !category.subRoles.includes(role._id)
        ) || [];

        return (
          <View key={category.id} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                📋 Work Categories {index > 0 && `(${index + 1})`}
              </Text>
              {workCategories.length > 1 && (
                <TouchableOpacity
                  onPress={() => removeWorkCategory(category.id)}
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
                  onValueChange={(value) => handleWorkCategoryChange(category.id, value)}
                  style={styles.picker}
                  dropdownIconColor={'gray'}
                >
                  <Picker.Item label="Select a category" value="" />
                  {allWorkCategories.map((cat) => (
                    <Picker.Item
                      key={cat._id}
                      label={cat.CategoryName}
                      value={cat._id}
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
                  updateWorkCategory(category.id, 'numberOfPeopleRequired', value)
                }
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>

            {index === workCategories.length - 1 && (
              <TouchableOpacity
                style={styles.addCategoryButton}
                onPress={addWorkCategory}
              >
                <Text style={styles.addCategoryText}>+ Add another category</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}

      {/* Item Categories Section */}
      {requirementType === 'Item' && (
        <>
          {Object.entries(categoryItems).map(([category, items]) => (
            <View key={category} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  📦 {category} Items
                </Text>
                <TouchableOpacity
                  onPress={() => removeProductCategory(category)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              {items.map((item, i) => (
                <View key={i} style={styles.itemCard}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>Item {i + 1}</Text>
                    {items.length > 1 && (
                      <TouchableOpacity
                        onPress={() => removeItem(category, i)}
                        style={styles.removeItemButton}
                      >
                        <Text style={styles.removeButtonText}>✕</Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Product Name *</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Search or enter product name"
                      value={item.productName}
                      onChangeText={(value) => {
                        updateItem(category, i, 'productName', value);
                        searchProducts(value);
                      }}
                      onFocus={() => {
                        setActiveItemIndex({ category, index: i });
                        if (item.productName.length >= 2) {
                          setShowProductSearch(true);
                        }
                      }}
                      placeholderTextColor="#999"
                    />
                    {showProductSearch && 
                     activeItemIndex.category === category && 
                     activeItemIndex.index === i && 
                     productSuggestions.length > 0 && (
                      <View style={styles.suggestionsContainer}>
                        <ScrollView style={styles.suggestionsList} nestedScrollEnabled>
                          {productSuggestions.slice(0, 5).map((product, idx) => (
                            <TouchableOpacity
                              key={idx}
                              style={styles.suggestionItem}
                              onPress={() => selectProductSuggestion(category, i, product)}
                            >
                              <Text style={styles.suggestionText}>{product.Name}</Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                        <TouchableOpacity
                          style={styles.closeSuggestions}
                          onPress={() => {
                            setShowProductSearch(false);
                            setProductSuggestions([]);
                          }}
                        >
                          <Text style={styles.closeSuggestionsText}>Close</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>

                  <View style={styles.row}>
                    <View style={[styles.formGroup, styles.halfWidth]}>
                      <Text style={styles.label}>Quantity *</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="20 Units"
                        value={item.quantity}
                        onChangeText={(value) => updateItem(category, i, 'quantity', value)}
                        placeholderTextColor="#999"
                      />
                    </View>

                    <View style={[styles.formGroup, styles.halfWidth]}>
                      <Text style={styles.label}>Size *</Text>
                      {item.availableSizes && item.availableSizes.length > 0 ? (
                        <View style={styles.pickerContainer}>
                          <Picker
                            selectedValue={item.size}
                            onValueChange={(value) => {
                              updateItem(category, i, 'size', value);
                              updateItem(category, i, 'availableSizes', []);
                            }}
                            style={styles.picker}
                          >
                            <Picker.Item label="Select size" value="" />
                            {item.availableSizes.map((size, idx) => (
                              <Picker.Item key={idx} label={size} value={size} />
                            ))}
                          </Picker>
                        </View>
                      ) : (
                        <TextInput
                          style={styles.input}
                          placeholder="1200mm"
                          value={item.size}
                          onChangeText={(value) => updateItem(category, i, 'size', value)}
                          placeholderTextColor="#999"
                        />
                      )}
                    </View>
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Brands *</Text>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue=""
                        onValueChange={(value) => {
                          if (value) {
                            addBrandToItem(category, i, value);
                          }
                        }}
                        style={styles.picker}
                        dropdownIconColor={'gray'}
                      >
                        <Picker.Item label="Select a brand" value="" />
                        {allBrands.map((brand, idx) => (
                          <Picker.Item
                            key={idx}
                            label={brand.Name}
                            value={brand.Name}
                          />
                        ))}
                      </Picker>
                    </View>

                    <View style={styles.customBrandContainer}>
                      <TextInput
                        style={[styles.input, styles.customBrandInput]}
                        placeholder="Add custom brand"
                        value={item.customBrand}
                        onChangeText={(value) => updateItem(category, i, 'customBrand', value)}
                        placeholderTextColor="#999"
                      />
                      <TouchableOpacity
                        style={styles.addBrandButton}
                        onPress={() => {
                          if (item.customBrand && !item.brandNames.includes(item.customBrand)) {
                            addBrandToItem(category, i, item.customBrand);
                            updateItem(category, i, 'customBrand', '');
                          }
                        }}
                      >
                        <Text style={styles.addBrandButtonText}>Add</Text>
                      </TouchableOpacity>
                    </View>

                    {item.brandNames.length > 0 && (
                      <View style={styles.selectedRolesContainer}>
                        {item.brandNames.map((brand, idx) => (
                          <View key={idx} style={styles.roleChip}>
                            <Text style={styles.roleChipText}>{brand}</Text>
                            <TouchableOpacity
                              onPress={() => removeBrandFromItem(category, i, idx)}
                              style={styles.roleChipRemove}
                            >
                              <Text style={styles.roleChipRemoveText}>✕</Text>
                            </TouchableOpacity>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Note</Text>
                    <TextInput
                      style={[styles.input, styles.textArea]}
                      placeholder="Add note for this item..."
                      value={item.Note}
                      onChangeText={(value) => updateItem(category, i, 'Note', value)}
                      multiline
                      numberOfLines={3}
                      placeholderTextColor="#999"
                    />
                  </View>
                </View>
              ))}

              <TouchableOpacity
                style={styles.addCategoryButton}
                onPress={() => addItem(category)}
              >
                <Text style={styles.addCategoryText}>+ Add another item</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* Add Product Category Button */}
          <View style={styles.section}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Add Product Category</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedProductCategory}
                  onValueChange={(value) => setSelectedProductCategory(value)}
                  style={styles.picker}
                  dropdownIconColor={'gray'}
                >
                  <Picker.Item label="-- Choose Category --" value="" />
                  {availableProductCategories.map((cat) => (
                    <Picker.Item
                      key={cat._id}
                      label={cat.Name}
                      value={cat.Name}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.addButton,
                !selectedProductCategory && styles.addButtonDisabled
              ]}
              onPress={addProductCategory}
              disabled={!selectedProductCategory}
            >
              <Text style={styles.addButtonText}>+ Add Category</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Quality Level Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Quality Level</Text>

        <View style={styles.row}>
          <View style={[styles.formGroup, styles.halfWidth]}>
            <Text style={styles.label}>Quality Level</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={qualityLevel}
                onValueChange={(value) => setQualityLevel(value)}
                style={styles.picker}
              >
                <Picker.Item label="Select quality level" value="" />
                <Picker.Item label="Standard" value="Standard" />
                <Picker.Item label="Heavy" value="Heavy" />
              </Picker>
            </View>
          </View>

          <View style={[styles.formGroup, styles.halfWidth]}>
            <Text style={styles.label}>Sub Quality Rating</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={subQualityRating}
                onValueChange={(value) => setSubQualityRating(value)}
                style={styles.picker}
              >
                <Picker.Item label="Select Rating" value="" />
                {[1, 2, 3, 4, 5].map((num) => (
                  <Picker.Item
                    key={num}
                    label={num.toString()}
                    value={num.toString()}
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
            value={location.Address.split('||')[0] || ''}
            onChangeText={(value) =>
              setLocation({
                ...location,
                Address: `${value}||${location.Address.split('||')[1] || ''}`,
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
            value={location.Address.split('||')[1] || ''}
            onChangeText={(value) =>
              setLocation({
                ...location,
                Address: `${location.Address.split('||')[0] || ''}||${value}`,
              })
            }
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, styles.halfWidth]}>
            <Text style={styles.label}>
              City <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter city"
              value={location.City}
              onChangeText={(value) => setLocation({ ...location, City: value })}
              placeholderTextColor="#999"
            />
          </View>

          <View style={[styles.formGroup, styles.halfWidth]}>
            <Text style={styles.label}>
              State <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter state"
              value={location.State}
              onChangeText={(value) => setLocation({ ...location, State: value })}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Pincode <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter pincode"
            value={location.Pincode}
            onChangeText={(value) => setLocation({ ...location, Pincode: value })}
            keyboardType="numeric"
            maxLength={6}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Timeline Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📅 Timeline</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            {requirementType === 'Work' ? 'Work Start Date' : 'Delivery / Requirement Timeline'} <Text style={styles.required}>*</Text>
          </Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>{formatDate(timeline)}</Text>
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={timeline}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}
      </View>

      {/* Contact Section (Items only) */}
      {requirementType === 'Item' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📞 Contact</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Helper Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter helper name"
              value={helperName}
              onChangeText={setHelperName}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Helper Contact</Text>
            <TextInput
              style={styles.input}
              placeholder="9876543210"
              value={helperContact}
              onChangeText={setHelperContact}
              keyboardType="phone-pad"
              maxLength={10}
              placeholderTextColor="#999"
            />
          </View>
        </View>
      )}

      {/* Note Section (Items only) */}
      {requirementType === 'Item' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Note</Text>

          <View style={styles.formGroup}>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add project notes here..."
              value={note}
              onChangeText={setNote}
              multiline
              numberOfLines={4}
              placeholderTextColor="#999"
            />
          </View>
        </View>
      )}

      {/* Submit Button */}
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
    marginBottom: 15,
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
  },
  typeToggle: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: App_Primary_color,
  },
  typeButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  typeButtonTextActive: {
    color: '#fff',
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
  itemCard: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fafafa',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: App_Primary_color,
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
  },
  removeItemButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fee',
    justifyContent: 'center',
    alignItems: 'center',
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
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
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
    marginTop: 8,
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
    color: App_Primary_color,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  roleChipRemove: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: App_Primary_color,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleChipRemoveText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  customBrandContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  customBrandInput: {
    flex: 1,
  },
  addBrandButton: {
    backgroundColor: App_Primary_color,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBrandButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
  },
  suggestionsContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderTopWidth: 0,
    borderRadius: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: '#fff',
    maxHeight: 200,
    marginTop: -8,
  },
  suggestionsList: {
    maxHeight: 160,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  closeSuggestions: {
    padding: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  closeSuggestionsText: {
    fontSize: 12,
    color: '#666',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  addCategoryButton: {
    marginTop: 10,
    paddingVertical: 10,
  },
  addCategoryText: {
    color: App_Primary_color,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  addButton: {
    backgroundColor: App_Primary_color,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonDisabled: {
    opacity: 0.6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
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

export default ExcutiveAddRequirementForm;