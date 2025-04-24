import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, Facebook, Mail, Lock } from 'lucide-react-native';

export default function Login() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#00E5FF', '#5B10D4']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Вход</Text>
          
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Mail size={20} color="#7F8C8D" />
              <TextInput
                style={styles.input}
                placeholder="Email или имя пользователя"
                placeholderTextColor="#7F8C8D"
              />
            </View>

            <View style={styles.inputContainer}>
              <Lock size={20} color="#7F8C8D" />
              <TextInput
                style={styles.input}
                placeholder="Пароль"
                placeholderTextColor="#7F8C8D"
                secureTextEntry
              />
            </View>

            <View style={styles.rememberContainer}>
              <View style={styles.checkboxContainer}>
                <View style={styles.checkbox} />
                <Text style={styles.rememberText}>Запомнить меня</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.forgotText}>Забыли пароль?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.signInButton}
              onPress={() => router.push('/addiction-select')}
            >
              <Text style={styles.signInButtonText}>ВОЙТИ</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>или войти через</Text>

            <View style={styles.socialButtons}>
              <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
                <Mail size={24} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
                <Facebook size={24} color="#4267B2" />
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Нет аккаунта? </Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.createAccountText}>Создать аккаунт</Text>
              </TouchableOpacity>
            </View>
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
  header: {
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 32,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    color: '#fff',
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#2C3E50',
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  rememberText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#fff',
  },
  forgotText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#4CAF50',
  },
  signInButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  signInButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  orText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 24,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {
    backgroundColor: '#fff',
  },
  facebookButton: {
    backgroundColor: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#fff',
  },
  createAccountText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#4CAF50',
  },
}); 