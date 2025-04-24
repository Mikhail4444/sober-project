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
  Plus
} from 'lucide-react-native';

const addictions = [
  { id: 'alcohol', name: 'Алкоголь', icon: Wine, color: '#FF5252' },
  { id: 'smoking', name: 'Курение', icon: Cigarette, color: '#9E9E9E' },
  { id: 'caffeine', name: 'Кофеин', icon: Coffee, color: '#795548' },
  { id: 'shopping', name: 'Шоппинг', icon: ShoppingBag, color: '#FF9800' },
  { id: 'social', name: 'Соцсети', icon: Smartphone, color: '#2196F3' },
  { id: 'gaming', name: 'Игры', icon: Gamepad2, color: '#4CAF50' },
];

export default function AddictionSelect() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#00E5FF', '#5B10D4']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Выберите зависимость</Text>
          <Text style={styles.subtitle}>С чем вы хотите работать?</Text>
          
          <ScrollView style={styles.grid}>
            {addictions.map((addiction) => {
              const Icon = addiction.icon;
              return (
                <TouchableOpacity
                  key={addiction.id}
                  style={[styles.card, { backgroundColor: addiction.color }]}
                  onPress={() => router.push('/(tabs)')}
                >
                  <Icon size={32} color="#fff" />
                  <Text style={styles.cardText}>{addiction.name}</Text>
                </TouchableOpacity>
              );
            })}
            
            <TouchableOpacity
              style={[styles.card, styles.addCard]}
              onPress={() => {
                // Здесь будет логика добавления новой зависимости
              }}
            >
              <Plus size={32} color="#00E5FF" />
              <Text style={[styles.cardText, styles.addCardText]}>Добавить</Text>
            </TouchableOpacity>
          </ScrollView>
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
  },
  content: {
    flex: 1,
    padding: 32,
    paddingTop: 60,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 32,
  },
  grid: {
    flex: 1,
  },
  card: {
    width: '100%',
    height: 80,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 16,
    gap: 16,
  },
  cardText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#fff',
  },
  addCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: '#00E5FF',
    borderStyle: 'dashed',
  },
  addCardText: {
    color: '#00E5FF',
  },
});