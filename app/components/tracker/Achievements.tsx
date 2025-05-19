import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Trophy, Share2 } from 'lucide-react-native';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

interface AchievementsProps {
  visible: boolean;
  onClose: () => void;
  streak: number;
  weekData: { status: string }[];
  markedDates: { [date: string]: { status?: string } };
}

export const Achievements: React.FC<AchievementsProps> = ({
  visible,
  onClose,
  streak,
  weekData,
  markedDates,
}) => {
  const hasGreenWeek = weekData.every(day => day.status === 'clean');
  const hasNoRedWeek = weekData.every(day => day.status !== 'failed');
  
  const hasGreenMonth = Object.values(markedDates).every(day => day.status === 'clean');
  const hasNoRedMonth = Object.values(markedDates).every(day => day.status !== 'failed');

  const achievements: Achievement[] = [
    {
      id: '1_day',
      title: 'Первый день',
      description: 'Первый день на пути к свободе',
      icon: '🏆',
      unlocked: streak >= 1,
    },
    {
      id: '3_days',
      title: 'Три дня',
      description: 'Три дня без зависимости',
      icon: '🏆',
      unlocked: streak >= 3,
    },
    {
      id: '7_days',
      title: 'Неделя',
      description: 'Целая неделя свободы',
      icon: '🏆',
      unlocked: streak >= 7,
    },
    {
      id: '30_days',
      title: 'Месяц',
      description: 'Месяц без зависимости',
      icon: '🏆',
      unlocked: streak >= 30,
    },
    {
      id: 'green_week',
      title: 'Зеленая неделя',
      description: 'Неделя полностью чистых дней',
      icon: '🌿',
      unlocked: hasGreenWeek,
    },
    {
      id: 'no_red_week',
      title: 'Неделя без срывов',
      description: 'Неделя без неконтролируемых ситуаций',
      icon: '🛡️',
      unlocked: hasNoRedWeek,
    },
    {
      id: 'green_month',
      title: 'Зеленый месяц',
      description: 'Месяц полностью чистых дней',
      icon: '🌿',
      unlocked: hasGreenMonth,
    },
    {
      id: 'no_red_month',
      title: 'Месяц без срывов',
      description: 'Месяц без неконтролируемых ситуаций',
      icon: '🛡️',
      unlocked: hasNoRedMonth,
    },
  ];

  const handleShare = (achievement: Achievement) => {
    // Здесь будет логика шаринга в сообщество или чат
    console.log('Sharing achievement:', achievement.title);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Достижения</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.achievementsList}>
            {achievements.map((achievement) => (
              <View 
                key={achievement.id} 
                style={[
                  styles.achievementCard,
                  !achievement.unlocked && styles.achievementLocked
                ]}
              >
                <View style={styles.achievementHeader}>
                  <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                  <View style={styles.achievementInfo}>
                    <Text style={styles.achievementTitle}>{achievement.title}</Text>
                    <Text style={styles.achievementDescription}>
                      {achievement.description}
                    </Text>
                  </View>
                </View>
                
                {achievement.unlocked && (
                  <TouchableOpacity 
                    style={styles.shareButton}
                    onPress={() => handleShare(achievement)}
                  >
                    <Share2 size={20} color="#2A5CFF" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    width: '90%',
    maxHeight: '80%',
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
    fontSize: 24,
    color: '#FFFFFF',
  },
  closeButton: {
    color: '#FFFFFF',
    fontSize: 24,
    padding: 4,
  },
  achievementsList: {
    flex: 1,
  },
  achievementCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  achievementDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  shareButton: {
    padding: 8,
  },
}); 