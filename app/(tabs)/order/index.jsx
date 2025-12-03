// app/(tabs)/Order.jsx
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router"; // <-- ADDED: Needed for navigation
import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const TEAL = "#008080";

const orders = [
    {
        id: 1,
        productName: "iPhone 15 Pro Max",
        price: "$139.99",
        from: "DXB Dubai",
        to: "LHR Lahore",
        seller: "Ahmed Sajjad",
        status: "Purchasing", // Purchasing, Purchased, In-transit, Completed
    },
    {
        id: 2,
        productName: "iPhone 15 Pro Max",
        price: "$139.99",
        from: "DXB Dubai",
        to: "LHR Lahore",
        seller: "Ahmed Sajjad",
        status: "Purchased",
    },
    {
        id: 3,
        productName: "iPhone 15 Pro Max",
        price: "$139.99",
        from: "DXB Dubai",
        to: "LHR Lahore",
        seller: "Ahmed Sajjad",
        status: "In-transit",
    },
    {
        id: 4,
        productName: "iPhone 15 Pro Max",
        price: "$139.99",
        from: "DXB Dubai",
        to: "LHR Lahore",
        seller: "Ahmed Sajjad",
        status: "Completed",
    },
];

export default function Order() {
    const [activeTab, setActiveTab] = useState("All");

    const tabs = ["All", "Purchasing", "Purchased", "In-transit"];

    const filteredOrders =
        activeTab === "All" ? orders : orders.filter((o) => o.status === activeTab);

    const getStatusStyle = (status) => {
        switch (status) {
            case "Purchasing":
                return { bg: "#FFF3E0", text: "#FF8F00" }; // Orange
            case "Purchased":
                return { bg: "#E0F7FA", text: "#00ACC1" }; // Cyan
            case "In-transit":
                return { bg: "#E8F5E9", text: "#43A047" }; // Green
            case "Completed":
                return { bg: "#EDE7F6", text: "#7B1FA2" }; // Purple
            default:
                return { bg: "#F5F5F5", text: "#666" };
        }
    };

    // Define the navigation function
    const goToOrderTracking = () => {
        // Navigates to the /app/(tabs)/order/OrderTracking.jsx screen
        router.push("/(tabs)/order/OrderTracking");
    };

    return (
        <>
            {/* Teal Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Orders</Text>
            </View>

            {/* White Rounded Container */}
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="#999" style={{ marginRight: 10 }} />
                    <Text style={styles.searchPlaceholder}>Search</Text>
                    <Ionicons name="options-outline" size={24} color="#999" />
                </View>

                {/* Tabs */}
                <View style={styles.tabContainer}>
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
                </View>

                {/* Order List */}
                {filteredOrders.map((order) => {
                    const statusStyle = getStatusStyle(order.status);
                    return (
                        <TouchableOpacity
                            key={order.id}
                            style={styles.orderCard}
                            onPress={goToOrderTracking} // <-- CHANGE APPLIED HERE
                        >
                            <Image
                                source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
                                style={styles.productImage}
                            />

                            <View style={styles.orderInfo}>
                                <Text style={styles.productName}>{order.productName}</Text>
                                <Text style={styles.price}>{order.price}</Text>

                                <View style={styles.routeRow}>
                                    <Text style={styles.routeText}>{order.from}</Text>
                                    <Ionicons name="airplane" size={16} color={TEAL} style={{ marginHorizontal: 8 }} />
                                    <Text style={styles.routeText}>{order.to}</Text>
                                </View>

                                <View style={styles.sellerRow}>
                                    <Image
                                        source={{ uri: "https://randomuser.me/api/portraits/men/45.jpg" }}
                                        style={styles.sellerAvatar}
                                    />
                                    <Text style={styles.sellerName}>{order.seller}</Text>
                                </View>
                            </View>

                            <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                                <Text style={[styles.statusText, { color: statusStyle.text }]}>
                                    {order.status === "In-transit" ? "In-transit" : order.status}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Floating Action Button */}
            <TouchableOpacity style={styles.fab}>
                <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
    },
    header: {
        backgroundColor: TEAL,
        height: 170,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },

    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        marginHorizontal: 20,
        marginTop: 20,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 30,
        justifyContent: "space-between",
    },
    searchPlaceholder: {
        flex: 1,
        color: "#aaa",
        fontSize: 15,
        marginLeft: 8,
    },

    tabContainer: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 20,
        backgroundColor: "#f0f0f0",
        borderRadius: 30,
        padding: 6,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 25,
    },
    activeTab: {
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5,
    },
    tabText: {
        fontSize: 13,
        color: "#888",
        fontWeight: "500",
    },
    activeTabText: {
        color: TEAL,
        fontWeight: "600",
    },

    orderCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginTop: 16,
        padding: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#f0f0f0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
        alignItems: "center",
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        marginRight: 14,
    },
    orderInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 15,
        fontWeight: "600",
        color: "#222",
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: TEAL,
        marginVertical: 4,
    },
    routeRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    routeText: {
        fontSize: 12,
        color: "#666",
    },
    sellerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    sellerAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 6,
    },
    sellerName: {
        fontSize: 12,
        color: "#777",
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        alignSelf: "flex-start",
    },
    statusText: {
        fontSize: 11,
        fontWeight: "600",
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
        elevation: 10,
    },
});