import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import StackNavigation from './src/routes/StackNavigation/route';
import color from './src/common/Colors/colors';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'white'}}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={color.white}
        />
        <StackNavigation />

        <FlashMessage position="top" />
    </SafeAreaView>
  );
};

export default App;
