import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const AuthTabs = ({ isLoginActive, setIsLoginActive, disabled }) => (
  <View style={styles.tabContainer}>
    <TouchableOpacity
      style={[styles.tab, isLoginActive && styles.activeTab]}
      onPress={() => setIsLoginActive(true)}
      disabled={disabled}
    >
      <Text style={[styles.tabText, isLoginActive && styles.activeTabText]}>Log In</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.tab, !isLoginActive && styles.activeTab]}
      onPress={() => setIsLoginActive(false)}
      disabled={disabled}
    >
      <Text style={[styles.tabText, !isLoginActive && styles.activeTabText]}>Sign Up</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    borderRadius: 30,
    marginBottom: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tab: { flex: 1, paddingVertical: 9, borderRadius: 30, alignItems: "center" },
  activeTab: {
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  tabText: { fontSize: 12, fontWeight: "500", color: "#888" },
  activeTabText: { color: "#333" },
});