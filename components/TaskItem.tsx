import React, { useState } from "react";
import CheckBox from "./Checkbox";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";

const TaskItem = ({
  idx,
  text,
  keyItem,
  isCompleted = false,
}: {
  idx: string;
  text: string;
  keyItem?: string | number;
  isCompleted?: boolean;
}) => {
  const [isChecked, setChecked] = useState(isCompleted);
  return (
    <Pressable
      key={keyItem}
      onPress={() => setChecked(!isChecked)}
      style={styles.container}
    >
      <View style={styles.content}>
        <View>
          <CheckBox onChecked={setChecked} isChecked={isChecked} />
        </View>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={[
            styles.text,
            { textDecorationLine: isChecked ? "line-through" : "none" },
          ]}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    maxWidth: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.s8,
  },
  text: {
    flex: 1,
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.f14,
    fontWeight: "500",
  },
});
