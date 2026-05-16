import React from "react";
import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../components/Header";
import { COLORS } from "../../constants/colors";
import { useMatrimony } from "../../context/MatrimonyContext";

export default function AdminUsersScreen({ navigation }) {
  const { profiles } = useMatrimony();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Users"
        subtitle="Bride and groom profiles"
        navigation={navigation}
        showNotification={false}
        backTo="AdminDashboard"
      />

      <ScrollView contentContainerStyle={styles.content}>
        {profiles.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.avatar} />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>
                {item.gender} • {item.age} yrs • {item.community}
              </Text>
              <Text style={styles.meta}>{item.location}</Text>
              <Text style={styles.job}>
                {item.education} • {item.job}
              </Text>
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
    alignItems: "center",
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 18,
    backgroundColor: COLORS.border,
  },
  name: { color: COLORS.text, fontSize: 17, fontWeight: "900" },
  meta: { color: COLORS.muted, marginTop: 4, fontWeight: "700" },
  job: { color: COLORS.primary, marginTop: 4, fontWeight: "800" },
});