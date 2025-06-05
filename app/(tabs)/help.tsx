import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Phone, BookOpen, Users, AlertCircle, MessageCircle, Heart} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function Help() {
  const emergencyNumbers = [
    { id: 1, name: 'Горячая линия', number: '8-800-200-0-200' },
    { id: 2, name: 'Психологическая помощь', number: '8-800-333-44-44' },
  ];

  const handleCall = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  // Функции для навигации
  const goToSupportGroups = () => {
    router.push('/SupportGroups');
  };

  const goToProfessionalHelp = () => {
    router.push('/ProfessionalHelp');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F172A', '#1E293B']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Помощь и поддержка</Text>
            <Text style={styles.subtitle}>Ваше выздоровление - наш главный приоритет</Text>
          </View>

          <View style={styles.emergencyCard}>
            <View style={styles.emergencyHeader}>
              <AlertCircle size={24} color="#2A5CFF" />
              <Text style={styles.emergencyTitle}>Экстренная помощь</Text>
            </View>
            <Text style={styles.emergencyText}>
              При сильной тяге:{'\n\n'}
              1. Сделайте 5 глубоких вдохов{'\n'}
              2. Выпейте стакан воды{'\n'}
              3. Позвоните доверенному человеку{'\n'}
              4. Выйдите на прогулку{'\n'}
              5. Вспомните свои причины бросить
            </Text>
            <TouchableOpacity style={styles.emergencyButton}>
              <Text style={styles.emergencyButtonText}>Полное руководство</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Телефоны поддержки</Text>
            {emergencyNumbers.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.phoneCard}
                onPress={() => handleCall(item.number)}
              >
                <View style={styles.phoneIcon}>
                  <Phone size={20} color="#2A5CFF" />
                </View>
                <View style={styles.phoneInfo}>
                  <Text style={styles.phoneName}>{item.name}</Text>
                  <Text style={styles.phoneNumber}>{item.number}</Text>
                </View>
                <Text style={styles.callButton}>Позвонить →</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Переработанные полезные материалы */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ресурсы</Text>
            
            {/* Обновлённая карточка "Поддержка близких" */}
            {/* <TouchableOpacity style={styles.guideCard}>
              <View style={[styles.guideIcon, { backgroundColor: 'rgba(255, 82, 82, 0.1)' }]}>
                <BookOpen size={20} color="#FF5252" />
              </View>
              <View style={styles.guideContent}>
                <Text style={styles.guideTitle}>Поддержка близких</Text>
                <Text style={styles.guideDescription}>
                  5 шагов для разговора + шаблоны фраз
                </Text>
                <View style={styles.inlineButtons}>
                  <TouchableOpacity style={styles.smallButton}>
                    <Text style={styles.smallButtonText}>Примеры диалогов</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.smallButton}>
                    <Text style={styles.smallButtonText}>Чат-тренажёр</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity> */}

            {/* Новая карточка для экстренного чата */}
            {/* <TouchableOpacity style={[styles.guideCard, { backgroundColor: '#1E3A8A' }]}>
              <View style={[styles.guideIcon, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
                <MessageCircle size={20} color="#FFFFFF" />
              </View>
              <View style={styles.guideContent}>
                <Text style={[styles.guideTitle, { color: '#FFFFFF' }]}>Экстренный чат</Text>
                <Text style={[styles.guideDescription, { color: '#BFDBFE' }]}>
                  Немедленная помощь при кризисном состоянии
                </Text>
              </View>
            </TouchableOpacity> */}

            {/* Раздел поддержки разбит на две карточки */}
            <TouchableOpacity 
              style={styles.guideCard}
              onPress={goToSupportGroups}
            >
              <View style={[styles.guideIcon, { backgroundColor: 'rgba(33, 150, 243, 0.1)' }]}>
                <Users size={20} color="#2196F3" />
              </View>
              <View style={styles.guideContent}>
                <Text style={styles.guideTitle}>Анонимные группы поддержки</Text>
                <Text style={styles.guideDescription}>
                  Найдите встречи АА и других сообществ в вашем городе
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.guideCard}
              onPress={goToProfessionalHelp}
            >
              <View style={[styles.guideIcon, { backgroundColor: 'rgba(76, 175, 80, 0.1)' }]}>
                <Heart size={20} color="#4CAF50" />
              </View>
              <View style={styles.guideContent}>
                <Text style={styles.guideTitle}>Профессиональная помощь</Text>
                <Text style={styles.guideDescription}>
                  Подберите психолога, нарколога или реабилитационный центр
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    lineHeight: 24,
  },
  emergencyCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 20,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emergencyText: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 22,
    marginBottom: 20,
  },
  emergencyButton: {
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#2A5CFF',
    borderRadius: 12,
  },
  emergencyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  section: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  phoneCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  phoneIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(42, 92, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  phoneInfo: {
    flex: 1,
  },
  phoneName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#64748B',
  },
  callButton: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2A5CFF',
  },
  guideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  guideIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  guideContent: {
    flex: 1,
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  guideDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  quickActionButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  quickActionGradient: {
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  quickActionText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  inlineButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  smallButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  smallButtonText: {
    color: '#FF5252',
    fontSize: 12,
    fontWeight: '500',
  },
});