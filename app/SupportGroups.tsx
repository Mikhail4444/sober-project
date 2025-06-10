import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronDown, MapPin, Clock, Users, Filter, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';

// Константы для вычисления высот
const SCREEN_HEIGHT = Dimensions.get('window').height;
const MAP_HEIGHT = 150;
const FILTERS_HEIGHT = 50;
const DAYS_HEIGHT = 50;
const HEADER_HEIGHT = 60;

interface GroupItem {
  id: string;
  name: string;
  time: string;
  address: string;
  type: string;
  distance: string;
}

type SupportGroupsByDay = Record<string, {
  title: string;
  data: GroupItem[];
}>;


// Mock данные для групп поддержки по дням недели (полная версия)
const supportGroupsByDay: SupportGroupsByDay = {
  monday: {
    title: 'Понедельник',
    data: [
      {
        id: '4',
        name: 'Группа "Начало недели"',
        time: '18:30',
        address: 'ул. Гагарина, 42, офис 3',
        type: 'Открытая',
        distance: '1.5 км',
      },
    ],
  },
  tuesday: {
    title: 'Вторник',
    data: [
      {
        id: '5',
        name: 'Группа "Второй шаг"',
        time: '19:00',
        address: 'пр. Ленина, 7, 4 этаж',
        type: 'Закрытая',
        distance: '0.9 км',
      },
    ],
  },
  wednesday: {
    title: 'Среда',
    data: [
      {
        id: '6',
        name: 'Группа "Середина пути"',
        time: '17:30',
        address: 'ул. Садовая, 15, каб. 101',
        type: 'Открытая',
        distance: '1.1 км',
      },
      {
        id: '7',
        name: 'Группа "Вечер поддержки"',
        time: '20:00',
        address: 'ул. Садовая, 15, каб. 102',
        type: 'Закрытая',
        distance: '1.1 км',
      },
    ],
  },
  thursday: {
    title: 'Четверг',
    data: [
      {
        id: '8',
        name: 'Группа "Четверг без зависимостей"',
        time: '19:00',
        address: 'ул. Мира, 33, вход с торца',
        type: 'Открытая',
        distance: '2.0 км',
      },
    ],
  },
  friday: {
    title: 'Пятница',
    data: [
      {
        id: '9',
        name: 'Группа "Пятничный разговор"',
        time: '18:00',
        address: 'пр. Победы, 10, 3 этаж',
        type: 'Открытая',
        distance: '0.8 км',
      },
    ],
  },
  saturday: {
    title: 'Суббота',
    data: [
      {
        id: '10',
        name: 'Группа "Выходной день"',
        time: '12:00',
        address: 'ул. Центральная, 1, холл',
        type: 'Открытая',
        distance: '1.3 км',
      },
      {
        id: '11',
        name: 'Группа "Субботний вечер"',
        time: '19:30',
        address: 'ул. Центральная, 1, зал 2',
        type: 'Закрытая',
        distance: '1.3 км',
      },
    ],
  },
  sunday: {
    title: 'Воскресенье',
    data: [
      {
        id: '12',
        name: 'Группа "Воскресный круг"',
        time: '11:00',
        address: 'ул. Парковая, 5, клуб',
        type: 'Открытая',
        distance: '1.7 км',
      },
    ],
  },
};

// Функция для получения названий дней недели на русском
type DayKey = keyof typeof supportGroupsByDay; // Автоматически получит все ключи

const getDayName = (dayKey: DayKey): string => {
  const days: Record<DayKey, string> = {
    monday: 'Пн',
    tuesday: 'Вт',
    wednesday: 'Ср',
    thursday: 'Чт',
    friday: 'Пт',
    saturday: 'Сб',
    sunday: 'Вс'
  };
  return days[dayKey];
};

export default function SupportGroupsScreen() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [location, setLocation] = useState('Москва');
  const [selectedDay, setSelectedDay] = useState<keyof SupportGroupsByDay>('today');
  const scrollRef = useRef(null);

  // Вычисляем высоту для списка групп
  const listHeight = SCREEN_HEIGHT - MAP_HEIGHT - FILTERS_HEIGHT - DAYS_HEIGHT - HEADER_HEIGHT - 40;

  const renderGroupItem = ({ item }: { item: GroupItem }) => (
    <TouchableOpacity 
      style={styles.groupCard}
      onPress={() => router.push({
        pathname: '/GroupDetails',
        params: { group: JSON.stringify(item) }
      })
    }
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
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F172A', '#1E293B']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Шапка с выбором города */}
        <View style={[styles.header, { height: HEADER_HEIGHT }]}>
          <TouchableOpacity style={styles.locationSelector}>
            <MapPin size={18} color="#2A5CFF" />
            <Text style={styles.locationText}>{location}</Text>
            <ChevronDown size={18} color="#64748B" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => router.push('/Filters')}>
            <Filter size={24} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Карта с фиксированной высотой */}
        <TouchableOpacity 
          style={[styles.mapContainer, { height: MAP_HEIGHT }]}
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

        {/* Фильтры с фиксированной высотой */}
        <View style={[styles.filtersWrapper, { height: FILTERS_HEIGHT }]}>
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
        </View>

        {/* Дни недели с фиксированной высотой */}
        <View style={[styles.daysWrapper, { height: DAYS_HEIGHT }]}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.daysContainer}
          >
            {(Object.keys(supportGroupsByDay) as DayKey[]).map((dayKey) => (
              <TouchableOpacity
                key={dayKey}
                style={[
                  styles.dayPill,
                  selectedDay === dayKey && styles.activeDayPill
                ]}
                onPress={() => setSelectedDay(dayKey)}
              >
                <Text style={[
                  styles.dayText,
                  selectedDay === dayKey && styles.activeDayText
                ]}>
                  {getDayName(dayKey)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Список групп с ФИКСИРОВАННОЙ высотой */}
        <View style={[styles.listContainer, { height: listHeight }]}>
          <FlatList
            ref={scrollRef}
            data={supportGroupsByDay[selectedDay]?.data || []}
            renderItem={renderGroupItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <Text style={styles.sectionHeader}>
                {supportGroupsByDay[selectedDay]?.title || 'Нет данных'}
              </Text>
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>На этот день нет запланированных групп</Text>
              </View>
            }
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
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
  filtersWrapper: {
    justifyContent: 'center',
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
  daysWrapper: {
    justifyContent: 'center',
  },
  daysContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    gap: 8,
  },
  dayPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  activeDayPill: {
    backgroundColor: '#2A5CFF',
    borderColor: '#2A5CFF',
  },
  dayText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  activeDayText: {
    color: 'white',
    fontWeight: '500',
  },
  listContainer: {
    flexGrow: 0,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#64748B',
    fontSize: 16,
    textAlign: 'center',
  },
});