import * as React from 'react'
import { useState, useEffect } from 'react'
import { Keyboard, Dimensions, View, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import CustomText from '../../components/TextComponent'
import color, { App_Primary_color } from '../../common/Colors/colors'
import { FONTS_FAMILY } from '../../assets/Fonts'
import IMG from '../../assets/Images'

import { useSelector } from 'react-redux'
import HomeScreen from '../../screens/Home/Home'
import Category from '../../screens/Category/Category'
import Favourite from '../../screens/Favourites/Favourites'
import ProfilePage from '../../screens/Profile/Profile'

const Tab = createBottomTabNavigator()

function TabNavigation() {
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const { isDarkMode } = useSelector(state => state.theme)


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true)
      },
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false)
      },
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: verticalScale(0),
          borderRadius: moderateScale(0),
          height: verticalScale(68),
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 20,
          shadowColor: '#000',
          paddingHorizontal: 20,
          backgroundColor: isDarkMode ? '#444' : 'white',
          display: keyboardVisible ? 'none' : 'flex', // Hide tab bar when keyboard is open
        },
      }}>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: () => <></>,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  alignItems: 'center',
                  gap: 8,
                }}>
                <Image
                  source={IMG.activeHome}
                  style={{
                    height: 56,
                    width: 56,
                    bottom:30
                    // tintColor: App_Primary_color,

                  }}
                />
               
              </View>
            ) : (
              <View
               style={{
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Image
                  source={IMG.deActiveHome}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: isDarkMode ? 'white' : '#6B7280',
                  }}
                />
                <CustomText
                  style={{
                    color: isDarkMode ? 'white' : '#6B7280',
                    fontSize: 12,
                    fontFamily: FONTS_FAMILY.Poppins_Regular,
                  }}>
                  Home
                </CustomText>
              </View>
            ),
        }}
      />
      <Tab.Screen
        name='Fav'
        component={Category}
        options={{
          tabBarLabel: () => <></>,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  alignItems: 'center',
                  gap: 8,
                }}>
                <Image
                  source={IMG.activeCategroy}
                  style={{
                    height: 56,
                    width: 56,
                    bottom:30
                  }}
                />
             
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  gap: 8,
                }}>
                <Image
                  source={IMG.deActiveCategory}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: '#6B7280',
                  }}
                />

                <CustomText
                  style={{
                    color: isDarkMode ? 'white' : '#6B7280',
                    fontSize: 12,
                    fontFamily: FONTS_FAMILY.Poppins_Regular,
                  }}>
                  Categroy
                </CustomText>
              </View>
            ),
        }}
      />
      <Tab.Screen
        name='Message'
        component={Favourite}
        options={{
          tabBarLabel: () => <></>,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  alignItems: 'center',
                  gap: 8,
                }}>
                <Image
                  source={IMG.activeFav}
                  style={{
                     height: 56,
                    width: 56,
                    bottom:30
                  }}
                />
              
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  gap: 8,
                }}>
                <Image
                  source={IMG.deActiveFav}
                  style={{
                    height: 25,
                    width: 25,
                    // tintColor: isDarkMode ? 'white' : '#6B7280'
                  }}
                />
                <CustomText
                  style={{
                    color: isDarkMode ? 'white' : '#6B7280',
                    fontSize: 12,
                    fontFamily: FONTS_FAMILY.Poppins_Regular,
                  }}>
                  Favourite
                </CustomText>
              </View>
            ),
        }}
      />

      <Tab.Screen
        name='Profile'
        component={ProfilePage}
        options={{
          tabBarLabel: () => <></>,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  alignItems: 'center',
                  gap: 8,
                }}>
                <Image
                  source={IMG.activeProfile}
                  style={{
                     height: 56,
                    width: 56,
                    bottom:30
                  }}
                />
             
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  gap: 8,
                }}>
                <Image
                  source={IMG.deActiveProfile}
                  style={{
                    height: 25,
                    width: 25,
                    // tintColor: isDarkMode ? 'white' : '#6B7280'
                  }}
                />
                <CustomText
                  style={{
                    color: isDarkMode ? 'white' : '#6B7280',
                    fontSize: 12,
                    fontFamily: FONTS_FAMILY.Poppins_Regular,
                  }}>
                  More
                </CustomText>
              </View>
            ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigation
