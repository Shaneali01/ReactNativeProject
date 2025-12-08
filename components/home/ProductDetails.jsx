// app/components/home/ProductDetails.jsx
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    Image,
    Linking,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const TEAL = "#008080";

export default function ProductDetailsModal({ visible, onClose }) {
  const productImages = [
    "https://via.placeholder.com/80",
    "https://via.placeholder.com/80",
    "https://via.placeholder.com/80",
    "https://via.placeholder.com/80",
  ];

  const openWebsite = () => {
    Linking.openURL("https://example.com");
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Product Details</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Website Link Button */}
            <TouchableOpacity style={styles.websiteButton} onPress={openWebsite}>
              <Ionicons name="link-outline" size={18} color={TEAL} />
              <Text style={styles.websiteButtonText}>Website Link</Text>
            </TouchableOpacity>

            {/* Product Name and Price */}
            <View style={styles.productHeader}>
              <Text style={styles.productName}>iPhone 15 Pro Max</Text>
              <Text style={styles.productPrice}>$139.59</Text>
            </View>

            {/* Date */}
            <Text style={styles.dateText}>24 July 2025</Text>

            {/* Route Information */}
            <View style={styles.routeContainer}>
              <View style={styles.locationBox}>
                <Text style={styles.airportCode}>DXB</Text>
                <View style={styles.countryRow}>
                  <Text style={styles.countryText}>United Arab Emirates</Text>
                  <Text style={styles.flagEmoji}>🇦🇪</Text>
                </View>
              </View>

              <View style={styles.arrowContainer}>
                <View style={styles.dottedLine} />
                <Ionicons name="airplane" size={20} color="#999" />
                <View style={styles.dottedLine} />
              </View>

              <View style={styles.locationBox}>
                <Text style={styles.airportCode}>LHR</Text>
                <View style={styles.countryRow}>
                  <Text style={styles.countryText}>Pakistan</Text>
                  <Text style={styles.flagEmoji}>🇵🇰</Text>
                </View>
              </View>
            </View>

            {/* Traveler Info */}
            <View style={styles.travelerCard}>
              <Image
                source={{ uri: "https://via.placeholder.com/50" }}
                style={styles.travelerImage}
              />
              <View style={styles.travelerInfo}>
                <View style={styles.travelerNameRow}>
                  <Text style={styles.travelerName}>Ali Raza</Text>
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}>Passport Verified</Text>
                  </View>
                </View>
                <Text style={styles.travelerEmail}>ibrarnaveed@gmail.com</Text>
              </View>
              <TouchableOpacity style={styles.chatButton}>
                <Ionicons name="chatbubble-ellipses" size={22} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Product Images */}
            <View style={styles.imagesContainer}>
              {productImages.map((img, index) => (
                <Image
                  key={index}
                  source={{ uri: img }}
                  style={styles.productImage}
                />
              ))}
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.offerButton}>
                <Text style={styles.offerButtonText}>Make an Offer</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>router.push("/(tabs)/home/ViewDetails")} style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 400,
    maxHeight: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    padding: 20,
  },
  websiteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0F5F5",
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
  },
  websiteButtonText: {
    color: TEAL,
    fontSize: 14,
    fontWeight: "600",
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  dateText: {
    fontSize: 13,
    color: "#999",
    marginBottom: 20,
  },
  routeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  locationBox: {
    flex: 1,
  },
  airportCode: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  countryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  countryText: {
    fontSize: 12,
    color: "#666",
    flex: 1,
  },
  flagEmoji: {
    fontSize: 16,
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dottedLine: {
    width: 20,
    height: 1,
    borderTopWidth: 2,
    borderTopColor: "#ccc",
    borderStyle: "dotted",
  },
  travelerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  travelerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  travelerInfo: {
    flex: 1,
  },
  travelerNameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 8,
  },
  travelerName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  verifiedBadge: {
    backgroundColor: "#C8E6C9",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  verifiedText: {
    fontSize: 9,
    color: "#2E7D32",
    fontWeight: "600",
  },
  travelerEmail: {
    fontSize: 12,
    color: "#666",
  },
  chatButton: {
    backgroundColor: TEAL,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  imagesContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 10,
  },
  offerButton: {
    flex: 1,
    backgroundColor: TEAL,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  offerButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  detailsButton: {
    flex: 1,
    backgroundColor: "#E0F5F5",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  detailsButtonText: {
    color: TEAL,
    fontSize: 14,
    fontWeight: "bold",
  },
});