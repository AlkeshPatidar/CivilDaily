import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { BackWhite } from '../../assets/SVGs';
import { nanoid } from '@reduxjs/toolkit';
import { App_Primary_color } from '../../common/Colors/colors';
import { FONTS_FAMILY } from '../../assets/Fonts';

const OrderDetailsPage = ({navigation}) => {
  const orderData = {
    id: '#1902095',
    title: 'Fresh Pateto',
    status: 'Delivered',
    date: '28/06/2024, 8:00 PM',
    deliveryAddress: 'Home, Kemayoran, Cendana Street 1, Adinata Housing ...',
    items: [
      {
        id: 1,
        name: 'Fresh Pateto',
        price: '$15.99',
        quantity: 'x1',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&h=100&fit=crop',
      },
      {
        id: 2,
        name: 'Fresh Pateto',
        price: '$1.50',
        quantity: 'x2',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&h=100&fit=crop',
      },
    ],
    subtotal: '$17.49',
    deliveryFee: '$6',
    taxAndOtherFees: '$2.50',
    total: '$25.99',
  };

  const renderStatusBadge = (status) => (
    <View style={[
      styles.statusBadge,
      { borderColor: '#34C759' }
    ]}>
      <View style={[
        styles.statusDot,
        { backgroundColor: '#34C759' }
      ]} />
      <Text style={[
        styles.statusText,
        { color: '#34C759' }
      ]}>
        {status}
      </Text>
    </View>
  );

  const renderOrderItem = (item) => (
    <View key={item.id} style={styles.itemCard}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
      <Text style={styles.itemQuantity}>{item.quantity}</Text>
    </View>
  );

  const renderPriceRow = (label, amount, isTotal = false) => (
    <View key={label} style={[styles.priceRow, isTotal && styles.totalRow]}>
      <Text style={[
        styles.priceLabel,
        isTotal && styles.totalLabel
      ]}>
        {label}
      </Text>
      <Text style={[
        styles.priceAmount,
        isTotal && styles.totalAmount
      ]}>
        {amount}
      </Text>
    </View>
  );

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
          onPress={()=>navigation.goBack()}
          >
            {/* <Text style={styles.backArrow}>‹</Text> */}
            <BackWhite/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Order Header */}
        <View style={styles.orderHeader}>
          <Image source={{ uri: orderData.items[0].image }} style={styles.orderImage} />
          <View style={styles.orderInfo}>
            <Text style={styles.orderTitle}>{orderData.title}</Text>
            <Text style={styles.orderId}>{orderData.id}</Text>
          </View>
          {renderStatusBadge(orderData.status)}
        </View>

        {/* Date & Time */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Date & Time</Text>
          <Text style={styles.sectionValue}>{orderData.date}</Text>
        </View>

        {/* Delivery Address */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Delivered to</Text>
          <Text style={styles.sectionValue}>{orderData.deliveryAddress}</Text>
        </View>

        {/* Order Items */}
        <View style={styles.itemsSection}>
          {orderData.items.map(renderOrderItem)}
        </View>

        {/* Price Breakdown */}
        <View style={styles.priceSection}>
          {renderPriceRow('Subtotal', orderData.subtotal)}
          {renderPriceRow('Delivery Fee', orderData.deliveryFee)}
          {renderPriceRow('Tax & Other Fees', orderData.taxAndOtherFees)}
        </View>

        {/* Total */}
        <View style={styles.totalSection}>
          {renderPriceRow('Total', orderData.total, true)}
        </View>

        {/* Reorder Button */}
        <TouchableOpacity style={styles.reorderButton}>
          <LinearGradient
            colors={[App_Primary_color, App_Primary_color]}
            style={styles.reorderGradient}
          >
            <Text style={styles.reorderText}>Reorder</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    fontWeight: '600',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: -10,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
  },
  scrollContent: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  orderInfo: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 16,
   fontFamily:FONTS_FAMILY.Poppins_Medium,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  orderId: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily:FONTS_FAMILY.Poppins_Regular
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 16,
    borderWidth: 1,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  infoSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily:FONTS_FAMILY.Poppins_Medium,
    color: '#1A1A1A',
    marginBottom: 8,
  },
  sectionValue: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
  },
  itemsSection: {
    marginBottom: 30,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#8E8E93',
  },
  itemQuantity: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  priceSection: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily:FONTS_FAMILY.Poppins_Regular
  },
  priceAmount: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  totalSection: {
    marginBottom: 30,
  
  },
  totalRow: {
    marginBottom: 0,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
   
    // justifyContent:'center'
  },
  totalLabel: {
    fontSize: 16,
    fontFamily:FONTS_FAMILY.Poppins_Medium,
    color: '#1A1A1A',
  },
  totalAmount: {
    fontSize: 16,
    fontFamily:FONTS_FAMILY.Poppins_Medium,
    color: '#1A1A1A',
  },
  reorderButton: {
    marginTop: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  reorderGradient: {
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reorderText: {
    color: 'white',
    fontSize: 16,
  fontFamily:FONTS_FAMILY.Poppins_Medium
  },
});

export default OrderDetailsPage;