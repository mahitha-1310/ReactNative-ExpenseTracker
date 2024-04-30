import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import AddDataModal from "../modals/AddDataModal";
import { useData } from "../store/UserContext";

interface AddDataProps {}

const AddData: React.FC<AddDataProps> = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const { addData } = useData();

  const openAddModal = () => {
    setAddModalVisible(true);
  };

  const saveAddedData = (addedData: any) => {
    addData(addedData);
    setAddModalVisible(false);
  };

  const cancelAddModal = () => {
    setAddModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={openAddModal}>
        <MaterialIcons name="add" size={20} color="white" />
      </TouchableOpacity>
      {addModalVisible && (
        <AddDataModal
          visible={addModalVisible}
          onSave={saveAddedData}
          onCancel={cancelAddModal}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 100,
    right: 5,
    alignSelf: "flex-end",
    backgroundColor: "black",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderColor: "#cd5b45",
    borderWidth: 3,
  },
});

export default AddData;
