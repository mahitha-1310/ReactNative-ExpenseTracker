import React, { useState } from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import DataItem from "../components/DataItem";
import { useData } from "../store/UserContext";
import EditDataModal from "../modals/EditDataModal";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";

interface FinancialDataScreenProps {
  navigation: any;
}

const FinancialDataScreen: React.FC<FinancialDataScreenProps> = ({
  navigation,
}) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const { currentDate, financialData, deleteData, editData } = useData();

  const currentMonth = currentDate.month() + 1;
  const currentYear = currentDate.year();

  const filteredFinancialData = financialData.filter((item) => {
    const itemMonth = moment(item.date).month() + 1;
    const itemYear = moment(item.date).year();
    return itemMonth === currentMonth && itemYear === currentYear;
  });

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
    <View style={[styles.container]}>
      <FlatList
        style={styles.flatList}
        data={filteredFinancialData}
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
            {/* <MaterialIcons name="list-alt" size={32} color="grey" /> */}
            <Image
  source={require('../assets/financialdata.png')}
  style={{ width: 200, height: 200 }}
/>
            <Text style={styles.emptyList}>
              Click on [ + ] to add new Expense/Income
            </Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFA",
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
  flatList: {
    marginTop: 15,
  },
});

export default FinancialDataScreen;
