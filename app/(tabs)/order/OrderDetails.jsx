// app/(tabs)/home/ViewDetails.jsx
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    Dimensions,
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const TEAL = "#008080";
const { width } = Dimensions.get("window");

export default function ViewDetails() {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const productImages = [
        "https://cdn.mos.cms.futurecdn.net/yDn3ZSXu9eSBxmXQDZ4PCF.jpg",
        "https://cdn.thewirecutter.com/wp-content/media/2025/09/BG-IPHONE-2048px_IPHONE-17-PRO-MAX_BACK.jpg?auto=webp&quality=75&width=1024",
        "https://i.guim.co.uk/img/media/18badfc0b64b09f917fd14bbe47d73fd92feeb27/189_335_5080_3048/master/5080.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=1562112c7a64da36ae0a5e75075a0d12",
        "https://i.guim.co.uk/img/media/18badfc0b64b09f917fd14bbe47d73fd92feeb27/189_335_5080_3048/master/5080.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=1562112c7a64da36ae0a5e75075a0d12",
    ];

    const openWebsite = () => {
        Linking.openURL("https://example.com");
    };

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / width);
        setActiveImageIndex(index);
    };

    return (
        <View style={styles.container}>
            {/* Image Carousel (Rendered first so the header can float over it) */}
            <View style={styles.imageCarouselContainer}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    {productImages.map((img, index) => (
                        <Image
                            key={index}
                            source={{ uri: img }}
                            style={styles.carouselImage}
                            resizeMode="cover"
                        />
                    ))}
                </ScrollView>

                {/* Pagination Dots */}
                <View style={styles.paginationContainer}>
                    {productImages.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.paginationDot,
                                index === activeImageIndex && styles.paginationDotActive,
                            ]}
                        />
                    ))}
                </View>
            </View>

            {/* Header with Back Button (Positioned over the image) */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#333" />
                </TouchableOpacity>
            </View>

            {/* Content Card */}
            <View style={styles.contentCard}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Website Link Button */}
                    <TouchableOpacity style={styles.websiteButton} onPress={openWebsite}>
                        <Ionicons name="link-outline" size={18} color={TEAL} />
                        <Text style={styles.websiteButtonText}>Website Link</Text>
                    </TouchableOpacity>

                    {/* Product Name and Price */}
                    <View style={styles.productHeader}>
                        <Text style={styles.productName}>iPhone 15 Pro Max</Text>
                        <Text style={styles.productPrice}>$139.59</Text>
                    </View>

                    {/* Date */}
                    <Text style={styles.dateText}>24 July 2025</Text>

                    {/* Route Information */}
                    <View style={styles.routeContainer}>
                        <View style={styles.locationBox}>
                            <Text style={styles.airportCode}>DXB</Text>
                            <View style={styles.countryRow}>
                                <Text style={styles.countryText}>United Arab Emirates</Text>
                                <Text style={styles.flagEmoji}>🇦🇪</Text>
                            </View>
                        </View>

                        <View style={styles.arrowContainer}>
                            <View style={styles.dottedLine} />
                            <Ionicons name="airplane" size={20} color="#999" />
                            <View style={styles.dottedLine} />
                        </View>

                        <View style={styles.locationBox}>
                            <Text style={styles.airportCode}>LHR</Text>
                            <View style={styles.countryRow}>
                                <Text style={styles.countryText}>Pakistan</Text>
                                <Text style={styles.flagEmoji}>🇵🇰</Text>
                            </View>
                        </View>
                    </View>

                    {/* Traveler Info */}
                    <View style={styles.travelerCard}>
                        <Image
                            source={{ uri: "https://via.placeholder.com/50" }}
                            style={styles.travelerImage}
                        />
                        <View style={styles.travelerInfo}>
                            <View style={styles.travelerNameRow}>
                                <Text style={styles.travelerName}>Ali Raza</Text>
                                <View style={styles.verifiedBadge}>
                                    <Text style={styles.verifiedText}>Passport Verified</Text>
                                </View>
                            </View>
                            <Text style={styles.travelerEmail}>ibrarnaveed@gmail.com</Text>
                        </View>
                        <TouchableOpacity style={styles.chatButton}>
                            <Ionicons name="chatbubble-ellipses" size={22} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* Quantity */}
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Quantity:</Text>
                        <Text style={styles.infoValue}>1</Text>
                    </View>

                    {/* Category */}
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Category:</Text>
                        <Text style={styles.infoValue}>Electronics</Text>
                    </View>

                    {/* Description */}
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionTitle}>Description</Text>
                        <Text style={styles.descriptionText}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text
                            ever since the 1500s.
                        </Text>
                    </View>

                    <View style={{ height: 100 }} />
                </ScrollView>
            </View>

            {/* Bottom Button */}
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity onPress={()=>router.push("/(tabs)/order/OrderTracking")} style={styles.offerButton}>
                    <Text style={styles.offerButtonText}>Track your Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff", // Change background to white for cleaner look under the card
    },
    header: {
        // --- FIX APPLIED HERE ---
        position: 'absolute', // Float the header over the content
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10, // Ensure it's clickable and visible above the image
        // -------------------------

        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#D3D3D3",
        justifyContent: "center",
        alignItems: "center",
    },
    imageCarouselContainer: {
        // --- FIX APPLIED HERE (Reverted to original fixed height) ---
        height: 300, // Increased height slightly (from 150 to 300) to give the image more space
        // You can change 300 back to 150 if you want a very short image section.
        position: "relative",
    },
    carouselImage: {
        width: width,
        height: '100%', // <--- Crucial: Make the image fill the carousel container's height
    },
    paginationContainer: {
        position: "absolute",
        bottom: 42,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    paginationDotActive: {
        width: 24,
        backgroundColor: "#fff",
    },
    contentCard: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 20,
        marginTop: -30, // Increased negative margin to overlap the image slightly more
    },
    websiteButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E0F5F5",
        paddingVertical: 8,
        borderRadius: 12,
        marginBottom: 20,
        gap: 8,
    },
    websiteButtonText: {
        color: TEAL,
        fontSize: 12,
        fontWeight: "600",
    },
    productHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    productName: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        flex: 1,
    },
    productPrice: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    dateText: {
        fontSize: 11,
        color: "#999",
        marginBottom: 8,
        textAlign: "center",
    },
    routeContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 8,
        borderRadius: 10,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: "#f0f0f0",
    },
    locationBox: {
        flex: 1,
    },
    airportCode: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 3,
    },
    countryRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    countryText: {
        fontSize: 10,
        color: "#666",
        flex: 1,
    },
    flagEmoji: {
        fontSize: 14,
    },
    arrowContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
    },
    dottedLine: {
        width: 30,
        height: 1,
        borderTopWidth: 2,
        borderTopColor: "#ccc",
        borderStyle: "dotted",
    },
    travelerCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#f0f0f0",
    },
    travelerImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    travelerInfo: {
        flex: 1,
    },
    travelerNameRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 2,
        gap: 8,
        flexWrap: "wrap",
    },
    travelerName: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#333",
    },
    verifiedBadge: {
        backgroundColor: "#C8E6C9",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    verifiedText: {
        fontSize: 9,
        color: "#2E7D32",
        fontWeight: "600",
    },
    travelerEmail: {
        fontSize: 10,
        color: "#666",
    },
    chatButton: {
        backgroundColor: TEAL,
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    infoLabel: {
        fontSize: 10,
        color: "#333",
        fontWeight: "500",
    },
    infoValue: {
        fontSize: 10,
        color: "#666",
    },
    descriptionContainer: {
        marginTop: 20,
    },
    descriptionTitle: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 10,
        color: "#666",
        lineHeight: 20,
    },
    bottomButtonContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#f0f0f0",
    },
    offerButton: {
        backgroundColor: TEAL,
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: "center",
    },
    offerButtonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
});