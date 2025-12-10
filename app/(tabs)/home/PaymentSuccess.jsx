// app/(tabs)/home/PaymentSuccess.jsx

import { Ionicons } from "@expo/vector-icons"; // Use the same icon library
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TEAL = "#008080";

export default function PaymentSuccess() {
  // Function to navigate back to the home screen
  const handleGoHome = () => {
    // Use router.replace to go straight to the home tab and clear the stack
    router.replace("/(tabs)/order"); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark" size={80} color="#00BA00" />
        </View>

        {/* Success Message */}
        <Text style={styles.title}>Payment Submitted!</Text>
        <Text style={styles.message}>
          Your payment screenshot has been submitted for review. The traveler will confirm the payment soon.
        </Text>
         <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
          <Text style={styles.homeButtonText}>View Your Orders</Text>
        </TouchableOpacity>
      </View>
      </View>

      {/* Button to return home */}
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "space-between", 
    paddingBottom: 80,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: '#E0F5E8',
    borderRadius: 75,
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    // Add a shadow to make the icon pop
   
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00BA00",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    color: "#696969",
    textAlign: "center",
    paddingHorizontal: 2,
    fontWeight: "400",
    fontFamily:"roboto",
    fontStyle:"medium",
    lineHeight: '100%',
  },
  bottomButtonContainer: {
    width: "100%",
  },
  homeButton: {
    backgroundColor: TEAL,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 50,
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    fontStyle:"inter",
    lineHeight: '140%',

  },
});