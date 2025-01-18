import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StatusBar, TextInput, TouchableOpacity, View } from "react-native";
import CustomText from "../../components/TextComponent";
import color, { App_Primary_color } from "../../common/Colors/colors";
import Row from "../../components/wrapper/row";
import { BackArrow, BcIcon, BlueForword, EyeIcon, ForwardIcon, LoginLogo, NotiIcon, RedPolygon, SearchIcon, SearchIcons, SignUPLogo } from "../../assets/SVGs";
import { FONTS_FAMILY } from "../../assets/Fonts";
import CustomInputField from "../../components/wrapper/CustomInput";
import CustomButton from "../../components/Button";
import SpaceBetweenRow from "../../components/wrapper/spacebetween";
import IMG from "../../assets/Images";
import useStatusBar from "../../utils/statusBar";
import { useSelector } from "react-redux";
import useLoader from "../../utils/LoaderHook";
import { apiGet } from "../../utils/Apis";
import urls from "../../config/urls";

const Home = ({ navigation }) => {
  useStatusBar(App_Primary_color, 'light-content')
  let selector = useSelector(state => state?.user?.userData);
  if (Object.keys(selector).length != 0) {
    selector = JSON.parse(selector);
  }

  const { showLoader, hideLoader } = useLoader()
  // console.log(selector);

  const [allProduct, setAllProduct] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      showLoader()
      const response = await apiGet(urls.getAllProduct);
      console.log('-------------', response);
      if (response?.statusCode === 200) {
        console.log('==========', response.data);
        setAllProduct(response?.data)
        hideLoader()

      }



    } catch (error) {
      console.log('Error fetching user data:', error);
      // ToastMsg(error?.message || 'Network Error');
      hideLoader()
    }
  };




  const renderHeader = () => {
    return (
      <SpaceBetweenRow style={{ marginTop: 50, marginHorizontal: 20, gap: 30 }}>
        <Row style={{ gap: 20 }}>
          <Image source={IMG.AvatorImage}
            style={{
              height: 40,
              width: 40,
              borderRadius: 100
            }}
          />
          <CustomText style={{
            color: 'white',
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 15
          }}>Hi, {selector?.FullName}</CustomText>

        </Row>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <NotiIcon />
        </TouchableOpacity>
      </SpaceBetweenRow>
    )
  }




  const renderWhiteBgItmes = () => {
    return (
      <ScrollView style={{
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        marginTop: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 20
      }}>

        <Row style={{ gap: 10 }}>
          <View style={
            {
              borderWidth: 1,
              borderColor: 'rgba(203, 203, 203, 1)',
              height: 44,
              borderRadius: 10,
              flex: 1

            }
          }>
            <TextInput
              placeholder="Search"
              style={{
                fontSize: 14,
                color: 'rgba(202, 202, 202, 1)'
              }}
              placeholderTextColor={'rgba(202, 202, 202, 1)'}

            />
            <SearchIcons style={{
              position: 'absolute',
              right: 10,
              top: 8
            }} />

          </View>
          <TouchableOpacity style={{
            backgroundColor: App_Primary_color,
            height: 44,
            width: 44,
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'center'
          }}
            // onPress={()=>navigation.navigate('AddIssues')}
            onPress={() => navigation.navigate('Scan')}

          >
            <BcIcon />
          </TouchableOpacity>
        </Row>
        <SpaceBetweenRow style={{
          padding: 12,
          backgroundColor: 'white',
          marginTop: 20,
          width: '97%',
          elevation: 3, // Android shadow
          shadowColor: '#000', // iOS shadow color
          shadowOffset: { width: 0, height: 4 }, // Offset for shadow
          shadowOpacity: 0.3, // Opacity for shadow
          shadowRadius: 4, // Spread radius for shadow
          // height: 100,
          borderRadius: 10,
          margin: 9,
          alignSelf: 'center'
        }}>
          <View>
            <CustomText style={{
              color: 'rgba(107, 114, 128, 1)',
              fontFamily: FONTS_FAMILY.Poppins_SemiBold,
              fontSize: 14
            }}>Inventory</CustomText>
            <Row style={{ gap: 10 }}>
              <CustomText style={{
                fontFamily: FONTS_FAMILY.Poppins_SemiBold,
                fontSize: 18
              }}>250 Items</CustomText>
              <Row style={{ gap: 3 }}>
                <CustomText style={{
                  fontFamily: FONTS_FAMILY.Poppins_SemiBold,
                  fontSize: 12,
                  color: 'red'
                }}>10%</CustomText>
                <RedPolygon />

              </Row>


            </Row>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Information')}>
            <Row style={{ gap: 3, bottom: 15 }}>
              <CustomText style={{
                fontFamily: FONTS_FAMILY.Poppins_SemiBold,
                fontSize: 13,
                color: App_Primary_color
              }}>See All</CustomText>
              <BlueForword />
            </Row>

          </TouchableOpacity>
        </SpaceBetweenRow>
        {renderItems()}
      </ScrollView>
    )
  }

  const renderItems = () => {
    const data = [
      {
        id: 1,
        title: "Electrical wire",
        quantity: 2,
        image: "url_to_electrical_wire_image",
        status: "Out of stock",
      },
      {
        id: 2,
        title: "Camera",
        quantity: 2,
        image: "url_to_camera_image",
        status: "Out of stock",
      },
      {
        id: 3,
        title: "Led Light",
        quantity: 2,
        image: "url_to_led_light_image",
        status: "Out of stock",
      },
      {
        id: 4,
        title: "Led Light",
        quantity: 2,
        image: "url_to_led_light_image",
        status: "Out of stock",
      },
      {
        id: 5,
        title: "Led Light",
        quantity: 2,
        image: "url_to_led_light_image",
        status: "Out of stock",
      },
      {
        id: 6,
        title: "Led Light",
        quantity: 2,
        image: "url_to_led_light_image",
        status: "Out of stock",
      },
      {
        id: 7,
        title: "Led Light",
        quantity: 2,
        image: "url_to_led_light_image",
        status: "Out of stock",
      },
    ];

    return (
      <View style={{ flex: 1, marginBottom: 100 }}>
        <FlatList
          data={allProduct}
          keyExtractor={(item) => item._id} // Ensure unique keys
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                padding: 12,
                backgroundColor: "white",
                marginTop: 8,
                width: "97%",
                elevation: 1, // Android shadow
                shadowColor: "#000", // iOS shadow color
                shadowOffset: { width: 0, height: 4 }, // Offset for shadow
                shadowOpacity: 0.3, // Opacity for shadow
                shadowRadius: 4, // Spread radius for shadow
                borderRadius: 10,
                margin: 9,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}

              onPress={()=>navigation.navigate('productDetail',{productId:item?._id})}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Image
                  source={item?.Image?{uri:item?.Image}:IMG.AvatorImage} // Replace with your default image or a placeholder
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
                    }}
                  >
                    {item?.ProductName}
                  </CustomText>
                  <CustomText
                    style={{
                      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
                      fontSize: 12,
                      color: "rgba(151, 151, 151, 1)",
                    }}
                  >
                 Company:   {item.Companyname}
                  </CustomText>
                  <CustomText
                    style={{
                      fontFamily: FONTS_FAMILY.Poppins_SemiBold,
                      fontSize: 12,
                      color: "rgba(151, 151, 151, 1)",
                    }}
                  >
                     Quantity:  {item.Quantity}
                  </CustomText>
                </View>
              </View>
              {console.log('------->', item)
              }
              <CustomText
                style={{
                  fontFamily: FONTS_FAMILY.Poppins_Medium,
                  fontSize: 10,
                  color: "red",
                }}
              >
                {'Out of Stock'}
              </CustomText>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };




  return (
    <View style={{
      backgroundColor: App_Primary_color,
      flex: 1
    }}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {renderHeader()}
      {renderWhiteBgItmes()}


      <View style={{
        height: 5,
        width: 134,
        backgroundColor: 'rgba(202, 202, 202, 1)',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 8,
        borderRadius: 8
      }} />
    </View>
  )
}

export default Home;