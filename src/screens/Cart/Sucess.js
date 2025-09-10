import React from "react";
import { Image, View } from "react-native";
import IMG from "../../assets/Images";
import SpaceBetweenRow from "../../components/wrapper/spacebetween";
import { useSelector } from "react-redux";
import { darkMode25, white } from "../../common/Colors/colors";

const SucessScreen = ({ navigation }) => {
   const { isDarkMode } = useSelector(state => state.theme)

    return (
        <View style={{ flex: 1, justifyContent:'center' , backgroundColor:isDarkMode? darkMode25: white}}>
            <Image source={IMG.Content}
                style={{
                    height: 300,
                    width: 408,
                    alignSelf:'center'
                }}
                resizeMode="contain"
            />
            <SpaceBetweenRow>
                
            </SpaceBetweenRow>
        </View>
    )
}

export default SucessScreen;