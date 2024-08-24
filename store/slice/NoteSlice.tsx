import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Note } from "../../constants";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setNote } from "../../utils/AsyncStorage";

type State = {
  notes: Note[];
  loading: boolean;
};

const initialState: State = {
  loading: false,
  notes: [],
};

// Fetch notes from AsyncStorage or initialize if not present
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  try {
    const notes = await AsyncStorage.getItem("notes");
    if (notes !== null) {
      const parsedNotes = JSON.parse(notes);
      if (Array.isArray(parsedNotes)) {
        return parsedNotes;
      } else {
        throw new Error("Parsed notes is not an array");
      }
    } else {
      const initialNotes: Note[] = [];
      await AsyncStorage.setItem("notes", JSON.stringify(initialNotes));
      return initialNotes;
    }
  } catch (error) {
    console.log("Error fetching notes:", error);
    throw error;
  }
});

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNoteData: (state, action) => {
      state.notes = [...state.notes, action.payload];
      const notes = JSON.stringify(state.notes);
      const setNotes = async () => {
        await setNote("notes", state.notes);
      };

      setNotes();

      Toast.show({
        type: "success",
        text1: "Note added successfully",
        onPress: () => {
          Toast.hide();
        },
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = action.payload;
    });

    builder.addCase(fetchNotes.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { addNoteData } = noteSlice.actions;
export default noteSlice.reducer;
