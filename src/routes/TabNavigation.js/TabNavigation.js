import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActiveBookMark, ActiveHome, ActiveMessage, ActiveNew, ActivePamplet, InActiveBookMark, InActiveHome, InActiveMessage, InActiveNew, InActivePamplet, TabHome, TabMsg, TabPlay, TabProfile, TabSearch } from '../../assets/SVGs';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Dimensions, View } from 'react-native';
import NewsApp from '../../screens/NewsApp/NewsScreen';
import EditProfile from '../../screens/Auth/EditProfile';
import CustomText from '../../components/TextComponent';
import color, { App_Primary_color } from '../../common/Colors/colors';
import { FONTS_FAMILY } from '../../assets/Fonts';
import NewsDetail from '../../screens/NewsApp/NewsDetail';


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
                    // width: Dimensions.get('screen').width / 1.05,
                    backgroundColor: 'white',
                    // marginHorizontal: scale(10),
                },
            }}>
            <Tab.Screen
                name="Home"
                component={NewsApp}
                options={{
                    tabBarLabel: () => <CustomText style={{ color: 'gray', fontSize: 10, marginTop: -10, marginBottom: 20, fontFamily: FONTS_FAMILY.Comfortaa_SemiBold }}>Home</CustomText>,
                    tabBarIcon: ({ focused }) =>
                        focused ? <View>
                            <View style={{ height: 2, width: 50, backgroundColor: App_Primary_color, position: 'absolute', bottom: 32, right: -15, borderRadius: 6 }} />
                            <TabHome height={20} width={20} />
                        </View> : <TabHome height={20} width={20} />,
                }}
            />
            <Tab.Screen
                name="Explore"
                component={NewsDetail}
                options={{
                    tabBarLabel: () => <CustomText style={{ color: 'gray', fontSize: 10, marginTop: -10, marginBottom: 20, fontFamily: FONTS_FAMILY.Comfortaa_SemiBold }}>Explore</CustomText>,
                    tabBarIcon: ({ focused }) =>
                        focused ? <View>
                            <View style={{ height: 2, width: 50, backgroundColor: App_Primary_color, position: 'absolute', bottom: 32, right: -15, borderRadius: 6 }} />
                            <TabSearch height={20} width={20} />
                        </View> : <TabSearch height={20} width={20} />,
                }}
            />
            <Tab.Screen
                name="Coverage"
                component={NewsApp}
                options={{
                    tabBarLabel: () => <CustomText style={{ color: 'gray', fontSize: 10, marginTop: -10, marginBottom: 20, fontFamily: FONTS_FAMILY.Comfortaa_SemiBold }}>Coverage</CustomText>,
                    tabBarIcon: ({ focused }) =>
                        focused ?
                            <View>
                                <View style={{ height: 2, width: 50, backgroundColor: App_Primary_color, position: 'absolute', bottom: 32, right: -15, borderRadius: 6 }} />
                                <TabPlay height={20} width={20} />
                            </View>
                            : <TabPlay height={20} width={20} />,
                }}
            />

            <Tab.Screen
                name="news"
                component={NewsDetail}
                options={{
                    tabBarLabel: () => <CustomText style={{ color: 'gray', fontSize: 10, marginTop: -10, marginBottom: 20, fontFamily: FONTS_FAMILY.Comfortaa_SemiBold }}>News</CustomText>,
                    tabBarIcon: ({ focused }) =>
                        focused ? <View>
                            <View style={{ height: 2, width: 50, backgroundColor: App_Primary_color, position: 'absolute', bottom: 32, right: -15, borderRadius: 6 }} />
                            <TabMsg height={20} width={20} />
                        </View> : <TabMsg height={20} width={20} />,
                }}
            />

            <Tab.Screen
                name="Profile"
                component={EditProfile}
                options={{
                    tabBarLabel: () => <CustomText style={{ color: 'gray', fontSize: 10, marginTop: -10, marginBottom: 20, fontFamily: FONTS_FAMILY.Comfortaa_SemiBold }}>Profile</CustomText>,
                    tabBarIcon: ({ focused }) =>
                        focused ? <View>
                            <View style={{ height: 2, width: 50, backgroundColor: App_Primary_color, position: 'absolute', bottom: 32, right: -15, borderRadius: 6 }} />
                            <TabProfile height={20} width={20} />
                        </View> : <TabProfile height={20} width={20} />,
                }}
            />

        </Tab.Navigator>
    );
}

export default TabNavigation;
