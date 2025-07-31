import React, { useState, version } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { FONTS_FAMILY } from '../../assets/Fonts';
import CustomText from '../TextComponent';
import color from '../../common/Colors/colors';
import { useTranslation } from 'react-i18next';

const CustomInputField = ({ icon,isPassword,keyboardType,secureTextEntry, placeholder,value ,onChangeText,label, ...props }) => {
  const { t, i18n } = useTranslation();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  return (
    <View style={{ width: '100%' }}>
      {label && <CustomText style={{ color: 'black', fontFamily: FONTS_FAMILY.Poppins_Regular, fontSize: 14, left: 10, marginBottom: 5 }}>{t(label)}</CustomText>}
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={isPassword && !isPasswordVisible}
          {...props}
        />
   <TouchableOpacity
          onPress={() =>{isPassword ? setPasswordVisible(!isPasswordVisible): null}}
        >
          {icon}
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(218, 218, 218, 1)',
    borderRadius: 15,
    paddingHorizontal: 10,
    // backgroundColor: '#F3F4F6',
    width: '100%',
    height: verticalScale(44),
    gap: 10
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontFamily: FONTS_FAMILY.Poppins_Regular
  },
});

export default CustomInputField;
