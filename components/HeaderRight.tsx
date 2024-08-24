import { Pressable, StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { theme } from "../theme";

const HeaderRight = () => {
  return (
    <Pressable>
      <Entypo
        name="dots-three-vertical"
        size={24}
        color="black"
        style={[styles.icon]}
      />
    </Pressable>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({
  container: {},
  icon: {
    fontSize: theme.fontSizes.f20,
  },
});
