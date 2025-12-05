import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    FlatList,
    Image,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// Sample data for the list
const orderData = [
    { 
        id: '1', 
        title: 'iPhone 15 Pro Max', 
        price: '$139.59', 
        date: '24 July 2025', 
        quantity: 1, 
        from: 'USA', 
        fromFlag: '🇺🇸', 
        to: 'Pakistan', 
        toFlag: '🇵🇰', 
        image: 'https://images.unsplash.com/photo-1592286927505-b0e2967ddc93?w=200' 
    },
    { 
        id: '2', 
        title: 'Smart Watch', 
        price: '$139.59', 
        date: '24 July 2025', 
        quantity: 1, 
        from: 'USA', 
        fromFlag: '🇺🇸', 
        to: 'Pakistan', 
        toFlag: '🇵🇰', 
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200' 
    },
    { 
        id: '3', 
        title: 'Headphones', 
        price: '$139.59', 
        date: '24 July 2025', 
        quantity: 1, 
        from: 'USA', 
        fromFlag: '🇺🇸', 
        to: 'Pakistan', 
        toFlag: '🇵🇰', 
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200' 
    },
    { 
        id: '4', 
        title: 'Nike Shoes', 
        price: '$139.59', 
        date: '24 July 2025', 
        quantity: 1, 
        from: 'USA', 
        fromFlag: '🇺🇸', 
        to: 'Pakistan', 
        toFlag: '🇵🇰', 
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200' 
    },
];

const OrderScreen = () => {
    const [activeTab, setActiveTab] = useState('Orders');
    const [searchText, setSearchText] = useState('');

    // --- List Item Renderer ---
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image 
                source={{ uri: item.image }} 
                style={styles.cardImage} 
                accessibilityLabel={`Image of ${item.title}`}
            />
            <View style={styles.cardDetails}>
                <View style={styles.titleRow}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardPrice}>{item.price}</Text>
                </View>
                <View style={styles.new}>
                    <Text style={styles.cardDate}>Date: {item.date}</Text>
                <Text style={styles.quantity}>Quantity: {item.quantity}</Text>

                </View>
                <View style={styles.bottomRow}>
                    <View style={styles.travelRoute}>
                        <Text style={styles.routeText}>{item.from}</Text>
                        <Text style={styles.flag}>{item.fromFlag}</Text>
                        <Text style={styles.dashes}>- - - - - </Text>
                        <Ionicons name="airplane" size={14} color="#008080" />
                        <Text style={styles.dashes}>- - - - - &gt;</Text>
                        <Text style={styles.routeText}>{item.to}</Text>
                        <Text style={styles.flag}>{item.toFlag}</Text>
                    </View>
                </View>
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
                    <Ionicons name="search" size={18} color="#999" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="#999"
                        value={searchText}
                        onChangeText={setSearchText}
                        returnKeyType="search"
                        accessibilityLabel="Search input"
                    />
                    <TouchableOpacity style={styles.filterButton} accessibilityLabel="Filter button">
                        <Ionicons name="options-outline" size={20} color="#999" />
                    </TouchableOpacity>
                </View>

                {/* Orders List */}
                <FlatList
                    data={orderData}
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
                <TouchableOpacity 
                    onPress={() => router.push("(tabs)/home/PlaceOrder")} 
                    style={styles.fab} 
                    accessibilityLabel={`Create new ${activeTab === 'Orders' ? 'Order' : 'Travel'}`}
                >
                    <Ionicons name="add" size={28} color="#fff" />
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
        backgroundColor: '#008080',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 15 : 15,
        paddingBottom: 60,
        backgroundColor: '#008080',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        padding: 5,
        width: '100%',
        maxWidth: 400,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 25,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#008080',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    activeTabText: {
        color: '#fff',
        fontWeight: '700',
    },
    contentArea: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
        paddingTop: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -10,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 20,
        height: 48,
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#333',
    },
    filterButton: {
        paddingLeft: 8,
    },
    listContent: {
        paddingBottom: 100,
    },
    new:{
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 12,
        backgroundColor: '#F0F0F0',
        resizeMode: 'cover',
    },
    cardDetails: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1F2937',
        flex: 1,
    },
    cardPrice: {
        fontSize: 12,
        fontWeight: '700',
        color: '#1F2937',
        marginLeft: 8,
    },
    cardDate: {
        fontSize: 11,
        color: '#9CA3AF',
        marginBottom: 6,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    travelRoute: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    routeText: {
        fontSize: 12,
        color: '#1F2937',
        fontWeight: '600',
    },
    flag: {
        fontSize: 11,
        marginHorizontal: 2,

    },
    dashes: {
        fontSize: 10,
        color: '#008080',
        letterSpacing: 0,
        marginHorizontal: 8,
        fontWeight: '600',
    },
    quantity: {
        fontSize: 11,
        color: '#6B7280',
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 30,
        backgroundColor: '#008080',
        borderRadius: 28,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
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