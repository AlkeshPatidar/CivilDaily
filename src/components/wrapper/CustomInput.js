import React, { version } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { FONTS_FAMILY } from '../../assets/Fonts';
import CustomText from '../TextComponent';
import color from '../../common/Colors/colors';

const CustomInputField = ({ icon, placeholder, label, ...props }) => {
  return (
    <View style={styles.container}>
      <CustomText style={{ position: 'absolute', bottom: 60, color: 'rgba(78, 75, 102, 1)', fontFamily: FONTS_FAMILY.Comfortaa_SemiBold }}>{label}</CustomText>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        {...props}
      />
      {icon}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(218, 218, 218, 1)',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F3F4F6',
    width: '100%',
    height: verticalScale(45),
    gap: 10
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontFamily: FONTS_FAMILY.Comfortaa_Regular
  },
});

export default CustomInputField;
