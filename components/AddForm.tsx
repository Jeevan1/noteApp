import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Alert } from "react-native";
import InputField from "./InputField";
import { theme } from "../theme";
import Button from "./Button";
import InputImage from "./InputImage";
import { Note, TaskItem } from "../constants";
import { useDispatch } from "react-redux";
import { addNoteData } from "../store/slice/NoteSlice";
import Entypo from "@expo/vector-icons/Entypo";
import Toast from "react-native-toast-message";
const initialState = {
  idx: Math.random().toString(),
  source: "",
  title: "",
  description: "",
  time: new Date().toLocaleString(),
  tasks: [
    {
      idx: Math.random().toString(),
      title: "",
      taskItems: [
        {
          idx: Math.random().toString(),
          completed: false,
          text: "",
          keyItem: Math.random().toString(),
        },
      ],
      completed: false,
      description: "",
    },
  ],
  image: "",
};

const AddForm = () => {
  const dispatch = useDispatch();
  const [note, setNote] = useState<Note>(initialState);
  const [error, setError] = useState({
    title: false,
    description: false,
    taskTitle: false,
    taskText: false,
    image: false,
  });

  useEffect(() => {
    setNote({
      ...note,
      time: new Date().toLocaleString(),
    });
  }, [note.title, note.description, note.image]);

  const handleNoteChange = (field: string, value: any) => {
    setNote({
      ...note,
      [field]: value,
    });
  };
  const handleTaskTitleChange = (value: string, taskIdx: string) => {
    const updatedTasks = note.tasks.map((task) => {
      if (task.idx === taskIdx) {
        return { ...task, title: value };
      }
      return task;
    });
    handleNoteChange("tasks", updatedTasks);
  };

  const addTask = (taskIdx: string) => {
    const taskIndex = note.tasks.findIndex((task) => task.idx === taskIdx);
    if (taskIndex === -1) return;

    const { taskItems } = note.tasks[taskIndex];
    if (taskItems.some((task) => task.text === "")) {
      Alert.alert("Task cannot be empty");
      return;
    }

    if (taskItems.length < 5) {
      const newTaskItem = {
        idx: Math.random().toString(),
        completed: false,
        text: "",
        keyItem: Math.random().toString(),
      };

      const updatedTasks = [...note.tasks];
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        taskItems: [...taskItems, newTaskItem],
      };

      handleNoteChange("tasks", updatedTasks);
    } else {
      Alert.alert("Maximum of 5 tasks reached");
    }
  };

  const addMoreTask = () => {
    if (note.tasks.some((task) => task.title === "")) {
      Alert.alert("Task title cannot be empty");
      return;
    }
    const newTask = {
      idx: Math.random().toString(),
      title: "",
      taskItems: [
        {
          idx: Math.random().toString(),
          completed: false,
          text: "",
          keyItem: Math.random().toString(),
        },
      ],
      completed: false,
      description: "",
    };

    handleNoteChange("tasks", [...note.tasks, newTask]);
  };

  const removeTask = (taskIdx: string) => {
    const updatedTasks = note.tasks.filter((task) => task.idx !== taskIdx);
    handleNoteChange("tasks", updatedTasks);
  };
  const removeTaskItem = (taskIdx: string, itemIdx: string) => {
    const updatedTasks = note.tasks.map((task) => {
      if (task.idx === taskIdx) {
        const updatedTaskItems = task.taskItems.filter(
          (item) => item.idx !== itemIdx
        );
        return { ...task, taskItems: updatedTaskItems };
      }
      return task;
    });
    handleNoteChange("tasks", updatedTasks);
  };

  const handleAddTaskTextChange = (
    value: string,
    taskIdx: string,
    itemIdx: string
  ) => {
    const updatedTasks = note.tasks.map((task) => {
      if (task.idx === taskIdx) {
        const updatedTaskItems = task.taskItems.map((item) =>
          item.idx === itemIdx ? { ...item, text: value } : item
        );
        return { ...task, taskItems: updatedTaskItems };
      }
      return task;
    });

    handleNoteChange("tasks", updatedTasks);
  };
  const handleAddNote = () => {
    const newErrors = {
      title: note.title === "",
      description: note.description === "",
      taskTitle: note.tasks.some((task) => task.title === ""),
      taskText: note.tasks.some((task) =>
        task.taskItems.some((item) => item.text === "")
      ),
      image: note.image === "",
    };

    setError(newErrors);

    const hasError = Object.values(newErrors).some((err) => err);

    if (hasError) {
      Toast.show({
        type: "error",
        text1: "Please fill in all required fields!",
        onPress: () => {
          Toast.hide();
        },
      });
      return;
    }

    dispatch(addNoteData(note));
    setNote(initialState);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <InputField
          placeholder="Enter your title"
          onChangeText={(value) => handleNoteChange("title", value)}
          value={note.title}
          error={error.title}
        />
        <InputField
          placeholder="Enter your description"
          onChangeText={(value) => handleNoteChange("description", value)}
          value={note.description}
          error={error.description}
        />
        <Text style={styles.heading}>Tasks</Text>
        {note.tasks.map((task, i) => (
          <View
            key={i}
            style={[
              styles.taskContainer,
              {
                borderWidth: 1,
                borderColor: theme.colors.primary,
                padding: theme.spacing.s14,
                borderRadius: theme.borderRadius.large,
              },
            ]}
          >
            <View style={styles.taskHeaderContainer}>
              <Text
                style={{
                  fontWeight: "bold",
                  paddingHorizontal: theme.spacing.s8,
                }}
              >
                Task {note.tasks.indexOf(task) + 1}
              </Text>
              {i > 0 && (
                <Entypo
                  name="cross"
                  size={24}
                  color={theme.colors.textSecondary}
                  onPress={() => removeTask(task.idx)}
                />
              )}
            </View>
            <InputField
              placeholder="Enter task title"
              onTaskTextChange={(value) =>
                handleTaskTitleChange(value, task.idx)
              }
              error={error.taskTitle}
              icon={false}
              idx={task.idx}
              value={task.title}
            />
            <View style={styles.taskContainer}>
              <View style={{ gap: theme.spacing.s8 }}>
                {task.taskItems.map((item, i) => (
                  <View key={item.idx} style={styles.taskInputContainer}>
                    <InputField
                      placeholder="Enter task"
                      onTaskTextChange={(value) =>
                        handleAddTaskTextChange(value, task.idx, item.idx)
                      }
                      onClear={() => removeTaskItem(task.idx, item.idx)}
                      icon={i > 0 ? true : false}
                      idx={item.idx}
                      error={error.taskText}
                      value={item.text}
                    />
                  </View>
                ))}
              </View>
            </View>
            <Button
              text="Add Task"
              onPress={() => addTask(task.idx)}
              style={styles.button}
            />
          </View>
        ))}
        <Button
          text="Add More Tasks"
          onPress={addMoreTask}
          style={styles.button}
        />
        <View>
          <InputImage
            setImage={(value) => handleNoteChange("image", value)}
            error={error.image}
            value={note.image}
          />
        </View>
        <Button
          text="Add Note"
          style={styles.button}
          onPress={() => handleAddNote()}
        />
      </View>
    </ScrollView>
  );
};

export default AddForm;

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.s16,
    paddingHorizontal: theme.spacing.s16,
    marginBottom: theme.spacing.s24,
    paddingTop: theme.spacing.s8,
  },
  taskContainer: {
    gap: theme.spacing.s16,
  },
  taskInputContainer: {
    marginBottom: 4,
  },
  taskHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: theme.fontSizes.f20,
    fontWeight: "600",
    color: theme.colors.dark,
  },
  button: {
    backgroundColor: theme.colors.primary,
  },
});
