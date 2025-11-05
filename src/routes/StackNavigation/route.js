import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator,  } from '@react-navigation/native-stack';

import Splash1 from '../../screens/Splash/Splash1';
import Login from '../../screens/Auth/Login';

import OtpScreen from '../../screens/Auth/OtpScreen';

import SplashScreen from '../../screens/Splash/SplashScreen';

import LocationPermissionScreen from '../../screens/Auth/LocationPermission';
import HomeScreen from '../../screens/User/Home/Home';
// import ProductDetail from '../../screens/Home/ProductDetail';
import CartScreen from '../../screens/User/Cart/Cart';
import PaymentMethodScreen from '../../screens/User/Cart/Payment';
import SucessScreen from '../../screens/User/Cart/Sucess';
import TabNavigation from '../TabNavigation.js/TabNavigation';
import TermsAndConditionsScreen from '../../screens/StaticScreens/TermsAndCondition';
import PrivacyPolicyScreen from '../../screens/StaticScreens/PrivacyPolicy';
import EditProfile from '../../screens/Profile/EditProfile';
import AppearancePage from '../../screens/Profile/Appereances';

import Signup from '../../screens/Auth/Signup';
import ForgotPassword from '../../screens/Auth/ForgetPassword';
import Notifications from '../../screens/Notification/Notification';
import AllWorkProject from '../../screens/User/Projects/MyAllProjects';
import AddWorkRequirementForm from '../../screens/User/Projects/AddRequirement';
import AllMyRequirements from '../../screens/User/AllRequirement/AllMyRequiremnts';
import AllPendingRequirements from '../../screens/User/AllRequirement/AllMyPendingReq';
import AllMyPricedRequirements from '../../screens/User/AllRequirement/AllMyPricedRequirement';
import AllMyAcceptedRequirements from '../../screens/User/AllRequirement/AllMyAcceptedRequirement';
import AllMyTokenPaidRequirements from '../../screens/User/AllRequirement/MyTokenPaidReq';
import AllPaymentRequest from '../../screens/User/AllPaymentRequest/AllPaymentRequest';
import AllMyPaidRequirements from '../../screens/User/AllRequirement/AllMyPaidRequirement';
import AllMyDeliveredRequirements from '../../screens/User/AllRequirement/AllMyDeliveredRequirement';
import AllMyRejectedRequirement from '../../screens/User/AllRequirement/AllMyRejectedRequirement';
import AllTransactions from '../../screens/User/Transaction/Transactions';
import AllExpense from '../../screens/User/Expense/AllExpense';
import AllWorkRequirement from '../../screens/User/AllWorkRequirement/AllWorkReq';
import AllPendingWorkRequirement from '../../screens/User/AllWorkRequirement/AllPendingWorkReq';
import AllInProgressWorkRequirement from '../../screens/User/AllWorkRequirement/AllINprogressworkReq';
import AllCompletedWorkRequirement from '../../screens/User/AllWorkRequirement/AllCompleteWorkReq';
import AllCancelledWorkRequirement from '../../screens/User/AllWorkRequirement/AllCancelledWorkReq';
import AllAprovedWorkReq from '../../screens/User/AllWorkRequirement/AllApprovedWorkReq';
import RoleSelection from '../../screens/Auth/LoginChoose';
import FieldExecutiveDashboard from '../../screens/FeildExcecutive/FeildExecutiveDashBoard';
import ExecutiveProfile from '../../screens/FeildExcecutive/ExecutiveProfile/ExecutiveProfile';
import AddUserScreen from '../../screens/FeildExcecutive/Users/AddUsers';
import AllUsersScreen from '../../screens/FeildExcecutive/Users/AllUserScreen';
import UsersAllProject from '../../screens/FeildExcecutive/Users/Project/UserAllProjects';
import ExcutiveAddRequirementForm from '../../screens/FeildExcecutive/Users/Project/AddExcecutiveUserRequirement';
import AddExecutiveProjectScreen from '../../screens/FeildExcecutive/Users/Project/AddExcecutiveUserProject';
import ExecutiveAllRequirement from '../../screens/FeildExcecutive/Users/Project/AllReqofExecutive';
import ExecutiveRequirementDetails from '../../screens/FeildExcecutive/Users/Project/ExecutiveReqDetail';
import SupplierDashBoard from '../../screens/SupplierFlow/SupplierDashBoard';
import SuplierAllRequirement from '../../screens/SupplierFlow/SupplierRequirement/SupplierAllRequirement';
import SupplierpendingRequirement from '../../screens/SupplierFlow/SupplierRequirement/SupplierPendingRequirement';
import AllMyBids from '../../screens/SupplierFlow/SupplierRequirement/AllMyBid';
import AllTransaction from '../../screens/SupplierFlow/SupplierRequirement/AllTrasactions';





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
        <Stack.Screen name={'RoleSelection'} component={RoleSelection} />

        
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
        {/* User::::::::: */}
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


{/* Feild Executive:::::::::::::::::::::::::: */}

        <Stack.Screen name={'FieldExecutiveDashboard'} component={FieldExecutiveDashboard} />
        <Stack.Screen name={'ExecutiveProfile'} component={ExecutiveProfile} />
        <Stack.Screen name={'AddUserScreen'} component={AddUserScreen} />
        <Stack.Screen name={'AllUsersScreen'} component={AllUsersScreen} />
        <Stack.Screen name={'UsersAllProject'} component={UsersAllProject} />
        <Stack.Screen name={'ExcutiveAddRequirementForm'} component={ExcutiveAddRequirementForm} />
        <Stack.Screen name={'AddExecutiveProjectScreen'} component={AddExecutiveProjectScreen} />
        <Stack.Screen name={'ExecutiveAllRequirement'} component={ExecutiveAllRequirement} />
        <Stack.Screen name={'ExecutiveRequirementDetails'} component={ExecutiveRequirementDetails} />

        {/* Supplier, Flow::::::::::::::::::::::: */}
        

        <Stack.Screen name={'SupplierDashBoard'} component={SupplierDashBoard} />
        <Stack.Screen name={'SuplierAllRequirement'} component={SuplierAllRequirement} />
        <Stack.Screen name={'SupplierpendingRequirement'} component={SupplierpendingRequirement} />
        <Stack.Screen name={'AllMyBids'} component={AllMyBids} />
        <Stack.Screen name={'AllTransaction'} component={AllTransaction} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
