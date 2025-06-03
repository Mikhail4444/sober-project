import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SectionList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronDown, MapPin, Clock, Users, Filter, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';

// Mock данные для групп поддержки
const supportGroupsData = [
  {
    title: 'Сегодня',
    data: [
      {
        id: '1',
        name: 'Группа "Новый день"',
        time: '18:00',
        address: 'ул. Пушкина, 10, каб. 5',
        type: 'Открытая',
        distance: '0.7 км',
      },
      {
        id: '2',
        name: 'Группа "Сила воли"',
        time: '19:30',
        address: 'ул. Лермонтова, 15, 2 этаж',
        type: 'Закрытая',
        distance: '1.2 км',
      },
    ],
  },
  {
    title: 'Завтра',
    data: [
      {
        id: '3',
        name: 'Группа "Шаг за шагом"',
        time: '10:00',
        address: 'пр. Мира, 25, вход со двора',
        type: 'Открытая',
        distance: '0.5 км',
      },
    ],
  },
];

export default function SupportGroupsScreen() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [location, setLocation] = useState('Москва');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F172A', '#1E293B']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Шапка с выбором города */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.locationSelector}>
            <MapPin size={18} color="#2A5CFF" />
            <Text style={styles.locationText}>{location}</Text>
            <ChevronDown size={18} color="#64748B" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => router.push('/Filters')}>
            <Filter size={24} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Карта (заглушка) */}
        <TouchableOpacity 
          style={styles.mapContainer}
          onPress={() => router.push('/FullMap')}
        >
          <Image 
            source={require('../assets/images/map.jpg')} 
            style={styles.mapImage}
          />
          <View style={styles.mapOverlay}>
            <Text style={styles.mapText}>Посмотреть на карте</Text>
            <ChevronRight size={20} color="white" />
          </View>
        </TouchableOpacity>

        {/* Фильтры */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {['Все', 'Открытые', 'Закрытые', 'Ближайшие', 'Онлайн'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterPill,
                activeFilter === filter.toLowerCase() && styles.activeFilter
              ]}
              onPress={() => setActiveFilter(filter.toLowerCase())}
            >
              <Text style={[
                styles.filterText,
                activeFilter === filter.toLowerCase() && styles.activeFilterText
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Список групп */}
        <SectionList
          sections={supportGroupsData}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.groupCard}
              onPress={() => router.push('/GroupDetails', { group: item })}
            >
              <View style={styles.groupHeader}>
                <Text style={styles.groupName}>{item.name}</Text>
                <Text style={styles.groupDistance}>{item.distance}</Text>
              </View>
              
              <View style={styles.groupInfo}>
                <View style={styles.infoRow}>
                  <Clock size={16} color="#64748B" />
                  <Text style={styles.infoText}>{item.time}</Text>
                </View>
                <View style={styles.infoRow}>
                  <MapPin size={16} color="#64748B" />
                  <Text style={styles.infoText}>{item.address}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Users size={16} color="#64748B" />
                  <Text style={styles.infoText}>{item.type} встреча</Text>
                </View>
              </View>
              
              <View style={styles.groupActions}>
                <TouchableOpacity style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>Сохранить</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>Подробнее</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
        />
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
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  mapContainer: {
    height: 150,
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mapText: {
    color: 'white',
    fontSize: 14,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  activeFilter: {
    backgroundColor: '#2A5CFF',
    borderColor: '#2A5CFF',
  },
  filterText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  activeFilterText: {
    color: 'white',
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionHeader: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 12,
  },
  groupCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  groupName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  groupDistance: {
    color: '#64748B',
    fontSize: 14,
  },
  groupInfo: {
    gap: 8,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  groupActions: {
    flexDirection: 'row',
    gap: 8,
  },
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(42, 92, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2A5CFF',
  },
  saveButtonText: {
    color: '#2A5CFF',
    fontSize: 14,
  },
  detailsButton: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: '#2A5CFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});