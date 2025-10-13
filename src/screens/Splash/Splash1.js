import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native'
import IMG from '../../assets/Images'
import { App_Primary_color, darkMode25, white } from '../../common/Colors/colors'
import { useSelector } from 'react-redux'
import { CartOnboarding } from '../../assets/SVGs'
import CustomText from '../../components/TextComponent'
import { FONTS_FAMILY } from '../../assets/Fonts'
import SpaceBetweenRow from '../../components/wrapper/spacebetween'
import CustomButton from '../../components/Button'

const { width } = Dimensions.get('window')

const OnboardingScreen = ({ navigation }) => {
  const { isDarkMode } = useSelector(state => state.theme)


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'
    },
    topSection: {
      backgroundColor: 'white',
      alignItems: 'center',
      alignItems: 'center'
    },
    skipText: {
      alignSelf: 'flex-end',
      color: '#fff',
      marginBottom: 20,
      fontSize: 14,
      fontWeight: '600',
    },
    illustration: {
      width: '100%',
      height: 200,
    },
    dotsContainer: {
      flexDirection: 'row',
      // marginTop: 20,
      gap: 6,
      bottom: 30
    },
    dot: {
      width: 40,
      height: 5,
      borderRadius: 4,
      backgroundColor: '#fff',
      opacity: 0.5,
    },
    activeDot: {
      width: 16,
      borderRadius: 4,
      opacity: 1,
    },
    bottomSection: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 25,
      paddingTop: 30,
      // alignItems: 'center',
    },
    title: {
      fontSize: 22,
      fontWeight: '600',
      // textAlign: 'center',
      color: isDarkMode ? white : '#000',
    },
    highlighted: {
      color: App_Primary_color,
    },
    description: {
      // textAlign: 'center',
      fontSize: 14,
      color: isDarkMode ? white : '#555',
      marginTop: 15,
      lineHeight: 20,
    },
    button: {
      marginTop: 30,
      backgroundColor: App_Primary_color,
      paddingVertical: 12,
      paddingHorizontal: 40,
      borderRadius: 6,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
  })
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={App_Primary_color} barStyle='light-content' />

      <View style={{ alignItems: 'center', marginTop: 150 }}>
        <CartOnboarding />
        <View style={{
          alignItems: 'center',
          gap: 20,
          marginTop: 20
        }}>
          <CustomText style={{
            fontFamily: FONTS_FAMILY.Poppins_Bold
          }}>Welcome to Grocery</CustomText>
          <CustomText style={{
            textAlign: 'center',
            color: '#777777',
            fontSize: 14,
            fontFamily: FONTS_FAMILY.Poppins_Regular
          }}>
            {/* Get your grocery needs at your service within a minute. fast, efficient, and convenient. */}

            Shop smarter with exclusive deals and same-day delivery. Your groceries, fresh and affordable — right at your doorstep.
          </CustomText>

        </View>

      </View>

      <SpaceBetweenRow style={{
        width:'100%',
        paddingHorizontal:30,
     position:'absolute',
     bottom:40
      }}>
        <CustomButton style={{
            width: 140,
            borderRadius:40,
            backgroundColor:'#F2F2F3'
        }}
        title={'Skip'}
        txtColor={{
          color:'black'
        }}
        />
        <CustomButton
          style={{
            width: 140,
            borderRadius:40,
          }}
        title={'Next'}
        onPress={()=>navigation.navigate('Login')}

        />
      </SpaceBetweenRow>

    </View>
  )
}

export default OnboardingScreen


