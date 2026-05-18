import React, { useState } from "react";
import {
  ActivityIndicator,
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

import InlineMessage from "../components/InlineMessage";
import PrimaryButton from "../components/PrimaryButton";
import { COLORS } from "../constants/colors";
import { API_BASE_URL } from "../config/api";
import { useMatrimony } from "../context/MatrimonyContext";
import { validateIdentifier } from "../utils/authValidation";

export default function LoginScreen({ navigation }) {
  const { hydrateUserSession } = useMatrimony();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "info", text: "" });

  const handleLogin = async () => {
    const identifierResult = validateIdentifier(identifier);
    const cleanPassword = password.trim();

    if (!identifierResult.valid) {
      setMessage({
        type: "error",
        text: identifierResult.message,
      });
      return;
    }

    if (!cleanPassword) {
      setMessage({
        type: "error",
        text: "Please enter password.",
      });
      return;
    }

    try {
      setLoading(true);
      setMessage({ type: "info", text: "" });

      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: identifierResult.normalizedValue,
          password: cleanPassword,
        }),
      });

      const rawResponse = await response.text();
      let data = null;

      try {
        data = rawResponse ? JSON.parse(rawResponse) : null;
      } catch (parseError) {
        setMessage({
          type: "error",
          text: `Login API returned an invalid response from ${API_BASE_URL}.`,
        });
        return;
      }

      if (!response.ok || !data?.success) {
        setMessage({
          type: "error",
          text: data?.message || "Invalid email, phone number, or password.",
        });
        return;
      }

      setMessage({
        type: "success",
        text: data.message || "Login successful.",
      });

      await hydrateUserSession(data.data);
      navigation.replace("MainTabs");
    } catch (error) {
      setMessage({
        type: "error",
        text: `Could not reach ${API_BASE_URL}. Make sure the phone/browser can access this backend URL.`,
      });
    } finally {
      setLoading(false);
    }
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
              Login with email or phone number to continue
            </Text>
          </LinearGradient>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Bride / Groom Login</Text>
            <Text style={styles.cardSubTitle}>
              Continue your matrimony journey
            </Text>

            <InlineMessage type={message.type} text={message.text} />

            <Text style={styles.label}>Email or Phone Number</Text>
            <View style={styles.inputBox}>
              <Ionicons
                name="person-circle-outline"
                size={20}
                color={COLORS.muted}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter email or 10-digit phone number"
                value={identifier}
                onChangeText={(text) => {
                  setIdentifier(text);
                  if (message.text) {
                    setMessage({ type: "info", text: "" });
                  }
                }}
                autoCapitalize="none"
                keyboardType="email-address"
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
                onChangeText={(text) => {
                  setPassword(text);
                  if (message.text) {
                    setMessage({ type: "info", text: "" });
                  }
                }}
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
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <PrimaryButton
              title={loading ? "Checking..." : "Login"}
              onPress={handleLogin}
              disabled={loading}
            />

            {loading && (
              <ActivityIndicator
                size="small"
                color={COLORS.primary}
                style={styles.loader}
              />
            )}

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
              Web and mobile both use the same validation now. Login accepts
              either email or phone number.
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
    gap: 10,
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
    marginTop: 4,
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
    marginTop: 4,
    marginBottom: 8,
  },

  forgotText: {
    color: COLORS.primary,
    fontWeight: "900",
  },

  loader: {
    marginTop: 2,
  },

  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
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
    marginVertical: 8,
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
