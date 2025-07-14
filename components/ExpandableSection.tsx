import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, LayoutAnimation, Platform, UIManager } from "react-native";
import { theme } from "@/constants/theme";
import { ChevronDown, ChevronUp } from "lucide-react-native";

// Enable LayoutAnimation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
  icon?: React.ReactNode;
}

export default function ExpandableSection({
  title,
  children,
  initiallyExpanded = false,
  icon,
}: ExpandableSectionProps) {
  const [expanded, setExpanded] = useState(initiallyExpanded);

  const toggleExpand = () => {
    if (Platform.OS !== "web") {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <View style={styles.titleContainer}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={styles.title}>{title}</Text>
        </View>
        {expanded ? (
          <ChevronUp size={20} color={theme.colors.primary} />
        ) : (
          <ChevronDown size={20} color={theme.colors.primary} />
        )}
      </TouchableOpacity>
      {expanded && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    overflow: "hidden",
    ...theme.shadows.small,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.md,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: theme.spacing.sm,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  content: {
    padding: theme.spacing.md,
    paddingTop: 0,
  },
});