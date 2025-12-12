// components/home/OfferModal.jsx

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    FlatList,
    Image,
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import RNModal from "react-native-modal";

const TEAL = "#008080";

const OfferModal = ({ visible, onClose, order }) => {
    if (!order) {
        return null;
    }

    const renderExtraImage = ({ item }) => (
        <Image source={{ uri: item }} style={styles.extraImage} />
    );

    const handleLinkPress = () => {
        if (order.websiteLink) {
            Linking.openURL(order.websiteLink);
        }
    };

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
            animationInTiming={400}
            animationOutTiming={400}
            backdropOpacity={0.3}
        >
            <View style={styles.modalContainer}>
                
                {/* Header Bar */}
                <View style={styles.header}>
                    <View style={styles.headerBar} />
                </View>

                {/* Scrollable Content (Sits above the fixed buttons) */}
                <ScrollView 
                    style={styles.scrollViewContent}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContentPadding}
                >
                    {/* Product Header */}
                    <View style={styles.productHeader}>
                        <Text style={styles.productTitle}>{order.title}</Text>
                        <Text style={styles.productPrice}>{order.price}</Text>
                    </View>

                    {/* Reward */}
                    {order.Reward && (
                        <Text style={styles.productReward}>
                            Reward: ${order.Reward}
                        </Text>
                    )}

                    {/* Website Link Button */}
                    <TouchableOpacity style={styles.websiteLinkButton} onPress={handleLinkPress}>
                        <Ionicons name="open-outline" size={18} color={TEAL} />
                        <Text style={styles.websiteLinkText}>Website Link</Text>
                    </TouchableOpacity>

                    {/* Travel Route Section */}
                    <View style={styles.routeSection}>
                        <Text style={styles.routeDate}>{order.date}</Text>
                        <View style={styles.routeDetails}>
                            {/* Origin - Flag now on the RIGHT of city name */}
                            <View style={styles.cityColumn}>
                                <Text style={styles.cityCode}>{order.originCode || order.from}</Text>
                                <Text style={styles.cityText}>
                                    {order.originCity || order.from}
                                    <Text style={styles.flag}> {order.fromFlag}</Text>
                                </Text>
                            </View>

                            {/* Dashed Line and Airplane Icon */}
                            <View style={styles.routeConnector}>
                                <View style={styles.dashedLine} />
                                <Ionicons name="airplane" size={18} color={TEAL} style={styles.airplaneIcon} />
                                <View style={styles.dashedLine} />
                            </View>
                            

                            {/* Destination - Flag now on the RIGHT of city name */}
                            <View style={styles.cityColumn}>
                                <Text style={styles.cityCode}>{order.destinationCode || order.to}</Text>
                                <Text style={styles.cityText}>
                                    {order.destinationCity || order.to}
                                    <Text style={styles.flag}> {order.toFlag}</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                    
                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* User/Buyer Profile */}
                    <View style={styles.profileSection}>
                        <Image source={{ uri: order.buyerImage }} style={styles.profileImage} />
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileName}>{order.buyerName}</Text>
                            <Text style={styles.profileEmail}>{order.buyerEmail}</Text>
                        </View>
                        <TouchableOpacity style={styles.chatButton}>
                            <Ionicons name="chatbox-ellipses-outline" size={20} color="#008080" />
                        </TouchableOpacity>
                    </View>
                    
                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Extra Product Images */}
                    {order.extraImages && order.extraImages.length > 0 && (
                        <FlatList
                            data={order.extraImages}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderExtraImage}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.extraImagesList}
                        />
                    )}

                </ScrollView>

                {/* Action Buttons (FIXED at the bottom) */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.offerButton} onPress={() => { router.push("/(tabs)/home/Offer") }}>
                        <Text style={styles.offerButtonText}>Make an Offer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.viewDetailsButton} onPress={() =>router.push("/(tabs)/home/ViewDetails")}>
                        <Text style={styles.viewDetailsButtonText}>View Details</Text>
                    </TouchableOpacity>
                </View>
                

            </View>
        </RNModal>
    );
};

export default OfferModal;

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
        maxHeight: "65%", 
        overflow: 'hidden',
    },
    header: {
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        zIndex: 2, 
    },
    headerBar: {
        width: 40,
        height: 5,
        backgroundColor: "#ccc",
        borderRadius: 2.5,
    },
    
    scrollViewContent: {
        flexGrow: 1,
        zIndex: 0,
    },
    scrollContentPadding: {
        paddingHorizontal: 20,
        paddingBottom: 100, 
    },

    // --- Product Header ---
    productHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1C1E',
        flexShrink: 1,
    },
    verifiedIcon: {
        marginHorizontal: 5,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1C1E',
    },
    productReward: {
        fontSize: 14,
        fontWeight: '600',
        color: '#08843C',
        marginTop: 5,
    },

    // --- Website Link ---
    websiteLinkButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D8EBEB', 
        borderRadius: 100,
        paddingVertical: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    websiteLinkText: {
        fontSize: 12,
        fontWeight: '600',
        color: TEAL,
        marginLeft: 8,
    },

    // --- Route Section ---
    routeSection: {
        paddingVertical: 2
    },
    routeDate: {
        textAlign: 'center',
        fontSize: 10,
        color: '#666',
    },
    routeDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cityColumn: {
        alignItems: 'center',
        flex: 1,
    },
    cityCode: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginBottom: 0, 
    },
    cityText: {
        fontSize: 7,
        color: '#666',
        textAlign: 'center',
        marginBottom:2
    },
    flag: {
        fontSize: 8,
    },
    
    // --- ROUTE CONNECTOR STYLES ---
    routeConnector: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 2, 
        marginHorizontal: 5,
    },
    dashedLine: {
        flex: 1,
        height: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'dashed',
        marginBottom: 10,
    },
    airplaneIcon: {
        marginHorizontal: 5,
        marginBottom:10
    },

    // --- Divider ---
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 0,
        marginHorizontal: 0,
    },

    // --- Profile Section ---
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    profileEmail: {
        fontSize: 10,
        color: '#6C7278',
    },
    chatButton: {
        padding: 10,
        backgroundColor: '#D8EBEB',
        borderRadius: 20,
    },
    
    // --- Extra Images ---
    extraImagesList: {
        paddingVertical: 10,
        marginBottom: 15,
        marginTop: 10
    },
    extraImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
        resizeMode: 'cover',
    },

    // --- Fixed Button Row ---
    buttonRow: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingTop: 8,
        paddingBottom: Platform.OS === 'ios' ? 30 : 20, 
        justifyContent: "center",
        backgroundColor: '#fff', 
        
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 5, 
    },
    offerButton: {
        flex: 2, 
        backgroundColor: TEAL,
        paddingVertical: 10, 
        borderRadius: 30,
        alignItems: "center",
        paddingHorizontal: 10,
        marginRight: 0,
    },
    offerButtonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "500", 
    },
    viewDetailsButton: {
        flex: 1, 
        backgroundColor: "#D8EBEB",
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: "center",
        marginLeft: 10,
        borderWidth: 1,
        borderColor: TEAL,
    },
    viewDetailsButtonText: {
        color: TEAL,
        fontSize: 12,
        fontWeight: "500", 

    },
});