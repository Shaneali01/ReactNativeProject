import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Logo } from "./Logo";


const { height } = Dimensions.get("window");

export const AuthHeader = () => (
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
);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    backgroundColor: "#008080",
    minHeight: height * 0.3,
    justifyContent: "space-between",
    paddingBottom: 40,
    marginTop:7
  },
  headerContent: { marginTop: 20 },
  headerTitle: { color: "#FFF", fontSize: 24, fontWeight: "800", marginBottom: 5 },
  headerSubtitle: { color: "rgba(255,255,255,0.9)", fontSize: 14, fontWeight: "500" },
});