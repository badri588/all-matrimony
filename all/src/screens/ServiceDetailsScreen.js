// import React from "react";
// import {
//   SafeAreaView,
//   ScrollView,
//   Image,
//   Text,
//   View,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../constants/colors";
// import Header from "../components/Header";
// import PrimaryButton from "../components/PrimaryButton";
// import { useMatrimony } from "../context/MatrimonyContext";

// export default function ServiceDetailsScreen({ navigation, route }) {
//   const service = route.params?.service;
//   const { sendServiceRequest } = useMatrimony();

//   if (!service) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Header
//           title="Service Details"
//           subtitle="No service selected"
//           navigation={navigation}
//           showBack={true}
//           showNotification={false}
//           backTo="MainTabs"
//         />
//         <View style={styles.emptyBox}>
//           <Text style={styles.emptyTitle}>No Service Found</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   const handleRequest = () => {
//     sendServiceRequest(service);
//     Alert.alert("Request Sent", "Vendor will contact you soon.");
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header
//         title="Service Details"
//         subtitle={service.category}
//         navigation={navigation}
//         showBack={true}
//         showNotification={true}
//         backTo="MainTabs"
//       />

//       <ScrollView contentContainerStyle={styles.content}>
//         <Image source={{ uri: service.image }} style={styles.image} />

//         <View style={styles.card}>
//           <Text style={styles.title}>{service.title}</Text>

//           <View style={styles.row}>
//             <Ionicons name="location-outline" size={18} color={COLORS.muted} />
//             <Text style={styles.meta}>{service.location}</Text>
//           </View>

//           <View style={styles.row}>
//             <Ionicons name="star" size={18} color={COLORS.gold} />
//             <Text style={styles.meta}>{service.rating} Rating</Text>
//           </View>

//           <Text style={styles.price}>{service.price}</Text>

//           <Text style={styles.sectionTitle}>Description</Text>
//           <Text style={styles.description}>{service.description}</Text>

//           <PrimaryButton
//             title="Send Booking Request"
//             onPress={handleRequest}
//             style={{ marginTop: 24 }}
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.bg },
//   content: { padding: 16, paddingBottom: 40 },
//   image: { width: "100%", height: 260, borderRadius: 26 },
//   card: {
//     marginTop: 16,
//     backgroundColor: COLORS.white,
//     borderRadius: 26,
//     padding: 18,
//     elevation: 3,
//   },
//   title: { fontSize: 25, fontWeight: "900", color: COLORS.text },
//   row: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10 },
//   meta: { color: COLORS.muted, fontWeight: "700" },
//   price: {
//     color: COLORS.primary,
//     fontSize: 18,
//     fontWeight: "900",
//     marginTop: 14,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: COLORS.text,
//     marginTop: 20,
//   },
//   description: {
//     color: COLORS.muted,
//     lineHeight: 23,
//     marginTop: 8,
//     fontWeight: "600",
//   },
//   emptyBox: {
//     margin: 20,
//     backgroundColor: COLORS.white,
//     borderRadius: 20,
//     padding: 20,
//   },
//   emptyTitle: {
//     color: COLORS.text,
//     fontWeight: "900",
//     fontSize: 18,
//   },
// });




import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  Alert,
  Modal,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import ServiceRegistrationModal from "../components/ServiceRegistrationModal";
import { useMatrimony } from "../context/MatrimonyContext";

const getBookingLabel = (service) => {
  const category = String(service?.category || "").toLowerCase();

  if (category.includes("function hall")) return "Book Function Hall";
  if (category.includes("car")) return "Book Bride/Groom Car";
  if (category.includes("cooking")) return "Book Cooking Team";
  if (category.includes("photography")) return "Book Photography";
  if (category.includes("makeup")) return "Book Makeup Artist";
  if (category.includes("decoration")) return "Book Decoration";
  if (category.includes("arkestra")) return "Book Arkestra";
  if (category.includes("cleaning")) return "Book Cleaning Team";

  return "Book Service";
};

const timeSlots = [
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
];

const formatDateValue = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatMonthTitle = (date) =>
  date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

const buildCalendarDays = (monthDate) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: firstDay }, () => null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push(new Date(year, month, day));
  }

  return days;
};

export default function ServiceDetailsScreen({ navigation, route }) {
  const service = route.params?.service;

  const {
    sendServiceRequest,
    registerServiceCustomerAndSendRequest,
    serviceCustomer,
    hasApprovedServiceBooking,
  } = useMatrimony();

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [bookingDate, setBookingDate] = useState("");
  const [bookingEndDate, setBookingEndDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  const calendarDays = useMemo(
    () => buildCalendarDays(calendarMonth),
    [calendarMonth]
  );

  const bookingDetails = {
    bookingDate,
    bookingEndDate,
    bookingTime,
  };

  if (!service) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Service Details"
          subtitle="No service selected"
          navigation={navigation}
          showBack={true}
          showNotification={false}
          backTo="MainTabs"
        />

        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>No Service Found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getImageSource = () => {
    if (!service?.image) {
      return {
        uri: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900",
      };
    }

    if (typeof service.image === "string") {
      return { uri: service.image };
    }

    return service.image;
  };

  const handleRequest = async () => {
    if (!bookingDate || !bookingEndDate || !bookingTime) {
      setShowCalendar(true);
      return;
    }

    try {
      setLoading(true);

      const result = await sendServiceRequest(service, bookingDetails);

      if (result?.registrationRequired) {
        setShowRegisterModal(true);
        return;
      }

      if (result?.success) {
        Alert.alert(
          result?.directConfirmed ? "Booking Confirmed" : "Request Sent",
          result?.directConfirmed
            ? "Your booking is confirmed. Vendor will contact you soon."
            : "Your booking request is sent to admin approval."
        );
        return;
      }

      Alert.alert("Error", result?.message || "Something went wrong.");
    } catch (error) {
      Alert.alert("Error", "Unable to send request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    try {
      setLoading(true);

      const result = await registerServiceCustomerAndSendRequest(
        formData,
        service,
        bookingDetails
      );

      if (result?.success) {
        setShowRegisterModal(false);
        Alert.alert(
          result?.directConfirmed ? "Booking Confirmed" : "Request Sent",
          result?.directConfirmed
            ? "Registration completed and booking confirmed."
            : "Registration completed and booking request sent to admin approval."
        );
        return;
      }

      Alert.alert("Error", result?.message || "Something went wrong.");
    } catch (error) {
      Alert.alert("Error", "Unable to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const changeMonth = (offset) => {
    setCalendarMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1)
    );
  };

  const handleDateSelect = (date) => {
    const nextDate = formatDateValue(date);

    if (!bookingDate || (bookingDate && bookingEndDate)) {
      setBookingDate(nextDate);
      setBookingEndDate("");
      return;
    }

    if (nextDate < bookingDate) {
      setBookingDate(nextDate);
      setBookingEndDate("");
      return;
    }

    setBookingEndDate(nextDate);
  };

  const getMinimumBookingDate = () => {
    const minimumDate = new Date();
    minimumDate.setDate(minimumDate.getDate() + 2);
    minimumDate.setHours(0, 0, 0, 0);
    return minimumDate;
  };

  const isBeforeMinimumDate = (date) => {
    const value = new Date(date);
    value.setHours(0, 0, 0, 0);
    return value < getMinimumBookingDate();
  };

  const isDateInRange = (dateValue) => {
    if (!bookingDate || !bookingEndDate) return false;
    return dateValue > bookingDate && dateValue < bookingEndDate;
  };

  const closeCalendar = () => {
    if (Platform.OS === "web" && typeof document !== "undefined") {
      document.activeElement?.blur?.();
    }

    setShowCalendar(false);
  };

  const renderCalendar = () => (
    <Modal
      visible={showCalendar}
      transparent
      animationType="slide"
      onRequestClose={closeCalendar}
    >
      <View style={styles.calendarOverlay}>
        <View style={styles.calendarBox}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity
              style={styles.calendarIconBtn}
              onPress={() => changeMonth(-1)}
            >
              <Ionicons name="chevron-back" size={22} color={COLORS.text} />
            </TouchableOpacity>

            <Text style={styles.calendarTitle}>
              {formatMonthTitle(calendarMonth)}
            </Text>

            <TouchableOpacity
              style={styles.calendarIconBtn}
              onPress={() => changeMonth(1)}
            >
              <Ionicons name="chevron-forward" size={22} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.weekRow}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <Text key={day} style={styles.weekText}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {calendarDays.map((date, index) => {
              const dateValue = date ? formatDateValue(date) : "";
              const selected =
                dateValue === bookingDate || dateValue === bookingEndDate;
              const inRange = isDateInRange(dateValue);
              const disabled = date ? isBeforeMinimumDate(date) : true;

              return (
                <TouchableOpacity
                  key={`${dateValue || "empty"}-${index}`}
                  style={[
                    styles.dayCell,
                    inRange && styles.rangeDayCell,
                    selected && styles.selectedDayCell,
                    disabled && styles.disabledDayCell,
                  ]}
                  disabled={disabled}
                  onPress={() => handleDateSelect(date)}
                >
                  <Text
                    style={[
                      styles.dayText,
                      selected && styles.selectedDayText,
                      disabled && styles.disabledDayText,
                    ]}
                  >
                    {date ? date.getDate() : ""}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.rangeHint}>
            Select a from date and to date. Booking is enabled from two days
            after today.
          </Text>

          <Text style={styles.timeTitle}>Select Time</Text>
          <View style={styles.timeGrid}>
            {timeSlots.map((slot) => (
              <TouchableOpacity
                key={slot}
                style={[
                  styles.timeChip,
                  bookingTime === slot && styles.selectedTimeChip,
                ]}
                onPress={() => setBookingTime(slot)}
              >
                <Text
                  style={[
                    styles.timeChipText,
                    bookingTime === slot && styles.selectedTimeChipText,
                  ]}
                >
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.calendarActions}>
            <TouchableOpacity
              style={[styles.calendarActionBtn, styles.cancelBtn]}
              onPress={closeCalendar}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.calendarActionBtn,
                styles.doneBtn,
                (!bookingDate || !bookingEndDate || !bookingTime) &&
                  styles.disabledDoneBtn,
              ]}
              disabled={!bookingDate || !bookingEndDate || !bookingTime}
              onPress={closeCalendar}
            >
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Service Details"
        subtitle={service.category}
        navigation={navigation}
        showBack={true}
        showNotification={true}
        backTo="MainTabs"
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Image source={getImageSource()} style={styles.image} />

        <View style={styles.card}>
          <Text style={styles.title}>{service.title}</Text>

          <View style={styles.row}>
            <Ionicons name="location-outline" size={18} color={COLORS.muted} />
            <Text style={styles.meta}>{service.location}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="star" size={18} color={COLORS.gold} />
            <Text style={styles.meta}>{service.rating} Rating</Text>
          </View>

          <Text style={styles.price}>{service.price}</Text>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{service.description}</Text>

          <Text style={styles.sectionTitle}>Booking Dates & Time</Text>
          <TouchableOpacity
            style={styles.datePicker}
            activeOpacity={0.85}
            onPress={() => setShowCalendar(true)}
          >
            <Ionicons name="calendar-outline" size={22} color={COLORS.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.datePickerLabel}>
                {bookingDate && bookingEndDate && bookingTime
                  ? `${bookingDate} to ${bookingEndDate}, ${bookingTime}`
                  : "Select from date, to date and time"}
              </Text>
              <Text style={styles.datePickerHint}>
                Dates are available from two days after today.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
          </TouchableOpacity>

          <PrimaryButton
            title={
              loading
                ? "Please wait..."
                : hasApprovedServiceBooking?.()
                ? getBookingLabel(service)
                : serviceCustomer?.registered
                ? getBookingLabel(service)
                : "Send Booking Request"
            }
            onPress={handleRequest}
            style={{ marginTop: 24 }}
            disabled={loading}
          />
        </View>
      </ScrollView>

      <ServiceRegistrationModal
        visible={showRegisterModal}
        loading={loading}
        service={service}
        onClose={() => setShowRegisterModal(false)}
        onSubmit={handleRegister}
      />
      {renderCalendar()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 40 },
  image: { width: "100%", height: 260, borderRadius: 26 },
  card: {
    marginTop: 16,
    backgroundColor: COLORS.white,
    borderRadius: 26,
    padding: 18,
    elevation: 3,
  },
  title: { fontSize: 25, fontWeight: "900", color: COLORS.text },
  row: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10 },
  meta: { color: COLORS.muted, fontWeight: "700" },
  price: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
    marginTop: 20,
  },
  description: {
    color: COLORS.muted,
    lineHeight: 23,
    marginTop: 8,
    fontWeight: "600",
  },
  datePicker: {
    marginTop: 10,
    minHeight: 66,
    borderRadius: 18,
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  datePickerLabel: {
    color: COLORS.text,
    fontWeight: "900",
  },
  datePickerHint: {
    color: COLORS.muted,
    marginTop: 3,
    fontWeight: "600",
    fontSize: 12,
  },
  calendarOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  calendarBox: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 16,
    maxHeight: "92%",
  },
  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  calendarIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  calendarTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
  },
  weekRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  weekText: {
    width: `${100 / 7}%`,
    textAlign: "center",
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "900",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  selectedDayCell: {
    backgroundColor: COLORS.primary,
  },
  rangeDayCell: {
    backgroundColor: COLORS.softOrange,
  },
  disabledDayCell: {
    opacity: 0.35,
  },
  dayText: {
    color: COLORS.text,
    fontWeight: "900",
  },
  selectedDayText: {
    color: COLORS.white,
  },
  disabledDayText: {
    color: COLORS.muted,
  },
  timeTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 14,
    marginBottom: 10,
  },
  rangeHint: {
    color: COLORS.muted,
    marginTop: 12,
    lineHeight: 18,
    fontWeight: "700",
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  timeChip: {
    width: "23%",
    minHeight: 38,
    borderRadius: 12,
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedTimeChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeChipText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "900",
  },
  selectedTimeChipText: {
    color: COLORS.white,
  },
  calendarActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  calendarActionBtn: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtn: {
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  doneBtn: {
    backgroundColor: COLORS.primary,
  },
  disabledDoneBtn: {
    opacity: 0.55,
  },
  cancelText: {
    color: COLORS.text,
    fontWeight: "900",
  },
  doneText: {
    color: COLORS.white,
    fontWeight: "900",
  },
  emptyBox: {
    margin: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
  },
  emptyTitle: {
    color: COLORS.text,
    fontWeight: "900",
    fontSize: 18,
  },
});
