import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const onboardingData = [
    {
      id: '1',
      title: 'Connect Friend Easily &\nQuickly',
      subtitle: 'Explore the power of real-time voice chatting with\nLogicam you can connect with your audience\nacross multiple.',
      illustration: 'connect-friends',
    },
    // Add more slides here if needed
  ];

  const renderOnboardingItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        {/* Status bar area */}
        <View style={styles.statusBarArea}>
          <View style={styles.statusBarContent}>
            <Text style={styles.statusTime}>16:41</Text>
            <View style={styles.statusRight}>
              <View style={styles.signalBars}>
                <View style={[styles.bar, styles.bar1]} />
                <View style={[styles.bar, styles.bar2]} />
                <View style={[styles.bar, styles.bar3]} />
                <View style={[styles.bar, styles.bar4]} />
              </View>
              <Text style={styles.batteryText}>100%</Text>
            </View>
          </View>
        </View>

        {/* Skip button */}
        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        {/* Main illustration area */}
        <View style={styles.illustrationContainer}>
          {/* Phone mockup */}
          <View style={styles.phoneMockup}>
            <View style={styles.phoneScreen}>
              {/* Phone status bar */}
              <View style={styles.phoneStatusBar}>
                <View style={styles.phoneSignal} />
                <View style={styles.phoneBattery} />
              </View>
              
              {/* Profile image */}
              <View style={styles.profileImageContainer}>
                <View style={styles.profileImage}>
                  <View style={styles.profileIcon} />
                </View>
              </View>
            </View>
          </View>

          {/* Character illustration */}
          <View style={styles.characterContainer}>
            <View style={styles.character}>
              {/* Head */}
              <View style={styles.head}>
                <View style={styles.hair} />
                <View style={styles.face}>
                  <View style={styles.eye} />
                  <View style={styles.eye} />
                </View>
              </View>
              
              {/* Body */}
              <View style={styles.body}>
                <View style={styles.leftArm}>
                  <View style={styles.hand}>
                    {/* Phone in hand */}
                    <View style={styles.phoneInHand} />
                  </View>
                </View>
                <View style={styles.rightArm}>
                  <View style={styles.hand}>
                    {/* Document in hand */}
                    <View style={styles.document}>
                      <View style={styles.docLine} />
                      <View style={styles.docLine} />
                      <View style={styles.docLine} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Floating elements */}
          <View style={styles.floatingElement1}>
            <View style={styles.shield} />
          </View>
          <View style={styles.floatingElement2}>
            <View style={styles.message} />
          </View>
        </View>

        {/* Page indicator */}
        <View style={styles.pageIndicator}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>

        {/* Get Started button */}
        <TouchableOpacity style={styles.getStartedButton}>
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setCurrentIndex(roundIndex);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#E53E3E" barStyle="light-content" />
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderOnboardingItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E53E3E',
  },
  slide: {
    width,
    height,
    backgroundColor: '#E53E3E',
    paddingHorizontal: 20,
  },
  statusBarArea: {
    height: 44,
    paddingTop: 8,
  },
  statusBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  statusTime: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  statusRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signalBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 8,
  },
  bar: {
    width: 3,
    backgroundColor: 'white',
    marginRight: 2,
    borderRadius: 1,
  },
  bar1: { height: 4 },
  bar2: { height: 6 },
  bar3: { height: 8 },
  bar4: { height: 10 },
  batteryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  skipText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  phoneMockup: {
    position: 'absolute',
    top: 40,
    left: 60,
    width: 100,
    height: 180,
    backgroundColor: '#333',
    borderRadius: 15,
    padding: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
  },
  phoneStatusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  phoneSignal: {
    width: 15,
    height: 8,
    backgroundColor: '#666',
    borderRadius: 2,
  },
  phoneBattery: {
    width: 20,
    height: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    backgroundColor: '#E0E0E0',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#666',
    borderRadius: 15,
  },
  characterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  character: {
    alignItems: 'center',
  },
  head: {
    alignItems: 'center',
    marginBottom: 10,
  },
  hair: {
    width: 60,
    height: 30,
    backgroundColor: '#2C1810',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginBottom: -5,
  },
  face: {
    width: 50,
    height: 50,
    backgroundColor: '#FFD4A3',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  eye: {
    width: 6,
    height: 6,
    backgroundColor: '#2C1810',
    borderRadius: 3,
  },
  body: {
    width: 80,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  leftArm: {
    position: 'absolute',
    left: -25,
    top: 20,
  },
  rightArm: {
    position: 'absolute',
    right: -25,
    top: 20,
  },
  hand: {
    width: 25,
    height: 25,
    backgroundColor: '#FFD4A3',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneInHand: {
    width: 15,
    height: 20,
    backgroundColor: '#333',
    borderRadius: 3,
  },
  document: {
    width: 18,
    height: 22,
    backgroundColor: 'white',
    borderRadius: 2,
    padding: 2,
    justifyContent: 'space-around',
  },
  docLine: {
    height: 2,
    backgroundColor: '#666',
    borderRadius: 1,
  },
  floatingElement1: {
    position: 'absolute',
    top: 80,
    right: 50,
  },
  shield: {
    width: 30,
    height: 35,
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  floatingElement2: {
    position: 'absolute',
    top: 200,
    right: 30,
  },
  message: {
    width: 35,
    height: 25,
    backgroundColor: 'white',
    borderRadius: 8,
    borderBottomLeftRadius: 2,
  },
  pageIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'white',
    width: 24,
    borderRadius: 4,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  getStartedButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  getStartedText: {
    color: '#E53E3E',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OnboardingScreen;