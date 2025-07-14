import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme, globalStyles } from "@/constants/theme";
import WeatherCard from "@/components/WeatherCard";
import { weatherData } from "@/mocks/weather";
import { Cloud, Droplets, Sun, AlertTriangle } from "lucide-react-native";

export default function WeatherScreen() {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun size={20} color={theme.colors.sunYellow} />;
      case "cloudy":
        return <Cloud size={20} color={theme.colors.primary} />;
      case "rainy":
        return <Droplets size={20} color={theme.colors.primary} />;
      default:
        return <Sun size={20} color={theme.colors.sunYellow} />;
    }
  };

  return (
    <SafeAreaView style={globalStyles.container} edges={["bottom"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <WeatherCard
          temperature={weatherData.current.temperature}
          condition={weatherData.current.condition}
          humidity={weatherData.current.humidity}
          windSpeed={weatherData.current.windSpeed}
          location={weatherData.current.location}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5-Day Forecast</Text>
          <View style={styles.forecastContainer}>
            {weatherData.forecast.map((day, index) => (
              <View key={index} style={styles.forecastItem}>
                <Text style={styles.forecastDay}>{day.day}</Text>
                {getWeatherIcon(day.condition)}
                <Text style={styles.forecastTemp}>{day.temperature}°C</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Agricultural Tips</Text>
          <View style={styles.tipsContainer}>
            {weatherData.agriculturalTips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <AlertTriangle size={18} color={theme.colors.primary} />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weather Impact on Crops</Text>
          <View style={styles.impactCard}>
            <Text style={styles.impactTitle}>Rice</Text>
            <Text style={styles.impactDescription}>
              Current conditions are favorable for rice cultivation. Maintain
              proper water levels in paddy fields.
            </Text>
          </View>
          <View style={styles.impactCard}>
            <Text style={styles.impactTitle}>Wheat</Text>
            <Text style={styles.impactDescription}>
              Monitor soil moisture levels. Consider irrigation if rainfall is
              insufficient.
            </Text>
          </View>
          <View style={styles.impactCard}>
            <Text style={styles.impactTitle}>Vegetables</Text>
            <Text style={styles.impactDescription}>
              Protect from direct sunlight during peak hours. Ensure regular
              watering.
            </Text>
          </View>
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
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
  },
  section: {
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.md,
  },
  forecastContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  forecastItem: {
    alignItems: "center",
  },
  forecastDay: {
    ...theme.typography.bodySmall,
    marginBottom: 8,
  },
  forecastTemp: {
    ...theme.typography.body,
    fontWeight: "600",
    marginTop: 8,
  },
  tipsContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  tipText: {
    ...theme.typography.body,
    marginLeft: theme.spacing.sm,
  },
  impactCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  impactTitle: {
    ...theme.typography.h4,
    marginBottom: 8,
  },
  impactDescription: {
    ...theme.typography.body,
    color: theme.colors.textLight,
  },
});