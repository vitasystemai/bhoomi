import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { theme, globalStyles } from "@/constants/theme";
import ProductCard from "@/components/ProductCard";
import { products } from "@/mocks/products";
import { Search, Filter } from "lucide-react-native";

export default function StoreScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();

  const categories = [
    "All",
    "Seeds",
    "Fertilizers",
    "Tools",
    "Equipment",
    "Accessories",
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === null ||
        selectedCategory === "All" ||
        product.category === selectedCategory)
  );

  const handleProductPress = (id: string) => {
    router.push(`/product-details/${id}`);
  };

  return (
    <SafeAreaView style={globalStyles.container} edges={["bottom"]}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Search size={20} color={theme.colors.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Bhoomi Store</Text>
        <Text style={styles.subtitle}>
          Quality agricultural products for your farm
        </Text>

        <View style={styles.categoriesContainer}>
          <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  selectedCategory === item && styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === item && styles.selectedCategoryText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
              category={item.category}
              onPress={() => handleProductPress(item.id)}
            />
          )}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          contentContainerStyle={styles.productsContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No products found matching your criteria
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
  filterButton: {
    padding: theme.spacing.xs,
  },
  title: {
    ...theme.typography.h2,
  },
  subtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.md,
  },
  categoriesContainer: {
    marginBottom: theme.spacing.md,
  },
  categoryButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectedCategory: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  selectedCategoryText: {
    color: "white",
    fontWeight: "600",
  },
  productsContainer: {
    paddingBottom: theme.spacing.xxl,
  },
  productRow: {
    justifyContent: "space-between",
  },
  emptyContainer: {
    padding: theme.spacing.xl,
    alignItems: "center",
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    textAlign: "center",
  },
});