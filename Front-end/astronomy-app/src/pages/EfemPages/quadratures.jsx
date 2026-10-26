import React, { useState } from "react";
import DateFilterHeader from "../../components/DateFilterHeader";
import DataTable from "../../components/DataTable";

function QuadraturesPage(){
    const [startYear, setStartYear] = useState(2020);
    const [endYear, setEndYear] = useState(2026);
    const [timeZone, setTimeZone] = useState("loc");

    const handleShiftYears = (amount) => {
        setStartYear((prev) => Number(prev) + amount);
        setEndYear((prev) => Number(prev) + amount);
    };
    const columns = [
        {label: "Planeet", key: "planet", align: "left"},
        {label: "Faasinurk", key: "angle", align: "center"},
        {label: "Kuupaev", key: "date", align: "right"},
    ];
    return (
        <div className="quadraturesPage">
            <h1>Kvadratuurid</h1>
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
export default QuadraturesPage;
