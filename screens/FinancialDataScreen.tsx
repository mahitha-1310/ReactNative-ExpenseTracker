import React, { useState } from "react";
import { View, ImageBackground, Text, StyleSheet, FlatList } from "react-native";
import DataItem from "../components/DataItem";
import { useData } from "../store/UserContext";
import EditDataModal from "../modals/EditDataModal"

interface FinancialDataScreenProps {
  navigation: any;
}

const FinancialDataScreen: React.FC<FinancialDataScreenProps> = ({ navigation }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const { financialData, deleteData, editData} = useData();

  const handleDelete = (dataId: string) => {
    deleteData(dataId);
  };

  const openEditModal = (data: any) => {
    setSelectedData(data);
    setEditModalVisible(true);
  };

  const saveEditedData = (editedData: any) => {
    editData(editedData.id, editedData);
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

        <FlatList
          data={financialData}
          renderItem={({ item }) => (
            <DataItem
              data={item}
              onDelete={() => handleDelete(item.id)}
              onEdit={() => openEditModal(item)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyList}>Click on [ + ] to add Expense/Income data</Text>
            </View>
          }
        />

        {selectedData && (
          <EditDataModal
            visible={editModalVisible}
            data={selectedData}
            onSave={saveEditedData}
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

export default FinancialDataScreen;
