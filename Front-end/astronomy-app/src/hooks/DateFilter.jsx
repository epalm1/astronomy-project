import { useState } from 'react';

function useDateFilter(initialStart = 2020, initialEnd = 2026, minYear = 1900, maxYear = 2100) {
  const [startYear, setStartYear] = useState(initialStart);
  const [endYear, setEndYear] = useState(initialEnd);
  const [timezone, setTimezone] = useState('loc');

  // Clamp helper function
  const clamp = (value, min, max) => {
    return Math.max(min, Math.min(value, max));
  };

  // Shift years by a given delta (+1, -1, +10, -10)
  const handleShiftYears = (amount) => {
    setStartYear((prev) => clamp(Number(prev) + amount, minYear, maxYear));
    setEndYear((prev) => clamp(Number(prev) + amount, minYear, maxYear));
  };

  // Handle start year input change with validation
  const handleStartYearChange = (e) => {
    const val = Number(e.target.value);
    const clampedVal = clamp(val, minYear, Number(endYear));
    setStartYear(clampedVal);
  };

  // Handle end year input change with validation
  const handleEndYearChange = (e) => {
    const val = Number(e.target.value);
    const clampedVal = clamp(val, Number(startYear), maxYear);
    setEndYear(clampedVal);
  };

  // Handle timezone change
  const handleTzChange = (e) => {
    setTimezone(e.target.value);
  };

  return {
    startYear,
    endYear,
    timezone,
    handleShiftYears,
    handleStartYearChange,
    handleEndYearChange,
    handleTzChange
  };
}
export default useDateFilter;
