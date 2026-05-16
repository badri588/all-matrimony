import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants/colors";
import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import { useMatrimony } from "../context/MatrimonyContext";

export default function WishlistScreen({ navigation }) {
  const { wishlist, removeFromWishlist } = useMatrimony();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Wishlist"
        subtitle="Shortlisted profiles"
        navigation={navigation}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {wishlist.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No shortlisted profiles</Text>
            <Text style={styles.emptyText}>
              Add profiles from matches to see them here.
            </Text>
          </View>
        ) : (
          wishlist.map((item) => (
            <View key={item.id}>
              <ProfileCard
                item={item}
                onPress={() =>
                  navigation.navigate("ProfileDetails", { profile: item })
                }
                onWishlist={() => removeFromWishlist(item.id)}
              />

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeFromWishlist(item.id)}
              >
                <Text style={styles.removeText}>Remove from Wishlist</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  empty: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 30,
    alignItems: "center",
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.text,
  },
  emptyText: {
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 8,
    fontWeight: "600",
  },
  removeBtn: {
    marginBottom: 18,
    marginTop: -6,
    alignSelf: "center",
  },
  removeText: {
    color: COLORS.danger,
    fontWeight: "900",
  },
});