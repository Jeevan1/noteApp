import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "../theme";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Note } from "../constants";
import {
  NavigationAction,
  NavigationState,
  useNavigation,
} from "@react-navigation/native";

const SearchInput = ({ navigation }: { navigation: any }) => {
  const [filteredNotes, setFilteredNotes] = React.useState<Note[]>([]);
  const [showNotes, setShowNotes] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const notes = useSelector((state: RootState) => state.notes.notes);
  const handleNoteSearch = (text: string) => {
    setInputValue(text);
    if (text.length > 0) {
      setShowNotes(true);
      const newFilteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredNotes(newFilteredNotes);
    } else {
      setShowNotes(false);
      setFilteredNotes([]);
    }
  };
  const onPress = (note: Note) => {
    navigation.navigate("Details", { note: note });
    setShowNotes(false);
    setInputValue("");
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <AntDesign name="search1" size={24} style={styles.icon} />
        <TextInput
          placeholder="Search"
          style={styles.input}
          value={inputValue}
          onChangeText={handleNoteSearch}
        />
      </View>
      {showNotes && (
        <ScrollView style={styles.scrollView}>
          <View style={styles.noteWrapper}>
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <Pressable
                  style={styles.note}
                  key={note.idx}
                  onPress={() => onPress(note)}
                >
                  <Text style={styles.noteButton}>{note.title}</Text>
                </Pressable>
              ))
            ) : (
              <View style={styles.note}>
                <Text style={styles.noteButton}>No notes found</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: "relative",
  },
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
  scrollView: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    zIndex: 1,
    maxHeight: 200,
  },
  noteWrapper: {
    flex: 1,
    backgroundColor: theme.colors.grey,
    borderRadius: theme.borderRadius.medium,
    flexDirection: "column",
  },
  note: {
    padding: theme.spacing.s8,
    borderRadius: theme.borderRadius.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.white,
  },
  "note:last-child": {
    borderBottomWidth: 0,
  },
  noteButton: {
    paddingVertical: 2,
    color: theme.colors.white,
    fontSize: theme.fontSizes.f16,
    fontWeight: "500",
    paddingHorizontal: 4,
  },
});
