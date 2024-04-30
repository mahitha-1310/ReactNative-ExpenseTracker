
import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";
import { Alert } from "react-native";



interface Task {
  id: string;
  title: string;
    deadline: Date | null;

}

interface User {
  id: string;
  tasks: Task[];
  fullName: string;
}

interface State {
  username: string;
  tasks: Task[];
  fullName: string;
}

interface ExtendedState extends State {
  addTask: (newTask: Task) => void;
  editTask: (taskId: string, updatedTask: Task) => void;
  deleteTask: (taskId: string) => void;
  onRegister: (id: string, password: string, fullName: string, navigation: any) => void;
  onLogin: (id: string, password: string, navigation: any, loginSuccess: () => void) => void;
  logout: (navigation: any) => void;
}

type Action =
  | { type: "LOGIN"; payload: { id: string; tasks: Task[]; fullName: string } }
  | { type: "FETCH_TASKS"; payload: Task[] }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "EDIT_TASK"; payload: { id: string; updatedTask: Task } }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "LOG_OUT" };

const StateContext = createContext<ExtendedState | undefined>(undefined);

const initialState: State = {
  username: "",
  tasks: [],
  fullName: "",
};

const BASE_URL = "http://10.0.2.2:3000";

const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        tasks: action.payload.tasks,
        username: action.payload.id,
        fullName: action.payload.fullName,
      };
    case "FETCH_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload.updatedTask : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "LOG_OUT":
      return {
        ...state,
        username: "",
        tasks: [],
      };
    default:
      return state;
  }
};

interface StateProviderProps {
  children: React.ReactNode;
}

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const addTask = async (newTask: Task) => {
    try {
                  const response = await axios.get(`${BASE_URL}/users/${state.username}`);
                  const user = response.data;
            
                  const updatedTasks = [newTask, ...user.tasks];
                  const updatedUser = { ...user, tasks: updatedTasks };
                  axios
                    .put(`${BASE_URL}/users/${user.id}`, updatedUser)
                    .then((response) => {
                      dispatch({ type: "ADD_TASK", payload: newTask });
                    })
                    .catch((error) => {
                      console.error("Error adding new task:", error);
                    });
                } catch (error: any) {
                  console.error("Error fetching tasks:", error.message);
                }
              };
            

  const editTas = async (taskId: string, updatedTask: Task) => {
    // Your implementation
  };
  const editTask = async (taskId:string, updatedTask:Task) => {
            try {
              const response = await axios.get(`${BASE_URL}/users/${state.username}`);
              const user = response.data;
              const taskIndex = user.tasks.findIndex((task:Task) => task.id === taskId);
        
              if (taskIndex !== -1) {
                user.tasks[taskIndex] = updatedTask;
                await axios.put(`${BASE_URL}/users/${user.id}`, user);
                dispatch({ type: "EDIT_TASK", payload: { id: taskId, updatedTask } });
              } else {
                console.error("Task not found");
              }
            } catch (error: any) {
              console.error("Error editing task:", error.message);
            }
          };

  const deleteTask = async (taskId: string) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Delete",
                    onPress: () => confirmDeleteTask(taskId),
                  },
                ]);
              };
            
              const confirmDeleteTask = async (taskId: string) => {
                try {
                  const response = await axios.get(`${BASE_URL}/users/${state.username}`);
                  const user = response.data;
                  const updatedTasks = user.tasks.filter((task: Task) => task.id !== taskId);
                  user.tasks = updatedTasks;
                  await axios.put(`${BASE_URL}/users/${user.id}`, user);
                  dispatch({ type: "DELETE_TASK", payload: taskId });
                  console.log("Task deleted successfully");
                } catch (error: any) {
                  console.error("Error deleting task:", error.message);
                }
              };

  const onRegister = async (id: string, password: string, fullName: string, navigation: any) => {
    console.log("hi")
                console.log(navigation)
                try {
                  const check = await fetch(`${BASE_URL}/users?id=${id}`);
                  const checkData = await check.json();
                  const passwordPattern =
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@$%^&*]).{8,}$/;
                  if (checkData.length != 0) {
                    Alert.alert("Error", "Username already exists.");
                  } else if (!passwordPattern.test(password)) {
                    Alert.alert(
                      "Error",
                      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character (!@$%^&*)"
                    );
                  } else {
                    const response = await fetch(`${BASE_URL}/users`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ id, password, fullName, tasks: [] }),
                    });
                    const data = await response.json();
                    navigation.navigate("Login");
                  }
                } catch (error) {
                  console.error("Registration failed:", error);
                }
  };

  const onLogin = async (id: string, password: string, navigation: any, loginSuccess: () => void) => {
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
                      payload: { id, tasks: user.tasks, fullName: user.fullName },
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

  return (
    <StateContext.Provider
      value={{
        tasks: state.tasks,
        username: state.username,
        fullName: state.fullName,
        addTask,
        editTask,
        deleteTask,
        onRegister,
        onLogin,
        logout,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a StateProvider");
  }
  return context;
};
