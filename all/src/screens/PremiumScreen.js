import React from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";

const plans = [
  {
    name: "Silver",
    price: "₹999",
    features: ["View contact", "20 interests", "Basic support"],
  },
  {
    name: "Gold",
    price: "₹1999",
    features: ["Unlimited interests", "Priority listing", "Chat access"],
  },
  {
    name: "Diamond",
    price: "₹4999",
    features: ["Personal advisor", "Verified matches", "Wedding service offers"],
  },
];

export default function PremiumScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Premium Plans"
        subtitle="Upgrade your partner search"
        navigation={navigation}
        showBack={true}
        showNotification={false}
        backTo="MainTabs"
      />

      <ScrollView contentContainerStyle={styles.content}>
        {plans.map((plan) => (
          <View key={plan.name} style={styles.card}>
            <View style={styles.planHeader}>
              <Ionicons name="diamond" size={28} color={COLORS.gold} />
              <View>
                <Text style={styles.name}>{plan.name}</Text>
                <Text style={styles.price}>{plan.price}</Text>
              </View>
            </View>

            {plan.features.map((feature) => (
              <View key={feature} style={styles.featureRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color={COLORS.success}
                />
                <Text style={styles.feature}>{feature}</Text>
              </View>
            ))}

            <PrimaryButton
              title="Choose Plan"
              onPress={() => {}}
              style={{ marginTop: 18 }}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 40 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  planHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  name: { fontSize: 22, fontWeight: "900", color: COLORS.text },
  price: { color: COLORS.primary, fontWeight: "900", marginTop: 3 },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 9,
  },
  feature: { color: COLORS.text, fontWeight: "700" },
});