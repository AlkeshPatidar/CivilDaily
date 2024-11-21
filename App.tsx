import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import StackNavigation from './src/routes/StackNavigation/route';
import color from './src/common/Colors/colors';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/utils/languageJSONS/i18n';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
    <SafeAreaView style={{flex: 1, backgroundColor:'white'}}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={color.white}
        />
        <StackNavigation />

        <FlashMessage position="top" />
    </SafeAreaView>

    </I18nextProvider>
  );
};

export default App;
