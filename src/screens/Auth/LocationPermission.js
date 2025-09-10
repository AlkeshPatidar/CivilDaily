import React, { useState } from 'react'
import { View, TouchableOpacity, StatusBar, Alert } from 'react-native'
import CustomText from '../../components/TextComponent'
import { FONTS_FAMILY } from '../../assets/Fonts'
import CustomButton from '../../components/Button'
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import { BackIcon, LocationBanner } from '../../assets/SVGs'
import { App_Primary_color, dark33, darkMode25, white } from '../../common/Colors/colors'
import { useSelector } from 'react-redux'

const LocationPermissionScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false)

    const requestLocationPermission = async () => {
        navigation.navigate('Tab')
        return
        try {
            setIsLoading(true)
            const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

            switch (result) {
                case RESULTS.GRANTED:
                    console.log('Location permission granted')
                    // Navigate to next screen
                    navigation.navigate('NextScreen') // Replace with your next screen
                    break
                case RESULTS.DENIED:
                    Alert.alert(
                        'Permission Denied',
                        'Location permission is required for better experience'
                    )
                    break
                case RESULTS.BLOCKED:
                    Alert.alert(
                        'Permission Blocked',
                        'Please enable location permission from settings'
                    )
                    break
            }
        } catch (error) {
            console.log('Permission error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const skipLocation = () => {
        // Navigate without permission
        navigation.navigate('NextScreen') // Replace with your next screen
    }

    const renderHeader = () => {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingTop: 20,
                paddingBottom: 20,
            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ padding: 5 }}>
                    <BackIcon />
                </TouchableOpacity>

                <TouchableOpacity onPress={skipLocation}>
                    <CustomText style={{
                        fontSize: 16,
                        color: '#666',
                        fontFamily: FONTS_FAMILY.Poppins_Medium,
                    }}>
                        ?
                    </CustomText>
                </TouchableOpacity>
            </View>
        )
    }


    const { isDarkMode } = useSelector(state => state.theme)

    const renderContent = () => {
        return (
            <View style={{
                flex: 1,
                paddingHorizontal: 20,
                alignItems: 'center',
                backgroundColor: isDarkMode? dark33:'white'
            }}>
                <View style={{
                    marginBottom:100
                }}>

                    <LocationBanner />
                </View>

                {/* Allow Google Maps Button */}
                <CustomButton
                    style={{
                        backgroundColor: App_Primary_color,
                        borderRadius: 25,
                        height: 50,
                        width: '100%',
                        marginBottom: 16,
                    }}
                    title={'Allow Google Maps'}
                    titleStyle={{
                        color: '#ffffff',
                        fontSize: 16,
                        fontWeight: '600',
                        fontFamily: FONTS_FAMILY.Poppins_SemiBold,
                    }}
                    onPress={requestLocationPermission}
                    disabled={isLoading}
                />

                {/* Set Manually Button */}
                <TouchableOpacity
                    style={{
                        backgroundColor:isDarkMode? darkMode25:  '#F5F5F5',
                        borderRadius: 25,
                        height: 50,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={skipLocation}>
                    <CustomText
                        style={{
                            color:isDarkMode?white: '#333',
                            fontSize: 16,
                            fontWeight: '600',
                            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
                        }}>
                        Set Manually
                    </CustomText>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View
            style={{
                backgroundColor:isDarkMode? dark33: '#ffffff',
                flex: 1,
            }}>
            <StatusBar
                barStyle={isDarkMode? 'light-content' :'dark-content'}
                backgroundColor={isDarkMode?dark33: "#ffffff"}
            />
            {renderHeader()}
            {renderContent()}


        </View>
    )
}

export default LocationPermissionScreen