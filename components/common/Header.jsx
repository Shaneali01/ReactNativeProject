import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // <-- Import the key component

const Header = ({ title }) => {
  return (
    // 1. Use SafeAreaView, setting edges to 'top' so it manages the status bar area.
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* 2. The inner View handles the main content layout and fixed height */}
      <View style={styles.headerContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        {/* The empty View acts as a spacer to center the title */}
        <View style={styles.backButton} />
      </View>
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
  // 1. The container now has the background color and fills the width.
  // We remove the height and paddingTop from here. The height will be determined by the content + safe area.
  container: {
    backgroundColor: "#008080", // Extends background to the very top
    width: '100%',
  },
  
  // 2. This View is where the old header styles go, but with a flexible height
  // and appropriate alignment.
  headerContent: {
    // The height here determines the content area BELOW the status bar.
    // If you want a fixed size for the content part, you can set a specific height.
    // Let's set the desired content height and let SafeAreaView handle the rest.
    height: 130, // We reduced the height since SafeAreaView adds the status bar padding
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    // Note: If you use a custom font like "Inter", ensure it is loaded correctly.
    // fontFamily: "Inter", 
  },
})