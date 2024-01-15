import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  useColorScheme,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { loginUser } from "../api/ApiRequests";
import { useAppContext, actionTypes } from "../context/context";
import * as SecureStore from "expo-secure-store";

const LoginScreen = () => {
  const { dispatch } = useAppContext();

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      if (email.length < 5 || password.length < 5) {
        Alert.alert(
          "Validation Error",
          "Email and password must be at least 5 characters."
        );
        return;
      }

      const data = await loginUser(email, password);

      console.log(data.signature);

      await SecureStore.setItemAsync("token", data.signature);

      dispatch({ type: actionTypes.SET_TOKEN, payload: data.signature });

      if (data.signature) {
        navigation.navigate("Menu");
      }
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={
        darkMode
          ? ["#0F2027", "#333", "#2C5364"]
          : ["#093028", "#fff", "#237A57"]
      }
      style={styles.container}
    >
      <View
        style={[
          styles.inputContainer,
          {
            shadowColor: darkMode ? "#000" : "#888",
            shadowOpacity: 0.5,
            shadowRadius: 3,
            elevation: 5,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: darkMode ? "#333" : "#f8f8f8",
              color: darkMode ? "#fff" : "#333",
            },
          ]}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.passwordInput,
              {
                backgroundColor: darkMode ? "#333" : "#f8f8f8",
                color: darkMode ? "#fff" : "#333",
              },
            ]}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.passwordIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color={darkMode ? "#fff" : "#000"}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: loading ? "#aaa" : "#237A57" },
          ]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.darkModeToggle}
        onPress={() => setDarkMode(!darkMode)}
      >
        <MaterialCommunityIcons
          name={darkMode ? "weather-night" : "weather-sunny"}
          size={30}
          color={darkMode ? "#fff" : "white"}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    borderRadius: 8,
    padding: 16,
  },
  input: {
    height: 40,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  passwordIcon: {
    padding: 10,
  },
  button: {
    marginTop: "10%",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 0,
    justifyContent: "center",
    lineHeight: 1,
    overflow: "hidden",
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  darkModeToggle: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
  },
});

export default LoginScreen;
