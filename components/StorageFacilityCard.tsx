import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Linking } from "react-native";
import { theme } from "@/constants/theme";
import { MapPin, Phone, Package, Thermometer } from "lucide-react-native";

interface StorageFacilityCardProps {
  name: string;
  type: string;
  address: string;
  contact: string;
  capacity: string;
  temperature: string;
  services: string[];
  cost: string;
  onPress: () => void;
}

export default function StorageFacilityCard({
  name,
  type,
  address,
  contact,
  capacity,
  temperature,
  services,
  cost,
  onPress,
}: StorageFacilityCardProps) {
  const handleCall = () => {
    Linking.openURL(`tel:${contact}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{type}</Text>
        </View>
      </View>

      <View style={styles.infoItem}>
        <MapPin size={16} color={theme.colors.primary} />
        <Text style={styles.infoText}>{address}</Text>
      </View>

      <View style={styles.infoItem}>
        <Phone size={16} color={theme.colors.primary} />
        <Text style={styles.infoText} onPress={handleCall}>
          {contact}
        </Text>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Package size={16} color={theme.colors.primary} />
          <Text style={styles.detailText}>Capacity: {capacity}</Text>
        </View>
        <View style={styles.detailItem}>
          <Thermometer size={16} color={theme.colors.primary} />
          <Text style={styles.detailText}>Temp: {temperature}</Text>
        </View>
      </View>

      <View style={styles.servicesContainer}>
        <Text style={styles.servicesTitle}>Services:</Text>
        <Text style={styles.servicesText}>{services.join(", ")}</Text>
      </View>

      <View style={styles.costContainer}>
        <Text style={styles.costText}>{cost}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
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
    flex: 1,
  },
  typeBadge: {
    backgroundColor: theme.colors.primary + "20",
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  typeText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: "600",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    ...theme.typography.bodySmall,
    marginLeft: 8,
    flex: 1,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: theme.spacing.sm,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    ...theme.typography.bodySmall,
    marginLeft: 4,
  },
  servicesContainer: {
    marginTop: 4,
  },
  servicesTitle: {
    ...theme.typography.bodySmall,
    fontWeight: "600",
  },
  servicesText: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
  },
  costContainer: {
    marginTop: theme.spacing.sm,
    alignItems: "flex-end",
  },
  costText: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: "600",
  },
});