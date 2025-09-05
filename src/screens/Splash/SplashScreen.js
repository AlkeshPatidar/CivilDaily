import React, {useEffect, useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  StatusBar,
} from 'react-native'
import IMG, {Logo} from '../../assets/Images'
import {App_Primary_color} from '../../common/Colors/colors'
import {apiGet, getItem} from '../../utils/Apis'
import {useLoginCheck} from '../../utils/Context'
import urls from '../../config/urls'
import {useDispatch} from 'react-redux'
import {setUser} from '../../redux/reducer/user'
import { initializeTheme } from "../../redux/actions/themeActions";


const {width} = Dimensions.get('window')

const SplashScreen = ({navigation}) => {
  const {loggedInby, setloggedInby} = useLoginCheck()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    roleCheck()
        initializeTheme();

  }, [])

  const roleCheck = async () => {
    const UserType = await getItem('UserType')
    const token = await getItem('token')
    console.log('UserType at SPlas', UserType)
    if (token) {
      if (UserType == 'Influencers') {
        setloggedInby('Influencers')
        getUserProfile(urls.getInfluencerProfile, 'Influencers')
      } else {
        setloggedInby('Brands')
        getUserProfile(urls.getBrandProfile, 'Brands')
      }
    } else {
      navigation.replace('Splash1')
    }
  }

  const getUserProfile = async (endPoint, role) => {
    try {
      setLoading(true)
      const response = await apiGet(endPoint)
      dispatch(setUser(JSON.stringify(response?.data)))
      if (role == 'Influencers') {
        navigation.replace('InfluenceTab')
      } else {
        navigation.replace('TabBrand')
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={App_Primary_color} barStyle='light-content' />

      <Image
        source={IMG.Logo}
        style={{
          height: 56,
          width: 128,
        }}
      />
      {loading && (
        <ActivityIndicator
          size={'large'}
          color={'white'}
          style={{
            position: 'absolute',
            bottom: 30,
          }}
        />
      )}
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App_Primary_color,
    alignItems: 'center',
    justifyContent: 'center',
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
