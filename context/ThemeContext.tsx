import React from "react";
import { themes } from "../theme";

export const ThemeContext = React.createContext();

const ThemeProvider = ({ children }: any) => {
  const theme = {
    colors: {
      primary: "#3498db",
      secondary: "#2ecc71",
      accent: "#e74c3c",
      background: "#ecf0f1",
      textPrimary: "#2c3e50",
      textSecondary: "#95a5a6",
    },
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
