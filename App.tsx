import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import StackNavigation from './src/routes/StackNavigation/route';
import color from './src/common/Colors/colors';
import FlashMessage from 'react-native-flash-message';
import Loader from './src/components/Loader';
import { Provider, useSelector } from 'react-redux';
import store from './src/redux/store';

const MainApp = () => {
  const loaderVisible = useSelector(state => state?.loader?.loader);

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={color.App_Primary_color}
        />
        <StackNavigation />
        <FlashMessage position="top" />
        <Loader visible={loaderVisible} />
      </SafeAreaView>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
