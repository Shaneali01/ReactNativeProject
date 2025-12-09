// app/(tabs)/profile/index.jsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView, // Keep ScrollView for conditional use
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Reviews from "../../components/profile/Reviews";
import TravelHistory from "../../components/profile/TravelHistory";

const TEAL = "#008080";

export default function ProfileScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Personal");

  const preferences = [
    "Beauty & Personal Care",
    "Clothing",
    "Electronics",
    "Kids & Toys",
    "Home & Kitchen",
    "Fashion & Apparel",
  ];

  // Component to render the Personal Tab content
  const PersonalTabContent = () => (
    <>
      {/* Personal Information Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={16} color={TEAL} />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Email */}
      <View style={styles.infoCard}>
        <View style={styles.iconCircle}>
          <Ionicons name="mail-outline" size={20} color="#666" />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>ibrar.naveed@gmail.com</Text>
        </View>
      </View>

      {/* Phone */}
      <View style={styles.infoCard}>
        <View style={styles.iconCircle}>
          <Ionicons name="call-outline" size={20} color="#666" />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Phone</Text>
          <Text style={styles.infoValue}>0300 0000000</Text>
        </View>
      </View>

      {/* Location */}
      <View style={styles.infoCard}>
        <View style={styles.iconCircle}>
          <Ionicons name="location-outline" size={20} color="#666" />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Location</Text>
          <Text style={styles.infoValue}>123 Main St, Cityville</Text>
        </View>
      </View>

      {/* About */}
      <View style={styles.infoCard}>
        <View style={styles.iconCircle}>
          <Ionicons name="person-outline" size={20} color="#666" />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>About</Text>
          <Text style={styles.aboutText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </Text>
        </View>
      </View>

      {/* Preferences */}
      <View style={styles.infoCard}>
        <View style={styles.iconCircle}>
          <Ionicons name="bookmark-outline" size={20} color="#666" />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Preferences</Text>
          <View style={styles.preferencesContainer}>
            {preferences.map((pref, index) => (
              <View key={index} style={styles.preferenceTag}>
                <Text style={styles.preferenceText}>{pref}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={{ height: 40 }} />
    </>
  );

  return (
    <View style={{ flex: 1, backgroundColor: TEAL }}>
      {/* Header Section (Fixed Part) */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>

        {/* Profile Picture, Name, etc. */}
        <View style={styles.profilePictureContainer}>
          <Image
            source={{ uri: "https://i.pravatar.cc/300?img=12" }}
            style={styles.profilePicture}
          />
          <TouchableOpacity style={styles.cameraButton}>
            <Ionicons name="camera" size={18} color={TEAL} />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>Ibrar Naveed</Text>
        <Text style={styles.joinDate}>Joined Date: 29/7/2025</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons key={star} name="star" size={16} color="#FFD700" />
          ))}
          <Text style={styles.ratingText}>25</Text>
        </View>
      </View>

      {/* White Content Container - This is where we manage scrolling */}
      <View style={styles.contentContainer}>
        {/* Tabs - Positioned to overlap the header */}
        <View style={styles.tabsContainer}>
          {["Personal", "Travel History", "Reviews"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* CONTENT AREA: This section must handle the conditional scrolling */}
        {activeTab === "Personal" && (
          // Use ScrollView ONLY when the content needs to scroll
          <ScrollView 
            style={styles.scrollContent} // Apply scroll-related styles here
            contentContainerStyle={styles.personalScrollContent} // Adjust container style for padding
            showsVerticalScrollIndicator={false}
          >
            <PersonalTabContent />
          </ScrollView>
        )}

        {/* When a VirtualizedList is active, let it handle the entire content area's scrolling */}
        {activeTab === "Travel History" && <TravelHistory />}
        {activeTab === "Reviews" && <Reviews />}
      </View>
    </View>
  );
}


// --- Styles ---
const styles = StyleSheet.create({
  // ... (Header styles remain the same)
  header: {
    backgroundColor: TEAL,
    paddingTop: 50,
    paddingBottom: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  profilePictureContainer: {
    position: "relative",
    marginTop: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "#f0f0f0",
  },
  cameraButton: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "#fff",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: TEAL,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginTop: 12,
  },
  joinDate: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 4,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "600",
  },
  // --- END Header Styles ---

  contentContainer: {
    flex: 1,
    backgroundColor: "#ffff",
    marginTop: -0,
    paddingTop: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // Add these radii here to give it the correct white top
  },

  tabsContainer: {
    position:"absolute",
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
    top: -38,
    left: 0, // Ensure positioning is correct
    right: 0,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 22,
  },
  activeTab: {
    backgroundColor: '#ffff',
  },
  tabText: {
    fontSize: 13,
    color: "#999",
    fontWeight: "600",
  },
  activeTabText: {
    color: "#008080",
    fontWeight: "600",
  },

  // NEW STYLE: This is the outer container for the scrolling content
  scrollContent: {
    flex: 1, // Crucial: Takes up all available space
    marginTop: 30, // Pushes content below the tabs
  },
  // NEW STYLE: This is applied to the content INSIDE the ScrollView
  personalScrollContent: {
    paddingHorizontal: 20, // Add padding to content inside the ScrollView
    paddingTop: 16,
  },

  // ... (Personal Tab Content Styles remain the same)
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  editText: {
    color: TEAL,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },

  infoCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 12,
    color: "#000",
    fontWeight: "500",
  },
  aboutText: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18, // Fixed lineHeight to a number for better text wrapping
  },

  preferencesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  preferenceTag: {
    backgroundColor: "#E0F2F1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  preferenceText: {
    fontSize: 12,
    color: TEAL,
    fontWeight: "500",
  },
});