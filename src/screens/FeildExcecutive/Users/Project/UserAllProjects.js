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
} from 'react-native';
import { BackIcon } from '../../../../assets/SVGs';
import { FONTS_FAMILY } from '../../../../assets/Fonts';
import { App_Primary_color } from '../../../../common/Colors/colors';
import { apiGet, apiDelete, apiPut } from '../../../../utils/Apis';
import { ToastMsg } from '../../../../utils/helperFunctions';
import moment from 'moment';

const UserAllProjects = ({ navigation, route }) => {
  // User ID from navigation params
  
  const [allProjects, setAllProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  // Action Menu States
  const [actionMenuVisible, setActionMenuVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  // Edit Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
  });

  // Delete Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    getAllProjects();
  }, []);

  const getAllProjects = async () => {
    try {
      setIsLoading(true);
      const response = await apiGet(`/api/executive/GetUserAllProjects/${route?.params?.UserId}`);
      setAllProjects(response?.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      ToastMsg('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async () => {
    try {
      await apiDelete(`/api/executive/DeleteUserProject/${projectToDelete._id}`);
      ToastMsg('Project deleted successfully');
      setIsDeleteModalOpen(false);
      getAllProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      ToastMsg('Failed to delete project');
    }
  };

  const handleUpdateProject = async () => {
    try {
      const payload = {
        Name: editData.name,
        Location: {
          Address: editData.address,
          State: editData.state,
          City: editData.city,
          Pincode: editData.pincode,
        },
      };

      await apiPut(`/api/executive/UpdateUserProject/${selectedProject._id}`, payload);
      ToastMsg('Project updated successfully');
      setIsEditModalOpen(false);
      getAllProjects();
    } catch (error) {
      console.error('Error updating project:', error);
      ToastMsg(error?.response?.data?.message || 'Failed to update project');
    }
  };

  const handleThreeDotsPress = (event, project) => {
    event.target.measure((fx, fy, width, height, px, py) => {
      setMenuPosition({
        x: px - 100,
        y: py + height,
      });
      setSelectedProject(project);
      setActionMenuVisible(true);
    });
  };

  const openEditModal = () => {
    setEditData({
      name: selectedProject.Name || '',
      address: selectedProject.Location?.Address || '',
      state: selectedProject.Location?.State || '',
      city: selectedProject.Location?.City || '',
      pincode: selectedProject.Location?.Pincode || '',
    });
    setActionMenuVisible(false);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = () => {
    setProjectToDelete(selectedProject);
    setActionMenuVisible(false);
    setIsDeleteModalOpen(true);
  };

  const handleAddRequirement = (project) => {
    navigation.navigate('ExcutiveAddRequirementForm', {
      userId: route?.params?.UserId,
      projectId: project._id,
    });
  };

  const paginatedProjects = allProjects.slice(
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
          <Text style={styles.headerTitle}>All Projects</Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddExecutiveProjectScreen', { userId:route?.params?.UserId })}
        >
          <Text style={styles.addButtonText}>+ Add Project</Text>
        </TouchableOpacity>
      </View>

      {/* Table */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={App_Primary_color} />
          <Text style={styles.loadingText}>Loading projects...</Text>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View style={styles.tableContainer}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.idColumn]}>ID</Text>
              <Text style={[styles.tableHeaderCell, styles.nameColumn]}>Name</Text>
              <Text style={[styles.tableHeaderCell, styles.stateColumn]}>State</Text>
              <Text style={[styles.tableHeaderCell, styles.cityColumn]}>City</Text>
              <Text style={[styles.tableHeaderCell, styles.addressColumn]}>Address</Text>
              <Text style={[styles.tableHeaderCell, styles.pincodeColumn]}>Pincode</Text>
              <Text style={[styles.tableHeaderCell, styles.requirementColumn]}>
                Add Requirement
              </Text>
              <Text style={[styles.tableHeaderCell, styles.dateColumn]}>Created At</Text>
              <Text style={[styles.tableHeaderCell, styles.actionsColumn]}>Actions</Text>
            </View>

            {/* Table Body */}
            <ScrollView style={styles.tableBody} showsVerticalScrollIndicator={true}>
              {paginatedProjects.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No projects found</Text>
                </View>
              ) : (
                paginatedProjects.map((project, index) => (
                  <View key={project._id} style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.idColumn]}>
                      {page * rowsPerPage + index + 1}
                    </Text>
                    <Text style={[styles.tableCell, styles.nameColumn]}>
                      {project.Name || 'N/A'}
                    </Text>
                    <Text style={[styles.tableCell, styles.stateColumn]}>
                      {project.Location?.State || 'N/A'}
                    </Text>
                    <Text style={[styles.tableCell, styles.cityColumn]}>
                      {project.Location?.City || 'N/A'}
                    </Text>
                    <Text style={[styles.tableCell, styles.addressColumn]}>
                      {project.Location?.Address || 'N/A'}
                    </Text>
                    <Text style={[styles.tableCell, styles.pincodeColumn]}>
                      {project.Location?.Pincode || 'N/A'}
                    </Text>
                    <View style={[styles.tableCell, styles.requirementColumn]}>
                      <TouchableOpacity
                        style={styles.addReqButton}
                        onPress={() => handleAddRequirement(project)}
                      >
                        <Text style={styles.addReqButtonText}>Add</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={[styles.tableCell, styles.dateColumn]}>
                      {moment(project.createdAt).format('DD/MM/YYYY')}
                    </Text>
                    <View style={[styles.tableCell, styles.actionsColumn]}>
                      <TouchableOpacity
                        style={styles.threeDotsButton}
                        onPress={(e) => handleThreeDotsPress(e, project)}
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
                {Math.min((page + 1) * rowsPerPage, allProjects.length)} of{' '}
                {allProjects.length} projects
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
                    (page + 1) * rowsPerPage >= allProjects.length &&
                      styles.pageButtonDisabled,
                  ]}
                  onPress={() => setPage(page + 1)}
                  disabled={(page + 1) * rowsPerPage >= allProjects.length}
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
              <Text style={styles.actionMenuText}>Update</Text>
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
              <Text style={styles.modalTitle}>Update Project</Text>

              <View style={styles.modalFormGroup}>
                <Text style={styles.modalLabel}>Project Name</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editData.name}
                  onChangeText={(value) => setEditData({ ...editData, name: value })}
                  placeholder="Enter project name"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.modalFormGroup}>
                <Text style={styles.modalLabel}>Address</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editData.address}
                  onChangeText={(value) => setEditData({ ...editData, address: value })}
                  placeholder="Enter address"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.modalRow}>
                <View style={[styles.modalFormGroup, styles.halfWidth]}>
                  <Text style={styles.modalLabel}>State</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={editData.state}
                    onChangeText={(value) => setEditData({ ...editData, state: value })}
                    placeholder="Enter state"
                    placeholderTextColor="#999"
                  />
                </View>

                <View style={[styles.modalFormGroup, styles.halfWidth]}>
                  <Text style={styles.modalLabel}>City</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={editData.city}
                    onChangeText={(value) => setEditData({ ...editData, city: value })}
                    placeholder="Enter city"
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              <View style={styles.modalFormGroup}>
                <Text style={styles.modalLabel}>Pincode</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editData.pincode}
                  onChangeText={(value) => setEditData({ ...editData, pincode: value })}
                  placeholder="Enter pincode"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  maxLength={6}
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
                  onPress={handleUpdateProject}
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
              Are you sure you want to delete this project?
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
                onPress={handleDeleteProject}
              >
                <Text style={styles.modalDeleteButtonText}>Yes</Text>
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
  addButton: {
    backgroundColor: App_Primary_color,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
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
    width: 120,
  },
  stateColumn: {
    width: 100,
  },
  cityColumn: {
    width: 100,
  },
  addressColumn: {
    width: 150,
  },
  pincodeColumn: {
    width: 80,
  },
  requirementColumn: {
    width: 100,
    justifyContent: 'center',
  },
  dateColumn: {
    width: 90,
  },
  actionsColumn: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addReqButton: {
    // backgroundColor: '#4285f4',
    // paddingVertical: 4,
    // paddingHorizontal: 12,
    // borderRadius: 6,
    // borderWidth: 1,
    // borderColor: '#4285f4',
  },
  addReqButtonText: {
    color: App_Primary_color,
    fontSize: 11,
    fontWeight: '500',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
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
    backgroundColor: '#4285f4',
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
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  halfWidth: {
    flex: 1,
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
    backgroundColor: App_Primary_color,
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

export default UserAllProjects;