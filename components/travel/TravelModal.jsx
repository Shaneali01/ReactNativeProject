// components/travel/TravelModal.jsx

import { Ionicons } from "@expo/vector-icons";
import {
    Image,
    Platform // Imported for accurate button positioning
    ,

    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import RNModal from "react-native-modal";

const TEAL = "#008080";
const GRAY_TEXT = "#6C7278";
const PRIMARY_TEXT = "#1A1C1E";
const STAR_COLOR = "#FFC72C";

// Helper component for timeline row
const TimelineRow = ({ time, date, icon, location, airport, showDashedLine }) => (
    <View style={styles.timelineRow}>
        <View style={styles.timeColumn}>
            <Text style={styles.timelineTime}>{time}</Text>
            <Text style={styles.timelineDate}>{date}</Text>
        </View>

        <View style={styles.iconColumn}>
            <Ionicons name={icon} size={18} color={TEAL} />
            {showDashedLine && <View style={styles.dashedLine} />}
        </View>

        <View style={styles.locationColumn}>
            <Text style={styles.cityTextModal}>{location}</Text>
            <Text style={styles.airportText}>{airport}</Text>
        </View>
    </View>
);


const TravelDetailModal = ({ visible, onClose, travel }) => {
    if (!travel) {
        return null;
    }

    // Helper function to render star rating
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

    // Consolidated Traveler Name for profile section
    const travelerFullName = travel.travellerName || travel.name;
    const reviewText = travel.reviews || travel.reviewCount;

    // --- Timeline Data Mapping (Ensuring fields match mock data provided previously) ---
    const departureTime = travel.detailTime1 || travel.departTime;
    const departureDate = travel.detailDate1 || travel.date;
    const departureLocation = `${travel.fromCity} ${travel.fromFlag}`;
    const departureAirport = travel.detailAirport1 || `${travel.fromCity} (${travel.fromCode})`;

    const arrivalTime = travel.detailTime2 || travel.arriveTime;
    const arrivalDate = travel.detailDate2 || travel.date;
    const arrivalLocation = `${travel.toCity} ${travel.toFlag}`;
    const arrivalAirport = travel.detailAirport2 || `${travel.toCity} (${travel.toCode})`;


    return (
        <RNModal
            isVisible={visible}
            onSwipeComplete={onClose} 
            swipeDirection={['down']} 
            onBackdropPress={onClose} 
            onBackButtonPress={onClose} 
            style={styles.modalView} 
            animationIn="slideInUp"
            animationOut="slideOutDown"
        >
            <View style={styles.modalContainer}>
                
                {/* Header Bar */}
                <View style={styles.header}>
                    <View style={styles.headerBar} />
                </View>

                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <Image 
                        source={{ uri: travel.travellerImage || travel.image }} 
                        style={styles.profileImage} 
                    />
                    <TouchableOpacity style={styles.viewProfileButton}>
                        <Text style={styles.viewProfileText}>View Profile</Text>
                    </TouchableOpacity>

                    <Text style={styles.profileName}>{travelerFullName}</Text>
                    <Text style={styles.joinedDate}>
                        Joined Date: {travel.joinedDate}
                    </Text>
                    
                    <View style={styles.ratingRow}>
                        {renderStars(travel.rating)}
                        <Text style={styles.reviewCount}>
                            {reviewText}
                        </Text>
                    </View>
                </View>

                {/* Travel Details Section */}
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
                        
                        {/* 1. Departure Point */}
                        <TimelineRow
                            time={departureTime}
                            date={departureDate}
                            icon="airplane"
                            location={departureLocation}
                            airport={departureAirport}
                            showDashedLine={true}
                        />

                        {/* 2. Arrival Point */}
                        <TimelineRow
                            time={arrivalTime}
                            date={arrivalDate}
                            icon="airplane"
                            location={arrivalLocation}
                            airport={arrivalAirport}
                            showDashedLine={false}
                        />

                    </View>
                </View>

                {/* Message Button (Fixed at bottom) */}
                <TouchableOpacity style={styles.messageButton}>
                    <Ionicons name="chatbox-ellipses-outline" size={20} color="#fff" />
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
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContainer: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        maxHeight: "70%", // Can take up most of the screen
        minHeight: "65%",
        paddingHorizontal: 20,
        paddingBottom: Platform.OS === 'ios' ? 80 : 60, // Add space for fixed button
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

    // --- Profile Section ---
    profileSection: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 8,
    },
    viewProfileButton: {
        position: 'absolute',
        top: 0, 
        right: 0,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: TEAL,
    },
    viewProfileText: {
        fontSize: 10,
        fontWeight: '600',
        color: TEAL,
    },
    profileName: {
        fontSize: 18,
        fontWeight: '700',
        color: PRIMARY_TEXT,
    },
    joinedDate: {
        fontSize: 12,
        color: GRAY_TEXT,
        marginTop: 4,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 10,
    },
    starContainer: {
        flexDirection: 'row',
        marginRight: 8,
    },
    star: {
        marginHorizontal: 1,
    },
    reviewCount: {
        fontSize: 12,
        color: GRAY_TEXT,
    },

    // --- Travel Details Section ---
    travelDetailsContainer: {
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: PRIMARY_TEXT,
        marginBottom: 8,
    },
    detailDateText: {
        fontSize: 12,
        color: PRIMARY_TEXT,
        marginBottom: 4,
    },

    // --- Route Timeline ---
    routeTimeline: {
        marginTop: 15,
    },
    timelineRow: {
        flexDirection: 'row',
        alignItems: 'flex-start', // Ensures alignment starts from the top
        marginBottom: 15, // Increased spacing between rows
    },
    timeColumn: {
        width: 60, // Slightly wider to accommodate time and date
        marginRight: 10,
        alignItems: 'flex-start', // Start alignment for cleaner look
    },
    timelineTime: {
        fontSize: 16,
        fontWeight: '700',
        color: PRIMARY_TEXT,
    },
    timelineDate: {
        fontSize: 10,
        color: GRAY_TEXT,
        marginTop: 2,
    },
    iconColumn: {
        width: 20,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    dashedLine: {
        height: 65, // Adjusted height to match vertical distance
        width: 2,
        backgroundColor: TEAL,
        opacity: 0.5,
        marginTop: 5,
    },
    locationColumn: {
        flex: 1,
        paddingTop: 1, // Slight padding to vertically align city text with icon
    },
    cityTextModal: {
        fontSize: 16,
        fontWeight: '500',
        color: PRIMARY_TEXT,
        // Flags are appended directly to the text now to ensure they stay on one line
    },
    airportText: {
        fontSize: 10,
        color: GRAY_TEXT,
        marginTop: 2,
    },

    // --- Message Button (Fixed) ---
    messageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: TEAL,
        borderRadius: 30,
        paddingVertical: 15,
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 30 : 20,
        left: 20,
        right: 20,
        zIndex: 10,
    },
    messageButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 10,
    }, 
});