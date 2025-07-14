import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "@/constants/theme";

interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  onPress: () => void;
}

export default function ProductCard({
  name,
  price,
  imageUrl,
  category,
  onPress,
}: ProductCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.price}>₹{price}</Text>
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
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  content: {
    padding: theme.spacing.sm,
  },
  category: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
    marginBottom: 2,
  },
  name: {
    ...theme.typography.body,
    fontWeight: "500",
    marginBottom: 4,
  },
  price: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: "700",
  },
});