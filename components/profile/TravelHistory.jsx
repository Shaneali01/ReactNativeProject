// app/(tabs)/profile/components/TravelHistory.jsx
import { Ionicons } from "@expo/vector-icons";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const TEAL = "#008080";

export default function TravelHistory() {
  const travelHistory = [
    {
      id: 1,
      product: "iPhone 15 Pro Max",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbbPE8c7mhKZPFQMciGp1GumwMBv_Knv86Ug&s",
      from: { code: "DXB", city: "Dubai", flag: "🇦🇪" },
      to: { code: "LHR", city: "Lahore", flag: "🇵🇰" },
      date: "15 Nov 2024",
      price: "$139.59",
      status: "Completed",
    },
    {
      id: 2,
      product: "MacBook Pro 16",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW9n2K8jF9j0bFm5fHxHKvNX_T-qVKxGKqVg&s",
      from: { code: "LHR", city: "London", flag: "🇬🇧" },
      to: { code: "JFK", city: "New York", flag: "🇺🇸" },
      date: "08 Oct 2024",
      price: "$245.00",
      status: "Completed",
    },
    {
      id: 3,
      product: "Sony WH-1000XM5",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9P8qKvNxQXqv7YvEL5ZKqVfKLmJKxGKqVg&s",
      from: { code: "SYD", city: "Sydney", flag: "🇦🇺" },
      to: { code: "SIN", city: "Singapore", flag: "🇸🇬" },
      date: "22 Sep 2024",
      price: "$89.99",
      status: "In Transit",
    },
  ];

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {travelHistory.map((trip) => (
        <View key={trip.id} style={styles.tripCard}>
          {/* Product Info */}
          <View style={styles.productSection}>
            <Image
              source={{ uri: trip.image }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{trip.product}</Text>
              <Text style={styles.dateText}>{trip.date}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{trip.price}</Text>
              <View style={[
                styles.statusBadge,
                trip.status === "In Transit" && styles.statusInTransit
              ]}>
                <Text style={[
                  styles.statusText,
                  trip.status === "In Transit" && styles.statusTextInTransit
                ]}>
                  {trip.status}
                </Text>
              </View>
            </View>
          </View>

          {/* Route Section */}
          <View style={styles.routeSection}>
            <View style={styles.locationBox}>
              <Text style={styles.airportCode}>{trip.from.code}</Text>
              <Text style={styles.cityName}>
                {trip.from.city} {trip.from.flag}
              </Text>
            </View>

            <View style={styles.routeLine}>
              <View style={styles.dottedLine} />
              <Ionicons name="airplane" size={18} color={TEAL} />
              <View style={styles.dottedLine} />
            </View>

            <View style={styles.locationBox}>
              <Text style={styles.airportCode}>{trip.to.code}</Text>
              <Text style={styles.cityName}>
                {trip.to.city} {trip.to.flag}
              </Text>
            </View>
          </View>
        </View>
      ))}

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tripCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },

  productSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: "#999",
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: TEAL,
    marginBottom: 6,
  },
  statusBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusInTransit: {
    backgroundColor: "#FFF3E0",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#4CAF50",
  },
  statusTextInTransit: {
    color: "#FF9800",
  },

  routeSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locationBox: {
    flex: 1,
  },
  airportCode: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 2,
  },
  cityName: {
    fontSize: 12,
    color: "#666",
  },
  routeLine: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1.5,
    paddingHorizontal: 8,
  },
  dottedLine: {
    flex: 1,
    height: 1,
    borderTopWidth: 1.5,
    borderColor: "#d0d0d0",
    borderStyle: "dashed",
  },
});