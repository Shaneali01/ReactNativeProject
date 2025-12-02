import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

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
      <Image source={{ uri: item.image }} style={styles.cardImage} />
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
          >
            <Text style={[styles.tabText, activeTab === 'Orders' && styles.activeTabText]}>
              Orders
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Travel' && styles.activeTab]}
            onPress={() => setActiveTab('Travel')}
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
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.filterButton}>
             <Ionicons name="filter" size={24} color="#008080" />
          </TouchableOpacity>
        </View>

        {/* Orders List */}
        <FlatList
          data={orderData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
        
        {/* Floating Action Button */}
        <TouchableOpacity style={styles.fab}>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
    paddingBottom: 20,
    backgroundColor: '#008080',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
    borderRadius: 30,
    padding: 3,
    width: '100%',
    maxWidth: 250, // Limit width of the segmented control
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 30,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF', // Inactive text is white on teal
  },
  activeTabText: {
    color: '#008080', // Active text is teal on white
  },
  contentArea: {
    flex: 1,
    backgroundColor: '#F7F7F7', // Light gray background for the main content area
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    paddingLeft: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
  },
  cardDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  travelRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  routeText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  cardPriceContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#008080',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#008080',
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 30,
    color: '#FFF',
    lineHeight: 32,
  },
});