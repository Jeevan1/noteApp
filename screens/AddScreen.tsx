import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { theme } from "../theme";
import { View } from "react-native";
import AddForm from "../components/AddForm";
import Button from "../components/Button";

const AddScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Add Your Note</Text>
        <View>
          <AddForm />
        </View>
      </View>
      {/* <Button text="Add Note" style={styles.button} /> */}
    </>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: theme.spacing.s14,
    paddingVertical: theme.spacing.s8,
    marginBottom: theme.spacing.s24,
    backgroundColor: theme.colors.background,
    position: "relative",
  },
  title: {
    paddingHorizontal: theme.spacing.s16,
    color: theme.colors.dark,
    fontSize: theme.fontSizes.f20,
    fontWeight: "600",
  },
  button: {
    backgroundColor: theme.colors.primary,
    marginBottom: theme.spacing.s24,
    marginHorizontal: theme.spacing.s16,
  },
});
