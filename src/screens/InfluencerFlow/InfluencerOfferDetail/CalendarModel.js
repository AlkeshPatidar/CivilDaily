// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Modal,
//   StyleSheet,
//   Animated,
//   Dimensions,
//   TouchableWithoutFeedback,
//   ScrollView,
// } from 'react-native';
// import { Calendar } from 'react-native-calendars';

// const { height: screenHeight } = Dimensions.get('window');

// const CalendarModal = ({ isVisible, onClose, onSubmit, initialDate = new Date() }) => {
//   const [slideAnim] = useState(new Animated.Value(screenHeight));
//   const [selectedDate, setSelectedDate] = useState(initialDate.toISOString().split('T')[0]);
//   const [selectedTime, setSelectedTime] = useState('09:00 AM');

//   const timeSlots = [
//     '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
//     '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
//   ];

//   useEffect(() => {
//     if (isVisible) {
//       setSelectedDate(initialDate.toISOString().split('T')[0]);
      
//       Animated.spring(slideAnim, {
//         toValue: 0,
//         useNativeDriver: true,
//         tension: 65,
//         friction: 11,
//       }).start();
//     } else {
//       Animated.spring(slideAnim, {
//         toValue: screenHeight,
//         useNativeDriver: true,
//         tension: 65,
//         friction: 11,
//       }).start();
//     }
//   }, [isVisible, slideAnim, initialDate]);

//   const handleClose = () => {
//     Animated.spring(slideAnim, {
//       toValue: screenHeight,
//       useNativeDriver: true,
//       tension: 65,
//       friction: 11,
//     }).start(() => {
//       onClose();
//     });
//   };

//   const handleSubmit = () => {
//     onSubmit({
//       date: new Date(selectedDate),
//       time: selectedTime,
//     });
//     // handleClose();
//   };

//   const onDayPress = (day) => {
//     setSelectedDate(day.dateString);
//   };

//   const markedDates = {
//     [selectedDate]: {
//       selected: true,
//       selectedColor: App_Primary_color,
//       selectedTextColor: 'white'
//     }
//   };

//   return (
//     <Modal
//       visible={isVisible}
//       transparent
//       animationType="none"
//       onRequestClose={handleClose}
//     >
//       <TouchableWithoutFeedback onPress={handleClose}>
//         <View style={styles.overlay}>
//           <TouchableWithoutFeedback>
//             <Animated.View
//               style={[
//                 styles.modalContainer,
//                 {
//                   transform: [{ translateY: slideAnim }],
//                 },
//               ]}
//             >
//               {/* Header */}
//               <View style={styles.header}>
//                 <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
//                   <Text style={styles.closeButtonText}>×</Text>
//                 </TouchableOpacity>
//                 <Text style={styles.title}>Barter</Text>
//                 <View style={styles.placeholder} />
//               </View>

//               <ScrollView style={styles.content} >
//                 {/* Select Date Section */}
//                 <View style={styles.section}>
//                   <Text style={styles.sectionTitle}>Select Date</Text>
                  
//                   <Calendar
//                     onDayPress={onDayPress}
//                     markedDates={markedDates}
//                     theme={{
//                       backgroundColor: '#ffffff',
//                       calendarBackground: '#ffffff',
//                       textSectionTitleColor: '#b6c1cd',
//                       selectedDayBackgroundColor: '#D64A3A',
//                       selectedDayTextColor: '#ffffff',
//                       todayTextColor: '#D64A3A',
//                       dayTextColor: '#2d4150',
//                       textDisabledColor: '#d9e1e8',
//                       dotColor: '#D64A3A',
//                       selectedDotColor: '#ffffff',
//                       arrowColor: '#D64A3A',
//                       disabledArrowColor: '#d9e1e8',
//                       monthTextColor: '#2d4150',
//                       indicatorColor: '#D64A3A',
//                       textDayFontFamily: 'System',
//                       textMonthFontFamily: 'System',
//                       textDayHeaderFontFamily: 'System',
//                       textDayFontWeight: '400',
//                       textMonthFontWeight: '600',
//                       textDayHeaderFontWeight: '600',
//                       textDayFontSize: 16,
//                       textMonthFontSize: 16,
//                       textDayHeaderFontSize: 12
//                     }}
//                     style={styles.calendar}
//                   />
//                 </View>

//                 {/* Select Time Section */}
//                 <View style={styles.section}>
//                   <Text style={styles.sectionTitle}>Select Time</Text>
//                   <View style={styles.timeSlots}>
//                     {timeSlots.map((time) => (
//                       <TouchableOpacity
//                         key={time}
//                         style={[
//                           styles.timeSlot,
//                           selectedTime === time && styles.selectedTimeSlot
//                         ]}
//                         onPress={() => setSelectedTime(time)}
//                       >
//                         <Text style={[
//                           styles.timeText,
//                           selectedTime === time && styles.selectedTimeText
//                         ]}>
//                           {time}
//                         </Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                 </View>
//               </ScrollView>

//               {/* Submit Button */}
//               <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//                 <Text style={styles.submitButtonText}>Submit</Text>
//               </TouchableOpacity>
//             </Animated.View>
//           </TouchableWithoutFeedback>
//         </View>
//       </TouchableWithoutFeedback>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'flex-end',
//   },
//   modalContainer: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     paddingBottom: 20,
//     maxHeight: screenHeight*0.85,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F0F0F0',
//   },
//   closeButton: {
//     width: 32,
//     height: 32,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     fontSize: 24,
//     color: '#666',
//     fontWeight: '300',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//   },
//   placeholder: {
//     width: 32,
//     height: 32,
//   },
//   content: {
//     // flex: 1,
//   },
//   section: {
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 16,
//   },
//   calendar: {
//     borderRadius: 12,
//   },
//   timeSlots: {
//     gap: 8,
//   },
//   timeSlot: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     marginBottom: 4,
//     backgroundColor: '#F5F5F5',
//   },
//   selectedTimeSlot: {
//     backgroundColor: '#D64A3A',
//   },
//   timeText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   selectedTimeText: {
//     color: 'white',
//     fontWeight: '600',
//   },
//   submitButton: {
//     backgroundColor: '#D64A3A',
//     marginHorizontal: 20,
//     paddingVertical: 16,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   submitButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default CalendarModal;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { App_Primary_color, darkMode25 } from '../../../common/Colors/colors';
import { useSelector } from 'react-redux';

const { height: screenHeight } = Dimensions.get('window');

const CalendarModal = ({ isVisible, onClose, onSubmit, initialDate = new Date() }) => {
  const [slideAnim] = useState(new Animated.Value(screenHeight));
  const [selectedDate, setSelectedDate] = useState(initialDate.toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('09:00 AM');
  const {isDarkMode} = useSelector(state => state.theme)

  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (isVisible) {
      // Reset to today's date when modal opens
      const currentDate = new Date().toISOString().split('T')[0];
      setSelectedDate(currentDate);
      
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: screenHeight,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    }
  }, [isVisible, slideAnim]);

  const handleClose = () => {
    Animated.spring(slideAnim, {
      toValue: screenHeight,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start(() => {
      onClose();
    });
  };

  const handleSubmit = () => {
    onSubmit({
      date: new Date(selectedDate),
      time: selectedTime,
    });
    handleClose(); // Uncommented to close modal after submit
  };

  const onDayPress = (day) => {
    console.log('Selected date:', day.dateString); // Debug log
    setSelectedDate(day.dateString);
  };

  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: '#D64A3A',
      selectedTextColor: 'white'
    }
  };


  const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor:isDarkMode? darkMode25: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 20,
    maxHeight: screenHeight * 0.85,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
    fontWeight: '300',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: isDarkMode?'white':'#333',
  },
  placeholder: {
    width: 32,
    height: 32,
  },
  content: {
    // flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    // backgroundColor:'black'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color:isDarkMode?'white': '#333',
    marginBottom: 16,
  },
  selectedDateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  calendar: {
    borderRadius: 12,
    backgroundColor:isDarkMode?'#5555':'white'
  },
  timeSlots: {
    gap: 8,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
    backgroundColor:isDarkMode?'#5555': '#F5F5F5',
  },
  selectedTimeSlot: {
    backgroundColor: App_Primary_color,
  },
  timeText: {
    fontSize: 16,
    color:isDarkMode?'white': '#333',
  },
  selectedTimeText: {
    color: 'white',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: App_Primary_color,
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.modalContainer,
                {
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Barter</Text>
                <View style={styles.placeholder} />
              </View>

              <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Select Date Section */}
                <View style={styles.section}>
                  {/* <Text style={styles.sectionTitle}>Select Date</Text>
                  <Text style={styles.selectedDateText}>
                    Selected: {new Date(selectedDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </Text> */}
                  
                 <Calendar
  onDayPress={onDayPress}
  markedDates={markedDates}
  minDate={today} // Disable past dates
  enableSwipeMonths={true} // Enable month navigation
  
  theme={{
    backgroundColor: isDarkMode ? '#333333' : '#ffffff',
    calendarBackground: isDarkMode ? '#333333' : '#ffffff',
    textSectionTitleColor: isDarkMode ? '#aaaaaa' : '#b6c1cd',
    selectedDayBackgroundColor: App_Primary_color,
    selectedDayTextColor: '#ffffff',
    todayTextColor: App_Primary_color,
    dayTextColor: isDarkMode ? '#ffffff' : '#2d4150',
    textDisabledColor: isDarkMode ? '#666666' : '#d9e1e8',
    dotColor: App_Primary_color,
    selectedDotColor: '#ffffff',
    arrowColor: App_Primary_color,
    disabledArrowColor: isDarkMode ? '#666666' : '#d9e1e8',
    monthTextColor: isDarkMode ? '#ffffff' : '#2d4150',
    indicatorColor: App_Primary_color,
    textDayFontFamily: 'System',
    textMonthFontFamily: 'System',
    textDayHeaderFontFamily: 'System',
    textDayFontWeight: '400',
    textMonthFontWeight: '600',
    textDayHeaderFontWeight: '600',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 12
  }}
  style={styles.calendar}
/>
                </View>

                {/* Select Time Section */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Select Time</Text>
                  <View style={styles.timeSlots}>
                    {timeSlots.map((time) => (
                      <TouchableOpacity
                        key={time}
                        style={[
                          styles.timeSlot,
                          selectedTime === time && styles.selectedTimeSlot
                        ]}
                        onPress={() => setSelectedTime(time)}
                      >
                        <Text style={[
                          styles.timeText,
                          selectedTime === time && styles.selectedTimeText
                        ]}>
                          {time}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </ScrollView>

              {/* Submit Button */}
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};



export default CalendarModal;