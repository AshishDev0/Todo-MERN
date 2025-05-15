import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: (localStorage.getItem("theme") as Theme) || "system",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
