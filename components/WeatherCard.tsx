import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/constants/theme";
import { Cloud, Droplets, Sun, Thermometer, Wind } from "lucide-react-native";

interface WeatherCardProps {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
}

export default function WeatherCard({
  temperature,
  condition,
  humidity,
  windSpeed,
  location,
}: WeatherCardProps) {
  const getWeatherIcon = () => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun size={32} color={theme.colors.sunYellow} />;
      case "cloudy":
        return <Cloud size={32} color={theme.colors.primary} />;
      case "rainy":
        return <Droplets size={32} color={theme.colors.primary} />;
      default:
        return <Sun size={32} color={theme.colors.sunYellow} />;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.condition}>{condition}</Text>
      </View>

      <View style={styles.mainInfo}>
        {getWeatherIcon()}
        <Text style={styles.temperature}>{temperature}°C</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Droplets size={18} color={theme.colors.primary} />
          <Text style={styles.detailText}>Humidity: {humidity}%</Text>
        </View>
        <View style={styles.detailItem}>
          <Wind size={18} color={theme.colors.primary} />
          <Text style={styles.detailText}>Wind: {windSpeed} km/h</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.medium,
  },
  header: {
    marginBottom: theme.spacing.md,
  },
  location: {
    ...theme.typography.h3,
    marginBottom: 4,
  },
  condition: {
    ...theme.typography.bodySmall,
    color: theme.colors.textLight,
  },
  mainInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  temperature: {
    ...theme.typography.h1,
    marginLeft: theme.spacing.md,
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.md,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    ...theme.typography.body,
    marginLeft: 8,
  },
});