import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { useData } from "../store/UserContext";

interface RegisterScreenProps {
  navigation: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [id, setId] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { onRegister } = useData();

  const handleRegister = () => {
    if (!id.trim() || !password.trim() || !fullName.trim()) {
      Alert.alert("Error", "Please enter all details");
      return;
    }
    if (fullName.trim().length > 10) {
      Alert.alert("Error", "Name can contain only 15 characters");
      return;
    }
    onRegister(id.trim(), password.trim(), fullName.trim(), navigation);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>REGISTER HERE</Text>
      <TextInput
        placeholder="Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        value={id}
        onChangeText={setId}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Pressable onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Login")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>ALREADY HAVE AN ACCOUNT? LOGIN</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#080705",
  },
  input: {
    width: "90%",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#702632",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  heading: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#702632",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFA",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
