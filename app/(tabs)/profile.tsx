import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { theme, globalStyles } from "@/constants/theme";
import { User, MapPin, Phone, Calendar, ChevronRight } from "lucide-react-native";

export default function ProfileScreen() {
  // Mock user data
  const userData = {
    name: "Rajesh Kumar",
    location: "Bangalore, Karnataka",
    phone: "+91 9876543210",
    memberSince: "June 2023",
  };

  // Mock recent activity
  const recentActivity = [
    { id: "1", type: "search", title: "Searched for rice cultivation", date: "Today, 10:30 AM" },
    { id: "2", type: "chat", title: "Chat with BHOOMI AI", date: "Yesterday, 2:15 PM" },
    { id: "3", type: "view", title: "Viewed market prices", date: "Yesterday, 11:45 AM" },
    { id: "4", type: "search", title: "Searched for wheat seeds", date: "3 days ago" },
  ];

  return (
    <ScrollView style={globalStyles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{userData.name.charAt(0)}</Text>
        </View>
        <Text style={styles.userName}>{userData.name}</Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoItem}>
          <MapPin size={20} color={theme.colors.primary} />
          <Text style={styles.infoText}>{userData.location}</Text>
        </View>
        <View style={styles.infoItem}>
          <Phone size={20} color={theme.colors.primary} />
          <Text style={styles.infoText}>{userData.phone}</Text>
        </View>
        <View style={styles.infoItem}>
          <Calendar size={20} color={theme.colors.primary} />
          <Text style={styles.infoText}>Member since {userData.memberSince}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {recentActivity.map((activity) => (
          <TouchableOpacity key={activity.id} style={styles.activityItem}>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activityDate}>{activity.date}</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.textLight} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Crops</Text>
        <TouchableOpacity style={styles.addCropButton}>
          <Text style={styles.addCropText}>+ Add a crop to track</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.editProfileButton}>
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: theme.spacing.xxl,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: theme.spacing.xl,
    backgroundColor: theme.colors.primary,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  infoCard: {
    margin: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.small,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    ...theme.typography.body,
    marginLeft: theme.spacing.sm,
  },
  section: {
    margin: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.md,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    ...theme.typography.body,
    marginBottom: 4,
  },
  activityDate: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
  },
  addCropButton: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.colors.primary,
    alignItems: "center",
  },
  addCropText: {
    color: theme.colors.primary,
    fontWeight: "500",
  },
  editProfileButton: {
    margin: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
  },
  editProfileText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});