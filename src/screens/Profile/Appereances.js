import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { App_Primary_color } from '../../common/Colors/colors';
import { BackWhite } from '../../assets/SVGs';

const AppearancePage = ({navigation}) => {
  const [selectedTheme, setSelectedTheme] = useState('Device Settings');

  const themeOptions = [
    {
      id: 'Device Settings',
      title: 'Device Settings',
      icon: '🌗', // Half moon icon to represent device settings
    },
    {
      id: 'Light Mode',
      title: 'Light Mode',
      icon: '☀️', // Sun icon
    },
    {
      id: 'Dark Mode',
      title: 'Dark Mode',
      icon: '🌙', // Moon icon
    },
  ];

  const handleThemeSelection = (themeId) => {
    setSelectedTheme(themeId);
  };

  const renderRadioButton = (isSelected) => (
    <View style={styles.radioContainer}>
      <View style={[
        styles.radioButton,
        isSelected && styles.radioButtonSelected
      ]}>
        {isSelected && <View style={styles.radioButtonInner} />}
      </View>
    </View>
  );

  const renderThemeOption = (option) => (
    <>
    <TouchableOpacity
      key={option.id}
      style={styles.themeOption}
      onPress={() => handleThemeSelection(option.id)}
      activeOpacity={0.7}
    >
      <View style={styles.themeOptionLeft}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{option.icon}</Text>
        </View>
        <Text style={styles.themeOptionText}>{option.title}</Text>
      </View>
      {renderRadioButton(selectedTheme === option.id)}
    </TouchableOpacity>
    <View style={{height:1, width:'100%', backgroundColor:'#CCCCCC'}}/>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} />
      
      {/* Header */}
      <LinearGradient
        colors={[App_Primary_color, App_Primary_color]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton}
          onPress={()=>navigation.goBack()}
          >
          <BackWhite/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Appearance</Text>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.optionsContainer}>
          {themeOptions.map(renderThemeOption)}
        </View>
      </View>
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
    backgroundColor: '#F5F5F5',
    marginTop: -10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
  optionsContainer: {
    backgroundColor: '#F2F2F3',
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginTop:20
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    // marginTop:20
  },
  themeOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 18,
  },
  themeOptionText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  radioContainer: {
    padding: 4,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D1D6',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#5B6BC7',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#5B6BC7',
  },
});

export default AppearancePage;