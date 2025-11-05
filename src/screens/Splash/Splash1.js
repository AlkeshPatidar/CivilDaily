import React, { useRef, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  FlatList,
  Animated,
} from 'react-native'
import IMG from '../../assets/Images'
import { App_Primary_color, darkMode25, white } from '../../common/Colors/colors'
import { useSelector } from 'react-redux'
import { CartOnboarding } from '../../assets/SVGs'
import CustomText from '../../components/TextComponent'
import { FONTS_FAMILY } from '../../assets/Fonts'
import SpaceBetweenRow from '../../components/wrapper/spacebetween'
import CustomButton from '../../components/Button'

const { width, height } = Dimensions.get('window')

// Onboarding data
const onboardingData = [
  {
    id: '1',
    title: 'Providing the Construction',
    highlight: 'Solution',
    description: 'We are Beyond, your trusted partner in the world of construction. With a legacy of excellence and a commitment to quality, we turn your visions into reality',
    // image: 'https://thumbs.dreamstime.com/b/lots-groceries-17001094.jpg', // Grocery shopping
    image: IMG.onboarding1, // Grocery shopping

    backgroundColor: '#E8F5E9',
  },
  {
    id: '2',
    title: 'Best Charges',
    highlight: 'Guaranteed',
    description: 'We are Beyond, your trusted partner in the world of construction. With a legacy of excellence and a commitment to quality, we turn your visions into reality',
    // image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMEOkVGq2zhdPRZbmxy0D8QbtTizBliR2xpQ&s', // Price tags
    image: IMG.onboarding2, // Grocery shopping

    backgroundColor: '#FFF3E0',
  },
  // {
  //   id: '3',
  //   title: 'Fast Delivery',
  //   highlight: 'Assured',
  //   description: 'We are Beyond, your trusted partner in the world of construction. With a legacy of excellence and a commitment to quality, we turn your visions into reality',
  //   image: 'https://img.freepik.com/free-psd/full-shopping-cart-groceries_191095-79355.jpg?semt=ais_hybrid&w=740&q=80', // Delivery
  //   backgroundColor: '#E3F2FD',
  // },
]

const OnboardingScreen = ({ navigation }) => {
  const { isDarkMode } = useSelector(state => state.theme)
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current
  const flatListRef = useRef(null)

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index)
    }
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      })
    } else {
      // navigation.navigate('Login')
      // 
      navigation.navigate('RoleSelection')
    }
  }

  const handleSkip = () => {
    navigation.navigate('RoleSelection')
  }

  const OnboardingItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ]

    const imageScale = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
      extrapolate: 'clamp',
    })

    const imageOpacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    })

    return (
      <View style={styles.slideContainer}>
        <View style={[styles.imageContainer, { backgroundColor: item.backgroundColor }]}>
          <Animated.Image
            source={item.image }
            style={[
              styles.illustration,
              {
                transform: [{ scale: imageScale }],
                opacity: imageOpacity,
              },
            ]}
            resizeMode="cover"
          />
        </View>

        <View style={styles.contentContainer}>
          <CustomText style={styles.title}>
            {item.title}{' '}
            <CustomText style={styles.highlighted}>{item.highlight}</CustomText>
          </CustomText>
          <CustomText style={styles.description}>
            {item.description}
          </CustomText>
        </View>
      </View>
    )
  }

  const Pagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {onboardingData.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ]

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 40, 10],
            extrapolate: 'clamp',
          })

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          })

          return (
            <Animated.View
              key={index.toString()}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                  backgroundColor: App_Primary_color,
                },
              ]}
            />
          )
        })}
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? darkMode25 : '#fff',
    },
    slideContainer: {
      width: width,
      flex: 1,
    },
    imageContainer: {
      height: height * 0.44,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      overflow: 'hidden',
    },
    illustration: {
      width: width ,
      height: width ,
      borderRadius: 20,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 30,
      paddingTop: 40,
      justifyContent: 'flex-start',
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: isDarkMode ? white : '#000',
      fontFamily: FONTS_FAMILY.Poppins_Bold,
      lineHeight: 36,
    },
    highlighted: {
      color: App_Primary_color,
      fontFamily: FONTS_FAMILY.Poppins_Bold,
    },
    description: {
      fontSize: 15,
      color: isDarkMode ? white : '#666',
      marginTop: 15,
      lineHeight: 24,
      fontFamily: FONTS_FAMILY.Poppins_Regular,
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      marginTop: 20,
    },
    dot: {
      height: 10,
      borderRadius: 5,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 40,
      left: 0,
      right: 0,
      paddingHorizontal: 30,
    },
    skipButton: {
      width: 140,
      borderRadius: 40,
      backgroundColor: '#F2F2F3',
    },
    nextButton: {
      width: 140,
      borderRadius: 40,
      backgroundColor: App_Primary_color,
    },
    skipText: {
      color: 'black',
      fontFamily: FONTS_FAMILY.Poppins_Medium,
    },
    nextText: {
      color: white,
      fontFamily: FONTS_FAMILY.Poppins_Medium,
    },
  })

  return (
    <View style={styles.container}>
      <StatusBar 
        backgroundColor={isDarkMode ? darkMode25 : onboardingData[currentIndex].backgroundColor} 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
      />

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={({ item, index }) => <OnboardingItem item={item} index={index} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
      />

      <View style={{ paddingHorizontal: 30, paddingBottom: 20, position: 'absolute', bottom: 120, width: '100%'  }}>
        <Pagination />
      </View>

      <SpaceBetweenRow style={styles.buttonContainer}>
        <CustomButton
          style={styles.skipButton}
          title="Skip"
          txtColor={styles.skipText}
          onPress={handleSkip}
        />
        <CustomButton
          style={styles.nextButton}
          title={currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          txtColor={styles.nextText}
          onPress={handleNext}
        />
      </SpaceBetweenRow>
    </View>
  )
}

export default OnboardingScreen