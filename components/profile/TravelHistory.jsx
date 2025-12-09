import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// --- Constants ---
const TEAL = "#008080";
const GRAY_TEXT = "#6B7280";
const SUCCESS_GREEN = "#10B981"; // Used for trip count

// Dummy Image URL for consistency
const PRODUCT_IMAGE_URL =
  "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";

// --- Dummy Data ---
// Using your existing data, but we'll use a hardcoded count (5) for the header
const orders = [
  {
    id: 1,
    productName: "iPhone 15 Pro Max",
    price: "$139.59",
    from: "DXB",
    fromCity: "Dubai",
    fromFlag: "🇦🇪",
    to: "LHR",
    toCity: "Lahore",
    toFlag: "🇵🇰",
    seller: "Ahmed Sajjad",
    status: "Purchasing",
  },
  {
    id: 2,
    productName: "Smart Watch Ultra 2",
    price: "$99.00",
    from: "NYC",
    fromCity: "New York",
    fromFlag: "🇺🇸",
    to: "IST",
    toCity: "Istanbul",
    toFlag: "🇹🇷",
    seller: "Fatima Khan",
    status: "In-transit",
  },
  {
    id: 3,
    productName: "Nike Air Max 270",
    price: "$110.00",
    from: "LHR",
    fromCity: "London",
    fromFlag: "🇬🇧",
    to: "DXB",
    toCity: "Dubai",
    toFlag: "🇦🇪",
    seller: "Ali Akbar",
    status: "Completed",
  },
];

// --- OrderCard Component ---
const OrderCard = ({ order, statusStyle }) => (
  <TouchableOpacity
    key={order.id}
    style={styles.orderCard}
    // onPress={() => router.push(`/order/${order.id}`)}
  >
    <Image
      source={{ uri: PRODUCT_IMAGE_URL }}
      style={styles.productImage}
      resizeMode="cover"
    />

    <View style={styles.orderInfo}>
      <View style={styles.topRow}>
        <Text style={styles.productName} numberOfLines={1}>
          {order.productName}
        </Text>
        <Text style={styles.price}>{order.price}</Text>
      </View>

      <View style={styles.routeRow}>
        {/* START Location (From) */}
        <View style={styles.locationBox}>
          <Text style={styles.airportCode}>{order.from}</Text>
          <View style={styles.cityRow}>
            <Text style={styles.cityText}>{order.fromCity}</Text>
            <Text style={styles.flag}>{order.fromFlag}</Text>
          </View>
        </View>

        {/* Route Visual */}
        <View style={styles.routeVisual}>
          <Text style={styles.dashes}>- - - - -</Text>
          <Ionicons name="airplane" size={16} color={TEAL} style={styles.airplane} />
          <Text style={styles.dashes}>- - - - - &gt;</Text>
        </View>

        {/* END Location (To) */}
        <View style={styles.locationBox}>
          <Text style={styles.airportCode}>{order.to}</Text>
          <View style={styles.cityRow}>
            <Text style={styles.cityText}>{order.toCity}</Text>
            <Text style={styles.flag}>{order.toFlag}</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.sellerRow}>
          <Ionicons name="person-circle-outline" size={16} color={GRAY_TEXT} />
          <Text style={styles.sellerName}>{order.seller}</Text>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
          <Text style={[styles.statusText, { color: statusStyle.text }]}>
            {order.status}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

// --- List Header Component (NEW) ---
const TravelHistoryHeader = () => (
        <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Travel History</Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editText}>5 trips completed</Text>
              </TouchableOpacity>
            </View>
 
);


// --- Main Component ---
export default function TravelHistory() {
  const filteredOrders = orders;

  const getStatusStyle = (status) => {
    switch (status) {
      case "Purchasing":
        return { bg: "#FFF3CD", text: "#F59E0B" }; // Yellow/Orange
      case "In-transit":
        return { bg: "#DBEAFE", text: "#0EA5E9" }; // Light Blue/Bright Blue
      case "Completed":
        return { bg: "#D1FAE5", text: "#10B981" }; // Light Green/Dark Green
      case "Purchased":
        return { bg: "#DBEAFE", text: "#3B82F6" }; // A separate Blue for Purchased
      default:
        return { bg: "#F5F5F5", text: "#666" };
    }
  };

  return (
    <FlatList
      data={filteredOrders}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <OrderCard
          order={item}
          statusStyle={getStatusStyle(item.status)}
        />
      )}
      // 1. ADD THE HEADER COMPONENT HERE
      ListHeaderComponent={TravelHistoryHeader}
      
      // 2. ADJUST listContainer paddingTop to account for the header padding in the parent component
      contentContainerStyle={styles.listContainer} 
      showsVerticalScrollIndicator={false}
    />
  );
}

// --- List Card Styles ---
const styles = StyleSheet.create({
  // Adjusted padding top. The parent ProfileScreen uses 80px space for the tabs,
  // so we reduce the list padding here since the content is now starting lower.
  listContainer: {
    // The previous 80px padding is now handled mostly by the parent's structure 
    // and the ListHeaderComponent. We use a smaller padding for visual space.
    paddingTop: 0, 
    paddingHorizontal: 16, 
    paddingBottom: 100, 
  },
  orderCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 16,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",

    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productImage: {
    width: 80,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#f0f0f0",
  },
  orderInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
  },
  price: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1F2937",
    marginLeft: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
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
    color: '#6C7278',
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  locationBox: {
    alignItems: "flex-start",
  },
  airportCode: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 2,
  },
  cityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cityText: {
    fontSize: 10,
    color: GRAY_TEXT,
  },
  flag: {
    fontSize: 12,
  },
  routeVisual: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 2,
    flex: 1,
    justifyContent: 'center',
  },
  dashes: {
    fontSize: 10,
    color: TEAL,
    letterSpacing: 0.5,
    marginBottom: 15,
  },
  airplane: {
    marginHorizontal: 2,
    marginBottom: 15,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sellerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sellerName: {
    fontSize: 12,
    color: GRAY_TEXT,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 90,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },
});

// --- Header Component Styles (NEW) ---
const headerStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingTop: 16, // Add padding at the top of the list items
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  tripCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  tripCountText: {
    fontSize: 14,
    fontWeight: '600',
    color: SUCCESS_GREEN,
  },
  subtitle: {
    fontSize: 13,
    color: GRAY_TEXT,
  }
});