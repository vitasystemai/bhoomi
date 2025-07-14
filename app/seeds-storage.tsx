import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme, globalStyles } from "@/constants/theme";
import StorageFacilityCard from "@/components/StorageFacilityCard";
import DualStorageFacilityCard from "@/components/DualStorageFacilityCard";
import SeedBuyerCard from "@/components/SeedBuyerCard";
import { coldStorageFacilities, dualStorageFacilities } from "@/mocks/storage-facilities";
import { seedBuyers } from "@/mocks/seed-buyers";
import { Snowflake, ThermometerSun, ShoppingBag, AlertCircle, Warehouse } from "lucide-react-native";

export default function SeedsStorageScreen() {
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  const [selectedBuyer, setSelectedBuyer] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeStorageType, setActiveStorageType] = useState<string | null>(null);

  const handleFacilityPress = (id: string) => {
    setSelectedFacility(id);
    // In a real app, you would navigate to a detailed view or show a modal
    console.log("Selected facility:", id);
  };

  const handleBuyerPress = (id: string) => {
    setSelectedBuyer(id);
    // In a real app, you would navigate to a detailed view or show a modal
    console.log("Selected buyer:", id);
  };

  const handleSectionPress = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
      setActiveStorageType(null);
    } else {
      setActiveSection(section);
      setActiveStorageType(section === "storage" ? null : null);
    }
  };

  const handleStorageTypePress = (type: string) => {
    setActiveStorageType(type);
  };

  return (
    <SafeAreaView style={globalStyles.container} edges={["bottom"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Seeds Storage Solutions</Text>
          <Text style={styles.subtitle}>
            Find storage facilities and seed buyers for your harvest
          </Text>
        </View>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              activeSection === "storage" && styles.activeActionButton,
            ]}
            onPress={() => handleSectionPress("storage")}
          >
            <Warehouse size={24} color={activeSection === "storage" ? "white" : theme.colors.primary} />
            <Text style={[styles.actionButtonText, activeSection === "storage" && styles.activeActionButtonText]}>
              Storage Facilities
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              activeSection === "buyers" && styles.activeActionButton,
            ]}
            onPress={() => handleSectionPress("buyers")}
          >
            <ShoppingBag size={24} color={activeSection === "buyers" ? "white" : theme.colors.sunYellow} />
            <Text style={[styles.actionButtonText, activeSection === "buyers" && styles.activeActionButtonText]}>
              Seeds Buyers
            </Text>
          </TouchableOpacity>
        </View>

        {activeSection === "storage" && (
          <View style={styles.storageTypesContainer}>
            <TouchableOpacity
              style={[
                styles.storageTypeButton,
                activeStorageType === "cold" && styles.activeStorageTypeButton,
              ]}
              onPress={() => handleStorageTypePress("cold")}
            >
              <Snowflake size={20} color={activeStorageType === "cold" ? "white" : theme.colors.primary} />
              <Text style={[styles.storageTypeText, activeStorageType === "cold" && styles.activeStorageTypeText]}>
                Cold Storage
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.storageTypeButton,
                activeStorageType === "dual" && styles.activeStorageTypeButton,
                { backgroundColor: activeStorageType === "dual" ? theme.colors.leafGreen : theme.colors.leafGreen + "15" }
              ]}
              onPress={() => handleStorageTypePress("dual")}
            >
              <ThermometerSun size={20} color={activeStorageType === "dual" ? "white" : theme.colors.leafGreen} />
              <Text style={[styles.storageTypeText, activeStorageType === "dual" && styles.activeStorageTypeText]}>
                Cold & Warm Storage
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {activeSection === "storage" && activeStorageType === "cold" && (
          <View style={styles.facilitiesContainer}>
            <Text style={styles.sectionDescription}>
              Facilities that provide temperature-controlled storage specifically for seeds,
              maintaining optimal conditions for seed viability.
            </Text>
            
            {coldStorageFacilities.map((facility) => (
              <StorageFacilityCard
                key={facility.id}
                name={facility.name}
                type={facility.type}
                address={facility.address}
                contact={facility.contact}
                capacity={facility.capacity}
                temperature={facility.temperature}
                services={facility.services}
                cost={facility.costPerMonth}
                onPress={() => handleFacilityPress(facility.id)}
              />
            ))}
          </View>
        )}

        {activeSection === "storage" && activeStorageType === "dual" && (
          <View style={styles.facilitiesContainer}>
            <Text style={styles.sectionDescription}>
              Dual-purpose facilities offering both cold and warm storage options for different
              seed varieties and storage requirements.
            </Text>
            
            {dualStorageFacilities.map((facility) => (
              <DualStorageFacilityCard
                key={facility.id}
                name={facility.name}
                type={facility.type}
                address={facility.address}
                contact={facility.contact}
                coldCapacity={facility.coldCapacity}
                warmCapacity={facility.warmCapacity}
                coldTemperature={facility.coldTemperature}
                warmTemperature={facility.warmTemperature}
                services={facility.services}
                coldCost={facility.costPerMonth.cold}
                warmCost={facility.costPerMonth.warm}
                onPress={() => handleFacilityPress(facility.id)}
              />
            ))}
          </View>
        )}

        {activeSection === "buyers" && (
          <View style={styles.buyersContainer}>
            <Text style={styles.sectionDescription}>
              Connect with organizations and businesses that purchase seeds directly from farmers,
              offering competitive prices for quality seeds.
            </Text>
            
            {seedBuyers.map((buyer) => (
              <SeedBuyerCard
                key={buyer.id}
                name={buyer.name}
                type={buyer.type}
                address={buyer.address}
                contact={buyer.contact}
                seedTypes={buyer.seedTypes}
                paymentTerms={buyer.paymentTerms}
                certificationRequired={buyer.certificationRequired}
                onPress={() => handleBuyerPress(buyer.id)}
              />
            ))}
          </View>
        )}

        {!activeSection && (
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <AlertCircle size={20} color={theme.colors.primary} />
              <Text style={styles.infoTitle}>Seed Storage Tips</Text>
            </View>
            <Text style={styles.infoText}>
              • Ensure seeds are properly dried before storage (moisture content below 12%)
            </Text>
            <Text style={styles.infoText}>
              • Store in airtight containers to prevent moisture absorption
            </Text>
            <Text style={styles.infoText}>
              • Maintain consistent temperature in cold storage (2-4°C is ideal)
            </Text>
            <Text style={styles.infoText}>
              • Label all seed containers with variety and harvest date
            </Text>
            <Text style={styles.infoText}>
              • Periodically check for pest infestation or quality deterioration
            </Text>
          </View>
        )}
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
    marginBottom: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h2,
  },
  subtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.textLight,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.xs,
    ...theme.shadows.small,
  },
  activeActionButton: {
    backgroundColor: theme.colors.primary,
  },
  actionButtonText: {
    ...theme.typography.body,
    fontWeight: "600",
    marginLeft: theme.spacing.sm,
  },
  activeActionButtonText: {
    color: "white",
  },
  storageTypesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },
  storageTypeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary + "15",
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.sm,
    marginHorizontal: theme.spacing.xs,
  },
  activeStorageTypeButton: {
    backgroundColor: theme.colors.primary,
  },
  storageTypeText: {
    ...theme.typography.bodySmall,
    fontWeight: "600",
    marginLeft: theme.spacing.sm,
  },
  activeStorageTypeText: {
    color: "white",
  },
  facilitiesContainer: {
    marginBottom: theme.spacing.lg,
  },
  buyersContainer: {
    marginBottom: theme.spacing.lg,
  },
  sectionDescription: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.md,
  },
  infoCard: {
    backgroundColor: theme.colors.primary + "15",
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  infoTitle: {
    ...theme.typography.h4,
    marginLeft: theme.spacing.sm,
  },
  infoText: {
    ...theme.typography.body,
    marginBottom: 6,
  },
});