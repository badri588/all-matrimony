import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS } from "../constants/colors";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import { useMatrimony } from "../context/MatrimonyContext";
import { useFocusEffect } from "@react-navigation/native";

const categories = [
  "All",
  "Function Hall",
  "Photography",
  "Cooking",
  "Makeup",
  "Decoration",
  "Arkestra",
  "Bride And Groom Car Services",
  "Cleaning",
];

export default function ServicesScreen({ navigation }) {
  const {
    services,
    loadServiceRequests,
    getLatestServiceBookingDecision,
  } = useMatrimony();
  const [category, setCategory] = useState("All");
  const [now, setNow] = useState(new Date());

  useFocusEffect(
    useCallback(() => {
      loadServiceRequests?.();
    }, [])
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const latestDecision = getLatestServiceBookingDecision?.(undefined, now);

  const filtered =
    category === "All"
      ? services
      : services.filter((item) => item.category === category);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Wedding Services"
        subtitle="Book all wedding needs"
        navigation={navigation}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryRow}
      >
        {categories.map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.chip, category === item && styles.activeChip]}
            onPress={() => setCategory(item)}
          >
            <Text
              style={[styles.chipText, category === item && styles.activeChipText]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.content}>
        {!!latestDecision && (
          <View
            style={[
              styles.statusBanner,
              latestDecision.status === "Approved"
                ? styles.approvedBanner
                : styles.rejectedBanner,
            ]}
          >
            <Text style={styles.statusTitle}>
              {latestDecision.status === "Approved"
                ? "Booking Confirmed"
                : "Booking Rejected"}
            </Text>
            <Text style={styles.statusText}>
              {latestDecision.adminMessage ||
                (latestDecision.status === "Approved"
                  ? `Your ${latestDecision.serviceTitle} booking is approved.`
                  : `Your ${latestDecision.serviceTitle} booking is rejected.`)}
              {latestDecision.bookingDate && latestDecision.bookingEndDate
                ? ` Date: ${latestDecision.bookingDate} to ${latestDecision.bookingEndDate}.`
                : ""}
            </Text>
          </View>
        )}

        {filtered.map((item) => (
          <ServiceCard
            key={item.id}
            item={item}
            onPress={() =>
              navigation.navigate("ServiceDetails", { service: item })
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  categoryRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
  },
  statusBanner: {
    marginBottom: 16,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  approvedBanner: {
    backgroundColor: COLORS.softGreen,
    borderColor: COLORS.success,
  },
  rejectedBanner: {
    backgroundColor: COLORS.softRose,
    borderColor: COLORS.danger,
  },
  statusTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "900",
  },
  statusText: {
    color: COLORS.muted,
    marginTop: 4,
    lineHeight: 19,
    fontWeight: "700",
  },
  chip: {
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    color: COLORS.text,
    fontWeight: "900",
  },
  activeChipText: {
    color: COLORS.white,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
});
