import { Link, router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
// Import the new library component
import OTPTextView from 'react-native-otp-textinput';

const TEAL = "#008080";

const OtpPage = () => {
    // State to hold the final 5-digit OTP string
    const [fullOtp, setFullOtp] = useState("");
    
    // The library handles the individual input boxes, focus, and deletion internally.
    // We only need one handler to capture the complete 5-digit code.
    const handleOtpChange = (code) => {
        setFullOtp(code);
    };

    // Function to handle the Verify button press
    const handleVerify = () => {
        if (fullOtp.length === 5) {
            // Logic for verification (e.g., API call)
            Alert.alert("Verification Successful", `OTP entered: ${fullOtp}`);
            // Navigate to the home screen after verification
            router.push("/(tabs)/home"); 
        } else {
            Alert.alert("Error", "Please enter the complete 5-digit code.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                
                {/* Header Text */}
                <Text style={styles.title}>Verification Code</Text>
                <Text style={styles.subtitle}>
                    Enter verification code that sent you to your desire number
                </Text>

                {/* OTP Input Fields using the library */}
                <View style={styles.otpContainer}>
                    <OTPTextView
                        handleTextChange={handleOtpChange}
                        containerStyle={styles.otpViewContainer} // Apply width/margin here
                        textInputStyle={styles.otpInputStyle} // Style for individual boxes
                        inputCount={5} // Your desired number of inputs
                        inputCellLength={1}
                        keyboardType="numeric"
                        autoFocus
                        tintColor={TEAL} // Color when active/focused
                        offTintColor="#ccc" // Color when inactive
                    />
                </View>

                {/* Verify Button */}
                <TouchableOpacity style={styles.verifyButton} onPress={handleVerify} disabled={fullOtp.length !== 5}>
                    <Text style={styles.verifyButtonText}>Verify</Text>
                </TouchableOpacity>

                {/* Resend Link */}
                <Link href="/(auth)/login">
                    <TouchableOpacity style={styles.resendLink}>
                        <Text style={styles.resendText}>Didn't receive code? <Text style={styles.resendTextTeal}>Resend</Text></Text>
                    </TouchableOpacity>
                </Link>

            </View>
        </SafeAreaView>
    );
};

// --- STYLES (Adapted for the library) ---

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === 'android' ? 25 : 0, 
    },
    content: {
        flex: 1,
        paddingHorizontal: 25,
        alignItems: "center",
        paddingTop: "20%", 
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1A1C1E",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: "#6C7278",
        textAlign: "center",
        marginBottom: 40,
        maxWidth: 250,
    },
    // This container is mainly for layout alignment on the screen
    otpContainer: {
        width: "100%",
        alignItems: 'center', // Center the OTP component itself
        marginBottom: 40,
    },
    // Styles applied to the OTPTextView wrapper
    otpViewContainer: {
        width: "100%",
        maxWidth: 350, // Controls the max width of the 5 boxes combined
    },
    // Styles applied to the individual input boxes/cells
    otpInputStyle: {
        width: 50, // Width of each box
        height: 55, // Height of each box
        fontSize: 24,
        textAlign: "center",
        borderWidth: 1, // Only borderBottomWidth is 1 by default, but we reset it below
        borderRadius: 12,
        // The library defaults to borderBottomWidth: 1, so we set borderWidth: 1
        borderWidth: 1, 
        borderBottomWidth: 1, // Ensure the bottom border is not thicker
        color: "#1A1C1E",
        fontWeight: "600",
        // The tintColor/offTintColor props handle the border color dynamically, 
        // so we don't need the otpInputFilled style anymore!
    },
    
    // VERIFY BUTTON STYLES (No change needed)
    verifyButton: {
        width: "100%",
        backgroundColor: TEAL,
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 20,
        maxWidth: 350,
    },
    verifyButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    // RESEND LINK STYLES (No change needed)
    resendLink: {
        padding: 10,
    },
    resendText: {
        fontSize: 14,
        color: "#6C7278",
    },
    resendTextTeal: {
        color: TEAL,
        fontWeight: "600",
    }
});

export default OtpPage;