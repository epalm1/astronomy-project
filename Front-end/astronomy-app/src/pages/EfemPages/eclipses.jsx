import React, { useState, useEffect } from 'react';
import DateFilterHeader from '../../components/DateFilterHeader';
import DataTable from '../../components/DataTable';
import '../../styles/tables.css';

function EclipsesPage() {
  const [startYear, setStartYear] = useState(2020);
  const [endYear, setEndYear] = useState(2026);
  const [timeZone, setTimeZone] = useState('local');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchEclipses() {
      setLoading(true);
      setError('');

      try {
        const params = new URLSearchParams({
          startYear: String(startYear),
          endYear: String(endYear)
        });

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/eclipses?${params}`,
          {
            signal: controller.signal
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Varjutuste laadimine ebaõnnestus.');
          console.error('Failed to load eclipses:', err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchEclipses();

    return () => controller.abort();
  }, [startYear, endYear]);

  const formatDateTime = (dateTime) => {
    if (!dateTime) return '';

    const utcDate = new Date(
      dateTime.endsWith('Z') ? dateTime : `${dateTime}Z`
    );

    return utcDate.toLocaleString('et-EE', {
      timeZone:
        timeZone === 'UTC'
          ? 'UTC'
          : Intl.DateTimeFormat().resolvedOptions().timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const tableData = data.map((item) => ({
    id: item.id,
    eclipse: item.eclipse,
    start: formatDateTime(item.start),
    peak: formatDateTime(item.peak),
    end: formatDateTime(item.end),
    dur: item.dur,
    loc: item.loc,
    percent: item.percent
  }));

  const handleShiftYears = (amount) => {
    setStartYear((prev) => Number(prev) + amount);
    setEndYear((prev) => Number(prev) + amount);
  };

  const columns = [
    { label: 'Varjutuse tüüp', key: 'eclipse', align: 'left' },
    { label: 'Algus', key: 'start', align: 'center' },
    { label: 'Tipp', key: 'peak', align: 'center' },
    { label: 'Lõpp', key: 'end', align: 'center' },
    { label: 'Kestus', key: 'dur', align: 'center' },
    { label: 'Asukoht', key: 'loc', align: 'center' },
    { label: 'Nähtavuse protsent', key: 'percent', align: 'right' }
  ];

  return (
    <div className="quadraturesPage">
      <h1>Varjutused</h1>

      <DateFilterHeader
        startYear={startYear}
        endYear={endYear}
        timezone={timeZone}
        handleStartYearChange={(e) => setStartYear(e.target.value)}
        handleEndYearChange={(e) => setEndYear(e.target.value)}
        handleShiftYears={handleShiftYears}
        handleTzChange={(e) => setTimeZone(e.target.value)}
      />

      {loading && <p>Laen varjutusi...</p>}

      {error && <p role="alert">Viga andmete laadimisel: {error}</p>}

      {!loading && !error && (
        <DataTable columns={columns} data={tableData} />
      )}
    </div>
  );
}

export default EclipsesPage;
