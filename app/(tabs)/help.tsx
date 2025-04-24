import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Phone, BookOpen, Users, CircleAlert as AlertCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Help() {
  const emergencyNumbers = [
    { id: 1, name: 'Горячая линия', number: '8-800-200-0-200' },
    { id: 2, name: 'Психологическая помощь', number: '8-800-333-44-44' },
  ];

  const handleCall = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#00E5FF', '#5B10D4']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Помощь</Text>
          <Text style={styles.subtitle}>Мы всегда рядом</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.emergencyCard}>
            <AlertCircle size={32} color="#5B10D4" />
            <Text style={styles.emergencyTitle}>Что делать при тяге?</Text>
            <Text style={styles.emergencyText}>
              1. Сделайте глубокий вдох{'\n'}
              2. Выпейте стакан воды{'\n'}
              3. Позвоните доверенному человеку{'\n'}
              4. Смените обстановку
            </Text>
            <TouchableOpacity style={styles.emergencyButton}>
              <Text style={styles.emergencyButtonText}>Подробная инструкция</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Телефоны доверия</Text>
            {emergencyNumbers.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.phoneCard}
                onPress={() => handleCall(item.number)}
              >
                <View style={styles.phoneInfo}>
                  <Phone size={24} color="#00E5FF" />
                  <View>
                    <Text style={styles.phoneName}>{item.name}</Text>
                    <Text style={styles.phoneNumber}>{item.number}</Text>
                  </View>
                </View>
                <Text style={styles.callButton}>Позвонить</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Полезные материалы</Text>
            <TouchableOpacity style={styles.guideCard}>
              <BookOpen size={24} color="#00E5FF" />
              <View style={styles.guideContent}>
                <Text style={styles.guideTitle}>Как объяснить близким</Text>
                <Text style={styles.guideDescription}>
                  Пошаговое руководство по разговору с семьей о вашем решении
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.guideCard}>
              <Users size={24} color="#5B10D4" />
              <View style={styles.guideContent}>
                <Text style={styles.guideTitle}>Поиск поддержки</Text>
                <Text style={styles.guideDescription}>
                  Где найти группы поддержки и профессиональную помощь
                </Text>
              </View>
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
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    color: '#fff',
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  emergencyCard: {
    margin: 16,
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emergencyTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: '#2C3E50',
    marginTop: 16,
    marginBottom: 12,
  },
  emergencyText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
    marginBottom: 16,
  },
  emergencyButton: {
    backgroundColor: '#00E5FF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  emergencyButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  section: {
    margin: 16,
    marginTop: 0,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 12,
  },
  phoneCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  phoneInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  phoneName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#2C3E50',
  },
  phoneNumber: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#7F8C8D',
  },
  callButton: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#00E5FF',
  },
  guideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  guideContent: {
    flex: 1,
  },
  guideTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 4,
  },
  guideDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#7F8C8D',
  },
});