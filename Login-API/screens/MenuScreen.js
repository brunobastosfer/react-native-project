import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppContext, actionTypes } from "../context/context";
import * as SecureStore from "expo-secure-store";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const MenuScreen = () => {
  const { state, dispatch } = useAppContext();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");

    dispatch({ type: actionTypes.SET_TOKEN, payload: null });

    navigation.navigate("Login");
  };

  return (
    <LinearGradient
      colors={["#0F2027", "#333", "#237A57"]}
      style={styles.container}
    >
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("List")}
        >
          <Text style={styles.menuText}>List Screen</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color={"black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.logoutButton, { marginTop: "30%" }]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontSize: 18,
    color: "black", // Default color
  },
  logoutButton: {
    backgroundColor: "rgb(240,128,128)",
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default MenuScreen;
