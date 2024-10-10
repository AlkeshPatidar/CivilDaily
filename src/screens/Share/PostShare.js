import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { App_Primary_color, white } from "../../common/Colors/colors";
import { NavBack, PodCastIcon, PostIcon, UploadIcon } from "../../assets/SVGs"; // Use your SVG icons here
import { FONTS_FAMILY } from "../../assets/Fonts"; // Import custom fonts

const PostScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <NavBack />
        </TouchableOpacity>
        <Text style={styles.headerText}>Share</Text>
      </View>

      {/* User Information */}
      <View style={styles.userRow}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }} // Placeholder image or user's profile pic
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Rahul Sharma</Text>
          <Text style={styles.publicText}>Public</Text>
        </View>
      </View>

      {/* Text Input for Post */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Write Something..."
          placeholderTextColor="#8A8A8A"
          multiline
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.iconButton}>
          <PodCastIcon  height={29}/>
        </TouchableOpacity>
      </View>

      {/* Optional Title Input */}
      <View style={{...styles.inputContainer,flexDirection:'row', height:60, justifyContent:'flex-end'}}>
        <TextInput
          placeholder="Add title (Optional)"
          placeholderTextColor="#8A8A8A"
          style={styles.titleInput}
        />
        <TouchableOpacity style={{position:'absolute', top:12, right:10}}>
          <PodCastIcon height={29}/>
        </TouchableOpacity>
      </View>

      {/* Upload Section */}
      <View style={styles.uploadContainer}>
        <View>
        <TouchableOpacity style={styles.uploadButton}>
          <UploadIcon />
          <Text style={styles.uploadText}>Upload Image & Video</Text>
        </TouchableOpacity>
      </View>

        </View>

      {/* Post Button */}
      <TouchableOpacity style={styles.postButton}
      onPress={()=>navigation.navigate('NewsApp')}
      >
        <Text style={styles.postButtonText}>POST</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingHorizontal: moderateScale(20),
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(20),
  },
  headerText: {
    fontSize: moderateScale(18),
    color: "black",
    marginLeft: moderateScale(90),
    fontFamily: FONTS_FAMILY.Comfortaa_Bold,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(20),
  },
  profileImage: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    borderWidth: 2,
    borderColor: App_Primary_color,
  },
  userInfo: {
    marginLeft: moderateScale(15),
  },
  userName: {
    fontSize: moderateScale(16),
    color: "black",
    fontFamily: FONTS_FAMILY.Comfortaa_Bold,
  },
  publicText: {
    fontSize: moderateScale(12),
    color: "#8A8A8A",
    fontFamily: FONTS_FAMILY.Comfortaa_Regular,
  },
  inputContainer: {
    // flexDirection: "row",
    // alignItems: "center",
    marginTop: verticalScale(20),
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    // paddingVertical: verticalScale(10),
    height:150,
    backgroundColor:'rgba(248, 248, 248, 1)'
  },
  textInput: {
    // flex: 1,
    fontSize: moderateScale(14),
    color: "black",
    fontFamily: FONTS_FAMILY.Comfortaa_Regular,
  },
  titleInput: {
    flex: 1,
    fontSize: moderateScale(14),
    color: "black",
    fontFamily: FONTS_FAMILY.Comfortaa_Regular,
  },
  iconButton: {
    marginLeft: moderateScale(10),
    position:'absolute',
    bottom:10,
    right:10
  },
  uploadContainer: {
    marginTop: verticalScale(20),
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: moderateScale(10),
    padding: verticalScale(20),
    justifyContent: "center",
    alignItems: "center",
    height:150,
    borderStyle:'dashed'
  },
  uploadButton: {
    // flexDirection: "row",
    alignItems: "center",
  },
  uploadText: {
    fontSize: moderateScale(14),
    color: "#8A8A8A",
    fontFamily: FONTS_FAMILY.Comfortaa_Regular,
    marginLeft: moderateScale(10),
  },
  postButton: {
    backgroundColor: App_Primary_color,
    borderRadius: moderateScale(4),
    paddingVertical: verticalScale(8),
    alignItems: "center",
    marginTop: verticalScale(30),
  },
  postButtonText: {
    fontSize: moderateScale(16),
    color: white,
    fontFamily: FONTS_FAMILY.Comfortaa_Bold,
  },
});

export default PostScreen;
