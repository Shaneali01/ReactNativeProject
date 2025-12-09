import { Tabs, useSegments } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';
// If using 'react-native-safe-area-context', you would import useSafeAreaInsets here,
// but we will rely on default navigation behavior first.

const TINT_COLOR = '#008080';
const INACTIVE_COLOR = '#999';

// Your single icons (no active version needed)
import HomeIcon from '../../assets/images/Home.png';
import InboxIcon from '../../assets/images/Inbox.png';
import OrderIcon from '../../assets/images/Order.png';
import SettingsIcon from '../../assets/images/Setting.png';
import TravelIcon from '../../assets/images/Travel.png';

export default function TabLayout() {
  const segments = useSegments();
  const hideTabBar = segments.includes('Chat');

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: TINT_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarStyle: {
          minHeight: 60, // Common default tab bar height
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          backgroundColor: '#fff',
          display: hideTabBar ? 'none' : 'flex',
        },
        tabBarItemStyle: {
          paddingVertical: 0, // Ensure no vertical padding is added here
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          textTransform: 'capitalize',
        },
        tabBarIcon: () => null, 
        tabBarHideOnKeyboard: false,
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.activeLine} />}
              <Image
                source={HomeIcon}
                style={[
                  styles.icon,
                  { tintColor: focused ? TINT_COLOR : INACTIVE_COLOR },
                ]}
                resizeMode="contain"
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
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.activeLine} />}
              <Image
                source={OrderIcon}
                style={[
                  styles.icon,
                  { tintColor: focused ? TINT_COLOR : INACTIVE_COLOR },
                ]}
                resizeMode="contain"
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
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.activeLine} />}
              <Image
                source={TravelIcon}
                style={[
                  styles.icon,
                  { tintColor: focused ? TINT_COLOR : INACTIVE_COLOR },
                ]}
                resizeMode="contain"
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
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.activeLine} />}
              <Image
                source={InboxIcon}
                style={[
                  styles.icon,
                  { tintColor: focused ? TINT_COLOR : INACTIVE_COLOR },
                ]}
                resizeMode="contain"
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
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.activeLine} />}
              <Image
                source={SettingsIcon}
                style={[
                  styles.icon,
                  { tintColor: focused ? TINT_COLOR : INACTIVE_COLOR },
                ]}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  // We've added flexGrow: 1 and made it vertically center the content.
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1, // Allows the container to fill the available vertical space
    width: 60,
  },
  icon: {
    width: 26,
    height: 26,
  },
  activeLine: {
    // Top is now relative to the iconContainer, which is well-centered.
    position: 'absolute',
    top: -8, 
    height: 3,
    width: 30,
    backgroundColor: TINT_COLOR,
    borderRadius: 2,
  },
});