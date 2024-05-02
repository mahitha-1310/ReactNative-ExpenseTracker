import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  Image,
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
      Alert.alert("Registration failed", "Please enter all details");
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
            <Image
  source={require('../assets/register.png')}
  style={{ width: 200, height: 200 }}
/>
      <Text style={styles.heading}>REGISTRATION</Text>
      <TextInput
        placeholder="Enter Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter Username"
        value={id}
        onChangeText={setId}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Pressable onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Login")}
        style={styles.secondaryButton}
      >
        <Text style={styles.secondaryButtonText}>Already have an account? Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFA",
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
    color: "#702632",
    fontWeight: "bold",
    fontSize: 22,
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
  secondaryButton:{
    marginTop:10,
  },
  secondaryButtonText:{
color:"#702632",
fontWeight:"bold",
fontSize:14,
  }
});

export default RegisterScreen;
