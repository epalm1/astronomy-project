import React, { useState, useEffect, useCallback } from 'react';
import * as Astronomy from 'astronomy-engine';
import '../styles/calendar.css';

// Replace with your actual common.js helper functions
import { clamp, datestring, daterange, syzygy, constelchange, timesearch } from './common';

// function clamp(v, min, max) {
//   return Math.max(min, Math.min(v, max));
// }
// function datestring(t) {
//   if (t instanceof Astronomy.AstroTime) {
//     t = t.date;
//   } else if ((!t) instanceof Date) {
//     throw 'datestring: argument is not Date or AstroTime';
//   }
//
//   return t.toLocaleDateString('sv');
// }

function Calendar() {
  const today = new Date();

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [eventFilter, setEventFilter] = useState({
    moonphases: true,
    moonphasetype: 'ecl',
    moonapsides: true,
    earthapsides: true,
    planetapsides: false,
    sunconstchange: true,
    moonconstchange: false,
    planetconstchange: false,
    earthseasons: true,
    eclipses: true,
    transits: true,
    elongations: true,
    peakmagnitude: true,
    conjunctions: false,
    oppositions: true,
    oppcontype: 'geom',
    quadratures: false,
    retrogrades: false,
    approaches: true,
    appminelong: 15,
    appmaxdist: 10
  });

  const [planetFilter, setPlanetFilter] = useState({
    Mercury: true,
    Venus: true,
    Moon: true,
    Mars: true,
    Jupiter: true,
    Saturn: true,
    Uranus: false,
    Neptune: false
  });

  const [calendarGrid, setCalendarGrid] = useState([]);
  const [astroEvents, setAstroEvents] = useState([]);
  const [humanEvents, setHumanEvents] = useState([]);

  const handleFilterChange = (key, value) => {
    setEventFilter((prev) => ({ ...prev, [key]: value }));
  };

  const handlePlanetChange = (planet, checked) => {
    setPlanetFilter((prev) => ({ ...prev, [planet]: checked }));
  };

  const buildCalendar = useCallback(
    (month, year) => {
      setIsLoading(true);

      let datetable = [[{}, {}, {}, {}, {}, {}, {}]];
      let datekeys = {};
      let currentrow = 0;
      let datekey;
      let date = new Date(year, month, 1, 12);
      let dow = (date.getDay() + 6) % 7;

      let day = 1 - dow;
      dow = 0;
      date.setDate(day);

      let rawtime = date.getTime();
      let starttime = new Date(rawtime);
      starttime.setHours(0, 0, 0, 0);

      while (day < 38) {
        datetable[currentrow][dow] = {
          date: new Date(rawtime),
          t0: new Date(new Date(rawtime).setHours(0, 0, 0, 0)),
          t1: new Date(new Date(rawtime).setHours(24, 0, 0, 0)),
          label: date.getDate(),
          thismonth: date.getMonth() === month,
          weekend: dow > 4,
          holiday: dow > 5,
          flagday: false,
          today:
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear(),
          selected: datestring(date) === selectedDate,
          events: [],
          astroevents: []
        };

        datekey = datestring(date);
        datekeys[datekey] = [currentrow, dow];

        day += 1;
        dow += 1;
        date = new Date(year, month, day, 12);
        rawtime = date.getTime();

        if (dow > 6) {
          if (date.getMonth() > month || (date.getMonth() === 0 && month === 11)) {
            break;
          } else {
            dow = 0;
            currentrow += 1;
            datetable.push([{}, {}, {}, {}, {}, {}, {}]);
          }
        }
      }

      let endtime = new Date(date.getTime());
      endtime.setHours(0, 0, 0, 0);

      let astroStart = Astronomy.MakeTime(starttime);
      let astroEnd = Astronomy.MakeTime(endtime);

      let event, eventstart, eventend, dates, x, y, bodies;

      // Moon phases
      if (eventFilter.moonphases) {
        event = Astronomy.SearchMoonQuarter(astroStart);
        let params = [],
          geom = eventFilter.moonphasetype === 'geom',
          newevent;

        if (geom) {
          const moon_angle = (t) => Astronomy.Illumination('Moon', t).phase_angle - 90;
          params = ['max', 'zero_d', 'min', 'zero_a'];
          newevent = timesearch(
            moon_angle,
            event.time.AddDays(-1),
            event.time.AddDays(1),
            params[event.quarter],
            true
          );
        }

        while (event.time < astroEnd || (newevent > astroStart && newevent < astroEnd)) {
          try {
            [y, x] = geom ? datekeys[datestring(newevent)] : datekeys[datestring(event.time)];
            datetable[y][x]['astroevents'].push({
              type: 'moonquarter',
              kind: event.quarter,
              time: geom ? newevent.date : event.time.date
            });
          } catch (e) {
            // ignore outer dates
          } finally {
            event = Astronomy.NextMoonQuarter(event);
            if (geom) {
              const moon_angle = (t) => Astronomy.Illumination('Moon', t).phase_angle - 90;
              newevent = timesearch(
                moon_angle,
                event.time.AddDays(-1),
                event.time.AddDays(1),
                params[event.quarter],
                true
              );
            }
          }
        }
      }

      // Apsides
      bodies = [];
      if (eventFilter.earthapsides) bodies.push('Earth');
      if (eventFilter.moonapsides) bodies.push('Moon');
      if (eventFilter.planetapsides) {
        for (let planet of Object.keys(planetFilter)) {
          if (planetFilter[planet] && planet !== 'Moon') bodies.push(planet);
        }
      }

      for (let body of bodies) {
        event =
          body === 'Moon'
            ? Astronomy.SearchLunarApsis(astroStart)
            : Astronomy.SearchPlanetApsis(body, astroStart);

        while (event && event.time < astroEnd) {
          if (datekeys[datestring(event.time)]) {
            [y, x] = datekeys[datestring(event.time)];
            datetable[y][x]['astroevents'].push({
              type: 'apsis',
              body: body,
              kind: event.kind === 0 ? 'p' : 'a',
              time: event.time.date,
              dist: event.dist_km
            });
          }
          event =
            body === 'Moon'
              ? Astronomy.NextLunarApsis(event)
              : Astronomy.NextPlanetApsis(body, event);
        }
      }

      // Constellation changes
      bodies = [];
      if (eventFilter.sunconstchange) bodies.push('Sun');
      if (eventFilter.moonconstchange) bodies.push('Moon');
      if (eventFilter.planetconstchange) {
        for (let planet of Object.keys(planetFilter)) {
          if (planetFilter[planet] && planet !== 'Moon') bodies.push(planet);
        }
      }

      for (let body of bodies) {
        let events = constelchange(body, false, astroStart, astroEnd);
        for (let ev of events) {
          if (datekeys[datestring(ev.time)]) {
            [y, x] = datekeys[datestring(ev.time)];
            datetable[y][x]['astroevents'].push({
              type: 'constelchange',
              body: body,
              c1: ev.c1,
              c2: ev.c2,
              time: ev.time.date
            });
          }
        }
      }

      // Earth seasons
      if (eventFilter.earthseasons) {
        let seasons = Astronomy.Seasons(year);
        let selectedSeason = undefined;
        if (seasons.mar_equinox > astroStart && seasons.mar_equinox < astroEnd)
          selectedSeason = 'mar_equinox';
        else if (seasons.jun_solstice > astroStart && seasons.jun_solstice < astroEnd)
          selectedSeason = 'jun_solstice';
        else if (seasons.sep_equinox > astroStart && seasons.sep_equinox < astroEnd)
          selectedSeason = 'sep_equinox';
        else if (seasons.dec_solstice > astroStart && seasons.dec_solstice < astroEnd)
          selectedSeason = 'dec_solstice';

        if (selectedSeason && datekeys[datestring(seasons[selectedSeason])]) {
          [y, x] = datekeys[datestring(seasons[selectedSeason])];
          datetable[y][x]['astroevents'].push({
            type: 'earthseason',
            kind: selectedSeason,
            time: seasons[selectedSeason].date
          });
        }
      }

      // Eclipses
      if (eventFilter.eclipses) {
        event = Astronomy.SearchLunarEclipse(astroStart.AddDays(-1));
        eventstart = event.peak.AddDays(-event.sd_penum / 1440);
        eventend = event.peak.AddDays(event.sd_penum / 1440);

        while (eventstart < astroEnd && eventend > astroStart) {
          dates = daterange(eventstart, eventend);
          for (datekey of dates) {
            if (datekeys[datekey]) {
              [y, x] = datekeys[datekey];
              datetable[y][x]['astroevents'].push({
                type: 'lunareclipse',
                kind: event.kind,
                obsc: event.obscuration,
                time: event.peak.date,
                dur_tot: event.sd_total > 0 ? 2 * event.sd_total : undefined,
                dur_par: event.sd_partial > 0 ? 2 * event.sd_partial : undefined,
                dur_pen: 2 * event.sd_penum,
                start: eventstart.date,
                end: eventend.date,
                u1:
                  event.sd_partial > 0
                    ? event.peak.AddDays(-event.sd_partial / 1440).date
                    : undefined,
                u4:
                  event.sd_partial > 0
                    ? event.peak.AddDays(event.sd_partial / 1440).date
                    : undefined,
                u2:
                  event.sd_total > 0 ? event.peak.AddDays(-event.sd_total / 1440).date : undefined,
                u3: event.sd_total > 0 ? event.peak.AddDays(event.sd_total / 1440).date : undefined
              });
            }
          }
          event = Astronomy.NextLunarEclipse(event.peak);
          eventstart = event.peak.AddDays(-event.sd_penum / 1440);
          eventend = event.peak.AddDays(event.sd_penum / 1440);
        }

        event = Astronomy.SearchGlobalSolarEclipse(astroStart.AddDays(-1));
        const partialedge = (t) => syzygy(t, 'Moon', 'Sun').dist_p;
        const centraledge = (t) => syzygy(t, 'Moon', 'Sun').dist_c;

        eventstart = timesearch(partialedge, event.peak.AddDays(-1), event.peak, 'zero_d', true);
        eventend = timesearch(partialedge, event.peak, event.peak.AddDays(1), 'zero_a', true);

        while (eventstart < astroEnd && eventend > astroStart) {
          dates = daterange(eventstart, eventend);
          for (datekey of dates) {
            if (datekeys[datekey]) {
              [y, x] = datekeys[datekey];
              datetable[y][x]['astroevents'].push({
                type: 'solareclipse',
                kind: event.kind,
                obsc: event.obscuration,
                time: event.peak.date,
                start: eventstart.date,
                end: eventend.date,
                c2:
                  event.kind === 'partial'
                    ? undefined
                    : timesearch(centraledge, eventstart, event.peak, 'zero_d', true, 0.01).date,
                c3:
                  event.kind === 'partial'
                    ? undefined
                    : timesearch(centraledge, event.peak, eventend, 'zero_a', true, 0.01).date
              });
            }
          }
          event = Astronomy.NextGlobalSolarEclipse(event.peak);
          eventstart = timesearch(partialedge, event.peak.AddDays(-1), event.peak, 'zero_d', true);
          eventend = timesearch(partialedge, event.peak, event.peak.AddDays(1), 'zero_a', true);
        }
      }

      setCalendarGrid(datetable);
      setIsLoading(false);
    },
    [eventFilter, planetFilter, selectedDate, today]
  );

  useEffect(() => {
    buildCalendar(currentMonth, currentYear);
  }, [currentMonth, currentYear, buildCalendar]);

  const handlePrevMonth = () => {
    if (!(currentYear === 1900 && currentMonth === 0)) {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear((prev) => prev - 1);
      } else {
        setCurrentMonth((prev) => prev - 1);
      }
    }
  };

  const handleNextMonth = () => {
    if (!(currentYear === 2199 && currentMonth === 11)) {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear((prev) => prev + 1);
      } else {
        setCurrentMonth((prev) => prev + 1);
      }
    }
  };

  const handleDayClick = (dayCell) => {
    setSelectedDate(datestring(dayCell.date));
    setAstroEvents(dayCell.astroevents || []);
    setHumanEvents(dayCell.events || []);
  };

  return (
    <div className="astronomyCalendar">
      <table className="calMain">
        <thead>
          <tr style={{ height: '40px' }}>
            <th
              className="hoverblock"
              style={{ borderTopLeftRadius: '20px' }}
              onClick={handlePrevMonth}
            >
              <svg width="10" height="16">
                <polygon points="10,0 10,15 0,8" style={{ fill: 'var(--textcolor)' }} />
              </svg>
            </th>

            <th colSpan="5" style={{ backgroundColor: 'var(--bgcolor)' }}>
              <input
                type="number"
                dir="rtl"
                min="1900"
                max="2199"
                step="1"
                value={currentYear}
                onChange={(e) => {
                  const val = clamp(Number(e.target.value), 1900, 2199);
                  setCurrentYear(val);
                }}
                style={{ fontSize: 'medium', fontWeight: 'bold' }}
              />

              <select
                value={currentMonth}
                onChange={(e) => setCurrentMonth(Number(e.target.value))}
                style={{ fontSize: 'medium', fontWeight: 'bold' }}
              >
                <option value={0}>jaanuar</option>
                <option value={1}>veebruar</option>
                <option value={2}>märts</option>
                <option value={3}>aprill</option>
                <option value={4}>mai</option>
                <option value={5}>juuni</option>
                <option value={6}>juuli</option>
                <option value={7}>august</option>
                <option value={8}>september</option>
                <option value={9}>oktoober</option>
                <option value={10}>november</option>
                <option value={11}>detsember</option>
              </select>
            </th>

            <th
              className="hoverblock"
              style={{ borderTopRightRadius: '20px' }}
              onClick={handleNextMonth}
            >
              <svg width="10" height="16">
                <polygon points="0,0 0,15 10,8" style={{ fill: 'var(--textcolor)' }} />
              </svg>
            </th>
          </tr>

          <tr style={{ height: '35px', backgroundColor: 'var(--bgcolor)' }}>
            <th>E</th>
            <th>T</th>
            <th>K</th>
            <th>N</th>
            <th>R</th>
            <th>L</th>
            <th>P</th>
          </tr>
        </thead>

        {!isLoading && (
          <tbody>
            {calendarGrid.map((row, rIdx) => (
              <tr key={rIdx}>
                {row.map((cell, cIdx) => {
                  const classes = [];
                  if (cell.thismonth) classes.push('inmonth');
                  if (cell.weekend) classes.push('weekend');
                  if (cell.holiday) classes.push('holiday');
                  if (cell.today) classes.push('today');
                  if (cell.selected) classes.push('clicked');

                  return (
                    <td
                      key={cIdx}
                      className={classes.join(' ')}
                      onClick={() => handleDayClick(cell)}
                    >
                      {cell.label}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {isLoading && (
        <div className="loaderContainer">
          <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            Arvutan sfääride muusikat...
            <div className="loader"></div>
          </div>
        </div>
      )}

      <div className="calWarning" id="cal_warning"></div>

      <div className="calSettingsToggle hoverblock" onClick={() => setShowSettings(!showSettings)}>
        <div>{showSettings ? 'Peida seaded' : 'Sündmuste filtrid ja seaded'}</div>
        <div style={{ color: 'var(--hovercolor)' }}>...</div>
      </div>

      {showSettings && (
        <div className="calSettings">
          <span
            style={{
              display: 'inline-block',
              marginBottom: '10px',
              fontSize: 'initial',
              fontWeight: 'bold'
            }}
          >
            Sündmuste filtrid{' '}
            <a href="#" className="nobr" style={{ fontSize: 'smaller' }}>
              (info ja juhend)
            </a>
          </span>
          <br />

          <span className="nobr" style={{ marginLeft: '1em' }}>
            <input
              type="checkbox"
              checked={eventFilter.earthseasons}
              onChange={(e) => handleFilterChange('earthseasons', e.target.checked)}
            />
            Maa aastaajad
          </span>
          <br />

          <span className="nobr" style={{ marginLeft: '1em' }}>
            <input
              type="checkbox"
              checked={eventFilter.moonphases}
              onChange={(e) => handleFilterChange('moonphases', e.target.checked)}
            />
            Kuu faasid
          </span>
          <br />

          <span className="nobr" style={{ marginLeft: '1em' }}>
            <input
              type="checkbox"
              checked={eventFilter.eclipses}
              onChange={(e) => handleFilterChange('eclipses', e.target.checked)}
            />
            Päikese- ja kuuvarjutused
          </span>
          <br />

          <b style={{ display: 'inline-block', margin: '10px 0px 0px 1em' }}>
            Tähtkujude vahetused:
          </b>
          <br />
          <span className="nobr" style={{ marginLeft: '2em' }}>
            <input
              type="checkbox"
              checked={eventFilter.sunconstchange}
              onChange={(e) => handleFilterChange('sunconstchange', e.target.checked)}
            />
            Päike &emsp;
            <input
              type="checkbox"
              checked={eventFilter.moonconstchange}
              onChange={(e) => handleFilterChange('moonconstchange', e.target.checked)}
            />
            Kuu &emsp;
            <input
              type="checkbox"
              checked={eventFilter.planetconstchange}
              onChange={(e) => handleFilterChange('planetconstchange', e.target.checked)}
            />
            planeedid
          </span>
          <br />

          <b style={{ display: 'inline-block', margin: '10px 0px 0px 1em' }}>Apsiidid:</b>
          <br />
          <span className="nobr" style={{ marginLeft: '2em' }}>
            <input
              type="checkbox"
              checked={eventFilter.earthapsides}
              onChange={(e) => handleFilterChange('earthapsides', e.target.checked)}
            />
            Maa &emsp;
            <input
              type="checkbox"
              checked={eventFilter.moonapsides}
              onChange={(e) => handleFilterChange('moonapsides', e.target.checked)}
            />
            Kuu &emsp;
            <input
              type="checkbox"
              checked={eventFilter.planetapsides}
              onChange={(e) => handleFilterChange('planetapsides', e.target.checked)}
            />
            planeedid
          </span>
          <br />

          <b style={{ display: 'inline-block', margin: '10px 0px 5px 1em' }}>Planeetide</b>
          <br />
          <span className="nobr" style={{ marginLeft: '2em' }}>
            <input
              type="checkbox"
              checked={eventFilter.retrogrades}
              onChange={(e) => handleFilterChange('retrogrades', e.target.checked)}
            />
            retrograadid
          </span>
          <br />

          <span className="nobr" style={{ marginLeft: '2em' }}>
            <input
              type="checkbox"
              checked={eventFilter.conjunctions}
              onChange={(e) => handleFilterChange('conjunctions', e.target.checked)}
            />
            ühendused Päikesega (va üleminekud)
          </span>
          <br />

          <span className="nobr" style={{ marginLeft: '2em' }}>
            <input
              type="checkbox"
              checked={eventFilter.approaches}
              onChange={(e) => handleFilterChange('approaches', e.target.checked)}
            />
            ühendused omavahel ja Kuuga
          </span>
          <br />

          <span className="nobr" style={{ display: 'inline-block', margin: '5px 0px 0px 2em' }}>
            <b>Siseplaneetide</b> (Merkuur, Veenus)
          </span>
          <br />
          <span className="nobr" style={{ marginLeft: '3em' }}>
            <input
              type="checkbox"
              checked={eventFilter.transits}
              onChange={(e) => handleFilterChange('transits', e.target.checked)}
            />
            üleminekud Päikesest
          </span>
          <br />

          <span className="nobr" style={{ marginLeft: '3em' }}>
            <input
              type="checkbox"
              checked={eventFilter.elongations}
              onChange={(e) => handleFilterChange('elongations', e.target.checked)}
            />
            elongatsioonid
          </span>
          <br />

          <span className="nobr" style={{ marginLeft: '3em' }}>
            <input
              type="checkbox"
              checked={eventFilter.peakmagnitude}
              onChange={(e) => handleFilterChange('peakmagnitude', e.target.checked)}
            />
            Veenuse suurim heledus
          </span>
          <br />

          <span className="nobr" style={{ display: 'inline-block', margin: '5px 0px 0px 2em' }}>
            <b>Välisplaneetide</b> (Marss–Neptuun)
          </span>
          <br />
          <span className="nobr" style={{ marginLeft: '3em' }}>
            <input
              type="checkbox"
              checked={eventFilter.oppositions}
              onChange={(e) => handleFilterChange('oppositions', e.target.checked)}
            />
            vastasseisud
          </span>
          <br />

          <span className="nobr" style={{ marginLeft: '3em' }}>
            <input
              type="checkbox"
              checked={eventFilter.quadratures}
              onChange={(e) => handleFilterChange('quadratures', e.target.checked)}
            />
            kvadratuurid
          </span>
          <br />

          <span
            style={{
              display: 'inline-block',
              marginTop: '15px',
              fontSize: 'initial',
              fontWeight: 'bold'
            }}
          >
            Sündmuste seaded
          </span>
          <br />

          <span className="nobr" style={{ marginLeft: '1em' }}>
            Kuu faasid{' '}
            <select
              value={eventFilter.moonphasetype}
              style={{ margin: '0px', verticalAlign: 'baseline' }}
              onChange={(e) => handleFilterChange('moonphasetype', e.target.value)}
            >
              <option value="ecl">ekliptiliselt</option>
              <option value="geom">geomeetriliselt</option>
            </select>
          </span>
          <br />

          <span className="nobr" style={{ marginLeft: '1em' }}>
            Ühendused Päikesega ja vastasseisud{' '}
            <select
              value={eventFilter.oppcontype}
              style={{ margin: '0px', verticalAlign: 'baseline' }}
              onChange={(e) => handleFilterChange('oppcontype', e.target.value)}
            >
              <option value="ecl">ekliptiliselt</option>
              <option value="geom">geomeetriliselt</option>
            </select>
          </span>
          <br />

          <span className="nobr" style={{ marginLeft: '1em' }}>
            Ühenduste vähim elongatsioon:{' '}
            <input
              type="number"
              dir="rtl"
              min="1"
              max="90"
              step="1"
              value={eventFilter.appminelong}
              style={{ width: '30px', margin: '0px', verticalAlign: 'baseline' }}
              onChange={(e) => handleFilterChange('appminelong', Number(e.target.value))}
            />
            °
          </span>
          <br />

          <span className="nobr" style={{ marginLeft: '1em' }}>
            Ühenduste suurim kaugus:{' '}
            <input
              type="number"
              dir="rtl"
              min="1"
              max="20"
              step="1"
              value={eventFilter.appmaxdist}
              style={{ width: '30px', margin: '0px', verticalAlign: 'baseline' }}
              onChange={(e) => handleFilterChange('appmaxdist', Number(e.target.value))}
            />
            °
          </span>
          <br />

          <span
            style={{
              display: 'inline-block',
              marginTop: '15px',
              fontSize: 'initial',
              fontWeight: 'bold'
            }}
          >
            Planeetide filter
          </span>
          <br />

          {['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'].map((planet) => (
            <span className="nobr" style={{ marginLeft: '1em' }} key={planet}>
              <input
                type="checkbox"
                checked={planetFilter[planet]}
                onChange={(e) => handlePlanetChange(planet, e.target.checked)}
              />
              {planet}
            </span>
          ))}
        </div>
      )}

      <div className="calDayEvents">
        <div className="calDayEventsHeader">
          <div style={{ flexGrow: 100, textAlign: 'center', fontWeight: 'bold' }}>
            {selectedDate ? `Sündmused: ${selectedDate}` : 'Vali kuupäev'}
          </div>
          <div style={{ flexGrow: 1, textAlign: 'center', fontSize: 'smaller' }}></div>
        </div>

        <div style={{ padding: '10px 0px' }}>
          <svg width="20" height="16" style={{ display: 'inline', verticalAlign: 'bottom' }}>
            <circle cx="10" cy="8" r="4" fill="#080"></circle>
          </svg>
          <span style={{ fontSize: 'smaller', fontWeight: 'bold' }}>
            {' '}
            Astronoomilised sündmused
          </span>
          <ul style={{ margin: '0px', fontSize: 'small' }}>
            {astroEvents.map((ev, idx) => (
              <li key={idx}>{JSON.stringify(ev)}</li>
            ))}
          </ul>
        </div>

        <div>
          <svg width="20" height="16" style={{ display: 'inline', verticalAlign: 'bottom' }}>
            <circle cx="10" cy="8" r="4" fill="#a00"></circle>
          </svg>
          <span style={{ fontSize: 'smaller', fontWeight: 'bold' }}>
            {' '}
            Kohalikud / muud sündmused
          </span>
          <ul style={{ margin: '0px', fontSize: 'small' }}>
            {humanEvents.map((ev, idx) => (
              <li key={idx}>{JSON.stringify(ev)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Calendar;
