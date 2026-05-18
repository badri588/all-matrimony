import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { getImageSource } from "../utils/imageSource";

export default function ProfileCard({ item, onPress, onWishlist }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={getImageSource(item.image)} style={styles.image} />

      <View style={styles.info}>
        <View style={styles.topRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>
              {item.age} yrs • {item.height} • {item.gender}
            </Text>
          </View>

          <TouchableOpacity style={styles.heartBtn} onPress={onWishlist}>
            <Ionicons name="heart-outline" size={22} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.detail}>{item.community} • {item.location}</Text>
        <Text style={styles.detail}>{item.education} • {item.job}</Text>
        <Text style={styles.income}>{item.income}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 3,
  },
  image: {
    height: 210,
    width: "100%",
  },
  info: {
    padding: 14,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 19,
    fontWeight: "900",
    color: COLORS.text,
  },
  meta: {
    color: COLORS.muted,
    marginTop: 3,
    fontWeight: "600",
  },
  detail: {
    color: COLORS.text,
    marginTop: 7,
    fontWeight: "600",
  },
  income: {
    color: COLORS.secondary,
    marginTop: 8,
    fontWeight: "900",
  },
  heartBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.softOrange,
    alignItems: "center",
    justifyContent: "center",
  },
});
