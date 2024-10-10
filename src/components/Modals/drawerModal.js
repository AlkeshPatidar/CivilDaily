import React, { memo, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';

import { useSelector } from 'react-redux';
import CustomText from '../TextComponent';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { FONTS_FAMILY } from '../../assets/Fonts';
import color from '../../common/colors';
import CustomButton from '../Button';
import { showError } from '../../utils/helperFunctions';
import { clearAsyncStorage } from '../../utils/utils';
import IMG from '../../assets/Images';


const DrawerModal = ({ visible, onClose, navigation }) => {
  let selector = useSelector(state => state?.user?.userData);
  if (Object.keys(selector).length != 0) {
    selector = JSON.parse(selector);
  }



  const onLogout = async () => {
    try {
      await clearAsyncStorage();
      navigation?.replace('Login');
    } catch (error) {
      showError('Error while logging out');
    }
  };
  return (
    <TouchableOpacity style={styles.mainContainer}>
      <Modal
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose}>
          <TouchableOpacity activeOpacity={1} style={{ ...styles.modalContent }}>
            <LinearGradient
              colors={[color.Primary_color, '#9BC3F7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ ...styles.modalContainer }}>
              <ScrollView style={styles.container}>
                {/* <Avtar /> */}
                <Image source={selector?.image1 ? { uri: selector.image1 } : IMG.ProfileImage} style={styles.profileImage} />

                <View style={styles.nameContainer}>
                  <CustomText style={styles.name}>{selector?.name}</CustomText>
                  <CustomText style={styles.email}>
                    {selector?.email}
                  </CustomText>
                </View>
                <View style={styles.menuContainer}>
                  <TouchableOpacity
                    style={styles.menu}
                  // onPress={() => navigation.navigate('OrderHistory')}
                  >
                    {/* <Document /> */}
                    {/* <CustomText style={styles.menuName}>My Orders</CustomText> */}
                  </TouchableOpacity>
                </View>

                <View style={styles.menuContainer}>
                  <TouchableOpacity
                    style={styles.menu}
                    onPress={() => {
                      onClose();
                      navigation.navigate('Profile');
                    }}>
                    {/* <Profile /> */}
                    <CustomText style={styles.menuName}>My Profile</CustomText>
                  </TouchableOpacity>
                </View>


                <View style={styles.menuContainer}>
                  <TouchableOpacity style={styles.menu}>
                    {/* <Message /> */}
                    <CustomText style={styles.menuName}>Contact Us</CustomText>
                  </TouchableOpacity>
                </View>

                <View style={styles.menuContainer}>
                  <TouchableOpacity style={styles.menu}>
                    {/* <Setting /> */}
                    <CustomText style={styles.menuName}>Settings</CustomText>
                  </TouchableOpacity>
                </View>

                <View style={styles.menuContainer}>
                  <TouchableOpacity style={styles.menu}>
                    {/* <Helps /> */}
                    <CustomText style={styles.menuName}>
                      Helps & FAQs
                    </CustomText>
                  </TouchableOpacity>
                </View>
                <CustomButton title={'Logout'}
                  onPress={onLogout}
                  style={{ marginTop: verticalScale(30), elevation: 2 }} />
              </ScrollView>
            </LinearGradient>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </TouchableOpacity>
  );
};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    // padding: 20,
    width: windowWidth / 1.2,
    // width: windowWidth / 2,
    height: windowHeight,
    borderTopEndRadius: moderateScale(20),
    borderBottomEndRadius: moderateScale(20),
    overflow: 'hidden',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },

  // ---------
  container: {
    marginLeft: 20,
    // backgroundColor:'white'
  },
  nameContainer: {
    paddingBottom: 10,
  },
  name: {
    fontFamily: FONTS_FAMILY.Nunito_SemiBold,
    color: color.white,
    fontSize: 20,
  },
  email: {
    color: color.white,
    fontFamily: FONTS_FAMILY.Nunito_Regular,
  },
  menuContainer: {},
  menu: {
    flexDirection: 'row',
    gap: 15,
    paddingTop: 20,
  },
  menuName: {
    color: color.white,
    fontSize: 18,
    fontFamily: FONTS_FAMILY.Nunito_Regular,
  },
  LogOutButton: {
    marginTop: 30,
  },

  profileImage: {
    height: moderateScale(90),
    width: moderateScale(90),
    marginLeft: moderateScale(20),
    marginVertical: verticalScale(14),
    borderRadius: moderateScale(50)
  },
});

export default memo(DrawerModal);
