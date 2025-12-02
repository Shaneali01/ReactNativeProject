import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* The index.jsx screen will inherit this layout */}
      <Stack.Screen name="index" /> 
    </Stack>
  );
}