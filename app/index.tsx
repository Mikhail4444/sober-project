import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2940&auto=format&fit=crop' }}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.title}>Ты уже молодец, что здесь!</Text>
        <Text style={styles.subtitle}>Теперь давай сделаем этот день точкой отсчета.</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/auth')}
        >
          <Text style={styles.buttonText}>Начать путь</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 36,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 48,
    opacity: 0.9,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});