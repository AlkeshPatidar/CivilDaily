import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IMG from '../../assets/Images';
import { App_Primary_color } from '../../common/Colors/colors';
import { moderateScale } from 'react-native-size-matters';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { NavBack } from '../../assets/SVGs';

const data = [
    {
        id: '1',
        name: '3749',
        time: '18 days ago',
        content: 'ಜೋಡಿಹಕ್ಕಿ',
        reach: 3,
        comments: 0,
        image: 'https://via.placeholder.com/50',
    },
    {
        id: '2',
        name: '9380136571',
        time: '23 days ago',
        content: 'ಧಾರವಾಡ ಸಿಟ್ಟು ಧಾರವಾಡ ಸಿಟ್ಟು ಕ್ಯಾಮರಾ',
        reach: 4,
        comments: 0,
        image: 'https://via.placeholder.com/50',
    },
    {
        id: '3',
        name: 'cYN',
        time: '27 days ago',
        content: 'ಬಾಗಲಕೋಟೆ',
        reach: 20,
        likes: 1,
        comments: 0,
        image: 'https://via.placeholder.com/50',
    },
];

const QuestionsScreen = ({navigation}) => {
    const [followed, setFollowed] = useState([]);

    const toggleFollow = (id) => {
        setFollowed((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const renderHeader = () => {
        return (
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <NavBack />
                </TouchableOpacity>
                <Text style={styles.headerText}>Questions</Text>
            </View>
        )
    }

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.header}>
                <Image source={IMG.ProfileIcon} style={styles.profileImage} />
                <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <TouchableOpacity
                    style={styles.followButton}
                    onPress={() => toggleFollow(item.id)}
                >
                    <Text style={styles.followText}>
                        {followed.includes(item.id) ? 'Following' : 'Follow'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <AntDesign name="ellipsis1" size={20} color="gray" />
                </TouchableOpacity>
            </View>
            <Text style={styles.content}>{item.content}</Text>
            <View style={styles.reachSection}>
                <Text style={styles.reach}>Reach: {item.reach}</Text>
                <Text style={styles.comments}>Comments: {item.comments}</Text>
            </View>
            <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                    <View>
                        <AntDesign name="like2" size={20} color="gray" />
                        <Text style={{
                            fontSize: 12,
                            color: 'black'
                        }}>Like</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <View style={{ alignItems: 'center' }}>
                        <MaterialCommunityIcons name="comment-outline" size={20} color="gray" />
                        <Text style={{
                            fontSize: 12,
                            color: 'black'
                        }}>Comment</Text>

                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <View style={{ alignItems: 'center' }}>

                        <FontAwesome5 name="share" size={20} color="gray" />
                        <Text style={{ 
                            fontSize: 12,
                            color: 'black'
                        }}>Share</Text>

                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <FontAwesome5 name="whatsapp" size={20} color="green" />
                        <Text style={{
                            fontSize: 12,
                            color: 'black'
                        }}>WhatsApp</Text>

                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <View style={{ alignItems: 'center' }}>
                        <AntDesign name="retweet" size={20} color="gray" />
                        <Text style={{
                            fontSize: 12,
                            color: 'black'
                        }}>Re-post</Text>

                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    card: {
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    info: {
        flex: 1,
        marginLeft: 10,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        color:'black'
    },
    time: {
        color: 'gray',
    },
    followButton: {
        backgroundColor:App_Primary_color,
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    followText: {
        color: 'white',
        fontWeight: 'bold',
    },
    content: {
        marginVertical: 10,
        fontSize: 14,
    },
    reachSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    reach: {
        color: 'gray',
    },
    comments: {
        color: 'gray',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
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

export default QuestionsScreen;
