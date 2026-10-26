const current_year = new Date().getFullYear(),
  min_year = 1900,
  max_year = 2199,
  max_h = 350;

document.getElementById('quadratuurid_startyear').value = 5 * Math.floor((current_year - 2) / 5);
document.getElementById('quadratuurid_endyear').value = 5 * Math.floor((current_year - 2) / 5) + 9;
document.getElementById('quadratuurid_startyear').min = document.getElementById(
  'quadratuurid_endyear'
).min = min_year;
document.getElementById('quadratuurid_startyear').max = document.getElementById(
  'quadratuurid_endyear'
).max = max_year;

function shift_years(n) {
  const oldstart = Number(document.getElementById('quadratuurid_startyear').value),
    oldend = Number(document.getElementById('quadratuurid_endyear').value),
    delta = n > 0 ? Math.min(n, max_year - oldend) : Math.max(n, min_year - oldstart);

  document.getElementById('quadratuurid_startyear').value = oldstart + delta;
  document.getElementById('quadratuurid_endyear').value = oldend + delta;
  update_quadratuurid();
}

function update_quadratuurid() {
  const utc = document.getElementById('quadratuurid_tz').value == 'utc';
  let htmlstr = '';

  const planets = [
    { name: 'Neptuun', body: 'Neptune' },
    { name: 'Uraan', body: 'Uranus' },
    { name: 'Saturn', body: 'Saturn' },
    { name: 'Jupiter', body: 'Jupiter' }
  ];

  for (
    let year = Number(document.getElementById('quadratuurid_startyear').value);
    year <= Number(document.getElementById('quadratuurid_endyear').value);
    year++
  ) {
    for (let i = 0; i < planets.length; i++) {
      let planet = planets[i];
      htmlstr +=
        `<tr${year == current_year ? ' class="currentyear"' : ''}>` +
        `<th class="heading_normal" style="text-align: left;">${planet.name} (${year})</th>` +
        `<td class="seasontime" style="text-align: center;">-</td>` +
        `<td class="seasontime"><span class="datefield_normal">-</span> <span class="timefield_normal">-</span></td>` +
        `</tr>`;
    }
  }

  document.getElementById('quadratuurid_table').innerHTML = htmlstr;
  resize();
}

function resize() {
  let norm_w = window.innerWidth > 550,
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

  try {
    window.parent.document.getElementById('quadratuurid_frame').height =
      document.getElementById('quadratuurid_head').offsetHeight +
      document.getElementById('quadratuurid_content').offsetHeight +
      5 +
      'px';
  } catch (TypeError) {}
}

update_quadratuurid();
