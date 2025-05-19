import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { 
  Wine, 
  Cigarette, 
  Coffee, 
  ShoppingBag, 
  Smartphone, 
  Gamepad2,
  Plus,
  ChevronRight
} from 'lucide-react-native';

const addictions = [
  { id: 'alcohol', name: 'Алкоголь', icon: Wine, color: '#FF5252', desc: 'Контроль употребления спиртного' },
  { id: 'smoking', name: 'Курение', icon: Cigarette, color: '#9E9E9E', desc: 'Отказ от никотина' },
  { id: 'caffeine', name: 'Кофеин', icon: Coffee, color: '#795548', desc: 'Снижение потребления кофе' },
  { id: 'shopping', name: 'Шоппинг', icon: ShoppingBag, color: '#FF9800', desc: 'Контроль импульсных покупок' },
  { id: 'social', name: 'Соцсети', icon: Smartphone, color: '#2196F3', desc: 'Сокращение времени в соцсетях' },
  { id: 'gaming', name: 'Игры', icon: Gamepad2, color: '#4CAF50', desc: 'Контроль игрового времени' },
];

export default function AddictionSelect() {
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
            <Text style={styles.title}>Выберите зависимость</Text>
            <Text style={styles.subtitle}>Отслеживайте прогресс в борьбе с вредными привычками</Text>
          </View>
          
          <View style={styles.cardsContainer}>
            {addictions.map((addiction) => {
              const Icon = addiction.icon;
              return (
                <TouchableOpacity
                  key={addiction.id}
                  style={styles.card}
                  onPress={() => router.replace('/(tabs)')}
                >
                  <View style={[styles.iconContainer, { backgroundColor: `${addiction.color}20` }]}>
                    <Icon size={24} color={addiction.color} />
                  </View>
                  
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{addiction.name}</Text>
                    <Text style={styles.cardDesc}>{addiction.desc}</Text>
                  </View>
                  
                  <ChevronRight size={20} color="#64748B" />
                </TouchableOpacity>
              );
            })}
            
            <TouchableOpacity
              style={styles.addCard}
              onPress={() => {/* Добавление новой зависимости */}}
            >
              <View style={styles.addIcon}>
                <Plus size={20} color="#2A5CFF" />
              </View>
              <Text style={styles.addCardText}>Добавить свою зависимость</Text>
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
    paddingHorizontal: 24,
    paddingTop: 24,
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
    lineHeight: 24,
    color: '#94A3B8',
  },
  cardsContainer: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: '#64748B',
  },
  addCard: {
    backgroundColor: 'rgba(42, 92, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A5CFF',
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(42, 92, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  addCardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2A5CFF',
    flex: 1,
  },
});