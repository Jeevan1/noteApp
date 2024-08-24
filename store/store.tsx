import { configureStore } from "@reduxjs/toolkit";
import NoteSlice, { fetchNotes } from "./slice/NoteSlice";

const store = configureStore({
  reducer: {
    notes: NoteSlice,
  },
});

store.dispatch(fetchNotes());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
