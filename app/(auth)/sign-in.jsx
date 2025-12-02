import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const { height } = Dimensions.get("window");

// --- Component ---
const AuthScreen = () => {
  const router = useRouter();

  // State for the active tab: true for Login, false for Sign Up
  const [isLoginActive, setIsLoginActive] = useState(true);

  // State for form fields
  const [fullName, setFullName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [phone, setPhone] = useState(""); // 🔑 The previously missing state
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // --- Handlers ---
  const handleAuthAction = () => {
    if (isLoginActive) {
      console.log("Attempting Login with:", emailOrPhone);
      // Replace with your actual authentication logic
      router.replace("/(tabs)");
    } else {
      console.log("Attempting Sign Up with:", fullName, emailOrPhone, phone);
      // Replace with your actual registration logic
      router.replace("/(tabs)");
    }
  };

  const handleForgotPassword = () => {
    console.log("Navigate to Forgot Password...");
    // Add navigation to a dedicated Forgot Password screen here
  };

  const Logo = () => (
    <View style={styles.logoContainer}>
      <Ionicons
        name="bag-handle-outline"
        size={24}
        color="#FFF"
        style={styles.logoIcon}
      />
      <Text style={styles.logoText}>GrabnGo</Text>
    </View>
  );

  // --- Conditional Form Fields Renderer ---
  const renderFormFields = () => {
    if (isLoginActive) {
      // ➡️ LOGIN FIELDS
      return (
        <>
          <Text style={styles.label}>Email or Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="Email or Phone"
            placeholderTextColor="#999"
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <View style={[styles.passwordContainer, { marginBottom: 5 }]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="********"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.passwordToggle}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.forgotPasswordButton}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
          </TouchableOpacity>
        </>
      );
    } else {
      // ➡️ SIGN UP FIELDS
      return (
        <>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#999"
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#999"
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.phoneInputContainer}>
            <View style={styles.countryCodeContainer}>
              <Text style={styles.countryCodeText}>US</Text>
            </View>
            <TextInput
              style={styles.phoneTextInput}
              placeholder="none"
              placeholderTextColor="#999"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <Ionicons
              name="ellipse-outline"
              size={18}
              color="#999"
              style={{ marginRight: 10 }}
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={[styles.passwordContainer, { marginBottom: 30 }]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="********"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <Text style={styles.passwordHint}>#66</Text>
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.passwordToggle}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        </>
      );
    }
  };
  // --- END Conditional Form Fields Renderer ---

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="light-content" backgroundColor="#008080" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Teal Header Section */}
        <View style={styles.header}>
          <SafeAreaView>
            <Logo />
          </SafeAreaView>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Get Started now</Text>
            <Text style={styles.headerSubtitle}>
              Create an account or log in to explore about our app
            </Text>
          </View>
        </View>

        {/* White Form Card Section */}
        <View style={styles.formCard}>
          {/* Log In / Sign Up Tab Selector */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, isLoginActive && styles.activeTab]}
              onPress={() => setIsLoginActive(true)}
            >
              <Text
                style={[styles.tabText, isLoginActive && styles.activeTabText]}
              >
                Log In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                !isLoginActive && styles.activeTab,
                !isLoginActive && styles.activeSignUpTab,
              ]}
              onPress={() => router.push("/(auth)/sign-up")}
            >
              <Text
                style={[styles.tabText, !isLoginActive && styles.activeTabText]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Conditionally Rendered Form Fields */}
          {renderFormFields()}

          {/* Main Action Button */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleAuthAction}
          >
            <Text style={styles.actionButtonText}>
              {isLoginActive ? "Log In" : "Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

// --- Styles (Combined and refined) ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#008080" },
  scrollContent: { flexGrow: 1 },
  header: {
    paddingTop: 0,
    paddingHorizontal: 20,
    backgroundColor: "#008080",
    minHeight: height * 0.3,
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    paddingTop: Platform.OS === "android" ? 10 : 0,
  },
  logoIcon: { marginRight: 8 },
  logoText: { color: "#FFF", fontSize: 15, fontWeight: "700" },
  headerContent: { marginTop: 20 },
  headerTitle: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 5,
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
    fontWeight: "500",
  },

  formCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 30,
    marginTop: -20,
    paddingBottom: 50,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    marginBottom: 30,
    padding: 5,
  },
  tab: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: "center" },
  activeTab: {
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  activeSignUpTab: {
    borderWidth: 1,
    borderColor: "#008080", // Specific style for the Sign Up tab border
  },
  tabText: { fontSize: 12, fontWeight: "600", color: "#888" },
  activeTabText: { color: "#333" },

  label: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
    marginTop: 5,
  },

  // Input Styles
  input: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  // Phone Input Styles (for Sign Up)
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingRight: 5,
    marginTop: 5,
  },
  countryCodeContainer: {
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 11,
    borderBottomLeftRadius: 11,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRightWidth: 1,
    borderColor: "#E0E0E0",
  },
  countryCodeText: { fontSize: 16, color: "#333", fontWeight: "600" },
  phoneTextInput: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 10,
    fontSize: 12,
    color: "#333",
  },

  // Password Styles (Shared)
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 5,
    borderColor: "#E0E0E0",
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  passwordHint: { fontSize: 14, color: "#888", marginRight: 10 },
  passwordToggle: { padding: 10 },

  // Forgot Password (Only for Login)
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginBottom: 30,
  },
  forgotPasswordText: { color: "#008080", fontSize: 14, fontWeight: "600" },

  // Action Button (Shared style, text changes)
  actionButton: {
    backgroundColor: "#008080",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#008080",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  actionButtonText: { color: "#FFF", fontSize: 14, fontWeight: "700" },
});
