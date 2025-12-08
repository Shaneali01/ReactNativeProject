// app/(tabs)/Settings.jsx
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../../components/common/Header";

const TEAL = "#008080";

export default function Settings() {
  return (
    <>
      {/* Teal Header */}
     <Header title="Settings" />

      {/* Rounded White Container - Same as Inbox, Travel, etc. */}
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/86.jpg" }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Ibrar Naveed</Text>
            <Text style={styles.joined}>Joined Date: 29/7/2025</Text>
          </View>
        </View>

        {/* My Profile Button */}
        <TouchableOpacity onPress={() => router.push("/(profile)")} style={styles.profileButton}>
          <Text style={styles.profileButtonText}>My Profile</Text>
          <Ionicons name="chevron-forward" size={20} color={TEAL} />
        </TouchableOpacity>

        {/* Menu Items */}
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={24} color="#666" />
            <Text style={styles.menuText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={24} color="#ccc" style={styles.arrow} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="heart-outline" size={24} color="#666" />
            <Text style={styles.menuText}>Preferences</Text>
            <Ionicons name="chevron-forward" size={24} color="#ccc" style={styles.arrow} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="lock-closed-outline" size={24} color="#666" />
            <Text style={styles.menuText}>Privacy</Text>
            <Ionicons name="chevron-forward" size={24} color="#ccc" style={styles.arrow} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="globe-outline" size={24} color="#666" />
            <Text style={styles.menuText}>Language</Text>
            <Ionicons name="chevron-forward" size={24} color="#ccc" style={styles.arrow} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={24} color="#666" />
            <Text style={styles.menuText}>Help</Text>
            <Ionicons name="chevron-forward" size={24} color="#ccc" style={styles.arrow} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="log-out-outline" size={24} color="#666" />
            <Text style={styles.menuText}>Logout</Text>
            <Ionicons name="chevron-forward" size={24} color="#ccc" style={styles.arrow} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  // Same rounded container as all your other screens
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

  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  joined: {
    fontSize: 13,
    color: "#999",
    marginTop: 4,
  },

  profileButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e0f2f1",
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 30,
  },
  profileButtonText: {
    fontSize: 15,
    color: TEAL,
    fontWeight: "600",
  },

  menu: {
    marginTop: 30,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuText: {
    flex: 1,
    marginLeft: 20,
    fontSize: 15,
    color: "#333",
  },
  arrow: {
    marginLeft: 10,
  },
});