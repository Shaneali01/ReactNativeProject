import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export const SignupForm = ({
  fullName,
  setFullName,
  emailOrPhone,
  setEmailOrPhone,
  phone,
  setPhone,
  password,
  setPassword,
  isPasswordVisible,
  setIsPasswordVisible,
  isLoading,
}) => (
  <>
    <Text style={styles.label}>Full Name</Text>
    <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} editable={!isLoading} />

    <Text style={styles.label}>Email Address</Text>
    <TextInput
      style={styles.input}
      placeholder="Email Address"
      value={emailOrPhone}
      onChangeText={setEmailOrPhone}
      keyboardType="email-address"
      autoCapitalize="none"
      editable={!isLoading}
    />

    <Text style={styles.label}>Phone Number</Text>
    <View style={styles.phoneInputContainer}>
      <View style={styles.countryCodeContainer}>
        <Text style={styles.countryCodeText}>US</Text>
      </View>
      <TextInput
        style={styles.phoneTextInput}
        placeholder="none"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        editable={!isLoading}
      />
      <Ionicons name="ellipse-outline" size={18} color="#999" style={{ marginRight: 10 }} />
    </View>

    <Text style={styles.label}>Password</Text>
    <View style={[styles.passwordContainer, { marginBottom: 30 }]}>
      <TextInput
        style={styles.passwordInput}
        placeholder="********"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!isPasswordVisible}
        editable={!isLoading}
      />
      <Text style={styles.passwordHint}>#66</Text>
      <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.passwordToggle} disabled={isLoading}>
        <Ionicons name={isPasswordVisible ? "eye-outline" : "eye-off-outline"} size={24} color="#666" />
      </TouchableOpacity>
    </View>
  </>
);

const styles = StyleSheet.create({
  label: { fontSize: 12, fontWeight: "500", color: "#333", marginBottom: 8, marginTop: 5 },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 12,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingRight: 5,
    marginTop: 5,
    marginBottom: 15,
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
  countryCodeText: { fontSize: 12, color: "#333", fontWeight: "600" },
  phoneTextInput: { flex: 1, paddingVertical: 10, paddingLeft: 10, fontSize: 12, color: "#333" },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginTop: 5,
  },
  passwordInput: { flex: 1, paddingHorizontal: 15, paddingVertical: 10, fontSize: 16, color: "#333" },
  passwordHint: { fontSize: 14, color: "#888", marginRight: 10 },
  passwordToggle: { padding: 10 },
});