import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash1 from '../../screens/Splash/Splash1';
import Login from '../../screens/Auth/Login';

import OtpScreen from '../../screens/Auth/OtpScreen';

import SplashScreen from '../../screens/Splash/SplashScreen';

import LocationPermissionScreen from '../../screens/Auth/LocationPermission';
import HomeScreen from '../../screens/Home/Home';
import ProductDetail from '../../screens/Home/ProductDetail';
import CartScreen from '../../screens/Cart/Cart';
import CheckoutSummary from '../../screens/Cart/ChekoutSummary';
import PaymentMethodScreen from '../../screens/Cart/Payment';
import SucessScreen from '../../screens/Cart/Sucess';
import TabNavigation from '../TabNavigation.js/TabNavigation';
import TermsAndConditionsScreen from '../../screens/StaticScreens/TermsAndCondition';
import PrivacyPolicyScreen from '../../screens/StaticScreens/PrivacyPolicy';
import EditProfile from '../../screens/Profile/EditProfile';
import AddressDetailsPage from '../../screens/Profile/AddressDetial';
import AppearancePage from '../../screens/Profile/Appereances';
import MyOrdersPage from '../../screens/Orders/Orders';
import OrderDetailsPage from '../../screens/Orders/OrderDetials';
import OrderTrackingScreen from '../../screens/Orders/TrackOrder';
import CategoryProducts from '../../screens/Category/CategoriesProducts';




const Stack = createNativeStackNavigator();





const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#000' },
        }}
        initialRouteName="SplashScreen">
          
        <Stack.Screen name={'SplashScreen'} component={SplashScreen} />
        <Stack.Screen name={'Onboarding'} component={Splash1} />
        {/* <Stack.Screen name={'OnboardingScreen'} component={OnboardingScreen} /> */}
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'Otpscreen'} component={OtpScreen} />
        <Stack.Screen name={'LocationPermissionScreen'} component={LocationPermissionScreen} />
        <Stack.Screen name={'Home'} component={HomeScreen} />
        <Stack.Screen name={'ProductDetail'} component={ProductDetail} />
        <Stack.Screen name={'CartScreen'} component={CartScreen} />
        <Stack.Screen name={'CheckoutSummary'} component={CheckoutSummary} />
        <Stack.Screen name={'PaymentMethodScreen'} component={PaymentMethodScreen} />
        <Stack.Screen name={'SucessScreen'} component={SucessScreen} />
        <Stack.Screen name={'Tab'} component={TabNavigation} />
        <Stack.Screen name={'TermsAndcondition'} component={TermsAndConditionsScreen} />
        <Stack.Screen name={'PrivacyPolicy'} component={PrivacyPolicyScreen} />
        <Stack.Screen name={'EditProfile'} component={EditProfile} />
        <Stack.Screen name={'AddressDetailsPage'} component={AddressDetailsPage} />
        <Stack.Screen name={'AppearancePage'} component={AppearancePage} />
        <Stack.Screen name={'MyOrdersPage'} component={MyOrdersPage} />
        <Stack.Screen name={'OrderDetailsPage'} component={OrderDetailsPage} />
        <Stack.Screen name={'OrderTrackingScreen'} component={OrderTrackingScreen} />
        <Stack.Screen name={'CategoryProducts'} component={CategoryProducts} />











        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
