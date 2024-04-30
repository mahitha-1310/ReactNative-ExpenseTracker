import React, { useState } from "react";
import { View, ImageBackground, Text, StyleSheet, FlatList } from "react-native";
import TaskItem from "../components/TaskItem";
// import { useTask } from "../store/StateContext";
import EditDataModal from "../modals/EditDataModal";
import { useData } from "../store/UserContext";
import { useTask } from "../store/StateContext";

interface TasksScreenProps {
  navigation: any;
}

const TasksScreen: React.FC<TasksScreenProps> = ({ navigation }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const { tasks, deleteTask, editTask} = useTask();

  const handleDelete = (taskId: string) => {
    deleteTask(taskId);
  };

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
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={[styles.container, styles.overlay]}>
        
          <Text style={styles.heading}>PENDING TASKS</Text>

        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onDelete={() => handleDelete(item.id)}
              onEdit={() => openEditModal(item)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyList}>Click on [ + ] to add tasks</Text>
            </View>
          }
        />

        {/* {tasks.some((item) => item.completed) && (
          <Text style={styles.heading}>COMPLETED TASKS</Text>
        )}
        <FlatList
          data={tasks.filter((item) => item.completed)}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onDelete={() => handleDelete(item.id)}
              onEdit={() => openEditModal(item)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        /> */}

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
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  heading: {
    marginTop: 50,
    backgroundColor: "rgba(0, 0, 0, 0.80)",
    color: "white",
    padding: 15,
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 18,
    borderRadius: 50,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "grey",
  },
  emptyList: {
    fontSize: 16,
    color: "black",
  },
});

export default TasksScreen;
