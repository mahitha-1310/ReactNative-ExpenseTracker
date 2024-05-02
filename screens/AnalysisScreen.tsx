import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import moment from "moment";
import { useData } from "../store/UserContext";
import { MaterialIcons } from "@expo/vector-icons";

const AnalysisScreen: React.FC = () => {
  const { financialData, currentDate } = useData();

  const currentMonthData = financialData.filter((item) => {
    const itemMonth = moment(item.date).month();
    const itemYear = moment(item.date).year();
    return itemMonth === currentDate.month() && itemYear === currentDate.year();
  });

  let totalExpenses = 0;
  let totalIncome = 0;
  currentMonthData.forEach((item) => {
    if (item.type === "expense") {
      totalExpenses += parseFloat(item.amount);
    } else {
      totalIncome += parseFloat(item.amount);
    }
  });

  const data = [
    {
      name: "EXPENSE",
      amount: totalExpenses,
      color: "#912F40",
      legendFontColor: "#FFFFFA",
      legendFontSize: 14,
    },
    {
      name: "INCOME",
      amount: totalIncome,
      color: "#3f8ceb",
      legendFontColor: "#FFFFFA",
      legendFontSize: 14,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CURRENT MONTH EXPENSES AND INCOME</Text>
      {totalExpenses > 0 || totalIncome > 0 ? (
        <PieChart
          style={styles.piechart}
          data={data}
          width={350}
          height={200}
          chartConfig={{
            backgroundColor: "#ffffff",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="0"
          absolute
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="bar-chart" size={32} color="grey" />
          <Text style={styles.emptyList}>No analysis for this month</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#080705",
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFA",
    marginVertical: 20,
  },
  piechart: {
    marginTop: 40,
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
});

export default AnalysisScreen;
