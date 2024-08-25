import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { theme } from "../theme";
import Checkbox from "expo-checkbox";
import CheckBox from "./Checkbox";
import TaskItem from "./TaskItem";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Note } from "../constants";

const TaskCard = ({
  style,
  num,
  content,
  onPress,
}: {
  style?: StyleProp<any>;
  num?: number;
  content: Note;
  onPress?: () => void;
}) => {
  const navigation = useNavigation();
  const [data, setData] = useState<Note>(content);
  console.log("data", data.title);

  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.headerText} ellipsizeMode="tail" numberOfLines={2}>
        {content ? content.title : "Task Card"}
      </Text>
      <View style={styles.content}>
        {content?.tasks.map((item, i) => (
          <TaskItem
            key={i}
            text={item.title}
            idx={item.idx}
            keyItem={i}
            isCompleted={item.completed}
          />
        ))}
        {/* {[...Array(num)].map((_, i) => (
          <View key={i}>
            <TaskItem text="Task Item" keyItem={i} idx={""} />
          </View>
        ))} */}
        {num && num > 3 && (
          <Image
            source={require("../assets/lg.png")}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              height: "100%",
              width: "100%",
              objectFit: "fill",
            }}
          />
        )}
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.text}>{content ? content.time : "Task"}</Text>
      </View>
    </Pressable>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  container: {
    zIndex: -1,
    backgroundColor: "white",
    padding: theme.spacing.s14,
    borderRadius: theme.borderRadius.medium,
  },
  headerText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.f16,
    fontWeight: "bold",
  },
  content: {
    maxWidth: "100%",
    marginVertical: theme.spacing.s12,
    gap: theme.spacing.s8,
  },
  cardFooter: {
    marginTop: theme.spacing.s8,
  },
  text: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.f14,
    fontWeight: "500",
  },
});
