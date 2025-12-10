// app/(tabs)/inbox/Offer.jsx
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../../components/common/Header";
import SearchBar from "../../../components/common/SearchBar";

const TEAL = "#008080";

const offers = [
  {
    id: 1,
    productName: "iPhone 15 Pro Max Black",
    buyerName: "Ali Raza",
    buyerRating: 4.8,
    date: "24 July 2025",
    paymentVerified: true,
    status: "pending", // pending, accepted, rejected
  },
  {
    id: 2,
    productName: "Hammer Wireless Headphone",
    buyerName: "Hamza Hussain",
    buyerRating: 4.9,
    date: "22 July 2025",
    paymentVerified: true,
    status: "pending",
  },
  {
    id: 3,
    productName: "Airbud 690 ION Wireless Earbuds",
    buyerName: "Ahmed Sajjad",
    buyerRating: 5.0,
    date: "20 July 2025",
    paymentVerified: true,
    status: "pending",
  },
];

export default function Offer() {
  const [activeTab, setActiveTab] = useState("Recent");

  const filteredOffers =
    activeTab === "Recent"
      ? offers.filter((o) => o.status === "pending")
      : offers.filter((o) => o.status !== "pending");

  return (
    <>
      {/* Teal Header */}
   <Header title="Offers" />

      {/* Main White Rounded Container */}
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Search Bar */}
       <SearchBar/>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Recent" && styles.activeTab]}
            onPress={() => setActiveTab("Recent")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Recent" && styles.activeTabText,
              ]}
            >
              Recent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Previous" && styles.activeTab]}
            onPress={() => setActiveTab("Previous")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Previous" && styles.activeTabText,
              ]}
            >
              Previous
            </Text>
          </TouchableOpacity>
        </View>

        {/* Offer List */}
        {filteredOffers.map((offer) => (
          <View key={offer.id} style={styles.offerCard}>
            {/* Product Title + Date */}
            <View style={styles.offerHeader}>
              <Text style={styles.productName}>{offer.productName}</Text>
              <Text style={styles.date}>{offer.date}</Text>
            </View>

            {/* Buyer Info */}
            <View style={styles.buyerRow}>
              <Image
                source={{ uri: "https://randomuser.me/api/portraits/men/45.jpg" }}
                style={styles.buyerAvatar}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.buyerName}>{offer.buyerName}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                                    <Ionicons name="star" size={14} color="#FFD700" />
                  <Ionicons name="star" size={14} color="#FFD700" />

                  <Text style={styles.ratingText}>{offer.buyerRating}</Text>
                </View>
              </View>
              <Ionicons name="chatbubble-outline" size={22} color={TEAL} />
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
        ))}
      </ScrollView>
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
  },

  header: {
    backgroundColor: TEAL,
    height: 170,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#eee",
  },
  searchPlaceholder: {
    marginLeft: 10,
    color: "#aaa",
    fontSize: 15,
  },

  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 100,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 100,
  },
  activeTab: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 12,
    color: "#888",
  },
  activeTabText: {
    color: TEAL,
    fontWeight: "600",
  },

  offerCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
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
    fontSize: 12,
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
    fontWeight: "600",
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
    fontWeight: "600",
    fontSize: 12,
  },
});