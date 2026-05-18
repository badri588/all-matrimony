import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import { useMatrimony } from "../context/MatrimonyContext";
import { getImageSource } from "../utils/imageSource";

export default function ProfileDetailsScreen({ navigation, route }) {
  const profile = route?.params?.profile;

  const { addToWishlist, sendInterest, getInterestStatus } = useMatrimony();

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Profile Details"
          subtitle="No profile selected"
          navigation={navigation}
          showBack={true}
          showNotification={false}
          backTo="MainTabs"
        />

        <View style={styles.emptyBox}>
          <Ionicons
            name="person-circle-outline"
            size={70}
            color={COLORS.muted}
          />
          <Text style={styles.emptyTitle}>No Profile Found</Text>
          <Text style={styles.emptyText}>
            Please go back and select one profile.
          </Text>

          <PrimaryButton
            title="Go Back"
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate("MainTabs");
              }
            }}
            style={{ width: "100%", marginTop: 18 }}
          />
        </View>
      </SafeAreaView>
    );
  }

  const interestStatus = getInterestStatus(profile.id);

  const handleShortlist = () => {
    addToWishlist(profile);
    Alert.alert("Shortlisted", `${profile.name} added to wishlist.`);
  };

  const handleSendInterest = async () => {
    const result = await sendInterest(profile);
    Alert.alert(result.success ? "Success" : "Already Sent", result.message);
  };

  const handleChat = () => {
    if (interestStatus === "Accepted") {
      navigation.navigate("Chat", { profile });
    } else {
      Alert.alert(
        "Chat Locked",
        "Chat will be enabled after interest is accepted."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Profile Details"
        subtitle={profile.name}
        navigation={navigation}
        showBack={true}
        showNotification={true}
        backTo="MainTabs"
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Image source={getImageSource(profile.image)} style={styles.image} />

        <View style={styles.card}>
          <View style={styles.nameRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.meta}>
                {profile.age} yrs • {profile.height} • {profile.gender}
              </Text>
            </View>

            <TouchableOpacity style={styles.heartBtn} onPress={handleShortlist}>
              <Ionicons name="heart" size={23} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {interestStatus && (
            <View
              style={[
                styles.statusPill,
                interestStatus === "Accepted" && styles.acceptedPill,
                interestStatus === "Rejected" && styles.rejectedPill,
              ]}
            >
              <Ionicons
                name={
                  interestStatus === "Accepted"
                    ? "checkmark-circle"
                    : interestStatus === "Rejected"
                    ? "close-circle"
                    : "time"
                }
                size={17}
                color={
                  interestStatus === "Accepted"
                    ? COLORS.success
                    : interestStatus === "Rejected"
                    ? COLORS.danger
                    : COLORS.gold
                }
              />
              <Text
                style={[
                  styles.statusText,
                  interestStatus === "Accepted" && { color: COLORS.success },
                  interestStatus === "Rejected" && { color: COLORS.danger },
                ]}
              >
                Interest {interestStatus}
              </Text>
            </View>
          )}

          <View style={styles.infoGrid}>
            <Info
              icon="people-outline"
              label="Community"
              value={profile.community}
            />
            <Info icon="heart-outline" label="Religion" value={profile.religion} />
            <Info
              icon="location-outline"
              label="Location"
              value={profile.location}
            />
            <Info
              icon="school-outline"
              label="Education"
              value={profile.education}
            />
            <Info icon="briefcase-outline" label="Job" value={profile.job} />
            <Info icon="cash-outline" label="Income" value={profile.income} />
          </View>

          <Text style={styles.sectionTitle}>About Profile</Text>
          <Text style={styles.about}>
            {profile.about ||
              "This profile is looking for a suitable life partner with good family values."}
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.outlineBtn} onPress={handleShortlist}>
              <Ionicons
                name="bookmark-outline"
                size={20}
                color={COLORS.primary}
              />
              <Text style={styles.outlineText}>Shortlist</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.interestBtn,
                interestStatus && styles.disabledInterestBtn,
              ]}
              onPress={handleSendInterest}
              disabled={!!interestStatus}
            >
              <Ionicons
                name="heart-circle-outline"
                size={20}
                color={interestStatus ? COLORS.muted : COLORS.white}
              />
              <Text
                style={[
                  styles.interestText,
                  interestStatus && { color: COLORS.muted },
                ]}
              >
                {interestStatus ? interestStatus : "Send Interest"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.chatBtn,
              interestStatus !== "Accepted" && styles.lockedChatBtn,
            ]}
            onPress={handleChat}
          >
            <Ionicons
              name={interestStatus === "Accepted" ? "chatbubble" : "lock-closed"}
              size={20}
              color={COLORS.white}
            />
            <Text style={styles.chatBtnText}>
              {interestStatus === "Accepted"
                ? "Start Chat"
                : "Chat Locked Until Accepted"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Info({ icon, label, value }) {
  return (
    <View style={styles.infoBox}>
      <Ionicons name={icon} size={18} color={COLORS.primary} />
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || "-"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 40 },
  image: {
    width: "100%",
    height: 330,
    borderRadius: 26,
    backgroundColor: COLORS.border,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 26,
    padding: 18,
    marginTop: 16,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  name: { fontSize: 26, fontWeight: "900", color: COLORS.text },
  meta: { color: COLORS.muted, marginTop: 5, fontWeight: "700" },
  heartBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.softOrange,
    alignItems: "center",
    justifyContent: "center",
  },
  statusPill: {
    marginTop: 14,
    alignSelf: "flex-start",
    backgroundColor: "#FFF8E1",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  acceptedPill: { backgroundColor: "#DCFCE7" },
  rejectedPill: { backgroundColor: "#FEE2E2" },
  statusText: { color: COLORS.gold, fontWeight: "900" },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 18,
  },
  infoBox: {
    width: "48%",
    backgroundColor: COLORS.bg,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoLabel: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 5,
    fontWeight: "700",
  },
  infoValue: { color: COLORS.text, marginTop: 2, fontWeight: "900" },
  sectionTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
  },
  about: {
    marginTop: 8,
    color: COLORS.muted,
    lineHeight: 22,
    fontWeight: "600",
  },
  actions: { flexDirection: "row", gap: 12, marginTop: 22 },
  outlineBtn: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    backgroundColor: COLORS.softOrange,
  },
  outlineText: { color: COLORS.primary, fontWeight: "900" },
  interestBtn: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  disabledInterestBtn: { backgroundColor: "#E5E7EB" },
  interestText: { color: COLORS.white, fontWeight: "900" },
  chatBtn: {
    marginTop: 14,
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  lockedChatBtn: { backgroundColor: "#9CA3AF" },
  chatBtnText: { color: COLORS.white, fontWeight: "900" },
  emptyBox: {
    margin: 18,
    marginTop: 80,
    backgroundColor: COLORS.white,
    borderRadius: 26,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 3,
  },
  emptyTitle: {
    marginTop: 12,
    fontSize: 21,
    fontWeight: "900",
    color: COLORS.text,
  },
  emptyText: {
    marginTop: 6,
    color: COLORS.muted,
    textAlign: "center",
    fontWeight: "600",
  },
});
