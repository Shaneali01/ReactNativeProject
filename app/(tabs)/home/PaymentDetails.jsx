// app/(tabs)/home/PaymentDetails.jsx

import { Ionicons } from "@expo/vector-icons"; // Using Expo's standard icon library
import { router } from "expo-router"; // Ensure router is imported for navigation
import { useState } from "react";
import {
  Alert,
  Clipboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../../components/common/Header"; // Assuming you have a reusable Header component

// Define the main color as a constant
const TEAL = "#008080";

// Reusable component for displaying an account detail row
const AccountDetailRow = ({ title, value }) => {
  const handleCopy = () => {
    Clipboard.setString(value);
    Alert.alert("Copied!", `${title} has been copied to your clipboard.`, [
      { text: "OK" },
    ]);
  };

  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailContent}>
        <Ionicons name="card-outline" size={20} color="#999" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.detailTitle}>{title}</Text>
          <Text style={styles.detailValue}>{value}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
        <Ionicons name="copy-outline" size={20} color="#666" />
      </TouchableOpacity>
    </View>
  );
};

export default function PaymentDetails() {
  // 👇 MODIFIED FOR TESTING: Set initial state to 'true' to make the button clickable immediately.
  // 👇 REMEMBER TO CHANGE THIS BACK TO useState(null) FOR PRODUCTION.
  const [screenshotUri, setScreenshotUri] = useState(true);

  // In a real app, this would use an image picker library like expo-image-picker
  const handleUploadScreenshot = () => {
    // Placeholder for actual image upload logic
    Alert.alert(
      "Simulated Upload",
      "In a real app, an image picker would open here. A dummy URI is set.",
      [
        {
          text: "Simulate Success",
          onPress: () =>
            setScreenshotUri(
              "https://via.placeholder.com/150/008080/FFFFFF?text=Payment+Proof+Uploaded"
            ),
        },
      ]
    );
  };

  const handleSubmitProof = () => {
    if (screenshotUri) {
      // Navigate to the success page
      router.push("/(tabs)/home/PaymentSuccess"); 
    } else {
      Alert.alert("Missing Screenshot", "Please upload the payment screenshot to proceed.", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header with back button */}
      <Header title="Payment Details" />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Instruction Box */}
        <View style={styles.instructionBox}>
          <Text style={styles.instructionText}>
            Please transfer the amount to the following account and upload the payment screenshot
          </Text>
        </View>

        {/* Account Details */}
        <AccountDetailRow title="Account Title" value="Grab n Go" />
        <AccountDetailRow title="Account Number" value="0123456789012345" />
        <AccountDetailRow title="IBAN Number" value="PK12ABCD0000001234567890" />

        {/* Upload Screenshot Area */}
        <TouchableOpacity
          style={[styles.uploadBox, screenshotUri && styles.uploadBoxActive]}
          onPress={handleUploadScreenshot}
        >
          {screenshotUri ? (
            <View style={styles.uploadedView}>
              <Ionicons name="checkmark-circle" size={20} color={TEAL} />
              <Text style={styles.uploadedText}>Screenshot Uploaded</Text>
              <Text style={styles.uploadHint}>Tap to change</Text>
            </View>
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={40} color="#999" />
              <Text style={styles.uploadText}>
                Tap to upload payment screenshot
              </Text>
              <Text style={styles.uploadHint}>PNG, JPG up to 10MB</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Spacer to keep content above the absolute buttons */}
        <View style={{ height: 160 }} />
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.submitButton, !screenshotUri && styles.submitButtonDisabled]}
          onPress={handleSubmitProof}
          // The disabled prop is now effectively false because screenshotUri is true
          disabled={!screenshotUri} 
        >
          <Text style={styles.submitButtonText}>Submit Payment Proof</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  instructionBox: {
    backgroundColor: "#f8fffe", // Light version of TEAL
    borderRadius: 12,
    padding: 16,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: "center",
  },
  instructionText: {
    color: TEAL,
    fontSize: 11,
    textAlign: "center",
    fontWeight: "400",
    lineHeight: 20,
    fontStyle:"regular",
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 1,
  },
  detailContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailTitle: {
    fontSize: 10,
    color: "#6C7278",
  },
  detailValue: {
    fontSize: 10,
    fontWeight: "400",
    color: "#2C2C2E",
    marginTop: 2,
  },
  copyButton: {
    padding: 8,
  },
  uploadBox: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#ddd",
    borderRadius: 16,
    paddingVertical: 30,
    marginTop: 2,
    backgroundColor: "#F9FAFB",
  },
  uploadBoxActive: {
    borderColor: TEAL,
    backgroundColor: "#f8fffe",
  },
  uploadText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666",
    marginTop: 8,
  },
  uploadHint: {
    fontSize: 10,
    color: "#aaa",
    marginTop: 4,
  },
  uploadedView: {
    alignItems: "center",
  },
  uploadedText: {
    fontSize: 12,
    fontWeight: "bold",
    color: TEAL,
    marginTop: 8,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopColor: "#eee",
  },
  submitButton: {
    backgroundColor: TEAL,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 40,
  },
  submitButtonDisabled: {
    // Since screenshotUri is true, this style is currently ignored.
    backgroundColor: TEAL, 
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
    fontStyle:"medium"
  },
  verificationBox: {
    backgroundColor: "#fff6e5", // A light, warm color for the hint
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ffcc66", // Orange/yellow border
  },
  verificationText: {
    color: "#cc8800", // Darker orange/yellow text
    fontSize: 11,
    fontWeight: "600",
  },
});