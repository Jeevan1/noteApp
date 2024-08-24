import React, { SetStateAction, useEffect } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import AddNotes from "../components/AddNotes";
import { theme } from "../theme";
import { mydata, Note } from "../constants";
import TaskItem from "../components/TaskItem";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useRoute } from "@react-navigation/native";

const DetailsScreen = ({ route }: { route: any }) => {
  const { note }: { note: Note } = route.params;
  const [noteData, setNoteData] = React.useState<Note>();
  const notes = useSelector((state: RootState) => state.notes.notes);
  console.log(note);

  if (!note) return <Text>No data</Text>;
  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.time}>{note.time}</Text>
        <Text style={styles.title}>{note.title}</Text>
        <Image source={{ uri: note.image }} style={styles.image} alt="image" />
        <Text style={styles.description}>{note.description}</Text>
        <View style={styles.taskContainer}>
          {note.tasks.length > 0 &&
            note.tasks.map((item, i) => (
              <View style={styles.taskItem} key={item.idx}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                {item.taskItems.map((item, i) => (
                  <View key={i}>
                    <TaskItem
                      text={item.text}
                      keyItem={i}
                      idx={item.idx}
                      isCompleted={item.completed}
                    />
                  </View>
                ))}
              </View>
            ))}
        </View>
      </ScrollView>
      <AddNotes />
    </>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: theme.spacing.s14,
    paddingHorizontal: theme.spacing.s16,
    paddingVertical: theme.spacing.s8,
    backgroundColor: theme.colors.background,
    position: "relative",
  },
  time: {
    color: theme.colors.textSecondary,
  },
  title: {
    color: theme.colors.dark,
    fontSize: theme.fontSizes.f24,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: theme.colors.primary,
    objectFit: "cover",
    borderRadius: theme.borderRadius.large,
    marginTop: theme.spacing.s12,
  },
  description: {
    color: theme.colors.textSecondary,
    lineHeight: theme.spacing.s20,
    paddingHorizontal: 4,
    marginVertical: theme.spacing.s14,
    letterSpacing: 0.1,
  },
  taskContainer: {
    gap: theme.spacing.s12,
  },
  taskItem: {
    gap: theme.spacing.s12,
    marginBottom: theme.spacing.s16,
  },
  taskTitle: {
    color: theme.colors.dark,
    fontSize: theme.fontSizes.f16,
    fontWeight: "600",
    letterSpacing: 0.05,
  },
});
