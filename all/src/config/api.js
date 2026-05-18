import Constants from "expo-constants";
import { Platform } from "react-native";

const PORT = "8080";
const FALLBACK_LAN_IP = "172.17.23.175";
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]", "::1"]);
const EXPO_TUNNEL_SUFFIXES = [".exp.direct", ".exp.host", ".expo.app"];

const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

const normalizeBaseUrl = (value) => {
  if (!value || typeof value !== "string") {
    return "";
  }

  const trimmedValue = trimTrailingSlash(value.trim());

  if (!trimmedValue) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  return `http://${trimmedValue}`;
};

const getConfiguredBaseUrl = () => {
  const explicitUrl =
    process.env.EXPO_PUBLIC_API_URL || Constants.expoConfig?.extra?.apiBaseUrl;

  return normalizeBaseUrl(explicitUrl);
};

const buildHttpUrl = (host) => `http://${host}:${PORT}`;

const isExpoTunnelHost = (hostname) =>
  EXPO_TUNNEL_SUFFIXES.some((suffix) => hostname.endsWith(suffix));

const getWebHost = () => {
  if (typeof window === "undefined") {
    return buildHttpUrl("localhost");
  }

  const hostname = window.location?.hostname || "";

  if (!hostname || LOCAL_HOSTS.has(hostname) || isExpoTunnelHost(hostname)) {
    return buildHttpUrl("localhost");
  }

  return buildHttpUrl(hostname);
};

const getNativeHost = () => {
  if (Platform.OS === "android") {
    return buildHttpUrl(FALLBACK_LAN_IP);
  }

  if (Platform.OS === "ios") {
    return buildHttpUrl(FALLBACK_LAN_IP);
  }

  return buildHttpUrl(FALLBACK_LAN_IP);
};

const getBaseUrl = () => {
  const configuredBaseUrl = getConfiguredBaseUrl();

  if (configuredBaseUrl) {
    return configuredBaseUrl;
  }

  if (Platform.OS === "web") {
    return getWebHost();
  }

  return getNativeHost();
};

export const API_BASE_URL = getBaseUrl();

export const WS_BASE_URL = API_BASE_URL.replace(/^http/, "ws");

export const toApiAssetUrl = (value) => {
  if (!value) {
    return value;
  }

  if (value.startsWith("file:") || value.startsWith("content:") || value.startsWith("data:")) {
    return value;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    try {
      const url = new URL(value);

      if (url.pathname.startsWith("/uploads/")) {
        return `${API_BASE_URL}${url.pathname}`;
      }

      return value;
    } catch (error) {
      return value;
    }
  }

  if (value.startsWith("/")) {
    return `${API_BASE_URL}${value}`;
  }

  return `${API_BASE_URL}/${value}`;
};

export const toStoredAssetPath = (value) => {
  if (!value) {
    return value;
  }

  try {
    const url = new URL(value);

    if (url.pathname.startsWith("/uploads/")) {
      return url.pathname;
    }
  } catch (error) {
    if (value.startsWith("/uploads/")) {
      return value;
    }
  }

  return value;
};

export const buildChatSocketUrl = (userId) => `${WS_BASE_URL}/ws/chat?userId=${userId}`;
