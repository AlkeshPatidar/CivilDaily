


// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     Modal,
//     StyleSheet,
//     ScrollView,
//     Alert,
//     ActivityIndicator,
// } from 'react-native';
// import { FONTS_FAMILY } from '../../assets/Fonts';
// import { App_Primary_color, dark33, darkMode25, white } from '../../common/Colors/colors';
// import { apiGet, apiPost } from '../../utils/Apis';
// import { ToastMsg } from '../../utils/helperFunctions';

// const AddProjectModal = ({ visible, onClose, onSubmit, isDarkMode, fetchAllProjects }) => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [stateCity, setStateCity] = useState([]);
//     const [availableCities, setAvailableCities] = useState([]);
//     const [projectData, setProjectData] = useState({
//         Name: '',
//         Location: {
//             City: '',
//             State: '',
//             Pincode: ''
//         }
//     });
//     const [showStateDropdown, setShowStateDropdown] = useState(false);
//     const [showCityDropdown, setShowCityDropdown] = useState(false);

//     // Fetch State/City data on component mount
//     const getAllStateCity = async () => {
//         try {
//             const response = await apiGet('/api/admin/GetAllStateCity');
//             setStateCity(response.data || []);
//         } catch (error) {
//             console.error('Error fetching state/city data:', error);
//         }
//     };

//     useEffect(() => {
//         if (visible) {
//             getAllStateCity();
//         }
//     }, [visible]);

//     // Fetch State/City from Pincode
//     const fetchStateCityFromPincode = async (pincode) => {
//         try {
//             if (!pincode || pincode.length !== 6) return;

//             const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
//             const data = await response.json();

//             if (data[0]?.Status === "Success" && data[0]?.PostOffice?.length > 0) {
//                 const postOffice = data[0].PostOffice[0];

//                 setProjectData((prev) => ({
//                     ...prev,
//                     Location: {
//                         ...prev.Location,
//                         State: postOffice.State,
//                         City: postOffice.District,
//                         Pincode: pincode,
//                     },
//                 }));

//                 // Set available cities based on state
//                 const selectedState = stateCity.find((item) => item.State === postOffice.State);
//                 setAvailableCities(selectedState?.Cities || []);
//             } else {
//                 ToastMsg("Invalid Pincode or no data found");
//             }
//         } catch (error) {
//             console.error("Error fetching state/city from pincode:", error);
//             ToastMsg("Failed to fetch location from Pincode");
//         }
//     };

//     const handleStateSelect = (state) => {
//         const selectedState = stateCity.find((item) => item.State === state);
//         setAvailableCities(selectedState?.Cities || []);
//         setProjectData((prev) => ({
//             ...prev,
//             Location: {
//                 ...prev.Location,
//                 State: state,
//                 City: "",
//             },
//         }));
//         setShowStateDropdown(false);
//     };

//     const handleCitySelect = (city) => {
//         setProjectData((prev) => ({
//             ...prev,
//             Location: {
//                 ...prev.Location,
//                 City: city,
//             },
//         }));
//         setShowCityDropdown(false);
//     };

//     const handleAddProject = async () => {
//         try {
//             if (!projectData.Name) {
//                 ToastMsg( 'Project name is required');
//                 return;
//             }
//             if (!projectData.Location.Pincode) {
//                 ToastMsg( 'Pincode is required');
//                 return;
//             }
//             if (!projectData.Location.City) {
//                 ToastMsg( 'City is required');
//                 return;
//             }
//             if (!projectData.Location.State) {
//                 ToastMsg( 'State is required');
//                 return;
//             }

//             setIsLoading(true);

//             const response = await apiPost(`/api/user/CreateProject`, projectData);
//             ToastMsg(response?.message || 'Project added successfully');

//             setIsLoading(false);
//             handleClose();
            
//             // Refresh project list
//             if (fetchAllProjects) {
//                 fetchAllProjects();
//             }
            
//             if (onSubmit) {
//                 onSubmit(projectData);
//             }
//         } catch (error) {
//             setIsLoading(false);
//             ToastMsg(error?.response?.data?.message || 'Something went wrong');
//             console.error(error);
//         }
//     };

//     const handleClose = () => {
//         setProjectData({
//             Name: '',
//             Location: {
//                 City: '',
//                 State: '',
//                 Pincode: ''
//             }
//         });
//         setAvailableCities([]);
//         setShowStateDropdown(false);
//         setShowCityDropdown(false);
//         onClose();
//     };

//     const styles = StyleSheet.create({
//         modalOverlay: {
//             flex: 1,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             justifyContent: 'center',
//             alignItems: 'center',
//         },
//         modalContainer: {
//             backgroundColor: isDarkMode ? dark33 : white,
//             borderRadius: 16,
//             padding: 24,
//             width: 320,
//             maxHeight: 450,
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 4 },
//             shadowOpacity: 0.3,
//             shadowRadius: 8,
//             elevation: 10,
//             // height:400
//         },
//         scrollContent: {
//             flexGrow: 1,
//         },
//         modalTitle: {
//             fontSize: 18,
//             fontFamily: FONTS_FAMILY.Poppins_Bold,
//             color: isDarkMode ? white : dark33,
//             // marginBottom: 20,
//         },
//         inputLabel: {
//             fontSize: 14,
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             color: isDarkMode ? white : dark33,
//             marginBottom: 8,
//             marginTop: 12,
//         },
//         textInput: {
//             borderWidth: 1,
//             borderColor: isDarkMode ? '#444' : '#E0E0E0',
//             borderRadius: 8,
//             paddingHorizontal: 16,
//             paddingVertical: 10,
//             fontSize: 14,
//             fontFamily: FONTS_FAMILY.Poppins_Regular,
//             color: isDarkMode ? white : dark33,
//             backgroundColor: isDarkMode ? darkMode25 : white,
//         },
//         dropdownContainer: {
//             position: 'relative',
//             zIndex: 1000,
//         },
//         dropdown: {
//             borderWidth: 1,
//             borderColor: isDarkMode ? '#444' : '#E0E0E0',
//             borderRadius: 8,
//             paddingHorizontal: 16,
//             paddingVertical: 14,
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             backgroundColor: isDarkMode ? darkMode25 : white,
//         },
//         dropdownDisabled: {
//             opacity: 0.5,
//         },
//         dropdownText: {
//             fontSize: 11,
//             fontFamily: FONTS_FAMILY.Poppins_Regular,
//             color: isDarkMode ? white : dark33,
//         },
//         placeholderText: {
//             color: isDarkMode ? '#888' : '#999',
//         },
//         dropdownList: {
//             position: 'absolute',
//             top: '100%',
//             left: 0,
//             right: 0,
//             backgroundColor: isDarkMode ? dark33 : white,
//             borderRadius: 8,
//             marginTop: 4,
//             maxHeight: 100,
//             borderWidth: 1,
//             borderColor: isDarkMode ? '#444' : '#E0E0E0',
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.2,
//             shadowRadius: 4,
//             elevation: 5,
//             zIndex: 1001,
//         },
//         dropdownItem: {
//             paddingHorizontal: 16,
//             paddingVertical: 8,
//             borderBottomWidth: 1,
//             borderBottomColor: isDarkMode ? '#444' : '#F0F0F0',
//         },
//         dropdownItemText: {
//             fontSize: 13,
//             fontFamily: FONTS_FAMILY.Poppins_Regular,
//             color: isDarkMode ? white : dark33,
//         },
//         rowContainer: {
//             flexDirection: 'row',
//             gap: 12,
//         },
//         halfWidth: {
//             flex: 1,
//         },
//         buttonContainer: {
//             flexDirection: 'row',
//             justifyContent: 'flex-end',
//             gap: 12,
//             marginTop: 24,
//         },
//         button: {
//             paddingVertical: 10,
//             paddingHorizontal: 24,
//             borderRadius: 8,
//             minWidth: 100,
//             alignItems: 'center',
//         },
//         cancelButton: {
//             backgroundColor: isDarkMode ? '#444' : '#E0E0E0',
//         },
//         addButton: {
//             backgroundColor: App_Primary_color,
//         },
//         buttonText: {
//             fontSize: 12,
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//         },
//         cancelButtonText: {
//             color: isDarkMode ? white : dark33,
//         },
//         addButtonText: {
//             color: white,
//         },
//         loaderContainer: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             gap: 8,
//         },
//     });

//     return (
//         <Modal
//             visible={visible}
//             transparent={true}
//             animationType="fade"
//             onRequestClose={handleClose}
//         >
//             <TouchableOpacity
//                 style={styles.modalOverlay}
//                 activeOpacity={1}
//                 onPress={handleClose}
//             >
//                 <TouchableOpacity
//                     activeOpacity={1}
//                     onPress={(e) => e.stopPropagation()}
//                 >
//                     <ScrollView 
//                         style={styles.modalContainer}
//                         contentContainerStyle={styles.scrollContent}
//                         showsVerticalScrollIndicator={false}
//                     >
//                         <Text style={styles.modalTitle}>Add New Project</Text>

//                         <Text style={styles.inputLabel}>Project Name</Text>
//                         <TextInput
//                             style={styles.textInput}
//                             placeholder="Enter project name"
//                             placeholderTextColor={isDarkMode ? '#888' : '#999'}
//                             value={projectData.Name}
//                             onChangeText={(text) => setProjectData(prev => ({ ...prev, Name: text }))}
//                             editable={!isLoading}
//                         />

//                         <Text style={styles.inputLabel}>Pincode</Text>
//                         <TextInput
//                             style={styles.textInput}
//                             placeholder="Enter pincode"
//                             placeholderTextColor={isDarkMode ? '#888' : '#999'}
//                             value={projectData.Location.Pincode}
//                             onChangeText={(text) => {
//                                 setProjectData(prev => ({
//                                     ...prev,
//                                     Location: { ...prev.Location, Pincode: text }
//                                 }));
//                                 if (text.length === 6) {
//                                     fetchStateCityFromPincode(text);
//                                 }
//                             }}
//                             keyboardType="numeric"
//                             maxLength={6}
//                             editable={!isLoading}
//                         />

//                         <View style={styles.rowContainer}>
//                             <View style={styles.halfWidth}>
//                                 <Text style={styles.inputLabel}>State</Text>
//                                 <View style={styles.dropdownContainer}>
//                                     <TouchableOpacity
//                                         style={styles.dropdown}
//                                         onPress={() => {
//                                             if (!isLoading) {
//                                                 setShowStateDropdown(!showStateDropdown);
//                                                 setShowCityDropdown(false);
//                                             }
//                                         }}
//                                         disabled={isLoading}
//                                     >
//                                         <Text
//                                             style={[
//                                                 styles.dropdownText,
//                                                 !projectData.Location.State && styles.placeholderText,
//                                             ]}
//                                         >
//                                             {projectData.Location.State || 'Select State'}
//                                         </Text>
//                                         <Text style={styles.dropdownText}>▼</Text>
//                                     </TouchableOpacity>

//                                     {showStateDropdown && (
//                                         <ScrollView style={styles.dropdownList} nestedScrollEnabled>
//                                             {stateCity.map((state, index) => (
//                                                 <TouchableOpacity
//                                                     key={state._id || index}
//                                                     style={styles.dropdownItem}
//                                                     onPress={() => handleStateSelect(state.State)}
//                                                 >
//                                                     <Text style={styles.dropdownItemText}>{state.State}</Text>
//                                                 </TouchableOpacity>
//                                             ))}
//                                         </ScrollView>
//                                     )}
//                                 </View>
//                             </View>

//                             <View style={styles.halfWidth}>
//                                 <Text style={styles.inputLabel}>City</Text>
//                                 <View style={styles.dropdownContainer}>
//                                     <TouchableOpacity
//                                         style={[
//                                             styles.dropdown,
//                                             !availableCities.length && styles.dropdownDisabled
//                                         ]}
//                                         onPress={() => {
//                                             if (!isLoading && availableCities.length > 0) {
//                                                 setShowCityDropdown(!showCityDropdown);
//                                                 setShowStateDropdown(false);
//                                             } else if (!projectData.Location.State) {
//                                                 Alert.alert('Info', 'Please select a state first');
//                                             }
//                                         }}
//                                         disabled={isLoading || !availableCities.length}
//                                     >
//                                         <Text
//                                             style={[
//                                                 styles.dropdownText,
//                                                 !projectData.Location.City && styles.placeholderText,
//                                             ]}
//                                         >
//                                             {projectData.Location.City || 'Select City'}
//                                         </Text>
//                                         <Text style={styles.dropdownText}>▼</Text>
//                                     </TouchableOpacity>

//                                     {showCityDropdown && availableCities.length > 0 && (
//                                         <ScrollView style={styles.dropdownList} nestedScrollEnabled>
//                                             {availableCities.map((city, index) => (
//                                                 <TouchableOpacity
//                                                     key={city._id || index}
//                                                     style={styles.dropdownItem}
//                                                     onPress={() => handleCitySelect(city.Name)}
//                                                 >
//                                                     <Text style={styles.dropdownItemText}>{city.Name}</Text>
//                                                 </TouchableOpacity>
//                                             ))}
//                                         </ScrollView>
//                                     )}
//                                 </View>
//                             </View>
//                         </View>

//                         <View style={styles.buttonContainer}>
//                             <TouchableOpacity
//                                 style={[styles.button, styles.cancelButton]}
//                                 onPress={handleClose}
//                                 disabled={isLoading}
//                             >
//                                 <Text style={[styles.buttonText, styles.cancelButtonText]}>
//                                     Cancel
//                                 </Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                                 style={[styles.button, styles.addButton]}
//                                 onPress={handleAddProject}
//                                 disabled={isLoading}
//                             >
//                                 {isLoading ? (
//                                     <View style={styles.loaderContainer}>
//                                         <ActivityIndicator size="small" color={white} />
//                                         <Text style={[styles.buttonText, styles.addButtonText]}>
//                                             Wait...
//                                         </Text>
//                                     </View>
//                                 ) : (
//                                     <Text style={[styles.buttonText, styles.addButtonText]}>Add</Text>
//                                 )}
//                             </TouchableOpacity>
//                         </View>
//                     </ScrollView>
//                 </TouchableOpacity>
//             </TouchableOpacity>
//         </Modal>
//     );
// };

// export default AddProjectModal;


import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { FONTS_FAMILY } from '../../../assets/Fonts';
import { App_Primary_color, dark33, darkMode25, white } from '../../../common/Colors/colors';
import { apiGet, apiPost, apiPut } from '../../../utils/Apis';
import { ToastMsg } from '../../../utils/helperFunctions';

const ProjectModal = ({ 
    visible, 
    onClose, 
    onSubmit, 
    isDarkMode, 
    fetchAllProjects,
    mode = 'add', // 'add' or 'edit'
    initialData = null // Pass existing project data for edit mode
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [stateCity, setStateCity] = useState([]);
    const [availableCities, setAvailableCities] = useState([]);
    const [projectData, setProjectData] = useState({
        Name: '',
        Location: {
            City: '',
            State: '',
            Pincode: ''
        }
    });
    const [showStateDropdown, setShowStateDropdown] = useState(false);
    const [showCityDropdown, setShowCityDropdown] = useState(false);

    const isEditMode = mode === 'edit';

    // Fetch State/City data on component mount
    const getAllStateCity = async () => {
        try {
            const response = await apiGet('/api/admin/GetAllStateCity');
            setStateCity(response.data || []);
        } catch (error) {
            console.error('Error fetching state/city data:', error);
        }
    };

    useEffect(() => {
        if (visible) {
            getAllStateCity();
            
            // Populate form with existing data in edit mode
            if (isEditMode && initialData) {
                setProjectData({
                    Name: initialData.Name || '',
                    Location: {
                        City: initialData.Location?.City || '',
                        State: initialData.Location?.State || '',
                        Pincode: initialData.Location?.Pincode || ''
                    }
                });

                // Set available cities based on the state
                if (initialData.Location?.State) {
                    const selectedState = stateCity.find(
                        (item) => item.State === initialData.Location.State
                    );
                    setAvailableCities(selectedState?.Cities || []);
                }
            }
        }
    }, [visible, isEditMode, initialData]);

    // Update available cities when stateCity data loads and we have initial state
    useEffect(() => {
        if (isEditMode && initialData?.Location?.State && stateCity.length > 0) {
            const selectedState = stateCity.find(
                (item) => item.State === initialData.Location.State
            );
            setAvailableCities(selectedState?.Cities || []);
        }
    }, [stateCity, isEditMode, initialData]);

    // Fetch State/City from Pincode
    const fetchStateCityFromPincode = async (pincode) => {
        try {
            if (!pincode || pincode.length !== 6) return;

            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await response.json();

            if (data[0]?.Status === "Success" && data[0]?.PostOffice?.length > 0) {
                const postOffice = data[0].PostOffice[0];

                setProjectData((prev) => ({
                    ...prev,
                    Location: {
                        ...prev.Location,
                        State: postOffice.State,
                        City: postOffice.District,
                        Pincode: pincode,
                    },
                }));

                // Set available cities based on state
                const selectedState = stateCity.find((item) => item.State === postOffice.State);
                setAvailableCities(selectedState?.Cities || []);
            } else {
                ToastMsg("Invalid Pincode or no data found");
            }
        } catch (error) {
            console.error("Error fetching state/city from pincode:", error);
            ToastMsg("Failed to fetch location from Pincode");
        }
    };

    const handleStateSelect = (state) => {
        const selectedState = stateCity.find((item) => item.State === state);
        setAvailableCities(selectedState?.Cities || []);
        setProjectData((prev) => ({
            ...prev,
            Location: {
                ...prev.Location,
                State: state,
                City: "",
            },
        }));
        setShowStateDropdown(false);
    };

    const handleCitySelect = (city) => {
        setProjectData((prev) => ({
            ...prev,
            Location: {
                ...prev.Location,
                City: city,
            },
        }));
        setShowCityDropdown(false);
    };

    const handleSubmit = async () => {
        try {
            // Validation
            if (!projectData.Name) {
                ToastMsg('Project name is required');
                return;
            }
            if (!projectData.Location.Pincode) {
                ToastMsg('Pincode is required');
                return;
            }
            if (!projectData.Location.City) {
                ToastMsg('City is required');
                return;
            }
            if (!projectData.Location.State) {
                ToastMsg('State is required');
                return;
            }

            setIsLoading(true);

            let response;
            if (isEditMode) {
                // Edit existing project
                response = await apiPut(`/api/user/UpdateProject/${initialData._id}`, projectData);
                ToastMsg(response?.message || 'Project updated successfully');
            } else {
                // Create new project
                response = await apiPost(`/api/user/CreateProject`, projectData);
                ToastMsg(response?.message || 'Project added successfully');
            }

            setIsLoading(false);
            handleClose();
            
            // Refresh project list
            if (fetchAllProjects) {
                fetchAllProjects(prev => prev + 1);
            }
            
            if (onSubmit) {
                onSubmit(projectData);
            }
        } catch (error) {
            setIsLoading(false);
            ToastMsg(error?.response?.data?.message || 'Something went wrong');
            console.error(error);
        }
    };

    const handleClose = () => {
        setProjectData({
            Name: '',
            Location: {
                City: '',
                State: '',
                Pincode: ''
            }
        });
        setAvailableCities([]);
        setShowStateDropdown(false);
        setShowCityDropdown(false);
        onClose();
    };

    const styles = StyleSheet.create({
        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContainer: {
            backgroundColor: isDarkMode ? dark33 : white,
            borderRadius: 16,
            padding: 24,
            width: 320,
            maxHeight: 450,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 10,
        },
        scrollContent: {
            flexGrow: 1,
        },
        modalTitle: {
            fontSize: 18,
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            color: isDarkMode ? white : dark33,
        },
        inputLabel: {
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? white : dark33,
            marginBottom: 8,
            marginTop: 12,
        },
        textInput: {
            borderWidth: 1,
            borderColor: isDarkMode ? '#444' : '#E0E0E0',
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 10,
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: isDarkMode ? white : dark33,
            backgroundColor: isDarkMode ? darkMode25 : white,
        },
        dropdownContainer: {
            position: 'relative',
            zIndex: 1000,
        },
        dropdown: {
            borderWidth: 1,
            borderColor: isDarkMode ? '#444' : '#E0E0E0',
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 14,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: isDarkMode ? darkMode25 : white,
        },
        dropdownDisabled: {
            opacity: 0.5,
        },
        dropdownText: {
            fontSize: 11,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: isDarkMode ? white : dark33,
        },
        placeholderText: {
            color: isDarkMode ? '#888' : '#999',
        },
        dropdownList: {
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: isDarkMode ? dark33 : white,
            borderRadius: 8,
            marginTop: 4,
            maxHeight: 100,
            borderWidth: 1,
            borderColor: isDarkMode ? '#444' : '#E0E0E0',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
            zIndex: 1001,
        },
        dropdownItem: {
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? '#444' : '#F0F0F0',
        },
        dropdownItemText: {
            fontSize: 13,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: isDarkMode ? white : dark33,
        },
        rowContainer: {
            flexDirection: 'row',
            gap: 12,
        },
        halfWidth: {
            flex: 1,
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: 12,
            marginTop: 24,
        },
        button: {
            paddingVertical: 10,
            paddingHorizontal: 24,
            borderRadius: 8,
            minWidth: 100,
            alignItems: 'center',
        },
        cancelButton: {
            backgroundColor: isDarkMode ? '#444' : '#E0E0E0',
        },
        submitButton: {
            backgroundColor: App_Primary_color,
        },
        buttonText: {
            fontSize: 12,
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
        },
        cancelButtonText: {
            color: isDarkMode ? white : dark33,
        },
        submitButtonText: {
            color: white,
        },
        loaderContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        },
    });

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={handleClose}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={handleClose}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={(e) => e.stopPropagation()}
                >
                    <ScrollView 
                        style={styles.modalContainer}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={styles.modalTitle}>
                            {isEditMode ? 'Edit Project' : 'Add New Project'}
                        </Text>

                        <Text style={styles.inputLabel}>Project Name</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter project name"
                            placeholderTextColor={isDarkMode ? '#888' : '#999'}
                            value={projectData.Name}
                            onChangeText={(text) => setProjectData(prev => ({ ...prev, Name: text }))}
                            editable={!isLoading}
                        />

                        <Text style={styles.inputLabel}>Pincode</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter pincode"
                            placeholderTextColor={isDarkMode ? '#888' : '#999'}
                            value={projectData.Location.Pincode}
                            onChangeText={(text) => {
                                setProjectData(prev => ({
                                    ...prev,
                                    Location: { ...prev.Location, Pincode: text }
                                }));
                                if (text.length === 6) {
                                    fetchStateCityFromPincode(text);
                                }
                            }}
                            keyboardType="numeric"
                            maxLength={6}
                            editable={!isLoading}
                        />

                        <View style={styles.rowContainer}>
                            <View style={styles.halfWidth}>
                                <Text style={styles.inputLabel}>State</Text>
                                <View style={styles.dropdownContainer}>
                                    <TouchableOpacity
                                        style={styles.dropdown}
                                        onPress={() => {
                                            if (!isLoading) {
                                                setShowStateDropdown(!showStateDropdown);
                                                setShowCityDropdown(false);
                                            }
                                        }}
                                        disabled={isLoading}
                                    >
                                        <Text
                                            style={[
                                                styles.dropdownText,
                                                !projectData.Location.State && styles.placeholderText,
                                            ]}
                                        >
                                            {projectData.Location.State || 'Select State'}
                                        </Text>
                                        <Text style={styles.dropdownText}>▼</Text>
                                    </TouchableOpacity>

                                    {showStateDropdown && (
                                        <ScrollView style={styles.dropdownList} nestedScrollEnabled>
                                            {stateCity.map((state, index) => (
                                                <TouchableOpacity
                                                    key={state._id || index}
                                                    style={styles.dropdownItem}
                                                    onPress={() => handleStateSelect(state.State)}
                                                >
                                                    <Text style={styles.dropdownItemText}>{state.State}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    )}
                                </View>
                            </View>

                            <View style={styles.halfWidth}>
                                <Text style={styles.inputLabel}>City</Text>
                                <View style={styles.dropdownContainer}>
                                    <TouchableOpacity
                                        style={[
                                            styles.dropdown,
                                            !availableCities.length && styles.dropdownDisabled
                                        ]}
                                        onPress={() => {
                                            if (!isLoading && availableCities.length > 0) {
                                                setShowCityDropdown(!showCityDropdown);
                                                setShowStateDropdown(false);
                                            } else if (!projectData.Location.State) {
                                                Alert.alert('Info', 'Please select a state first');
                                            }
                                        }}
                                        disabled={isLoading || !availableCities.length}
                                    >
                                        <Text
                                            style={[
                                                styles.dropdownText,
                                                !projectData.Location.City && styles.placeholderText,
                                            ]}
                                        >
                                            {projectData.Location.City || 'Select City'}
                                        </Text>
                                        <Text style={styles.dropdownText}>▼</Text>
                                    </TouchableOpacity>

                                    {showCityDropdown && availableCities.length > 0 && (
                                        <ScrollView style={styles.dropdownList} nestedScrollEnabled>
                                            {availableCities.map((city, index) => (
                                                <TouchableOpacity
                                                    key={city._id || index}
                                                    style={styles.dropdownItem}
                                                    onPress={() => handleCitySelect(city.Name)}
                                                >
                                                    <Text style={styles.dropdownItemText}>{city.Name}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    )}
                                </View>
                            </View>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={handleClose}
                                disabled={isLoading}
                            >
                                <Text style={[styles.buttonText, styles.cancelButtonText]}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.submitButton]}
                                onPress={handleSubmit}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <View style={styles.loaderContainer}>
                                        <ActivityIndicator size="small" color={white} />
                                        <Text style={[styles.buttonText, styles.submitButtonText]}>
                                            Wait...
                                        </Text>
                                    </View>
                                ) : (
                                    <Text style={[styles.buttonText, styles.submitButtonText]}>
                                        {isEditMode ? 'Update' : 'Add'}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

export default ProjectModal;