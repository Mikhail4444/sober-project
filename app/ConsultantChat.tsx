import { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated
} from 'react-native';
import { Send, Mic, ChevronLeft, Lightbulb, X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const QUICK_ACTIONS = [
  "Как справиться с тягой?",
  "Экстренная помощь",
  "Мотивирующие техники",
  "Антистресс методы",
  "Анализ прогресса",
  "Советы по релаксации"
];

export default function ChatScreen() {
  const { roleName } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Привет! Я ваш ${roleName}. Давайте обсудим вашу ситуацию.`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showTipsPanel, setShowTipsPanel] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showTipsPanel) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [showTipsPanel]);

  const toggleTipsPanel = () => {
    setShowTipsPanel(!showTipsPanel);
  };

  const handleSend = () => {
    if (inputText.trim() === '') return;
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    setInputText(action);
    setShowTipsPanel(false);
  };

  const generateBotResponse = (input: string) => {
    const responses = [
      "Я понимаю вашу ситуацию. Можете рассказать подробнее?",
      "Это важный момент. Как это на вас влияет?",
      `Как ${roleName}, я рекомендую рассмотреть следующий подход...`,
      "Многие в подобной ситуации находили полезным...",
      "Давайте сосредоточимся на ваших целях."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0]
  });

  return (
    <LinearGradient
      colors={['#0F172A', '#1E293B']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        {/* Шапка */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ChevronLeft size={24} color="#2A5CFF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>{roleName}</Text>
            <Text style={styles.headerSubtitle}>Ваш персональный помощник</Text>
          </View>
        </View>

        {/* Сообщения */}
        <ScrollView style={styles.messagesContainer}>
          {messages.map((message, index) => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.sender === 'user' ? styles.userMessage : styles.botMessage
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
              <Text style={styles.messageTime}>
                {message.sender === 'bot' ? roleName : 'Вы'} •{' '}
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Поле ввода */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Введите сообщение..."
            placeholderTextColor="#64748B"
            multiline
          />
          
          {inputText ? (
            <TouchableOpacity 
              style={styles.sendButton} 
              onPress={handleSend}
            >
              <Send size={20} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.voiceButton}>
              <Mic size={20} color="#2A5CFF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Плавающая кнопка подсказок */}
        <TouchableOpacity 
          style={styles.tipsButton}
          onPress={toggleTipsPanel}
        >
          <Lightbulb size={24} color="#2A5CFF" />
        </TouchableOpacity>

        {/* Панель подсказок (появляется по нажатию) */}
        {showTipsPanel && (
          <Animated.View 
            style={[
              styles.tipsPanel,
              { 
                opacity: fadeAnim,
                transform: [{ translateY }] 
              }
            ]}
          >
            <View style={styles.tipsPanelHeader}>
              <Text style={styles.tipsPanelTitle}>Подсказки для диалога</Text>
              <TouchableOpacity onPress={toggleTipsPanel}>
                <X size={20} color="#64748B" />
              </TouchableOpacity>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tipsContent}
            >
              {QUICK_ACTIONS.map((action, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.tipButton}
                  onPress={() => handleQuickAction(action)}
                >
                  <Text style={styles.tipText}>{action}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        )}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 16,
    backgroundColor: 'transparent',
    gap: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#E2E8F0',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderColor: '#334155',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(42, 92, 255, 0.2)',
    borderColor: 'rgba(42, 92, 255, 0.3)',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    color: '#E2E8F0',
  },
  messageTime: {
    fontSize: 12,
    marginTop: 6,
    color: '#64748B',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#1E293B',
    borderRadius: 20,
    fontSize: 15,
    color: '#E2E8F0',
    borderWidth: 1,
    borderColor: '#334155',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2A5CFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(42, 92, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(42, 92, 255, 0.2)',
  },
  tipsButton: {
    position: 'absolute',
    right: 20,
    bottom: Platform.OS === 'ios' ? 90 : 70,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(42, 92, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(42, 92, 255, 0.3)',
    zIndex: 10,
  },
  tipsPanel: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 90 : 70,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#2A5CFF',
    padding: 16,
    zIndex: 5,
  },
  tipsPanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipsPanelTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E2E8F0',
  },
  tipsContent: {
    gap: 8,
  },
  tipButton: {
    backgroundColor: 'rgba(42, 92, 255, 0.1)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(42, 92, 255, 0.2)',
  },
  tipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2A5CFF',
  },
});