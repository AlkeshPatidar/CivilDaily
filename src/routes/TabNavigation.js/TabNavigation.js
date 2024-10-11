import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActiveBookMark, ActiveHome, ActiveMessage, ActiveNew, ActivePamplet, ClassifiedIcon, InActiveBookMark, InActiveHome, InActiveMessage, InActiveNew, InActivePamplet, TabHome, TabMsg, TabPlay, TabProfile, TabSearch } from '../../assets/SVGs';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Dimensions, View } from 'react-native';
import EditProfile from '../../screens/Auth/EditProfile';
import CustomText from '../../components/TextComponent';
import color, { App_Primary_color } from '../../common/Colors/colors';
import { FONTS_FAMILY } from '../../assets/Fonts';
import Home from '../../screens/Home/Home';
import News from '../../screens/News/News';
import NetWorking from '../../screens/Networking/NetWorking';
import Classified from '../../screens/Classified/Classified';
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
                    // width: Dimensions.get('screen').width / 1.05,
                    backgroundColor: 'white',
                    // marginHorizontal: scale(10),
                },
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
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
                name="Networking"
                component={NetWorking}
                options={{
                    tabBarLabel: () => <CustomText style={{ color: 'gray', fontSize: 10, marginTop: -10, marginBottom: 20, fontFamily: FONTS_FAMILY.Comfortaa_SemiBold }}>Networking</CustomText>,
                    tabBarIcon: ({ focused }) =>
                        focused ? <View>
                            <View style={{ height: 2, width: 50, backgroundColor: App_Primary_color, position: 'absolute', bottom: 32, right: -15, borderRadius: 6 }} />
                            <TabSearch height={20} width={20} />
                        </View> : <TabSearch height={20} width={20} />,
                }}
            />
            {/* <Tab.Screen
                name="Coverage"
                component={Home}
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
            /> */}

            <Tab.Screen
                name="news"
                component={News}
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
                name="Classified"
                component={Classified}
                options={{
                    tabBarLabel: () => <CustomText style={{ color: 'gray', fontSize: 10, marginTop: -10, marginBottom: 20, fontFamily: FONTS_FAMILY.Comfortaa_SemiBold }}>Classified</CustomText>,
                    tabBarIcon: ({ focused }) =>
                        focused ? <View>
                            <View style={{ height: 2, width: 50, backgroundColor: App_Primary_color, position: 'absolute', bottom: 32, right: -15, borderRadius: 6 }} />
                            <ClassifiedIcon height={20} width={20} />
                        </View> : <ClassifiedIcon height={20} width={20} />,
                }}
            />

        </Tab.Navigator>
    );
}

export default TabNavigation;
