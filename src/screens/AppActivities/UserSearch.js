import React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { Back, NavBack } from '../../assets/SVGs';
import Row from '../../components/wrapper/row';
import { moderateScale } from 'react-native-size-matters';

const data = [
  {
    id: '1',
    title: 'ಕಿನ್ನಿಗೋಳಿ: ವಿಜಯೋತ್ಶಾವದ ಶ್ರೀ ಶಾರದಾ ಮಾತೆಯ ವಿಶಜ್ಞಾನ ಶೋಭಾಯಾತ್ರೆ',
    time: '20 hours ago',
    image: 'https://picsum.photos/536/354', // Replace with real image URL
  },
  {
    id: '2',
    title: 'ಬೆಳ್ಳಂಗಡಿ: ಬ್ಯಾಂಕ್‌ನಲ್ಲಿ ಅವ್ಯವಹಾರ, ವಂಚನೆ, ಲೂಟಿ ಆರೋಪ- ಗ್ರಾಹಕರಿಂದ ಬೃಹತ್ ಪ್ರತಿಭಟನೆ',
    time: '21 hours ago',
    image: 'https://picsum.photos/536/354', // Replace with real image URL
  },
  {
    id: '3',
    title: 'ದೊಡ್ಡ್ಮನೆ ಸಹಾಯ ರಿವೀಲ್ ಮಾಡಿದ ಧ್ರುವ ಸರ್ಜಾ : ವಿಡಿಯೋ ವೈರಲ್',
    time: '21 hours ago',
    image: 'https://picsum.photos/536/354', // Replace with real image URL
  },
];

const UserSearch = ({navigation}) => {

    const renderHeader = () => {
        return (
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <NavBack />
                </TouchableOpacity>
                <Text style={styles.headerText}>Send Feedback</Text>
            </View>
        )
    }
  return (
    <View style={styles.container}>
        {renderHeader()}
      {/* Search Bar */}
      <Row>
      <View style={styles.searchContainer}>

        {/* <TextInput style={styles.searchInput} placeholder="Search readers" /> */}
      </View>

      </Row>

      {/* Trending News Title */}
      <Text style={styles.heading}>Trending news!</Text>

      {/* News List */}
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  heading: {
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily:FONTS_FAMILY.Comfortaa_Bold,
    marginVertical: 10,
    color:'black'
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2, // Adds shadow
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
   color:'black',
   fontFamily:FONTS_FAMILY.Comfortaa_Bold,
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
    color: '#777',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: verticalScale(20),
    padding: 10
},
headerText: {
    fontSize: moderateScale(18),
    color: "black",
    marginLeft: moderateScale(90),
    fontFamily: FONTS_FAMILY.Comfortaa_Bold,
},
});

export default UserSearch;
