import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
} from 'react-native'
import IMG, { Logo } from '../../assets/Images'
import { App_Primary_color } from '../../common/Colors/colors'
import { apiGet, getItem } from '../../utils/Apis'
import { useLoginCheck } from '../../utils/Context'
import urls from '../../config/urls'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/reducer/user'
import { initializeTheme } from "../../redux/actions/themeActions";


const { width } = Dimensions.get('window')

const SplashScreen = ({ navigation }) => {
  const { loggedInby, setloggedInby } = useLoginCheck()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    loginCheck()
    initializeTheme();

    // setTimeout(() => {
    //   navigation.navigate('Onboarding')
    // }, 3000)

  }, [])

  const loginCheck = async () => {
    const token = await getItem('token')
    console.log('UserTypeToken at SPlas', token)
    if (token) {
      getUserProfile(urls.getSelf)
    } else {
      navigation.replace('Onboarding')
    }
  }

  const getUserProfile = async (endPoint) => {
    try {
      setLoading(true)
      const response = await apiGet(endPoint)
      dispatch(setUser(JSON.stringify(response?.data)))
      navigation.replace('Tab')
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <ImageBackground source={IMG.SplashScreen} style={{ flex: 1 }}>
    </ImageBackground>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  topSection: {
    flex: 1.2,
    backgroundColor: '#E8443B',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
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
    bottom: 30,
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
    color: '#000',
  },
  highlighted: {
    color: '#E8443B',
  },
  description: {
    // textAlign: 'center',
    fontSize: 14,
    color: '#555',
    marginTop: 15,
    lineHeight: 20,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#E8443B',
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
