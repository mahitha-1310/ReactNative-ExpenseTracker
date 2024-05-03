import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useData } from "../store/UserContext";

const MonthNavigator: React.FC = () => {
  const { monthDecrease, monthIncrease, currentDate } = useData();

  const decreaseMonth = () => {
    monthDecrease();
  };

  const increaseMonth = () => {
    monthIncrease();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decreaseMonth}>
        <MaterialIcons name="keyboard-arrow-left" size={24} />
      </TouchableOpacity>
      <Text style={styles.monthYearText}>{currentDate.format("MMM YYYY")}</Text>
      <TouchableOpacity onPress={increaseMonth}>
        <MaterialIcons name="keyboard-arrow-right" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});

export default MonthNavigator;
