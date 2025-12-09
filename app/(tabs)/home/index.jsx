import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// NOTE: You MUST ensure these paths are correct relative to your OrderScreen.js file.
// Assuming Fab is in 'components/common/Fab'
import Fab from "../../../components/common/Fab";
// Assuming TravelContent is in 'components/home/Travel'
import TravelContent from "../../../components/home/Travel";

// Update this path to where your image is located
const AirplaneRouteImage = require("../../../assets/images/airplanedashes.png"); 

// --- DUMMY DATA ---
const orderData = [
  {
    id: "1",
    title: "iPhone 15 Pro Max",
    price: "$139.59",
    date: "24 July 2025",
    quantity: 1,
    from: "USA",
    fromFlag: "🇺🇸",
    to: "Pakistan",
    toFlag: "🇵🇰",
    image: "https://images.unsplash.com/photo-1592286927505-b0e2967ddc93?w=200",
    paymentStatus: "Payment Verified",
    Reward: "50",
  },
  {
    id: "2",
    title: "Smart Watch",
    price: "$139.59",
    date: "24 July 2025",
    quantity: 1,
    from: "USA",
    fromFlag: "🇺🇸",
    to: "Pakistan",
    toFlag: "🇵🇰",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200",
    paymentStatus: "Payment Verified",
    Reward: "50",
  },
  {
    id: "3",
    title: "Headphones",
    price: "$139.59",
    date: "24 July 2025",
    quantity: 1,
    from: "USA",
    fromFlag: "🇺🇸",
    to: "Pakistan",
    toFlag: "🇵🇰",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200",
    Reward: "50",
  },
  {
    id: "4",
    title: "Nike Shoes",
    price: "$139.59",
    date: "24 July 2025",
    quantity: 1,
    from: "USA",
    fromFlag: "🇺🇸",
    to: "Pakistan",
    toFlag: "🇵🇰",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
    paymentStatus: "",
    Reward: "50",
  },
];

// --- OrderContent Component (List of Cards) ---
const OrderContent = ({ orderData }) => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardDetails}>
        <View style={styles.titleRow}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.cardPrice}>{item.price}</Text>
        </View>
        <View style={styles.new}>
          <Text style={styles.cardDate}>Date: {item.date}</Text>
          <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
        </View>
        <View style={styles.new}>
          <Text style={item.paymentStatus ? styles.payment : null}>
            {" "}
            {item.paymentStatus}
          </Text>
          <Text style={item.Reward ? styles.reward : null}>
            {" "}
            {item.Reward ? `Reward: $${item.Reward}` : null}{" "}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.travelRoute}>
            {/* From City */}
            <Text style={styles.routeText}>{item.from}</Text>
            <Text style={styles.flag}>{item.fromFlag}</Text>

            {/* Airplane Image */}
            <Image
              source={AirplaneRouteImage}
              style={styles.airplaneIcon} 
              resizeMode="contain"
            />

            {/* To City */}
            <Text style={styles.flag}>{item.toFlag}</Text>
            <Text style={styles.routeText}>{item.to}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={orderData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <View style={styles.emptyList}>
          <Text style={styles.emptyListText}>No Orders found.</Text>
        </View>
      )}
    />
  );
};

// --- OrderScreen Component (Main Screen) ---
const OrderScreen = () => {
  const [activeTab, setActiveTab] = useState("Orders");
  const [searchText, setSearchText] = useState("");
  
  const filteredOrders = orderData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.from.toLowerCase().includes(searchText.toLowerCase()) ||
      item.to.toLowerCase().includes(searchText.toLowerCase())
  );
  
  const renderContent = () => {
    if (activeTab === "Orders") {
      // The Orders tab uses the FlatList inside OrderContent
      return <OrderContent orderData={filteredOrders} />;
    }
    // The Travel tab uses the imported TravelContent
    return <TravelContent />;
  };
  
  return (
    <View style={styles.fullScreenContainer}>
      
      {/* 1. Full-width header background that extends under the status bar */}
      <View style={styles.headerBackground} />

      {/* 2. SafeAreaView wraps the content that needs padding (the header content and main screen) */}
      <SafeAreaView style={styles.safeAreaContent}>
        
        {/* Header Content (Tabs) */}
        <View style={styles.header}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "Orders" && styles.activeTab]}
              onPress={() => setActiveTab("Orders")}
              accessibilityRole="button"
              accessibilityLabel="Show Orders"
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Orders" && styles.activeTabText,
                ]}
              >
                Orders
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "Travel" && styles.activeTab]}
              onPress={() => setActiveTab("Travel")}
              accessibilityRole="button"
              accessibilityLabel="Show Travel Requests"
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Travel" && styles.activeTabText,
                ]}
              >
                Travel
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content Area (Search + List) */}
        <View style={styles.contentArea}>
          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#6C7278"
            />
            <Ionicons
              name="search"
              size={18}
              color="#999"
              style={styles.searchIcon}
            />
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="filter" size={18} color="#008080" />
            </TouchableOpacity>
          </View>

          {/* Content (Orders or Travel) */}
          {renderContent()}
        </View>
      </SafeAreaView>

      {/* FAB Container: POSITIONED ABSOLUTELY ON TOP OF EVERYTHING ELSE */}
      <View style={styles.fabContainer}> 
        <Fab
          link={
            activeTab === "Orders"
              ? "/(tabs)/home/PlaceOrder"
              : "/(tabs)/home/new-travel"
          }
        />
      </View>
    </View>
  );
};

export default OrderScreen;

// --- STYLES ---
const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 140 : 160,
    backgroundColor: "#008080",
    zIndex: 0,
  },
  safeAreaContent: {
    flex: 1,
    zIndex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    padding: 5,
    width: "100%",
    maxWidth: 400,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#008080",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#565656",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "700",
  },
  contentArea: {
    flex: 1,
    backgroundColor: "#FFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -10,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DCDCDC",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    marginHorizontal: 9,
    color: "#6C7278",
  },
  filterButton: {
    paddingLeft: 8,
  },
  listContent: {
    paddingBottom: 100,
  },
  new: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardImage: {
    width: 78,
    height: 82,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#F0F0F0",
    resizeMode: "cover",
  },
  cardDetails: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1C1E",
    flex: 1,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1C1E",
    marginLeft: 8,
  },
  cardDate: {
    fontSize: 10,
    color: "#6C7278",
    marginBottom: 6,
    fontWeight: "400",
  },
  payment: {
    fontSize: 8,
    backgroundColor: "#DBFCE7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    color: "#08843C",
  },
  reward: {
    fontSize: 14,
    fontWeight: "600",
    color: "#08843C",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  travelRoute: {
    flexDirection: "row",
    alignItems: "center",
  },
  routeText: {
    fontSize: 12,
    color: "#000", // Fixed color
    fontWeight: "500",
  },
  flag: {
    fontSize: 11,
    marginHorizontal: 4,
  },
  quantity: {
    fontSize: 10,
    color: "#6B7280",
    fontWeight: "400",
  },
  emptyList: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    padding: 20,
  },
  emptyListText: {
    marginTop: 10,
    fontSize: 16,
    color: "#999",
  },
  airplaneIcon: {
    width: 90,
    height: 40,
    marginHorizontal: 4,
  },
  // --- FAB Fix Style ---
  fabContainer: {
    position: 'absolute',
    bottom: 30, // Position it 30 units from the bottom
    right: 20,  // Position it 20 units from the right
    zIndex: 100, // Ensure it is on top of all other content
  },
});