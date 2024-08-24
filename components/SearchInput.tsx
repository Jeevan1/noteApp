import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "../theme";

const SearchInput = () => {
  return (
    <View>
      <View style={styles.container}>
        <AntDesign name="search1" size={24} style={styles.icon} />
        <TextInput placeholder="Search" style={styles.input} />
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    borderRadius: 24,
    paddingHorizontal: theme.spacing.s14,
    height: theme.sizing.s55,
  },
  text: {
    marginLeft: 10,
  },
  icon: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.f24,
  },
  input: {
    flex: 1,
    marginLeft: theme.spacing.s8,
  },
});
