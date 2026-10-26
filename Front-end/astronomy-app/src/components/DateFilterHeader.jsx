
function DateFilterHeader({
    startYear,
    endYear,
    timezone,
    handleShiftYears,
    handleStartYearChange,
    handleEndYearChange,
    handleTzChange})
{
    return (
        <div className="table-header">
            <div
            className="hoverblock"
            title="10 aastat tagasi"
            onClick={() => handleShiftYears(-10)}>
                <svg width="17" height="16">
                    <polygon points="17,0 17,16 7,8" />
                    <polygon points="10,0 10,16 0,8" />
                </svg>
            </div>
            <div
                className="hoverblock"
                title="1 aasta tagasi"
                onClick={() => handleShiftYears(-1)}>
                <svg width="17" height="16">
                    <polygon points="10,0 10,16 0,8" />
                </svg>
            </div>
            <div className="center-box">
                Aastad:
                <div className="input-wrapper">
                    <input type="number"
                    id="startYear"
                    dir="rtl"
                    step="1"
                    value={startYear}
                    onChange={handleStartYearChange}/>
                    <b>-</b>
                    <input type="number"
                       id="endYear"
                       dir="rtl"
                       step="1"
                       value={endYear}
                       onChange={handleEndYearChange}/>
                </div>
                <br/>
                Kellaaeg:
                <select className="timezone-select"
                value={timezone}
                onChange={handleTzChange}>
                    <option value="loc">kohalik</option>
                    <option value="utc">UTC</option>
                </select>
            </div>
            <div
                className="hoverblock"
                title="1 aasta edasi"
                onClick={() => handleShiftYears(1)}
            >
                <svg width="10" height="16">
                    <polygon points="0,0 0,16 10,8" />
                </svg>
            </div>
            <div
                className="hoverblock"
                title="10 aastat edasi"
                onClick={() => handleShiftYears(10)}>
                <svg width="17" height="16">
                    <polygon points="0,0 0,16 10,8" />
                    <polygon points="7,0 7,16 17,8" />
                </svg>
            </div>
        </div>
    );
}
export default DateFilterHeader;
