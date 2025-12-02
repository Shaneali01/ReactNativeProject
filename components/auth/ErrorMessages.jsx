import { StyleSheet, Text } from "react-native";

export const ErrorMessage = ({ message }) =>
  message ? <Text style={styles.errorText}>{message}</Text> : null;

const styles = StyleSheet.create({
  errorText: {
    color: "#D32F2F",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
});