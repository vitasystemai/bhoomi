import React, { useState } from "react";
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView } from "react-native";
import { theme, globalStyles } from "@/constants/theme";
import { Bell, Globe, Moon, HelpCircle, LogOut, ChevronRight } from "lucide-react-native";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const languages = [
    { id: "en", name: "English" },
    { id: "hi", name: "हिंदी (Hindi)" },
    { id: "kn", name: "ಕನ್ನಡ (Kannada)" },
    { id: "ta", name: "தமிழ் (Tamil)" },
    { id: "te", name: "తెలుగు (Telugu)" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  return (
    <ScrollView style={globalStyles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Bell size={22} color={theme.colors.text} />
            <Text style={styles.settingText}>Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: "#767577", true: theme.colors.primary + "80" }}
            thumbColor={notifications ? theme.colors.primary : "#f4f3f4"}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Moon size={22} color={theme.colors.text} />
            <Text style={styles.settingText}>Dark Mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: "#767577", true: theme.colors.primary + "80" }}
            thumbColor={darkMode ? theme.colors.primary : "#f4f3f4"}
          />
        </View>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Globe size={22} color={theme.colors.text} />
            <View>
              <Text style={styles.settingText}>Language</Text>
              <Text style={styles.settingSubtext}>{selectedLanguage.name}</Text>
            </View>
          </View>
          <ChevronRight size={20} color={theme.colors.textLight} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <HelpCircle size={22} color={theme.colors.text} />
            <Text style={styles.settingText}>Help & Support</Text>
          </View>
          <ChevronRight size={20} color={theme.colors.textLight} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingText}>Privacy Policy</Text>
          </View>
          <ChevronRight size={20} color={theme.colors.textLight} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingText}>Terms of Service</Text>
          </View>
          <ChevronRight size={20} color={theme.colors.textLight} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <LogOut size={20} color={theme.colors.error} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: theme.spacing.xxl,
  },
  section: {
    margin: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    overflow: "hidden",
    ...theme.shadows.small,
  },
  sectionTitle: {
    ...theme.typography.h4,
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingText: {
    ...theme.typography.body,
    marginLeft: theme.spacing.md,
  },
  settingSubtext: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
    marginLeft: theme.spacing.md,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: "#FEE2E2",
    borderRadius: theme.borderRadius.md,
  },
  logoutText: {
    color: theme.colors.error,
    fontWeight: "600",
    marginLeft: theme.spacing.sm,
  },
  versionText: {
    ...theme.typography.caption,
    textAlign: "center",
    color: theme.colors.textLight,
    marginTop: theme.spacing.md,
  },
});