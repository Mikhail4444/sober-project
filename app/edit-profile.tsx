import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EditProfileScreen() {
  const [avatar, setAvatar] = useState('https://randomuser.me/api/portraits/men/32.jpg');
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Кнопка назад */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Фото профиля */}
      <View style={styles.avatarSection}>
        <TouchableOpacity onPress={pickImage} style={styles.avatarButton}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <View style={styles.cameraIconWrapper}>
            <Ionicons name="camera" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
        <Text style={styles.avatarLabel}>Выбрать фото</Text>
      </View>

      {/* О себе */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>О себе</Text>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemLabel}>Имя</Text>
          <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemLabel}>Username</Text>
          <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemLabel}>Описание</Text>
          <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemLabel}>Зависимость</Text>
          <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(30,41,59,0.7)',
    borderRadius: 20,
    padding: 4,
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 32,
  },
  avatarButton: {
    position: 'relative',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: '#2A5CFF',
  },
  cameraIconWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2A5CFF',
    borderRadius: 16,
    padding: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatarLabel: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    marginHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sectionTitle: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 10,
    marginBottom: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  itemLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
}); 