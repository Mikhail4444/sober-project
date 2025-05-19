import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { 
  HeartPulse, MessageSquareText, Users, 
  CalendarCheck, Coins, BookText,
  ChevronRight
} from 'lucide-react-native';

const AI_ROLES = [
  {
    id: 'consultant',
    name: 'Консультант по зависимостям',
    icon: HeartPulse,
    description: 'Профессиональные методики и стратегии'
  },
  {
    id: 'psychologist',
    name: 'Клинический психолог',
    icon: MessageSquareText,
    description: 'Помощь в работе с триггерами'
  },
  {
    id: 'mentor',
    name: 'Наставник по выздоровлению',
    icon: Users,
    description: 'Личный опыт и советы'
  },
  {
    id: 'planner',
    name: 'Антикризисный планировщик',
    icon: CalendarCheck,
    description: 'Персональные планы на сложные ситуации'
  },
  {
    id: 'finance',
    name: 'Финансовый трекер',
    icon: Coins,
    description: 'Анализ сэкономленных средств'
  }
];

export default function RoleSelectorVertical({ onSelectRole }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Выберите роль помощника</Text>
      <Text style={styles.headerSubtitle}>Персонализированная поддержка для вашего пути</Text>
      
      <ScrollView style={styles.scrollContainer}>
        {AI_ROLES.map((role) => {
          const Icon = role.icon;
          return (
            <TouchableOpacity
              key={role.id}
              style={styles.roleCard}
              onPress={() => onSelectRole(role)}
            >
              <View style={styles.roleContent}>
                <View style={styles.iconContainer}>
                  <Icon size={22} color="#2A5CFF" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.roleName}>{role.name}</Text>
                  <Text style={styles.roleDescription}>{role.description}</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#64748B" />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingHorizontal: 16
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 24,
    marginBottom: 8
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 24
  },
  scrollContainer: {
    flex: 1
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155'
  },
  roleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(42, 92, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  textContainer: {
    flex: 1
  },
  roleName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E2E8F0',
    marginBottom: 4
  },
  roleDescription: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18
  }
});