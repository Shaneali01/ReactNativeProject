import { Ionicons } from '@expo/vector-icons';
import { Tabs, useSegments } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const TINT_COLOR = '#008080';

export default function TabLayout() {
    const segments = useSegments();  // ← Get current route segments

  // Hide tab bar on these screens
  const hideTabBar = segments.includes("Chat");  // ← For ChatScreen
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: TINT_COLOR,
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          textTransform: 'capitalize',
        },

        /** 🔥 FIX: Keep tab bar height stable */
        tabBarStyle: {
          height: 70,
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          backgroundColor: '#fff',
          display: hideTabBar ? 'none' : 'flex',
        },
        tabBarItemStyle: {
          paddingTop: 8,
          paddingBottom: 10,
        },

        /** Prevent layout resets */
        tabBarHideOnKeyboard: false,

        // We define icons manually per tab
        tabBarIcon: () => null,
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.activeLine} />}
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />

      {/* Order */}
      <Tabs.Screen
        name="order"
        options={{
          title: 'Order',
          tabBarIcon: ({ focused, color }) => (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.activeLine} />}
              <Ionicons
                name={focused ? 'cart' : 'cart-outline'}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />

      {/* Travel */}
      <Tabs.Screen
        name="travel"
        options={{
          title: 'Travel',
          tabBarIcon: ({ focused, color }) => (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.activeLine} />}
              <Ionicons
                name={focused ? 'airplane' : 'airplane-outline'}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />

      {/* Inbox */}
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          tabBarBadge: 3,
          tabBarBadgeStyle: { backgroundColor: TINT_COLOR },
          tabBarIcon: ({ focused, color }) => (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.activeLine} />}
              <Ionicons
                name={focused ? 'mail' : 'mail-outline'}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />

      {/* Settings */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused, color }) => (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.activeLine} />}
              <Ionicons
                name={focused ? 'settings' : 'settings-outline'}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  activeLine: {
    position: 'absolute',
    top: -8,
    height: 3,
    width: 30,
    backgroundColor: TINT_COLOR,
    borderRadius: 2,
  },
});
