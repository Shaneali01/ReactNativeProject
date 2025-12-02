import { Image, StyleSheet, View } from "react-native";
const LOGO_PATH = require("../../assets/images/logo.png"); 
export const Logo = () => (
  <View style={styles.logoContainer}>
    <Image
      source={LOGO_PATH}
      style={styles.logoImage}
      resizeMode="contain"
    />
  </View>
);

const styles = StyleSheet.create({
  logoContainer: {
   marginTop: 30
  },
  logoImage: {
    width: 140,     // Adjust based on your logo's aspect ratio
    height: 40,     // Common height for auth header logos
    // Tip: Keep width ~3.5x height for good proportions
  },
});