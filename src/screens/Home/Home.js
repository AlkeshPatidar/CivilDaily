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
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';



import Classified from "../Classified/Classified";



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






const Home = ({ navigation }) => {
    const [selected, SetisSelected] = useState("All news")

    const [selectedTab, setSelectedTab] = useState('Home');
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleTabPress = (tabName) => {
        setSelectedTab(tabName);
        if (tabName == 'Home') {
            navigation.navigate('Home')
            setSelectedTab("Home");
        }
        if (tabName == 'Networking') {
            // navigation.navigate('Networking')
            // setSelectedTab("Home"); 


        }
        if (tabName == 'Classified') {
            // navigation.navigate('Classified')
            // setSelectedTab("Home"); 


        }
        if (tabName == 'News') {
            navigation.navigate('News', { type: "News" })
            setSelectedTab("Home");


        }
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
                            <Text style={{ ...styles.headerTitle }}>Hubli-Dharwad</Text>
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

    const renderUpperTabs = () => {
        const Uppertabs = [
            { name: 'Home', icon: <AntDesign name='home' size={20} color={selectedTab === 'Home' ? App_Primary_color : 'black'} /> },
            { name: 'Networking', icon: <FontAwesome6 name='people-group' size={20} color={selectedTab === 'Networking' ? App_Primary_color : 'black'} /> },
            { name: 'Classified', icon: <FontAwesome6 name='suitcase' size={20} color={selectedTab === 'Classified' ? App_Primary_color : 'black'} /> },
            { name: 'News', icon: <FontAwesome6 name='newspaper' size={20} color={selectedTab === 'News' ? App_Primary_color : 'black'} /> },
        ];
        return (
            <SpaceBetweenRow style={{ paddingVertical: 5, backgroundColor: 'white', paddingHorizontal: 16, elevation: 2 }}>
                {Uppertabs.map((tab, index) => (
                    <TouchableOpacity key={index} onPress={() => handleTabPress(tab.name)}>
                        <View style={{ height: 50, alignItems: 'center' }}>
                            {tab.icon}
                            <Text style={{ fontSize: 12, fontFamily: FONTS_FAMILY.Comfortaa_SemiBold, color: selectedTab === tab.name ? App_Primary_color : 'black' }}>
                                {tab.name}
                            </Text>
                            {selectedTab === tab.name && (
                                <View style={{ height: 2, width: 60, backgroundColor: App_Primary_color }} />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </SpaceBetweenRow>
        );
    };

    const renderBanner = () => {
        return (
            <View>
                <Image source={IMG.brakingnewsImg} style={{ height: 90, width: '100%' }} />
            </View>
        )
    }


    const Tabs = () => {
        // const tabs = ["Hubli", "Helpline", "Cinema", "Education", "Health", "Ladies-Corner", "Sports", "Human-Stories", "Agriculture", "Questions","Jobs","Crime","Water-power"];
        const tabs = [
            { name: "Hubli", icon: <AntDesign name="home" size={20} color="black" /> },
            { name: "Helpline", icon: <Entypo name="old-phone" size={20} color="black" /> },
            { name: "Cinema", icon: <MaterialIcons name="movie" size={20} color="black" /> },
            { name: "Education", icon: <Ionicons name="school" size={20} color="black" /> },
            { name: "Health", icon: <FontAwesome name="heartbeat" size={20} color="black" /> },
            { name: "Ladies-Corner", icon: <Ionicons name="woman" size={20} color="black" /> },
            { name: "Sports", icon: <MaterialIcons name="sports-soccer" size={20} color="black" /> },
            { name: "Human-Stories", icon: <Ionicons name="people" size={20} color="black" /> },
            { name: "Agriculture", icon: <MaterialIcons name="eco" size={20} color="black" /> },
            { name: "Questions", icon: <AntDesign name="questioncircleo" size={20} color="black" /> },
            { name: "Jobs", icon: <FontAwesome6 name="briefcase" size={20} color="black" /> },
            { name: "Crime", icon: <MaterialIcons name="security" size={20} color="black" /> },
            { name: "Water-power", icon: <Ionicons name="water" size={20} color="black" /> }
        ];
        return (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
                {tabs.map((tab, index) => (
                    <TouchableOpacity key={index} style={styles.tabItem}
                        onPress={() => {
                            SetisSelected(tab.name)
                            navigation.navigate('News', { type: tab?.name })
                        }}>
                        <View style={{ height: 50, alignItems: 'center' }}>
                            {tab.icon}
                            <Text style={{ fontSize: 12, fontFamily: FONTS_FAMILY.Comfortaa_SemiBold, color: selectedTab === tab.name ? App_Primary_color : 'black' }}>
                                {tab.name}
                            </Text>
                            {/* {selectedTab === tab.name && (
                                <View style={{ height: 2, width: 60, backgroundColor: App_Primary_color }} />
                            )} */}
                        </View>
                        {selected == tab.name && <View style={{ height: 2, width: 60, backgroundColor: App_Primary_color, bottom: 5 }} />}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    };

    const MysoreCards = () => {
        return (
            <ScrollView style={styles.containerCard}>
                {/* Header */}
                <View style={styles.headerCard}>
                    <Text style={styles.headerTextCard}>Hubli-Dharwad</Text>
                    <TouchableOpacity style={styles.clickHereBtnCard}
                        onPress={() => navigation.navigate('News', { type: 'Hubli-Dharwad' })}

                    >
                        <Text style={styles.clickHereTextCard}>Click Here</Text>
                    </TouchableOpacity>
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

    const stateAndNational = () => {
        return (
            <ScrollView style={styles.containerCard}>
                {/* Header */}
                <View style={styles.headerCard}>
                    <Text style={styles.headerTextCard}>State And National</Text>
                    <TouchableOpacity style={styles.clickHereBtnCard}
                        onPress={() => navigation.navigate('News', { type: 'State And National' })}
                    >
                        <Text style={styles.clickHereTextCard}>Click Here</Text>
                    </TouchableOpacity>
                </View>

                {/* Cards */}
                <View style={styles.cardsContainerCard}>
                    {data.map((item, index) => (
                        <View key={item.id} style={styles.cardWrapper}>
                            <TouchableOpacity style={styles.cardCard}
                                // onPress={() => navigation.navigate('News')}
                                onPress={() => navigation.navigate('News', { type: 'State And National' })}

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

                {/* Another section if needed */}

            </ScrollView>
        );
    };

    const SuggestedUsers = () => {
        const renderItem = ({ item }) => (
            <View style={styles.suggestedCard}>
                <Image source={IMG.ProfileIcon} style={styles.suggestedProfileImage} />
                <Text style={styles.suggestedNameText}>{item.name}</Text>
                <Text style={styles.suggestedEmailText}>{item.email || item.title}</Text>
                <TouchableOpacity style={styles.suggestedFollowButton}>
                    <Text style={styles.suggestedFollowButtonText}>follow</Text>
                </TouchableOpacity>
            </View>
        );

        return (
            <View style={styles.suggestedContainer}>
                <Text style={styles.suggestedText}>Suggested for you</Text>
                <FlatList
                    data={SuggestedUser}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.suggestedFlatListContent}
                />
            </View>
        );
    };


    const renderFollowOptions = () => {
        return (
            <View style={{ gap: 10, flex: 1, paddingBottom: 100 }}>
                <CustomText style={{ color: App_Primary_color, fontFamily: FONTS_FAMILY.Comfortaa_SemiBold }}>Follow Me</CustomText>
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
            {renderUpperTabs()}
            {selectedTab == 'Home' && renderBanner()}
            {selectedTab == 'Home' && Tabs()}

            {selectedTab == 'Networking' ?
                <BreakingNewsCard /> :

                selectedTab == 'Classified' ?
                    <Classified /> :
                    <ScrollView style={{ marginTop: verticalScale(0) }}
                        showsVerticalScrollIndicator={false}
                    >
                        {MysoreCards()}
                        {SuggestedUsers()}
                        {stateAndNational()}
                        <BreakingNewsCard />
                    </ScrollView>}
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

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white',
        // padding: moderateScale(16),
        // marginBottom:50

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
        paddingHorizontal: 16,
        height: 90

    },
    tabItem: {
        marginRight: moderateScale(15),
        // height: 50,
        // gap:30

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
