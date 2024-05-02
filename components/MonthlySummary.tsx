import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useData } from "../store/UserContext";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";

const MonthlySummary: React.FC = () => {
  const { financialData, currentDate } = useData();
  const currentMonth = currentDate.month() + 1;
  const currentYear = currentDate.year();
  const monthlyExpense = financialData
    .filter(
      (data) =>
        data.type === "expense" &&
        moment(data.date).month() + 1 === currentMonth &&
        moment(data.date).year() === currentYear
    )
    .reduce((acc, data) => acc + parseFloat(data.amount), 0);

  const monthlyIncome = financialData
    .filter(
      (data) =>
        data.type === "income" &&
        moment(data.date).month() + 1 === currentMonth &&
        moment(data.date).year() === currentYear
    )
    .reduce((acc, data) => acc + parseFloat(data.amount), 0);

  const monthlyTotal = monthlyIncome - monthlyExpense;

  let totalColor = "#912F40"; 
  if (monthlyIncome > monthlyExpense) {
    totalColor = "#3f8ceb"; 
  }

  return (
    <View style={styles.container}>

      <View style={styles.summaryItem}>
        <Text style={[styles.text, { color: "#080705" }]}>Expense </Text>
        <View style={styles.amount}>
          <MaterialIcons name="currency-rupee" size={14} color="#912F40" />
          <Text style={[styles.text, { color: "#912F40" }]}>
            {monthlyExpense.toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={styles.summaryItem}>
        <Text style={[styles.text, { color: "#080705" }]}>Income </Text>
        <View style={styles.amount}>
          <MaterialIcons name="currency-rupee" size={14} color="#3f8ceb" />
          <Text style={[styles.text, { color: "#3f8ceb" }]}>
            {monthlyIncome.toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={styles.summaryItem}>
        <Text style={[styles.text, { color: "#080705" }]}>Total </Text>
        <View style={styles.amount}>
          <MaterialIcons name="currency-rupee" size={14} color={totalColor} />
          <Text style={[styles.text, { color: totalColor }]}>
            {monthlyTotal.toFixed(2)}
          </Text>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
  amount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MonthlySummary;
