import React from "react";
import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../components/Header";
import { COLORS } from "../../constants/colors";
import { useMatrimony } from "../../context/MatrimonyContext";

export default function AdminServicesScreen({ navigation }) {
  const { services } = useMatrimony();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Wedding Services"
        subtitle="Manage listed services"
        navigation={navigation}
        showNotification={false}
        backTo="AdminDashboard"
      />

      <ScrollView contentContainerStyle={styles.content}>
        {services.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.meta}>{item.category}</Text>
              <Text style={styles.meta}>
                {item.location} • {item.price}
              </Text>
              <Text style={styles.rating}>⭐ {item.rating}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 100 },
  card: {
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
  rating: { color: COLORS.gold || COLORS.primary, marginTop: 4, fontWeight: "900" },
});