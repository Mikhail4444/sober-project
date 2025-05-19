import { DayStatus } from '../WeekProgress';

export type MarkedDates = {
  [date: string]: {
    selected?: boolean;
    marked?: boolean;
    status?: DayStatus;
    dotColor?: string;
  };
};