import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import { App_Primary_color, white } from '../../common/Colors/colors';
import { FONTS_FAMILY } from '../../assets/Fonts';

const { width } = Dimensions.get('window');

export default function UpdateExpenseModal({
  visible,
  onClose,
  expense,
  setExpense,
  onConfirm,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.keyboardView}
          >
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContainer}>
                <ScrollView
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                >
                  <Text style={styles.modalTitle}>Edit Expense</Text>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                      style={styles.input}
                      value={expense.Title}
                      onChangeText={(text) =>
                        setExpense((prev) => ({ ...prev, Title: text }))
                      }
                      placeholder="Enter expense title"
                      placeholderTextColor="#999"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Amount</Text>
                    <TextInput
                      style={styles.input}
                      value={expense.Amount}
                      onChangeText={(text) =>
                        setExpense((prev) => ({ ...prev, Amount: text }))
                      }
                      placeholder="Enter amount"
                      placeholderTextColor="#999"
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Note</Text>
                    <TextInput
                      style={[styles.input, styles.textArea]}
                      value={expense.Note}
                      onChangeText={(text) =>
                        setExpense((prev) => ({ ...prev, Note: text }))
                      }
                      placeholder="Enter note (optional)"
                      placeholderTextColor="#999"
                      multiline
                      numberOfLines={3}
                    />
                  </View>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={onClose}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.confirmButton}
                      onPress={onConfirm}
                    >
                      <Text style={styles.confirmButtonText}>Update</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  modalContainer: {
    backgroundColor: white,
    borderRadius: 16,
    padding: 20,
    width: width * 0.9, // 90% of screen width
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  modalTitle: {
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 14,
  },
  label: {
    fontFamily: FONTS_FAMILY.Poppins_Medium,
    fontSize: 13,
    color: '#333',
    marginBottom: 6,
  },
  input: {
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    gap: 10,
  },
  cancelButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  cancelButtonText: {
    fontFamily: FONTS_FAMILY.Poppins_Medium,
    fontSize: 14,
    color: '#666',
  },
  confirmButton: {
    backgroundColor: App_Primary_color,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  confirmButtonText: {
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    fontSize: 14,
    color: white,
  },
});
