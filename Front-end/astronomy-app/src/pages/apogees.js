const
    current_year = new Date().getFullYear(),
    min_year = 1900,
    max_year = 2199,
    max_h = 350;

// Määrame algväärtusteks joonisel toodud vahemiku 2000–2020
document.getElementById('apsides_startyear').value = 2000;
document.getElementById('apsides_endyear').value = 2020;
document.getElementById('apsides_startyear').min = document.getElementById('apsides_endyear').min = min_year;
document.getElementById('apsides_startyear').max = document.getElementById('apsides_endyear').max = max_year;

function shift_years (n) {
    const
        oldstart = Number(document.getElementById('apsides_startyear').value),
        oldend = Number(document.getElementById('apsides_endyear').value),
        delta = n>0 ? Math.min(n, max_year-oldend) : Math.max(n, min_year-oldstart);

    document.getElementById('apsides_startyear').value = oldstart + delta;
    document.getElementById('apsides_endyear').value = oldend + delta;
    update_apsides();
}

function update_apsides() {
    const utc = document.getElementById('apsides_tz').value == 'utc';
    const startYear = Number(document.getElementById('apsides_startyear').value);
    const endYear = Number(document.getElementById('apsides_endyear').value);

    let htmlstr = '';

    // Planeetide loetelu vastavalt sinu joonisele
    const planets = [
        { name: 'Mars', body: 'Mars' },
        { name: 'Merkuur', body: 'Mercury' },
        { name: 'Veenus', body: 'Venus' },
        { name: 'Maa', body: 'Earth' },
        { name: 'Jupiter', body: 'Jupiter' },
        { name: 'Saturn', body: 'Saturn' },
        { name: 'Uraan', body: 'Uranus' },
        { name: 'Neptuun', body: 'Neptune' },
        { name: 'Päike', body: 'Sun' }
    ];

    for (let i = 0; i < planets.length; i++) {
        let planet = planets[i];

        // Siia saab hiljem lisada Astronomy teegi arvutused maksimumi (apheel) ja miinimumi (periheel) leidmiseks
        // Praegu kuvame struktuuri testimiseks tühjad väljad või näidisandmed
        htmlstr += `<tr>`
            + `<th class="heading_normal" style="text-align: left;">${planet.name}</th>`
            + `<td class="seasontime"><span class="datefield_normal">-</span> <span class="timefield_normal">-</span></td>`
            + `<td class="seasontime"><span class="datefield_normal">-</span> <span class="timefield_normal">-</span></td>`
            + `</tr>`;
    }

    document.getElementById('apsides_table').innerHTML = htmlstr;
    resize();
}

function resize () {
    try {
        window.parent.document.getElementById('apsides_frame').height
            = document.getElementById('apsides_head').offsetHeight
            + document.getElementById('apsides_content').offsetHeight
            + 5 + 'px';
    } catch (TypeError) {}
}

update_apsides();