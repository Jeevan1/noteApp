import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { Pressable, StyleSheet, Text } from "react-native";
import HeaderRight from "../components/HeaderRight";
import HeaderLeft from "../components/HeaderLeft";
import { theme } from "../theme";
import DetailsScreen from "../screens/DetailsScreen";
import Back from "../components/Back";
import AddScreen from "../screens/AddScreen";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: styles.header,
          headerRight: () => <HeaderRight />,
          headerLeft: () => <HeaderLeft />,
          headerTitle: () => null,
          headerShadowVisible: false,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            headerStyle: styles.header,
            headerLeft: () => <Back />,
            headerRight: () => (
              <Pressable>
                <Text>Save</Text>
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="Add"
          component={AddScreen}
          options={{
            headerStyle: styles.header,
            headerTitle: () => (
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>Add Note</Text>
            ),
            headerLeft: () => null,
            headerRight: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.background,
  },
});
