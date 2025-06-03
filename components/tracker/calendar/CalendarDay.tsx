import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DayStatus } from '../WeekProgress';

interface CalendarDayProps {
  date: {
    dateString: string;
    day: number;
  };
  state: string;
  marking?: {
    status?: DayStatus;
    selected?: boolean;
    selectedColor?: string;
  };
  onPress: () => void;
  disabled?: boolean;
}

const statusColors = {
  clean: '#2ECC71',
  controlled: '#F39C12',
  failed: '#E74C3C',
  default: 'transparent',
};

export const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  state,
  marking,
  onPress,
  disabled,
}) => {
  const status = marking?.status || 'default';
  const isToday = state === 'today';
  const isSelected = marking?.selected;
  const isDisabled = state === 'disabled' || disabled;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.container,
        {
          backgroundColor: isSelected ? marking?.selectedColor : 
                          
                          statusColors[status],
          borderColor: isToday ? '#2A5CFF' : 'transparent',
          borderRadius: isToday ? 18 : 4,
          opacity: isDisabled ? 0.3 : 1,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: isToday ? '#FFFFFF' : 
                  isSelected ? '#FFFFFF' :
                  status !== 'default' ? '#FFFFFF' : '#E2E8F0',
            fontWeight: isToday || isSelected ? 'bold' : 'normal',
          },
        ]}
      >
        {date.day}
      </Text>
      {status !== 'default' && !isSelected && (
        <Text style={styles.statusIndicator}>
          {status === 'clean' ? '✓' : 
           status === 'controlled' ? '~' : '✗'}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderWidth: 2,
  },
  text: {
    fontSize: 16,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: -4,
    fontSize: 10,
    color: '#FFFFFF',
  },
});