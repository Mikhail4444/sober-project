import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, TextInput, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronDown, MessageCircle, Heart, Share, Plus, Filter } from 'lucide-react-native';
import { useRouter } from 'expo-router';

// Mock данные постов
const posts = [
  {
    id: '1',
    user: {
      name: 'Аноним',
      avatar: require('../../assets/images/woman.jpg'),
      daysSober: 45,
    },
    content: 'Сегодня 30 дней без сигарет! Чувствую себя намного лучше, появилась энергия.',
    likes: 12,
    comments: 4,
    time: '2 часа назад',
    tags: ['успех', 'никотин'],
  },
  {
    id: '2',
    user: {
      name: 'Аноним',
      avatar: require('../../assets/images/man.jpg'),
      daysSober: 120,
    },
    content: 'Как вы справляетесь с тягой в стрессовых ситуациях? Ищу советы...',
    likes: 8,
    comments: 7,
    time: '5 часов назад',
    tags: ['вопрос', 'поддержка'],
  },
];

export default function CommunityScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('new');
  const [newPostText, setNewPostText] = useState('');

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
          <Text style={styles.title}>Сообщество</Text>
          <TouchableOpacity onPress={() => router.push('/community/filters')}>
            <Filter size={24} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Фильтры */}
        <View style={styles.filtersWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContainer}
          >
            {['Новые', 'Популярные', 'Мои посты'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterPill,
                  activeFilter === filter.toLowerCase() && styles.activeFilter
                ]}
                onPress={() => setActiveFilter(filter.toLowerCase())}
              >
                <Text 
                  style={[
                    styles.filterText,
                    activeFilter === filter.toLowerCase() && styles.activeFilterText
                  ]}
                  numberOfLines={1} // Предотвращаем перенос текста
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Лента постов */}
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              {/* Заголовок поста */}
              <View style={styles.postHeader}>
                <Image source={ item.user.avatar } style={styles.avatar} />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{item.user.name}</Text>
                  <Text style={styles.userDays}>{item.user.daysSober} дней трезвости</Text>
                </View>
                <Text style={styles.postTime}>{item.time}</Text>
              </View>

              {/* Текст поста */}
              <Text style={styles.postContent}>{item.content}</Text>

              {/* Теги */}
              <View style={styles.tagsContainer}>
                {item.tags.map((tag) => (
                  <Text key={tag} style={styles.tag}>#{tag}</Text>
                ))}
              </View>

              {/* Действия */}
              <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Heart size={18} color="#64748B" />
                  <Text style={styles.actionText}>{item.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <MessageCircle size={18} color="#64748B" />
                  <Text style={styles.actionText}>{item.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Share size={18} color="#64748B" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        {/* Кнопка создания поста */}
        <TouchableOpacity 
          style={styles.createPostButton}
          onPress={() => router.push('/community/new-post')}
        >
          <Plus size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

// Стили
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
  filtersWrapper: {
    paddingHorizontal: 8, // Добавляем отступы по бокам
    marginBottom: 12,
  },
  filtersContainer: {
    paddingHorizontal: 12, // Отступ внутри скролла
    gap: 8, // Фиксированный отступ между кнопками
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    minWidth: 100, // Минимальная ширина для всех кнопок
    alignItems: 'center',
    justifyContent: 'center',
  },  
  activeFilter: {
    backgroundColor: '#2A5CFF',
    borderColor: '#2A5CFF',
  },
  filterText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
    includeFontPadding: false, // Убираем лишние отступы у текста
  },
  activeFilterText: {
    color: 'white',
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  postCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  userDays: {
    color: '#64748B',
    fontSize: 12,
  },
  postTime: {
    color: '#64748B',
    fontSize: 12,
  },
  postContent: {
    color: '#E2E8F0',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    color: '#2A5CFF',
    fontSize: 13,
  },
  postActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    color: '#64748B',
    fontSize: 14,
  },
  createPostButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2A5CFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});