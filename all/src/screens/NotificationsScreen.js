import React from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";
import Header from "../components/Header";
import { useMatrimony } from "../context/MatrimonyContext";

export default function NotificationsScreen({ navigation }) {
  const { getUserNotifications, markNotificationRead } = useMatrimony();

  const userNotifications = getUserNotifications ? getUserNotifications() : [];

  const getIconName = (type) => {
    if (type === "PROFILE_APPROVED") return "checkmark-circle";
    if (type === "PROFILE_REJECTED") return "close-circle";
    if (type === "PROFILE_SUBMITTED") return "time";
    if (type === "PROFILE_APPROVAL_PENDING") return "hourglass";
    if (type === "SERVICE_BOOKING_APPROVED") return "checkmark-circle";
    if (type === "SERVICE_BOOKING_CONFIRMED") return "checkmark-circle";
    if (type === "SERVICE_BOOKING_REJECTED") return "close-circle";
    if (type === "SERVICE_REQUEST_SENT") return "briefcase";
    return "notifications";
  };

  const getIconColor = (type) => {
    if (type === "PROFILE_APPROVED") return COLORS.success || "#16A34A";
    if (type === "PROFILE_REJECTED") return COLORS.danger || "#DC2626";
    if (type === "PROFILE_SUBMITTED") return COLORS.warning || "#F59E0B";
    if (type === "SERVICE_BOOKING_APPROVED") return COLORS.success || "#16A34A";
    if (type === "SERVICE_BOOKING_CONFIRMED") return COLORS.success || "#16A34A";
    if (type === "SERVICE_BOOKING_REJECTED") return COLORS.danger || "#DC2626";
    if (type === "SERVICE_REQUEST_SENT") return COLORS.warning || "#F59E0B";
    return COLORS.primary;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Notifications"
        subtitle="Admin approval and service booking updates"
        navigation={navigation}
        showBack={true}
        showNotification={false}
        backTo="MainTabs"
      />

      <ScrollView contentContainerStyle={styles.content}>
        {userNotifications.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons
              name="notifications-off-outline"
              size={42}
              color={COLORS.muted}
            />
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptyText}>
              Mee profile admin approval ki submit chesthe updates ikkada
              kanipistayi.
            </Text>
          </View>
        ) : (
          userNotifications.map((item) => (
            <View
              key={item.id}
              style={[styles.card, !item.read && styles.unreadCard]}
            >
              <View
                style={[
                  styles.icon,
                  { backgroundColor: COLORS.softOrange || "#FFF1E8" },
                ]}
              >
                <Ionicons
                  name={getIconName(item.type)}
                  size={22}
                  color={getIconColor(item.type)}
                />
              </View>

              <View style={{ flex: 1 }}>
                <View style={styles.titleRow}>
                  <Text style={styles.title}>{item.title}</Text>

                  {!item.read && (
                    <View style={styles.newBadge}>
                      <Text style={styles.newBadgeText}>NEW</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.message}>{item.message}</Text>

                <Text style={styles.time}>
                  {item.time ||
                    (item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : "Now")}
                </Text>

                {!item.read && (
                  <TouchableOpacity
                    style={styles.markBtn}
                    activeOpacity={0.85}
                    onPress={() => markNotificationRead(item.id)}
                  >
                    <Text style={styles.markBtnText}>Mark as Read</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  emptyCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },

  emptyTitle: {
    color: COLORS.text,
    fontWeight: "900",
    fontSize: 18,
    marginTop: 10,
  },

  emptyText: {
    color: COLORS.muted,
    marginTop: 6,
    textAlign: "center",
    fontWeight: "700",
    lineHeight: 20,
  },

  card: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  unreadCard: {
    borderColor: COLORS.primary,
  },

  icon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  title: {
    flex: 1,
    color: COLORS.text,
    fontWeight: "900",
    fontSize: 16,
  },

  newBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },

  newBadgeText: {
    color: COLORS.white,
    fontWeight: "900",
    fontSize: 10,
  },

  message: {
    color: COLORS.muted,
    marginTop: 4,
    fontWeight: "600",
    lineHeight: 19,
  },

  time: {
    color: COLORS.primary,
    marginTop: 6,
    fontWeight: "900",
    fontSize: 12,
  },

  markBtn: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: COLORS.softOrange,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
  },

  markBtnText: {
    color: COLORS.primary,
    fontWeight: "900",
    fontSize: 12,
  },
});
