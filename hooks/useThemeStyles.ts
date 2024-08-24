import { useTheme } from "./useTheme";

const useThemedStyles = (styles: (theme: any) => any) => {
  const theme = useTheme();
  return styles(theme);
};

export default useThemedStyles;
