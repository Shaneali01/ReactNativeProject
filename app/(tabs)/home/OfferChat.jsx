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
import Header from "../../../components/common/Header";

const TEAL = "#008080";

export default function ChatScreen() {
  const { name = "Ali raza" } = useLocalSearchParams();
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
      <Header title="Ali raza" />
      
      {/* Rounded White Container */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.container}>
          {/* Product Card at Top */}
          <View style={styles.offerCard}>
                     {/* Product Title + Date */}
                     <View style={styles.offerHeader}>
                       <Text style={styles.productName}>iPhone 15 Pro Max Black</Text>
                       <Text style={styles.date}>24 july 2025</Text>
                     </View>
         
                     {/* Buyer Info */}
                     <View style={styles.buyerRow}>
                       <Image
                         source={{
                           uri: "https://randomuser.me/api/portraits/men/45.jpg",
                         }}
                         style={styles.buyerAvatar}
                       />
                       <View style={{ flex: 1 }}>
                         <Text style={styles.buyerName}>Ali raza</Text>
                         <View style={styles.ratingRow}>
                           <Ionicons name="star" size={14} color="#FF9500" />
                           <Ionicons name="star" size={14} color="#FF9500" />
                           <Ionicons name="star" size={14} color="#FF9500" />
         
                           <Text style={styles.ratingText}>4.8</Text>
                         </View>
                       </View>
                       <TouchableOpacity onPress={()=>router.push("/(tabs)/home/OfferChat")} style={styles.chatButton}>
                         <Ionicons name="chatbox-ellipses-outline" size={20} color="" />
                       </TouchableOpacity>
                     </View>
         
                     {/* Action Buttons */}
                     <View style={styles.actionButtons}>
                       <TouchableOpacity style={styles.rejectButton}>
                         <Text style={styles.rejectText}>Reject</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.acceptButton}>
                         <Text style={styles.acceptText}>Accept</Text>
                       </TouchableOpacity>
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

  offerCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DCDCDC",
  },
  chatButton: {
        padding: 10,
        backgroundColor: '#D8EBEB',
        borderRadius: 20,
    },
  offerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  productName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#222",
    flex: 1,
  },
  date: {
    fontSize: 8,
    color: "#888",
  },

  buyerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  buyerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
  buyerName: {
    fontSize: 10,
    fontWeight: "600",
    color: "#333",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ratingText: {
    fontSize: 10,
    color: "#555",
    marginLeft: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#aaa",
    marginHorizontal: 10,
  },
  verifiedText: {
    fontSize: 12.5,
    color: TEAL,
    fontWeight: "600",
  },

  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rejectButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: "#ffe6e6",
    alignItems: "center",
    marginRight: 10,
  },
  rejectText: {
    color: "#e74c3c",
    fontWeight: "400",
    fontSize: 12,
  },
  acceptButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: TEAL,
    alignItems: "center",
  },
  acceptText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 12,
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
    paddingVertical: 4,
    borderRadius: 20,
    lineHeight:20,
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
    fontSize: 12, 
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