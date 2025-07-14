import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { theme, globalStyles } from "@/constants/theme";
import { crops } from "@/mocks/crops";
import { Calendar, Droplets, Thermometer, Leaf, Shield } from "lucide-react-native";

export default function CropDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const crop = crops.find((c) => c.id === id);

  if (!crop) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <View style={[globalStyles.container, globalStyles.center]}>
          <Text style={theme.typography.h3}>Crop not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container} edges={["bottom"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Image source={{ uri: crop.imageUrl }} style={styles.image} />

        <View style={styles.header}>
          <Text style={styles.title}>{crop.name}</Text>
          <View style={styles.seasonBadge}>
            <Text style={styles.seasonText}>{crop.season} Season</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Calendar size={20} color={theme.colors.primary} />
            <Text style={styles.infoText}>{crop.daysToHarvest} days to harvest</Text>
          </View>
          <View style={styles.infoItem}>
            <Droplets size={20} color={theme.colors.primary} />
            <Text style={styles.infoText}>{crop.waterRequirement} water needs</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Soil Requirements</Text>
          <Text style={styles.sectionText}>{crop.soilType}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fertilizer Recommendations</Text>
          <View style={styles.listContainer}>
            {crop.fertilizers.map((fertilizer, index) => (
              <View key={index} style={styles.listItem}>
                <Leaf size={18} color={theme.colors.leafGreen} />
                <Text style={styles.listText}>{fertilizer}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pest Management</Text>
          <View style={styles.listContainer}>
            {crop.pestManagement.map((pest, index) => (
              <View key={index} style={styles.listItem}>
                <Shield size={18} color={theme.colors.primary} />
                <Text style={styles.listText}>{pest}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Harvesting</Text>
          <Text style={styles.sectionText}>{crop.harvesting}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: theme.spacing.xxl,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  header: {
    padding: theme.spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    ...theme.typography.h2,
  },
  seasonBadge: {
    backgroundColor: theme.colors.primary + "20",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  seasonText: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  infoContainer: {
    flexDirection: "row",
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: theme.spacing.lg,
  },
  infoText: {
    ...theme.typography.body,
    marginLeft: theme.spacing.sm,
  },
  section: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  sectionTitle: {
    ...theme.typography.h4,
    marginBottom: theme.spacing.sm,
  },
  sectionText: {
    ...theme.typography.body,
    color: theme.colors.textLight,
  },
  listContainer: {
    marginTop: theme.spacing.xs,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  listText: {
    ...theme.typography.body,
    marginLeft: theme.spacing.sm,
  },
});