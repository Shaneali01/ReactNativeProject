// components/home/TravelContent.jsx

import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Assuming OfferModal is in the correct relative path
import travelData from "../../constants/TravelData.js";
import TravelDetailModal from '../travel/TravelModal.jsx';

// --- TravelItem Component (Now wrapped in TouchableOpacity) ---
const TravelItem = ({ item, onCardPress }) => { // Receives onCardPress handler
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Ionicons
                    key={i}
                    name={i <= rating ? 'star' : 'star-outline'}
                    size={14}
                    color="#FFC107" // Gold/Yellow color for stars
                    style={{ marginRight: 2 }}
                />
            );
        }
        return <View style={styles.starsContainer}>{stars}</View>;
    };

    return (
        <TouchableOpacity 
            style={styles.card}
            onPress={() => onCardPress(item)} // Call handler on press
            activeOpacity={0.8}
        >
            <Image
                source={{ uri: item.image }}
                style={styles.cardImage}
                accessibilityLabel={`Profile image of ${item.name}`}
            />
            <View style={styles.cardDetails}>
                <View style={styles.topRow}>
                    <Text style={styles.travelerName}>{item.name}</Text>
                    <Text style={styles.travelDate}>{item.date}</Text>
                </View>

                <View style={styles.ratingRow}>
                    {renderStars(item.rating)}
                    <Text style={styles.reviewCount}>{item.reviewCount}</Text>
                </View>

                <View style={styles.routeRow}>
                    <View style={styles.timeLocation}>
                        <Text style={styles.timeText}>{item.departTime}</Text>
                        <Text style={styles.codeText}>{item.fromCode}</Text>
                        <View style={styles.cityFlag}>
                            <Text style={styles.cityText}>{item.fromCity}</Text>
                            <Text style={styles.flag}>{item.fromFlag}</Text>
                        </View>
                    </View>

                    {/* Flight Path */}
                    <View style={styles.flightPath}>
                        <View style={styles.flightLine}>
                            <Text style={styles.dashes}>- - - - - </Text>
                            <Ionicons name="airplane" size={16} color="#008080" />
                            <Text style={styles.dashes}>- - - - - &gt;</Text>
                        </View>
                    </View>

                    <View style={styles.timeLocation}>
                        <Text style={styles.timeText}>{item.arriveTime}</Text>
                        <Text style={styles.codeText}>{item.toCode}</Text>
                        <View style={styles.cityFlag}>
                            <Text style={styles.cityText}>{item.toCity}</Text>
                            <Text style={styles.flag}>{item.toFlag}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};


// --- TravelContent Component (Main List) ---
const TravelContent = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTravel, setSelectedTravel] = useState(null);

    const handleCardPress = (travelItem) => {
        setSelectedTravel(travelItem);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedTravel(null);
    };

    return (
        <View style={styles.contentContainer}>
            <FlatList
                data={travelData}
                renderItem={({ item }) => <TravelItem item={item} onCardPress={handleCardPress} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={styles.emptyList}>
                        <Ionicons name="map-outline" size={50} color="#999" />
                        <Text style={styles.emptyListText}>No travel requests found.</Text>
                    </View>
                )}
            />
            
            {/* Render the Modal, passing the selected item */}
            <TravelDetailModal
                visible={isModalVisible}
                onClose={closeModal}
                travel={selectedTravel} // **FIXED: Prop name changed from 'order' to 'travel'**
            />
        </View>
    );
};

export default TravelContent;

// --- Styles ---
const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 100,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    cardImage: {
        width: 80, 
        height: 80,
        borderRadius: 10,
        marginRight: 12,
        backgroundColor: '#F0F0F0',
        resizeMode: 'cover',
        marginTop:15,
    },
    cardDetails: {
        flex: 1,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 1,
    },
    travelerName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1F2937',
    },
    travelDate: {
        fontSize: 10,
        color: '#9CA3AF',
        fontWeight: '500',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
    },
    starsContainer: {
        flexDirection: 'row',
        marginRight: 8,
    },
    reviewCount: {
        fontSize: 11,
        color: '#6B7280',
    },
    routeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 1,
    },
    timeLocation: {
        alignItems: 'flex-start',
    },
    timeText: {
        fontSize: 10,
        fontWeight: '500',
        color: 'gray'
    },
    codeText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1F2937',
        marginVertical: 2,
    },
    cityFlag: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cityText: {
        fontSize: 12,
        color: '#6B7280',
        marginRight: 4,
    },
    flag: {
        fontSize: 11,
    },
    flightPath: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    flightLine: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dashes: {
        fontSize: 10,
        color: '#008080',
        letterSpacing: 0,
        marginHorizontal: 1,
        fontWeight: '600',
    },
    emptyList: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
    },
    emptyListText: {
        marginTop: 10,
        fontSize: 16,
        color: '#999',
    }
});