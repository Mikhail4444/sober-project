import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Heart, Clock, MapPin, ChevronRight } from 'lucide-react-native';

const ProfessionalHelp = () => {
  // Пример данных специалистов
  const professionals = [
    {
      id: '1',
      name: 'Доктор Иванов А.П.',
      specialization: 'Нарколог',
      experience: '12 лет опыта',
      address: 'ул. Медицинская, 15',
      price: 'от 3 000 ₽',
      available: 'Сегодня в 18:00'
    },
    {
      id: '2',
      name: 'Центр "Здоровая жизнь"',
      specialization: 'Реабилитация',
      experience: 'Лицензия Минздрава',
      address: 'пр. Лечебный, 42',
      price: 'от 5 000 ₽/мес',
      available: 'Запись онлайн'
    }
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={professionals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.proCard}>
            {/* Заголовок */}
            <View style={styles.proHeader}>
              <View style={styles.proIcon}>
                <Heart size={24} color="#2A5CFF" />
              </View>
              <View style={styles.proTitle}>
                <Text style={styles.proName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.proSpecialty}>{item.specialization}</Text>
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
                <Text style={styles.infoText} numberOfLines={1}>{item.address}</Text>
              </View>
              <View style={styles.infoRow}>
                <Clock size={16} color="#64748B" />
                <Text style={styles.infoText}>{item.available}</Text>
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

// Стили с ЖЁСТКО фиксированными размерами
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
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
    width: Dimensions.get('window').width - 32, // Фиксированная ширина
    height: 220, // Фиксированная высота
  },
  proHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    height: 40, // Фиксированная высота заголовка
  },
  proIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(42, 92, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  proTitle: {
    flex: 1,
  },
  proName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  proSpecialty: {
    color: '#64748B',
    fontSize: 14,
  },
  proInfo: {
    gap: 12,
    marginBottom: 16,
    height: 100, // Фиксированная высота блока информации
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24, // Фиксированная высота строки
  },
  infoLabel: {
    color: '#94A3B8',
    fontSize: 14,
    width: 60, // Фиксированная ширина метки
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
    height: 40, // Фиксированная высота футера
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