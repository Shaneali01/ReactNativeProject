import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";

export const AuthActionButton = ({ isLoginActive, isLoading, onPress }) => (
  <TouchableOpacity
    style={[styles.actionButton, isLoading && styles.actionButtonDisabled]}
    onPress={onPress}
    disabled={isLoading}
  >
    {isLoading ? (
      <ActivityIndicator color="#FFF" />
    ) : (
      <Text style={styles.actionButtonText}>{isLoginActive ? "Log In" : "Sign Up"}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
    marginTop:0,
  },
  actionButtonText: { color: "#FFF", fontSize: 14, fontWeight: "700" },
  actionButtonDisabled: { opacity: 0.7 },
});