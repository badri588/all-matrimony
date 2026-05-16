import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";
import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import { useMatrimony } from "../context/MatrimonyContext";

const defaultFilters = {
  gender: "All",
  minAge: "",
  maxAge: "",
  community: "",
  location: "",
  education: "",
  job: "",
};

export default function MatchesScreen({ navigation, route }) {
  const { profiles, addToWishlist } = useMatrimony();
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    if (route?.params?.filters) {
      setFilters(route.params.filters);
    }
  }, [route?.params?.filters]);

  const filteredProfiles = useMemo(() => {
    return profiles.filter((item) => {
      const age = Number(item.age);

      const genderMatch =
        filters.gender === "All" || item.gender === filters.gender;

      const minAgeMatch =
        !filters.minAge || age >= Number(filters.minAge);

      const maxAgeMatch =
        !filters.maxAge || age <= Number(filters.maxAge);

      const communityMatch =
        !filters.community ||
        String(item.community || "")
          .toLowerCase()
          .includes(filters.community.toLowerCase()) ||
        String(item.religion || "")
          .toLowerCase()
          .includes(filters.community.toLowerCase());

      const locationMatch =
        !filters.location ||
        String(item.location || "")
          .toLowerCase()
          .includes(filters.location.toLowerCase());

      const educationMatch =
        !filters.education ||
        String(item.education || "")
          .toLowerCase()
          .includes(filters.education.toLowerCase());

      const jobMatch =
        !filters.job ||
        String(item.job || "")
          .toLowerCase()
          .includes(filters.job.toLowerCase());

      return (
        genderMatch &&
        minAgeMatch &&
        maxAgeMatch &&
        communityMatch &&
        locationMatch &&
        educationMatch &&
        jobMatch
      );
    });
  }, [profiles, filters]);

  const hasActiveFilters =
    filters.gender !== "All" ||
    filters.minAge ||
    filters.maxAge ||
    filters.community ||
    filters.location ||
    filters.education ||
    filters.job;

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Matches"
        subtitle="Search bride & groom profiles"
        navigation={navigation}
      />

      <View style={styles.topCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.resultTitle}>
            {filteredProfiles.length} Profiles Found
          </Text>

          <Text style={styles.resultSub}>
            Use advanced filters to find suitable matches.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => navigation.navigate("SearchFilter", { filters })}
        >
          <Ionicons name="options-outline" size={20} color={COLORS.white} />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {hasActiveFilters && (
        <View style={styles.activeFilterBox}>
          <View style={{ flex: 1 }}>
            <Text style={styles.activeTitle}>Filters Applied</Text>
            <Text style={styles.activeText}>
              {filters.gender !== "All" ? `${filters.gender} • ` : ""}
              {filters.minAge || filters.maxAge
                ? `${filters.minAge || "18"}-${filters.maxAge || "60"} yrs • `
                : ""}
              {filters.community ? `${filters.community} • ` : ""}
              {filters.location ? `${filters.location}` : ""}
            </Text>
          </View>

          <TouchableOpacity style={styles.clearBtn} onPress={clearFilters}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.content}>
        {filteredProfiles.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="search-outline" size={64} color={COLORS.muted} />
            <Text style={styles.emptyTitle}>No Profiles Found</Text>
            <Text style={styles.emptyText}>
              Try changing age, community, location or education filters.
            </Text>

            <TouchableOpacity style={styles.emptyBtn} onPress={clearFilters}>
              <Text style={styles.emptyBtnText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredProfiles.map((item) => (
            <ProfileCard
              key={item.id}
              item={item}
              onPress={() =>
                navigation.navigate("ProfileDetails", { profile: item })
              }
              onWishlist={() => addToWishlist(item)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  topCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },

  resultTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
  },

  resultSub: {
    color: COLORS.muted,
    marginTop: 4,
    fontWeight: "600",
    fontSize: 12,
  },

  filterBtn: {
    height: 44,
    paddingHorizontal: 14,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  filterText: {
    color: COLORS.white,
    fontWeight: "900",
  },

  activeFilterBox: {
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: COLORS.softOrange,
    borderRadius: 18,
    padding: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  activeTitle: {
    color: COLORS.primary,
    fontWeight: "900",
  },

  activeText: {
    color: COLORS.text,
    marginTop: 3,
    fontWeight: "600",
    fontSize: 12,
  },

  clearBtn: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  clearText: {
    color: COLORS.primary,
    fontWeight: "900",
  },

  content: {
    padding: 16,
    paddingBottom: 100,
  },

  emptyBox: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
    marginTop: 40,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  emptyTitle: {
    color: COLORS.text,
    fontSize: 21,
    fontWeight: "900",
    marginTop: 12,
  },

  emptyText: {
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 7,
    lineHeight: 21,
    fontWeight: "600",
  },

  emptyBtn: {
    marginTop: 18,
    height: 44,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyBtnText: {
    color: COLORS.white,
    fontWeight: "900",
  },
});