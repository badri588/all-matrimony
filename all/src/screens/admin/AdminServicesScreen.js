import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import Header from "../../components/Header";
import { COLORS } from "../../constants/colors";
import { useMatrimony } from "../../context/MatrimonyContext";
import { getImageSource } from "../../utils/imageSource";

const filters = ["Pending", "Approved", "Rejected", "Catalog"];

export default function AdminServicesScreen({ navigation, route }) {
  const {
    services,
    serviceRequests = [],
    loadServiceRequests,
    updateServiceRequestStatus,
  } = useMatrimony();

  const [activeFilter, setActiveFilter] = useState("Pending");

  const focusedRequestId = route?.params?.requestId;

  useEffect(() => {
    loadServiceRequests?.();
  }, []);

  const filteredRequests = useMemo(() => {
    if (activeFilter === "Catalog") return [];
    return serviceRequests.filter((item) => item.status === activeFilter);
  }, [activeFilter, serviceRequests]);

  const counts = useMemo(
    () => ({
      Pending: serviceRequests.filter((item) => item.status === "Pending").length,
      Approved: serviceRequests.filter((item) => item.status === "Approved").length,
      Rejected: serviceRequests.filter((item) => item.status === "Rejected").length,
      Catalog: services.length,
    }),
    [serviceRequests, services]
  );

  const handleStatusChange = async (request, status) => {
    const result = await updateServiceRequestStatus(
      request.id,
      status,
      status === "Approved"
        ? `Your ${request.serviceTitle} booking request is approved. Vendor will contact you soon.`
        : `Your ${request.serviceTitle} booking request is rejected. Please contact support for details.`
    );

    if (result?.success) {
      Alert.alert(
        `Request ${status}`,
        `${request.serviceTitle} booking request marked as ${status}.`
      );
      return;
    }

    Alert.alert("Error", result?.message || "Unable to update request.");
  };

  const renderStatusBadge = (status) => {
    const badgeStyle =
      status === "Approved"
        ? styles.approvedBadge
        : status === "Rejected"
        ? styles.rejectedBadge
        : styles.pendingBadge;

    return (
      <View style={[styles.badge, badgeStyle]}>
        <Text style={styles.badgeText}>{status}</Text>
      </View>
    );
  };

  const renderRequestCard = (item) => {
    const isFocused = focusedRequestId === item.id;

    return (
      <View
        key={item.id}
        style={[styles.requestCard, isFocused && styles.focusedCard]}
      >
        <View style={styles.requestTopRow}>
          <View style={styles.serviceIcon}>
            <Ionicons name="business" size={22} color={COLORS.primary} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.requestTitle}>{item.serviceTitle}</Text>
            <Text style={styles.requestMeta}>
              {item.category || "Wedding Service"} | {item.location || "Location"}
            </Text>
          </View>

          {renderStatusBadge(item.status)}
        </View>

        <View style={styles.detailGrid}>
          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>Customer</Text>
            <Text style={styles.detailValue}>{item.userName || "User"}</Text>
          </View>

          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>Phone</Text>
            <Text style={styles.detailValue}>{item.phone || "Not added"}</Text>
          </View>

          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>Price</Text>
            <Text style={styles.detailValue}>{item.price || "Not added"}</Text>
          </View>

          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>Booking</Text>
            <Text style={styles.detailValue}>
              {item.bookingDate && item.bookingEndDate && item.bookingTime
                ? `${item.bookingDate} to ${item.bookingEndDate}, ${item.bookingTime}`
                : item.bookingDate && item.bookingTime
                ? `${item.bookingDate}, ${item.bookingTime}`
                : "Not selected"}
            </Text>
          </View>

          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>Submitted</Text>
            <Text style={styles.detailValue}>{item.submittedAt || "Now"}</Text>
          </View>
        </View>

        {!!item.adminMessage && (
          <Text style={styles.adminMessage}>{item.adminMessage}</Text>
        )}

        {(item.status === "Pending" || item.status === "Approved") && (
          <View style={styles.actionRow}>
            {item.status === "Pending" && (
              <TouchableOpacity
                style={[styles.actionBtn, styles.approveBtn]}
                activeOpacity={0.85}
                onPress={() => handleStatusChange(item, "Approved")}
              >
                <Ionicons name="checkmark-circle" size={18} color={COLORS.white} />
                <Text style={styles.actionBtnText}>Approve</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.actionBtn, styles.rejectBtn]}
              activeOpacity={0.85}
              onPress={() => handleStatusChange(item, "Rejected")}
            >
              <Ionicons name="close-circle" size={18} color={COLORS.white} />
              <Text style={styles.actionBtnText}>Reject</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderCatalogCard = (item) => (
    <View key={item.id} style={styles.catalogCard}>
      <Image source={getImageSource(item.image)} style={styles.image} />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.meta}>{item.category}</Text>
        <Text style={styles.meta}>
          {item.location} | {item.price}
        </Text>
        <Text style={styles.rating}>Rating {item.rating}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Service Approvals"
        subtitle="Approve wedding service booking requests"
        navigation={navigation}
        showNotification={false}
        backTo="AdminDashboard"
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Booking Request Queue</Text>
          <Text style={styles.summaryText}>
            User registration plus booking requests will appear here for admin
            approval.
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {filters.map((item) => (
            <TouchableOpacity
              key={item}
              activeOpacity={0.85}
              style={[
                styles.filterChip,
                activeFilter === item && styles.activeFilterChip,
              ]}
              onPress={() => setActiveFilter(item)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === item && styles.activeFilterText,
                ]}
              >
                {item} ({counts[item] || 0})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {activeFilter === "Catalog" ? (
          services.map(renderCatalogCard)
        ) : filteredRequests.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="clipboard-outline" size={46} color={COLORS.muted} />
            <Text style={styles.emptyTitle}>No {activeFilter} Requests</Text>
            <Text style={styles.emptyText}>
              When users book function halls, cooking, cars or other services,
              requests will show here.
            </Text>
          </View>
        ) : (
          filteredRequests.map(renderRequestCard)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 100 },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },
  summaryTitle: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: "900",
  },
  summaryText: {
    color: COLORS.muted,
    marginTop: 6,
    fontWeight: "700",
    lineHeight: 20,
  },
  filterRow: {
    gap: 10,
    paddingBottom: 14,
  },
  filterChip: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: "center",
  },
  activeFilterChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.text,
    fontWeight: "900",
  },
  activeFilterText: {
    color: COLORS.white,
  },
  requestCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },
  focusedCard: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  requestTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  serviceIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.softOrange,
    alignItems: "center",
    justifyContent: "center",
  },
  requestTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "900",
  },
  requestMeta: {
    color: COLORS.muted,
    marginTop: 3,
    fontWeight: "700",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  pendingBadge: {
    backgroundColor: COLORS.goldLight,
  },
  approvedBadge: {
    backgroundColor: COLORS.softGreen,
  },
  rejectedBadge: {
    backgroundColor: COLORS.softRose,
  },
  badgeText: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "900",
  },
  detailGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
  },
  detailBox: {
    width: "47%",
    backgroundColor: COLORS.bg,
    borderRadius: 14,
    padding: 10,
  },
  detailLabel: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  detailValue: {
    color: COLORS.text,
    marginTop: 4,
    fontWeight: "900",
  },
  adminMessage: {
    color: COLORS.muted,
    marginTop: 12,
    fontWeight: "700",
    lineHeight: 19,
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  actionBtn: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  approveBtn: {
    backgroundColor: COLORS.success,
  },
  rejectBtn: {
    backgroundColor: COLORS.danger,
  },
  actionBtnText: {
    color: COLORS.white,
    fontWeight: "900",
  },
  emptyCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  emptyTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 10,
  },
  emptyText: {
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 7,
    lineHeight: 20,
    fontWeight: "700",
  },
  catalogCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    gap: 12,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: COLORS.border,
  },
  name: { color: COLORS.text, fontSize: 17, fontWeight: "900" },
  meta: { color: COLORS.muted, marginTop: 4, fontWeight: "700" },
  rating: { color: COLORS.gold, marginTop: 4, fontWeight: "900" },
});
