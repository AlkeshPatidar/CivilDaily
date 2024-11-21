import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { App_Primary_color } from "../../common/Colors/colors";
import Row from "../../components/wrapper/row";
import { Back, ForwardIcon } from "../../assets/SVGs";
import { FONTS_FAMILY } from "../../assets/Fonts";
import CustomText from "../../components/TextComponent";
import { useTranslation } from "react-i18next";

const languages = [
    { id: '1', name: 'Udupi' },
    { id: '2', name: 'Dakshin-Kannada' },
    { id: '3', name: 'Banglore' },
    { id: '4', name: 'BangLore-Rural' },
    { id: '5', name: 'Hubli-Dharwad' },
    { id: '6', name: 'Gadag' },
    { id: '7', name: 'Bagalkot' },
    { id: '8', name: 'BelGaum' },
    { id: '9', name: 'Tamkur' },
    { id: '11', name: 'Uttara-Kannada' },
    { id: '12', name: 'Bellary' },
    { id: '12', name: 'Bidar' },
    { id: '13', name: 'Bijapur' },
    { id: '14', name: 'Chamarajnagar' },
    { id: '15', name: 'Chikkaballapur' },
    { id: '16', name: 'Chikmagalur' },
    { id: '17', name: 'Chitradurga' },
    { id: '18', name: 'Devangere' },
    { id: '19', name: 'Gulbarga' },
    { id: '20', name: 'Hassan' },
    { id: '21', name: 'Haveri' },
    { id: '22', name: 'Kodagu' },
    { id: '23', name: 'Kolar' },
    { id: '24', name: 'Koppal' },
    { id: '25', name: 'Mandya' },
    { id: '26', name: 'Mysore' },
    { id: '27', name: 'Raichur' },
    { id: '28', name: 'Ramnagara' },
    { id: '29', name: 'Shimoga' },
    { id: '30', name: 'Vijaynagara' },
    { id: '31', name: 'Yadgiri' },
];


const LocationSelection = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const { t, i18n } = useTranslation();

    const renderLanguageItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.languageItem,]}
            onPress={() => {setSelectedLanguage(item.id)
                navigation.navigate('Home')
            }}
        >
            <Text style={styles.languageText}>
                {/* {item.name} */}
                {t(item?.name)}
            </Text>
            <ForwardIcon/>
            {/* <View style={styles.radioCircle}>
                {selectedLanguage === item.id && <View style={styles.selectedRb} />}
            </View> */}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Row style={{ backgroundColor: App_Primary_color, alignItems: 'center', height: verticalScale(56), gap: 50, wdth: '100%', paddingHorizontal: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Back />
                </TouchableOpacity>
                <Text style={styles.title}>Select Districts</Text>
            </Row>

            <FlatList
                data={languages}
                renderItem={renderLanguageItem}
                keyExtractor={(item) => item.id}
                style={styles.languageList}
             
            />
            {/* <TouchableOpacity
                style={styles.nextButton}
                onPress={() => navigation.navigate('Tab')}
            >
                <Text style={styles.nextButtonText}>NEXT</Text>
            </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    backButton: {
        marginBottom: verticalScale(10),
    },
    backButtonText: {
        fontSize: moderateScale(20),
        color: 'blue',
    },
    title: {
        fontSize: moderateScale(18),
        color: 'white',
        textAlign: 'center',
        fontFamily: FONTS_FAMILY.Comfortaa_Bold
    },
    languageList: {
        flex: 1,
        marginTop: verticalScale(20)
    },
    languageItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: verticalScale(10),
        paddingHorizontal: moderateScale(20),
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: moderateScale(20),
        marginVertical: verticalScale(4),
        backgroundColor: 'rgba(244, 248, 255, 1)',
        marginHorizontal: 20,
        elevation: 2,
        marginBottom:10


    },
    selectedLanguageItem: {
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
    },
    languageText: {
        fontSize: moderateScale(16),
        color: 'black',
        fontFamily: FONTS_FAMILY.Comfortaa_Regular
    },
    selectedLanguageText: {
        color: 'blue',
    },
    radioCircle: {
        height: moderateScale(24),
        width: moderateScale(24),
        borderRadius: moderateScale(12),
        borderWidth: 1,
        borderColor: App_Primary_color,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: moderateScale(20),
        height: moderateScale(20),
        borderRadius: moderateScale(100),
        backgroundColor: App_Primary_color,
    },
    nextButton: {
        marginVertical: verticalScale(20),
        backgroundColor: App_Primary_color,
        borderRadius: moderateScale(8),
        paddingVertical: verticalScale(10),
        alignItems: 'center',
        marginHorizontal: 20
    },
    nextButtonText: {
        color: 'white',
        fontSize: moderateScale(16),
    },
});

export default LocationSelection;


// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, Button, ActivityIndicator } from 'react-native';
// import { useTranslation } from 'react-i18next';

// const LanguageList = () => {
//   const { t, i18n } = useTranslation();
//   const [languages, setLanguages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Function to fetch data from server
//   const fetchLanguagesFromServer = async () => {
//     // alert (0)
//     try {
//       const response = await fetch('https://jsonplaceholder.typicode.com/users'); // Replace with your API endpoint
//       const data = await response.json();

//       // Process and translate the data
//       const translatedData = data.map((item) => ({
//         ...item,
//         name: t(item.name), // Translate the name dynamically
//       }));

//       setLanguages(translatedData);
//     } catch (error) {
//       console.error('Error fetching languages:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Call the fetch function on component mount
//   useEffect(() => {
//     fetchLanguagesFromServer();
//   }, [i18n.language]); // Re-fetch data when language changes

//   const changeLanguage = (lang) => {
//     i18n.changeLanguage(lang);
//   };

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <View>
//       {/* Language Change Buttons */}
//       <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 10 }}>
//         <Button title="English" onPress={() => changeLanguage('en')} />
//         <Button title="Kannada" onPress={() => changeLanguage('kn')} />
//         <Button title="Hindi" onPress={() => changeLanguage('hi')} />
//       </View>

//       {/* Render Translated Languages */}
//       <FlatList
//         data={languages}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <Text style={{ fontSize: 16, margin: 10, color:'black' }}>{item.name}</Text>
//         )}
//       />
//     </View>
//   );
// };

// export default LanguageList;
