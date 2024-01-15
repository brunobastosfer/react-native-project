import { actionTypes } from "../context/context";
import * as SecureStore from "expo-secure-store";

const API_ENDPOINT = "https://coretoolshomologaapi.redeinova.com.br/api/auth";

const LINKS_ENDPOINT =
  "https://coretoolshomologaapi.redeinova.com.br/api/links?guidid=EB8DA9CA-D0FD-4A4E-ADAE-3AB251E98C50";

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: email,
        senha: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Incorrect email or password. Please try again.");
    }
  } catch (error) {
    throw new Error("Something went wrong. Please try again.");
  }
};

export const fetchLinks = async (dispatch) => {
  try {
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch(LINKS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      dispatch({ type: actionTypes.SET_LINKS, payload: data.links });
    } else {
      console.error("Failed to fetch links:", response.statusText);
    }
  } catch (error) {
    console.error("Failed to fetch links:", error);
  }
};
