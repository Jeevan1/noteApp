import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Routes from "./routes/Routes";
import ThemeProvider from "./context/ThemeContext";
import { theme } from "./theme";
import { Provider } from "react-redux";
import store from "./store/store";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
} from "react-native-toast-message";
const toastConfig: ToastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: theme.fontSizes.f16,
        fontWeight: "400",
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: theme.fontSizes.f16,
      }}
      text2Style={{
        fontSize: theme.fontSizes.f14,
      }}
    />
  ),
  alert: ({ text1, props }: { text1: string; props: any }) => (
    <Pressable style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </Pressable>
  ),
};

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
      <Toast config={toastConfig} />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
