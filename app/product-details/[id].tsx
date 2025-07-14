import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { theme, globalStyles } from "@/constants/theme";
import { products } from "@/mocks/products";
import { Star, Minus, Plus, ShoppingCart } from "lucide-react-native";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <View style={[globalStyles.container, globalStyles.center]}>
          <Text style={theme.typography.h3}>Product not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container} edges={["bottom"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Image source={{ uri: product.imageUrl }} style={styles.image} />

        <View style={styles.detailsContainer}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.name}>{product.name}</Text>

          <View style={styles.ratingContainer}>
            <Star
              size={18}
              color={theme.colors.sunYellow}
              fill={theme.colors.sunYellow}
            />
            <Text style={styles.rating}>{product.rating}</Text>
          </View>

          <Text style={styles.price}>₹{product.price}</Text>

          {product.quantity && (
            <Text style={styles.quantity}>Quantity: {product.quantity}</Text>
          )}

          <View style={styles.divider} />

          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          {product.brand && (
            <Text style={styles.brand}>Brand: {product.brand}</Text>
          )}

          <View style={styles.divider} />

          <View style={styles.quantityContainer}>
            <Text style={styles.quantityTitle}>Quantity:</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decrementQuantity}
              >
                <Minus size={18} color={theme.colors.text} />
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={incrementQuantity}
              >
                <Plus size={18} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>₹{product.price * quantity}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton}>
          <ShoppingCart size={20} color="white" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100, // Space for the footer
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: theme.spacing.md,
  },
  category: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  name: {
    ...theme.typography.h2,
    marginBottom: theme.spacing.sm,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  rating: {
    ...theme.typography.body,
    marginLeft: 4,
  },
  price: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    marginBottom: 4,
  },
  quantity: {
    ...theme.typography.body,
    color: theme.colors.textLight,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.md,
  },
  descriptionTitle: {
    ...theme.typography.h4,
    marginBottom: theme.spacing.sm,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    lineHeight: 22,
    marginBottom: theme.spacing.md,
  },
  brand: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityTitle: {
    ...theme.typography.body,
    fontWeight: "500",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  quantityValue: {
    ...theme.typography.body,
    fontWeight: "600",
    marginHorizontal: theme.spacing.md,
    minWidth: 20,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.card,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    padding: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.textLight,
  },
  totalPrice: {
    ...theme.typography.h3,
    color: theme.colors.primary,
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  addToCartText: {
    color: "white",
    fontWeight: "600",
    marginLeft: theme.spacing.sm,
  },
});