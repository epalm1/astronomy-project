const max_h = 470,
  min_year = 1900,
  max_year = 2199;

document.getElementById('moonphase_year').value = new Date().getFullYear();
document.getElementById('moonphase_year').min = min_year;
document.getElementById('moonphase_year').max = max_year;

function shift_years(n) {
  const oldyear = Number(document.getElementById('moonphase_year').value),
    delta = n > 0 ? Math.min(n, max_year - oldyear) : Math.max(n, min_year - oldyear);

  document.getElementById('moonphase_year').value = oldyear + delta;
  update_phases();
}

function update_phases() {
  const utc = document.getElementById('moonphase_tz').value == 'utc';

  let year = Number(document.getElementById('moonphase_year').value),
    quarter = Astronomy.SearchMoonQuarter(
      Astronomy.MakeTime(utc ? new Date(Date.UTC(year)) : new Date(year, 0))
    ),
    end = Astronomy.MakeTime(utc ? new Date(Date.UTC(year + 1)) : new Date(year + 1, 0)),
    htmlstr = '<tr>' + '<td class="quartertime"></td>'.repeat(quarter.quarter),
    prev_month = -1,
    style = false;

  while (true) {
    if (
      utc
        ? quarter.time.date.getUTCMonth() != prev_month
        : quarter.time.date.getMonth() != prev_month
    ) {
      prev_month++;
      style = !style;
    }

    htmlstr +=
      `<td class="quartertime${style ? ' style2' : ''}"><span class="datefield_normal">${timeformat(quarter.time, 'wd', true, 'num', false, 'long', false, false, false, utc, true)}` +
      `</span> <span class="timefield_normal">${timeformat(quarter.time, 'none', false, 'num', false, 'long', true, false, false, utc, true)}</span></td>`;

    quarter = Astronomy.NextMoonQuarter(quarter);

    if (quarter.time > end) {
      htmlstr += '<td class="quartertime style2"></td>'.repeat((4 - quarter.quarter) % 4) + '</tr>';
      break;
    } else if (quarter.quarter == 0) {
      htmlstr += '</tr><tr>';
    }
  }

  document.getElementById('moonphase_table').innerHTML = htmlstr;
  resize();
}

function resize() {
  let norm_w = window.innerWidth > 490,
    dates = norm_w
      ? document.getElementsByClassName('datefield_small')
      : document.getElementsByClassName('datefield_normal'),
    times = norm_w
      ? document.getElementsByClassName('timefield_small')
      : document.getElementsByClassName('timefield_normal'),
    heads = norm_w
      ? document.getElementsByClassName('heading_small')
      : document.getElementsByClassName('heading_normal');

  for (let i = dates.length - 1; i >= 0; i--) {
    dates[i].className = norm_w ? 'datefield_normal' : 'datefield_small';
    times[i].className = norm_w ? 'timefield_normal' : 'timefield_small';
  }
  for (let i = heads.length - 1; i >= 0; i--) {
    heads[i].className = norm_w ? 'heading_normal' : 'heading_small';
  }

  document.getElementById('moonphase_0').style.width =
    document.getElementById('moonphase_1').style.width =
    document.getElementById('moonphase_2').style.width =
    document.getElementById('moonphase_3').style.width =
      document.getElementById('moonphase_table').offsetWidth / 4 + 'px';

  try {
    window.parent.document.getElementById('moonphases_frame').height =
      document.getElementById('moonphase_head').offsetHeight +
      document.getElementById('moonphase_content').offsetHeight +
      5 +
      'px';
  } catch (TypeError) {}
}

update_phases();
