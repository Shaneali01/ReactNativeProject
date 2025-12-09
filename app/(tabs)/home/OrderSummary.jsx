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
  View
} from "react-native";
import Header from "../../../components/common/Header";
import ProductDetailsModal from "../../../components/home/ProductDetails";

const TEAL = "#008080";

export default function OrderSummary() {
  const [paymentAdded, setPaymentAdded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddPayment = () => {
    // This is where you would navigate to the payment details screen
    console.log("Navigating to Add Payment Method...");
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
        <View style={styles.productCard}>
          <Image
            source={{ uri: "https://via.placeholder.com/80" }}
            style={styles.productImage}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>iPhone 15 Pro Max</Text>
            <Text style={styles.productDate}>Date: 4 July 2025</Text>
            <View style={styles.routeContainer}>
              <View style={styles.flagBox}>
                <Text style={styles.flagText}>USA</Text>
              </View>
              <View style={styles.dottedLine} />
              <View style={styles.flagBox}>
                <Text style={[styles.flagText, { backgroundColor: TEAL }]}>
                  Pakistan
                </Text>
              </View>
            </View>
            <Text style={styles.quantity}>Quantity: 1</Text>
          </View>
          <Text style={styles.productPrice}>$100</Text>
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
          <Text style={styles.chevronButton}>❯

</Text>
        </TouchableOpacity>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.requestButton}
          onPress={() => router.push("/(tabs)/home/PaymentDetails")}
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
  productCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    alignItems: "center",
  },
  productImage: { width: 80, height: 80, borderRadius: 12, marginRight: 14 },
  productInfo: { flex: 1 },
  productName: { fontSize: 15, fontWeight: "bold", color: "#333" },
  productDate: { fontSize: 11, color: "#999", marginTop: 2 },
  routeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  flagBox: {
    backgroundColor: "#333",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  flagText: { color: "#fff", fontSize: 10, fontWeight: "600" },
  dottedLine: {
    flex: 1,
    height: 1,
    borderTopWidth: 2,
    borderTopColor: "#ccc",
    borderStyle: "dotted",
    marginHorizontal: 10,
  },
  quantity: { fontSize: 12, color: "#666" },
  productPrice: { fontSize: 18, fontWeight: "bold", color: TEAL },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
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
  priceLabel: { fontSize: 14, color: "#6C7278" },
  priceValue: { fontSize: 13, fontWeight: "600", color: "#333" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 10,
  },
  totalLabel: { fontSize: 15, fontWeight: "bold", color: "#333" },
  totalAmount: { fontSize: 18, fontWeight: "bold", color: TEAL },
  
  // Custom button style matching the UI image (white, shadow, rounded)
  paymentButtonUi: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center", // Vertically centers the content (text and chevron)
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  
  // Style for the 'Add Payment Method' text
  paymentLabelBig: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily:"Inter",
    color: "#2C2C2E",
    lineHeight: 24, // Explicit line height helps achieve vertical centering
  },
  
  // Style for the '>' chevron
  chevronButton: {
    fontSize: 17,
    marginLeft: 8,
    color: "#2C2C2E",
    fontWeight: "400",
    lineHeight: 24, // Matches line height of the label for perfect vertical alignment
  },
  
  bottomButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  requestButton: {
    backgroundColor: TEAL,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  requestButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});