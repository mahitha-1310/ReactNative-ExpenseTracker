import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

interface EditDataModalProps {
  visible: boolean;
  data: any;
  onSave: (editedData: any) => void;
  onCancel: () => void;
}

const EditDataModal: React.FC<EditDataModalProps> = ({
  visible,
  data,
  onSave,
  onCancel,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editedAmount, setEditedAmount] = useState(data.amount);
  const [editedDate, setEditedDate] = useState(data.date);
  const [editedType, setEditedType] = useState(data.type);
  const [editedCategory, setEditedCategory] = useState(data.category);
  const [editedDescription, setEditedDescription] = useState(data.description);
  const expenseCategories = [
    "Food",
    "Rent",
    "Utilities",
    "Transportation",
    "Others",
  ];
  const incomeCategories = [
    "Salary",
    "Freelance",
    "Investment",
    "Gifts",
    "Others",
  ];

  useEffect(() => {
    setEditedAmount(data.amount);
    setEditedDate(data.date);
    setEditedCategory(data.category);
    setEditedType(data.type);
    setEditedDescription(data.description);
  }, [visible]);

  const handleSave = () => {
    if (
      editedAmount.trim() === "" ||
      editedDate === null ||
      editedCategory === ""
    )
      return Alert.alert("", "Please fill in all the mandatory fields.");
    if (!/^\d*\.?\d*$/.test(editedAmount.trim()))
      return Alert.alert("", "Please enter valid amount.");
    if (editedDescription.trim().length > 250)
      return Alert.alert(
        "",
        "Description can't contain more than 250 characters."
      );
    onSave({
      ...data,
      amount: editedAmount.trim(),
      type: editedType,
      date: editedDate,
      description: editedDescription,
      category: editedCategory,
    });
  };

  const handleDescriptionChange = (text: string) => {
    setEditedDescription(text);
  };

  const handleDateChange = (event: any, editedDate?: Date) => {
    setShowDatePicker(false);
    if (editedDate) {
      setEditedDate(editedDate);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const clearDate = () => {
    setEditedDate(null);
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
          <Text style={styles.heading}>EDIT INCOME/EXPENSE DATA</Text>

          <View style={styles.switchContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                editedType === "income" && styles.selectedTypeButton,
              ]}
              onPress={() => setEditedType("income")}
            >
              <Text
                style={[
                  styles.switchButtonText,
                  editedType === "income" && styles.selectedTypeButtonText,
                ]}
              >
                INCOME
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                editedType === "expense" && styles.selectedTypeButton,
              ]}
              onPress={() => setEditedType("expense")}
            >
              <Text
                style={[
                  styles.switchButtonText,
                  editedType === "expense" && styles.selectedTypeButtonText,
                ]}
              >
                EXPENSE
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter Amount"
            value={editedAmount}
            keyboardType="numeric"
            onChangeText={setEditedAmount}
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
                value={editedDate ? new Date(editedDate).toDateString() : ""}
              />
              <MaterialIcons name="event" size={24} color="black" />
            </TouchableOpacity>
            {editedDate && (
              <TouchableOpacity style={styles.clearButton} onPress={clearDate}>
                <Ionicons name="close" size={20} color="gray" />
              </TouchableOpacity>
            )}
            {showDatePicker && (
              <DateTimePicker
                value={new Date(editedDate) || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter description (optional)"
            value={editedDescription}
            onChangeText={handleDescriptionChange}
          />
          <View style={styles.categorySelector}>
            <Picker
              selectedValue={editedCategory}
              onValueChange={(itemValue) => setEditedCategory(itemValue)}
            >
              <Picker.Item label="Select Category" value="" />
              {editedType === "expense"
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
            <Pressable style={styles.button} onPress={handleSave}>
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
    width: "30%",
    alignItems: "center",
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
    fontWeight: "bold",
  },
  categorySelector: {
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#000",
    width: "100%",
  },
  selectedTypeButtonText: {
    color: "#FFFFFA",
  },
});

export default EditDataModal;
