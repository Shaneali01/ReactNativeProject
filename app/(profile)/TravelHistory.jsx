// app/(tabs)/Profile.jsx
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

const TEAL = "#008080";

export default function Profile() {
  return (
    <>
      {/* Teal Header with Profile Info */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/86.jpg" }}
              style={styles.avatar}
            />
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={16} color="#fff" />
            </View>
          </View>

          <Text style={styles.name}>Ibrar Naveed</Text>
          <Text style={styles.joined}>Joined Date: 29/7/2025</Text>

          <View style={styles.rating}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Ionicons name="star" size={18} color="#FFD700" />
            <Ionicons name="star" size={18} color="#FFD700" />
            <Ionicons name="star" size={18} color="#FFD700" />
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.ratingText}>25</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        {["Personal", "Travel History", "Reviews"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, tab === "Personal" && styles.activeTab]}
          >
            <Text style={[styles.tabText, tab === "Personal" && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Rounded White Container */}
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={18} color={TEAL} />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Info Rows */}
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={22} color="#666" />
          <Text style={styles.infoText}>ibrar.naveed@gmail.com</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={22} color="#666" />
          <Text style={styles.infoText}>0300 0000000</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={22} color="#666" />
          <Text style={styles.infoText}>123 Main St, Cityville</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="document-text-outline" size={22} color="#666" />
          <Text style={styles.infoText}>
            About{"\n"}
            <Text style={styles.aboutText}>
              Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            </Text>
          </Text>
        </View>

        {/* Preferences */}
        <Text style={styles.prefTitle}>Preferences</Text>
        <View style={styles.prefTags}>
          {["Beauty & Personal Care", "Clothing", "Electronics", "Kids & Toys", "Home & Kitchen", "Fashion & Apparel"].map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: TEAL,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
  headerContent: {
    alignItems: "center",
    marginTop: 20,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#fff",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: TEAL,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 12,
  },
  joined: {
    color: "#e0f2f1",
    fontSize: 14,
    marginTop: 4,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },

  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: TEAL,
  },
  tabText: {
    fontSize: 14,
    color: "#999",
  },
  activeTabText: {
    color: TEAL,
    fontWeight: "bold",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  editText: {
    color: TEAL,
    marginLeft: 6,
    fontWeight: "600",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },
  aboutText: {
    color: "#666",
    lineHeight: 20,
  },

  prefTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  prefTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 10,
  },
  tag: {
    backgroundColor: "#e0f2f1",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagText: {
    color: TEAL,
    fontSize: 13,
    fontWeight: "600",
  },
});