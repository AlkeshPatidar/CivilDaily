import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Defs, Marker } from 'react-native-svg';
import { FONTS_FAMILY } from '../../../assets/Fonts';

const { width } = Dimensions.get('window');

const HowItsWork = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How Its Work</Text>
      
      <View style={styles.stepsContainer}>
        {/* Step 1 */}
        <View style={styles.card}>
          <View style={styles.numberCircle}>
            <Text style={styles.numberText}>1</Text>
          </View>
          <Text style={styles.cardTitle}>Calculate Your Requirment</Text>
          <Text style={styles.cardDescription}>
            Explore the possibilities with Buildo and let's embark on a journey to build a future.
          </Text>
        </View>

        {/* Arrow SVG 1 */}
        {/* <View style={styles.arrowContainer}>
          <Svg width="120" height="80" viewBox="0 0 120 80" style={styles.arrow}>
            <Defs>
              <Marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto">
                <Path d="M0,0 L0,6 L9,3 z" fill="#3B82F6" />
              </Marker>
            </Defs>
            <Path
              d="M 10 70 Q 60 10, 110 40"
              stroke="#3B82F6"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead)"
            />
          </Svg>
        </View> */}

        {/* Step 2 */}
        <View style={[styles.card, styles.cardYellow]}>
          <View style={styles.numberCircle}>
            <Text style={styles.numberText}>2</Text>
          </View>
          <Text style={styles.cardTitle}>Submit Your Project</Text>
          <Text style={styles.cardDescription}>
            Explore the possibilities with Buildo and let's embark on a journey to build a future.
          </Text>
        </View>

        {/* Arrow SVG 2 */}
        {/* <View style={styles.arrowContainer}>
          <Svg width="120" height="80" viewBox="0 0 120 80" style={styles.arrow}>
            <Path
              d="M 10 10 Q 60 70, 110 40"
              stroke="#3B82F6"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead)"
            />
          </Svg>
        </View> */}

        {/* Step 3 */}
        <View style={styles.card}>
          <View style={styles.numberCircle}>
            <Text style={styles.numberText}>3</Text>
          </View>
          <Text style={styles.cardTitle}>Final Review</Text>
          <Text style={styles.cardDescription}>
            Explore the possibilities with Buildo and let's embark on a journey to build a future.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS_FAMILY.Poppins_Bold,
    color: '#1F2937',
    textAlign: 'center',
    // marginBottom: 50,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#DBEAFE',
    borderRadius: 16,
    padding: 18,
    width: width > 768 ? '28%' : '100%',
    minWidth: 250,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardYellow: {
    backgroundColor: '#FEF3C7',
  },
  numberCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  numberText: {
    fontSize: 20,
    fontFamily: FONTS_FAMILY.Poppins_Bold,
    color: '#2563EB',
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: FONTS_FAMILY.Poppins_Bold,
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  arrowContainer: {
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    marginHorizontal: -10,
  },
});

export default HowItsWork;