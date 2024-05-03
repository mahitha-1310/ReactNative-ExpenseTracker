// import React, { useState } from "react";
// import {
//   View,
//   ImageBackground,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
// } from "react-native";
// import DataItem from "../components/DataItem";
// import { useData } from "../store/UserContext";
// import EditDataModal from "../modals/EditDataModal";
// import moment from "moment";
// import { MaterialIcons } from "@expo/vector-icons";
// import { TouchableOpacity } from "react-native-gesture-handler";

// interface FinancialDataScreenProps {
//   navigation: any;
// }

// const FinancialDataScreen: React.FC<FinancialDataScreenProps> = ({
//   navigation,
// }) => {
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [selectedData, setSelectedData] = useState<any>(null);
//   const { currentDate, financialData, deleteData, editData } = useData();
  
//   const [enabled, setEnabled] = useState(false)

//   const currentMonth = currentDate.month() + 1;
//   const currentYear = currentDate.year();
  


//   const filteredFinancialData = financialData.filter((item) => {
//     const itemMonth = moment(item.date).month() + 1;
//     const itemYear = moment(item.date).year();
//     return itemMonth === currentMonth && itemYear === currentYear;
//   });

//   const[filteredData,setFilteredData]=useState(filteredFinancialData)

//   const handleDelete = (dataId: string) => {
//     deleteData(dataId);
//   };

//   const openEditModal = (data: any) => {
//     setSelectedData(data);
//     setEditModalVisible(true);
//   };

//   const saveEditedData = (editedData: any) => {
//     editData(editedData.id, editedData);
//     setEditModalVisible(false);
//   };

//   const cancelEditModal = () => {
//     setEditModalVisible(false);
//   };


//     const sortedData = [...filteredFinancialData].sort((a, b) =>
//       moment(a.date).isBefore(moment(b.date)) ? -1 : 1
//     );

//   const sortByDate=()=>{
//     setEnabled((previousState) => !previousState)
//   }

//   return (
//     <View style={[styles.container]}>
//       <TouchableOpacity style={styles.sort} onPress={sortByDate}>
//       <MaterialIcons name="sort" size={24} color={enabled?"#5576a3":"#912F40"} />
//       </TouchableOpacity>
//       <FlatList
//         style={styles.flatList}
//         data={enabled? (sortedData):(filteredFinancialData)}
//         renderItem={({ item }) => (
//           <DataItem
//             data={item}
//             onDelete={() => handleDelete(item.id)}
//             onEdit={() => openEditModal(item)}
//           />
//         )}
//         keyExtractor={(item) => item.id.toString()}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             {/* <MaterialIcons name="list-alt" size={32} color="grey" /> */}
//             <Image
//   source={require('../assets/financialdata.png')}
//   style={{ width: 200, height: 200 }}
// />
//             <Text style={styles.emptyList}>
//               Click on [ + ] to add new Expense/Income
//             </Text>
//           </View>
//         }
//       />
//       {selectedData && (
//         <EditDataModal
//           visible={editModalVisible}
//           data={selectedData}
//           onSave={saveEditedData}
//           onCancel={cancelEditModal}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFA",
//   },
//   emptyContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 30,
//   },
//   emptyList: {
//     fontSize: 14,
//     color: "grey",
//     marginTop: 10,
//   },
//   flatList: {
//     marginTop: 15,
//   },
//   sort:{
//   flexDirection:"row",
//   marginHorizontal:20,
//   marginTop:10,
//   alignItems:"center"
//   },
//   enabled:{

// }
// });

// export default FinancialDataScreen;

import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
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
  const [sortBy, setSortBy] = useState<"default" | "type" | "date">("default");

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

  const sortedFinancialData = [...filteredFinancialData].sort((a, b) => {
    if (sortBy === "default") {
      return 0; // No sorting needed
    } else if (sortBy === "type") {
      return a.type.localeCompare(b.type);
    } else if (sortBy === "date") {
      return moment(a.date).diff(b.date);
    }
    return 0;
  });

  return (
    <View style={styles.container}>
      <View style={styles.sortButtons}>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === "default" && styles.activeButton]}
          onPress={() => setSortBy("default")}
        >
          <MaterialIcons name="sort" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === "type" && styles.activeButton]}
          onPress={() => setSortBy("type")}
        >
          {/* <Text style={styles.buttonText}>Type</Text> */}
          <MaterialIcons name="filter-alt" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === "date" && styles.activeButton]}
          onPress={() => setSortBy("date")}
        >
          {/* <Text style={styles.buttonText}>Date</Text> */}
          <MaterialIcons name="calendar-month" size={24} />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.flatList}
        data={sortedFinancialData}
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
  sortButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  sortButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "#f0f0f0",
  },
  buttonText: {
    color: "#5576a3",
    fontWeight: "bold",
  },
});

export default FinancialDataScreen;


