import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';

export default function Welcome() {
  return (
    <View style={styles.container}>
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../assets/images/hero.jpg')} // или используйте uri, если картинка в интернете
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>
        Ты уже молодец,{"\n"}что здесь!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/login')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Начать свой путь</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  illustrationContainer: {
    marginTop: 40,
    marginBottom: 32,
    alignItems: 'center',
    width: '100%',
  },
  illustration: {
    width: 320,
    height: 220,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 48,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  button: {
    backgroundColor: '#232B3B',
    paddingHorizontal: 36,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});