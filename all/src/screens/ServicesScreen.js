import React, { useState } from "react";
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

const categories = [
  "All",
  "Wedding Hall",
  "Photography",
  "Catering",
  "Makeup",
  "Decoration",
];

export default function ServicesScreen({ navigation }) {
  const { services } = useMatrimony();
  const [category, setCategory] = useState("All");

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