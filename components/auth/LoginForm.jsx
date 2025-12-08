import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ErrorMessage } from "./ErrorMessages";

export const LoginForm = ({
  emailOrPhone,
  setEmailOrPhone,
  password,
  setPassword,
  isPasswordVisible,
  setIsPasswordVisible,
  loginError,
  onForgotPassword,
  isLoading,
}) => (
  <>
    <Text style={styles.label}>Username or Email</Text>
    <TextInput
      style={styles.input}
      placeholder="Full Name"
      placeholderTextColor="#999"
      value={emailOrPhone}
      onChangeText={setEmailOrPhone}
      keyboardType="email-address"
      autoCapitalize="none"
      editable={!isLoading}
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
        editable={!isLoading}
      />
      <TouchableOpacity
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        style={styles.passwordToggle}
        disabled={isLoading}
      >
        <Ionicons
          name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
          size={24}
          color="#666"
        />
      </TouchableOpacity>
    </View>

    <ErrorMessage message={loginError} />

    <TouchableOpacity
      onPress={onForgotPassword}
      style={styles.forgotPasswordButton}
      disabled={isLoading}
    >
      <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
    </TouchableOpacity>
  </>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
    marginTop: 5,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: "600",
    color: "#0000",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 12,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginTop: 5,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  passwordToggle: { padding: 10 },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginBottom: 30,
  },
  forgotPasswordText: { color: "#008080", fontSize: 14, fontWeight: "600" },
});
