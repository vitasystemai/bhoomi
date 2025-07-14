import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { theme } from "@/constants/theme";
import { LucideIcon } from "lucide-react-native";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onPress: () => void;
  color?: string;
  backgroundImage?: string;
}

export default function FeatureCard({
  title,
  description,
  icon,
  onPress,
  color = theme.colors.primary,
  backgroundImage,
}: FeatureCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: color }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {backgroundImage && (
        <Image 
          source={{ uri: backgroundImage }} 
          style={styles.backgroundImage} 
          resizeMode="cover"
        />
      )}
      <View style={styles.cardContent}>
        <View style={[styles.iconContainer, { backgroundColor: color + "20" }]}>
          {icon}
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    borderLeftWidth: 4,
    overflow: "hidden",
    ...theme.shadows.medium,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.1,
  },
  cardContent: {
    flexDirection: "row",
    padding: theme.spacing.md,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    ...theme.typography.h4,
    marginBottom: 4,
  },
  description: {
    ...theme.typography.bodySmall,
  },
});