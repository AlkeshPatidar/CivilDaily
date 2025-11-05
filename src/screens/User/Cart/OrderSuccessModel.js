import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Image,
} from 'react-native';
import { App_Primary_color, dark33, dark55, white } from '../../../common/Colors/colors';
import { FONTS_FAMILY } from '../../../assets/Fonts';
import CustomButton from '../../../components/Button';

const OrderSuccessModal = ({ visible, onTrackOrder, onBackToHome, isDarkMode }) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContent, isDarkMode && styles.modalContentDark]}>
                    <TouchableOpacity 
                        style={styles.closeButton}
                        onPress={onBackToHome}
                    >
                        <Text style={[styles.closeButtonText, isDarkMode && { color: white }]}>×</Text>
                    </TouchableOpacity>

                    <View style={styles.iconContainer}>
                        <View style={styles.checkmarkCircle}>
                            <Text style={styles.checkmark}>✓</Text>
                        </View>
                        <View style={styles.confettiLeft}>
                            <Text style={styles.confetti}>~</Text>
                        </View>
                        <View style={styles.confettiRight}>
                            <Text style={styles.confetti}>~</Text>
                        </View>
                        <View style={styles.dotTopLeft}>
                            <View style={styles.dot} />
                        </View>
                        <View style={styles.dotTopRight}>
                            <View style={styles.dot} />
                        </View>
                    </View>

                    <Text style={[styles.title, isDarkMode && { color: white }]}>
                        Your order has been accepted
                    </Text>

                    <Text style={[styles.subtitle, isDarkMode && { color: '#9ca3af' }]}>
                        Your items has been placed and is on its way to being processed
                    </Text>

                    {/* <TouchableOpacity 
                        style={styles.trackButton}
                        onPress={onTrackOrder}
                    >
                        <Text style={styles.trackButtonText}>Track Order</Text>
                    </TouchableOpacity> */}

                    {/* <TouchableOpacity 
                        style={styles.homeButton}
                        onPress={onBackToHome}
                    >
                        <Text style={[styles.homeButtonText, isDarkMode && { color: white }]}>
                            Back to Home
                        </Text>
                    </TouchableOpacity> */}
                    <CustomButton
                    title={'Back to Home'}
                    onPress={onBackToHome}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: white,
        borderRadius: 20,
        padding: 30,
        width: '90%',
        maxWidth: 400,
        alignItems: 'center',
    },
    modalContentDark: {
        backgroundColor: dark33,
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        left: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 30,
        color: '#6b7280',
        fontWeight: '300',
    },
    iconContainer: {
        marginTop: 20,
        marginBottom: 30,
        position: 'relative',
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: App_Primary_color,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmark: {
        fontSize: 40,
        color: white,
        fontWeight: 'bold',
    },
    confettiLeft: {
        position: 'absolute',
        top: 10,
        left: 0,
    },
    confettiRight: {
        position: 'absolute',
        top: 0,
        right: 10,
    },
    confetti: {
        fontSize: 30,
        color: '#fbbf24',
        transform: [{ rotate: '45deg' }],
    },
    dotTopLeft: {
        position: 'absolute',
        top: 0,
        left: 20,
    },
    dotTopRight: {
        position: 'absolute',
        top: 15,
        right: 0,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fbbf24',
    },
    title: {
        fontSize: 22,
        fontFamily: FONTS_FAMILY.Poppins_SemiBold,
        color: '#111827',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    trackButton: {
        backgroundColor: App_Primary_color,
        borderRadius: 25,
        paddingVertical: 14,
        paddingHorizontal: 40,
        width: '100%',
        alignItems: 'center',
        marginBottom: 12,
    },
    trackButtonText: {
        color: white,
        fontSize: 16,
        fontWeight: '600',
    },
    homeButton: {
        backgroundColor: 'transparent',
        paddingVertical: 14,
        paddingHorizontal: 40,
        width: '100%',
        alignItems: 'center',
    },
    homeButtonText: {
        color: '#111827',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default OrderSuccessModal;