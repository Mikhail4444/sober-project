import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Svg, Circle, G } from 'react-native-svg';
import ConfettiCannon from 'react-native-confetti-cannon';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface SobrietyWheelProps {
  streak: number;
  progress: Animated.Value;
  headerColor: Animated.Value;
  isCelebrating: boolean;
}

export const SobrietyWheel: React.FC<SobrietyWheelProps> = ({
  streak,
  progress,
  headerColor,
  isCelebrating
}) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  const headerInterpolation = headerColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#2A5CFF', '#FFD700'],
  });

  return (
    <>
      {isCelebrating && (
        <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
      )}

      <Animated.Text style={[styles.header, { color: headerInterpolation }]}>
        ДНЕЙ БЕЗ ЗАВИСИМОСТИ
      </Animated.Text>

      <View style={styles.timerContainer}>
        <Svg width="200" height="200" viewBox="0 0 200 200">
          <G rotation="-90" origin="100, 100">
            <Circle cx="100" cy="100" r={radius} stroke="#1E3A8A" strokeWidth={10} fill="transparent" />
            <AnimatedCircle
              cx="100"
              cy="100"
              r={radius}
              stroke="#2A5CFF"
              strokeWidth={10}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </G>
        </Svg>
        <View style={styles.counterContainer}>
          <Text style={styles.counter}>{streak}</Text>
          <Text style={styles.daysLabel}>дней серия</Text>
          {isCelebrating && <Text style={styles.celebrationText}>🎉 Вы сделали это! 🎉</Text>}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    color: '#2A5CFF',
    fontSize: 24,
    fontWeight: '300',
    letterSpacing: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
  timerContainer: {
    width: 200,
    height: 200,
    marginVertical: 20,
    alignSelf: 'center',
    position: 'relative',
  },
  counterContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    fontSize: 48,
    color: '#FFFFFF',
    fontWeight: '200',
    textAlign: 'center',
  },
  daysLabel: {
    fontSize: 16,
    color: '#64748B',
    marginTop: -10,
    textAlign: 'center',
  },
  celebrationText: {
    color: '#FFD700',
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});