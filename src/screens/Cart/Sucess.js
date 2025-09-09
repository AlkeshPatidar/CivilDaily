import React from "react";
import { Image, View } from "react-native";
import IMG from "../../assets/Images";
import SpaceBetweenRow from "../../components/wrapper/spacebetween";

const SucessScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent:'center' }}>
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