
import React, { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

interface AddDataModalProps {
  visible: boolean;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const AddDataModal: React.FC<AddDataModalProps> = ({
  visible,
  onSave,
  onCancel,
}) => {
  const [amount, setAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedType, setSelectedType] = useState("expense");
  const [selectedCategory, setSelectedCategory] = useState("");
  const expenseCategories = ["Food", "Rent", "Utilities", "Transportation", "Others"];
  const incomeCategories = ["Salary", "Freelance", "Investment", "Gifts", "Others"];
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
  };

  const categories =
    selectedType === "expense" ? expenseCategories : incomeCategories;

  const addData = () => {
    if (
      amount.trim() === "" ||
      selectedDate === null ||
      selectedCategory === ""
    )
      return Alert.alert("Error", "Please fill in all the mandatory fields.");
    if(
      description.trim().length>250
    ) return Alert.alert("Error", "Description can't contain more than 250 characters.");
    const newData = {
      id: String(Date.now()),
      amount: amount.trim(),
      type: selectedType,
      date: selectedDate,
      description: description,
      category: selectedCategory,
    };
    setAmount("");
    setSelectedDate(null);
    setSelectedCategory("");
    onSave(newData);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const clearDate = () => {
    setSelectedDate(null);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.heading}>ADD INCOME/EXPENSE DATA</Text>

          <View style={styles.switchContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                selectedType === "income" && styles.selectedTypeButton,
              ]}
              onPress={() => setSelectedType("income")}
            >
              <Text style={styles.switchButtonText}>INCOME</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                selectedType === "expense" && styles.selectedTypeButton,
              ]}
              onPress={() => setSelectedType("expense")}
            >
              <Text style={styles.switchButtonText}>EXPENSE</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter Amount"
            value={amount}
            keyboardType="numeric"
            onChangeText={setAmount}
          />

          <View style={[styles.container, styles.input]}>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={showDatePickerModal}
            >
              <TextInput
                style={styles.inputContainer}
                placeholder="Choose Date"
                editable={false}
                value={selectedDate ? selectedDate.toDateString() : ""}
              />
              <MaterialIcons name="event" size={24} color="black" />
            </TouchableOpacity>
            {selectedDate && (
              <TouchableOpacity style={styles.clearButton} onPress={clearDate}>
                <Ionicons name="close" size={20} color="gray" />
              </TouchableOpacity>
            )}
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
          <TextInput
        style={styles.input}
        placeholder="Enter description (optional)"
        value={description}
        onChangeText={handleDescriptionChange}
      />
          <View style={styles.categorySelector}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            >
              <Picker.Item label="Select Category" value="" />
              {selectedType === "expense"
                ? expenseCategories.map((category) => (
                    <Picker.Item
                      key={category}
                      label={category}
                      value={category}
                    />
                  ))
                : incomeCategories.map((category) => (
                    <Picker.Item
                      key={category}
                      label={category}
                      value={category}
                    />
                  ))}
            </Picker>
          </View>
          

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>CANCEL</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={addData}>
              <Text style={styles.buttonText}>SAVE</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#702632",
    margin: 20,
    borderRadius: 10,
  },
  buttonText: {
    padding: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  heading: {
    color: "black",
    padding: 15,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
  },
  modalView: {
    backgroundColor: "#FFFFFA",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "90%",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    color: "#000",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#000",
    width: "100%",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  clearButton: {
    marginLeft: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignContent: "space-between",
  },
  typeButton: {
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 50,
    borderColor: "#702632",
    borderWidth: 3,
  },
  selectedTypeButton: {
    backgroundColor: "#912F40",
  },
  switchButtonText: {
    color: "black",
    padding: 10,
    fontSize: 14,
    fontWeight: "bold"

  },
  categorySelector:{
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#000",
    width: "100%",
  }
  
});

export default AddDataModal;
