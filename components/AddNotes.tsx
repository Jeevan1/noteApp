import React, { Children, useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { theme } from "../theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const AddNotes = () => {
  const [show, setShow] = useState(false);
  const [height, setHeight] = useState(0);

  const navigation = useNavigation();
  const navigationState = navigation.getState();
  const routeName = navigationState.routes[navigationState.index].name;

  useEffect(() => {
    setTimeout(() => {
      setHeight(200);
    }, 3000);
  }, [show]);
  return (
    <View style={[styles.container]}>
      <View style={styles.mainicon}>
        <Pressable
          onPress={() => setShow(!show)}
          style={{
            elevation: 5,
            width: 48,
            height: 48,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Feather name="plus" size={28} color={theme.colors.white} />
        </Pressable>
        {show && (
          <View style={[styles.addContent]}>
            <AddIconItem active={routeName === "Details"} navigateTo="Details">
              <MaterialIcons
                name="note-alt"
                size={28}
                color={routeName === "Details" ? theme.colors.primary : "black"}
                style={{
                  backgroundColor:
                    routeName === "Details" ? theme.colors.background : "none",
                }}
              />
            </AddIconItem>
            <AddIconItem active={routeName === "Home"} navigateTo="Home">
              <MaterialIcons
                name="send-time-extension"
                size={28}
                color={routeName === "Home" ? theme.colors.primary : "black"}
                style={{
                  backgroundColor:
                    routeName === "Home" ? theme.colors.background : "none",
                }}
              />
            </AddIconItem>
            <AddIconItem active={routeName === "Home"} navigateTo="Add">
              <MaterialIcons
                name="send-time-extension"
                size={28}
                color={routeName === "Home" ? theme.colors.primary : "black"}
                style={{
                  backgroundColor:
                    routeName === "Home" ? theme.colors.background : "none",
                }}
              />
            </AddIconItem>
          </View>
        )}
      </View>
    </View>
  );
};

export default AddNotes;

export const AddIconItem = ({
  children,
  active,
  navigateTo,
}: {
  children: any;
  active: boolean;
  navigateTo: never;
}) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate(navigateTo);
  };
  return (
    <Pressable
      style={[
        styles.icon,
        {
          backgroundColor: active
            ? theme.colors.background
            : theme.colors.white,
        },
      ]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 20,
    bottom: 50,
  },
  mainicon: {
    position: "relative",
    borderRadius: theme.borderRadius.circle,
    padding: theme.spacing.s8,
    backgroundColor: theme.colors.primary,
  },
  addContent: {
    position: "absolute",
    bottom: 80,
    right: 0,
    alignItems: "center",
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.circle,
    width: 70,
    overflow: "hidden",
    gap: theme.spacing.s8,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    padding: theme.spacing.s8,
  },
  icon: {
    color: theme.colors.textPrimary,
    padding: theme.spacing.s12,
    // backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.circle,
  },
});
