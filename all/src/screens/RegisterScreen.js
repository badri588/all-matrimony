import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { COLORS } from "../constants/colors";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    gender: "",
    community: "",
    location: "",
    password: "",
  });

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegister = () => {
    navigation.replace("MainTabs");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Create Profile"
        subtitle="Register bride/groom profile"
        navigation={navigation}
        showBack={true}
        showNotification={false}
        backTo="Login"
      />

      <ScrollView contentContainerStyle={styles.content}>
        {[
          ["name", "Full Name"],
          ["phone", "Phone Number"],
          ["gender", "Bride / Groom"],
          ["community", "Community / Religion"],
          ["location", "Location"],
          ["password", "Password"],
        ].map(([key, label]) => (
          <View key={key}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              style={styles.input}
              placeholder={label}
              secureTextEntry={key === "password"}
              value={form[key]}
              onChangeText={(text) => updateField(key, text)}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        ))}

        <PrimaryButton
          title="Submit Registration"
          onPress={handleRegister}
          style={{ marginTop: 22 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 18, paddingBottom: 40 },
  label: {
    fontWeight: "900",
    color: COLORS.text,
    marginTop: 14,
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
});