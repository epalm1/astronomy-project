import React, { useState, useEffect } from 'react';
import DateFilterHeader from '../../components/DateFilterHeader';
import DataTable from '../../components/DataTable';
import '../../styles/tables.css';

function QuadraturesPage() {
  const [startYear, setStartYear] = useState(2020);
  const [endYear, setEndYear] = useState(2026);
  const [timeZone, setTimeZone] = useState('local');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchQuadratures() {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          startYear: String(startYear),
          endYear: String(endYear)
        });

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/quadratures?${params}`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchQuadratures();

    return () => controller.abort();
  }, [startYear, endYear]);

  const tableData = data.map((item) => ({
    id: item.id,
    planet: item.planetName,
    angle: item.phaseAngle,
    date: item.time
      ? new Date(item.time.endsWith('Z') ? item.time : `${item.time}Z`).toLocaleString('et-EE', {
          timeZone: timeZone === 'UTC' ? 'UTC' : Intl.DateTimeFormat().resolvedOptions().timeZone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        })
      : ''
  }));

  const handleShiftYears = (amount) => {
    setStartYear((prev) => Number(prev) + amount);
    setEndYear((prev) => Number(prev) + amount);
  };
  const columns = [
    { label: 'Planeet', key: 'planet', align: 'left' },
    { label: 'Faasinurk', key: 'angle', align: 'center' },
    { label: 'Kuupäev', key: 'date', align: 'right' }
  ];
  return (
    <div className="quadraturesPage">
      <h1>Kvadratuurid</h1>
      <DateFilterHeader
        startYear={startYear}
        endYear={endYear}
        timezone={timeZone}
        handleStartYearChange={(e) => setStartYear(e.target.value)}
        handleEndYearChange={(e) => setEndYear(e.target.value)}
        handleShiftYears={handleShiftYears}
        handleTzChange={(e) => setTimeZone(e.target.value)}
      />
      {loading && <p>Laen kvadratuure</p>}

      {error && <p role="alert">Viga andmete laadimisel: {error}</p>}

      {!loading && !error && <DataTable columns={columns} data={tableData} />}
    </div>
  );
}
export default QuadraturesPage;
