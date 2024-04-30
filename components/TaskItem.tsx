import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

interface TaskItemProps {
  task: any;
  onDelete: () => void;
  onEdit: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onDelete,
  onEdit,
}) => {
  const deadLine = task.deadline ? new Date(task.deadline).toDateString() : "";

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={onToggleComplete} style={styles.icon}>
        {task.completed ? (
          <MaterialIcons name="check" size={20} color="green" />
        ) : (
          <MaterialIcons name="circle" size={20} color="black" />
        )}
      </TouchableOpacity> */}

      <Text style={[styles.title]}>
        {task.title}
      </Text>

      <Text style={styles.deadline}>{deadLine}</Text>

      <TouchableOpacity onPress={onEdit} style={styles.icon}>
        <MaterialIcons name="edit" size={20} color="#000" />
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={onToggleFavorites} style={styles.icon}>
        <MaterialIcons
          name="star"
          size={20}
          color={task.favorites ? "orange" : "black"}
        />
      </TouchableOpacity> */}

      <TouchableOpacity onPress={onDelete}>
        <MaterialIcons name="circle" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    margin: 20,
  },
  title: {
    flex: 1.5,
    fontSize: 14,
  },
  deadline: {
    fontSize: 14,
    color: "gray",
    flex: 0.7,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  icon: {
    paddingRight: 10,
  },
});

export default TaskItem;
