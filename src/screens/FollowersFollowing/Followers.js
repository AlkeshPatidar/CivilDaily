import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { NavBack } from '../../assets/SVGs';
import IMG from '../../assets/Images';

const Followers = ({navigation}) => {
    // Sample data for people the user is following
    const followingData = [
        {
            id: '1',
            name: 'ವಾಯ್ ಆಫ್ ಪಿರ್...',
            email: 'devusnj@gmail.com',
            image: IMG.ProfileIcon, // Replace with actual image URL
            followingStatus: 'following',
        },
        {
            id: '2',
            name: 'Sujatha Nagaraj',
            email: null,
            image: IMG.ProfileIcon, // Replace with actual image URL
            followingStatus: 'following',
        },
    ];

    const renderHeader = () => {
        return (
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <NavBack />
                </TouchableOpacity>
                <Text style={styles.headerText}>Following</Text>
            </View>
        )
    }

    // Render each following item
    const renderItem = ({ item }) => (
        <View style={styles.listItem}>
            <Image source={item?.image} style={styles.profileImage} />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                {item.email && <Text style={styles.email}>{item.email}</Text>}
            </View>
            <Text style={styles.following}>{item.followingStatus}</Text>
        </View>
    );


    return (
        <View style={styles.container}>
            {/* Header */}
            {renderHeader()}

            {/* List of people following */}
            <FlatList
                data={followingData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: verticalScale(20),
        paddingHorizontal:20
    },
    headerText: {
        fontSize: moderateScale(18),
        color: "black",
        marginLeft: moderateScale(90),
        fontFamily: FONTS_FAMILY.Comfortaa_Bold,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#00A693',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 15,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    listContainer: {
        padding: 10,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#e0e0e0',
        paddingHorizontal:20
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    email: {
        fontSize: 14,
        color: '#757575',
    },
    following: {
        color: '#9e9e9e',
        fontSize: 14,
    },
});

export default Followers;
