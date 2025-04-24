import { Tabs } from 'expo-router';
import { Chrome as Home, MessageSquare, Users, Heart } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#f0f0f0',
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#999',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Главная',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'AI Чат',
          tabBarIcon: ({ color, size }) => <MessageSquare size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Сообщество',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: 'Помощь',
          tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}