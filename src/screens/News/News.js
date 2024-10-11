import React, { useState } from "react";
import { Image, ImageBackground, ScrollView, TouchableOpacity, View } from "react-native";
import CustomText from "../../components/TextComponent";
import IMG, { Avatar } from "../../assets/Images";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { BookMark, Comment, Copylink, Embed, Facebook, Like, Linkedin, NavBack, Pinterest, Reddit, Shareing, Threedot, Twitter, Whatsapp } from "../../assets/SVGs";
import Row from "../../components/wrapper/row";
import { FONTS_FAMILY } from "../../assets/Fonts";
import color, { App_Primary_color } from "../../common/Colors/colors";
import SpaceBetweenRow from "../../components/wrapper/spacebetween";
import BottomSlider from "../../components/Modals/BottomSlider/BottomSlider";
import PickInterest from "../Choose/PickInterest";


const initialState = {
    openBottomSlider: false,
};


const News = ({ navigation }) => {
    const [{ openBottomSlider }, setState] = useState(initialState);


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
    return (
        <View style={{ flex: 1 }}>

            <ScrollView style={{ flex: 1, }}
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 30 }}
            >

                <ImageBackground source={IMG.BgImage}
                    style={{
                        height: verticalScale(320), width: '98%',

                    }}
                    resizeMode="contain"
                >
                    <SpaceBetweenRow>
                        <TouchableOpacity style={{ paddingVertical: 20, paddingHorizontal: 20 }}
                            onPress={() => navigation.goBack()}
                        >
                            <NavBack />

                        </TouchableOpacity>
                        <Row style={{ paddingHorizontal: 20, gap: 10 }}>
                            <TouchableOpacity style={{}}
                                onPress={onOpenBottomSlider}
                            >
                                <Shareing />

                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.71)',
                                height: 40,
                                width: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 100
                            }}>
                                <Threedot />

                            </TouchableOpacity>

                        </Row>
                    </SpaceBetweenRow>

                </ImageBackground>
                <Row style={{ alignSelf: 'flex-start', gap: 20, marginHorizontal: 20, fontFamily: FONTS_FAMILY.Comfortaa_Medium, marginTop: 10 }}>
                    <Image source={IMG.Avatar} />
                    <CustomText style={{

                    }}>Samuel Newton</CustomText>
                </Row>

                <View style={{ marginHorizontal: moderateScale(20), marginTop: verticalScale(20), gap: 5, }}>
                    <CustomText style={{
                        fontFamily: FONTS_FAMILY.Comfortaa_Regular,
                        color: App_Primary_color,
                        fontSize: 12
                    }}>TECHNOLOGY</CustomText>
                    <CustomText style={{
                        fontSize: 22,
                        fontFamily: FONTS_FAMILY.Comfortaa_SemiBold
                    }}>To build responsibly, tech needs to do more than just hire chief ethics officers</CustomText>
                    <CustomText style={{
                        color: 'rgba(20, 30, 40, 0.48)',
                        fontSize: 12,
                        fontFamily: FONTS_FAMILY.Comfortaa_Regular
                    }}>17 June, 2023 — 4:49 PM</CustomText>
                </View>
                    <View style={{ height: 1, width: '80%', backgroundColor: 'rgba(20, 30, 40, 0.08)', marginTop: verticalScale(20) }} />
                <CustomText style={{ marginHorizontal: 20, marginTop: 20, fontSize: 16, fontFamily: FONTS_FAMILY.Comfortaa_Regular, marginBottom:100 }}>In the last couple of years, we’ve seen new teams in tech companies emerge that focus on responsible innovation, digital well-being, AI ethics or humane use. Whatever their titles, these individuals are given the task of “leading” ethics at their companies.</CustomText>

            </ScrollView>
                <View style={{ height: 80, elevation: 1, backgroundColor: 'white', paddingHorizontal: 20, justifyContent: 'center',  width: '100%', bottom: 65 }}>
                    <SpaceBetweenRow>
                        <Row style={{ gap: 10 }}>
                            <Like />
                            <CustomText>24.5K</CustomText>
                        </Row>
                        <Row style={{ gap: 10 }}>
                            <Comment />
                            <CustomText>24.5K</CustomText>
                        </Row>
                        <Row style={{ gap: 10 }}>
                            <BookMark />
                        </Row>
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