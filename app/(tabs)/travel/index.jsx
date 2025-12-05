// app/(tabs)/Travel.jsx
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TEAL = "#008080";

const travels = [
    {
        id: 1,
        date: "24 July 2025",
        departureTime: "4:00 PM",
        arrivalTime: "8:00 PM",
        from: "DXB",
        fromCity: "Dubai",
        fromFlag: "🇦🇪",
        to: "LHR",
        toCity: "Lahore",
        toFlag: "🇵🇰",
        status: "Pending",
    },
    {
        id: 2,
        date: "24 July 2025",
        departureTime: "4:00 PM",
        arrivalTime: "8:00 PM",
        from: "DXB",
        fromCity: "Dubai",
        fromFlag: "🇦🇪",
        to: "LHR",
        toCity: "Lahore",
        toFlag: "🇵🇰",
        status: "In Transit",
    },
    {
        id: 3,
        date: "24 July 2025",
        departureTime: "4:00 PM",
        arrivalTime: "8:00 PM",
        from: "DXB",
        fromCity: "Dubai",
        fromFlag: "🇦🇪",
        to: "LHR",
        toCity: "Lahore",
        toFlag: "🇵🇰",
        status: "Dispatched",
    },
];

export default function Travel() {
    const [activeTab, setActiveTab] = useState("All");
    const tabs = ["All", "Pending", "In Transit", "Dispatched"];
    const filteredTravels =
        activeTab === "All" ? travels : travels.filter((t) => t.status === activeTab);
    return (
        <>
            {/* Teal Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Travel</Text>
                <View style={styles.backButton} />
            </View>
            {/* White Rounded Container */}
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <Text style={styles.searchPlaceholder}>Search</Text>
                    <View style={styles.searchIcons}>
                        <Ionicons name="search" size={18} color="#999" />
                        <Ionicons name="options-outline" size={20} color="#999" style={{ marginLeft: 12 }} />
                    </View>
                </View>
                {/* Tabs */}
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    style={styles.tabScrollView}
                    contentContainerStyle={styles.tabContainer}
                >
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, activeTab === tab && styles.activeTab]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === tab && styles.activeTabText,
                                ]}
                            >
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                {/* Travel List */}
                {filteredTravels.map((travel) => (
                    <TouchableOpacity
                        key={travel.id}
                        style={styles.travelCard}
                    >
                        {/* Date */}
                        <Text style={styles.dateText}>{travel.date}</Text>
                        {/* Route Container */}
                        <View style={styles.routeContainer}>
                            {/* Departure */}
                            <View style={styles.locationSection}>
                                <Text style={styles.timeText}>{travel.departureTime}</Text>
                                <Text style={styles.airportCode}>{travel.from}</Text>
                                <View style={styles.cityRow}>
                                    <Text style={styles.cityText}>{travel.fromCity}</Text>
                                    <Text style={styles.flag}>{travel.fromFlag}</Text>
                                </View>
                            </View>
                            {/* Flight Path */}
                            <View style={styles.flightPath}>
                                <View style={styles.dashedLine}>
                                    <Text style={styles.dashes}>- - - - - -</Text>
                                    <Ionicons name="airplane" size={20} color={TEAL} style={styles.airplane} />
                                    <Text style={styles.dashes}>- -  - - -&gt;</Text>
                                </View>
                            </View>
                            {/* Arrival */}
                            <View style={styles.locationSection}>
                                <Text style={styles.timeText}>{travel.arrivalTime}</Text>
                                <Text style={styles.airportCode}>{travel.to}</Text>
                                <View style={styles.cityRow}>
                                    <Text style={styles.cityText}>{travel.toCity}</Text>
                                    <Text style={styles.flag}>{travel.toFlag}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Floating Action Button */}
            <TouchableOpacity style={styles.fab}>
                <Ionicons name="add" size={28} color="#fff" />
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
    },
    header: {
        backgroundColor: TEAL,
        height: 170,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    headerTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
    },

    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginTop: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E5E5",
    },
    searchPlaceholder: {
        color: "#999",
        fontSize: 14,
    },
    searchIcons: {
        flexDirection: "row",
        alignItems: "center",
    },

    tabScrollView: {
        marginTop: 16,
        marginHorizontal: 20,
    },
    tabContainer: {
        flexDirection: "row",
        gap: 8,
        paddingBottom: 4,
    },
    tab: {
        paddingHorizontal: 20,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: "#E5E5E5",
        backgroundColor: "#fff",
    },
    activeTab: {
        backgroundColor: TEAL,
        borderColor: TEAL,
    },
    tabText: {
        fontSize: 13,
        color: "#666",
        fontWeight: "500",
    },
    activeTabText: {
        color: "#fff",
        fontWeight: "600",
    },

    travelCard: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginTop: 16,
        padding: 16,
        paddingRight:1,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    dateText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#1F2937",
        marginBottom: 12,
    },
    routeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    locationSection: {
        // flex: 1,
        // alignItems: "flex-start",
    },
    timeText: {
        fontSize: 11,
        color: "#6B7280",
        marginBottom: 4,
    },
    airportCode: {
        fontSize: 13,
        fontWeight: "700",
        color: "#1F2937",
        marginBottom: 4,
    },
    cityRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,},
    cityText: {
        fontSize: 12,
        color: "#6B7280",
        paddingHorizontal: 0,
    },
    flag: {
        fontSize: 11,
        marginRight:0,
    },
   
    dashedLine: {
        flexDirection: "row",
        marginHorizontal:7
    },
    dashes: {
        fontSize: 12,
        color: TEAL,
        letterSpacing: 2,
    },
    airplane: {
        marginHorizontal: 6,
    },

    fab: {
        position: "absolute",
        right: 20,
        bottom: 90,
        backgroundColor: TEAL,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
});