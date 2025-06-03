import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, View, Animated } from 'react-native';
import { SobrietyWheel } from '@components/tracker/SobrietyWheel';
import { WeekProgress, DayData, DayStatus } from '@components/tracker/WeekProgress';
import { StatusModal } from '@components/tracker/modals/StatusModal';
import { StatsSection } from '@components/tracker/StatsSection';
import { CalendarModal } from '@components/tracker/calendar/CalendarModal';
import { useCalendar } from '@components/tracker/calendar/useCalendar';
import { Achievements } from '@components/tracker/Achievements';

export default function SobrietyTracker() {
  const [days, setDays] = useState(0);
  const [streak, setStreak] = useState(0);
  const [progress] = useState(new Animated.Value(0));
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [headerColor] = useState(new Animated.Value(0));
  const [showStatusModal, setShowStatusModal] = useState(false);
  
  const [weekData, setWeekData] = useState<DayData[]>([
    { day: 'Пн', status: 'clean', anim: new Animated.Value(0) },
    { day: 'Вт', status: 'failed', anim: new Animated.Value(0) },
    { day: 'Ср', status: 'clean', anim: new Animated.Value(0) },
    { day: 'Чт', status: 'controlled', anim: new Animated.Value(0) },
    { day: 'Пт', status: 'failed', anim: new Animated.Value(0) },
    { day: 'Сб', status: 'clean', anim: new Animated.Value(0) },
    { day: 'Вс', status: 'clean', anim: new Animated.Value(0) },
  ]);

  const currentDayIndex = new Date().getDay();
  const adjustedDayIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: (days / 30) * 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    if (days >= 30 && !isCelebrating) {
      setIsCelebrating(true);
      Animated.timing(headerColor, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
      
      setTimeout(() => {
        setIsCelebrating(false);
        Animated.timing(headerColor, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }).start();
      }, 3000);
    }
  }, [days]);

  const successRate = Math.round(
    (weekData.filter(day => day.status !== 'failed').length / 7 * 100)
  );

  const cleanDaysCount = weekData.filter(day => day.status === 'clean').length;
  const controlledDaysCount = weekData.filter(day => day.status === 'controlled').length;

  const addCleanDay = () => {
    const updatedData = [...weekData];
    updatedData[adjustedDayIndex] = {
      ...updatedData[adjustedDayIndex],
      status: 'clean',
      anim: new Animated.Value(0)
    };

    animateDay(updatedData[adjustedDayIndex]);
    setWeekData(updatedData);
    setDays(days + 1);
    setStreak(streak + 1);
  };

  const handleStatusSelect = (status: DayStatus) => {
    const updatedData = [...weekData];
    updatedData[adjustedDayIndex] = {
      ...updatedData[adjustedDayIndex],
      status,
      anim: new Animated.Value(0)
    };

    animateDay(updatedData[adjustedDayIndex]);
    setWeekData(updatedData);
    setShowStatusModal(false);
    setStreak(status === 'controlled' ? streak + 0 : 0);
  };

  const animateDay = (day: DayData) => {
    Animated.spring(day.anim, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };

  const { 
    markedDates, 
    selectedDate, 
    markDate,
    setSelectedDate 
  } = useCalendar();
  
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);

  const handleCalendarDayPress = (date: string, status: DayStatus) => {
    markDate(date, status);
    setShowCalendar(false);
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <SobrietyWheel
        streak={streak}
        progress={progress}
        headerColor={headerColor}
        isCelebrating={isCelebrating}
      />

      <WeekProgress
        weekData={weekData}
        adjustedDayIndex={adjustedDayIndex}
        successRate={successRate}
      />

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.cleanButton} onPress={addCleanDay}>
          <Text style={styles.buttonText}>✓ Чистый день</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.failButton} 
          onPress={() => setShowStatusModal(true)}
        >
          <Text style={styles.buttonText}>Зафиксировать срыв</Text>
        </TouchableOpacity>
      </View>

      <StatsSection
        cleanDaysCount={cleanDaysCount}
        controlledDaysCount={controlledDaysCount}
        days={days}
      />

      <StatusModal
        visible={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        onSelect={handleStatusSelect}
      />

      <View style={styles.bottomButtons}>
        <TouchableOpacity 
          style={styles.calendarButton}
          onPress={() => setShowCalendar(true)}
        >
          <Text style={styles.buttonText}>📆 Открыть календарь</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.achievementsButton}
          onPress={() => setShowAchievements(true)}
        >
          <Text style={styles.buttonText}>🏆 Достижения</Text>
        </TouchableOpacity>
      </View>

      <CalendarModal
        visible={showCalendar}
        onClose={() => setShowCalendar(false)}
        markedDates={markedDates}
        onDayPress={handleCalendarDayPress}
      />

      <Achievements
        visible={showAchievements}
        onClose={() => setShowAchievements(false)}
        streak={streak}
        weekData={weekData}
        markedDates={markedDates}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#0F172A',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    gap: 20,
    marginVertical: 20,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  cleanButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
  },
  failButton: {
    backgroundColor: 'rgba(231, 76, 60, 0.2)',
    borderColor: '#E74C3C',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  calendarButton: {
    flex: 1,
    backgroundColor: 'rgba(42, 92, 255, 0.2)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  achievementsButton: {
    flex: 1,
    backgroundColor: 'rgba(46, 204, 113, 0.2)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});