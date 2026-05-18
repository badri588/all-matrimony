const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(?:\+91)?[6-9]\d{9}$/;
const OTP_REGEX = /^\d{6}$/;

export const normalizeEmail = (value = "") => value.trim().toLowerCase();

export const normalizePhone = (value = "") => {
  const digits = String(value).replace(/\D/g, "");

  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }

  if (digits.length > 10) {
    return digits.slice(-10);
  }

  return digits;
};

export const isValidEmail = (value = "") =>
  EMAIL_REGEX.test(normalizeEmail(value));

export const isValidPhone = (value = "") => {
  const raw = String(value).trim();
  const normalized = normalizePhone(raw);

  return PHONE_REGEX.test(raw) || PHONE_REGEX.test(normalized);
};

export const isValidOtp = (value = "") => OTP_REGEX.test(String(value).trim());

export const isValidPassword = (value = "") => String(value).trim().length >= 6;

export const validateIdentifier = (value = "") => {
  const raw = String(value).trim();

  if (!raw) {
    return {
      valid: false,
      type: null,
      message: "Please enter email or phone number.",
    };
  }

  if (isValidEmail(raw)) {
    return {
      valid: true,
      type: "email",
      normalizedValue: normalizeEmail(raw),
    };
  }

  if (isValidPhone(raw)) {
    return {
      valid: true,
      type: "phone",
      normalizedValue: normalizePhone(raw),
    };
  }

  return {
    valid: false,
    type: null,
    message: "Enter a valid email address or 10-digit phone number.",
  };
};
