// app/(tabs)/home/PaymentDetails.jsx

import { Ionicons } from "@expo/vector-icons"; // Using Expo's standard icon library
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
  const [screenshotUri, setScreenshotUri] = useState(null);

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
      Alert.alert("Payment Proof Submitted", "Your proof is being reviewed.", [
        { text: "OK" },
      ]);
      // Navigate or perform submission logic here
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
              <Ionicons name="checkmark-circle" size={36} color={TEAL} />
              <Text style={styles.uploadedText}>Screenshot Uploaded</Text>
              <Text style={styles.uploadHint}>Tap to change</Text>
            </View>
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={48} color="#999" />
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
          disabled={!screenshotUri}
        >
          <Text style={styles.submitButtonText}>Submit Payment Proof</Text>
        </TouchableOpacity>

        <View style={styles.verificationBox}>
          <Text style={styles.verificationText}>
            Your payment will be verified within 24 hours
          </Text>
        </View>
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
    borderColor: TEAL,
    alignItems: "center",
  },
  instructionText: {
    color: TEAL,
    fontSize: 13,
    textAlign: "center",
    fontWeight: "600",
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
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  detailContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailTitle: {
    fontSize: 11,
    color: "#999",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
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
    paddingVertical: 40,
    marginTop: 20,
    backgroundColor: "#f9f9f9",
  },
  uploadBoxActive: {
    borderColor: TEAL,
    backgroundColor: "#f8fffe",
  },
  uploadText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginTop: 10,
  },
  uploadHint: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 4,
  },
  uploadedView: {
    alignItems: "center",
  },
  uploadedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: TEAL,
    marginTop: 8,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  submitButton: {
    backgroundColor: TEAL,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 10,
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
    fontSize: 13,
    fontWeight: "600",
  },
});