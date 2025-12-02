import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

// Use a common color for the active tab icon
const TINT_COLOR = '#008080'; 

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false, // Hide the header for all screens within the tabs
      tabBarActiveTintColor: TINT_COLOR,
      tabBarInactiveTintColor: '#999',
      tabBarStyle: {
        height: 60, // Give the tab bar a little more space
        paddingBottom: 5,
      }
    }}>
      
      {/* 1. Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />
      
      {/* 2. Order Tab */}
      <Tabs.Screen
        name="order"
        options={{
          title: 'Order',
          tabBarIcon: ({ color }) => <Ionicons name="cart-outline" size={24} color={color} />,
        }}
      />
      
      {/* 3. Travel Tab */}
      <Tabs.Screen
        name="travel"
        options={{
          title: 'Travel',
          tabBarIcon: ({ color }) => <Ionicons name="airplane-outline" size={24} color={color} />,
        }}
      />
      
      {/* 4. Inbox Tab */}
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color }) => <Ionicons name="mail-outline" size={24} color={color} />,
          tabBarBadge: 3, // Example of a badge for new messages
        }}
      />

      {/* 5. Settings Tab */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={24} color={color} />,
        }}
      />
      
    </Tabs>
  );
}