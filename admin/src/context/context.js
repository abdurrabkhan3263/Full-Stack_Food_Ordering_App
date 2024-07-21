import { createContext, useContext } from "react";

const theme = createContext({
  mode: "light",
  changeMode: () => {},
});

export const ThemeProvider = theme.Provider;

export default function useTheme() {
  return useContext(theme);
}
