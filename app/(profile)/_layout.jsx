// app/(tabs)/home/_layout.jsx
import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" /> {/* home/index.jsx */}
      {/* <Stack.Screen
        name="place-order"
        options={{
          headerShown: true,
          title: "Place Your Order",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#008080" },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginLeft: 15 }}
            >
              <Ionicons name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      /> */}
    </Stack>
  );
}