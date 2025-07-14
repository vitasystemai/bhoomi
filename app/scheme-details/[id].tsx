import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { theme, globalStyles } from "@/constants/theme";
import { schemes } from "@/mocks/schemes";
import { CheckCircle, ExternalLink } from "lucide-react-native";

export default function SchemeDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const scheme = schemes.find((s) => s.id === id);

  if (!scheme) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <View style={[globalStyles.container, globalStyles.center]}>
          <Text style={theme.typography.h3}>Scheme not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleOpenWebsite = () => {
    if (scheme.website) {
      Linking.openURL(scheme.website);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container} edges={["bottom"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.agency}>{scheme.agency}</Text>
          <Text style={styles.title}>{scheme.title}</Text>
          <Text style={styles.description}>{scheme.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Eligibility</Text>
          <Text style={styles.sectionText}>{scheme.eligibility}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Benefits</Text>
          <Text style={styles.sectionText}>{scheme.benefits}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Application Process</Text>
          <Text style={styles.sectionText}>{scheme.applicationProcess}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Required Documents</Text>
          <View style={styles.documentsList}>
            {scheme.documents.map((document, index) => (
              <View key={index} style={styles.documentItem}>
                <CheckCircle size={18} color={theme.colors.success} />
                <Text style={styles.documentText}>{document}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deadline</Text>
          <Text style={styles.sectionText}>{scheme.deadline}</Text>
        </View>

        <TouchableOpacity
          style={styles.websiteButton}
          onPress={handleOpenWebsite}
        >
          <Text style={styles.websiteButtonText}>Visit Official Website</Text>
          <ExternalLink size={18} color="white" />
        </TouchableOpacity>
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
  header: {
    backgroundColor: theme.colors.primary + "15",
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  agency: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  title: {
    ...theme.typography.h2,
    marginBottom: theme.spacing.sm,
  },
  description: {
    ...theme.typography.body,
    lineHeight: 22,
  },
  section: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  sectionTitle: {
    ...theme.typography.h4,
    marginBottom: theme.spacing.sm,
  },
  sectionText: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    lineHeight: 22,
  },
  documentsList: {
    marginTop: theme.spacing.sm,
  },
  documentItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  documentText: {
    ...theme.typography.body,
    marginLeft: theme.spacing.sm,
  },
  websiteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  websiteButtonText: {
    color: "white",
    fontWeight: "600",
    marginRight: theme.spacing.sm,
  },
});