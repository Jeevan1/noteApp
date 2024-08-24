import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { theme } from "../theme";

const SortContainer = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.left}>
        <AntDesign name="arrowdown" style={styles.icon} />
        <Text style={styles.text}>Last modefied</Text>
      </Pressable>
      <Pressable>
        <MaterialCommunityIcons name="dots-square" size={28} color="black" />
      </Pressable>
    </View>
  );
};

export default SortContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.s8,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.s8,
  },
  icon: {
    fontSize: theme.fontSizes.f20,
    color: theme.colors.textPrimary,
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.f14,
    fontWeight: "600",
  },
});
