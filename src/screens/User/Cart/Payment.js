import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { App_Primary_color, dark33, darkMode25, white } from '../../../common/Colors/colors';
import { FONTS_FAMILY } from '../../../assets/Fonts';
import { useSelector } from 'react-redux';

const PaymentMethodScreen = ({navigation}) => {
  const [selectedMethod, setSelectedMethod] = useState('card1');

  const paymentMethods = [
    {
      id: 'card1',
      type: 'Credit Card',
      provider: 'LOGO',
      label: 'Card',
      isSelected: true,
    },
    {
      id: 'card2',
      type: 'Credit Card',
      provider: 'LOGO',
      label: 'Card',
      isSelected: false,
    },
    {
      id: 'ewallet1',
      type: 'E-Wallet',
      provider: 'LOGO',
      label: 'E-wallet',
      isSelected: false,
    },
    {
      id: 'ewallet2',
      type: 'E-Wallet',
      provider: 'LOGO',
      label: 'E-wallet',
      isSelected: false,
    },
    {
      id: 'ewallet3',
      type: 'E-Wallet',
      provider: 'LOGO',
      label: 'E-wallet',
      isSelected: false,
    },
  ];

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
  };

  const renderRadioButton = (isSelected) => (
    <View style={styles.radioButton}>
      {isSelected && <View style={styles.radioButtonSelected} />}
    </View>
  );

  const renderPaymentOption = (method) => (
    <TouchableOpacity
      key={method.id}
      style={styles.paymentOption}
      onPress={() => handleMethodSelect(method.id)}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>{method.provider}</Text>
      </View>
      <Text style={styles.methodLabel}>{method.label}</Text>
      <View style={styles.spacer} />
      {renderRadioButton(selectedMethod === method.id)}
    </TouchableOpacity>
  );

   const { isDarkMode } = useSelector(state => state.theme)

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:isDarkMode?darkMode25: '#f3f4f6',
  },
  header: {
    backgroundColor: App_Primary_color,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily:FONTS_FAMILY.Poppins_Medium
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 32,
    backgroundColor:isDarkMode?dark33:'white'
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily:FONTS_FAMILY.Poppins_SemiBold,
    color:isDarkMode?white: '#111827',
    marginBottom: 16,
  },
  sectionDivider: {
    height: 1,
    backgroundColor:isDarkMode?dark33: '#d1d5db',
    marginBottom: 0,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 1,
  },
  paymentOption: {
    backgroundColor:isDarkMode?dark33: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  logoContainer: {
    width: 60,
    height: 32,
    backgroundColor: '#000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  logoText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  methodLabel: {
    fontSize: 16,
    color: isDarkMode?white:'#111827',
    fontWeight: '500',
  },
  spacer: {
    flex: 1,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: App_Primary_color,
  },
  footer: {
    backgroundColor:isDarkMode?dark33: 'white',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  payButton: {
    backgroundColor:App_Primary_color,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 16,
  },
  payButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily:FONTS_FAMILY.Poppins_Medium,
  },

});

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Method</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Credit Card Section */}
        <View style={styles.section}>
          {/* <Text style={styles.sectionTitle}>Credit Card</Text> */}
          <View style={styles.sectionDivider} />
          
          {paymentMethods
            .filter(method => method.type === 'Credit Card')
            .map(renderPaymentOption)}
        </View>

        {/* E-Wallet Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>E-Wallet</Text>
          <View style={styles.sectionDivider} />
          
          {paymentMethods
            .filter(method => method.type === 'E-Wallet')
            .map(renderPaymentOption)}
        </View>
      </ScrollView>

      {/* Pay Now Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.payButton}
        onPress={()=>navigation.navigate('SucessScreen')}
        >
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
        
        {/* Home Indicator */}
        {/* <View style={styles.homeIndicator} /> */}
      </View>
    </SafeAreaView>
  );
};



export default PaymentMethodScreen;