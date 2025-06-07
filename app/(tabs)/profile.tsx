import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, ChevronRight, Heart, Calendar, Award, Users, FileText } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('stats');
  
  // Моковые данные
  const user = {
    name: 'Алексей',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    daysSober: 87,
    addiction: 'Алкоголь',
    level: 'Новичок',
    progress: 65,
  };

  const stats = [
    { label: 'Трезвых дней', value: user.daysSober },
    { label: 'Сэкономлено', value: '24 500 ₽' },
    { label: 'Здоровье', value: '+42%' },
  ];

  const achievements = [
    { id: '1', title: 'Первая неделя', icon: '🏆', unlocked: true },
    { id: '2', title: 'Месяц трезвости', icon: '🎖️', unlocked: true },
    { id: '3', title: '90 дней', icon: '🏅', unlocked: false },
  ];

  const menuItems = [
    { id: '1', icon: <Heart size={20} color="#64748B" />, title: 'Понравившиеся посты', screen: 'liked' },
    { id: '2', icon: <Calendar size={20} color="#64748B" />, title: 'Мои записи', screen: 'appointments' },
    { id: '3', icon: <Users size={20} color="#64748B" />, title: 'Подписки', screen: 'following' },
    { id: '4', icon: <FileText size={20} color="#64748B" />, title: 'Мои истории', screen: 'stories' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F172A', '#1E293B']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Шапка */}
        <View style={styles.header}>
          <Text style={styles.title}>Профиль</Text>
          <TouchableOpacity onPress={() => router.push('/settings')}>
            <Settings size={24} color="#64748B" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Информация о пользователе */}
          <View style={styles.profileSection}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userLevel}>{user.level}</Text>
            
            <View style={styles.progressBar}>
              <LinearGradient
                colors={['#2A5CFF', '#3B82F6']}
                style={[styles.progressFill, { width: `${user.progress}%` }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </View>
            <Text style={styles.addictionText}>Без {user.addiction.toLowerCase()}</Text>
          </View>

          {/* Статистика */}
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Достижения */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Достижения</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>Все</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.achievementsContainer}>
              {achievements.map((item) => (
                <TouchableOpacity key={item.id} style={[styles.achievementCard, !item.unlocked && styles.lockedAchievement]}>
                  <Text style={styles.achievementIcon}>{item.icon}</Text>
                  <Text style={styles.achievementTitle}>{item.title}</Text>
                  {!item.unlocked && <View style={styles.lockOverlay} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Меню */}
          <View style={styles.menuSection}>
            {menuItems.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.menuItem}
                onPress={() => router.push(`/profile/${item.screen}`)}
              >
                <View style={styles.menuIcon}>{item.icon}</View>
                <Text style={styles.menuText}>{item.title}</Text>
                <ChevronRight size={20} color="#64748B" />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#2A5CFF',
    marginBottom: 12,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 4,
  },
  userLevel: {
    color: '#2A5CFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    width: '80%',
    backgroundColor: '#334155',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  addictionText: {
    color: '#64748B',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    width: '30%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    color: '#64748B',
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  seeAll: {
    color: '#2A5CFF',
    fontSize: 14,
  },
  achievementsContainer: {
    gap: 12,
    paddingRight: 20,
  },
  achievementCard: {
    width: 100,
    height: 120,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  lockedAchievement: {
    opacity: 0.6,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    textAlign: 'center',
  },
  lockOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderRadius: 12,
  },
  menuSection: {
    backgroundColor: '#1E293B',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#334155',
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#334155',
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    color: '#E2E8F0',
    fontSize: 16,
  },
});

export default ProfileScreen;