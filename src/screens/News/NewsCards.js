import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import IMG from '../../assets/Images';
import { black } from '../../common/Colors/colors';
import { BookMark, Comment, Like, Shareing, SplashIcon, Whatsapp } from '../../assets/SVGs';

const newsData = [
    {
        id: '1',
        title: "BREAKING: Darshan's bail fate to be decided on October 14",
        description: "Bengaluru: Actor Darshan has been granted bail in the Renukaswamy murder case. Actor Darshan's bail plea has been heard...",
        reach: '3400 Reach',
        comments: '0 Comment',
        image: IMG.latestNewsImage, // Replace with the actual image URL
    },
    {
        id: '2',
        title: "BREAKING: Darshan's bail fate to be decided on October 14",
        description: "Bengaluru: Actor Darshan has been granted bail in the Renukaswamy murder case. Actor Darshan's bail plea has been heard...",
        reach: '3400 Reach',
        comments: '0 Comment',
        image: IMG.latestNewsImage, // Replace with the actual image URL
    },
];

const BreakingNewsCard = () => {
    const renderItem = ({ item }) => (
        <View style={styles.newsCard}>
            <View style={styles.newsHeader}>
                {/* <Image source={{ uri: 'logo_url' }} style={styles.logoImage} /> Add your logo URL */}
                {/* <SplashIcon/> */}
                
                <View style={styles.newsMeta}>
                    <Text style={styles.sourceText}>Voice of Karnataka</Text>
                    <Text style={styles.timeText}>23 minutes ago</Text>
                </View>
            </View>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
            <Image source={item.image} style={styles.newsImage} />
            <View style={styles.reachContainer}>
                <Text style={styles.reachText}>{item.reach}</Text>
                <Text style={styles.commentsText}>{item.comments}</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity>
                    {/* <Text style={styles.iconText}>Like</Text> */}
                    <Like />
                </TouchableOpacity>
                <TouchableOpacity>
                    {/* <Text style={styles.iconText}>Comment</Text> */}
                    <Comment />
                </TouchableOpacity>
                <TouchableOpacity>
                    {/* <Text style={styles.iconText}>Share</Text> */}
                    <Shareing style={{ bottom: 10 }} />
                </TouchableOpacity>

                <TouchableOpacity>
                    {/* <Text style={styles.iconText}>Repost</Text> */}
                    <BookMark />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <FlatList
            data={newsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.newsList}
        />
    );
};

const styles = StyleSheet.create({
    newsList: {
        padding: 10,
    },
    newsCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    newsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    newsMeta: {
        marginLeft: 10,
    },
    sourceText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: black
    },
    timeText: {
        fontSize: 12,
        color: '#888',
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#000',
    },
    descriptionText: {
        fontSize: 14,
        color: '#444',
        marginBottom: 20,
    },
    newsImage: {
        width: '100%',
        height: 250,
        borderRadius: 8,
        marginBottom: 10,
    },
    reachContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    reachText: {
        fontSize: 14,
        color: '#888',
    },
    commentsText: {
        fontSize: 14,
        color: '#888',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    iconText: {
        fontSize: 14,
        color: '#00A99D',
        fontWeight: 'bold',
    },
});

export default BreakingNewsCard;
