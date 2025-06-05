import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { CalendarDay } from './CalendarDay';
import { DayStatus } from '../WeekProgress';
import { isToday, isBefore, parseISO } from 'date-fns';

type MarkedDates = {
  [date: string]: {
    selected?: boolean;
    marked?: boolean;
    status?: DayStatus;
    dotColor?: string;
  };
};

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  markedDates: MarkedDates;
  onDayPress: (date: string, status: DayStatus) => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  visible,
  onClose,
  markedDates,
  onDayPress,
}) => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDayPress = (date: string) => {
    const dateObj = parseISO(date);
    const today = new Date();
    
    // Блокируем выбор будущих дат
    if (isBefore(dateObj, today) || isToday(dateObj)) {
      setSelectedDate(date);
      setShowStatusModal(true);
    }
  };

  const handleStatusSelect = (status: DayStatus) => {
    if (selectedDate) {
      onDayPress(selectedDate, status);
    }
    setShowStatusModal(false);
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent={false}
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.container}>
          <Calendar
            markedDates={markedDates}
            onDayPress={(day: DateData) => handleDayPress(day.dateString)}
            monthFormat={'MMMM yyyy'}
            hideArrows={false}
            firstDay={1}
            renderArrow={(direction: 'left' | 'right') => (
              <Text style={styles.arrow}>
                {direction === 'left' ? '<' : '>'}
              </Text>
            )}
            dayComponent={({ date, state, marking }) => (
              <CalendarDay 
                date={date}
                state={state}
                marking={marking}
                onPress={() => handleDayPress(date.dateString)}
                disabled={!isBefore(parseISO(date.dateString), new Date()) && !isToday(parseISO(date.dateString))}
              />
            )}
            theme={{
              calendarBackground: '#0F172A',
              dayTextColor: '#FFFFFF',
              monthTextColor: '#FFFFFF',
              textDisabledColor: '#475569',
              todayTextColor: '#2A5CFF',
              arrowColor: '#2A5CFF',
              disabledArrowColor: '#475569',
              'stylesheet.calendar.header': {
                dayHeader: {
                  color: '#FFFFFF',
                  fontWeight: '500',
                },
              },
            }}
          />
          
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeText}>Закрыть</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Модалка выбора статуса */}
      {showStatusModal && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={showStatusModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.statusModalContent}>
              <Text style={styles.statusModalTitle}>Выберите статус дня</Text>
              
              <TouchableOpacity 
                style={[styles.statusButton, { backgroundColor: '#2ECC71' }]}
                onPress={() => handleStatusSelect('clean')}
              >
                <Text style={styles.statusButtonText}>День чист</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.statusButton, { backgroundColor: '#F1C40F' }]}
                onPress={() => handleStatusSelect('controlled')}
              >
                <Text style={styles.statusButtonText}>Контролируемое употребление</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.statusButton, { backgroundColor: '#E74C3C' }]}
                onPress={() => handleStatusSelect('failed')}
              >
                <Text style={styles.statusButtonText}>Не контролировал ситуацию</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowStatusModal(false)}
              >
                <Text style={styles.cancelButtonText}>Отмена</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 16,
  },
  arrow: {
    color: '#2A5CFF',
    fontSize: 24,
    paddingHorizontal: 12,
  },
  closeButton: {
    backgroundColor: 'rgba(42, 92, 255, 0.2)',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  statusModalContent: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  statusModalTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  statusButton: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  statusButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  cancelButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#475569',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});