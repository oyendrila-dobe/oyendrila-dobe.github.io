---
layout: page
css: personal

icon: user-circle
title: Personal
---

#### <i class='fas fa-fw fa-volume-up'></i>&nbsp; Pronouncing My Name

<div class='pure-g' style='text-align: center; font-size: 1.25em;'>
    <div class='pure-u-md-7-24 pure-u-1-2' style='margin-top: -1em;'>
        <p>
            <a class='color-faded color-medium-accent syl1'>Oy</a>-<a class='color-faded color-medium-accent syl2'>en</a>-<a class='color-faded color-medium-accent syl3'>dri</a>-<a class='color-faded color-medium-accent syl4'>la</a>
            <a class='color-faded color-medium-accent syl5'>Doo</a>-<a class='color-faded color-medium-accent syl6'>bay</a>
        </p>
        <p style='margin-top: -1em;'>
            <em style='font-size: 0.75em;'>
                (&hairsp;Approximate <a href='https://en.wikipedia.org/wiki/Pronunciation_respelling_for_English'>Respelling</a>&hairsp;)
            </em>
        </p>
    </div>
    <div class='pure-u-md-5-24 pure-u-1-2' style='font-size: 1.25em; margin-top: -1.125em;'>
        <p>
            <a class='color-faded color-medium-accent syl1'>ঐ</a><!--
          --><a class='color-faded color-medium-accent syl2'>ন্</a><!--
          --><a class='color-faded color-medium-accent syl3'>দ্রী</a><!--
          --><a class='color-faded color-medium-accent syl4'>লা</a>
             <a class='color-faded color-medium-accent syl5'>দু</a><!--
          --><a class='color-faded color-medium-accent syl6'>বে</a>
        </p>
        <p style='margin-top: -1.33333333em;'>
            <em style='font-size: 0.6em;'>
                (&hairsp;<a href='https://en.wikipedia.org/wiki/Bengali%E2%80%93Assamese_script'>Bengali</a> Script&hairsp;)
            </em>
        </p>
    </div>
    
</div>




#### <i class='fas fa-fw fa-list-ol'></i>&nbsp; [Dijkstra's Number] (&thinsp;<span class='color-faded color-accent'>4</span>&thinsp;)

(Source = [csauthors.net])&thinsp;**:**
&nbsp;
[Edsger W. Dijkstra](https://www.csauthors.net/edsger-w-dijkstra/)
    <i class='fas fa-fw fa-long-arrow-alt-right'></i>
[C. Antony R. Hoare](https://www.csauthors.net/c-antony-r-hoare/)
    <i class='fas fa-fw fa-long-arrow-alt-right'></i>
[Willem P. de Roever](https://www.csauthors.net/willem-p-de-roever/)
    <i class='fas fa-fw fa-long-arrow-alt-right'></i>
[Erika Abraham](https://www.csauthors.net/erika-abraham/)
    <i class='fas fa-fw fa-long-arrow-alt-right'></i>
Me



<!-- #### <i class='fas fa-fw fa-laptop-code'></i>&nbsp; Open Source Support-->

<script>
    /*var audio_dict = {
        'syl1': new Audio('{{ site.baseurl }}/assets/mp3/Sa.mp3'),
        'syl2': new Audio('{{ site.baseurl }}/assets/mp3/Swa.mp3'),
        'syl3': new Audio('{{ site.baseurl }}/assets/mp3/T.mp3'),
        'syl4': new Audio('{{ site.baseurl }}/assets/mp3/Pa.mp3'),
        'syl5': new Audio('{{ site.baseurl }}/assets/mp3/Dhi.mp3'),
        'syl123': new Audio('{{ site.baseurl }}/assets/mp3/Saswat.mp3'),
        'syl45': new Audio('{{ site.baseurl }}/assets/mp3/Padhi.mp3')
    };*/

    function activate(syl) {
        Array.prototype.forEach.call(document.getElementsByClassName(syl),
                                     e => e.classList.add('hovering'));
    }

    function deactivate(syl) {
        Array.prototype.forEach.call(document.getElementsByClassName(syl),
                                     e => e.classList.remove('hovering'));
    }

    function play(syl, callback, highlight) {
        if (!highlight) highlight = [syl];
        highlight.forEach(activate);
        audio_dict[syl].currentTime = 0;
        audio_dict[syl].onended = () => { highlight.forEach(deactivate); if (callback) callback(); }
        audio_dict[syl].play();
    }

    ['syl1','syl2','syl3','syl4','syl5', 'syl6'].forEach(function (syl) {
        Array.prototype.forEach.call(document.getElementsByClassName(syl), function (e) {
            e.onmouseenter = () => activate(syl);
            e.onmouseleave = () => deactivate(syl);
            e.onclick = () => play(syl);
        });
    });

    /*function play_steps() {
        play('syl1',
             () => play('syl2',
                        () => play('syl3',
                                   () => setTimeout(play, 300,
                                                    'syl4', () => play('syl5')))));
    }

    function play_name() {
        play('syl123', () => setTimeout(() => play('syl45', null, ['syl4','syl5']), 150),
             ['syl1','syl2','syl3']);
    }*/
</script>

