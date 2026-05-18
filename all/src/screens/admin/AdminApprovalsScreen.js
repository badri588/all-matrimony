import React from "react";
import {
  Alert,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS } from "../../constants/colors";
import { useMatrimony } from "../../context/MatrimonyContext";
import { getImageSource } from "../../utils/imageSource";

export default function AdminApprovalsScreen({ route }) {
  const selectedRequestId = route?.params?.requestId || null;

  const {
    approvalRequests = [],
    approveProfile,
    rejectProfile,
    getPendingApprovalRequests,
  } = useMatrimony();

  const pendingRequests = getPendingApprovalRequests
    ? getPendingApprovalRequests()
    : approvalRequests.filter((item) => item.status === "Pending");

  const sortedRequests = selectedRequestId
    ? [...pendingRequests].sort((a, b) => {
        if (a.id === selectedRequestId) return -1;
        if (b.id === selectedRequestId) return 1;
        return 0;
      })
    : pendingRequests;

  const handleApprove = (request) => {
    const result = approveProfile(
      request.id,
      "Congratulations! Mee profile admin approve chesaru."
    );

    if (result?.success) {
      Alert.alert(
        "Approved",
        `${request.profileName} profile approved. User ki notification vellindi.`
      );
    }
  };

  const handleReject = (request) => {
    const result = rejectProfile(
      request.id,
      "Mee profile admin reject chesaru. Please details correct chesi malli submit cheyyandi."
    );

    if (result?.success) {
      Alert.alert(
        "Rejected",
        `${request.profileName} profile rejected. User ki notification vellindi.`
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.primaryDark, COLORS.primary]}
        style={styles.header}
      >
        <View style={styles.headerIcon}>
          <Ionicons name="checkmark-circle" size={28} color={COLORS.primary} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Profile Approvals</Text>
          <Text style={styles.headerSubtitle}>
            User submit chesina profiles approve/reject cheyyandi
          </Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {sortedRequests.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons
              name="checkmark-done-circle-outline"
              size={50}
              color={COLORS.primary}
            />

            <Text style={styles.emptyTitle}>No Pending Requests</Text>

            <Text style={styles.emptyText}>
              User profile save/submit chesthe admin approval request ikkada
              kanipistundi.
            </Text>
          </View>
        ) : (
          sortedRequests.map((request) => {
            const isSelected = selectedRequestId === request.id;

            return (
              <View
                key={request.id}
                style={[styles.card, isSelected && styles.selectedCard]}
              >
                {isSelected && (
                  <View style={styles.selectedBadge}>
                    <Ionicons
                      name="notifications"
                      size={14}
                      color={COLORS.white}
                    />
                    <Text style={styles.selectedBadgeText}>
                      Opened from Notification
                    </Text>
                  </View>
                )}

                <View style={styles.profileRow}>
                  <Image source={getImageSource(request.image)} style={styles.avatar} />

                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{request.profileName}</Text>

                    <Text style={styles.subText}>
                      {request.gender} • {request.age || "Age N/A"}
                    </Text>

                    <Text style={styles.statusText}>{request.status}</Text>
                  </View>
                </View>

                <View style={styles.infoBox}>
                  <InfoRow icon="call" label="Phone" value={request.phone} />
                  <InfoRow icon="mail" label="Email" value={request.email} />
                  <InfoRow
                    icon="location"
                    label="Location"
                    value={request.location}
                  />
                  <InfoRow
                    icon="school"
                    label="Education"
                    value={request.education}
                  />
                  <InfoRow icon="briefcase" label="Job" value={request.job} />
                  <InfoRow
                    icon="people"
                    label="Community"
                    value={request.community}
                  />
                </View>

                <Text style={styles.submittedText}>
                  Submitted: {request.submittedAt || "Now"}
                </Text>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.approveBtn}
                    activeOpacity={0.85}
                    onPress={() => handleApprove(request)}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color={COLORS.white}
                    />
                    <Text style={styles.btnText}>Approve</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.rejectBtn}
                    activeOpacity={0.85}
                    onPress={() => handleReject(request)}
                  >
                    <Ionicons
                      name="close-circle"
                      size={18}
                      color={COLORS.white}
                    />
                    <Text style={styles.btnText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={`${icon}-outline`} size={17} color={COLORS.primary} />
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={styles.infoValue}>{value || "N/A"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 22,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  headerIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    color: COLORS.white,
    fontSize: 23,
    fontWeight: "900",
  },

  headerSubtitle: {
    color: "#FDEDD8",
    marginTop: 3,
    fontWeight: "700",
    fontSize: 13,
  },

  content: {
    padding: 16,
    paddingBottom: 120,
  },

  emptyCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },

  emptyTitle: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: "900",
    marginTop: 10,
  },

  emptyText: {
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
    fontWeight: "700",
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 3,
  },

  selectedCard: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },

  selectedBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 12,
  },

  selectedBadgeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "900",
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  avatar: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: COLORS.softOrange,
  },

  name: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
  },

  subText: {
    color: COLORS.muted,
    marginTop: 3,
    fontWeight: "700",
  },

  statusText: {
    alignSelf: "flex-start",
    color: COLORS.warning || "#F59E0B",
    backgroundColor: "#FFF7DD",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "900",
    marginTop: 7,
  },

  infoBox: {
    backgroundColor: COLORS.bg,
    borderRadius: 18,
    padding: 12,
    marginTop: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 8,
  },

  infoLabel: {
    color: COLORS.text,
    fontWeight: "900",
    width: 80,
  },

  infoValue: {
    flex: 1,
    color: COLORS.muted,
    fontWeight: "700",
  },

  submittedText: {
    color: COLORS.primary,
    fontWeight: "900",
    fontSize: 12,
    marginTop: 10,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },

  approveBtn: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.success || "#16A34A",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 7,
  },

  rejectBtn: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.danger || "#DC2626",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 7,
  },

  btnText: {
    color: COLORS.white,
    fontWeight: "900",
  },
});
