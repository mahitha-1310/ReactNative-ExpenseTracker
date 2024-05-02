import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import SearchScreenModal from "../modals/SearchScreenModal";
import { useData } from "../store/UserContext";


interface HeaderProps {
  navigation: any;
}

const Header: React.FC<HeaderProps> = ({ navigation }) => {
  const [searchModalVisible, setSearchModalVisible] = useState<boolean>(false);
  const { fullName, logout } = useData();

  const handleSearchPress = () => {
    setSearchModalVisible(true);
  };

  const cancelSearchModal = () => {
    setSearchModalVisible(false);
  };

  const handleLogout = () => {
    logout(navigation);
  };

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Hi {fullName},</Text>
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleSearchPress} testID="searchButton">
          <MaterialIcons name="search" size={32} color="#FFFFFA" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialIcons name="exit-to-app" size={32} color="#FFFFFA" />
        </TouchableOpacity>
      </View>
      {searchModalVisible && (
        <SearchScreenModal
          visible={searchModalVisible}
          onCancel={cancelSearchModal}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 80,
    paddingTop: 36,
    backgroundColor: "#702632",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFA",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "space-around",
    bottom: 10,
    right: 15,
    width: "25%",
  },
  titleContainer: {
    alignSelf: "flex-start",
    justifyContent: "center",
    top: 20,
    left: 20,
  },
});

export default Header;
