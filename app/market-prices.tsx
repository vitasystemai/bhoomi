import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme, globalStyles } from "@/constants/theme";
import MarketPriceItem from "@/components/MarketPriceItem";
import { marketPrices } from "@/mocks/market-prices";
import { Search } from "lucide-react-native";

export default function MarketPricesScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPrices = marketPrices.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
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

        <View style={styles.headerContainer}>
          <Text style={styles.title}>Market Prices</Text>
          <Text style={styles.subtitle}>
            Updated: {new Date().toLocaleDateString()}
          </Text>
        </View>

        <FlatList
          data={filteredPrices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MarketPriceItem
              name={item.name}
              localPrice={item.localPrice}
              statePrice={item.statePrice}
              recommendedPrice={item.recommendedPrice}
              change={item.change}
            />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No crops found matching "{searchQuery}"
              </Text>
            </View>
          }
        />

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Price Information</Text>
          <Text style={styles.infoText}>
            • Local: Average price in local markets
          </Text>
          <Text style={styles.infoText}>
            • State: Average price across state markets
          </Text>
          <Text style={styles.infoText}>
            • Recommended: Fair price suggested by BHOOMI AI
          </Text>
        </View>
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
  headerContainer: {
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h2,
  },
  subtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.textLight,
  },
  listContainer: {
    paddingBottom: theme.spacing.lg,
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
    marginBottom: theme.spacing.lg,
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