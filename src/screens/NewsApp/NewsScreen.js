import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { FONTS_FAMILY } from "../../assets/Fonts";
import { AddNewsIcon, ForwardIcon, MenuIcon, MS, PodCastIcon, SocialMeadia5, SocialMedi1, SocialMedi2, SocialMedi3, SocialMedi4, SocialMedi6 } from "../../assets/SVGs";
import color, { App_Primary_color, black, white } from "../../common/Colors/colors";
import IMG from "../../assets/Images";
import Row from "../../components/wrapper/row";
import SpaceBetweenRow from "../../components/wrapper/spacebetween";
import CustomText from "../../components/TextComponent";
import DrawerModal from "../../components/DrawerModal";









const NewsApp = ({ navigation }) => {
    const [selected, SetisSelected] = useState("All news")


    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const Header = () => {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={toggleModal}>
                    <MenuIcon />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>NewsApp</Text>
                <TouchableOpacity>
                    <PodCastIcon />
                </TouchableOpacity>
            </View>
        );
    };

    const Tabs = () => {
        const tabs = ["All news", "Business", "Politics", "Tech", "Healthy", "Science"];
        return (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
                {tabs.map((tab, index) => (
                    <TouchableOpacity key={index} style={styles.tabItem}
                        onPress={() => SetisSelected(tab)}>
                        <Text style={styles.tabText}>{tab}</Text>
                        {selected == tab && <View style={{ height: 2, width: 60, backgroundColor: App_Primary_color }} />}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    };

    const MainNews = () => {
        return (
            <View>
                <FlatList
                    data={[1, 2, 3, 4, 5]}
                    horizontal
                    renderItem={() => {
                        return (
                            <>
                                <Image source={IMG.MainNews}
                                    style={{
                                        marginHorizontal: 5,
                                        height: 300,
                                        width: 300
                                    }}
                                />
                            </>
                        )
                    }}
                />
            </View>
        );
    };


    const LatestNews = () => {
        const latestNews = [
            {
                id: '1',
                category: 'TECHNOLOGY',
                title: 'Insurtech startup  PasarPolis gets $54 million — Series B',
                image: IMG.latestNewsImage,
            },
            {
                id: '2',
                category: 'TECHNOLOGY',
                title: 'The IPO parade continues as Wish',
                image: IMG.latestNewsImage,
            },
        ];

        return (
            <View style={styles.latestNewsContainer}>
                <SpaceBetweenRow>
                    <Text style={styles.latestNewsHeader}>Latest News</Text>
                    <ForwardIcon />
                </SpaceBetweenRow>
                <FlatList
                    data={latestNews}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.latestNewsItem}
                            onPress={() => navigation.navigate('NewsDetail')}
                        >
                            <Image source={item.image} style={styles.latestNewsImage} />
                            <View style={styles.latestNewsTextContainer}>
                                <Text style={styles.latestNewsCategory}>{item.category}</Text>
                                <Text style={styles.latestNewsTitle}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        );
    };
    const renderBrakeingNews = () => {
        return (
            <View style={{ marginTop: 10 }}>
                <CustomText style={{
                    color: App_Primary_color,
                    fontFamily: FONTS_FAMILY.Comfortaa_Bold,
                    fontSize: 16,

                }}>Breaking News</CustomText>
                <View style={{
                    height: verticalScale(200),
                    borderWidth: 1,
                    borderRadius: 17,
                    marginTop: 10,
                    alignItems: 'center',
                    borderColor: 'rgba(230, 230, 230, 1)'

                }}>
                    <ImageBackground source={IMG.brakingnewsImg}
                        style={{ height: '80%', width: '99%', left: 10, marginTop: 10, padding: 8 }}
                        // resizeMode="contain"
                        imageStyle={{ borderRadius: 8 }}
                    >
                        <Row style={{ gap: 10 }}>
                            <MS />
                            <CustomText style={{
                                color: white,
                                fontFamily: FONTS_FAMILY.Comfortaa_Bold
                            }}>Miracles in Science</CustomText>
                        </Row>
                        <CustomText
                            style={{
                                color: white,
                                fontFamily: FONTS_FAMILY.Comfortaa_Bold,
                                position: 'absolute',
                                bottom: 55,
                                left: 10
                                // top:30
                            }}
                        >an hour ago</CustomText>
                    </ImageBackground>
                    <CustomText style={{
                        position: 'absolute',
                        bottom: 5,
                        fontSize: 16,
                        fontFamily: FONTS_FAMILY.Comfortaa_Bold
                    }}>Major breakthrough in Cancer Research leads to new treatment options</CustomText>

                </View>
            </View>
        )
    }
    const renderFollowOptions = () => {
        return (
            <View style={{ gap: 10, flex:1, paddingBottom:100 }}>
                <CustomText style={{color:App_Primary_color, fontFamily:FONTS_FAMILY.Comfortaa_SemiBold}}>Follow Me</CustomText>
                <Row style={{ gap: 20, alignItems: 'center' }}>
                    <TouchableOpacity>
                        <SocialMedi1 />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <SocialMedi2 />
                    </TouchableOpacity>

                </Row>
                <Row style={{ gap: 20, alignItems: 'center' }}>
                    <TouchableOpacity>
                        <SocialMedi3 />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <SocialMedi4 />
                    </TouchableOpacity>
                </Row>
                <Row style={{ gap: 20, alignItems: 'center' }}>
                    <TouchableOpacity>
                        <SocialMeadia5 />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <SocialMedi6 />
                    </TouchableOpacity>
                </Row>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {Header()}

            <ScrollView style={{ marginTop: verticalScale(0) }}
                showsVerticalScrollIndicator={false}
            >
                {/* {renderBrakeingNews()} */}
                {Tabs()}
                {MainNews()}
                {LatestNews()}
                {renderFollowOptions()}
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
            <DrawerModal
                isModalVisible={isModalVisible}
                toggleModal={toggleModal}
                navigation={navigation}
            />
        </View>
    );
};

export default NewsApp;

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
    tabsContainer: {
        flexDirection: 'row',
        marginVertical: verticalScale(10),
    },
    tabItem: {
        marginRight: moderateScale(15),
        height: 50
    },
    tabText: {
        fontSize: moderateScale(14),
        color: 'gray',
        fontFamily: FONTS_FAMILY.Comfortaa_Bold
    },
    mainNewsContainer: {
        marginVertical: verticalScale(10),
    },
    mainNewsImage: {
        width: '100%',
        height: moderateScale(200),
        borderRadius: moderateScale(8),
    },
    mainNewsTextContainer: {
        position: 'absolute',
        bottom: moderateScale(10),
        left: moderateScale(10),
    },
    mainNewsCategory: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: moderateScale(12),
    },
    mainNewsTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: moderateScale(16),
        marginTop: verticalScale(5),
    },
    mainNewsFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: verticalScale(10),
    },
    mainNewsTime: {
        color: 'white',
        fontSize: moderateScale(12),
    },
    mainNewsIcons: {
        flexDirection: 'row',
    },
    mainNewsIcon: {
        color: 'white',
        fontSize: moderateScale(18),
        marginLeft: moderateScale(10),
    },
    latestNewsContainer: {
        marginVertical: verticalScale(20),

    },
    latestNewsHeader: {
        fontSize: moderateScale(16),
        marginBottom: verticalScale(20),
        color: App_Primary_color,
        fontFamily: FONTS_FAMILY.Comfortaa_SemiBold,
        fontSize: 14
    },
    latestNewsItem: {
        flexDirection: 'row',
        marginRight: moderateScale(10),
        alignItems: 'center',
        marginBottom: verticalScale(10)
    },
    latestNewsImage: {
        width: moderateScale(80),
        height: moderateScale(80),
        borderRadius: moderateScale(8),
    },
    latestNewsTextContainer: {
        marginLeft: moderateScale(10),

    },
    latestNewsCategory: {
        color: App_Primary_color,
        fontSize: moderateScale(12),
        fontFamily: FONTS_FAMILY.Comfortaa_SemiBold
    },
    latestNewsTitle: {
        fontSize: moderateScale(14),
        color: black,
        fontFamily: FONTS_FAMILY.Comfortaa_Bold,
        width: 200
    },
});
