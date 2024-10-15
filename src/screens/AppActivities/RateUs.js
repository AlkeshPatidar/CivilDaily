import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { black } from '../../common/Colors/colors';
// import { apiPost } from '../../utils/Apis';
// import urls from '../../config/urls';
import CustomButton from '../../components/Button';
import { verticalScale } from 'react-native-size-matters';
// import { ToastMsg } from '../../utils/helperFunctions';

const RatingScreen = ({ route,navigation }) => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');



    // const handleSubmit = () => {
    //     // Handle the submission of rating and feedback
    //     if (rating === 0) {
    //         Alert.alert('Please give a rating');
    //     } else {
    //         Alert.alert('Thank you!', `Rating: ${rating} \nFeedback: ${feedback}`);
    //         // Here you can send the rating and feedback to your API

    //     }
    // };

    const handleSubmit = async () => {
        navigation.navigate('Home')
        // try {
        //     showLoader();
        //     const data = {
        //         TurfArena: route?.params?.ArenaId,
        //         Rating: rating,
        //         Review: feedback
        //     }
        //     const response = await apiPost(urls.ArenaRating, data);
        //     console.log("response", response);

        //     if (response?.statusCode === 200) {
        //         ToastMsg(response?.message)
        //         hideLoader();
        //         navigation.goBack()

        //     }
        // } catch (error) {
        //     hideLoader();
        //     if (error?.message) {
        //         ToastMsg(error?.message);
        //         // response?.message
        //     } else {
        //         ToastMsg('Network Error');
        //     }
        // }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rate Your Experience</Text>

            {/* Star Rating Component */}
            <StarRating
                rating={rating}
                onChange={setRating}
                starSize={30}
                color={'#FFD700'} // Gold color for stars
            />

            {/* Feedback Input */}
            <TextInput
                style={styles.input}
                placeholder="Write your feedback here..."
                value={feedback}
                onChangeText={setFeedback}
                multiline
                textAlignVertical="top"
            />

            {/* Submit Button */}
            <CustomButton
                title={'Submit'}
                style={{
                    height: verticalScale(40),
                    marginTop: verticalScale(40),
                    width: 300,
                }}
                load={true}
                // onPress={() => navigation.navigate('Verify')}
                onPress={() => handleSubmit()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontFamily: FONTS_FAMILY.Oxanium_Bold,
        color: black,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: 'white',
        color: black
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default RatingScreen;
