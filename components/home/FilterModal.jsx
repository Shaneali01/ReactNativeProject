// components/home/FilterModal.jsx

// Changed import source from 'react-native' to 'react-native-modal'
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import RNModal from "react-native-modal";

const TEAL = "#008080";
const CATEGORIES = ["Electronics", "Clothing", "Accessories", "Other", "Books", "Tools", "Health"];

const FilterModal = ({ visible, onClose, onApply, onReset }) => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [productCategory, setProductCategory] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleReset = () => {
    setFromLocation("");
    setToLocation("");
    setPaymentVerified(false);
    setProductCategory("");
    setRewardAmount("");
    onReset();
  };

  const handleApply = () => {
    onApply({
      fromLocation,
      toLocation,
      paymentVerified,
      productCategory,
      rewardAmount: parseFloat(rewardAmount) || 0,
    });
    onClose();
  };

  // --- Swapping to RNModal from the library ---
  return (
    <RNModal
      isVisible={visible}
      onSwipeComplete={onClose} // 👈 Dismisses the modal when a swipe gesture finishes
      swipeDirection={['down']} // 👈 Only allows swiping down
      onBackdropPress={onClose} // Allows tapping outside to close (Good UX)
      onBackButtonPress={onClose} // Handles Android back button
      style={styles.modalView} // Use a style for the position (bottom)
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={styles.modalContainer}>
        {/* Header Bar and Title */}
        <View style={styles.header}>
          <View style={styles.headerBar} />
          <Text style={styles.title}>Filters</Text>
        </View>

        {/* Filter Content - Scrollable Area */}
        <ScrollView 
          style={styles.scrollViewContent} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentPadding}
        >
          {/* From Location Input */}
          <Text style={styles.label}>From</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="airplane-outline" size={18} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="e.g. California, USA"
              value={fromLocation}
              onChangeText={setFromLocation}
              placeholderTextColor="#999"
            />
          </View>

          {/* To Location Input */}
          <Text style={styles.label}>To</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="airplane-outline" size={18} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="e.g. Lahore, Pakistan"
              value={toLocation}
              onChangeText={setToLocation}
              placeholderTextColor="#999"
            />
          </View>

          {/* Payment Verified Toggle */}
          <View style={styles.toggleRow}>
            <Text style={styles.label}>Payment Verified</Text>
            <Switch
              trackColor={{ false: "#E5E7EB", true: TEAL }}
              thumbColor={paymentVerified ? "#fff" : "#f4f3f4"}
              ios_backgroundColor="#E5E7EB"
              onValueChange={setPaymentVerified}
              value={paymentVerified}
            />
          </View>
          
          {/* Product Category Dropdown */}
          <Text style={styles.label}>Product Category</Text>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            <Text style={styles.dropdownText}>
              {productCategory || "Select category"}
            </Text>
            <Ionicons name={isCategoryOpen ? "chevron-up" : "chevron-down"} size={16} color="#666" />
          </TouchableOpacity>

          {/* Simulated Dropdown List (Adjust position based on scroll) */}
          {/* NOTE: Absolute positioning inside a ScrollView can be tricky. This list may need to be wrapped in the main modal container's View if issues arise. */}
          {isCategoryOpen && (
            <View style={styles.dropdownList}>
              {CATEGORIES.map((cat, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setProductCategory(cat);
                    setIsCategoryOpen(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Reward Amount Input */}
          <Text style={styles.label}>Reward Amount</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter reward amount"
              keyboardType="numeric"
              value={rewardAmount}
              onChangeText={setRewardAmount}
              placeholderTextColor="#999"
            />
          </View>
          
          {/* Spacer for bottom padding */}
          <View style={{height: 10}} /> 
        </ScrollView>
        
        {/* Action Buttons (Fixed at the bottom) */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RNModal>
  );
};

// --- Modal Styles ---
const styles = StyleSheet.create({
  // Style required by RNModal to anchor the content to the bottom
  modalView: {
    justifyContent: 'flex-end',
    margin: 0, // Crucial for full-width modal at the bottom
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    maxHeight: "65%",
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
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  scrollViewContent: {
    flexGrow: 1, 
  },
  scrollContentPadding: {
    paddingHorizontal: 20, 
    paddingBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginTop: 15,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#F9FAFB",
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingVertical: 10,
  },
  // Dropdown styles
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: "#F9FAFB",
  },
  dropdownText: {
    fontSize: 15,
    color: "#333",
  },
  // NOTE: Absolute positioning inside a ScrollView is difficult.
  // The current absolute positioning may not work perfectly as the ScrollView moves.
  dropdownList: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: "#fff",
    position: 'absolute',
    width: '90%', 
    zIndex: 10,
    top: 500, // Approximate position (may need adjustment)
    left: 20,
    right: 20,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F4F4F4",
  },
  dropdownItemText: {
    fontSize: 15,
    color: "#333",
  },
  // Button Row (Fixed at bottom)
  buttonRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    justifyContent: "space-between",
    backgroundColor: '#fff', 
  },
  resetButton: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  resetButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  applyButton: {
    flex: 1,
    backgroundColor: TEAL,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginLeft: 10,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FilterModal;