import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { theme, globalStyles } from "@/constants/theme";
import SchemeCard from "@/components/SchemeCard";
import { schemes } from "@/mocks/schemes";
import { Search } from "lucide-react-native";

export default function SchemesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredSchemes = schemes.filter(
    (scheme) =>
      scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSchemePress = (id: string) => {
    router.push(`/scheme-details/${id}`);
  };

  return (
    <SafeAreaView style={globalStyles.container} edges={["bottom"]}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Search size={20} color={theme.colors.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search schemes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.title}>Government Schemes</Text>
          <Text style={styles.subtitle}>
            Agricultural support programs for farmers
          </Text>
        </View>

        <FlatList
          data={filteredSchemes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SchemeCard
              title={item.title}
              description={item.description}
              agency={item.agency}
              onPress={() => handleSchemePress(item.id)}
            />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No schemes found matching "{searchQuery}"
              </Text>
            </View>
          }
        />
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
});