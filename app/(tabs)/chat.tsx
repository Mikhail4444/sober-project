import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { 
  HeartPulse, MessageSquareText, Users, 
  CalendarCheck, Coins, BookText,
  ChevronRight, LucideIcon
} from 'lucide-react-native';
import { router } from 'expo-router';

// Определяем тип для роли помощника
type AIRole = {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  color: string;
  route: string;
};

const AI_ROLES: AIRole[] = [
  {
    id: 'consultant',
    name: 'Консультант по зависимостям',
    icon: HeartPulse,
    description: 'Профессиональные методики и стратегии',
    color: '#FF6B6B',
    route: 'ConsultantChat'
  },
  {
    id: 'psychologist',
    name: 'Клинический психолог',
    icon: MessageSquareText,
    description: 'Помощь в работе с триггерами',
    color: '#4ECDC4',
    route: 'PsychologistChat'
  },
  {
    id: 'mentor',
    name: 'Наставник по выздоровлению',
    icon: Users,
    description: 'Личный опыт и советы',
    color: '#FFD166',
    route: 'MentorChat'
  },
  {
    id: 'planner',
    name: 'Антикризисный планировщик',
    icon: CalendarCheck,
    description: 'Персональные планы на сложные ситуации',
    color: '#A78BFA',
    route: 'PlannerChat'
  },
  {
    id: 'finance',
    name: 'Финансовый трекер',
    icon: Coins,
    description: 'Анализ сэкономленных средств',
    color: '#06D6A0',
    route: 'FinanceChat'
  }
];

export default function RoleSelectorVertical() {
  const handleRoleSelect = (role: AIRole) => {
    router.push({
      pathname: role.route,
      params: { roleName: role.name }
    });
  };

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
              onPress={() => handleRoleSelect(role)}
            >
              <View style={styles.roleContent}>
                <View style={[styles.iconContainer, { backgroundColor: `${role.color}20` }]}>
                  <Icon size={22} color={role.color} />
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

// Стили остаются без изменений
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