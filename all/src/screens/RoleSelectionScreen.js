import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS } from "../constants/colors";

export default function RoleSelectionScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.primaryDark, COLORS.primary, COLORS.maroon || COLORS.primaryDark]}
        style={styles.hero}
      >
        <View style={styles.logoCircle}>
          <Ionicons name="heart" size={34} color={COLORS.primary} />
        </View>

        <Text style={styles.title}>All Community Matrimony</Text>
        <Text style={styles.subtitle}>
          Choose your login type to continue
        </Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          style={styles.roleCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Login")}
        >
          <View style={[styles.iconBox, { backgroundColor: COLORS.softOrange }]}>
            <Ionicons name="people" size={32} color={COLORS.primary} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Bride / Groom Login</Text>
            <Text style={styles.cardText}>
              Search matches, send interests, use wedding services and manage profile.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={24} color={COLORS.muted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.roleCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("AdminLogin")}
        >
          <View style={[styles.iconBox, { backgroundColor: COLORS.softGreen }]}>
            <Ionicons name="shield-checkmark" size={32} color={COLORS.secondary} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Admin Login</Text>
            <Text style={styles.cardText}>
              Admin can verify bride/groom profiles, check users and manage services.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={24} color={COLORS.muted} />
        </TouchableOpacity>

        <View style={styles.noteBox}>
          <Ionicons name="information-circle-outline" size={22} color={COLORS.primary} />
          <Text style={styles.noteText}>
            Admin panel is protected with separate credentials.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  hero: {
    paddingHorizontal: 20,
    paddingTop: 34,
    paddingBottom: 36,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    alignItems: "center",
  },

  logoCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  title: {
    color: COLORS.white,
    fontSize: 27,
    fontWeight: "900",
    textAlign: "center",
  },

  subtitle: {
    color: "#FDEDD8",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
    textAlign: "center",
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  roleCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 3,
  },

  iconBox: {
    width: 62,
    height: 62,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
  },

  cardText: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: 5,
  },

  noteBox: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 10,
  },

  noteText: {
    flex: 1,
    color: COLORS.muted,
    fontWeight: "700",
    lineHeight: 19,
  },
});