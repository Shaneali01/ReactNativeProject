import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
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
import AirplaneRouteImage from "../../../assets/images/airplanedashes.png";
import Header from "../../../components/common/Header";

const TEAL = "#008080";

export default function ChatScreen() {
  const { name = "Ibrar Naveed" } = useLocalSearchParams();
  const [message, setMessage] = useState("");
  const scrollViewRef = useRef(null);

  // Note: message 1 is yours (isMe: true), messages 2, 3, 4 are theirs (isMe: false)
  const messages = [
    { id: 1, text: "Let's get lunch. How about pizza?", isMe: true, time: "4:03 PM" },
    { id: 2, text: "Let's do it! I'm in a meeting until noon.", isMe: false, time: "4:28 PM" },
    { id: 3, text: "That's perfect. There's a new place on Main St I've been wanting to check out. I hear their hawaiian pizza is awesome!", isMe: false, time: "4:06 PM" },
    { id: 4, text: "I don't know why people are so anti pineapple pizza. I kind of like it.", isMe: false, time: "4:08 PM" },
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
      <Header title="Ibrar Naveed" />
      
      {/* Rounded White Container */}
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
                <View style={styles.new}>
                    <Text style={styles.productTitle}>iPhone 15 Pro Max</Text>
                  <Text style={styles.price}>$139.59</Text>

                </View>
              
                <View style={styles.routeRow}>
                  <Text style={styles.airport}>DXB</Text>
                <Image
                      source={AirplaneRouteImage}
                      style={styles.airplaneIcon} // Using new style for size
                      resizeMode="contain"
                    />
                  <Text style={styles.airport}>LHR</Text>
                </View>
                <View style={styles.new}>
                      <Text style={styles.citySmall}>Dubai 🇦🇪</Text>
                      <Text style={styles.citySmall}>Lahore 🇵🇰</Text>

                </View>
              </View>
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
                {/* Avatar for received messages */}
                {!msg.isMe && (
                  <Image
                    source={{ uri: "https://i.pravatar.cc/150?img=12" }}
                    style={styles.avatar}
                  />
                )}
                
                <View style={[styles.bubble, msg.isMe ? styles.myBubble : styles.theirBubble]}>
                  {/* TEXT COLOR UPDATE: Their text is white, My text is default dark (#1E1E1E) */}
                  <Text style={[styles.messageText, !msg.isMe && { color: "#fff" }]}> 
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
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Message"
                placeholderTextColor="#999"
                value={message}
                onChangeText={setMessage}
                multiline
              />
            </View>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="mic-outline" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="attach-outline" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton}>
              <Ionicons name="send" size={20} color="#fff" />
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
  new:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
  },
  productImage: { 
    width: 78, 
    height: 80, 
    borderRadius: 8 
  },
  productTitle: { 
    fontSize: 14, 
    fontWeight: "bold", 
    color: "#1A1C1E" 
  },
  routeRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginTop: 6 
  },
  airport: { 
    fontSize: 13, 
    fontWeight: "bold", 
    color: "#333" 
  },
  citySmall: { 
    fontSize: 10, 
    color: "#000000", 
    marginLeft: 4 
  },
  dottedLine: {
    flex: 1,
    height: 1,
    borderTopWidth: 1,
    borderColor: "#ccc",
    borderStyle: "dashed",
    marginHorizontal: 6,
  },
  price: { 
    fontSize: 14, 
    fontWeight: "bold", 
    color: '#1A1C1E', 
    marginLeft: 12 
  },

  messageWrapper: { 
    marginTop: 12,
    marginVertical: 4, 
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  myMessageWrapper: { 
    justifyContent: "flex-end" 
  },
  theirMessageWrapper: { 
    justifyContent: "flex-start" 
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: "#e0e0e0",
  },

  bubble: {
    maxWidth: "75%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  myBubble: { 
    backgroundColor: '#D8EBEB', 
    borderBottomRightRadius: 4 
  },
  theirBubble: { 
    backgroundColor: "#008080", 
    borderBottomLeftRadius: 4 
  },

  messageText: { 
    fontSize: 15, 
    lineHeight: 21,
    color: "#1E1E1E", // Default text color is dark/black (for 'my' messages)
  },
  time: { 
    fontSize: 10, 
    marginTop: 4, 
    alignSelf: "flex-end",
    color: "#ffff",
  },

  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    marginRight: 8,
  },
  input: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 100,
    color: "#222",
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButton: {
    backgroundColor: TEAL,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  airplaneIcon: {
    width: 120,
    height: 40,
    marginHorizontal: 30,
  }, 
});