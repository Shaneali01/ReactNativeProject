// app/(tabs)/home/OrderSummary.jsx
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../../components/common/Header";
import ProductDetailsModal from "../../../components/home/ProductDetails";

const TEAL = "#008080";

export default function OrderSummary() {
  const [paymentAdded, setPaymentAdded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const AirplaneRouteImage = require("../../../assets/images/airplanedashes.png"); 


  const handleAddPayment = () => {
    router.push("/(tabs)/home/PaymentDetails");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <Header title="Order Summary" />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Product Card */}
        <View style={styles.card}>
        <Image source={{ uri: "https://images.unsplash.com/photo-1592286927505-b0e2967ddc93?w=200" }} style={styles.cardImage} />
        <View style={styles.cardDetails}>
          <View style={styles.titleRow}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              iphone 15 pro Max
            </Text>
            <Text style={styles.cardPrice}>$100</Text>
          </View>
          <View style={styles.new}>
            <Text style={styles.category}>
              {" "}
              Electronics{" "}
            </Text>
            <Text style={ styles.reward}>
              {" "}
              Reward: $100{" "}
            </Text>
          </View>
          <View style={styles.new}>
            <Text style={styles.cardDate}>Date: 24 July 2025</Text>
            <Text style={styles.quantity}>Quantity: 2</Text>
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.travelRoute}>
              {/* From City */}
              <Text style={styles.routeText}>Lahore</Text>
              <Text style={styles.flag}>flag</Text>

              {/* Airplane Image */}
              <Image
                source={AirplaneRouteImage}
                style={styles.airplaneIcon} 
                resizeMode="contain"
              />

              {/* To City */}
              <Text style={styles.flag}>America</Text>
              <Text style={styles.routeText}>flag</Text>
            </View>
          </View>
        </View>
      </View>

        {/* Price Summary */}
        <Text style={styles.sectionTitle}>Price Summary</Text>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Product Price</Text>
          <Text style={styles.priceValue}>$100.00</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>US Sales Tax</Text>
          <Text style={styles.priceValue}>$8.00</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Est. Traveler Reward</Text>
          <Text style={[styles.priceValue, { color: TEAL }]}>$19.50</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>GrabGo Fee</Text>
          <Text style={styles.priceValue}>$12.09</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Estimated Total</Text>
          <Text style={styles.totalAmount}>$139.59</Text>
        </View>

        {/* Payment Button (Styled to match UI) */}
        <TouchableOpacity
          style={styles.paymentButtonUi}
          onPress={handleAddPayment}
        >
          <Text style={styles.paymentLabelBig}>Add Payment Method</Text>
          <Text style={styles.chevronButton}>❯</Text>
        </TouchableOpacity>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.requestButton}
        >
          <Text style={styles.requestButtonText}>Request Delivery Offer</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <ProductDetailsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
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
marginTop: 20
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
new: {
    flexDirection: "row",
    justifyContent: "space-between",
marginTop:4
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
  sectionTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 10,
    fontWeight: "500",
    color: "#1E1E1E",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  priceLabel: { fontSize: 12, color: "#6C7278" },
  priceValue: { fontSize: 11, fontWeight: "600", color: "#333" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 10,
  },
  totalLabel: { fontSize: 13, fontWeight: "bold", color: "#333" },
  totalAmount: { fontSize: 16, fontWeight: "bold", color: TEAL },

  // Custom button style matching the UI image (white, shadow, rounded)
  paymentButtonUi: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center", // Vertically centers the content (text and chevron)
    backgroundColor: "#fff",
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },

  // Style for the 'Add Payment Method' text
  paymentLabelBig: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Inter",
    color: "#2C2C2E",
    lineHeight: 24, // Explicit line height helps achieve vertical centering
  },

  // Style for the '>' chevron
  chevronButton: {
    fontSize: 10,
    marginLeft: 14,
    color: "#6C7278",
    fontWeight: "200",
    lineHeight: 24, // Matches line height of the label for perfect vertical alignment
  },

  bottomButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopColor: "#eee",
    marginBottom: 50,
  },
  requestButton: {
    backgroundColor: TEAL,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  requestButtonText: { color: "#fff", fontSize: 12, fontWeight: "bold",fontStyle:"medium",lineHeight:'140%' },
});
