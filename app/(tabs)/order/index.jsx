import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'; // <-- Added Platform import here

// Sample data for the list
const orderData = [
    { id: '1', title: 'iPhone 15 Pro Max', price: '$139.59', date: '24 July 2025', quantity: 1, from: 'USA 🇺🇸', to: 'Pakistan 🇵🇰', image: 'https://picsum.photos/id/40/100/100' },
    { id: '2', title: 'Smart Watch', price: '$139.59', date: '24 July 2025', quantity: 1, from: 'USA 🇺🇸', to: 'Pakistan 🇵🇰', image: 'https://picsum.photos/id/65/100/100' },
    { id: '3', title: 'Headphones', price: '$139.59', date: '24 July 2025', quantity: 1, from: 'USA 🇺🇸', to: 'Pakistan 🇵🇰', image: 'https://picsum.photos/id/237/100/100' },
    { id: '4', title: 'Nike Shoes', price: '$139.59', date: '24 July 2025', quantity: 1, from: 'USA 🇺🇸', to: 'Pakistan 🇵🇰', image: 'https://picsum.photos/id/83/100/100' },
    { id: '5', title: 'Camera Lens', price: '$139.59', date: '24 July 2025', quantity: 1, from: 'USA 🇺🇸', to: 'Pakistan 🇵🇰', image: 'https://picsum.photos/id/88/100/100' },
];

const OrderScreen = () => {
    const [activeTab, setActiveTab] = useState('Orders');
    const [searchText, setSearchText] = useState('');

    // --- List Item Renderer ---
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            {/* The image component should have a fallback style in case the URI fails or loads slowly */}
            <Image 
                source={{ uri: item.image }} 
                style={styles.cardImage} 
                accessibilityLabel={`Image of ${item.title}`}
            />
            <View style={styles.cardDetails}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>Date: {item.date}</Text>
                <View style={styles.travelRoute}>
                    <Text style={styles.routeText}>{item.from}</Text>
                    <Ionicons name="airplane" size={12} color="#008080" style={{ marginHorizontal: 5 }} />
                    <Text style={styles.routeText}>{item.to}</Text>
                </View>
            </View>
            <View style={styles.cardPriceContainer}>
                <Text style={styles.cardPrice}>{item.price}</Text>
                <Text style={styles.cardSubtitle}>Quantity: {item.quantity}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#008080" />

            {/* Custom Teal Header Section */}
            <View style={styles.header}>
                {/* Orders / Travel Segmented Control */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'Orders' && styles.activeTab]}
                        onPress={() => setActiveTab('Orders')}
                        accessibilityRole="button"
                        accessibilityLabel="Show Orders"
                    >
                        <Text style={[styles.tabText, activeTab === 'Orders' && styles.activeTabText]}>
                            Orders
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'Travel' && styles.activeTab]}
                        onPress={() => setActiveTab('Travel')}
                        accessibilityRole="button"
                        accessibilityLabel="Show Travel Requests"
                    >
                        <Text style={[styles.tabText, activeTab === 'Travel' && styles.activeTabText]}>
                            Travel
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main Content Area */}
            <View style={styles.contentArea}>
                {/* Search Bar */}
                <View style={styles.searchBarContainer}>
                    <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder={`Search ${activeTab === 'Orders' ? 'Orders' : 'Travels'}...`}
                        placeholderTextColor="#999"
                        value={searchText}
                        onChangeText={setSearchText}
                        returnKeyType="search"
                        accessibilityLabel="Search input"
                    />
                    <TouchableOpacity style={styles.filterButton} accessibilityLabel="Filter button">
                        <Ionicons name="filter" size={24} color="#008080" />
                    </TouchableOpacity>
                </View>


                {/* Orders List */}
                <FlatList
                    data={orderData} // In a real app, this would be filtered by activeTab
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyList}>
                            <Ionicons name="compass-outline" size={50} color="#999" />
                            <Text style={styles.emptyListText}>No {activeTab} found.</Text>
                        </View>
                    )}
                />
                
                {/* Floating Action Button */}
                <TouchableOpacity style={styles.fab} accessibilityLabel={`Create new ${activeTab === 'Orders' ? 'Order' : 'Travel'}`}>
                    <Text style={styles.fabText}>+</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default OrderScreen;

// --- Styles ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#008080', // Teal background for status bar/top header
    },
    header: {
        paddingHorizontal: 20,
        // FIX: Platform must be imported from 'react-native' to use Platform.OS
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 30 : 10,
        paddingBottom: 50,
        backgroundColor: '#008080',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#ffff', // Slightly more opaque semi-transparent white
        borderRadius: 30,
        padding: 4, // Slightly increased padding
        width: '100%',
        maxWidth: 400, // Increased max width
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15, // Increased vertical padding
        borderRadius: 30,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#008080',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 }, // Slightly stronger shadow
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 6, // Increased elevation
    },
    tabText: {
        fontSize: 12,
        fontWeight: '700', // Made inactive text bold
        color: '#0000', 
    },
    activeTabText: {
        color: '#fff', 
    },
    contentArea: {
        flex: 1,
        backgroundColor: '#fff', 
        paddingHorizontal: 20,
        paddingTop: 20, // Increased top padding for content separation
        borderTopLeftRadius: 30, // Added rounded corners to the main content area
        borderTopRightRadius: 30,
        marginTop: 0, // Pull content up slightly over the header
    },
    listTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 10,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 15, // Increased corner radius
        paddingHorizontal: 15,
        marginBottom: 20,
        height: 55, // Slightly taller search bar
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowColor: '#000', // Added subtle shadow to search bar
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 13,
        color: '#333',
    },
    filterButton: {
        paddingLeft: 10,
    },
    listContent: {
        paddingBottom: 100, // More padding to ensure FAB doesn't cover last item
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 15, // Increased corner radius
        padding: 15,
        marginBottom: 15, // Increased spacing between cards
        borderLeftWidth: 0, // Decorative left border
        elevation: 3,
        borderColor: '#808080',
        borderWidth: 0.5,
    },
    cardImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 15,
        backgroundColor: '#F0F0F0', // Placeholder background for image
        resizeMode: 'cover',
    },
    cardDetails: {
        flex: 1,
        justifyContent: 'space-around', // Distributes space vertically
    },
    cardTitle: {
        fontSize: 15, // Slightly larger title
        fontWeight: '400',
        color: '#0000',
    },
    cardSubtitle: {
        fontSize: 12,
        color: '#888', // Softer subtitle color
    },
    travelRoute: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    routeText: {
        fontSize: 14,
        color: '#008080', // Teal color for route for emphasis
        fontWeight: '600',
    },
    cardPriceContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginLeft: 10,
    },
    cardPrice: {
        fontSize: 14,
        fontWeight: '800',
         // Using a punchier color (Tomato) for price
    },
    fab: {
        position: 'absolute',
        width: 65,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
        right: 25,
        bottom: 25,
        backgroundColor: '#008080', // Using the punchier price color for the FAB too
        borderRadius: 12,
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
    },
    fabText: {
        fontSize: 34,
        color: '#FFF',
        lineHeight: 34, // Centering the '+' icon
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