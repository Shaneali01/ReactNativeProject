import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { height } = Dimensions.get('window');

// --- Component ---
const SignUpScreen = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  // Note: We set isLoginActive to false here to default to the Sign Up tab
  const [isLoginActive, setIsLoginActive] = useState(false); 

  // Function to simulate user registration
  const handleSignUp = () => {
    // In a real app, you'd perform registration and save the user session.
    console.log('Attempting sign up...');
    // After success, navigate to the main tabs (or verification screen):
    router.replace('/(tabs)'); 
  };
  
  // Function to navigate back to the Log In screen
  const handleLogInPress = () => {
    // Navigate to the Log In screen route
    router.push('/(auth)/sign-in');
  };

  // Placeholder for your app logo component or image
  const Logo = () => (
    <View style={styles.logoContainer}>
      {/* Replace with your actual logo image source */}
      <Ionicons name="bag-handle-outline" size={24} color="#FFF" style={styles.logoIcon} />
      <Text style={styles.logoText}>GrabnGo</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
              onPress={handleLogInPress} // Navigates to sign-in.jsx
            >
              <Text style={[styles.tabText, isLoginActive && styles.activeTabText]}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, !isLoginActive && styles.activeTab]}
              onPress={() => setIsLoginActive(false)} // Stays on this screen
            >
              <Text style={[styles.tabText, !isLoginActive && styles.activeTabText]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          
          {/* Form Fields */}
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
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Phone Number</Text>
          {/* Phone Number Input with Country Code/Label (Simplified) */}
          <View style={styles.phoneInputContainer}>
            <View style={styles.countryCodeContainer}>
                <Text style={styles.countryCodeText}>US</Text>
            </View>
            <TextInput
                style={styles.phoneTextInput}
                placeholder="none" // Placeholder for the number part
                placeholderTextColor="#999"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <Ionicons name="ellipse-outline" size={18} color="#999" style={{marginRight: 10}} />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
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
                name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'} 
                size={24} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>
          
          {/* Sign Up Button (The larger, final action button) */}
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
          
        </View>
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

// --- Styles (Shared styles from the sign-in screen are reused for consistency) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008080', // Teal background
  },
  scrollContent: {
    flexGrow: 1,
  },
  
  // Header Styles
  header: {
    paddingTop: 0,
    paddingHorizontal: 25,
    backgroundColor: '#008080',
    minHeight: height * 0.3, 
    justifyContent: 'space-between',
    paddingBottom: 20, 
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  logoIcon: {
    marginRight: 8,
  },
  logoText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },
  headerContent: {
    marginTop: 20,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 5,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '500',
  },

  // Form Card Styles
  formCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 30,
    marginTop: -20, // Pull the card up over the header line
    paddingBottom: 50,
  },
  
  // Tab Styles
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    marginBottom: 30,
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFF', // White background for the active tab
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1, // Added for the border effect shown on the Sign Up tab
    borderColor: '#008080',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
  },
  activeTabText: {
    color: '#333',
  },
  
  // Input Field Styles
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#FFF', // White background for the input field itself
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  
  // Phone Input Specific Styles (to handle the segmented look)
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingRight: 5,
  },
  countryCodeContainer: {
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 11,
    borderBottomLeftRadius: 11,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRightWidth: 1,
    borderColor: '#E0E0E0',
  },
  countryCodeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  phoneTextInput: {
    flex: 1,
    paddingVertical: 15,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  
  // Password Input Styles
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 30, // Extra space at the bottom
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  passwordHint: {
    fontSize: 14,
    color: '#888',
    marginRight: 10,
  },
  passwordToggle: {
    padding: 10,
  },
  
  // Sign Up Button
  signUpButton: {
    backgroundColor: '#008080',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#008080',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    marginTop: 10,
  },
  signUpButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
});