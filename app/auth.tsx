import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAuth } from './context/AuthContext';
import { Leaf } from 'lucide-react-native';

export default function Home() {
  const { continueAsGuest } = useAuth();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#00E5FF', '#5B10D4']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Leaf size={48} color="#fff" />
          </View>
          <Text style={styles.title}>Добро пожаловать!</Text>
          <Text style={styles.subtitle}>Выберите способ входа</Text>

          <View style={styles.buttons}>
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton]}
              onPress={() => continueAsGuest()}
            >
              <Text style={styles.primaryButtonText}>ПРОДОЛЖИТЬ КАК ГОСТЬ</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.secondaryButtonText}>ВОЙТИ</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]}
              onPress={() => router.push('/register')}
            >
              <Text style={styles.secondaryButtonText}>РЕГИСТРАЦИЯ</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  logoContainer: {
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 48,
    textAlign: 'center',
  },
  buttons: {
    width: '100%',
    gap: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 30,
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
  },
  primaryButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  secondaryButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#fff',
  },
}); 