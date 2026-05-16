import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import Header from "../components/Header";

export default function ChatScreen({ navigation, route }) {
  const profile = route.params?.profile;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: `Hi, this is interest chat with ${profile?.name || "profile"}.`,
      mine: false,
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: message.trim(),
        mine: true,
      },
    ]);

    setMessage("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Chat"
        subtitle={profile?.name || "Matrimony chat"}
        navigation={navigation}
        showBack={true}
        showNotification={false}
        backTo="MainTabs"
      />

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.mine && styles.myBubble]}>
            <Text style={[styles.bubbleText, item.mine && styles.myText]}>
              {item.text}
            </Text>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type message..."
          value={message}
          onChangeText={setMessage}
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Ionicons name="send" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  chatList: { padding: 16 },
  bubble: {
    maxWidth: "78%",
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 18,
    marginBottom: 10,
  },
  myBubble: { alignSelf: "flex-end", backgroundColor: COLORS.primary },
  bubbleText: { color: COLORS.text, fontWeight: "600" },
  myText: { color: COLORS.white },
  inputRow: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: COLORS.white,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.bg,
    borderRadius: 16,
    paddingHorizontal: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});