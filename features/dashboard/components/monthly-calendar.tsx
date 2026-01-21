import { useState } from 'react';

import { Badge } from '@/shared/components/badge/badge';
import { Card } from '@/shared/components/card/card';

import type { FC } from 'react';

type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
  postCount: number;
};

type MonthlyCalendarProps = {
  year: number;
  month: number;
  onDateClick?: (date: Date) => void;
  selectedDate?: Date;
};

export const MonthlyCalendar: FC<MonthlyCalendarProps> = ({
  year,
  month,
  onDateClick,
  selectedDate,
}) => {
  const [currentYear] = useState(year);
  const [currentMonth] = useState(month);

  const getDaysInMonth = (year: number, month: number): CalendarDay[] => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const days: CalendarDay[] = [];

    // 이전 달의 날짜들
    const prevMonthLastDay = new Date(year, month - 1, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 2, prevMonthLastDay - i),
        isCurrentMonth: false,
        postCount: 0,
      });
    }

    // 현재 달의 날짜들
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month - 1, i),
        isCurrentMonth: true,
        postCount: 0, // TODO: 실제 데이터로 교체
      });
    }

    // 다음 달의 날짜들
    const remainingDays = 42 - days.length; // 6주 * 7일
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: false,
        postCount: 0,
      });
    }

    return days;
  };

  const days = getDaysInMonth(currentYear, currentMonth);
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const isSelectedDate = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getFullYear() === selectedDate.getFullYear() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getDate() === selectedDate.getDate()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  return (
    <Card className="w-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {currentYear}년 {currentMonth}월
          </h2>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}

          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => onDateClick?.(day.date)}
              disabled={!day.isCurrentMonth}
              className={`
                relative aspect-square rounded-md p-2 text-sm transition-colors
                ${
                  day.isCurrentMonth
                    ? 'hover:bg-accent'
                    : 'text-muted-foreground opacity-50'
                }
                ${isSelectedDate(day.date) ? 'bg-primary text-primary-foreground' : ''}
                ${isToday(day.date) && !isSelectedDate(day.date) ? 'border-2 border-primary' : ''}
                disabled:cursor-not-allowed
              `}
            >
              <div className="flex flex-col items-center gap-1">
                <span>{day.date.getDate()}</span>
                {day.postCount > 0 && day.isCurrentMonth && (
                  <Badge variant="secondary" className="text-xs px-1 py-0">
                    {day.postCount}
                  </Badge>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};
