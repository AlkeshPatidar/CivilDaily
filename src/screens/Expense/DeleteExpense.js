// ==================== FILE 3: DeleteExpenseModal.js ====================

import React from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { white } from '../../common/Colors/colors';
import { FONTS_FAMILY } from '../../assets/Fonts';

export default function DeleteExpenseModal({ visible, onClose, currentExpense, onConfirm, isDarkMode }) {
    const styles = StyleSheet.create({
        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContainer: {
            backgroundColor: white,
            borderRadius: 12,
            padding: 20,
            width:300,
            maxWidth: 400,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 5,
        },
        modalTitle: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 18,
            color: '#333',
            marginBottom: 16,
        },
        modalMessage: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 14,
            color: '#666',
            lineHeight: 22,
            marginBottom: 24,
        },
        expenseTitle: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            color: '#333',
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: 12,
        },
        cancelButton: {
            paddingHorizontal: 16,
            paddingVertical: 10,
        },
        cancelButtonText: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 14,
            color: '#666',
        },
        deleteButton: {
            backgroundColor: '#F44336',
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 8,
        },
        deleteButtonText: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 14,
            color: white,
        },
    });

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={onClose}
            >
                <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Delete Expense</Text>
                        
                        <Text style={styles.modalMessage}>
                            Are you sure you want to delete{' '}
                            <Text style={styles.expenseTitle}>"{currentExpense?.Title}"</Text>
                            ? This action cannot be undone.
                        </Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={onConfirm}>
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
}