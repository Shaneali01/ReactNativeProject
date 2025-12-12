// components/travel/TravelModal.jsx

import { Ionicons } from "@expo/vector-icons";
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import RNModal from "react-native-modal";

// 1. Import the local assets
const UpAirplaneIcon = require('../../assets/images/up-airplane.png'); 
const DownAirplaneIcon = require("../../assets/images/down-airplane.png")

const TEAL = "#008080";
const GRAY_TEXT = "#6C7278";
const PRIMARY_TEXT = "#1A1C1E";
const STAR_COLOR = "#FF9500";
const Secondary = "#1A1C1E"
const Base = "#D8EBEB"

// --- Helper component for timeline row ---
const TimelineRow = ({
    time,
    date,
    icon,
    location,
    airport,
    showDashedLine,
    isLastRow, 
}) => {
    // Determine which icon to use based on the row (Departure or Arrival)
    const currentIconSource = isLastRow ? DownAirplaneIcon : UpAirplaneIcon;

    return (
        <View style={styles.timelineRow}>
            <View style={styles.timeColumn}>
                <Text style={styles.timelineTime} numberOfLines={1}>{time}</Text> 
                <Text style={styles.timelineDate} numberOfLines={1}>{date}</Text>
            </View>

            <View style={styles.iconColumn}>
                {/* Use the dynamically selected PNG Image */}
                <Image source={currentIconSource} style={styles.customIcon} /> 
                
                {showDashedLine && (
                    <View style={styles.dashedLineContainer}>
                        <View style={styles.dashedLine} />
                        {/* Keep the Ionicons arrow for the line/timeline indicator */}
                        {!isLastRow && ( 
                             <Ionicons 
                                 name="arrow-down-outline" 
                                 size={14} 
                                 color={TEAL} 
                                 style={styles.arrowhead} 
                             />
                        )}
                    </View>
                )}
            </View>

            <View style={styles.locationColumn}>
                <Text style={styles.cityTextModal}>{location}</Text>
                <Text style={styles.airportText}>{airport}</Text>
            </View>
        </View>
    );
};

const TravelDetailModal = ({ visible, onClose, travel }) => {
    if (!travel) {
        return null;
    }

    // Helper function to render star rating (unchanged)
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Ionicons
                    key={i}
                    name={i <= rating ? "star" : "star-outline"}
                    size={14}
                    color={STAR_COLOR}
                    style={styles.star}
                />
            );
        }
        return <View style={styles.starContainer}>{stars}</View>;
    };
    
    // Consolidated Traveler Name for profile section (unchanged)
    const travelerFullName = travel.travellerName || travel.name;
    const reviewText = travel.reviews || travel.reviewCount;

    // --- Timeline Data Mapping (unchanged) ---
    const departureTime = travel.detailTime1 || travel.departTime;
    const departureDate = travel.detailDate1 || travel.date;
    const departureLocation = `${travel.fromCity} ${travel.fromFlag}`;
    const departureAirport =
        travel.detailAirport1 || `${travel.fromCity} (${travel.fromCode})`;

    const arrivalTime = travel.detailTime2 || travel.arriveTime;
    const arrivalDate = travel.detailDate2 || travel.date;
    const arrivalLocation = `${travel.toCity} ${travel.toFlag}`;
    const arrivalAirport =
        travel.detailAirport2 || `${travel.toCity} (${travel.toCode})`;

    return (
        <RNModal
            isVisible={visible}
            onSwipeComplete={onClose}
            swipeDirection={["down"]}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            style={styles.modalView}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropOpacity={0.3}
            animationInTiming={400}
            animationOutTiming={400}
        >
            <View style={styles.modalContainer}>
                {/* Header Bar (unchanged) */}
                <View style={styles.header}>
                    <View style={styles.headerBar} />
                </View>

                {/* Profile Section (unchanged) */}
                <View style={styles.profileSection}>
                    <Image
                        source={{
                            uri:
                                "data:image/jpeg;base64,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" || 
                                "data:image/jpeg;base64,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"
                        }}
                        style={styles.profileImage}
                    />
                    {/* View Profile Button (unchanged) */}
                    <TouchableOpacity style={styles.viewProfileButton}>
                        <Text style={styles.viewProfileText}>View Profile</Text>
                    </TouchableOpacity>

                    <Text style={styles.profileName}>{travelerFullName}</Text>
                    <Text style={styles.joinedDate}>
                        Joined Date: 27/03/2025
                    </Text>

                    <View style={styles.ratingRow}>
                        {renderStars(travel.rating)}
                        <Text style={styles.reviewCount}>{reviewText}</Text>
                    </View>
                </View>

                {/* Travel Details Section (unchanged) */}
                <View style={styles.travelDetailsContainer}>
                    <Text style={styles.sectionTitle}>Travel Details</Text>
                    <Text style={styles.detailDateText}>
                        Departs on: {travel.departureDateDetail || travel.date}
                    </Text>
                    <Text style={styles.detailDateText}>
                        Arrives on: {travel.arrivalDateDetail || travel.date}
                    </Text>

                    {/* Route Timeline */}
                    <View style={styles.routeTimeline}>
                        {/* 1. Departure Point: isLastRow={false} will use UpAirplaneIcon */}
                        <TimelineRow
                            time={departureTime}
                            date={departureDate}
                            icon="airplane" 
                            location={departureLocation}
                            airport={departureAirport}
                            showDashedLine={true}
                            isLastRow={false} 
                        />

                        {/* 2. Arrival Point: isLastRow={true} will use DownAirplaneIcon */}
                        <TimelineRow
                            time={arrivalTime}
                            date={arrivalDate}
                            icon="airplane" 
                            location={arrivalLocation}
                            airport={arrivalAirport}
                            showDashedLine={false}
                            isLastRow={true} 
                        />
                    </View>
                </View>

                {/* Message Button (Fixed at bottom) (unchanged) */}
                <TouchableOpacity style={styles.messageButton}>
                    <Ionicons name="chatbox-ellipses-outline" size={20} color={TEAL} />
                    <Text style={styles.messageButtonText}>Message</Text>
                </TouchableOpacity>
            </View>
        </RNModal>
    );
};

export default TravelDetailModal;

// --- STYLES ---
const styles = StyleSheet.create({
    modalView: {
        justifyContent: "flex-end",
        margin: 0,
    },
    modalContainer: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        maxHeight: "75%", 
        minHeight: "65%",
        paddingHorizontal: 20,
        paddingBottom: Platform.OS === "ios" ? 80 : 60, 
    },
    header: {
        alignItems: "center",
        paddingVertical: 10,
    },
    headerBar: {
        width: 40,
        height: 5,
        backgroundColor: "#ccc",
        borderRadius: 2.5,
    },

    // --- Profile Section (unchanged) ---
    profileSection: {
        alignItems: "center",
        paddingVertical: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginBottom: 8,
    },
    viewProfileButton: {
        top: 0,
        right: 0,
        paddingHorizontal: 12,
        paddingVertical: 2,
        borderRadius: 20,
    },
    viewProfileText: {
        fontSize: 12,
        fontWeight: "600",
        fontStyle: "medium",
        color: TEAL,
    },
    profileName: {
        fontSize: 18,
        fontWeight: "500",
        color: Secondary,
    },
    joinedDate: {
        fontSize: 10,
        marginTop: 4,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
        marginBottom: 10,
    },
    starContainer: {
        flexDirection: "row",
        marginRight: 8,
    },
    star: {
        marginHorizontal: 1,
    },
    reviewCount: {
        fontSize: 10,
        color: GRAY_TEXT,
    },

    // --- Travel Details Section (unchanged) ---
    travelDetailsContainer: {
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: "#D9D9D9",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: "500",
        color: PRIMARY_TEXT,
        marginBottom: 2,
    },
    detailDateText: {
        fontSize: 10,
        color: PRIMARY_TEXT,
        marginBottom: 4,
    },

    // --- Route Timeline ---
    routeTimeline: {
        marginTop: 10,
    },
    timelineRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8, 
    },
    timeColumn: {
        width: 85, 
        marginRight: 10,
    },
    timelineTime: {
        fontSize: 12,
        fontWeight: "600",
        color: PRIMARY_TEXT,
        lineHeight: 18, 
        maxWidth: 85, 
        overflow: 'hidden', 
    },
    timelineDate: {
        fontSize: 10,
        color: GRAY_TEXT,
        marginTop: 1,
        lineHeight: 14, 
        maxWidth: 85, 
        overflow: 'hidden', 
        
    },
    iconColumn: {
        width: 30,
        alignItems: "center",
        marginHorizontal: 10,
    },
    // ** CUSTOM PNG Icon Style **
    customIcon: {
        width: 27, 
        height: 27, 
        tintColor: TEAL, 
        resizeMode: 'contain',
        marginTop: 5
    },
    // Continued styles for dashed line and arrowhead (unchanged)
    dashedLineContainer: {
        position: 'relative', 
        height: 100, 
        alignItems: 'center',
    },
    dashedLine: { 
        height: '100%', 
        width: 0, 
        borderLeftWidth: 2, 
        borderStyle: 'dashed', 
        borderLeftColor: TEAL, 
        marginTop: 5,
        opacity: 1,
        backgroundColor: 'transparent', 
    },
    arrowhead: {
        position: 'absolute',
        bottom: -14,
        zIndex: 1,
    },
    locationColumn: {
        flex: 1,
        paddingTop: 1, 
    },
    cityTextModal: {
        fontSize: 10,
        fontWeight: "500",
        color: PRIMARY_TEXT,
        marginLeft: 20
    },
    airportText: {
        fontSize: 10,
        color: GRAY_TEXT,
        marginTop: 2,
        marginLeft: 20
    },

    // --- Message Button (Fixed) (unchanged) ---
    messageButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Base,
        borderRadius: 30,
        paddingVertical: 12,
        position: "absolute",
        bottom: Platform.OS === "ios" ? 30 : 20,
        left: 20,
        right: 20,
        zIndex: 10,
    },
    messageButtonText: {
        color: TEAL,
        fontSize: 12,
        fontWeight: "600",
        marginLeft: 10,
    },
});