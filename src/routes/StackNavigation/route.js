import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator,  } from '@react-navigation/native-stack';

import Splash1 from '../../screens/Splash/Splash1';
import Login from '../../screens/Auth/Login';

import OtpScreen from '../../screens/Auth/OtpScreen';

import SplashScreen from '../../screens/Splash/SplashScreen';

import LocationPermissionScreen from '../../screens/Auth/LocationPermission';
import HomeScreen from '../../screens/Home/Home';
// import ProductDetail from '../../screens/Home/ProductDetail';
import CartScreen from '../../screens/Cart/Cart';
import PaymentMethodScreen from '../../screens/Cart/Payment';
import SucessScreen from '../../screens/Cart/Sucess';
import TabNavigation from '../TabNavigation.js/TabNavigation';
import TermsAndConditionsScreen from '../../screens/StaticScreens/TermsAndCondition';
import PrivacyPolicyScreen from '../../screens/StaticScreens/PrivacyPolicy';
import EditProfile from '../../screens/Profile/EditProfile';
import AppearancePage from '../../screens/Profile/Appereances';

import Signup from '../../screens/Auth/Signup';
import ForgotPassword from '../../screens/Auth/ForgetPassword';
import Notifications from '../../screens/Notification/Notification';
import AllWorkProject from '../../screens/Projects/MyAllProjects';
import AddWorkRequirementForm from '../../screens/Projects/AddRequirement';
import AllMyRequirements from '../../screens/AllRequirement/AllMyRequiremnts';
import AllPendingRequirements from '../../screens/AllRequirement/AllMyPendingReq';
import AllMyPricedRequirements from '../../screens/AllRequirement/AllMyPricedRequirement';
import AllMyAcceptedRequirements from '../../screens/AllRequirement/AllMyAcceptedRequirement';
import AllMyTokenPaidRequirements from '../../screens/AllRequirement/MyTokenPaidReq';
import AllPaymentRequest from '../../screens/AllPaymentRequest/AllPaymentRequest';
import AllMyPaidRequirements from '../../screens/AllRequirement/AllMyPaidRequirement';
import AllMyDeliveredRequirements from '../../screens/AllRequirement/AllMyDeliveredRequirement';
import AllMyRejectedRequirement from '../../screens/AllRequirement/AllMyRejectedRequirement';
import AllTransactions from '../../screens/Transaction/Transactions';
import AllExpense from '../../screens/Expense/AllExpense';
import AllWorkRequirement from '../../screens/AllWorkRequirement/AllWorkReq';
import AllPendingWorkRequirement from '../../screens/AllWorkRequirement/AllPendingWorkReq';
import AllInProgressWorkRequirement from '../../screens/AllWorkRequirement/AllINprogressworkReq';
import AllCompletedWorkRequirement from '../../screens/AllWorkRequirement/AllCompleteWorkReq';
import AllCancelledWorkRequirement from '../../screens/AllWorkRequirement/AllCancelledWorkReq';
import AllAprovedWorkReq from '../../screens/AllWorkRequirement/AllApprovedWorkReq';





const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#000' },
          animation: 'slide_from_right'
        }}
        initialRouteName="SplashScreen">
          
        <Stack.Screen name={'SplashScreen'} component={SplashScreen} />
        <Stack.Screen name={'Onboarding'} component={Splash1} />
        {/* <Stack.Screen name={'OnboardingScreen'} component={OnboardingScreen} /> */}
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'Signup'} component={Signup} />
        <Stack.Screen name={'ForgotPassword'} component={ForgotPassword} />
        <Stack.Screen name={'Otpscreen'} component={OtpScreen} />
        <Stack.Screen name={'LocationPermissionScreen'} component={LocationPermissionScreen} />
        <Stack.Screen name={'Home'} component={HomeScreen} />
        {/* <Stack.Screen name={'ProductDetail'} component={ProductDetail} /> */}
        <Stack.Screen name={'CartScreen'} component={CartScreen} />
        <Stack.Screen name={'PaymentMethodScreen'} component={PaymentMethodScreen} />
        <Stack.Screen name={'SucessScreen'} component={SucessScreen} />
        <Stack.Screen name={'Tab'} component={TabNavigation} />
        <Stack.Screen name={'TermsAndcondition'} component={TermsAndConditionsScreen} />
        <Stack.Screen name={'PrivacyPolicy'} component={PrivacyPolicyScreen} />
        <Stack.Screen name={'EditProfile'} component={EditProfile} />
        <Stack.Screen name={'AppearancePage'} component={AppearancePage} />
        


        
        <Stack.Screen name={'Notifications'} component={Notifications} />

        {/* new */}
        
        <Stack.Screen name={'AllWorkProject'} component={AllWorkProject} />
        <Stack.Screen name={'AddWorkRequirementForm'} component={AddWorkRequirementForm} />
        <Stack.Screen name={'AllMyRequirements'} component={AllMyRequirements} />
        <Stack.Screen name={'AllPendingRequirements'} component={AllPendingRequirements} />
        <Stack.Screen name={'AllMyPricedRequirements'} component={AllMyPricedRequirements} />
        <Stack.Screen name={'AllMyAcceptedRequirements'} component={AllMyAcceptedRequirements} />
        <Stack.Screen name={'AllMyTokenPaidRequirements'} component={AllMyTokenPaidRequirements} />
        <Stack.Screen name={'AllPaymentRequest'} component={AllPaymentRequest} />
        <Stack.Screen name={'AllMyPaidRequirements'} component={AllMyPaidRequirements} />
        <Stack.Screen name={'AllMyDeliveredRequirements'} component={AllMyDeliveredRequirements} />
        <Stack.Screen name={'AllMyRejectedRequirement'} component={AllMyRejectedRequirement} />

        <Stack.Screen name={'AllTransactions'} component={AllTransactions} />
        <Stack.Screen name={'AllExpense'} component={AllExpense} />
        <Stack.Screen name={'AllWorkRequirement'} component={AllWorkRequirement} />

        <Stack.Screen name={'AllPendingWorkRequirement'} component={AllPendingWorkRequirement} />
        <Stack.Screen name={'AllInProgressWorkRequirement'} component={AllInProgressWorkRequirement} />
        <Stack.Screen name={'AllCompletedWorkRequirement'} component={AllCompletedWorkRequirement} />
        <Stack.Screen name={'AllCancelledWorkRequirement'} component={AllCancelledWorkRequirement} />
        <Stack.Screen name={'AllAprovedWorkReq'} component={AllAprovedWorkReq} />


        















        

        

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
