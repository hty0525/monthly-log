import { PersonalProgressWidget } from '@/features/dashboard/components/personal-progress-widget';
import { MonthlyCalendar } from '@/features/dashboard/components/monthly-calendar';

type SidebarProps = {
  postCount: number;
  commentCount: number;
  year: number;
  month: number;
  selectedDate?: Date;
  onDateClick?: (date: Date) => void;
};

export const Sidebar = ({
  postCount,
  commentCount,
  year,
  month,
  selectedDate,
  onDateClick,
}: SidebarProps) => {
  return (
    <div className="space-y-6 lg:col-span-1">
      {/* Personal Progress Widget */}
      <PersonalProgressWidget postCount={postCount} commentCount={commentCount} />

      {/* Monthly Calendar */}
      <MonthlyCalendar
        year={year}
        month={month}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
      />
    </div>
  );
};
