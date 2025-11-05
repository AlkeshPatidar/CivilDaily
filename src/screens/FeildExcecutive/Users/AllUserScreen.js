import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    Modal,
    Alert,
} from 'react-native';
import { BackIcon } from '../../../assets/SVGs';
import { FONTS_FAMILY } from '../../../assets/Fonts';
import { App_Primary_color } from '../../../common/Colors/colors';
import { apiGet, apiDelete, apiPut } from '../../../utils/Apis';
import { ToastMsg } from '../../../utils/helperFunctions';
import moment from 'moment';

const AllUsersScreen = ({ navigation }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(10);

    // Action Menu States
    const [actionMenuVisible, setActionMenuVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    // Edit Modal States
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState({
        fullName: '',
        email: '',
        number: '',
        password: '',
    });

    // Delete Modal States
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            setIsLoading(true);
            const response = await apiGet('/api/executive/GetAllExecutiveUser');
            setAllUsers(response?.data || []);
        } catch (error) {
            console.error('Error fetching users:', error);
            ToastMsg('Failed to load users');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteUser = async () => {
        try {
            await apiDelete(`/api/executive/DeleteExecutiveUser/${userToDelete._id}`);
            ToastMsg('User deleted successfully');
            setIsDeleteModalOpen(false);
            getAllUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            ToastMsg('Failed to delete user');
        }
    };

    const handleUpdateUser = async () => {
        try {
            const payload = {
                FullName: editData.fullName,
                Email: editData.email,
                Number: editData.number,
                Password: editData.password,
            };

            await apiPut(`/api/executive/UpdateExecutiveUser/${selectedUser._id}`, payload);
            ToastMsg('User updated successfully');
            setIsEditModalOpen(false);
            getAllUsers();
        } catch (error) {
            console.error('Error updating user:', error);
            ToastMsg(error?.response?.data?.message || 'Failed to update user');
        }
    };

    const handleThreeDotsPress = (event, user) => {
        // Get the position of the button
        event.target.measure((fx, fy, width, height, px, py) => {
            setMenuPosition({
                x: px - 100, // Adjust position to show menu near the button
                y: py + height,
            });
            setSelectedUser(user);
            setActionMenuVisible(true);
        });
    };

    const openEditModal = () => {
        setEditData({
            fullName: selectedUser.FullName || '',
            email: selectedUser.Email || '',
            number: selectedUser.Number || '',
            password: '',
        });
        setActionMenuVisible(false);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = () => {
        setUserToDelete(selectedUser);
        setActionMenuVisible(false);
        setIsDeleteModalOpen(true);
    };

    const filteredUsers = allUsers.filter((user) => {
        const query = searchQuery.toLowerCase();
        return (
            user.FullName?.toLowerCase().includes(query) ||
            user.Email?.toLowerCase().includes(query) ||
            user.Number?.toString().includes(query)
        );
    });

    const paginatedUsers = filteredUsers.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <BackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>All Users</Text>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by name, email, or number..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor="#999"
                    />
                </View>
            </View>

            {/* Table */}
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={App_Primary_color} />
                    <Text style={styles.loadingText}>Loading users...</Text>
                </View>
            ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                    <View style={styles.tableContainer}>
                        {/* Table Header */}
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableHeaderCell, styles.idColumn]}>ID</Text>
                            <Text style={[styles.tableHeaderCell, styles.nameColumn]}>Full Name</Text>
                            <Text style={[styles.tableHeaderCell, styles.emailColumn]}>Email</Text>
                            <Text style={[styles.tableHeaderCell, styles.numberColumn]}>Number</Text>
                            <Text style={[styles.tableHeaderCell, styles.numberColumn]}>All Projects</Text>
                            <Text style={[styles.tableHeaderCell, styles.dateColumn]}>Joined At</Text>
                            <Text style={[styles.tableHeaderCell, styles.actionsColumn]}>Actions</Text>
                        </View>

                        {/* Table Body */}
                        <ScrollView style={styles.tableBody} showsVerticalScrollIndicator={true}>
                            {paginatedUsers.length === 0 ? (
                                <View style={styles.emptyContainer}>
                                    <Text style={styles.emptyText}>No users found</Text>
                                </View>
                            ) : (
                                paginatedUsers.map((user, index) => (
                                    <View key={user._id} style={styles.tableRow}>
                                        <Text style={[styles.tableCell, styles.idColumn]}>
                                            {page * rowsPerPage + index + 1}
                                        </Text>
                                        <Text style={[styles.tableCell, styles.nameColumn]}>
                                            {user.FullName}
                                        </Text>
                                        <Text style={[styles.tableCell, styles.emailColumn]}>
                                            {user.Email}
                                        </Text>
                                        <Text style={[styles.tableCell, styles.numberColumn]}>
                                            {user.Number}
                                        </Text>
                                        {/* <View style={{
                                            borderWidth:1,
                                            borderColor:App_Primary_color,
                                            alignItem:'center',
                                            justifyContent:'center',
                                            width:80
                                        }}> */}
                                        <TouchableOpacity
                                        onPress={()=>navigation.navigate('UsersAllProject', {UserId:user?._id})}
                                        >
                                            <Text style={[styles.tableCell, styles.numberColumn, { color: App_Primary_color, }]}>
                                                {'View'}
                                            </Text>
                                        </TouchableOpacity>

                                        {/* </View> */}
                                        <Text style={[styles.tableCell, styles.dateColumn]}>
                                            {moment(user.createdAt).format('DD/MM/YYYY')}
                                        </Text>
                                        <View style={[styles.tableCell, styles.actionsColumn]}>
                                            <TouchableOpacity
                                                style={styles.threeDotsButton}
                                                onPress={(e) => handleThreeDotsPress(e, user)}
                                            >
                                                <Text style={styles.threeDotsText}>⋮</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))
                            )}
                        </ScrollView>

                        {/* Pagination */}
                        <View style={styles.pagination}>
                            <Text style={styles.paginationText}>
                                Showing {page * rowsPerPage + 1} to{' '}
                                {Math.min((page + 1) * rowsPerPage, filteredUsers.length)} of{' '}
                                {filteredUsers.length} users
                            </Text>
                            <View style={styles.paginationButtons}>
                                <TouchableOpacity
                                    style={[styles.pageButton, page === 0 && styles.pageButtonDisabled]}
                                    onPress={() => setPage(page - 1)}
                                    disabled={page === 0}
                                >
                                    <Text style={styles.pageButtonText}>Previous</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.pageButton,
                                        (page + 1) * rowsPerPage >= filteredUsers.length &&
                                        styles.pageButtonDisabled,
                                    ]}
                                    onPress={() => setPage(page + 1)}
                                    disabled={(page + 1) * rowsPerPage >= filteredUsers.length}
                                >
                                    <Text style={styles.pageButtonText}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )}

            {/* Action Menu Modal */}
            <Modal
                visible={actionMenuVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setActionMenuVisible(false)}
            >
                <TouchableOpacity
                    style={styles.actionMenuOverlay}
                    activeOpacity={1}
                    onPress={() => setActionMenuVisible(false)}
                >
                    <View
                        style={[
                            styles.actionMenuContent,
                            { top: menuPosition.y, left: menuPosition.x },
                        ]}
                    >
                        <TouchableOpacity style={styles.actionMenuItem} onPress={openEditModal}>
                            <Text style={styles.actionMenuIcon}>✏️</Text>
                            <Text style={styles.actionMenuText}>Edit</Text>
                        </TouchableOpacity>
                        <View style={styles.actionMenuDivider} />
                        <TouchableOpacity style={styles.actionMenuItem} onPress={openDeleteModal}>
                            <Text style={styles.actionMenuIcon}>🗑️</Text>
                            <Text style={styles.actionMenuText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Edit Modal */}
            <Modal
                visible={isEditModalOpen}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsEditModalOpen(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={styles.modalTitle}>Update User</Text>

                            <View style={styles.modalFormGroup}>
                                <Text style={styles.modalLabel}>Full Name</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    value={editData.fullName}
                                    onChangeText={(value) =>
                                        setEditData({ ...editData, fullName: value })
                                    }
                                    placeholder="Enter full name"
                                    placeholderTextColor="#999"
                                />
                            </View>

                            <View style={styles.modalFormGroup}>
                                <Text style={styles.modalLabel}>Email</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    value={editData.email}
                                    onChangeText={(value) =>
                                        setEditData({ ...editData, email: value })
                                    }
                                    placeholder="Enter email"
                                    placeholderTextColor="#999"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={styles.modalFormGroup}>
                                <Text style={styles.modalLabel}>Phone Number</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    value={editData.number}
                                    onChangeText={(value) =>
                                        setEditData({ ...editData, number: value })
                                    }
                                    placeholder="Enter phone number"
                                    placeholderTextColor="#999"
                                    keyboardType="phone-pad"
                                />
                            </View>

                            <View style={styles.modalFormGroup}>
                                <Text style={styles.modalLabel}>Password (Optional)</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    value={editData.password}
                                    onChangeText={(value) =>
                                        setEditData({ ...editData, password: value })
                                    }
                                    placeholder="Enter new password"
                                    placeholderTextColor="#999"
                                    secureTextEntry={false}
                                />
                            </View>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={styles.modalCancelButton}
                                    onPress={() => setIsEditModalOpen(false)}
                                >
                                    <Text style={styles.modalCancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalUpdateButton}
                                    onPress={handleUpdateUser}
                                >
                                    <Text style={styles.modalUpdateButtonText}>Update</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                visible={isDeleteModalOpen}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsDeleteModalOpen(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.deleteModalContent}>
                        <Text style={styles.deleteModalTitle}>Confirm Delete</Text>
                        <Text style={styles.deleteModalText}>
                            Are you sure you want to delete this user?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.modalCancelButton}
                                onPress={() => setIsDeleteModalOpen(false)}
                            >
                                <Text style={styles.modalCancelButtonText}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalDeleteButton}
                                onPress={handleDeleteUser}
                            >
                                <Text style={styles.modalDeleteButtonText}>Yes, Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#fff',
        padding: 16,
        paddingTop: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    backButton: {
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: FONTS_FAMILY.Poppins_Bold,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    searchIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#333',
        fontFamily: FONTS_FAMILY.Poppins_Regular,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: '#666',
        fontFamily: FONTS_FAMILY.Poppins_Regular,
    },
    tableContainer: {
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: App_Primary_color,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    tableHeaderCell: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fff',
        fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    },
    tableBody: {
        maxHeight: 500,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    tableCell: {
        fontSize: 12,
        color: '#333',
        fontFamily: FONTS_FAMILY.Poppins_Regular,
    },
    idColumn: {
        width: 50,
    },
    nameColumn: {
        width: 130,
    },
    emailColumn: {
        width: 180,
    },
    numberColumn: {
        width: 110,
    },
    dateColumn: {
        width: 90,
    },
    actionsColumn: {
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    threeDotsButton: {
        padding: 8,
    },
    threeDotsText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#666',
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 14,
        color: '#999',
        fontFamily: FONTS_FAMILY.Poppins_Regular,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    paginationText: {
        fontSize: 11,
        color: '#666',
        fontFamily: FONTS_FAMILY.Poppins_Regular,
    },
    paginationButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    pageButton: {
        backgroundColor: App_Primary_color,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    pageButtonDisabled: {
        backgroundColor: '#ccc',
    },
    pageButtonText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '500',
        fontFamily: FONTS_FAMILY.Poppins_Medium,
    },
    actionMenuOverlay: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    actionMenuContent: {
        position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 4,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        minWidth: 130,
    },
    actionMenuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    actionMenuIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    actionMenuText: {
        fontSize: 14,
        color: '#333',
        fontFamily: FONTS_FAMILY.Poppins_Medium,
    },
    actionMenuDivider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 2,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        width: '90%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        fontFamily: FONTS_FAMILY.Poppins_Bold,
    },
    modalFormGroup: {
        marginBottom: 14,
    },
    modalLabel: {
        fontSize: 12,
        color: '#555',
        marginBottom: 6,
        fontWeight: '500',
        fontFamily: FONTS_FAMILY.Poppins_Medium,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        fontSize: 13,
        backgroundColor: '#fff',
        color: '#333',
        fontFamily: FONTS_FAMILY.Poppins_Regular,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginTop: 16,
    },
    modalCancelButton: {
        flex: 1,
        backgroundColor: '#e0e0e0',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalCancelButtonText: {
        color: '#333',
        fontSize: 14,
        fontWeight: '600',
        fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    },
    modalUpdateButton: {
        flex: 1,
        backgroundColor: '#4285f4',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalUpdateButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    },
    deleteModalContent: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        width: '85%',
    },
    deleteModalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
        fontFamily: FONTS_FAMILY.Poppins_Bold,
    },
    deleteModalText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
        fontFamily: FONTS_FAMILY.Poppins_Regular,
    },
    modalDeleteButton: {
        flex: 1,
        backgroundColor: '#f44336',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalDeleteButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    },
});

export default AllUsersScreen;