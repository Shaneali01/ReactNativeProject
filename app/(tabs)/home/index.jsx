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
import Fab from "../../../components/common/Fab";
import TravelContent from "../../../components/home/Travel";

// 1. IMPORT YOUR LOCAL IMAGE HERE
// **IMPORTANT:** You must ensure this path is correct relative to your OrderScreen.js file.
const AirplaneRouteImage = require("../../..//assets/images/airplanedashes.png");

// YOUR ORIGINAL DATA - UNTOUCHED
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
  },
];

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

        <View style={styles.bottomRow}>
          <View style={styles.travelRoute}>
            {/* From City */}
            <Text style={styles.routeText}>{item.from}</Text>
            <Text style={styles.flag}>{item.fromFlag}</Text>

            {/* 2. REPLACED TEXT/DASHES WITH IMAGE */}
            <Image
              source={AirplaneRouteImage}
              style={styles.airplaneIcon} // Using new style for size
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
      return <OrderContent orderData={filteredOrders} />;
    }
    return <TravelContent />;
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
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

        {/* Content */}
        {renderContent()}
      </View>
      {/* FAB - Fixed & Working */}
      <Fab
        link={
          activeTab === "Orders"
            ? "/(tabs)/home/PlaceOrder"
            : "/(tabs)/home/new-travel"
        }
      />
    </SafeAreaView>
  );
};

export default OrderScreen;

// YOUR EXACT ORIGINAL STYLES — MODIFIED TO REMOVE 'dashes' AND ADD 'airplaneIcon'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008080",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 15 : 15,
    paddingBottom: 30,
    backgroundColor: "#008080",
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
    backgroundColor: "#F5F5F5",
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
    height: 80,
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
  new: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  travelRoute: {
    flexDirection: "row",
    alignItems: "center",
    // We kept the justification implicit but it was originally 'space-between' which isn't necessary here
  },
  routeText: {
    fontSize: 12,
    color: "#0000", // This was originally transparent, changing to visible black for common use
    fontWeight: "500",
  },
  flag: {
    fontSize: 11,
    marginHorizontal: 4,
  },
  // REMOVED 'dashes' STYLE
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
  // NEW STYLE FOR THE AIRPLANE IMAGE
  airplaneIcon: {
    width: 90,
    height: 40,
    marginHorizontal: 4,
  },
});
