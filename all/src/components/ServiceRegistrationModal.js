import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

export default function ServiceRegistrationModal({
  visible,
  onClose,
  onSubmit,
  loading,
  service,
}) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const blurWebFocus = () => {
    if (Platform.OS === "web" && typeof document !== "undefined") {
      document.activeElement?.blur?.();
    }
  };

  const handleClose = () => {
    blurWebFocus();
    onClose();
  };

  const handleSubmit = () => {
    if (!form.fullName.trim()) {
      alert("Please enter full name");
      return;
    }

    if (!form.phone.trim()) {
      alert("Please enter phone number");
      return;
    }

    if (form.phone.trim().length < 10) {
      alert("Please enter valid phone number");
      return;
    }

    blurWebFocus();
    onSubmit(form);
  };

  const getServiceName = () => {
    const category = service?.category || "selected service";
    return String(category).toLowerCase();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.modalBox}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Register First</Text>
              <Text style={styles.subtitle}>
                One-time registration for booking {getServiceName()}
              </Text>
            </View>

            <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
              <Ionicons name="close" size={22} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter full name"
              value={form.fullName}
              onChangeText={(text) => updateField("fullName", text)}
            />

            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              value={form.phone}
              keyboardType="phone-pad"
              maxLength={10}
              onChangeText={(text) => updateField("phone", text)}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              value={form.email}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) => updateField("email", text)}
            />

            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter address"
              value={form.address}
              multiline
              onChangeText={(text) => updateField("address", text)}
            />

            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter city"
              value={form.city}
              onChangeText={(text) => updateField("city", text)}
            />

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={styles.submitText}>Register & Send Request</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  modalBox: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    maxHeight: "88%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 4,
    color: COLORS.muted,
    fontWeight: "600",
  },
  closeBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: COLORS.text,
    fontWeight: "900",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingHorizontal: 14,
    backgroundColor: COLORS.bg,
    color: COLORS.text,
    fontWeight: "700",
  },
  textArea: {
    height: 90,
    paddingTop: 12,
    textAlignVertical: "top",
  },
  submitBtn: {
    height: 54,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
    marginBottom: 10,
  },
  submitText: {
    color: COLORS.white,
    fontWeight: "900",
    fontSize: 16,
  },
});
