// app/(tabs)/home/_layout.jsx
import { Stack, useRouter } from "expo-router"; // 👈 Added useRouter

export default function HomeLayout() {
  const router = useRouter(); // 👈 Initialize the hook

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
          // The headerLeft prop must be a function that returns a React element
          headerLeft: () => (
            <TouchableOpacity
              // Use the router instance initialized above
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