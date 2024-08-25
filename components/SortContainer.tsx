import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { theme } from "../theme";
import { Note } from "../constants";
import Divider from "./Divider";

const SortContainer = ({
  setNoteData,
  notes,
}: {
  setNoteData: React.Dispatch<React.SetStateAction<Note[]>>;
  notes: Note[];
}) => {
  const [isSorted, setIsSorted] = useState(false);
  const iconRef = React.useRef(null);
  const [dropdown, setDropdown] = useState(false);
  const [dropdownSelected, setDropdownSelected] = useState("time");

  const onPress = (mode: string, type: string) => {
    if (mode === "asc") {
      const sortedNotes = [...notes].sort((a, b) => {
        if (dropdownSelected === "time") {
          return b.time.localeCompare(a.time); // Sort in ascending order by time
        }
        if (dropdownSelected === "name") {
          return b.title.localeCompare(a.title); // Sort in ascending order by name
        }
        return 0;
      });
      setNoteData(sortedNotes);
      setIsSorted(true);
    }
    if (mode === "desc") {
      const sortedNotes = [...notes].sort((a, b) => {
        if (dropdownSelected === "time") {
          return a.time.localeCompare(b.time); // Sort in descending order by time
        }
        if (dropdownSelected === "name") {
          return a.title.localeCompare(b.title); // Sort in descending order by name
        }
        return 0;
      });
      setNoteData(sortedNotes);
      setIsSorted(false);
    }
  };

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleDropdownItemClick = (type: string) => {
    if (type === "time") {
      const sortedNotes = [...notes].sort((a, b) => {
        return a.time.localeCompare(b.time); // Sort in ascending order by time
      });
      setNoteData(sortedNotes);
      setDropdownSelected("time");
    }
    if (type === "name") {
      const sortedNotes = [...notes].sort((a, b) => {
        return a.title.localeCompare(b.title); // Sort in ascending order by name
      });
      setNoteData(sortedNotes);
      setDropdownSelected("name");
    }
    setDropdown(false);
    setIsSorted(false);
  };

  useEffect(() => {
    setIsSorted(false);
  }, [dropdownSelected]);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.left}
        onPress={() => {
          isSorted
            ? onPress("desc", dropdownSelected)
            : onPress("asc", dropdownSelected);
        }}
      >
        {isSorted ? (
          <AntDesign name="arrowup" style={styles.icon} />
        ) : (
          <AntDesign name="arrowdown" style={styles.icon} />
        )}
        <Text style={styles.text}>
          {dropdownSelected === "time" ? "Sort by Time" : "Sort by Name"}(
          {isSorted ? "Desc" : "Asc"})
        </Text>
      </Pressable>
      <Pressable style={{ position: "relative" }} onPress={handleDropdown}>
        <MaterialCommunityIcons name="dots-square" size={28} color="black" />
        {dropdown && (
          <View style={styles.sort}>
            <Pressable onPress={() => handleDropdownItemClick("time")}>
              <Text style={[styles.sortText]}>Sord by Time</Text>
            </Pressable>
            <Divider />
            <Pressable onPress={() => handleDropdownItemClick("name")}>
              <Text style={styles.sortText}>Sort by Name</Text>
            </Pressable>
          </View>
        )}
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
  sort: {
    position: "absolute",
    top: 30,
    right: 0,
    zIndex: 9,
    backgroundColor: theme.colors.grey,
    padding: theme.spacing.s8,
    width: 110,
    borderRadius: theme.borderRadius.medium,
  },
  sortText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.f14,
    fontWeight: "600",
    alignItems: "center",
    lineHeight: 25,
  },
});
