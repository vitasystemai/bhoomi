import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "@/constants/theme";

interface CropCardProps {
  name: string;
  season: string;
  imageUrl: string;
  daysToHarvest: number;
  onPress: () => void;
}

export default function CropCard({
  name,
  season,
  imageUrl,
  daysToHarvest,
  onPress,
}: CropCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.season}>{season}</Text>
        <View style={styles.harvestContainer}>
          <Text style={styles.harvestText}>
            {daysToHarvest} days to harvest
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
    overflow: "hidden",
    width: 160,
    marginRight: theme.spacing.md,
    ...theme.shadows.medium,
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  content: {
    padding: theme.spacing.sm,
  },
  name: {
    ...theme.typography.h4,
    marginBottom: 2,
  },
  season: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
    marginBottom: 8,
  },
  harvestContainer: {
    backgroundColor: theme.colors.primary + "20",
    borderRadius: theme.borderRadius.sm,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  harvestText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: "500",
    textAlign: "center",
  },
});