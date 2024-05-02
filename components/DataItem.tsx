import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DataItemModal from "../modals/DataItemModal";

interface DataItemProps {
  data: any;
  onDelete: () => void;
  onEdit: () => void;
}

const DataItem: React.FC<DataItemProps> = ({ data, onDelete, onEdit }) => {
  const date = data.date ? new Date(data.date).toDateString() : "";
  const isExpense = data.type === "expense";
  const [modalVisible, setModalVisible] = useState(false);
  const typeColor = isExpense ? "#912F40" : "#3f8ceb";
  const amountPrefix = isExpense ? "-" : "+";

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <>
      <TouchableOpacity onPress={toggleModal}>
        <View style={[styles.container, { borderBlockColor: typeColor }]}>
          <View>
            <Text style={[styles.title]}>{data.category}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
          <View style={styles.currencyContainer}>
            <Text style={[styles.title, { color: typeColor }]}>
              {amountPrefix}{" "}
            </Text>
            <MaterialIcons name="currency-rupee" size={14} color={typeColor} />
            <Text style={[styles.title, { color: typeColor }]}>
              {data.amount}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {modalVisible && (
        <DataItemModal
          data={data}
          onClose={toggleModal}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFA",
    borderWidth: 1.5,
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    margin: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "gray",
    flex: 0.7,
  },
  currencyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DataItem;
