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
import { App_Primary_color } from '../../common/Colors/colors'

const {width} = Dimensions.get('window')

const OnboardingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={App_Primary_color} barStyle='light-content' />

      {/* Top Red Section */}
      <View style={styles.topSection}>
        <Text style={styles.skipText}>Skip</Text>
        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>
        <Image
          source={IMG.onBoardingImage} // replace with your image path
          style={styles.illustration}
          resizeMode='contain'
        />

        {/* Pagination Dots */}
      </View>

      {/* Bottom White Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.title}>
          Connect Friend{' '}
          <Text style={styles.highlighted}>Easily &{'\n'}Quickly</Text>
        </Text>
        <Text style={styles.description}>
          Explore the power of real-time advertising with Digiboard. Instantly
          connect with your audience across Indonesia.
        </Text>

        <TouchableOpacity style={styles.button}
        onPress={()=>navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    bottom:30
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
