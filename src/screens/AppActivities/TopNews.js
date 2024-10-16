import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomText from "../../components/TextComponent";
import { moderateScale } from "react-native-size-matters";
import { FONTS_FAMILY } from "../../assets/Fonts";
import { NavBack } from "../../assets/SVGs";
import IMG from "../../assets/Images";
import { App_Primary_color, black } from "../../common/Colors/colors";


const TopNews = ({ navigation }) => {

    const renderHeader = () => {
        return (
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <NavBack />
                </TouchableOpacity>
                <CustomText style={styles.headerText}>Top News</CustomText>
            </View>
        )
    }

    const renderStateNewsCard = () => {
        return (
            <ScrollView style={styles.containerCard}>
                {/* Header */}
                <View style={styles.headerCard}>
                    <Text style={styles.headerTextCard}>State News</Text>
                    {/* <TouchableOpacity style={styles.clickHereBtnCard}
                                onPress={() => navigation.navigate('News', { type: 'Hubli-Dharwad' })}
        
                            >
                                <Text style={styles.clickHereTextCard}>Click Here</Text>
                            </TouchableOpacity> */}
                </View>

                {/* Cards */}
                <View style={styles.cardsContainerCard}>
                    {data.map((item, index) => (
                        <View key={item.id} style={styles.cardWrapper}>
                            <TouchableOpacity style={styles.cardCard}
                                // onPress={() => navigation.navigate('News')}
                                onPress={() => navigation.navigate('News', { type: 'Hubli-Dharwad' })}

                            >
                                <Image
                                    //   source={ IMG.BgImage}
                                    source={IMG.brakingnewsImg}
                                    style={styles.cardImage}
                                    resizeMode="contain"
                                />
                                <Text style={styles.cardText}>{item.title}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        );
    };

    const DistWise = () => {
        return (
            <ScrollView style={styles.containerCard}>
                {/* Header */}
                <View style={styles.headerCard}>
                    <Text style={styles.headerTextCard}>Hubli-Dharwad</Text>
                    {/* <TouchableOpacity style={styles.clickHereBtnCard}
                                onPress={() => navigation.navigate('News', { type: 'Hubli-Dharwad' })}
        
                            >
                                <Text style={styles.clickHereTextCard}>Click Here</Text>
                            </TouchableOpacity> */}
                </View>

                {/* Cards */}
                <View style={styles.cardsContainerCard}>
                    {data.map((item, index) => (
                        <View key={item.id} style={styles.cardWrapper}>
                            <TouchableOpacity style={styles.cardCard}
                                // onPress={() => navigation.navigate('News')}
                                onPress={() => navigation.navigate('News', { type: 'Hubli-Dharwad' })}

                            >
                                <Image
                                    //   source={ IMG.BgImage}
                                    source={IMG.brakingnewsImg}
                                    style={styles.cardImage}
                                    resizeMode="contain"
                                />
                                <Text style={styles.cardText}>{item.title}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            {renderHeader()}
            <ScrollView>
            {renderStateNewsCard()}
            {DistWise()}

            </ScrollView>
        </View>
    )
}

const data = [
    { id: '1', title: 'Mysuru: Dasara elephants undergo weight...', img: IMG.MainNews },
    { id: '2', title: 'Mysuru: A sea of people thronged...', img: IMG.MainNews },
    { id: '3', title: 'A song depicting the art, culture and...', img: IMG.MainNews },
    { id: '4', title: 'Mysore/Mysuru: A police band is...', img: IMG.MainNews },
];

export default TopNews;

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    },
    headerText: {
        fontSize: moderateScale(18),
        color: "black",
        marginLeft: moderateScale(90),
        fontFamily: FONTS_FAMILY.Comfortaa_Bold,
    },

    // ========
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
})