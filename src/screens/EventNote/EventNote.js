import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Row from "../../components/wrapper/row";
import { BlackBack } from "../../assets/SVGs";
import CustomText from "../../components/TextComponent";
import { FONTS_FAMILY } from "../../assets/Fonts";
import { App_Primary_color } from "../../common/Colors/colors";
import useStatusBar from "../../utils/statusBar";

const AddNoteScreen = ({navigation}) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [description, setDescription] = useState("");
 useStatusBar('white','dark-content')

  const handleSaveNote = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    console.log("Note Saved", {
      title,
      date: date.toISOString().split("T")[0],
      description,
    });
    Alert.alert("Success", "Your note has been saved!");

    // Reset fields after saving
    setTitle("");
    setDate(new Date());
    setDescription("");
  };

  const showDatePickerModal = () => setShowDatePicker(true);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  
  const renderHeader = () => {
    return (
        <Row style={{ gap: 20, marginTop: 50, marginHorizontal: 20 }}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <BlackBack />
            </TouchableOpacity>
            <CustomText style={{
                color: 'black',
                fontFamily: FONTS_FAMILY.Poppins_SemiBold,
                fontSize: 18
            }}>Add Note</CustomText>

        </Row>
    )
}

  return (
    <View style={styles.container}>
        {renderHeader()}
        <View style={{
            marginHorizontal:20,
            marginTop:20
        }}>
        <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter note title"
        placeholderTextColor="gray"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Date</Text>
      <TouchableOpacity onPress={showDatePickerModal} style={styles.datePickerButton}>
        <Text style={styles.datePickerText}>
          {date.toISOString().split("T")[0]}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onDateChange}
        />
      )}

      <Text style={styles.label}>Event Description</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: "top" }]}
        placeholder="Enter event description"
        placeholderTextColor="gray"
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
        <Text style={styles.saveButtonText}>Save Note</Text>
      </TouchableOpacity>
        </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontSize: 16,
    fontFamily:FONTS_FAMILY.Poppins_Medium,
    marginBottom: 10,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    color: "#000",
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  datePickerText: {
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor:App_Primary_color,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddNoteScreen;
