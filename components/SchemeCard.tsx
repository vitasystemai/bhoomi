import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "@/constants/theme";
import { ChevronRight } from "lucide-react-native";

interface SchemeCardProps {
  title: string;
  description: string;
  agency: string;
  onPress: () => void;
}

export default function SchemeCard({
  title,
  description,
  agency,
  onPress,
}: SchemeCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <Text style={styles.agency}>{agency}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
      <ChevronRight size={20} color={theme.colors.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  content: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  agency: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  title: {
    ...theme.typography.h4,
    marginBottom: 4,
  },
  description: {
    ...theme.typography.bodySmall,
    color: theme.colors.textLight,
  },
});