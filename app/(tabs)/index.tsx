import React from "react";
import { ScrollView, StyleSheet, Text, View, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { theme, globalStyles } from "@/constants/theme";
import Header from "@/components/Header";
import FeatureCard from "@/components/FeatureCard";
import { features } from "@/mocks/features";
import { MessageCircle, Cloud, BarChart2, FileText, Leaf, ShoppingBag, Archive } from "lucide-react-native";

// Feature background images
const featureBackgrounds = {
  chatbot: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  weather: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  market: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  schemes: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  crops: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  store: "https://images.unsplash.com/photo-1595665593673-bf1ad72905c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  seeds: "https://images.unsplash.com/photo-1574943320219-5630bb4c2452?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
};

export default function HomeScreen() {
  const router = useRouter();

  const getIconForFeature = (iconName: string) => {
    switch (iconName) {
      case "message-circle":
        return <MessageCircle size={24} color={theme.colors.primary} />;
      case "cloud":
        return <Cloud size={24} color={theme.colors.leafGreen} />;
      case "bar-chart-2":
        return <BarChart2 size={24} color={theme.colors.sunYellow} />;
      case "file-text":
        return <FileText size={24} color="#BD10E0" />;
      case "leaf":
        return <Leaf size={24} color="#50E3C2" />;
      case "shopping-bag":
        return <ShoppingBag size={24} color="#FF5E5B" />;
      case "archive":
        return <Archive size={24} color={theme.colors.earthBrown} />;
      default:
        return <MessageCircle size={24} color={theme.colors.primary} />;
    }
  };

  const handleFeaturePress = (route: string) => {
    router.push(route);
  };

  return (
    <View style={globalStyles.container}>
      <Header
        title="BHOOMI AI"
        subtitle="Smart Agriculture Companion"
      />
      
      <ImageBackground 
        source={{ uri: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" }}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome to BHOOMI AI</Text>
            <Text style={styles.welcomeSubtext}>
              Your complete agricultural companion for smarter farming
            </Text>
          </View>
          
          <Text style={styles.sectionTitle}>How can we help you today?</Text>
          
          <View style={styles.featuresContainer}>
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={getIconForFeature(feature.icon)}
                onPress={() => handleFeaturePress(feature.route)}
                color={feature.color}
                backgroundImage={featureBackgrounds[feature.id as keyof typeof featureBackgrounds]}
              />
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  backgroundImageStyle: {
    opacity: 0.05,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
  },
  welcomeContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.medium,
  },
  welcomeText: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    textAlign: "center",
  },
  welcomeSubtext: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    textAlign: "center",
    marginTop: theme.spacing.xs,
  },
  sectionTitle: {
    ...theme.typography.h3,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  featuresContainer: {
    marginTop: theme.spacing.sm,
  },
});