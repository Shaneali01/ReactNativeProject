// components/home/FilterModal.jsx

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
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

// 👈 2. Import the local image asset (assuming it's in assets/airplane.png)
// NOTE: Adjust the path below if your file structure is different.
const UpAirplaneIcon = require("../../assets/images/up-airplane.png"); 
const DownAirplaneIcon = require("../../assets/images/down-airplane.png")

const TEAL = "#008080";
const Secondary="#1A1C1E"
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
                        {/* 👈 3. Replaced Ionicons with Image component */}
                        <Image 
                            source={UpAirplaneIcon} 
                            style={styles.customIcon} 
                            resizeMode="contain"
                        />
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
                        {/* 👈 4. Replaced Ionicons with Image component */}
                        <Image 
                            source={DownAirplaneIcon} 
                            style={styles.customIcon} 
                            resizeMode="contain"
                        />
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
                            style={styles.toggleSwitch}
                        />
                    </View>
                    
                    {/* Product Category Dropdown (No change to logic) */}
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

                    {/* Simulated Dropdown List (No change to logic) */}
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

                    {/* Reward Amount Input (No change to logic) */}
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
    // ... (rest of the styles are the same) ...
    modalView: {
        justifyContent: 'flex-end',
        margin: 0, 
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
        fontSize: 12,
        fontWeight: "600",
        color: Secondary,
    },
    scrollViewContent: {
        flexGrow: 1, 
    },
    scrollContentPadding: {
        paddingHorizontal: 20, 
        paddingBottom: 20,
    },
    label: {
        fontSize: 10,
        fontWeight: "500",
        color: Secondary,
        marginTop: 10,
        marginBottom: 4,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 10,
        paddingHorizontal: 12,
        backgroundColor: "white",
        height: 45,
    },
    // New style for the custom Image icon
    customIcon: { 
        width: 24, 
        height: 24, 
        marginRight: 10, // To mimic the color of the Ionicons
    },
    // Removed old inputIcon style
    input: {
        flex: 1,
        fontSize: 12,
        color: Secondary,
        paddingVertical: Platform.OS === 'ios' ? 10 : 0,
        fontStyle:"regular",
    },
    toggleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 2,
        paddingVertical: 4,
    },
    dropdownButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 50,
        backgroundColor: "white",
    },
    dropdownText: {
        fontSize: 10,
        color: Secondary,
    },
    dropdownList: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 10,
        marginTop: 5,
        backgroundColor: "#fff",
        position: 'absolute',
        width: '90%', 
        zIndex: 10,
        top: 500,
        left: 20,
        right: 20,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#F4F4F4",
    },
    dropdownItemText: {
        fontSize: 12,
        color: "#333",
    },
    buttonRow: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 30,
        justifyContent: "space-between",
        backgroundColor: '#fff', 
    },
    resetButton: {
        flex: 1,
        backgroundColor: "#fff",
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: "center",
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    resetButtonText: {
        color: "#666",
        fontSize: 12,
        fontWeight: "600",
    },
    applyButton: {
        flex: 1,
        backgroundColor: TEAL,
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: "center",
        marginLeft: 10,
    },
    applyButtonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
});

export default FilterModal;