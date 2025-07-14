import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/constants/theme";
import { ArrowDown, ArrowUp } from "lucide-react-native";

interface MarketPriceItemProps {
  name: string;
  localPrice: number;
  statePrice: number;
  recommendedPrice: number;
  change: number;
}

export default function MarketPriceItem({
  name,
  localPrice,
  statePrice,
  recommendedPrice,
  change,
}: MarketPriceItemProps) {
  const isPositiveChange = change >= 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.changeContainer}>
          {isPositiveChange ? (
            <ArrowUp size={16} color={theme.colors.success} />
          ) : (
            <ArrowDown size={16} color={theme.colors.error} />
          )}
          <Text
            style={[
              styles.changeText,
              {
                color: isPositiveChange
                  ? theme.colors.success
                  : theme.colors.error,
              },
            ]}
          >
            {Math.abs(change)}%
          </Text>
        </View>
      </View>

      <View style={styles.pricesContainer}>
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>Local</Text>
          <Text style={styles.priceValue}>₹{localPrice}/kg</Text>
        </View>
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>State</Text>
          <Text style={styles.priceValue}>₹{statePrice}/kg</Text>
        </View>
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>Recommended</Text>
          <Text style={[styles.priceValue, styles.recommendedPrice]}>
            ₹{recommendedPrice}/kg
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  name: {
    ...theme.typography.h4,
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeText: {
    ...theme.typography.bodySmall,
    fontWeight: "600",
    marginLeft: 2,
  },
  pricesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.sm,
  },
  priceItem: {
    flex: 1,
    alignItems: "center",
  },
  priceLabel: {
    ...theme.typography.caption,
    marginBottom: 4,
  },
  priceValue: {
    ...theme.typography.body,
    fontWeight: "500",
  },
  recommendedPrice: {
    color: theme.colors.primary,
    fontWeight: "700",
  },
});