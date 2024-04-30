import React, { useState } from "react";
import {
  Modal,
  Text,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  FlatList,
  ImageBackground,
} from "react-native";
import TaskItem from "../components/TaskItem";
import { useTask } from "../store/StateContext";
import EditDataModal from "./EditDataModal";

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
  const [selectedTask, setSelectedTask] = useState<any>(null); // Adjust type according to your task type
  const { tasks, deleteTask, editTask} =
    useTask();

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const openEditModal = (task: any) => {
    setSelectedTask(task);
    setEditModalVisible(true);
  };

  const saveEditedTask = (editedTask: any) => {
    editTask(editedTask.id, editedTask);
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
      <ImageBackground
        style={styles.background}
        source={require("../assets/background.jpg")}
      >
        <View style={styles.overlay}>
          <Pressable style={styles.button} onPress={onCancel}>
            <Text style={styles.buttonText}>GO BACK</Text>
          </Pressable>
          <TextInput
            testID="search"
            style={styles.searchText}
            placeholderTextColor="#d4d5d6"
            placeholder="Search tasks..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <FlatList
            style={styles.flatlist}
            contentContainerStyle={{ flexGrow: 1 }}
            data={filteredTasks}
            renderItem={({ item }) => (
              <TaskItem
                task={item}
                onDelete={() => deleteTask(item.id)}
                onEdit={() => openEditModal(item)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyList}>No tasks found</Text>
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
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    margin: 20,
  },
  text: {
    color: "yellow",
  },
  button: {
    backgroundColor: "#cd5b45",
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    padding: 20,
    backgroundColor: "grey",
  },
  emptyList: {
    fontSize: 16,
    color: "black",
  },
  flatlist:{

  }
});

export default SearchScreenModal;
