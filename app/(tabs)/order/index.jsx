// app/(tabs)/Order.jsx
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Fab from "../../../components/common/Fab";
import Header from "../../../components/common/Header";
import SearchBar from "../../../components/common/SearchBar";

const TEAL = "#008080";

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
        productName: "iPhone 15 Pro Max",
        price: "$139.59",
        from: "DXB",
        fromCity: "Dubai",
        fromFlag: "🇦🇪",
        to: "LHR",
        toCity: "Lahore",
        toFlag: "🇵🇰",
        seller: "Ahmed Sajjad",
        status: "In-transit",
    },
    {
        id: 3,
        productName: "iPhone 15 Pro Max",
        price: "$139.59",
        from: "DXB",
        fromCity: "Dubai",
        fromFlag: "🇦🇪",
        to: "LHR",
        toCity: "Lahore",
        toFlag: "🇵🇰",
        seller: "Ahmed Sajjad",
        status: "Completed",
    },
];

export default function Order() {
    // Removed activeTab state since tabs are gone
    // const [activeTab, setActiveTab] = useState("All");

    // Always show all orders now
    const filteredOrders = orders;

    const getStatusStyle = (status) => {
        switch (status) {
            case "Purchasing":
                return { bg: "#FFF3CD", text: "#F59E0B" };
            case "Purchased":
                return { bg: "#DBEAFE", text: "#3B82F6" };
            case "In-transit":
                return { bg: "#DBEAFE", text: "#0EA5E9" };
            case "Completed":
                return { bg: "#D1FAE5", text: "#10B981" };
            default:
                return { bg: "#F5F5F5", text: "#666" };
        }
    };

    const goToOrderTracking = () => {
        router.push("/(tabs)/order/OrderDetails");
    };

    return (
        <>
            <Header title="Orders" />
            {/* White Rounded Container */}
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* Search Bar */}
                <SearchBar />

                {/* Tabs removed – no horizontal ScrollView or tab buttons */}

                {/* Order List */}
                {filteredOrders.map((order) => {
                    const statusStyle = getStatusStyle(order.status);
                    return (
                        <TouchableOpacity
                            key={order.id}
                            style={styles.orderCard}
                            onPress={goToOrderTracking}
                        >
                            <Image
                                source={{ uri: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" }}
                                style={styles.productImage}
                            />

                            <View style={styles.orderInfo}>
                                <View style={styles.topRow}>
                                    <Text style={styles.productName}>{order.productName}</Text>
                                    <Text style={styles.price}>{order.price}</Text>
                                </View>

                                <View style={styles.routeRow}>
                                    <View style={styles.locationBox}>
                                        <Text style={styles.airportCode}>{order.from}</Text>
                                        <View style={styles.cityRow}>
                                            <Text style={styles.cityText}>{order.fromCity}</Text>
                                            <Text style={styles.flag}>{order.fromFlag}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.dashedLine}>
                                        <Text style={styles.dashes}>- - - - -</Text>
                                        <Ionicons name="airplane" size={16} color={TEAL} style={styles.airplane} />
                                        <Text style={styles.dashes}>- - - - -&gt; </Text>
                                    </View>

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
                                        <Ionicons name="person-circle-outline" size={16} color="#999" />
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
                })}
            </ScrollView>

            {/* Floating Action Button */}
            <Fab link="/(tabs)/order/PlaceOrder" />
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
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
    },

    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginTop: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        gap: 10,
    },
    searchPlaceholder: {
        flex: 1,
        color: "#999",
        fontSize: 14,
    },

    // Tab-related styles removed (they are no longer used)
    // tabScrollView, tabContainer, tab, activeTab, tabText, activeTabText removed

    orderCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginTop: 16,
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
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
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 8,
    },
    productName: {
        fontSize: 12,
        fontWeight: "600",
        color: "#1F2937",
        flex: 1,
    },
    price: {
        fontSize: 12,
        fontWeight: "700",
        color: "#1F2937",
        marginLeft: 8,
    },
    routeRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        gap: 4,
    },
    locationBox: {
        alignItems: "flex-start",
    },
    airportCode: {
        fontSize: 10,
        fontWeight: "700",
        color: "#1F2937",
    },
    cityRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    cityText: {
        fontSize: 9,
        color: "#6B7280",
    },
    flag: {
        fontSize: 10,
    },
    dashedLine: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 4,
    },
    dashes: {
        fontSize: 10,
        color: "#008080",
        letterSpacing: 1,
    },
    airplane: {
        marginHorizontal: 2,
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
        color: "#6B7280",
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
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
        elevation: 8,
    },
});