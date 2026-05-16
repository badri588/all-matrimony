import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS } from "../constants/colors";
import PrimaryButton from "../components/PrimaryButton";

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!phone.trim()) {
      Alert.alert("Required", "Please enter phone number.");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Required", "Please enter password.");
      return;
    }

    navigation.replace("MainTabs");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <LinearGradient
            colors={[
              COLORS.primaryDark,
              COLORS.primary,
              COLORS.maroon || COLORS.primaryDark,
            ]}
            style={styles.hero}
          >
            <TouchableOpacity
              style={styles.backBtn}
              activeOpacity={0.85}
              onPress={() => navigation.replace("RoleSelection")}
            >
              <Ionicons name="arrow-back" size={22} color={COLORS.white} />
            </TouchableOpacity>

            <View style={styles.logo}>
              <Ionicons name="heart" size={42} color={COLORS.primary} />
            </View>

            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Login to find your perfect life partner
            </Text>
          </LinearGradient>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Bride / Groom Login</Text>
            <Text style={styles.cardSubTitle}>
              Continue your matrimony journey
            </Text>

            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputBox}>
              <Ionicons name="call-outline" size={20} color={COLORS.muted} />
              <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputBox}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.muted}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#9CA3AF"
              />

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setShowPassword((prev) => !prev)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={COLORS.muted}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.forgot}
              activeOpacity={0.85}
              onPress={() =>
                Alert.alert(
                  "Forgot Password",
                  "Forgot password flow will be added with backend/Firebase."
                )
              }
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <PrimaryButton title="Login" onPress={handleLogin} />

            <TouchableOpacity
              style={styles.registerRow}
              activeOpacity={0.85}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.registerText}>New user? </Text>
              <Text style={styles.registerLink}>Create Account</Text>
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity
              style={styles.adminLinkBtn}
              activeOpacity={0.85}
              onPress={() => navigation.navigate("AdminLogin")}
            >
              <Ionicons
                name="shield-checkmark-outline"
                size={19}
                color={COLORS.primary}
              />
              <Text style={styles.adminLinkText}>Admin Login</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoBox}>
            <Ionicons
              name="information-circle-outline"
              size={22}
              color={COLORS.primary}
            />
            <Text style={styles.infoText}>
              Bride/Groom users can login here. Admin users should use separate
              admin login.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 34,
  },

  hero: {
    alignItems: "center",
    paddingTop: 42,
    paddingBottom: 34,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    position: "relative",
  },

  backBtn: {
    position: "absolute",
    left: 16,
    top: 18,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.20)",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    marginBottom: 18,
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    color: COLORS.white,
    textAlign: "center",
  },

  subtitle: {
    color: "#FDEDD8",
    marginTop: 7,
    fontWeight: "700",
    textAlign: "center",
  },

  card: {
    margin: 18,
    marginTop: 20,
    backgroundColor: COLORS.white,
    borderRadius: 26,
    padding: 20,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  cardTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
  },

  cardSubTitle: {
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 5,
    fontWeight: "700",
    marginBottom: 8,
  },

  label: {
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 8,
    marginTop: 14,
  },

  inputBox: {
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  input: {
    flex: 1,
    color: COLORS.text,
    fontWeight: "700",
    paddingVertical: 0,
  },

  forgot: {
    alignSelf: "flex-end",
    marginVertical: 14,
  },

  forgotText: {
    color: COLORS.primary,
    fontWeight: "900",
  },

  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
  },

  registerText: {
    color: COLORS.muted,
    fontWeight: "700",
  },

  registerLink: {
    color: COLORS.primary,
    fontWeight: "900",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 18,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },

  dividerText: {
    color: COLORS.muted,
    fontWeight: "900",
  },

  adminLinkBtn: {
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.softOrange,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  adminLinkText: {
    color: COLORS.primary,
    fontWeight: "900",
  },

  infoBox: {
    marginHorizontal: 18,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  infoText: {
    flex: 1,
    color: COLORS.muted,
    fontWeight: "700",
    lineHeight: 19,
  },
});