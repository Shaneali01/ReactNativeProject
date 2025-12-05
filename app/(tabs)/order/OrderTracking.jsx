// app/(tabs)/OrderTracking.jsx
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TEAL = "#008080";

const trackingData = {
  orderId: "ODR: 854374",
  productName: "iPhone 15 Pro Max",
  from: "DXB Dubai",
  to: "LHR Lahore",
  steps: [
    {
      status: "Purchasing",
      date: "July 20, 2025 | 03:45 pm",
      completed: true,
      icon: "cart",
    },
    {
      status: "Purchased",
      date: "July 22, 2025 | 03:45 pm",
      completed: true,
      icon: "bag-check",
    },
    {
      status: "In-transit",
      date: "July 25, 2025 | 03:45 pm",
      completed: true,
      icon: "airplane",
    },
    {
      status: "Arrived",
      date: "July 25, 2025 | 03:45 pm",
      completed: true,
      icon: "location",
    },
    {
      status: "Dispatched",
      date: "July 27, 2025 | 03:45 pm",
      completed: false,
      icon: "cube",
    },
    {
      status: "Received",
      date: "July 20, 2025 | 03:45 pm",
      completed: false,
      icon: "checkmark-circle",
    },
    {
      status: "Completed",
      date: "July 20, 2025 | 03:45 pm",
      completed: false,
      icon: "thumbs-up",
    },
  ],
};

const getStepColor = (icon) => {
  switch (icon) {
    case "cart":
      return "#FFA726";
    case "bag-check":
      return "#29B6F6";
    case "airplane":
      return "#42A5F5";
    case "location":
      return "#AB47BC";
    case "cube":
      return "#EF5350";
    case "checkmark-circle":
      return "#66BB6A";
    case "thumbs-up":
      return "#9E9E9E";
    default:
      return "#999";
  }
};

export default function OrderTracking() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>
      {/* Teal Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Tracking</Text>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Main White Card */}
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Product Card - Report Button Removed */}
          <View style={styles.productCard}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{trackingData.productName}</Text>
              <View style={styles.routeRow}>
                <Text style={styles.routeText}>{trackingData.from}</Text>
                <Ionicons
                  name="airplane"
                  size={18}
                  color={TEAL}
                  style={{ marginHorizontal: 10 }}
                />
                <Text style={styles.routeText}>{trackingData.to}</Text>
              </View>
            </View>
          </View>

          {/* Barcode */}
          <View style={styles.barcodeContainer}>
            <View style={styles.barcode} />
            <Text style={styles.orderId}>Order Tracking Number</Text>
            <Text style={styles.orderNumber}>{trackingData.orderId}</Text>
          </View>

          <Text style={styles.statusTitle}>Order Status</Text>

          {/* Timeline */}
          <View style={styles.timeline}>
            {trackingData.steps.map((step, index) => {
              const isCompleted = step.completed;
              const isLast = index === trackingData.steps.length - 1;
              const iconColor = getStepColor(step.icon);

              return (
                <View key={index} style={styles.timelineItem}>
                  <View style={styles.timelineLeft}>
                    <View
                      style={[
                        styles.timelineDot,
                        { backgroundColor: isCompleted ? iconColor : "#ddd" },
                      ]}
                    >
                      <Ionicons name={step.icon} size={20} color="#fff" />
                    </View>
                    {!isLast && (
                      <View
                        style={[
                          styles.timelineLine,
                          { backgroundColor: isCompleted ? iconColor : "#eee" },
                        ]}
                      />
                    )}
                  </View>

                  <View style={styles.timelineRight}>
                    <Text
                      style={[
                        styles.stepTitle,
                        { color: isCompleted ? "#222" : "#aaa" },
                      ]}
                    >
                      {step.status}
                    </Text>
                    <Text
                      style={[
                        styles.stepDate,
                        { color: isCompleted ? "#777" : "#ccc" },
                      ]}
                    >
                      {step.date}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Dropdown Menu Modal */}
      <Modal
        transparent
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="flag-outline" size={20} color="#e74c3c" />
              <Text style={styles.menuText}>Report</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="close-circle-outline" size={20} color="#e74c3c" />
              <Text style={[styles.menuText, { color: "#e74c3c" }]}>
                Cancel Order
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: TEAL,
    height: 170,
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "#fff", fontSize: 19, fontWeight: "bold" },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingHorizontal: 20,
  },

  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  productImage: { width: 70, height: 70, borderRadius: 12 },
  productInfo: { flex: 1, marginLeft: 14 },
  productName: { fontSize: 16, fontWeight: "600", color: "#222" },
  routeRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  routeText: { fontSize: 13, color: "#555", fontWeight: "500" },

  barcodeContainer: { alignItems: "center", marginVertical: 24 },
  barcode: {
    width: "100%",
    height: 70,
    backgroundColor: "#000",
    borderRadius: 8,
    marginBottom: 12,
  },
  orderId: { fontSize: 13, color: "#888" },
  orderNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginTop: 4,
  },

  statusTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 20,
  },

  timeline: { marginLeft: 10 },
  timelineItem: { flexDirection: "row", marginBottom: 20 },
  timelineLeft: { alignItems: "center", width: 50 },
  timelineDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  timelineLine: { flex: 1, width: 3, marginTop: 8 },
  timelineRight: { flex: 1, marginLeft: 16, justifyContent: "center" },
  stepTitle: { fontSize: 15, fontWeight: "600" },
  stepDate: { fontSize: 12.5, marginTop: 4 },

  // Modal Menu Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  menuContainer: {
    marginTop: 100,
    marginRight: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    width: 200,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 4,
  },
});
