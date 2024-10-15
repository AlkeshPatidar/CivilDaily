import React, { useState } from "react";
import { Image, ImageBackground, ScrollView, TouchableOpacity, View } from "react-native";
import CustomText from "../../components/TextComponent";
import IMG, { Avatar } from "../../assets/Images";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { BookMark, Comment, Copylink, Embed, Facebook, Like, Linkedin, NavBack, Pinterest, Reddit, Shareing, Threedot, Twitter, Whatsapp } from "../../assets/SVGs";
import Row from "../../components/wrapper/row";
import { FONTS_FAMILY } from "../../assets/Fonts";
import color, { App_Primary_color, white } from "../../common/Colors/colors";
import SpaceBetweenRow from "../../components/wrapper/spacebetween";
import BottomSlider from "../../components/Modals/BottomSlider/BottomSlider";
import PickInterest from "../Choose/PickInterest";


const initialState = {
    openBottomSlider: false,
};


const News = ({ navigation, route }) => {
    const [{ openBottomSlider }, setState] = useState(initialState);
    const type = route?.params?.type

    const onCloseBottomSlider = () => {
        setState(prev => ({
            ...prev,
            openBottomSlider: false,
        }));
    };

    const onOpenBottomSlider = () => {
        setState(prev => ({
            ...prev,
            openBottomSlider: true,
        }));
    };

    const renderHeader = () => {
        return (

            <Row style={{ backgroundColor: App_Primary_color, paddingHorizontal: 20, gap:90 }}>
                <TouchableOpacity style={{ paddingVertical: 10, }}
                    onPress={() => navigation.goBack()}
                >
                    <NavBack />
                </TouchableOpacity>
                <CustomText style={{ color: white, fontFamily: FONTS_FAMILY.Comfortaa_Regular }}>{type=="Hubli"?"Local News":type}</CustomText>
               {type=="Hubli" && <TouchableOpacity
               style={{
                position:'absolute' , right:3,
               }}
               onPress={()=>navigation.navigate('LocationSelection')}
               ><CustomText style={{ color: white, fontFamily: FONTS_FAMILY.Comfortaa_Regular, fontSize: 12, }}>Change Location</CustomText></TouchableOpacity>}
            </Row>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            {renderHeader()}
            <ScrollView style={{ flex: 1, }}
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 30 }}
            >
                <Image source={IMG.BgImage}
                    style={{
                        height: verticalScale(220), width: '98%',

                    }} />


                <View style={{ marginHorizontal: moderateScale(10), marginTop: verticalScale(10), gap: 5, }}>

                    <CustomText style={{
                        fontSize: 18,
                        fontFamily: FONTS_FAMILY.Comfortaa_SemiBold
                    }}>To build responsibly, tech needs to do more than just hire chief ethics officers</CustomText>

                </View>
                <View style={{ height: 1, width: '80%', backgroundColor: 'rgba(20, 30, 40, 0.08)', marginTop: verticalScale(20) }} />
                <CustomText style={{ marginHorizontal: 20, marginTop: 20, fontSize: 16, fontFamily: FONTS_FAMILY.Comfortaa_Regular, marginBottom: 100 }}>In the last couple of years, we’ve seen new teams in tech companies emerge that focus on responsible innovation, digital well-being, AI ethics or humane use. Whatever their titles, these individuals are given the task of “leading” ethics at their companies.</CustomText>

            </ScrollView>
            <View style={{ height: 80, elevation: 1, backgroundColor: 'white', paddingHorizontal: 20, justifyContent: 'center', width: '100%', position: 'absolute', bottom: 0 }}>
                <SpaceBetweenRow>
                    <View style={{ alignItems: 'center' }}>
                        <Like />
                        <CustomText style={{ fontSize: 12 }}>Like</CustomText>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Comment />
                        <CustomText style={{ fontSize: 12 }}>Comment</CustomText>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Shareing />
                        <CustomText style={{ fontSize: 12 }}>Share</CustomText>
                    </View>
                    {/* <View style={{ alignItems:'center', position:'absolute', right:20}}>
                        <Whatsapp height={40} />
                    </View> */}
                </SpaceBetweenRow>

            </View>
            <BottomSlider

                isOpen={openBottomSlider}
                isPotrait={true}
                onClose={false}
                outerPress={onCloseBottomSlider}
                sliderHeight={0.3}
                sliderStyles={{ padding: 0 }}
            >
                <CustomText style={{
                    fontFamily: FONTS_FAMILY.Comfortaa_SemiBold,
                    marginTop: 10
                }}>Share News</CustomText>
                <View style={{ height: 0.5, backgroundColor: 'rgba(218, 221, 229, 1)', width: '100%', marginTop: 20 }} />
                <View style={{ marginTop: 15, marginHorizontal: 10, gap: 10 }}>
                    <Row>
                        <Copylink height={70} width={80} />
                        <Embed height={70} width={80} />
                        <Facebook height={70} width={80} />
                        <Twitter height={70} width={80} />
                    </Row>
                    <Row>
                        <Pinterest height={70} width={80} />
                        <Linkedin height={70} width={80} />
                        <Whatsapp height={70} width={80} />
                        <Reddit height={70} width={80} />
                    </Row>
                </View>

            </BottomSlider>
        </View>

    )
}

export default News;