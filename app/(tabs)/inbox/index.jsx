// app/(tabs)/Inbox.jsx
import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Header from "../../../components/common/Header";
import SearchBar from "../../../components/common/SearchBar";

const TEAL = "#008080";

const chats = [
  { id: 1, name: "Ahmed Sajjad", message: "Your Exotic Veggie Platter is on the menu. Get excited!", time: "11:00 AM", unread: 0 },
  { id: 2, name: "Ahmed Sajjad", message: "Your Exotic Veggie Platter is on the menu. Get excited!", time: "10:00 AM", unread: 2 },
  { id: 3, name: "Ahmed Sajjad", message: "Your Exotic Veggie Platter is on the menu. Get excited!", time: "9:00 AM", unread: 1 },
  { id: 4, name: "Ahmed Sajjad", message: "Your Exotic Veggie Platter is on the menu. Get excited!", time: "Yesterday", unread: 0 },
  { id: 5, name: "Ahmed Sajjad", message: "Your Exotic Veggie Platter is on the menu. Get excited!", time: "Saturday", unread: 0 },
  { id: 6, name: "Ahmed Sajjad", message: "Your Exotic Veggie Platter is on the menu. Get excited!", time: "21/07/2025", unread: 0 },
];

export default function Inbox() {
  return (
    <>
      {/* Teal Header - Outside the rounded container */}
      <Header title="Inbox" />

      {/* Rounded White Container - Exactly like your other screens */}
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Search Bar */}
        <SearchBar/>

        {/* Chat List */}
        {chats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            style={styles.chatItem}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/inbox/Chat",   // Make sure this file exists at app/(tabs)/inbox/Chat/index.jsx
                params: { name: chat.name },
              })
            }
          >
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
              style={styles.avatar}
            />
            <View style={styles.chatInfo}>
              <Text style={styles.name}>{chat.name}</Text>
              <Text style={styles.message} numberOfLines={1}>
                {chat.message}
              </Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.time}>{chat.time}</Text>
              {chat.unread > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{chat.unread}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  // Perfect rounded container - same as PlaceOrder, Travel, etc.
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
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

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    color: "#333",
  },

  chatItem: {
    flexDirection: "row",
    padding: 16,
    paddingLeft:2,
    marginHorizontal: 20,
    marginTop: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 14,
  },
  chatInfo: { flex: 1 },
  name: { fontSize: 14.5, fontWeight: "600", color: "#222" },
  message: { fontSize: 12.5, color: "#666", marginTop: 4 },
  right: { alignItems: "flex-end", justifyContent: "center" },
  time: { fontSize: 11, color: "#999" },
  unreadBadge: {
    backgroundColor: TEAL,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },
  unreadText: { color: "#fff", fontSize: 11, fontWeight: "bold" },
});