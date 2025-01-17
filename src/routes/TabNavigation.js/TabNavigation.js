import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Dimensions, View } from 'react-native';
import CustomText from '../../components/TextComponent';
import color, { App_Primary_color } from '../../common/Colors/colors';
import { FONTS_FAMILY } from '../../assets/Fonts';
import Home from '../../screens/Home/Home';
import Information from '../../screens/Information';
import DamageHistory from '../../screens/DamageHistory/DamageHistory';
import Profile from '../../screens/Profile/Profile';
import { Chartgray, SearchIcons, TabHome, TabMail, TabSet } from '../../assets/SVGs';
import Row from '../../components/wrapper/row';
import EventNote from '../../screens/EventNote/EventNote';

// import NewsDetail from '../../screens/News/News';



const Tab = createBottomTabNavigator();

function TabNavigation() {

    return (
        <Tab.Navigator
            initialRouteName="Home"
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
                    // width: Dimensions.get('screen').width / 1.05,
                    backgroundColor: 'white',
                    // marginHorizontal: scale(10),
                },
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: () => <></>,
                    tabBarIcon: ({ focused }) =>
                        focused ? <Row style={{
                            backgroundColor: App_Primary_color,
                            height: 36,
                            width: 80,
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 5
                        }}>
                            <TabHome height={20} width={20} />
                            <CustomText style={{ color: 'white', fontSize: 14 }}>Home</CustomText>
                        </Row> : <TabHome height={20} width={20} />,
                }}
            />
            <Tab.Screen
                name="Search"
                component={Information}
                options={{
                    tabBarLabel: () => <></>,
                    tabBarIcon: ({ focused }) =>
                        focused ? <Row style={{
                            backgroundColor: App_Primary_color,
                            height: 36,
                            width: 80,
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 5
                        }}>
                            <SearchIcons height={20} width={20} />
                            <CustomText style={{ color: 'white', fontSize: 14 }}>Search</CustomText>
                        </Row> : <SearchIcons height={20} width={20} />,
                }}
            />


            <Tab.Screen
                name="news"
                component={DamageHistory}
                options={{
                    tabBarLabel: () => <></>,
                    tabBarIcon: ({ focused }) =>
                        focused ? <Row style={{
                            backgroundColor: App_Primary_color,
                            height: 36,
                            width: 80,
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 5
                        }}>
                            <TabMail height={20} width={20} />
                            <CustomText style={{ color: 'white', fontSize: 14 }}>Mail</CustomText>
                        </Row> : <TabMail height={20} width={20} />,
                }}
            />

            <Tab.Screen
                name="Event Note"
                component={EventNote}
                options={{
                    tabBarLabel: () => <></>,
                    tabBarIcon: ({ focused }) =>
                        focused ? <Row style={{
                            backgroundColor: App_Primary_color,
                            height: 36,
                            width: 80,
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 5
                        }}>
                            <Chartgray height={20} width={20} />
                            <CustomText style={{ color: 'white', fontSize: 14 }}>Note</CustomText>
                        </Row> : <Chartgray height={24} width={24} />,
                }}
            />


            <Tab.Screen
                name="Classified"
                component={Profile}
                options={{
                    tabBarLabel: () => <></>,
                    tabBarIcon: ({ focused }) =>
                        focused ? <Row style={{
                            backgroundColor: App_Primary_color,
                            height: 36,
                            width: 80,
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 5
                        }}>
                            <TabSet height={20} width={20} />
                            <CustomText style={{ color: 'white', fontSize: 14 }}>Profile</CustomText>
                        </Row> : <TabSet height={20} width={20} />,
                }}
            />


        </Tab.Navigator>
    );
}

export default TabNavigation;
