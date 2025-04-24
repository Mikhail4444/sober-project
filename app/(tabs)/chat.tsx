import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Send, Mic } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Chat() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#00E5FF', '#5B10D4']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>AI Чат</Text>
          <Text style={styles.subtitle}>Ваш персональный помощник</Text>
        </View>

        <ScrollView style={styles.chatContainer}>
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>Здравствуйте! Чем я могу вам помочь сегодня?</Text>
            <Text style={styles.messageTime}>AI Ассистент • 12:00</Text>
          </View>
        </ScrollView>

        <View style={styles.quickActions}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionText}>Справиться со стрессом</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionText}>Предотвратить срыв</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionText}>Мотивация</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Введите ваше сообщение..."
            multiline
          />
          <TouchableOpacity style={styles.sendButton}>
            <Send size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.voiceButton}>
            <Mic size={20} color="#5B10D4" />
          </TouchableOpacity>
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
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 16,
    borderRadius: 16,
    maxWidth: '80%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  messageText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#2C3E50',
  },
  messageTime: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
  },
  quickActions: {
    padding: 16,
  },
  quickActionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  quickActionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  inputContainer: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#2C3E50',
  },
  sendButton: {
    backgroundColor: '#00E5FF',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});