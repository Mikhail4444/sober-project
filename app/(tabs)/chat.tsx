import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Send, Mic } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Chat() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F172A', '#1E293B']}
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
            <Text style={styles.messageText}>Привет! Как я могу помочь вам сегодня?</Text>
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
            placeholder="Введите сообщение..."
            placeholderTextColor="#94A3B8"
            multiline
          />
          <TouchableOpacity style={styles.sendButton}>
            <Send size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.voiceButton}>
            <Mic size={20} color="#2A5CFF" />
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
    padding: 24,
    paddingTop: 60,
    backgroundColor: 'transparent',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    color: '#fff',
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#94A3B8',
    marginTop: 4,
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    maxWidth: '80%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  messageText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#fff',
  },
  messageTime: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
  },
  quickActions: {
    padding: 16,
  },
  quickActionButton: {
    backgroundColor: 'rgba(42, 92, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(42, 92, 255, 0.3)',
  },
  quickActionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#2A5CFF',
  },
  inputContainer: {
    padding: 16,
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  input: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#fff',
  },
  sendButton: {
    backgroundColor: '#2A5CFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceButton: {
    backgroundColor: 'rgba(42, 92, 255, 0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});