// screens/PlaceOrder2.jsx
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../../components/common/Header";

const TEAL = "#008080";

export default function PlaceOrder2() {
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [reward, setReward] = useState("");
  const [withBox, setWithBox] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
     <Header title="Place Order" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* From */}
        <Text style={styles.label}>From</Text>
        <View style={styles.smallInput}>
          <Ionicons name="flag-outline" size={18} color="#999" style={{ marginRight: 8 }} />
          <Text style={styles.smallText}>e.g. USA</Text>
        </View>

        {/* To */}
        <Text style={styles.label}>To</Text>
        <View style={styles.smallInput}>
          <Ionicons name="flag" size={18} color={TEAL} style={{ marginRight: 8 }} />
          <Text style={[styles.smallText, { color: TEAL, fontWeight: "600" }]}>e.g. Pakistan</Text>
        </View>

        {/* Product Price */}
        <Text style={styles.label}>Product Price</Text>
        <View style={styles.priceContainer}>
          <TextInput
            style={styles.smallPriceInput}
            placeholder="Product Price"
            placeholderTextColor="#aaa"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <View style={styles.currencyBox}>
            <Text style={styles.currencyText}>PKR</Text>
            <Ionicons name="chevron-down" size={14} color="#1E1E1E" />
          </View>
        </View>

        {/* Quantity */}
        <Text style={styles.label}>Quantity</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => setQuantity(q => Math.max(1, q - 1))} style={styles.qtyBtn}>
            <Ionicons name="remove" size={18} color="#666" />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(q => q + 1)} style={styles.qtyBtn}>
            <Ionicons name="add" size={18} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Delivery Deadline */}
        <Text style={styles.label}>Delivery Deadline</Text>
        <TouchableOpacity style={styles.smallInput}>
          <Ionicons name="calendar-outline" size={18} color="#999" style={{ marginRight: 8 }} />
          <Text style={styles.placeholderText}>Select date</Text>
        </TouchableOpacity>

        {/* Reward */}
        <Text style={styles.label}>Reward</Text>
        <View style={styles.priceContainer}>
          <TextInput
            style={styles.smallPriceInput}
            placeholder="Add Reward"
            placeholderTextColor="#aaa"
            value={reward}
            onChangeText={setReward}
            keyboardType="numeric"
          />
          <View style={[styles.currencyBox, { backgroundColor: "#f5f5f5" }]}>
            <Ionicons name="gift-outline" size={16} color="#999" />
          </View>
        </View>

        {/* With Box */}
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>With Box</Text>
          <Switch
            value={withBox}
            onValueChange={setWithBox}
            trackColor={{ false: "#ddd", true: TEAL }}
            thumbColor={withBox ? "#fff" : "#f4f4f4"}
            ios_backgroundColor="#ddd"
          />
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* SMALLER BUTTONS */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>router.push("/(tabs)/home/OrderSummary")}  style={styles.placeOrderBtn}>
          <Text style={styles.placeOrderBtnText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  headerTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    marginTop: -20,
  },

  label: {
    marginTop: 14,
    marginBottom: 5,
    fontSize: 10,
    fontWeight: "500",
    color: "#1E1E1E",
    textTransform: "uppercase",
    letterSpacing: 0,
  },

  smallInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 14,
    backgroundColor: "#fff",
  },
  smallText: { fontSize: 10, color: "#666" },
  placeholderText: { fontSize: 10, color: "#aaa" },

  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },
  smallPriceInput: {
    flex: 1,
    paddingHorizontal: 27,
    paddingVertical: 10,
    paddingVertical: 14,
    fontSize: 12,
  },
  currencyBox: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  currencyText: { color: "#1E1E1E", fontWeight: "600", fontSize: 12, marginRight: 4 },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 8,
  },
  qtyBtn: {
    width: 24,
    height: 24,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: { fontSize: 12, fontWeight: "600", marginHorizontal: 24 },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    paddingVertical: 6,
  },
  toggleLabel: { fontSize: 13, color: "#333", fontWeight: "600" },

  // SMALLER BUTTONS
  bottomButtons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,        // Reduced
    backgroundColor: "#fff",
    borderTopColor: "#eee",
    gap: 10,
    marginBottom: 20,
  },
  backBtn: {
    flex: 1,
    paddingVertical: 10,        // Smaller
    borderRadius: 24,           // Slightly smaller
    borderWidth: 1.5,
    borderColor: '#DCDCDC',
    alignItems: "center",
  },
  backBtnText: {
    color: TEAL,
    fontWeight: "500",
    fontSize: 14,  
    paddingVertical: 2,            // Smaller text
  },
  placeOrderBtn: {
    flex: 2,
    backgroundColor:TEAL ,
    paddingVertical: 12,        // Smaller
    borderRadius: 24,           // Smaller radius
    alignItems: "center",
  },
  placeOrderBtnText: {
    color: "#fff",
    fontSize: 14,               // Smaller text
    fontWeight: "500",
  },
});