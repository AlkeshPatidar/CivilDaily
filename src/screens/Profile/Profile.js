import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'
import {Back, BackArrow, EditIcon, ForwordChev} from '../../assets/SVGs'
import {FONTS_FAMILY} from '../../assets/Fonts'
import IMG from '../../assets/Images'
import {App_Primary_color} from '../../common/Colors/colors'

const ProfileScreen = () => {
  const menuItems = [
    {icon: '💳', title: 'Bank Account', onPress: () => {}},
    {icon: '📋', title: 'Delivery Details', onPress: () => {}},
    {icon: '📊', title: 'Linked Social Midea', onPress: () => {}},
    {icon: '🔔', title: 'Notification Settings', onPress: () => {}},
    {icon: '🌐', title: 'Language Settings', onPress: () => {}},
    {icon: '📄', title: 'Disclaimer', onPress: () => {}},
    {icon: '❌', title: 'Cancellation', onPress: () => {}},
    {icon: '🔒', title: 'Terms & Condition', onPress: () => {}},
    {icon: '🔒', title: 'Privacy Policy', onPress: () => {}},
    {icon: '❓', title: 'Support', onPress: () => {}},
    {icon: 'ℹ️', title: 'About', onPress: () => {}},
  ]

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor={App_Primary_color} />

      {/* Header */}
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity> */}
        <BackArrow />
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>☀️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image source={IMG.AvatorImage} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Leslie Alexander</Text>
            <Text style={styles.profileEmail}>leslie.alexander@gmail.com</Text>
            <TouchableOpacity style={styles.editButton}>
              <EditIcon />
              <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <View style={styles.dollarIcon}>
              <Text style={styles.dollarText}>$</Text>
            </View>
            <TouchableOpacity style={styles.viewHistoryButton}>
              <Text style={styles.viewHistoryText}>View History</Text>
              {/* <Text style={styles.viewHistoryArrow}>›</Text> */}
              <ForwordChev />
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceAmount}>500.000</Text>
          <Text style={styles.balanceEquivalent}>Equivalent to Rp 500.000</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}>
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              {/* <Text style={styles.menuArrow}>›</Text> */}
              <ForwordChev />
            </TouchableOpacity>
          ))}
        </View>

        {/* Log Out Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutIcon}>⟲</Text>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* Bottom Indicator */}
        <View style={styles.bottomIndicator} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: App_Primary_color,
    marginTop: 30,
  },
  backButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  settingsButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: App_Primary_color,
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#ddd',
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  profileName: {
    color: 'white',
    fontSize: 18,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
    // marginBottom: 5,
  },
  profileEmail: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 10,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editIcon: {
    // marginRight: 20,
    // fontSize: 14,
  },
  editText: {
    color: 'white',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  balanceCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: -10,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  dollarIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dollarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  viewHistoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewHistoryText: {
    color: '#E85A4F',
    fontSize: 12,
    marginRight: 5,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  viewHistoryArrow: {
    color: '#E85A4F',
    fontSize: 16,
  },
  balanceAmount: {
    fontSize: 32,
    fontFamily: FONTS_FAMILY.Poppins_Medium,
    color: '#333',
    // marginBottom: 5,
    alignSelf: 'center',
  },
  balanceEquivalent: {
    fontSize: 14,
    color: '#666',
    alignSelf: 'center',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
  menuContainer: {
    backgroundColor: 'white',
    marginHorizontal: 0,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    paddingTop: 10,
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: 12,
    marginRight: 12,
    width: 25,
  },
  menuTitle: {
    fontSize: 14,
    color: '#333',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  menuArrow: {
    fontSize: 18,
    color: '#ccc',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDEFF2',
    paddingVertical: 12,
    borderRadius: 8,
    // paddingHorizontal:60,
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
  logoutIcon: {
    fontSize: 18,
    marginRight: 10,
    color: '#E85A4F',
  },
  logoutText: {
    fontSize: 16,
    color: '#E85A4F',
    fontWeight: '500',
  },
  bottomIndicator: {
    width: 150,
    height: 4,
    // backgroundColor: '#333',
    alignSelf: 'center',
    borderRadius: 2,
    marginTop: 20,
    marginBottom: 10,
  },
})

export default ProfileScreen
