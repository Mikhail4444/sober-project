import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { MessageCircle, ThumbsUp, Filter, Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Community() {
  // const { isGuest } = useAuth();
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const stories = [
    {
      id: 1,
      title: '100 дней свободы: Моя история',
      author: 'Аноним',
      days: 100,
      likes: 24,
      comments: 8,
      preview: 'Никогда не думал, что смогу дойти до этой отметки...',
    },
    {
      id: 2,
      title: 'Первая неделя позади',
      author: 'Новичок',
      days: 7,
      likes: 45,
      comments: 12,
      preview: 'Самые сложные дни остались позади...',
    },
  ];

  // const handleComment = () => {
  //   if (isGuest) {
  //     setShowRegisterModal(true);
  //   } else {
  //     // Логика добавления комментария
  //   }
  // };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Сообщество</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#fff" />
          <Text style={styles.filterText}>Фильтры</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categories}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={[styles.categoryButton, styles.categoryActive]}>
            <Text style={[styles.categoryText, styles.categoryTextActive]}>Все истории</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Новички</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>100+ дней</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Мой регион</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.quizCard}>
        <Text style={styles.quizTitle}>Дневной квиз</Text>
        <Text style={styles.quizQuestion}>Продолжи фразу: Когда тянет, я...</Text>
        <TouchableOpacity style={styles.quizButton}>
          <Text style={styles.quizButtonText}>Ответить</Text>
        </TouchableOpacity>
      </View>

      {stories.map((story) => (
        <View key={story.id} style={styles.storyCard}>
          <View style={styles.storyHeader}>
            <View>
              <Text style={styles.storyTitle}>{story.title}</Text>
              <Text style={styles.storyAuthor}>{story.author} • {story.days} дней</Text>
            </View>
          </View>
          <Text style={styles.storyPreview}>{story.preview}</Text>
          <View style={styles.storyActions}>
            <TouchableOpacity style={styles.actionButton}>
              <ThumbsUp size={18} color="#666" />
              <Text style={styles.actionText}>{story.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              // onPress={handleComment}
            >
              <MessageCircle size={18} color="#666" />
              <Text style={styles.actionText}>{story.comments}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Modal
        visible={showRegisterModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Регистрация</Text>
            <Text style={styles.modalText}>
              Зарегистрируйтесь, чтобы участвовать в обсуждениях
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonPrimary]}
                onPress={() => {
                  setShowRegisterModal(false);
                  // Навигация на страницу регистрации
                }}
              >
                <Text style={styles.modalButtonText}>Зарегистрироваться</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonSecondary]}
                onPress={() => setShowRegisterModal(false)}
              >
                <Text style={styles.modalButtonText}>Отмена</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    color: '#fff',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  filterText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  categories: {
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryActive: {
    backgroundColor: '#2A5CFF',
  },
  categoryText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  categoryTextActive: {
    color: '#fff',
  },
  quizCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  quizTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: '#fff',
    marginBottom: 8,
  },
  quizQuestion: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
  },
  quizButton: {
    backgroundColor: '#2A5CFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  quizButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  storyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  storyTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 4,
  },
  storyAuthor: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  storyPreview: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
  },
  storyActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    gap: 12,
  },
  modalButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonPrimary: {
    backgroundColor: '#2A5CFF',
  },
  modalButtonSecondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#fff',
  },
});