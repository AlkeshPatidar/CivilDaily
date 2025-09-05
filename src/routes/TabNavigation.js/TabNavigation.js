import * as React from 'react'
import { useState, useEffect } from 'react'
import { Keyboard, Dimensions, View, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import CustomText from '../../components/TextComponent'
import color, { App_Primary_color } from '../../common/Colors/colors'
import { FONTS_FAMILY } from '../../assets/Fonts'
import BrandHome from '../../screens/BrandFlow/BrandHome/BrandHome'
import IMG, { Home } from '../../assets/Images'
import MessageScreen from '../../screens/Message/MessageList'
import ProfileScreen from '../../screens/Profile/Profile'
import InfluencersScreen from '../../screens/Influencer/Influencerlist'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useSelector } from 'react-redux'

const Tab = createBottomTabNavigator()

function TabNavigation() {
  const [keyboardVisible, setKeyboardVisible] = useState(false)
      const {isDarkMode} = useSelector(state => state.theme)


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
          backgroundColor:'white',
          display: keyboardVisible ? 'none' : 'flex', // Hide tab bar when keyboard is open
        },
      }}>
      <Tab.Screen
        name='Home'
        component={BrandHome}
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
                  source={IMG.Home}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: App_Primary_color,

                  }}
                />
                <CustomText
                  style={{
                    color: App_Primary_color,
                    fontSize: 10,
                    fontFamily: FONTS_FAMILY.Poppins_Regular,
                  }}>
                  Home
                </CustomText>
              </View>
            ) : (
              <View>
                <Image
                  source={IMG.Home}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: '#6B7280',
                  }}
                />
                <CustomText
                  style={{
                    color: '#6B7280',
                    fontSize: 10,
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
        component={InfluencersScreen}
        options={{
          tabBarLabel: () => <></>,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  alignItems: 'center',
                  gap: 8,
                }}>
                {/* <Image
                  source={IMG.heart}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: App_Primary_color,
                  }}
                /> */}
                <Fontisto color={App_Primary_color} size={22} name='person'/>
                <CustomText
                  style={{
                    color: App_Primary_color,
                    fontSize: 10,
                    fontFamily: FONTS_FAMILY.Poppins_Regular,
                  }}>
                  Influencers
                </CustomText>
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  gap: 8,
                }}>
                {/* <Image
                  source={IMG.heart}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: '#6B7280',
                  }}
                /> */}
                <Fontisto color={'#6B7280'} size={22} name='person'/>

                <CustomText
                  style={{
                    color: '#6B7280',
                    fontSize: 10,
                    fontFamily: FONTS_FAMILY.Poppins_Regular,
                  }}>
                  Influencers
                </CustomText>
              </View>
            ),
        }}
      />
      <Tab.Screen
        name='Message'
        component={MessageScreen}
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
                  source={IMG.msg}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: App_Primary_color,
                  }}
                />
                <CustomText
                  style={{
                    color: App_Primary_color,
                    fontSize: 10,
                    fontFamily: FONTS_FAMILY.Poppins_Regular,
                  }}>
                  Message
                </CustomText>
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  gap: 8,
                }}>
                <Image
                  source={IMG.msg}
                  style={{
                    height: 25,
                    width: 25,
                  }}
                />
                <CustomText
                  style={{
                    color: '#6B7280',
                    fontSize: 10,
                    fontFamily: FONTS_FAMILY.Poppins_Regular,
                  }}>
                  Message
                </CustomText>
              </View>
            ),
        }}
      />

      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
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
                  source={IMG.profile}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: App_Primary_color,
                  }}
                />
                <CustomText
                  style={{
                    color: App_Primary_color,
                    fontSize: 10,
                    fontFamily: FONTS_FAMILY.Poppins_Regular,
                  }}>
                  Profile
                </CustomText>
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  gap: 8,
                }}>
                <Image
                  source={IMG.profile}
                  style={{
                    height: 25,
                    width: 25,
                  }}
                />
                <CustomText
                  style={{
                    color: '#6B7280',
                    fontSize: 10,
                    fontFamily: FONTS_FAMILY.Poppins_Regular,
                  }}>
                  Profile
                </CustomText>
              </View>
            ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigation
