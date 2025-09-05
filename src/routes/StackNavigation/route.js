import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash1 from '../../screens/Splash/Splash1';
import Login from '../../screens/Auth/Login';
// import SignUp from '../../screens/Auth/SignUp';
import Notification from '../../screens/Notification/Notification';
import Profile from '../../screens/Profile/Profile';
// import TabNavigation from '../TabNavigation.js/TabNavigation';
// import Reminder from '../../screens/EventNote/GetAllEventsRemainder';
// import AddNoteScreen from '../../screens/EventNote/EventNote';
import OtpScreen from '../../screens/Auth/OtpScreen';
import MessageScreen from '../../screens/Message/MessageList';
// import OnboardingScreen from '../../screens/Splash/Onboarding';
import ChatScreen from '../../screens/Message/ChatScreen';
import RestaurantScreen from '../../screens/Restaurent/Restaurant';
import RestDetailScreen from '../../screens/Restaurent/DetailsRest';
import CampaignReqScreen from '../../screens/Auth/CampaignReuirement';
import BrandHome from '../../screens/BrandFlow/BrandHome/BrandHome';
import BrandBokingList from '../../screens/BrandFlow/BrandHome/BookingList';
import CampaignList from '../../screens/CampaignList/CampaignList';
import InfluencersScreen from '../../screens/Influencer/Influencerlist';
import InfluencerHome from '../../screens/InfluencerFlow/InfluencerHome/InfluencerHome';
import OfferDetail from '../../screens/Restaurent/OfferDetail';
import ProfileScreen from '../../screens/Profile/Profile';
import CreateCampaign from '../../screens/CreateCampaign/CreateCampaign';
import BrandOfferDetail from '../../screens/CreateCampaign/BrandCampaignDetail';
import TabNavigation from '../TabNavigation.js/TabNavigation';
import InfluenceTab from '../TabNavigation.js/InfluencerTab';
import BrandDetailMap from '../../screens/InfluencerFlow/BrandDetailMap';
import TrashScreen from '../../Trash/Trash';
import SplashScreen from '../../screens/Splash/SplashScreen';
import InfluencerCapaignListOfaBrand from '../../screens/InfluencerFlow/InfluencerCapaignListOfaBrand/InfluencerCapaignListOfaBrand';
import ForgotPassword from '../../screens/Auth/ForgetPassword';
import InfluencerOfferDetail from '../../screens/InfluencerFlow/InfluencerOfferDetail/InfluencerOfferDetail';
import InfluencerCampaignDetail from '../../screens/InfluencerFlow/InfluencerCampaignDetail/InfluencerCampaignDetail';
import AtedessReq from '../../screens/InfluencerFlow/AttendeeesReq/AttendeesReq';
import EditInfluencerProfileScreen from '../../screens/Profile/EditInfluencerProfile';
import AddOffer from '../../screens/CreateCampaign/AddOffer';
import BrandCampaignDetail from '../../screens/CreateCampaign/BrandCampaignDetail';
import BrandOfferDetialScreen from '../../screens/CreateCampaign/BrandOfferDetail';
import TermsAndConditionsScreen from '../../screens/StaticScreens/TermsAndCondition';
import PrivacyPolicyScreen from '../../screens/StaticScreens/PrivacyPolicy';
import About from '../../screens/StaticScreens/About';
import Support from '../../screens/StaticScreens/Support';
import SignUp from '../../screens/Auth/Signup';
import Settings from '../../screens/StaticScreens/Settings';




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
        <Stack.Screen name={'Splash1'} component={Splash1} />
        {/* <Stack.Screen name={'OnboardingScreen'} component={OnboardingScreen} /> */}

        
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'SignUp'} component={SignUp} />
        <Stack.Screen name={'Otpscreen'} component={OtpScreen} />
        <Stack.Screen name={'ForgotPassword'} component={ForgotPassword} />




        <Stack.Screen name={'MessageScreen'} component={MessageScreen} />

        <Stack.Screen name={'Notification'} component={Notification} />
        <Stack.Screen name={'Profile'} component={Profile} />
        {/* <Stack.Screen name={'Reminder'} component={Reminder} /> */}
        {/* <Stack.Screen name={'AddNoteScreen'} component={AddNoteScreen} /> */}
        <Stack.Screen name={'ChatScreen'} component={ChatScreen} />
        <Stack.Screen name={'RestaurantScreen'} component={RestaurantScreen} />
        <Stack.Screen name={'RestDetailScreen'} component={RestDetailScreen} />
        <Stack.Screen name={'CampaignReqScreen'} component={CampaignReqScreen} />
        <Stack.Screen name={'BrandHome'} component={BrandHome} />
        <Stack.Screen name={'BrandBokingList'} component={BrandBokingList} />
        <Stack.Screen name={'CampaignList'} component={CampaignList} />

        <Stack.Screen name={'InfluencersScreen'} component={InfluencersScreen} />
        <Stack.Screen name={'InfluencerHome'} component={InfluencerHome} />
        <Stack.Screen name={'OfferDetail'} component={OfferDetail} />
        <Stack.Screen name={'ProfileScreen'} component={ProfileScreen} />

        <Stack.Screen name={'CreateCampaign'} component={CreateCampaign} />
        <Stack.Screen name={'BrandCapmaignDetail'} component={BrandCampaignDetail} />
        <Stack.Screen name={'TabBrand'} component={TabNavigation} />
        <Stack.Screen name={'InfluenceTab'} component={InfluenceTab} />
        <Stack.Screen name={'BrandDetailMap'} component={BrandDetailMap} />

        <Stack.Screen name={'TrashScreen'} component={TrashScreen} />

        <Stack.Screen name={'InfluencerCapaignListOfaBrand'} component={InfluencerCapaignListOfaBrand} />

        <Stack.Screen name={'InfluencerOfferDetail'} component={InfluencerOfferDetail} />
        <Stack.Screen name={'InfluencerCampaignDetail'} component={InfluencerCampaignDetail} />
        <Stack.Screen name={'AtedessReq'} component={AtedessReq} />
        <Stack.Screen name={'EditInfluencerProfileScreen'} component={EditInfluencerProfileScreen} />
        <Stack.Screen name={'AddOffer'} component={AddOffer} />
        <Stack.Screen name={'BrandOfferDetail'} component={BrandOfferDetialScreen} />
        <Stack.Screen name={'TermsAndConditionsScreen'} component={TermsAndConditionsScreen} />
        <Stack.Screen name={'PrivacyPolicyScreen'} component={PrivacyPolicyScreen} />
        <Stack.Screen name={'About'} component={About} />
        <Stack.Screen name={'Support'} component={Support} />
        <Stack.Screen name={'Settings'} component={Settings} />


        {/* FrameWorkDetails */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
