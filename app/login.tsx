import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Eye } from 'lucide-react-native';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Простая валидация
    if (!email || !password) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Ошибка', 'Введите корректный email');
      return;
    }

    // Здесь должна быть логика входа (например, запрос к API)
    // Для демонстрации просто переходим на следующий экран
    router.replace('/addiction-select');
  };

  const handleSocialLogin = () => {
    // При входе через соцсети также переходим на выбор зависимости
    router.replace('/addiction-select');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <LinearGradient
        colors={['#0F172A', '#1E293B']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Заголовок */}
        <Text style={styles.headerTitle}>Давай начнём!</Text>

        {/* Табы */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, styles.tabActive]}
            onPress={() => router.push('/login')}
            activeOpacity={1}
          >
            <Text style={[styles.tabText, styles.tabTextActive]}>Войти</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => router.push('/register')}
          >
            <Text style={styles.tabText}>Регистрация</Text>
          </TouchableOpacity>
        </View>

        {/* Форма */}
        <View style={styles.form}>
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Пароль:</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder=""
                placeholderTextColor="#94A3B8"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Eye size={24} color="#94A3B8" style={{ marginLeft: 8 }} />
            </View>
          </View>
          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Забыли пароль?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.continueBtn}
            onPress={handleLogin}
          >
            <Text style={styles.continueBtnText}>Продолжить</Text>
          </TouchableOpacity>
        </View>

        {/* Соцсети */}
        <Text style={styles.socialTitle}>войти с помощью:</Text>
        <View style={styles.socialRow}>
          <TouchableOpacity 
            style={styles.socialIcon}
            onPress={handleSocialLogin}
          >
            <Image source={require('../assets/images/vk.png')} style={styles.iconImg} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.socialIcon}
            onPress={handleSocialLogin}
          >
            <Image source={require('../assets/images/google.png')} style={styles.iconImg} />
          </TouchableOpacity>
        </View>

        {/* Анонимно */}
        <TouchableOpacity 
          style={styles.anonBtn}
          onPress={() => router.replace('/addiction-select')}
        >
          <Text style={styles.anonText}>продолжить <Text style={styles.anonTextAccent}>анонимно</Text></Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'flex-start',
    minHeight: '100%',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    marginLeft: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  tab: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  tabActive: {
    backgroundColor: '#2A5CFF',
  },
  tabText: {
    color: '#94A3B8',
    fontSize: 18,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  form: {
    marginBottom: 16,
    gap: 16,
  },
  inputBlock: {
    marginBottom: 8,
  },
  inputLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 8,
  },
  input: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    borderWidth: 1,
    borderColor: '#334155',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  forgotText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  continueBtn: {
    backgroundColor: '#2A5CFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialTitle: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 16,
    fontWeight: '500',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 24,
  },
  socialIcon: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  iconImg: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  anonBtn: {
    alignSelf: 'center',
    marginTop: 8,
  },
  anonText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '500',
  },
  anonTextAccent: {
    color: '#2A5CFF',
    fontWeight: 'bold',
  },
});