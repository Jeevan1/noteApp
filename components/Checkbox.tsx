import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { theme } from "../theme";
import { Pressable, StyleSheet } from "react-native";

const CheckBox = ({
  onChecked,
  isChecked,
}: {
  onChecked?: (value: boolean) => void;
  isChecked?: boolean;
}) => {
  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: isChecked
            ? theme.colors.primary
            : theme.colors.white,
        },
      ]}
    >
      <Checkbox
        value={isChecked}
        color={theme.colors.primary}
        onValueChange={() => onChecked && onChecked(!isChecked)}
        style={styles.checkbox}
      />
    </Pressable>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.white,
  },
  checkbox: {
    borderWidth: 0,
    height: theme.fontSizes.f12,
    width: theme.fontSizes.f12,
  },
});
