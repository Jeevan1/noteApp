import React from "react";
import { Pressable, Text } from "react-native";
import { theme } from "../theme";
import { StyleSheet } from "react-native";

const Button = ({
  onPress,
  text,
  style,
}: {
  onPress?: () => void;
  text: string;
  style?: any;
}) => {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    fontSize: theme.fontSizes.f20,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.medium,
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.f16,
    fontWeight: "bold",
  },
});
