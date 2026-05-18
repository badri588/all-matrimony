import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Header from "../components/Header";
import { COLORS } from "../constants/colors";
import { useMatrimony } from "../context/MatrimonyContext";
import { getImageSource } from "../utils/imageSource";

export default function InterestRequestsScreen({ navigation }) {
  const { interests, updateInterestStatus } = useMatrimony();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Interest Requests"
        subtitle="Manage sent interests"
        navigation={navigation}
        showBack={true}
        showNotification={false}
        backTo="MainTabs"
      />

      <ScrollView contentContainerStyle={styles.content}>
        {interests.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="heart-outline" size={68} color={COLORS.muted} />
            <Text style={styles.emptyTitle}>No Interests Yet</Text>
            <Text style={styles.emptyText}>
              Send interest from profile details screen. All requests will show
              here.
            </Text>
          </View>
        ) : (
          interests.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={getImageSource(item.profile.image)} style={styles.avatar} />

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.profile.name}</Text>
                <Text style={styles.meta}>
                  {item.profile.age} yrs • {item.profile.community}
                </Text>
                <Text style={styles.location}>{item.profile.location}</Text>

                <View
                  style={[
                    styles.statusPill,
                    item.status === "Accepted" && styles.acceptedPill,
                    item.status === "Rejected" && styles.rejectedPill,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      item.status === "Accepted" && { color: COLORS.success },
                      item.status === "Rejected" && { color: COLORS.danger },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>

                {item.status === "Pending" && (
                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={styles.acceptBtn}
                      onPress={() => updateInterestStatus(item.id, "Accepted")}
                    >
                      <Ionicons
                        name="checkmark"
                        size={17}
                        color={COLORS.white}
                      />
                      <Text style={styles.actionText}>Accept</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.rejectBtn}
                      onPress={() => updateInterestStatus(item.id, "Rejected")}
                    >
                      <Ionicons name="close" size={17} color={COLORS.white} />
                      <Text style={styles.actionText}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {item.status === "Accepted" && (
                  <TouchableOpacity
                    style={styles.chatBtn}
                    onPress={() =>
                      navigation.navigate("Chat", { profile: item.profile })
                    }
                  >
                    <Ionicons
                      name="chatbubble-outline"
                      size={17}
                      color={COLORS.white}
                    />
                    <Text style={styles.actionText}>Open Chat</Text>
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
  content: { padding: 16, paddingBottom: 40 },
  emptyBox: {
    backgroundColor: COLORS.white,
    borderRadius: 26,
    padding: 28,
    alignItems: "center",
    marginTop: 60,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },
  emptyTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "900",
    marginTop: 12,
  },
  emptyText: {
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 21,
    fontWeight: "600",
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 14,
    flexDirection: "row",
    gap: 13,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 18,
    backgroundColor: COLORS.border,
  },
  name: { color: COLORS.text, fontSize: 18, fontWeight: "900" },
  meta: { color: COLORS.muted, marginTop: 4, fontWeight: "700" },
  location: { color: COLORS.text, marginTop: 4, fontWeight: "700" },
  statusPill: {
    alignSelf: "flex-start",
    backgroundColor: "#FFF8E1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginTop: 9,
  },
  acceptedPill: { backgroundColor: "#DCFCE7" },
  rejectedPill: { backgroundColor: "#FEE2E2" },
  statusText: { color: COLORS.gold, fontWeight: "900", fontSize: 12 },
  actionRow: { flexDirection: "row", gap: 8, marginTop: 12 },
  acceptBtn: {
    flex: 1,
    height: 38,
    borderRadius: 13,
    backgroundColor: COLORS.success,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
  },
  rejectBtn: {
    flex: 1,
    height: 38,
    borderRadius: 13,
    backgroundColor: COLORS.danger,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
  },
  chatBtn: {
    height: 38,
    borderRadius: 13,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
    marginTop: 12,
  },
  actionText: { color: COLORS.white, fontWeight: "900", fontSize: 12 },
});
