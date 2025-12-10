// app/(tabs)/home/OrderScreen.jsx

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

// New component import
import FilterModal from "../../../components/home/FilterModal";
import OfferModal from "../../../components/Offer/OfferModal"; // 👈 New Import

import Fab from "../../../components/common/Fab";
import TravelContent from "../../../components/home/Travel";

const AirplaneRouteImage = require("../../../assets/images/airplanedashes.png"); 
const TEAL = "#008080";

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
    category: "Electronics",
    Reward: 50, 
    paymentVerified: true,
    // Dummy data for OfferModal details
    buyerName: "Ali Raza",
    buyerEmail: "aliraza@gmail.com",
    buyerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    websiteLink: "https://www.apple.com/iphone-15-pro-max/",
    originCode: "DXB",
    destinationCode: "LHR",
    originCity: "Dubai, UAE",
    destinationCity: "Lahore, Pakistan",
    extraImages: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200", 
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200",
      "https://images.unsplash.com/photo-1592286927505-b0e2967ddc93?w=200"
    ]
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
    category: "Clothing",
    Reward: 50,
    paymentVerified: false,
    // Dummy data for OfferModal details
    buyerName: "Sara Khan",
    buyerEmail: "sara@gmail.com",
    buyerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29329?w=200",
    websiteLink: "https://www.smartwatch.com/",
    originCode: "JFK",
    destinationCode: "DEL",
    originCity: "New York, USA",
    destinationCity: "Delhi, India",
    extraImages: []
  },
  // ... other order data remains the same
];


// --- OrderContent Component (List of Cards) ---
// Added onCardPress handler
const OrderContent = ({ orderData, onCardPress }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onCardPress(item)} activeOpacity={0.8}>
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
            <Text style={styles.category}>
              {" "}
              {item.category}{" "}
            </Text>
            <Text style={item.Reward ? styles.reward : null}>
              {" "}
              {item.Reward ? `Reward: $${item.Reward}` : null}{" "}
            </Text>
          </View>
          <View style={styles.new}>
            <Text style={styles.cardDate}>Date: {item.date}</Text>
            <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
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
    </TouchableOpacity>
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
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false); // Renamed for clarity
  const [isOfferModalVisible, setIsOfferModalVisible] = useState(false); // 👈 New State
  const [selectedOrder, setSelectedOrder] = useState(null); // 👈 New State
  const [appliedFilters, setAppliedFilters] = useState({});

  const filteredOrders = orderData.filter((item) => {
    // ... filtering logic remains the same ...
    const searchMatch =
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.from.toLowerCase().includes(searchText.toLowerCase()) ||
      item.to.toLowerCase().includes(searchText.toLowerCase());

    if (!searchMatch) return false;

    if (appliedFilters.fromLocation && item.from.toLowerCase().indexOf(appliedFilters.fromLocation.toLowerCase()) === -1) {
      return false;
    }
    if (appliedFilters.toLocation && item.to.toLowerCase().indexOf(appliedFilters.toLocation.toLowerCase()) === -1) {
      return false;
    }
    if (appliedFilters.productCategory && item.category !== appliedFilters.productCategory) {
      return false;
    }
    if (appliedFilters.rewardAmount && item.Reward < appliedFilters.rewardAmount) {
      return false;
    }
    if (appliedFilters.paymentVerified === true && item.paymentVerified !== true) {
        return false;
    }

    return true;
  });

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
  };
  
  const handleResetFilters = () => {
    setAppliedFilters({});
    setSearchText("");
  };

  const handleOrderCardPress = (order) => { // 👈 New handler
    setSelectedOrder(order);
    setIsOfferModalVisible(true);
  };

  const closeOfferModal = () => { // 👈 New handler
    setIsOfferModalVisible(false);
    setSelectedOrder(null);
  };

  const renderContent = () => {
    if (activeTab === "Orders") {
      return <OrderContent orderData={filteredOrders} onCardPress={handleOrderCardPress} />; // 👈 Pass handler
    }
    return <TravelContent />;
  };
  
  return (
    <View style={styles.fullScreenContainer}>
      
      <View style={styles.headerBackground} />

      <SafeAreaView style={styles.safeAreaContent}>
        
        {/* Header Content (Tabs) */}
        {/* ... (Tabs JSX remains the same) ... */}
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
            <TouchableOpacity 
              style={styles.filterButton} 
              onPress={() => setIsFilterModalVisible(true)}
            >
              <Ionicons name="options-outline" size={18} color={TEAL} />
            </TouchableOpacity>
          </View>

          {/* Content (Orders or Travel) */}
          {renderContent()}
        </View>
      </SafeAreaView>

      {/* FAB Container */}
      <View style={styles.fabContainer}> 
        <Fab
          link={
            activeTab === "Orders"
              ? "/(tabs)/home/PlaceOrder"
              : "/(tabs)/home/new-travel"
          }
        />
      </View>
      
      {/* 1. Filter Modal */}
      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {/* 2. Offer/Details Modal */}
      <OfferModal
        visible={isOfferModalVisible}
        onClose={closeOfferModal}
        order={selectedOrder} // 👈 Pass the selected order data
      />

    </View>
  );
};

export default OrderScreen;

// --- STYLES ---
// ... (Styles remain the same) ...
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
    backgroundColor: TEAL, // Use TEAL constant
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
    backgroundColor: TEAL, // Use TEAL constant
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
marginTop:4
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFF",
    borderRadius: 12,
    padding: 12,
paddingBottom:2,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardImage: {
    width: 78,
    height: 90,
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
    fontSize: 12,
    fontWeight: "600",
    color: "#1A1C1E",
    flex: 1,
  },
  cardPrice: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1A1C1E",
    marginLeft: 8,
  },
  cardDate: {
    fontSize: 8,
    color: "#6C7278",
    marginBottom: 0,
    fontWeight: "400",
  },
  category: {
    fontSize: 8,
    backgroundColor: "#EEEEEE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    color: "#1E1E1E",
  },
  reward: {
    fontSize: 12,
    fontWeight: "500",
    color: "#08843C",
    lineHeight: 14,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
marginBottom: 4
  },
  travelRoute: {
    flexDirection: "row",
    alignItems: "center",
marginLeft:14
  },
  routeText: {
    fontSize: 10,
    color: "#000",
    fontWeight: "500",
marginTop:-5,
  },
  flag: {
    fontSize: 9,
    marginHorizontal: 4,
marginTop:-5
  },
  quantity: {
    fontSize: 8,
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
    fontSize: 14,
    color: "#999",
  },
  airplaneIcon: {
    width: 90,
    height: 40,
    marginHorizontal: 4,
marginTop:-5
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 100,
  },
});