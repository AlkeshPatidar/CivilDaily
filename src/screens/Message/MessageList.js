import React, {useEffect, useState} from 'react'
import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import CustomText from '../../components/TextComponent'
import color, {App_Primary_color} from '../../common/Colors/colors'
import Row from '../../components/wrapper/row'
import {
  BackArrow,
  BackMsg,
  BcIcon,
  BlueForword,
  EyeIcon,
  ForwardIcon,
  LoginLogo,
  NotiIcon,
  RedPolygon,
  SearchIcon,
  SearchIcons,
  SignUPLogo,
} from '../../assets/SVGs'
import {FONTS_FAMILY} from '../../assets/Fonts'
import CustomInputField from '../../components/wrapper/CustomInput'
import CustomButton from '../../components/Button'
import SpaceBetweenRow from '../../components/wrapper/spacebetween'
import IMG from '../../assets/Images'
import useStatusBar from '../../utils/statusBar'
import {useSelector} from 'react-redux'
import useLoader from '../../utils/LoaderHook'
import {apiGet} from '../../utils/Apis'
import urls from '../../config/urls'
import {useFocusEffect} from '@react-navigation/native'

const MessageScreen = ({navigation}) => {
  useStatusBar(App_Primary_color, 'light-content')
  let selector = useSelector(state => state?.user?.userData)
  if (Object.keys(selector).length != 0) {
    selector = JSON.parse(selector)
  }

  const renderHeader = () => {
    return (
      <Row style={{gap: 90, marginTop: 50, marginHorizontal: 20}}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <CustomText
          style={{
            color: 'white',
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 15,
          }}>
          Message
        </CustomText>
      </Row>
    )
  }

  const renderWhiteBgItmes = () => {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'rgba(255, 255, 255, 1)',
          marginTop: 30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        {renderItems()}
      </ScrollView>
    )
  }

  const renderItems = () => {
    return (
      <View style={{flex: 1, marginBottom: 100}}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                padding: 12,
                backgroundColor: 'white',
                marginTop: 8,
                width: '97%',
                // elevation: 1,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 4},
                shadowOpacity: 0.3,
                shadowRadius: 4,
                borderRadius: 10,
                margin: 9,
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={() =>
                navigation.navigate('ChatScreen')
              }>
              <SpaceBetweenRow style={{width: '100%'}}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Image
                    source={IMG.AvatorImage}
                    style={{
                      height: 42,
                      width: 42,
                      borderRadius: 21,
                    }}
                  />
                  <View>
                    <CustomText
                      style={{
                        fontFamily: FONTS_FAMILY.Poppins_SemiBold,
                        fontSize: 14,
                      }}>
                      {'Alex Linderson'}
                    </CustomText>
                    <CustomText
                      style={{
                        fontFamily: FONTS_FAMILY.Poppins_SemiBold,
                        fontSize: 12,
                        color: 'rgba(151, 151, 151, 1)',
                      }}>
                      How are you today?{' '}
                    </CustomText>
                  </View>
                </View>
                <CustomText style={{
                  fontSize:12
                }}>2 min ago</CustomText>
              </SpaceBetweenRow>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }

  return (
    <View
      style={{
        backgroundColor: App_Primary_color,
        flex: 1,
      }}>
      <StatusBar
        translucent={true}
        backgroundColor='transparent'
        barStyle='light-content'
      />
      {renderHeader()}
      {renderWhiteBgItmes()}

      <View
        style={{
          height: 5,
          width: 134,
          backgroundColor: 'rgba(202, 202, 202, 1)',
          alignSelf: 'center',
          position: 'absolute',
          bottom: 8,
          borderRadius: 8,
        }}
      />
    </View>
  )
}

export default MessageScreen
