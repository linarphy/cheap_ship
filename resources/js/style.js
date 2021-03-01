document.getElementsByTagName('main')[0].style.height=(CONFIG['game']['border'][1]['max']-CONFIG['game']['border'][1]['min'])+'px';
document.getElementById('game').style.width=(CONFIG['game']['border'][0]['max']-CONFIG['game']['border'][0]['min'])+'px';
document.getElementsByTagName('title')[0].removeChild(document.getElementsByTagName('title')[0].childNodes[0]);
document.getElementsByTagName('title')[0].appendChild(document.createTextNode(LANG['page']['title']));
