import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import MessagesListScreen from '../screens/MessagesListScreen';
import AdvancedSearchScreen from '../screens/AdvancedSearchScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TABS = [
  { name: 'Home', label: 'الرئيسية', component: HomeScreen, icon: 'home', iconOutline: 'home-outline' },
  { name: 'Messages', label: 'رسائلي', component: MessagesListScreen, icon: 'chatbubbles', iconOutline: 'chatbubbles-outline', badge: 3 },
  { name: 'Search', label: 'البحث', component: AdvancedSearchScreen, icon: 'search', iconOutline: 'search-outline' },
  { name: 'Profile', label: 'حسابي', component: ProfileScreen, icon: 'person', iconOutline: 'person-outline' },
];

const BottomTabNavigator = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.12,
          shadowRadius: 12,
          height: Platform.OS === 'ios' ? 80 : 62,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.secondaryGold,
        tabBarInactiveTintColor: colors.mediumGray,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
      }}
    >
      {TABS.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarLabel: tab.label,
            tabBarBadge: tab.badge || undefined,
            tabBarBadgeStyle: { backgroundColor: colors.secondaryGold, color: colors.primaryDark, fontSize: 10, fontWeight: '800' },
            tabBarIcon: ({ focused, color }) => (
              <Ionicons name={focused ? tab.icon : tab.iconOutline} size={24} color={color} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
