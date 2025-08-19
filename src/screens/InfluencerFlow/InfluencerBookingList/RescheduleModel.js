import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { apiPut } from '../../../utils/Apis';
import App from '../../../../App';
import { App_Primary_color } from '../../../common/Colors/colors';
import { FONTS_FAMILY } from '../../../assets/Fonts';

const RescheduleModal = ({ visible, onClose, collaborationId, onSubmit }) => {
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [reason, setReason] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setNewDate(date.toISOString().split('T')[0]); // YYYY-MM-DD format
    }
  };

  const handleTimeChange = (event, time) => {
    setShowTimePicker(false);
    if (time) {
      setSelectedTime(time);
      setNewTime(time.toTimeString().split(' ')[0]); // HH:MM:SS format
    }
  };

  const handleSubmit = () => {
    if (!newDate || !newTime || !reason.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const data = {
      NewDate: newDate,
      NewTime: newTime,
      Reason: reason.trim()
    };

    onSubmit(collaborationId, data);
    // apiPut()
    
    // Reset form
    setNewDate('');
    setNewTime('');
    setReason('');
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Reschedule Collaboration</Text>
          
          {/* New Date */}
          <Text style={styles.label}>New Date</Text>
          <TouchableOpacity 
            style={styles.input} 
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.inputText}>
              {newDate || 'Select Date'}
            </Text>
          </TouchableOpacity>
          
          {/* New Time */}
          <Text style={styles.label}>New Time</Text>
          <TouchableOpacity 
            style={styles.input} 
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.inputText}>
              {newTime || 'Select Time'}
            </Text>
          </TouchableOpacity>
          
          {/* Reason */}
          <Text style={styles.label}>Reason</Text>
          <TextInput
            style={[styles.input, styles.textInput]}
            placeholder="Enter reason"
            value={reason}
            onChangeText={setReason}
            placeholderTextColor={'#999'}
            multiline
          />
          
          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
          
          {/* Date Picker */}
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          
          {/* Time Picker */}
          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#252525',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
    fontFamily: FONTS_FAMILY.Poppins_Regular
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    color:'black'
  },
  inputText: {
    color: '#333',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    fontSize: 14,
  },
  textInput: {
    height: 80,
    textAlignVertical: 'top',

  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButton: {
    flex: 1,
    padding: 15,
    marginLeft: 10,
    backgroundColor: App_Primary_color,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelText: {
    color: '#333',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RescheduleModal;