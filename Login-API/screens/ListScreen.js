import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useAppContext } from "../context/context";
import { fetchLinks } from "../api/ApiRequests";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ListScreen = () => {
  const { state, dispatch } = useAppContext();
  const links = state.links;

  useEffect(() => {
    fetchLinks(dispatch);
  }, [dispatch]);

  const openLink = (url) => {
    Linking.openURL(url);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.linkItem}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.titulo}</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => openLink(item.comando)}
            >
              <Text style={styles.goToText}>Abrir site</Text>
              <MaterialIcons name="arrow-forward" size={24} color="black" />
            </TouchableOpacity>
            <MaterialIcons
              name={item.icone === "award" ? "business" : "support-agent"}
              size={24}
              color="black"
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={["#0F2027", "#333", "#237A57"]}
      style={styles.container}
    >
      <FlatList
        data={links}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={styles.flatList}
        ListHeaderComponent={
          <Text style={styles.headerText}>Lista de Empresas Cadastradas</Text>
        }
        ListFooterComponent={
          <Text style={styles.warningText}>Sem mais empresas registradas</Text>
        }
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatList: {
    width: "100%",
    padding: "3%",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: "3%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  linkItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  goToText: {
    marginRight: 5,
  },
  headerText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  warningText: {
    textAlign: "center",
    marginTop: 10,
    color: "white",
  },
});

export default ListScreen;
