import { useState } from 'react';
import { DayStatus } from '../WeekProgress';
import { isBefore, parseISO } from 'date-fns';

type MarkedDates = {
  [date: string]: {
    selected?: boolean;
    marked?: boolean;
    status?: DayStatus;
    dotColor?: string;
    selectedColor?: string;
    selectedTextColor?: string;
  };
};

export const useCalendar = (initialDates: MarkedDates = {}) => {
  const [markedDates, setMarkedDates] = useState<MarkedDates>(initialDates);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const markDate = (date: string, status: DayStatus) => {
    const dateObj = parseISO(date);
    const today = new Date();
    
    // Проверяем, что дата не в будущем
    if (isBefore(dateObj, today) || isToday(dateObj)) {
      const colors = {
        'clean': {
          dotColor: '#2ECC71',
          selectedColor: '#2ECC71',
          selectedTextColor: '#FFFFFF'
        },
        'controlled': {
          dotColor: '#F1C40F',
          selectedColor: '#F1C40F',
          selectedTextColor: '#000000'
        },
        'failed': {
          dotColor: '#E74C3C',
          selectedColor: '#E74C3C',
          selectedTextColor: '#FFFFFF'
        }
      }[status];

      setMarkedDates(prev => ({
        ...prev,
        [date]: {
          ...prev[date],
          status,
          selected: true,
          ...colors,
          marked: true
        },
      }));
    }
  };

  return {
    markedDates,
    selectedDate,
    markDate,
    setSelectedDate,
  };
};

function isToday(date: Date) {
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
}