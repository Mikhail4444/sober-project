import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Dimensions, Image } from 'react-native';
import { Calendar as CalendarIcon, DollarSign, User, Trophy, X, Settings, Globe } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import { useAuth } from '../context/AuthContext';
// import { useApp } from '../context/AppContext';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const DAYS_IN_WEEK = 7;
const CALENDAR_DAYS = 42; // 6 недель

interface MarkedDate {
  color: string;
}

interface MarkedDates {
  [key: string]: MarkedDate;
}

const themes = [
  { id: 'default', name: 'По умолчанию' },
  { id: 'dark', name: 'Темная' },
  { id: 'light', name: 'Светлая' },
  { id: 'custom', name: 'Пользовательская' },
];

const languages = [
  { id: 'ru', name: 'Русский' },
  { id: 'tt', name: 'Татарский' },
  { id: 'en', name: 'English' },
];

export default function Dashboard() {
  // const { user, isGuest, logout } = useAuth();
  // const { theme, setTheme, language, setLanguage, notifications } = useApp();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showRelapseModal, setShowRelapseModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [markedDates, setMarkedDates] = useState<MarkedDates>({
    '2024-03-01': { color: '#4CAF50' }, // Зеленый - день чист
    '2024-03-05': { color: '#FFC107' }, // Желтый - контролируемый срыв
    '2024-03-10': { color: '#F44336' }, // Красный - срыв
  });

  const daysWithoutRelapse = 15;
  const moneySaved = 750;

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, firstDayOfWeek };
  };

  const renderCalendar = () => {
    const { daysInMonth, firstDayOfWeek } = getDaysInMonth(selectedDate);
    const days = [];
    const currentDate = new Date();
    
    // Добавляем пустые дни в начале месяца
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }
    
    // Добавляем дни месяца
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
      const dateString = date.toISOString().split('T')[0];
      const isToday = date.toDateString() === currentDate.toDateString();
      const markedDate = markedDates[dateString];
      
      days.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.calendarDay,
            isToday && styles.today,
            markedDate && { backgroundColor: markedDate.color }
          ]}
          onPress={() => {
            if (markedDate) {
              delete markedDates[dateString];
            } else {
              setMarkedDates({
                ...markedDates,
                [dateString]: { color: '#4CAF50' }
              });
            }
          }}
        >
          <Text style={[
            styles.calendarDayText,
            isToday && styles.todayText,
            markedDate && styles.markedDayText
          ]}>
            {i}
          </Text>
        </TouchableOpacity>
      );
    }
    
    return days;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#00E5FF', '#5B10D4']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
      <View style={styles.header}>
        <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerDate}>08:00</Text>
              <Text style={styles.headerTitle}>Доброе утро</Text>
      </View>
      {/* <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => setShowProfile(true)}
            >
              <View style={styles.avatarContainer}>
                {user?.avatar ? (
                  <Image 
                    source={{ uri: user.avatar }} 
                    style={styles.avatar}
                  />
                ) : (
                  <User size={24} color="#fff" />
                )}
              </View>
              {notifications > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationText}>
                    {notifications > 99 ? '99+' : notifications}
                  </Text>
                </View>
              )}
      </TouchableOpacity> */}
          </View>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.mainCard}>
            <View style={styles.mainCardHeader}>
              <View style={styles.mainCardTitle}>
                <CalendarIcon size={24} color="#00E5FF" />
                <Text style={styles.mainCardTitleText}>Дней без срыва</Text>
        </View>
              <Text style={styles.daysCount}>{daysWithoutRelapse}</Text>
      </View>

            <View style={styles.buttonsRow}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.cleanDayButton]}
                onPress={() => {
                  const today = new Date().toISOString().split('T')[0];
                  setMarkedDates({
                    ...markedDates,
                    [today]: { color: '#4CAF50' }
                  });
                }}
              >
                <Text style={styles.actionButtonText}>День чист</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, styles.relapseButton]}
                onPress={() => setShowRelapseModal(true)}
              >
                <Text style={styles.actionButtonText}>Срыв</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonsRow}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.secondaryButton]}
                onPress={() => setShowCalendar(true)}
              >
                <DollarSign size={20} color="#fff" />
                <Text style={styles.actionButtonText}>Сэкономлено</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, styles.secondaryButton]}
                onPress={() => setShowCalendar(true)}
              >
                <Trophy size={20} color="#fff" />
                <Text style={styles.actionButtonText}>Челленджи</Text>
        </TouchableOpacity>
      </View>
          </View>
        </ScrollView>
      </LinearGradient>

      <Modal
        visible={showCalendar}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Календарь</Text>
            <View style={styles.calendarHeader}>
              <Text style={styles.calendarMonth}>
                {selectedDate.toLocaleString('ru', { month: 'long', year: 'numeric' })}
              </Text>
            </View>
            <View style={styles.calendarGrid}>
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                <Text key={day} style={styles.calendarWeekDay}>{day}</Text>
              ))}
              {renderCalendar()}
            </View>
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
                <Text style={styles.legendText}>День чист</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#FFC107' }]} />
                <Text style={styles.legendText}>Контролируемый срыв</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#F44336' }]} />
                <Text style={styles.legendText}>Срыв</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.closeButtonText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showRelapseModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowRelapseModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Тип срыва</Text>
            <TouchableOpacity 
              style={[styles.relapseOption, { backgroundColor: 'rgba(255, 193, 7, 0.1)' }]}
              onPress={() => {
                const today = new Date().toISOString().split('T')[0];
                setMarkedDates({
                  ...markedDates,
                  [today]: { color: '#FFC107' }
                });
                setShowRelapseModal(false);
              }}
            >
              <View style={[styles.relapseDot, { backgroundColor: '#FFC107' }]} />
              <View>
                <Text style={styles.relapseOptionTitle}>Контролируемое употребление</Text>
                <Text style={styles.relapseOptionSubtitle}>(например, 1 бокал вина)</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.relapseOption, { backgroundColor: 'rgba(244, 67, 54, 0.1)' }]}
              onPress={() => {
                const today = new Date().toISOString().split('T')[0];
                setMarkedDates({
                  ...markedDates,
                  [today]: { color: '#F44336' }
                });
                setShowRelapseModal(false);
              }}
            >
              <View style={[styles.relapseDot, { backgroundColor: '#F44336' }]} />
              <View>
                <Text style={styles.relapseOptionTitle}>Не контролировал ситуацию</Text>
                <Text style={styles.relapseOptionSubtitle}>(много выпил)</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowRelapseModal(false)}
            >
              <Text style={styles.closeButtonText}>Отмена</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* <Modal
        visible={showProfile}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowProfile(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: 'transparent' }]}>
            <TouchableOpacity 
              style={styles.closeModalButton}
              onPress={() => setShowProfile(false)}
            >
              <X size={24} color="#fff" />
            </TouchableOpacity>

            <View style={styles.profileContent}>
              <View style={styles.profileHeader}>
                <TouchableOpacity style={styles.largeAvatarContainer}>
                  {user?.avatar ? (
                    <Image 
                      source={{ uri: user.avatar }} 
                      style={styles.largeAvatar}
                    />
                  ) : (
                    <User size={48} color="#fff" />
                  )}
                </TouchableOpacity>
                <Text style={styles.profileName}>
                  {user?.name || 'Гость'}
                </Text>
                <Text style={styles.profileStatus}>
                  {isGuest ? 'Гостевой режим' : '15 дней без срыва'}
                </Text>
              </View>

              <View style={styles.settingsSection}>
                <Text style={styles.settingsTitle}>Тема</Text>
                <View style={styles.optionsGrid}>
                  {themes.map((t) => (
                    <TouchableOpacity
                      key={t.id}
                      style={[
                        styles.optionButton,
                        theme === t.id && styles.optionButtonActive
                      ]}
                      onPress={() => setTheme(t.id as any)}
                    >
                      <Text style={[
                        styles.optionButtonText,
                        theme === t.id && styles.optionButtonTextActive
                      ]}>
                        {t.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.settingsSection}>
                <Text style={styles.settingsTitle}>Язык</Text>
                <View style={styles.optionsGrid}>
                  {languages.map((lang) => (
                    <TouchableOpacity
                      key={lang.id}
                      style={[
                        styles.optionButton,
                        language === lang.id && styles.optionButtonActive
                      ]}
                      onPress={() => setLanguage(lang.id as any)}
                    >
                      <Text style={[
                        styles.optionButtonText,
                        language === lang.id && styles.optionButtonTextActive
                      ]}>
                        {lang.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {!isGuest && (
                <TouchableOpacity 
                  style={styles.logoutButton}
                  onPress={() => { 
                    setShowProfile(false);
                    router.push('/profile')
                  }}
                >
                  <Text style={styles.logoutButtonText}>
                    Полный профиль
                  </Text>
                </TouchableOpacity>
              )}

              {!isGuest && (
                <TouchableOpacity 
                  style={styles.logoutButton}
                  onPress={() => {
                    logout();
                    setShowProfile(false);
                    router.push('/login');
                  }}
                >
                  <Text style={styles.logoutButtonText}>
                    Выйти
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal> */}
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
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerDate: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  headerTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#fff',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  notificationText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeModalButton: {
    position: 'absolute',
    right: 20,
    top: 40,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContent: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  largeAvatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  largeAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  profileName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 8,
  },
  profileStatus: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  settingsSection: {
    marginBottom: 32,
  },
  settingsTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  optionButtonActive: {
    backgroundColor: '#4CAF50',
  },
  optionButtonText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#fff',
  },
  optionButtonTextActive: {
    fontFamily: 'Inter_600SemiBold',
  },
  logoutButton: {
    backgroundColor: '#F44336',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 40,
  },
  logoutButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  mainCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  mainCardHeader: {
    marginBottom: 20,
  },
  mainCardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  mainCardTitleText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#2C3E50',
  },
  daysCount: {
    fontFamily: 'Inter_700Bold',
    fontSize: 48,
    color: '#00E5FF',
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 16,
  },
  cleanDayButton: {
    backgroundColor: '#4CAF50',
  },
  relapseButton: {
    backgroundColor: '#F44336',
  },
  secondaryButton: {
    backgroundColor: '#00E5FF',
  },
  actionButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    minHeight: '70%',
  },
  modalTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#2C3E50',
    marginBottom: 16,
  },
  calendarHeader: {
    marginBottom: 16,
  },
  calendarMonth: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: '#2C3E50',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  calendarWeekDay: {
    width: (width - 80) / 7,
    textAlign: 'center',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#7F8C8D',
  },
  calendarDay: {
    width: (width - 80) / 7,
    height: (width - 80) / 7,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  calendarDayText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#2C3E50',
  },
  today: {
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    borderWidth: 2,
    borderColor: '#00E5FF',
  },
  todayText: {
    color: '#00E5FF',
    fontFamily: 'Inter_600SemiBold',
  },
  markedDayText: {
    color: '#fff',
    fontFamily: 'Inter_600SemiBold',
  },
  legend: {
    marginTop: 24,
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  legendText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#2C3E50',
  },
  relapseOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    gap: 12,
  },
  relapseDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  relapseOptionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#2C3E50',
  },
  relapseOptionSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#7F8C8D',
  },
  closeButton: {
    backgroundColor: '#00E5FF',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});