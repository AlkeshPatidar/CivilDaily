import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { App_Primary_color, dark33, darkMode25, white } from '../../common/Colors/colors';
import { BackWhite, EditIcon } from '../../assets/SVGs';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Row from '../../components/wrapper/row';
import { apiDelete, apiGet } from '../../utils/Apis';
import useLoader from '../../utils/LoaderHook';
import urls from '../../config/urls';
import { setUser } from '../../redux/reducer/user';

const AddressDetailsPage = ({ navigation }) => {


  const { showLoader, hideLoader } = useLoader()

  const { isDarkMode } = useSelector(state => state.theme);
  let selector = useSelector(state => state?.user?.userData);
  if (Object.keys(selector).length != 0) {
    selector = JSON.parse(selector);
  }

  const dispatch = useDispatch();


  const onDelete = async (id) => {
    try {
      showLoader()
      const res = apiDelete(`/api/user/address/${id}`)
      hideLoader()
      getUserProfile()

    } catch (error) {
      hideLoader()
    }
  }

  const getUserProfile = async () => {
    try {
      showLoader()
      const response = await apiGet(urls?.getSelf);
      dispatch(setUser(JSON.stringify(response?.data)));
      // navigation?.goBack();
      hideLoader()
    } catch (error) {
      console.error('Error getting user profile:', error);
      hideLoader()

    }
  };

  const renderAddressCard = (addressData) => (
    <View key={addressData.type} style={styles.addressCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.addressType}>{addressData.type}</Text>
        <Row style={{
          gap: 17
        }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddAddressScreen', { address: addressData })}
          >
            <EditIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete(addressData?._id)}
          >
            <AntDesign
              name={'delete'}
              size={15}
              color={App_Primary_color}
            />
          </TouchableOpacity>

        </Row>
      </View>
      {/* <View style={{height:1, width:'100%', backgroundColor:'#CCCCCC', marginVertical:8}}/> */}

      <View style={styles.addressContent}>
        <Text style={styles.nameText}>{addressData.addressLine1}</Text>
        <Text style={styles.phoneText}>{addressData.addressLine2}{addressData?.city}{addressData?.state},{addressData?.country}</Text>
        <Text style={styles.addressText}>{addressData.postalCode}</Text>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    header: {
      paddingTop: 10,
      paddingBottom: 20,
      paddingHorizontal: 20,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    backButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backArrow: {
      color: 'white',
      fontSize: 24,
      fontWeight: '300',
    },
    headerTitle: {
      color: 'white',
      fontSize: 18,
      fontFamily: FONTS_FAMILY.Poppins_SemiBold
    },
    headerRight: {
      width: 40,
    },
    content: {
      flex: 1,
      backgroundColor: isDarkMode ? darkMode25 : '#F5F5F5',
      marginTop: -10,
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingTop: 20,
      paddingHorizontal: 20,
      paddingBottom: 30,
    },
    addressCard: {
      backgroundColor: isDarkMode ? dark33 : '#F2F2F3',
      borderRadius: 12,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // marginBottom: 8,
      // paddingBottom: 8,
      // borderBottomWidth: 1,
      borderBottomColor: '#F8F8F8',
    },
    addressType: {
      fontSize: 16,
      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
      color: isDarkMode ? white : '#1A1A1A',
    },
    editButton: {
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    editIcon: {
      fontSize: 16,
      color: '#5B6BC7',
    },
    addressContent: {
      gap: 8,
    },
    nameText: {
      fontSize: 16,
      fontFamily: FONTS_FAMILY.Poppins_Medium,
      color: isDarkMode ? white : '#1A1A1A',
      marginBottom: 4,
    },
    phoneText: {
      fontSize: 14,
      color: isDarkMode ? 'white' : '#8E8E93',
      marginBottom: 4,
    },
    addressText: {
      fontSize: 14,
      color: '#8E8E93',
      lineHeight: 20,
      fontFamily: FONTS_FAMILY.Poppins_Regular
    },
    addButton: {
      alignItems: 'center',
      paddingVertical: 30,
      marginTop: 20,
    },
    addButtonIcon: {
      width: 50,
      height: 50,
      borderRadius: 28,
      backgroundColor: '#5B6BC7',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
      shadowColor: '#5B6BC7',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    plusIcon: {
      color: 'white',
      fontSize: 24,
      fontWeight: '300',
    },
    addButtonText: {
      fontSize: 16,
      color: '#5B6BC7',
      fontWeight: '500',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5B6BC7" />

      {/* Header */}
      <LinearGradient
        colors={[App_Primary_color, App_Primary_color]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            {/* <Text style={styles.backArrow}>‹</Text> */}
            <BackWhite />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Address Details</Text>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      {/* Content */}
      <View style={styles.content}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {selector?.addresses?.map(renderAddressCard)}

          {/* Add New Address Button */}
          <TouchableOpacity style={styles.addButton}
            onPress={() => navigation.navigate('AddAddressScreen')}
          >
            <View style={styles.addButtonIcon}>
              <Text style={styles.plusIcon}>+</Text>
            </View>
            <Text style={styles.addButtonText}>Add new address</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};



export default AddressDetailsPage;