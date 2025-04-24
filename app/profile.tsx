import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Plus, Minus, X, Bell } from 'lucide-react-native';
import { useAuth } from './context/AuthContext';

interface Addiction {
  id: string;
  name: string;
  days: number;
}

export default function Profile() {
  const { user, isGuest } = useAuth();
  const [addictions, setAddictions] = useState<Addiction[]>([
    { id: '1', name: 'Никотин', days: 3 },
    { id: '2', name: 'Алкоголь', days: 7 },
  ]);
  const [newAddiction, setNewAddiction] = useState('');

  const handleAddAddiction = () => {
    if (newAddiction.trim()) {
      setAddictions([
        ...addictions,
        {
          id: Date.now().toString(),
          name: newAddiction.trim(),
          days: 0,
        },
      ]);
      setNewAddiction('');
    }
  };

  const handleRemoveAddiction = (id: string) => {
    setAddictions(addictions.filter(a => a.id !== id));
  };

  const handleIncrementDays = (id: string) => {
    setAddictions(addictions.map(a => 
      a.id === id ? { ...a, days: a.days + 1 } : a
    ));
  };

  const handleDecrementDays = (id: string) => {
    setAddictions(addictions.map(a => 
      a.id === id ? { ...a, days: Math.max(0, a.days - 1) } : a
    ));
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#00E5FF', '#5B10D4']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView style={styles.content}>
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              {user?.avatar ? (
                <Image 
                  source={{ uri: user.avatar }} 
                  style={styles.avatar}
                />
              ) : (
                <User size={48} color="#fff" />
              )}
            </View>
            <Text style={styles.userName}>
              {user?.name || 'Гость'}
            </Text>
            <Text style={styles.userStatus}>
              {isGuest ? 'Гостевой режим' : '3 дня без никотина'}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Редактирование профиля</Text>
            <View style={styles.editForm}>
              <TextInput
                style={styles.input}
                placeholder="Имя"
                placeholderTextColor="#7F8C8D"
                value={user?.name}
                editable={!isGuest}
              />
              <TouchableOpacity 
                style={styles.uploadButton}
                disabled={isGuest}
              >
                <Text style={styles.uploadButtonText}>
                  Загрузить аватар
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Трекер зависимостей</Text>
            <View style={styles.addictionsList}>
              {addictions.map(addiction => (
                <View key={addiction.id} style={styles.addictionItem}>
                  <Text style={styles.addictionName}>{addiction.name}</Text>
                  <View style={styles.addictionControls}>
                    <TouchableOpacity 
                      style={styles.controlButton}
                      onPress={() => handleDecrementDays(addiction.id)}
                    >
                      <Minus size={20} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.daysCount}>{addiction.days}</Text>
                    <TouchableOpacity 
                      style={styles.controlButton}
                      onPress={() => handleIncrementDays(addiction.id)}
                    >
                      <Plus size={20} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.removeButton}
                      onPress={() => handleRemoveAddiction(addiction.id)}
                    >
                      <X size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
            {!isGuest && (
              <View style={styles.addForm}>
                <TextInput
                  style={styles.input}
                  placeholder="Новая зависимость"
                  placeholderTextColor="#7F8C8D"
                  value={newAddiction}
                  onChangeText={setNewAddiction}
                />
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={handleAddAddiction}
                >
                  <Plus size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Статистика</Text>
            <View style={styles.statsContainer}>
              <Text style={styles.statsText}>
                График статистики будет здесь
              </Text>
            </View>
          </View>

          {!isGuest && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Настройки уведомлений</Text>
              <View style={styles.notificationSettings}>
                <View style={styles.notificationItem}>
                  <Bell size={24} color="#fff" />
                  <Text style={styles.notificationText}>
                    Ежедневные напоминания
                  </Text>
                  <TouchableOpacity style={styles.toggleButton}>
                    <View style={styles.toggleCircle} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
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
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 8,
  },
  userStatus: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 16,
  },
  editForm: {
    gap: 16,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  uploadButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  addictionsList: {
    gap: 12,
  },
  addictionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  addictionName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  addictionControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  controlButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  daysCount: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#fff',
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addForm: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  statsText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  notificationSettings: {
    gap: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  notificationText: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#fff',
  },
  toggleButton: {
    width: 48,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    padding: 2,
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
}); 