import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Pressable,
  Alert,
} from "react-native";
import { useData } from "../store/UserContext";

interface RegisterScreenProps {
  navigation: any; // You may want to replace `any` with a more specific type for navigation props
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
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={[styles.container, styles.overlay]}>
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
        <Pressable
          
          onPress={handleRegister}
          style={styles.button}
        >
          <Text style={styles.buttonText}>REGISTER</Text>
        </Pressable>
        <Pressable
          
          onPress={() => navigation.navigate("Login")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>ALREADY HAVE AN ACCOUNT? LOGIN</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "90%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  heading: {
    marginTop: 50,
    backgroundColor: "rgba(0, 0, 0, 0.80)",
    color: "white",
    padding: 20,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
    borderRadius: 50,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#cd5b45",
    padding: 15,
    borderRadius: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
