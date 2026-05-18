import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/colors";

export default function PrimaryButton({ title, onPress, style, disabled }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={style}
      disabled={disabled}
    >
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        style={[styles.button, disabled && styles.disabledButton]}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  disabledButton: {
    opacity: 0.65,
  },
  text: {
    color: COLORS.white,
    fontWeight: "900",
    fontSize: 16,
  },
});
