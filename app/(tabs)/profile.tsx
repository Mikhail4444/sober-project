import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Импортируем иконки
import { useRouter } from 'expo-router';

const TikTokProfile = () => {
  const router = useRouter();
  // Данные пользователя
  const user = {
    username: '@sober_champion',
    name: 'Алексей',
    bio: '127 дней трезвости | Бросаю вредные привычки',
    followers: '1.2K',
    following: '84',
    likes: '5.7K',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    stats: {
      streak: 27,
      savedMoney: 8500,
      challenges: 15
    }
  };

  // Пример постов
  const posts = [
    { id: 1, type: 'video', title: 'Мой 100-дневный рубеж' },
    { id: 2, type: 'tip', title: 'Как преодолеть тягу' },
    { id: 3, type: 'milestone', title: 'Сэкономил 5000₽' }
  ];

  return (
    <View style={styles.container}>
      {/* Шапка профиля с кнопками в правом углу */}
      <View style={styles.topBar}>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="share-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/settings')}>
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.stats.streak}</Text>
            <Text style={styles.statLabel}>Дней</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.followers}</Text>
            <Text style={styles.statLabel}>Подписчиков</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.following}</Text>
            <Text style={styles.statLabel}>Подписок</Text>
          </View>
        </View>
      </View>

      {/* Остальной код остаётся без изменений */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(user.stats.streak/30)*100}%` }]} />
          </View>
          <Text style={styles.progressText}>{user.stats.streak}/30 дней до цели</Text>
        </View>
      </View>

      {/* Навигация профиля */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.activeTabText}>Мои посты</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Достижения</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Сохраненные</Text>
        </TouchableOpacity>
      </View>

      {/* Контент профиля */}
      <ScrollView style={styles.content}>
        {posts.map(post => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postImage} />
            <Text style={styles.postTitle}>{post.title}</Text>
            <View style={styles.postStats}>
              <Text style={styles.postStat}>▶️ 1.2K</Text>
              <Text style={styles.postStat}>❤️ 245</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  topBar: {
    position: 'absolute',
    top: 40,
    right: 15,
    zIndex: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(42, 92, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 80, // Увеличили отступ сверху для кнопок
    backgroundColor: '#1E293B',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#2A5CFF',
  },
  statsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 5,
  },
  infoContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#1E293B',
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },
  name: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  username: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 2,
  },
  bio: {
    color: 'white',
    fontSize: 14,
    marginTop: 10,
    lineHeight: 20,
  },
  progressContainer: {
    marginTop: 15,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#334155',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2A5CFF',
  },
  progressText: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#334155',
    backgroundColor: '#1E293B',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2A5CFF',
  },
  tabText: {
    color: '#94A3B8',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 10,
    backgroundColor: '#0F172A',
  },
  postCard: {
    marginBottom: 15,
    backgroundColor: '#1E293B',
    borderRadius: 8,
    padding: 12,
  },
  postImage: {
    width: '100%',
    aspectRatio: 9/16,
    backgroundColor: '#334155',
    borderRadius: 5,
  },
  postTitle: {
    color: 'white',
    marginTop: 8,
    fontWeight: '500',
  },
  postStats: {
    flexDirection: 'row',
    marginTop: 5,
  },
  postStat: {
    color: '#94A3B8',
    fontSize: 12,
    marginRight: 15,
  },
});

export default TikTokProfile;