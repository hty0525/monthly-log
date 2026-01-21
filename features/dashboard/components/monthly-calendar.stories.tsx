import { useState } from 'react';

import { MonthlyCalendar } from './monthly-calendar';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Features/Dashboard/MonthlyCalendar',
  component: MonthlyCalendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MonthlyCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    year: 2024,
    month: 1,
  },
};

export const WithSelectedDate: Story = {
  render: (args) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
      new Date(2024, 0, 15)
    );

    return (
      <MonthlyCalendar
        {...args}
        selectedDate={selectedDate}
        onDateClick={setSelectedDate}
      />
    );
  },
  args: {
    year: 2024,
    month: 1,
  },
};

export const CurrentMonth: Story = {
  render: () => {
    const now = new Date();
    return <MonthlyCalendar year={now.getFullYear()} month={now.getMonth() + 1} />;
  },
  args: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  },
};
