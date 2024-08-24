import { Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

const HeaderLeft = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/user.png")} style={styles.image} />
      <Text style={styles.text}>Good morning!</Text>
    </View>
  );
};

export default HeaderLeft;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.s8,
    paddingVertical: theme.spacing.s8,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderRadius: theme.borderRadius.circle,
    marginVertical: 10,
    backgroundColor: theme.colors.primary,
  },
  text: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.f20,
    fontWeight: "bold",
  },
});
