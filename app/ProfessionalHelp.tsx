import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Heart, Clock, MapPin, ChevronRight, User, Star } from 'lucide-react-native';

// Определим тип для специалиста
type Professional = {
  id: string;
  name: string;
  specialization: string;
  photo: any;
  experience: string;
  address: string;
  price: string;
  type: 'doctor' | 'institution';
  rating?: number;
  reviews?: number;
  tags?: string[];
  isFavorite: boolean;
};

const ProfessionalHelp = () => {
  // Данные с явным указанием типа
  const [professionals, setProfessionals] = useState<Professional[]>([
    {
      id: '1',
      name: 'Доктор Иванов А.П.',
      specialization: 'Нарколог',
      photo: require('../assets/images/doctor.jpg'),
      experience: '12 лет опыта',
      address: 'ул. Медицинская, 15',
      price: 'от 3 000 ₽',
      type: 'doctor',
      rating: 4.8,
      reviews: 42,
      tags: ['Онлайн консультация', 'КБТ'],
      isFavorite: false
    },
    {
      id: '2',
      name: 'Центр "Здоровая жизнь"',
      specialization: 'Реабилитация',
      photo: require('../assets/images/clinic.jpg'),
      experience: 'Лицензия Минздрава',
      address: 'пр. Лечебный, 42',
      price: 'от 5 000 ₽/мес',
      type: 'institution',
      rating: 4.5,
      reviews: 36,
      tags: ['Стационар', 'Групповая терапия'],
      isFavorite: false
    }
  ]);

  // Типизированная функция для избранного
  const toggleFavorite = (id: string) => {
    setProfessionals(prevPros => 
      prevPros.map(pro => 
        pro.id === id ? {...pro, isFavorite: !pro.isFavorite} : pro
      )
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={professionals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.proCard}>
            {/* Блок с фото и заголовком */}
            <View style={styles.proHeader}>
              {item.photo ? (
                <Image 
                  source={item.photo} 
                  style={styles.proPhoto}
                  resizeMode="cover"
                />
              ) : (
                <View style={[styles.proPhoto, styles.proPhotoPlaceholder]}>
                  <User size={24} color="#64748B" />
                </View>
              )}
              
              <View style={styles.proTitle}>
                <View style={styles.titleRow}>
                  <Text style={styles.proName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                    <Heart 
                      size={20} 
                      color={item.isFavorite ? '#FF0000' : '#64748B'} 
                      fill={item.isFavorite ? '#FF0000' : 'none'} 
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.proSpecialty}>{item.specialization}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={16} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.ratingText}>{item.rating} ({item.reviews})</Text>
                </View>
              </View>
            </View>

            {/* Информация */}
            <View style={styles.proInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Опыт:</Text>
                <Text style={styles.infoText}>{item.experience}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <MapPin size={16} color="#64748B" />
                <Text style={styles.infoText} numberOfLines={1}>
                  {item.address}
                </Text>
              </View>
            </View>

            {/* Цена и кнопка */}
            <View style={styles.proFooter}>
              <Text style={styles.proPrice}>{item.price}</Text>
              <TouchableOpacity style={styles.detailsButton}>
                <ChevronRight size={20} color="#2A5CFF" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Стили с фото
const CARD_WIDTH = Dimensions.get('window').width - 32;
const PHOTO_SIZE = 60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  listContainer: {
    padding: 16,
  },
  proCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
    width: CARD_WIDTH,
  },
  proHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  proPhoto: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: PHOTO_SIZE/2,
    marginRight: 12,
  },
  proPhotoPlaceholder: {
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  proTitle: {
    flex: 1,
  },
  proName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  proSpecialty: {
    color: '#64748B',
    fontSize: 14,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 12,
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#2A5CFF',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  proInfo: {
    gap: 12,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    color: '#94A3B8',
    fontSize: 14,
    width: 60,
  },
  infoText: {
    color: '#E2E8F0',
    fontSize: 14,
    flex: 1,
  },
  proFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  proPrice: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  detailsButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfessionalHelp;