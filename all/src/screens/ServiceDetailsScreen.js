import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import { useMatrimony } from "../context/MatrimonyContext";

export default function ServiceDetailsScreen({ navigation, route }) {
  const service = route.params?.service;
  const { sendServiceRequest } = useMatrimony();

  if (!service) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Service Details"
          subtitle="No service selected"
          navigation={navigation}
          showBack={true}
          showNotification={false}
          backTo="MainTabs"
        />
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>No Service Found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleRequest = () => {
    sendServiceRequest(service);
    Alert.alert("Request Sent", "Vendor will contact you soon.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Service Details"
        subtitle={service.category}
        navigation={navigation}
        showBack={true}
        showNotification={true}
        backTo="MainTabs"
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: service.image }} style={styles.image} />

        <View style={styles.card}>
          <Text style={styles.title}>{service.title}</Text>

          <View style={styles.row}>
            <Ionicons name="location-outline" size={18} color={COLORS.muted} />
            <Text style={styles.meta}>{service.location}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="star" size={18} color={COLORS.gold} />
            <Text style={styles.meta}>{service.rating} Rating</Text>
          </View>

          <Text style={styles.price}>{service.price}</Text>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{service.description}</Text>

          <PrimaryButton
            title="Send Booking Request"
            onPress={handleRequest}
            style={{ marginTop: 24 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 40 },
  image: { width: "100%", height: 260, borderRadius: 26 },
  card: {
    marginTop: 16,
    backgroundColor: COLORS.white,
    borderRadius: 26,
    padding: 18,
    elevation: 3,
  },
  title: { fontSize: 25, fontWeight: "900", color: COLORS.text },
  row: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10 },
  meta: { color: COLORS.muted, fontWeight: "700" },
  price: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
    marginTop: 20,
  },
  description: {
    color: COLORS.muted,
    lineHeight: 23,
    marginTop: 8,
    fontWeight: "600",
  },
  emptyBox: {
    margin: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
  },
  emptyTitle: {
    color: COLORS.text,
    fontWeight: "900",
    fontSize: 18,
  },
});