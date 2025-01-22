import React, { useState } from "react";
import { Alert, FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CustomText from "../../components/TextComponent";
import color, { App_Primary_color } from "../../common/Colors/colors";
import Row from "../../components/wrapper/row";
import { BackArrow, BcIcon, BlackBack, BlueForword, BlueLocation, Code, EyeIcon, ForwardIcon, ImageCover, LoginLogo, NotiIcon, RedPolygon, SearchIcon, SearchIcons, SignUPLogo } from "../../assets/SVGs";
import { FONTS_FAMILY } from "../../assets/Fonts";
import CustomInputField from "../../components/wrapper/CustomInput";
import CustomButton from "../../components/Button";
import SpaceBetweenRow from "../../components/wrapper/spacebetween";
import IMG from "../../assets/Images";


import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { BASE_URL, getItem } from "../../utils/Apis";
import axios from "axios";
import { ToastMsg } from "../../utils/helperFunctions";


const ScanRetrun = ({ navigation , route}) => {

    const [isScanned, setIsScanned] = useState(false);

    
    const handleQRCodeScan = async (e) => {
        // if (isScanned) return; // Prevent multiple scans
        // setIsScanned(true);
    
        const productId = e.data; // Scanned product ID
        console.log("Scanned Product ID:", productId);
    
            try {
                const token = await getItem('token');
                console.log("Token:", token);
                if (!token) {
                    ToastMsg("Token is missing");
                    setIsScanned(false); // Reset scanning
                    return;
                }
    
                const response = await axios.post(
                    `${BASE_URL}/api/user/ScanForReturnProduct/${productId}`, // Use dynamic productId
                    {}, // Replace with the actual body if required
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("API Response:", response.data);
    
                // Replace ToastMsg with console for testing
                ToastMsg('Scanned');
                navigation.goBack(); // Navigate back on success
            } catch (error) {
                console.error("API Error:", error.response?.data || error.message);
    
                // Show error message using ToastMsg or fallback
                ToastMsg(error.response?.data?.message || "API call failed");
                navigation.goBack();
                // setIsScanned(false); // Reset scanning on error
            }
    
    };
    
    // const simulateScan = () => {
    //     // Simulate a scan by manually triggering the onRead handler
    //     handleQRCodeScan({ data: '677e44daa151c769eeda10bf' });
    // };
    

    const renderHeader = () => {
        return (
            <Row style={{ gap: 20, marginTop: 50, }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BlackBack />
                </TouchableOpacity>
                <CustomText style={{
                    color: 'black',
                    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
                    fontSize: 18
                }}>Scan Barcode For Retrun</CustomText>

            </Row>
        )
    }




    const renderWhiteBgItmes = () => {
        return (
            <ScrollView contentContainerStyle={{
                flex: 1,
                // backgroundColor: 'rgba(255, 255, 255, 1)',
                marginTop: 0,
                // borderTopLeftRadius: 30,
                // borderTopRightRadius: 30,
                paddingHorizontal: 20,
                paddingVertical: 20,
                alignItems: 'center'
            }}>

                <CustomText style={{
                    fontSize: 20,
                    fontFamily: FONTS_FAMILY.Poppins_Medium,
                    textAlign: 'center'
                }}>Place Your Barcode In {'\n'}Scan Area </CustomText>
                <View style={{ marginTop: -200, alignItems: 'center', justifyContent: 'center' }}>
                    {/* <ImageCover /> */}
                    {/* <Code/> */}
                    <QRCodeScanner
                        cameraStyle={{ height: 300, width: 300, alignSelf: 'center' }}
                        onRead={handleQRCodeScan}
                        flashMode={RNCamera.Constants.FlashMode.torch}
                    // bottomContent={

                    // }
                    />
                </View>
            </ScrollView>
        )
    }






    return (
        <View style={{
            // backgroundColor: App_Primary_color,
            flex: 1,
            marginHorizontal: 20
        }}>
            <StatusBar
                translucent={true}
                backgroundColor="transparent"
                barStyle="dark-content"
            />
            {renderHeader()}
            {renderWhiteBgItmes()}

            {/* <CustomButton
                title={'Scaning.....'}
                style={{
                    position: 'absolute',
                    bottom: 50
                }}
                // onPress={() => navigation.navigate('AddIssues')}
                onPress={simulateScan}

                
            /> */}

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

export default ScanRetrun;


const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});


// import React, { useState } from "react";
// import { Alert, StatusBar, StyleSheet, Text, View } from "react-native";
// import QRCodeScanner from "react-native-qrcode-scanner";
// import { RNCamera } from "react-native-camera";
// import { BASE_URL, getItem } from "../../utils/Apis";

// const Scan = ({navigation}) => {
//     const [isScanned, setIsScanned] = useState(false); // To prevent multiple scans

//     // const handleQRCodeScan = (e) => {
//     //     if (isScanned) return; // Prevent multiple scans
//     //     setIsScanned(true);

//     //     const productId = e.data;
//     //     console.log("Scanned Product ID:", productId);

//     //     // Show the scanned product ID in an alert
//     //     Alert.alert("Scanned Product ID", productId, [
//     //         { text: "OK", onPress: () => setIsScanned(false) }, // Allow scanning again
//     //     ]);
//     // };

  

//     return (
//         <View style={{ flex: 1 }}>
//             <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
//             <View style={styles.header}>
//                 <Text style={styles.headerText}>Scan Barcode</Text>
//             </View>
//             <QRCodeScanner
//                 onRead={handleQRCodeScan}
//                 flashMode={RNCamera.Constants.FlashMode.auto}
//                 showMarker
//                 topContent={null}
//                 bottomContent={null}
//             />
//         </View>
//     );
// };

// export default Scan;

// const styles = StyleSheet.create({
//     header: {
//         height: 60,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#f5f5f5",
//         elevation: 2,
//     },
//     headerText: {
//         fontSize: 18,
//         fontWeight: "bold",
//         color: "#333",
//     },
//     centerText: {
//         fontSize: 16,
//         padding: 16,
//         textAlign: "center",
//         color: "#777",
//     },
//     camera: {
//         height: 400,
//         width: "100%",
//         alignSelf: "center",
//     },
// });
