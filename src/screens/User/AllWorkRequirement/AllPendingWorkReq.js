// import React, { useEffect, useState, useRef } from 'react';
// import {
//     View,
//     Text,
//     ScrollView,
//     StyleSheet,
//     StatusBar,
//     SafeAreaView,
//     RefreshControl,
//     Animated,
//     TouchableOpacity,
//     ActivityIndicator,
// } from 'react-native';
// import { App_Primary_color, dark33, darkMode25, white } from '../../common/Colors/colors';
// import { FONTS_FAMILY } from '../../assets/Fonts';
// import { apiGet } from '../../utils/Apis';
// import { BackIcon } from '../../assets/SVGs';
// import { useSelector } from 'react-redux';

// export default function AllPendingWorkRequirement({ navigation }) {
//     const { isDarkMode } = useSelector(state => state.theme);
//     const [allMyWorkRequirements, setAllMyWorkRequirements] = useState([]);
//     const [isUploading, setIsUploading] = useState(true);
//     const [refreshing, setRefreshing] = useState(false);

//     const headerAnim = useRef(new Animated.Value(-100)).current;

//     const getPendingWorkRequirements = async () => {
//         try {
//             setIsUploading(true);
//             const response = await apiGet('/api/user/GetUserAllWorkRequirement?Status=Pending');
//             setAllMyWorkRequirements(response.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         } finally {
//             setIsUploading(false);
//         }
//     };

//     useEffect(() => {
//         getPendingWorkRequirements();
//         animateHeader();
//     }, []);

//     const animateHeader = () => {
//         Animated.spring(headerAnim, {
//             toValue: 0,
//             friction: 8,
//             tension: 40,
//             useNativeDriver: true,
//         }).start();
//     };

//     const onRefresh = async () => {
//         setRefreshing(true);
//         await getAllMyWorkRequirements();
//         setRefreshing(false);
//     };

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-IN', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//         });
//     };

//     const styles = StyleSheet.create({
//         container: {
//             flex: 1,
//             backgroundColor: isDarkMode ? darkMode25 : '#f5f5f5',
//         },
//         headerContainer: {
//             backgroundColor: white,
//             paddingHorizontal: 16,
//             paddingTop: 12,
//             paddingBottom: 12,
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.1,
//             shadowRadius: 4,
//             elevation: 3,
//         },
//         topBar: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             gap: 10,
//         },
//         headerTitle: {
//             fontFamily: FONTS_FAMILY.Poppins_Bold,
//             fontSize: 18,
//             color: App_Primary_color,
//             flex: 1,
//         },
//         contentContainer: {
//             padding: 16,
//         },
//         loaderContainer: {
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: 'rgba(255, 255, 255, 0.8)',
//         },
//         emptyContainer: {
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             paddingVertical: 60,
//         },
//         emptyText: {
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             fontSize: 14,
//             color: '#999',
//         },
//         workCard: {
//             backgroundColor: '#F9FAFB',
//             borderRadius: 12,
//             padding: 16,
//             marginBottom: 16,
//             borderWidth: 1,
//             borderColor: '#D1D5DB',
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 1 },
//             shadowOpacity: 0.05,
//             shadowRadius: 4,
//             elevation: 2,
//         },
//         workHeader: {
//             marginBottom: 16,
//         },
//         workNumber: {
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//             fontSize: 16,
//             color: '#1D4ED8',
//             marginBottom: 4,
//         },
//         statusText: {
//             fontFamily: FONTS_FAMILY.Poppins_Regular,
//             fontSize: 13,
//             color: '#666',
//             marginBottom: 2,
//         },
//         statusValue: {
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//         },
//         locationGrid: {
//             marginBottom: 16,
//         },
//         locationRow: {
//             flexDirection: 'row',
//             flexWrap: 'wrap',
//             marginBottom: 8,
//         },
//         locationItem: {
//             width: '50%',
//             marginBottom: 8,
//         },
//         locationLabel: {
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//             fontSize: 12,
//             color: '#333',
//         },
//         locationValue: {
//             fontFamily: FONTS_FAMILY.Poppins_Regular,
//             fontSize: 12,
//             color: '#666',
//         },
//         categoriesSection: {
//             marginBottom: 16,
//         },
//         categoryCard: {
//             backgroundColor: white,
//             borderRadius: 8,
//             padding: 12,
//             marginBottom: 12,
//             borderWidth: 1,
//             borderColor: '#E5E7EB',
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 1 },
//             shadowOpacity: 0.05,
//             shadowRadius: 2,
//             elevation: 1,
//         },
//         categoryName: {
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             fontSize: 13,
//             color: '#333',
//             marginBottom: 8,
//         },
//         categoryLabel: {
//             color: '#2563EB',
//         },
//         subRolesContainer: {
//             marginBottom: 8,
//         },
//         subRolesLabel: {
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             fontSize: 12,
//             color: '#333',
//             marginBottom: 6,
//         },
//         subRolesRow: {
//             flexDirection: 'row',
//             flexWrap: 'wrap',
//             gap: 8,
//         },
//         subRoleBadge: {
//             backgroundColor: '#DBEAFE',
//             paddingHorizontal: 12,
//             paddingVertical: 5,
//             borderRadius: 16,
//         },
//         subRoleText: {
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//             fontSize: 11,
//             color: '#1D4ED8',
//         },
//         peopleText: {
//             fontFamily: FONTS_FAMILY.Poppins_Regular,
//             fontSize: 12,
//             color: '#666',
//         },
//         peopleLabel: {
//             fontFamily: FONTS_FAMILY.Poppins_Medium,
//         },
//         qualitySection: {
//             marginBottom: 16,
//         },
//         qualityText: {
//             fontFamily: FONTS_FAMILY.Poppins_Regular,
//             fontSize: 13,
//             color: '#666',
//             marginBottom: 4,
//         },
//         qualityLabel: {
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//         },
//         amountSection: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             paddingTop: 12,
//             borderTopWidth: 1,
//             borderTopColor: '#E5E7EB',
//         },
//         amountText: {
//             fontFamily: FONTS_FAMILY.Poppins_Regular,
//             fontSize: 13,
//             color: '#666',
//         },
//         amountLabel: {
//             fontFamily: FONTS_FAMILY.Poppins_SemiBold,
//         },
//     });

//     const renderHeader = () => (
//         <Animated.View style={[styles.headerContainer, { transform: [{ translateY: headerAnim }] }]}>
//             <StatusBar barStyle="dark-content" backgroundColor={white} />
//             <View style={styles.topBar}>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <BackIcon />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Pending Work Requirements</Text>
//             </View>
//         </Animated.View>
//     );

//     const renderWorkItem = (work, index) => {
//         const [houseOrFlatNo, locality] = work?.Location?.Address?.split("||") || ["", ""];

//         return (
//             <View key={work?._id} style={styles.workCard}>
//                 {/* Header */}
//                 <View style={styles.workHeader}>
//                     <Text style={styles.workNumber}>Work #{index + 1}</Text>
//                     <Text style={styles.statusText}>
//                         Status: <Text style={styles.statusValue}>{work?.Status}</Text>
//                     </Text>
//                     <Text style={styles.statusText}>
//                         Start Date: {formatDate(work?.WorkStartDate)}
//                     </Text>
//                 </View>

//                 {/* Location Grid */}
//                 <View style={styles.locationGrid}>
//                     <View style={styles.locationRow}>
//                         <View style={styles.locationItem}>
//                             <Text style={styles.locationLabel}>State:</Text>
//                             <Text style={styles.locationValue}>{work?.Location?.State}</Text>
//                         </View>
//                         <View style={styles.locationItem}>
//                             <Text style={styles.locationLabel}>City:</Text>
//                             <Text style={styles.locationValue}>{work?.Location?.City}</Text>
//                         </View>
//                     </View>
//                     <View style={styles.locationRow}>
//                         <View style={styles.locationItem}>
//                             <Text style={styles.locationLabel}>Locality:</Text>
//                             <Text style={styles.locationValue}>{locality}</Text>
//                         </View>
//                         <View style={styles.locationItem}>
//                             <Text style={styles.locationLabel}>House/Flat No.:</Text>
//                             <Text style={styles.locationValue}>{houseOrFlatNo}</Text>
//                         </View>
//                     </View>
//                     <View style={styles.locationRow}>
//                         <View style={styles.locationItem}>
//                             <Text style={styles.locationLabel}>Pincode:</Text>
//                             <Text style={styles.locationValue}>{work?.Location?.Pincode}</Text>
//                         </View>
//                     </View>
//                 </View>

//                 {/* Categories */}
//                 <View style={styles.categoriesSection}>
//                     {work?.Categories?.map((cat) => (
//                         <View key={cat._id} style={styles.categoryCard}>
//                             <Text style={styles.categoryName}>
//                                 <Text style={styles.categoryLabel}>Category:</Text> {cat?.Category}
//                             </Text>

//                             <View style={styles.subRolesContainer}>
//                                 <Text style={styles.subRolesLabel}>Sub Roles:</Text>
//                                 <View style={styles.subRolesRow}>
//                                     {cat?.SubRoles?.map((role, roleIndex) => (
//                                         <View key={roleIndex} style={styles.subRoleBadge}>
//                                             <Text style={styles.subRoleText}>{role}</Text>
//                                         </View>
//                                     ))}
//                                 </View>
//                             </View>

//                             <Text style={styles.peopleText}>
//                                 <Text style={styles.peopleLabel}>People Required:</Text> {cat?.NumberOfPeoplerequire}
//                             </Text>
//                         </View>
//                     ))}
//                 </View>

//                 {/* Quality Info */}
//                 <View style={styles.qualitySection}>
//                     <Text style={styles.qualityText}>
//                         <Text style={styles.qualityLabel}>Quality Level:</Text> {work?.qualityLevel}
//                     </Text>
//                     {work?.subQualityRating > 0 && (
//                         <Text style={styles.qualityText}>
//                             <Text style={styles.qualityLabel}>Sub Quality Rating:</Text> {work?.subQualityRating} / 5
//                         </Text>
//                     )}
//                 </View>

//                 {/* Amount Section */}
//                 <View style={styles.amountSection}>
//                     <Text style={styles.amountText}>
//                         <Text style={styles.amountLabel}>Total Amount:</Text> ₹{work?.TotalAmount}
//                     </Text>
//                     <Text style={styles.amountText}>
//                         <Text style={styles.amountLabel}>Remaining:</Text> ₹{work?.RemainingAmount}
//                     </Text>
//                 </View>
//             </View>
//         );
//     };

//     if (isUploading) {
//         return (
//             <View style={styles.loaderContainer}>
//                 <ActivityIndicator size="large" color={App_Primary_color} />
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.container}>
//             {renderHeader()}
//             <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 refreshControl={
//                     <RefreshControl
//                         refreshing={refreshing}
//                         onRefresh={onRefresh}
//                         colors={[App_Primary_color]}
//                         tintColor={App_Primary_color}
//                     />
//                 }
//             >
//                 <View style={styles.contentContainer}>
//                     {allMyWorkRequirements?.length === 0 ? (
//                         <View style={styles.emptyContainer}>
//                             <Text style={styles.emptyText}>No work requirements found.</Text>
//                         </View>
//                     ) : (
//                         allMyWorkRequirements?.map((work, index) => renderWorkItem(work, index))
//                     )}
//                 </View>
//                 <View style={{ height: 20 }} />
//             </ScrollView>
//         </SafeAreaView>
//     );
// }


import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    RefreshControl,
    Animated,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    Alert,
} from 'react-native';
import { App_Primary_color, dark33, darkMode25, white } from '../../../common/Colors/colors';
import { FONTS_FAMILY } from '../../../assets/Fonts';
import { apiGet, apiDelete } from '../../../utils/Apis';
import { BackIcon } from '../../../assets/SVGs';
import { useSelector } from 'react-redux';
import { ToastMsg } from '../../../utils/helperFunctions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AllPendingWorkRequirement({ navigation }) {
    const { isDarkMode } = useSelector(state => state.theme);
    const [allMyWorkRequirements, setAllMyWorkRequirements] = useState([]);
    const [isUploading, setIsUploading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedWork, setSelectedWork] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
    const [deleting, setDeleting] = useState(false);

    const headerAnim = useRef(new Animated.Value(-100)).current;

    const getPendingWorkRequirements = async () => {
        try {
            setIsUploading(true);
            const response = await apiGet('/api/user/GetUserAllWorkRequirement?Status=Pending');
            setAllMyWorkRequirements(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        getPendingWorkRequirements();
        animateHeader();
    }, []);

    const animateHeader = () => {
        Animated.spring(headerAnim, {
            toValue: 0,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await getPendingWorkRequirements();
        setRefreshing(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleThreeDotsPress = (event, work) => {
        const { pageY } = event.nativeEvent;
        setMenuPosition({ top: pageY, right: 16 });
        setSelectedWork(work);
        setMenuVisible(true);
    };

    const closeMenu = () => {
        setMenuVisible(false);
        setSelectedWork(null);
    };

    const handleUpdate = () => {
        closeMenu();
        // Navigate to edit screen with work data
        navigation.navigate('AddWorkRequirementForm', { 
            workData: selectedWork,
            onUpdate: () => getPendingWorkRequirements() 
        });
    };

    const handleDelete = () => {
        closeMenu();
        Alert.alert(
            'Delete Work Requirement',
            'Are you sure you want to delete this work requirement?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: confirmDelete,
                },
            ]
        );
    };

    const confirmDelete = async () => {
        if (!selectedWork?._id) return;

        try {
            setDeleting(true);
            await apiDelete(`/api/user/DeleteWorkRequirement/${selectedWork._id}`);
            ToastMsg('Work requirement deleted successfully');
            await getPendingWorkRequirements();
        } catch (error) {
            console.error('Delete error:', error);
            ToastMsg(error?.response?.data?.message || 'Failed to delete work requirement');
        } finally {
            setDeleting(false);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? darkMode25 : '#f5f5f5',
        },
        headerContainer: {
            backgroundColor: white,
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        topBar: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
        },
        headerTitle: {
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 18,
            color: App_Primary_color,
            flex: 1,
        },
        contentContainer: {
            padding: 16,
        },
        loaderContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 60,
        },
        emptyText: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 14,
            color: '#999',
        },
        workCard: {
            backgroundColor: '#F9FAFB',
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: '#D1D5DB',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
            position: 'relative',
        },
        threeDotsButton: {
            position: 'absolute',
            top: 12,
            right: 12,
            padding: 8,
            zIndex: 10,
        },
        workHeader: {
            marginBottom: 16,
            paddingRight: 40,
        },
        workNumber: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 16,
            color: '#1D4ED8',
            marginBottom: 4,
        },
        statusText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 13,
            color: '#666',
            marginBottom: 2,
        },
        statusValue: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
        },
        locationGrid: {
            marginBottom: 16,
        },
        locationRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 8,
        },
        locationItem: {
            width: '50%',
            marginBottom: 8,
        },
        locationLabel: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 12,
            color: '#333',
        },
        locationValue: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 12,
            color: '#666',
        },
        categoriesSection: {
            marginBottom: 16,
        },
        categoryCard: {
            backgroundColor: white,
            borderRadius: 8,
            padding: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: '#E5E7EB',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
        },
        categoryName: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 13,
            color: '#333',
            marginBottom: 8,
        },
        categoryLabel: {
            color: '#2563EB',
        },
        subRolesContainer: {
            marginBottom: 8,
        },
        subRolesLabel: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 12,
            color: '#333',
            marginBottom: 6,
        },
        subRolesRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
        },
        subRoleBadge: {
            backgroundColor: '#DBEAFE',
            paddingHorizontal: 12,
            paddingVertical: 5,
            borderRadius: 16,
        },
        subRoleText: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 11,
            color: '#1D4ED8',
        },
        peopleText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 12,
            color: '#666',
        },
        peopleLabel: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
        },
        qualitySection: {
            marginBottom: 16,
        },
        qualityText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 13,
            color: '#666',
            marginBottom: 4,
        },
        qualityLabel: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
        },
        amountSection: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: '#E5E7EB',
        },
        amountText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 13,
            color: '#666',
        },
        amountLabel: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: 'transparent',
        },
        menuContainer: {
            position: 'absolute',
            backgroundColor: white,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 10,
            minWidth: 160,
            overflow: 'hidden',
        },
        menuItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 16,
            gap: 12,
        },
        menuItemBorder: {
            borderBottomWidth: 1,
            borderBottomColor: '#E5E7EB',
        },
        menuItemText: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 14,
            color: '#333',
        },
        deleteText: {
            color: '#DC2626',
        },
    });

    const renderHeader = () => (
        <Animated.View style={[styles.headerContainer, { transform: [{ translateY: headerAnim }] }]}>
            <StatusBar barStyle="dark-content" backgroundColor={white} />
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Pending Work Requirements</Text>
            </View>
        </Animated.View>
    );

    const renderActionMenu = () => (
        <Modal
            visible={menuVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={closeMenu}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={closeMenu}
            >
                <View
                    style={[
                        styles.menuContainer,
                        {
                            top: menuPosition.top,
                            right: menuPosition.right,
                        },
                    ]}
                >
                    <TouchableOpacity
                        style={[styles.menuItem, styles.menuItemBorder]}
                        onPress={handleUpdate}
                    >
                        <Icon name="pencil-outline" size={20} color="#333" />
                        <Text style={styles.menuItemText}>Update</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={handleDelete}
                        disabled={deleting}
                    >
                        {deleting ? (
                            <>
                                <ActivityIndicator size="small" color="#DC2626" />
                                <Text style={[styles.menuItemText, styles.deleteText]}>Deleting...</Text>
                            </>
                        ) : (
                            <>
                                <Icon name="delete-outline" size={20} color="#DC2626" />
                                <Text style={[styles.menuItemText, styles.deleteText]}>Delete</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );

    const renderWorkItem = (work, index) => {
        const [houseOrFlatNo, locality] = work?.Location?.Address?.split("||") || ["", ""];

        return (
            <View key={work?._id} style={styles.workCard}>
                {/* Three Dots Menu */}
                <TouchableOpacity
                    style={styles.threeDotsButton}
                    onPress={(event) => handleThreeDotsPress(event, work)}
                >
                    <Icon name="dots-vertical" size={24} color="#666" />
                </TouchableOpacity>

                {/* Header */}
                <View style={styles.workHeader}>
                    <Text style={styles.workNumber}>Work #{index + 1}</Text>
                    <Text style={styles.statusText}>
                        Status: <Text style={styles.statusValue}>{work?.Status}</Text>
                    </Text>
                    <Text style={styles.statusText}>
                        Start Date: {formatDate(work?.WorkStartDate)}
                    </Text>
                </View>

                {/* Location Grid */}
                <View style={styles.locationGrid}>
                    <View style={styles.locationRow}>
                        <View style={styles.locationItem}>
                            <Text style={styles.locationLabel}>State:</Text>
                            <Text style={styles.locationValue}>{work?.Location?.State}</Text>
                        </View>
                        <View style={styles.locationItem}>
                            <Text style={styles.locationLabel}>City:</Text>
                            <Text style={styles.locationValue}>{work?.Location?.City}</Text>
                        </View>
                    </View>
                    <View style={styles.locationRow}>
                        <View style={styles.locationItem}>
                            <Text style={styles.locationLabel}>Locality:</Text>
                            <Text style={styles.locationValue}>{locality}</Text>
                        </View>
                        <View style={styles.locationItem}>
                            <Text style={styles.locationLabel}>House/Flat No.:</Text>
                            <Text style={styles.locationValue}>{houseOrFlatNo}</Text>
                        </View>
                    </View>
                    <View style={styles.locationRow}>
                        <View style={styles.locationItem}>
                            <Text style={styles.locationLabel}>Pincode:</Text>
                            <Text style={styles.locationValue}>{work?.Location?.Pincode}</Text>
                        </View>
                    </View>
                </View>

                {/* Categories */}
                <View style={styles.categoriesSection}>
                    {work?.Categories?.map((cat) => (
                        <View key={cat._id} style={styles.categoryCard}>
                            <Text style={styles.categoryName}>
                                <Text style={styles.categoryLabel}>Category:</Text> {cat?.Category}
                            </Text>

                            <View style={styles.subRolesContainer}>
                                <Text style={styles.subRolesLabel}>Sub Roles:</Text>
                                <View style={styles.subRolesRow}>
                                    {cat?.SubRoles?.map((role, roleIndex) => (
                                        <View key={roleIndex} style={styles.subRoleBadge}>
                                            <Text style={styles.subRoleText}>{role}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <Text style={styles.peopleText}>
                                <Text style={styles.peopleLabel}>People Required:</Text> {cat?.NumberOfPeoplerequire}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Quality Info */}
                <View style={styles.qualitySection}>
                    <Text style={styles.qualityText}>
                        <Text style={styles.qualityLabel}>Quality Level:</Text> {work?.qualityLevel}
                    </Text>
                    {work?.subQualityRating > 0 && (
                        <Text style={styles.qualityText}>
                            <Text style={styles.qualityLabel}>Sub Quality Rating:</Text> {work?.subQualityRating} / 5
                        </Text>
                    )}
                </View>

                {/* Amount Section */}
                <View style={styles.amountSection}>
                    <Text style={styles.amountText}>
                        <Text style={styles.amountLabel}>Total Amount:</Text> ₹{work?.TotalAmount}
                    </Text>
                    <Text style={styles.amountText}>
                        <Text style={styles.amountLabel}>Remaining:</Text> ₹{work?.RemainingAmount}
                    </Text>
                </View>
            </View>
        );
    };

    if (isUploading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={App_Primary_color} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[App_Primary_color]}
                        tintColor={App_Primary_color}
                    />
                }
            >
                <View style={styles.contentContainer}>
                    {allMyWorkRequirements?.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No work requirements found.</Text>
                        </View>
                    ) : (
                        allMyWorkRequirements?.map((work, index) => renderWorkItem(work, index))
                    )}
                </View>
                <View style={{ height: 20 }} />
            </ScrollView>
            
            {renderActionMenu()}
        </SafeAreaView>
    );
}