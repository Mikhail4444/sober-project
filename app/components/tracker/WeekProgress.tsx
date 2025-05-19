import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Svg, G, Rect, Text as SvgText } from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

export type DayStatus = 'clean' | 'controlled' | 'failed';

export interface DayData {
  day: string;
  status: DayStatus;
  anim: Animated.Value;
}

interface WeekProgressProps {
  weekData: DayData[];
  adjustedDayIndex: number;
  successRate: number;
}

const statusColors = {
  clean: '#2ECC71',
  controlled: '#F39C12',
  failed: '#E74C3C'
};

export const WeekProgress: React.FC<WeekProgressProps> = ({
  weekData,
  adjustedDayIndex,
  successRate
}) => {
  return (
    <View style={styles.weeklyStats}>
      <Text style={styles.sectionTitle}>
        Прогресс за неделю ({successRate}%)
      </Text>
      <View style={styles.chartContainer}>
        <Svg width="100%" height={150}>
          {weekData.map((day, index) => {
            const height = day.status === 'failed' ? 20 : 
                         day.status === 'controlled' ? 40 : 60;
            const y = 80 - height;
            
            return (
              <G key={day.day} x={index * 45 + 10}>
                <AnimatedRect
                  y={day.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [80, y],
                  })}
                  width="30"
                  height={height}
                  fill={statusColors[day.status]}
                  rx="4"
                  stroke={index === adjustedDayIndex ? "#FFD700" : "none"}
                  strokeWidth="2"
                />
                <SvgText
                  x="15"
                  y="100"
                  fill={index === adjustedDayIndex ? "#FFD700" : "white"}
                  fontSize="12"
                  fontWeight={index === adjustedDayIndex ? "bold" : "normal"}
                  textAnchor="middle"
                >
                  {day.day}
                </SvgText>
                <SvgText
                  x="15"
                  y={day.status === 'clean' ? 65 : day.status === 'controlled' ? 75 : 75}
                  fill="white"
                  fontSize="10"
                  textAnchor="middle"
                >
                  {day.status === 'clean' ? "✓" : day.status === 'controlled' ? "~" : "✗"}
                </SvgText>
              </G>
            );
          })}
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weeklyStats: {
    width: '100%',
    marginVertical: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  chartContainer: {
    height: 150,
    width: '100%',
    alignItems: 'center',
  },
});