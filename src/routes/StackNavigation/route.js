import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import Splash1 from '../../screens/Splash/Splash1';
import Login from '../../screens/Auth/Login';
import SignUp from '../../screens/Auth/SignUp';
import Home from '../../screens/Home/Home';
import Information from '../../screens/Information';
import Notification from '../../screens/Notification/Notification';
import AddIssues from '../../screens/AddIssues/AddIssues';
import DamageHistory from '../../screens/DamageHistory/DamageHistory';
import Profile from '../../screens/Profile/Profile';
import Scan from '../../screens/ScanScreen/Scan';
import TabNavigation from '../TabNavigation.js/TabNavigation';
import ProductDetail from '../../screens/Home/ProductDetailPage';




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
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'SignUp'} component={SignUp} />
        <Stack.Screen name={'Home'} component={Home} />
        <Stack.Screen name={'productDetail'} component={ProductDetail} />

        <Stack.Screen name={'Information'} component={Information} />
        <Stack.Screen name={'Notification'} component={Notification} />
        <Stack.Screen name={'AddIssues'} component={AddIssues} />
        <Stack.Screen name={'DamageHistory'} component={DamageHistory} />
        <Stack.Screen name={'Profile'} component={Profile} />
        <Stack.Screen name={'Scan'} component={Scan} />
        <Stack.Screen name={'Tab'} component={TabNavigation} />











       










        {/* ContactUsScreen */}




        
        




    



        {/* FrameWorkDetails */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
