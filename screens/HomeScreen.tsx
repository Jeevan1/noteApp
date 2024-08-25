import { useTheme } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";
import SearchInput from "../components/SearchInput";
import SortContainer from "../components/SortContainer";
import TaskCard from "../components/TaskCard";
import AddNotes from "../components/AddNotes";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Button from "../components/Button";
import { getNote, removeNote } from "../utils/AsyncStorage";
import { Note } from "../constants";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [noteData, setNoteData] = React.useState<Note[]>([]);
  const { notes, loading } = useSelector((state: RootState) => state.notes);

  useEffect(() => {
    setNoteData(notes);
  }, [notes]);

  if (loading)
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <>
      <ScrollView style={styles.container}>
        <SearchInput navigation={navigation} />
        <SortContainer setNoteData={setNoteData} notes={noteData} />
        {noteData && noteData.length > 0 ? (
          <>
            <TaskCard
              content={noteData[0]}
              onPress={() =>
                navigation.navigate("Details", { note: noteData[0] })
              }
            />
            <View style={styles.taskLayout}>
              <View style={styles.left}>
                {noteData.slice(1).map((item, i) => {
                  if (i % 2 == 0) {
                    return (
                      <View key={i}>
                        <TaskCard
                          content={item}
                          onPress={() =>
                            navigation.navigate("Details", { note: item })
                          }
                        />
                      </View>
                    );
                  }
                })}
              </View>
              <View style={styles.right}>
                {noteData.slice(1).map((item, i) => {
                  if (i % 2 != 0) {
                    return (
                      <View key={i}>
                        <TaskCard
                          content={item}
                          onPress={() =>
                            navigation.navigate("Details", { note: item })
                          }
                        />
                      </View>
                    );
                  }
                })}
              </View>
            </View>
          </>
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noText}>No data</Text>
            <Button
              text="Add Note"
              onPress={() => navigation.navigate("Add")}
            />
          </View>
        )}
      </ScrollView>
      <AddNotes />
    </>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    gap: theme.spacing.s16,
    paddingHorizontal: theme.spacing.s16,
    paddingVertical: theme.spacing.s8,
    backgroundColor: theme.colors.background,
    position: "relative",
  },
  noDataContainer: {
    flex: 1,
    gap: theme.spacing.s16,
    paddingVertical: theme.spacing.s8,
    backgroundColor: theme.colors.background,
    position: "relative",
  },
  noText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.f16,
    fontWeight: "500",
    textAlign: "center",
  },
  button: {},
  taskLayout: {
    flexDirection: "row",
    gap: theme.spacing.s16,
    marginVertical: theme.spacing.s16,
  },
  left: {
    flex: 1,
    gap: theme.spacing.s16,
  },
  right: {
    flex: 1,
    gap: theme.spacing.s16,
  },
});
