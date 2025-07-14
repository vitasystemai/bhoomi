import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Linking } from "react-native";
import { theme } from "@/constants/theme";
import { MapPin, Phone, Tag, Check, X } from "lucide-react-native";

interface SeedBuyerCardProps {
  name: string;
  type: string;
  address: string;
  contact: string;
  seedTypes: string[];
  paymentTerms: string;
  certificationRequired: boolean;
  onPress: () => void;
}

export default function SeedBuyerCard({
  name,
  type,
  address,
  contact,
  seedTypes,
  paymentTerms,
  certificationRequired,
  onPress,
}: SeedBuyerCardProps) {
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

      <View style={styles.seedTypesContainer}>
        <Text style={styles.seedTypesTitle}>Seed Types:</Text>
        <View style={styles.seedTypesList}>
          {seedTypes.map((seedType, index) => (
            <View key={index} style={styles.seedTypeBadge}>
              <Text style={styles.seedTypeText}>{seedType}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.paymentContainer}>
        <Text style={styles.paymentTitle}>Payment Terms:</Text>
        <Text style={styles.paymentText}>{paymentTerms}</Text>
      </View>

      <View style={styles.certificationContainer}>
        <Text style={styles.certificationTitle}>Certification Required:</Text>
        {certificationRequired ? (
          <View style={styles.certificationBadge}>
            <Check size={14} color={theme.colors.success} />
            <Text style={[styles.certificationText, { color: theme.colors.success }]}>
              Yes
            </Text>
          </View>
        ) : (
          <View style={[styles.certificationBadge, { backgroundColor: theme.colors.error + "20" }]}>
            <X size={14} color={theme.colors.error} />
            <Text style={[styles.certificationText, { color: theme.colors.error }]}>
              No
            </Text>
          </View>
        )}
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
    backgroundColor: theme.colors.sunYellow + "20",
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  typeText: {
    ...theme.typography.caption,
    color: theme.colors.sunYellow,
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
  seedTypesContainer: {
    marginTop: theme.spacing.sm,
  },
  seedTypesTitle: {
    ...theme.typography.bodySmall,
    fontWeight: "600",
    marginBottom: 4,
  },
  seedTypesList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  seedTypeBadge: {
    backgroundColor: theme.colors.primary + "15",
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    marginRight: 6,
    marginBottom: 6,
  },
  seedTypeText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
  },
  paymentContainer: {
    marginTop: theme.spacing.sm,
  },
  paymentTitle: {
    ...theme.typography.bodySmall,
    fontWeight: "600",
  },
  paymentText: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
  },
  certificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: theme.spacing.sm,
  },
  certificationTitle: {
    ...theme.typography.bodySmall,
    fontWeight: "600",
  },
  certificationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.success + "20",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  certificationText: {
    ...theme.typography.caption,
    marginLeft: 4,
  },
});