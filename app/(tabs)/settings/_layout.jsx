// app/(tabs)/order/_layout.jsx
// app/(tabs)/travel/_layout.jsx
// app/(tabs)/inbox/_layout.jsx
// app/(tabs)/settings/_layout.jsx

import { Stack } from "expo-router";

export default function TabScreenLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Preferences"/>
    </Stack>
  );
}