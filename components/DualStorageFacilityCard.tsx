import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Linking } from "react-native";
import { theme } from "@/constants/theme";
import { MapPin, Phone, Package, Thermometer } from "lucide-react-native";

interface DualStorageFacilityCardProps {
  name: string;
  type: string;
  address: string;
  contact: string;
  coldCapacity: string;
  warmCapacity: string;
  coldTemperature: string;
  warmTemperature: string;
  services: string[];
  coldCost: string;
  warmCost: string;
  onPress: () => void;
}

export default function DualStorageFacilityCard({
  name,
  type,
  address,
  contact,
  coldCapacity,
  warmCapacity,
  coldTemperature,
  warmTemperature,
  services,
  coldCost,
  warmCost,
  onPress,
}: DualStorageFacilityCardProps) {
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

      <View style={styles.storageSection}>
        <View style={styles.storageType}>
          <Text style={styles.storageTypeTitle}>Cold Storage:</Text>
          <View style={styles.storageDetails}>
            <View style={styles.detailItem}>
              <Package size={14} color={theme.colors.primary} />
              <Text style={styles.detailText}>{coldCapacity}</Text>
            </View>
            <View style={styles.detailItem}>
              <Thermometer size={14} color={theme.colors.primary} />
              <Text style={styles.detailText}>{coldTemperature}</Text>
            </View>
          </View>
          <Text style={styles.costText}>{coldCost}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.storageType}>
          <Text style={styles.storageTypeTitle}>Warm Storage:</Text>
          <View style={styles.storageDetails}>
            <View style={styles.detailItem}>
              <Package size={14} color={theme.colors.primary} />
              <Text style={styles.detailText}>{warmCapacity}</Text>
            </View>
            <View style={styles.detailItem}>
              <Thermometer size={14} color={theme.colors.primary} />
              <Text style={styles.detailText}>{warmTemperature}</Text>
            </View>
          </View>
          <Text style={styles.costText}>{warmCost}</Text>
        </View>
      </View>

      <View style={styles.servicesContainer}>
        <Text style={styles.servicesTitle}>Services:</Text>
        <Text style={styles.servicesText}>{services.join(", ")}</Text>
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
    backgroundColor: theme.colors.leafGreen + "20",
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  typeText: {
    ...theme.typography.caption,
    color: theme.colors.leafGreen,
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
  storageSection: {
    marginTop: theme.spacing.sm,
  },
  storageType: {
    marginBottom: theme.spacing.sm,
  },
  storageTypeTitle: {
    ...theme.typography.bodySmall,
    fontWeight: "600",
    marginBottom: 4,
  },
  storageDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    ...theme.typography.caption,
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 8,
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
  costText: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary,
    fontWeight: "600",
    textAlign: "right",
  },
});