import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { AuthActionButton } from "../../components/auth/AuthActionButton";
import { AuthHeader } from "../../components/auth/AuthHeader";
import { AuthTabs } from "../../components/auth/AuthTabs";
import { LoginForm } from "../../components/auth/LoginForm";
import { SignupForm } from "../../components/auth/SignUpForms";


const VALID_USERNAME = "Shaneali";
const VALID_PASSWORD = "12345";

const AuthScreen = () => {
  const router = useRouter();
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthAction = async () => {
    if (isLoading) return;
    setLoginError("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (isLoginActive) {
      if (!emailOrPhone.trim() || !password) {
        setLoginError("Please enter both username/email and password.");
        setIsLoading(false);
        return;
      }
      if (emailOrPhone === VALID_USERNAME && password === VALID_PASSWORD) {
        router.replace("/(tabs)/home");
      } else {
        setLoginError("Invalid username/email or password.");
        setIsLoading(false);
      }
    } else {
      router.replace("/(tabs)/home");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar barStyle="light-content" backgroundColor="#008080" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AuthHeader />

        <View style={styles.formCard}>
          <AuthTabs isLoginActive={isLoginActive} setIsLoginActive={setIsLoginActive} disabled={isLoading} />

          {isLoginActive ? (
            <LoginForm
              emailOrPhone={emailOrPhone}
              setEmailOrPhone={setEmailOrPhone}
              password={password}
              setPassword={setPassword}
              isPasswordVisible={isPasswordVisible}
              setIsPasswordVisible={setIsPasswordVisible}
              loginError={loginError}
              onForgotPassword={() => console.log("Forgot Password")}
              isLoading={isLoading}
            />
          ) : (
            <SignupForm
              fullName={fullName}
              setFullName={setFullName}
              emailOrPhone={emailOrPhone}
              setEmailOrPhone={setEmailOrPhone}
              phone={phone}
              setPhone={setPhone}
              password={password}
              setPassword={setPassword}
              isPasswordVisible={isPasswordVisible}
              setIsPasswordVisible={setIsPasswordVisible}
              isLoading={isLoading}
            />
          )}

          <AuthActionButton isLoginActive={isLoginActive} isLoading={isLoading} onPress={handleAuthAction} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#008080" },
  scrollContent: { flexGrow: 1 },
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
});