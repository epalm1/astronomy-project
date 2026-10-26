import React, {useState} from 'react';
import DateFilterHeader from "../../components/DateFilterHeader.jsx";
import DataTable from "../../components/DataTable.jsx";

function EclipsesPage() {
  const [startYear, setStartYear] = useState(2020);
  const [endYear, setEndYear] = useState(2026);
  const [timeZone, setTimeZone] = useState("loc");

  const handleShiftYears = (amount) => {
    setStartYear((prev) => Number(prev) + amount);
    setEndYear((prev) => Number(prev) + amount);
  };
  const columns = [
    {label: "Varjutus", key: "eclipse", align: "left"},
    {label: "Varjutuse algus", key: "start", align: "center"},
    {label: "Varjutuse tipp", key: "peak", align: "center"},
    {label: "Varjutuse lõpp", key: "end", align: "center"},
    {label: "Kestus", key: "dur", align: "center"},
    {label: "Asukoht", key: "loc", align: "center"},
    {label: "Nähtavuse protsent", key: "percent", align: "right"},
  ];
  return (
      <div className="quadraturesPage">
        <h1>Varjutused</h1>
        <DateFilterHeader
            startYear={startYear}
            endYear={endYear}
            timezone={timeZone}
            handleStartYearChange={(e)=>setStartYear(e.target.value)}
            handleEndYearChange={(e)=>setEndYear(e.target.value)}
            handleShiftYears={handleShiftYears}
            handleTzChange={(e)=>setTimeZone(e.target.value)}/>
        <DataTable columns={columns} data={data}/>
      </div>
  );
}
export default EclipsesPage;
