import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatsSectionProps {
  cleanDaysCount: number;
  controlledDaysCount: number;
  days: number;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  cleanDaysCount,
  controlledDaysCount,
  days,
}) => {
  return (
    <View style={styles.stats}>
      <View style={styles.statCard}>
        <Text style={styles.statValue}>{cleanDaysCount}</Text>
        <Text style={styles.statLabel}>Чистых дней</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statValue}>{controlledDaysCount}</Text>
        <Text style={styles.statLabel}>Контролируемых</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statValue}>${(days * 4.2).toFixed(2)}</Text>
        <Text style={styles.statLabel}>Сэкономлено</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  statCard: {
    backgroundColor: 'rgba(42, 92, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
  },
});