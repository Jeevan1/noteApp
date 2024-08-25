import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../theme";

const Divider = () => {
  return <View style={styles.divider}></View>;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: theme.colors.textSecondary,
    padding: 0,
    margin: 0,
  },
});
