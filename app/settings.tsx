import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const profileUrl = 'https://myapp.com/user/123';
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Настройки</Text>
      </View>
      
      <View style={styles.list}>
        <TouchableOpacity style={styles.listItem} onPress={() => router.push('/edit-profile')}>
          <View style={styles.row}>
            <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.avatar} />
            <Text style={styles.listText}>Редактировать данные профиля</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.listText}>Приобрести подписку</Text>
          <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.listText}>Настройка уведомлений</Text>
          <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.listText}>Настройка страниц</Text>
          <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.qrSection}>
        <Text style={styles.qrLabel}>Поделитесь своим профилем</Text>
        <View style={styles.qrWrapper}>
          <QRCode 
            value={profileUrl} 
            size={140} 
            color="#2A5CFF" 
            backgroundColor="#1E293B" 
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Основной фон как в профиле
    paddingTop: 20,
  },
  headerContainer: {
    paddingHorizontal: 24,
    marginBottom: 18,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // Белый текст вместо тёмного
  },
  list: {
    backgroundColor: '#1E293B', // Тёмный фон карточек
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155', // Граница как в профиле
    overflow: 'hidden',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#334155', // Разделители как в профиле
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#2A5CFF', // Синяя рамка как в профиле
  },
  listText: {
    color: 'white', // Белый текст
    fontSize: 16,
    fontWeight: '500',
  },
  qrSection: {
    alignItems: 'center',
    marginTop: 32,
    padding: 16,
    backgroundColor: '#1E293B', // Тёмный фон
    borderRadius: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  qrLabel: {
    color: 'white', // Белый текст
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 18,
  },
  qrWrapper: {
    backgroundColor: '#0F172A', // Ещё более тёмный фон для QR
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A5CFF',
  },
});