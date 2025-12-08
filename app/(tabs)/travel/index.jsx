// app/(tabs)/Travel.jsx
import { Ionicons } from "@expo/vector-icons";
import {
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
    // Removed activeTab state since tabs are gone
    // Now we always show all travels
    return (
        <>
            {/* Teal Header */}
            <Header title="Travel" />

            {/* White Rounded Container */}
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* Search Bar */}
                <SearchBar placeholder="search" />

                {/* Travel List - Showing all travels directly */}
                {travels.map((travel) => (
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
                                    <Text style={styles.dashes}>-----------</Text>
                                    <Ionicons name="airplane" size={20} color={TEAL} style={styles.airplane} />
                                    <Text style={styles.dashes}>----------&gt;</Text>
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
            <Fab link="/(tabs)/travel/new-travel" />
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

    // Removed all tab-related styles (they're no longer used)
    travelCard: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginTop: 16,
        padding: 12,
        paddingRight: 1,
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
    },
    timeText: {
        fontSize: 10,
        color: "#6C7278",
        marginBottom: 4,
    },
    airportCode: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1F2937",
        marginBottom: 4,
    },
    cityRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    cityText: {
        fontSize: 10,
        color: "#6B7280",
    },
    flag: {
        fontSize: 11,
    },
    dashedLine: {
        flexDirection: "row",
        marginHorizontal: 7,
    },
    dashes: {
        fontSize: 12,
        color: TEAL,
        letterSpacing: 2,
    },
    airplane: {
        marginHorizontal: 6,
    },
});