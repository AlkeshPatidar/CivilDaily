import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTS_FAMILY } from '../../../assets/Fonts';
import { App_Primary_color, darkMode25, darkOfPrimary } from '../../../common/Colors/colors';
import { apiGet } from '../../../utils/Apis';
import urls from '../../../config/urls';
import useLoader from '../../../utils/LoaderHook';
import { useSelector } from 'react-redux';

const BrandBokingList = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);

  const { isDarkMode } = useSelector(state => state.theme)


  const categories = ['All', 'Completed', 'Cancelled'];
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    getAllCampaigns();
  }, []);

  useEffect(() => {
    filterCampaigns();
  }, [selectedCategory, allCampaigns]);

  const getAllCampaigns = async () => {
    try {
      showLoader();
      let allData = [];

      // Get all campaigns
      const allRes = await apiGet(urls?.brandsGetAllMyCampaigns);
      if (allRes?.data) {
        allData = [...allRes.data];
      }

      // Get completed campaigns
      const completedRes = await apiGet(urls?.getAllMyCompletedCampaigns);
      if (completedRes?.data) {
        // Mark completed campaigns
        const completedCampaigns = completedRes.data.map(campaign => ({
          ...campaign,
          Status: 'Completed'
        }));
        allData = [...allData, ...completedCampaigns];
      }

      // Get cancelled campaigns
      const cancelledRes = await apiGet(urls?.getAllMyCancelledCamaigns);
      if (cancelledRes?.data) {
        // Mark cancelled campaigns
        const cancelledCampaigns = cancelledRes.data.map(campaign => ({
          ...campaign,
          Status: 'Cancelled'
        }));
        allData = [...allData, ...cancelledCampaigns];
      }

      setAllCampaigns(allData);
      hideLoader();
    } catch (error) {
      console.log('Error fetching campaigns:', error);
      hideLoader();
    }
  };

  const filterCampaigns = () => {
    let filtered = [];

    switch (selectedCategory) {
      case 'All':
        filtered = allCampaigns;
        break;
      case 'Completed':
        filtered = allCampaigns.filter(campaign =>
          campaign.Status?.toLowerCase() === 'completed'
        );
        break;
      case 'Cancelled':
        filtered = allCampaigns.filter(campaign =>
          campaign.Status?.toLowerCase() === 'cancelled'
        );
        break;
      default:
        filtered = allCampaigns;
    }

    // Apply search filter if searchText exists
    if (searchText.trim()) {
      filtered = filtered.filter(campaign =>
        campaign.Title?.toLowerCase().includes(searchText.toLowerCase()) ||
        campaign.Category?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredCampaigns(filtered);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return darkOfPrimary;
      case 'cancelled':
        return '#F44336';
      case 'active':
        return '#4CAF50';
      default:
        return '#666';
    }
  };

  const getSubtitle = (category) => {
    // Map category to location-based subtitles to match original UI
    const subtitleMap = {
      'Customer Goods': 'Taman Sari Billboard, Bandung',
      'Food': 'Istana Plaza Billboard, Bandung',
      'Food & Beverage': 'Graha Mandiri Billboard, Jakarta Pusat',
      'default': 'Indian The Dhaba'
    };
    return subtitleMap[category] || subtitleMap.default;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const CategoryButton = ({ title, isSelected, onPress }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        isSelected && styles.selectedCategoryButton
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.categoryText,
        isSelected && styles.selectedCategoryText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const CampaignCard = ({ item, index }) => (
    <TouchableOpacity style={styles.foodCard}
      // onPress={() => navigation.navigate('CampaignList')}

      onPress={() => navigation.navigate('BrandCapmaignDetail', { campaignId: item?._id })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.dateText}>
          {formatDate(item.createdAt) || '27 Dec 2023, 14:00'}
        </Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(item.Status) }
        ]}>
          <Text style={styles.statusText}>
            {item.Status?.toUpperCase() || 'COMPLETED'}
          </Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <Image
          source={{
            uri: item.Assets || 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop'
          }}
          style={styles.foodImage}
        />
        <View style={styles.cardDetails}>
          <Text style={styles.foodTitle} numberOfLines={2}>
            {item.Title || 'End of Year Promo Taman Sari'}
          </Text>
          <Text style={styles.foodSubtitle} numberOfLines={1}>
            {getSubtitle(item.Category)}
          </Text>

          {index === 1 && (
            <Text style={styles.additionalItems}>+2 more Items</Text>
          )}

          <View style={styles.cardFooter}>
            <Text style={styles.orderTotalLabel}>Redeem</Text>
            {/* <Text style={styles.priceText}>12</Text> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleSearch = (text) => {
    setSearchText(text);
    // Filter will be applied through useEffect
  };

  useEffect(() => {
    filterCampaigns();
  }, [searchText]);

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? darkMode25 : '#f5f5f5',
  },
  header: {
    backgroundColor: App_Primary_color,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF26',
    padding: 0,
    borderRadius: 8,
    paddingHorizontal: 10
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  categoryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignSelf: 'flex-start'
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryButton: {
    backgroundColor: isDarkMode ? '#555' : '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: darkOfPrimary,
  },
  categoryText: {
    fontSize: 13,
    color: isDarkMode ? 'white' : '#666',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  selectedCategoryText: {
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: isDarkMode ? darkMode25 : '#f5f5f5',
  },
  listContainer: {
    paddingBottom: 80,
  },
  listItem: {
    marginBottom: 16,
  },
  foodCard: {
    backgroundColor: isDarkMode ? '#333' : 'white',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 12,
    color: isDarkMode ? '#bbb' : '#666',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  cardDetails: {
    flex: 1,
  },
  foodTitle: {
    color: isDarkMode ? 'white' : 'black',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  foodSubtitle: {
    color: isDarkMode ? '#bbb' : '#666',
    fontSize: 12,
    marginBottom: 4,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  additionalItems: {
    color: '#FF6B35',
    fontSize: 11,
    marginBottom: 8,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  orderTotalLabel: {
    color: isDarkMode ? 'white' : 'black',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  priceText: {
    color: '#3D0066',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: isDarkMode ? '#bbb' : '#666',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    textAlign: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#E53E3E',
    width: 56,
    height: 56,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={App_Primary_color} barStyle="light-content"
        translucent={false}
      />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon name="search" size={20} color="#fff" style={{ bottom: 3 }} />
          <TextInput
            style={{ flex: 1, color: '#fff', marginLeft: 8, fontFamily: FONTS_FAMILY.Poppins_Regular }}
            placeholder='Search campaigns...'
            placeholderTextColor={'#fff'}
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
        <View style={styles.categoryContainer}>
          <View style={styles.categoryRow}>
            {categories.map((category, index) => (
              <CategoryButton
                key={index}
                title={category}
                isSelected={selectedCategory === category}
                onPress={() => setSelectedCategory(category)}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Campaigns List */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((item, index) => (
              <View key={item._id || index} style={styles.listItem}>
                <CampaignCard item={item} index={index} />
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No campaigns found for "{selectedCategory}"
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



export default BrandBokingList;