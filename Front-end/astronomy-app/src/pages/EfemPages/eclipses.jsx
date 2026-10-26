import React, { useEffect, useState } from 'react';
import DateFilterHeader from '../../components/DateFilterHeader.jsx';
import DataTable from '../../components/DataTable.jsx';
import '../../styles/tables.css';

function EclipsesPage() {
  const [startYear, setStartYear] = useState(2020);
  const [endYear, setEndYear] = useState(2026);
  const [timeZone, setTimeZone] = useState('loc');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleShiftYears = (amount) => {
    setStartYear((prev) => Number(prev) + amount);
    setEndYear((prev) => Number(prev) + amount);
  };

  const columns = [
    { label: 'Varjutus', key: 'eclipse', align: 'left' },
    { label: 'Varjutuse algus', key: 'start', align: 'center' },
    { label: 'Varjutuse tipp', key: 'peak', align: 'center' },
    { label: 'Varjutuse lõpp', key: 'end', align: 'center' },
    { label: 'Kestus', key: 'dur', align: 'center' },
    { label: 'Asukoht', key: 'loc', align: 'center' },
    { label: 'Nähtavuse protsent', key: 'percent', align: 'right' }
  ];

  useEffect(() => {
    if (
      !Number.isInteger(Number(startYear)) ||
      !Number.isInteger(Number(endYear)) ||
      Number(startYear) > Number(endYear)
    ) {
      setData([]);
      setError('Algusaasta ei saa olla lõppaastast suurem.');
      return;
    }

    const controller = new AbortController();

    async function fetchEclipses() {
      setLoading(true);
      setError('');

      try {
        const params = new URLSearchParams({
          startYear: String(startYear),
          endYear: String(endYear)
        });

        const response = await fetch(`http://localhost:8080/api/eclipses?${params}`);

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        const result = await response.json();

        console.log('Eclipses API response:', result);

        setData(result);
      } catch (err) {
        setError('Varjutuste laadimine ebaõnnestus.');
        setData([]);
        console.error('Failed to load eclipses:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchEclipses();

    return () => controller.abort();
  }, [startYear, endYear]);

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

      {loading && <p>Laadin varjutusi...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && <DataTable columns={columns} data={data} />}
    </div>
  );
}

export default EclipsesPage;
