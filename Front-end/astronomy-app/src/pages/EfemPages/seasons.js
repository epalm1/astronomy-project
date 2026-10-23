    const
        current_year = new Date().getFullYear(),
        min_year = 1900,
        max_year = 2199,
        max_h = 350;

    document.getElementById('seasons_startyear').value = 5*Math.floor((current_year-2)/5);
    document.getElementById('seasons_endyear').value = 5*Math.floor((current_year-2)/5)+9;
    document.getElementById('seasons_startyear').min = document.getElementById('seasons_endyear').min = min_year;
    document.getElementById('seasons_startyear').max = document.getElementById('seasons_endyear').max = max_year;


    function shift_years (n) {
        const
            oldstart = Number(document.getElementById('seasons_startyear').value),
            oldend = Number(document.getElementById('seasons_endyear').value),
            delta = n>0 ? Math.min(n, max_year-oldend) : Math.max(n, min_year-oldstart);

        document.getElementById('seasons_startyear').value = oldstart + delta;
        document.getElementById('seasons_endyear').value = oldend + delta;
        update_seasons();
    }


    function update_seasons() {
        const utc = document.getElementById('seasons_tz').value == 'utc';

        let htmlstr = '',
            seasons;

        for (
            let year = Number(document.getElementById('seasons_startyear').value);
            year <= Number(document.getElementById('seasons_endyear').value);
            year++
        ) {
            seasons = Astronomy.Seasons(year);
            htmlstr += `<tr${year==current_year ? ' class="currentyear"' : ''}><th class="heading_normal">${year}</th>`
                + `<td class="seasontime"><span class="datefield_normal">${timeformat(seasons.mar_equinox,'wd',true,'num',false,'long',false,false,false,utc,true)}`
                + `</span> <span class="timefield_normal">${timeformat(seasons.mar_equinox,'none',false,'num',false,'long',true,false,false,utc,true)}</span></td>`
                + `<td class="seasontime"><span class="datefield_normal">${timeformat(seasons.jun_solstice,'wd',true,'num',false,'long',false,false,false,utc,true)}`
                + `</span> <span class="timefield_normal">${timeformat(seasons.jun_solstice,'none',false,'num',false,'long',true,false,false,utc,true)}</span></td>`
                + `<td class="seasontime"><span class="datefield_normal">${timeformat(seasons.sep_equinox,'wd',true,'num',false,'long',false,false,false,utc,true)}`
                + `</span> <span class="timefield_normal">${timeformat(seasons.sep_equinox,'none',false,'num',false,'long',true,false,false,utc,true)}</span></td>`
                + `<td class="seasontime"><span class="datefield_normal">${timeformat(seasons.dec_solstice,'wd',true,'num',false,'long',false,false,false,utc,true)}`
                + `</span> <span class="timefield_normal">${timeformat(seasons.dec_solstice,'none',false,'num',false,'long',true,false,false,utc,true)}</span></td></tr>`;
        }

        document.getElementById('seasons_table').innerHTML = htmlstr;
        resize();
    }

    function resize () {
        let norm_w = window.innerWidth > 550,
            dates = norm_w ? document.getElementsByClassName('datefield_small') : document.getElementsByClassName('datefield_normal'),
            times = norm_w ? document.getElementsByClassName('timefield_small') : document.getElementsByClassName('timefield_normal'),
            heads = norm_w ? document.getElementsByClassName('heading_small') : document.getElementsByClassName('heading_normal');

        for (let i = dates.length-1; i >= 0; i--) {
            dates[i].className = norm_w ? 'datefield_normal' : 'datefield_small';
            times[i].className = norm_w ? 'timefield_normal' : 'timefield_small';
        }
        for (let i = heads.length-1; i >= 0; i--) {
            heads[i].className = norm_w ? 'heading_normal' : 'heading_small';
        }

        try {
            window.parent.document.getElementById('seasons_frame').height
                = document.getElementById('seasons_head').offsetHeight
                + document.getElementById('seasons_content').offsetHeight
                + 5 + 'px';
        } catch (TypeError) {}
    }

    update_seasons();