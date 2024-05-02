// import React from "react";
// import { View, Text, StyleSheet,Image } from "react-native";
// import { PieChart } from "react-native-chart-kit";
// import moment from "moment";
// import { useData } from "../store/UserContext";
// import { MaterialIcons } from "@expo/vector-icons";

// const AnalysisScreen: React.FC = () => {
//   const { financialData, currentDate } = useData();

//   const currentMonthData = financialData.filter((item) => {
//     const itemMonth = moment(item.date).month();
//     const itemYear = moment(item.date).year();
//     return itemMonth === currentDate.month() && itemYear === currentDate.year();
//   });

//   let totalExpenses = 0;
//   let totalIncome = 0;
//   currentMonthData.forEach((item) => {
//     if (item.type === "expense") {
//       totalExpenses += parseFloat(item.amount);
//     } else {
//       totalIncome += parseFloat(item.amount);
//     }
//   });

//   const data = [
//     {
//       name: "EXPENSE",
//       amount: totalExpenses,
//       color: "#912F40",
//       legendFontColor: "#080705",
//       legendFontSize: 14,
//     },
//     {
//       name: "INCOME",
//       amount: totalIncome,
//       color: "#3f8ceb",
//       legendFontColor: "#080705",
//       legendFontSize: 14,
//     },
//   ];


//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>ACCOUNT OVERVIEW</Text>
//       {totalExpenses > 0 || totalIncome > 0 ? (
//         <PieChart
//           style={styles.piechart}
//           data={data}
//           width={350}
//           height={200}
//           chartConfig={{
//             backgroundColor: "#ffffff",
//             decimalPlaces: 2,
//             color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//           }}
//           accessor="amount"
//           backgroundColor="transparent"
//           paddingLeft="0"
//           absolute
//         />
//       ) : (
//         <View style={styles.emptyContainer}>
//           {/* <MaterialIcons name="bar-chart" size={32} color="grey" /> */}
//           <Image
//   source={require('../assets/analytics.png')}
//   style={{ width: 200, height: 200 }}
// />
//           <Text style={styles.emptyList}>No analysis for this month</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     backgroundColor: "#FFFFFA",
//     flex: 1,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#080705",
//     marginVertical: 20,
//   },
//   piechart: {
//     marginTop: 40,
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
// });

// export default AnalysisScreen;

import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Switch } from "react-native";
import { PieChart, StackedBarChart } from "react-native-chart-kit";
import moment from "moment";
import { useData } from "../store/UserContext";
import { MaterialIcons } from "@expo/vector-icons";
import { BarChart } from "react-native-chart-kit";

const AnalysisScreen: React.FC = () => {
  const { financialData, currentDate } = useData();
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    console.log(isEnabled)
  };


  const currentMonthData = financialData.filter((item) => {
    const itemMonth = moment(item.date).month();
    const itemYear = moment(item.date).year();
    return itemMonth === currentDate.month() && itemYear === currentDate.year();
  });

  let totalExpenses = 0;
  let totalIncome = 0;
  let expenseCategories: { [category: string]: number } = {};
  let incomeCategories: { [category: string]: number } = {};

  currentMonthData.forEach((item) => {
    if (item.type === "expense") {
      totalExpenses += parseFloat(item.amount);
      if (expenseCategories[item.category]) {
        expenseCategories[item.category] += parseFloat(item.amount);
      } else {
        expenseCategories[item.category] = parseFloat(item.amount);
      }
    } else {
      totalIncome += parseFloat(item.amount);
      if (incomeCategories[item.category]) {
        incomeCategories[item.category] += parseFloat(item.amount);
      } else {
        incomeCategories[item.category] = parseFloat(item.amount);
      }
    }
  });

  const data = [
    {
      name: "EXPENSE",
      amount: totalExpenses,
      color: "#912F40",
      legendFontColor: "#080705",
      legendFontSize: 14,
    },
    {
      name: "INCOME",
      amount: totalIncome,
      color: "#3f8ceb",
      legendFontColor: "#080705",
      legendFontSize: 14,
    },
  ];


  const expenseChartData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        data: Object.values(expenseCategories),
        color: (opacity = 1) => `rgba(145, 47, 64, ${opacity})`, // expense color
      },
    ],
  };


  const incomeChartData = {
    labels: Object.keys(incomeCategories),
    datasets: [
      {
        data: Object.values(incomeCategories),
        color: (opacity = 1) => `rgba(63, 140, 235, ${opacity})`, // income color
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.switchTitle}>
            <Text>Show individual analysis?</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#767577" }}
              thumbColor={isEnabled ? "#702632" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
      
      {totalExpenses > 0 || totalIncome > 0 ? (
        <>
        {!isEnabled?(<>
          <Text style={styles.title}>ACCOUNT OVERVIEW</Text>
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
  </>):(<><Text style={styles.chartTitle}>EXPENSE ANALYSIS</Text>
      <BarChart
        style={styles.barChart}
        data={expenseChartData}
        width={350}
        height={200}
        yAxisLabel="" yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: "#FFFFFA",
          backgroundGradientTo: "#FFFFFA",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(145, 47, 64, ${opacity})`,
        }}
      />

      <Text style={styles.chartTitle}>INCOME ANALYSIS</Text>
      <BarChart
        style={styles.barChart}
        data={incomeChartData}
        width={350}
        height={200}
        yAxisLabel="" yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: "#FFFFFA",
          backgroundGradientTo: "#FFFFFA",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(63, 140, 235, ${opacity})`,
        }}
      />
      </>)}
        
      </> ) : (
        <View style={styles.emptyContainer}>
          <Image
            source={require("../assets/analytics.png")}
            style={{ width: 200, height: 200 }}
          />
          <Text style={styles.emptyList}>No analysis for this month</Text>
        </View>
      )}

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FFFFFA",
    flex: 1,
  },
  switchTitle:{
flexDirection:"row",
justifyContent:"center",
alignItems:"center"
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#080705",
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
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#080705",
    marginTop: 20,
  },
  barChart: {
    marginTop: 10,
  },
});

export default AnalysisScreen;

