import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { FONTS_FAMILY } from "../../assets/Fonts";
import { AddNewsIcon, Down, ForwardIcon, MenuIcon, MS, PodCastIcon, ProfileIcon, SocialMeadia5, SocialMedi1, SocialMedi2, SocialMedi3, SocialMedi4, SocialMedi6 } from "../../assets/SVGs";
import color, { App_Primary_color, black, white } from "../../common/Colors/colors";
import IMG from "../../assets/Images";
import Row from "../../components/wrapper/row";
import SpaceBetweenRow from "../../components/wrapper/spacebetween";
import CustomText from "../../components/TextComponent";
import DrawerModal from "../../components/DrawerModal";
import BreakingNewsCard from "../News/NewsCards";

const data = [
    { id: '1', title: 'Mysuru: Dasara elephants undergo weight...', img: IMG.MainNews },
    { id: '2', title: 'Mysuru: A sea of people thronged...', img: IMG.MainNews },
    { id: '3', title: 'A song depicting the art, culture and...', img: IMG.MainNews },
    { id: '4', title: 'Mysore/Mysuru: A police band is...', img: IMG.MainNews },
];

const SuggestedUser = [
    {
        id: '1',
        name: 'ವಾಯ್ಸ್ ಆಫ್ ಪಿರಿ...',
        email: 'devusnj@gmail.com',
        image: IMG.ProfileIcon, // Replace with the actual image URLs
    },
    {
        id: '2',
        name: 'mohammed shab...',
        title: 'Journalist my fashion',
        image: IMG.ProfileIcon // Replace with the actual image URLs
    },
    {
        id: '3',
        name: 'mohammed shab...',
        title: 'Journalist my fashion',
        image: IMG.ProfileIcon // Replace with the actual image URLs
    },
    {
        id: '4',
        name: 'ವಾಯ್ಸ್ ಆಫ್ ಪಿರಿ...',
        email: 'devusnj@gmail.com',
        image: IMG.ProfileIcon, // Replace with the actual image URLs
    },
    // Add more items as needed
];






const NetWorking = ({ navigation }) => {
    const [selected, SetisSelected] = useState("All news")


    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const Header = () => {
        return (
            <View style={styles.headerContainer}>
                <Row style={{ gap: 30, alignItems: 'center' }}>
                    <TouchableOpacity onPress={toggleModal}>
                        <MenuIcon />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('LocationSelection')}>
                        <Row style={{ gap: 10, alignItems: 'center' }}>
                            <Text style={{ ...styles.headerTitle }}>Mysore</Text>
                            <Down style={{ top: 3 }} />
                        </Row>

                    </TouchableOpacity>

                </Row>
                <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                    <ProfileIcon />
                </TouchableOpacity>
            </View>
        );
    };

    const renderDrawer = () => {
        return <DrawerModal
            isModalVisible={isModalVisible}
            toggleModal={toggleModal}
            navigation={navigation}
        />
    }


   

    return (
        <View style={styles.container}>
            {Header()}
           

            <ScrollView style={{ marginTop: verticalScale(0), marginBottom:60 }}
                showsVerticalScrollIndicator={false}
            >
                <BreakingNewsCard/>
            </ScrollView>

            <TouchableOpacity style={{
                height: 50,
                width: 50,
                backgroundColor: App_Primary_color,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
                position: 'absolute',
                bottom: 100,
                right: 10
            }}
                onPress={() => navigation.navigate('ShareScreen')}
            >
                <AddNewsIcon />
            </TouchableOpacity>
            {renderDrawer()}

            
          
        </View>
    );
};

export default NetWorking;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: moderateScale(16),
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: verticalScale(10),
    },
    menuIcon: {
        fontSize: moderateScale(24),
    },
    headerTitle: {
        fontSize: moderateScale(16),
        color: 'black',
        fontFamily: FONTS_FAMILY.Comfortaa_Medium
    },
    voiceIcon: {
        fontSize: moderateScale(24),
    },
   
 

    containerCard: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    headerCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    headerTextCard: {
        fontSize: 16,
        fontFamily: FONTS_FAMILY.Comfortaa_Bold,
        color: black
    },
    clickHereBtnCard: {
        backgroundColor: App_Primary_color,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    clickHereTextCard: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cardsContainerCard: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',

    },
    cardWrapper: {
        width: '48%', // Two cards per row
        marginBottom: 15,
    },
    cardCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 3, // Add some shadow for Android
        shadowColor: '#000', // Add shadow for iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1.41,
        height: 170
    },
    cardImage: {
        width: '100%',
        height: 100,
    },
    cardText: {
        padding: 10,
        fontSize: 14,
        color: '#333',
    },

    suggestedContainer: {
        padding: 10,
        backgroundColor: '#fff',
    },
    suggestedText: {
        fontSize: 16,
        fontFamily: FONTS_FAMILY.Comfortaa_Bold,
        color: black,
        marginBottom: 10,
    },
    suggestedFlatListContent: {
        paddingVertical: 10,
    },
    suggestedCard: {
        backgroundColor: '#F1F1F1',
        borderRadius: 10,
        width: 150,
        padding: 10,
        alignItems: 'center',
        marginRight: 10,
        height: 200
    },
    suggestedProfileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        // marginBottom: 10,
        // borderWidth:1
    },
    suggestedNameText: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 5,
        textAlign: 'center',
        color: 'black'
    },
    suggestedEmailText: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
        marginBottom: 10,
    },
    suggestedFollowButton: {
        backgroundColor: App_Primary_color,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 10
    },
    suggestedFollowButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
