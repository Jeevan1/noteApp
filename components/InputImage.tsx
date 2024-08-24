import React, { useEffect, useState } from "react";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { theme } from "../theme";
import Entypo from "@expo/vector-icons/Entypo";

const InputImage = ({
  setImage,
  error,
  value,
}: {
  setImage: React.Dispatch<React.SetStateAction<string>>;
  error?: boolean;
  value?: string;
}) => {
  const [images, setImages] = useState<string | null>(value || null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setImage(value || "");
  }, [value]);

  useEffect(() => {
    if (error !== undefined) {
      setIsError(error);
    }
    if (error !== undefined && images !== null) {
      setIsError(error);
    }
  }, [error, images]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImages(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.imagePicker,
          isError && images === null && { borderColor: "red" },
        ]}
        onPress={pickImage}
      >
        <Text
          style={[
            styles.text,
            isError && images === null && { color: "#fa8a8a" },
          ]}
        >
          Select Image
        </Text>
      </Pressable>
      {images && value !== "" && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: images }} style={styles.image} />
          <Pressable
            style={styles.cross}
            onPress={() => {
              setImages(null);
              setIsError(true);
            }}
          >
            <Entypo name="cross" size={24} color="black" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default InputImage;

const styles = StyleSheet.create({
  container: { gap: theme.spacing.s16 },
  imagePicker: {
    padding: theme.spacing.s16,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: theme.borderRadius.medium,
  },
  text: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.f16,
    fontWeight: "500",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 230,
    objectFit: "cover",
    borderRadius: theme.borderRadius.medium,
  },
  cross: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 4,
    backgroundColor: theme.colors.white,
    borderRadius: 24,
  },
});
