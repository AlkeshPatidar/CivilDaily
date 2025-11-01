import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, View, Alert, Modal } from "react-native"
import { apiGet, apiDelete } from "../../utils/Apis";
import { App_Primary_color } from "../../common/Colors/colors";
import { FONTS_FAMILY } from "../../assets/Fonts";
const { width } = Dimensions.get('window');
import { dark33, dark55, darkMode25, white } from '../../common/Colors/colors';
import { Text, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";
import { ToastMsg } from "../../utils/helperFunctions";
import useLoader from "../../utils/LoaderHook";
import AddProjectModal from './AddProjectModel';


const AnimatedCard = ({ children, delay = 0, style, onPress, activeOpacity = 0.9 }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                delay: delay,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                delay: delay,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                delay: delay,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const animatedStyle = {
        opacity: fadeAnim,
        transform: [
            { translateY: slideAnim },
            { scale: scaleAnim }
        ],
    };

    if (onPress) {
        return (
            <TouchableOpacity
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={activeOpacity}
            >
                <Animated.View style={[style, animatedStyle]}>
                    {children}
                </Animated.View>
            </TouchableOpacity>
        );
    }

    return (
        <Animated.View style={[style, animatedStyle]}>
            {children}
        </Animated.View>
    );
};

const AllProjects = ({ navigation, refreshTrigger }) => {
    const { isDarkMode } = useSelector(state => state.theme);

    const { showLoader, hideLoader } = useLoader();
    const [allProjects, setAllProjects] = useState([]);
    const [openMenuId, setOpenMenuId] = useState(null);

    const [showProjectModal, setShowProjectModal] = useState(false);
const [editingProject, setEditingProject] = useState(null);
const [modalMode, setModalMode] = useState('edit'); 

    useEffect(() => {
        fetchAllProject();
    }, [refreshTrigger]);

    const fetchAllProject = async () => {
        showLoader();
        try {
            const res = await apiGet('/api/user/GetMyProjects');
            const items = res?.data || [];
            setAllProjects(items);
            hideLoader();
        } catch (error) {
            console.log('Error fetching projects:', error);
            hideLoader();
        }
    };

    const handleEdit = (project) => {
        console.log('Edit project:', project);
        setOpenMenuId(null);
        setShowProjectModal(true)
        setEditingProject(project)

        // Navigate to edit screen or open edit modal
        // navigation.navigate('EditProject', { projectId: project._id });
    };

    const deleteProject = async (project) => {
        setOpenMenuId(null);
        Alert.alert(
            'Delete Project',
            `Are you sure you want to delete "${project?.Name}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            showLoader();
                            const response = await apiDelete(`/api/user/DeleteProject/${project?._id}`);
                            ToastMsg(response?.message || 'Project deleted successfully!');
                            hideLoader();
                            fetchAllProject();
                        } catch (error) {
                            hideLoader();
                            ToastMsg(error?.response?.data?.message || 'Error deleting project.');
                            console.log(error);
                        }
                    }
                }
            ]
        );
    };

    const styles = StyleSheet.create({
        sectionContainer: {
            paddingHorizontal: 16,
            marginBottom: 16,
        },
        productsGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: 20
        },
        productCard: {
            width: (width - 40) / 2,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: isDarkMode ? dark55 : '#E8E8E8',
            overflow: 'hidden',
            marginBottom: 12,
            backgroundColor: isDarkMode ? dark33 : '#F8F5F5',
        },
        productInfo: {
            padding: 8,
        },
        productName: {
            fontSize: 11,
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            color: isDarkMode ? white : '#000',
            marginBottom: 2,
            lineHeight: 14,
        },
        priceRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10
        },
        priceColumn: {
            flex: 1,
        },
        currentPrice: {
            fontSize: 12,
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            color: isDarkMode ? white : '#000',
        },
        addButton: {
            backgroundColor: 'white',
            paddingHorizontal: 20,
            paddingVertical: 4,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: App_Primary_color,
            width: '100%',
            alignItems: 'center'
        },
        addButtonText: {
            color: App_Primary_color,
            fontSize: 10,
            fontFamily: FONTS_FAMILY.Poppins_Bold,
        },
        cardHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 8,
        },
        menuButton: {
            padding: 4,
            borderRadius: 12,
            backgroundColor: isDarkMode ? dark55 : '#f0f0f0',
            position: 'relative',
        },
        menuModal: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
        menuWrapper: {
            position: 'absolute',
            right: 8,
            top: 32,
            zIndex: 1000,
        },
        menuContent: {
            backgroundColor: white,
            borderRadius: 8,
            width: 140,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 5,
            overflow: 'hidden',
        },
        menuItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 14,
            paddingHorizontal: 16,
            gap: 10,
        },
        menuItemEdit: {
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0',
        },
        menuItemText: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 13,
        },
        menuItemTextEdit: {
            color: '#28A745',
        },
        menuItemTextDelete: {
            color: '#DC3545',
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 60,
        },
        emptyIcon: {
            marginBottom: 16,
        },
        emptyText: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 16,
            color: '#666',
            marginBottom: 8,
        },
        emptySubtext: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 13,
            color: '#999',
            textAlign: 'center',
        },
    });

    const renderMenuModal = (projectId, project) => (
        <Modal
            visible={openMenuId === projectId}
            transparent
            animationType="none"
            onRequestClose={() => setOpenMenuId(null)}
        >
            <TouchableOpacity
                style={styles.menuModal}
                activeOpacity={1}
                onPress={() => setOpenMenuId(null)}
            >
                <View style={styles.menuWrapper}>
                    <View style={styles.menuContent}>
                        <TouchableOpacity
                            style={[styles.menuItem, styles.menuItemEdit]}
                            onPress={() => handleEdit(project)}
                        >
                            <Ionicons name="pencil" size={16} color="#28A745" />
                            <Text style={[styles.menuItemText, styles.menuItemTextEdit]}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => deleteProject(project)}
                        >
                            <Ionicons name="trash-outline" size={16} color="#DC3545" />
                            <Text style={[styles.menuItemText, styles.menuItemTextDelete]}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );

    const renderProductsGrid = () => {
        if (allProjects?.length === 0) {
            return (
                <View style={styles.sectionContainer}>
                    <View style={styles.emptyContainer}>
                        <Ionicons 
                            name="folder-open-outline" 
                            size={64} 
                            color="#CCC" 
                            style={styles.emptyIcon}
                        />
                        <Text style={styles.emptyText}>No Projects Found</Text>
                        <Text style={styles.emptySubtext}>
                            Start by creating your first project
                        </Text>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.sectionContainer}>
                <View style={styles.productsGrid}>
                    {allProjects?.map((item, index) => (
                        <AnimatedCard
                            key={item._id || index}
                            delay={index * 30}
                        >
                            <View style={styles.productCard}>
                                <View style={styles.productInfo}>
                                    <View style={styles.cardHeader}>
                                        <Text style={[styles.productName, { flex: 1 }]} numberOfLines={2}>
                                            {item?.Name}
                                        </Text>
                                        <TouchableOpacity
                                            style={styles.menuButton}
                                            onPress={() => setOpenMenuId(openMenuId === item._id ? null : item._id)}
                                        >
                                            <Ionicons name="ellipsis-vertical" size={16} color={isDarkMode ? white : "#666"} />
                                        </TouchableOpacity>
                                    </View>

                                    {renderMenuModal(item._id, item)}

                                    <View style={styles.priceColumn}>
                                        <Text style={styles.currentPrice}>City- {item?.Location?.City}</Text>
                                        <Text style={styles.currentPrice}>State- {item?.Location?.State}</Text>
                                        <Text style={styles.currentPrice}>Pin Code- {item?.Location?.Pincode}</Text>
                                    </View>

                                    <View style={styles.priceRow}>
                                        <TouchableOpacity
                                            style={styles.addButton}
                                            onPress={() => navigation.navigate('AddWorkRequirementForm', {projectId:item?._id})}
                                        >
                                            <Text style={styles.addButtonText}>+ Add Requirement</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </AnimatedCard>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            {renderProductsGrid()}
            <AddProjectModal
                visible={showProjectModal}
                onClose={() => {
                    setShowProjectModal(false);
                    setEditingProject(null);
                }}
                // onSubmit={handleProjectSubmit}
                isDarkMode={isDarkMode}
                fetchAllProjects={fetchAllProject}
                mode={modalMode} // 'add' or 'edit'
                initialData={editingProject} // Pass project data for edit mode
            />
        </View>
    )
}

export default AllProjects