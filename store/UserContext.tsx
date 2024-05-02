import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";
import { Alert } from "react-native";
import { User } from "../interfaces/User";
import { FinancialData } from "../interfaces/FinancialData";
import moment, { Moment } from "moment";

interface State {
  username: string;
  financialData: FinancialData[];
  fullName: string;
  currentDate: Moment;
}

interface ExtendedState extends State {
  addData: (newFinancialData: FinancialData) => void;
  editData: (dataId: string, updatedData: FinancialData) => void;
  deleteData: (dataId: string) => void;
  onRegister: (
    id: string,
    password: string,
    fullName: string,
    navigation: any
  ) => void;
  onLogin: (
    id: string,
    password: string,
    navigation: any,
    loginSuccess: () => void
  ) => void;
  logout: (navigation: any) => void;
  monthIncrease: () => void;
  monthDecrease: () => void;
}

type Action =
  | {
      type: "LOGIN";
      payload: { id: string; financialData: FinancialData[]; fullName: string };
    }
  | { type: "FETCH_DATA"; payload: FinancialData[] }
  | { type: "ADD_DATA"; payload: FinancialData }
  | { type: "EDIT_DATA"; payload: { id: string; updatedData: FinancialData } }
  | { type: "DELETE_DATA"; payload: string }
  | { type: "LOG_OUT" }
  | { type: "DECREASE_MONTH" }
  | { type: "INCREASE_MONTH" };

const UserContext = createContext<ExtendedState | undefined>(undefined);

const initialState: State = {
  username: "",
  financialData: [],
  fullName: "",
  currentDate: moment(),
};

// const BASE_URL = "http://10.0.2.2:3000";
const BASE_URL = "https://expensetrackerbackend-92np.onrender.com";

const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        financialData: action.payload.financialData,
        username: action.payload.id,
        fullName: action.payload.fullName,
      };
    case "FETCH_DATA":
      return {
        ...state,
        financialData: action.payload,
      };
    case "ADD_DATA":
      return {
        ...state,
        financialData: [action.payload, ...state.financialData],
      };
    case "EDIT_DATA":
      return {
        ...state,
        financialData: state.financialData.map((data) =>
          data.id === action.payload.id ? action.payload.updatedData : data
        ),
      };
    case "DELETE_DATA":
      return {
        ...state,
        financialData: state.financialData.filter(
          (data) => data.id !== String(action.payload)
        ),
      };
    case "LOG_OUT":
      return {
        ...state,
        username: "",
        financialData: [],
        currentDate: moment()
      };
      case "DECREASE_MONTH":
        return {
          ...state,
          currentDate: state.currentDate.clone().subtract(1, "month"),
        };
      case "INCREASE_MONTH":
        return {
          ...state,
          currentDate: state.currentDate.clone().add(1, "month"),
        };
    default:
      return state;
  }
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const addData = async (newData: FinancialData) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${state.username}`);
      const user = response.data;

      const updatedData = [newData, ...user.financialData];
      const updatedUser = { ...user, financialData: updatedData };
      axios
        .put(`${BASE_URL}/users/${user.id}`, updatedUser)
        .then((response) => {
          dispatch({ type: "ADD_DATA", payload: newData });
        })
        .catch((error) => {
          console.error("Error adding new data:", error);
        });
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    }
  };

  const editData = async (dataId: string, updatedData: FinancialData) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${state.username}`);
      const user = response.data;
      const dataIndex = user.financialData.findIndex(
        (data: FinancialData) => data.id === dataId
      );

      if (dataIndex !== -1) {
  
        user.financialData[dataIndex] = updatedData;
        await axios.put(`${BASE_URL}/users/${user.id}`, user);
        dispatch({
          type: "EDIT_DATA",
          payload: { id: dataId, updatedData },
        });
      } else {
        console.error("Data not found");
      }
    } catch (error: any) {
      console.error("Error editing data:", error.message);
    }
  };

  const deleteData = async (dataId: string) => {
    Alert.alert("Delete Data", "Are you sure you want to delete this data?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => confirmDeleteData(dataId),
      },
    ]);
  };

  const confirmDeleteData = async (dataId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${state.username}`);
      const user = response.data;
      const updatedData = user.financialData.filter(
        (data: FinancialData) => data.id !== dataId
      );
      user.financialData = updatedData;
      await axios.put(`${BASE_URL}/users/${user.id}`, user);
      dispatch({ type: "DELETE_DATA", payload: dataId });
      console.log("Data deleted successfully");
    } catch (error: any) {
      console.error("Error deleting data:", error.message);
    }
  };

  const onRegister = async (
    id: string,
    password: string,
    fullName: string,
    navigation: any
  ) => {
    try {
      const check = await fetch(`${BASE_URL}/users?id=${id}`);
      const checkData = await check.json();
      const passwordPattern =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@$%^&*]).{8,}$/;
      if (checkData.length != 0) {
        Alert.alert("Registration failed", "Username already exists.");
      } else if (!passwordPattern.test(password)) {
        Alert.alert(
          "Registration failed",
          "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character (!@$%^&*)"
        );
      } else {
        const response = await fetch(`${BASE_URL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, password, fullName, financialData: [] }),
        });
        const data = await response.json();
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const onLogin = async (
    id: string,
    password: string,
    navigation: any,
    loginSuccess: () => void
  ) => {
    try {
      const response = await fetch(
        `${BASE_URL}/users?id=${id}&password=${password}`
      );
      const data = await response.json();
      if (data.length === 0) {
        Alert.alert("Error", "Enter correct credentials");
      } else {
        const user = data[0];

        dispatch({
          type: "LOGIN",
          payload: {
            id,
            financialData: user.financialData,
            fullName: user.fullName,
          },
        });
        navigation.navigate("Home");
        loginSuccess();
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = (navigation: any) => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          navigation.navigate("Login");
          dispatch({ type: "LOG_OUT" });
        },
      },
    ]);
  };

  const monthIncrease = () =>{
    dispatch({type:"INCREASE_MONTH"})
  }

  const monthDecrease = () =>{
    dispatch({type:"DECREASE_MONTH"})
  }

  return (
    <UserContext.Provider
      value={{
        financialData: state.financialData,
        username: state.username,
        fullName: state.fullName,
        currentDate: state.currentDate,
        addData,
        editData,
        deleteData,
        onRegister,
        onLogin,
        logout,
        monthIncrease,
        monthDecrease
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useData must be used within a UserProvider");
  }
  return context;
};
