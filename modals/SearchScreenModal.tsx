import React, { useState } from "react";
import {
  Modal,
  Text,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";
import DataItem from "../components/DataItem";
import { useData } from "../store/UserContext";
import EditDataModal from "./EditDataModal";
import { MaterialIcons } from "@expo/vector-icons";

interface SearchScreenModalProps {
  visible: boolean;
  onCancel: () => void;
}

const SearchScreenModal: React.FC<SearchScreenModalProps> = ({
  visible,
  onCancel,
}) => {
  const [searchText, setSearchText] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null); 
  const { financialData, deleteData, editData} =
    useData();

  const filteredTasks = financialData.filter((data) =>
    data.amount.toLowerCase().includes(searchText.toLowerCase()) || data.category.toLowerCase().includes(searchText.toLowerCase()) || data.type.toLowerCase().includes(searchText.toLowerCase()) || data.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const openEditModal = (task: any) => {
    setSelectedTask(task);
    setEditModalVisible(true);
  };

  const saveEditedTask = (editedTask: any) => {
    editData(editedTask.id, editedTask);
    setEditModalVisible(false);
  };

  const cancelEditModal = () => {
    setEditModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onCancel}
    >
        <View style={styles.container}>
          <Pressable style={styles.button} onPress={onCancel}>
            <Text style={styles.buttonText}>GO BACK</Text>
          </Pressable>
          <TextInput
            testID="search"
            style={styles.searchText}
            placeholderTextColor="#d4d5d6"
            placeholder="Search data..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <FlatList
            style={styles.flatlist}
            contentContainerStyle={{ flexGrow: 1 }}
            data={filteredTasks}
            renderItem={({ item }) => (
              <DataItem
                data={item}
                onDelete={() => deleteData(item.id)}
                onEdit={() => openEditModal(item)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
            <MaterialIcons name="list-alt" size={32} color="grey" />
            <Text style={styles.emptyList}>
             No data found
            </Text>
          </View>
            }
          />
          {selectedTask && (
            <EditDataModal
              visible={editModalVisible}
              data={selectedTask}
              onSave={saveEditedTask}
              onCancel={cancelEditModal}
            />
          )}
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({

  container: {
    flex:1,
    backgroundColor: "#080705",
  },
  button: {
    backgroundColor: "#702632",
    margin: 20,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  buttonText: {
    padding: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  searchText: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: "#000",
    margin: 20,
    borderRadius: 5,
    color: "#fff",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  emptyList: {
    fontSize: 14,
    color: "grey",
    marginTop: 10,
  },
  flatlist:{

  }
});

export default SearchScreenModal;
