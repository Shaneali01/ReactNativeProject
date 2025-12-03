// app/(tabs)/inbox/Chat/index.jsx
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const TEAL = "#008080";

export default function ChatScreen() {
  const { name = "Ibrar Naveed" } = useLocalSearchParams();
  const [message, setMessage] = useState("");
  const scrollViewRef = useRef(null);

  const messages = [
    { id: 1, text: "Let's get lunch. How about pizza?", isMe: true, time: "4:03 PM" },
    { id: 2, text: "Let's do it! I'm in a meeting until noon.", isMe: false, time: "4:05 PM" },
    { id: 3, text: "That's perfect. There's a new place on Main St I've been wanting to check out. I hear their hawaiian pizza is awesome!", isMe: false, time: "4:06 PM" },
    { id: 4, text: "I don't know why people are so anti pineapple pizza. I kind of like it.", isMe: true, time: "4:08 PM" },
  ];

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });
    return () => show.remove();
  }, []);

  return (
    <>
      {/* Teal Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{name}</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Rounded White Container - Same as Inbox/Travel */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.container}>
          {/* Product Card at Top */}
          <View style={styles.productCardWrapper}>
            <View style={styles.productCard}>
              <Image
                source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbbPE8c7mhKZPFQMciGp1GumwMBv_Knv86Ug&s" }}
                style={styles.productImage}
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.productTitle}>iPhone 15 Pro Max</Text>
                <View style={styles.routeRow}>
                  <Text style={styles.airport}>DXB</Text>
                  <Text style={styles.citySmall}>Dubai</Text>
                  <View style={styles.dottedLine} />
                  <Ionicons name="airplane" size={16} color={TEAL} />
                  <View style={styles.dottedLine} />
                  <Text style={styles.airport}>LHR</Text>
                  <Text style={styles.citySmall}>Lahore</Text>
                </View>
              </View>
              <Text style={styles.price}>$139.59</Text>
            </View>
          </View>

          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageWrapper,
                  msg.isMe ? styles.myMessageWrapper : styles.theirMessageWrapper,
                ]}
              >
                <View style={[styles.bubble, msg.isMe ? styles.myBubble : styles.theirBubble]}>
                  <Text style={[styles.messageText, msg.isMe && { color: "#fff" }]}>
                    {msg.text}
                  </Text>
                  <Text style={[styles.time, msg.isMe && { color: "#b2dfdb" }]}>
                    {msg.time}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Input Bar */}
          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder="Message"
              placeholderTextColor="#999"
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity style={{ paddingHorizontal: 8 }}>
              <Ionicons name="mic" size={26} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingHorizontal: 8 }}>
              <Ionicons name="image-outline" size={26} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton}>
              <Ionicons name="send" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    overflow: "hidden",
  },

  header: {
    backgroundColor: TEAL,
    height: 170,
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  productCardWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
  },
  productImage: { width: 56, height: 56, borderRadius: 10 },
  productTitle: { fontSize: 13.5, fontWeight: "bold", color: "#222" },
  routeRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  airport: { fontSize: 14, fontWeight: "bold", color: "#333" },
  citySmall: { fontSize: 10, color: "#777", marginLeft: 4 },
  dottedLine: {
    flex: 1,
    height: 1,
    borderTopWidth: 1.5,
    borderColor: "#ccc",
    borderStyle: "dotted",
    marginHorizontal: 8,
  },
  price: { fontSize: 16, fontWeight: "bold", color: TEAL, marginLeft: 12 },

  messageWrapper: { marginVertical: 6, paddingHorizontal: 16 },
  myMessageWrapper: { alignItems: "flex-end" },
  theirMessageWrapper: { alignItems: "flex-start" },

  bubble: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 22,
  },
  myBubble: { backgroundColor: TEAL, borderBottomRightRadius: 6 },
  theirBubble: { backgroundColor: "#fff", borderBottomLeftRadius: 6 },

  messageText: { fontSize: 15, lineHeight: 21 },
  time: { fontSize: 11, marginTop: 4, alignSelf: "flex-end" },

  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  input: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: TEAL,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});