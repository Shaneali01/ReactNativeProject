// app/(tabs)/Travel.jsx
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Fab from "../../../components/common/Fab";
import Header from "../../../components/common/Header";
// import SearchBar from "../../../components/common/SearchBar"; // 👈 SearchBar import removed

const TEAL = "#008080";

const travels = [
    {
        id: 1,
        date: "24 July 2025",
        departureTime: "4:00 PM",
        arrivalTime: "8:00 PM",
        from: "DXB",
        fromCity: "Dubai,UAE",
        fromFlag: "🇦🇪",
        to: "LHR",
        toCity: "Lahore, Pakistan",
        toFlag: "🇵🇰",
        status: "Pending", // 👈 Status for Upcoming
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
        status: "In Transit", // 👈 Status for Current
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
        status: "Dispatched", // 👈 Status for Previous (Completed)
    },
    {
        id: 4,
        date: "10 Dec 2025",
        departureTime: "10:00 AM",
        arrivalTime: "1:00 PM",
        from: "JFK",
        fromCity: "New York",
        fromFlag: "🇺🇸",
        to: "CDG",
        toCity: "Paris",
        toFlag: "🇫🇷",
        status: "Pending", // Another Upcoming trip
    },
    {
        id: 5,
        date: "01 Jan 2025",
        departureTime: "1:00 PM",
        arrivalTime: "5:00 PM",
        from: "LAX",
        fromCity: "Los Angeles",
        fromFlag: "🇺🇸",
        to: "HNL",
        toCity: "Honolulu",
        toFlag: "🇺🇸",
        status: "Dispatched", // Another Previous trip
    },
];

// Map tab names to the corresponding status values for filtering
const tabStatusMap = {
    Upcoming: ["Pending"],
    Current: ["In Transit"],
    Previous: ["Dispatched"],
};

export default function Travel() {
    const [activeTab, setActiveTab] = useState("Current");

    // 👈 Logic to filter travels based on the active tab
    const filteredTravels = travels.filter((travel) =>
        tabStatusMap[activeTab].includes(travel.status)
    );

    // 👈 Tab component to render the custom tab bar
    const TabBar = () => (
        <View style={styles.tabContainer}>
            {Object.keys(tabStatusMap).map((tab) => (
                <TouchableOpacity
                    key={tab}
                    style={[
                        styles.tab,
                        activeTab === tab && styles.activeTab,
                    ]}
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
    );

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
                {/* 👈 Insert the Tab Bar here */}
                <TabBar />

                {/* Search Bar was here - now removed */}

                {/* Travel List - Now showing only filtered travels */}
                {filteredTravels.length > 0 ? (
                    filteredTravels.map((travel) => (
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
                                    <Text style={styles.timeText}>
                                        {travel.departureTime}
                                    </Text>
                                    <Text style={styles.airportCode}>
                                        {travel.from}
                                    </Text>
                                    <View style={styles.cityRow}>
                                        <Text style={styles.cityText}>
                                            {travel.fromCity}
                                        </Text>
                                        <Text style={styles.flag}>
                                            {travel.fromFlag}
                                        </Text>
                                    </View>
                                </View>

                                {/* Flight Path */}
                                <View style={styles.flightPath}>
                                    <View style={styles.dashedLine}>
                                        <Text style={styles.dashes}>
                                            -----------
                                        </Text>
                                        <Ionicons
                                            name="airplane"
                                            size={20}
                                            color={TEAL}
                                            style={styles.airplane}
                                        />
                                        <Text style={styles.dashes}>
                                            ----------&gt;
                                        </Text>
                                    </View>
                                </View>

                                {/* Arrival */}
                                <View style={styles.locationSection}>
                                    <Text style={styles.timeText}>
                                        {travel.arrivalTime}
                                    </Text>
                                    <Text style={styles.airportCode}>
                                        {travel.to}
                                    </Text>
                                    <View style={styles.cityRow}>
                                        <Text style={styles.cityText}>
                                            {travel.toCity}
                                        </Text>
                                        <Text style={styles.flag}>
                                            {travel.toFlag}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noTravelsText}>
                        No {activeTab} trips found.
                    </Text>
                )}
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

    // 👈 Tab Bar Styles
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#EEEEEE", // Light gray background for the overall bar
        borderRadius: 50,
        marginHorizontal: 20,
        padding: 5,
        marginTop: 20, // Add some top margin below the header
        // marginBottom: 10, // Adjusted to match spacing after SearchBar removal
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 50,
        alignItems: "center",
        // The default background is the container's background
    },
    activeTab: {
        backgroundColor: "#fff", // White background for the active tab
        // Shadow for the 'popped out' effect
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tabText: {
        fontSize: 12,
        fontWeight: "500",
        color: "#6C7278", // Darker gray for inactive text
    },
    activeTabText: {
        color: "#000", // Black for active text
        fontWeight: "600",
    },

    // No Travels Text
    noTravelsText: {
        textAlign: "center",
        marginTop: 30,
        fontSize: 16,
        color: "#6C7278",
    },
    
    // Existing styles
    travelCard: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginTop: 16,
        padding: 11,
        paddingRight: 1,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#DCDCDC",
    },
    dateText: {
        fontSize: 10,
        fontWeight: "600",
        color: "#1A1C1E",
        marginBottom: 6,
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
        fontSize: 8,
        color: "#6C7278",
        marginBottom: 4,
    },
    airportCode: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000000",
        marginBottom: 4,
    },
    cityRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    cityText: {
        fontSize: 8,
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