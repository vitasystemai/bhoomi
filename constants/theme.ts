import { StyleSheet } from "react-native";
import Colors from "./colors";

export const theme = {
  colors: Colors,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    round: 9999,
  },
  typography: {
    h1: {
      fontSize: 28,
      fontWeight: "700",
      color: Colors.text,
    },
    h2: {
      fontSize: 24,
      fontWeight: "700",
      color: Colors.text,
    },
    h3: {
      fontSize: 20,
      fontWeight: "600",
      color: Colors.text,
    },
    h4: {
      fontSize: 18,
      fontWeight: "600",
      color: Colors.text,
    },
    body: {
      fontSize: 16,
      color: Colors.text,
    },
    bodySmall: {
      fontSize: 14,
      color: Colors.textLight,
    },
    caption: {
      fontSize: 12,
      color: Colors.textLight,
    },
  },
  shadows: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 4,
    },
    large: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 8,
    },
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
});