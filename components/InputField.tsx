import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { theme } from "../theme";
import Entypo from "@expo/vector-icons/Entypo";

const InputField = ({
  icon,
  placeholder,
  onClear,
  onChangeText,
  onTaskTextChange,
  value,
  idx,
  error,
}: {
  icon?: boolean;
  placeholder: string;
  onClear?: () => void;
  onChangeText?: React.Dispatch<React.SetStateAction<string>>;
  onTaskTextChange?: (value: string, idx: string) => void;
  idx?: string;
  value?: string;
  error?: boolean;
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  useEffect(() => {
    if (error !== undefined) {
      setIsError(error);
    }
  }, [error]);

  const inputHandler = (text: string) => {
    setInputValue(text);

    if (error !== undefined) {
      setIsError(text.length === 0);
    }

    if (onTaskTextChange && idx) {
      onTaskTextChange(text, idx);
    }

    if (onChangeText) {
      onChangeText(text);
    }
  };

  return (
    <View>
      <View
        style={[
          styles.container,
          { backgroundColor: isError ? "#f8caca" : theme.colors.white },
        ]}
      >
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          value={inputValue}
          onChangeText={inputHandler}
        />
        {icon && (
          <Entypo
            name="cross"
            size={24}
            color={theme.colors.textSecondary}
            onPress={() => {
              setInputValue("");
              if (onClear) onClear();
            }}
          />
        )}
      </View>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.s8,
    height: theme.sizing.s55,
  },
  input: {
    flex: 1,
    marginLeft: theme.spacing.s8,
  },
});
