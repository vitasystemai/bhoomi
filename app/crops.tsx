import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { theme, globalStyles } from "@/constants/theme";
import CropCard from "@/components/CropCard";
import { crops } from "@/mocks/crops";
import { Search } from "lucide-react-native";

export default function CropsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredCrops = crops.filter((crop) =>
    crop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCropPress = (id: string) => {
    router.push(`/crop-details/${id}`);
  };

  // Group crops by season
  const kharifCrops = filteredCrops.filter((crop) => 
    crop.season.toLowerCase().includes("kharif")
  );
  
  const rabiCrops = filteredCrops.filter((crop) => 
    crop.season.toLowerCase().includes("rabi")
  );
  
  const yearRoundCrops = filteredCrops.filter((crop) => 
    crop.season.toLowerCase().includes("year-round")
  );

  return (
    <SafeAreaView style={globalStyles.container} edges={["bottom"]}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Search size={20} color={theme.colors.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search crops..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Crop Guide</Text>
          <Text style={styles.subtitle}>
            Detailed information for growing various crops
          </Text>

          {kharifCrops.length > 0 && (
            <View style={styles.seasonSection}>
              <Text style={styles.seasonTitle}>Kharif Crops</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cropsList}
              >
                {kharifCrops.map((crop) => (
                  <CropCard
                    key={crop.id}
                    name={crop.name}
                    season={crop.season}
                    imageUrl={crop.imageUrl}
                    daysToHarvest={crop.daysToHarvest}
                    onPress={() => handleCropPress(crop.id)}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {rabiCrops.length > 0 && (
            <View style={styles.seasonSection}>
              <Text style={styles.seasonTitle}>Rabi Crops</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cropsList}
              >
                {rabiCrops.map((crop) => (
                  <CropCard
                    key={crop.id}
                    name={crop.name}
                    season={crop.season}
                    imageUrl={crop.imageUrl}
                    daysToHarvest={crop.daysToHarvest}
                    onPress={() => handleCropPress(crop.id)}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {yearRoundCrops.length > 0 && (
            <View style={styles.seasonSection}>
              <Text style={styles.seasonTitle}>Year-Round Crops</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cropsList}
              >
                {yearRoundCrops.map((crop) => (
                  <CropCard
                    key={crop.id}
                    name={crop.name}
                    season={crop.season}
                    imageUrl={crop.imageUrl}
                    daysToHarvest={crop.daysToHarvest}
                    onPress={() => handleCropPress(crop.id)}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {filteredCrops.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No crops found matching "{searchQuery}"
              </Text>
            </View>
          )}

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Crop Seasons in India</Text>
            <Text style={styles.infoText}>
              • Kharif: June to October (monsoon crops)
            </Text>
            <Text style={styles.infoText}>
              • Rabi: October to March (winter crops)
            </Text>
            <Text style={styles.infoText}>
              • Zaid: March to June (summer crops)
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  searchInput: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    marginLeft: theme.spacing.sm,
    ...theme.typography.body,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xxl,
  },
  title: {
    ...theme.typography.h2,
  },
  subtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.lg,
  },
  seasonSection: {
    marginBottom: theme.spacing.lg,
  },
  seasonTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.md,
  },
  cropsList: {
    paddingBottom: theme.spacing.sm,
  },
  emptyContainer: {
    padding: theme.spacing.xl,
    alignItems: "center",
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textLight,
  },
  infoCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    ...theme.shadows.small,
  },
  infoTitle: {
    ...theme.typography.h4,
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    ...theme.typography.bodySmall,
    marginBottom: 4,
  },
});