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
    <View style={styles.container}>
      <LinearGradient
        colors={['#00E5FF', '#5B10D4']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
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

        <ScrollView style={styles.content}>
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
        </ScrollView>

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
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  content: {
    flex: 1,
    padding: 16,
  },
  categories: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryActive: {
    backgroundColor: '#00E5FF',
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
    margin: 16,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quizTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: '#2C3E50',
    marginBottom: 8,
  },
  quizQuestion: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 16,
  },
  quizButton: {
    backgroundColor: '#00E5FF',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  quizButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  storyCard: {
    margin: 16,
    marginTop: 0,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
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
    color: '#2C3E50',
    marginBottom: 4,
  },
  storyAuthor: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#7F8C8D',
  },
  storyPreview: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#2C3E50',
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
    color: '#7F8C8D',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: '#2C3E50',
    marginBottom: 16,
  },
  modalText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    width: '100%',
    gap: 12,
  },
  modalButton: {
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  modalButtonPrimary: {
    backgroundColor: '#4CAF50',
  },
  modalButtonSecondary: {
    backgroundColor: '#E0E0E0',
  },
  modalButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#fff',
  },
});