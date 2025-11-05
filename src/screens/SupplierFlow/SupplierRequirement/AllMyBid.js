import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  RefreshControl,
  Animated,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { BackIcon } from '../../../assets/SVGs';
import { FONTS_FAMILY } from '../../../assets/Fonts';
import { App_Primary_color, white } from '../../../common/Colors/colors';
import { apiGet, apiDelete } from '../../../utils/Apis';
import { ToastMsg } from '../../../utils/helperFunctions';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

const AllMyBids = ({ navigation }) => {
  const { isDarkMode } = useSelector(state => state.theme);
  const [allBids, setAllBids] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Delete Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bidToDelete, setBidToDelete] = useState(null);

  const headerAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    getAllBids();
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

  const getAllBids = async () => {
    try {
      setIsLoading(true);
      const response = await apiGet('/api/supplier/GetAllMyBids');
      setAllBids(response?.data || []);
    } catch (error) {
      console.error('Error fetching bids:', error);
      ToastMsg('Failed to load bids');
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getAllBids();
    setRefreshing(false);
  };

  const handleDeleteBid = async () => {
    try {
      await apiDelete(`/api/supplier/DeleteBidForRequirement/${bidToDelete._id}`);
      ToastMsg('Bid deleted successfully');
      setIsDeleteModalOpen(false);
      getAllBids();
    } catch (error) {
      console.error('Error deleting bid:', error);
      ToastMsg('Failed to delete bid');
    }
  };

  const openDeleteModal = (bid) => {
    setBidToDelete(bid);
    setIsDeleteModalOpen(true);
  };

  const openMapLocation = (coordinates) => {
    if (coordinates?.Late && coordinates?.Long) {
      const url = `https://www.google.com/maps?q=${coordinates.Late},${coordinates.Long}`;
      console.log('Open map:', url);
      // Use Linking.openURL(url) to open in browser
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return moment(dateString).format('DD/MM/YYYY');
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: '#F59E0B',
      Accepted: '#10B981',
      Rejected: '#EF4444',
      Approved: '#3B82F6',
    };
    return colors[status] || '#6B7280';
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
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
      paddingVertical: 100,
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
      marginTop: 12,
    },
    bidCard: {
      backgroundColor: white,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
    },
    cardHeaderLeft: {
      flex: 1,
    },
    bidId: {
      fontFamily: FONTS_FAMILY.Poppins_Bold,
      fontSize: 16,
      color: '#1D4ED8',
      marginBottom: 4,
    },
    createdDate: {
      fontFamily: FONTS_FAMILY.Poppins_Regular,
      fontSize: 11,
      color: '#999',
    },
    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
      alignSelf: 'flex-start',
    },
    statusText: {
      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
      fontSize: 11,
      color: white,
    },
    infoSection: {
      marginBottom: 12,
    },
    infoRow: {
      flexDirection: 'row',
      marginBottom: 8,
      alignItems: 'flex-start',
    },
    infoLabel: {
      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
      fontSize: 12,
      color: '#333',
      width: 100,
    },
    infoValue: {
      fontFamily: FONTS_FAMILY.Poppins_Regular,
      fontSize: 12,
      color: '#666',
      flex: 1,
    },
    mapButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#DBEAFE',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#93C5FD',
      gap: 4,
    },
    mapButtonText: {
      fontFamily: FONTS_FAMILY.Poppins_Medium,
      fontSize: 11,
      color: '#1D4ED8',
    },
    noLocationText: {
      fontFamily: FONTS_FAMILY.Poppins_Regular,
      fontSize: 11,
      color: '#999',
    },
    itemsSection: {
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: '#E5E7EB',
    },
    itemsSectionTitle: {
      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
      fontSize: 13,
      color: '#333',
      marginBottom: 8,
    },
    itemCard: {
      backgroundColor: '#F9FAFB',
      borderRadius: 8,
      padding: 12,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: '#E5E7EB',
    },
    itemName: {
      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
      fontSize: 13,
      color: '#333',
      marginBottom: 6,
    },
    itemDetail: {
      fontFamily: FONTS_FAMILY.Poppins_Regular,
      fontSize: 12,
      color: '#666',
      marginBottom: 3,
    },
    itemDetailBold: {
      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
      fontSize: 12,
      color: '#333',
    },
    brandChipsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      marginTop: 6,
    },
    brandChip: {
      backgroundColor: '#DBEAFE',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#93C5FD',
    },
    brandChipText: {
      fontFamily: FONTS_FAMILY.Poppins_Medium,
      fontSize: 10,
      color: '#1D4ED8',
    },
    deleteButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FEE2E2',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginTop: 12,
      gap: 6,
    },
    deleteButtonText: {
      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
      fontSize: 13,
      color: '#DC2626',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
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
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
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

  const renderHeader = () => (
    <Animated.View style={[styles.headerContainer, { transform: [{ translateY: headerAnim }] }]}>
      <StatusBar barStyle="dark-content" backgroundColor={white} />
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All My Bids</Text>
      </View>
    </Animated.View>
  );

  const renderBidCard = (bid, index) => {
    const hasItems = bid?.Items && bid.Items.length > 0;

    return (
      <View key={bid._id} style={styles.bidCard}>
        {/* Header */}
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <Text style={styles.bidId}>Bid #{index + 1}</Text>
            <Text style={styles.createdDate}>
              Created: {formatDate(bid?.createdAt)}
            </Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(bid?.Status) },
            ]}
          >
            <Text style={styles.statusText}>{bid?.Status || 'N/A'}</Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address:</Text>
            <Text style={styles.infoValue}>
              {bid?.Requirement?.Location?.Address || 'N/A'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>City:</Text>
            <Text style={styles.infoValue}>
              {bid?.Requirement?.Location?.City || 'N/A'} -{' '}
              {bid?.Requirement?.Location?.Pincode || 'N/A'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Map:</Text>
            {bid?.Requirement?.Location?.Coordinates?.Late &&
            bid?.Requirement?.Location?.Coordinates?.Long ? (
              <TouchableOpacity
                style={styles.mapButton}
                onPress={() =>
                  openMapLocation(bid?.Requirement?.Location?.Coordinates)
                }
              >
                <Icon name="map-marker" size={14} color="#1D4ED8" />
                <Text style={styles.mapButtonText}>View Map</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.noLocationText}>No Location</Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Timeline:</Text>
            <Text style={styles.infoValue}>
              {formatDate(bid?.Requirement?.TimeLine)}
            </Text>
          </View>

          {(bid?.Note || bid?.Requirement?.Note) && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Note:</Text>
              <Text style={styles.infoValue}>
                {bid?.Note || bid?.Requirement?.Note}
              </Text>
            </View>
          )}
        </View>

        {/* Items Section */}
        {hasItems && (
          <View style={styles.itemsSection}>
            <Text style={styles.itemsSectionTitle}>Items:</Text>
            {bid.Items.map((item, idx) => (
              <View key={idx} style={styles.itemCard}>
                <Text style={styles.itemName}>
                  {item.productName || 'N/A'}
                </Text>

                <Text style={styles.itemDetail}>
                  Quantity:{' '}
                  <Text style={styles.itemDetailBold}>{item.quantity}</Text>
                </Text>

                {item.brands && item.brands.length > 0 && (
                  <>
                    <Text style={[styles.itemDetail, { marginTop: 6, marginBottom: 4 }]}>
                      Brands & Prices:
                    </Text>
                    <View style={styles.brandChipsContainer}>
                      {item.brands.map((brand, bIdx) => (
                        <View key={bIdx} style={styles.brandChip}>
                          <Text style={styles.brandChipText}>
                            {brand.brandName} - ₹{brand.price}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Delete Button */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => openDeleteModal(bid)}
        >
          <Icon name="delete-outline" size={18} color="#DC2626" />
          <Text style={styles.deleteButtonText}>Delete Bid</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (isLoading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={App_Primary_color} />
        </View>
      </SafeAreaView>
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
          {allBids?.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Icon name="clipboard-alert-outline" size={60} color="#ccc" />
              <Text style={styles.emptyText}>No bids found.</Text>
            </View>
          ) : (
            allBids.map((bid, index) => renderBidCard(bid, index))
          )}
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>

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
              Are you sure you want to delete this bid?
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
                onPress={handleDeleteBid}
              >
                <Text style={styles.modalDeleteButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AllMyBids;