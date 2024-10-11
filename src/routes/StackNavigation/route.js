import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Splash from '../../screens/Splash/Splash';
import Login from '../../screens/Auth/Login';
import SignUp from '../../screens/Auth/Signup';
import LanguageSelection from '../../screens/Choose/ChooseLanguage';
import LocationSelection from '../../screens/Choose/ChooseLocation';
import PickInterest from '../../screens/Choose/PickInterest';
import Splash1 from '../../screens/Splash/Splash1';
import ShareScreen from '../../screens/Share/ShareScreen';
import PostScreen from '../../screens/Share/PostShare';
import EditProfile from '../../screens/Auth/EditProfile';
import TabNavigation from '../TabNavigation.js/TabNavigation';
import Home from '../../screens/Home/Home';
import News from '../../screens/News/News';
import FollowingScreen from '../../screens/FollowersFollowing/Following';
import Followers from '../../screens/FollowersFollowing/Followers';
import ContactUsScreen from '../../screens/AppActivities/ContactUs';
import SendFeedBack from '../../screens/AppActivities/SendFeedBack';
import PrivacyPolicy from '../../screens/AppActivities/PrivacyPolicy';
import TermsCondition from '../../screens/AppActivities/TermsAndConditions';
import Setting from '../../screens/AppActivities/Setting';



const Stack = createNativeStackNavigator();





const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#000' },
        }}
        initialRouteName="Splash1">
        <Stack.Screen name={'Splash1'} component={Splash1} />

        <Stack.Screen name={'Splash'} component={Splash} />
        <Stack.Screen name={'SignUp'} component={SignUp} />
        <Stack.Screen name={'LanguageSelection'} component={LanguageSelection} />
        <Stack.Screen name={'LocationSelection'} component={LocationSelection} />
        <Stack.Screen name={'PickInterest'} component={PickInterest} />
        <Stack.Screen name={'Home'} component={Home} />
        <Stack.Screen name={'News'} component={News} />
        <Stack.Screen name={'ShareScreen'} component={ShareScreen} />
        <Stack.Screen name={'PostScreen'} component={PostScreen} />
        <Stack.Screen name={'EditProfile'} component={EditProfile} />
        <Stack.Screen name={'Tab'} component={TabNavigation} />
        <Stack.Screen name={'Following'} component={FollowingScreen} />
        <Stack.Screen name={'Followers'} component={Followers} />
        <Stack.Screen name={'ContactUsScreen'} component={ContactUsScreen} />
        <Stack.Screen name={'SendFeedBack'} component={SendFeedBack} />
        <Stack.Screen name={'Privacy'} component={PrivacyPolicy} />
        <Stack.Screen name={'TermsAndConditons'} component={TermsCondition} />
        <Stack.Screen name={'Setting'} component={Setting} />





        {/* ContactUsScreen */}




        
        




    



        {/* FrameWorkDetails */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
