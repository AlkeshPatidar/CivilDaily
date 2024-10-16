


import React, { useState } from "react";
import { Image, FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import CustomText from "../../components/TextComponent";
import IMG from "../../assets/Images";
import { moderateScale, verticalScale } from "react-native-size-matters";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Row from "../../components/wrapper/row";
import { NavBack } from "../../assets/SVGs";
import { App_Primary_color, white } from "../../common/Colors/colors";
import { FONTS_FAMILY } from "../../assets/Fonts";
const { height, width } = Dimensions.get('window');

const newsData = [
    {
        id: '1',
        image: IMG.BgImage,
        title: "To build responsibly, tech needs to do more than just hire chief ethics officers",
        content: "In the last couple of years, we’ve seen new teams in tech companies emerge that focus on responsible innovation, digital well-being, AI ethics or humane use. Whatever their titles, these individuals are given the task of 'leading' ethics at their companies.",
    },
    {
        id: '2',
        image: IMG.BgImage,
        title: "How AI is reshaping business models",
        content: "AI is at the forefront of transforming industries across the board. From automation to customer service, it's changing how we work, live, and do business.",
    },
    {
        id: '3',
        image: IMG.BgImage,
        title: "How AI is reshaping business models",
        content: "AI is at the forefront of transforming industries across the board. From automation to customer service, it's changing how we work, live, and do business.",
    },
    {
        id: '4',
        image: IMG.BgImage,
        title: "How AI is reshaping business models",
        content: "AI is at the forefront of transforming industries across the board. From automation to customer service, it's changing how we work, live, and do business.",
    },
    // Add more news objects as needed
];

const News = ({ navigation, route }) => {
    const [openBottomSlider, setOpenBottomSlider] = useState(false);
    const type = route?.params?.type;

    const renderHeader = () => {
        return (

            <Row style={{ backgroundColor: App_Primary_color, paddingHorizontal: 20, gap: 90 }}>
                <TouchableOpacity style={{ paddingVertical: 10, }}
                    onPress={() => navigation.goBack()}
                >
                    <NavBack />
                </TouchableOpacity>
                <CustomText style={{ color: white, fontFamily: FONTS_FAMILY.Comfortaa_Regular }}>{type == "Hubli" ? "Local News" : type}</CustomText>
                {type == "Hubli" && <TouchableOpacity
                    style={{
                        position: 'absolute', right: 3,
                    }}
                    onPress={() => navigation.navigate('LocationSelection')}
                ><CustomText style={{ color: white, fontFamily: FONTS_FAMILY.Comfortaa_Regular, fontSize: 12, }}>Change Location</CustomText></TouchableOpacity>}
            </Row>
        )
    }

    const onCloseBottomSlider = () => {
        setOpenBottomSlider(false);
    };

    const onOpenBottomSlider = () => {
        setOpenBottomSlider(true);
    };

    const renderItem = ({ item }) => (
        <View style={styles.newsContainer}>
            <Image source={item.image} style={styles.imageStyle} />
            <View style={styles.textContainer}>
                <CustomText style={styles.newsTitle}>{item.title}</CustomText>
                <View style={styles.divider} />
                <CustomText style={styles.newsContent}>{item.content}</CustomText>
            </View>

        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            {renderHeader()}
            <View style={{ marginTop: 0 }}>
                <FlatList
                    data={newsData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    pagingEnabled
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />

            </View>
            <View style={styles.actionButtonsContainer}>
                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.actionButton}>
                        <AntDesign name="like2" size={20} color="gray" />
                        <Text style={styles.actionText}>Like</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <MaterialCommunityIcons name="comment-outline" size={20} color="gray" />
                        <Text style={styles.actionText}>Comment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <FontAwesome5 name="share" size={20} color="gray" />
                        <Text style={styles.actionText}>Share</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <FontAwesome5 name="whatsapp" size={20} color="green" />
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <AntDesign name="retweet" size={20} color="gray" />
                        <Text style={styles.actionText}>Re-post</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default News;

const styles = StyleSheet.create({
    newsContainer: {
        // top:-50,
        width: width,
        height: height,
        // paddingHorizontal: moderateScale(10),
        // justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        height: verticalScale(200),
        width: '98%',
        resizeMode: 'cover',
        // borderRadius: 10,
    },
    textContainer: {
        marginTop: verticalScale(10),
        width: '95%',
    },
    newsTitle: {
        fontSize: 18,
        fontFamily: "Comfortaa-SemiBold",
    },
    divider: {
        height: 1,
        width: '80%',
        backgroundColor: 'rgba(20, 30, 40, 0.08)',
        marginVertical: verticalScale(10),
    },
    newsContent: {
        fontSize: 16,
        fontFamily: "Comfortaa-Regular",
    },
    actionButtonsContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        elevation: 1,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    actionButton: {
        alignItems: 'center',
    },
    actionText: {
        fontSize: 12,
        color: 'black',
        marginTop: 5,
    },
});
