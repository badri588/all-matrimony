// src/config/api.js

import { Platform } from "react-native";

const LAN_API_BASE_URL = "http://192.168.55.106:8080";
const WEB_API_BASE_URL = "http://localhost:8080";

export const API_BASE_URL =
  Platform.OS === "web" ? WEB_API_BASE_URL : LAN_API_BASE_URL;

// Real phone Expo Go lo test chesthe above line ni laptop IP tho replace cheyyandi.
// Example:
// export const API_BASE_URL = "http://192.168.1.5:8080";

export const API_ENDPOINTS = {
  CUSTOMER_STATUS: `${API_BASE_URL}/api/service-customers/status`,
  CUSTOMER_REGISTER: `${API_BASE_URL}/api/service-customers/register`,
  SERVICE_REQUEST_SEND: `${API_BASE_URL}/api/service-requests/send`,
  SERVICE_REQUEST_STATUS: `${API_BASE_URL}/api/service-requests`,
};
