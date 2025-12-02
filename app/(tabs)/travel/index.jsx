// app/(tabs)/Travel.jsx
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const TEAL = "#008080";

export default function Travel() {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Pending", "In Transit", "Dispatched"];

  const flights = [
    { date: "24 July 2025", time: "4:00 PM", from: "DXB", fromCity: "Dubai", to: "LHR", toCity: "Lahore" },
    { date: "24 July 2025", time: "6:00 PM", from: "DXB", fromCity: "Dubai", to: "LHR", toCity: "Lahore" },
    { date: "24 July 2025", time: "8:00 PM", from: "DXB", fromCity: "Dubai", to: "LHR", toCity: "Lahore" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Travel</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Compact Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#999" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#aaa"
          style={styles.searchInput}
        />
        <Ionicons name="options-outline" size={22} color="#999" />
      </View>

      {/* Compact Tabs */}
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Compact Flight Cards */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {flights.map((flight, index) => (
          <View key={index} style={styles.flightCard}>
            <Text style={styles.flightDate}>{flight.date}</Text>

            <View style={styles.flightRoute}>
              {/* From */}
              <View style={styles.locationBox}>
                <Text style={styles.time}>{flight.time}</Text>
                <Text style={styles.airportCode}>{flight.from}</Text>
                <Text style={styles.city}>{flight.fromCity}</Text>
              </View>

              {/* Dotted Line + Plane */}
              <View style={styles.lineContainer}>
                <View style={styles.dottedLine} />
                <View style={styles.planeCircle}>
                  <Ionicons name="airplane" size={16} color={TEAL} />
                </View>
              </View>

              {/* To */}
              <View style={[styles.locationBox, styles.toLocation]}>
                <Text style={styles.time}>8:00 PM</Text>
                <Text style={[styles.airportCode, { color: "#fff" }]}>{flight.to}</Text>
                <Text style={[styles.city, { color: "#fff" }]}>{flight.toCity}</Text>
              </View>
            </View>
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Compact FAB */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    backgroundColor: TEAL,
    height: 170,
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  // Compact Search Bar
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 0,
    paddingHorizontal: 12,
    marginTop: 20,
    paddingVertical: 2,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchInput: { flex: 1, fontSize: 12, marginLeft: 8, color: "#333" },

  // Compact Tabs
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#f0f8f8",
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 30,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 26,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  tabText: { fontSize: 11, color: "#666", fontWeight: "600" },
  activeTabText: { color: TEAL, fontWeight: "bold" },

  // Compact Flight Card
  flightCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  flightDate: { fontSize: 10, color: "#999", marginBottom: 6, fontWeight: "600" },

  flightRoute: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationBox: {
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    minWidth: 70,
  },
  toLocation: {
    backgroundColor: TEAL,
  },
  time: { fontSize: 12, fontWeight: "bold", color: "#333", marginBottom: 2 },
  airportCode: { fontSize: 14, fontWeight: "bold", color: "#333" },
  city: { fontSize: 9, color: "#777", marginTop: 1 },

  lineContainer: {
    flex: 1,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginHorizontal: 8,
  },
  dottedLine: {
    position: "absolute",
    width: "100%",
    height: 1.5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "dotted",
  },
  planeCircle: {
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: TEAL,
  },

  // Compact FAB
  fab: {
    position: "absolute",
    right: 16,
    bottom: 24,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: TEAL,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
});