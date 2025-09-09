import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    ImageBackground,
} from 'react-native';
import IMG from '../../assets/Images';
import { BackWhite, BackIcon, BackBlackBg } from '../../assets/SVGs';
import { FONTS_FAMILY } from '../../assets/Fonts';
import CustomInputField from '../../components/wrapper/CustomInput';

const { width, height } = Dimensions.get('window');

const OrderTrackingScreen = ({ navigation }) => {
    const orderSteps = [
        { id: 1, label: 'Accepted', completed: true },
        { id: 2, label: 'Pickup', active: true },
        { id: 3, label: 'On the way', completed: false },
        { id: 4, label: 'Completed', completed: false }
    ];



    const HomeIcon = () => (
        <View style={styles.homeIconContainer}>
            <Text style={styles.homeIconText}>🏠</Text>
        </View>
    );

    const MapPin = () => (
        <View style={styles.mapPinContainer}>
            <Text style={styles.mapPinText}>📍</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />


            {/* Map Area with Background Image */}
            <ImageBackground style={styles.mapContainer}
                source={IMG.MapImage}

            >

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackBlackBg />
                    </TouchableOpacity>



                </View>
            </ImageBackground>

            {/* Bottom Sheet */}
            <View style={styles.bottomSheet}>
                <View style={styles.orderInfo}>
                    <Text style={styles.orderTitle}>Picking up your order</Text>
                    <Text style={styles.deliveryTime}>
                        Estimated delivery time <Text style={styles.timeHighlight}>20 mins</Text>
                    </Text>
                </View>

                {/* Progress Steps */}
                <View style={styles.progressContainer}>
                    {orderSteps.map((step, index) => (
                        <View key={step.id} style={styles.stepContainer}>
                            <View style={styles.stepIconContainer}>
                                <View style={[
                                    styles.stepCircle,
                                    step.completed ? styles.completedStep :
                                        step.active ? styles.activeStep : styles.pendingStep
                                ]}>
                                    {step.completed && <Text style={styles.checkmark}>✓</Text>}
                                    {step.active && <View style={styles.activeIndicator} />}
                                </View>
                                {index < orderSteps.length - 1 && (
                                    <View style={[
                                        styles.progressLine,
                                        step.completed ? styles.completedLine : styles.pendingLine
                                    ]} />
                                )}
                            </View>
                            <Text style={[
                                styles.stepLabel,
                                step.completed || step.active ? styles.activeLabel : styles.inactiveLabel
                            ]}>
                                {step.label}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Courier Info */}
                <View style={styles.courierContainer}>
                    <View style={styles.courierAvatar}>
                        <Text style={styles.courierAvatarText}>👨</Text>
                    </View>
                    <View style={styles.courierDetails}>
                        <Text style={styles.courierLabel}>Courier</Text>
                        <Text style={styles.courierName}>Tommy Lee</Text>
                    </View>
                </View>

                {/* Message Button */}
                {/* <TouchableOpacity style={styles.messageButton}>
                    <Text style={styles.messageIcon}>💬</Text>
                    <Text style={styles.messageText}>Send a message</Text>
                </TouchableOpacity> */}

                <CustomInputField
               placeholder={'Send a message'}
                />

                {/* Home Indicator */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backArrow: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    backArrowText: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
    },
    statusBarInfo: {
        alignItems: 'center',
    },
    time: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    carrier: {
        fontSize: 12,
        color: '#8E8E93',
    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signalBars: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginRight: 8,
    },
    bar: {
        width: 3,
        backgroundColor: '#000',
        marginRight: 1,
    },
    bar1: { height: 4 },
    bar2: { height: 6 },
    bar3: { height: 8 },
    wifiIcon: {
        fontSize: 12,
        marginRight: 5,
    },
    batteryIcon: {
        fontSize: 14,
    },
    mapContainer: {
        flex: 1,
    },
    mapBackground: {
        flex: 1,
        backgroundColor: '#E5E5E7',
        position: 'relative',
    },
    mapMarker: {
        position: 'absolute',
    },
    gasStation: {
        backgroundColor: '#FF3B30',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    gasText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    culturalCenter: {
        backgroundColor: '#C7F9CC',
        padding: 6,
        borderRadius: 8,
        alignItems: 'center',
    },
    culturalText: {
        fontSize: 8,
        color: '#34C759',
        fontWeight: '600',
    },
    homeIconContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#000',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    homeIconText: {
        fontSize: 16,
    },
    atmMarker: {
        backgroundColor: '#5856D6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    atmText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    mapPinContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#000',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapPinText: {
        fontSize: 16,
    },
    parkArea: {
        position: 'absolute',
        backgroundColor: '#C7F9CC',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
    },
    parkLabel: {
        fontSize: 12,
        color: '#34C759',
        fontWeight: '600',
        textAlign: 'center',
    },
    areaLabel: {
        position: 'absolute',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#8E8E93',
    },
    compassButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 44,
        height: 44,
        backgroundColor: '#fff',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    compassIcon: {
        fontSize: 20,
    },
    bottomSheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 34,
        elevation:2
    },
    orderInfo: {
        marginBottom: 32,
    },
    orderTitle: {
        fontSize: 16,
        fontFamily: FONTS_FAMILY.Poppins_Medium,
        color: '#000',
        marginBottom: 2,
    },
    deliveryTime: {
        fontSize: 16,
        color: '#8E8E93',
        fontFamily: FONTS_FAMILY.Poppins_Regular
    },
    timeHighlight: {
        fontWeight: 'bold',
        color: '#000',
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    stepContainer: {
        flex: 1,
        alignItems: 'center',
    },
    stepIconContainer: {
        alignItems: 'center',
        marginBottom: 8,
        position: 'relative',
    },
    stepCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    completedStep: {
        backgroundColor: '#34C759',
    },
    activeStep: {
        backgroundColor: '#007AFF',
    },
    pendingStep: {
        backgroundColor: '#C7C7CC',
    },
    checkmark: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    activeIndicator: {
        width: 16,
        height: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    progressLine: {
        position: 'absolute',
        top: 16,
        left: 32,
        width: width / 4 - 32,
        height: 2,
    },
    completedLine: {
        backgroundColor: '#34C759',
    },
    pendingLine: {
        backgroundColor: '#C7C7CC',
    },
    stepLabel: {
        fontSize: 12,
        textAlign: 'center',
        maxWidth: 60,
    },
    activeLabel: {
        color: '#000',
        fontWeight: '600',
    },
    inactiveLabel: {
        color: '#8E8E93',
    },
    divider: {
        height: 1,
        backgroundColor: '#F2F2F7',
        marginBottom: 20,
    },
    courierContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    courierAvatar: {
        width: 40,
        height: 40,
        backgroundColor: '#FF9500',
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    courierAvatarText: {
        fontSize: 20,
    },
    courierDetails: {
        flex: 1,
    },
    courierLabel: {
        fontSize: 14,
        fontFamily: FONTS_FAMILY.Poppins_SemiBold,
        color: '#000',
        // marginBottom: 4,
    },
    courierName: {
        fontSize: 14,
        color: '#8E8E93',
        fontFamily: FONTS_FAMILY.Poppins_Regular,

    },
    messageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        marginBottom: 20,
    },
    messageIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    messageText: {
        fontSize: 16,
        color: '#8E8E93',
    },
    homeIndicator: {
        width: 134,
        height: 5,
        backgroundColor: '#000',
        borderRadius: 2.5,
        alignSelf: 'center',
    },
});

export default OrderTrackingScreen;